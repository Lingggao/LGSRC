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
      reports: '报告目录与回收站',
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
    const PREVIEW_ORDER = ['unconfigured', 'configured', 'last', 'reports', 'empty', 'notice', 'loading', 'error'];

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
        about: {
          name: '灵糕中心 · 安全响应中心',
          intro: '灵糕中心 · 安全响应中心是用于打击计算机病毒与恶意网站的独立非营利组织。',
          version: '1.8.7',
          releaseDate: '2026-10-26',
          portalUrl: 'https://www.lgsrc.cn',
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
      if (kind === 'unconfigured') {
        payload.key = { configured: false, masked: '', savedAt: null, file: payload.key.file };
        payload.lastLookup = null;
      }
      if (kind === 'empty') payload.lastLookup = null;
      // 报告目录的边界状态：自定义目录、已授权的工作区外路径、回收站非空
      if (kind === 'reports') {
        payload.report = {
          ...payload.report,
          dir: 'D:\\Security\\threatbook-reports',
          defaultDir: 'C:\\work\\threatbook-reports',
          isDefault: false,
          outsideWorkspace: true,
          consentRequired: false,
          retentionDays: 7,
          trashDir: 'D:\\Security\\threatbook-reports\\.LGSRC-trash',
          reportCount: 6,
          trashCount: 3,
          trashBytes: 81920,
          lastTrashBatch: '2026-10-25T15-26-45-930Z',
        };
      }
      payload.latestLookup = payload.lastLookup ? { ...payload.lastLookup, scope: 'global' } : null;
      payload.lastLookup = payload.lastLookup ? { ...payload.lastLookup, scope: 'session' } : null;
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
      // 本次会话里已移入回收站的报告，用于把失效的「打开报告」入口收起来
      trashed: null,
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
    // 当前面板所在会话；状态接口据此返回本会话的最近查询
    let activeSessionId = null;

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
          const query = activeSessionId ? `?sessionId=${encodeURIComponent(activeSessionId)}` : '';
          const res = await fetch(STATE_URL + query, { headers: { accept: 'application/json' }, cache: 'no-store' });
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
          body: JSON.stringify({ action, sessionId: activeSessionId || undefined, ...(payload || {}) }),
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

    function ensurePoller(sessionId) {
      const next = sessionId ? String(sessionId) : null;
      if (next && next !== activeSessionId) {
        activeSessionId = next;
        if (pollerStarted) refresh();
      }
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
    // 清理报告按钮的标签会随数量与展开状态变化，固定成 6 个汉字宽避免抖动
    const CLEAN_BTN_WIDTH = 116;

    const css = {
      // 状态条
      bar: {
        display: 'flex', alignItems: 'center', gap: SPACE.md, flexWrap: 'wrap',
        fontSize: FS.body, lineHeight: '20px', color: C.dim, padding: '4px 2px 2px',
      },
      strong: { color: C.text, fontWeight: 600, whiteSpace: 'nowrap' },
      mono: { color: C.text, fontSize: FS.body },
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
        flex: '1 1 240px', minWidth: '180px', boxSizing: 'border-box', minHeight: '28px',
        border: `1px solid ${C.lineStrong}`, background: C.surface2, color: C.text,
        borderRadius: RADIUS.sm, padding: '4px 8px', fontSize: FS.body,
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
      title: { fontSize: FS.body, fontWeight: 600, color: C.text },

      // 步骤
      steps: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: SPACE.md },
      stepCard: {
        display: 'flex', flexDirection: 'column', gap: SPACE.sm, padding: '10px 12px',
        background: C.surface2, border: `1px solid ${C.line}`, borderRadius: RADIUS.md,
      },
      circle: (filled) => ({
        width: '18px', height: '18px', borderRadius: '50%', boxSizing: 'border-box',
        fontSize: FS.body, fontWeight: filled ? 700 : 600, lineHeight: '1', textAlign: 'center',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
        background: filled ? C.brand : 'transparent',
        border: filled ? 'none' : `1px solid ${C.lineStrong}`,
        color: filled ? '#FFFFFF' : C.dim,
      }),


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
      scrollList: {
        display: 'flex', flexDirection: 'column', gap: SPACE.xs, maxHeight: '180px',
        overflowY: 'auto', padding: '4px 0',
      },
      docRow: { display: 'flex', alignItems: 'center', gap: SPACE.md, fontSize: FS.body, minWidth: '0' },
      docName: {
        flex: '1 1 auto', minWidth: '0', color: C.text,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      },
      docMeta: { flex: '0 0 auto', color: C.faint, whiteSpace: 'nowrap' },
      pre: {
        margin: 0, padding: '10px 12px', background: C.surface2,
        border: `1px solid ${C.line}`, borderRadius: RADIUS.md,
        fontFamily: 'inherit', fontSize: FS.body, lineHeight: '20px', color: C.text,
        whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: '280px', overflow: 'auto',
      },
      errorText: { fontSize: FS.body, color: C.err },
      divider: { borderTop: `1px solid ${C.line}`, margin: '2px 0 0' },
      chip: {
        display: 'flex', alignItems: 'center', gap: SPACE.sm, fontSize: FS.body, lineHeight: '20px',
        color: C.dim, border: `1px solid ${C.line}`, borderRadius: RADIUS.pill,
        background: C.surface, padding: '2px 10px', maxWidth: '100%', boxSizing: 'border-box',
      },
      notice: (kind) => ({
        fontSize: FS.body, color: kind === 'error' ? C.err : kind === 'warn' ? C.warn : C.ok,
        background: C.surface2, border: `1px solid ${C.line}`,
        borderRadius: RADIUS.sm, padding: '8px 12px',
        display: 'flex', alignItems: 'flex-start', gap: SPACE.md,
      }),
    };


    function Spinner() {
      return h('span', { className: 'tb-spin', 'aria-hidden': 'true' });
    }

    // 按钮宽度按字数分两档：
    // 1-5 字统一用 4 字时的宽度 92px，字数相同或不同都同宽 (5 字略挤，挤一挤)；
    // 6 字以上按 44 + 12 × 字数 (含空格) 自动加宽。
    // 12px 取全角字宽，英文与数字较窄，多出来的空间作为留白。
    function buttonLabel(children) {
      const walk = (node) => {
        if (node === null || node === undefined || node === false) return '';
        if (typeof node === 'string' || typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(walk).join('');
        if (typeof node === 'object' && node.props) return walk(node.props.children);
        return '';
      };
      return walk(children);
    }

    function buttonWidth(children, loading) {
      const count = Array.from(buttonLabel(children)).length;
      if (count <= 5) {
        // 5 字在加载时文字 + 指示器会略超 92px，临时放宽到刚好放下的宽度
        return loading ? Math.max(92, 44 + 12 * count) : 92;
      }
      return 44 + 12 * count;
    }

    function Btn(props) {
      ensureStyle();
      const off = Boolean(props.disabled) || Boolean(props.loading);
      return h('button', {
        type: 'button',
        className: 'tb-btn',
        id: props.id,
        'data-primary': props.primary ? '1' : '0',
        'data-danger': props.danger ? '1' : undefined,
        // width 可选：标签会随状态变长的按钮用它固定宽度，避免抖动
        style: { ...(props.style || {}), width: `${props.width || buttonWidth(props.children, props.loading)}px`, flex: '0 0 auto' },
        title: props.title,
        'aria-label': props.ariaLabel,
        'aria-busy': props.loading ? 'true' : undefined,
        // 多选一的当前值必须让读屏读到，不能只靠实心色
        'aria-pressed': props.pressed === undefined ? undefined : (props.pressed ? 'true' : 'false'),
        // 展开式面板：读屏要知道按钮现在是展开还是收起
        'aria-expanded': props.expanded === undefined ? undefined : (props.expanded ? 'true' : 'false'),
        'aria-controls': props.controls,
        autoFocus: props.autoFocus || undefined,
        disabled: off,
        onClick: props.onClick,
        onKeyDown: props.onKeyDown,
      },
      props.loading ? h(Spinner, null) : null,
      props.children);
    }

    // 外链统一：新窗口打开、可读的无障碍名称、统一的 ↗ 标记
    function ExternalLink(props) {
      const label = props.label || props.children;
      return h('a', {
        className: 'tb-link', style: css.link, href: props.href,
        target: '_blank', rel: 'noreferrer noopener',
        'aria-label': `${label} (在新窗口打开)`,
      }, props.children, h('span', { 'aria-hidden': 'true', style: { marginLeft: '2px' } }, '↗'));
    }

    // 统一的状态提示：图标 + 文本，颜色之外还有语义
    // role=alert 本身隐含 assertive，再叠 aria-live="polite" 会让读屏行为互相冲突
    function Notice(props) {
      const kind = props.kind || 'ok';
      const isError = kind === 'error';
      return h('div', { role: isError ? 'alert' : 'status', style: css.notice(kind) },
        h('span', { 'aria-hidden': 'true', style: { fontWeight: 700 } }, isError || kind === 'warn' ? '!' : '✓'),
        h('span', null, props.text));
    }

    function Badge(props) {
      // 颜色之外还带文字；有详细原因时同时给悬停提示与无障碍名称
      const label = props.title ? `${props.children}：${props.title}` : undefined;
      return h('span', { style: css.badge(props.tone), title: props.title, 'aria-label': label }, props.children);
    }

    function StepCard(props) {
      return h('div', { style: css.stepCard },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: SPACE.sm } },
          h('span', { style: css.circle(false) }, props.n),
          h('span', { style: css.title }, props.title)),
        props.desc || props.action
          ? h('div', { style: { display: 'flex', alignItems: 'center', gap: SPACE.md, minHeight: '28px' } },
              props.desc ? h('span', { style: { ...css.hint, flex: '1 1 auto', minWidth: '0' } }, props.desc) : null,
              props.action ? h('span', { style: { flex: '0 0 auto' } }, props.action) : null)
          : null,
        props.children ? h('div', { style: { display: 'flex', alignItems: 'center', gap: SPACE.sm, flexWrap: 'wrap' } }, props.children) : null);
    }

    function SectionHead(props) {
      return h('div', { style: { display: 'flex', alignItems: 'center', gap: SPACE.md, flexWrap: 'wrap' } },
        h('span', { style: css.circle(true) }, props.n),
        h('span', { style: css.title }, props.title),
        props.hint ? h('span', { style: css.hint }, props.hint) : null,
        props.children || null);
    }


    function fmtBytes(bytes) {
      const n = Number(bytes) || 0;
      if (n < 1024) return n + ' B';
      if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
      return (n / 1024 / 1024).toFixed(1) + ' MB';
    }

    // 与主进程的 localTime() 保持同一格式 YYYY-MM-DD HH:mm:ss，
    // 避免「文件时间」和「最近查询时间」一个带秒一个不带
    function fmtWhen(ms) {
      const value = Number(ms);
      if (!value) return '';
      const d = new Date(value);
      const pad = (x) => String(x).padStart(2, '0');
      return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' '
        + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds());
    }

    // 检查更新的展示口径：有错误时只报错，不显示「已是最新」
    function aboutUpdateView(update, error) {
      if (error) return { kind: 'error', text: error, actions: false };
      if (!update) return null;
      if (update.hasUpdate && update.latest) {
        const date = update.latest.publishedAt ? String(update.latest.publishedAt).slice(0, 10) : '';
        const from = update.current ? `当前 v${update.current}，` : '';
        return {
          kind: 'warn',
          text: `${from}发现新版本 v${update.latest.version}${date ? `，发布于 ${date}` : ''}`,
          actions: true,
        };
      }
      return { kind: 'ok', text: `已是最新版本 v${update.current || 'unknown'}`, actions: false };
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

    // 报告已在本会话被移入回收站时，收起指向它的「打开报告」入口，避免点了才报错
    function isTrashed(target) {
      const trashed = store.trashed;
      if (!trashed || !target || !trashed.names) return false;
      const name = String(target).split(/[\\/]/).pop();
      if (!name || trashed.names.indexOf(name) < 0) return false;
      // 目录比较要按路径边界：C:\reports 不能匹配 C:\reports-old
      const normalize = (value) => String(value || '').replace(/\\/g, '/').replace(/\/+$/, '').toLowerCase();
      const dir = normalize(trashed.dir);
      const file = normalize(target);
      return Boolean(dir) && (file === dir || file.startsWith(dir + '/'));
    }

    function IpValue(props) {
      const text = props.ip === undefined || props.ip === null || props.ip === '' ? '未获取' : String(props.ip);
      return h('span', { style: props.style }, store.ipVisible ? text : maskIp(text));
    }

    function IpToggle() {
      const visible = Boolean(store.ipVisible);
      const toggle = () => patch({ ipVisible: !store.ipVisible });
      return h('span', {
        role: 'button',
        tabIndex: 0,
        className: 'tb-hit',
        'aria-label': visible ? '隐藏完整出口 IP' : '显示完整出口 IP',
        onClick: toggle,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        },
        title: visible ? '打码显示出口 IP' : '显示完整出口 IP',
        style: { cursor: 'pointer', fontSize: FS.body, color: C.dim },
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

    // 控件被替换或卸载后把焦点交给另一个仍在的元素
    function focusById(id) {
      setTimeout(() => {
        if (typeof document === 'undefined' || !document.getElementById) return;
        const el = document.getElementById(id);
        if (el && typeof el.focus === 'function') el.focus();
      }, 50);
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
        ensurePoller(sessionId);
      }, [sessionId]);

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
              h(BrandName, { style: css.title }),
              h(Badge, { tone: 'warn' }, '未配置 API Key'),
              h('span', { style: css.hint }, '三步开始使用')),
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
              egress.error ? h('span', { style: css.errorText }, `探测失败：${egress.error}`) : null),
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
              last.markdownPath && !isTrashed(last.markdownPath)
                ? h(Btn, { onClick: () => act('open-report', { path: last.markdownPath }) }, '打开报告')
                : last.markdownPath ? h('span', { style: css.hint }, '报告已移入回收站') : null,
              last.reportDir ? h(Btn, { onClick: () => act('open-folder', { path: last.reportDir }) }, '打开文件夹') : null)
          : null,
        s.notice ? h(Notice, { kind: s.notice.kind, text: s.notice.text }) : null,
      );
    }

    // ------------------------------------------------------------ 设置页

    // 报告目录：显示当前路径、打开/复制、切换目录 (含迁移选择与跨工作区授权)、清理与撤销
    function ReportCard() {
      const s = useStore();
      const [copied, doCopy] = useCopy();
      const [editing, setEditing] = React.useState(false);
      const [draft, setDraft] = React.useState('');
      const [phase, setPhase] = React.useState('view');
      const [pending, setPending] = React.useState(null);
      // false 未展开 / 'load' 正在扫描 / 'open' 已展开
      const [listing, setListing] = React.useState(false);
      const [files, setFiles] = React.useState(null);
      const [picked, setPicked] = React.useState({});
      const [lastBatch, setLastBatch] = React.useState(null);
      const [busyLocal, setBusyLocal] = React.useState(false);
      const [dirError, setDirError] = React.useState('');
      const [confirmEmpty, setConfirmEmpty] = React.useState(false);

      const report = s.data && s.data.report;
      if (!report) return null;

      // 按钮被卸载后把焦点交还给一个仍在的控件，避免键盘焦点掉回页面顶部
      const focusLater = (id) => focusById(id);

      const startEdit = () => {
        setDraft(report.dir || '');
        setEditing(true);
        setPhase('view');
        setDirError('');
      };

      const cancelEdit = () => {
        setEditing(false);
        setPhase('view');
        setPending(null);
        setDirError('');
      };

      const browse = async () => {
        setBusyLocal(true);
        try {
          const res = await act('choose-report-dir');
          if (res && res.path) {
            setDraft(res.path);
            setDirError('');
          }
        } finally {
          setBusyLocal(false);
        }
      };

      const apply = async (mode, consent) => {
        const target = (pending && pending.path) || draft.trim();
        if (!target) return;
        setBusyLocal(true);
        const res = await act('set-report-dir', { path: target, mode, consent: Boolean(consent) });
        setBusyLocal(false);
        if (!res) return;
        if (res.needsConsent) {
          setPending({ path: res.path, mode });
          setPhase('consent');
          return;
        }
        const moved = res.migration ? (res.migration.copied + res.migration.moved) : 0;
        notify('ok', moved ? `已切换目录，迁移 ${moved} 个报告` : '已切换报告目录');
        setPending(null);
        cancelEdit();
      };

      // 目录为空时就地报错，不再借用全局提示条
      const requireTarget = () => {
        const target = draft.trim();
        if (!target) {
          setDirError('请填写或选择报告目录');
          return null;
        }
        setDirError('');
        return target;
      };

      const submit = (mode) => {
        if (!requireTarget()) return;
        apply(mode, false);
      };

      const confirmChange = () => {
        const target = requireTarget();
        if (!target) return;
        if (target === report.dir) { notify('ok', '报告目录没有变化'); cancelEdit(); return; }
        if (report.reportCount > 0) { setPhase('migrate'); return; }
        submit('keep');
      };

      const loadList = async () => {
        if (listing === 'open') { setListing(false); return; }
        if (listing === 'load') return;
        setListing('load');
        const res = await act('list-reports');
        if (!res) { setListing(false); return; }
        const list = res.files || [];
        const marks = {};
        for (const f of list) marks[f.name] = true;
        setFiles(list);
        setPicked(marks);
        setListing('open');
      };

      const togglePick = (name) => {
        setPicked((prev) => ({ ...prev, [name]: !(prev && prev[name]) }));
      };

      const allPicked = Boolean(files && files.length) && files.every((f) => picked[f.name]);
      const toggleAll = () => {
        const marks = {};
        for (const f of files || []) marks[f.name] = !allPicked;
        setPicked(marks);
      };
      const chosen = (files || []).filter((f) => picked[f.name]);

      const confirmDelete = async () => {
        const names = chosen.map((f) => f.name);
        if (!names.length) return;
        setBusyLocal(true);
        try {
          const res = await act('delete-reports', { names });
          if (!res) return;
          const dir = res.dir || report.dir;
          setLastBatch({ batch: res.batch, dir });
          patch({ trashed: { dir, names: res.moved || names } });
          setFiles(null);
          setPicked({});
          setListing(false);
          notify('ok', `已把 ${res.moved.length} 个报告移入回收站，本次会话内可撤销。`);
        } finally {
          setBusyLocal(false);
        }
      };

      const undo = async () => {
        if (!lastBatch) return;
        setBusyLocal(true);
        try {
          const res = await act('undo-delete', { batch: lastBatch.batch, dir: lastBatch.dir });
          if (!res) return;
          notify('ok', `已恢复 ${res.restored.length} 个报告`);
          patch({ trashed: null });
          setLastBatch(null);
          focusLater('tb-list-btn');
        } finally {
          setBusyLocal(false);
        }
      };

      const emptyTrash = async () => {
        setBusyLocal(true);
        try {
          const res = await act('empty-trash');
          if (!res) return;
          notify('ok', `已清空回收站，删除 ${res.removed.length} 个批次`);
          patch({ trashed: null });
          setLastBatch(null);
          setConfirmEmpty(false);
          focusLater('tb-list-btn');
        } finally {
          setBusyLocal(false);
        }
      };

      return h('div', { style: css.card },
        h(SectionHead, { n: '6', title: '报告存储' },
          h(Badge, { tone: report.isDefault ? undefined : 'info' }, report.isDefault ? '默认目录' : '自定义目录')),
        h('div', { style: css.row },
          h('span', {
            style: { ...css.mono, flex: '1 1 100%', minWidth: '0', wordBreak: 'break-all' },
            title: report.dir,
          }, report.dir)),
        h('div', { style: css.row },
          h(Btn, { onClick: () => doCopy(report.dir, 'rdir') }, copied === 'rdir' ? '已复制' : '复制路径'),
          h(Btn, { onClick: () => act('open-folder') }, '打开文件夹'),
          h(Btn, { onClick: editing ? cancelEdit : startEdit }, editing ? '取消' : '更改目录')),
        report.isDefault
          ? null
          : h('p', { style: css.hint }, `默认目录为 ${report.defaultDir}。`),
        // 只有真的还差一次授权时才报警；已授权的工作区外目录只留一句中性说明
        report.consentRequired
          ? h(Notice, { kind: 'warn', text: '该目录在工作区之外，写入前需要确认授权。' })
          : report.outsideWorkspace
            ? h('p', { style: css.hint }, '该目录在工作区之外，已授权写入。')
            : null,
        !report.writable && h(Notice, { kind: 'error', text: '当前目录不可写，请检查权限或改选其他目录。' }),

        editing
          ? h('div', { style: css.field },
              h('label', { htmlFor: 'tb-report-dir', style: css.title }, '存储目录'),
              h('div', { style: css.row },
                h('input', {
                  id: 'tb-report-dir', className: 'tb-input', style: css.input, type: 'text',
                  placeholder: '例如 D:\Security\threatbook-reports',
                  value: draft,
                  'aria-describedby': dirError ? 'tb-report-dir-error' : undefined,
                  'aria-invalid': dirError ? 'true' : undefined,
                  onChange: (e) => { setDraft(e.target.value); if (dirError) setDirError(''); },
                  onKeyDown: (e) => { if (e.key === 'Enter') confirmChange(); },
                }),
                h(Btn, { onClick: browse, disabled: busyLocal }, '选择文件夹'),
                h(Btn, { primary: true, onClick: confirmChange, loading: busyLocal }, '保存目录')),
              dirError
                ? h('p', { id: 'tb-report-dir-error', role: 'alert', style: { ...css.hint, color: C.err } }, dirError)
                : null,
              report.isDefault ? null : h(Btn, { onClick: () => { setDraft(report.defaultDir); setPhase('migrate'); } }, '恢复默认目录'),
              phase === 'migrate'
                ? h('div', { style: css.field },
                    h('p', { style: css.hint }, `当前目录还有 ${report.reportCount} 个报告，要一起带到新目录吗？`),
                    h('div', { style: css.row },
                      h(Btn, { primary: true, onClick: () => apply('copy', false) }, '复制到新目录'),
                      h(Btn, { onClick: () => apply('move', false) }, '移动到新目录'),
                      h(Btn, { onClick: () => apply('keep', false) }, '旧报告保持不变'),
                      h(Btn, { onClick: () => setPhase('view') }, '暂不迁移')))
                : null,
              phase === 'consent'
                ? h('div', { style: css.field },
                    h(Notice, { kind: 'warn', text: `确认授权此目录的读写权限：${pending ? pending.path : ''}` }),
                    h('div', { style: css.row },
                      h(Btn, { danger: true, onClick: () => apply(pending ? pending.mode : 'keep', true), loading: busyLocal }, '确认授权并保存'),
                      h(Btn, { onClick: cancelEdit }, '取消')))
                : null)
          : null,

        // 当前目录：先处理这里报告，再看回收站
        h('div', { style: css.row },
          h(Btn, {
            id: 'tb-list-btn', onClick: loadList, loading: listing === 'load',
            expanded: listing === 'open', controls: 'tb-report-files',
            width: CLEAN_BTN_WIDTH,
          }, listing === 'load'
            ? '正在扫描…'
            : listing === 'open'
              ? '收起清理面板'
              : `清理报告${report.reportCount ? ` (${report.reportCount})` : ''}`),
          h('span', { style: css.hint }, '自动识别文件内容，仅清理本插件撰写的报告')),

        h('div', { id: 'tb-report-files', hidden: listing !== 'open' },
          listing === 'open'
          ? h('div', { style: css.field },
              h('p', { style: css.hint }, files && files.length
                ? `以下 ${files.length} 个报告在勾选后移入回收站，删除后可以撤销。`
                : '该目录里没有识别到本插件写出的报告。'),
              files && files.length
                ? h('div', { style: css.scrollList, className: 'tb-scroll', tabIndex: 0, role: 'group', 'aria-label': '报告文件列表' },
                  files.map((f) => h('label', { key: f.name, style: { ...css.docRow, cursor: 'pointer' } },
                    h('input', {
                      type: 'checkbox', className: 'tb-check', style: { margin: 0, flex: '0 0 auto', accentColor: C.brand },
                      checked: Boolean(picked[f.name]),
                      'aria-label': `选择 ${f.name}`,
                      onChange: () => togglePick(f.name),
                    }),
                    h('span', { style: css.docName, title: f.name }, f.name),
                    h('span', { style: css.docMeta }, `${fmtBytes(f.size)} · ${fmtWhen(f.mtime)}`))))
                : null,
              files && files.length
                ? h('div', { style: css.row },
                    h(Btn, { onClick: toggleAll }, allPicked ? '全不选' : '全选'),
                    h(Btn, {
                      danger: true, onClick: confirmDelete,
                      disabled: busyLocal || !chosen.length,
                      loading: busyLocal && Boolean(chosen.length),
                    }, `确认删除 ${chosen.length} 个`),
                    h(Btn, { onClick: () => setListing(false) }, '取消'))
                : h('div', { style: css.row }, h(Btn, { onClick: () => setListing(false) }, '关闭')))
          : null),

        lastBatch
          ? h('div', { style: css.row },
              h('span', { style: css.hint },
                lastBatch.dir && lastBatch.dir !== report.dir
                  ? `刚才删除的报告在上一目录 ${lastBatch.dir} 的回收站里，本次会话内可撤销。`
                  : '刚才删除的报告在回收站里，本次会话内可撤销。'),
              h(Btn, { id: 'tb-undo-btn', onClick: undo, loading: busyLocal, autoFocus: true }, '撤销删除'))
          : null,

        // 回收站：路径与状态 → 保留策略 → 清空
        h('div', { style: css.divider }),

        h('div', { style: css.row },
          h('span', { style: css.faint }, '回收站'),
          h('span', { style: { ...css.faint, flex: '1 1 0', minWidth: '0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }, title: report.trashDir }, report.trashDir)),
        h('div', { style: css.row },
          h(Btn, { onClick: () => doCopy(report.trashDir, 'trash') }, copied === 'trash' ? '已复制' : '复制路径'),
          h(Btn, { onClick: () => act('open-folder', { path: report.trashDir }) }, '打开回收站')),

        h('p', { style: css.hint }, report.trashCount
          ? `回收站现有 ${report.trashCount} 个文件，${fmtBytes(report.trashBytes)}`
          : '回收站为空'),

        h('div', { style: css.row },
          h('span', { style: css.hint }, '回收站保留'),
          ...[7, 30, 0].map((days) => h(Btn, {
            key: days, primary: report.retentionDays === days,
            pressed: report.retentionDays === days,
            ariaLabel: days === 0 ? '回收站永久保留' : `回收站保留 ${days} 天`,
            onClick: () => act('set-retention', { days }),
          }, days === 0 ? '永久' : `${days} 天`)),
          h('span', { style: css.faint }, report.retentionDays ? '到期自动清空' : '不会自动清空')),

        report.trashCount
          ? h('div', { style: css.row },
              h(Btn, { danger: true, onClick: () => setConfirmEmpty(true) }, '清空回收站'))
          : null,

        confirmEmpty
          ? h('div', { style: css.field },
              h(Notice, { kind: 'warn', text: `确认清空？回收站中的 ${report.trashCount} 个文件将被永久删除，无法撤销。` }),
              h('div', { style: css.row },
                h(Btn, { danger: true, onClick: emptyTrash, loading: busyLocal }, '确认清空'),
                h(Btn, { onClick: () => setConfirmEmpty(false) }, '取消')))
          : null);
    }

    // 关于：简介、版本与发布日期、检查更新、反馈渠道
    function AboutCard() {
      const s = useStore();
      const [copied, doCopy] = useCopy();
      const [checking, setChecking] = React.useState(false);
      const [update, setUpdate] = React.useState(null);
      const [updateError, setUpdateError] = React.useState('');

      const about = s.data && s.data.about;
      if (!about) return null;

      const check = async () => {
        setChecking(true);
        setUpdateError('');
        try {
          const res = await act('check-update');
          if (!res) return;
          if (res.error) {
            setUpdateError(res.error);
            setUpdate(res.update || null);
            return;
          }
          setUpdate(res.update || null);
        } finally {
          setChecking(false);
        }
      };

      const feedback = async () => {
        const ok = await doCopy(about.contactEmail, 'mail');
        if (ok) notify('ok', `已复制 ${about.contactEmail}，请邮件联系 Ling Gao 反馈 Bug 或建议，附上复现步骤与插件版本。`);
        else notify('error', `复制失败，请手动复制邮箱：${about.contactEmail}`);
      };

      return h('div', { style: css.card },
        h(SectionHead, { n: '7', title: '关于' }),
        h('p', { style: css.hint }, about.intro),
        h('div', { style: css.row },
          h('span', { style: css.faint },
            `当前版本 v${about.version}${about.releaseDate ? ` · 发布于 ${about.releaseDate}` : ''}`)),
        h('div', { style: css.row },
          h(Btn, { onClick: check, loading: checking }, '检查更新'),
          h(Btn, { onClick: feedback, title: '通过邮件反馈 Bug 或建议' }, copied === 'mail' ? '已复制邮箱' : '反馈与建议'),
          h(ExternalLink, { href: about.portalUrl || 'https://www.lgsrc.cn', label: '门户网站' }, '门户网站'),
          h(ExternalLink, { href: about.repoUrl, label: 'GitHub 主页' }, 'GitHub 主页'),
          h(ExternalLink, { href: about.releasesUrl, label: '更新日志' }, '更新日志')),

        (() => {
          const view = aboutUpdateView(update, updateError);
          if (!view) return null;
          return h('div', { style: view.actions ? css.field : null },
            h(Notice, { kind: view.kind, text: view.text }),
            view.actions
              ? h(React.Fragment, null,
                  h('p', { style: css.hint },
                    '下载 Releases 页面里的 zip，解压后在「插件 → 添加插件」中填入解压目录的绝对路径即可覆盖安装；也可以直接拉取仓库最新代码后重装。'),
                  h('div', { style: css.row },
                    h(Btn, { primary: true, onClick: () => act('open-releases') }, '打开 Releases 页面')))
              : null);
        })(),

        h('div', { style: css.row },
          h('span', { style: css.hint }, '反馈邮箱'),
          h('a', {
            className: 'tb-link', style: css.link, href: `mailto:${about.contactEmail}`,
            'aria-label': `发送邮件至 ${about.contactEmail}`,
          }, about.contactEmail)),
      );
    }

    function SettingsPanelInner() {
      const s = useStore();
      const [copied, doCopy] = useCopy();
      const [draft, setDraft] = React.useState('');
      const [editing, setEditing] = React.useState(false);
      const [verify, setVerify] = React.useState(null);
      const [saving, setSaving] = React.useState(false);
      const [testing, setTesting] = React.useState(false);
      const [confirmClear, setConfirmClear] = React.useState(false);

      React.useEffect(() => { ensurePoller(); }, []);

      const data = s.data;
      if (!data) {
        return h('div', { style: css.page },
          h('h1', { style: css.h1 }, h(BrandName, null)),
          h('p', { style: css.sub }, s.error ? `本机服务未就绪：${s.error}` : '正在读取…'));
      }

      const egress = data.egress || {};
      // 设置页没有会话上下文，展示所有会话里最近的一次
      const last = data.latestLookup || data.lastLookup;

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
            h('span', { style: css.hint }, '出口 IP'),
            h(IpValue, { ip: egress.ip || '未探测到', style: css.mono }),
            h(IpToggle, null),
            h(Btn, { onClick: () => doCopy(egress.ip || '', 'eg'), disabled: !egress.ip }, copied === 'eg' ? '已复制' : '复制'),
            h(Btn, { onClick: () => act('refresh-egress') }, '重新探测'),
            egress.error ? h('span', { style: css.errorText }, `探测失败：${egress.error}`) : null,
            egress.at && !egress.error ? h('span', { style: css.faint }, `探测于 ${new Date(egress.at).toLocaleTimeString('zh-CN', { hour12: false })}`) : null),
          h('div', null,
            h('div', { style: css.listHead },
              h('span', { style: css.listHeadCell }, '网卡 IP'),
              h('span', { style: css.listHeadCell }, '接口'),
              h('span', { style: css.listHeadCell }, '协议'),
              h('span', { style: { ...css.listHeadCell, textAlign: 'center', padding: '0 0 8px' } }, '操作')),
            (data.ips || []).length ? null : h('p', { style: { ...css.hint, padding: '8px 10px' } }, '没有检测到本机网卡地址。'),
            (data.ips || []).map((ip) => h('div', { key: `${ip.iface}-${ip.address}`, style: css.listRow },
              h('span', {
                style: { ...css.listCell, ...css.mono, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
                title: ip.address,
              }, ip.address),
              h('span', { style: { ...css.listCell, color: C.dim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, title: ip.iface }, ip.iface),
              h('span', { style: { ...css.listCell, color: C.dim, whiteSpace: 'nowrap' } }, ip.family),
              h('span', { style: { ...css.listCell, padding: '8px 0', display: 'flex', justifyContent: 'center' } },
                h(Btn, { onClick: () => doCopy(ip.address, ip.address) }, copied === ip.address ? '已复制' : '复制'))))),
        ),

        // 2. 绑定
        h('div', { style: css.card },
          h(SectionHead, { n: '2', title: '绑定访问 IP' }),
          h('div', { style: css.steps },
            h(StepCard, {
              n: '1', title: '打开绑定页', desc: '登录微步 X 情报中心',
              action: h(Btn, { primary: true, onClick: () => act('open-binding') }, '打开绑定页'),
            }),
            h(StepCard, { n: '2', title: '添加白名单', desc: `「我的 KEY」→ 添加 ${egress.ip && !store.ipVisible ? maskIp(egress.ip) : (egress.ip || '出口 IP')}` }),
            h(StepCard, { n: '3', title: '复制 API Key', desc: '回到下方「API Key」一栏粘贴保存' })),
          h('div', { style: css.row },
            h('span', { style: css.hint }, '绑定页地址'),
            h(ExternalLink, { href: data.bindingUrl, label: '打开微步「我的 KEY」绑定页' }, data.bindingUrl),
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
                  h(Btn, { onClick: () => { setEditing(true); setDraft(''); setConfirmClear(false); } }, '更换'),
                  confirmClear
                    ? h(React.Fragment, null,
                        h(Btn, {
                          danger: true,
                          // 触发按钮被替换掉后把焦点接住，避免键盘焦点掉回页面顶部
                          autoFocus: true,
                          onClick: async () => {
                            await act('clear-key');
                            setVerify(null);
                            setConfirmClear(false);
                            patch({ keyCheck: null });
                            focusById('tb-apikey');
                          },
                        }, '确认清除'),
                        h(Btn, { onClick: () => setConfirmClear(false) }, '取消'))
                    : h(Btn, { onClick: () => setConfirmClear(true) }, '清除'),
                  h(Btn, { onClick: test, loading: testing, title: '会调用一次文件报告接口，占用当日文件额度 (300 次/天)' }, '测试连通性')),
                confirmClear
                  ? h('p', { style: { ...css.hint, color: C.err } }, '清除后需要重新粘贴 API Key 才能继续查询。')
                  : null,
                h('p', { style: css.hint }, '完整 Key 以 0600 权限写入本机文件，不上传、不同步、不记入对话日志。'))
            : h('div', { style: css.field },
                h('label', { htmlFor: 'tb-apikey', style: css.title }, 'API Key'),
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
          h(SectionHead, { n: '5', title: '最近查询', hint: '所有会话最近一次' },
            last && last.priority ? h(Badge, { tone: /^P0/.test(String(last.priority)) ? 'error' : /^P1/.test(String(last.priority)) ? 'warn' : undefined }, last.priority) : null),
          last
            ? h(React.Fragment, null,
                h('div', { style: css.row },
                  h('span', { style: { ...css.mono, wordBreak: 'break-all' }, title: last.indicator }, last.indicator),
                  h('span', { style: css.faint }, `${last.kind || last.type} · ${last.at}`)),
                h('pre', {
                  tabIndex: 0, role: 'group', className: 'tb-scroll', 'aria-label': '最近查询摘要',
                  style: css.pre,
                }, last.brief || last.digest || ''),
                h('div', { style: css.row },
                  last.markdownPath && !isTrashed(last.markdownPath)
                    ? h(Btn, { onClick: () => act('open-report', { path: last.markdownPath }) }, '打开报告')
                    : last.markdownPath ? h('span', { style: css.faint }, '报告已移入回收站') : null,
                  last.reportDir ? h(Btn, { onClick: () => act('open-folder', { path: last.reportDir }) }, '打开文件夹') : null,
                  last.markdownPath ? h('span', { style: css.faint }, last.markdownPath) : null))
            : h('p', { style: css.hint }, '还没有查询过。在对话中粘贴 IP / Domain / Hash / URL / CVE 即可。'),
        ),

        // 6. 报告存储
        h(ReportCard, null),

        // 7. 关于
        h(AboutCard, null),
      );
    }

    // ------------------------------------------------------------ 新对话 (hero 空白态) 里的小条
    // 官方 ui-conversation 只在 variant==='composer' 时渲染 conversation.composer.dock，
    // 全新对话是 hero 形态，因此这里额外挂一个始终可见的紧凑入口。

    function HeroChip(props) {
      const s = useStore();
      const [copied, doCopy] = useCopy();
      const sessionId = props && props.sessionId ? props.sessionId : null;

      React.useEffect(() => {
        ensurePoller(sessionId);
      }, [sessionId]);

      const data = s.data;
      if (!data) return null;

      const configured = Boolean(data.key && data.key.configured);
      const ip = (data.egress && data.egress.ip)
        || (data.ips && data.ips[0] && data.ips[0].address)
        || '未获取';

      return h('div', {
        role: 'group',
        'aria-label': '微步情报查询状态',
        style: css.chip,
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
      if (typeof document === 'undefined' || !document.head) return;
      const text = [
        // 按钮：最小点击高度 28px，圆角与输入框一致
        '.tb-btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;',
        'border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-2);',
        'color:var(--dsw-alias-label-primary);border-radius:8px;padding:4px 12px;height:28px;min-width:0;',
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
        '.tb-btn:active:not(:disabled){filter:brightness(.95)}',
        '.tb-btn[data-danger="1"]{color:var(--dsw-alias-state-error-primary);',
        'border-color:color-mix(in srgb,var(--dsw-alias-state-error-primary) 55%,var(--dsw-alias-border-l2))}',
        '.tb-btn[data-danger="1"]:hover{background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 10%,transparent)}',
        // 输入框焦点用品牌色描边，不用默认黑框
        '.tb-link:focus{outline:none}',
        '.tb-link:hover{text-decoration:underline}',
        '.tb-link:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;border-radius:4px}',
        // 非按钮元素上的 role="button" (打码开关) 也要有可见焦点环
        '.tb-hit:focus{outline:none}',
        '.tb-hit:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;border-radius:4px}',
        // 可聚焦的滚动区域同样需要焦点环，否则键盘用户不知道焦点在哪
        '.tb-scroll:focus{outline:none}',
        '.tb-scroll:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px;border-radius:8px}',
        '.tb-check:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}',
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
      const existing = document.getElementById('threatbook-intel-style');
      if (existing) {
        // 插件热重载时模块状态会重置，但旧 <style> 还挂在 document 上；
        // 直接覆盖内容，避免旧规则 (例如旧的按钮高度) 继续生效
        existing.textContent = text;
      } else {
        const style = document.createElement('style');
        style.id = 'threatbook-intel-style';
        style.textContent = text;
        document.head.appendChild(style);
      }
      styleInjected = true;
    }

    // 点击名称中间的「·」可循环切换界面预览状态；其余用户不会注意到这个入口
    // 只保留鼠标入口：不再进入 Tab 顺序，也不给读屏播报，避免正式界面里多出一个开发用控件
    function BrandName(props) {
      return h('span', { style: props.style },
        'LGSRC ',
        h('span', {
          'aria-hidden': 'true',
          onClick: cyclePreview,
          title: '点击切换界面预览状态',
          style: { cursor: 'pointer' },
        }, '·'),
        ' 微步情报查询');
    }
    function PreviewBar() {
      if (!PREVIEW) return null;
      return h('div', { style: css.preview },
        h('span', { style: { fontSize: FS.body, fontWeight: 600, color: C.text } }, '界面预览'),
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
