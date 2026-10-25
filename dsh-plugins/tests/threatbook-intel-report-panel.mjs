// 报告存放面板的交互契约测试：把 1.8.2 修掉的问题钉成断言，避免回归
// 用法：node dsh-plugins/tests/threatbook-intel-report-panel.mjs
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const clientFile = path.resolve(here, '..', 'threatbook-intel', 'client.js');
const CODE = fs.readFileSync(clientFile, 'utf8');

const baseReport = {
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
};

function makePayload(reportPatch = {}) {
  return {
    plugin: 'threatbook-intel',
    host: 'TEST-PC',
    platform: 'win32 x64',
    ips: [{ address: '192.168.1.20', iface: 'WLAN', family: 'IPv4' }],
    egress: { ip: '203.0.113.9', ipv4: '203.0.113.9', ipv6: null, at: Date.now(), error: null, source: 'test' },
    key: { configured: true, masked: '04a6***32c8', savedAt: '2026-10-24T00:00:00Z', file: 'C:/x/apikey.json' },
    bindingUrl: 'https://x.threatbook.com/v5/serviceCenter?tab=myKey',
    reportDirName: 'threatbook-reports',
    permissions: [],
    latestLookup: null,
    lastLookup: null,
    autoOpenedAt: 0,
  about: {
        name: '灵糕中心 · 安全响应中心',
        intro: '灵糕中心 · 安全响应中心是用于打击计算机病毒与恶意网站的独立非营利组织。',
        version: '1.8.5',
        releaseDate: '2026-10-26',
        repoUrl: 'https://github.com/Lingggao/LGSRC',
        releasesUrl: 'https://github.com/Lingggao/LGSRC/releases',
        contactEmail: 'ling@lghub.org',
      },
    report: { ...baseReport, ...reportPatch },
  };
}

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
    useRef(value) { const i = idx++; if (!(i in states)) states[i] = { current: value }; return states[i]; },
    useEffect(fn) { try { fn(); } catch { /* 首次渲染的副作用忽略 */ } },
    useMemo(fn) { return fn(); },
    useCallback(fn) { return fn; },
  };
  React.__reset = () => { idx = 0; };
  return React;
}

/** 文本递归收集：Btn 的子节点是 [spinner|null, 文案]，不能只取第一层 */
function textOf(node) {
  const out = [];
  const walk = (child) => {
    if (child === null || child === undefined) return;
    if (typeof child === 'string') { out.push(child); return; }
    if (typeof child === 'number') { out.push(String(child)); return; }
    if (Array.isArray(child)) { child.forEach(walk); return; }
    if (typeof child === 'object') walk(child.props && child.props.children);
  };
  walk(node.props && node.props.children);
  return out.join('');
}

let sandboxStyle = null;
let sandboxStyleCreated = 0;

async function renderSettings(payload) {
  const React = makeReact();
  let factory = null;
  const sandbox = {
    window: {
      __ModuleLoader__: { load: (arg) => { factory = arg.factory; } },
      isSecureContext: true,
      location: { search: '', hash: '', href: 'http://127.0.0.1:3080/', reload() {}, pathname: '/' },
      localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
      history: { replaceState() {} },
    },
    document: {
      head: { appendChild() { sandbox.__styleCreated = (sandbox.__styleCreated || 0) + 1; } },
      // 模拟插件热重载：旧样式表还在 document 上
      getElementById: (id) => (id === 'threatbook-intel-style' ? sandbox.__oldStyle : null),
      createElement: () => ({ style: {}, setAttribute() {}, select() {}, remove() {}, textContent: '' }),
      body: { appendChild() {} },
      execCommand: () => true,
    },
    navigator: { clipboard: { writeText: async () => {} } },
    fetch: async () => ({ ok: true, status: 200, json: async () => structuredClone(payload) }),
    setInterval: () => 0,
    clearInterval() {},
    setTimeout: (fn) => { try { fn(); } catch { /* 定时器回调忽略 */ } },
    clearTimeout() {},
    console,
  };
  sandbox.__oldStyle = { id: 'threatbook-intel-style', textContent: 'old-css' };
  vm.createContext(sandbox);
  vm.runInContext(CODE, sandbox);

  const registered = {};
  factory(() => React).apply({
    slots: { inject: (_k, cb) => cb(), register: (opts, Comp) => { registered[opts.name] = Comp; return () => {}; } },
  });
  const Panel = registered['settings.section'];

  const nodes = [];
  const collect = () => {
    nodes.length = 0;
    const walk = (node) => {
      if (node === null || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach(walk); return; }
      if (typeof node.type === 'function') { React.__reset(); walk(node.type(node.props || {})); return; }
      nodes.push(node);
      walk(node.props && node.props.children);
    };
    React.__reset();
    walk(Panel({}));
  };

  // 第一次渲染负责触发 refresh()，等状态回填后再采集一次
  collect();
  await new Promise((resolve) => globalThis.setTimeout(resolve, 30));
  collect();
  sandboxStyle = sandbox.__oldStyle;
  sandboxStyleCreated = sandbox.__styleCreated || 0;
  return nodes;
}

const buttons = (nodes) => nodes.filter((n) => n.type === 'button');
const allText = (nodes) => nodes.map(textOf).join(' ');
const hasText = (nodes, fragment) => allText(nodes).includes(fragment);

let passed = 0;
const failures = [];
const check = (name, ok, detail = '') => {
  if (ok) passed += 1;
  else failures.push(`${name}${detail ? ' → ' + detail : ''}`);
};

// 0. 渲染本身要先成立，否则后面全是假通过
{
  const nodes = await renderSettings(makePayload());
  check('设置页能渲染出报告存储分节', hasText(nodes, '报告存储'), `节点数 ${nodes.length}`);
}

// 1. 已授权的工作区外目录：不再常驻红色告警
{
  const nodes = await renderSettings(makePayload({ dir: 'D:\\Security\\reports', isDefault: false, outsideWorkspace: true, consentRequired: false }));
  check('已授权时不再误报', !hasText(nodes, '需要确认授权才能写入'), '仍出现待授权文案');
  check('已授权时给出中性说明', hasText(nodes, '已授权写入'));
}

// 2. 真正待授权时才提示，且用 warn 而不是 error
{
  const nodes = await renderSettings(makePayload({ dir: 'D:\\Security\\reports', isDefault: false, outsideWorkspace: true, consentRequired: true }));
  check('待授权时给出提示', hasText(nodes, '写入前需要确认授权'));
  const alerts = nodes.filter((n) => n.props.role === 'alert');
  check('待授权提示不是 alert', !alerts.some((n) => textOf(n).includes('需要确认授权')));
}

// 3. 保留期按钮暴露当前选中态
{
  const nodes = await renderSettings(makePayload({ retentionDays: 7 }));
  const retentions = buttons(nodes).filter((n) => /回收站(保留|永久保留)/.test(String(n.props['aria-label'] || '')));
  check('保留期按钮共三个', retentions.length === 3, String(retentions.length));
  const pressed = retentions.filter((n) => n.props['aria-pressed'] === 'true');
  check('恰好一个保留期被标记为选中', pressed.length === 1, String(pressed.length));
  check('选中项是 7 天', pressed.length === 1 && textOf(pressed[0]).includes('7'));
}

// 4. 清理入口是展开器，不是危险按钮
{
  const nodes = await renderSettings(makePayload());
  const toggle = buttons(nodes).find((n) => n.props.id === 'tb-list-btn');
  check('清理按钮存在', Boolean(toggle));
  check('清理按钮带 aria-expanded', Boolean(toggle) && toggle.props['aria-expanded'] === 'false', String(toggle && toggle.props['aria-expanded']));
  check('清理按钮带 aria-controls', Boolean(toggle) && toggle.props['aria-controls'] === 'tb-report-files');
  check('清理按钮不是危险色', Boolean(toggle) && toggle.props['data-danger'] === undefined, String(toggle && toggle.props['data-danger']));
  check('常态下不应出现危险按钮', buttons(nodes).filter((n) => n.props['data-danger'] === '1').length === 0);
}

// 5. 回收站有内容时才出现清空入口，且要二次确认
{
  const nodes = await renderSettings(makePayload({ trashCount: 3, trashBytes: 81920 }));
  const empty = buttons(nodes).find((n) => textOf(n) === '清空');
  check('回收站非空时出现清空入口', Boolean(empty));
  check('清空入口是危险色', Boolean(empty) && empty.props['data-danger'] === '1');
  check('未点击时不会直接出现确认清空', !hasText(nodes, '确认清空回收站'));
}

// 6. 打码开关与品牌「·」的可访问性约定
{
  const nodes = await renderSettings(makePayload());
  const hit = nodes.find((n) => n.props.role === 'button' && n.props.className === 'tb-hit');
  check('打码开关有 tb-hit 类名', Boolean(hit), '没有焦点样式挂点');
  const dot = nodes.find((n) => textOf(n) === '·');
  check('品牌「·」不再进入 Tab 顺序', !dot || dot.props.tabIndex === undefined, String(dot && dot.props.tabIndex));
  check('品牌「·」不进无障碍树', !dot || dot.props['aria-hidden'] === 'true');
}

// 7. 清除 API Key 需要二次确认
{
  const nodes = await renderSettings(makePayload());
  check('默认只显示「清除」', buttons(nodes).some((n) => textOf(n) === '清除'));
  check('默认不出现「确认清除」', !hasText(nodes, '确认清除'));
  const clear = buttons(nodes).find((n) => textOf(n) === '清除');
  check('「清除」本身不是危险按钮', Boolean(clear) && clear.props['data-danger'] === undefined);
}

// 8. 关于分节：简介、版本、更新与反馈入口
{
  const nodes = await renderSettings(makePayload());
  check('关于分节存在', hasText(nodes, '关于'));
  check('包含机构简介', hasText(nodes, '灵糕中心 · 安全响应中心是用于打击计算机病毒与恶意网站'));
  check('显示当前版本', hasText(nodes, '当前版本 v1.8.5'));
  check('版本行不再重复机构名', !nodes.some((n) => textOf(n) === '灵糕中心 · 安全响应中心'));
  check('显示发布日期', hasText(nodes, '发布于 2026-10-26'));
  check('提供检查更新按钮', buttons(nodes).some((n) => textOf(n) === '检查更新'));
  check('提供反馈按钮', buttons(nodes).some((n) => textOf(n) === '反馈与建议'));
  check('显示反馈邮箱', hasText(nodes, 'ling@lghub.org'));
  const links = nodes.filter((n) => n.type === 'a');
  check('外链标注在新窗口打开', links.some((n) => String(n.props['aria-label'] || '').includes('新窗口打开')));
  check('外链使用统一链接样式', links.length > 0 && links.every((n) => n.props.className === 'tb-link'));
  const aboutLinks = links.filter((n) => String(n.props['aria-label'] || '').includes('在新窗口打开')
    && !String(n.props['aria-label'] || '').includes('绑定页'));
  check('门户网站排在关于链接第一位', aboutLinks[0] && aboutLinks[0].props.href === 'https://www.lgsrc.cn', String(aboutLinks[0] && aboutLinks[0].props.href));
  check('提供 GitHub 主页链接', links.some((n) => textOf(n) === 'GitHub 主页↗'));
}

// 9. 按钮高度与宽度规则
{
  const btnRule = CODE.match(/\.tb-btn\{[^}]*min-height:(\d+)px/);
  check('常规按钮高度 28px', Boolean(btnRule) && btnRule[1] === '28', btnRule && btnRule[1]);
  check('没有 24px 高的按钮规则', !/min-height:24px/.test(CODE));
  const inputRule = CODE.match(/input:\s*\{[\s\S]*?minHeight:\s*'(\d+)px'/);
  check('输入框与按钮同高', Boolean(inputRule) && inputRule[1] === '28', inputRule && inputRule[1]);

  // 宽度规则：44 + 12 × 字数
  const helperStart = CODE.indexOf('function buttonLabel(');
  const helperEnd = CODE.indexOf('function Btn(');
  check('存在按钮宽度函数', helperStart >= 0 && helperEnd > helperStart);
  const { buttonWidth } = new Function(CODE.slice(helperStart, helperEnd) + '\nreturn { buttonWidth };')();
  check('两字按钮宽度一致 (中文 vs 英文)', buttonWidth('取消') === buttonWidth('OK'), buttonWidth('取消') + ' / ' + buttonWidth('OK'));
  check('一字到四字统一 92px', buttonWidth('好') === 92 && buttonWidth('复制路径') === 92, buttonWidth('好') + ' / ' + buttonWidth('复制路径'));
  check('五字按钮也是 92px', buttonWidth('打开绑定页') === 92, buttonWidth('打开绑定页'));
  check('六字按钮自动加宽到 116px', buttonWidth('恢复默认目录') === 116, buttonWidth('恢复默认目录'));
  check('五字按钮加载时放宽到 104px', buttonWidth('保存到本机', true) === 104, buttonWidth('保存到本机', true));
  check('四字按钮加载时仍 92px', buttonWidth('检查更新', true) === 92, buttonWidth('检查更新', true));

  const nodes = await renderSettings(makePayload());
  const btns = buttons(nodes);
  const byLength = new Map();
  let formulaOk = true;
  for (const b of btns) {
    const len = Array.from(textOf(b)).length;
    const width = b.props.style && b.props.style.width;
    const expected = (len <= 5 ? 92 : 44 + 12 * len) + 'px';
    if (width !== expected) formulaOk = false;
    if (!byLength.has(len)) byLength.set(len, new Set());
    byLength.get(len).add(width);
  }
  check('按钮宽度都符合字数公式', formulaOk, [...byLength.entries()].map(([k, v]) => k + ':' + [...v].join('/')).join(' '));
  check('同字数按钮宽度完全一致', [...byLength.values()].every((set) => set.size === 1), [...byLength.entries()].map(([k, v]) => k + ':' + [...v].join('/')).join(' '));
}

// 10. 样式表热重载：旧 <style> 必须被新规则覆盖
{
  await renderSettings(makePayload());
  check('热重载覆盖旧样式表', sandboxStyle && sandboxStyle.textContent !== 'old-css' && sandboxStyle.textContent.includes('.tb-btn{'), sandboxStyle && sandboxStyle.textContent.slice(0, 20));
  check('新样式含统一按钮高度', sandboxStyle && sandboxStyle.textContent.includes('height:28px'));
  check('没有重复插入样式标签', sandboxStyleCreated === 0, sandboxStyleCreated);
}

// 11. 文案与样式收敛
{
  const nodes = await renderSettings(makePayload());
  check('目录操作统一为「打开文件夹」', hasText(nodes, '打开文件夹') && !hasText(nodes, '打开目录') && !hasText(nodes, '打开报告目录'));
  check('没有内联字号硬编码', !/fontSize: '\d+px'/.test(CODE));
  check('按钮没有遗留尺寸变体', !/data-size/.test(CODE));
}

console.log(`\n通过 ${passed} 项，失败 ${failures.length} 项`);
if (failures.length) {
  failures.forEach((f) => console.log('  ✗ ' + f));
  process.exit(1);
}
console.log('报告面板契约测试通过');
