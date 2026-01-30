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

&emsp;&emsp;上次更新时间：2026 年 1 月 31 日 8:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 1 月 31 日，已打击计算机病毒 / 恶意软件 333 个、恶意网站 96 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |         文件名         |          检测           |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :--------------------: | :---------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/1/29 |     88794f9771.exe     |  **Win64/Malgent!MTB**  | 88794f9771b91cb678a85e5effeb132511739b10464768170db2e1c5838001a3 | d367897e-2e39-4e34-81ed-6f6bd7536a7d | [VirusTotal](https://www.virustotal.com/gui/file/88794f9771b91cb678a85e5effeb132511739b10464768170db2e1c5838001a3) (31) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/88794f9771b91cb678a85e5effeb132511739b10464768170db2e1c5838001a3) | A309 |
| 2026/1/29 |     4a70931203.exe     |  **Win32/Malgent!MSR**  | 4a70931203b983ac2bb3ec15ac6c187eb8311ff836c64bb90c1ae980f255f27a | d367897e-2e39-4e34-81ed-6f6bd7536a7d | [VirusTotal](https://www.virustotal.com/gui/file/4a70931203b983ac2bb3ec15ac6c187eb8311ff836c64bb90c1ae980f255f27a) (29) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/4a70931203b983ac2bb3ec15ac6c187eb8311ff836c64bb90c1ae980f255f27a) | A310 |
| 2026/1/29 |     9094996209.exe     |  **Win32/Malgent!MSR**  | 9094996209f053a7e6925c7be900a98370122027adb64164936452fa4d769a5a | 3bb63f5b-4385-4136-b654-60649a3bbc6b | [VirusTotal](https://www.virustotal.com/gui/file/9094996209f053a7e6925c7be900a98370122027adb64164936452fa4d769a5a) (30) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/9094996209f053a7e6925c7be900a98370122027adb64164936452fa4d769a5a) | A311 |
| 2026/1/30 | shellbag···cleaner.exe |    **AutoRun!atmn**     | a018a79a0a2ef5a2acf5c4039f2d805309c2bdade0ac3c893e017bab55b7f219 | ab099cb5-fffa-4729-9548-4e5d2ea14d59 | [VirusTotal](https://www.virustotal.com/gui/file/a018a79a0a2ef5a2acf5c4039f2d805309c2bdade0ac3c893e017bab55b7f219) (62) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a018a79a0a2ef5a2acf5c4039f2d805309c2bdade0ac3c893e017bab55b7f219) | A312 |
| 2026/1/30 |     Synaptics.exe      |    **AutoRun!atmn**     | 358823901c4f0829e35ee8c421f789dee2fa529cdf06bdfb4ef60b26c61ed5d6 | ef601442-0dfa-4eab-85a7-e3ac27cfcfce | [VirusTotal](https://www.virustotal.com/gui/file/358823901c4f0829e35ee8c421f789dee2fa529cdf06bdfb4ef60b26c61ed5d6) (61) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/358823901c4f0829e35ee8c421f789dee2fa529cdf06bdfb4ef60b26c61ed5d6) | A313 |
| 2026/1/30 |     goarsheep.exe      |  **Win32/Malgent!MSR**  | e55a202c96bbbd7a4b4004877c17a882fde4884b733048b2acd15ce69547533e | 7fd8cfc1-e37b-48b4-9e0b-8405e4158933 | [VirusTotal](https://www.virustotal.com/gui/file/e55a202c96bbbd7a4b4004877c17a882fde4884b733048b2acd15ce69547533e) (1) |                              无                              | A314 |
| 2026/1/30 | Alibaba Order list.exe |  **Formbook.AMAJ!MTB**  | 851eff1ee63fed8cc3c032689e157ae350dbf68a49a23192bad20277c409d477 | 88f17820-2777-4c3e-b5ac-449346d5af94 | [VirusTotal](https://www.virustotal.com/gui/file/851eff1ee63fed8cc3c032689e157ae350dbf68a49a23192bad20277c409d477) (34) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/851eff1ee63fed8cc3c032689e157ae350dbf68a49a23192bad20277c409d477) | A315 |
| 2026/1/30 |    Approved···.exe     | **AgentTesla.NCU!MTB**  | a4b32f1a7ba468ea623a8864f891db07eac2c536ca637724f4e7daa861852fc0 | 86e61f6c-35d6-4450-b51a-93a6a288f587 | [VirusTotal](https://www.virustotal.com/gui/file/a4b32f1a7ba468ea623a8864f891db07eac2c536ca637724f4e7daa861852fc0) (45) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a4b32f1a7ba468ea623a8864f891db07eac2c536ca637724f4e7daa861852fc0) | A316 |
| 2026/1/30 |        DJP.rar         |  **CobaltStrike.JKM**   | c24830ff830ba1456ce5e8cbfb079f5877685a94fd51731fd6d24e922b45d1fb | 70e569e1-c676-43aa-b9c6-ed1a470c14ba | [VirusTotal](https://www.virustotal.com/gui/file/c24830ff830ba1456ce5e8cbfb079f5877685a94fd51731fd6d24e922b45d1fb) (26) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/8d6241711909ec32127bf0ee270f8b0d395c8914c98a6ca592b7e79623ea79a6) | A317 |
| 2026/1/30 |        7968.tmp        |    **AutoRun!atmn**     | 1a572d736a9ed3113623c3b308fc95fd77db65a8abdef2a3696b660e268f5f26 | a7beddba-16f9-4427-95de-4707493ef3b9 | [VirusTotal](https://www.virustotal.com/gui/search/1a572d736a9ed3113623c3b308fc95fd77db65a8abdef2a3696b660e268f5f26) (64) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1a572d736a9ed3113623c3b308fc95fd77db65a8abdef2a3696b660e268f5f26) | A318 |
| 2026/1/30 |    Client-built.exe    |   **Backdoor:Quasar**   | be1227e0a0e70a3a61082237ccfb4cb79b82487ed47378a81be1cb1cd453e47c | 10c6006d-916f-4a41-9a28-5327b680e9a3 | [VirusTotal](https://www.virustotal.com/gui/file/be1227e0a0e70a3a61082237ccfb4cb79b82487ed47378a81be1cb1cd453e47c) (55) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/be1227e0a0e70a3a61082237ccfb4cb79b82487ed47378a81be1cb1cd453e47c) | A319 |
| 2026/1/30 |     output_64.exe      |  **GhostRat.CKD!MTB**   | 246511b11ac092dad686f3c0b99e6445299f0fb72f379b2d06e8a112e02efb03 | bc4bd1e5-ca4f-4e22-9511-0bd2f87cc55a | [VirusTotal](https://www.virustotal.com/gui/file/246511b11ac092dad686f3c0b99e6445299f0fb72f379b2d06e8a112e02efb03) (51) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/246511b11ac092dad686f3c0b99e6445299f0fb72f379b2d06e8a112e02efb03) | A320 |
| 2026/1/30 |      刷机工具.exe      |    **AutoRun!atmn**     | e6f44e22a12e5e495b1b0e09684e4acfdb361a01e7d9cabaaf566439e2173fcb | b4e6639c-e6be-4a22-9651-1a7a674d4e1b | [VirusTotal](https://www.virustotal.com/gui/file/e6f44e22a12e5e495b1b0e09684e4acfdb361a01e7d9cabaaf566439e2173fcb) (64) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e6f44e22a12e5e495b1b0e09684e4acfdb361a01e7d9cabaaf566439e2173fcb) | A321 |
| 2026/1/30 |      aKuF5nm2.exe      |  **Win32/Kepavll!rfn**  | 30af885b190aa854e6bd1f5bf7ca51d2dc814221e7cf8fffe68c8db0004513d9 | de5b3edd-ff51-4157-9db4-344d5f8d4d1c | [VirusTotal](https://www.virustotal.com/gui/file/30af885b190aa854e6bd1f5bf7ca51d2dc814221e7cf8fffe68c8db0004513d9) (15) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/30af885b190aa854e6bd1f5bf7ca51d2dc814221e7cf8fffe68c8db0004513d9) | A322 |
| 2026/1/30 |    ARTWORK (1).exe     |   **PhantomStealer**    | 86bd0fb523c233fe4e82fbb0f614482c65736dea768816f6d0b44cecbdb07535 | 2931744d-6e1b-4a4b-93a1-e21b66efcd46 | [VirusTotal](https://www.virustotal.com/gui/file/86bd0fb523c233fe4e82fbb0f614482c65736dea768816f6d0b44cecbdb07535) (38) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/86bd0fb523c233fe4e82fbb0f614482c65736dea768816f6d0b44cecbdb07535) | A323 |
| 2026/1/30 |     TurboBoost.dll     |  **Win32/Malgent!MSR**  | a7a27ee417c3c508edfa039f6d4b27eaaca31b29e78fc5e87bb9ac88d8d846b9 | f1031236-3cf6-479a-b5d3-19826ef3fbfe | [VirusTotal](https://www.virustotal.com/gui/file/a7a27ee417c3c508edfa039f6d4b27eaaca31b29e78fc5e87bb9ac88d8d846b9) (24) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a7a27ee417c3c508edfa039f6d4b27eaaca31b29e78fc5e87bb9ac88d8d846b9) | A324 |
| 2026/1/30 |   Vertical Bars.dll    |  **MSIL/Malgent!MSR**   | 0ab39ca995426be4df7bbfa3aaeb514c769f772b6cf9097a01d40fa1bed3bfcf | f5c7ffc2-9b74-4b5a-bde4-9215f1a7a4ad | [VirusTotal](https://www.virustotal.com/gui/file/0ab39ca995426be4df7bbfa3aaeb514c769f772b6cf9097a01d40fa1bed3bfcf) (37) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/0ab39ca995426be4df7bbfa3aaeb514c769f772b6cf9097a01d40fa1bed3bfcf) | A325 |
| 2026/1/31 |        hits.ps1        | **PowerShell/Malgent**  | 1c421d985a73a379bd2464b8d71c0a4db986135512facf204500e5dbe9e67649 | 3fa2f48c-42db-4776-b9bb-9e1d0c83e75d | [VirusTotal](https://www.virustotal.com/gui/file/1c421d985a73a379bd2464b8d71c0a4db986135512facf204500e5dbe9e67649) (3) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1c421d985a73a379bd2464b8d71c0a4db986135512facf204500e5dbe9e67649) | A326 |
| 2026/1/31 |    final_loader.exe    |  **Win32/Malgent!MSR**  | c6d35c535539f28419ccebb3a1ef7d19e271aa05568df74fb7fee25d26a79f10 | 778cbd5d-b729-4ae2-8c6a-aa376d1ef825 | [VirusTotal](https://www.virustotal.com/gui/file/c6d35c535539f28419ccebb3a1ef7d19e271aa05568df74fb7fee25d26a79f10) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c6d35c535539f28419ccebb3a1ef7d19e271aa05568df74fb7fee25d26a79f10) | A327 |
| 2026/1/31 |  ChoormeInsaller.exe   |  **Win32/Malgent!MSR**  | 895cc75f1264314921a5a6487d1b35e489feb63900cb3d60359f17d595adec28 | bef53beb-7d62-451a-b396-041cfaa45e2f | [VirusTotal](https://www.virustotal.com/gui/file/895cc75f1264314921a5a6487d1b35e489feb63900cb3d60359f17d595adec28) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/895cc75f1264314921a5a6487d1b35e489feb63900cb3d60359f17d595adec28) | A328 |
| 2026/1/31 |       多功能.exe       |  **Win32/Malgent!MSR**  | f030be75e1ec253744464c9456aaf85b71273788e684495689a5bfbe9a3483e5 | 4582ca0e-5793-480e-9ebb-e680b2b9a822 | [VirusTotal](https://www.virustotal.com/gui/file/f030be75e1ec253744464c9456aaf85b71273788e684495689a5bfbe9a3483e5) (25) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f030be75e1ec253744464c9456aaf85b71273788e684495689a5bfbe9a3483e5) | A329 |
| 2026/1/31 |      KB284726.ps1      | **FickleFrostbite!dha** | 033cb31c081ff4292f82e528f5cb78a503816462daba8cc18a6c4531009602c2 | edbd10bc-3e65-4837-b682-1322bad449cb | [VirusTotal](https://www.virustotal.com/gui/file/033cb31c081ff4292f82e528f5cb78a503816462daba8cc18a6c4531009602c2) (6) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/033cb31c081ff4292f82e528f5cb78a503816462daba8cc18a6c4531009602c2) | A330 |
| 2026/1/31 |  youdao02dict···.msi   |  **Win32/Malgent!MSR**  | 1a2f8ae6f6d459b5cdf0bec4510e91613a64b559dc9ef324220659a67b03215b | 6ac8e757-3108-4194-ab60-fb5611cd1978 | [VirusTotal](https://www.virustotal.com/gui/file/1a2f8ae6f6d459b5cdf0bec4510e91613a64b559dc9ef324220659a67b03215b) (14) |                              无                              | A331 |
| 2026/1/31 |   youdaofanyi058.exe   |  **Win32/Dropper!MSR**  | a30709e30dd11483bcc598d86964a11ad2d92960c0febaf6a72ddcc003a1f41d | 4240728a-f4fa-441c-bc92-7ccd96fca561 | [VirusTotal](https://www.virustotal.com/gui/file/a30709e30dd11483bcc598d86964a11ad2d92960c0febaf6a72ddcc003a1f41d) (5) |                              无                              | A332 |
| 2026/1/31 | youdao···26130···.exe  |  **Win32/Dropper!MSR**  | 4cc687dd0c34a9415c33f3aa36ee222aae1c2072f17dc307f1ea9a64716f7501 | 6618ff0f-6609-4e71-a5ea-b3ff8bdebb01 | [VirusTotal](https://www.virustotal.com/gui/file/4cc687dd0c34a9415c33f3aa36ee222aae1c2072f17dc307f1ea9a64716f7501) (8) |                              无                              | A333 |
|  ——————   |      ————————————      |      ————————————       |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

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
| 2026/1/30 |    hxxps://mail[.]qcqzaa[.]shop     |   钓鱼网站、QQ 盗号    |                              无                              |                            无                            | Z090 |
| 2026/1/31 |   hxxps://appb-youdao[.]com[.]cn    | 仿冒有道翻译、传播病毒 | hxxps://youdao02[.]oss-cn-hongkong[.]aliyuncs[.]com/Youdao02Dict_fanyiweb_navigation[.]zip |                            无                            | Z091 |
| 2026/1/31 |      hxxps://apps-youdao[.]com      | 仿冒有道翻译、传播病毒 | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/youdaofanyi058[.]zip |                            无                            | Z092 |
| 2026/1/31 |    hxxps://wp-youdao[.]com[.]cn     | 仿冒有道翻译、传播病毒 | hxxps://ww3[.]wangmeipo[.]cn/api/v3/file/get/44036/youdaofanyi261301620[.]zip?sign=KofEYK49f-d63hzDE0LkCe1M8gE7gNLvEBpnCjyGzOI%3D%3A0 |                            无                            | Z093 |
| 2026/1/31 |    hxxps://www[.]cp-youdao[.]com    | 仿冒有道翻译、传播病毒 |                              无                              |                            无                            | Z094 |
| 2026/1/31 |    hxxps://cn-youdao[.]com[.]cn     | 仿冒有道翻译、传播病毒 |                              无                              |                            无                            | Z095 |
| 2026/1/31 |    hxxps://ai-youdao[.]com[.]cn     | 仿冒有道翻译、传播病毒 | hxxps://ww3[.]wangmeipo[.]cn/api/v3/file/get/44036/youdaofanyi261301620[.]zip?sign=KofEYK49f-d63hzDE0LkCe1M8gE7gNLvEBpnCjyGzOI%3D%3A0 |                            无                            | Z096 |
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