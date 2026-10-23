/**
 * 微步在线情报插件 — Web Client 半边。
 *
 * 两个渲染位置：
 *   · conversation.composer.dock：输入框下方的一行状态条 / 首次配置卡片（IP + 复制 + 绑定 + 存 Key）
 *   · settings.section：完整的「微步情报」设置页（全部网卡 IP、绑定步骤、Key 管理、连通性测试、最近报告）
 *
 * 所有宿主数据都通过本机回环路由 /threatbook/* 读取，Key 不出本机。
 */
window.__ModuleLoader__.load({
  id: 'dsh-threatbook-intel',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const STATE_URL = '/threatbook/state';
    const ACTION_URL = '/threatbook/action';
    const REFRESH_MS = 20000;

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
      if (inflight) return inflight;
      inflight = (async () => {
        try {
          const res = await fetch(STATE_URL, { headers: { accept: 'application/json' }, cache: 'no-store' });
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
      patch({ busy: true, notice: null });
      try {
        const res = await fetch(ACTION_URL, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ action, ...(payload || {}) }),
        });
        const body = await res.json().catch(() => ({}));
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

    const COLORS = {
      text: 'var(--dsw-alias-label-primary)',
      dim: 'var(--dsw-alias-label-secondary)',
      border: 'var(--dsw-alias-border-l1)',
      border2: 'var(--dsw-alias-border-l2)',
      layer: 'var(--dsw-alias-bg-layer-1)',
      layer2: 'var(--dsw-alias-bg-layer-2)',
      brand: 'var(--dsw-alias-brand-primary)',
      ok: 'var(--dsw-alias-state-success-primary)',
      warn: 'var(--dsw-alias-state-warn-primary)',
      err: 'var(--dsw-alias-state-error-primary)',
    };

    const css = {
      wrap: {
        display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap',
        fontSize: '12px', lineHeight: '20px', color: COLORS.dim, padding: '2px 2px 0',
      },
      dot: (color) => ({ width: '6px', height: '6px', borderRadius: '50%', background: color, flex: '0 0 auto' }),
      mono: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: COLORS.text, fontWeight: 600 },
      btn: {
        border: `1px solid ${COLORS.border}`, background: 'transparent', color: COLORS.text,
        borderRadius: '6px', padding: '1px 8px', fontSize: '12px', lineHeight: '18px',
        cursor: 'pointer', whiteSpace: 'nowrap',
      },
      btnPrimary: {
        border: '1px solid transparent', background: COLORS.brand, color: '#fff',
        borderRadius: '6px', padding: '2px 10px', fontSize: '12px', lineHeight: '18px', cursor: 'pointer',
      },
      card: {
        border: `1px solid ${COLORS.border}`, background: COLORS.layer, borderRadius: '10px',
        padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '8px',
        fontSize: '12px', color: COLORS.text, width: '100%', boxSizing: 'border-box',
      },
      row: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' },
      input: {
        flex: '1 1 220px', minWidth: '160px', border: `1px solid ${COLORS.border2}`,
        background: COLORS.layer2, color: COLORS.text, borderRadius: '6px',
        padding: '4px 8px', fontSize: '12px', outline: 'none',
      },
      link: { color: COLORS.brand, cursor: 'pointer', textDecoration: 'none', background: 'none', border: 'none', padding: 0, fontSize: '12px' },
      sep: { color: COLORS.border2 },
      step: { color: COLORS.dim },
      h: { margin: '0 0 6px', fontSize: '13px', fontWeight: 600, color: COLORS.text },
      section: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '4px 2px 24px', maxWidth: '860px' },
      table: { width: '100%', borderCollapse: 'collapse', fontSize: '12px' },
      th: { textAlign: 'left', padding: '6px 8px', color: COLORS.dim, fontWeight: 500, borderBottom: `1px solid ${COLORS.border}` },
      td: { padding: '6px 8px', borderBottom: `1px solid ${COLORS.border}`, color: COLORS.text },
      notice: (kind) => ({
        fontSize: '12px', color: kind === 'error' ? COLORS.err : COLORS.ok,
        background: COLORS.layer2, border: `1px solid ${COLORS.border}`,
        borderRadius: '6px', padding: '4px 8px',
      }),
    };

    function Btn(props) {
      const style = props.primary ? { ...css.btnPrimary, ...(props.style || {}) } : { ...css.btn, ...(props.style || {}) };
      return h('button', {
        type: 'button',
        style,
        disabled: props.disabled || store.busy,
        onClick: props.onClick,
        title: props.title,
      }, props.children);
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

    function DockPanel(props) {
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
          return h('div', { style: css.wrap }, h('span', { style: css.dot(COLORS.err) }), h('span', null, `微步情报：本机服务未就绪（${s.error}）`));
        }
        return h('div', { style: css.wrap }, h('span', { style: css.dot(COLORS.warn) }), h('span', null, '微步情报：正在读取本机 IP…'));
      }

      const egress = data.egress || {};
      const primaryIp = egress.ip || (data.ips && data.ips[0] && data.ips[0].address) || '未获取';
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
          if (v.verify.ok) notify('ok', '已保存到本机，连通性校验通过。');
          else notify('error', `已保存到本机，但校验未通过：${v.verify.message}`);
        } else {
          notify('ok', 'API Key 已保存到本机。');
        }
      };

      if (!configured) {
        return h('div', { style: { width: '100%' } },
          h('div', { style: css.card },
            h('div', { style: css.row },
              h('span', { style: { ...css.dot(COLORS.warn), width: '8px', height: '8px' } }),
              h('strong', { style: { color: COLORS.text } }, '微步情报未配置'),
              h('span', null, '把本机出口 IP 绑定到「我的 KEY」后，粘贴 API Key 即可（只存本机，不上传）'),
            ),
            h('div', { style: css.row },
              h('span', { style: css.step }, '① 复制 IP'),
              h('code', { style: css.mono }, primaryIp),
              h(Btn, { onClick: () => doCopy(primaryIp, 'ip') }, copied === 'ip' ? '已复制' : '复制'),
              h('span', { style: css.sep }, '·'),
              h('span', { style: css.step }, '② 打开绑定页'),
              h(Btn, { onClick: () => act('open-binding') }, '打开「我的 KEY」'),
              h('span', { style: css.sep }, '·'),
              h('span', { style: css.step }, '③ 保存 Key'),
              showKey
                ? h(React.Fragment, null,
                    h('input', {
                      style: css.input, type: 'password', placeholder: '粘贴微步 API Key',
                      value: draft, autoFocus: true,
                      onChange: (e) => setDraft(e.target.value),
                      onKeyDown: (e) => { if (e.key === 'Enter') save(); },
                    }),
                    h(Btn, { primary: true, onClick: save, disabled: !draft.trim() }, '保存'),
                    h(Btn, { onClick: () => { setShowKey(false); setDraft(''); } }, '取消'),
                  )
                : h(Btn, { primary: true, onClick: () => setShowKey(true) }, '粘贴 Key'),
            ),
            h('div', { style: css.row },
              h('span', { style: css.step }, `检测到的网卡 IP：${(data.ips || []).map((x) => x.address).join(' / ') || '无'}`),
              egress.error ? h('span', { style: { color: COLORS.err } }, `公网 IP 探测失败：${egress.error}`) : null,
              h(Btn, { onClick: () => act('refresh-egress') }, '重新探测公网 IP'),
            ),
            s.notice ? h('div', { style: css.notice(s.notice.kind) }, s.notice.text) : null,
          ),
        );
      }

      return h('div', { style: css.wrap },
        h('span', { style: css.dot(COLORS.ok) }),
        h('span', { style: { color: COLORS.text, fontWeight: 600 } }, '微步情报'),
        h('span', { style: css.sep }, '|'),
        h('span', null, '出口 IP', ' '),
        h('code', { style: css.mono }, primaryIp),
        h(Btn, { onClick: () => doCopy(primaryIp, 'ip') }, copied === 'ip' ? '已复制' : '复制'),
        h(Btn, { onClick: () => act('open-binding') }, '绑定'),
        h('span', { style: css.sep }, '|'),
        h('span', { title: data.key.file }, `Key ${data.key.masked}`),
        last
          ? h(React.Fragment, null,
              h('span', { style: css.sep }, '|'),
              h('span', null, `最近 ${last.indicator}（${last.type}）`),
              sessionId ? h(Btn, { primary: true, onClick: () => act('summarize', { sessionId }), title: '让 AI 针对这次查询写一段简要总结' }, 'AI 总结') : null,
              last.markdownPath ? h(Btn, { onClick: () => act('open-report', { path: last.markdownPath }) }, '打开报告') : null,
              last.reportDir ? h(Btn, { onClick: () => act('open-folder', { path: last.reportDir }) }, '打开目录') : null,
            )
          : h(React.Fragment, null, h('span', { style: css.sep }, '|'), h('span', null, '在对话里直接粘贴 IP / 域名 / Hash / URL / CVE 即可查询')),
        s.notice ? h('span', { style: css.notice(s.notice.kind) }, s.notice.text) : null,
      );
    }

    // ------------------------------------------------------------ 设置页

    function SettingsPanel() {
      const s = useStore();
      const [copied, doCopy] = useCopy();
      const [draft, setDraft] = React.useState('');
      const [editing, setEditing] = React.useState(false);
      const [verify, setVerify] = React.useState(null);

      React.useEffect(() => { ensurePoller(); }, []);

      const data = s.data;
      if (!data) {
        return h('div', { style: css.section }, h('div', { style: css.h }, '微步情报'), h('div', null, s.error ? `本机服务未就绪：${s.error}` : '正在读取…'));
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

      return h('div', { style: css.section },
        h('div', null,
          h('div', { style: css.h }, '微步情报（ThreatBook）'),
          h('div', { style: { fontSize: '12px', color: COLORS.dim } },
            '用于 IP / 域名 / 文件 Hash / URL / 漏洞编号的情报查询。API Key 只写入本机文件，查询直连 api.threatbook.cn，不经过任何第三方云端存储。'),
        ),

        // 1. IP
        h('div', null,
          h('div', { style: css.h }, '1. 本机 IP（需在「我的 KEY」中绑定后才可调用）'),
          h('div', { style: { ...css.row, marginBottom: '8px' } },
            h('span', null, '公网出口 IP：'),
            h('code', { style: { ...css.mono, fontSize: '13px' } }, egress.ip || '未探测到'),
            h(Btn, { onClick: () => doCopy(egress.ip || '', 'eg') }, copied === 'eg' ? '已复制' : '复制'),
            h(Btn, { onClick: () => act('refresh-egress') }, '重新探测'),
            egress.error ? h('span', { style: { color: COLORS.err } }, `探测失败：${egress.error}`) : null,
          ),
          h('table', { style: css.table },
            h('thead', null, h('tr', null,
              h('th', { style: css.th }, '网卡 IP'),
              h('th', { style: css.th }, '网卡'),
              h('th', { style: css.th }, '协议'),
              h('th', { style: css.th }, '操作'),
            )),
            h('tbody', null, (data.ips || []).map((ip) => h('tr', { key: `${ip.iface}-${ip.address}` },
              h('td', { style: css.td }, h('code', { style: css.mono }, ip.address)),
              h('td', { style: css.td }, ip.iface),
              h('td', { style: css.td }, ip.family),
              h('td', { style: css.td }, h(Btn, { onClick: () => doCopy(ip.address, ip.address) }, copied === ip.address ? '已复制' : '复制')),
            ))),
          ),
        ),

        // 2. 绑定
        h('div', null,
          h('div', { style: css.h }, '2. 绑定访问 IP'),
          h('div', { style: { fontSize: '12px', color: COLORS.dim, lineHeight: '22px' } },
            h('div', null, '① 点击「打开绑定页」，登录微步 X 情报中心；'),
            h('div', null, `② 在「我的 KEY」里把上面的公网出口 IP（${egress.ip || '未探测到'}）加入 IP 白名单，未绑定会返回 -1 Invalid Access IP；`),
            h('div', null, '③ 复制页面上的 API Key，回到本页第 3 步保存。'),
          ),
          h('div', { style: { ...css.row, marginTop: '8px' } },
            h(Btn, { primary: true, onClick: () => act('open-binding') }, '打开绑定页'),
            h('a', { style: css.link, href: data.bindingUrl, target: '_blank', rel: 'noreferrer noopener' }, data.bindingUrl),
          ),
        ),

        // 3. Key
        h('div', null,
          h('div', { style: css.h }, '3. API Key'),
          data.key.configured && !editing
            ? h('div', { style: css.row },
                h('code', { style: css.mono }, data.key.masked),
                h('span', { style: { fontSize: '12px', color: COLORS.dim } }, `已保存于 ${data.key.file}${data.key.savedAt ? ` · ${data.key.savedAt}` : ''}`),
                h(Btn, { onClick: () => { setEditing(true); setDraft(''); } }, '更换'),
                h(Btn, { onClick: async () => { await act('clear-key'); setVerify(null); } }, '清除'),
                h(Btn, { onClick: test }, '测试连通性'),
              )
            : h('div', { style: css.row },
                h('input', {
                  style: css.input, type: 'password', placeholder: '粘贴微步 API Key（保存后只显示首尾 4 位）',
                  value: draft,
                  onChange: (e) => setDraft(e.target.value),
                  onKeyDown: (e) => { if (e.key === 'Enter') save(); },
                }),
                h(Btn, { primary: true, onClick: save, disabled: !draft.trim() }, '保存到本机'),
                editing ? h(Btn, { onClick: () => { setEditing(false); setDraft(''); } }, '取消') : null,
                data.key.configured ? null : h(Btn, { onClick: test }, '测试连通性'),
              ),
          verify ? h('div', { style: css.notice(verify.ok ? 'ok' : 'error') },
            verify.loading ? verify.message : `${verify.ok ? '通过' : '未通过'}：${verify.message}`) : null,
          h('div', { style: { fontSize: '11px', color: COLORS.dim, marginTop: '6px' } },
            'Key 以 0600 权限写入本机文件；插件不上传、不同步、不记入对话日志。删除该文件即等于清除 Key。'),
        ),

        // 4. 最近查询
        h('div', null,
          h('div', { style: css.h }, '4. 最近一次查询'),
          last
            ? h('div', { style: { fontSize: '12px', color: COLORS.dim, lineHeight: '22px' } },
                h('div', null, `${last.indicator}（${last.type}）· ${last.at}`),
                h('pre', {
                  style: {
                    margin: '8px 0 0', padding: '8px 10px', background: COLORS.layer2,
                    border: `1px solid ${COLORS.border}`, borderRadius: '8px',
                    fontSize: '12px', color: COLORS.text, whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                    maxHeight: '260px', overflow: 'auto',
                  },
                }, last.digest || ''),
                h('div', { style: { ...css.row, marginTop: '8px' } },
                  last.markdownPath ? h(Btn, { onClick: () => act('open-report', { path: last.markdownPath }) }, '打开完整 MD 报告') : null,
                  last.reportDir ? h(Btn, { onClick: () => act('open-folder', { path: last.reportDir }) }, '打开报告目录') : null,
                  last.markdownPath ? h('code', { style: { fontSize: '11px', color: COLORS.dim } }, last.markdownPath) : null,
                ),
              )
            : h('div', { style: { fontSize: '12px', color: COLORS.dim } }, '还没有查询过。在对话里直接粘贴 IP、域名、Hash、URL 或 CVE 编号即可。'),
        ),
      );
    }

    // ------------------------------------------------------------ 新对话（hero 空白态）里的小条
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
          fontSize: '12px', lineHeight: '20px', color: COLORS.dim,
          border: `1px solid ${COLORS.border}`, borderRadius: '999px',
          background: COLORS.layer, padding: '2px 10px', maxWidth: '100%',
        },
        title: configured ? `API Key 已配置：${data.key.masked}` : '未配置 API Key，可在 设置 → 微步情报 里填写',
      },
        h('span', { style: css.dot(configured ? COLORS.ok : COLORS.warn) }),
        h('span', { style: { color: COLORS.text, fontWeight: 600 } }, '微步'),
        h('code', { style: { ...css.mono, fontSize: '12px' } }, ip),
        h(Btn, { onClick: () => doCopy(ip, 'hero'), style: { padding: '0 6px', lineHeight: '16px' } }, copied === 'hero' ? '已复制' : '复制'),
        h(Btn, { onClick: () => act('open-binding'), style: { padding: '0 6px', lineHeight: '16px' } }, '绑定'),
        configured ? null : h('span', { style: { color: COLORS.dim } }, '· 未配 Key → 设置 → 微步情报'),
      );
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
          label: '微步情报',
        }, SettingsPanel));
      },
    };
  },
});
