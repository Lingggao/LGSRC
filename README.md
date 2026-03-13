<SPAN ID = 'HEAD'/>

<div align="center">

| &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;坚 持 筑 牢 国 家 网 络 安 全 屏 障&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
| :----------------------------------------------------------: |

| &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;没 有 网 络 安 全 就 没 有 国 家 安 全&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
| :----------------------------------------------------------: |

| &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;网 络 安 全 为 人 民&emsp;网 络 安 全 靠 人 民&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; |
| :----------------------------------------------------------: |

| &emsp;深 化 网 络 空 间 安 全 综 合 治 理&emsp;加 快 国 家 网 络 安 全 防 御 体 系 建 设&emsp; |
| :----------------------------------------------------------: |

</div>

<div align="center">
<img src="Images/Microsoft MCI.png" width = "12%" /><img src="Images/LING_2.png" width = "25%" /> <img src="Images/WCC2024_2.png" width = "12%" />
</div>

<h1 align="center">灵糕中心 · 安全响应分中心</h1>

<h3 align="center">(LGHUB · Security Response Center)</h3>

[github.com/Lingggao/LGSRC](https://github.com/Lingggao/LGSRC) (GitHub)

&emsp;&emsp;**用于打击计算机病毒与恶意软件的 “[灵糕中心](https://github.com/Lingggao/LGHUB) · 安全响应分中心”**。由 2026 Microsoft Security Advisor (微软安全顾问) · [**Ling Gao**](https://github.com/Lingggao) 先生领导。灵糕中心 · 安全响应分中心创立于 2025 年 12 月 20 日。

> [!IMPORTANT]
>
> &emsp;灵糕中心为个人项目，管理者不是 Microsoft 公司员工，不能代表 Microsoft 公司立场、态度。

&emsp;&emsp;**宗旨**：独立管理、放眼全球、数据精确、打击迅速

---

Microsoft - [Microsoft 安全响应中心](https://msrc.microsoft.com) | [Microsoft 安全情报](https://www.microsoft.com/en-us/wdsi) | [Microsoft Defender 门户](https://security.microsoft.com) | [获取更新](https://www.microsoft.com/en-us/wdsi/defenderupdates) | [提交文件](https://www.microsoft.com/en-us/wdsi/filesubmission)

研究 - [微步云沙箱](https://s.threatbook.com) | [安天文件分析服务](https://fenxi.antiy.cn) | [安恒云沙箱](https://sandbox.dbappsecurity.com.cn) | [奇安信威胁情报中心](https://ti.qianxin.com) | [360 沙箱云](https://ata.360.net) | [天穹智能分析平台](https://sandbox.qianxin.com/sscc-tq-web) | [深信服威胁情报中心](https://ti.sangfor.com.cn/analysis-platform?lang=ZH-CN) | [国家计算机病毒协同分析平台 (国家计算机病毒应急处理中心)](http://110.41.132.165/#/entirety/upload) | [可疑文件分析云 (计算机病毒防御技术国家工程实验室)](https://cloud.vdnel.cn) | [VirusTotal](https://www.virustotal.com/gui/home/upload) | [MalwareBazaar](https://bazaar.abuse.ch) | [URLhaus](https://urlhaus.abuse.ch) | [Kaspersky OpenTIP](https://opentip.kaspersky.com) | [Hybrid Analysis](https://hybrid-analysis.com) | [ANY.RUN](https://app.any.run)

举报 - [中央网信办 违法和不良信息举报中心](https://www.12377.cn/index.html) | [网络违法犯罪信息举报网站](https://cyberpolice.mps.gov.cn/wfjb/#) | [网络不良与垃圾信息举报受理中心](https://www.12321.cn)

社区 - [卡饭论坛 病毒样本 分享&分析区](https://bbs.kafan.cn/forum-31-1.html) | [火绒安全论坛 病毒查杀问题反馈](https://bbs.huorong.cn/forum-44-1.html) | [百度贴吧 病毒吧](https://tieba.baidu.com/f?ie=utf-8&kw=%E7%97%85%E6%AF%92)

学习 - [Microsoft 认证：安全性、合规性和标识基础知识](https://learn.microsoft.com/zh-cn/credentials/certifications/security-compliance-and-identity-fundamentals) | [Microsoft 认证：安全运营分析师助理](https://learn.microsoft.com/zh-cn/credentials/certifications/security-operations-analyst) | [Microsoft 认证：网络安全架构师专家](https://learn.microsoft.com/zh-cn/credentials/certifications/cybersecurity-architect-expert) | [看雪学苑](https://www.kanxue.com) | [ISC.AI 学苑](https://study.360.net/frontend/home/home) | [阿里云 云安全高级工程师 ACP 认证](https://edu.aliyun.com/certification/acp04)

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

**二、满足以下任一条件时，样本数据不会填写至表格**

1. Microsoft Defender 可以查杀样本，无需人工分析
2. 经前期分析，可 100% 确认是正常文件
3. Microsoft 研究员判断样本干净 (Clean)
4. 样本首次发现日期距今已超过 30 天
5. 由其他从业人员 / 志愿者发现、分析、上报，本中心全程未参与

## 数据

&emsp;&emsp;上次更新时间：2026 年 3 月 14 日 5:00 (GMT+8)

&emsp;&emsp;**截至 2026 年 3 月 14 日，已打击计算机病毒 / 恶意软件 610 个、恶意网站 193 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |           文件名           |           检测           |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :------------------------: | :----------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/3/11 |  ···裁员名单及补偿···.exe  | **银狐 (SilverFox.sx)**  | 0576ce6546d7d0c2d22603d956ef49b0197e9fd0fd82409b132b6427b5128058 | e62466fe-e8d8-4c8c-94fa-3ed63dbc0789 | [VirusTotal](https://www.virustotal.com/gui/file/0576ce6546d7d0c2d22603d956ef49b0197e9fd0fd82409b132b6427b5128058) (14) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/0576ce6546d7d0c2d22603d956ef49b0197e9fd0fd82409b132b6427b5128058) | A584 |
| 2026/3/11 |   小黑屋残忍殴打···.exe    |   **银狐 (SilverFox)**   | 5981f5bb23790380033b1eb9f6030ecd81b1280d885525e58b1b49939f98dcc5 | 0be39412-d798-46f2-8191-425d9bf06ea3 | [VirusTotal](https://www.virustotal.com/gui/file/5981f5bb23790380033b1eb9f6030ecd81b1280d885525e58b1b49939f98dcc5) (24) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5981f5bb23790380033b1eb9f6030ecd81b1280d885525e58b1b49939f98dcc5) | A585 |
| 2026/3/11 |     openclawAI···.exe      |      **Cybercrime**      | 9ed5dc32d9ce2e7b49cd50141c15702bf2a21b769dd47ce32c460e41814fb055 | ec8233e5-9673-4dc9-a5f3-8b0da1fdb2d3 | [VirusTotal](https://www.virustotal.com/gui/file/9ed5dc32d9ce2e7b49cd50141c15702bf2a21b769dd47ce32c460e41814fb055) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/9ed5dc32d9ce2e7b49cd50141c15702bf2a21b769dd47ce32c460e41814fb055) | A586 |
| 2026/3/11 |  ···03.11裁员名单···.exe   | **银狐 (SilverFox.bg)**  | a85188389fe806216a778fa48b5dd1af1b41afcf735a10c8efa22784de801445 | cf7db410-bba9-4e16-a4be-eb8a541f09f9 | [VirusTotal](https://www.virustotal.com/gui/file/a85188389fe806216a778fa48b5dd1af1b41afcf735a10c8efa22784de801445) (24) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a85188389fe806216a778fa48b5dd1af1b41afcf735a10c8efa22784de801445) | A587 |
| 2026/3/11 |    2026···人员信息.exe     | **银狐 (SilverFox.bg)**  | 7c4bbb982d99092e3afa1ea99f0b5b4b24126800db166389f870a335c1ab55cd | eca2a4a3-251f-4fcc-a6c0-af5676017e1a | [VirusTotal](https://www.virustotal.com/gui/file/7c4bbb982d99092e3afa1ea99f0b5b4b24126800db166389f870a335c1ab55cd) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/7c4bbb982d99092e3afa1ea99f0b5b4b24126800db166389f870a335c1ab55cd) | A588 |
| 2026/3/11 | ···03.11···人员信息···.exe | **银狐 (SilverFox.sx)**  | 5cd729cc2f286beb8bc76e55971f6efb7e960f83536f2bee7671c30cb3bb5e96 | 6769b84c-8405-49c6-9334-c0141b0a3a37 | [VirusTotal](https://www.virustotal.com/gui/file/5cd729cc2f286beb8bc76e55971f6efb7e960f83536f2bee7671c30cb3bb5e96) (11) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5cd729cc2f286beb8bc76e55971f6efb7e960f83536f2bee7671c30cb3bb5e96) | A589 |
| 2026/3/13 |         11.13.exe          | **银狐 (SilverFox.bg)**  | 9eb046674e605fed5a99e6300c4a4e0bfc9470c4f31b2efebb57932b19e90886 | 59af0935-374b-4052-a563-7b9f03eae1d8 | [VirusTotal](https://www.virustotal.com/gui/file/9eb046674e605fed5a99e6300c4a4e0bfc9470c4f31b2efebb57932b19e90886) (36) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/9eb046674e605fed5a99e6300c4a4e0bfc9470c4f31b2efebb57932b19e90886) | A590 |
| 2026/3/13 |     164ipnew-安装.exe      |   **银狐 (SilverFox)**   | 15ffbf387a631a8fae5857cfbfef90d02db9fe86f7052f16f1c0e99ed9c01bf1 | eda706f4-45d7-4722-b446-225011dadafc | [VirusTotal](https://www.virustotal.com/gui/file/15ffbf387a631a8fae5857cfbfef90d02db9fe86f7052f16f1c0e99ed9c01bf1) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/15ffbf387a631a8fae5857cfbfef90d02db9fe86f7052f16f1c0e99ed9c01bf1) | A591 |
| 2026/3/13 |   ···人 员 信 息 F @.exe   | **银狐 (SilverFox.sx)**  | d58d74c038f96715064d9f28ebb8a2e89c715e11fad04e3011fa76d693fdd296 | 09703d48-d235-4709-a01a-409c621265ca | [VirusTotal](https://www.virustotal.com/gui/file/d58d74c038f96715064d9f28ebb8a2e89c715e11fad04e3011fa76d693fdd296) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d58d74c038f96715064d9f28ebb8a2e89c715e11fad04e3011fa76d693fdd296) | A592 |
| 2026/3/13 |     ···JunkCleaner.exe     | **银狐 (SilverFox.sb)**  | f521193428b6917f6f5ac1744e1c484b1cddc8d4772ad0d6cb91233ac75d0980 | 8d682d06-f3a3-4d2f-895e-29b4f59740ef | [VirusTotal](https://www.virustotal.com/gui/file/f521193428b6917f6f5ac1744e1c484b1cddc8d4772ad0d6cb91233ac75d0980) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f521193428b6917f6f5ac1744e1c484b1cddc8d4772ad0d6cb91233ac75d0980) | A593 |
| 2026/3/13 |      Clash.Verge_.exe      |   **银狐 (SilverFox)**   | 0f264228c9dbcf618826ca3ed5c66097f65b79e7c7e87702648828e72fd655c3 | 52b9a9b1-420a-4cf5-84cc-ee9cf716d307 | [VirusTotal](https://www.virustotal.com/gui/file/0f264228c9dbcf618826ca3ed5c66097f65b79e7c7e87702648828e72fd655c3) (25) |                              无                              | A594 |
| 2026/3/13 |     openclawAI···.exe      |   **银狐 (SilverFox)**   | b0c955322c34a907f94ebe451d696f8b2a87d2638516791387c1e931324a3177 | d7c7acbf-a175-4fcb-8ac7-844b79aa2cb8 | [VirusTotal](https://www.virustotal.com/gui/file/b0c955322c34a907f94ebe451d696f8b2a87d2638516791387c1e931324a3177) (4) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b0c955322c34a907f94ebe451d696f8b2a87d2638516791387c1e931324a3177) | A595 |
| 2026/3/13 |         setup.exe          |  **Win32/Malgent!MSR**   | cf4cd720b311a42ee34ee8a33de6b2b26dc29598657e599b5b8d30b19eec3cc0 | d0eac2ba-f8e6-4970-9fac-0de27d45065f | [VirusTotal](https://www.virustotal.com/gui/file/cf4cd720b311a42ee34ee8a33de6b2b26dc29598657e599b5b8d30b19eec3cc0) (1) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/cf4cd720b311a42ee34ee8a33de6b2b26dc29598657e599b5b8d30b19eec3cc0) | A596 |
| 2026/3/13 |          2026.exe          | **银狐 (SilverFox.bg)**  | 4ef898d0d5611c920bd3d8922e4298c35363734d933c3280bfef30a7ee1407fa | d13e2973-9ad0-43eb-a435-d6685ad3e4dc | [VirusTotal](https://www.virustotal.com/gui/file/4ef898d0d5611c920bd3d8922e4298c35363734d933c3280bfef30a7ee1407fa) (24) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/4ef898d0d5611c920bd3d8922e4298c35363734d933c3280bfef30a7ee1407fa) | A597 |
| 2026/3/13 |    【人事異動···】.exe     |   **银狐 (SilverFox)**   | 4bbb0a2ffafe6043860e41c12ba1c0e1dd9f1486cc6f1487d7053043233f8a72 | 1e040bee-8a70-480c-8615-808e3a8fefeb | [VirusTotal](https://www.virustotal.com/gui/file/4bbb0a2ffafe6043860e41c12ba1c0e1dd9f1486cc6f1487d7053043233f8a72) (31) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/4bbb0a2ffafe6043860e41c12ba1c0e1dd9f1486cc6f1487d7053043233f8a72) | A598 |
| 2026/3/13 |     openclawAI···.exe      |   **银狐 (SilverFox)**   | 98a34bd5670ce59926d308cb1dd7d183fe23bfcf5266df023fca4963374624e9 | 80a80345-e5c1-4191-98bc-16d6e243dced | [VirusTotal](https://www.virustotal.com/gui/file/98a34bd5670ce59926d308cb1dd7d183fe23bfcf5266df023fca4963374624e9) (6) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/98a34bd5670ce59926d308cb1dd7d183fe23bfcf5266df023fca4963374624e9) | A599 |
| 2026/3/13 |    ···03.13人员名单.exe    | **银狐 (SilverFox.sx)**  | 1d0351d580e3c10a3178b614d70d1867cb003ff8da0a25fbeb1e8a75e0aad68a | 48fea922-e0e9-43c0-b1e4-d7b9d6e14af3 | [VirusTotal](https://www.virustotal.com/gui/file/1d0351d580e3c10a3178b614d70d1867cb003ff8da0a25fbeb1e8a75e0aad68a) (15) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1d0351d580e3c10a3178b614d70d1867cb003ff8da0a25fbeb1e8a75e0aad68a) | A600 |
| 2026/3/13 |     Chrome0155-x64.exe     |   **银狐 (SilverFox)**   | 7f6357d56682e097160491de0b58cc5ae32b3e549bcb979551c60dad843b7ca9 | 1470b4bd-c54d-41e5-8d66-5bf3efa64940 | [VirusTotal](https://www.virustotal.com/gui/file/7f6357d56682e097160491de0b58cc5ae32b3e549bcb979551c60dad843b7ca9) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/7f6357d56682e097160491de0b58cc5ae32b3e549bcb979551c60dad843b7ca9) | A601 |
| 2026/3/13 |   电汇···银行方面···.exe   |   **银狐 (SilverFox)**   | 2405e493badb72b08eafafedd7a47255a3fa119df71a11a7a907cfd217841404 | 19cde1f2-6d66-4eac-b617-1532c1275480 | [VirusTotal](https://www.virustotal.com/gui/file/2405e493badb72b08eafafedd7a47255a3fa119df71a11a7a907cfd217841404) (14) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/2405e493badb72b08eafafedd7a47255a3fa119df71a11a7a907cfd217841404) | A602 |
| 2026/3/13 |  黑园区···身份信息···.exe  | **银狐 (SilverFox.wos)** | 43b3eb69729a82c9babd44da03348659ba8c8f55afd6e8cb23ccae78eb09c890 | 86c7b4f8-15e7-404e-80f8-b84aec570de0 | [VirusTotal](https://www.virustotal.com/gui/file/43b3eb69729a82c9babd44da03348659ba8c8f55afd6e8cb23ccae78eb09c890) (13) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/43b3eb69729a82c9babd44da03348659ba8c8f55afd6e8cb23ccae78eb09c890) | A603 |
| 2026/3/14 |     Goge···GGSETUP.exe     |   **银狐 (SilverFox)**   | 76ae74bd4defb26ce9347111371516a02e2c0d559e41d6add65c6076a8bdc349 | d8d05e6f-5c5c-4d8d-9882-93effa8d3580 | [VirusTotal](https://www.virustotal.com/gui/file/76ae74bd4defb26ce9347111371516a02e2c0d559e41d6add65c6076a8bdc349) (15) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/76ae74bd4defb26ce9347111371516a02e2c0d559e41d6add65c6076a8bdc349) | A604 |
| 2026/3/14 |    Wps Office···win.exe    |  **Win32/Malgent!MSR**   | 482b58216798f728bb8a669645f8563210626f320a0c0f0aabd0dd350d871628 | 30f806d1-d1df-4003-8b11-acf309441810 | [VirusTotal](https://www.virustotal.com/gui/file/482b58216798f728bb8a669645f8563210626f320a0c0f0aabd0dd350d871628) (6) |                              无                              | A605 |
| 2026/3/14 |          WPS.msi           | **银狐 (SilverFox.cw)**  | c7bd726cbf743c593195ea0945907e9ee15d5c9ad7b7abbf69490fa34e7016dc | 1ceb397d-b23e-4ad2-aeab-9b9e1a8549b9 | [VirusTotal](https://www.virustotal.com/gui/file/c7bd726cbf743c593195ea0945907e9ee15d5c9ad7b7abbf69490fa34e7016dc) (17) |                              无                              | A606 |
| 2026/3/14 |    wps_Installer···.msi    |  **银狐 (SilverFox.l)**  | 32863ce083f952eca0219842f4c187ea418f82e42ff28650e711ad0d63046783 | 7230a2bc-1338-4db7-90c0-e200cdbb45d3 | [VirusTotal](https://www.virustotal.com/gui/file/32863ce083f952eca0219842f4c187ea418f82e42ff28650e711ad0d63046783) (7) |                              无                              | A607 |
| 2026/3/14 |       wps···HH1.msi        |  **银狐 (SilverFox.l)**  | 62d591cab5cb3532737e4449382cd77ab231da8e4b8c2225749eea8cea0baa57 | 7777a533-45cf-44d8-bd15-d564dcf1cc71 | [VirusTotal](https://www.virustotal.com/gui/file/62d591cab5cb3532737e4449382cd77ab231da8e4b8c2225749eea8cea0baa57) (10) |                              无                              | A608 |
| 2026/3/14 |    WpsSetup_office.exe     |  **Win32/Malgent!MSR**   | b07741be8853bf69e3da74a3bb66bc3242473ec399ac96e524f971467bea9284 | 3a15df4a-3b9e-4e87-94b9-547a17bd258c | [VirusTotal](https://www.virustotal.com/gui/file/b07741be8853bf69e3da74a3bb66bc3242473ec399ac96e524f971467bea9284) (16) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b07741be8853bf69e3da74a3bb66bc3242473ec399ac96e524f971467bea9284) | A609 |
| 2026/3/14 |    opealeAi_7be···.exe     |   **银狐 (SilverFox)**   | c8fe0393370dd2bd85c1c85bae3815d5bf352961504710ca1e58b34b0ea71c11 |                                      | [VirusTotal](https://www.virustotal.com/gui/file/c8fe0393370dd2bd85c1c85bae3815d5bf352961504710ca1e58b34b0ea71c11) (4) |                              无                              | A610 |
|  ——————   |        ————————————        |       ————————————       |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近约 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---

【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期    |                   URL                   |           类别           |                           有效载荷                           |                         URLhaus                          | 编号 |
| :-------: | :-------------------------------------: | :----------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/3/2  |       hxxps://g-google[.]hl[.]cn        |  仿冒 Chrome、传播病毒   | hxxps://onesevenonenine[.]oss-us-east-1[.]aliyuncs[.]com/win32-chrome[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3788421) | Z169 |
| 2026/3/2  |       hxxps://l-google[.]hl[.]cn        |  仿冒 Chrome、传播病毒   | hxxps://360uvip[.]com/?explorer/share/file&hash=3f5eM-IqMGcGte_hYnxM_evOFVY95DSUW_KjFyh0LztgMeTkZBnxu9lE9ax_W-XCSw&name=/Zh_Google_Chromex[.]zip |                            无                            | Z170 |
| 2026/3/2  |    hxxps://chrome-gooogle[.]com[.]cn    |  仿冒 Chrome、传播病毒   |             hxxps://dowsws[.]top/chromasc[.]zip              |                            无                            | Z171 |
| 2026/3/2  |    hxxps://www[.]zh-chrome[.]hl[.]cn    |  仿冒 Chrome、传播病毒   | hxxps://chromitem[.]oss-cn-hongkong[.]aliyuncs[.]com/Chrome_Setnp222[.]zip |                            无                            | Z172 |
| 2026/3/2  |      hxxps://bing-google[.]hl[.]cn      |  仿冒 Chrome、传播病毒   |                              有                              |                            无                            | Z173 |
| 2026/3/4  |      hxxps://cn-sogoushurufa[.]com      | 仿冒搜狗输入法、传播病毒 | hxxps://www[.]sogou-shurufa[.]help/%E6%90%9C%E7%8B%97%E6%8B%BC%E9%9F%B3%E8%BE%93%E5%85%A5%E6%B3%95[.]exe | [URLhaus Database](https://urlhaus.abuse.ch/url/3789357) | Z174 |
| 2026/3/4  |       hxxps://sogoushurufa5[.]com       | 仿冒搜狗输入法、传播病毒 | hxxps://www[.]sogou-shurufa[.]help/%E6%90%9C%E7%8B%97%E6%8B%BC%E9%9F%B3%E8%BE%93%E5%85%A5%E6%B3%95[.]exe | [URLhaus Database](https://urlhaus.abuse.ch/url/3789357) | Z175 |
| 2026/3/4  |        hxxps://oraypc[.]com[.]cn        |   仿冒向日葵、传播病毒   |         hxxps://oraypc[.]com[.]cn/sun_oray_x64[.]zip         | [URLhaus Database](https://urlhaus.abuse.ch/url/3789483) | Z176 |
| 2026/3/4  |           hxxps://orayz[.]com           |   仿冒向日葵、传播病毒   | hxxps://orayz[.]com/AweSun_16[.]0[.]0[.]22931_x64_patched[.]exe | [URLhaus Database](https://urlhaus.abuse.ch/url/3789482) | Z177 |
| 2026/3/5  |     hxxps://zh-cn-google[.]hl[.]cn      |  仿冒 Chrome、传播病毒   |           hxxps://tenyunat-99viplawt[.]com/QQGSYLX           | [URLhaus Database](https://urlhaus.abuse.ch/url/3790137) | Z178 |
| 2026/3/6  |         hxxps://kdocs-cn[.]com          |  仿冒金山文档、传播病毒  |     hxxps://down[.]wps-kdocs[.]com/jinshandocs-x86[.]zip     | [URLhaus Database](https://urlhaus.abuse.ch/url/3790481) | Z179 |
| 2026/3/7  |      hxxps://www[.]huoronga[.]com       |    仿冒火绒、传播病毒    | hxxps://pub-826b2258a9f74a40abe9ee543f2409a4[.]r2[.]dev/3[.]600Hnevsak[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3791281) | Z180 |
| 2026/3/7  | hxxps://hnieodfnoibgnuiowwirodnm[.]com  |    仿冒火绒、传播病毒    | hxxps://pub-826b2258a9f74a40abe9ee543f2409a4[.]r2[.]dev/3[.]600Hnevsak[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3791281) | Z181 |
| 2026/3/7  |        hxxps://lk-wps[.]com[.]cn        |    仿冒 WPS、传播病毒    |       hxxps://www[.]irbis2000[.]com/WPS_Setup64[.]exe        | [URLhaus Database](https://urlhaus.abuse.ch/url/3791536) | Z182 |
| 2026/3/9  |     hxxps://zh-cn-google[.]hl[.]cn      |  仿冒 Chrome、传播病毒   |           hxxps://tenyunat-99viplawt[.]com/QQGSYLX           |                            无                            | Z183 |
| 2026/3/9  |    hxxps://chrroome-google[.]hl[.]cn    |  仿冒 Chrome、传播病毒   | hxxps://www[.]upclouds[.]world/?c=uRrMbiqnQzpXGOE69R5LpRLFN9WsRMGBtn8tmwafDNl3hN2DWS4UNjejTxnBRVb4 |                            无                            | Z184 |
| 2026/3/9  | hxxps://google-google-google[.]com[.]cn |  仿冒 Chrome、传播病毒   |                              无                              |                            无                            | Z185 |
| 2026/3/9  |        hxxps://im-wps[.]com[.]cn        |    仿冒 WPS、传播病毒    | hxxps://www[.]asdfgsdfgxcvbvcxasd-oss[.]top/WpsOffice_x64%20_v10_win888[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3792813) | Z186 |
| 2026/3/11 |     hxxps://ai-openclaw[.]com[.]cn      |   仿冒 OpenClaw “龙虾”   | hxxps://www[.]nmysq[.]top/oss/usha/ope/openclawAI%207beAolenc[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3794716) | Z187 |
| 2026/3/14 |       hxxps://aps-wps[.]com[.]cn        |    仿冒 WPS、传播病毒    |  hxxps://mapt[.]oss-cn-hongkong[.]aliyuncs[.]com/WPS[.]zip   |                            无                            | Z188 |
| 2026/3/14 |       hxxps://iin-wps[.]com[.]cn        |    仿冒 WPS、传播病毒    | hxxps://www[.]aliyunnorth-oss[.]top/Wps%20Office_x64_%20v1[.]0_win[.]zip |                            无                            | Z189 |
| 2026/3/14 |        hxxps://lk-wps[.]com[.]cn        |    仿冒 WPS、传播病毒    | hxxps://wps10[.]oss-cn-hongkong[.]aliyuncs[.]com/wps_Installer_Setup_HH[.]zip |                            无                            | Z190 |
| 2026/3/14 |        hxxps://pw-wps[.]com[.]cn        |    仿冒 WPS、传播病毒    | hxxps://wps04[.]oss-cn-hongkong[.]aliyuncs[.]com/wps_Installer_Setup_HH[.]zip |                            无                            | Z191 |
| 2026/3/14 |        hxxps://ps-wps[.]hl[.]cn         |    仿冒 WPS、传播病毒    | hxxps://download[.]xiaodiqiyi[.]com/WPS%20Office%20Setup[.]zip |                            无                            | Z192 |
| 2026/3/14 |  hxxps://www[.]web-openclaw[.]com[.]cn  |   仿冒 OpenClaw “龙虾”   |   hxxps://www[.]web-openclaw[.]com[.]cn/pc/openclaw[.]zip    |                            无                            | Z193 |
|  ——————   |          ————————————————————           |     ———————————————      |                ——————————————————————————————                |                        ——————————                        | ———  |

> [!NOTE]
>
> &emsp;只显示最近约 30 条数据，更早数据详见 LGSRC/[Archive_2.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_2.md) (恶意网站归档)。

## 如何提交文件进行分析？

&emsp;&emsp;用户可通过 [Submit a file for malware analysis](https://www.microsoft.com/en-us/wdsi/filesubmission) 平台向 Microsoft 公司提交可疑文件以供分析。

&emsp;&emsp;如需联系 Ling Gao 共享信息，请发送电子邮件至 **Ling@LGHUB.org**。谢谢！😀

---

[回到顶部](#HEAD)

<img src="Images/CC.png" width = "3%" /> <img src="Images/BY.png" width = "3%" /> <img src="Images/SA.png" width = "3%" />

在 “[署名 - 相同方式共享 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode.zh-Hans)” (CC BY-SA 4.0) 协议之条款下提供。

2025 - 2026, [Ling Gao](https://github.com/Lingggao), 灵糕中心 · 安全响应分中心, [github.com/Lingggao/LGSRC](https://github.com/Lingggao/LGSRC)

[字体许可使用授权书](https://github.com/Lingggao/LGSRC/blob/main/Images/%E5%AD%97%E4%BD%93%E8%AE%B8%E5%8F%AF%E4%BD%BF%E7%94%A8%E6%8E%88%E6%9D%83%E4%B9%A6.png?raw=true) | [Windows Insider 最有价值专家](https://github.com/Lingggao/LGSRC/blob/main/Images/Windows%20Insider%20MVP.png?raw=true)