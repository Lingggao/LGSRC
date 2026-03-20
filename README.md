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

&emsp;&emsp;上次更新时间：2026 年 3 月 21 日 6:00 (GMT+8)

&emsp;&emsp;**截至 2026 年 3 月 21 日，已打击计算机病毒 / 恶意软件 656 个、恶意网站 207 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |         文件名          |           检测           |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :---------------------: | :----------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/3/17 |  127.0.0.1压缩143.exe   | **银狐 (SilverFox.bg)**  | 5c1831e49e730910ca24bf165631cba2eb55c4764f6e6737e1e169ef710c533d | 70d53a44-d262-4b19-abea-0b252e65d851 | [VirusTotal](https://www.virustotal.com/gui/file/5c1831e49e730910ca24bf165631cba2eb55c4764f6e6737e1e169ef710c533d) (31) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5c1831e49e730910ca24bf165631cba2eb55c4764f6e6737e1e169ef710c533d) | A630 |
| 2026/3/17 |    AI人脸v3.2.8.exe     | **银狐 (SilverFox.wos)** | 83b045a0f0ae7aa319bec1b98d780c0080363d50d87aab9228f1082d21a7d361 | abdf42ab-e598-4742-bbcd-555ade594253 | [VirusTotal](https://www.virustotal.com/gui/file/83b045a0f0ae7aa319bec1b98d780c0080363d50d87aab9228f1082d21a7d361) (36) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/83b045a0f0ae7aa319bec1b98d780c0080363d50d87aab9228f1082d21a7d361) | A631 |
| 2026/3/17 |   ProcessExplorer.exe   | **银狐 (SilverFox.sb)**  | 98935ff013e3d8d9e9a259a188643937c18833b226953c9b7929eab8e02f00a8 | 57c766be-9016-46da-8a7d-b5dc77613cc0 | [VirusTotal](https://www.virustotal.com/gui/file/98935ff013e3d8d9e9a259a188643937c18833b226953c9b7929eab8e02f00a8) (13) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/98935ff013e3d8d9e9a259a188643937c18833b226953c9b7929eab8e02f00a8) | A632 |
| 2026/3/17 |      T1000-YK.exe       |  **银狐 (SilverFox.u)**  | 0ba4ff2085ac7ffa2386adad160f53623f77415e623a34189f4d5728354a03ce | 10b57deb-917a-4a24-b5bc-af29f9c8094f | [VirusTotal](https://www.virustotal.com/gui/file/0ba4ff2085ac7ffa2386adad160f53623f77415e623a34189f4d5728354a03ce) (32) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/0ba4ff2085ac7ffa2386adad160f53623f77415e623a34189f4d5728354a03ce) | A633 |
| 2026/3/17 |      查看信息.exe       |        **Vshell**        | b08da7db6d928857eed0a404b54a8b74e876c3d75378fb001b3ce50bb47ac138 | 6d448ecb-b71e-4b02-92c4-d9b508ce088b | [VirusTotal](https://www.virustotal.com/gui/file/b08da7db6d928857eed0a404b54a8b74e876c3d75378fb001b3ce50bb47ac138) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b08da7db6d928857eed0a404b54a8b74e876c3d75378fb001b3ce50bb47ac138) | A634 |
| 2026/3/18 | ···03.17裁员名单···.exe | **银狐 (SilverFox.bg)**  | b79dfe1cea021b73028eecbbe1909bae449352570c39dff32ecb8d1421d722f1 | e242c23e-28ea-4dac-a53a-487ab4cc7575 | [VirusTotal](https://www.virustotal.com/gui/file/b79dfe1cea021b73028eecbbe1909bae449352570c39dff32ecb8d1421d722f1) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b79dfe1cea021b73028eecbbe1909bae449352570c39dff32ecb8d1421d722f1) | A635 |
| 2026/3/18 | 2026···违纪人员···.exe  | **银狐 (SilverFox.bg)**  | 17b5930e5e895a576331e8c3734f3d5b23ac21f60e29c062956259a06b86914b | ba1c4b04-cb55-4af1-acb2-c94c56a3bedf | [VirusTotal](https://www.virustotal.com/gui/file/17b5930e5e895a576331e8c3734f3d5b23ac21f60e29c062956259a06b86914b) (25) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/17b5930e5e895a576331e8c3734f3d5b23ac21f60e29c062956259a06b86914b) | A636 |
| 2026/3/18 |       asdads.exe        | **银狐 (SilverFox.se)**  | 82135c88fd0af3de7551f55d6cf7670e206b9383fc0a0d0b4166fbbc8c5ace27 | 2d684ae3-4c32-4faf-8e51-e93ad35487f4 | [VirusTotal](https://www.virustotal.com/gui/file/82135c88fd0af3de7551f55d6cf7670e206b9383fc0a0d0b4166fbbc8c5ace27) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/82135c88fd0af3de7551f55d6cf7670e206b9383fc0a0d0b4166fbbc8c5ace27) | A637 |
| 2026/3/18 |       wanfeng.exe       |        **Vshell**        | cbbdc9c1a02a8a63fefe971bc390c02e168b41eed5ab81d303c935c7c4b26cee | 5d3315a4-d83f-4d46-a4d9-ad57344128a9 | [VirusTotal](https://www.virustotal.com/gui/file/cbbdc9c1a02a8a63fefe971bc390c02e168b41eed5ab81d303c935c7c4b26cee) (8) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/cbbdc9c1a02a8a63fefe971bc390c02e168b41eed5ab81d303c935c7c4b26cee) | A638 |
| 2026/3/18 | ···03.18裁员名单···.exe | **银狐 (SilverFox.bg)**  | 7c2a081ae59caa21bb4cdc56e7ce6f4fe947c75f5ee9a0411787930452cda6a0 | 3659bb11-8e86-4f64-ae08-b020e0a629a1 | [VirusTotal](https://www.virustotal.com/gui/file/7c2a081ae59caa21bb4cdc56e7ce6f4fe947c75f5ee9a0411787930452cda6a0) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/7c2a081ae59caa21bb4cdc56e7ce6f4fe947c75f5ee9a0411787930452cda6a0) | A639 |
| 2026/3/18 |    Chro_Setup64.exe     |   **银狐 (SilverFox)**   | e25b887f27c56853d940c58d1fd00eb4db75f7d3831bded6ff5d07514c3c889a | 69e0748c-7a66-4c3e-ac16-312382a60474 | [VirusTotal](https://www.virustotal.com/gui/file/e25b887f27c56853d940c58d1fd00eb4db75f7d3831bded6ff5d07514c3c889a) (10) |                              无                              | A640 |
| 2026/3/18 |        Dwglq.msi        |      **MalGeneric**      | 5075629ddefbf08fbe8f75fb61007ef8ca5c73a146d9832a961b5c0b5832f96f | 32450b3e-f247-4f94-8da2-e6f40f92094a | [VirusTotal](https://www.virustotal.com/gui/file/5075629ddefbf08fbe8f75fb61007ef8ca5c73a146d9832a961b5c0b5832f96f) (6) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5075629ddefbf08fbe8f75fb61007ef8ca5c73a146d9832a961b5c0b5832f96f) | A641 |
| 2026/3/18 |       Google.msi        | **银狐 (SilverFox.cw)**  | 1c38dde07bc7b0367f7bc0386d7f3e2b1114eb70e83f7224efc0b2b2aac09eee | 065d111a-ea4b-47ab-a40f-ea1ca34d3e69 | [VirusTotal](https://www.virustotal.com/gui/file/1c38dde07bc7b0367f7bc0386d7f3e2b1114eb70e83f7224efc0b2b2aac09eee) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1c38dde07bc7b0367f7bc0386d7f3e2b1114eb70e83f7224efc0b2b2aac09eee) | A642 |
| 2026/3/18 |  liulanSetup-1263.msi   | **银狐 (SilverFox.cw)**  | b533d1c8a7e56f703c78fb58f2327489cf3b4141e0d0305a9e1f636f886ab2da | 4e3b8658-f707-4496-84b4-e3366842faea | [VirusTotal](https://www.virustotal.com/gui/file/b533d1c8a7e56f703c78fb58f2327489cf3b4141e0d0305a9e1f636f886ab2da) (3) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b533d1c8a7e56f703c78fb58f2327489cf3b4141e0d0305a9e1f636f886ab2da) | A643 |
| 2026/3/18 |    SystemMain···.zip    |         **Tedy**         | 94cad288a51b1aec90e69238e04c076d70139945cb2b5c44c437642b83318638 | e072a945-bd24-470b-baaa-119b112b507f | [VirusTotal](https://www.virustotal.com/gui/file/94cad288a51b1aec90e69238e04c076d70139945cb2b5c44c437642b83318638) (43) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/94cad288a51b1aec90e69238e04c076d70139945cb2b5c44c437642b83318638) | A644 |
| 2026/3/18 |   データレポート.zip    | **银狐 (SilverFox.so)**  | aa87d8ffd707a18c3ea048dec53bf5f952ccf97c810448d5ac22fffecd99397d | 90247b8e-e290-42cd-b63a-3843e4f94c32 | [VirusTotal](https://www.virustotal.com/gui/file/aa87d8ffd707a18c3ea048dec53bf5f952ccf97c810448d5ac22fffecd99397d) (24) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/aa87d8ffd707a18c3ea048dec53bf5f952ccf97c810448d5ac22fffecd99397d) | A645 |
| 2026/3/19 |     3.18ddHeub.exe      | **银狐 (SilverFox.sa)**  | c914860e3a327bcf85ae9a68e4b019f95110989836bc3808226b125a55c71500 | 7e14f059-4d13-493e-877e-19411fb64ad6 | [VirusTotal](https://www.virustotal.com/gui/file/c914860e3a327bcf85ae9a68e4b019f95110989836bc3808226b125a55c71500) (4) |                              无                              | A646 |
| 2026/3/19 |  ···03.18人员名单.exe   | **银狐 (SilverFox.bg)**  | a00ca25dc338e58587f4e260cc6d5bf59999cdfe71f575ed50c9c805dde18cf0 | d7963766-5024-4d43-b171-4f607a0a1647 | [VirusTotal](https://www.virustotal.com/gui/file/a00ca25dc338e58587f4e260cc6d5bf59999cdfe71f575ed50c9c805dde18cf0) (20) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a00ca25dc338e58587f4e260cc6d5bf59999cdfe71f575ed50c9c805dde18cf0) | A647 |
| 2026/3/19 |     abbef9af94.exe      | **银狐 (SilverFox.sa)**  | abbef9af947ab757f9d1f1149db7e622d2977ac3fc1a194ea8463388af4ea2e4 | 69a45e37-013b-4228-9e90-feb21ece21c5 | [VirusTotal](https://www.virustotal.com/gui/file/abbef9af947ab757f9d1f1149db7e622d2977ac3fc1a194ea8463388af4ea2e4) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/abbef9af947ab757f9d1f1149db7e622d2977ac3fc1a194ea8463388af4ea2e4) | A648 |
| 2026/3/19 |    安装包_220.15.exe    |  **银狐 (SilverFox.a)**  | c34b5313c165c6aa89044e9a3f81a2cc0367cdad81e12e8e6c4d7ff93c0fef41 | 68390d26-8099-406b-ad69-52b85294e600 | [VirusTotal](https://www.virustotal.com/gui/file/c34b5313c165c6aa89044e9a3f81a2cc0367cdad81e12e8e6c4d7ff93c0fef41) (20) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c34b5313c165c6aa89044e9a3f81a2cc0367cdad81e12e8e6c4d7ff93c0fef41) | A649 |
| 2026/3/20 |       LetsVPN.exe       |   **ShellcodeRunner**    | 06ce77ff596c35c7c8fadbf45d5b5928c57af9a5bc3afd4592a0a8836572aa3e | aca6ba30-f40f-4717-a6c7-1f6734e78b78 | [VirusTotal](https://www.virustotal.com/gui/file/06ce77ff596c35c7c8fadbf45d5b5928c57af9a5bc3afd4592a0a8836572aa3e) (4) |                              无                              | A650 |
| 2026/3/20 |    letsvp_setup.exe     | **银狐 (SilverFox.sa)**  | c0fcad0ba982fd95958248c73ee12f1732229632fde97d645e2e479cc664bf84 | 9b65f7ea-bdda-40c4-9406-fbc2e6f53752 | [VirusTotal](https://www.virustotal.com/gui/file/c0fcad0ba982fd95958248c73ee12f1732229632fde97d645e2e479cc664bf84) (11) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c0fcad0ba982fd95958248c73ee12f1732229632fde97d645e2e479cc664bf84) | A651 |
| 2026/3/20 |    %e6%96···048.exe     | **银狐 (SilverFox.sa)**  | d02ca30fbc880b849ef53cfb14fd5c8c2afc246ee9350fc7ab1793d5588d11b9 | 3a2d13d9-2983-484d-b282-bf1b7353bad0 | [VirusTotal](https://www.virustotal.com/gui/file/d02ca30fbc880b849ef53cfb14fd5c8c2afc246ee9350fc7ab1793d5588d11b9) (3) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d02ca30fbc880b849ef53cfb14fd5c8c2afc246ee9350fc7ab1793d5588d11b9) | A652 |
| 2026/3/20 |        danma.exe        | **银狐 (SilverFox.wos)** | 0f07ad05a0f1c0f0c232ed50bc56de228f1500c98be8bacda16035c318709ca9 | 44ff83dc-45db-4f53-9865-86611995f27e | [VirusTotal](https://www.virustotal.com/gui/file/0f07ad05a0f1c0f0c232ed50bc56de228f1500c98be8bacda16035c318709ca9) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/0f07ad05a0f1c0f0c232ed50bc56de228f1500c98be8bacda16035c318709ca9) | A653 |
| 2026/3/20 |    QQ截图···.png.com    |      **Cybercrime**      | c0861f5be19ead006864f44bbf542572ebf35ab3da3a547ec06770a5685d8b29 | 8f956777-f7c3-4c98-821d-8a4e38e5c4e9 | [VirusTotal](https://www.virustotal.com/gui/file/c0861f5be19ead006864f44bbf542572ebf35ab3da3a547ec06770a5685d8b29) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c0861f5be19ead006864f44bbf542572ebf35ab3da3a547ec06770a5685d8b29) | A654 |
| 2026/3/20 | 苹果···快递单号···.exe  |   **银狐 (SilverFox)**   | d4c7157d593e6ac6c4afc9a466f731d577caee271a29ca8ef0bc9acd12322c4e | db621112-52fa-49af-b568-eeda10f39c4f | [VirusTotal](https://www.virustotal.com/gui/file/d4c7157d593e6ac6c4afc9a466f731d577caee271a29ca8ef0bc9acd12322c4e) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d4c7157d593e6ac6c4afc9a466f731d577caee271a29ca8ef0bc9acd12322c4e) | A655 |
| 2026/3/21 |     3.20ToDesk.exe      | **银狐 (SilverFox.sa)**  | 5666ea13363e66098c490f88821dd251b2082ef2fa4d9de797a5701a3584969b | d766fae0-2a20-4744-b6ba-920f20ae0782 | [VirusTotal](https://www.virustotal.com/gui/file/5666ea13363e66098c490f88821dd251b2082ef2fa4d9de797a5701a3584969b) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5666ea13363e66098c490f88821dd251b2082ef2fa4d9de797a5701a3584969b) | A656 |
|  ——————   |      ————————————       |       ————————————       |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近约 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---

【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期    |                    URL                     |         类别          |                           有效载荷                           |                         URLhaus                          | 编号 |
| :-------: | :----------------------------------------: | :-------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/3/9  |  hxxps://google-google-google[.]com[.]cn   | 仿冒 Chrome、传播病毒 |                              无                              |                            无                            | Z185 |
| 2026/3/9  |         hxxps://im-wps[.]com[.]cn          |  仿冒 WPS、传播病毒   | hxxps://www[.]asdfgsdfgxcvbvcxasd-oss[.]top/WpsOffice_x64%20_v10_win888[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3792813) | Z186 |
| 2026/3/11 |       hxxps://ai-openclaw[.]com[.]cn       | 仿冒 OpenClaw “龙虾”  | hxxps://www[.]nmysq[.]top/oss/usha/ope/openclawAI%207beAolenc[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3794716) | Z187 |
| 2026/3/14 |         hxxps://aps-wps[.]com[.]cn         |  仿冒 WPS、传播病毒   |  hxxps://mapt[.]oss-cn-hongkong[.]aliyuncs[.]com/WPS[.]zip   |                            无                            | Z188 |
| 2026/3/14 |         hxxps://iin-wps[.]com[.]cn         |  仿冒 WPS、传播病毒   | hxxps://www[.]aliyunnorth-oss[.]top/Wps%20Office_x64_%20v1[.]0_win[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3795617) | Z189 |
| 2026/3/14 |         hxxps://lk-wps[.]com[.]cn          |  仿冒 WPS、传播病毒   | hxxps://wps10[.]oss-cn-hongkong[.]aliyuncs[.]com/wps_Installer_Setup_HH[.]zip |                            无                            | Z190 |
| 2026/3/14 |         hxxps://pw-wps[.]com[.]cn          |  仿冒 WPS、传播病毒   | hxxps://wps04[.]oss-cn-hongkong[.]aliyuncs[.]com/wps_Installer_Setup_HH[.]zip |                            无                            | Z191 |
| 2026/3/14 |          hxxps://ps-wps[.]hl[.]cn          |  仿冒 WPS、传播病毒   | hxxps://download[.]xiaodiqiyi[.]com/WPS%20Office%20Setup[.]zip |                            无                            | Z192 |
| 2026/3/14 |   hxxps://www[.]web-openclaw[.]com[.]cn    | 仿冒 OpenClaw “龙虾”  |   hxxps://www[.]web-openclaw[.]com[.]cn/pc/openclaw[.]zip    |                            无                            | Z193 |
| 2026/3/15 |    hxxps://cn-google-google[.]com[.]cn     | 仿冒 Chrome、传播病毒 | hxxps://bf-chromefdghd[.]oss-cn-hongkong[.]aliyuncs[.]com/bf-chrome-03-12-01[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3796607) | Z194 |
| 2026/3/15 |  hxxps://cn[.]cn-chhrome-google[.]hl[.]cn  | 仿冒 Chrome、传播病毒 | hxxps://download[.]google-chrome[.]cyou/downloads/chrome[.]php | [URLhaus Database](https://urlhaus.abuse.ch/url/3796599) | Z195 |
| 2026/3/15 |    hxxps://zh[.]cn-google-zh[.]hl[.]cn     | 仿冒 Chrome、传播病毒 | hxxps://sgnfyn[.]oss-cn-shenzhen[.]aliyuncs[.]com/goodgle-chomex16[.]83[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3796605) | Z196 |
| 2026/3/15 | hxxps://www[.]zhcn-google-chrome[.]hl[.]cn | 仿冒 Chrome、传播病毒 | hxxps://download[.]google-chrome[.]cyou/downloads/chrome[.]php | [URLhaus Database](https://urlhaus.abuse.ch/url/3796599) | Z197 |
| 2026/3/15 |   hxxps://zh[.]support-google[.]hl[.]cn    | 仿冒 Chrome、传播病毒 | hxxps://sgnfyn[.]oss-cn-shenzhen[.]aliyuncs[.]com/googlechr1[.]18[.]9[.]83[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3796606) | Z198 |
| 2026/3/15 |       hxxps://zh-cn-google[.]hl[.]cn       | 仿冒 Chrome、传播病毒 |           hxxps://tenyunat-99viplawt[.]com/QQGSYLX           |                            无                            | Z199 |
| 2026/3/15 |     hxxps://cn[.]google-zhcn[.]hl[.]cn     | 仿冒 Chrome、传播病毒 | hxxps://sgnfyn[.]oss-cn-shenzhen[.]aliyuncs[.]com/goodgle-chomex16[.]83[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3796605) | Z200 |
| 2026/3/16 |    hxxps://www[.]cc-openclaw[.]com[.]cn    | 仿冒 OpenClaw “龙虾”  |    hxxp://www[.]web-openclaw[.]com[.]cn/pc/openclaw[.]zip    |                            无                            | Z201 |
| 2026/3/18 |    hxxps://google-google-web[.]hl[.]cn     | 仿冒 Chrome、传播病毒 |       hxxps://www[.]irbis2000[.]com/Chro_Setup64[.]exe       |                            无                            | Z202 |
| 2026/3/18 |    hxxps://chromeapps-google[.]com[.]cn    | 仿冒 Chrome、传播病毒 |                              无                              |                            无                            | Z203 |
| 2026/3/18 |      hxxps://chrom-gooogle[.]com[.]cn      | 仿冒 Chrome、传播病毒 |       hxxps://hjendcs[.]x98665[.]com/liulanSetup[.]zip       | [URLhaus Database](https://urlhaus.abuse.ch/url/3798427) | Z204 |
| 2026/3/18 |    hxxps://ad-google-google[.]com[.]cn     | 仿冒 Chrome、传播病毒 |           hxxps://tranyasy[.]com[.]cn/Google[.]zip           | [URLhaus Database](https://urlhaus.abuse.ch/url/3798428) | Z205 |
| 2026/3/18 |      hxxps://cn-gooogle-zh[.]hl[.]cn       | 仿冒 Chrome、传播病毒 |   hxxps://daw[.]tos-cn-hongkong[.]volces[.]com/Dwglq[.]zip   | [URLhaus Database](https://urlhaus.abuse.ch/url/3798426) | Z206 |
| 2026/3/18 |  hxxps://cn[.]h-google-google[.]com[.]cn   | 仿冒 Chrome、传播病毒 |                              无                              |                            无                            | Z207 |
|  ——————   |            ————————————————————            |    ———————————————    |                ——————————————————————————————                |                        ——————————                        | ———  |

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