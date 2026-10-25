/**
 * 微步在线情报插件 — Web Client 半边。
 *
 * 两个渲染位置：
 *   · conversation.composer.dock：输入框下方的一行状态条 / 首次配置卡片 (IP + 复制 + 绑定 + 保存 API Key)
 *   · settings.section：完整的「微步情报查询」设置页 (全部网卡 IP、绑定步骤、API Key 管理、连通性测试、最近报告)
 *
 * 所有宿主数据都通过本机回环路由 /threatbook/* 读取，API Key 不出本机。
 */
window.__ModuleLoader__.load({
  id: 'dsh-threatbook-intel',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const STATE_URL = '/threatbook/state';
    const ACTION_URL = '/threatbook/action';
    const REFRESH_MS = 20000;

    // ------------------------------------------------------------ 界面预览 (开发用)
    // 进入方式：在 GUI 地址后加 ?tb=<场景>，例如 http://127.0.0.1:3080/?tb=unconfigured
    // 进入后顶部会出现切换条，可点按钮换场景，不会读写真实 API Key。

    const PREVIEW_LABELS = {
      configured: '已配置 API Key',
      unconfigured: '未配置 API Key',
      loading: '读取中',
      error: '本机服务不可用',
      empty: '无查询记录',
      last: '含最近查询',
      notice: '带提示',
    };

    let PREVIEW = (() => {
      try {
        const fromUrl = new URLSearchParams(window.location.search || '').get('tb');
        if (fromUrl && PREVIEW_LABELS[fromUrl]) {
          try { window.localStorage.setItem('threatbook:preview', fromUrl); } catch { /* 忽略 */ }
          return fromUrl;
        }
        const stored = window.localStorage.getItem('threatbook:preview');
        if (stored && PREVIEW_LABELS[stored]) return stored;
      } catch { /* 无 localStorage 时不进预览 */ }
      return null;
    })();
    const PREVIEW_ORDER = ['unconfigured', 'configured', 'last', 'empty', 'notice', 'loading', 'error'];

    function setPreview(kind) {
      PREVIEW = kind || null;
      try {
        if (PREVIEW) window.localStorage.setItem('threatbook:preview', PREVIEW);
        else window.localStorage.removeItem('threatbook:preview');
      } catch { /* 忽略 */ }
      notify('ok', PREVIEW ? `界面预览：${PREVIEW_LABELS[PREVIEW]}` : '已退出预览，显示真实数据');
      refresh();
    }

    function cyclePreview() {
      const index = PREVIEW ? PREVIEW_ORDER.indexOf(PREVIEW) : -1;
      const next = index + 1 >= PREVIEW_ORDER.length ? null : PREVIEW_ORDER[index + 1];
      setPreview(next);
    }


    function previewPayload(kind) {
      const payload = {
        plugin: 'threatbook-intel',
        host: 'PREVIEW-PC',
        platform: 'win32 x64',
        ips: [
          { address: '192.168.1.20', iface: 'WLAN', family: 'IPv4', mac: 'aa-bb' },
          { address: '240e:86c:48:26c7::1', iface: 'WLAN', family: 'IPv6', mac: 'aa-bb' },
        ],
        egress: { ip: '203.0.113.9', ipv4: '203.0.113.9', ipv6: '240e:86c:48:26c7::1', at: Date.now(), error: null, source: 'preview' },
        key: {
          configured: true,
          masked: '04a6***32c8',
          savedAt: '2026-10-24 12:00',
          file: 'C:\\Users\\you\\.dsh\\plugin-data\\threatbook-intel\\apikey.json',
        },
        bindingUrl: 'https://x.threatbook.com/v5/serviceCenter?tab=myKey',
        reportDirName: 'threatbook-reports',
        lastLookup: {
          kind: 'Hash',
          indicator: '243c526b8b42…f02739bc6a3',
          type: 'sha256',
          at: '2026-10-24 12:00:00',
          markdownPath: 'C:\\work\\threatbook-reports\\sha256-243c….md',
          jsonPath: 'C:\\work\\threatbook-reports\\sha256-243c….json',
          reportDir: 'C:\\work\\threatbook-reports',
          brief: '- 结论：恶意 / 木马 / PatchedHostLoader\n- 文件：sample.exe (exe)\n- 检出：38/70',
          digest: '- 判定：恶意 (Trojan)\n- 家族：PatchedHostLoader\n- 检出：9/28\n- 关键行为：APC 注入、隐藏窗口、计划任务持久化',
        },
        autoOpenedAt: 0,
        permissions: [],
      };
      if (kind === 'unconfigured') {
        payload.key = { configured: false, masked: '', savedAt: null, file: payload.key.file };
        payload.lastLookup = null;
      }
      if (kind === 'empty') payload.lastLookup = null;
      return payload;
    }

    // ------------------------------------------------------------ 共享状态

    const store = {
      data: null,
      error: null,
      loading: true,
      listeners: new Set(),
      busy: false,
      notice: null,
      ipVisible: false,
      keyCheck: null,
    };

    function emit() {
      for (const fn of [...store.listeners]) {
        try { fn(); } catch { /* 单个订阅者出错不影响其他订阅者 */ }
      }
    }

    function patch(next) {
      Object.assign(store, next);
      emit();
    }

    let inflight = null;

    function refresh() {
      if (PREVIEW) {
        if (PREVIEW === 'loading') {
          patch({ data: null, error: null, loading: true, notice: null });
          return Promise.resolve();
        }
        if (PREVIEW === 'error') {
          patch({ data: null, error: '预览：无法连接本机服务 (模拟)', loading: false, notice: null });
          return Promise.resolve();
        }
        patch({
          data: previewPayload(PREVIEW),
          error: null,
          loading: false,
          notice: PREVIEW === 'notice' ? { kind: 'error', text: '预览：API Key 校验未通过 (模拟)' } : null,
        });
        return Promise.resolve();
      }
      if (inflight) return inflight;
      inflight = (async () => {
        try {
          const res = await fetch(STATE_URL, { headers: { accept: 'application/json' }, cache: 'no-store' });
          if (res.status === 401 || res.status === 403) throw new Error('授权已失效，请刷新页面 (Ctrl+R)');
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          patch({ data, error: null, loading: false });
        } catch (error) {
          patch({ error: error && error.message ? error.message : String(error), loading: false });
        } finally {
          inflight = null;
        }
      })();
      return inflight;
    }

    let noticeTimer = null;

    function notify(kind, text) {
      patch({ notice: { kind, text } });
      if (noticeTimer) clearTimeout(noticeTimer);
      noticeTimer = setTimeout(() => patch({ notice: null }), 5000);
    }

    async function act(action, payload) {
      if (PREVIEW) { notify('ok', '界面预览模式，操作已禁用'); return null; }
      patch({ busy: true, notice: null });
      try {
        const res = await fetch(ACTION_URL, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action, ...(payload || {}) }),
        });
        const body = await res.json().catch(() => ({}));
        if (res.status === 401 || res.status === 403) throw new Error('授权已失效，请刷新页面 (Ctrl+R)');
        if (!res.ok) throw new Error(body && body.error ? body.error : `HTTP ${res.status}`);
        if (body.state) patch({ data: body.state });
        else await refresh();
        return body;
      } catch (error) {
        notify('error', error && error.message ? error.message : String(error));
        return null;
      } finally {
        patch({ busy: false });
      }
    }

    function useStore() {
      const [, force] = React.useReducer((x) => x + 1, 0);
      React.useEffect(() => {
        const fn = () => force();
        store.listeners.add(fn);
        if (!store.data && !store.error) refresh();
        return () => { store.listeners.delete(fn); };
      }, []);
      return store;
    }

    // 只有一个 dock 实例负责轮询与“自动打开绑定页”
    let pollerStarted = false;
    let autoOpenTried = false;

    function ensurePoller() {
      if (pollerStarted) return;
      pollerStarted = true;
      refresh();
      setInterval(() => { if (!document.hidden) refresh(); }, REFRESH_MS);
    }

    // ------------------------------------------------------------ 小工具

    async function copyText(text) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
          return true;
        }
      } catch { /* 落到 execCommand */ }
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-1000px';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand('copy');
        ta.remove();
        return ok;
      } catch {
        return false;
      }
    }

    const C = {
      text: 'var(--dsw-alias-label-primary)',
      dim: 'var(--dsw-alias-label-secondary)',
      faint: 'var(--dsw-alias-label-tertiary, var(--dsw-alias-label-secondary))',
      line: 'var(--dsw-alias-border-l1)',
      lineStrong: 'var(--dsw-alias-border-l2)',
      surface: 'var(--dsw-alias-bg-layer-1)',
      surface2: 'var(--dsw-alias-bg-layer-2)',
      hover: 'var(--dsw-alias-interactive-bg-hover, var(--dsw-alias-bg-layer-2))',
      brand: 'var(--dsw-alias-brand-primary)',
      ok: 'var(--dsw-alias-state-success-primary)',
      warn: 'var(--dsw-alias-state-warn-primary)',
      err: 'var(--dsw-alias-state-error-primary)',
    };

    // 设计令牌：间距 / 圆角 / 字号统一从这里取值，避免散落硬编码
    const SPACE = { xs: '4px', sm: '6px', md: '8px', lg: '12px', xl: '16px' };
    const RADIUS = { sm: '8px', md: '10px', lg: '12px', pill: '999px' };
    const FS = { body: '12px', page: '16px' };
    const LIST_COLS = 'minmax(0, 1fr) 92px 56px 76px';

    const css = {
      // 状态条
      bar: {
        display: 'flex', alignItems: 'center', gap: SPACE.md, flexWrap: 'wrap',
        fontSize: FS.body, lineHeight: '20px', color: C.dim, padding: '4px 2px 2px',
      },
      strong: { color: C.text, fontWeight: 600, whiteSpace: 'nowrap' },
      mono: { color: C.text, fontSize: FS.body },
      monoSm: { fontSize: FS.body, color: C.dim },
      dot: (color, size = 7) => ({
        width: `${size}px`, height: `${size}px`, borderRadius: '50%', display: 'inline-block',
        background: color, flex: '0 0 auto',
        boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 22%, transparent)`,
      }),
      ring: (color, size = 9) => ({
        width: `${size}px`, height: `${size}px`, borderRadius: '50%', display: 'inline-block',
        border: `1.5px solid ${color}`, background: 'transparent', flex: '0 0 auto',
        boxSizing: 'border-box',
      }),
      group: { display: 'inline-flex', alignItems: 'center', gap: SPACE.sm, minWidth: '0' },

      input: {
        flex: '1 1 240px', minWidth: '180px', boxSizing: 'border-box', minHeight: '32px',
        border: `1px solid ${C.lineStrong}`, background: C.surface2, color: C.text,
        borderRadius: RADIUS.sm, padding: '6px 10px', fontSize: FS.body,
      },

      // 容器
      card: {
        border: `1px solid ${C.line}`, background: C.surface, borderRadius: RADIUS.lg,
        padding: SPACE.xl, display: 'flex', flexDirection: 'column', gap: SPACE.lg,
        boxSizing: 'border-box', width: '100%',
      },
      page: { display: 'flex', flexDirection: 'column', gap: SPACE.lg, padding: '4px 2px 24px', maxWidth: '880px', fontSize: FS.body, lineHeight: '20px' },
      h1: { margin: 0, fontSize: FS.page, fontWeight: 600, color: C.text },
      sub: { margin: 0, fontSize: FS.body, color: C.dim, lineHeight: '20px' },
      row: { display: 'flex', alignItems: 'center', gap: SPACE.md, flexWrap: 'wrap' },
      field: { display: 'flex', flexDirection: 'column', gap: SPACE.sm, width: '100%' },
      fieldLabel: { fontSize: FS.body, fontWeight: 600, color: C.text },

      // 步骤
      steps: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: SPACE.md },
      stepCard: {
        display: 'flex', flexDirection: 'column', gap: SPACE.sm, padding: '10px 12px',
        background: C.surface2, border: `1px solid ${C.line}`, borderRadius: RADIUS.md,
      },
      stepNo: {
        width: '18px', height: '18px', borderRadius: '50%', background: C.brand, color: '#FFFFFF',
        fontSize: FS.body, fontWeight: 700, lineHeight: '1', textAlign: 'center', boxSizing: 'border-box',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
      },
      subNo: {
        width: '18px', height: '18px', borderRadius: '50%', background: 'transparent',
        border: `1px solid ${C.lineStrong}`, color: C.dim, boxSizing: 'border-box',
        fontSize: FS.body, fontWeight: 600, lineHeight: '1', textAlign: 'center',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
      },
      stepTitle: { fontSize: FS.body, fontWeight: 600, color: C.text },
      stepDesc: { fontSize: FS.body, color: C.dim, lineHeight: '18px' },

      // 小标签
      badge: (tone) => {
        const color = tone === 'ok' ? C.ok
          : tone === 'warn' ? C.warn
            : tone === 'error' ? C.err
              : tone === 'info' ? C.brand
                : null;
        return {
          fontSize: FS.body, lineHeight: '18px', padding: '2px 8px', borderRadius: RADIUS.pill,
          border: `1px solid ${color || C.line}`,
          color: color || C.dim,
          background: color ? 'transparent' : C.surface2,
          whiteSpace: 'nowrap',
        };
      },

      // 网卡列表：固定列宽的网格，表头与操作按钮天然对齐，也不会横向溢出
      listHead: {
        display: 'grid', gridTemplateColumns: LIST_COLS,
        alignItems: 'center', color: C.faint, borderBottom: `1px solid ${C.line}`,
        fontSize: FS.body,
      },
      listRow: {
        display: 'grid', gridTemplateColumns: LIST_COLS, alignItems: 'center',
        borderBottom: `1px solid ${C.line}`, fontSize: FS.body, lineHeight: '20px',
      },
      listHeadCell: { padding: '0 10px 8px', fontWeight: 500, whiteSpace: 'nowrap' },
      listCell: { padding: '8px 10px', color: C.text, minWidth: '0', fontSize: FS.body },

      link: { color: C.brand, textDecoration: 'none', fontSize: FS.body, overflowWrap: 'anywhere' },
      hint: { fontSize: FS.body, color: C.dim, lineHeight: '18px' },
      faint: { fontSize: FS.body, color: C.faint, overflowWrap: 'anywhere' },
      preview: {
        display: 'flex', alignItems: 'center', gap: SPACE.sm, flexWrap: 'wrap', width: '100%',
        padding: '6px 10px', marginBottom: SPACE.md, boxSizing: 'border-box',
        border: `1px dashed ${C.lineStrong}`, borderRadius: RADIUS.md, background: C.surface2,
        fontSize: FS.body, color: C.dim,
      },
      notice: (kind) => ({
        fontSize: FS.body, color: kind === 'error' ? C.err : C.ok,
        background: C.surface2, border: `1px solid ${C.line}`,
        borderRadius: RADIUS.sm, padding: '8px 12px',
        display: 'flex', alignItems: 'flex-start', gap: SPACE.md,
      }),
    };


    function Spinner() {
      return h('span', { className: 'tb-spin', 'aria-hidden': 'true' });
    }

    function Btn(props) {
      ensureStyle();
      const off = Boolean(props.disabled) || store.busy || Boolean(props.loading);
      return h('button', {
        type: 'button',
        className: 'tb-btn',
        'data-primary': props.primary ? '1' : '0',
        'data-size': props.size === 'sm' ? 'sm' : 'md',
        style: props.style,
        title: props.title,
        'aria-label': props.ariaLabel,
        'aria-busy': props.loading ? 'true' : undefined,
        disabled: off,
        onClick: props.onClick,
        onKeyDown: props.onKeyDown,
      },
      props.loading ? h(Spinner, null) : null,
      props.children);
    }

    // 统一的状态提示：图标 + 文本，颜色之外还有语义
    function Notice(props) {
      const isError = props.kind === 'error';
      return h('div', { role: isError ? 'alert' : 'status', 'aria-live': 'polite', style: css.notice(props.kind) },
        h('span', { 'aria-hidden': 'true', style: { fontWeight: 700 } }, isError ? '!' : '✓'),
        h('span', null, props.text));
    }

    function Badge(props) {
      // 颜色之外还带文字；有详细原因时同时给悬停提示与无障碍名称
      const label = props.title ? `${props.children}：${props.title}` : undefined;
      return h('span', { style: css.badge(props.tone), title: props.title, 'aria-label': label }, props.children);
    }

    function StepCard(props) {
      return h('div', { style: css.stepCard },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
          h('span', { style: css.subNo }, props.n),
          h('span', { style: css.stepTitle }, props.title)),
        props.desc || props.action
          ? h('div', { style: { display: 'flex', alignItems: 'center', gap: SPACE.md, minHeight: '24px' } },
              props.desc ? h('span', { style: { ...css.stepDesc, flex: '1 1 auto', minWidth: '0' } }, props.desc) : null,
              props.action ? h('span', { style: { flex: '0 0 auto' } }, props.action) : null)
          : null,
        props.children ? h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' } }, props.children) : null);
    }

    function SectionHead(props) {
      return h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' } },
        h('span', { style: css.stepNo }, props.n),
        h('span', { style: { fontSize: '12px', fontWeight: 600, color: C.text } }, props.title),
        props.hint ? h('span', { style: css.hint }, props.hint) : null,
        props.children || null);
    }


    // API Key 徽章：按校验结果与配置状态给出文案、颜色档位与提示
    function keyBadge(check, configured) {
      const settled = check && !check.loading;
      if (settled && check.kind === 'quota') {
        return { tone: 'info', text: '额度用尽', title: check.message || 'Key 有效，但当前被频率或配额限制' };
      }
      if (settled && !check.ok) return { tone: 'error', text: '校验未通过', title: check.message };
      if (configured) return { tone: 'ok', text: '已配置' };
      return { tone: 'warn', text: '未配置' };
    }

    // 出口 IP 默认打码，便于截图分享；点「点击显示」临时还原
    function maskIp(value) {
      const raw = String(value || '').trim();
      if (!raw || !/^[0-9a-fA-F.:]+$/.test(raw)) return raw;
      if (raw.includes(':')) {
        const parts = raw.split(':');
        if (parts.length <= 2) return raw;
        return [parts[0], ...parts.slice(1, -1).map((p) => (p ? '***' : '')), parts[parts.length - 1]].join(':');
      }
      const octets = raw.split('.');
      if (octets.length !== 4) return raw;
      return [octets[0], '*'.repeat(octets[1].length), '*'.repeat(octets[2].length), octets[3]].join('.');
    }

    // 指标较长时按「前 10 + … + 后 10」固定截断，保证各行长度可预期
    function shortIndicator(text, head = 10, tail = 10) {
      const value = String(text || '');
      if (value.length <= head + tail + 1) return value;
      return `${value.slice(0, head)}…${value.slice(-tail)}`;
    }

    function IpValue(props) {
      const text = props.ip === undefined || props.ip === null || props.ip === '' ? '未获取' : String(props.ip);
      return h('span', { style: props.style }, store.ipVisible ? text : maskIp(text));
    }

    function IpToggle() {
      const visible = Boolean(store.ipVisible);
      return h('span', {
        onClick: () => patch({ ipVisible: !store.ipVisible }),
        title: visible ? '打码显示出口 IP' : '显示完整出口 IP',
        style: { cursor: 'pointer', fontSize: '12px', color: C.dim },
      }, visible ? '(点击隐藏)' : '(点击显示)');
    }

    function useCopy() {
      const [copied, setCopied] = React.useState(null);
      const timer = React.useRef(null);
      return [copied, async (text, tag) => {
        const ok = await copyText(text);
        setCopied(ok ? (tag || text) : null);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(null), 1500);
        return ok;
      }];
    }

    // ------------------------------------------------------------ 输入框下方状态条 / 首次配置卡片

    function DockPanelInner(props) {
      const s = useStore();
      const [copied, doCopy] = useCopy();
      const [draft, setDraft] = React.useState('');
      const [showKey, setShowKey] = React.useState(false);
      const [saving, setSaving] = React.useState(false);
      const sessionId = props && props.sessionId ? props.sessionId : null;

      React.useEffect(() => {
        ensurePoller();
      }, []);

      const data = s.data;
      const configured = Boolean(data && data.key && data.key.configured);

      React.useEffect(() => {
        if (!data || autoOpenTried) return;
        autoOpenTried = true;
        if (!configured && !data.autoOpenedAt) act('open-binding-auto');
      }, [data, configured]);

      if (!data) {
        if (s.error) {
          return h('div', { style: css.bar }, h('span', { style: css.dot(C.err), 'aria-hidden': 'true' }),
            h('span', null, h(BrandName, null), `：本机服务未就绪 (${s.error})`));
        }
        return h('div', { style: css.bar }, h('span', { style: css.dot(C.warn), 'aria-hidden': 'true' }),
          h('span', null, h(BrandName, null), '：正在读取本机 IP…'));
      }

      const egress = data.egress || {};
      const primaryIp = egress.ip || (data.ips && data.ips[0] && data.ips[0].address) || '未获取';
      const nicIps = (data.ips || []).map((x) => x.address).join(' / ') || '无';
      const last = data.lastLookup;

      const save = async () => {
        const value = draft.trim();
        if (!value) return;
        setSaving(true);
        let res = null;
        try {
          res = await act('save-key', { apikey: value });
        } finally {
          setSaving(false);
        }
        if (!res) return;
        setDraft('');
        setShowKey(false);
        const v = await act('verify');
        patch({ keyCheck: v && v.verify ? v.verify : null });
        if (v && v.verify) {
          if (v.verify.ok) notify('ok', 'API Key 已保存，连通性校验通过。');
          else notify('error', `API Key 已保存，但校验未通过：${v.verify.message}`);
        } else {
          notify('ok', 'API Key 已保存到本机。');
        }
      };

      if (!configured) {
        return h('div', { style: { width: '100%' } },
          h('div', { style: css.card },
            h('div', { style: css.row },
              h('span', { style: css.ring(C.warn), 'aria-hidden': 'true' }),
              h(BrandName, { style: { fontSize: '12px', fontWeight: 600, color: C.text } }),
              h(Badge, { tone: 'warn' }, '未配置 API Key'),
              h('span', { style: { fontSize: '12px', color: C.dim } }, '三步开始使用')),
            h('div', { style: css.steps },
              h(StepCard, { n: '1', title: '复制出口 IP', desc: '要绑定到微步「我的 KEY」白名单的地址' },
                h(IpValue, { ip: primaryIp, style: css.mono }),
                h(IpToggle, null),
                h(Btn, { onClick: () => doCopy(primaryIp, 'ip') }, copied === 'ip' ? '已复制' : '复制')),
              h(StepCard, { n: '2', title: '添加到白名单', desc: '登录微步 X 情报中心 → 我的 KEY → 添加 IP' },
                h(Btn, { onClick: () => act('open-binding') }, '打开绑定页')),
              h(StepCard, { n: '3', title: '保存 API Key', desc: '只写入本机文件，不上传、不同步' },
                showKey
                  ? h(React.Fragment, null,
                      h('input', {
                        className: 'tb-input', style: css.input, type: 'password', placeholder: '粘贴 API Key',
                      'aria-label': 'API Key',
                        value: draft, autoFocus: true,
                        onChange: (e) => setDraft(e.target.value),
                        onKeyDown: (e) => { if (e.key === 'Enter') save(); },
                      }),
                      h(Btn, { primary: true, onClick: save, loading: saving, disabled: !draft.trim() }, '保存到本机'),
                      h(Btn, { onClick: () => { setShowKey(false); setDraft(''); } }, '取消'),
                    )
                  : h(Btn, { primary: true, onClick: () => setShowKey(true) }, '粘贴 API Key')),
            ),
            h('div', { style: { ...css.row } },
              h('span', { style: css.hint }, `网卡 IP：${nicIps}`),
              h(Btn, { onClick: () => act('refresh-egress') }, '重新探测'),
              egress.error ? h('span', { style: { fontSize: '12px', color: C.err } }, `探测失败：${egress.error}`) : null),
            s.notice ? h(Notice, { kind: s.notice.kind, text: s.notice.text }) : null,
          ),
        );
      }

      return h('div', {
        role: 'group',
        'aria-label': '微步情报查询状态条',
        style: {
          display: 'flex', flexDirection: 'column', gap: SPACE.sm, padding: '4px 2px 2px',
          width: '100%', boxSizing: 'border-box', fontSize: FS.body, lineHeight: '20px', color: C.dim,
        },
      },
        // 第一行：标题 + 出口 IP + 复制 + 绑定
        h('div', { style: css.row },
          h('span', { style: css.dot(C.ok), 'aria-hidden': 'true' }),
          h(BrandName, { style: css.strong }),
          h('span', { style: css.group },
            h('span', null, '出口 IP'),
            h(IpValue, { ip: primaryIp, style: css.mono }),
            h(IpToggle, null),
            h(Btn, { onClick: () => doCopy(primaryIp, 'ip'), title: '复制出口 IP', ariaLabel: '复制出口 IP' }, copied === 'ip' ? '已复制' : '复制'),
            h(Btn, { onClick: () => act('open-binding'), title: '打开微步「我的 KEY」绑定页' }, '绑定'))),
        // 第二行：API Key + 最近查询；强制定在一行，指标超长时用省略号收尾
        h('div', { style: { ...css.row, flexWrap: 'nowrap', minWidth: '0' } },
          h('span', { style: { ...css.group, flex: '0 0 auto' }, title: data.key.file },
            h('span', null, 'API Key'),
            h('span', { style: css.mono }, data.key.masked)),
          last
            ? h('span', { style: { ...css.group, flex: '0 1 auto', minWidth: '0' }, title: last.indicator },
                h('span', { style: { flex: '0 0 auto' } }, '最近查询'),
                h('span', {
                  style: {
                    ...css.mono, flex: '0 1 auto', minWidth: '0', overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block',
                  },
                }, shortIndicator(last.indicator)),
                h('span', { style: { ...css.faint, flex: '0 0 auto' } }, `(${last.kind || last.type})`))
            : h('span', { style: { ...css.hint, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } },
                '在对话中粘贴 IP / Domain / Hash / URL / CVE 即可查询')),
        // 第三行：操作按钮
        last
          ? h('div', { style: css.row },
              sessionId ? h(Btn, { primary: true, onClick: () => act('summarize', { sessionId }), title: '让 AI 针对这次查询写一段总结' }, 'AI 总结') : null,
              last.markdownPath ? h(Btn, { onClick: () => act('open-report', { path: last.markdownPath }) }, '打开报告') : null,
              last.reportDir ? h(Btn, { onClick: () => act('open-folder', { path: last.reportDir }) }, '打开目录') : null)
          : null,
        s.notice ? h(Notice, { kind: s.notice.kind, text: s.notice.text }) : null,
      );
    }

    // ------------------------------------------------------------ 设置页

    function SettingsPanelInner() {
      const s = useStore();
      const [copied, doCopy] = useCopy();
      const [draft, setDraft] = React.useState('');
      const [editing, setEditing] = React.useState(false);
      const [verify, setVerify] = React.useState(null);
      const [saving, setSaving] = React.useState(false);
      const [testing, setTesting] = React.useState(false);

      React.useEffect(() => { ensurePoller(); }, []);

      const data = s.data;
      if (!data) {
        return h('div', { style: css.page },
          h('h1', { style: css.h1 }, h(BrandName, null)),
          h('p', { style: css.sub }, s.error ? `本机服务未就绪：${s.error}` : '正在读取…'));
      }

      const egress = data.egress || {};
      const last = data.lastLookup;

      const save = async () => {
        const value = draft.trim();
        if (!value) return;
        setSaving(true);
        try {
          const r = await act('save-key', { apikey: value });
          if (!r) return;
          setDraft('');
          setEditing(false);
          setVerify({ loading: true, ok: false, message: '正在校验…' });
          const v = await act('verify');
          setVerify(v && v.verify ? v.verify : null);
          patch({ keyCheck: v && v.verify ? v.verify : null });
        } finally {
          setSaving(false);
        }
      };

      const test = async () => {
        setVerify({ loading: true, ok: false, message: '正在校验…' });
        setTesting(true);
        try {
          const r = await act('verify');
          if (r && r.verify) {
            setVerify(r.verify);
            patch({ keyCheck: r.verify });
          }
        } finally {
          setTesting(false);
        }
      };

      return h('div', { style: css.page },
        h('div', null,
          h('h1', { style: css.h1 }, h(BrandName, null)),
          h('p', { style: { ...css.sub, marginTop: '6px' } },
            '输入 IP / Domain / Hash / URL / CVE 查询情报。微步 API Key 本地存储，查询直连 api.threatbook.cn。')),

        // 1. 本机 IP
        h('div', { style: css.card },
          h(SectionHead, { n: '1', title: 'IP 地址', hint: '需在「我的 KEY」绑定出口 IP 后才可调用' }),
          h('div', { style: css.row },
            h('span', { style: { fontSize: '12px', color: C.dim } }, '出口 IP'),
            h(IpValue, { ip: egress.ip || '未探测到', style: css.mono }),
            h(IpToggle, null),
            h(Btn, { onClick: () => doCopy(egress.ip || '', 'eg') }, copied === 'eg' ? '已复制' : '复制'),
            h(Btn, { onClick: () => act('refresh-egress') }, '重新探测'),
            egress.error ? h('span', { style: { fontSize: '12px', color: C.err } }, `探测失败：${egress.error}`) : null,
            egress.at && !egress.error ? h('span', { style: css.faint }, `探测于 ${new Date(egress.at).toLocaleTimeString('zh-CN', { hour12: false })}`) : null),
          h('div', null,
            h('div', { style: css.listHead },
              h('span', { style: css.listHeadCell }, '网卡 IP'),
              h('span', { style: css.listHeadCell }, '接口'),
              h('span', { style: css.listHeadCell }, '协议'),
              h('span', { style: { ...css.listHeadCell, textAlign: 'center', padding: '0 0 8px' } }, '操作')),
            (data.ips || []).map((ip) => h('div', { key: `${ip.iface}-${ip.address}`, style: css.listRow },
              h('span', {
                style: { ...css.listCell, ...css.mono, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
                title: ip.address,
              }, ip.address),
              h('span', { style: { ...css.listCell, color: C.dim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, title: ip.iface }, ip.iface),
              h('span', { style: { ...css.listCell, color: C.dim, whiteSpace: 'nowrap' } }, ip.family),
              h('span', { style: { ...css.listCell, padding: '8px 0', display: 'flex', justifyContent: 'center' } },
                h(Btn, { size: 'sm', onClick: () => doCopy(ip.address, ip.address) }, copied === ip.address ? '已复制' : '复制'))))),
        ),

        // 2. 绑定
        h('div', { style: css.card },
          h(SectionHead, { n: '2', title: '绑定访问 IP' }),
          h('div', { style: css.steps },
            h(StepCard, {
              n: '1', title: '打开绑定页', desc: '登录微步 X 情报中心',
              action: h(Btn, { primary: true, size: 'sm', onClick: () => act('open-binding') }, '打开绑定页'),
            }),
            h(StepCard, { n: '2', title: '添加白名单', desc: `「我的 KEY」→ 添加 ${egress.ip && !store.ipVisible ? maskIp(egress.ip) : (egress.ip || '出口 IP')}` }),
            h(StepCard, { n: '3', title: '复制 API Key', desc: '回到下方「API Key」一栏粘贴保存' })),
          h('div', { style: css.row },
            h('span', { style: { fontSize: '12px', color: C.dim } }, '绑定页地址'),
            h('a', { className: 'tb-link', style: css.link, href: data.bindingUrl, target: '_blank', rel: 'noreferrer noopener' }, data.bindingUrl),
            h(Btn, { onClick: () => doCopy(data.bindingUrl, 'bind') }, copied === 'bind' ? '已复制' : '复制')),
        ),

        // 3. API Key
        h('div', { style: css.card },
          h(SectionHead, { n: '3', title: 'API Key' },
            (() => {
              const view = keyBadge(s.keyCheck || verify, data.key.configured);
              return h(Badge, { tone: view.tone, title: view.title }, view.text);
            })()),
          data.key.configured && !editing
            ? h(React.Fragment, null,
                h('div', { style: css.row },
                  h('span', { style: css.mono }, `API Key ${data.key.masked}`),
                  h('span', { style: css.faint }, data.key.file),
                  h(Btn, { onClick: () => { setEditing(true); setDraft(''); } }, '更换'),
                  h(Btn, { onClick: async () => { await act('clear-key'); setVerify(null); patch({ keyCheck: null }); } }, '清除'),
                  h(Btn, { onClick: test, loading: testing, title: '会调用一次文件报告接口，占用当日文件额度 (300 次/天)' }, '测试连通性')),
                h('p', { style: css.hint }, '完整 Key 以 0600 权限写入本机文件，不上传、不同步、不记入对话日志。'))
            : h('div', { style: css.field },
                h('label', { htmlFor: 'tb-apikey', style: css.fieldLabel }, 'API Key'),
                h('div', { style: css.row },
                  h('input', {
                    id: 'tb-apikey',
                    className: 'tb-input', style: css.input, type: 'password',
                    placeholder: '粘贴微步 API Key',
                    'aria-describedby': 'tb-apikey-hint',
                    value: draft,
                    onChange: (e) => setDraft(e.target.value),
                    onKeyDown: (e) => { if (e.key === 'Enter') save(); },
                  }),
                  h(Btn, { primary: true, onClick: save, loading: saving, disabled: !draft.trim() }, '保存到本机'),
                  editing ? h(Btn, { onClick: () => { setEditing(false); setDraft(''); } }, '取消') : null,
                  data.key.configured ? null : h(Btn, { onClick: test, loading: testing, title: '会调用一次文件报告接口，占用当日文件额度 (300 次/天)' }, '测试连通性')),
                h('p', { id: 'tb-apikey-hint', style: css.hint }, '保存后界面只显示首尾 4 位；完整 Key 以 0600 权限写入本机文件，不上传、不同步、不记入对话日志。保存后会自动校验一次，占用一次文件查询额度 (300 次/天)。')),
          verify
            ? h(Notice, {
                kind: verify.ok ? 'ok' : 'error',
                text: verify.loading ? verify.message : `${verify.ok ? '通过' : '未通过'}：${verify.message}`,
              })
            : null,
        ),

        // 4. 接口权限：始终显示，保证分节编号连续
        h('div', { style: css.card },
          h(SectionHead, { n: '4', title: '接口权限', hint: data.permissions && data.permissions.length ? '本次会话已跳过' : undefined }),
          data.permissions && data.permissions.length
            ? h(React.Fragment, null,
                h('div', { style: css.row },
                  ...data.permissions.map((item) => h(Badge, { key: item.endpoint, tone: 'warn' }, item.label))),
                h('p', { style: css.hint },
                  `共 ${data.permissions.length} 个接口返回「没有访问接口权限」，本次会话内不再重复调用，相关指标只能给到部分情报。重启 DSH 会重新尝试；需要完整情报请在微步控制台开通对应权限。`))
            : h('p', { style: css.hint },
                '本次会话暂未发现无权限的接口。查询过某类指标后，被拒绝的接口会登记在这里，并在本次会话内自动跳过。')),

        // 5. 最近查询
        h('div', { style: css.card },
          h(SectionHead, { n: '5', title: '最近查询' },
            last && last.priority ? h(Badge, { tone: /^P0/.test(String(last.priority)) ? 'error' : /^P1/.test(String(last.priority)) ? 'warn' : undefined }, last.priority) : null),
          last
            ? h(React.Fragment, null,
                h('div', { style: css.row },
                  h('span', { style: { ...css.mono, wordBreak: 'break-all' }, title: last.indicator }, last.indicator),
                  h('span', { style: css.faint }, `${last.kind || last.type} · ${last.at}`)),
                h('pre', {
                  style: {
                    margin: 0, padding: '10px 12px', background: C.surface2,
                    border: `1px solid ${C.line}`, borderRadius: '10px',
                    fontFamily: 'inherit', fontSize: '12px', lineHeight: '20px', color: C.text,
                    whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: '280px', overflow: 'auto',
                  },
                }, last.brief || last.digest || ''),
                h('div', { style: css.row },
                  last.markdownPath ? h(Btn, { onClick: () => act('open-report', { path: last.markdownPath }) }, '打开完整 MD 报告') : null,
                  last.reportDir ? h(Btn, { onClick: () => act('open-folder', { path: last.reportDir }) }, '打开报告目录') : null,
                  last.markdownPath ? h('span', { style: css.faint }, last.markdownPath) : null))
            : h('p', { style: css.hint }, '还没有查询过。在对话中粘贴 IP / Domain / Hash / URL / CVE 即可。'),
        ),
      );
    }

    // ------------------------------------------------------------ 新对话 (hero 空白态) 里的小条
    // 官方 ui-conversation 只在 variant==='composer' 时渲染 conversation.composer.dock，
    // 全新对话是 hero 形态，因此这里额外挂一个始终可见的紧凑入口。

    function HeroChip() {
      const s = useStore();
      const [copied, doCopy] = useCopy();

      React.useEffect(() => {
        ensurePoller();
      }, []);

      const data = s.data;
      if (!data) return null;

      const configured = Boolean(data.key && data.key.configured);
      const ip = (data.egress && data.egress.ip)
        || (data.ips && data.ips[0] && data.ips[0].address)
        || '未获取';

      return h('div', {
        role: 'group',
        'aria-label': '微步情报查询状态',
        style: {
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '12px', lineHeight: '20px', color: C.dim,
          border: `1px solid ${C.line}`, borderRadius: '999px',
          background: C.surface, padding: '2px 10px', maxWidth: '100%', boxSizing: 'border-box',
        },
        title: configured ? `API Key ${data.key.masked}` : '未配置 API Key，可在 设置 → 微步情报查询 里填写',
      },
        h('span', { style: configured ? css.dot(C.ok) : css.ring(C.warn), 'aria-hidden': 'true' }),
        h(BrandName, { style: { ...css.strong, flex: '0 1 auto', minWidth: '0', overflow: 'hidden', textOverflow: 'ellipsis' } }),
        h(IpValue, { ip, style: css.mono }),
        h(IpToggle, null),
        h(Btn, { onClick: () => doCopy(ip, 'hero'), ariaLabel: '复制出口 IP' }, copied === 'hero' ? '已复制' : '复制'),
        h(Btn, { onClick: () => act('open-binding'), ariaLabel: '打开微步「我的 KEY」绑定页' }, '绑定'),
        configured ? null : h('span', { style: css.hint }, '· 未配置 API Key'),
      );
    }



    // 通过注入样式表处理 hover / focus：React 内联样式无法表达伪类，
    // 之前用 onFocus 模拟 hover，点击后焦点还在按钮上就会留下一圈默认焦点环。
    let styleInjected = false;

    function ensureStyle() {
      if (styleInjected) return;
      styleInjected = true;
      if (typeof document === 'undefined' || !document.head) return;
      if (document.getElementById('threatbook-intel-style')) return;
      const style = document.createElement('style');
      style.id = 'threatbook-intel-style';
      style.textContent = [
        // 按钮：最小点击高度 28px，圆角与输入框一致
        '.tb-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;',
        'border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);',
        'color:var(--dsw-alias-label-primary);border-radius:8px;padding:4px 12px;min-width:56px;',
        'min-height:28px;box-sizing:border-box;font-size:12px;line-height:16px;font-weight:500;',
        'cursor:pointer;white-space:nowrap;',
        'transition:background 150ms ease,border-color 150ms ease,filter 150ms ease}',
        '.tb-btn:hover{background:var(--dsw-alias-interactive-bg-hover,var(--dsw-alias-bg-layer-2))}',
        '.tb-btn:focus{outline:none}',
        '.tb-btn:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
        '.tb-btn[data-primary="1"]{background:var(--dsw-alias-brand-primary);color:#fff;',
        'border-color:transparent;font-weight:600}',
        '.tb-btn[data-primary="1"]:hover{filter:brightness(1.08)}',
        '.tb-btn:disabled{opacity:.55;cursor:default}',
        '.tb-btn[data-size="sm"]{min-width:0;min-height:24px;padding:2px 8px}',
        // 输入框焦点用品牌色描边，不用默认黑框
        '.tb-link:focus{outline:none}',
        '.tb-link:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;border-radius:4px}',
        '.tb-input:focus{outline:none;border-color:var(--dsw-alias-brand-primary)}',
        '.tb-input:focus-visible{outline:none;border-color:var(--dsw-alias-brand-primary);',
        'box-shadow:0 0 0 3px color-mix(in srgb,var(--dsw-alias-brand-primary) 18%,transparent)}',
        // 加载指示：旋转圆环，跟随文字颜色
        '.tb-spin{width:12px;height:12px;border-radius:50%;flex:0 0 auto;',
        'border:2px solid currentColor;border-right-color:transparent;',
        'animation:tb-spin .7s linear infinite;opacity:.85}',
        '@keyframes tb-spin{to{transform:rotate(360deg)}}',
        // 图标：仅装饰用
        '.tb-ico{width:12px;height:12px;flex:0 0 auto;display:block}',
        // 尊重系统减少动效设置
        '@media (prefers-reduced-motion: reduce){',
        '.tb-btn{transition:none}',
        '.tb-spin{animation:none;border-right-color:currentColor;opacity:.5}',
        '}',
      ].join('');
      document.head.appendChild(style);
    }

    // 点击名称中间的「·」可循环切换界面预览状态；其余用户不会注意到这个入口
    function BrandName(props) {
      return h('span', { style: props.style },
        'LGSRC ',
        h('span', {
          role: 'button',
          tabIndex: 0,
          'aria-label': '切换界面预览状态',
          onClick: cyclePreview,
          onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cyclePreview(); }
          },
          title: '点击切换界面预览状态',
          style: { cursor: 'pointer' },
        }, '·'),
        ' 微步情报查询');
    }
    function PreviewBar() {
      if (!PREVIEW) return null;
      return h('div', { style: css.preview },
        h('span', { style: { fontSize: '12px', fontWeight: 600, color: C.text } }, '界面预览'),
        ...Object.entries(PREVIEW_LABELS).map(([kind, label]) =>
          h(Btn, { key: kind, primary: kind === PREVIEW, onClick: () => setPreview(kind) }, label)),
        h(Btn, { onClick: () => setPreview(null) }, '退出预览'));
    }

    function DockPanel(props) {
      return h(React.Fragment, null, h(PreviewBar, null), h(DockPanelInner, props));
    }

    function SettingsPanel() {
      return h(React.Fragment, null, h(PreviewBar, null), h(SettingsPanelInner, null));
    }

    // ------------------------------------------------------------ 注册

    return {
      inject: ['slots'],
      apply(ctx) {
        ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({
          name: 'conversation.composer.dock',
          id: 'threatbook-intel',
          order: 8,
        }, DockPanel));

        ctx.slots.inject('conversation.hero.options', () => ctx.slots.register({
          name: 'conversation.hero.options',
          id: 'threatbook-intel',
          order: 5,
        }, HeroChip));

        ctx.slots.inject('settings.section', () => ctx.slots.register({
          name: 'settings.section',
          id: 'threatbook-intel',
          order: 60,
          label: '微步情报查询',
        }, SettingsPanel));
      },
    };
  },
});
