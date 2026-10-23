# 变更记录

本文件记录 `threatbook-intel` 插件的版本变化。发版时在顶部新增一节。

## 1.0.0 — 2026-10-24

首个版本。

- 启动即读取本机网卡 IP 与公网出口 IP，面板可一键复制，便于在微步「我的 KEY」中绑定白名单
- 未配置 Key 时自动打开微步 KEY 绑定页并给出三步引导（每进程仅自动打开一次）
- API Key 仅写入本机 `<profile>/plugin-data/threatbook-intel/apikey.json`（0600），不上传、不进入模型上下文
- 自动识别输入类型（IP / 域名 / MD5·SHA1·SHA256 / URL / CVE-XVE 等）并执行多接口完整查询：
  - IP：`ip/query` + `scene/ip_reputation` + `ip/adv_query`
  - 域名：`domain/query` + `domain/adv_query` + `domain/sub_domains` + `scene/ioc` + `scene/domain_context`
  - 文件：`file/report`（summary / multiengines / signature / static / network / dropped / pstree / strings）+ `file/report/multiengines`
  - URL：`url/report`，无报告时自动 `url/scan` 并轮询
  - 漏洞：`vuln`（VPR / CVSS / PoC / 修复方案 / 补丁 / 在野利用）
- 每次查询落盘完整原始 JSON 与完整 Markdown 报告到工作区 `threatbook-reports/`
- 提供 `threatbook_lookup`、`threatbook_status` 两个工具；面板支持「AI 总结」「打开报告」「打开目录」
- 设置页提供全部网卡 IP、绑定说明、Key 更换 / 清除 / 连通性测试
