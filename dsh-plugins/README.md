# DSH 插件（dsh-plugins）

本目录收录灵糕中心 · 安全响应中心（LGSRC）为 [DeepSeek Harness（DSH）](https://github.com/deepseek-ai) 编写的插件。

> **许可**：本目录内的**代码**以 [MIT](threatbook-intel/LICENSE) 发布；仓库其余内容（数据表、文档、图片等）仍遵循 [CC BY-SA 4.0](../LICENSE.txt)。

## 插件列表

| 插件 | 一句话说明 | 版本 |
| --- | --- | --- |
| [`threatbook-intel`](threatbook-intel/) | 微步在线云 API 接入：显示本机出口 IP 并一键复制、打开 KEY 绑定页、API Key 仅存本机，并对 IP / 域名 / 文件 Hash / URL / 漏洞编号做多接口完整查询并生成 Markdown 报告 | 1.0.0 |

## 怎么安装（给使用者）

三种方式效果一样，任选其一。装完**刷新页面**即可看到面板。

**① 压缩包（推荐，最省事）**

到本仓库的 [Releases](https://github.com/Lingggao/LGSRC/releases) 下载 `threatbook-intel-*.zip` → 解压 → DSH 里「插件 → 添加插件」→ 填解压后**含 `package.json` 的那层目录**的绝对路径。

**② Git 克隆**

```bash
git clone https://github.com/Lingggao/LGSRC.git
```

「添加插件」里填 `<克隆目录>/dsh-plugins/threatbook-intel` 的绝对路径。

**③ npm（可选，目前未发布）**

如果将来发布到 npm，在「添加插件」里填包名 `dsh-threatbook-intel` 即可。

## 使用前必读

- 需要**微步在线云 API Key**，且要先把调用方的**公网出口 IP** 绑定到微步「我的 KEY」，否则接口返回 `-1 Invalid Access IP`。插件面板上会直接显示该 IP 并支持一键复制。
- 插件启动时读取本机网卡 IP，并向若干公网 IP 探测服务查询出口 IP（可用 `THREATBOOK_EGRESS_URLS` 改成自有服务）。
- **API Key 只存本机** `<DSH 配置目录>/plugin-data/threatbook-intel/apikey.json`（权限 0600），不上传、不同步、不进入模型上下文。仓库与安装包里不含任何密钥。

## 安全

安装前请先读这两份，均为本目录内维护：

| 文档 | 内容 |
| --- | --- |
| [`SECURITY.md`](SECURITY.md) | 数据流向表、网络出口清单、密钥与文件写入范围、已知限制 |
| [`docs/threatbook-intel-security-audit.md`](docs/threatbook-intel-security-audit.md) | 按“命令执行 / 文件操作 / 网络请求 / 依赖 / 打包内容”逐项检查的自检报告 |

一句话结论：零运行时依赖、无下载执行、无遥测，网络目标为固定常量，Key 仅存本机。

## 怎么加新插件（给维护者）

每个插件目录就是一个完整的 npm 包，彼此独立，不需要额外的构建工具：

```
dsh-plugins/
├── README.md            ← 本文件
├── SECURITY.md          ← 安全说明（数据流向、网络出口、密钥处理）
├── RELEASING.md         ← 发版手册（三步）
├── docs/                ← 各插件的安全自检报告
├── scripts/check.mjs    ← 清单自检脚本，CI 与本机都跑它
└── <插件名>/            ← package.json 在这一层
```

新增插件时，有三处名字必须完全一致，否则插件装上也不会生效（`check.mjs` 会替你拦住）：

1. `package.json` 的 `name`
2. `client.js` 里 `window.__ModuleLoader__.load({ id: ... })` 的 `id`
3. `cordis.patch.yml` 里 `name`

改动提交后，仓库的 Actions 会自动跑语法检查与清单检查；发版见 [RELEASING.md](RELEASING.md)。

新增或修改插件行为（网络目标、文件写入、依赖）时，同步更新 `SECURITY.md` 对应条目，并在 `docs/` 下补一份该插件的自检报告（可复制现有报告的章节结构）。

版本号规则：**小修小补涨最后一位**（`1.0.0` → `1.0.1`），**加功能或较大优化涨第一位**（`1.0.1` → `2.0.0`）。
