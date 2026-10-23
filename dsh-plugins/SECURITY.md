# 安全说明

本文件说明 `dsh-plugins/` 下插件的行为边界，供安装前评估。每个插件的逐项自检结论见 [`docs/`](docs/)。

---

## 通用原则

以下原则适用于本目录内全部插件：

- 以普通用户权限运行在 DSH 宿主进程中，**不申请额外权限**，不修改系统设置。
- **不含下载并执行的代码**：发行包内只有 `.js`、`.json`、`.yml`、`.svg`、`.md`，没有二进制、没有安装脚本（`preinstall` / `postinstall`）、没有运行时依赖。
- **无遥测**：不收集、不上报使用统计，不包含自动更新逻辑。
- 每个插件的网络目标、文件读写范围、已知限制，均在 `docs/` 对应的自检报告中逐项列出。

---

## 插件：threatbook-intel

### 数据流向

| 数据 | 方向 | 目的地 | 是否离开本机 |
| --- | --- | --- | --- |
| 查询指标（IP / 域名 / Hash / URL / CVE） | 发送 | `api.threatbook.cn`（HTTPS） | 是（查询功能所必需） |
| API Key | 发送（随请求参数） | `api.threatbook.cn`（HTTPS） | 是（仅发给微步，用于鉴权） |
| API Key 存档 | 写入 | 本机 `<DSH profile>/plugin-data/threatbook-intel/apikey.json`（0600） | 否 |
| 本机网卡 IP | 读取 | 本机系统接口 | 否 |
| 公网出口 IP | 请求 | IP 探测服务（见下表），仅返回自身地址 | 是（仅出口 IP） |
| 查询结果 | 写入 | 本机工作区 `threatbook-reports/` | 否 |

插件**不读取**会话内容、不读取用户文档、不读取浏览器数据、不遍历工作区以外的目录。

### 网络出口

| 域名 | 用途 | 可否关闭 |
| --- | --- | --- |
| `api.threatbook.cn` | 微步云 API 查询 | 否（关闭即失去功能） |
| `x.threatbook.com` | 在浏览器打开 KEY 绑定页 | 是（不点「绑定」即不打开） |
| `ipinfo.io`、`ifconfig.me`、`api.ip.sb`、`myip.ipip.net`、`api.ipify.org` | 探测本机公网出口 IP | 是，见下方环境变量 |

```bash
# 指向自有探测服务后，插件不再访问上述公网站点；返回值需为纯 IP 或含 "ip" 字段的 JSON
THREATBOOK_EGRESS_URLS=http://10.0.0.10:8080/ip
```

### API Key

- 仅保存在本机 `apikey.json`，创建时权限为 `0600`（Windows 上由用户目录 ACL 保护）。
- 界面与状态接口只显示**掩码**（首 4 位 + 末 4 位），明文只存在于 Host 进程内存与上述文件。
- Key **不进入模型上下文**、不写入会话日志、不随报告落盘。
- 随时可在「设置 → 微步情报」点「清除」删除；删除文件即等于清除。
- 建议在微步控制台按最小授权发放，泄露时立即吊销。

### 文件写入

| 路径 | 内容 | 触发时机 |
| --- | --- | --- |
| `<DSH profile>/plugin-data/threatbook-intel/apikey.json` | API Key 与保存时间 | 保存 Key 时 |
| `<工作区>/threatbook-reports/<类型>-<指标>-<时间>.json` | 查询原始响应 | 每次查询 |
| `<工作区>/threatbook-reports/<类型>-<指标>-<时间>.md` | 完整 Markdown 报告 | 每次查询 |

### 本机接口鉴权

面板与设置页使用 `/threatbook/state`、`/threatbook/action` 两个本机接口，二者均通过 DSH 的 `connection.requestRejection` 校验：只接受**已加载本页面、持有 DSH 浏览器凭据**的请求。同机其他进程直接调用会得到 `401`，既读不到网卡 IP 与 Key 掩码，也无法写入或清除 Key。

### 已知限制

1. 未配置 Key 时，每次 DSH 进程启动会自动在浏览器打开一次微步 KEY 绑定页。
2. 仅支持 Node.js 20 及以上（由 DSH 运行环境提供）。

---

## 报告安全问题

发现本目录插件存在安全问题，请发送邮件至 **ling@lghub.org**，或在仓库提交 Issue（**请勿在 Issue 中粘贴 API Key、样本或内网信息**）。我们会在确认后修复并在 `CHANGELOG.md` 中记录。
