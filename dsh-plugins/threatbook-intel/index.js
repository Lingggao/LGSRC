/**
 * 微步在线（ThreatBook）情报插件 — Host 半边。
 *
 * 职责：
 *  1. 读取本机 IP / 公网出口 IP，供 UI 复制后到「我的 KEY」绑定；
 *  2. API Key 只写入本机文件（默认 profile 目录），不上传任何云端；
 *  3. 判断输入类别（IP / 域名 / Hash / URL / 漏洞编号），对每类执行“尽量全”的接口组合；
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

/** 进程内派生状态（不是权威数据：Key 以文件为准，查询结果以落盘文件为准）。 */
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
    const error = new Error('尚未配置微步 API Key：请在「微步情报」面板或设置页粘贴 Key 并保存（Key 只写入本机文件）。');
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
    req.on('timeout', () => req.destroy(new Error(`请求 ${endpoint} 超时（${timeoutMs}ms）`)));
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
        { id: 'ip_reputation', label: 'IP 信誉（入站）', endpoint: '/scene/ip_reputation', params: { resource: indicator, lang: 'zh' } },
        { id: 'ip_adv_query', label: 'IP 高级查询（反查域名）', endpoint: '/ip/adv_query', params: { resource: indicator, lang: 'zh' } },
      ];
    case 'domain':
      return [
        { id: 'domain_query', label: '域名分析', endpoint: '/domain/query', params: { resource: indicator, lang: 'zh' } },
        { id: 'domain_adv_query', label: '域名高级查询（历史）', endpoint: '/domain/adv_query', params: { resource: indicator, lang: 'zh' } },
        { id: 'sub_domains', label: '子域名查询', endpoint: '/domain/sub_domains', params: { resource: indicator, lang: 'zh' } },
        { id: 'scene_ioc', label: '失陷检测（出站）', endpoint: '/scene/ioc', params: { resource: indicator, lang: 'zh' } },
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

async function runJob(job) {
  try {
    const res = await tbRequest(job.endpoint, job.params);
    return { id: job.id, label: job.label, endpoint: job.endpoint, ok: true, code: res.code, msg: res.msg, data: res.data };
  } catch (error) {
    return {
      id: job.id, label: job.label, endpoint: job.endpoint, ok: false,
      code: -1, msg: error instanceof Error ? error.message : String(error), data: null,
    };
  }
}

async function runUrlFlow(indicator) {
  const first = await runJob({ id: 'url_report', label: 'URL 信誉报告', endpoint: '/url/report', params: { url: indicator } });
  const results = [first];
  const lacking = !first.ok || first.code === 2 || first.code === 4 || first.code === 6 || !first.data;
  if (!lacking) return results;
  const scan = await runJob({ id: 'url_scan', label: '提交 URL 分析', endpoint: '/url/scan', params: { url: indicator } });
  results.push(scan);
  if (!scan.ok) return results;
  for (let i = 0; i < 5; i += 1) {
    await new Promise((r) => setTimeout(r, 4000));
    const retry = await runJob({ id: 'url_report_retry', label: `URL 信誉报告（第 ${i + 2} 次）`, endpoint: '/url/report', params: { url: indicator } });
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
    push('ASN', rec && rec.asn ? `AS${rec.asn.number} ${rec.asn.info || ''}（风险值 ${rec.asn.rank}）` : '');
    push('应用场景', rec && rec.scene);
    push('情报条数', (() => {
      const c = intelCounts(rec);
      return `微步 ${c.tb}（有效 ${c.valid}）/ X奖励 ${c.reward} / 开源 ${c.os}`;
    })());
    push('关联样本', Array.isArray(rec.samples) ? `${rec.samples.length} 条；最高检出 ${fmtList(rec.samples.map((s) => s.ratio), 3)}；家族 ${fmtList(rec.samples.map((s) => s.malware_family), 4)}` : '');
    push('开放端口', Array.isArray(rec.ports) ? `${rec.ports.length} 个（${fmtList(rec.ports.map((p) => p.port), 10)}）` : '');
    push('SSL 证书', Array.isArray(rec.cas) ? `${rec.cas.length} 张` : '');
    push('反查域名数', rec.sum_cur_domains);
    push('反向 DNS', fmtList((rec.rdns_list || []).map((r) => r.rdns), 5));
    push('情报更新时间', rec.update_time);
    push('IP 信誉（入站）', rep.is_malicious === undefined ? '' : `恶意=${rep.is_malicious} 可信度=${rep.confidence_level || '—'} 严重级别=${rep.severity || '—'} 判定=${fmtList(rep.judgments, 8)}`);
    push('历史反查域名', adv.history_domains ? `${Object.keys(adv.history_domains).length} 个日期分组；当前指向 ${fmtList(adv.cur_domains, 6)}` : '');
    push('X 详情页', rec.permalink);
  } else if (type === 'domain') {
    const rec = pickRecord((byId.get('domain_query') || {}).data, indicator);
    const adv = ((byId.get('domain_adv_query') || {}).data) || {};
    const sub = ((byId.get('sub_domains') || {}).data) || {};
    const ctx = ((byId.get('domain_context') || {}).data || {})[indicator] || {};
    const ioc = pickRecord(((byId.get('scene_ioc') || {}).data || {}).domains, indicator);
    push('综合判定', fmtList(rec.judgments, 12));
    push('域名分类', fmtList((rec.categories && rec.categories.first_cats) || [], 6));
    push('情报条数', (() => { const c = intelCounts(rec); return `微步 ${c.tb}（有效 ${c.valid}）/ X奖励 ${c.reward} / 开源 ${c.os}`; })());
    push('解析 IP', Array.isArray(rec.cur_ips) ? `${rec.cur_ips.length} 个（${fmtList(rec.cur_ips.map((x) => x.ip), 6)}）` : '');
    push('Whois', rec.cur_whois ? `注册商 ${rec.cur_whois.registrar_name || '—'}；注册人 ${rec.cur_whois.registrant_name || '—'}；邮箱 ${rec.cur_whois.registrant_email || '—'}；注册时间 ${rec.cur_whois.cdate || '—'}；过期 ${rec.cur_whois.edate || '—'}` : '');
    push('备案', rec.icp ? `${rec.icp.company_name || '—'}（${rec.icp.company_type || '—'}）${rec.icp.site_license || ''}` : '');
    push('排名', rec.rank && rec.rank.alexa_rank ? `Alexa ${rec.rank.alexa_rank.global_rank}` : '');
    push('证书', Array.isArray(rec.cas) ? `${rec.cas.length} 张` : '');
    push('关联样本', Array.isArray(rec.samples) ? `${rec.samples.length} 条；家族 ${fmtList(rec.samples.map((s) => s.malware_family), 4)}` : '');
    push('子域名', sub.sub_domains ? `总计 ${sub.sub_domains.total}，本次返回 ${(sub.sub_domains.data || []).length} 个` : '');
    push('历史解析', Array.isArray(adv.history_ips) ? `${adv.history_ips.length} 个日期分组` : '');
    push('历史 Whois', Array.isArray(adv.history_whoises) ? `${adv.history_whoises.length} 条` : '');
    push('失陷检测（出站）', ioc.is_malicious === undefined ? '' : `恶意=${ioc.is_malicious} 可信度=${ioc.confidence_level || '—'} 判定=${fmtList(ioc.judgments, 8)}`);
    push('上下文关联样本', Array.isArray(ctx.context) ? `${ctx.context.length} 个` : '');
    push('取证建议', Array.isArray(ctx.forensics) && ctx.forensics.length ? `${ctx.forensics.length} 条` : '');
    push('X 详情页', rec.permalink);
  } else if (type === 'sha256' || type === 'sha1' || type === 'md5') {
    const rep = (byId.get('file_report') || {}).data || {};
    const s = rep.summary || {};
    const me = rep.multiengines || {};
    const multi = ((byId.get('file_multiengines') || {}).data || {}).multiengines || {};
    push('文件', `${s.file_name || '—'}（${s.file_type || '—'}）`);
    push('判定', `威胁等级=${s.threat_level || '—'} 类型=${s.malware_type || '—'} 家族=${s.malware_family || '—'} 评分=${s.threat_score === undefined ? '—' : s.threat_score} 白名单=${s.is_whitelist === undefined ? '—' : s.is_whitelist}`);
    push('Hash', `sha256=${s.sample_sha256 || indicator} md5=${s.md5 || '—'}`);
    push('检出率', me.result ? `${Object.values(me.result).filter((v) => v && v !== 'safe').length}/${Object.keys(me.result).length}（${me.scan_time || '—'}）` : (multi.positives !== undefined ? `${multi.positives}/${multi.total}（${multi.scan_date || '—'}）` : ''));
    push('多引擎可疑项', me.result ? fmtList(Object.entries(me.result).filter(([, v]) => v && v !== 'safe').map(([k, v]) => `${k}=${v}`), 6) : '');
    push('场景', fmtList(s.scenes, 6));
    push('静态标签', fmtList(s.tag && s.tag.s, 6));
    push('提交时间', s.submit_time);
    push('沙箱环境', s.sandbox_type ? `${s.sandbox_type}（成功环境 ${fmtList(s.sandbox_type_list, 3)}）` : '');
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
    push('URL 判定', `${d.threat_level || '—'}（引擎 ${hits.length}/${Object.keys(me).length} 检出）`);
    push('命中引擎', fmtList(hits.map(([k, v]) => `${k}=${v}`), 8));
    push('最终 URL', d.details && d.details.finalUrl);
    push('解析 IP / HTTP', d.details ? `${d.details.ip || '—'} / ${d.details.httpStatusCode || d.details.status || '—'}` : '');
    push('响应头', d.details && d.details.headers ? fmtList(Object.keys(d.details.headers), 6) : '');
    push('下载文件', d.sandbox ? `${d.sandbox.threat_level || '—'} ${d.sandbox.file_name || ''}（${d.sandbox.file_type || ''}）sha256=${d.sandbox.sample_sha256 || ''}` : '');
    push('历史下载文件', d.details && Array.isArray(d.details.historyScans) ? `${d.details.historyScans.length} 条` : '');
    push('扫描时间', d.details && d.details.lastSeen);
    push('X 报告', d.permalink);
  } else if (type === 'vuln') {
    const items = (((byId.get('vuln') || {}).data || {}).items) || [];
    if (!items.length) {
      push('结果', '未查询到该漏洞编号的情报（可能尚未收录或编号格式不支持）');
    } else {
      for (const it of items.slice(0, 5)) {
        const b = it.basic_info || {};
        const ev = it.evaluation || {};
        const vpt = ev.x_vpt || {};
        const cv = ev.cvss_v3 || {};
        const intel = it.intelligence || {};
        push('漏洞', `${b.xve_id || '—'} ${b.cve_id ? `(${b.cve_id})` : ''} ${b.vuln_name || ''}`);
        push('分类 / 平台', `${b.vuln_category || '—'} / ${fmtList(((it.impact || {}).platform), 4)}`);
        push('风险', `VPR ${vpt.vpr ?? '—'}（${vpt.risk_level || '—'}）CVSS3 ${cv.cvss_basic_score ?? '—'} ${cv.cvss_grade || ''}`);
        push('标签', fmtList(intel.tag, 10));
        push('利用情况', `在野利用=${intel.has_kev} 公开PoC=${intel.has_poc_public} 微步PoC=${intel.has_poc_threatbook} 有修复方案=${intel.has_solution}`);
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
 * 只允许操作本插件自己产出的报告（位于 threatbook-reports/ 目录内）。
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
    if (!value.length) return `${pad}- （空）`;
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

function mdReport({ type, indicator, at, results, digest, jsonPath }) {
  const head = [
    `# 微步情报报告：${indicator}`,
    '',
    `- 指标类型：${typeLabel(type)}`,
    `- 查询时间：${at}`,
    `- 数据来源：微步在线云 API（https://api.threatbook.cn/v3）`,
    `- 原始数据：\`${jsonPath}\``,
    `- 接口数量：${results.length}`,
    '',
    '## 结论速读',
    '',
    digest,
    '',
    '## 接口明细',
    '',
  ];
  const sections = results.map((r, index) => {
    const body = r.data === null || r.data === undefined ? '（无 data）' : JSON.stringify(r.data, null, 2);
    const trimmed = body.length > 400000 ? `${body.slice(0, 400000)}\n…（已截断，完整内容见原始 JSON）` : body;
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

function writeReports({ type, indicator, at, results, digest, dir }) {
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
    markdown = mdReport({ type, indicator, at, results, digest, jsonPath });
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
  };
}

function failureHint(message) {
  const text = String(message || '');
  if (/Invalid Access IP|无效的访问\s*IP|无效IP/i.test(text)) {
    return `本机出口 IP 不在该 Key 的白名单里：复制面板里的出口 IP，到 ${BIND_URL} 的「我的 KEY」中添加后再试。`;
  }
  if (/Invalid API Key|Incorrect API key|无效的\s*API\s*key/i.test(text)) {
    return 'API Key 无效或已重置：请重新粘贴 Key（面板或设置页 → 微步情报）。';
  }
  if (/Expired API Key|Key 过期/i.test(text)) {
    return 'API Key 已过期，需要续期后重新保存。';
  }
  if (/No Access to API Method|没有访问接口权限/i.test(text)) {
    return '该 Key 未开通这几个接口的权限（个人账号默认只有 IP 信誉 / 失陷检测 / 文件相关额度）。';
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
  // 启动即探测一次公网出口 IP（不阻塞激活；失败会在面板上显示原因）
  probeEgress(true).catch(() => {});

  function resolveDir(agent) {
    try {
      const workingDirectory = ctx.get('workingDirectory');
      if (workingDirectory && agent && agent.session) return workingDirectory.get(agent.session);
    } catch { /* 退回到进程目录 */ }
    return process.cwd();
  }

  // ---- 本机 UI 路由（webServer 可选：缺它时插件仍以工具形式工作）
  ctx.effect(() => ctx.inject(['webServer'], (webCtx) => {
    const web = webCtx.webServer;
    const route = (routePath, handler) => webCtx.effect(
      () => web.register({ kind: 'exact', path: routePath, handler }),
      `threatbook: ${routePath}`,
    );

    /**
     * 本机路由的可信校验：只接受来自 DSH 已授权浏览器的请求。
     * connection 服务缺失时（非 Web 载体）不做拦截，保持原有能力。
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
            sendJson(res, 400, { error: 'API Key 格式不正确（应为 8-256 位字母、数字、下划线或短横线）' });
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
            sendJson(res, 400, { error: '找不到当前会话，无法自动触发总结（刷新页面后重试）' });
            return;
          }
          const last = state.last;
          const prompt = last
            ? `请基于刚才 threatbook_lookup 的结果（${last.indicator}，类型 ${last.type}）用中文写一段简要总结：① 结论 ② 关键证据 ③ 处置建议。不要重复原始 JSON；需要细节时引用 ${last.markdownPath || '报告文件'}。`
            : '请用中文简要总结刚才情报查询的结论、关键证据与处置建议。';
          agent.followup({
            id: `threatbook-summarize-${Date.now()}`,
            role: 'user',
            content: [{ type: 'text', text: prompt }],
            source: { kind: 'user' },
          });
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
      'The plugin auto-detects the type and runs the FULL endpoint set for that type (IP: ip/query + ip reputation + adv_query; domain: domain/query + adv_query + sub_domains + IOC + domain_context; hash: file/report (all fields) + multiengines; URL: url/report, auto-submitting a scan when no report exists; vuln: /vuln).',
      'Use it whenever the user pastes such an indicator, even without an explicit instruction.',
      'It writes the raw JSON and a complete Markdown report into the workspace `threatbook-reports/` folder and returns their paths.',
      'After it returns, offer the user these options in one short line: (1) a concise AI summary, (2) the full Markdown report path, (3) drilling into a specific field.',
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
            `请让用户在「微步情报」面板（输入框下方）或「设置 → 微步情报」中粘贴 Key 并保存；保存只写入本机文件 ${keyFile()}，不会上传。`,
            `绑定入口：${BIND_URL}（需要先把本机出口 IP 加入白名单）。`,
          ].join('\n'),
        };
      }

      let results;
      try {
        if (type === 'url') {
          results = await runUrlFlow(indicator);
        } else {
          results = await Promise.all(planFor(type, indicator).map((job) => runJob(job)));
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
        const joined = messages.join('；') || '未知错误（所有接口均未返回可用数据）';
        return {
          ok: false,
          type,
          indicator,
          text: `微步查询未成功：${indicator}（${typeLabel(type)}）\n${joined}\n\n${failureHint(joined)}`,
        };
      }

      const digest = summarize(type, indicator, results);
      const dir = resolveDir(exec && exec.agent);
      let files;
      try {
        files = writeReports({ type, indicator, at, results, digest, dir });
      } catch (error) {
        files = null;
        digest += `\n\n> 报告落盘失败：${error instanceof Error ? error.message : String(error)}`;
      }

      const endpointLines = results
        .map((r) => `  · ${r.label}: code=${r.code}${r.msg ? ` ${String(r.msg).slice(0, 60)}` : ''}`)
        .join('\n');

      const text = [
        `微步情报查询：${indicator}（${typeLabel(type)}）`,
        digest,
        '',
        '接口执行情况：',
        endpointLines,
        '',
        files ? `完整原始数据：${files.jsonPath}` : '完整原始数据：未落盘',
        files ? `完整 Markdown 报告：${files.mdPath}` : '完整 Markdown 报告：未落盘',
        '',
        '可选下一步（问用户想要哪一个）：① 我直接做简要总结；② 打开/给出完整 MD 报告；③ 深入某个字段或多接口互证。',
      ].join('\n');

      state.last = {
        indicator,
        type,
        at,
        markdownPath: files ? files.mdPath : null,
        jsonPath: files ? files.jsonPath : null,
        reportDir: files ? files.outDir : null,
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
        `本机名：${payload.host}（${payload.platform}）`,
        `本机 IPv4：${v4.length ? v4.map((x) => `${x.address} (${x.iface})`).join('；') : '无'}`,
        `公网出口 IP：${payload.egress && payload.egress.ip ? payload.egress.ip : '未探测到'}${payload.egress && payload.egress.error ? `（探测错误：${payload.egress.error}）` : ''}`,
        `API Key: ${payload.key.configured ? payload.key.masked : '未配置'}`,
        `Key 文件：${payload.key.file}（仅本地，不上传）`,
        `绑定地址：${payload.bindingUrl}`,
        '绑定步骤：登录微步 X 情报中心 → 我的 KEY → 把上面的公网出口 IP 加入白名单 → 复制 API Key → 在插件面板粘贴并保存。',
        payload.lastLookup ? `最近查询：${payload.lastLookup.indicator}（${payload.lastLookup.type}）@ ${payload.lastLookup.at}\n  MD: ${payload.lastLookup.markdownPath}` : '最近查询：无',
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
        return '微步情报插件已就绪（API Key 已保存在本机）。用户贴出 IP / 域名 / Hash / URL / CVE 时，直接调用 threatbook_lookup；结果里已包含完整报告路径。';
      }
      const egress = state.egress && state.egress.ip ? state.egress.ip : null;
      const ipText = egress ? `本机公网出口 IP 为 ${egress}。` : '本机公网出口 IP 尚未探测到。';
      return `微步情报插件尚未配置 API Key。${ipText}需要提一嘴：先去 ${BIND_URL} 把该 IP 绑定到「我的 KEY」，再到输入框下方的「微步情报」面板粘贴 Key 保存（只存本机）。用户贴情报指标但没配 Key 时，说明这一步即可，不要反复追问。`;
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
