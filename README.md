<SPAN ID = 'HEAD'/>

<div align="center">
<img src="Images/Microsoft MCI.png" width = "12%" /><img src="Images/LING_2.png" width = "25%" /> <img src="Images/WCC2024_2.png" width = "12%" />
</div>

<h1 align="center">灵糕中心 · 安全响应分中心</h1>

<h3 align="center">(LGHUB · Security Response Center)</h3>

[github.com/Lingggao/LGSRC](https://github.com/Lingggao/LGSRC) (GitHub) & [lingggao.github.io/LGSRC](https://lingggao.github.io/LGSRC) (Pages)

&emsp;&emsp;**用于打击计算机病毒与恶意软件的 “[灵糕中心](https://github.com/Lingggao/LGHUB) · 安全响应分中心”**。由 2025 Microsoft Management Community Influencer · [**Ling Gao**](https://github.com/Lingggao) 先生领导。灵糕中心 · 安全响应分中心成立于 2025 年 12 月 20 日。

> [!IMPORTANT]
>
> &emsp;灵糕中心为个人项目，管理者不是 Microsoft 公司员工，不能代表 Microsoft 公司立场、态度。

&emsp;&emsp;**宗旨**：独立管理、放眼全球、数据精确、打击迅速

---

Microsoft - [Microsoft 安全响应中心](https://msrc.microsoft.com) | [Microsoft 安全情报](https://www.microsoft.com/en-us/wdsi) | [Microsoft Defender 门户](https://security.microsoft.com) | [获取更新](https://www.microsoft.com/en-us/wdsi/defenderupdates) | [提交文件](https://www.microsoft.com/en-us/wdsi/filesubmission)

研究 - [微步云沙箱](https://s.threatbook.com) | [奇安信威胁情报中心](https://ti.qianxin.com) | [安恒云沙箱](https://sandbox.dbappsecurity.com.cn) | [360 沙箱云](https://ata.360.net) | [天穹智能分析平台](https://sandbox.qianxin.com/sscc-tq-web) | [深信服威胁情报中心](https://ti.sangfor.com.cn/analysis-platform?lang=ZH-CN) | [国家计算机病毒协同分析平台 (国家计算机病毒应急处理中心)](http://110.41.132.165/#/entirety/upload) | [可疑文件分析云 (计算机病毒防御技术国家工程实验室)](https://cloud.vdnel.cn) | [VirusTotal](https://www.virustotal.com/gui/home/upload) | [MalwareBazaar](https://bazaar.abuse.ch) | [URLhaus](https://urlhaus.abuse.ch) | [YARAify](https://yaraify.abuse.ch) | [ThreatFox](https://threatfox.abuse.ch) | [Kaspersky OpenTIP](https://opentip.kaspersky.com) | [Hybrid Analysis](https://hybrid-analysis.com) | [ANY.RUN](https://app.any.run)

举报 - [中央网信办 违法和不良信息举报中心](https://www.12377.cn/index.html) | [网络违法犯罪信息举报网站](https://cyberpolice.mps.gov.cn/wfjb/#) | [网络不良与垃圾信息举报受理中心](https://www.12321.cn)

社区 - [卡饭论坛 病毒样本 分享&分析区](https://bbs.kafan.cn/forum-31-1.html) | [火绒安全论坛 病毒查杀问题反馈](https://bbs.huorong.cn/forum-44-1.html) | [百度贴吧 病毒吧](https://tieba.baidu.com/f?ie=utf-8&kw=%E7%97%85%E6%AF%92)

学习 - [Microsoft 认证：安全性、合规性和标识基础知识](https://learn.microsoft.com/zh-cn/credentials/certifications/security-compliance-and-identity-fundamentals) | [Microsoft 认证：安全运营分析师助理](https://learn.microsoft.com/zh-cn/credentials/certifications/security-operations-analyst) | [Microsoft 认证：网络安全架构师专家](https://learn.microsoft.com/zh-cn/credentials/certifications/cybersecurity-architect-expert) | [ISC.AI 学苑 (360 数字安全集团)](https://study.360.net/frontend/home/home) | [阿里云 云安全高级工程师 ACP 认证](https://edu.aliyun.com/certification/acp04)

## 工作流程

<img src="Images/Workflow.png" width = "100%" />

**一、工作流程概述**

1. 发现 / 获得疑似恶意软件样本
2. 使用 Microsoft Defender (最新[安全智能](https://learn.microsoft.com/zh-cn/defender-endpoint/microsoft-defender-antivirus-updates)) 测试能否查杀
3. 如果不能，按工作流程开展前期研究
4. 请求 Microsoft 等公司研究员人工分析样本
5. 如果判断为恶意软件，则向全球信息安全社区、杀毒软件厂商、威胁情报提供商共享信息
6. (可选) 向国家有关部门提供线索
7. (可选) 针对仿冒正规软件投放病毒事件，向受害企业方共享线索
8. 将样本数据填写至下方表格

**二、满足以下条件时，样本数据不会填写至表格**

1. Microsoft Defender 可以查杀样本，无需人工分析
2. 经前期分析，可 100% 确认是正常文件
3. Microsoft 研究员判断样本干净 (Clean)
4. 样本首次发现日期距今已超过 30 天
5. 由其他从业人员 / 志愿者发现、分析、上报，本中心全程未参与

## 数据

&emsp;&emsp;上次更新时间：2026 年 1 月 7 日 22:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 1 月 7 日，已打击计算机病毒 / 恶意软件 157 个、恶意网站 28 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期   |           文件名           |          检测          |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :------: | :------------------------: | :--------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/1/4 |     AweSun_yuan···.exe     | **Win32/Malgent!MSR**  | 8521cb16a844b81d87e591288b186da46f585a9c7756c3aac6eb8940e67ca09d |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/8521cb16a844b81d87e591288b186da46f585a9c7756c3aac6eb8940e67ca09d) (27) |                              无                              | 0129 |
| 2026/1/4 |     兴趣爱好旅行：.bat     | **Win32/Wacatac.F!ml** | 007da2fdf5cfdd224365517c1f9a1a73d0765624bd7a56df7585d0a614895f57 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/007da2fdf5cfdd224365517c1f9a1a73d0765624bd7a56df7585d0a614895f57) (25) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/007da2fdf5cfdd224365517c1f9a1a73d0765624bd7a56df7585d0a614895f57) | 0130 |
| 2026/1/4 |        myexetra.exe        |  **Backdoor:Farfli**   | 192ec289aef24bf1cdb74a5c4cd25b84d458e078c732b3aef9d1eda336f6e338 | f05eb2cc-5d5c-4786-b5ca-f76cc6c2bca6 | [VirusTotal](https://www.virustotal.com/gui/file/192ec289aef24bf1cdb74a5c4cd25b84d458e078c732b3aef9d1eda336f6e338) (31) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/192ec289aef24bf1cdb74a5c4cd25b84d458e078c732b3aef9d1eda336f6e338) | 0131 |
| 2026/1/4 |         Setup1.exe         | **Win32/Malgent!MSR**  | 749a094dd333916249a24c7e9540c9f7f22c8ead8a9b1bb353aeaf1b8e195fb9 | f05eb2cc-5d5c-4786-b5ca-f76cc6c2bca6 | [VirusTotal](https://www.virustotal.com/gui/file/749a094dd333916249a24c7e9540c9f7f22c8ead8a9b1bb353aeaf1b8e195fb9) (15) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/749a094dd333916249a24c7e9540c9f7f22c8ead8a9b1bb353aeaf1b8e195fb9) | 0132 |
| 2026/1/4 |        version.dll         | **Win32/Malgent!MSR**  | a67db7889b2bb834b178bd712724b0a2b636890eadaad917ce6256975cddda3c | fae8576a-245b-4292-a4d4-59a12e1573f1 | [VirusTotal](https://www.virustotal.com/gui/file/a67db7889b2bb834b178bd712724b0a2b636890eadaad917ce6256975cddda3c) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a67db7889b2bb834b178bd712724b0a2b636890eadaad917ce6256975cddda3c) | 0133 |
| 2026/1/5 |   ToDsured-star-x6.4.msi   |  **Win32/Etset!rfn**   | c84fab7e95b214dc20804c41ec32cc8f3fe5dc36e2b9d6f82ff816bc7ff8e28f | 48de4c3f-4676-4590-a58d-9cfce170acd9 | [VirusTotal](https://www.virustotal.com/gui/file/c84fab7e95b214dc20804c41ec32cc8f3fe5dc36e2b9d6f82ff816bc7ff8e28f) (11) |                              无                              | 0134 |
| 2026/1/5 | ···违纪人员内部调查···.exe | **Win32/Wacatac.F!ml** | e41a662cfe3e1395bf1a75461e08e3f5d213e46e41b2fd67a27fa69621fc5095 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/e41a662cfe3e1395bf1a75461e08e3f5d213e46e41b2fd67a27fa69621fc5095) (33) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e41a662cfe3e1395bf1a75461e08e3f5d213e46e41b2fd67a27fa69621fc5095) | 0135 |
| 2026/1/5 | ···违纪人员内部调查···.exe | **Win32/Wacatac.F!ml** | eb7d0a443bfcd9c112285d307c119dd73ee8ac0a0f5b72aff21e4b3f281e4500 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/eb7d0a443bfcd9c112285d307c119dd73ee8ac0a0f5b72aff21e4b3f281e4500) (26) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/eb7d0a443bfcd9c112285d307c119dd73ee8ac0a0f5b72aff21e4b3f281e4500) | 0136 |
| 2026/1/5 |          exe.exe           | **Win32/Wacatac.F!ml** | e15dc8069c3c3d37b1113216e318117c6b9bb532e675b22421521708e5457846 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/e15dc8069c3c3d37b1113216e318117c6b9bb532e675b22421521708e5457846) (16) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e15dc8069c3c3d37b1113216e318117c6b9bb532e675b22421521708e5457846) | 0137 |
| 2026/1/5 |     01.04违法人员.exe      | **Win64/Malgent!MSR**  | 0eb4fbd10784e8412d9d8d086b1f05c28ea9f5d26cef9a9b9d12f9446d9f9304 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/0eb4fbd10784e8412d9d8d086b1f05c28ea9f5d26cef9a9b9d12f9446d9f9304) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/0eb4fbd10784e8412d9d8d086b1f05c28ea9f5d26cef9a9b9d12f9446d9f9304) | 0138 |
| 2026/1/5 |     人员名单···155.exe     | **Win64/Malgent!MSR**  | c88c2f98d3ccd66354dabfd7919a7f96b90659b1682f8810340b71d34165f461 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/c88c2f98d3ccd66354dabfd7919a7f96b90659b1682f8810340b71d34165f461) (18) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c88c2f98d3ccd66354dabfd7919a7f96b90659b1682f8810340b71d34165f461) | 0139 |
| 2026/1/5 |          2025.exe          |  **Win32/Fuery.D!cl**  | 67c6dee50d41bae5c85c4b347cf471d0ba0b9edb33de8a93abb4fa1ae0fdeba0 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/67c6dee50d41bae5c85c4b347cf471d0ba0b9edb33de8a93abb4fa1ae0fdeba0) (39) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/67c6dee50d41bae5c85c4b347cf471d0ba0b9edb33de8a93abb4fa1ae0fdeba0) | 0140 |
| 2026/1/5 |        identity.exe        | **Win64/Donut.C!MTB**  | f50b9b888107644204921d8449bc7ef4fe358cd5ccca87a7cf5944a00d00dcc8 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/f50b9b888107644204921d8449bc7ef4fe358cd5ccca87a7cf5944a00d00dcc8) (29) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f50b9b888107644204921d8449bc7ef4fe358cd5ccca87a7cf5944a00d00dcc8) | 0141 |
| 2026/1/5 |        latest-b.exe        | **Win32/Wacatac.F!ml** | 2e7230657e27ed7f47cb8a8018c7bac088bfa7ee20e168e3665385ec35734c01 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/2e7230657e27ed7f47cb8a8018c7bac088bfa7ee20e168e3665385ec35734c01) (23) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/2e7230657e27ed7f47cb8a8018c7bac088bfa7ee20e168e3665385ec35734c01) | 0142 |
| 2026/1/5 |         build-.exe         | **Win32/Wacatac.F!ml** | 41b946332366eee08614c375b0fba08330f51ce17ef710735bc59183529e3dbc |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/41b946332366eee08614c375b0fba08330f51ce17ef710735bc59183529e3dbc) (18) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/41b946332366eee08614c375b0fba08330f51ce17ef710735bc59183529e3dbc) | 0143 |
| 2026/1/6 |  Aegis Virus Scanner.exe   | **Win32/Malgent!MSR**  | 1d4edfe3e4c16ccbc39bc1164ddf95b80f3a8954db5acdcc14c8483a40c1682a | f4699fe1-acf3-4b3f-9760-1c275c173c1a | [VirusTotal](https://www.virustotal.com/gui/file/1d4edfe3e4c16ccbc39bc1164ddf95b80f3a8954db5acdcc14c8483a40c1682a) (18) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1d4edfe3e4c16ccbc39bc1164ddf95b80f3a8954db5acdcc14c8483a40c1682a) | 0144 |
| 2026/1/6 |     ChromeSetup···.msi     | **Win32/Malgent!MSR**  | a826133b16e78530d1b391fe51c4097e135e83838e6b39a58e1eabb98e883e65 | 768d9362-188e-4773-b3ce-525235ccd83b | [VirusTotal](https://www.virustotal.com/gui/file/a826133b16e78530d1b391fe51c4097e135e83838e6b39a58e1eabb98e883e65) (14) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a826133b16e78530d1b391fe51c4097e135e83838e6b39a58e1eabb98e883e65) | 0145 |
| 2026/1/6 |      shurufa15.12.msi      | **Win32/Malgent!MSR**  | 385b029c126aed550f992cf2499641983e7afd9dcc1753d3ee60bcb8652852e4 | b8d4f116-acde-4ec2-97b2-bc85ec16051c | [VirusTotal](https://www.virustotal.com/gui/file/385b029c126aed550f992cf2499641983e7afd9dcc1753d3ee60bcb8652852e4) (12) |                              无                              | 0146 |
| 2026/1/6 |     i4Tools8···x64.msi     | **Win64/Malgent!MSR**  | 509ef6e01a71ea9930c10d2ece04de0f1ea1fb907e2c84e1c63bf66358a22afb | 711641d5-4c4e-448f-9f14-e6f5136de52a | [VirusTotal](https://www.virustotal.com/gui/file/509ef6e01a71ea9930c10d2ece04de0f1ea1fb907e2c84e1c63bf66358a22afb) (5) |                              无                              | 0147 |
| 2026/1/6 |    i4Tooools_v9548.exe     | **Win64/Malgent!MSR**  | a2bd15aec68a7d9eefae7dfe70aa89e488a41013d3b57d4c8f9fd1ade462171b | 1660fdc7-3a50-4b46-b5b5-c5263255a3f0 | [VirusTotal](https://www.virustotal.com/gui/file/a2bd15aec68a7d9eefae7dfe70aa89e488a41013d3b57d4c8f9fd1ade462171b) (18) |                              无                              | 0148 |
| 2026/1/6 |    aisiloemzushuI4.exe     | **Win32/Malgent!MSR**  | 463e92b60344fb7161a4b271ca305d2a0be46d6c2e7c77cc22092085f2ef0b19 | 73f003f4-21ee-45a8-9ee2-860d815478f3 | [VirusTotal](https://www.virustotal.com/gui/file/463e92b60344fb7161a4b271ca305d2a0be46d6c2e7c77cc22092085f2ef0b19) (14) |                              无                              | 0149 |
| 2026/1/6 |     whtfhtyhg (1).exe      | **Win32/Wacatac.H!ml** | 085223042ef70a4c8fa6893a94de9b360524ba664e5f5e40193ce5c1746c513c | 3d51f469-619c-497c-83fd-e4eea6e0f00c | [VirusTotal](https://www.virustotal.com/gui/file/085223042ef70a4c8fa6893a94de9b360524ba664e5f5e40193ce5c1746c513c) (14) |                              无                              | 0150 |
| 2026/1/6 |   Youdao···64.5.8.2.exe    | **Win32/Wacatac.C!ml** | 2049a2b34fdd6ce7c21a87b8781afdb85cc7f1d11d5f0313c460db4779b8d3a8 | 8e4159d6-da97-43bf-883f-6601f9e11bcf | [VirusTotal](https://www.virustotal.com/gui/file/2049a2b34fdd6ce7c21a87b8781afdb85cc7f1d11d5f0313c460db4779b8d3a8) (9) |                              无                              | 0151 |
| 2026/1/6 |   Youlets-stup1.7.79.exe   |  **Win32/Etset!rfn**   | 1a44fc3aadb01acc9ed3d258806e9c2a6a6e87db791526fed1d9b3a2769826ca | 736490ee-880f-4de1-a8a7-12314690a899 | [VirusTotal](https://www.virustotal.com/gui/file/1a44fc3aadb01acc9ed3d258806e9c2a6a6e87db791526fed1d9b3a2769826ca) (18) |                              无                              | 0152 |
| 2026/1/7 |  ···silverfox_scanner.exe  | **Win32/Malgent!MSR**  | 7d4b5dee59d7ae364e5ce6d74917e1eff94cd000fcf62c6f22c8cc494f98db9a | 57dc4655-f432-4d94-a49d-642a70982e94 | [VirusTotal](https://www.virustotal.com/gui/file/7d4b5dee59d7ae364e5ce6d74917e1eff94cd000fcf62c6f22c8cc494f98db9a) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/7d4b5dee59d7ae364e5ce6d74917e1eff94cd000fcf62c6f22c8cc494f98db9a) | 0153 |
| 2026/1/7 |      哈希校验工具.exe      | **Win32/Wacatac.H!ml** | f3cfe05a29666720119fd284a27a4fcc691a0998cc53e6d62482f8f65daa43ba |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/f3cfe05a29666720119fd284a27a4fcc691a0998cc53e6d62482f8f65daa43ba) (31) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f3cfe05a29666720119fd284a27a4fcc691a0998cc53e6d62482f8f65daa43ba) | 0154 |
| 2026/1/7 |      wgdfhfgb (2).exe      | **Win32/Wacatac.F!ml** | f2d87ac51b145325a3a8a2fada440a929d91baf06563f84d0829bbcf04c2ba78 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/f2d87ac51b145325a3a8a2fada440a929d91baf06563f84d0829bbcf04c2ba78) (17) |                              无                              | 0155 |
| 2026/1/7 |     Chrome···9507.msi      | **Win32/Malgent!MSR**  | b47718d7a120beccf564de9b8f97920bccc3b8253cf30cc87fe0496d0a18d8fc | fa79a4c2-eade-473a-bbad-beb07e5ea20f | [VirusTotal](https://www.virustotal.com/gui/file/b47718d7a120beccf564de9b8f97920bccc3b8253cf30cc87fe0496d0a18d8fc) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b47718d7a120beccf564de9b8f97920bccc3b8253cf30cc87fe0496d0a18d8fc) | 0156 |
| 2026/1/7 |      GuBliulanqi.msi       |   **Win32/Vigorf.A**   | 584c660abedc2f2276207d4e64c9345296a33c562a4056d7b5d2bdc94b067e42 | eea876c3-9af2-46e6-bd78-3d614fae1359 | [VirusTotal](https://www.virustotal.com/gui/file/584c660abedc2f2276207d4e64c9345296a33c562a4056d7b5d2bdc94b067e42) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/584c660abedc2f2276207d4e64c9345296a33c562a4056d7b5d2bdc94b067e42) | 0157 |
|  ——————  |        ————————————        |      ————————————      |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---
【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期   |                 URL                 |            类别             |                           有效载荷                           |                         URLhaus                          | 编号 |
| :------: | :---------------------------------: | :-------------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/1/5 |    hxxps://kuanicalawdjif[.]cyou    |     仿冒火绒、传播病毒      | hxxps://pub-df13d803030c4cab8b69722fbd66d7cd[.]r2[.]dev/din-Hr20254861[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3749994) | 0001 |
| 2026/1/5 |         hxxps://orayy[.]com         |    仿冒向日葵、传播病毒     | hxxps://officelilne[.]oss-cn-hongkong[.]aliyuncs[.]com/AweSun_yuancheng_x64[.]1[.]2[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3750000) | 0002 |
| 2026/1/6 |         hxxps://wps-wp[.]cn         |     仿冒 WPS、传播病毒      |                              无                              |                            无                            | 0003 |
| 2026/1/6 |  hxxps://web-wpsoffice[.]com[.]cn   |     仿冒 WPS、传播病毒      | hxxps://wpsdowloadsitem[.]oss-cn-hongkong[.]aliyuncs[.]com/WPS_Setup_251211[.]zip |                            无                            | 0004 |
| 2026/1/6 |     hxxps://www[.]on-wps[.]com      |     仿冒 WPS、传播病毒      | hxxps://qweasd88668[.]oss-ap-southeast-1[.]aliyuncs[.]com/ZooInstalle_v1.3[.]zip |                            无                            | 0005 |
| 2026/1/6 |  hxxps://zh-wps-office[.]com[.]cn   |     仿冒 WPS、传播病毒      |    hxxps://zh-wps-office[.]com[.]cn/WPS_Setup_22529[.]exe    |                            无                            | 0006 |
| 2026/1/6 |    hxxps://web-cn-wps[.]com[.]cn    |     仿冒 WPS、传播病毒      | hxxps://wpsdowloadsitem[.]oss-cn-hongkong[.]aliyuncs[.]com/WPS_Setup_251211[.]zip |                            无                            | 0007 |
| 2026/1/6 |      hxxps://platform-wps[.]cn      |     仿冒 WPS、传播病毒      |                              无                              |                            无                            | 0008 |
| 2026/1/6 |  hxxps://www[.]wpssoft[.]com[.]cn   |     仿冒 WPS、传播病毒      |      hxxps://dows[.]v3-quickq[.]com/WPS_Setup_X64[.]zip      |                            无                            | 0009 |
| 2026/1/6 |         hxxps://wp-wps[.]cn         |     仿冒 WPS、传播病毒      |      hxxps://wp-wps[.]cn/cdn_download/wps/wps_wid[.]exe      |                            无                            | 0010 |
| 2026/1/6 |      hxxps://wps-wp[.]com[.]cn      |     仿冒 WPS、传播病毒      |       hxxps://hjekd8c[.]hoyenoy[.]com/WPS_office[.]zip       |                            无                            | 0011 |
| 2026/1/6 |    hxxps://input-sogo[.]com[.]cn    |  仿冒搜狗输入法、传播病毒   |     hxxps://jkemdr[.]hoyenoy[.]com/shurufa15[.]12[.]zip      |                            无                            | 0012 |
| 2026/1/6 |        hxxps://zh-i4.com.cn         |   仿冒爱思助手、传播病毒    |                              无                              |                            无                            | 0013 |
| 2026/1/6 |    hxxps://www[.]asizhusou[.]com    |   仿冒爱思助手、传播病毒    | hxxps://dows[.]v3-quickq[.]com/i4Tools8_v8[.]38_Setup_x64[.]zip |                            无                            | 0014 |
| 2026/1/6 |        hxxps://isi-cn[.]com         |   仿冒爱思助手、传播病毒    | hxxps://adfsdfsfdfds[.]oss-cn-hongkong[.]aliyuncs.com/i4Tooools_v9548[.]zip |                            无                            | 0015 |
| 2026/1/6 |         hxxps://zh-i4[.]com         |   仿冒爱思助手、传播病毒    |                              无                              |                            无                            | 0016 |
| 2026/1/6 | hxxps://www[.]as-zhushou[.]com[.]cn |   仿冒爱思助手、传播病毒    | hxxps://dows[.]v3-quickq[.]com/i4Tools8_v8[.]38_Setup_x64[.]zip |                            无                            | 0017 |
| 2026/1/6 |  hxxps://www[.]cc-aisi[.]com[.]cn   |   仿冒爱思助手、传播病毒    |   hxxps://anzhuang-cn[.]top/busha/i4/aisiloemzushuI4[.]zip   |                            无                            | 0018 |
| 2026/1/6 |       hxxps://i4zhushou[.]cn        |   仿冒爱思助手、传播病毒    |                              无                              |                            无                            | 0019 |
| 2026/1/6 |      hxxps://i4zhus[.]com[.]cn      |   仿冒爱思助手、传播病毒    | hxxps://i4zhus[.]com[.]cn/i4Tools_v9[.]02[.]035_Setup_x64[.]exe |                            无                            | 0020 |
| 2026/1/6 |  hxxps://i4aisizhushou[.]com[.]cn   |   仿冒爱思助手、传播病毒    | hxxps://ioansos-1373170392[.]cos[.]ap-guangzhou[.]myqcloud[.]com/v9[.]06[.]018_Setup[.]zip |                            无                            | 0021 |
| 2026/1/6 |     hxxps://www[.]360ccm[.]com      | 仿冒 360 安全卫士、传播病毒 | hxxps://pub-8bf10830d4fa42d3a538fa7b302d55b3[.]r2[.]dev/whtfhtyhg%20(1)[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3751295) | 0022 |
| 2026/1/6 |     hxxps://xiazaiabcd7[.]cyou      | 仿冒 360 安全卫士、传播病毒 | hxxps://pub-8bf10830d4fa42d3a538fa7b302d55b3[.]r2[.]dev/whtfhtyhg%20(1)[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3751295) | 0023 |
| 2026/1/6 |    hxxps://webyoudao[.]com[.]cn     |   仿冒有道翻译、传播病毒    |                              无                              |                            无                            | 0024 |
| 2026/1/6 |    hxxps://cn-youdao[.]com[.]cn     |   仿冒有道翻译、传播病毒    | hxxps://youdao-cn[.]oss-cn-hongkong[.]aliyuncs[.]com/Youlets-stup1[.]7[.]79[.]zip |                            无                            | 0025 |
| 2026/1/6 |   hxxps://apps-youdao[.]com[.]cn    |   仿冒有道翻译、传播病毒    | hxxps://hk-vip-oss-20251231[.]oss-cn-hongkong[.]aliyuncs[.]com/0106/YoudaoDict__X64[.]5[.]8[.]2[.]exe |                            无                            | 0026 |
| 2026/1/6 |   hxxps://fanyi-youdao[.]com[.]cn   |   仿冒有道翻译、传播病毒    | hxxps://hk-vip-oss-20251231[.]oss-cn-hongkong[.]aliyuncs[.]com/0106/YoudaoDict__X64[.]5[.]8[.]2[.]exe |                            无                            | 0027 |
| 2026/1/6 |    hxxps://www[.]cp-youdao[.]com    |   仿冒有道翻译、传播病毒    |                              无                              |                            无                            | 0028 |
|  ——————  |        ————————————————————         |       ———————————————       |                ——————————————————————————————                |                        ——————————                        | ———  |

> [!NOTE]
>
> &emsp;只显示最近 30 条数据，更早数据详见 LGSRC/[Archive_2.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_2.md) (恶意网站归档)。

## 如何提交文件进行分析？

&emsp;&emsp;**本中心不能代替 Microsoft 公司行使接收并分析疑似恶意软件样本的职责**。用户应始终通过 [**Microsoft Security Intelligence - Submit a file for malware analysis**](https://www.microsoft.com/en-us/wdsi/filesubmission) 官方平台提交文件。

&emsp;&emsp;如需联系 Ling Gao 共享信息，请发送电子邮件至 Ling@LGHUB.org。谢谢！😀

---

[回到顶部](#HEAD)

<img src="Images/CC.png" width = "3%" /> <img src="Images/BY.png" width = "3%" /> <img src="Images/SA.png" width = "3%" />

在 “[署名 - 相同方式共享 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode.zh-Hans)” (CC BY-SA 4.0) 协议之条款下提供。

2025 - 2026, [Ling Gao](https://github.com/Lingggao), 灵糕中心 · 安全响应分中心, [github.com/Lingggao/LGSRC](https://github.com/Lingggao/LGSRC)

[字体许可使用授权书](https://github.com/Lingggao/LGSRC/blob/main/Images/%E5%AD%97%E4%BD%93%E8%AE%B8%E5%8F%AF%E4%BD%BF%E7%94%A8%E6%8E%88%E6%9D%83%E4%B9%A6.png?raw=true) | [Windows Insider 最有价值专家](https://github.com/Lingggao/LGSRC/blob/main/Images/Windows%20Insider%20MVP.png?raw=true)