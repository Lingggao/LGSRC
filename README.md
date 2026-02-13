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

&emsp;&emsp;上次更新时间：2026 年 2 月 13 日 20:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 2 月 13 日，已打击计算机病毒 / 恶意软件 453 个、恶意网站 129 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |          文件名          |          检测          |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :----------------------: | :--------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/2/10 |       Verifier.exe       | **Win32/Malgent!MSR**  | 85c5d598edccfddce306e53a69ba86fd0193114aa05e66d8e0106db2b00ba03c | 5ca681a9-4c6b-4ebc-a61c-0c098ee19fb2 | [VirusTotal](https://www.virustotal.com/gui/file/85c5d598edccfddce306e53a69ba86fd0193114aa05e66d8e0106db2b00ba03c) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/85c5d598edccfddce306e53a69ba86fd0193114aa05e66d8e0106db2b00ba03c) | A427 |
| 2026/2/10 |       王者荣耀.exe       | **Win64/CobaltStrike** | 70eb836ff3d3026bcc703bef4ebab0a690203d3c595710ae079de66d6af45c4d | 999b1898-ed86-465e-9f50-ab2dd0d2c797 | [VirusTotal](https://www.virustotal.com/gui/file/70eb836ff3d3026bcc703bef4ebab0a690203d3c595710ae079de66d6af45c4d) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/70eb836ff3d3026bcc703bef4ebab0a690203d3c595710ae079de66d6af45c4d) | A428 |
| 2026/2/10 | 2026年···违规名单···.exe | **Win32/Malgent!MSR**  | 8cd23d5552c846482cefa3a0344928e924312416a9ac6f1b9f2e6a1f05ae13f2 | 7686cbb9-536b-4d2e-97c2-6e3e1647f343 | [VirusTotal](https://www.virustotal.com/gui/file/8cd23d5552c846482cefa3a0344928e924312416a9ac6f1b9f2e6a1f05ae13f2) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/8cd23d5552c846482cefa3a0344928e924312416a9ac6f1b9f2e6a1f05ae13f2) | A429 |
| 2026/2/10 |   Chrome_Setup···.exe    | **Win32/Malgent!MSR**  | ddf5711ccc42a9016b93798b94acac08babbcb09c4e8782f85f4a430983bc7ec | 45dc4ad9-ec4b-482c-85d2-6b5e9757f3d4 | [VirusTotal](https://www.virustotal.com/gui/file/ddf5711ccc42a9016b93798b94acac08babbcb09c4e8782f85f4a430983bc7ec) (20) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ddf5711ccc42a9016b93798b94acac08babbcb09c4e8782f85f4a430983bc7ec) | A430 |
| 2026/2/10 |      8cc81fea88.exe      | **Win32/Malgent!MSR**  | 8cc81fea885559da6be9febd385304ea25ed77979f2d5676a8b7b20475ceae3d | 21c7b169-1f9f-46c5-a6cc-a287fc11c753 | [VirusTotal](https://www.virustotal.com/gui/file/8cc81fea885559da6be9febd385304ea25ed77979f2d5676a8b7b20475ceae3d) (14) |                              无                              | A431 |
| 2026/2/10 |        mfTVt.rar         | **Win64/Malgent!MSR**  | 41bc6bb1ad5d5b11594a6dba168a6a36d951f6bd551d45d9e42e4f57d6376ef9 | 89dead17-a888-4c4e-9db2-e3add6676039 | [VirusTotal](https://www.virustotal.com/gui/file/41bc6bb1ad5d5b11594a6dba168a6a36d951f6bd551d45d9e42e4f57d6376ef9) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/41bc6bb1ad5d5b11594a6dba168a6a36d951f6bd551d45d9e42e4f57d6376ef9) | A432 |
| 2026/2/10 |   Chrorne0cdd-x64.exe    | **Win32/Malgent!MSR**  | 749e1e2345b5a6c236eec818b5a358a15a913da8eb569cdc1147d0307f6b7055 | 15d303c8-d152-47cf-9362-5b89e52512bc | [VirusTotal](https://www.virustotal.com/gui/search/749e1e2345b5a6c236eec818b5a358a15a913da8eb569cdc1147d0307f6b7055) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/749e1e2345b5a6c236eec818b5a358a15a913da8eb569cdc1147d0307f6b7055) | A433 |
| 2026/2/10 |    cloudflared···.exe    | **Win32/Malgent!MSR**  | c3232c7f77a8d126c696e362d943f07b714950e1012b38b3eb77982c5e2a06b5 | 275ef8b4-2a20-4af9-9553-f38e47a01242 | [VirusTotal](https://www.virustotal.com/gui/file/c3232c7f77a8d126c696e362d943f07b714950e1012b38b3eb77982c5e2a06b5) (35) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c3232c7f77a8d126c696e362d943f07b714950e1012b38b3eb77982c5e2a06b5) | A434 |
| 2026/2/11 |       Dwglyznr.msi       | **Win64/Malgent!MSR**  | 17fcec681ed933736cdfc468db18ec3599d8e9933b710fd93c34f2d004546b14 | bcd2f8cf-ec3b-473e-90e9-0f904cdecf8e | [VirusTotal](https://www.virustotal.com/gui/file/17fcec681ed933736cdfc468db18ec3599d8e9933b710fd93c34f2d004546b14) (4) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/17fcec681ed933736cdfc468db18ec3599d8e9933b710fd93c34f2d004546b14) | A435 |
| 2026/2/11 |   Hdtthihsevuio174.exe   | **Win32/Malgent!MSR**  | 4b8809d28249ef28e9f44703cb36d4524c41f2adc4b5f1f9a0f49485527f0f61 | 73aed06a-7035-4765-97f6-ffecb13fcd01 | [VirusTotal](https://www.virustotal.com/gui/file/4b8809d28249ef28e9f44703cb36d4524c41f2adc4b5f1f9a0f49485527f0f61) (4) |                              无                              | A436 |
| 2026/2/11 |    Yòydaofanyi···.msi    | **Win64/Malgent!MSR**  | 02ca96e74fbb21b957591968a28ff42e03834216469ed279364eea1d8306b9e3 | 10b42b6d-e56d-42b5-8850-49c44847c837 | [VirusTotal](https://www.virustotal.com/gui/file/02ca96e74fbb21b957591968a28ff42e03834216469ed279364eea1d8306b9e3) (3) |                              无                              | A437 |
| 2026/2/11 |  (macOS) dyrtvwjfve···   |   **MacOS/Amos.FB**    | 30f97ae88f8861eeadeb54854d47078724e52e2ef36dd847180663b7f5763168 | ccfe4b48-9241-44b8-bf2c-1f82130af161 | [VirusTotal](https://www.virustotal.com/gui/file/30f97ae88f8861eeadeb54854d47078724e52e2ef36dd847180663b7f5763168) (28) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/30f97ae88f8861eeadeb54854d47078724e52e2ef36dd847180663b7f5763168) | A438 |
| 2026/2/11 |        4XLZjC.exe        | **Win32/Malgent!MSR**  | 63bd2535fa047323b76cb578c8d57b16d568bc5aa3c39249ef7fde2448b336ce | 9b546e4d-27c8-440b-a335-c20837233ae3 | [VirusTotal](https://www.virustotal.com/gui/file/63bd2535fa047323b76cb578c8d57b16d568bc5aa3c39249ef7fde2448b336ce) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/63bd2535fa047323b76cb578c8d57b16d568bc5aa3c39249ef7fde2448b336ce) | A439 |
| 2026/2/11 |         7zip.zip         | **Win32/Malgent!MSR**  | b5e3ad616583063f776031205d751a5764c0ab015d5a4f7eb2577e9977a942c1 | 767971d5-4e0f-43e1-94a7-9fb83f93645d | [VirusTotal](https://www.virustotal.com/gui/file/b5e3ad616583063f776031205d751a5764c0ab015d5a4f7eb2577e9977a942c1) (35) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b5e3ad616583063f776031205d751a5764c0ab015d5a4f7eb2577e9977a942c1) | A440 |
| 2026/2/11 |     TodeskSetup1.exe     | **Win32/Malgent!MSR**  | d5e321d43fae7da1a3af0ff7fb74873cf830a6ca888cb76d0fac0689f9d86765 | 14cba417-b47e-486e-9533-613795401d7b | [VirusTotal](https://www.virustotal.com/gui/file/d5e321d43fae7da1a3af0ff7fb74873cf830a6ca888cb76d0fac0689f9d86765) (7) |                              无                              | A441 |
| 2026/2/11 |     TodeskSetup2.exe     | **Win32/Malgent!MSR**  | bf1d07548348dc5f59dd99439e42109c9438edd8f731ffd7722471c151fb5ab4 | 7eb64de7-827a-47b1-b854-8abd13ccb0fc | [VirusTotal](https://www.virustotal.com/gui/file/bf1d07548348dc5f59dd99439e42109c9438edd8f731ffd7722471c151fb5ab4) (5) |                              无                              | A442 |
| 2026/2/11 |     TodeskSetup3.exe     | **Win32/Malgent!MSR**  | 88697839ad414da2c38bb42014c78bf1a21ae7571646753e36507bd83a698aee | e7ff08af-7f4b-4776-931c-979134769997 | [VirusTotal](https://www.virustotal.com/gui/file/88697839ad414da2c38bb42014c78bf1a21ae7571646753e36507bd83a698aee) (9) |                              无                              | A443 |
| 2026/2/12 |   WPS···21171-xч64.exe   | **Win32/Malgent!MSR**  | 504e6b08006a791ed20ed67ec601fc968bec546e79be38c9e470e50d24fd4146 | 3c9b8938-76b1-4bd4-bfe4-a260c89642dd | [VirusTotal](https://www.virustotal.com/gui/file/504e6b08006a791ed20ed67ec601fc968bec546e79be38c9e470e50d24fd4146) (32) |                              无                              | A444 |
| 2026/2/12 |   WPS_office-2318.msi    | **Win32/Malgent!MSR**  | d6bd2f11c505695121a4bb826cab93b91070a8c86bef430eddbaca664b7bf424 | 71ce80fb-fbb7-4ea2-a96b-a561c0801352 | [VirusTotal](https://www.virustotal.com/gui/search/d6bd2f11c505695121a4bb826cab93b91070a8c86bef430eddbaca664b7bf424) (0) |                              无                              | A445 |
| 2026/2/12 |   WPS_office-6899.msi    | **Win32/Malgent!MSR**  | b3d91212406527d0ef62a5b6e9cb0abea93292a893cc6b5f1dbd09465da54c36 | e113ba87-4727-4879-84ff-122eaf44419c | [VirusTotal](https://www.virustotal.com/gui/file/b3d91212406527d0ef62a5b6e9cb0abea93292a893cc6b5f1dbd09465da54c36) (3) |                              无                              | A446 |
| 2026/2/12 |        77777.msi         | **Win32/Malgent!MSR**  | f007bc6c53e2995f5490418fac761a64a88e30d1d145a67f3954b8966d8db154 | 7c785529-0ab6-468d-95b3-0d456a2632c7 | [VirusTotal](https://www.virustotal.com/gui/file/f007bc6c53e2995f5490418fac761a64a88e30d1d145a67f3954b8966d8db154) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f007bc6c53e2995f5490418fac761a64a88e30d1d145a67f3954b8966d8db154) | A447 |
| 2026/2/12 |        88888.exe         | **Win32/Malgent!MSR**  | 003734348d05ac8087c497c214bd871355b168e41c9ee8d5aa5fcfcdbe6c8a89 | 3e06e94f-c76c-4fff-8ad5-3970e52a0f44 | [VirusTotal](https://www.virustotal.com/gui/file/003734348d05ac8087c497c214bd871355b168e41c9ee8d5aa5fcfcdbe6c8a89) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/003734348d05ac8087c497c214bd871355b168e41c9ee8d5aa5fcfcdbe6c8a89) | A448 |
| 2026/2/12 |        99999.msi         | **Win32/Malgent!MSR**  | d62975d9c56bfcf182d2341c7cf01ea07503b3a00d2d89bc77274d779973de9c | 8819df63-bb90-4c64-8421-ca86b7b0b039 | [VirusTotal](https://www.virustotal.com/gui/file/d62975d9c56bfcf182d2341c7cf01ea07503b3a00d2d89bc77274d779973de9c) (8) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d62975d9c56bfcf182d2341c7cf01ea07503b3a00d2d89bc77274d779973de9c) | A449 |
| 2026/2/13 |       5.13dasd.exe       | **Win32/Malgent!MSR**  | 76d4142469fe6f8d1743fee5a3a38de3dc9ffe243f89479b99e90172005d5b72 | c0da19d5-c337-458c-914f-0b30c23e95cc | [VirusTotal](https://www.virustotal.com/gui/file/76d4142469fe6f8d1743fee5a3a38de3dc9ffe243f89479b99e90172005d5b72) (32) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/76d4142469fe6f8d1743fee5a3a38de3dc9ffe243f89479b99e90172005d5b72) | A450 |
| 2026/2/13 |       LetsVPN.exe        | **Win32/Malgent!MSR**  | 32f8ef122fe29ab7a4cb40a75aef68314c37cbca96b3bf63032170db1d9cb9c5 | 7de6fa02-e35d-41be-9a08-3c57ddebc5a8 | [VirusTotal](https://www.virustotal.com/gui/file/32f8ef122fe29ab7a4cb40a75aef68314c37cbca96b3bf63032170db1d9cb9c5) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/32f8ef122fe29ab7a4cb40a75aef68314c37cbca96b3bf63032170db1d9cb9c5) | A451 |
| 2026/2/13 |     output_86···.exe     | **Win32/Malgent!MSR**  | 516201070aaa2085711cd65d71b59ae200cd1894a7b2f28a7c1ee4560fb6d5ae | d8aa0bab-9ee8-4bc6-8b27-79264f8ddf2b | [VirusTotal](https://www.virustotal.com/gui/file/516201070aaa2085711cd65d71b59ae200cd1894a7b2f28a7c1ee4560fb6d5ae) (32) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/516201070aaa2085711cd65d71b59ae200cd1894a7b2f28a7c1ee4560fb6d5ae) | A452 |
| 2026/2/13 |       zetarink.exe       |         研究中         | 904cee06bbc6093213e8653b120b2b72701bac7e8dbfbdd69bfb3aed9b6a7298 |                                      | [VirusTotal](https://www.virustotal.com/gui/file/904cee06bbc6093213e8653b120b2b72701bac7e8dbfbdd69bfb3aed9b6a7298) (22) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/904cee06bbc6093213e8653b120b2b72701bac7e8dbfbdd69bfb3aed9b6a7298) | A453 |
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
| 2026/2/11 |           hxxps://wps-online[.]cn           |    仿冒 WPS、传播病毒    | hxxps://official-package[.]wpscdn[.]cn/wps/download/WPS_Setup_24657[.]exe |                            无                            | Z122 |
| 2026/2/11 |    hxxps://www[.]jinshan-wps[.]com[.]cn     |    仿冒 WPS、传播病毒    |       hxxps://hjekd8c[.]huowdy[.]com/WPS_office[.]zip        | [URLhaus Database](https://urlhaus.abuse.ch/url/3775978) | Z123 |
| 2026/2/11 |          hxxps://pp-wps[.]com[.]cn          |    仿冒 WPS、传播病毒    |                              无                              |                            无                            | Z124 |
| 2026/2/11 |          hxxps://www[.]wpspt[.]com          |    仿冒 WPS、传播病毒    |                              有                              |                            无                            | Z125 |
| 2026/2/11 |         hxxps://sgp-wps[.]com[.]cn          |    仿冒 WPS、传播病毒    | hxxps://wps01[.]oss-cn-hongkong[.]aliyuncs[.]com/WPS_Setup_17147_1[.]3[.]zip |                            无                            | Z126 |
| 2026/2/11 |        hxxps://ofice-wps[.]com[.]cn         |    仿冒 WPS、传播病毒    |       hxxps://hjekd8c[.]huowdy[.]com/WPS_office[.]zip        | [URLhaus Database](https://urlhaus.abuse.ch/url/3775978) | Z127 |
| 2026/2/11 |             hxxps://cn-wps[.]cc             |    仿冒 WPS、传播病毒    |                              有                              |                            无                            | Z128 |
| 2026/2/11 |       hxxps://www[.]ce-wps[.]com[.]cn       |    仿冒 WPS、传播病毒    |                              有                              |                            无                            | Z129 |
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