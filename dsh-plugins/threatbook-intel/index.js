/**
 * 微步在线 (ThreatBook) 情报插件 — Host 半边。
 *
 * 职责：
 *  1. 读取本机 IP / 公网出口 IP，供 UI 复制后到「我的 KEY」绑定；
 *  2. API Key 只写入本机文件 (默认 profile 目录)，不上传任何云端；
 *  3. 判断输入类别 (IP / 域名 / Hash / URL / 漏洞编号)，对每类执行“尽量全”的接口组合；
 *  4. 原始 JSON 与完整 Markdown 报告落盘到工作区；
 *  5. 向模型暴露 threatbook_lookup / threatbook_status 两个工具；
 *  6. 给 Web UI 提供 /threatbook/state、/threatbook/action 两个本机回环路由。
 */
import os from 'node:os';
import net from 'node:net';
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const PLUGIN_ID = 'threatbook-intel';
const API_BASE = 'https://api.threatbook.cn/v3';
const BIND_URL = 'https://x.threatbook.com/v5/serviceCenter?tab=myKey';
const USER_AGENT = 'DSH-ThreatBook-Plugin/1.0';
const REQUEST_TIMEOUT_MS = 45000;
const EGRESS_PROVIDERS = (process.env.THREATBOOK_EGRESS_URLS || [
  'https://ipinfo.io/json',
  'https://ifconfig.me/ip',
  'https://api.ip.sb/ip',
  'https://myip.ipip.net',
  'https://api.ipify.org?format=json',
].join(',')).split(',').map((s) => s.trim()).filter(Boolean);
const REPORT_DIR_NAME = 'threatbook-reports';

/** 进程内派生状态 (不是权威数据：Key 以文件为准，查询结果以落盘文件为准)。 */
const state = {
  egress: { ip: null, at: 0, error: null, source: null },
  last: null,
  autoOpenedAt: 0,
};

// ---------------------------------------------------------------- 本地存储

function dataDir() {
  const base = process.env.DSH_PROFILE_DIR
    || process.env.DSH_HOME
    || path.join(os.homedir(), '.dsh');
  return path.join(base, 'plugin-data', PLUGIN_ID);
}

function keyFile() {
  return process.env.THREATBOOK_KEY_FILE || path.join(dataDir(), 'apikey.json');
}

function readKey() {
  try {
    const raw = fs.readFileSync(keyFile(), 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.apikey === 'string' && parsed.apikey.trim()) {
      return { apikey: parsed.apikey.trim(), savedAt: parsed.savedAt || null };
    }
    return null;
  } catch {
    return null;
  }
}

function writeKey(apikey) {
  const file = keyFile();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const payload = JSON.stringify({ apikey, savedAt: new Date().toISOString(), note: 'local only' }, null, 2);
  fs.writeFileSync(file, payload, { encoding: 'utf8', mode: 0o600 });
  try { fs.chmodSync(file, 0o600); } catch { /* Windows 上 chmod 基本无效，忽略 */ }
  return file;
}

function clearKey() {
  try { fs.rmSync(keyFile(), { force: true }); } catch { /* 文件不存在即视为已清除 */ }
}

function maskKey(k) {
  if (!k) return '';
  if (k.length <= 8) return '****';
  return `${k.slice(0, 4)}***${k.slice(-4)}`;
}

// ---------------------------------------------------------------- 本机 IP

function localAddresses() {
  const out = [];
  const faces = os.networkInterfaces();
  for (const [iface, list] of Object.entries(faces)) {
    for (const item of list || []) {
      if (!item || item.internal) continue;
      const family = item.family === 'IPv4' || item.family === 4 ? 'IPv4' : 'IPv6';
      if (family === 'IPv6' && /^fe80/i.test(item.address)) continue;
      out.push({ address: item.address, iface, family, mac: item.mac });
    }
  }
  // IPv4 优先，其次按接口名稳定排序
  out.sort((a, b) => (a.family === b.family ? a.iface.localeCompare(b.iface) : a.family === 'IPv4' ? -1 : 1));
  return out;
}

function httpGetText(url, timeoutMs) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'user-agent': USER_AGENT }, timeout: timeoutMs }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({ status: res.statusCode, text: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('timeout', () => req.destroy(new Error('探测公网 IP 超时')));
    req.on('error', reject);
  });
}

function parseIpCandidate(text) {
  const trimmed = String(text || '').trim();
  if (!trimmed) return null;
  try {
    const j = JSON.parse(trimmed);
    const candidate = j.ip || j.origin || j.query || j.address;
    if (candidate && net.isIP(String(candidate).trim()) !== 0) return String(candidate).trim();
  } catch { /* 纯文本服务，继续用正则提取 */ }
  const matches = trimmed.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b|\b(?:[a-f0-9]{1,4}:){2,7}[a-f0-9]{1,4}\b/gi) || [];
  for (const m of matches) {
    if (net.isIP(m) !== 0) return m;
  }
  return null;
}

async function probeEgress(force = false) {
  const fresh = Date.now() - state.egress.at < 10 * 60 * 1000;
  if (!force && state.egress.ip && fresh) return state.egress;

  const attempts = await Promise.all(EGRESS_PROVIDERS.map(async (url) => {
    try {
      const { status, text } = await httpGetText(url, 6000);
      if (status !== 200) return { url, error: `HTTP ${status}` };
      const ip = parseIpCandidate(text);
      return ip ? { url, ip } : { url, error: '未解析到 IP' };
    } catch (error) {
      return { url, error: error instanceof Error ? error.message : String(error) };
    }
  }));

  const hits = attempts.filter((a) => a.ip);
  const ipv4 = hits.find((a) => net.isIP(a.ip) === 4) || null;
  const ipv6 = hits.find((a) => net.isIP(a.ip) === 6) || null;
  const preferred = ipv4 || ipv6 || null;

  state.egress = {
    ip: preferred ? preferred.ip : state.egress.ip,
    ipv4: ipv4 ? ipv4.ip : state.egress.ipv4 || null,
    ipv6: ipv6 ? ipv6.ip : state.egress.ipv6 || null,
    source: preferred ? preferred.url : state.egress.source || null,
    candidates: hits.map((h) => ({ ip: h.ip, source: h.url })),
    at: preferred ? Date.now() : state.egress.at,
    error: preferred ? null : (attempts.find((a) => a.error) || {}).error || '全部公网 IP 探测服务不可达',
  };
  return state.egress;
}

// ---------------------------------------------------------------- 微步 API

function tbRequest(endpoint, params, opts = {}) {
  const key = readKey();
  if (!key) {
    const error = new Error('尚未配置微步 API Key：请在「微步情报」面板或设置页粘贴 Key 并保存 (Key 只写入本机文件)。');
    error.code = 'NO_KEY';
    throw error;
  }
  const url = new URL(API_BASE + endpoint);
  url.searchParams.set('apikey', key.apikey);
  for (const [k, v] of Object.entries(params || {})) {
    if (v === undefined || v === null || v === '') continue;
    if (Array.isArray(v)) {
      for (const item of v) url.searchParams.append(k, String(item));
    } else {
      url.searchParams.set(k, String(v));
    }
  }
  const timeoutMs = opts.timeoutMs || REQUEST_TIMEOUT_MS;
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'user-agent': USER_AGENT, accept: 'application/json' }, timeout: timeoutMs }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString('utf8');
        let json;
        try {
          json = JSON.parse(text);
        } catch {
          reject(new Error(`HTTP ${res.statusCode} 返回的不是 JSON：${text.slice(0, 180)}`));
          return;
        }
        resolve({
          status: res.statusCode,
          code: typeof json.response_code === 'number' ? json.response_code : -99,
          msg: json.verbose_msg || '',
          data: json.data,
          raw: json,
        });
      });
    });
    req.on('timeout', () => req.destroy(new Error(`请求 ${endpoint} 超时 (${timeoutMs}ms)`)));
    req.on('error', reject);
  });
}

// ---------------------------------------------------------------- 输入识别

function normalizeIndicator(input) {
  let s = String(input == null ? '' : input).trim();
  s = s.replace(/^[`'"<(\[]+/, '').replace(/[`'">)\],.;:!?，。；：！？]+$/, '');
  s = s.replace(/^hxxps:\/\//i, 'https://').replace(/^hxxp:\/\//i, 'http://');
  s = s.replace(/\[\.\]|\(\.\)|\{\.\}/g, '.').replace(/\[:\]|\(:\)/g, ':').replace(/\[@\]|\(@\)/g, '@');
  s = s.replace(/^\[|\]$/g, '');
  return s.trim();
}

function detectType(indicator) {
  const s = indicator;
  if (/^(CVE|XVE|CNVD|CNNVD|NVDB|CITIVD|UTSA|KYSA|KVE)[-_]\d/i.test(s)) return 'vuln';
  if (/^[a-fA-F0-9]{64}$/.test(s)) return 'sha256';
  if (/^[a-fA-F0-9]{40}$/.test(s)) return 'sha1';
  if (/^[a-fA-F0-9]{32}$/.test(s)) return 'md5';
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(s) || /^www\.[^\s/]+/i.test(s)) return 'url';
  if (net.isIP(s) !== 0) return 'ip';
  if (/^(?=.{3,253}$)([a-z0-9_]([a-z0-9_-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/i.test(s)) return 'domain';
  return 'unknown';
}

function typeShort(type) {
  return {
    ip: 'IP', domain: 'Domain', md5: 'Hash', sha1: 'Hash', sha256: 'Hash',
    url: 'URL', vuln: 'CVE', unknown: '未知',
  }[type] || String(type);
}

function typeLabel(type) {
  return {
    ip: 'IP', domain: '域名', sha256: '文件 Hash (SHA256)', sha1: '文件 Hash (SHA1)', md5: '文件 Hash (MD5)',
    url: 'URL', vuln: '漏洞编号', unknown: '无法识别',
  }[type] || type;
}

// ---------------------------------------------------------------- 查询编排

function planFor(type, indicator) {
  switch (type) {
    case 'ip':
      return [
        { id: 'ip_query', label: 'IP 分析', endpoint: '/ip/query', params: { resource: indicator, lang: 'zh' } },
        { id: 'ip_reputation', label: 'IP 信誉 (入站)', endpoint: '/scene/ip_reputation', params: { resource: indicator, lang: 'zh' } },
        { id: 'ip_adv_query', label: 'IP 高级查询 (反查域名)', endpoint: '/ip/adv_query', params: { resource: indicator, lang: 'zh' } },
      ];
    case 'domain':
      return [
        { id: 'domain_query', label: '域名分析', endpoint: '/domain/query', params: { resource: indicator, lang: 'zh' } },
        { id: 'domain_adv_query', label: '域名高级查询 (历史)', endpoint: '/domain/adv_query', params: { resource: indicator, lang: 'zh' } },
        { id: 'sub_domains', label: '子域名查询', endpoint: '/domain/sub_domains', params: { resource: indicator, lang: 'zh' } },
        { id: 'scene_ioc', label: '失陷检测 (出站)', endpoint: '/scene/ioc', params: { resource: indicator, lang: 'zh' } },
        { id: 'domain_context', label: '域名上下文', endpoint: '/scene/domain_context', params: { resource: indicator, lang: 'zh' } },
      ];
    case 'sha256':
    case 'sha1':
    case 'md5':
      return [
        {
          id: 'file_report',
          label: '文件信誉报告',
          endpoint: '/file/report',
          params: {
            resource: indicator,
            query_fields: ['summary', 'multiengines', 'signature', 'static', 'network', 'dropped', 'pstree', 'strings'],
          },
        },
        { id: 'file_multiengines', label: '文件反病毒引擎报告', endpoint: '/file/report/multiengines', params: { resource: indicator } },
      ];
    case 'url':
      return [{ id: 'url_report', label: 'URL 信誉报告', endpoint: '/url/report', params: { url: indicator } }];
    case 'vuln':
      return [{ id: 'vuln', label: '漏洞情报', endpoint: '/vuln', params: { vuln_id: indicator } }];
    default:
      return [];
  }
}


// 会话内记住「没有权限」的接口，避免每次查询都去撞墙；重启进程后自动重试
const deniedEndpoints = new Map();

function notePermission(job, result) {
  if (!job || !job.endpoint || !result) return;
  const code = result.code;
  const msg = String(result.msg || '');
  if (typeof code === 'number' && code < 0 && /权限|permission|forbidden/i.test(msg)) {
    deniedEndpoints.set(job.endpoint, { label: job.label, endpoint: job.endpoint, msg, at: Date.now() });
  } else if (typeof code === 'number' && code >= 0) {
    deniedEndpoints.delete(job.endpoint);
  }
}

function permissionSummary() {
  return [...deniedEndpoints.values()].sort((a, b) => a.endpoint.localeCompare(b.endpoint));
}

function splitPlan(plan) {
  const runnable = plan.filter((job) => !deniedEndpoints.has(job.endpoint));
  const denied = plan.filter((job) => deniedEndpoints.has(job.endpoint));
  // 全部无权限时仍执行第一个：它不该同时出现在「已跳过」里
  if (runnable.length) return { runnable, skipped: denied };
  return { runnable: denied.slice(0, 1), skipped: denied.slice(1) };
}

async function runJob(job) {
  try {
    const res = await tbRequest(job.endpoint, job.params);
    const result = { id: job.id, label: job.label, endpoint: job.endpoint, ok: true, code: res.code, msg: res.msg, data: res.data };
    notePermission(job, result);
    return result;
  } catch (error) {
    const result = {
      id: job.id, label: job.label, endpoint: job.endpoint, ok: false,
      code: -1, msg: error instanceof Error ? error.message : String(error), data: null,
    };
    notePermission(job, result);
    return result;
  }
}

async function runUrlFlow(indicator) {
  const first = await runJob({ id: 'url_report', label: 'URL 信誉报告', endpoint: '/url/report', params: { url: indicator } });
  const results = [first];
  const denied = typeof first.code === 'number' && first.code < 0 && /权限|permission/i.test(String(first.msg || ''));
  if (denied) return results;
  const lacking = !first.ok || first.code === 2 || first.code === 4 || first.code === 6 || !first.data;
  if (!lacking) return results;
  const scan = await runJob({ id: 'url_scan', label: '提交 URL 分析', endpoint: '/url/scan', params: { url: indicator } });
  results.push(scan);
  if (!scan.ok) return results;
  for (let i = 0; i < 5; i += 1) {
    await new Promise((r) => setTimeout(r, 4000));
    const retry = await runJob({ id: 'url_report_retry', label: `URL 信誉报告 (第 ${i + 2} 次)`, endpoint: '/url/report', params: { url: indicator } });
    results.push(retry);
    if (retry.ok && retry.code === 0 && retry.data) break;
    if (retry.ok && retry.code !== 3 && retry.code !== 4 && retry.code !== 2) break;
  }
  return results;
}

function pickRecord(data, indicator) {
  if (!data || typeof data !== 'object') return {};
  for (const bag of ['ips', 'domains']) {
    const map = data[bag];
    if (map && typeof map === 'object' && !Array.isArray(map)) {
      if (map[indicator]) return map[indicator];
      const first = Object.values(map).find((v) => v && typeof v === 'object' && !Array.isArray(v));
      if (first) return first;
    }
  }
  if (data[indicator] && typeof data[indicator] === 'object' && !Array.isArray(data[indicator])) return data[indicator];
  const skip = new Set(['response_code', 'verbose_msg', 'permalink', 'total_records', 'cursor', 'items', 'message']);
  for (const [k, v] of Object.entries(data)) {
    if (skip.has(k)) continue;
    if (v && typeof v === 'object' && !Array.isArray(v)) return v;
  }
  return {};
}

function fmtList(value, max = 8) {
  if (value === undefined || value === null) return '';
  const arr = Array.isArray(value) ? value : [value];
  const items = arr.filter((v) => v !== null && v !== undefined && v !== '');
  if (!items.length) return '—';
  const shown = items.slice(0, max).map((v) => (typeof v === 'object' ? JSON.stringify(v) : String(v)));
  return shown.join(', ') + (items.length > max ? ` …(+${items.length - max})` : '');
}

function loc(rec) {
  const l = rec && rec.basic && rec.basic.location;
  if (!l) return '';
  return [l.country, l.province, l.city].filter(Boolean).join(' / ');
}

function intelCounts(rec) {
  const intel = (rec && rec.intelligences) || {};
  const tb = Array.isArray(intel.threatbook_lab) ? intel.threatbook_lab.length : 0;
  const reward = Array.isArray(intel.x_reward) ? intel.x_reward.length : 0;
  const os = Array.isArray(intel.open_source) ? intel.open_source.length : 0;
  const valid = (intel.threatbook_lab || []).filter((x) => x && x.expired === false).length;
  return { tb, reward, os, valid };
}

function summarize(type, indicator, results) {
  const byId = new Map(results.map((r) => [r.id, r]));
  const lines = [];
  const push = (k, v) => { if (v !== '' && v !== undefined && v !== null) lines.push(`- ${k}：${v}`); };

  if (type === 'ip') {
    const q = byId.get('ip_query');
    const rec = pickRecord(q && q.data, indicator);
    const rep = pickRecord((byId.get('ip_reputation') || {}).data, indicator);
    const adv = (byId.get('ip_adv_query') || {}).data || {};
    push('综合判定', fmtList(rec.judgments, 12));
    push('位置 / 运营商', [loc(rec), rec && rec.basic && rec.basic.carrier].filter(Boolean).join(' · '));
    push('ASN', rec && rec.asn ? `AS${rec.asn.number} ${rec.asn.info || ''}(风险值 ${rec.asn.rank})` : '');
    push('应用场景', rec && rec.scene);
    push('情报条数', (() => {
      const c = intelCounts(rec);
      return `微步 ${c.tb}(有效 ${c.valid})/ X 奖励 ${c.reward} / 开源 ${c.os}`;
    })());
    push('关联样本', Array.isArray(rec.samples) ? `${rec.samples.length} 条；最高检出 ${fmtList(rec.samples.map((s) => s.ratio), 3)}；家族 ${fmtList(rec.samples.map((s) => s.malware_family), 4)}` : '');
    push('开放端口', Array.isArray(rec.ports) ? `${rec.ports.length} 个 (${fmtList(rec.ports.map((p) => p.port), 10)})` : '');
    push('SSL 证书', Array.isArray(rec.cas) ? `${rec.cas.length} 张` : '');
    push('反查域名数', rec.sum_cur_domains);
    push('反向 DNS', fmtList((rec.rdns_list || []).map((r) => r.rdns), 5));
    push('情报更新时间', rec.update_time);
    push('IP 信誉 (入站)', rep.is_malicious === undefined ? '' : `恶意=${rep.is_malicious} 可信度=${rep.confidence_level || '—'} 严重级别=${rep.severity || '—'} 判定=${fmtList(rep.judgments, 8)}`);
    push('历史反查域名', adv.history_domains ? `${Object.keys(adv.history_domains).length} 个日期分组；当前指向 ${fmtList(adv.cur_domains, 6)}` : '');
    push('X 详情页', rec.permalink);
  } else if (type === 'domain') {
    const rec = pickRecord((byId.get('domain_query') || {}).data, indicator);
    const adv = ((byId.get('domain_adv_query') || {}).data) || {};
    const sub = ((byId.get('sub_domains') || {}).data) || {};
    const ctx = ((byId.get('domain_context') || {}).data || {})[indicator] || {};
    const ioc = pickRecord(((byId.get('scene_ioc') || {}).data || {}), indicator);
    push('综合判定', fmtList(rec.judgments, 12));
    push('域名分类', fmtList((rec.categories && rec.categories.first_cats) || [], 6));
    push('情报条数', (() => { const c = intelCounts(rec); return `微步 ${c.tb}(有效 ${c.valid})/ X 奖励 ${c.reward} / 开源 ${c.os}`; })());
    push('解析 IP', Array.isArray(rec.cur_ips) ? `${rec.cur_ips.length} 个 (${fmtList(rec.cur_ips.map((x) => x.ip), 6)})` : '');
    push('Whois', rec.cur_whois ? `注册商 ${rec.cur_whois.registrar_name || '—'}；注册人 ${rec.cur_whois.registrant_name || '—'}；邮箱 ${rec.cur_whois.registrant_email || '—'}；注册时间 ${rec.cur_whois.cdate || '—'}；过期 ${rec.cur_whois.edate || '—'}` : '');
    push('备案', rec.icp ? `${rec.icp.company_name || '—'}(${rec.icp.company_type || '—'})${rec.icp.site_license || ''}` : '');
    push('排名', rec.rank && rec.rank.alexa_rank ? `Alexa ${rec.rank.alexa_rank.global_rank}` : '');
    push('证书', Array.isArray(rec.cas) ? `${rec.cas.length} 张` : '');
    push('关联样本', Array.isArray(rec.samples) ? `${rec.samples.length} 条；家族 ${fmtList(rec.samples.map((s) => s.malware_family), 4)}` : '');
    push('子域名', sub.sub_domains ? `总计 ${sub.sub_domains.total}，本次返回 ${(sub.sub_domains.data || []).length} 个` : '');
    push('历史解析', Array.isArray(adv.history_ips) ? `${adv.history_ips.length} 个日期分组` : '');
    push('历史 Whois', Array.isArray(adv.history_whoises) ? `${adv.history_whoises.length} 条` : '');
    push('失陷检测 (出站)', ioc.is_malicious === undefined ? '' : `恶意=${ioc.is_malicious} 可信度=${ioc.confidence_level || '—'} 判定=${fmtList(ioc.judgments, 8)}`);
    push('上下文关联样本', Array.isArray(ctx.context) ? `${ctx.context.length} 个` : '');
    push('取证建议', Array.isArray(ctx.forensics) && ctx.forensics.length ? `${ctx.forensics.length} 条` : '');
    push('X 详情页', rec.permalink);
  } else if (type === 'sha256' || type === 'sha1' || type === 'md5') {
    const rep = (byId.get('file_report') || {}).data || {};
    const s = rep.summary || {};
    const me = rep.multiengines || {};
    const multi = ((byId.get('file_multiengines') || {}).data || {}).multiengines || {};
    push('文件', `${s.file_name || '—'}(${s.file_type || '—'})`);
    push('判定', `威胁等级=${s.threat_level || '—'} 类型=${s.malware_type || '—'} 家族=${s.malware_family || '—'} 评分=${s.threat_score === undefined ? '—' : s.threat_score} 白名单=${s.is_whitelist === undefined ? '—' : s.is_whitelist}`);
    push('Hash', `sha256=${s.sample_sha256 || indicator} md5=${s.md5 || '—'}`);
    push('检出率', me.result ? `${Object.values(me.result).filter((v) => v && v !== 'safe').length}/${Object.keys(me.result).length}(${me.scan_time || '—'})` : (multi.positives !== undefined ? `${multi.positives}/${multi.total}(${multi.scan_date || '—'})` : ''));
    push('多引擎可疑项', me.result ? fmtList(Object.entries(me.result).filter(([, v]) => v && v !== 'safe').map(([k, v]) => `${k}=${v}`), 6) : '');
    push('场景', fmtList(s.scenes, 6));
    push('静态标签', fmtList(s.tag && s.tag.s, 6));
    push('提交时间', s.submit_time);
    push('沙箱环境', s.sandbox_type ? `${s.sandbox_type}(成功环境 ${fmtList(s.sandbox_type_list, 3)})` : '');
    push('行为签名', Array.isArray(rep.signature) ? `${rep.signature.length} 条，最高严重级别 ${Math.max(0, ...rep.signature.map((x) => Number(x.severity) || 0))}` : '');
    push('网络行为', rep.network ? `http ${(rep.network.http || []).length} / dns ${(rep.network.dns || []).length} / domains ${(rep.network.domains || []).length} / hosts ${(rep.network.hosts || []).length}` : '');
    push('释放文件', Array.isArray(rep.dropped) ? `${rep.dropped.length} 个` : '');
    push('提取字符串', rep.strings ? `${(rep.strings.sha256 || []).length} 条静态字符串 / ${(rep.strings.pcap || []).length} 条流量字符串` : '');
    push('X 沙箱报告', rep.permalink);
  } else if (type === 'url') {
    const lastOk = [...results].reverse().find((r) => r.id.startsWith('url_report') && r.ok && r.data);
    const d = (lastOk && lastOk.data) || {};
    const me = d.multiengines || {};
    const hits = Object.entries(me).filter(([, v]) => v && v !== 'safe' && v !== 'whitelist');
    push('URL 判定', `${d.threat_level || '—'}(引擎 ${hits.length}/${Object.keys(me).length} 检出)`);
    push('命中引擎', fmtList(hits.map(([k, v]) => `${k}=${v}`), 8));
    push('最终 URL', d.details && d.details.finalUrl);
    push('解析 IP / HTTP', d.details ? `${d.details.ip || '—'} / ${d.details.httpStatusCode || d.details.status || '—'}` : '');
    push('响应头', d.details && d.details.headers ? fmtList(Object.keys(d.details.headers), 6) : '');
    push('下载文件', d.sandbox ? `${d.sandbox.threat_level || '—'} ${d.sandbox.file_name || ''}(${d.sandbox.file_type || ''})sha256=${d.sandbox.sample_sha256 || ''}` : '');
    push('历史下载文件', d.details && Array.isArray(d.details.historyScans) ? `${d.details.historyScans.length} 条` : '');
    push('扫描时间', d.details && d.details.lastSeen);
    push('X 报告', d.permalink);
  } else if (type === 'vuln') {
    const items = (((byId.get('vuln') || {}).data || {}).items) || [];
    if (!items.length) {
      push('结果', '未查询到该漏洞编号的情报 (可能尚未收录或编号格式不支持)');
    } else {
      for (const it of items.slice(0, 5)) {
        const b = it.basic_info || {};
        const ev = it.evaluation || {};
        const vpt = ev.x_vpt || {};
        const cv = ev.cvss_v3 || {};
        const intel = it.intelligence || {};
        push('漏洞', `${b.xve_id || '—'} ${b.cve_id ? `(${b.cve_id})` : ''} ${b.vuln_name || ''}`);
        push('分类 / 平台', `${b.vuln_category || '—'} / ${fmtList(((it.impact || {}).platform), 4)}`);
        push('风险', `VPR ${vpt.vpr ?? '—'}(${vpt.risk_level || '—'})CVSS3 ${cv.cvss_basic_score ?? '—'} ${cv.cvss_grade || ''}`);
        push('标签', fmtList(intel.tag, 10));
        push('利用情况', `在野利用=${intel.has_kev} 公开 PoC=${intel.has_poc_public} 微步 PoC=${intel.has_poc_threatbook} 有修复方案=${intel.has_solution}`);
        push('影响厂商产品', fmtList(((it.impact || {}).affected_vendors_products || []).map((x) => `${x.vendor || ''} ${x.product || ''}`.trim()), 5));
        push('PoC / 方案 / 补丁', `${(it.pocs || []).length} / ${(it.solutions || []).length} / ${(it.patches || []).length}`);
        push('公开 / 更新', `${b.publish_time ? new Date(b.publish_time * 1000).toISOString().slice(0, 10) : '—'} / ${b.update_time ? new Date(b.update_time * 1000).toISOString().slice(0, 10) : '—'}`);
        push('X 详情页', it.link);
      }
    }
  }

  if (!lines.length) lines.push('- 未取到可解读字段，请查看下方完整响应');
  return lines.join('\n');
}

function digestBrief(type, indicator, results) {
  const byId = new Map(results.map((r) => [r.id, r]));
  const lines = [];
  const push = (k, v) => {
    if (v !== '' && v !== undefined && v !== null && v !== '—') lines.push(`- ${k}：${v}`);
  };
  const verdict = (rec) => {
    const judged = fmtList(rec && rec.judgments, 8).replace(/, /g, '、');
    return judged && judged !== '—' ? judged : '暂无情报判定';
  };

  if (type === 'ip') {
    const rec = pickRecord((byId.get('ip_query') || {}).data, indicator);
    const rep = pickRecord((byId.get('ip_reputation') || {}).data, indicator);
    const judged = { judgments: [...new Set([...(rec.judgments || []), ...(rep.judgments || [])])] };
    push('结论', verdict(judged) + (rep && rep.is_malicious === true ? ' (来自入站信誉)' : ''));
    push('位置 / 运营商', [loc(rec), rec && rec.basic && rec.basic.carrier].filter(Boolean).join(' · '));
    push('ASN', rec && rec.asn ? `AS${rec.asn.number} ${rec.asn.info || ''}`.trim() : '');
    if (Array.isArray(rec.samples) && rec.samples.length) {
      const families = rec.samples.map((s) => s && s.malware_family).filter(Boolean);
      push('关联样本', `${rec.samples.length} 条${families.length ? `，家族 ${fmtList(families, 3)}` : ''}`);
    }
    if (rep && rep.confidence_level !== undefined) {
      push('入站信誉', `可信度 ${rep.confidence_level}${rep.judgments ? ` · ${fmtList(rep.judgments, 4)}` : ''}`);
    }
  } else if (type === 'domain') {
    const rec = pickRecord((byId.get('domain_query') || {}).data, indicator);
    const ioc = pickRecord(((byId.get('scene_ioc') || {}).data || {}), indicator);
    const sub = (((byId.get('sub_domains') || {}).data || {}).sub_domains) || {};
    const merged = { judgments: [...new Set([...(rec.judgments || []), ...(ioc.judgments || [])])] };
    const fileStatus = endpointStatus(type, results);
    const base = merged.judgments.length ? verdict(merged) : (fileStatus.noneUsable ? '权限不足，无法判定' : '暂无情报判定');
    push('结论', base + (ioc && ioc.is_malicious ? ' (来自 /scene/ioc)' : ''));
    if (ioc && ioc.severity) push('严重级别', ioc.severity);
    const ips = Array.isArray(rec.cur_ips) ? rec.cur_ips.map((x) => x && x.ip).filter(Boolean) : [];
    push('解析 IP', ips.length ? `${ips.length} 个 · ${fmtList(ips, 4)}` : '');
    push('分类', fmtList((rec.categories && rec.categories.first_cats) || [], 4));
    if (sub.total !== undefined) push('子域名', `共 ${sub.total} 个`);
    const whois = rec.cur_whois;
    push('注册信息', whois && whois.registrar_name
      ? `${whois.registrar_name}${whois.cdate ? ` · 注册于 ${whois.cdate}` : ''}`
      : '');
    if (Array.isArray(rec.samples) && rec.samples.length) push('关联样本', `${rec.samples.length} 条`);
  } else if (type === 'sha256' || type === 'sha1' || type === 'md5') {
    const rep = (byId.get('file_report') || {}).data || {};
    const s = rep.summary || {};
    const fileStatus = endpointStatus(type, results);
    const engines = enginesOf(rep.multiengines) || enginesOf((byId.get('file_multiengines') || {}).data);
    const verdictText = [s.threat_level, s.malware_type, s.malware_family].filter(Boolean).join(' / ')
      || (engines && engines.bad >= 5 ? `多引擎 ${engines.bad}/${engines.total} 报毒` : '')
      || (fileStatus.noneUsable ? '权限不足，无法判定' : '暂无情报判定');
    push('结论', verdictText + (engines && engines.bad >= 5 && !s.threat_level ? ' (来自多引擎)' : ''));
    push('文件', s.file_name ? `${s.file_name} (${s.file_type || '—'})` : '');
    if (engines) push('检出', `${engines.bad}/${engines.total}`);
    push('场景', fmtList(s.scenes, 4));
  } else if (type === 'url') {
    const lastOk = [...results].reverse().find((r) => r.id.startsWith('url_report') && r.ok && r.data);
    const d = (lastOk && lastOk.data) || {};
    const me = d.multiengines || {};
    const hits = Object.entries(me).filter(([, v]) => v && v !== 'safe' && v !== 'whitelist');
    const urlStatus = endpointStatus(type, results);
    push('结论', d.threat_level ? d.threat_level : (urlStatus.noneUsable ? '权限不足，无法判定' : '暂无情报判定'));
    if (Object.keys(me).length) push('检出引擎', `${hits.length}/${Object.keys(me).length}`);
    push('解析 IP / HTTP', d.details ? `${d.details.ip || '—'} / ${d.details.httpStatusCode || d.details.status || '—'}` : '');
    if (d.details && d.details.finalUrl) push('最终 URL', d.details.finalUrl);
  } else if (type === 'vuln') {
    const vulnStatus = endpointStatus(type, results);
    const items = (((byId.get('vuln') || {}).data || {}).items) || [];
    if (!items.length) {
      push('结论', vulnStatus.noneUsable ? '权限不足，无法判定' : '未收录该漏洞编号');
    } else {
      const it = items[0];
      const b = it.basic_info || {};
      const ev = it.evaluation || {};
      const vpt = ev.x_vpt || {};
      const cv = ev.cvss_v3 || {};
      const intel = it.intelligence || {};
      push('漏洞', `${b.cve_id || b.xve_id || '—'}${b.vuln_name ? ` · ${b.vuln_name}` : ''}`);
      push('风险', `VPR ${vpt.vpr ?? '—'} / CVSS3 ${cv.cvss_basic_score ?? '—'}`);
      push('利用情况', `在野利用 ${intel.has_kev ? '是' : '否'} · 公开 PoC ${intel.has_poc_public ? '是' : '否'}`);
      if (items.length > 1) push('匹配条目', `${items.length} 条`);
    }
  }

  if (!lines.length) lines.push('- 无可用字段');
  return lines.join('\n');
}


// ---------------------------------------------------------------- 情报研判评分 (参考 SOC 分诊模型)

// 时效门槛：超过阈值的情报用于批量扫描会显著抬高误报率
const IOC_TTL_DAYS = { ip: 30, domain: 30, url: 14, md5: 90, sha1: 90, sha256: 90, vuln: 90 };

// 攻击链阶段与 ATT&CK 技术映射
const CHAIN_STAGES = [
  { keys: ['扫描', 'Scanner'], stage: '侦察', techniques: ['T1046', 'T1595'] },
  { keys: ['爆破', 'Brute', '暴力破解'], stage: '初始访问', techniques: ['T1110'] },
  { keys: ['钓鱼', 'Phishing'], stage: '投递', techniques: ['T1566', 'T1204'] },
  { keys: ['利用', 'Exploit'], stage: '利用', techniques: ['T1190', 'T1203'] },
  { keys: ['下载', 'Downloader', 'Loader', '加载器'], stage: '安装', techniques: ['T1105', 'T1055'] },
  { keys: ['C2', 'C&C', '远控', '后门', 'Backdoor', '僵尸', 'Botnet'], stage: '命令与控制', techniques: ['T1071', 'T1571'] },
  { keys: ['勒索', 'Ransom', '挖矿', 'Miner', '窃密', '窃取'], stage: '目标行动', techniques: ['T1486', 'T1496', 'T1041'] },
];

function byIdOf(results) {
  return new Map(results.map((r) => [r.id, r]));
}

function enginesOf(value) {
  if (!value || typeof value !== 'object') return null;
  // 兼容 { result } / { multiengines: { result } } / { positives, total } 三种结构
  const inner = value.multiengines && typeof value.multiengines === 'object' ? value.multiengines : value;
  if (typeof inner.positives === 'number' && typeof inner.total === 'number') {
    return inner.total ? { bad: inner.positives, total: inner.total } : null;
  }
  const result = inner.result && typeof inner.result === 'object' ? inner.result : inner;
  const total = Object.keys(result).length;
  if (!total) return null;
  const bad = Object.values(result).filter((v) => v && v !== 'safe' && v !== 'whitelist').length;
  return { bad, total };
}

function collectFacts(type, indicator, results) {
  const byId = byIdOf(results);
  const facts = { judgments: [], isMalicious: null, confidence: null, engines: null, updatedAt: null, scene: '', severity: '', verdictSource: null };
  const add = (value) => {
    if (value !== undefined && value !== null && value !== '') facts.judgments.push(String(value));
  };
  const merge = (rec) => {
    if (!rec || typeof rec !== 'object') return;
    if (Array.isArray(rec.judgments)) rec.judgments.forEach(add);
    if (rec.is_malicious !== undefined && rec.is_malicious !== null) {
      facts.isMalicious = Boolean(rec.is_malicious);
      facts.verdictSource = 'api';
    }
    if (rec.confidence_level !== undefined && rec.confidence_level !== null) facts.confidence = String(rec.confidence_level);
    if (rec.scene) facts.scene = String(rec.scene);
    if (rec.severity) facts.severity = String(rec.severity);
    if (rec.update_time) facts.updatedAt = String(rec.update_time);
    for (const group of (Array.isArray(rec.tags_classes) ? rec.tags_classes : [])) {
      if (group && Array.isArray(group.tags)) group.tags.forEach(add);
    }
  };

  if (type === 'ip') {
    merge(pickRecord((byId.get('ip_query') || {}).data, indicator));
    merge(pickRecord((byId.get('ip_reputation') || {}).data, indicator));
  } else if (type === 'domain') {
    merge(pickRecord((byId.get('domain_query') || {}).data, indicator));
    // 域名判定也常出现在场景接口里，必须一并采集，否则会漏掉明确的恶意结论
    merge(pickRecord(((byId.get('scene_ioc') || {}).data || {}), indicator));
  } else if (type === 'url') {
    const lastOk = [...results].reverse().find((r) => r.id.startsWith('url_report') && r.ok && r.data);
    const d = (lastOk && lastOk.data) || {};
    add(d.threat_level);
    facts.engines = enginesOf(d.multiengines);
    if (d.details && d.details.lastSeen) facts.updatedAt = String(d.details.lastSeen);
    if (facts.engines && facts.engines.bad >= 5 && facts.isMalicious === null) {
      facts.isMalicious = true;
      facts.verdictSource = 'engines';
    }
  } else if (type === 'sha256' || type === 'sha1' || type === 'md5') {
    const rep = (byId.get('file_report') || {}).data || {};
    const s = rep.summary || {};
    add(s.threat_level);
    add(s.malware_type);
    add(s.malware_family);
    facts.engines = enginesOf(rep.multiengines) || enginesOf((byId.get('file_multiengines') || {}).data);
    if (s.submit_time) facts.updatedAt = String(s.submit_time);
    if (s.is_whitelist === true) facts.isMalicious = false;
    if (facts.engines && facts.engines.bad >= 5 && facts.isMalicious === null) {
      facts.isMalicious = true;
      facts.verdictSource = 'engines';
    }
  } else if (type === 'vuln') {
    const items = (((byId.get('vuln') || {}).data || {}).items) || [];
    const it = items[0];
    if (it) {
      const intel = it.intelligence || {};
      const b = it.basic_info || {};
      add(b.vuln_category);
      add(b.cve_id || b.xve_id);
      if (intel.has_kev) add('在野利用');
      if (intel.has_poc_public) add('公开 PoC');
    }
  }
  facts.judgments = [...new Set(facts.judgments.filter(Boolean))];
  return facts;
}

function chainOf(facts) {
  const text = facts.judgments.join(' ');
  for (const item of CHAIN_STAGES) {
    if (item.keys.some((k) => text.includes(k))) return item;
  }
  return null;
}

/**
 * 情报侧评分：判定强度 55 + 多引擎检出 25 + 可信度 10 + 时效 10 = 100。
 * 告警级别与资产价值不在本插件可见范围内，需使用者结合实际情况加权。
 */
function scoreThreat(type, indicator, results) {
  const facts = collectFacts(type, indicator, results);
  const text = facts.judgments.join(' ');
  const has = (words) => words.some((w) => text.includes(w));

  const severity = String(facts.severity || '');
  const highSeverity = /高|严重|恶意/.test(severity);
  const highTag = has(['C2', 'C&C', '远控', '后门', 'Backdoor', '僵尸', 'Botnet', '勒索', 'Ransom', '在野利用', '恶意软件', '木马', 'Trojan', 'APT', '银狐', '黑产', '团伙']);

  let risk = 0;
  let riskLabel = '无可用的情报判定';
  if (facts.isMalicious === true) {
    // 微步已明确判恶意时，评分不得低于此档，其他接口缺失只影响置信度
    risk = highTag || highSeverity ? 55 : 45;
    riskLabel = '微步判定为恶意';
  } else if (has(['C2', 'C&C', '远控', '后门', 'Backdoor', '僵尸', 'Botnet', '勒索', 'Ransom', '在野利用'])) {
    risk = 55; riskLabel = '强恶意判定';
  } else if (has(['利用', 'Exploit', '爆破', 'Brute', '钓鱼', 'Phishing', '木马', 'Trojan', '挖矿', 'PoC'])) {
    risk = 45; riskLabel = '恶意判定';
  } else if (has(['扫描', 'Scanner', '垃圾', 'Spam', '可疑'])) {
    risk = 30; riskLabel = '弱恶意判定';
  } else if (facts.isMalicious === false) {
    risk = 8; riskLabel = '判为非恶意';
  } else if (facts.judgments.length) {
    risk = 20; riskLabel = '有标签但未定性';
  }

  const engineScore = facts.engines
    ? (facts.engines.bad >= 10 ? 25 : facts.engines.bad >= 5 ? 20 : facts.engines.bad >= 1 ? 12 : 0)
    : 0;
  const confText = String(facts.confidence || '').toLowerCase();
  const confScore = /high|高/.test(confText) ? 10 : /medium|中/.test(confText) ? 6 : /low|低/.test(confText) ? 2 : 0;

  let freshScore = 5;
  let ageDays = null;
  if (facts.updatedAt) {
    const at = new Date(String(facts.updatedAt).replace(' ', 'T'));
    if (!Number.isNaN(at.getTime())) {
      ageDays = Math.max(0, Math.round((Date.now() - at.getTime()) / 86400000));
      const ttl = IOC_TTL_DAYS[type] || 30;
      freshScore = ageDays <= 7 ? 10 : ageDays <= ttl ? 8 : ageDays <= ttl * 3 ? 4 : 0;
    }
  }

  const score = Math.max(0, Math.min(100, risk + engineScore + confScore + freshScore));
  const priority = score >= 75 ? 'P0 紧急' : score >= 55 ? 'P1 高优' : score >= 30 ? 'P2 中优' : 'P3 低优';
  // 一个可用的判定接口都没有时，低分不代表「安全」，只代表「没看到」
  const status = endpointStatus(type, results);
  const undetermined = score < 30 && status.noneUsable;
  return { facts, score, priority, riskLabel, ageDays, chain: chainOf(facts), status, undetermined };
}


// 从查询结果里挑出 C2 通联地址：样本网络行为里的域名 / IP / URL，或本身被判为远控的指标
function extractC2(type, indicator, results) {
  const byId = new Map(results.map((r) => [r.id, r]));
  const out = [];
  const seen = new Set();
  const push = (value, kind, source) => {
    const text = typeof value === 'string' ? value.trim() : '';
    if (!text || text.length > 200) return;
    const key = kind + ':' + text.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ value: text, kind, source });
  };
  const asList = (value) => (Array.isArray(value) ? value : []);
  const fieldOf = (item, keys) => {
    if (!item || typeof item !== 'object') return '';
    for (const k of keys) {
      if (typeof item[k] === 'string' && item[k].trim()) return item[k].trim();
    }
    return '';
  };

  if (type === 'ip' || type === 'domain') {
    const rec = type === 'ip'
      ? pickRecord((byId.get('ip_query') || {}).data, indicator)
      : pickRecord((byId.get('domain_query') || {}).data, indicator);
    const judged = asList(rec.judgments).map(String).join(' ');
    if (/C2|C&C|远控|命令与控制|Botnet|僵尸/.test(judged)) {
      push(indicator, type === 'ip' ? 'IP' : 'Domain', '情报判定为远控');
    }
  }

  if (type === 'sha256' || type === 'sha1' || type === 'md5') {
    const rep = (byId.get('file_report') || {}).data || {};
    const malicious = /恶意|木马|Trojan|Backdoor|Ransom|远控/.test(String((rep.summary || {}).threat_level || ''));
    if (malicious) {
      const net = rep.network || {};
      for (const d of asList(net.domains)) push(typeof d === 'string' ? d : fieldOf(d, ['domain', 'host', 'name']), 'Domain', '样本网络行为');
      for (const h of asList(net.hosts)) push(typeof h === 'string' ? h : fieldOf(h, ['ip', 'host']), 'IP', '样本网络行为');
      for (const u of asList(net.http)) push(typeof u === 'string' ? u : fieldOf(u, ['url', 'uri']), 'URL', '样本网络行为');
    }
  }

  if (type === 'url') {
    const lastOk = [...results].reverse().find((r) => r.id.startsWith('url_report') && r.ok && r.data);
    const d = (lastOk && lastOk.data) || {};
    const level = String(d.threat_level || '');
    if (/恶意|钓鱼|木马/.test(level) && d.details && d.details.ip) push(d.details.ip, 'IP', 'URL 解析目标');
  }

  return out;
}


// 每类指标「能定性」所依赖的接口；部分账号只有其中一部分权限
const KEY_ENDPOINTS = {
  ip: ['ip_query', 'ip_reputation'],
  domain: ['domain_query', 'scene_ioc'],
  sha256: ['file_report', 'file_multiengines'],
  sha1: ['file_report', 'file_multiengines'],
  md5: ['file_report', 'file_multiengines'],
  url: ['url_report'],
  vuln: ['vuln'],
};

function isDenied(result) {
  if (!result) return false;
  if (result.ok === false) return true;
  return typeof result.code === 'number' && result.code < 0;
}

function endpointStatus(type, results) {
  const byId = new Map(results.map((r) => [r.id, r]));
  const keys = KEY_ENDPOINTS[type] || [];
  const entries = keys.map((id) => ({ id, result: byId.get(id) || null }));
  const usable = entries.filter((x) => x.result && !isDenied(x.result));
  const denied = entries.filter((x) => isDenied(x.result));
  return {
    allDenied: entries.length > 0 && usable.length === 0 && denied.length === entries.length,
    noneUsable: usable.length === 0,
    usable: usable.map((x) => x.result.label || x.id),
    denied: denied.map((x) => (x.result && x.result.label) || x.id),
  };
}

function analysisHints(type, indicator, results) {
  const { facts, score, priority, riskLabel, ageDays, chain, status, undetermined } = scoreThreat(type, indicator, results);
  const lines = [];
  const strongHit = facts.judgments.some((j) => ['C2', 'C&C', '远控', '后门', '僵尸', '勒索'].some((k) => j.includes(k)));

  let level = 'D';
  if ((facts.engines && facts.engines.bad >= 5) || strongHit) level = 'A';
  else if (facts.isMalicious === true) level = 'A';
  else if ((facts.engines && facts.engines.bad >= 1) || score >= 30) level = 'B';
  else if (facts.isMalicious === false || (facts.engines && facts.engines.bad === 0)) level = 'C';

  if (facts.isMalicious === true) {
    const tags = facts.judgments.slice(0, 6).join('、');
    if (facts.verdictSource === 'engines') {
      const e = facts.engines || { bad: 0, total: 0 };
      lines.push(`多引擎共识判恶意：${e.bad}/${e.total} 报毒 (样本接口无权限，此结论来自多引擎而非微步单点判定)`);
    } else {
      lines.push(`微步判定：恶意 (is_malicious=true${facts.severity ? `，严重级别 ${facts.severity}` : ''}${facts.confidence ? `，可信度 ${facts.confidence}` : ''})${tags ? `；标签 ${tags}` : ''}`);
    }
  }

  const engineText = facts.engines ? `，多引擎 ${facts.engines.bad}/${facts.engines.total} 报毒` : '';
  const levelLabel = facts.verdictSource === 'engines' ? '多引擎共识' : riskLabel;
  lines.push(`证据等级 ${level}：${levelLabel}${engineText}`);

  if (undetermined) {
    lines.push('关键接口均未返回可用数据 (无权限或调用失败)：本次只能算「无法判定」，不能据此认为该指标安全或低危');
    lines.push('补齐权限后可重新查询；如账号确实没有该类型权限，请改用其他情报源交叉验证');
  } else {
    lines.push(`综合评分 ${score}/100，落在 ${priority}；只按情报面打分，告警级别与资产价值没算进去`);
  }
  if (status.denied.length && !undetermined) lines.push(`判定来源：${status.usable.join('、') || '无'}；无权限：${status.denied.join('、')}`);

  if (chain) lines.push(`所处链条位置：${chain.stage}，可对应 ATT&CK ${chain.techniques.join('、')}`);

  if (ageDays !== null) {
    const ttl = IOC_TTL_DAYS[type] || 30;
    lines.push(ageDays > ttl
      ? `情报 ${ageDays} 天没更新，已过 ${ttl} 天保鲜期：做批量扫描命中率低、误报会变多`
      : `情报 ${ageDays} 天前更新过，还在 ${ttl} 天保鲜期内`);
  }

  if (facts.scene && /IDC|CDN|Cloud|云/i.test(facts.scene)) {
    lines.push(`所属场景是 ${facts.scene}，多为共享主机：直接封禁可能连带影响同段业务`);
  }

  const c2 = extractC2(type, indicator, results);
  if (c2.length) {
    lines.push(`C2 通联 IOC (必须写进结论与封禁清单)：${c2.map((x) => `${x.value} (${x.kind})`).join('、')}`);
  }

  const failed = results.filter((r) => !r.ok || (typeof r.code === 'number' && r.code !== 0 && r.code !== 2 && r.code !== 3 && r.code !== 4));
  if (failed.length) lines.push(`这些接口没取到数据，判断可能偏窄：${failed.map((r) => r.label).join('、')}`);

  if (type === 'domain') {
    const rec = pickRecord((byIdOf(results).get('domain_query') || {}).data, indicator);
    if (Array.isArray(rec.cur_ips) && rec.cur_ips.length === 0) lines.push('当前查不到解析记录：可能已下线、停放或由 DGA 生成');
  }
  return lines;
}

function summaryPrompt(last) {
  if (!last) return '请用中文把刚才这次查询讲清楚：结论、能支撑结论的证据、该做什么，以及哪里还不确定。';
  const hints = Array.isArray(last.hints) && last.hints.length ? last.hints.join('\n') : '(无)';
  return [
    '你是值班的威胁情报分析师，正在给同事写一段可以直接贴进工单的研判。用中文，只讲报告里存在的东西，没有的字段不要补。',
    '',
    `指标：${last.indicator} (${last.kind || typeShort(last.type)})`,
    `报告：${last.markdownPath || '(未落盘，只能依据摘要)'}`,
    `查询时间：${last.at}`,
    '',
    '已识别到的 C2 通联 IOC：',
    Array.isArray(last.c2) && last.c2.length ? last.c2.map((x) => '- ' + x).join('\n') : '(无)',
    '',
    '文件里已有的摘要：',
    last.brief || last.digest || '(无)',
    '',
    '系统预先算好的判断依据：',
    hints,
    '',
    '按下面的顺序写，300-500 字：',
    '',
    '## 一、判断结论',
    '一句话说清它是什么性质 (恶意 / 可疑 / 无情报记录 / 需人工确认)、你的把握有多大、评分多少、建议多快处理。',
    '',
    '## 二、支撑证据',
    '挑 3-5 条真正影响处置决定的发现，每条后面注明数据来自哪个接口的哪个字段。凑数的、无关紧要的不要写。',
    '',
    '## 三、风险画像',
    '它在攻击链条里处于什么位置；如果这个指标已经和内网有往来，最坏会发展成什么 (横向、外传、加密、被当中转)；能对上的 ATT&CK 编号，对不上就别硬写。',
    '',
    '## 四、行动建议',
    '分网络、主机、账号三行来写，没有该类动作就写「无」，不要为了凑格式编动作。每条都要说明依据。',
    '',
    '## 五、误报判断',
    '说什么条件下可以当误报放行；如果是 IDC、CDN 这类共享环境，说清封禁会带来什么业务代价。',
    '',
    '## 六、需要人工拍板的事',
    '列 2-4 条待办 (- [ ] 开头)，每条都要能让人明确回答是或否、或者是哪个系统。',
    '',
    '几条底线：',
    '- 如果研判提示里写明关键接口无权限或「无法判定」，结论必须写「权限不足，无法判定」，并说明缺哪些接口；不能写成「无情报记录」或「低危」。',
    '- 反过来，部分接口缺失但已有可用的判定时，以可用的判定为准，把缺失接口作为把握度的扣减项说明即可。',
    '- 微步的判定优先于你的推演：只要报告里出现 is_malicious=true、severity 高，或证据等级为 A，结论就必须是「恶意」或「可疑」，评分不得低于 45；这时候不能写「无情报记录」或「低危」。',
    '- 反过来，只有当我们自己算出的评分低于微步的判定强度时，以微步为准，并在结论里说明评分未充分反映该判定。',
    '- 情报的判定和你的推演分开写，你自己推出来的一律加 (推断)。',
    '- 查不到记录不等于安全，别用「安全」给无记录指标下结论。',
    '- 不要把 JSON 抄进来，也不要写「根据提供的信息」这类空话。',
    '- 指标名称统一写 IP / Domain / Hash / URL / CVE。',
    '- 证据等级是 D 时，结论只能是「无情报记录」，并讲清还缺哪类旁证。',
    '- 评分低于 30 时，行动建议里必须留「先观察、暂不处置」这一档。',
    '- 报告里有样本行为或家族时，补 1-3 个 ATT&CK 编号并说明它对应什么行为。',
    '- 如果上面列出了 C2 通联 IOC，必须在结论里点名，并在行动建议里给出逐条的封禁 / 拦截清单；不允许把 C2 埋在证据段落里。',
  ].join('\n');
}

// ---------------------------------------------------------------- 落盘

function slug(text) {
  return String(text).replace(/[^\w.-]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 80) || 'indicator';
}

function localTime() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function stamp() {
  return localTime().replace(/[: ]/g, '-');
}

/**
 * 只允许操作本插件自己产出的报告 (位于 threatbook-reports/ 目录内)。
 * 用于 open-report / open-folder 两个动作，避免被诱导打开任意路径。
 * @param value 待校验路径
 * @param kind 'file' 只接受 .md/.json 文件；'dir' 只接受目录
 * @returns 规范化后的绝对路径，非法时返回 null
 */
function reportPathWithin(value, kind) {
  const raw = String(value || '').trim();
  if (!raw) return null;
  const target = path.resolve(raw);
  const segments = target.split(/[\\/]/).filter(Boolean);
  if (!segments.includes(REPORT_DIR_NAME)) return null;
  let stat;
  try {
    stat = fs.statSync(target);
  } catch {
    return null;
  }
  if (kind === 'file') {
    return stat.isFile() && /\.(md|json)$/i.test(target) ? target : null;
  }
  return stat.isDirectory() ? target : null;
}

function renderValue(value, depth = 0) {
  const pad = '  '.repeat(depth);
  if (value === null || value === undefined) return `${pad}- —`;
  if (Array.isArray(value)) {
    if (!value.length) return `${pad}- (空)`;
    if (depth >= 6) return `${pad}- [${value.length} 项已省略]`;
    return value.slice(0, 60).map((v, i) => {
      if (v !== null && typeof v === 'object') return `${pad}- [#${i + 1}]\n${renderValue(v, depth + 1)}`;
      return `${pad}- ${String(v)}`;
    }).join('\n');
  }
  if (typeof value === 'object') {
    if (depth >= 6) return `${pad}- {对象已省略}`;
    return Object.entries(value).map(([k, v]) => {
      if (v !== null && typeof v === 'object') return `${pad}- ${k}:\n${renderValue(v, depth + 1)}`;
      return `${pad}- ${k}: ${String(v)}`;
    }).join('\n');
  }
  return `${pad}- ${String(value)}`;
}

function mdReport({ type, indicator, at, results, digest, jsonPath, c2 }) {
  const head = [
    `# 微步情报报告：${indicator}`,
    '',
    `- 指标类型：${typeLabel(type)}`,
    `- 查询时间：${at}`,
    `- 数据来源：微步在线云 API (https://api.threatbook.cn/v3)`,
    `- 原始数据：\`${jsonPath}\``,
    `- 接口数量：${results.length}`,
    '',
    '## 结论速读',
    '',
    digest,
    '',
    ...(Array.isArray(c2) && c2.length
      ? ['## C2 通联 IOC', '', ...c2.map((x) => `- ${x.value} (${x.kind}) — 来源：${x.source}`), '', '> 封禁与排查优先使用以上地址；若为样本网络行为，需结合流量日志确认实际通联。', '']
      : []),
    '## 接口明细',
    '',
  ];
  const sections = results.map((r, index) => {
    const body = r.data === null || r.data === undefined ? '(无 data)' : JSON.stringify(r.data, null, 2);
    const trimmed = body.length > 400000 ? `${body.slice(0, 400000)}\n…(已截断，完整内容见原始 JSON)` : body;
    return [
      `### ${index + 1}. ${r.label} \`${r.endpoint}\``,
      '',
      `- response_code：${r.code}`,
      `- verbose_msg：${r.msg || '—'}`,
      '',
      '```json',
      trimmed,
      '```',
      '',
    ].join('\n');
  });
  return [...head, ...sections].join('\n');
}

function writeReports({ type, indicator, at, results, digest, dir, c2 }) {
  const outDir = path.join(dir, REPORT_DIR_NAME);
  fs.mkdirSync(outDir, { recursive: true });
  const base = `${type}-${slug(indicator)}-${stamp()}`;
  const jsonPath = path.join(outDir, `${base}.json`);
  const mdPath = path.join(outDir, `${base}.md`);
  const payload = {
    plugin: PLUGIN_ID,
    indicator,
    type,
    queriedAt: at,
    endpoints: results.map((r) => ({ id: r.id, label: r.label, endpoint: r.endpoint, response_code: r.code, verbose_msg: r.msg, ok: r.ok })),
    results: Object.fromEntries(results.map((r) => [r.id, { endpoint: r.endpoint, response_code: r.code, verbose_msg: r.msg, ok: r.ok, data: r.data }])),
  };
  fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 2), 'utf8');
  let markdown;
  try {
    markdown = mdReport({ type, indicator, at, results, digest, jsonPath, c2 });
  } catch {
    markdown = `# 微步情报报告：${indicator}\n\n- 类型：${typeLabel(type)}\n- 时间：${at}\n\n${digest}\n`;
  }
  fs.writeFileSync(mdPath, markdown, 'utf8');
  return { jsonPath, mdPath, outDir };
}

// ---------------------------------------------------------------- 浏览器打开

function openExternal(url) {
  try {
    if (process.platform === 'win32') {
      spawn('cmd.exe', ['/c', 'start', '""', url], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
    } else if (process.platform === 'darwin') {
      spawn('open', [url], { detached: true, stdio: 'ignore' }).unref();
    } else {
      spawn('xdg-open', [url], { detached: true, stdio: 'ignore' }).unref();
    }
    return true;
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------- 状态与校验

async function statePayload() {
  const key = readKey();
  const egress = await probeEgress(false);
  return {
    plugin: PLUGIN_ID,
    host: os.hostname(),
    platform: `${process.platform} ${process.arch}`,
    ips: localAddresses(),
    egress,
    key: { configured: Boolean(key), masked: key ? maskKey(key.apikey) : '', savedAt: key ? key.savedAt : null, file: keyFile() },
    bindingUrl: BIND_URL,
    reportDirName: REPORT_DIR_NAME,
    lastLookup: state.last,
    autoOpenedAt: state.autoOpenedAt,
    permissions: permissionSummary(),
  };
}

function failureHint(message) {
  const text = String(message || '');
  if (/Invalid Access IP|无效的访问\s*IP|无效 IP/i.test(text)) {
    return `本机出口 IP 不在该 Key 的白名单里：复制面板里的出口 IP，到 ${BIND_URL} 的「我的 KEY」中添加后再试。`;
  }
  if (/Invalid API Key|Incorrect API key|无效的\s*API\s*key/i.test(text)) {
    return 'API Key 无效或已重置：请重新粘贴 Key (面板或设置页 → 微步情报)。';
  }
  if (/Expired API Key|Key 过期/i.test(text)) {
    return 'API Key 已过期，需要续期后重新保存。';
  }
  if (/No Access to API Method|没有访问接口权限/i.test(text)) {
    return '该 Key 未开通这几个接口的权限 (个人账号默认只有 IP 信誉 / 失陷检测 / 文件相关额度)。';
  }
  if (/Frequent Limitation|频率/i.test(text)) {
    return '触发频率限制，稍等 1 分钟后重试。';
  }
  if (/Beyond Daily|Beyond Monthly|超出.*限制/i.test(text)) {
    return '授权配额已用尽，等下一个计费周期或联系微步扩容。';
  }
  if (/超时|timeout|ECONN|ENOTFOUND|socket hang up/i.test(text)) {
    return '网络无法到达 api.threatbook.cn，检查代理/白名单策略后重试。';
  }
  return '可在「设置 → 微步情报」里点「测试连通性」定位是 Key、IP 白名单还是权限问题。';
}

async function verifyKey() {
  const key = readKey();
  if (!key) return { ok: false, kind: 'no-key', message: '尚未配置 API Key。' };
  try {
    const res = await tbRequest('/scene/ip_reputation', { resource: '8.8.8.8', lang: 'zh' });
    if (res.code === 0 || res.code === 1 || res.code === 2 || res.code === 3) {
      return { ok: true, kind: 'ok', message: 'Key 可用，IP 白名单与接口权限均正常。', responseCode: res.code };
    }
    const merged = `${res.code} ${res.msg}`;
    let kind = 'api';
    if (/Invalid Access IP|无效的访问\s*IP/i.test(res.msg)) kind = 'whitelist';
    else if (/Invalid API Key|无效的\s*API\s*key/i.test(res.msg)) kind = 'key';
    else if (/No Access to API Method|没有访问接口权限/i.test(res.msg)) kind = 'permission';
    return { ok: false, kind, message: `${merged} —— ${failureHint(res.msg)}`, responseCode: res.code };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    let kind = 'network';
    if (/Invalid Access IP|无效的访问\s*IP/i.test(message)) kind = 'whitelist';
    else if (/Invalid API Key|无效的\s*API\s*key/i.test(message)) kind = 'key';
    else if (/No Access to API Method/i.test(message)) kind = 'permission';
    return { ok: false, kind, message: `${message} —— ${failureHint(message)}` };
  }
}

// ---------------------------------------------------------------- Host 插件入口

export const inject = ['tools'];

export function apply(ctx) {
  // 启动即探测一次公网出口 IP(不阻塞激活；失败会在面板上显示原因)
  probeEgress(true).catch(() => {});

  function resolveDir(agent) {
    try {
      const workingDirectory = ctx.get('workingDirectory');
      if (workingDirectory && agent && agent.session) return workingDirectory.get(agent.session);
    } catch { /* 退回到进程目录 */ }
    return process.cwd();
  }

  // ---- 本机 UI 路由 (webServer 可选：缺它时插件仍以工具形式工作)
  ctx.effect(() => ctx.inject(['webServer'], (webCtx) => {
    const web = webCtx.webServer;
    const route = (routePath, handler) => webCtx.effect(
      () => web.register({ kind: 'exact', path: routePath, handler }),
      `threatbook: ${routePath}`,
    );

    /**
     * 本机路由的可信校验：只接受来自 DSH 已授权浏览器的请求。
     * connection 服务缺失时 (非 Web 载体) 不做拦截，保持原有能力。
     */
    const rejectUntrusted = (req, res) => {
      const connection = ctx.get('connection');
      if (!connection || typeof connection.requestRejection !== 'function') return false;
      let rejection;
      try {
        rejection = connection.requestRejection(req);
      } catch {
        rejection = 403;
      }
      if (rejection === undefined) return false;
      res.statusCode = rejection;
      res.setHeader('cache-control', 'no-store');
      res.end();
      return true;
    };

    route('/threatbook/state', async (req, res) => {
      if (rejectUntrusted(req, res)) return;
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        sendJson(res, 405, { error: '只支持 GET' });
        return;
      }
      try {
        sendJson(res, 200, await statePayload());
      } catch (error) {
        sendJson(res, 500, { error: error instanceof Error ? error.message : String(error) });
      }
    });

    route('/threatbook/action', async (req, res) => {
      if (rejectUntrusted(req, res)) return;
      if (req.method !== 'POST') {
        sendJson(res, 405, { error: '只支持 POST' });
        return;
      }
      const essence = String(req.headers['content-type'] || '').split(';', 1)[0].trim().toLowerCase();
      if (essence !== 'application/json') {
        sendJson(res, 415, { error: 'content-type 必须是 application/json' });
        return;
      }
      let body;
      try {
        body = JSON.parse(await readBody(req, 32 * 1024));
      } catch {
        sendJson(res, 400, { error: '请求体不是合法 JSON' });
        return;
      }
      const action = body && body.action;
      try {
        if (action === 'save-key') {
          const apikey = String(body.apikey || '').trim();
          if (!/^[A-Za-z0-9_-]{8,256}$/.test(apikey)) {
            sendJson(res, 400, { error: 'API Key 格式不正确 (应为 8-256 位字母、数字、下划线或短横线)' });
            return;
          }
          writeKey(apikey);
        } else if (action === 'clear-key') {
          clearKey();
          state.last = null;
        } else if (action === 'open-binding') {
          openExternal(BIND_URL);
        } else if (action === 'open-binding-auto') {
          const already = state.autoOpenedAt > 0;
          if (!readKey() && !already) {
            state.autoOpenedAt = Date.now();
            openExternal(BIND_URL);
          }
        } else if (action === 'open-report') {
          const target = reportPathWithin(body.path, 'file');
          if (!target) {
            sendJson(res, 400, { error: '报告路径无效或文件不存在' });
            return;
          }
          openExternal(target);
        } else if (action === 'open-folder') {
          const dir = reportPathWithin(body.path, 'dir');
          if (!dir) {
            sendJson(res, 400, { error: '目录无效或不存在' });
            return;
          }
          openExternal(dir);
        } else if (action === 'refresh-egress') {
          await probeEgress(true);
        } else if (action === 'summarize') {
          const sessionId = String(body.sessionId || '');
          const agents = ctx.get('agents');
          const agent = agents && sessionId ? agents.get(sessionId) : undefined;
          if (!agent) {
            sendJson(res, 400, { error: '找不到当前会话，无法自动触发总结 (刷新页面后重试)' });
            return;
          }
          const prompt = summaryPrompt(state.last);
          // 与 host 侧 createUserMessage 保持一致：UUID 身份 + 冻结的不可变消息
          agent.followup(Object.freeze({
            id: randomUUID(),
            role: 'user',
            content: Object.freeze([Object.freeze({ type: 'text', text: prompt })]),
            source: Object.freeze({ kind: 'user' }),
          }));
        } else if (action === 'verify') {
          const result = await verifyKey();
          sendJson(res, 200, { ok: result.ok, verify: result, state: await statePayload() });
          return;
        } else {
          sendJson(res, 400, { error: `未知操作：${String(action)}` });
          return;
        }
        sendJson(res, 200, { ok: true, state: await statePayload() });
      } catch (error) {
        sendJson(res, 500, { ok: false, error: error instanceof Error ? error.message : String(error) });
      }
    });
  }), 'threatbook: ui routes');

  // ---- 工具：查询
  ctx.effect(() => ctx.tools.register({
    name: 'threatbook_lookup',
    description: [
      'Query 微步在线 (ThreatBook) threat intelligence for ONE indicator: IPv4/IPv6, domain, file hash (MD5/SHA1/SHA256), URL, or vulnerability id (CVE/XVE/CNVD/CNNVD/...).',
      'Auto-detects the type and runs the FULL endpoint set (IP: ip/query + reputation + adv; domain: domain/query + adv + sub_domains + IOC + context; hash: file/report all sections + multiengines; URL: url/report with auto scan; vuln: /vuln). Raw JSON plus a complete Markdown report are written to the workspace threatbook-reports/ and their paths returned.',
      'Use it whenever the user pastes such an indicator, even without an explicit instruction.',
      'The result already carries a 研判提示 block: evidence grade, a 0-100 score mapped to P0-P3, where it sits in an attack chain, matching ATT&CK ids, how fresh the intelligence is, and which endpoints failed. Reuse those values instead of inventing your own.',
      'Reply in Chinese, in the order a colleague would read it: what the indicator is and how sure you are; the few findings that actually change the decision, each tagged with the endpoint it came from; what it would mean if it were already talking to internal assets; what to do split by network / host / account; when you would call it a false positive; and last what a human still has to decide.',
      'Ground rules: a missing record is not a clean bill of health; anything you inferred yourself must be marked (推断); say how old the intelligence is when the verdict leans on it; name any endpoint that failed; if the score lands in P3, always offer a monitor-only option; keep raw JSON out of the answer.',
      'If the data names C2 endpoints (a C2 server IP, domain or URL, e.g. the C2 of a trojan), surface them prominently: state them in the verdict and give an explicit block list in the actions, never bury them inside the evidence list.',
      'End with one short line offering: (1) AI 总结, (2) 完整 MD 报告路径, (3) 深入某个字段。',
    ].join(' '),
    parameters: {
      type: 'object',
      additionalProperties: false,
      required: ['indicator'],
      properties: {
        indicator: {
          type: 'string',
          description: 'The single indicator to look up: IP, domain, MD5/SHA1/SHA256, URL, or CVE/XVE/CNVD id. Defanged forms such as hxxp://evil[.]com are normalized automatically.',
        },
        note: {
          type: 'string',
          description: 'Optional short context (e.g. "from email attachment") recorded in the report header.',
        },
      },
    },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        required: ['ok', 'type', 'indicator', 'text'],
        properties: {
          ok: { type: 'boolean' },
          type: { type: 'string' },
          indicator: { type: 'string' },
          text: { type: 'string' },
          markdownPath: { type: 'string' },
          jsonPath: { type: 'string' },
        },
      },
      render: (_args, value) => [{ type: 'text', text: value && value.text ? value.text : '微步查询完成。' }],
    },
    timeoutMs: 240000,
    execute: async (args, exec) => {
      const raw = args && typeof args.indicator === 'string' ? args.indicator : '';
      const indicator = normalizeIndicator(raw);
      const type = detectType(indicator);
      const at = localTime();

      if (!indicator) return { ok: false, type: 'unknown', indicator: '', text: '没有解析出有效指标。' };
      if (type === 'unknown') {
        return {
          ok: false,
          type: 'unknown',
          indicator,
          text: `无法识别「${indicator}」的类型。支持 IPv4/IPv6、域名、MD5/SHA1/SHA256、URL、CVE/XVE/CNVD 等漏洞编号。`,
        };
      }

      const key = readKey();
      if (!key) {
        return {
          ok: false,
          type,
          indicator,
          text: [
            '还没有配置微步 API Key，未发起查询。',
            `请让用户在「微步情报」面板 (输入框下方) 或「设置 → 微步情报」中粘贴 Key 并保存；保存只写入本机文件 ${keyFile()}，不会上传。`,
            `绑定入口：${BIND_URL}(需要先把本机出口 IP 加入白名单)。`,
          ].join('\n'),
        };
      }

      let results;
      let skippedEndpoints = [];
      try {
        if (type === 'url') {
          results = await runUrlFlow(indicator);
        } else {
          const plan = planFor(type, indicator);
          const planParts = splitPlan(plan);
          skippedEndpoints = planParts.skipped.map((job) => job.label);
          results = await Promise.all(planParts.runnable.map((job) => runJob(job)));
        }
      } catch (error) {
        return {
          ok: false,
          type,
          indicator,
          text: `查询失败：${error instanceof Error ? error.message : String(error)}`,
        };
      }

      const failedAll = results.length === 0
        || results.every((r) => !r.ok || (typeof r.code === 'number' && r.code < 0));
      if (failedAll) {
        const messages = [...new Set(results.map((r) => String(r.msg || '').trim()).filter(Boolean))].slice(0, 3);
        const joined = messages.join('；') || '未知错误 (所有接口均未返回可用数据)';
        const denied = results.length > 0 && results.every((r) => isDenied(r));
        const headline = denied
          ? `该类型接口均无权限：${indicator}(${typeLabel(type)})`
          : `微步查询未成功：${indicator}(${typeLabel(type)})`;
        const advice = denied
          ? '当前 API Key 没有该类型的查询权限，请在控制台确认后重试；无权限不等于该指标安全。'
          : failureHint(joined);
        return { ok: false, type, indicator, text: `${headline}\n${joined}\n\n${advice}` };
      }

      const digest = summarize(type, indicator, results);
      const grade = scoreThreat(type, indicator, results);
      const c2 = extractC2(type, indicator, results);
      const c2Line = c2.length ? `\n- C2 通联 IOC：${c2.map((x) => `${x.value} (${x.kind})`).join('、')}` : '';
      const brief = `${digestBrief(type, indicator, results)}\n- 威胁评分：${grade.score}/100 (${grade.priority})${c2Line}`;
      const dir = resolveDir(exec && exec.agent);
      let files;
      try {
        files = writeReports({ type, indicator, at, results, digest, dir, c2 });
      } catch (error) {
        files = null;
        digest += `\n\n> 报告落盘失败：${error instanceof Error ? error.message : String(error)}`;
      }

      const endpointLines = results
        .map((r) => `  · ${r.label}: code=${r.code}${r.msg ? ` ${String(r.msg).slice(0, 60)}` : ''}`)
        .join('\n');

      const hints = analysisHints(type, indicator, results);
      if (skippedEndpoints.length) {
        hints.push(`已跳过本次会话中确认无权限的接口：${skippedEndpoints.join('、')} (重启 DSH 后会重新尝试)`);
      }
      const text = [
        `微步情报查询：${indicator}(${typeLabel(type)})`,
        digest,
        '',
        '研判提示 (回答时请据此组织，不要直接照搬)：',
        ...hints.map((h) => `  · ${h}`),
        '',
        '接口执行情况：',
        endpointLines,
        '',
        files ? `完整原始数据：${files.jsonPath}` : '完整原始数据：未落盘',
        files ? `完整 Markdown 报告：${files.mdPath}` : '完整 Markdown 报告：未落盘',
        '',
        '可选下一步 (问用户想要哪一个)：① 我直接做简要总结；② 打开/给出完整 MD 报告；③ 深入某个字段或多接口互证。',
      ].join('\n');

      state.last = {
        indicator,
        type,
        at,
        markdownPath: files ? files.mdPath : null,
        jsonPath: files ? files.jsonPath : null,
        reportDir: files ? files.outDir : null,
        kind: typeShort(type),
        brief,
        hints,
        score: grade.score,
        priority: grade.priority,
        c2: c2.map((x) => `${x.value} (${x.kind})`),
        digest,
      };

      return {
        ok: true,
        type,
        indicator,
        text,
        ...(files ? { markdownPath: files.mdPath, jsonPath: files.jsonPath } : {}),
      };
    },
  }), 'threatbook: lookup tool');

  // ---- 工具：状态
  ctx.effect(() => ctx.tools.register({
    name: 'threatbook_status',
    description: 'Show this machine\'s local/egress IP addresses, whether a 微步 (ThreatBook) API key is configured locally, the key-binding URL and steps, and the most recent lookup. Use when the user asks about their IP, key binding, or threat-intel setup.',
    parameters: { type: 'object', additionalProperties: false, properties: {} },
    output: {
      schema: {
        type: 'object',
        additionalProperties: false,
        required: ['text'],
        properties: { text: { type: 'string' } },
      },
      render: (_args, value) => [{ type: 'text', text: value && value.text ? value.text : '微步情报状态。' }],
    },
    execute: async () => {
      let payload;
      try {
        payload = await statePayload();
      } catch (error) {
        return { text: `读取状态失败：${error instanceof Error ? error.message : String(error)}` };
      }
      const v4 = payload.ips.filter((x) => x.family === 'IPv4');
      const lines = [
        `本机名：${payload.host}(${payload.platform})`,
        `本机 IPv4：${v4.length ? v4.map((x) => `${x.address} (${x.iface})`).join('；') : '无'}`,
        `公网出口 IP：${payload.egress && payload.egress.ip ? payload.egress.ip : '未探测到'}${payload.egress && payload.egress.error ? `(探测错误：${payload.egress.error})` : ''}`,
        `API Key: ${payload.key.configured ? payload.key.masked : '未配置'}`,
        `Key 文件：${payload.key.file}(仅本地，不上传)`,
        `绑定地址：${payload.bindingUrl}`,
        '绑定步骤：登录微步 X 情报中心 → 我的 KEY → 把上面的公网出口 IP 加入白名单 → 复制 API Key → 在插件面板粘贴并保存。',
        payload.lastLookup ? `最近查询：${payload.lastLookup.indicator}(${payload.lastLookup.type})@ ${payload.lastLookup.at}\n  MD: ${payload.lastLookup.markdownPath}` : '最近查询：无',
      ];
      return { text: lines.join('\n') };
    },
  }), 'threatbook: status tool');

  // ---- 提示词：只在缺少 Key 时提醒模型主动引导
  ctx.effect(() => ctx.inject(['systemPrompt'], (promptCtx) => promptCtx.systemPrompt.section({
    name: 'threatbook-intel',
    order: 620,
    text: () => {
      const key = readKey();
      if (key) {
        return '微步情报插件已就绪 (API Key 已保存在本机)。用户贴出 IP / 域名 / Hash / URL / CVE 时，直接调用 threatbook_lookup；结果里已包含完整报告路径。';
      }
      const egress = state.egress && state.egress.ip ? state.egress.ip : null;
      const ipText = egress ? `本机公网出口 IP 为 ${egress}。` : '本机公网出口 IP 尚未探测到。';
      return `微步情报插件尚未配置 API Key。${ipText}需要提一嘴：先去 ${BIND_URL} 把该 IP 绑定到「我的 KEY」，再到输入框下方的「微步情报」面板粘贴 Key 保存 (只存本机)。用户贴情报指标但没配 Key 时，说明这一步即可，不要反复追问。`;
    },
  })), 'threatbook: prompt hint');
}

// ---------------------------------------------------------------- HTTP 辅助

function sendJson(res, status, payload) {
  const text = JSON.stringify(payload);
  res.statusCode = status;
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  res.end(text);
}

function readBody(req, limit) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error('请求体过大'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}
