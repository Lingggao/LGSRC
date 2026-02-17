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

&emsp;&emsp;上次更新时间：2026 年 2 月 17 日 18:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 2 月 17 日，已打击计算机病毒 / 恶意软件 475 个、恶意网站 143 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |        文件名        |         检测          |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :------------------: | :-------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
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
| 2026/2/16 |     Craed_1.exe      | **Win32/Malgent!MSR** | e5a5f1d25e05687a214f1305ab6ab307dadbcf997e6f632756b67c9579a5fe0e | c232e123-c439-43d8-b4eb-b770ba08d6d9 | [VirusTotal](https://www.virustotal.com/gui/file/e5a5f1d25e05687a214f1305ab6ab307dadbcf997e6f632756b67c9579a5fe0e) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e5a5f1d25e05687a214f1305ab6ab307dadbcf997e6f632756b67c9579a5fe0e) | A464 |
| 2026/2/16 |  aes_loader.vmp.exe  | **Win32/Malgent!MSR** | b640c53e2c02f08aa8ca3db62c628abcaa1694ffec33a59d69d88f5e2d1552aa | 2deddb04-13b8-4298-bd50-3f1bf7b7a1cd | [VirusTotal](https://www.virustotal.com/gui/file/b640c53e2c02f08aa8ca3db62c628abcaa1694ffec33a59d69d88f5e2d1552aa) (20) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b640c53e2c02f08aa8ca3db62c628abcaa1694ffec33a59d69d88f5e2d1552aa) | A465 |
| 2026/2/16 |      client.exe      | **Win64/GhostRat.GA** | 6f466f0e001ee50ca00fe7bb525370d9b1f88c40adbde7093392af61219d2695 | e3a105cd-4d35-4ca7-8086-338177289558 | [VirusTotal](https://www.virustotal.com/gui/file/6f466f0e001ee50ca00fe7bb525370d9b1f88c40adbde7093392af61219d2695) (19) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/6f466f0e001ee50ca00fe7bb525370d9b1f88c40adbde7093392af61219d2695) | A466 |
| 2026/2/16 |      helper.exe      | **Win32/Malgent!MSR** | 5d0232de29690795c3eb9c11a8d87db47827689da7223bc0ec9c5f181fbd1698 | 2cc5deed-8eaa-4b6e-b4fe-655917533f86 | [VirusTotal](https://www.virustotal.com/gui/file/5d0232de29690795c3eb9c11a8d87db47827689da7223bc0ec9c5f181fbd1698) (15) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5d0232de29690795c3eb9c11a8d87db47827689da7223bc0ec9c5f181fbd1698) | A467 |
| 2026/2/16 |      m (2).exe       | **Win32/Egairtigado** | b32d1a2b8c3bbe74e196486a6a526aa69aa2881571357f671fabedd0f8a6d825 | f30cab24-d66e-4ae7-adc0-12356d947e1c | [VirusTotal](https://www.virustotal.com/gui/file/b32d1a2b8c3bbe74e196486a6a526aa69aa2881571357f671fabedd0f8a6d825) (20) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b32d1a2b8c3bbe74e196486a6a526aa69aa2881571357f671fabedd0f8a6d825) | A468 |
| 2026/2/16 |  星际战甲_Class.exe  | **Win32/Malgent!MSR** | 65261fdbc5609f11095af8ab0afb87c017cd5bff10eebbf4bccdcce2e47da40d | 21c6d608-c978-43f8-a1e5-9dcc6da87bb2 | [VirusTotal](https://www.virustotal.com/gui/file/65261fdbc5609f11095af8ab0afb87c017cd5bff10eebbf4bccdcce2e47da40d) (33) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/65261fdbc5609f11095af8ab0afb87c017cd5bff10eebbf4bccdcce2e47da40d) | A469 |
| 2026/2/17 | Chorme···1858···.exe | **Win32/Malgent!MSR** | 436c9ae95fd183ea7c5e5bdc019d93a615b50b5b293b5b6c550bd61623d86709 | 20d2cc95-a992-485f-a89c-0d9165041709 | [VirusTotal](https://www.virustotal.com/gui/file/436c9ae95fd183ea7c5e5bdc019d93a615b50b5b293b5b6c550bd61623d86709) (5) |                              无                              | A470 |
| 2026/2/17 | Clnromeca9f-x64.exe  | **Win32/Malgent!MSR** | cd086223e514084ec27942cfa308024d55e5e2138abd8b0cc9a940835e35cd71 | a9e7626d-9c2e-42ce-bdb5-d3244fc2d7fd | [VirusTotal](https://www.virustotal.com/gui/file/cd086223e514084ec27942cfa308024d55e5e2138abd8b0cc9a940835e35cd71) (24) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/cd086223e514084ec27942cfa308024d55e5e2138abd8b0cc9a940835e35cd71) | A471 |
| 2026/2/17 |     RunCode.zip      |   **CobaltStrike**    | 478c33a64d55fcce7c037d5c351412857a0714c086e6e142f01efb05c4797361 | 9157095d-cdc5-442a-98c9-aeb92936c424 | [VirusTotal](https://www.virustotal.com/gui/file/478c33a64d55fcce7c037d5c351412857a0714c086e6e142f01efb05c4797361) (38) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/478c33a64d55fcce7c037d5c351412857a0714c086e6e142f01efb05c4797361) | A472 |
| 2026/2/17 | HanNEL Beta1.3.2.exe | **Win32/Malgent!MSR** | 113c133afaf9312ab4aea413456e9107de2b9fb1694dc31f8747bafdba2980ce | 7c4d3b60-fe1a-4902-b92c-efbfdf6c6e73 | [VirusTotal](https://www.virustotal.com/gui/file/113c133afaf9312ab4aea413456e9107de2b9fb1694dc31f8747bafdba2980ce) (28) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/113c133afaf9312ab4aea413456e9107de2b9fb1694dc31f8747bafdba2980ce) | A473 |
| 2026/2/17 |     创世奇迹.exe     | **Win32/Malgent!MSR** | 2992ca29c7f80ffe65886f062abbbecf66c231d19bd7cfb6ddba6a34e1e0effd | 50d06a7a-e4c2-4a86-ae35-764f1f91d1c8 | [VirusTotal](https://www.virustotal.com/gui/file/2992ca29c7f80ffe65886f062abbbecf66c231d19bd7cfb6ddba6a34e1e0effd) (22) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/2992ca29c7f80ffe65886f062abbbecf66c231d19bd7cfb6ddba6a34e1e0effd) | A474 |
| 2026/2/17 |    下载器3.40.exe    |  **Dropper:Floxif**   | 720e1a32fcc9308e33781ea1f1e0dd5e980f11492e93ed14624a68c383752159 | 36371e26-9d1a-4aa5-b643-14f97349e790 | [VirusTotal](https://www.virustotal.com/gui/file/720e1a32fcc9308e33781ea1f1e0dd5e980f11492e93ed14624a68c383752159) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/720e1a32fcc9308e33781ea1f1e0dd5e980f11492e93ed14624a68c383752159) | A475 |
|  ——————   |     ————————————     |     ————————————      |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---

【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期    |                   URL                    |         类别          |                           有效载荷                           |                         URLhaus                          | 编号 |
| :-------: | :--------------------------------------: | :-------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/2/8  |    hxxps://huorong-zh[.]com/download     |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z118 |
| 2026/2/8  |         hxxps://huorong-ch[.]com         |  仿冒火绒、传播病毒   |                              无                              |                            无                            | Z119 |
| 2026/2/8  |       hxxps://www[.]huorongh[.]com       |  仿冒火绒、传播病毒   | hxxps://pub-4d163d98fea2481681223bee3f402224[.]r2[.]dev/Hwjfinaviunerjionoiantn[.]zip |                            无                            | Z120 |
| 2026/2/8  |        hxxps://hrnfaenawmjg[.]com        |  仿冒火绒、传播病毒   | hxxps://pub-4d163d98fea2481681223bee3f402224[.]r2[.]dev/Hwjfinaviunerjionoiantn[.]zip |                            无                            | Z121 |
| 2026/2/11 |         hxxps://wps-online[.]cn          |  仿冒 WPS、传播病毒   | hxxps://official-package[.]wpscdn[.]cn/wps/download/WPS_Setup_24657[.]exe |                            无                            | Z122 |
| 2026/2/11 |   hxxps://www[.]jinshan-wps[.]com[.]cn   |  仿冒 WPS、传播病毒   |       hxxps://hjekd8c[.]huowdy[.]com/WPS_office[.]zip        | [URLhaus Database](https://urlhaus.abuse.ch/url/3775978) | Z123 |
| 2026/2/11 |        hxxps://pp-wps[.]com[.]cn         |  仿冒 WPS、传播病毒   |                              无                              |                            无                            | Z124 |
| 2026/2/11 |        hxxps://www[.]wpspt[.]com         |  仿冒 WPS、传播病毒   |                              有                              |                            无                            | Z125 |
| 2026/2/11 |        hxxps://sgp-wps[.]com[.]cn        |  仿冒 WPS、传播病毒   | hxxps://wps01[.]oss-cn-hongkong[.]aliyuncs[.]com/WPS_Setup_17147_1[.]3[.]zip |                            无                            | Z126 |
| 2026/2/11 |       hxxps://ofice-wps[.]com[.]cn       |  仿冒 WPS、传播病毒   |       hxxps://hjekd8c[.]huowdy[.]com/WPS_office[.]zip        | [URLhaus Database](https://urlhaus.abuse.ch/url/3775978) | Z127 |
| 2026/2/11 |           hxxps://cn-wps[.]cc            |  仿冒 WPS、传播病毒   |                              有                              |                            无                            | Z128 |
| 2026/2/11 |     hxxps://www[.]ce-wps[.]com[.]cn      |  仿冒 WPS、传播病毒   |                              有                              |                            无                            | Z129 |
| 2026/2/13 |         hxxps://pc-huorong[.]com         |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z130 |
| 2026/2/13 |    hxxps://of-huorong[.]com/download     |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z131 |
| 2026/2/13 |        hxxps://apps-huorong[.]com        |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z132 |
| 2026/2/13 |    hxxps://huorong-zh[.]com/download     |  仿冒火绒、传播病毒   | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z133 |
| 2026/2/13 |         hxxps://huorong-ch[.]com         |  仿冒火绒、传播病毒   |                              无                              |                            无                            | Z134 |
| 2026/2/14 |         hxxps://lu-da-shi[.]top          | 仿冒鲁大师、传播病毒  | hxxps://lu-da-shi[.]top/cdn_download/ludashi/setuploader[.]exe |                            无                            | Z135 |
| 2026/2/14 |         hxxps://ludashi-cn[.]com         | 仿冒鲁大师、传播病毒  | hxxps://ludashi-cn[.]com/cdn_download/ludashi/setuploader[.]exe |                            无                            | Z136 |
| 2026/2/14 |         hxxps://ludashi-zh[.]com         | 仿冒鲁大师、传播病毒  | hxxps://ludashi-zh[.]com/cdn_download/ludashi/setuploader[.]exe |                            无                            | Z137 |
| 2026/2/15 |         hxxps://web-google[.]cn          | 仿冒 Chrome、传播病毒 |                              有                              |                            无                            | Z138 |
| 2026/2/16 | hxxps://web[.]chrorome-google[.]hl[.]cn  | 仿冒 Chrome、传播病毒 | hxxps://tpuexd-1362557240[.]cos[.]ap-hongkong[.]myqcloud[.]com/Chorme_Setup_1858_1[.]3[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3779077) | Z139 |
| 2026/2/16 |     hxxps://chrorme-google[.]hl[.]cn     | 仿冒 Chrome、传播病毒 | hxxps://www[.]up3me[.]cc/?c=cGXvEgv949Hv4SreY2v_OTs8Z-7n5Cqw9l9jPJG65GC3A1riBz4JRBlKnIFs-IqV | [URLhaus Database](https://urlhaus.abuse.ch/url/3778875) | Z140 |
| 2026/2/16 |    hxxps://chromme-google[.]com[.]cn     | 仿冒 Chrome、传播病毒 | hxxps://download[.]chrome-google[.]sbs/downloads/clnrorne[.]php |                            无                            | Z141 |
| 2026/2/16 | hxxps://cn[.]pc-chrome-google[.]hl[.]cn  | 仿冒 Chrome、传播病毒 | hxxps://tpuexd-1362557240[.]cos[.]ap-hongkong[.]myqcloud[.]com/Chorme_Setup_1858_1[.]3[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3779077) | Z142 |
| 2026/2/16 | hxxps://zh[.]cn-chroome-google[.]hl[.]cn | 仿冒 Chrome、传播病毒 | hxxps://tpuexd-1362557240[.]cos[.]ap-hongkong[.]myqcloud[.]com/Chorme_Setup_1858_1[.]3[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3779077) | Z143 |
|  ——————   |           ————————————————————           |    ———————————————    |                ——————————————————————————————                |                        ——————————                        | ———  |

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