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

&emsp;&emsp;上次更新时间：2026 年 2 月 16 日 17:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 2 月 16 日，已打击计算机病毒 / 恶意软件 469 个、恶意网站 138 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |        文件名        |         检测          |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :------------------: | :-------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/2/12 | WPS_office-2318.msi  | **Win32/Malgent!MSR** | d6bd2f11c505695121a4bb826cab93b91070a8c86bef430eddbaca664b7bf424 | 71ce80fb-fbb7-4ea2-a96b-a561c0801352 | [VirusTotal](https://www.virustotal.com/gui/search/d6bd2f11c505695121a4bb826cab93b91070a8c86bef430eddbaca664b7bf424) (0) |                              无                              | A445 |
| 2026/2/12 | WPS_office-6899.msi  | **Win32/Malgent!MSR** | b3d91212406527d0ef62a5b6e9cb0abea93292a893cc6b5f1dbd09465da54c36 | e113ba87-4727-4879-84ff-122eaf44419c | [VirusTotal](https://www.virustotal.com/gui/file/b3d91212406527d0ef62a5b6e9cb0abea93292a893cc6b5f1dbd09465da54c36) (3) |                              无                              | A446 |
| 2026/2/12 |      77777.msi       | **Win32/Malgent!MSR** | f007bc6c53e2995f5490418fac761a64a88e30d1d145a67f3954b8966d8db154 | 7c785529-0ab6-468d-95b3-0d456a2632c7 | [VirusTotal](https://www.virustotal.com/gui/file/f007bc6c53e2995f5490418fac761a64a88e30d1d145a67f3954b8966d8db154) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f007bc6c53e2995f5490418fac761a64a88e30d1d145a67f3954b8966d8db154) | A447 |
| 2026/2/12 |      88888.exe       | **Win32/Malgent!MSR** | 003734348d05ac8087c497c214bd871355b168e41c9ee8d5aa5fcfcdbe6c8a89 | 3e06e94f-c76c-4fff-8ad5-3970e52a0f44 | [VirusTotal](https://www.virustotal.com/gui/file/003734348d05ac8087c497c214bd871355b168e41c9ee8d5aa5fcfcdbe6c8a89) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/003734348d05ac8087c497c214bd871355b168e41c9ee8d5aa5fcfcdbe6c8a89) | A448 |
| 2026/2/12 |      99999.msi       | **Win32/Malgent!MSR** | d62975d9c56bfcf182d2341c7cf01ea07503b3a00d2d89bc77274d779973de9c | 8819df63-bb90-4c64-8421-ca86b7b0b039 | [VirusTotal](https://www.virustotal.com/gui/file/d62975d9c56bfcf182d2341c7cf01ea07503b3a00d2d89bc77274d779973de9c) (8) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d62975d9c56bfcf182d2341c7cf01ea07503b3a00d2d89bc77274d779973de9c) | A449 |
| 2026/2/13 |     5.13dasd.exe     | **Win32/Malgent!MSR** | 76d4142469fe6f8d1743fee5a3a38de3dc9ffe243f89479b99e90172005d5b72 | c0da19d5-c337-458c-914f-0b30c23e95cc | [VirusTotal](https://www.virustotal.com/gui/file/76d4142469fe6f8d1743fee5a3a38de3dc9ffe243f89479b99e90172005d5b72) (32) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/76d4142469fe6f8d1743fee5a3a38de3dc9ffe243f89479b99e90172005d5b72) | A450 |
| 2026/2/13 |     LetsVPN.exe      | **Win32/Malgent!MSR** | 32f8ef122fe29ab7a4cb40a75aef68314c37cbca96b3bf63032170db1d9cb9c5 | 7de6fa02-e35d-41be-9a08-3c57ddebc5a8 | [VirusTotal](https://www.virustotal.com/gui/file/32f8ef122fe29ab7a4cb40a75aef68314c37cbca96b3bf63032170db1d9cb9c5) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/32f8ef122fe29ab7a4cb40a75aef68314c37cbca96b3bf63032170db1d9cb9c5) | A451 |
| 2026/2/13 |   output_86···.exe   | **Win32/Malgent!MSR** | 516201070aaa2085711cd65d71b59ae200cd1894a7b2f28a7c1ee4560fb6d5ae | d8aa0bab-9ee8-4bc6-8b27-79264f8ddf2b | [VirusTotal](https://www.virustotal.com/gui/file/516201070aaa2085711cd65d71b59ae200cd1894a7b2f28a7c1ee4560fb6d5ae) (32) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/516201070aaa2085711cd65d71b59ae200cd1894a7b2f28a7c1ee4560fb6d5ae) | A452 |
| 2026/2/13 |     zetarink.exe     | **Win64/Malgent!MSR** | 904cee06bbc6093213e8653b120b2b72701bac7e8dbfbdd69bfb3aed9b6a7298 | 2c8fd5aa-9444-42db-8a47-a552d3949a86 | [VirusTotal](https://www.virustotal.com/gui/file/904cee06bbc6093213e8653b120b2b72701bac7e8dbfbdd69bfb3aed9b6a7298) (22) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/904cee06bbc6093213e8653b120b2b72701bac7e8dbfbdd69bfb3aed9b6a7298) | A453 |
| 2026/2/13 |     Cortana.dll      | **Win32/Egairtigado** | bb245e8659d71a9642c554baa78427c199d732d7240fc1d336668d621d08fe8a | 897e7492-c3cf-4027-83b3-bf4396243155 | [VirusTotal](https://www.virustotal.com/gui/file/bb245e8659d71a9642c554baa78427c199d732d7240fc1d336668d621d08fe8a) (28) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/bb245e8659d71a9642c554baa78427c199d732d7240fc1d336668d621d08fe8a) | A454 |
| 2026/2/13 | sysidiag6.0.225.exe  |    **Win32/Etset**    | 368eec0eff005782a92881823083c1339a4587c2a77de182057aaef1334b9c4b | 10ffbdd5-bc7c-4a1a-a337-6140e2a8919c | [VirusTotal](https://www.virustotal.com/gui/search/368eec0eff005782a92881823083c1339a4587c2a77de182057aaef1334b9c4b) (31) |                              无                              | A455 |
| 2026/2/14 |   260211emit1.exe    |  **Win32/Zenpak.P**   | a9f9ec56d84cfb03d5ddcd39f248e732d1a5dbbbd82fb4899aa8a5e8400a388a | f6e3e214-1003-4154-9793-bff7328a09db | [VirusTotal](https://www.virustotal.com/gui/file/a9f9ec56d84cfb03d5ddcd39f248e732d1a5dbbbd82fb4899aa8a5e8400a388a) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a9f9ec56d84cfb03d5ddcd39f248e732d1a5dbbbd82fb4899aa8a5e8400a388a) | A456 |
| 2026/2/14 |   260211emit2.exe    |  **Win32/Zenpak.P**   | 0cbf1bd21fc38de48e857bca7f3c1ffdc4f30b8592c94733edebcfc0df1eb11c | 3e622691-121f-4273-9d1f-0788bb6fca53 | [VirusTotal](https://www.virustotal.com/gui/file/0cbf1bd21fc38de48e857bca7f3c1ffdc4f30b8592c94733edebcfc0df1eb11c) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/0cbf1bd21fc38de48e857bca7f3c1ffdc4f30b8592c94733edebcfc0df1eb11c) | A457 |
| 2026/2/14 |  reverse_bypass.exe  | **Win64/Malgent!MSR** | 56181f668b1bd40f2c72909e7ed346ae6fdf176863ac42c0724bef5bf14d57fd | 1b05a3ff-ba4a-4202-86fa-a867de86c814 | [VirusTotal](https://www.virustotal.com/gui/file/56181f668b1bd40f2c72909e7ed346ae6fdf176863ac42c0724bef5bf14d57fd) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/56181f668b1bd40f2c72909e7ed346ae6fdf176863ac42c0724bef5bf14d57fd) | A458 |
| 2026/2/14 |      shield.exe      | **Win64/Rozena.YAI**  | 72a595ec26cc06436af13953cd4495b0988f6f57a71b239671a22bde49343c49 | 58500a61-6240-4f38-a2c4-afa9c7a7dd58 | [VirusTotal](https://www.virustotal.com/gui/file/72a595ec26cc06436af13953cd4495b0988f6f57a71b239671a22bde49343c49) (15) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/72a595ec26cc06436af13953cd4495b0988f6f57a71b239671a22bde49343c49) | A459 |
| 2026/2/14 | WinDataOptimizer.exe | **Win64/Malgent!MSR** | 209aab8495025a101cf5184bf7e6ab2fdb83aca59b1971a46269f1d2469a44dc | 2ac9c91f-5f75-4e10-8a0e-a6bf54e49dd6 | [VirusTotal](https://www.virustotal.com/gui/file/209aab8495025a101cf5184bf7e6ab2fdb83aca59b1971a46269f1d2469a44dc) (22) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/209aab8495025a101cf5184bf7e6ab2fdb83aca59b1971a46269f1d2469a44dc/) | A460 |
| 2026/2/14 |     chromasj.msi     | **Win32/Malgent!MSR** | 6c1459cc141f2e4fe660b9e78f69ed538ba770f5c03b24e850a27cad81e3402d | d4f80239-6feb-4d5b-998c-07e5228ea021 | [VirusTotal](https://www.virustotal.com/gui/file/6c1459cc141f2e4fe660b9e78f69ed538ba770f5c03b24e850a27cad81e3402d) (3) | [MalwareBazaar Database](https://www.virustotal.com/gui/file/6c1459cc141f2e4fe660b9e78f69ed538ba770f5c03b24e850a27cad81e3402d) | A461 |
| 2026/2/15 |   腾讯电脑管家.exe   |  **Win32/Vigorf.A**   | a9ac75edac52f05e1a07b0447cf8e58b5d90eaab16f01ee19affa1cf9e599da1 | a6b56831-1e38-453f-ae83-aa8e1cead2e1 | [VirusTotal](https://www.virustotal.com/gui/file/a9ac75edac52f05e1a07b0447cf8e58b5d90eaab16f01ee19affa1cf9e599da1) (35) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a9ac75edac52f05e1a07b0447cf8e58b5d90eaab16f01ee19affa1cf9e599da1) | A462 |
| 2026/2/16 |   win32-chrome.exe   | **Win32/Malgent!MSR** | dec3a4675cf344ce89669663dbabb8db0f32c7ca589def346220635160340f80 | 8f89a140-31fb-4708-91be-782be1c0f1e0 | [VirusTotal](https://www.virustotal.com/gui/file/dec3a4675cf344ce89669663dbabb8db0f32c7ca589def346220635160340f80) (14) |                              无                              | A463 |
| 2026/2/16 |       888.exe        |                       | e5a5f1d25e05687a214f1305ab6ab307dadbcf997e6f632756b67c9579a5fe0e | c232e123-c439-43d8-b4eb-b770ba08d6d9 | [VirusTotal](https://www.virustotal.com/gui/file/e5a5f1d25e05687a214f1305ab6ab307dadbcf997e6f632756b67c9579a5fe0e) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e5a5f1d25e05687a214f1305ab6ab307dadbcf997e6f632756b67c9579a5fe0e) | A464 |
| 2026/2/16 |  aes_loader.vmp.exe  |        研究中         | b640c53e2c02f08aa8ca3db62c628abcaa1694ffec33a59d69d88f5e2d1552aa |                                      | [VirusTotal](https://www.virustotal.com/gui/file/b640c53e2c02f08aa8ca3db62c628abcaa1694ffec33a59d69d88f5e2d1552aa) (20) |                  [MalwareBazaar Database]()                  | A465 |
| 2026/2/16 |      client.exe      |        研究中         | 6f466f0e001ee50ca00fe7bb525370d9b1f88c40adbde7093392af61219d2695 |                                      | [VirusTotal](https://www.virustotal.com/gui/file/6f466f0e001ee50ca00fe7bb525370d9b1f88c40adbde7093392af61219d2695) (19) |                  [MalwareBazaar Database]()                  | A466 |
| 2026/2/16 |      helper.exe      |        研究中         | 5d0232de29690795c3eb9c11a8d87db47827689da7223bc0ec9c5f181fbd1698 |                                      | [VirusTotal](https://www.virustotal.com/gui/file/5d0232de29690795c3eb9c11a8d87db47827689da7223bc0ec9c5f181fbd1698) (15) |                  [MalwareBazaar Database]()                  | A467 |
| 2026/2/16 |      m (2).exe       |        研究中         | b32d1a2b8c3bbe74e196486a6a526aa69aa2881571357f671fabedd0f8a6d825 |                                      | [VirusTotal](https://www.virustotal.com/gui/file/b32d1a2b8c3bbe74e196486a6a526aa69aa2881571357f671fabedd0f8a6d825) (20) |                  [MalwareBazaar Database]()                  | A468 |
| 2026/2/16 |  星际战甲_Class.exe  |        研究中         | 65261fdbc5609f11095af8ab0afb87c017cd5bff10eebbf4bccdcce2e47da40d |                                      | [VirusTotal](https://www.virustotal.com/gui/file/65261fdbc5609f11095af8ab0afb87c017cd5bff10eebbf4bccdcce2e47da40d) (33) |                  [MalwareBazaar Database]()                  | A469 |
|  ——————   |     ————————————     |     ————————————      |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---

【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期    |                 URL                  |         类别          |                           有效载荷                           |                         URLhaus                          | 编号 |
| :-------: | :----------------------------------: | :-------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/2/6  |    hxxps://bho-google[.]com[.]cn     | 仿冒 Chrome、传播病毒 |      hxxps://hjendcs[.]kojga[.]icu/meSetup13[.]2A[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3772943) | Z112 |
| 2026/2/6  |    hxxps://eol-google[.]com[.]cn     | 仿冒 Chrome、传播病毒 |      hxxps://hjendcs[.]kojga[.]icu/meSetup13[.]2A[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3772943) | Z113 |
| 2026/2/6  |  hxxps://chromle-google[.]com[.]cn   | 仿冒 Chrome、传播病毒 | hxxps://chvomrec[.]s3[.]ap-southeast-1[.]amazonaws[.]com/cherome[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3772942) | Z114 |
| 2026/2/6  |     hxxps://xo-google[.]com[.]cn     | 仿冒 Chrome、传播病毒 |                              无                              |                            无                            | Z115 |
| 2026/2/8  |       hxxps://pc-huorong[.]com       |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z116 |
| 2026/2/8  |      hxxps://apps-huorong[.]com      |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z117 |
| 2026/2/8  |  hxxps://huorong-zh[.]com/download   |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z118 |
| 2026/2/8  |       hxxps://huorong-ch[.]com       |  仿冒火绒、传播病毒   |                              无                              |                            无                            | Z119 |
| 2026/2/8  |     hxxps://www[.]huorongh[.]com     |  仿冒火绒、传播病毒   | hxxps://pub-4d163d98fea2481681223bee3f402224[.]r2[.]dev/Hwjfinaviunerjionoiantn[.]zip |                            无                            | Z120 |
| 2026/2/8  |      hxxps://hrnfaenawmjg[.]com      |  仿冒火绒、传播病毒   | hxxps://pub-4d163d98fea2481681223bee3f402224[.]r2[.]dev/Hwjfinaviunerjionoiantn[.]zip |                            无                            | Z121 |
| 2026/2/11 |       hxxps://wps-online[.]cn        |  仿冒 WPS、传播病毒   | hxxps://official-package[.]wpscdn[.]cn/wps/download/WPS_Setup_24657[.]exe |                            无                            | Z122 |
| 2026/2/11 | hxxps://www[.]jinshan-wps[.]com[.]cn |  仿冒 WPS、传播病毒   |       hxxps://hjekd8c[.]huowdy[.]com/WPS_office[.]zip        | [URLhaus Database](https://urlhaus.abuse.ch/url/3775978) | Z123 |
| 2026/2/11 |      hxxps://pp-wps[.]com[.]cn       |  仿冒 WPS、传播病毒   |                              无                              |                            无                            | Z124 |
| 2026/2/11 |      hxxps://www[.]wpspt[.]com       |  仿冒 WPS、传播病毒   |                              有                              |                            无                            | Z125 |
| 2026/2/11 |      hxxps://sgp-wps[.]com[.]cn      |  仿冒 WPS、传播病毒   | hxxps://wps01[.]oss-cn-hongkong[.]aliyuncs[.]com/WPS_Setup_17147_1[.]3[.]zip |                            无                            | Z126 |
| 2026/2/11 |     hxxps://ofice-wps[.]com[.]cn     |  仿冒 WPS、传播病毒   |       hxxps://hjekd8c[.]huowdy[.]com/WPS_office[.]zip        | [URLhaus Database](https://urlhaus.abuse.ch/url/3775978) | Z127 |
| 2026/2/11 |         hxxps://cn-wps[.]cc          |  仿冒 WPS、传播病毒   |                              有                              |                            无                            | Z128 |
| 2026/2/11 |   hxxps://www[.]ce-wps[.]com[.]cn    |  仿冒 WPS、传播病毒   |                              有                              |                            无                            | Z129 |
| 2026/2/13 |       hxxps://pc-huorong[.]com       |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z130 |
| 2026/2/13 |  hxxps://of-huorong[.]com/download   |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z131 |
| 2026/2/13 |      hxxps://apps-huorong[.]com      |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z132 |
| 2026/2/13 |  hxxps://huorong-zh[.]com/download   |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z133 |
| 2026/2/13 |       hxxps://huorong-ch[.]com       |  仿冒火绒、传播病毒   |                              无                              |                            无                            | Z134 |
| 2026/2/14 |       hxxps://lu-da-shi[.]top        | 仿冒鲁大师、传播病毒  | hxxps://lu-da-shi[.]top/cdn_download/ludashi/setuploader[.]exe |                            无                            | Z135 |
| 2026/2/14 |       hxxps://ludashi-cn[.]com       | 仿冒鲁大师、传播病毒  | hxxps://ludashi-cn[.]com/cdn_download/ludashi/setuploader[.]exe |                            无                            | Z136 |
| 2026/2/14 |       hxxps://ludashi-zh[.]com       | 仿冒鲁大师、传播病毒  | hxxps://ludashi-zh[.]com/cdn_download/ludashi/setuploader[.]exe |                            无                            | Z137 |
| 2026/2/15 |       hxxps://web-google[.]cn        | 仿冒 Chrome、传播病毒 |                              有                              |                            无                            | Z138 |
|  ——————   |         ————————————————————         |    ———————————————    |                ——————————————————————————————                |                        ——————————                        | ———  |

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