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
const PORTAL_URL = 'https://www.lgsrc.cn';
const REPO_URL = 'https://github.com/Lingggao/LGSRC';
const RELEASES_URL = REPO_URL + '/releases';
const CONTACT_EMAIL = 'ling@lghub.org';
const ABOUT_NAME = '灵糕中心 · 安全响应中心';
const ABOUT_INTRO = '灵糕中心 · 安全响应中心是用于打击计算机病毒与恶意网站的独立非营利组织。由独立网络安全研究员、中国计算机学会 (CCF) 会员兼计算机安全专业委员会委员 Ling Gao 领导。';
const UPDATE_CACHE_MS = 10 * 60 * 1000;

/** 进程内派生状态 (不是权威数据：Key 以文件为准，查询结果以落盘文件为准)。 */
const state = {
  egress: { ip: null, at: 0, error: null, source: null },
  last: null,
  // 按会话保存最近一次查询，避免一个会话的指标出现在另一个会话里
  lasts: new Map(),
  autoOpenedAt: 0,
  lastPurgeAt: 0,
  updateCache: null,
};

const LAST_PER_SESSION_LIMIT = 50;

function rememberLast(sessionId, entry) {
  state.last = entry;
  const key = sessionId ? String(sessionId) : '';
  if (!key) return;
  state.lasts.set(key, entry);
  while (state.lasts.size > LAST_PER_SESSION_LIMIT) {
    const oldest = state.lasts.keys().next().value;
    if (oldest === undefined) break;
    state.lasts.delete(oldest);
  }
}

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

// ---------------------------------------------------------------- 关于与更新

let versionCache = null;
function pluginVersion() {
  if (versionCache) return versionCache;
  try {
    const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
    versionCache = typeof pkg.version === 'string' ? pkg.version : 'unknown';
  } catch {
    versionCache = 'unknown';
  }
  return versionCache;
}

/** 从 CHANGELOG 顶部取当前版本的发布日期 */
const releaseDateCache = new Map();
function releaseDateOf(version) {
  if (releaseDateCache.has(version)) return releaseDateCache.get(version);
  try {
    const text = fs.readFileSync(new URL('./CHANGELOG.md', import.meta.url), 'utf8');
    const escaped = String(version).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = text.match(new RegExp('^##\\s*' + escaped + '\\s*[—-]\\s*(\\d{4}-\\d{2}-\\d{2})', 'm'));
    const date = match ? match[1] : null;
    releaseDateCache.set(version, date);
    return date;
  } catch {
    releaseDateCache.set(version, null);
    return null;
  }
}

/** 只比较 x.y.z 数字段，忽略预发布后缀 */
function compareVersions(a, b) {
  const parse = (v) => String(v || '').replace(/^v/i, '').split('.').map((n) => Number.parseInt(n, 10) || 0);
  const left = parse(a);
  const right = parse(b);
  for (let i = 0; i < 3; i += 1) {
    const x = left[i] || 0;
    const y = right[i] || 0;
    if (x !== y) return x > y ? 1 : -1;
  }
  return 0;
}

/** 从 releases 列表里挑出本插件最高的正式版本 */
function pickLatestRelease(releases, current) {
  const list = Array.isArray(releases) ? releases : [];
  const candidates = [];
  for (const item of list) {
    if (!item || item.draft || item.prerelease) continue;
    const tag = String(item.tag_name || '');
    const match = tag.match(/^threatbook-intel-v(\d+\.\d+\.\d+)$/);
    if (!match) continue;
    candidates.push({
      version: match[1],
      publishedAt: item.published_at || null,
    });
  }
  candidates.sort((a, b) => compareVersions(b.version, a.version));
  const latest = candidates[0] || null;
  if (!latest) return { hasUpdate: false, current, latest: null };
  return {
    hasUpdate: compareVersions(latest.version, current) > 0,
    current,
    latest,
  };
}

async function httpGetJson(url, timeoutMs = 8000) {
  const { status, text } = await httpGet(url, {
    headers: { 'user-agent': USER_AGENT, accept: 'application/vnd.github+json' },
    timeoutMs,
    timeoutMessage: '检查更新超时',
  });
  if (status !== 200) {
    const hint = status === 403 || status === 429 ? ' (GitHub 接口可能被限流，稍后再试)' : '';
    throw new Error(`GitHub 返回 HTTP ${status}${hint}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error('GitHub 返回的不是合法 JSON');
  }
}

async function checkForUpdate() {
  const current = pluginVersion();
  const now = Date.now();
  if (state.updateCache && now - state.updateCache.at < UPDATE_CACHE_MS) {
    return { ...state.updateCache.data, cached: true };
  }
  const releases = await httpGetJson(`https://api.github.com/repos/Lingggao/LGSRC/releases?per_page=50`);
  const result = pickLatestRelease(releases, current);
  state.updateCache = { at: now, data: result };
  return result;
}

// ---------------------------------------------------------------- 报告目录设置

/** 报告目录设置：null 表示用默认目录；retentionDays 0 表示永久保留 */
const DEFAULT_RETENTION_DAYS = 30;
const REPORT_PREFIX = 'LGSRC';
const TRASH_DIR_NAME = '.LGSRC-trash';
const SETTINGS_VERSION = 1;

function settingsFile() {
  return path.join(dataDir(), 'settings.json');
}

function readSettings() {
  const fallback = { version: SETTINGS_VERSION, reportDir: null, consent: [], retentionDays: DEFAULT_RETENTION_DAYS };
  try {
    const parsed = JSON.parse(fs.readFileSync(settingsFile(), 'utf8'));
    if (!parsed || typeof parsed !== 'object') return fallback;
    const retention = Number(parsed.retentionDays);
    return {
      version: SETTINGS_VERSION,
      reportDir: typeof parsed.reportDir === 'string' && parsed.reportDir.trim() ? path.resolve(parsed.reportDir.trim()) : null,
      consent: Array.isArray(parsed.consent) ? parsed.consent.filter((x) => typeof x === 'string').map((x) => path.resolve(x)) : [],
      retentionDays: [0, 7, 30].includes(retention) ? retention : DEFAULT_RETENTION_DAYS,
    };
  } catch {
    return fallback;
  }
}

function writeSettings(next) {
  const file = settingsFile();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = file + '.' + Date.now() + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify({ version: SETTINGS_VERSION, ...next }, null, 2), 'utf8');
  fs.renameSync(tmp, file);
}

/** 部署默认工作区；没有 workingDirectory 服务时退回进程目录 */
function defaultWorkspace() {
  try {
    if (hostRefs.ctx) {
      // 优先落在用户的工作区目录，而不是 DSH 进程的工作目录
      const registry = hostRefs.ctx.get('workspaceRegistry');
      if (registry && typeof registry.list === 'function') {
        const list = registry.list();
        if (Array.isArray(list) && list.length) {
          const newest = list[list.length - 1];
          if (newest && typeof newest.path === 'string' && newest.path) return newest.path;
        }
      }
      const live = hostRefs.ctx.get('workingDirectory');
      if (live && typeof live.defaultDirectory === 'string' && live.defaultDirectory) {
        hostRefs.workingDirectory = live;
        return live.defaultDirectory;
      }
    }
    const cached = hostRefs.workingDirectory;
    if (cached && typeof cached.defaultDirectory === 'string' && cached.defaultDirectory) return cached.defaultDirectory;
  } catch { /* 忽略 */ }
  return process.cwd();
}

function defaultReportRoot() {
  return path.join(defaultWorkspace(), REPORT_DIR_NAME);
}

/** 当前生效的报告根目录：用户配置优先，其次默认目录 */
function reportRoot(settings = readSettings()) {
  return settings.reportDir || defaultReportRoot();
}

function trashRoot(root = reportRoot()) {
  return path.join(root, TRASH_DIR_NAME);
}

function isInside(parent, child) {
  const rel = path.relative(path.resolve(parent), path.resolve(child));
  return rel === '' || (!rel.startsWith('..') && !path.isAbsolute(rel));
}

/** 目录在工作区之外时，必须由用户显式确认过一次 */
function needsConsent(target, settings = readSettings()) {
  const resolved = path.resolve(target);
  if (isInside(defaultWorkspace(), resolved)) return false;
  return !settings.consent.includes(resolved);
}

/** 探测目录可用性：不存在则尝试创建，并写入一个临时文件验证可写 */
function writeProbe(dir) {
  const probe = path.join(dir, '.LGSRC-write-test');
  fs.writeFileSync(probe, 'ok', 'utf8');
  fs.rmSync(probe, { force: true });
}

function probeReportDir(target) {
  const resolved = path.resolve(target);
  try {
    fs.mkdirSync(resolved, { recursive: true });
    writeProbe(resolved);
    return { ok: true, path: resolved };
  } catch (error) {
    return { ok: false, path: resolved, error: error instanceof Error ? error.message : String(error) };
  }
}

/** 报告指纹：只有内容确实由本插件写出，才会被识别、迁移或删除 */
function looksLikeReport(file) {
  try {
    const stat = fs.statSync(file);
    if (!stat.isFile() || stat.size === 0 || stat.size > 32 * 1024 * 1024) return false;
    const ext = path.extname(file).toLowerCase();
    if (ext === '.md') {
      const fd = fs.openSync(file, 'r');
      const buf = Buffer.alloc(Math.min(256, stat.size));
      fs.readSync(fd, buf, 0, buf.length, 0);
      fs.closeSync(fd);
      return buf.toString('utf8').replace(/^﻿/, '').startsWith('# 微步情报报告：');
    }
    if (ext === '.json') {
      const fd = fs.openSync(file, 'r');
      const buf = Buffer.alloc(Math.min(512, stat.size));
      fs.readSync(fd, buf, 0, buf.length, 0);
      fs.closeSync(fd);
      return /"plugin"\s*:\s*"threatbook-intel"/.test(buf.toString('utf8'));
    }
    return false;
  } catch {
    return false;
  }
}

/** 列出目录下的报告 (只看顶层，不进子目录) 与回收站批次 */
let scanCache = { root: null, at: 0, data: null };

function invalidateScan() {
  scanCache = { root: null, at: 0, data: null };
}

function scanReports(root = reportRoot(), force = false) {
  const now = Date.now();
  if (!force && scanCache.data && scanCache.root === root && now - scanCache.at < 5000) return scanCache.data;
  const files = [];
  const trash = [];
  try {
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isFile()) continue;
      const full = path.join(root, entry.name);
      if (!looksLikeReport(full)) continue;
      const stat = fs.statSync(full);
      files.push({ name: entry.name, path: full, size: stat.size, mtime: stat.mtimeMs });
    }
  } catch { /* 目录不存在时视为空 */ }
  try {
    for (const entry of fs.readdirSync(trashRoot(root), { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const dir = path.join(trashRoot(root), entry.name);
      const stat = fs.statSync(dir);
      let count = 0;
      let bytes = 0;
      try {
        for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
          if (!item.isFile()) continue;
          const s = fs.statSync(path.join(dir, item.name));
          count += 1;
          bytes += s.size;
        }
      } catch { /* 忽略 */ }
      trash.push({ id: entry.name, path: dir, count, bytes, at: stat.mtimeMs });
    }
  } catch { /* 无回收站 */ }
  const sortByMtime = (a, b) => b.mtime - a.mtime || b.at - a.at;
  files.sort(sortByMtime);
  trash.sort(sortByMtime);
  const data = { root, trashDir: trashRoot(root), files, trash };
  scanCache = { root, at: now, data };
  return data;
}

function uniqueTarget(dir, name) {
  const ext = path.extname(name);
  const base = path.basename(name, ext);
  let candidate = path.join(dir, name);
  let i = 1;
  while (fs.existsSync(candidate)) {
    candidate = path.join(dir, base + '-' + i + ext);
    i += 1;
  }
  return candidate;
}

/** 把报告移入回收站批次；返回批次 id 与被移动的文件名 */
function moveToTrash(root, names) {
  const batch = new Date().toISOString().replace(/[:.]/g, '-');
  const dir = path.join(trashRoot(root), batch);
  fs.mkdirSync(dir, { recursive: true });
  const moved = [];
  for (const name of names) {
    const source = path.join(root, name);
    if (!looksLikeReport(source)) continue;
    fs.renameSync(source, path.join(dir, name));
    moved.push(name);
  }
  invalidateScan();
  return { batch, dir, moved };
}

function undoTrash(root, batch) {
  const dir = path.join(trashRoot(root), batch);
  if (!isInside(trashRoot(root), dir) || !fs.existsSync(dir)) return { restored: [] };
  const restored = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const target = uniqueTarget(root, entry.name);
    fs.renameSync(path.join(dir, entry.name), target);
    restored.push(path.basename(target));
  }
  fs.rmSync(dir, { recursive: true, force: true });
  invalidateScan();
  return { restored };
}

/** 立即清空回收站 (不区分批次年龄)，供用户主动释放空间 */
function emptyTrash(root = reportRoot()) {
  const removed = [];
  try {
    for (const entry of fs.readdirSync(trashRoot(root), { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      fs.rmSync(path.join(trashRoot(root), entry.name), { recursive: true, force: true });
      removed.push(entry.name);
    }
  } catch { /* 无回收站 */ }
  if (removed.length) invalidateScan();
  return { removed };
}

/** 回收站保留策略：0 天表示永久；过期批次在启动与相关操作时顺手清理 */
function purgeTrash(root = reportRoot(), retentionDays = readSettings().retentionDays) {
  if (!retentionDays) return { removed: [] };
  const removed = [];
  const cutoff = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
  try {
    for (const entry of fs.readdirSync(trashRoot(root), { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const dir = path.join(trashRoot(root), entry.name);
      const stat = fs.statSync(dir);
      if (stat.mtimeMs < cutoff) {
        fs.rmSync(dir, { recursive: true, force: true });
        removed.push(entry.name);
      }
    }
  } catch { /* 无回收站 */ }
  if (removed.length) invalidateScan();
  return { removed };
}

/** 迁移旧报告：copy 保留原文件，move 转移，keep 不做处理 */
function migrateReports(from, to, mode) {
  if (!['copy', 'move'].includes(mode)) return { copied: 0, moved: 0, skipped: 0 };
  const source = scanReports(from).files;
  fs.mkdirSync(to, { recursive: true });
  let copied = 0;
  let moved = 0;
  for (const item of source) {
    const target = uniqueTarget(to, item.name);
    if (mode === 'copy') {
      fs.copyFileSync(item.path, target);
      copied += 1;
    } else {
      try {
        fs.renameSync(item.path, target);
        moved += 1;
      } catch {
        fs.copyFileSync(item.path, target);
        fs.rmSync(item.path, { force: true });
        moved += 1;
      }
    }
  }
  if (copied || moved) invalidateScan();
  return { copied, moved, skipped: 0 };
}

// 由 apply() 注入的服务引用 (workingDirectory 用于解析默认工作区)
const hostRefs = { workingDirectory: null };

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

/** 统一的 HTTPS GET：返回状态码与文本，响应体超过 maxBytes 直接中止 */
function httpGet(url, opts = {}) {
  const headers = opts.headers || { 'user-agent': USER_AGENT };
  const timeoutMs = opts.timeoutMs || 8000;
  const maxBytes = opts.maxBytes || 2 * 1024 * 1024;
  const timeoutMessage = opts.timeoutMessage || '请求超时';
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers, timeout: timeoutMs }, (res) => {
      const chunks = [];
      let size = 0;
      res.on('data', (c) => {
        size += c.length;
        if (size > maxBytes) {
          req.destroy(new Error('响应体过大'));
          return;
        }
        chunks.push(c);
      });
      res.on('end', () => resolve({ status: res.statusCode, text: Buffer.concat(chunks).toString('utf8') }));
    });
    req.on('timeout', () => req.destroy(new Error(timeoutMessage)));
    req.on('error', reject);
  });
}

function httpGetText(url, timeoutMs) {
  return httpGet(url, { timeoutMs, timeoutMessage: '探测公网 IP 超时', maxBytes: 512 * 1024 });
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

// 恶意标签分档：severe 能独立支撑「恶意」，elevated 支撑「可疑」，weak 只提示风险
const SEVERE_TAGS = [
  'C2', 'C&C', '远控', '后门', 'Backdoor', '僵尸', 'Botnet', '勒索', 'Ransom',
  '在野利用', '窃密', '窃取', '挖矿', 'Miner', '恶意软件', '木马', 'Trojan', '病毒', 'Virus',
  '蠕虫', 'Worm', 'Loader', '加载器', 'Downloader', '下载器', '银狐', '黑产', '团伙',
  'APT', '攻击组织', '恶意行为', '恶意',
];
const ELEVATED_TAGS = ['钓鱼', 'Phishing', 'Exploit', '利用', 'PoC', '爆破', 'Brute'];
const WEAK_TAGS = ['扫描', 'Scanner', '垃圾', 'Spam', '广告', '灰产', '可疑'];

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
  const text = facts.judgments.join(' ').toLowerCase();
  const has = (words) => words.some((w) => text.includes(String(w).toLowerCase()));

  const severity = String(facts.severity || '');
  const highSeverity = /高|严重|恶意/.test(severity);
  // 标签分三档：只拿到标签、没拿到 is_malicious 时，恶意标签也要能撑起结论
  const severeHit = has(SEVERE_TAGS);
  const elevatedHit = has(ELEVATED_TAGS);
  const weakHit = has(WEAK_TAGS);

  let risk = 0;
  let riskLabel = '无可用的情报判定';
  let verdictFromTags = false;
  if (facts.isMalicious === true) {
    // 微步已明确判恶意时，评分不得低于此档，其他接口缺失只影响置信度
    risk = severeHit || highSeverity ? 55 : 45;
    riskLabel = '微步判定为恶意';
  } else if (severeHit) {
    // 反例：接口判为非恶意但标签是银狐/C2/勒索时，按可疑处理，不能直接给低危
    risk = facts.isMalicious === false ? 45 : 55;
    riskLabel = facts.isMalicious === false ? '标签与判定冲突' : '恶意标签';
    verdictFromTags = facts.isMalicious !== false;
  } else if (elevatedHit) {
    risk = facts.isMalicious === false ? 30 : 45;
    riskLabel = facts.isMalicious === false ? '标签与判定冲突' : '可疑标签';
    verdictFromTags = facts.isMalicious !== false;
  } else if (facts.isMalicious === false) {
    risk = 8; riskLabel = '判为非恶意';
  } else if (weakHit) {
    risk = 30; riskLabel = '弱恶意标签';
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
  // 只有「没有任何判定和标签」且关键接口都不可用时，才算无法判定
  const status = endpointStatus(type, results);
  const undetermined = score < 30 && status.noneUsable && facts.judgments.length === 0;
  return {
    facts, score, priority, riskLabel, ageDays, chain: chainOf(facts), status, undetermined,
    severeHit, elevatedHit, weakHit, verdictFromTags,
  };
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

// 权限不足：接口明确返回「没有权限」；网络失败不算权限问题
function isPermissionDenied(result) {
  if (!result || typeof result.code !== 'number' || result.code >= 0) return false;
  return /权限|permission|forbidden|no access/i.test(String(result.msg || ''));
}

/** 所有接口都失败时，判断是否真的只是「没权限」 */
function isPermissionOnlyFailure(results) {
  return results.length > 0 && results.every((r) => (
    typeof r.code === 'number' && r.code < 0
    && /权限|permission|forbidden|no access/i.test(String(r.msg || ''))
  ));
}

/** 撤销只允许当前目录、默认目录或此前授权过的目录 */
function undoRootAllowed(target, current, consent) {
  const allowed = new Set([current, defaultReportRoot(), ...(Array.isArray(consent) ? consent : [])].map((item) => path.resolve(item)));
  return allowed.has(path.resolve(target));
}

function endpointStatus(type, results) {
  const byId = new Map(results.map((r) => [r.id, r]));
  const keys = KEY_ENDPOINTS[type] || [];
  const entries = keys.map((id) => ({ id, result: byId.get(id) || null }));
  const usable = entries.filter((x) => x.result && x.result.ok !== false && typeof x.result.code === 'number' && x.result.code >= 0);
  const denied = entries.filter((x) => isPermissionDenied(x.result));
  const failed = entries.filter((x) => x.result && !usable.includes(x) && !denied.includes(x));
  return {
    allDenied: entries.length > 0 && usable.length === 0 && denied.length === entries.length,
    noneUsable: usable.length === 0,
    usable: usable.map((x) => x.result.label || x.id),
    denied: denied.map((x) => x.result.label || x.id),
    failed: failed.map((x) => x.result.label || x.id),
  };
}

function analysisHints(type, indicator, results) {
  const {
    facts, score, priority, riskLabel, ageDays, chain, status, undetermined,
    severeHit, elevatedHit, verdictFromTags,
  } = scoreThreat(type, indicator, results);
  const lines = [];
  const strongHit = severeHit || facts.judgments.some((j) => ['C2', 'C&C', '远控', '后门', '僵尸', '勒索'].some((k) => j.includes(k)));

  let level = 'D';
  if (facts.isMalicious === false && severeHit) level = 'B';
  else if ((facts.engines && facts.engines.bad >= 5) || strongHit) level = 'A';
  else if (facts.isMalicious === true) level = 'A';
  else if (elevatedHit || (facts.engines && facts.engines.bad >= 1) || score >= 30) level = 'B';
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

  if (verdictFromTags) {
    const tags = facts.judgments.slice(0, 6).join('、');
    const missing = [...status.denied, ...status.failed];
    lines.push(`微步返回恶意标签：${tags}${missing.length ? `；缺少 ${missing.join('、')} 只影响把握度，结论仍按恶意处理，不要降级为低危或「无情报记录」` : ''}`);
  } else if (facts.isMalicious === false && severeHit) {
    lines.push('判定与标签冲突：接口判为非恶意，但标签包含 ' + facts.judgments.slice(0, 6).join('、') + '，按可疑处理并人工复核');
  }

  const engineText = facts.engines ? `，多引擎 ${facts.engines.bad}/${facts.engines.total} 报毒` : '';
  const levelLabel = facts.verdictSource === 'engines' ? '多引擎共识' : riskLabel;
  lines.push(`证据等级 ${level}：${levelLabel}${engineText}`);

  if (undetermined) {
    lines.push('关键接口均不可用，且没有任何判定或标签：本次只能算「无法判定」，不能据此认为该指标安全或低危');
    lines.push('补齐权限后可重新查询；如账号确实没有该类型权限，请改用其他情报源交叉验证');
  } else {
    lines.push(`综合评分 ${score}/100，落在 ${priority}；只按情报面打分，告警级别与资产价值没算进去`);
  }
  if ((status.denied.length || status.failed.length) && !undetermined) {
    const deniedText = status.denied.length ? `无权限：${status.denied.join('、')}` : '';
    const failedText = status.failed.length ? `调用失败：${status.failed.join('、')}` : '';
    lines.push(`判定来源：${status.usable.join('、') || '无'}；${[deniedText, failedText].filter(Boolean).join('；')}`);
  }

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
  if (!last) return '用中文、200 字以内说清这次查询：结论、依据、处置、不确定点。';
  const hints = Array.isArray(last.hints) && last.hints.length ? last.hints.join('\n') : '(无)';
  return [
    '把这次查询压成一段可直接贴进工单的结论。用中文，200-260 字，短句，先给结论，不写寒暄和角色设定。',
    '',
    `指标：${last.indicator} (${last.kind || typeShort(last.type)})`,
    `报告：${last.markdownPath || '(未落盘，只能依据摘要)'}`,
    `查询时间：${last.at}`,
    '',
    'C2 通联 IOC：',
    Array.isArray(last.c2) && last.c2.length ? last.c2.map((x) => '- ' + x).join('\n') : '(无)',
    '',
    '已有摘要：',
    last.brief || last.digest || '(无)',
    '',
    '判断依据：',
    hints,
    '',
    '按这四块写，不要加额外标题：',
    '**结论**：恶意 / 可疑 / 无情报记录 / 无法判定，加置信度、评分与优先级，一句话。',
    '**依据**：最多 4 条，每条一行，注明来自哪个接口的哪个字段；只留真正影响处置的。',
    '**处置**：网络 / 主机 / 账号各一条，动作写具体；P3 也要保留「先监控」这一档。',
    '**不确定**：一句话说清缺什么 (权限 / 接口 / 时间)，以及是否影响结论。',
    '',
    '底线：',
    '- 接口缺失或权限不足时，不要把已有的恶意标签 (银狐、C2、勒索、木马等) 丢掉；结论仍按恶意 / 可疑，把缺失写成置信度折扣，不能降级为低危或「无情报记录」。',
    '- 无记录不等于安全；自己的推断标 (推断)。',
    '- C2 必须在结论里点名，并在处置里给出逐条封禁，不要埋在依据里。',
    '- 不要抄 JSON，不要写「根据提供的信息」这类空话。',
    '- 微步判定优先：is_malicious=true、severity 高或证据等级 A 时，结论不得低于「可疑」，评分不低于 45。',
    '- 只有证据等级 D 且没有任何标签时，才写「无情报记录」。',
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
  const root = reportRoot();
  const inRoot = isInside(root, target);
  const inTrash = isInside(trashRoot(root), target);
  if (!inRoot && !inTrash) return null;
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
  const outDir = dir;
  fs.mkdirSync(outDir, { recursive: true });
  const base = `${REPORT_PREFIX}-${type}-${slug(indicator)}-${stamp()}-${randomUUID().slice(0, 4)}`;
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
  // 新报告落盘后让目录扫描缓存失效，设置页立刻能看到最新数量
  invalidateScan();
  return { jsonPath, mdPath, outDir };
}

// ---------------------------------------------------------------- 浏览器打开

/** 弹原生文件夹选择框；拿不到路径时返回 null */
function chooseFolderNative() {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (value) => {
      if (settled) return;
      settled = true;
      resolve(value ? path.resolve(value) : null);
    };
    const collect = (command, args) => {
      try {
        const child = spawn(command, args, { windowsHide: true });
        let out = '';
        child.stdout.on('data', (chunk) => { out += String(chunk); });
        child.on('error', () => finish(null));
        child.on('close', () => finish(out.trim() || null));
        setTimeout(() => { try { child.kill(); } catch { /* 忽略 */ } finish(null); }, 120000);
      } catch {
        finish(null);
      }
    };
    if (process.platform === 'win32') {
      const script = [
        'Add-Type -AssemblyName System.Windows.Forms',
        '$f = New-Object System.Windows.Forms.FolderBrowserDialog',
        "$f.Description = '选择微步情报报告保存目录'",
        '$f.ShowNewFolderButton = $true',
        "if ($f.ShowDialog() -eq 'OK') { [Console]::Out.Write($f.SelectedPath) }",
      ].join('; ');
      collect('powershell.exe', ['-NoProfile', '-STA', '-Command', script]);
    } else if (process.platform === 'darwin') {
      collect('osascript', ['-e', 'POSIX path of (choose folder with prompt "选择微步情报报告保存目录")']);
    } else {
      collect('zenity', ['--file-selection', '--directory', '--title=选择微步情报报告保存目录']);
    }
  });
}

function openExternal(url) {
  try {
    if (process.platform === 'win32') {
      const target = String(url);
      if (/^https?:\/\//i.test(target)) {
        // 固定常量网址，走 start 让默认浏览器接管
        spawn('cmd.exe', ['/c', 'start', '""', target], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
      } else {
        // 本地路径直接交给 explorer.exe，不经过 cmd，避免目录名里的 & | ^ 被解释
        spawn('explorer.exe', [target], { detached: true, stdio: 'ignore' }).unref();
      }
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

/** 报告目录与回收站的状态快照，供设置页展示 */
function reportState() {
  const settings = readSettings();
  const root = reportRoot(settings);
  if (settings.retentionDays && Date.now() - state.lastPurgeAt > 60 * 60 * 1000) {
    state.lastPurgeAt = Date.now();
    purgeTrash(root, settings.retentionDays);
  }
  const scan = scanReports(root);
  const trashCount = scan.trash.reduce((sum, item) => sum + item.count, 0);
  const trashBytes = scan.trash.reduce((sum, item) => sum + item.bytes, 0);
  return {
    dir: root,
    defaultDir: defaultReportRoot(),
    isDefault: !settings.reportDir,
    outsideWorkspace: !isInside(defaultWorkspace(), root),
    consentRequired: needsConsent(root, settings),
    writable: probeWritable(root),
    retentionDays: settings.retentionDays,
    trashDir: scan.trashDir,
    reportCount: scan.files.length,
    reportBytes: scan.files.reduce((sum, item) => sum + item.size, 0),
    trashCount,
    trashBytes,
    lastTrashBatch: scan.trash[0] ? scan.trash[0].id : null,
    retentionOptions: [7, 30, 0],
  };
}

/** 只读探测：不创建目录，仅判断现有目录是否可写 (30 秒缓存，避免轮询时反复写入) */
let writableCache = { dir: null, at: 0, ok: true };
function probeWritable(dir) {
  if (writableCache.dir === dir && Date.now() - writableCache.at < 30000) return writableCache.ok;
  try {
    if (!fs.existsSync(dir)) return true;
    writeProbe(dir);
    writableCache = { dir, at: Date.now(), ok: true };
    return true;
  } catch {
    writableCache = { dir, at: Date.now(), ok: false };
    return false;
  }
}

async function statePayload(options = {}) {
  const key = readKey();
  const egress = await probeEgress(false);
  const sessionId = options && options.sessionId ? String(options.sessionId) : '';
  const scoped = sessionId ? state.lasts.get(sessionId) || null : null;
  const latest = state.last ? { ...state.last, scope: 'global' } : null;
  return {
    plugin: PLUGIN_ID,
    host: os.hostname(),
    platform: `${process.platform} ${process.arch}`,
    ips: localAddresses(),
    egress,
    key: { configured: Boolean(key), masked: key ? maskKey(key.apikey) : '', savedAt: key ? key.savedAt : null, file: keyFile() },
    bindingUrl: BIND_URL,
    reportDirName: REPORT_DIR_NAME,
    report: reportState(),
    about: {
      name: ABOUT_NAME,
      intro: ABOUT_INTRO,
      version: pluginVersion(),
      releaseDate: releaseDateOf(pluginVersion()),
      portalUrl: PORTAL_URL,
      repoUrl: REPO_URL,
      releasesUrl: RELEASES_URL,
      contactEmail: CONTACT_EMAIL,
    },
    // 当前会话自己的最近查询；没有会话上下文时为 null
    lastLookup: scoped ? { ...scoped, scope: 'session' } : null,
    // 所有会话里最近的一条，供设置页展示
    latestLookup: latest,
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

// 校验 Key 用的样本：EICAR 测试文件 (公开的标准样本)，走文件报告接口。
// 普通账号文件查询 300 次/天，比 IP 信誉 50 次/天更经用，校验不再挤占 IP 额度。
const VERIFY_SHA256 = '275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f';

async function verifyKey(request = tbRequest) {
  const key = readKey();
  if (!key) return { ok: false, kind: 'no-key', message: '尚未配置 API Key。' };
  try {
    const res = await request('/file/report', { resource: VERIFY_SHA256, query_fields: ['summary'] }, { timeoutMs: 20000 });
    if (typeof res.code === 'number' && res.code >= 0) {
      return {
        ok: true, kind: 'ok', responseCode: res.code,
        message: 'Key 可用，出口 IP 白名单与文件接口权限正常 (本次校验占用 1 次文件查询额度)。',
      };
    }
    const merged = `${res.code} ${res.msg}`;
    if (/Frequent Limitation|Beyond (Daily|Monthly)|频率|配额/i.test(res.msg)) {
      return {
        ok: true, kind: 'quota', responseCode: res.code,
        message: `${merged} —— Key 本身有效，只是当前被频率或配额限制，稍后重试即可。`,
      };
    }
    let kind = 'api';
    if (/Invalid Access IP|无效的访问\s*IP/i.test(res.msg)) kind = 'whitelist';
    else if (/Invalid API Key|无效的\s*API\s*key/i.test(res.msg)) kind = 'key';
    else if (/No Access to API Method|没有访问接口权限/i.test(res.msg)) {
      // 校验接口本身没开权限，不代表 Key 失效
      return {
        ok: false, kind: 'permission', responseCode: res.code,
        message: `${merged} —— Key 可能仍然有效，只是没有文件报告接口权限，无法完成校验。`,
      };
    }
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
  hostRefs.ctx = ctx;
  try {
    hostRefs.workingDirectory = ctx.get('workingDirectory') || null;
  } catch { /* 非 Web 载体 */ }
  try {
    purgeTrash();
  } catch { /* 回收站不可用时忽略 */ }

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
        let sessionId = '';
        try {
          sessionId = new URL(req.url || '/', 'http://127.0.0.1').searchParams.get('sessionId') || '';
        } catch { /* 忽略 */ }
        sendJson(res, 200, await statePayload({ sessionId }));
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
      // 响应里的「最近查询」跟随调用方会话；设置页/无会话请求拿到的是全局视图
      const respondState = () => statePayload({ sessionId: String(body.sessionId || '') });
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
          state.lasts.clear();
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
          const dir = body.path ? reportPathWithin(body.path, 'dir') : reportRoot();
          if (!dir || !fs.existsSync(dir)) {
            sendJson(res, 400, { error: '目录无效或不存在' });
            return;
          }
          openExternal(dir);
        } else if (action === 'refresh-egress') {
          await probeEgress(true);
        } else if (action === 'choose-report-dir') {
          const picked = await chooseFolderNative();
          sendJson(res, 200, { ok: Boolean(picked), path: picked, state: await respondState() });
          return;
        } else if (action === 'set-report-dir') {
          const raw = String(body.path || '').trim();
          if (!raw) {
            sendJson(res, 400, { error: '缺少目录路径' });
            return;
          }
          if (!path.isAbsolute(raw)) {
            sendJson(res, 400, { error: '请填写绝对路径' });
            return;
          }
          const settings = readSettings();
          const oldRoot = reportRoot(settings);
          const target = path.resolve(raw);
          const mode = ['copy', 'move', 'keep'].includes(body.mode) ? body.mode : 'keep';
          if (target !== oldRoot) {
            if (needsConsent(target, settings) && !body.consent) {
              sendJson(res, 200, { ok: false, needsConsent: true, path: target, error: '该目录在工作区之外，需要确认授权' });
              return;
            }
            const probe = probeReportDir(target);
            if (!probe.ok) {
              sendJson(res, 400, { error: `目录不可写：${probe.error}`, path: target });
              return;
            }
            const migration = mode === 'keep' ? null : migrateReports(oldRoot, target, mode);
            const consent = settings.consent.includes(target) ? settings.consent : [...settings.consent, target];
            writeSettings({
              reportDir: target === defaultReportRoot() ? null : target,
              consent,
              retentionDays: settings.retentionDays,
            });
            purgeTrash(target, settings.retentionDays);
            sendJson(res, 200, { ok: true, migration, state: await respondState() });
            return;
          }
          sendJson(res, 200, { ok: true, migration: null, state: await respondState() });
          return;
        } else if (action === 'reset-report-dir') {
          const settings = readSettings();
          const oldRoot = reportRoot(settings);
          const target = defaultReportRoot();
          const mode = ['copy', 'move', 'keep'].includes(body.mode) ? body.mode : 'keep';
          const migration = oldRoot !== target && mode !== 'keep' ? migrateReports(oldRoot, target, mode) : null;
          probeReportDir(target);
          writeSettings({ reportDir: null, consent: settings.consent, retentionDays: settings.retentionDays });
          sendJson(res, 200, { ok: true, migration, state: await respondState() });
          return;
        } else if (action === 'list-reports') {
          const scan = scanReports(reportRoot(), true);
          sendJson(res, 200, {
            ok: true,
            files: scan.files,
            trash: scan.trash,
            dir: scan.root,
            trashDir: scan.trashDir,
          });
          return;
        } else if (action === 'delete-reports') {
          const names = Array.isArray(body.names) ? body.names.map((n) => path.basename(String(n))) : [];
          if (!names.length) {
            sendJson(res, 400, { error: '没有选中要删除的报告' });
            return;
          }
          const root = reportRoot();
          const result = moveToTrash(root, names);
          if (!result.moved.length) {
            sendJson(res, 409, { ok: false, error: '选中的报告已不存在 (可能已被移动或删除)，请刷新列表后重试' });
            return;
          }
          sendJson(res, 200, { ok: true, batch: result.batch, dir: root, moved: result.moved, state: await respondState() });
          return;
        } else if (action === 'undo-delete') {
          const batch = path.basename(String(body.batch || ''));
          if (!batch) {
            sendJson(res, 400, { error: '缺少批次编号' });
            return;
          }
          const settings = readSettings();
          const current = reportRoot(settings);
          const requested = String(body.dir || '').trim();
          const dir = requested ? path.resolve(requested) : current;
          // 只允许撤销当前目录或此前配置过/授权过的目录，避免任意路径读写
          if (!undoRootAllowed(dir, current, settings.consent)) {
            sendJson(res, 400, { error: '该目录不在允许的撤销范围内' });
            return;
          }
          const result = undoTrash(dir, batch);
          if (!result.restored.length) {
            sendJson(res, 404, { ok: false, error: `回收站里找不到这批报告 (可能在 ${dir} 的回收站已过期清理)` });
            return;
          }
          sendJson(res, 200, { ok: true, dir, restored: result.restored, state: await respondState() });
          return;
        } else if (action === 'set-retention') {
          const days = Number(body.days);
          if (![7, 30, 0].includes(days)) {
            sendJson(res, 400, { error: '保留期只能是 7 天、30 天或永久' });
            return;
          }
          const settings = readSettings();
          writeSettings({ reportDir: settings.reportDir, consent: settings.consent, retentionDays: days });
          const purged = purgeTrash(reportRoot(), days);
          sendJson(res, 200, { ok: true, purged: purged.removed.length, state: await respondState() });
          return;
        } else if (action === 'check-update') {
          try {
            const result = await checkForUpdate();
            sendJson(res, 200, { ok: true, update: result, state: await respondState() });
          } catch (error) {
            sendJson(res, 200, {
              ok: false,
              error: `检查更新失败：${error instanceof Error ? error.message : String(error)}`,
              update: { hasUpdate: false, current: pluginVersion(), latest: null },
              state: await respondState(),
            });
          }
          return;
        } else if (action === 'open-releases') {
          openExternal(RELEASES_URL);
          sendJson(res, 200, { ok: true, state: await respondState() });
          return;
        } else if (action === 'empty-trash') {
          const result = emptyTrash();
          sendJson(res, 200, { ok: true, removed: result.removed, state: await respondState() });
          return;
        } else if (action === 'summarize') {
          const sessionId = String(body.sessionId || '');
          const agents = ctx.get('agents');
          const agent = agents && sessionId ? agents.get(sessionId) : undefined;
          if (!agent) {
            sendJson(res, 400, { error: '找不到当前会话，无法自动触发总结 (刷新页面后重试)' });
            return;
          }
          const scoped = sessionId ? state.lasts.get(sessionId) : null;
          if (!scoped) {
            sendJson(res, 400, { error: '当前会话还没有查询记录，先查一个指标再点 AI 总结' });
            return;
          }
          const prompt = summaryPrompt(scoped);
          // 与 host 侧 createUserMessage 保持一致：UUID 身份 + 冻结的不可变消息
          agent.followup(Object.freeze({
            id: randomUUID(),
            role: 'user',
            content: Object.freeze([Object.freeze({ type: 'text', text: prompt })]),
            source: Object.freeze({ kind: 'user' }),
          }));
        } else if (action === 'verify') {
          const result = await verifyKey();
          sendJson(res, 200, { ok: result.ok, verify: result, state: await respondState() });
          return;
        } else {
          sendJson(res, 400, { error: `未知操作：${String(action)}` });
          return;
        }
        sendJson(res, 200, { ok: true, state: await respondState() });
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
      'The result already includes a 研判提示 block (evidence grade, 0-100 score → P0-P3, attack-chain stage, ATT&CK ids, intelligence age, skipped/failed endpoints) and the C2 list. Treat those as settled: reuse them, do not recompute or soften them.',
      'Reply in Chinese, compact and decision-first:',
      '1) 结论：恶意 / 可疑 / 无情报记录 / 无法判定，一句话，带置信度、评分与优先级。',
      '2) 关键依据：3-5 条真正影响处置的发现，每条注明来自哪个接口的哪个字段。',
      '3) C2 与外联：若存在，逐条列出并给明确的封禁 / 拦截清单，不要埋在证据里。',
      '4) 处置：按网络 / 主机 / 账号分开写并给依据；P3 也要保留「先监控」选项。',
      '5) 误报条件与需要人工拍板的事，各一句。',
      'Hard rules: missing data is not safety (无记录 / 权限不足 ≠ 安全或低危); when endpoints are missing but malicious tags remain (银狐、C2、勒索、木马等), keep the 恶意 / 可疑 verdict and treat permissions only as reduced confidence, never downgrade to 低危 or 无情报记录; mark your own reasoning with (推断); keep raw JSON out; if 研判提示 says 无法判定, state it and name the missing endpoints.',
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
        // -1 既可能是没权限，也可能是 Key 无效/未加白名单；只有消息明确是权限问题才算无权限
        const permissionOnly = isPermissionOnlyFailure(results);
        const headline = permissionOnly
          ? `该类型接口均无权限：${indicator}(${typeLabel(type)})`
          : `微步查询未成功：${indicator}(${typeLabel(type)})`;
        const advice = permissionOnly
          ? '当前 API Key 没有该类型的查询权限，请在控制台确认后重试；无权限不等于该指标安全。'
          : failureHint(joined);
        return { ok: false, type, indicator, text: `${headline}\n${joined}\n\n${advice}` };
      }

      const digest = summarize(type, indicator, results);
      const grade = scoreThreat(type, indicator, results);
      const c2 = extractC2(type, indicator, results);
      const c2Line = c2.length ? `\n- C2 通联 IOC：${c2.map((x) => `${x.value} (${x.kind})`).join('、')}` : '';
      const brief = `${digestBrief(type, indicator, results)}\n- 威胁评分：${grade.score}/100 (${grade.priority})${c2Line}`;
      const dir = reportRoot();
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

      const lastEntry = {
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
      const sessionId = exec && exec.agent && exec.agent.session ? String(exec.agent.session.id) : '';
      rememberLast(sessionId, lastEntry);

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
      const report = reportState();
      const lines = [
        `本机名：${payload.host}(${payload.platform})`,
        `本机 IPv4：${v4.length ? v4.map((x) => `${x.address} (${x.iface})`).join('；') : '无'}`,
        `公网出口 IP：${payload.egress && payload.egress.ip ? payload.egress.ip : '未探测到'}${payload.egress && payload.egress.error ? `(探测错误：${payload.egress.error})` : ''}`,
        `API Key: ${payload.key.configured ? payload.key.masked : '未配置'}`,
        `Key 文件：${payload.key.file}(仅本地，不上传)`,
        `报告目录：${report.dir}${report.isDefault ? ' (默认)' : ''}`,
        `回收站：${report.trashDir}(保留 ${report.retentionDays ? report.retentionDays + ' 天' : '永久'})`,
        `绑定地址：${payload.bindingUrl}`,
        '绑定步骤：登录微步 X 情报中心 → 我的 KEY → 把上面的公网出口 IP 加入白名单 → 复制 API Key → 在插件面板粘贴并保存。',
        (() => {
          const latest = payload.latestLookup || payload.lastLookup;
          return latest
            ? `最近查询：${latest.indicator}(${latest.type})@ ${latest.at}\n  MD: ${latest.markdownPath}`
            : '最近查询：无';
        })(),
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
