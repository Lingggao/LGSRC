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

&emsp;&emsp;上次更新时间：2026 年 1 月 21 日 3:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 1 月 21 日，已打击计算机病毒 / 恶意软件 251 个、恶意网站 64 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |          文件名          |          检测           |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :----------------------: | :---------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/1/18 |     Chromeab-x64.exe     |  **Win32/Malgent!MSR**  | 9f843b6ded045fb017abd2144837a9985b12abc4f5df3fa789ad976fd61209b6 | eeabda23-6f4e-4487-8c63-b2132d526a8f | [VirusTotal](https://www.virustotal.com/gui/file/9f843b6ded045fb017abd2144837a9985b12abc4f5df3fa789ad976fd61209b6) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/9f843b6ded045fb017abd2144837a9985b12abc4f5df3fa789ad976fd61209b6) | A224 |
| 2026/1/18 |      LetaVmP-64.exe      |  **Win32/Malgent!MSR**  | 151d1efff2d7867e50717283dbd72f965bccd893a5e3fe56c412c8c692bb06aa | d6bc6bf8-f485-4e82-8da8-07df5b65c3a6 | [VirusTotal](https://www.virustotal.com/gui/file/151d1efff2d7867e50717283dbd72f965bccd893a5e3fe56c412c8c692bb06aa) (11) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/151d1efff2d7867e50717283dbd72f965bccd893a5e3fe56c412c8c692bb06aa) | A225 |
| 2026/1/18 |     LetwVqP-x64.exe      |  **Win32/Malgent!MSR**  | 7707446f34ddad80b4617e6d7956fcacac4884234d8f2cd64ac3ca92bbc84ad4 | d6bc6bf8-f485-4e82-8da8-07df5b65c3a6 | [VirusTotal](https://www.virustotal.com/gui/file/7707446f34ddad80b4617e6d7956fcacac4884234d8f2cd64ac3ca92bbc84ad4) (3) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/7707446f34ddad80b4617e6d7956fcacac4884234d8f2cd64ac3ca92bbc84ad4) | A226 |
| 2026/1/18 |         Ass.exe          |  **Win32/Malgent!MSR**  | 088858ce0bb1243fbad91959b802cbf7cfce2437e28b8146319a751d98fa3ee6 | c12b451b-e184-4ec0-b0a4-153f8ebcccbc | [VirusTotal](https://www.virustotal.com/gui/file/088858ce0bb1243fbad91959b802cbf7cfce2437e28b8146319a751d98fa3ee6) (6) |                              无                              | A227 |
| 2026/1/18 |         Qss.exe          |  **Win32/Malgent!MSR**  | b6804b75a6505cc9b403b26cc387ec6aea450766441d7d21e54cce3e224328f0 | c12b451b-e184-4ec0-b0a4-153f8ebcccbc | [VirusTotal](https://www.virustotal.com/gui/file/b6804b75a6505cc9b403b26cc387ec6aea450766441d7d21e54cce3e224328f0) (11) |                              无                              | A228 |
| 2026/1/18 |         Wxl.exe          |  **Win32/Malgent!MSR**  | ed9059122624ae557738d80af15bcee9e68b8e6b779f15cc317777bc62435229 | c12b451b-e184-4ec0-b0a4-153f8ebcccbc | [VirusTotal](https://www.virustotal.com/gui/file/ed9059122624ae557738d80af15bcee9e68b8e6b779f15cc317777bc62435229) (6) |                              无                              | A229 |
| 2026/1/18 | ···第四季度现金流···.exe |  **Win32/Malgent!MSR**  | 5e217d93abdbbcf93d8f2106a72d67a3642a9df28f5a705be7ec6b9955aa62bb | e592673f-7fb9-4814-9df5-7d1cd1bcafb9 | [VirusTotal](https://www.virustotal.com/gui/file/5e217d93abdbbcf93d8f2106a72d67a3642a9df28f5a705be7ec6b9955aa62bb) (22) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5e217d93abdbbcf93d8f2106a72d67a3642a9df28f5a705be7ec6b9955aa62bb) | A230 |
| 2026/1/18 |     vue2迁移工具.exe     |   **Win32/Wacapew.C**   | e871a6faeb2baa0b10e657a7d0b02f2d669cdc03ba83cf7f4b2095d229ecf0d3 | d82d2701-7a21-420b-b01d-95d406dc1820 | [VirusTotal](https://www.virustotal.com/gui/file/e871a6faeb2baa0b10e657a7d0b02f2d669cdc03ba83cf7f4b2095d229ecf0d3) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e871a6faeb2baa0b10e657a7d0b02f2d669cdc03ba83cf7f4b2095d229ecf0d3) | A231 |
| 2026/1/19 |    free_phonecall.exe    |  **Win32/Malgent!MSR**  | 43600a3a48b27af5a0eeead5357aba0a541585a54040d071a7f3a94188b9994d | 22c6279c-47bd-414f-9b4f-5cba20214196 | [VirusTotal](https://www.virustotal.com/gui/file/43600a3a48b27af5a0eeead5357aba0a541585a54040d071a7f3a94188b9994d) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/43600a3a48b27af5a0eeead5357aba0a541585a54040d071a7f3a94188b9994d) | A232 |
| 2026/1/19 |       BQTLock.exe        |   **BQTLock.MG!MTB**    | 3857744a651da4e431083180798041a5e888b09334a1a04c2c047216f471b0f6 | 695def5d-a477-4d26-a554-97472de2a17a | [VirusTotal](https://www.virustotal.com/gui/file/3857744a651da4e431083180798041a5e888b09334a1a04c2c047216f471b0f6) (26) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/3857744a651da4e431083180798041a5e888b09334a1a04c2c047216f471b0f6) | A233 |
| 2026/1/19 | 公司冬日饮品订购···.exe  |  **Win32/Malgent!MSR**  | 74145543209fc59628929934407d4c889e643c9cb90162cc5709b526c515df09 | 6d215f37-de9c-435e-80f3-1b24e0de2f9c | [VirusTotal](https://www.virustotal.com/gui/file/74145543209fc59628929934407d4c889e643c9cb90162cc5709b526c515df09) (31) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/74145543209fc59628929934407d4c889e643c9cb90162cc5709b526c515df09) | A234 |
| 2026/1/19 |   dingtalk···xч64.exe    |  **Win32/Malgent!MSR**  | 94410509bb5ff92426768ce7bb5b85f85680e556cc2563ebc37776b092710a6e | 89c6bf29-6838-4350-a2f0-45ad261d3836 | [VirusTotal](https://www.virustotal.com/gui/file/94410509bb5ff92426768ce7bb5b85f85680e556cc2563ebc37776b092710a6e) (39) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/94410509bb5ff92426768ce7bb5b85f85680e556cc2563ebc37776b092710a6e) | A235 |
| 2026/1/19 |      output_64.exe       |   **Farfli.LMA!MTB**    | ffd02254edd6096f29de1cb946c79d621c553ff39b61ae4270a9e997b3818d8c | e4eaa456-ec88-4ccd-be4a-da25cabfe944 | [VirusTotal](https://www.virustotal.com/gui/file/ffd02254edd6096f29de1cb946c79d621c553ff39b61ae4270a9e997b3818d8c) (38) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ffd02254edd6096f29de1cb946c79d621c553ff39b61ae4270a9e997b3818d8c) | A236 |
| 2026/1/19 |    64位安装包···.exe     |  **Win32/Malgent!MSR**  | 019e0ded6cc8e5524f78fed06f17c3ac00222b5c0204a6ce2691a2775699846e | 7f7671a4-073e-482a-b84a-cbfb8b544cc7 | [VirusTotal](https://www.virustotal.com/gui/file/019e0ded6cc8e5524f78fed06f17c3ac00222b5c0204a6ce2691a2775699846e) (11) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/019e0ded6cc8e5524f78fed06f17c3ac00222b5c0204a6ce2691a2775699846e) | A237 |
| 2026/1/19 |      O-lib2.4.2.exe      |  **Win32/Malgent!MSR**  | 80199ca7e84bcda6b9c669bd2466ca65da0278668d13e861af41119bfc1f9722 | a79ab1a2-6347-48da-89c4-8973119e04c5 | [VirusTotal](https://www.virustotal.com/gui/file/80199ca7e84bcda6b9c669bd2466ca65da0278668d13e861af41119bfc1f9722) (14) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/80199ca7e84bcda6b9c669bd2466ca65da0278668d13e861af41119bfc1f9722) | A238 |
| 2026/1/19 |      O-lib2.4.3.exe      |  **Win32/Malgent!MSR**  | 2d5d64823d83a1334ab64b37dcd02e9f07bf565b59ed8eea3b22094235b65cd9 | a79ab1a2-6347-48da-89c4-8973119e04c5 | [VirusTotal](https://www.virustotal.com/gui/file/2d5d64823d83a1334ab64b37dcd02e9f07bf565b59ed8eea3b22094235b65cd9) (4) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/2d5d64823d83a1334ab64b37dcd02e9f07bf565b59ed8eea3b22094235b65cd9) | A239 |
| 2026/1/19 |      O-lib2.4.4.exe      |  **Win64/Malgent!MSR**  | 3ddcdf98390d2786d67835f333aa86524f5b826a9b6fde596fa33d0b782dc1e7 | a79ab1a2-6347-48da-89c4-8973119e04c5 | [VirusTotal](https://www.virustotal.com/gui/file/3ddcdf98390d2786d67835f333aa86524f5b826a9b6fde596fa33d0b782dc1e7) (8) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/3ddcdf98390d2786d67835f333aa86524f5b826a9b6fde596fa33d0b782dc1e7) | A240 |
| 2026/1/19 |        Chrome.exe        | **Win32/Sonbokli.A!cl** | 276c62189026b2f7b4a4d0b35c3d37abf2fada50883e48cd4ae757d3f432af11 | dacfc623-7ae8-43c2-b140-16fa836556b4 | [VirusTotal](https://www.virustotal.com/gui/file/276c62189026b2f7b4a4d0b35c3d37abf2fada50883e48cd4ae757d3f432af11) (13) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/276c62189026b2f7b4a4d0b35c3d37abf2fada50883e48cd4ae757d3f432af11) | A241 |
| 2026/1/20 |          1.ps1           | **PowerShell/Malgent**  | 6824f26858eddccf733c4ff4f2cce30f9ef40442dd508620312162423c36cf0e | 368b8b4d-d28f-4fef-b0b9-193f1c101511 | [VirusTotal](https://www.virustotal.com/gui/file/6824f26858eddccf733c4ff4f2cce30f9ef40442dd508620312162423c36cf0e) (11) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/6824f26858eddccf733c4ff4f2cce30f9ef40442dd508620312162423c36cf0e) | A242 |
| 2026/1/20 |  ebeec23febf0b8···.exe   |  **Win64/Malgent!MSR**  | ebeec23febf0b8eeecf4667e43a0021ee455671351ebd5d40c6562c47ad292a2 | a30e32bc-ac1a-4130-98d0-2b79361e9b1f | [VirusTotal](https://www.virustotal.com/gui/file/ebeec23febf0b8eeecf4667e43a0021ee455671351ebd5d40c6562c47ad292a2) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ebeec23febf0b8eeecf4667e43a0021ee455671351ebd5d40c6562c47ad292a2) | A243 |
| 2026/1/20 |    VVP.S.Exps···.exe     |  **Win32/Malgent!MSR**  | 5e77631f0176771a452cae6a253e4611b08001287fc0e5c1f581d8ebab8df8b5 | 8b73aa97-a631-4cfd-9383-4c9db85253ca | [VirusTotal](https://www.virustotal.com/gui/file/5e77631f0176771a452cae6a253e4611b08001287fc0e5c1f581d8ebab8df8b5) (14) |                              无                              | A244 |
| 2026/1/20 |       cuwJf9w.exe        |  **Win64/Malgent!MSR**  | fa9b4bddd381486e27bda24fd7bda8b431bffdaf920fefab3b8c02cabbcbf774 | 887b768d-000b-4723-9afd-ff7fc87603f4 | [VirusTotal](https://www.virustotal.com/gui/file/fa9b4bddd381486e27bda24fd7bda8b431bffdaf920fefab3b8c02cabbcbf774) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/fa9b4bddd381486e27bda24fd7bda8b431bffdaf920fefab3b8c02cabbcbf774) | A245 |
| 2026/1/20 |        Chrome.exe        |  **Win32/Malgent!MSR**  | 12fac68a5bea9c5b4de09f6e4285b831a213851a73cc7f41d16e677735d57e8f | 76ede741-dbd1-42f6-bc1b-2cd5ce32662d | [VirusTotal](https://www.virustotal.com/gui/file/12fac68a5bea9c5b4de09f6e4285b831a213851a73cc7f41d16e677735d57e8f) (22) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/12fac68a5bea9c5b4de09f6e4285b831a213851a73cc7f41d16e677735d57e8f) | A246 |
| 2026/1/20 |    Setup12.2-9094.msi    |  **Win32/Malgent!MSR**  | 62ecfbe0352ddb66e84c6945b4165f5442e7d5bd6a44841b3f406e60d00d07f9 | e76fe6c6-2dad-48af-a3e9-e712330fc505 | [VirusTotal](https://www.virustotal.com/gui/file/62ecfbe0352ddb66e84c6945b4165f5442e7d5bd6a44841b3f406e60d00d07f9) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/62ecfbe0352ddb66e84c6945b4165f5442e7d5bd6a44841b3f406e60d00d07f9) | A247 |
| 2026/1/20 |     win32-google.msi     |  **Win32/Suschil!rfn**  | 9c41cf64df821725044e6ecfb11ab9c78dfbf4bb2376890a880562e18d5bf0ea | fab5635c-3e84-4377-afdf-d80cbaf9e0b7 | [VirusTotal](https://www.virustotal.com/gui/file/9c41cf64df821725044e6ecfb11ab9c78dfbf4bb2376890a880562e18d5bf0ea) (13) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/9c41cf64df821725044e6ecfb11ab9c78dfbf4bb2376890a880562e18d5bf0ea) | A248 |
| 2026/1/20 |    Sghmwidaniegv.exe     |  **Win32/Malgent!MSR**  | 08d136fe35b84835d315308d2de249cedb507acb0fd03f652d2a9e086c9c85cb | 38842df6-af83-4408-b86c-c42ca36fb88f | [VirusTotal](https://www.virustotal.com/gui/file/08d136fe35b84835d315308d2de249cedb507acb0fd03f652d2a9e086c9c85cb) (5) |                              无                              | A249 |
| 2026/1/20 |    ToDesk_4.8.1.2.exe    |  **Win32/Malgent!MSR**  | c5b97f8b1b94daa0cfa7b89d20a7f6585c8a480f5ee56a93207d76bf23ec7255 | 46b00155-a6b5-4eb4-9393-54a808b92f41 | [VirusTotal](https://www.virustotal.com/gui/file/c5b97f8b1b94daa0cfa7b89d20a7f6585c8a480f5ee56a93207d76bf23ec7255) (15) |                              无                              | A250 |
| 2026/1/20 |   ToDesk···1.7.79.exe    |  **Win32/Kepavll!rfn**  | d73a990f91da52c1cd4def63643b10f2ca6dcc81607bc3db2975c720b3ece615 | 22a96fd5-f7b4-4de3-8af7-87b02087affb | [VirusTotal](https://www.virustotal.com/gui/file/d73a990f91da52c1cd4def63643b10f2ca6dcc81607bc3db2975c720b3ece615) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d73a990f91da52c1cd4def63643b10f2ca6dcc81607bc3db2975c720b3ece615) | A251 |
|  ——————   |       ————————————       |      ————————————       |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---

【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期    |                 URL                 |           类别           |                           有效载荷                           |                         URLhaus                          | 编号 |
| :-------: | :---------------------------------: | :----------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/1/10 |    hxxps://www[.]app-teams[.]com    |   仿冒 Teams、传播病毒   | hxxps://xinjuiogh[.]oss-cn-hongkong[.]aliyuncs[.]com/MSTea%D1%87msSetup[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3754717) | Z037 |
| 2026/1/10 |    hxxps://teams-app[.]com[.]cn     |   仿冒 Teams、传播病毒   |        hxxps://lkejxfss[.]hoyenoy[.]com/MSTeams[.]zip        | [URLhaus Database](https://urlhaus.abuse.ch/url/3754716) | Z038 |
| 2026/1/10 |     hxxps://www[.]teamscn[.]com     |   仿冒 Teams、传播病毒   | hxxps://xinjuiogh[.]oss-cn-hongkong[.]aliyuncs[.]com/MSTea%D1%87msSetup[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3754717) | Z039 |
| 2026/1/11 | hxxps://www[.]zh-letsvpn[.]com[.]cn |  借助 VPN 工具传播病毒   | hxxps://lmf2110[.]oss-ap-southeast-1[.]aliyuncs.com/letsvpnSbing[.]zip |                            无                            | Z040 |
| 2026/1/11 | hxxps://www[.]nf-letsvpn[.]com[.]cn |  借助 VPN 工具传播病毒   |                              无                              |                            无                            | Z041 |
| 2026/1/11 |    hxxps://www[.]lets-vpn[.]dev     |  借助 VPN 工具传播病毒   | hxxps://www[.]kuaipan[.]org/download_share[.]php?code=6p9K3B8T6lejg3BX&download=1 |                            无                            | Z042 |
| 2026/1/12 |      hxxps://desktop-wps[.]com      |    仿冒 WPS、传播病毒    | hxxps://desktop-wps[.]com/downloads/windows/vvps-ll-ws[.]1[.]2[.]3[.]exe |                            无                            | Z043 |
| 2026/1/12 |   hxxps://apps-wps[.]com/download   |    仿冒 WPS、传播病毒    | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/WPS_Sietup_4725[.]zip |                            无                            | Z044 |
| 2026/1/12 |     hxxps://off-wps[.]com[.]cn      |    仿冒 WPS、传播病毒    |       hxxps://hjekd8c[.]hoyenoy[.]com/WPS_office[.]zip       |                            无                            | Z045 |
| 2026/1/12 |      hxxps://wps-wp[.]com[.]cn      |    仿冒 WPS、传播病毒    |       hxxps://hjekd8c[.]hoyenoy[.]com/WPS_office[.]zip       |                            无                            | Z046 |
| 2026/1/12 |   hxxps://www[.]cp-wps[.]com[.]cn   |    仿冒 WPS、传播病毒    |       hxxps://www[.]cp-wps[.]com[.]cn/WPS_Setup[.]zip        |                            无                            | Z047 |
| 2026/1/13 |    hxxps://ing-google[.]com[.]cn    |  仿冒 Chrome、传播病毒   |      hxxps://olekndx[.]hoyenoy[.]com/Setup12[.]2[.]zip       |                            无                            | Z048 |
| 2026/1/16 |   hxxps://pinyin-sogou[.]com[.]cn   | 仿冒搜狗输入法、传播病毒 |     hxxps://jkemdr[.]hoyenoy[.]com/shurufa15[.]14[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3758898) | Z049 |
| 2026/1/16 |      hxxps://pp-wps[.]com[.]cn      |    仿冒 WPS、传播病毒    | hxxps://1998qwertyuiasdg-1998[.]s3[.]ap-southeast-1[.]amazonaws[.]com/wps_Version_Ikhtdnler-2026[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3759111) | Z050 |
| 2026/1/16 |     hxxps://com-wps[.]com[.]cn      |    仿冒 WPS、传播病毒    | hxxps://da05-1382952907[.]cos[.]ap-singapore[.]myqcloud[.]com/WPS_Setup_17147[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3759112) | Z051 |
| 2026/1/16 |   hxxps://zh-wpsoffice[.]com[.]cn   |    仿冒 WPS、传播病毒    | hxxps://da05-1382952907[.]cos[.]ap-singapore[.]myqcloud[.]com/WPS_Setup_17147[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3759112) | Z052 |
| 2026/1/16 |   hxxps://www[.]wps-download[.]im   |    仿冒 WPS、传播病毒    |                              无                              |                            无                            | Z053 |
| 2026/1/17 |    hxxps://wt-google[.]com[.]cn     |  仿冒 Chrome、传播病毒   | hxxps://1227dwon[.]s3[.]ap-east-1[.]amazonaws[.]com/Ggllqying[.]zip |                            无                            | Z054 |
| 2026/1/17 |     hxxps://clash-x[.]com[.]cn      |  借助 VPN 工具传播病毒   | hxxps://clash[.]services/wp-content/uploads/2025/clash/Clash[.]Verge_2[.]4[.]2_x64-setup_unsigned[.]zip |                            无                            | Z055 |
| 2026/1/17 |     hxxps://www[.]teamszs[.]com     |   仿冒 Teams、传播病毒   | hxxps://pub-1205925ec8c44035930d0869c38d3340[.]r2[.]dev/TVGS-9[.]6n8[.]zip |                            无                            | Z056 |
| 2026/1/17 |     hxxps://www[.]teamszv[.]com     |   仿冒 Teams、传播病毒   |                              无                              |                            无                            | Z057 |
| 2026/1/20 |   hxxps://www[.]to-desktop[.]com    |  仿冒 ToDesk、传播病毒   |                              无                              |                            无                            | Z058 |
| 2026/1/20 |     hxxps://www[.]todeska[.]com     |  仿冒 ToDesk、传播病毒   | hxxps://pub-d57956a6ad284a3ea9a0112e6e0c4896[.]r2[.]dev/Sghmwidaniegv[.]zip |                            无                            | Z059 |
| 2026/1/20 |     hxxps://todeskpc[.]com[.]cn     |  仿冒 ToDesk、传播病毒   | hxxps://todesk-cn[.]oss-cn-hongkong[.]aliyuncs[.]com/ToDesklets-stup1[.]7[.]79[.]zip |                            无                            | Z060 |
| 2026/1/20 |        hxxps://todesk[.]app         |  仿冒 ToDesk、传播病毒   | hxxps://2026kk[.]oss-cn-hongkong[.]aliyuncs[.]com/ToDesk_4[.]8[.]1[.]2[.]zip |                            无                            | Z061 |
| 2026/1/20 |    hxxps://www[.]todesk-cn[.]cn     |  仿冒 ToDesk、传播病毒   |                              无                              |                            无                            | Z062 |
| 2026/1/20 |    hxxps://www[.]zh-todesk[.]com    |  仿冒 ToDesk、传播病毒   |                              无                              |                            无                            | Z063 |
| 2026/1/20 |       hxxps://toamndkf[.]cyou       |  仿冒 ToDesk、传播病毒   | hxxps://pub-d57956a6ad284a3ea9a0112e6e0c4896[.]r2[.]dev/Sghmwidaniegv[.]zip |                            无                            | Z064 |
|  ——————   |        ————————————————————         |     ———————————————      |                ——————————————————————————————                |                        ——————————                        | ———  |

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