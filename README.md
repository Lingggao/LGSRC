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

&emsp;&emsp;上次更新时间：2026 年 2 月 4 日 15:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 2 月 4 日，已打击计算机病毒 / 恶意软件 370 个、恶意网站 105 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期   |          文件名           |          检测           |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :------: | :-----------------------: | :---------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/2/1 |        google.exe         |  **Win32/Malgent!MSR**  | 7909734378714b00dbf7caa964f20dcfd73aff350f65b24128e50b5cf12c5a56 | 311036a4-a64d-4512-bd3c-52814dc8f17f | [VirusTotal](https://www.virustotal.com/gui/file/7909734378714b00dbf7caa964f20dcfd73aff350f65b24128e50b5cf12c5a56) (11) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/7909734378714b00dbf7caa964f20dcfd73aff350f65b24128e50b5cf12c5a56) | A345 |
| 2026/2/2 |       codeload.exe        |  **Win32/Malgent!MSR**  | 06487285bc404428659b86dbc5b80710404ed042c4c9c8714bcf3422c8dd471e | dac619b5-32f0-4739-b1a9-fc2a19270df2 | [VirusTotal](https://www.virustotal.com/gui/file/06487285bc404428659b86dbc5b80710404ed042c4c9c8714bcf3422c8dd471e) (14) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/06487285bc404428659b86dbc5b80710404ed042c4c9c8714bcf3422c8dd471e) | A346 |
| 2026/2/2 |          dd.exe           | **Win32/Sonbokli.A!cl** | d9fb746821f2498aafb3ce437b79439d4e625dd91cd873368dc7f8a550fdeb0c |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/d9fb746821f2498aafb3ce437b79439d4e625dd91cd873368dc7f8a550fdeb0c) (14) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d9fb746821f2498aafb3ce437b79439d4e625dd91cd873368dc7f8a550fdeb0c) | A347 |
| 2026/2/2 | Microsoft 365 Copilot.exe |  **Win32/KillProc.MA**  | 5dee376ea124ff1038f59cdf7717a3ba99c6d1ef319c45543c461b321a1dae1d | 87dbe02a-4e43-4f41-9b20-87e303ab67a3 | [VirusTotal](https://www.virustotal.com/gui/file/5dee376ea124ff1038f59cdf7717a3ba99c6d1ef319c45543c461b321a1dae1d) (28) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5dee376ea124ff1038f59cdf7717a3ba99c6d1ef319c45543c461b321a1dae1d) | A348 |
| 2026/2/2 |   SG.Setup.0.2.0.1.exe    |   **Win32/Wacapew.C**   | 7867e9f5be414c804a64723ce52b8de7bfa678b5aab2689d4d43eedda460edd7 | bd1a861f-3985-4b7f-8e15-7cc2895454e4 | [VirusTotal](https://www.virustotal.com/gui/file/7867e9f5be414c804a64723ce52b8de7bfa678b5aab2689d4d43eedda460edd7) (7) |                              无                              | A349 |
| 2026/2/2 |       YVC6.3.87.msi       |  **Win32/Malgent!MSR**  | 96de475b390ac1815c88f9f6ae10fedfb9d0723a5f41be1dc3a7b9ed1d29a35a | 00546423-aad3-495a-ba69-757dc3c34cce | [VirusTotal](https://www.virustotal.com/gui/file/96de475b390ac1815c88f9f6ae10fedfb9d0723a5f41be1dc3a7b9ed1d29a35a) (25) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/96de475b390ac1815c88f9f6ae10fedfb9d0723a5f41be1dc3a7b9ed1d29a35a) | A350 |
| 2026/2/2 |      (Linux) 7m45f9       |  **Downloader:SAgnt**   | c8c016dbfd1f8a15e566a61fce2a2f6674cde79f0decaa6872aa371235d630d3 | a6ef172c-5a16-4842-92e6-e10e1ea5cd8c | [VirusTotal](https://www.virustotal.com/gui/file/c8c016dbfd1f8a15e566a61fce2a2f6674cde79f0decaa6872aa371235d630d3) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c8c016dbfd1f8a15e566a61fce2a2f6674cde79f0decaa6872aa371235d630d3) | A351 |
| 2026/2/2 |      (Linux) random       |   **Backdoor:Mirai**    | 6d10382a478f71b121be340ff622ff62e58458f290f35217b1b0fd23865a8b4e | a6ef172c-5a16-4842-92e6-e10e1ea5cd8c | [VirusTotal](https://www.virustotal.com/gui/file/6d10382a478f71b121be340ff622ff62e58458f290f35217b1b0fd23865a8b4e) (6) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/6d10382a478f71b121be340ff622ff62e58458f290f35217b1b0fd23865a8b4e) | A352 |
| 2026/2/2 |      WOS_SAN_088.exe      |  **Win32/Kepavll!rfn**  | 6dc96699edab226f7b91cfa16bcc3801d22b251accc293992ee094d4546d3a25 | 507ea377-6468-4645-a08a-5b567e041ef3 | [VirusTotal](https://www.virustotal.com/gui/file/6dc96699edab226f7b91cfa16bcc3801d22b251accc293992ee094d4546d3a25) (8) |                              无                              | A353 |
| 2026/2/2 |        dbEoYH.exe         |  **Win32/Malgent!MSR**  | 23e82be61fb19583d1f8082a5639d61c03707558d0cba3b59f65c12eaca11a7c | 01b75132-5f2f-4ae4-8eb7-feb3909aec69 | [VirusTotal](https://www.virustotal.com/gui/file/23e82be61fb19583d1f8082a5639d61c03707558d0cba3b59f65c12eaca11a7c) (20) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/23e82be61fb19583d1f8082a5639d61c03707558d0cba3b59f65c12eaca11a7c) | A354 |
| 2026/2/2 |        asz8EIg.exe        |  **Win32/Malgent!MSR**  | dc1cd19fe85beabcb904caec0efba88e9fa626751bb30e89dc4d432001c8b7a9 | c0038570-9c2c-4559-9390-a9c04e73a710 | [VirusTotal](https://www.virustotal.com/gui/file/dc1cd19fe85beabcb904caec0efba88e9fa626751bb30e89dc4d432001c8b7a9) (8) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/dc1cd19fe85beabcb904caec0efba88e9fa626751bb30e89dc4d432001c8b7a9) | A355 |
| 2026/2/2 |         Steam.exe         |  **Win32/Malgent!MSR**  | e0f6227f02d8bf6263938088af91d3f073db4a43a529ba46665cb2e90f612799 | fb646ebc-08e3-4fce-9775-7367288b196e | [VirusTotal](https://www.virustotal.com/gui/file/e0f6227f02d8bf6263938088af91d3f073db4a43a529ba46665cb2e90f612799) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e0f6227f02d8bf6263938088af91d3f073db4a43a529ba46665cb2e90f612799) | A356 |
| 2026/2/3 |    电脑工具箱 V3.0.exe    |  **Win32/Egairtigado**  | a995ba239662505b2d34ae44b8f958e83b130959fd9609f000e9b269bce1dea4 | 968484a9-e053-410c-a946-ce37157f2d04 | [VirusTotal](https://www.virustotal.com/gui/file/a995ba239662505b2d34ae44b8f958e83b130959fd9609f000e9b269bce1dea4) (26) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a995ba239662505b2d34ae44b8f958e83b130959fd9609f000e9b269bce1dea4) | A357 |
| 2026/2/3 |     adn.826522009.exe     |  **Win64/Malgent!MSR**  | bda07f6a81cd4b94a6c15c5f8bb531a26ce4550f7d201a0799b4ecb3eaa7ed80 | a569a9e4-c845-4ae3-bc15-482a4e80128b | [VirusTotal](https://www.virustotal.com/gui/file/bda07f6a81cd4b94a6c15c5f8bb531a26ce4550f7d201a0799b4ecb3eaa7ed80) (3) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/bda07f6a81cd4b94a6c15c5f8bb531a26ce4550f7d201a0799b4ecb3eaa7ed80) | A358 |
| 2026/2/3 |        SandBox.exe        | **Win32/Wacatac.C!ml**  | 4fad4215a12ef6b677ee757b7e7f81c61b2d7d3557ea15919165fa735f8d8769 | 186d64ce-0822-4c45-b314-2a4ed007c656 | [VirusTotal](https://www.virustotal.com/gui/search/4fad4215a12ef6b677ee757b7e7f81c61b2d7d3557ea15919165fa735f8d8769) (16) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/4fad4215a12ef6b677ee757b7e7f81c61b2d7d3557ea15919165fa735f8d8769) | A359 |
| 2026/2/3 |    ···中文语音包-3.exe    |  **Win32/Malgent!MSR**  | 08b99583611ee222b5989af12eedc07ea0b39bd7af1bf68f04a8cc4a14ab47bc | 28ac2280-d220-4faa-b03a-d7034b411ac7 | [VirusTotal](https://www.virustotal.com/gui/file/08b99583611ee222b5989af12eedc07ea0b39bd7af1bf68f04a8cc4a14ab47bc) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/08b99583611ee222b5989af12eedc07ea0b39bd7af1bf68f04a8cc4a14ab47bc) | A360 |
| 2026/2/3 |    wpsoffice_12.1.msi     |  **Win32/Malgent!MSR**  | 3ce915cc389b19c3d2ce8be1c2e7e710937637cfe5e99575fecfe8f393ff73bf | f3f276c1-5b47-4de1-aee1-e8b019483b85 | [VirusTotal](https://www.virustotal.com/gui/file/3ce915cc389b19c3d2ce8be1c2e7e710937637cfe5e99575fecfe8f393ff73bf) (5) |                              无                              | A361 |
| 2026/2/3 |       chromasj.msi        |  **Win32/Malgent!MSR**  | 1942b8e87183ad52259060638ea36052cfbecdeae45c01879c0f4d22c044dca6 | 92e1d783-df35-4518-9a9b-5f44e878aa9f | [VirusTotal](https://www.virustotal.com/gui/file/1942b8e87183ad52259060638ea36052cfbecdeae45c01879c0f4d22c044dca6) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1942b8e87183ad52259060638ea36052cfbecdeae45c01879c0f4d22c044dca6) | A362 |
| 2026/2/3 |       E-Invoice.rar       |   **Win32/Vigorf.A**    | aa94291f9f25c61f4ef1181043c6c402b238774620603716ceea6412a9f29cc5 | 4b93d837-7d79-41e1-8b96-3eec130d47ec | [VirusTotal](https://www.virustotal.com/gui/file/aa94291f9f25c61f4ef1181043c6c402b238774620603716ceea6412a9f29cc5) (29) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/aa94291f9f25c61f4ef1181043c6c402b238774620603716ceea6412a9f29cc5) | A363 |
| 2026/2/3 |          333.msi          |  **Win32/Malgent!MSR**  | c7f7467468ff31acef0ea15d0017a9788ba7c019e62a07ac9c951fca841c581d | 7e7c71e3-832e-4b9c-ad38-8f1ecd917767 | [VirusTotal](https://www.virustotal.com/gui/file/c7f7467468ff31acef0ea15d0017a9788ba7c019e62a07ac9c951fca841c581d) (4) |                              无                              | A364 |
| 2026/2/4 |     64位安装包···.exe     |  **Win64/Malgent!MSR**  | a2c59ea0b830d2d773c08a66df43506972b780ed7bd26f80308763247be64e09 | 35e40d9b-03f1-4667-a967-3a46f435e3d0 | [VirusTotal](https://www.virustotal.com/gui/file/a2c59ea0b830d2d773c08a66df43506972b780ed7bd26f80308763247be64e09) (33) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a2c59ea0b830d2d773c08a66df43506972b780ed7bd26f80308763247be64e09) | A365 |
| 2026/2/4 |        123321.exe         |  **Win64/Malgent!MSR**  | 784f91bd483172f27ff0a65795b1fe7911e3d4f2293b190ab4db0a79b9acc783 | 141391cd-0cd7-42a4-90b3-f3380b2bdab0 | [VirusTotal](https://www.virustotal.com/gui/file/784f91bd483172f27ff0a65795b1fe7911e3d4f2293b190ab4db0a79b9acc783) (11) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/784f91bd483172f27ff0a65795b1fe7911e3d4f2293b190ab4db0a79b9acc783) | A366 |
| 2026/2/4 | cloudflared_installer.exe |  **Win32/Malgent!MSR**  | 6152b2d71d575a61f12a0d7cc56ac04387493c330b1fb8c934f5e1b9f755ef53 | 9f534027-e41f-4471-93ad-72190aa679df | [VirusTotal](https://www.virustotal.com/gui/file/6152b2d71d575a61f12a0d7cc56ac04387493c330b1fb8c934f5e1b9f755ef53) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/6152b2d71d575a61f12a0d7cc56ac04387493c330b1fb8c934f5e1b9f755ef53) | A367 |
| 2026/2/4 |       MoveWrite.exe       |  **Win32/Malgent!MSR**  | dc0adb03fd833ab70b582fc092d5e5e511669abb125c41660e3d4ee3b95163b1 | 247d095e-b125-48f2-b773-6fad019bd194 | [VirusTotal](https://www.virustotal.com/gui/file/dc0adb03fd833ab70b582fc092d5e5e511669abb125c41660e3d4ee3b95163b1) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/dc0adb03fd833ab70b582fc092d5e5e511669abb125c41660e3d4ee3b95163b1) | A368 |
| 2026/2/4 |        569Bxgo.exe        |  **Win32/Malgent!MSR**  | 4399c0889ab9ce999f4724d78f372dab4f2d31e1c4b229c409f1c6da942be435 | 923dbd13-27cc-4d25-b6af-7997ff5d1b2c | [VirusTotal](https://www.virustotal.com/gui/file/4399c0889ab9ce999f4724d78f372dab4f2d31e1c4b229c409f1c6da942be435) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/4399c0889ab9ce999f4724d78f372dab4f2d31e1c4b229c409f1c6da942be435) | A369 |
| 2026/2/4 |      DataAuthSvc.exe      |  **Win32/Malgent!MSR**  | 5267fff6399de9a9b8f1901e7596b641647a1fb6a542b391928c349074b34f6e | 4ee09e28-029f-4293-a7b5-0e0d756ea8ac | [VirusTotal](https://www.virustotal.com/gui/search/5267fff6399de9a9b8f1901e7596b641647a1fb6a542b391928c349074b34f6e) (8) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5267fff6399de9a9b8f1901e7596b641647a1fb6a542b391928c349074b34f6e) | A370 |
|  ——————  |       ————————————        |      ————————————       |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---

【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期    |                 URL                  |          类别          |                           有效载荷                           |                         URLhaus                          | 编号 |
| :-------: | :----------------------------------: | :--------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/1/26 | hxxps://cn-app-wpsoffice[.]com[.]cn  |   仿冒 WPS、传播病毒   | hxxps://www-dfsdhsr-bssbdd[.]com[.]cn/assets/download/LWPSFW-FWFInstaller_SetupX64[.]zip |                            无                            | Z080 |
| 2026/1/26 |   hxxps://www[.]cc-wps[.]com[.]cn    |   仿冒 WPS、传播病毒   | hxxps://sgnfyn[.]oss-cn-shenzhen[.]aliyuncs[.]com/wps-setup-1[.]5[.]69[.]zip |                            无                            | Z081 |
| 2026/1/26 |     hxxps://pc[.]wps-offce[.]cn      |   仿冒 WPS、传播病毒   | hxxps://wps03[.]oss-cn-hongkong[.]aliyuncs[.]com/WPS_Setup_17147_4[.]1[.]zip |                            无                            | Z082 |
| 2026/1/26 |      hxxps://of-wps[.]com[.]cn       |   仿冒 WPS、传播病毒   |     hxxps://jkem45[.]gcdndo[.]com/gou_pinyin15[.]4[.]zip     |                            无                            | Z083 |
| 2026/1/26 |       hxxps://i-wps[.]com[.]cn       |   仿冒 WPS、传播病毒   | hxxps://sgnfyn[.]oss-cn-shenzhen[.]aliyuncs[.]com/wps-setup1[.]8[.]6[.]18[.]zip |                            无                            | Z084 |
| 2026/1/28 |      hxxps://www[.]to-desk[.]cn      | 仿冒 ToDesk、传播病毒  |                              无                              |                            无                            | Z085 |
| 2026/1/28 |     hxxps://www[.]todeska[.]com      | 仿冒 ToDesk、传播病毒  | hxxps://pub-8f57965f8599440e97ac52dbcca4fc58[.]r2[.]dev/Sqveiqrgbuniasncoigenr[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3765012) | Z086 |
| 2026/1/28 |     hxxps://www[.]todeski[.]com      | 仿冒 ToDesk、传播病毒  | hxxps://pub-8f57965f8599440e97ac52dbcca4fc58[.]r2[.]dev/Sqveiqrgbuniasncoigenr[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3765012) | Z087 |
| 2026/1/28 |     hxxps://zh-todesk[.]com[.]cn     | 仿冒 ToDesk、传播病毒  |                              有                              |                            无                            | Z088 |
| 2026/1/28 |       hxxps://toamndkf[.]cyou        | 仿冒 ToDesk、传播病毒  | hxxps://pub-8f57965f8599440e97ac52dbcca4fc58[.]r2[.]dev/Sqveiqrgbuniasncoigenr[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3765012) | Z089 |
| 2026/1/30 |     hxxps://mail[.]qcqzaa[.]shop     |   钓鱼网站、QQ 盗号    |                              无                              |                            无                            | Z090 |
| 2026/1/31 |    hxxps://appb-youdao[.]com[.]cn    | 仿冒有道翻译、传播病毒 | hxxps://youdao02[.]oss-cn-hongkong[.]aliyuncs[.]com/Youdao02Dict_fanyiweb_navigation[.]zip |                            无                            | Z091 |
| 2026/1/31 |      hxxps://apps-youdao[.]com       | 仿冒有道翻译、传播病毒 | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/youdaofanyi058[.]zip |                            无                            | Z092 |
| 2026/1/31 |     hxxps://wp-youdao[.]com[.]cn     | 仿冒有道翻译、传播病毒 | hxxps://ww3[.]wangmeipo[.]cn/api/v3/file/get/44036/youdaofanyi261301620[.]zip?sign=KofEYK49f-d63hzDE0LkCe1M8gE7gNLvEBpnCjyGzOI%3D%3A0 |                            无                            | Z093 |
| 2026/1/31 |    hxxps://www[.]cp-youdao[.]com     | 仿冒有道翻译、传播病毒 |                              无                              |                            无                            | Z094 |
| 2026/1/31 |     hxxps://cn-youdao[.]com[.]cn     | 仿冒有道翻译、传播病毒 |                              无                              |                            无                            | Z095 |
| 2026/1/31 |     hxxps://ai-youdao[.]com[.]cn     | 仿冒有道翻译、传播病毒 | hxxps://ww3[.]wangmeipo[.]cn/api/v3/file/get/44036/youdaofanyi261301620[.]zip?sign=KofEYK49f-d63hzDE0LkCe1M8gE7gNLvEBpnCjyGzOI%3D%3A0 |                            无                            | Z096 |
| 2026/2/2  |    hxxps://wps-offics[.]com[.]cn     |   仿冒 WPS、传播病毒   |   hxxps://download[.]wpscn[.]sbs/downloads/downloads[.]php   |                            无                            | Z097 |
| 2026/2/2  |       hxxp://sg-wps[.]com[.]cn       |   仿冒 WPS、传播病毒   |                              无                              |                            无                            | Z098 |
| 2026/2/2  |   hxxps://sgp-wpsoffice[.]com[.]cn   |   仿冒 WPS、传播病毒   |                              无                              |                            无                            | Z099 |
| 2026/2/2  |       hxxps://u-wps[.]com[.]cn       |   仿冒 WPS、传播病毒   |                              有                              |                            无                            | Z100 |
| 2026/2/2  |    hxxps://wps-wpsapp[.]com[.]cn     |   仿冒 WPS、传播病毒   |   hxxps://download[.]wpscn[.]sbs/downloads/downloads[.]php   |                            无                            | Z101 |
| 2026/2/2  |   hxxps://for-wpsoffice[.]com[.]cn   |   仿冒 WPS、传播病毒   | hxxps://wps-cn-ci[.]wpscdn[.]cn/wps/download/ep/WPS2019_15344[.]exe |                            无                            | Z102 |
| 2026/2/2  |   hxxps://www[.]am-wps[.]com[.]cn    |   仿冒 WPS、传播病毒   |                              无                              |                            无                            | Z103 |
| 2026/2/3  | hxxps://cn[.]co-wpsoffice[.]com[.]cn |   仿冒 WPS、传播病毒   | hxxps://fiveeightfourthree[.]oss-us-west-1[.]aliyuncs[.]com/wpsoffice_12[.]1[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3771128) | Z104 |
| 2026/2/3  |     hxxps://www[.]word-cn[.]com      |  仿冒 Word、传播病毒   |                              无                              |                            无                            | Z105 |
|  ——————   |         ————————————————————         |    ———————————————     |                ——————————————————————————————                |                        ——————————                        | ———  |

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