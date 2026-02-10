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

&emsp;&emsp;上次更新时间：2026 年 2 月 10 日 18:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 2 月 10 日，已打击计算机病毒 / 恶意软件 431 个、恶意网站 121 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |          文件名          |          检测          |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :----------------------: | :--------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/2/7  |       LetsVPN4.exe       | **Win32/Malgent!MSR**  | 515a914e7d9336fa5e0feb6fb24e302884c0a0fc8e18aba333b59cdc5594a155 | e41eabba-a3dd-4383-940b-9788f46290ce | [VirusTotal](https://www.virustotal.com/gui/file/515a914e7d9336fa5e0feb6fb24e302884c0a0fc8e18aba333b59cdc5594a155) (28) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/515a914e7d9336fa5e0feb6fb24e302884c0a0fc8e18aba333b59cdc5594a155) | A405 |
| 2026/2/7  |   Hfiannhosong···.exe    | **Win32/Malgent!MSR**  | da8dad7973c58eedead4973d73102e89019120e124641695590786ab711a9f3a | cced3dc7-3c96-4111-88a8-7365b58b5ef9 | [VirusTotal](https://www.virustotal.com/gui/file/da8dad7973c58eedead4973d73102e89019120e124641695590786ab711a9f3a) (20) |                              无                              | A406 |
| 2026/2/7  |    toel_x64_G3.68.exe    | **Win32/Malgent!MSR**  | e3f569902bac951999029cdf555c84bd21667eebe8ba8aa5d5d5fe8b7669ff8c | 0d9ba54d-2180-44ab-b437-360eb34416df | [VirusTotal](https://www.virustotal.com/gui/file/e3f569902bac951999029cdf555c84bd21667eebe8ba8aa5d5d5fe8b7669ff8c) (11) |                              无                              | A407 |
| 2026/2/7  |   H_World_Setup···.exe   | **Win32/Malgent!MSR**  | 89f8b6cade1808afcea0c700b66bd44802742299812c066298474326b5d0e90f | ec21653d-51d7-4b1c-b801-3fdf57d809d2 | [VirusTotal](https://www.virustotal.com/gui/file/89f8b6cade1808afcea0c700b66bd44802742299812c066298474326b5d0e90f) (27) |                              无                              | A408 |
| 2026/2/8  |   MicrosoftPhotos.exe    | **Win32/Malgent!MSR**  | 4650a4652d78b4adf952fb1188b69361c5adfbb6dde8ae730c267b5395c54166 | 9303841f-6ee5-4daa-bde8-a5cca5824bd1 | [VirusTotal](https://www.virustotal.com/gui/file/4650a4652d78b4adf952fb1188b69361c5adfbb6dde8ae730c267b5395c54166) (30) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/4650a4652d78b4adf952fb1188b69361c5adfbb6dde8ae730c267b5395c54166) | A409 |
| 2026/2/8  |      0206SETUP.exe       |  **CryptInject!MSR**   | 729c830b997d00d365ae4dadee5e26ce2a269df651c93a8337bde5084c66cc1a | 9b997412-3a6e-477f-ac28-bcc0baa624ea | [VirusTotal](https://www.virustotal.com/gui/file/729c830b997d00d365ae4dadee5e26ce2a269df651c93a8337bde5084c66cc1a) (26) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/729c830b997d00d365ae4dadee5e26ce2a269df651c93a8337bde5084c66cc1a) | A410 |
| 2026/2/8  |    CarboraneAcid.exe     | **Win64/Malgent!MSR**  | 1974c75a8009c84626a53a1651b99be84c897cfd088d571f7f7c4db1ee4e7b0b | 0dbb6bf6-2e10-4c2f-95f2-52d18298d0f4 | [VirusTotal](https://www.virustotal.com/gui/file/1974c75a8009c84626a53a1651b99be84c897cfd088d571f7f7c4db1ee4e7b0b) (18) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1974c75a8009c84626a53a1651b99be84c897cfd088d571f7f7c4db1ee4e7b0b) | A411 |
| 2026/2/8  |   sysidiag6.0.225.msi    |  **CryptInject!MSR**   | 69380290e6e3426e5dec5e9e28e2d3fae69a01042c19f07e23330a670e032a5c | 51ef48b8-844d-4588-ac28-cd21a0040288 | [VirusTotal](https://www.virustotal.com/gui/file/69380290e6e3426e5dec5e9e28e2d3fae69a01042c19f07e23330a670e032a5c) (16) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/69380290e6e3426e5dec5e9e28e2d3fae69a01042c19f07e23330a670e032a5c) | A412 |
| 2026/2/8  |   Hwjfinaviuner···.exe   | **Win32/Malgent!MSR**  | c298a73ccaeee8e2c0f0596b66542dc923712ce42faa5062076069197cf90117 | b2c02d76-0d57-4b2c-bc1d-6575bc7d8018 | [VirusTotal](https://www.virustotal.com/gui/file/c298a73ccaeee8e2c0f0596b66542dc923712ce42faa5062076069197cf90117) (20) |                              无                              | A413 |
| 2026/2/8  |        kernel.exe        | **Win64/Malgent!MSR**  | 91f7c336044958fb99dba33e536c8a0f3fc9e28a3b1617de13cf80fca6f9d708 | 9785ede1-5999-45f5-b65a-c5312965bd07 | [VirusTotal](https://www.virustotal.com/gui/file/91f7c336044958fb99dba33e536c8a0f3fc9e28a3b1617de13cf80fca6f9d708) (15) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/91f7c336044958fb99dba33e536c8a0f3fc9e28a3b1617de13cf80fca6f9d708) | A414 |
| 2026/2/8  |        360se.exe         | **Win32/Malgent!MSR**  | 718d8efde0ba4ba81ce3d1bf56a0e1a1acaace8f2dae94677473991b27276d91 | 8f825577-6b94-44ed-9992-2109be7c7016 | [VirusTotal](https://www.virustotal.com/gui/file/718d8efde0ba4ba81ce3d1bf56a0e1a1acaace8f2dae94677473991b27276d91) (35) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/718d8efde0ba4ba81ce3d1bf56a0e1a1acaace8f2dae94677473991b27276d91) | A415 |
| 2026/2/8  |        setup.msi         | **Win32/Malgent!MSR**  | 7526527006ae85c12bc5da85a0adfaf251d6404cfcda520f869f72a506b60dd1 | f998edfa-eeec-4b89-9402-18743b77c5a4 | [VirusTotal](https://www.virustotal.com/gui/file/7526527006ae85c12bc5da85a0adfaf251d6404cfcda520f869f72a506b60dd1) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/7526527006ae85c12bc5da85a0adfaf251d6404cfcda520f869f72a506b60dd1) | A416 |
| 2026/2/8  |         简历.exe         |   **Win64/Vigorf.A**   | 387b1bdae5b66176abb9d10228175a11602b52b3924e661141263aab9b82c41f | 8b095372-6b8f-443e-8011-cbd1d576afc0 | [VirusTotal](https://www.virustotal.com/gui/file/387b1bdae5b66176abb9d10228175a11602b52b3924e661141263aab9b82c41f) (13) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/387b1bdae5b66176abb9d10228175a11602b52b3924e661141263aab9b82c41f) | A417 |
| 2026/2/8  |      ShellGuard.exe      | **Win32/Malgent!MSR**  | fcba39374d704a27a736935a17eed9d131e151ddc8290b6c211d805cda9b1265 | 7f113508-6431-4af8-a7f3-b4fcea9a1e6e | [VirusTotal](https://www.virustotal.com/gui/file/fcba39374d704a27a736935a17eed9d131e151ddc8290b6c211d805cda9b1265) (33) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/fcba39374d704a27a736935a17eed9d131e151ddc8290b6c211d805cda9b1265) | A418 |
| 2026/2/9  |    shellcode_rust.exe    | **Win64/Malgent!MSR**  | 372702d5b4043b62d862daaadda6b5e5c92d0d76d742890816db5f0ae0892a58 | 354102d7-3db4-4509-97d3-fb627072663c | [VirusTotal](https://www.virustotal.com/gui/file/372702d5b4043b62d862daaadda6b5e5c92d0d76d742890816db5f0ae0892a58) (14) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/372702d5b4043b62d862daaadda6b5e5c92d0d76d742890816db5f0ae0892a58) | A419 |
| 2026/2/9  |     SilentLoader.exe     | **Win64/Malgent!MSR**  | ec25c48de3e50f3b1a183c81474055ef1292772ef429e45816445c77bb07b714 | 83bd622d-6b17-4adc-a190-e11ed7829845 | [VirusTotal](https://www.virustotal.com/gui/file/ec25c48de3e50f3b1a183c81474055ef1292772ef429e45816445c77bb07b714) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ec25c48de3e50f3b1a183c81474055ef1292772ef429e45816445c77bb07b714) | A420 |
| 2026/2/9  |  XY Cursor-Setup···.exe  |    **Worm:AutoRun**    | e41eac343f994a3dd12ede81d19f570a7572702abc0fa35aba51f372a7432aaf | 3797d28a-1cd0-491f-be1b-427ea28a7a7e | [VirusTotal](https://www.virustotal.com/gui/file/e41eac343f994a3dd12ede81d19f570a7572702abc0fa35aba51f372a7432aaf) (58) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e41eac343f994a3dd12ede81d19f570a7572702abc0fa35aba51f372a7432aaf) | A421 |
| 2026/2/9  |       橘子游戏.exe       |   **Win32/Vigorf.A**   | 62f6ad367274ea105ce51221f054e904152f00ec62fd1be06c10c29a56c66948 | c430c8cb-c7ac-42c5-b388-3b2f4ba49987 | [VirusTotal](https://www.virustotal.com/gui/file/62f6ad367274ea105ce51221f054e904152f00ec62fd1be06c10c29a56c66948) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/62f6ad367274ea105ce51221f054e904152f00ec62fd1be06c10c29a56c66948) | A422 |
| 2026/2/9  |       mfyehhc.exe        | **Win32/Malgent!MSR**  | c0ac6d5c5779923f66a8eb49c7683bf6d6fa30c428aac13c94c51fac90855553 | b33326cc-476c-45e6-b321-7e6e88076298 | [VirusTotal](https://www.virustotal.com/gui/file/c0ac6d5c5779923f66a8eb49c7683bf6d6fa30c428aac13c94c51fac90855553) (18) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c0ac6d5c5779923f66a8eb49c7683bf6d6fa30c428aac13c94c51fac90855553) | A423 |
| 2026/2/9  |         111.msi          | **Script/Sabsik.EN.A** | a3e3e8d4e7db5af4f1248478f65d71d9d826a12cb9b48e2d6eebd8227ae13792 | 2efa38d1-0521-4172-a75e-5896d3abc174 | [VirusTotal](https://www.virustotal.com/gui/file/a3e3e8d4e7db5af4f1248478f65d71d9d826a12cb9b48e2d6eebd8227ae13792) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a3e3e8d4e7db5af4f1248478f65d71d9d826a12cb9b48e2d6eebd8227ae13792) | A424 |
| 2026/2/9  |         222.exe          |  **Win32/Sonbokli.A**  | 165f6d2f481d0f36b37e6f8485f189174f3b058a01f1a64e83986d0de65dfc35 | 88b0af21-31ba-4258-9063-baaf0c1ff6ca | [VirusTotal](https://www.virustotal.com/gui/file/165f6d2f481d0f36b37e6f8485f189174f3b058a01f1a64e83986d0de65dfc35) (20) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/165f6d2f481d0f36b37e6f8485f189174f3b058a01f1a64e83986d0de65dfc35) | A425 |
| 2026/2/10 |      2383e230c4.exe      | **Win64/Malgent!MSR**  | 2383e230c44f405c4171e0db86e9fc04eaeea223860678f0048e862b6ea477a8 | 426c4fa7-bfbd-4e8c-8c77-b60213fc8da6 | [VirusTotal](https://www.virustotal.com/gui/file/2383e230c44f405c4171e0db86e9fc04eaeea223860678f0048e862b6ea477a8) (23) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/2383e230c44f405c4171e0db86e9fc04eaeea223860678f0048e862b6ea477a8) | A426 |
| 2026/2/10 |       Verifier.exe       | **Win32/Malgent!MSR**  | 85c5d598edccfddce306e53a69ba86fd0193114aa05e66d8e0106db2b00ba03c | 5ca681a9-4c6b-4ebc-a61c-0c098ee19fb2 | [VirusTotal](https://www.virustotal.com/gui/file/85c5d598edccfddce306e53a69ba86fd0193114aa05e66d8e0106db2b00ba03c) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/85c5d598edccfddce306e53a69ba86fd0193114aa05e66d8e0106db2b00ba03c) | A427 |
| 2026/2/10 |       王者荣耀.exe       | **Win64/CobaltStrike** | 70eb836ff3d3026bcc703bef4ebab0a690203d3c595710ae079de66d6af45c4d | 999b1898-ed86-465e-9f50-ab2dd0d2c797 | [VirusTotal](https://www.virustotal.com/gui/file/70eb836ff3d3026bcc703bef4ebab0a690203d3c595710ae079de66d6af45c4d) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/70eb836ff3d3026bcc703bef4ebab0a690203d3c595710ae079de66d6af45c4d) | A428 |
| 2026/2/10 | 2026年···违规名单···.exe | **Win32/Malgent!MSR**  | 8cd23d5552c846482cefa3a0344928e924312416a9ac6f1b9f2e6a1f05ae13f2 | 7686cbb9-536b-4d2e-97c2-6e3e1647f343 | [VirusTotal](https://www.virustotal.com/gui/file/8cd23d5552c846482cefa3a0344928e924312416a9ac6f1b9f2e6a1f05ae13f2) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/8cd23d5552c846482cefa3a0344928e924312416a9ac6f1b9f2e6a1f05ae13f2) | A429 |
| 2026/2/10 |   Chrome_Setup···.exe    | **Win32/Malgent!MSR**  | ddf5711ccc42a9016b93798b94acac08babbcb09c4e8782f85f4a430983bc7ec | 45dc4ad9-ec4b-482c-85d2-6b5e9757f3d4 | [VirusTotal](https://www.virustotal.com/gui/file/ddf5711ccc42a9016b93798b94acac08babbcb09c4e8782f85f4a430983bc7ec) (20) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ddf5711ccc42a9016b93798b94acac08babbcb09c4e8782f85f4a430983bc7ec) | A430 |
| 2026/2/10 |      8cc81fea88.exe      | **Win32/Malgent!MSR**  | 8cc81fea885559da6be9febd385304ea25ed77979f2d5676a8b7b20475ceae3d | 21c7b169-1f9f-46c5-a6cc-a287fc11c753 | [VirusTotal](https://www.virustotal.com/gui/file/8cc81fea885559da6be9febd385304ea25ed77979f2d5676a8b7b20475ceae3d) (14) |                              无                              | A431 |
|  ——————   |       ————————————       |      ————————————      |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---

【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期    |                     URL                     |           类别           |                           有效载荷                           |                         URLhaus                          | 编号 |
| :-------: | :-----------------------------------------: | :----------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/1/31 |        hxxps://cn-youdao[.]com[.]cn         |  仿冒有道翻译、传播病毒  |                              无                              |                            无                            | Z095 |
| 2026/1/31 |        hxxps://ai-youdao[.]com[.]cn         |  仿冒有道翻译、传播病毒  | hxxps://ww3[.]wangmeipo[.]cn/api/v3/file/get/44036/youdaofanyi261301620[.]zip?sign=KofEYK49f-d63hzDE0LkCe1M8gE7gNLvEBpnCjyGzOI%3D%3A0 |                            无                            | Z096 |
| 2026/2/2  |        hxxps://wps-offics[.]com[.]cn        |    仿冒 WPS、传播病毒    |   hxxps://download[.]wpscn[.]sbs/downloads/downloads[.]php   |                            无                            | Z097 |
| 2026/2/2  |          hxxp://sg-wps[.]com[.]cn           |    仿冒 WPS、传播病毒    |                              无                              |                            无                            | Z098 |
| 2026/2/2  |      hxxps://sgp-wpsoffice[.]com[.]cn       |    仿冒 WPS、传播病毒    |                              无                              |                            无                            | Z099 |
| 2026/2/2  |          hxxps://u-wps[.]com[.]cn           |    仿冒 WPS、传播病毒    |                              有                              |                            无                            | Z100 |
| 2026/2/2  |        hxxps://wps-wpsapp[.]com[.]cn        |    仿冒 WPS、传播病毒    |   hxxps://download[.]wpscn[.]sbs/downloads/downloads[.]php   |                            无                            | Z101 |
| 2026/2/2  |      hxxps://for-wpsoffice[.]com[.]cn       |    仿冒 WPS、传播病毒    | hxxps://wps-cn-ci[.]wpscdn[.]cn/wps/download/ep/WPS2019_15344[.]exe |                            无                            | Z102 |
| 2026/2/2  |       hxxps://www[.]am-wps[.]com[.]cn       |    仿冒 WPS、传播病毒    |                              无                              |                            无                            | Z103 |
| 2026/2/3  |    hxxps://cn[.]co-wpsoffice[.]com[.]cn     |    仿冒 WPS、传播病毒    | hxxps://fiveeightfourthree[.]oss-us-west-1[.]aliyuncs[.]com/wpsoffice_12[.]1[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3771128) | Z104 |
| 2026/2/3  |         hxxps://www[.]word-cn[.]com         |   仿冒 Word、传播病毒    |                              无                              |                            无                            | Z105 |
| 2026/2/4  |        hxxps://srf-sogou[.]com[.]cn         | 仿冒搜狗输入法、传播病毒 |    hxxps://jkem45[.]cndyals[.]top/gou_pinyin15[.]4[.]zip     |                            无                            | Z106 |
| 2026/2/4  | hxxps://input-sogo[.]com[.]cn/index1[.]html | 仿冒搜狗输入法、传播病毒 |                              无                              |                            无                            | Z107 |
| 2026/2/4  |      hxxps://sogoushurufa-sogou[.]com       | 仿冒搜狗输入法、传播病毒 |                              无                              |                            无                            | Z108 |
| 2026/2/4  |           hxxps://ai-sogou[.]com            | 仿冒搜狗输入法、传播病毒 | hxxps://c-sougou[.]com/downloads/windows/SG[.]Setup[.]0[.]2[.]0[.]1[.]zip |                            无                            | Z109 |
| 2026/2/4  |    hxxps://www[.]win-sogou[.]com/windows    | 仿冒搜狗输入法、传播病毒 |                              无                              |                            无                            | Z110 |
| 2026/2/4  |       hxxps://apps-sougoupinyin[.]com       | 仿冒搜狗输入法、传播病毒 | hxxps://www[.]zwpht[.]com/ssogou/sluvou_pinyin5[.]024[.]exe  | [URLhaus Database](https://urlhaus.abuse.ch/url/3772056) | Z111 |
| 2026/2/6  |        hxxps://bho-google[.]com[.]cn        |  仿冒 Chrome、传播病毒   |      hxxps://hjendcs[.]kojga[.]icu/meSetup13[.]2A[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3772943) | Z112 |
| 2026/2/6  |        hxxps://eol-google[.]com[.]cn        |  仿冒 Chrome、传播病毒   |      hxxps://hjendcs[.]kojga[.]icu/meSetup13[.]2A[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3772943) | Z113 |
| 2026/2/6  |      hxxps://chromle-google[.]com[.]cn      |  仿冒 Chrome、传播病毒   | hxxps://chvomrec[.]s3[.]ap-southeast-1[.]amazonaws[.]com/cherome[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3772942) | Z114 |
| 2026/2/6  |        hxxps://xo-google[.]com[.]cn         |  仿冒 Chrome、传播病毒   |                              无                              |                            无                            | Z115 |
| 2026/2/8  |          hxxps://pc-huorong[.]com           |    仿冒火绒、传播病毒    | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z116 |
| 2026/2/8  |         hxxps://apps-huorong[.]com          |    仿冒火绒、传播病毒    | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z117 |
| 2026/2/8  |      hxxps://huorong-zh[.]com/download      |    仿冒火绒、传播病毒    | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/sysidiag6[.]0[.]225[.]zip |                            无                            | Z118 |
| 2026/2/8  |          hxxps://huorong-ch[.]com           |    仿冒火绒、传播病毒    |                              无                              |                            无                            | Z119 |
| 2026/2/8  |        hxxps://www[.]huorongh[.]com         |    仿冒火绒、传播病毒    | hxxps://pub-4d163d98fea2481681223bee3f402224[.]r2[.]dev/Hwjfinaviunerjionoiantn[.]zip |                            无                            | Z120 |
| 2026/2/8  |         hxxps://hrnfaenawmjg[.]com          |    仿冒火绒、传播病毒    | hxxps://pub-4d163d98fea2481681223bee3f402224[.]r2[.]dev/Hwjfinaviunerjionoiantn[.]zip |                            无                            | Z121 |
|  ——————   |            ————————————————————             |     ———————————————      |                ——————————————————————————————                |                        ——————————                        | ———  |

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