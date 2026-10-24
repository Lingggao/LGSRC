# 微步情报 (dsh-threatbook-intel)

DSH Harness 插件：把「微步在线云 API」接进 Web 界面与对话。

## 安装

**方式一：压缩包 (推荐，无需任何账号)**

从 [Releases](https://github.com/Lingggao/LGSRC/releases) 下载 `threatbook-intel-*.zip`，解压到任意目录，然后在 DSH「插件 → 添加插件」中填入解压后**含 `package.json` 的那一层目录**的绝对路径。

**方式二：Git 仓库**

```bash
git clone https://github.com/Lingggao/LGSRC.git
```

在「添加插件」中填 `<克隆目录>/dsh-plugins/threatbook-intel` 的绝对路径。

**方式三：npm(可选，发布后才有)**

在「添加插件」中填包名 `dsh-threatbook-intel`。

> 三种方式效果相同，选一种即可。安装后**刷新页面**，「设置 → 微步情报」里粘贴 API Key(先把本机出口 IP 绑定到微步「我的 KEY」)。

## 隐私边界

- 只访问 `api.threatbook.cn`(查询) 与若干公网 IP 探测服务 (仅取本机出口 IP，可用 `THREATBOOK_EGRESS_URLS` 覆盖)。
- API Key 只写入本机 `<profile>/plugin-data/threatbook-intel/apikey.json`(0600)，
  不上传、不同步、不进入模型上下文。
- 包内不含任何密钥；每个使用者的 Key 都由其本机自行填写。

## 能力

1. **启动即显示本机 IP**：输入框下方一条状态条显示公网出口 IP 与各网卡 IP，**一键复制**；
   读不到 Key 时展开为三步引导卡片。
2. **自动打开绑定页**：未配置 Key 时自动在浏览器打开
   <https://x.threatbook.com/v5/serviceCenter?tab=myKey> 并列出绑定步骤 (每进程只自动打开一次，也可点「绑定」手动打开)。
3. **Key 只存本机**：写入 `<profile>/plugin-data/threatbook-intel/apikey.json`(0600)，
   不上传、不同步、不写入会话日志；设置页显示文件路径，可随时清除。
4. **自动识别指标并全量查询**：对话里直接贴 IP / 域名 / MD5-SHA1-SHA256 / URL / CVE-XVE 等，模型会调用
   `threatbook_lookup`，插件按类型执行**尽可能全**的接口组合：

   | 类型 | 接口 |
   | --- | --- |
   | IP | `ip/query`、`scene/ip_reputation`、`ip/adv_query` |
   | 域名 | `domain/query`、`domain/adv_query`、`domain/sub_domains`、`scene/ioc`、`scene/domain_context` |
   | Hash | `file/report`(summary+multiengines+signature+static+network+dropped+pstree+strings)、`file/report/multiengines` |
   | URL | `url/report`，无报告时自动 `url/scan` 并轮询报告 |
   | 漏洞 | `vuln`(VPR/CVSS/PoC/修复方案/补丁/在野利用) |

5. **报告落盘**：每次查询把**完整原始 JSON** 与**完整 Markdown 报告**写入工作区 `threatbook-reports/`，
   返回值里给出路径；面板上可直接「打开报告 / 打开目录」。
6. **多个后续选项**：工具返回时会列出「简要总结 / 打开完整 MD / 深入某字段」供用户选择；
   同时提供 `threatbook_status` 查看 IP、Key、绑定地址与最近一次查询。

## 界面预览 (开发用)

插件面板有 7 种状态，正常只能看到自己当前那一种。开发时**直接点击插件名称中间的「·」**即可循环切换 (无需改地址栏)，8 次点击回到真实数据；也可以在 GUI 地址后追加 `?tb=<场景>` 直接进入指定状态 (地址已有参数则用 `&tb=`)：

| 场景 | 用途 |
| --- | --- |
| `?tb=unconfigured` | 未配置 Key 的三步引导卡片 |
| `?tb=configured` | 已配置、无查询记录的常态 |
| `?tb=last` | 带「最近查询」与操作按钮 |
| `?tb=empty` | 已配置但从未查询过 |
| `?tb=notice` | 带一条错误提示 |
| `?tb=loading` | 首次加载中 |
| `?tb=error` | 本机服务不可用 |

进入后面板顶部会出现一条虚线预览条，可直接点按钮切换场景，点「退出预览」回到真实数据；切换即时生效，不刷新页面。预览模式**完全使用假数据**，所有写操作 (保存 / 清除 Key、打开报告) 都会被拦截，不会碰到真实 Key 与本机文件。

## 配置 (可选环境变量)

| 变量 | 说明 |
| --- | --- |
| `THREATBOOK_KEY_FILE` | 覆盖 Key 文件路径 |
| `THREATBOOK_EGRESS_URLS` | 逗号分隔的公网 IP 探测服务，默认 ipinfo.io / ifconfig.me / api.ip.sb / myip.ipip.net / api.ipify.org |

## 数据边界

- 只访问 `api.threatbook.cn`(查询) 与上面列出的 IP 探测服务 (仅取本机出口 IP)。
- API Key 不进入模型上下文：UI 通过本机回环路由 `/threatbook/*` 与 Host 通信，POST 强制 `application/json`。

## 文案约定

改动界面时请沿用下表写法，避免同一个概念出现多种叫法：

| 概念 | 固定写法 | 不要写成 |
| --- | --- | --- |
| 产品名 | `LGSRC · 微步情报查询` | 微步情报、LGSRC 微步情报 |
| 凭据 | `API Key` | Key、密钥、微步 API Key |
| 公网地址 | `出口 IP` | 公网出口 IP、外网 IP |
| 本机地址 | `网卡 IP` | 内网 IP、本地 IP |
| 指标类型 | `IP / Domain / Hash / URL / CVE` | 域名、文件 Hash、漏洞编号 |
| 微步控制台页面 | `我的 KEY` | 我的 Key(该页面名本身是全大写，属专有名词) |
| 排版 | 中英文之间、英文括号外侧各留一个空格 | 中英文粘连、括号紧贴文字 |

