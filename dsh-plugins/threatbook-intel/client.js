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

    const PREVIEW = (() => {
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
          indicator: '243c526b8b42…f02739bc6a3',
          type: 'sha256',
          at: '2026-10-24 12:00:00',
          markdownPath: 'C:\\work\\threatbook-reports\\sha256-243c….md',
          jsonPath: 'C:\\work\\threatbook-reports\\sha256-243c….json',
          reportDir: 'C:\\work\\threatbook-reports',
          digest: '- 判定：恶意 (Trojan)\n- 家族：PatchedHostLoader\n- 检出：9/28\n- 关键行为：APC 注入、隐藏窗口、计划任务持久化',
        },
        autoOpenedAt: 0,
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

    const css = {
      // 状态条
      bar: {
        display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
        fontSize: '12px', lineHeight: '20px', color: C.dim, padding: '4px 2px 2px',
      },
      strong: { color: C.text, fontWeight: 600, whiteSpace: 'nowrap' },
      mono: { color: C.text, fontWeight: 600, fontSize: '12px' },
      monoSm: { fontSize: '11px', color: C.dim, fontWeight: 500 },
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
      group: { display: 'inline-flex', alignItems: 'center', gap: '6px', minWidth: '0' },
      sep: { width: '1px', height: '12px', background: C.line, display: 'inline-block', flex: '0 0 auto' },

      // 按钮：默认有实体底色，识别度优先
      btn: {
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        border: `1px solid ${C.lineStrong}`, background: C.surface2, color: C.text,
        borderRadius: '8px', padding: '3px 10px', minWidth: '54px', justifyContent: 'center', fontSize: '12px', lineHeight: '16px',
        fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
        transition: 'background 120ms ease, border-color 120ms ease',
      },
      btnHover: { background: C.hover, borderColor: C.lineStrong },
      btnPrimary: {
        display: 'inline-flex', alignItems: 'center', gap: '4px',
        border: '1px solid transparent', background: C.brand, color: '#FFFFFF',
        borderRadius: '8px', padding: '3px 12px', minWidth: '54px', justifyContent: 'center', fontSize: '12px', lineHeight: '16px',
        fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
        transition: 'filter 120ms ease',
      },
      btnPrimaryHover: { filter: 'brightness(1.08)' },
      btnOff: { opacity: 0.5, cursor: 'default' },

      input: {
        flex: '1 1 240px', minWidth: '180px', boxSizing: 'border-box',
        border: `1px solid ${C.lineStrong}`, background: C.surface2, color: C.text,
        borderRadius: '8px', padding: '6px 10px', fontSize: '12px',
      },

      // 容器
      card: {
        border: `1px solid ${C.line}`, background: C.surface, borderRadius: '12px',
        padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: '12px',
        boxSizing: 'border-box', width: '100%',
      },
      page: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '4px 2px 28px', maxWidth: '880px' },
      h1: { margin: 0, fontSize: '15px', fontWeight: 600, color: C.text },
      sub: { margin: 0, fontSize: '12px', color: C.dim, lineHeight: '20px' },
      row: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' },

      // 步骤
      steps: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '10px' },
      stepCard: {
        display: 'flex', flexDirection: 'column', gap: '6px', padding: '10px 12px',
        background: C.surface2, border: `1px solid ${C.line}`, borderRadius: '10px',
      },
      stepNo: {
        width: '18px', height: '18px', borderRadius: '50%', background: C.brand, color: '#FFFFFF',
        fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center',
        justifyContent: 'center', flex: '0 0 auto',
      },
      subNo: {
        width: '16px', height: '16px', borderRadius: '50%', background: 'transparent',
        border: `1px solid ${C.lineStrong}`, color: C.dim, boxSizing: 'border-box',
        fontSize: '10px', fontWeight: 600, display: 'inline-flex', alignItems: 'center',
        justifyContent: 'center', flex: '0 0 auto',
      },
      stepTitle: { fontSize: '12px', fontWeight: 600, color: C.text },
      stepDesc: { fontSize: '11px', color: C.faint, lineHeight: '17px' },

      // 小标签
      badge: (tone) => ({
        fontSize: '11px', lineHeight: '16px', padding: '1px 8px', borderRadius: '999px',
        border: `1px solid ${tone === 'warn' ? C.warn : C.line}`,
        color: tone === 'warn' ? C.warn : C.dim,
        background: tone === 'warn' ? 'transparent' : C.surface2,
        whiteSpace: 'nowrap',
      }),

      // 表格
      table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
      th: {
        textAlign: 'left', padding: '0 10px 8px', color: C.faint, fontWeight: 500,
        fontSize: '11px', borderBottom: `1px solid ${C.line}`,
      },
      td: {
        padding: '8px 10px', borderBottom: `1px solid ${C.line}`, color: C.text,
        verticalAlign: 'middle',
      },

      link: { color: C.brand, textDecoration: 'none', fontSize: '12px' },
      hint: { fontSize: '11px', color: C.faint, lineHeight: '17px' },
      preview: {
        display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', width: '100%',
        padding: '6px 10px', marginBottom: '8px', boxSizing: 'border-box',
        border: `1px dashed ${C.lineStrong}`, borderRadius: '10px', background: C.surface2,
        fontSize: '11px', color: C.dim,
      },
      notice: (kind) => ({
        fontSize: '12px', color: kind === 'error' ? C.err : C.ok,
        background: C.surface2, border: `1px solid ${C.line}`,
        borderRadius: '8px', padding: '6px 10px',
      }),
    };

    function Btn(props) {
      const [hover, setHover] = React.useState(false);
      const off = Boolean(props.disabled) || store.busy;
      const style = {
        ...(props.primary ? css.btnPrimary : css.btn),
        ...(hover && !off ? (props.primary ? css.btnPrimaryHover : css.btnHover) : null),
        ...(off ? css.btnOff : null),
        ...(props.style || {}),
      };
      return h('button', {
        type: 'button',
        style,
        title: props.title,
        disabled: off,
        onClick: props.onClick,
        onMouseEnter: () => setHover(true),
        onMouseLeave: () => setHover(false),
        onFocus: () => setHover(true),
        onBlur: () => setHover(false),
      }, props.children);
    }

    function shorten(text, head = 12, tail = 8) {
      const s = String(text || '');
      if (s.length <= head + tail + 1) return s;
      return `${s.slice(0, head)}…${s.slice(-tail)}`;
    }

    function Sep() {
      return h('span', { style: css.sep, 'aria-hidden': 'true' });
    }

    function Badge(props) {
      return h('span', { style: css.badge(props.tone) }, props.children);
    }

    function StepCard(props) {
      return h('div', { style: css.stepCard },
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
          h('span', { style: css.subNo }, props.n),
          h('span', { style: css.stepTitle }, props.title)),
        h('div', { style: css.stepDesc }, props.desc),
        h('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' } }, props.children));
    }

    function SectionHead(props) {
      return h('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' } },
        h('span', { style: css.stepNo }, props.n),
        h('span', { style: { fontSize: '13px', fontWeight: 600, color: C.text } }, props.title),
        props.hint ? h('span', { style: css.hint }, props.hint) : null);
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
          return h('div', { style: css.bar }, h('span', { style: css.dot(C.err) }),
            h('span', null, `LGSRC · 微步情报查询：本机服务未就绪 (${s.error})`));
        }
        return h('div', { style: css.bar }, h('span', { style: css.dot(C.warn) }),
          h('span', null, 'LGSRC · 微步情报查询：正在读取本机 IP…'));
      }

      const egress = data.egress || {};
      const primaryIp = egress.ip || (data.ips && data.ips[0] && data.ips[0].address) || '未获取';
      const nicIps = (data.ips || []).map((x) => x.address).join(' / ') || '无';
      const last = data.lastLookup;

      const save = async () => {
        const value = draft.trim();
        if (!value) return;
        const res = await act('save-key', { apikey: value });
        if (!res) return;
        setDraft('');
        setShowKey(false);
        const v = await act('verify');
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
              h('span', { style: css.ring(C.warn) }),
              h('span', { style: { fontSize: '13px', fontWeight: 600, color: C.text } }, 'LGSRC · 微步情报查询'),
              h(Badge, { tone: 'warn' }, '未配置 API Key'),
              h('span', { style: { fontSize: '12px', color: C.dim } }, '三步开始使用')),
            h('div', { style: css.steps },
              h(StepCard, { n: '1', title: '复制出口 IP', desc: '要绑定到微步「我的 KEY」白名单的地址' },
                h('span', { style: css.mono }, primaryIp),
                h(Btn, { onClick: () => doCopy(primaryIp, 'ip') }, copied === 'ip' ? '已复制' : '复制')),
              h(StepCard, { n: '2', title: '添加到白名单', desc: '登录微步 X 情报中心 → 我的 KEY → 添加 IP' },
                h(Btn, { onClick: () => act('open-binding') }, '打开绑定页')),
              h(StepCard, { n: '3', title: '保存 API Key', desc: '只写入本机文件，不上传、不同步' },
                showKey
                  ? h(React.Fragment, null,
                      h('input', {
                        style: css.input, type: 'password', placeholder: '粘贴 API Key',
                        value: draft, autoFocus: true,
                        onChange: (e) => setDraft(e.target.value),
                        onKeyDown: (e) => { if (e.key === 'Enter') save(); },
                      }),
                      h(Btn, { primary: true, onClick: save, disabled: !draft.trim() }, '保存到本机'),
                      h(Btn, { onClick: () => { setShowKey(false); setDraft(''); } }, '取消'),
                    )
                  : h(Btn, { primary: true, onClick: () => setShowKey(true) }, '粘贴 API Key')),
            ),
            h('div', { style: { ...css.row, gap: '10px' } },
              h('span', { style: css.hint }, `网卡 IP：${nicIps}`),
              h(Btn, { onClick: () => act('refresh-egress') }, '重新探测'),
              egress.error ? h('span', { style: { fontSize: '11px', color: C.err } }, `探测失败：${egress.error}`) : null),
            s.notice ? h('div', { style: css.notice(s.notice.kind) }, s.notice.text) : null,
          ),
        );
      }

      return h('div', { style: css.bar },
        h('span', { style: css.dot(C.ok) }),
        h('span', { style: css.strong }, 'LGSRC · 微步情报查询'),
        h(Sep, null),
        h('span', { style: css.group },
          h('span', null, '出口 IP'),
          h('span', { style: css.mono }, primaryIp),
          h(Btn, { onClick: () => doCopy(primaryIp, 'ip'), title: '复制出口 IP' }, copied === 'ip' ? '已复制' : '复制'),
          h(Btn, { onClick: () => act('open-binding'), title: '打开微步「我的 KEY」绑定页' }, '绑定')),
        h(Sep, null),
        h('span', { style: { ...css.group, gap: '5px' }, title: data.key.file },
          h('span', null, 'API Key:'),
          h('span', { style: css.mono }, data.key.masked)),
        h(Sep, null),
        last
          ? h(React.Fragment, null,
              h('span', { style: css.group, title: last.indicator },
                h('span', null, '最近'),
                h('span', { style: css.monoSm }, shorten(last.indicator)),
                h('span', { style: css.hint }, `(${last.type})`)),
              sessionId ? h(Btn, { primary: true, onClick: () => act('summarize', { sessionId }), title: '让 AI 针对这次查询写一段简要总结' }, 'AI 总结') : null,
              last.markdownPath ? h(Btn, { onClick: () => act('open-report', { path: last.markdownPath }) }, '打开报告') : null,
              last.reportDir ? h(Btn, { onClick: () => act('open-folder', { path: last.reportDir }) }, '打开目录') : null,
            )
          : h('span', { style: css.hint }, '在对话里粘贴 IP / Domain / Hash / URL / CVE 即可查询'),
        s.notice ? h('span', { style: css.notice(s.notice.kind) }, s.notice.text) : null,
      );
    }

    // ------------------------------------------------------------ 设置页

    function SettingsPanelInner() {
      const s = useStore();
      const [copied, doCopy] = useCopy();
      const [draft, setDraft] = React.useState('');
      const [editing, setEditing] = React.useState(false);
      const [verify, setVerify] = React.useState(null);

      React.useEffect(() => { ensurePoller(); }, []);

      const data = s.data;
      if (!data) {
        return h('div', { style: css.page },
          h('h1', { style: css.h1 }, 'LGSRC · 微步情报查询'),
          h('p', { style: css.sub }, s.error ? `本机服务未就绪：${s.error}` : '正在读取…'));
      }

      const egress = data.egress || {};
      const last = data.lastLookup;

      const save = async () => {
        const value = draft.trim();
        if (!value) return;
        const r = await act('save-key', { apikey: value });
        if (r) { setDraft(''); setEditing(false); setVerify(null); }
      };

      const test = async () => {
        setVerify({ loading: true, ok: false, message: '正在校验…' });
        const r = await act('verify');
        if (r && r.verify) setVerify(r.verify);
      };

      return h('div', { style: css.page },
        h('div', null,
          h('h1', { style: css.h1 }, 'LGSRC · 微步情报查询'),
          h('p', { style: { ...css.sub, marginTop: '6px' } },
            'IP / Domain / Hash / URL / CVE 的情报查询。API Key 只写入本机文件，查询直连 api.threatbook.cn。')),

        // 1. 本机 IP
        h('div', { style: css.card },
          h(SectionHead, { n: '1', title: 'IP 地址', hint: '需在「我的 KEY」绑定出口 IP 后才可调用' }),
          h('div', { style: css.row },
            h('span', { style: { fontSize: '12px', color: C.dim } }, '出口 IP'),
            h('span', { style: { ...css.mono, fontSize: '14px' } }, egress.ip || '未探测到'),
            h(Btn, { onClick: () => doCopy(egress.ip || '', 'eg') }, copied === 'eg' ? '已复制' : '复制'),
            h(Btn, { onClick: () => act('refresh-egress') }, '重新探测'),
            egress.error ? h('span', { style: { fontSize: '11px', color: C.err } }, `探测失败：${egress.error}`) : null),
          h('table', { style: css.table },
            h('thead', null, h('tr', null,
              h('th', { style: css.th }, '网卡 IP'),
              h('th', { style: css.th }, '网卡'),
              h('th', { style: css.th }, '协议'),
              h('th', { style: { ...css.th, textAlign: 'right' } }, '操作'))),
            h('tbody', null, (data.ips || []).map((ip) => h('tr', { key: `${ip.iface}-${ip.address}` },
              h('td', { style: css.td }, h('span', { style: css.mono }, ip.address)),
              h('td', { style: { ...css.td, color: C.dim } }, ip.iface),
              h('td', { style: { ...css.td, color: C.dim } }, ip.family),
              h('td', { style: { ...css.td, textAlign: 'right' } },
                h(Btn, { onClick: () => doCopy(ip.address, ip.address) }, copied === ip.address ? '已复制' : '复制')))))),
        ),

        // 2. 绑定
        h('div', { style: css.card },
          h(SectionHead, { n: '2', title: '绑定访问 IP' }),
          h('div', { style: css.steps },
            h(StepCard, { n: '1', title: '打开绑定页', desc: '登录微步 X 情报中心' },
              h(Btn, { primary: true, onClick: () => act('open-binding') }, '打开绑定页')),
            h(StepCard, { n: '2', title: '添加白名单', desc: `「我的 KEY」→ 添加 ${egress.ip || '出口 IP'}` }),
            h(StepCard, { n: '3', title: '复制 API Key', desc: '回到下方「API Key」一栏粘贴保存' })),
          h('div', { style: css.row },
            h('span', { style: { fontSize: '12px', color: C.dim } }, '绑定页地址'),
            h('a', { style: css.link, href: data.bindingUrl, target: '_blank', rel: 'noreferrer noopener' }, data.bindingUrl),
            h(Btn, { onClick: () => doCopy(data.bindingUrl, 'bind') }, copied === 'bind' ? '已复制' : '复制')),
        ),

        // 3. API Key
        h('div', { style: css.card },
          h(SectionHead, { n: '3', title: 'API Key' }),
          data.key.configured && !editing
            ? h('div', { style: css.row },
                h('span', { style: css.mono }, `API Key: ${data.key.masked}`),
                h('span', { style: css.hint }, data.key.file),
                h(Btn, { onClick: () => { setEditing(true); setDraft(''); } }, '更换'),
                h(Btn, { onClick: async () => { await act('clear-key'); setVerify(null); } }, '清除'),
                h(Btn, { onClick: test }, '测试连通性'))
            : h('div', { style: css.row },
                h('input', {
                  style: css.input, type: 'password', placeholder: '粘贴 API Key(保存后只显示首尾 4 位)',
                  value: draft,
                  onChange: (e) => setDraft(e.target.value),
                  onKeyDown: (e) => { if (e.key === 'Enter') save(); },
                }),
                h(Btn, { primary: true, onClick: save, disabled: !draft.trim() }, '保存到本机'),
                editing ? h(Btn, { onClick: () => { setEditing(false); setDraft(''); } }, '取消') : null,
                data.key.configured ? null : h(Btn, { onClick: test }, '测试连通性')),
          verify ? h('div', { style: css.notice(verify.ok ? 'ok' : 'error') },
            verify.loading ? verify.message : `${verify.ok ? '通过' : '未通过'}：${verify.message}`) : null,
          h('p', { style: css.hint },
            'API Key 以 0600 权限写入本机文件，不上传、不同步、不记入对话日志；删除该文件即等于清除。'),
        ),

        // 4. 最近查询
        h('div', { style: css.card },
          h(SectionHead, { n: '4', title: '最近一次查询' }),
          last
            ? h(React.Fragment, null,
                h('div', { style: css.row },
                  h('span', { style: { ...css.mono, wordBreak: 'break-all' }, title: last.indicator }, last.indicator),
                  h('span', { style: css.hint }, `${last.type} · ${last.at}`)),
                h('pre', {
                  style: {
                    margin: 0, padding: '10px 12px', background: C.surface2,
                    border: `1px solid ${C.line}`, borderRadius: '10px',
                    fontFamily: 'inherit', fontSize: '12px', lineHeight: '20px', color: C.text,
                    whiteSpace: 'pre-wrap', wordBreak: 'break-word', maxHeight: '280px', overflow: 'auto',
                  },
                }, last.digest || ''),
                h('div', { style: css.row },
                  last.markdownPath ? h(Btn, { onClick: () => act('open-report', { path: last.markdownPath }) }, '打开完整 MD 报告') : null,
                  last.reportDir ? h(Btn, { onClick: () => act('open-folder', { path: last.reportDir }) }, '打开报告目录') : null,
                  last.markdownPath ? h('span', { style: css.hint }, last.markdownPath) : null))
            : h('p', { style: css.hint }, '还没有查询过。在对话里粘贴 IP / Domain / Hash / URL / CVE 即可。'),
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
        style: {
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '12px', lineHeight: '20px', color: C.dim,
          border: `1px solid ${C.line}`, borderRadius: '999px',
          background: C.surface, padding: '2px 10px', maxWidth: '100%', boxSizing: 'border-box',
        },
        title: configured ? `API Key: ${data.key.masked}` : '未配置 API Key，可在 设置 → 微步情报查询 里填写',
      },
        h('span', { style: configured ? css.dot(C.ok) : css.ring(C.warn) }),
        h('span', { style: { ...css.strong, overflow: 'hidden', textOverflow: 'ellipsis' } }, 'LGSRC · 微步情报查询'),
        h('span', { style: { ...css.mono, fontSize: '12px' } }, ip),
        h(Btn, { onClick: () => doCopy(ip, 'hero') }, copied === 'hero' ? '已复制' : '复制'),
        h(Btn, { onClick: () => act('open-binding') }, '绑定'),
        configured ? null : h('span', { style: css.hint }, '· 未配置 API Key'),
      );
    }

    function PreviewBar() {
      if (!PREVIEW) return null;
      const go = (kind) => {
        try {
          if (kind) window.localStorage.setItem('threatbook:preview', kind);
          else window.localStorage.removeItem('threatbook:preview');
          const url = new URL(window.location.href);
          if (url.searchParams.has('tb')) {
            url.searchParams.delete('tb');
            window.history.replaceState(null, '', url.pathname + url.search + url.hash);
          }
        } catch { /* 忽略 */ }
        window.location.reload();
      };
      return h('div', { style: css.preview },
        h('span', { style: { fontSize: '11px', fontWeight: 600, color: C.text } }, '界面预览'),
        ...Object.entries(PREVIEW_LABELS).map(([kind, label]) =>
          h(Btn, { key: kind, primary: kind === PREVIEW, onClick: () => go(kind) }, label)),
        h(Btn, { onClick: () => go(null) }, '退出预览'));
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
