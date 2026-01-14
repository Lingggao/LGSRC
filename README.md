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

&emsp;&emsp;上次更新时间：2026 年 1 月 14 日 12:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 1 月 14 日，已打击计算机病毒 / 恶意软件 205 个、恶意网站 48 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |           文件名           |          检测           |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :------------------------: | :---------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/1/10 |      MSTeams-9447.msi      |  **Win32/Malgent!MSR**  | 9fc3f163eefdc65cc1ebb9bc062e32c6a67f30c66cb87a2604e6cca7d0af3a59 | b36fb7c5-ddfe-43d6-b9c9-41f06c10c0b5 | [VirusTotal](https://www.virustotal.com/gui/file/9fc3f163eefdc65cc1ebb9bc062e32c6a67f30c66cb87a2604e6cca7d0af3a59) (18) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/9fc3f163eefdc65cc1ebb9bc062e32c6a67f30c66cb87a2604e6cca7d0af3a59) | A177 |
| 2026/1/10 |     MSTeaчmsSetup.exe      |  **Win32/Malgent!MSR**  | bd4b6b06319652aa38165f8ac1ffd6face784fe2ef9efd691f85b3e77aaece3a | b36fb7c5-ddfe-43d6-b9c9-41f06c10c0b5 | [VirusTotal](https://www.virustotal.com/gui/file/bd4b6b06319652aa38165f8ac1ffd6face784fe2ef9efd691f85b3e77aaece3a) (5) |                              无                              | A178 |
| 2026/1/10 | ···内职人员违纪名单···.exe | **Win32/Wacatac.H!ml**  | d1a56b552e30f05fb06ee8316630dbad0f2cd5903c16dbb7005c4e2c461a339d |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/d1a56b552e30f05fb06ee8316630dbad0f2cd5903c16dbb7005c4e2c461a339d) (15) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d1a56b552e30f05fb06ee8316630dbad0f2cd5903c16dbb7005c4e2c461a339d) | A179 |
| 2026/1/10 | ···内职人员违纪名单···.exe | **Win32/Wacatac.H!ml**  | d56ca4df7133c30ca291575fb2ad25ce04653083d92ab53a83221501682bd374 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/d56ca4df7133c30ca291575fb2ad25ce04653083d92ab53a83221501682bd374) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d56ca4df7133c30ca291575fb2ad25ce04653083d92ab53a83221501682bd374) | A180 |
| 2026/1/10 |   ···违规内职人员···.exe   | **Win32/Wacatac.H!ml**  | 8a330b78954bcc3befbc4702617a61f201d874b57551928e795b2e70330e1a38 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/8a330b78954bcc3befbc4702617a61f201d874b57551928e795b2e70330e1a38) (18) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/8a330b78954bcc3befbc4702617a61f201d874b57551928e795b2e70330e1a38) | A181 |
| 2026/1/10 |        jkgnhfg.exe         | **Win32/Wacatac.H!ml**  | 1c43c45953eed9da909a0bb1e17849065e2c5bbae04270d826e345adae4aefa3 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/1c43c45953eed9da909a0bb1e17849065e2c5bbae04270d826e345adae4aefa3) (12) |                              无                              | A182 |
| 2026/1/10 |    ydWin-Latest···.exe     | **Win32/Wacatac.F!ml**  | 29e89a4de4fda091ecb2084694054671dad8f97f3bff4e9dd89ee13afaf192d0 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/29e89a4de4fda091ecb2084694054671dad8f97f3bff4e9dd89ee13afaf192d0) (8) |                              无                              | A183 |
| 2026/1/10 |   YoudaofanyiDict···.exe   | **Win32/Wacatac.H!ml**  | 23841ec432b298ffb53f4236b551583a68fc2c528ed7b4c81e06a07351c5966b |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/23841ec432b298ffb53f4236b551583a68fc2c528ed7b4c81e06a07351c5966b) (7) |                              无                              | A184 |
| 2026/1/11 |         222222.msi         | **Script/Wacatac.C!ml** | 2e6bc16d6ec33fbdcea0dd3cd3787bb2eccd2b3508fefd3f5ea09f172ff0bee4 | da95828c-15e3-4058-b0d1-93050fa11158 | [VirusTotal](https://www.virustotal.com/gui/file/2e6bc16d6ec33fbdcea0dd3cd3787bb2eccd2b3508fefd3f5ea09f172ff0bee4) (11) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/2e6bc16d6ec33fbdcea0dd3cd3787bb2eccd2b3508fefd3f5ea09f172ff0bee4) | A185 |
| 2026/1/11 |   Nightware_release.dll    |  **Win32/Kepavll!rfn**  | 373f6fc056779d6451b0f5171f7241f569620fef89d54a747c779ad023a204f6 | 30f95f9c-b2eb-4474-918f-9f342d4d4bcf | [VirusTotal](https://www.virustotal.com/gui/file/373f6fc056779d6451b0f5171f7241f569620fef89d54a747c779ad023a204f6) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/373f6fc056779d6451b0f5171f7241f569620fef89d54a747c779ad023a204f6) | A186 |
| 2026/1/11 |       let-latest.exe       |  **Win32/Malgent!MSR**  | e79763021dfd50d9bd6594ef254479cee81522438718059725e998bedb95649d | edf53130-34fd-4d7b-b75d-c5ec59829b15 | [VirusTotal](https://www.virustotal.com/gui/file/e79763021dfd50d9bd6594ef254479cee81522438718059725e998bedb95649d) (6) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e79763021dfd50d9bd6594ef254479cee81522438718059725e998bedb95649d) | A187 |
| 2026/1/11 |      letsvpnSbing.exe      |  **Win64/Malgent!MSR**  | ba3e9f942d19cf6602497b17241249c441ade2d420cc90e43034ff38db4471c5 | edf53130-34fd-4d7b-b75d-c5ec59829b15 | [VirusTotal](https://www.virustotal.com/gui/file/ba3e9f942d19cf6602497b17241249c441ade2d420cc90e43034ff38db4471c5) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ba3e9f942d19cf6602497b17241249c441ade2d420cc90e43034ff38db4471c5) | A188 |
| 2026/1/11 |         sogou.exe          |  **Win32/Malgent!MSR**  | 8f43636d122c558d88e3ea6cb493d82a7e8aff40cc692171b58861dba0bbb285 | 7f615f78-7dff-4146-8d42-64232cd3a989 | [VirusTotal](https://www.virustotal.com/gui/file/8f43636d122c558d88e3ea6cb493d82a7e8aff40cc692171b58861dba0bbb285) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/8f43636d122c558d88e3ea6cb493d82a7e8aff40cc692171b58861dba0bbb285) | A189 |
| 2026/1/12 |    vvps-ll-ws.1.2.3.exe    |  **Win32/Malgent!MSR**  | a0537660d4bf981d2f0f39e4caa99a78ae8a59e4f654b1a501adf35c565b5e92 | c0881423-e0e7-4f44-9258-6a84cdab8361 | [VirusTotal](https://www.virustotal.com/gui/file/a0537660d4bf981d2f0f39e4caa99a78ae8a59e4f654b1a501adf35c565b5e92) (5) |                              无                              | A190 |
| 2026/1/12 |       WPS_office.msi       | **Script/Wacatac.C!ml** | 19b940c0a8600ed1b3d2e93aada7dc4e5327925b20983a5d3cb159f4eba98fb2 | 47aa4c73-5056-49d7-a44f-427d997ce34a | [VirusTotal](https://www.virustotal.com/gui/file/19b940c0a8600ed1b3d2e93aada7dc4e5327925b20983a5d3cb159f4eba98fb2) (3) |                              无                              | A191 |
| 2026/1/12 |       WPS_Setup.msi        |  **Win32/Malgent!MSR**  | 7ff248e43af6defb6a7e1d38d6440563f711967d920d337d11f1a6362fb28f59 | a6f01060-56e9-4432-9de6-9b765296f041 | [VirusTotal](https://www.virustotal.com/gui/file/7ff248e43af6defb6a7e1d38d6440563f711967d920d337d11f1a6362fb28f59) (8) |                              无                              | A192 |
| 2026/1/12 |    WPS_Sietup_4725.exe     |  **Win32/Malgent!MSR**  | 5f118b24f8b3f8dc46d2df2330ed0a65481d9c43f259679ee9103360ee339fa5 | 7cd984d2-8b74-41af-ada2-7cf14d92c0fa | [VirusTotal](https://www.virustotal.com/gui/file/5f118b24f8b3f8dc46d2df2330ed0a65481d9c43f259679ee9103360ee339fa5) (16) |                              无                              | A193 |
| 2026/1/12 |   Youdao···fanyi···.exe    |  **Win64/Malgent!MSR**  | bf667dd1ed58c458603e3aa51758e3178e3e40f7f03b4f7ed295739fdaaf9a4f | 818fb4be-68e1-4cc6-9488-2e9ef41a84a5 | [VirusTotal](https://www.virustotal.com/gui/file/bf667dd1ed58c458603e3aa51758e3178e3e40f7f03b4f7ed295739fdaaf9a4f) (19) |                              无                              | A194 |
| 2026/1/12 |       installer2.exe       | **Win32/Wacatac.H!ml**  | c9a756ab2e92496f25123f6be368ed0e00e834b59cb671313541b35d9f58c1e7 | 6ba7eb78-1c32-438c-8d4d-a8a43855e23b | [VirusTotal](https://www.virustotal.com/gui/file/c9a756ab2e92496f25123f6be368ed0e00e834b59cb671313541b35d9f58c1e7) (23) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c9a756ab2e92496f25123f6be368ed0e00e834b59cb671313541b35d9f58c1e7) | A195 |
| 2026/1/12 |           ma.exe           | **Win32/Wacatac.H!ml**  | 45f02409a587411a0c3411d1a70c75f7eab801e6158efc24b4a0eb464906c816 | 9aaf273e-036e-4239-8d92-57098a9aabb8 | [VirusTotal](https://www.virustotal.com/gui/file/45f02409a587411a0c3411d1a70c75f7eab801e6158efc24b4a0eb464906c816) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/45f02409a587411a0c3411d1a70c75f7eab801e6158efc24b4a0eb464906c816) | A196 |
| 2026/1/12 |    款式_20251231···.exe    | **Win32/Wacatac.H!ml**  | 2433d08babdaa7ae1d61bfa55913e75d0cafb37a8cdf37703d7caddf4a36d993 | 19572fdd-f4e5-4432-bdb0-4572c3208961 | [VirusTotal](https://www.virustotal.com/gui/file/2433d08babdaa7ae1d61bfa55913e75d0cafb37a8cdf37703d7caddf4a36d993) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/2433d08babdaa7ae1d61bfa55913e75d0cafb37a8cdf37703d7caddf4a36d993) | A197 |
| 2026/1/12 |          eqsN.exe          | **PureLogStealer.RVA**  | 24d264c5b777a6a199916aa7afa32e92358aa9d13e695035a2b18285facdab0e | a9f4ab0c-47e8-4557-b58f-fd5d29b0488e | [VirusTotal](https://www.virustotal.com/gui/file/24d264c5b777a6a199916aa7afa32e92358aa9d13e695035a2b18285facdab0e) (26) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/24d264c5b777a6a199916aa7afa32e92358aa9d13e695035a2b18285facdab0e) | A198 |
| 2026/1/12 |       chromeX_64.exe       |  **Win32/Malgent!MSR**  | 11f61b765f5b70c176bae9420d9f2a399a6aff8d38fc9dd3c68fa066f06d1c62 | 2db71973-9cfc-4c4e-8bd5-356e83e5aebc | [VirusTotal](https://www.virustotal.com/gui/file/11f61b765f5b70c176bae9420d9f2a399a6aff8d38fc9dd3c68fa066f06d1c62) (7) |                              无                              | A199 |
| 2026/1/13 |   财务部固定资产台账.exe   | **Win32/Wacatac.H!ml**  | 89fab2f1675210d76d997897f14f60b1bfdf73726e96f8aab9203c24cea27460 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/89fab2f1675210d76d997897f14f60b1bfdf73726e96f8aab9203c24cea27460) (22) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/89fab2f1675210d76d997897f14f60b1bfdf73726e96f8aab9203c24cea27460) | A200 |
| 2026/1/13 |    RVtools-4.7.0.2.msi     |   **Win32/Vigorf.A**    | ee0f0f2f089ee0594da5750bb4e342c34d703ea045ed80c3b73c81d2f3de8bd4 | 1f736c18-e061-418e-99b5-2776a680b277 | [VirusTotal](https://www.virustotal.com/gui/file/ee0f0f2f089ee0594da5750bb4e342c34d703ea045ed80c3b73c81d2f3de8bd4) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ee0f0f2f089ee0594da5750bb4e342c34d703ea045ed80c3b73c81d2f3de8bd4) | A201 |
| 2026/1/13 |     Setup12.2-1208.msi     | **Script/Wacatac.C!ml** | c7d7dfa9d33f18eee6b6459fd39473caeb42dfd5d8f198443935e07d0575b5b9 | 0fc5ae52-43a2-4ce1-8b88-af84be397f18 | [VirusTotal](https://www.virustotal.com/gui/file/c7d7dfa9d33f18eee6b6459fd39473caeb42dfd5d8f198443935e07d0575b5b9) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c7d7dfa9d33f18eee6b6459fd39473caeb42dfd5d8f198443935e07d0575b5b9) | A202 |
| 2026/1/14 |     精聊思路必看：.bat     |  **Win32/Egairtigado**  | 5b2c762d82cd1a07170719fdd5c5c9a00592ea6164513d9d0642bce84c1221b7 | 1872db7d-2da5-453a-93b3-a6fa38d4a8f8 | [VirusTotal](https://www.virustotal.com/gui/file/5b2c762d82cd1a07170719fdd5c5c9a00592ea6164513d9d0642bce84c1221b7) (41) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5b2c762d82cd1a07170719fdd5c5c9a00592ea6164513d9d0642bce84c1221b7) | A203 |
| 2026/1/14 |    sogou_pinyin···.exe     |  **Win32/Malgent!MSR**  | 6af981e75f136f051e738f5bc8ec1be42afc24b1b520c1dd5c7a7d603766c678 | 1872db7d-2da5-453a-93b3-a6fa38d4a8f8 | [VirusTotal](https://www.virustotal.com/gui/file/6af981e75f136f051e738f5bc8ec1be42afc24b1b520c1dd5c7a7d603766c678) (15) |                              无                              | A204 |
| 2026/1/14 |         duilib.dll         |  **Win32/Kepavll!rfn**  | 03c2632bc7ae92e409c063e4f260b1a7199ff6cdd7ba0b0455fd1947afe79b99 | dc4718ab-e7c7-48ad-9353-216f612dd04d | [VirusTotal](https://www.virustotal.com/gui/file/03c2632bc7ae92e409c063e4f260b1a7199ff6cdd7ba0b0455fd1947afe79b99) (45) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/03c2632bc7ae92e409c063e4f260b1a7199ff6cdd7ba0b0455fd1947afe79b99) | A205 |
|  ——————   |        ————————————        |      ————————————       |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---
【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期    |                  URL                   |            类别             |                           有效载荷                           |                         URLhaus                          | 编号 |
| :-------: | :------------------------------------: | :-------------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/1/6  |    hxxps://www[.]cc-aisi[.]com[.]cn    |   仿冒爱思助手、传播病毒    |   hxxps://anzhuang-cn[.]top/busha/i4/aisiloemzushuI4[.]zip   |                            无                            | Z018 |
| 2026/1/6  |         hxxps://i4zhushou[.]cn         |   仿冒爱思助手、传播病毒    |                              无                              |                            无                            | Z019 |
| 2026/1/6  |       hxxps://i4zhus[.]com[.]cn        |   仿冒爱思助手、传播病毒    | hxxps://i4zhus[.]com[.]cn/i4Tools_v9[.]02[.]035_Setup_x64[.]exe |                            无                            | Z020 |
| 2026/1/6  |    hxxps://i4aisizhushou[.]com[.]cn    |   仿冒爱思助手、传播病毒    | hxxps://ioansos-1373170392[.]cos[.]ap-guangzhou[.]myqcloud[.]com/v9[.]06[.]018_Setup[.]zip |                            无                            | Z021 |
| 2026/1/6  |       hxxps://www[.]360ccm[.]com       | 仿冒 360 安全卫士、传播病毒 | hxxps://pub-8bf10830d4fa42d3a538fa7b302d55b3[.]r2[.]dev/whtfhtyhg%20(1)[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3751295) | Z022 |
| 2026/1/6  |       hxxps://xiazaiabcd7[.]cyou       | 仿冒 360 安全卫士、传播病毒 | hxxps://pub-8bf10830d4fa42d3a538fa7b302d55b3[.]r2[.]dev/whtfhtyhg%20(1)[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3751295) | Z023 |
| 2026/1/6  |      hxxps://webyoudao[.]com[.]cn      |   仿冒有道翻译、传播病毒    |                              无                              |                            无                            | Z024 |
| 2026/1/6  |      hxxps://cn-youdao[.]com[.]cn      |   仿冒有道翻译、传播病毒    | hxxps://youdao-cn[.]oss-cn-hongkong[.]aliyuncs[.]com/Youlets-stup1[.]7[.]79[.]zip |                            无                            | Z025 |
| 2026/1/6  |     hxxps://apps-youdao[.]com[.]cn     |   仿冒有道翻译、传播病毒    | hxxps://hk-vip-oss-20251231[.]oss-cn-hongkong[.]aliyuncs[.]com/0106/YoudaoDict__X64[.]5[.]8[.]2[.]exe |                            无                            | Z026 |
| 2026/1/6  |    hxxps://fanyi-youdao[.]com[.]cn     |   仿冒有道翻译、传播病毒    | hxxps://hk-vip-oss-20251231[.]oss-cn-hongkong[.]aliyuncs[.]com/0106/YoudaoDict__X64[.]5[.]8[.]2[.]exe |                            无                            | Z027 |
| 2026/1/6  |     hxxps://www[.]cp-youdao[.]com      |   仿冒有道翻译、传播病毒    |                              无                              |                            无                            | Z028 |
| 2026/1/9  |    hxxps://pinyin-sogou[.]com[.]cn     |  仿冒搜狗输入法、传播病毒   |     hxxps://jkemdr[.]hoyenoy[.]com/shurufa15[.]12[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3753789) | Z029 |
| 2026/1/9  | hxxps://sougoupinyin-cn[.]com/download |  仿冒搜狗输入法、传播病毒   |                              无                              |                            无                            | Z030 |
| 2026/1/9  |         hxxps://ai-sogou[.]com         |  仿冒搜狗输入法、传播病毒   | hxxps://apps-sogou[.]com/downloads/windows/SsogSgooun[.]guanwang[.]1[.]5[.]8[.]exe | [URLhaus Database](https://urlhaus.abuse.ch/url/3753788) | Z031 |
| 2026/1/9  | hxxps://sogoushurufa-sogou[.]com[.]cn  |  仿冒搜狗输入法、传播病毒   |     hxxps://jkemdr[.]hoyenoy[.]com/shurufa15[.]12[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3753789) | Z032 |
| 2026/1/9  |        hxxps://pc-sougous[.]com        |  仿冒搜狗输入法、传播病毒   |                              无                              |                            无                            | Z033 |
| 2026/1/9  | hxxps://zhcn-sougoushurufa[.]com[.]cn  |  仿冒搜狗输入法、传播病毒   |                              无                              |                            无                            | Z034 |
| 2026/1/9  |       hxxps://cnzh-sougou[.]com        |  仿冒搜狗输入法、传播病毒   |     hxxps://jkemdr[.]hoyenoy[.]com/shurufa15[.]12[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3753789) | Z035 |
| 2026/1/9  |       hxxps://shouji-sogou[.]com       |  仿冒搜狗输入法、传播病毒   | hxxps://apps-sogou[.]com/downloads/windows/SsogSgooun[.]guanwang[.]1[.]5[.]8[.]exe | [URLhaus Database](https://urlhaus.abuse.ch/url/3753788) | Z036 |
| 2026/1/10 |     hxxps://www[.]app-teams[.]com      |    仿冒 Teams、传播病毒     | hxxps://xinjuiogh[.]oss-cn-hongkong[.]aliyuncs[.]com/MSTea%D1%87msSetup[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3754717) | Z037 |
| 2026/1/10 |      hxxps://teams-app[.]com[.]cn      |    仿冒 Teams、传播病毒     |        hxxps://lkejxfss[.]hoyenoy[.]com/MSTeams[.]zip        | [URLhaus Database](https://urlhaus.abuse.ch/url/3754716) | Z038 |
| 2026/1/10 |      hxxps://www[.]teamscn[.]com       |    仿冒 Teams、传播病毒     | hxxps://xinjuiogh[.]oss-cn-hongkong[.]aliyuncs[.]com/MSTea%D1%87msSetup[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3754717) | Z039 |
| 2026/1/11 |  hxxps://www[.]zh-letsvpn[.]com[.]cn   |    借助 VPN 工具传播病毒    | hxxps://lmf2110[.]oss-ap-southeast-1[.]aliyuncs.com/letsvpnSbing[.]zip |                            无                            | Z040 |
| 2026/1/11 |  hxxps://www[.]nf-letsvpn[.]com[.]cn   |    借助 VPN 工具传播病毒    |                              无                              |                            无                            | Z041 |
| 2026/1/11 |      hxxps://www[.]lets-vpn[.]dev      |    借助 VPN 工具传播病毒    | hxxps://www[.]kuaipan[.]org/download_share[.]php?code=6p9K3B8T6lejg3BX&download=1 |                            无                            | Z042 |
| 2026/1/12 |       hxxps://desktop-wps[.]com        |     仿冒 WPS、传播病毒      | hxxps://desktop-wps[.]com/downloads/windows/vvps-ll-ws[.]1[.]2[.]3[.]exe |                            无                            | Z043 |
| 2026/1/12 |    hxxps://apps-wps[.]com/download     |     仿冒 WPS、传播病毒      | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/WPS_Sietup_4725[.]zip |                            无                            | Z044 |
| 2026/1/12 |       hxxps://off-wps[.]com[.]cn       |     仿冒 WPS、传播病毒      |       hxxps://hjekd8c[.]hoyenoy[.]com/WPS_office[.]zip       |                            无                            | Z045 |
| 2026/1/12 |       hxxps://wps-wp[.]com[.]cn        |     仿冒 WPS、传播病毒      |       hxxps://hjekd8c[.]hoyenoy[.]com/WPS_office[.]zip       |                            无                            | Z046 |
| 2026/1/12 |    hxxps://www[.]cp-wps[.]com[.]cn     |     仿冒 WPS、传播病毒      |       hxxps://www[.]cp-wps[.]com[.]cn/WPS_Setup[.]zip        |                            无                            | Z047 |
| 2026/1/13 |     hxxps://ing-google[.]com[.]cn      |    仿冒 Chrome、传播病毒    |      hxxps://olekndx[.]hoyenoy[.]com/Setup12[.]2[.]zip       |                            无                            | Z048 |
|  ——————   |          ————————————————————          |       ———————————————       |                ——————————————————————————————                |                        ——————————                        | ———  |

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