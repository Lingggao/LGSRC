<SPAN ID = 'HEAD'/>

<div align="center">
<img src="Images/Microsoft MCI.png" width = "12%" /><img src="Images/LING_2.png" width = "25%" /> <img src="Images/WCC2024_2.png" width = "12%" />
</div>

<h1 align="center">灵糕中心 · 安全响应分中心</h1>

<h3 align="center">(LGHUB · Security Response Center)</h3>

[github.com/Lingggao/LGSRC](https://github.com/Lingggao/LGSRC) (GitHub) & [lingggao.github.io/LGSRC](https://lingggao.github.io/LGSRC) (Pages)

&emsp;&emsp;**用于打击计算机病毒与恶意软件的 “[灵糕中心](https://github.com/Lingggao/LGHUB) · 安全响应分中心”**。由 2026 Microsoft Security Advisor (微软安全顾问) · [**Ling Gao**](https://github.com/Lingggao) 先生领导。灵糕中心 · 安全响应分中心成立于 2025 年 12 月 20 日。

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

&emsp;&emsp;上次更新时间：2026 年 1 月 29 日 19:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 1 月 29 日，已打击计算机病毒 / 恶意软件 305 个、恶意网站 89 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |          文件名          |          检测           |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :----------------------: | :---------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/1/26 |      0820_25443.exe      | **Win32/AutoRun!atmn**  | 4d5dff68622d9b547579e634463bfb1e3152a6ac791b5ae54c22e984151fb3ca | 422621fd-9d58-40ca-a01a-8cf24870f59f | [VirusTotal](https://www.virustotal.com/gui/file/4d5dff68622d9b547579e634463bfb1e3152a6ac791b5ae54c22e984151fb3ca) (58) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/4d5dff68622d9b547579e634463bfb1e3152a6ac791b5ae54c22e984151fb3ca) | A280 |
| 2026/1/26 |   GG_DesktopSetup.exe    |  **Win32/Malgent!MSR**  | 5a99c0158935379354450641591d671c80d131c946eb73ac49321d48816cf8e6 | 0efacd6d-acc3-4711-ba09-0a3c3e92ad11 | [VirusTotal](https://www.virustotal.com/gui/file/5a99c0158935379354450641591d671c80d131c946eb73ac49321d48816cf8e6) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5a99c0158935379354450641591d671c80d131c946eb73ac49321d48816cf8e6) | A281 |
| 2026/1/26 |          1.exe           |  **Win64/Malgent!MSR**  | f644970c311a0764fcd91c67841db39b7a49e8c2a718c535677d9a6740c94b11 | b52543e0-5091-4d1b-893f-21aaea4fe2bd | [VirusTotal](https://www.virustotal.com/gui/file/f644970c311a0764fcd91c67841db39b7a49e8c2a718c535677d9a6740c94b11) (14) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f644970c311a0764fcd91c67841db39b7a49e8c2a718c535677d9a6740c94b11) | A282 |
| 2026/1/26 |          2.exe           |  **Win64/Malgent!MSR**  | a7509fd1e80e98bd45c58def8e8613e1c5565112c4edfcbedbe7a8c66a2885e9 | b52543e0-5091-4d1b-893f-21aaea4fe2bd | [VirusTotal](https://www.virustotal.com/gui/file/a7509fd1e80e98bd45c58def8e8613e1c5565112c4edfcbedbe7a8c66a2885e9) (36) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a7509fd1e80e98bd45c58def8e8613e1c5565112c4edfcbedbe7a8c66a2885e9) | A283 |
| 2026/1/26 |          3.exe           |  **Win32/Egairtigado**  | da63f8707cd02ecaa06dfed830753d5c96e116df2c4d210dcb8078d9b98b8b14 | b52543e0-5091-4d1b-893f-21aaea4fe2bd | [VirusTotal](https://www.virustotal.com/gui/file/da63f8707cd02ecaa06dfed830753d5c96e116df2c4d210dcb8078d9b98b8b14) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/da63f8707cd02ecaa06dfed830753d5c96e116df2c4d210dcb8078d9b98b8b14) | A284 |
| 2026/1/26 |         nvml.dll         |  **Convagent.ARR!MTB**  | cc65b1a34ae54b9931783769522a11f5270a23e3223fe8b8008ceacde4bd3693 | 8bdf91b6-9863-4729-932f-83a888a9bdd1 | [VirusTotal](https://www.virustotal.com/gui/file/cc65b1a34ae54b9931783769522a11f5270a23e3223fe8b8008ceacde4bd3693) (36) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/cc65b1a34ae54b9931783769522a11f5270a23e3223fe8b8008ceacde4bd3693) | A285 |
| 2026/1/26 |        Chrome.exe        |  **Win32/Malgent!MSR**  | 067eea08254905f05f4adc1a4a1201a0401e691cc14a17751209ff5bfcae92b0 | 7f279fa8-b167-4bae-8240-6b830ca1b312 | [VirusTotal](https://www.virustotal.com/gui/file/067eea08254905f05f4adc1a4a1201a0401e691cc14a17751209ff5bfcae92b0) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/067eea08254905f05f4adc1a4a1201a0401e691cc14a17751209ff5bfcae92b0) | A286 |
| 2026/1/27 |       f61752d0.exe       |  **Win32/Malgent!MSR**  | f61752d079c9738bb3df4c0126cd54633342636969ac355ce81db57ea4aec876 | 71c269f8-693a-44b8-8c55-6880b2203c31 | [VirusTotal](https://www.virustotal.com/gui/file/f61752d079c9738bb3df4c0126cd54633342636969ac355ce81db57ea4aec876) (8) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f61752d079c9738bb3df4c0126cd54633342636969ac355ce81db57ea4aec876) | A287 |
| 2026/1/27 |           init           | **Linux/CoinMiner!MSR** | 8ae786bad6b2a17a392520ad1d0a1fcdafa899802c866c38f9228f3205b80de9 | f9611a4f-5667-4c48-bcc0-552c3786e615 | [VirusTotal](https://www.virustotal.com/gui/file/8ae786bad6b2a17a392520ad1d0a1fcdafa899802c866c38f9228f3205b80de9) (8) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/8ae786bad6b2a17a392520ad1d0a1fcdafa899802c866c38f9228f3205b80de9) | A288 |
| 2026/1/27 |          mysql           | **Linux/CoinMiner.C12** | c5e5e41f88f91e4e2ad524fae156bb74efe86e97ce84701b3e7f3a252fdb82ab | f9611a4f-5667-4c48-bcc0-552c3786e615 | [VirusTotal](https://www.virustotal.com/gui/file/c5e5e41f88f91e4e2ad524fae156bb74efe86e97ce84701b3e7f3a252fdb82ab) (35) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c5e5e41f88f91e4e2ad524fae156bb74efe86e97ce84701b3e7f3a252fdb82ab) | A289 |
| 2026/1/27 |    绑定谷歌浏览器.exe    |  **Win32/Malgent!MSR**  | b02ddf5a7b67e793d054f47fb6d88a527f987ff532fc612d7ec62f169d02eef2 | d033dc05-8180-415e-a0cd-33822e8eac8a | [VirusTotal](https://www.virustotal.com/gui/file/b02ddf5a7b67e793d054f47fb6d88a527f987ff532fc612d7ec62f169d02eef2) (10) |                              无                              | A290 |
| 2026/1/27 |          1.exe           |  **GhostRat.CKD!MTB**   | 84aa32d0c5eb678f62ba0c24d6f39ed9b61acf261a89ddaa1fb3d9ca392b1231 | f6a380e5-e9d5-43a9-b53c-4093cc73b874 | [VirusTotal](https://www.virustotal.com/gui/file/84aa32d0c5eb678f62ba0c24d6f39ed9b61acf261a89ddaa1fb3d9ca392b1231) (60) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/84aa32d0c5eb678f62ba0c24d6f39ed9b61acf261a89ddaa1fb3d9ca392b1231) | A291 |
| 2026/1/27 |       HRSword.exe        |  **Win32/Malgent!MSR**  | 65fbe7f58f0ebd08771be05db480cc107d35a764880d4480fe97a551f527d3f2 | 405a1fe2-4a49-489e-a11a-acc78c6aaa06 | [VirusTotal](https://www.virustotal.com/gui/file/65fbe7f58f0ebd08771be05db480cc107d35a764880d4480fe97a551f527d3f2) (39) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/65fbe7f58f0ebd08771be05db480cc107d35a764880d4480fe97a551f527d3f2) | A292 |
| 2026/1/28 |        555555.exe        |  **Win32/Malgent!MSR**  | eaa6d596464acc10b8e9cd5ead58622d9a0a77499e3acab7de007afe763de296 | 36c637d7-7fd5-43a4-a2e5-eeea0f6c0359 | [VirusTotal](https://www.virustotal.com/gui/file/eaa6d596464acc10b8e9cd5ead58622d9a0a77499e3acab7de007afe763de296) (17) |                              无                              | A293 |
| 2026/1/28 |          1.hta           |   **JS/Malgent!MSR**    | f6d2b11f93752076548705305a83bdc2766454ba7fb55a5457562c76cc1103b2 | b44412f1-40a2-4261-801a-5d93940218f2 | [VirusTotal](https://www.virustotal.com/gui/file/f6d2b11f93752076548705305a83bdc2766454ba7fb55a5457562c76cc1103b2) (4) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f6d2b11f93752076548705305a83bdc2766454ba7fb55a5457562c76cc1103b2) | A294 |
| 2026/1/28 |          2.exe           |  **Win32/Malgent!MSR**  | 63854ecb06e7ce9f7525e275481b38ed2456d63e975a05fee233be59b4c62191 | 9c148bb1-358a-4c06-a3ae-7df35b1972a0 | [VirusTotal](https://www.virustotal.com/gui/file/63854ecb06e7ce9f7525e275481b38ed2456d63e975a05fee233be59b4c62191) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/63854ecb06e7ce9f7525e275481b38ed2456d63e975a05fee233be59b4c62191) | A295 |
| 2026/1/28 | image_2026-01-23···.exe  |  **Win64/Malgent!MSR**  | 3bd237be22b35f2e662c6c2add6aaf3f5847a07a1030d64776b9239cc5073fdf | 105f4e1a-b746-49ee-a379-e009fb803c83 | [VirusTotal](https://www.virustotal.com/gui/file/3bd237be22b35f2e662c6c2add6aaf3f5847a07a1030d64776b9239cc5073fdf) (6) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/3bd237be22b35f2e662c6c2add6aaf3f5847a07a1030d64776b9239cc5073fdf) | A296 |
| 2026/1/28 |     Sqveiqrg···.exe      |  **Win32/Malgent!MSR**  | bfdfce4bc5804ea9226cb7e30d8ede532a908f83cdb43d2c677e284d704d5d8b | 6d748887-2a1f-4dfb-8063-d69fc13b37de | [VirusTotal](https://www.virustotal.com/gui/file/bfdfce4bc5804ea9226cb7e30d8ede532a908f83cdb43d2c677e284d704d5d8b) (3) |                              无                              | A297 |
| 2026/1/28 |     win32-Todesk.msi     |  **Win32/Malgent!MSR**  | bb31ee4dc3b8f54694796f481b73a2afade02756688d0f71cdae2cf30170cda1 | 244b4a07-0332-4dcd-8dc5-04e5903bb7c6 | [VirusTotal](https://www.virustotal.com/gui/file/bb31ee4dc3b8f54694796f481b73a2afade02756688d0f71cdae2cf30170cda1) (6) |                              无                              | A298 |
| 2026/1/29 |          1.exe           |   **Lockscreen!MSR**    | 7c091c1c983a7d77857d1a78222fbd13b98ea221c6f44d6c34bb63d623f0a8b5 | d3ea3169-de2a-4f12-bd22-7894dc51dcda | [VirusTotal](https://www.virustotal.com/gui/file/7c091c1c983a7d77857d1a78222fbd13b98ea221c6f44d6c34bb63d623f0a8b5) (29) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/7c091c1c983a7d77857d1a78222fbd13b98ea221c6f44d6c34bb63d623f0a8b5) | A299 |
| 2026/1/29 | GoolgeInsaller (x64).exe |  **Win32/Kepavll!rfn**  | 05a738bbfd1432db2ed33749070bf8ccf6d67ada6bb69f9ffc3d0042ef05a820 | 539d6e03-836f-4484-ad2d-1b91d2891223 | [VirusTotal](https://www.virustotal.com/gui/file/05a738bbfd1432db2ed33749070bf8ccf6d67ada6bb69f9ffc3d0042ef05a820) (13) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/05a738bbfd1432db2ed33749070bf8ccf6d67ada6bb69f9ffc3d0042ef05a820) | A300 |
| 2026/1/29 |    youdaofanyi···.exe    |  **Win32/Kepavll!rfn**  | 20f94c27c09ba1c4624d5707fb65c27343e475999e803aa15e90bce517bbeb26 | 61a0f424-d573-4236-beb5-94a0dba86eb0 | [VirusTotal](https://www.virustotal.com/gui/file/20f94c27c09ba1c4624d5707fb65c27343e475999e803aa15e90bce517bbeb26) (16) |                              无                              | A301 |
| 2026/1/29 |   破除ACE游戏保护.exe    |    **AutoRun!atmn**     | f97559f4ec80f28bd177d1a9e1d5208c5cadbf26e20cac4af374e6b1144a710c | 32e957f6-7722-429c-b82d-5bccf27c13aa | [VirusTotal](https://www.virustotal.com/gui/file/f97559f4ec80f28bd177d1a9e1d5208c5cadbf26e20cac4af374e6b1144a710c) (61) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f97559f4ec80f28bd177d1a9e1d5208c5cadbf26e20cac4af374e6b1144a710c) | A302 |
| 2026/1/29 |     Ltpro045-x64.exe     |  **Win32/Malgent!MSR**  | 14dea3b088360eb377ab3e1cdcaa6d910d3fe810c8f4bd08ee33e027fcd42ce9 | 3d6e433c-0e88-4341-aa1d-a8852120dd69 | [VirusTotal](https://www.virustotal.com/gui/file/14dea3b088360eb377ab3e1cdcaa6d910d3fe810c8f4bd08ee33e027fcd42ce9) (33) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/14dea3b088360eb377ab3e1cdcaa6d910d3fe810c8f4bd08ee33e027fcd42ce9) | A303 |
| 2026/1/29 |        coupon.exe        |  **Win64/Malgent!MSR**  | 5db586d8b61255f3819debd990d611fe93615b99e224410d39ac3f003a72601c | e2dbd825-93e2-4cf2-bf4f-11928f3a5614 | [VirusTotal](https://www.virustotal.com/gui/file/5db586d8b61255f3819debd990d611fe93615b99e224410d39ac3f003a72601c) (31) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5db586d8b61255f3819debd990d611fe93615b99e224410d39ac3f003a72601c) | A304 |
| 2026/1/29 |       gologolo.exe       |  **Win32/Malgent!MSR**  | bf648ad4ac8ee4e7a79d96030363c6cbc2f7919e3cd97a1b93288b810ca96669 | 3a20b038-0abb-471e-8bae-15c76a146ffc | [VirusTotal](https://www.virustotal.com/gui/file/bf648ad4ac8ee4e7a79d96030363c6cbc2f7919e3cd97a1b93288b810ca96669) (22) |                              无                              | A305 |
|  ——————   |       ————————————       |      ————————————       |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---

【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期    |                 URL                 |          类别          |                           有效载荷                           |                         URLhaus                          | 编号 |
| :-------: | :---------------------------------: | :--------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/1/22 |  hxxps://chroome-google[.]com[.]cn  | 仿冒 Chrome、传播病毒  |                              无                              |                            无                            | Z065 |
| 2026/1/22 |    hxxps://dd-google[.]com[.]cn     | 仿冒 Chrome、传播病毒  | hxxps://chrome[.]download-google-chrome[.]top/download/Chromeab-x64[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3761834) | Z066 |
| 2026/1/22 |    hxxps://sf-google[.]com[.]cn     | 仿冒 Chrome、传播病毒  | hxxps://googdownload[.]googcdngoogleownload[.]top/google/download/Chrome[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3761832) | Z067 |
| 2026/1/22 |    hxxps://oa-google[.]com[.]cn     | 仿冒 Chrome、传播病毒  |      hxxps://olekndx[.]hoyenoy[.]com/google12[.]3[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3761835) | Z068 |
| 2026/1/22 |     hxxps://cc-chrom[.]com[.]cn     | 仿冒 Chrome、传播病毒  |      hxxps://olekndx[.]hoyenoy[.]com/google12[.]3[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3761835) | Z069 |
| 2026/1/22 | hxxps://www[.]ro-google[.]com[.]cn  | 仿冒 Chrome、传播病毒  |                              无                              |                            无                            | Z070 |
| 2026/1/22 |    hxxps://cnzh-chrom[.]com[.]cn    | 仿冒 Chrome、传播病毒  |      hxxps://olekndx[.]hoyenoy[.]com/google12[.]3[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3761835) | Z071 |
| 2026/1/22 |    hxxps://zh-google[.]org[.]cn     | 仿冒 Chrome、传播病毒  | hxxps://fivefouronefive[.]oss-us-west-1[.]aliyuncs[.]com/win32-googl[.]zip |                            无                            | Z072 |
| 2026/1/22 |    hxxps://mj-google[.]com[.]cn     | 仿冒 Chrome、传播病毒  |      hxxps://olekndx[.]hoyenoy[.]com/google12[.]3[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3761835) | Z073 |
| 2026/1/22 |   hxxps://bing-google[.]com[.]cn    | 仿冒 Chrome、传播病毒  |                              无                              |                            无                            | Z074 |
| 2026/1/24 |      hxxps://huorong-cn[.]com       |        仿冒火绒        |                              无                              |                            无                            | Z075 |
| 2026/1/24 |     hxxps://www[.]teamsqs[.]com     |  仿冒 Teams、传播病毒  | hxxps://pub-40f0bc7019cc4cc4af33b722c6d5f182[.]r2[.]dev/tsgx12[.]3[.]rar | [URLhaus Database](https://urlhaus.abuse.ch/url/3762965) | Z076 |
| 2026/1/24 |     hxxps://www[.]gmailpc[.]com     |  仿冒 Gmail、传播病毒  | hxxps://pub-74506ace261846d4bfc80d45a1f06b40[.]r2[.]dev/GTRF19[.]3-6[.]rar | [URLhaus Database](https://urlhaus.abuse.ch/url/3762967) | Z077 |
| 2026/1/24 |     hxxps://www[.]lineopc[.]com     |  仿冒 LINE、传播病毒   | hxxps://pub-f3a5f16c0d0b45eab9e2e6a05a61d733[.]r2[.]dev/Loiu9s361[.]rar | [URLhaus Database](https://urlhaus.abuse.ch/url/3762959) | Z078 |
| 2026/1/24 |   hxxps://www[.]googleyzq1[.]com    | 仿冒 Google 身份验证器 | hxxps://pub-1ec812ea405b44f9976acd137f20fe96[.]r2[.]dev/Yghs1[.]3[.]6[.]rar | [URLhaus Database](https://urlhaus.abuse.ch/url/3762966) | Z079 |
| 2026/1/26 | hxxps://cn-app-wpsoffice[.]com[.]cn |   仿冒 WPS、传播病毒   | hxxps://www-dfsdhsr-bssbdd[.]com[.]cn/assets/download/LWPSFW-FWFInstaller_SetupX64[.]zip |                            无                            | Z080 |
| 2026/1/26 |   hxxps://www[.]cc-wps[.]com[.]cn   |   仿冒 WPS、传播病毒   | hxxps://sgnfyn[.]oss-cn-shenzhen[.]aliyuncs[.]com/wps-setup-1[.]5[.]69[.]zip |                            无                            | Z081 |
| 2026/1/26 |     hxxps://pc[.]wps-offce[.]cn     |   仿冒 WPS、传播病毒   | hxxps://wps03[.]oss-cn-hongkong[.]aliyuncs[.]com/WPS_Setup_17147_4[.]1[.]zip |                            无                            | Z082 |
| 2026/1/26 |      hxxps://of-wps[.]com[.]cn      |   仿冒 WPS、传播病毒   |     hxxps://jkem45[.]gcdndo[.]com/gou_pinyin15[.]4[.]zip     |                            无                            | Z083 |
| 2026/1/26 |      hxxps://i-wps[.]com[.]cn       |   仿冒 WPS、传播病毒   | hxxps://sgnfyn[.]oss-cn-shenzhen[.]aliyuncs[.]com/wps-setup1[.]8[.]6[.]18[.]zip |                            无                            | Z084 |
| 2026/1/28 |     hxxps://www[.]to-desk[.]cn      | 仿冒 ToDesk、传播病毒  |                              无                              |                            无                            | Z085 |
| 2026/1/28 |     hxxps://www[.]todeska[.]com     | 仿冒 ToDesk、传播病毒  | hxxps://pub-8f57965f8599440e97ac52dbcca4fc58[.]r2[.]dev/Sqveiqrgbuniasncoigenr[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3765012) | Z086 |
| 2026/1/28 |     hxxps://www[.]todeski[.]com     | 仿冒 ToDesk、传播病毒  | hxxps://pub-8f57965f8599440e97ac52dbcca4fc58[.]r2[.]dev/Sqveiqrgbuniasncoigenr[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3765012) | Z087 |
| 2026/1/28 |    hxxps://zh-todesk[.]com[.]cn     | 仿冒 ToDesk、传播病毒  |                              有                              |                            无                            | Z088 |
| 2026/1/28 |       hxxps://toamndkf[.]cyou       | 仿冒 ToDesk、传播病毒  | hxxps://pub-8f57965f8599440e97ac52dbcca4fc58[.]r2[.]dev/Sqveiqrgbuniasncoigenr[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3765012) | Z089 |
|  ——————   |        ————————————————————         |    ———————————————     |                ——————————————————————————————                |                        ——————————                        | ———  |

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