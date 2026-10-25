// 渲染冒烟测试：用桩 React 执行 client.js 的各个槽位，确认没有运行时报错
// 用法：node dsh-plugins/tests/threatbook-intel-render-smoke.mjs [场景...]
// 场景：normal / unconfigured / configured / last / empty / notice / loading / error
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const clientFile = path.resolve(here, '..', 'threatbook-intel', 'client.js');
const SCENARIOS = ['normal', 'unconfigured', 'configured', 'last', 'reports', 'empty', 'notice', 'loading', 'error'];
const targets = process.argv.slice(2).length ? process.argv.slice(2) : SCENARIOS;

const basePayload = {
  plugin: 'threatbook-intel',
  host: 'TEST-PC',
  platform: 'win32 x64',
  ips: [
    { address: '192.168.1.20', iface: 'WLAN', family: 'IPv4' },
    { address: '240e:86c:48:26c7::1', iface: '以太网', family: 'IPv6' },
  ],
  egress: { ip: '203.0.113.9', ipv4: '203.0.113.9', ipv6: null, at: Date.now(), error: null, source: 'test' },
  key: { configured: true, masked: '04a6***32c8', savedAt: '2026-10-24T00:00:00Z', file: 'C:/Users/x/.dsh/plugin-data/threatbook-intel/apikey.json' },
  bindingUrl: 'https://x.threatbook.com/v5/serviceCenter?tab=myKey',
  reportDirName: 'threatbook-reports',
  permissions: [{ endpoint: '/domain/query', label: '域名分析', at: Date.now() }],
  lastLookup: {
    indicator: 'bzb102.oss-cn-beijing.aliyuncs.com',
    type: 'domain', kind: 'Domain', at: '2026-10-24 04:00:00',
    markdownPath: 'C:/w/threatbook-reports/a.md', jsonPath: 'C:/w/threatbook-reports/a.json',
    reportDir: 'C:/w/threatbook-reports', digest: '- 判定：恶意', brief: '- 结论：恶意软件\n- 威胁评分：70/100 (P1 高优)',
    priority: 'P1 高优', score: 70, c2: ['45.1.2.3 (IP)'],
  },
  autoOpenedAt: 0,
  about: {
    portalUrl: 'https://www.lgsrc.cn',
    name: '灵糕中心 · 安全响应中心',
    intro: '灵糕中心 · 安全响应中心是用于打击计算机病毒与恶意网站的独立非营利组织。',
    version: '1.8.6',
    releaseDate: '2026-10-26',
    repoUrl: 'https://github.com/Lingggao/LGSRC',
    releasesUrl: 'https://github.com/Lingggao/LGSRC/releases',
    contactEmail: 'ling@lghub.org',
  },
  report: {
    dir: 'C:\\work\\threatbook-reports',
    defaultDir: 'C:\\work\\threatbook-reports',
    isDefault: true,
    outsideWorkspace: false,
    consentRequired: false,
    writable: true,
    retentionDays: 30,
    trashDir: 'C:\\work\\threatbook-reports\\.LGSRC-trash',
    reportCount: 2,
    reportBytes: 4096,
    trashCount: 0,
    trashBytes: 0,
    lastTrashBatch: null,
  },
};

function makeReact() {
  const states = [];
  let idx = 0;
  const React = {
    Fragment: Symbol('Fragment'),
    createElement(type, props, ...children) {
      return { type, props: { ...(props || {}), children: children.length <= 1 ? children[0] : children } };
    },
    useState(init) { const i = idx++; if (!(i in states)) states[i] = typeof init === 'function' ? init() : init; return [states[i], () => {}]; },
    useReducer(reducer, init) { const i = idx++; if (!(i in states)) states[i] = init; return [states[i], () => {}]; },
    useRef(v) { const i = idx++; if (!(i in states)) states[i] = { current: v }; return states[i]; },
    useEffect(fn) { try { fn(); } catch { /* 首次渲染的副作忽略 */ } },
    useMemo(fn) { return fn(); },
    useCallback(fn) { return fn; },
  };
  React.__reset = () => { idx = 0; };
  return React;
}

function render(scenario) {
  const React = makeReact();
  const store = {};
  const payload = structuredClone(basePayload);
  if (scenario === 'unconfigured') payload.key = { configured: false, masked: '', savedAt: null, file: payload.key.file };
  if (scenario === 'empty') payload.lastLookup = null;
  if (scenario === 'error') { payload.egress = { ip: null, at: 0, error: 'ENOTFOUND' }; }

  let factory = null;
  const sandbox = {
    window: {
      __ModuleLoader__: { load: (arg) => { factory = arg.factory; } },
      isSecureContext: true,
      location: { search: scenario === 'normal' ? '' : `?tb=${scenario}`, hash: '', href: 'http://127.0.0.1:3080/', reload: () => {}, pathname: '/' },
      localStorage: {
        getItem: (k) => (k in store ? store[k] : null),
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; },
      },
      history: { replaceState: () => {} },
    },
    document: {
      head: { appendChild: () => {} }, getElementById: () => null,
      createElement: () => ({ style: {}, setAttribute() {}, select() {}, remove() {}, textContent: '' }),
      body: { appendChild: () => {} }, execCommand: () => true,
    },
    navigator: { clipboard: { writeText: async () => {} } },
    fetch: async () => ({ ok: true, status: 200, json: async () => structuredClone(payload) }),
    setInterval: () => 0, clearInterval: () => {},
    setTimeout: (f) => { try { f(); } catch { /* 忽略 */ } }, clearTimeout: () => {},
    console,
  };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(clientFile, 'utf8'), sandbox);

  const registered = {};
  factory(() => React).apply({
    slots: { inject: (_k, cb) => cb(), register: (opts, Comp) => { registered[opts.name] = Comp; return () => {}; } },
  });

  const errors = [];
  for (const [slot, Comp] of Object.entries(registered)) {
    try {
      React.__reset();
      const walk = (node) => {
        if (node === null || typeof node !== 'object') return;
        if (Array.isArray(node)) { node.forEach(walk); return; }
        if (typeof node.type === 'function') { React.__reset(); walk(node.type(node.props || {})); }
      };
      walk(Comp({ sessionId: 'session-1' }));
    } catch (error) {
      errors.push(`${slot}: ${error.message}`);
    }
  }
  return { slots: Object.keys(registered).length, errors };
}

let failed = 0;
for (const scenario of targets) {
  const result = render(scenario);
  if (result.errors.length) {
    failed += 1;
    console.log(`FAIL [${scenario}]`);
    result.errors.forEach((e) => console.log('  ' + e));
  } else {
    console.log(`ok   [${scenario}] 槽位 ${result.slots}/${result.slots} 渲染通过`);
  }
}

if (failed) { console.error(`\n${failed} 个场景渲染失败`); process.exit(1); }
console.log('\n渲染冒烟测试通过');
