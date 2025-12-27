<SPAN ID = 'HEAD'/>

<div align="center">
<img src="Images/Microsoft MCI.png" width = "12%" /><img src="Images/LING_2.png" width = "25%" /> <img src="Images/WCC2024_2.png" width = "12%" />
</div>

<h1 align="center">灵糕中心 · 安全响应分中心</h1>

<h3 align="center">(LGHUB Security Response Center)</h3>

[github.com/Lingggao/LGSRC](https://github.com/Lingggao/LGSRC) (GitHub)

&emsp;&emsp;**用于打击计算机病毒与恶意软件的 “[灵糕中心](https://github.com/Lingggao/LGHUB) · 安全响应分中心”**。由 2021 Windows Insider 最有价值专家 (MVP) · [**Ling Gao**](https://github.com/Lingggao) 先生管理。灵糕中心 · 安全响应分中心成立于 2025 年 12 月 20 日。

> [!IMPORTANT]
>
> &emsp;灵糕中心为个人项目，管理者不是 Microsoft 公司员工，不能代表 Microsoft 公司立场、态度。

&emsp;&emsp;**宗旨**：独立管理、放眼全球、数据精确、打击迅速

---

**Microsoft 资源** - [Microsoft 安全响应中心](https://msrc.microsoft.com) | [Microsoft 安全情报](https://www.microsoft.com/en-us/wdsi) | [Microsoft Defender 门户](https://security.microsoft.com) | [获取更新](https://www.microsoft.com/en-us/wdsi/defenderupdates) | [提交文件](https://www.microsoft.com/en-us/wdsi/filesubmission)

其他资源 - [微步云沙箱](https://s.threatbook.com) | [奇安信威胁情报中心](https://ti.qianxin.com) | [天恒云沙箱](https://sandbox.dbappsecurity.com.cn) | [360 沙箱云](https://ata.360.net) | [天穹智能分析平台](https://sandbox.qianxin.com/sscc-tq-web) | [深信服威胁情报中心](https://ti.sangfor.com.cn/analysis-platform?lang=ZH-CN) | [VirusTotal](https://www.virustotal.com/gui/home/upload) | [MalwareBazaar](https://bazaar.abuse.ch) | [Kaspersky TIP](https://opentip.kaspersky.com) | [Hybrid Analysis](https://hybrid-analysis.com) | [ANY.RUN](https://app.any.run)

社区 - [卡饭论坛 病毒样本 分享&分析区](https://bbs.kafan.cn/forum-31-1.html) | [火绒安全论坛 病毒查杀问题反馈](https://bbs.huorong.cn/forum-44-1.html) | [百度贴吧 病毒吧](https://tieba.baidu.com/f?ie=utf-8&kw=%E7%97%85%E6%AF%92)

学习 - [Microsoft 认证：安全性、合规性和标识基础知识](https://learn.microsoft.com/zh-cn/credentials/certifications/security-compliance-and-identity-fundamentals) | [Microsoft 认证：安全运营分析师助理](https://learn.microsoft.com/zh-cn/credentials/certifications/security-operations-analyst) | [Microsoft 认证：网络安全架构师专家](https://learn.microsoft.com/zh-cn/credentials/certifications/cybersecurity-architect-expert) | [ISC.AI 学苑 (360 数字安全集团)](https://study.360.net/frontend/home/home) | [阿里云 云安全高级工程师 ACP 认证](https://edu.aliyun.com/certification/acp04)

## 工作流程

<img src="Images/Workflow.png" width = "100%" />

**一、工作流程概述**

1. 发现 / 获得疑似恶意软件样本
2. 使用 Microsoft Defender (最新[安全智能](https://learn.microsoft.com/zh-cn/defender-endpoint/microsoft-defender-antivirus-updates)) 测试能否查杀
3. 如果不能，按工作流程开展前期分析
4. 请求 Microsoft 等公司安全研究员人工分析样本
5. 如果判断为恶意软件，则向全球信息安全社区、杀毒软件厂商、威胁情报提供商等共享信息
6. (可选) 向国家有关部门提供线索
7. (可选) 针对仿冒正规软件投放病毒事件，向受害企业方共享线索
8. 将样本数据填写至下方表格

**二、出现以下情况时，样本数据不会填写至表格**

1. Microsoft Defender 可以查杀样本，无需人工分析
2. 经前期分析，可 100% 确认为正常文件
3. Microsoft 研究员判断样本 “干净” (Clean)
4. 样本首次发现日期距今已超过 60 天
5. 由其他从业人员 / 志愿者发现、分析、上报，本中心全程未参与

## 数据

上次更新时间：2025 年 12 月 27 日 23:00 (UTC+8)。Star 数量：2 ⭐

**截至 2025 年 12 月 27 日，已打击计算机病毒 / 恶意软件 61 个**。

---

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|    日期    |           文件名           |          分析结果          |                            SHA256                            |             Internal ID              |                        MalwareBazaar                         | 编号 |
| :--------: | :------------------------: | :------------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :--: |
| 2025/12/21 |       iN-HR20256.exe       |   **Win32/Malgent!MSR**    | f8533b2981f218a219ff9d67b08b3017e0ef00b6fbb3fca98e8382493b70fae1 | dba49f80-78fe-4a8d-9abb-7772d9d3a5dd |                              无                              | 0011 |
| 2025/12/21 |    Egzgxemc···SETUP.exe    |   **Win32/Malgent!MSR**    | d659ad9d00570077e5918aa2f53783c5e5b105ef10c7f776496332527776fc58 | dba49f80-78fe-4a8d-9abb-7772d9d3a5dd | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d659ad9d00570077e5918aa2f53783c5e5b105ef10c7f776496332527776fc58) | 0012 |
| 2025/12/21 |         imgpr.exe          |   **Win32/Wacatac.C!ml**   | 613d363367a9ab36b881e94555e38bf2b5466716606a14bddb7c1d9f2fc1d555 | dba49f80-78fe-4a8d-9abb-7772d9d3a5dd | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/613d363367a9ab36b881e94555e38bf2b5466716606a14bddb7c1d9f2fc1d555) | 0013 |
| 2025/12/21 |     llmxnb-653297.exe      |   **Win32/Malgent!MSR**    | ba349030f47d4478c4a13a42c422b4361501bdb6247efa81de571a59ff2d7ba5 | cb8041ff-60fd-468f-b663-efeff7096c45 |                              无                              | 0014 |
| 2025/12/21 |     din-Hr20254861.exe     |   **Win32/Malgent!MSR**    | c08753931b4af2c3f356695948d1bc23249b98f64c075b0660fa58bb501a7d36 | cb8041ff-60fd-468f-b663-efeff7096c45 |                              无                              | 0015 |
| 2025/12/22 |       javaclear.exe        |   **Win32/Malgent!MSR**    | 5c26565307470e8dafa63e7c9eb464f00cf4f4e6700a806f6cf73dd57a3fe853 | cb8041ff-60fd-468f-b663-efeff7096c45 | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5c26565307470e8dafa63e7c9eb464f00cf4f4e6700a806f6cf73dd57a3fe853) | 0016 |
| 2025/12/22 |      ChrromSorMXi.exe      |   **Win32/Wacatac.H!ml**   | 96aacc8331bc06e88c7b696aa8f2da19162400204ac86abf7e32d2b0142f2baf | 84989601-74a1-4df9-bc0a-64b23705f58e | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/96aacc8331bc06e88c7b696aa8f2da19162400204ac86abf7e32d2b0142f2baf) | 0017 |
| 2025/12/22 |         fv47j.exe          |   **Win32/Malgent!MSR**    | 1822e2d6227f9b22573e82c973286fd920827cf15597d558af71790b56cda693 | 84989601-74a1-4df9-bc0a-64b23705f58e | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1822e2d6227f9b22573e82c973286fd920827cf15597d558af71790b56cda693) | 0018 |
| 2025/12/22 |    todesk···x64.2.0.exe    |     **Win32/Tnega!ml**     | 31bd93d6ae1266a19fc74e85db1a686afa845ba710b073c0fd41a82c921ac691 | 84989601-74a1-4df9-bc0a-64b23705f58e |                              无                              | 0019 |
| 2025/12/22 |   北京地铁···举报函.exe    |   **CobaltStrikeBeacon**   | bea27ed2fe4e48eebf79f045b50ab89be138596620155c3f47a75bf1b99ab824 | 84989601-74a1-4df9-bc0a-64b23705f58e | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/bea27ed2fe4e48eebf79f045b50ab89be138596620155c3f47a75bf1b99ab824) | 0020 |
| 2025/12/22 |     wechathelper1.exe      |   **Win32/Wacatac.C!ml**   | b0b92ed73b4e9254a4e0d353c09305f7f27def9d3a86d70001b17482f7317ef9 |                  无                  | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b0b92ed73b4e9254a4e0d353c09305f7f27def9d3a86d70001b17482f7317ef9) | 0021 |
| 2025/12/22 |         setup.exe          |  **Win32/Sonbokli.A!cl**   | 64292ff235908c90b3f38e3c37a4bb2e474b76bede9a2f4a9a60e5d1a3d1258a | f231c888-eb7c-4c54-af44-a46bda0253ad | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/64292ff235908c90b3f38e3c37a4bb2e474b76bede9a2f4a9a60e5d1a3d1258a) | 0022 |
| 2025/12/22 |    Setup_Installer.exe     |  **Win32/Sonbokli.A!cl**   | 27f8ee5c936e6356bd575bddc9dc5dac88f6d14004feccc9622da2862862b23f | f231c888-eb7c-4c54-af44-a46bda0253ad | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/27f8ee5c936e6356bd575bddc9dc5dac88f6d14004feccc9622da2862862b23f) | 0023 |
| 2025/12/22 |       Installer.exe        |   **Win32/Malgent!MSR**    | 96d36b91d5dc1a6257bbdad1b2b762e59a88d8d73cbaa317e2568dd7fb153b5f | f231c888-eb7c-4c54-af44-a46bda0253ad | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/96d36b91d5dc1a6257bbdad1b2b762e59a88d8d73cbaa317e2568dd7fb153b5f) | 0024 |
| 2025/12/23 |        l519V93e.exe        |   **Win32/Malgent!MSR**    | 0586872339db977aa4f1b736feaf5642b07514d3f8aec627b9e47d05d3e88ee7 | e91743e4-c064-40d0-83e6-014a4a058454 |                              无                              | 0025 |
| 2025/12/23 |    36chbem_x64.5.3.exe     |   **Win32/Malgent!MSR**    | 35b9bad49bac4d249359c49240e55a439ca5b4cc4449fc18e0d980e4158d0bf6 | e91743e4-c064-40d0-83e6-014a4a058454 |                              无                              | 0026 |
| 2025/12/23 | ···稽查内职人员名单···.exe |   **Win32/Wacatac.C!ml**   | f1ec1791833bf98da73b948306fddc7085265fdb3bfeb6aaf67a697931e094ed |                  无                  | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f1ec1791833bf98da73b948306fddc7085265fdb3bfeb6aaf67a697931e094ed) | 0027 |
| 2025/12/23 |        Y6DZJP78.exe        |    **Win32/Fuery.D!cl**    | ed624ef9def66eab4d8d59dd9693e9b6e6cd386d422f2835d97d577756c6634f |                  无                  | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ed624ef9def66eab4d8d59dd9693e9b6e6cd386d422f2835d97d577756c6634f) | 0028 |
| 2025/12/23 |    Egzgxemc···SETUP.exe    |    **Win32/Yomal!rfn**     | 03ab56b665e2af67093e123e177dffde21404adc81dc07223fb2b51c724a8eaa | 41ed80fb-1b3b-4fa8-959e-3a4efe247591 | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/03ab56b665e2af67093e123e177dffde21404adc81dc07223fb2b51c724a8eaa) | 0029 |
| 2025/12/23 |   11.17违纪人员名单.exe    |   **Win32/Malgent!MSR**    | d206f254c84fbeb5c0918b59ad017fdf91e77ccb34bb22f4f59379ce8b638636 | b433ccf1-9eab-4bab-9cff-c9bc363067fc | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d206f254c84fbeb5c0918b59ad017fdf91e77ccb34bb22f4f59379ce8b638636) | 0030 |
| 2025/12/23 |  2025.12.22人员调整1.exe   |   **Win32/Malgent!MSR**    | 2757e9cb4869f7716594ec5371bab3f2790ffd53a6e56f39a8805ff6e42f0269 | b433ccf1-9eab-4bab-9cff-c9bc363067fc | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/2757e9cb4869f7716594ec5371bab3f2790ffd53a6e56f39a8805ff6e42f0269) | 0031 |
| 2025/12/23 | ···各企业违纪人员信息.exe  |   **Win32/Malgent!MSR**    | 22d4b6abcb913f72e56915b76b6baaadacc48719e42b1776cbd5fc263da36a89 | b433ccf1-9eab-4bab-9cff-c9bc363067fc | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/22d4b6abcb913f72e56915b76b6baaadacc48719e42b1776cbd5fc263da36a89) | 0032 |
| 2025/12/23 |      名单12月22日.exe      |     **Win64/Vigorf.A**     | cefe8e08a63508ea77007f4800a8cd12a245789b648bd21e1bdf499bd51f5838 | c9c1eb33-05ed-4cd1-8379-0d8b6425d36c | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/cefe8e08a63508ea77007f4800a8cd12a245789b648bd21e1bdf499bd51f5838) | 0033 |
| 2025/12/23 |          数据.exe          |   **Win32/Malgent!MSR**    | ebcc84ced0d80f19ca1b24f2bd0119ebe86a47942b6cfbcf337bd77d5ee66d2d | c9c1eb33-05ed-4cd1-8379-0d8b6425d36c | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ebcc84ced0d80f19ca1b24f2bd0119ebe86a47942b6cfbcf337bd77d5ee66d2d) | 0034 |
| 2025/12/23 |   ChromeSetupA-5440.msi    |   **Win32/Suschil!rfn**    | 7a9b933b41e8c345c374073636345b050a0f86321129b5f68d04695fe8a5751c |                  无                  | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/7a9b933b41e8c345c374073636345b050a0f86321129b5f68d04695fe8a5751c) | 0035 |
| 2025/12/23 |         222222.exe         |  **Win32/Sonbokli.A!cl**   | 1c46675149b0f4d926783c855e860b20548568849cdec941a62abb72534d1e68 |                  无                  | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1c46675149b0f4d926783c855e860b20548568849cdec941a62abb72534d1e68) | 0036 |
| 2025/12/24 |      Tor Browser.exe       |   **Win32/Malgent!MSR**    | 164f62fcfeb1f8028b266cb43cfad556ea7905af2db6186f57e91c199ec49c38 | 7e19c1bf-b83f-4fee-bc8d-2ba8cae25f71 |                              无                              | 0037 |
| 2025/12/24 |         6dtkv.exe          |   **Win64/Malgent!MSR**    | 2ba923b813a8e10fda61de4c1d0e0cf50b3c0a9f3ed7aa5309810edfc7fc179a | 007cf570-4f4a-493a-af82-9b02733f222e |                              无                              | 0038 |
| 2025/12/24 |          mal2.exe          |  **Win32/Sonbokli.A!cl**   | 9866a8ecf5414283d89528597ef7ff590f60e42aa6fc4972f61a083c2b08c1ec | 007cf570-4f4a-493a-af82-9b02733f222e | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/9866a8ecf5414283d89528597ef7ff590f60e42aa6fc4972f61a083c2b08c1ec) | 0039 |
| 2025/12/25 |   Chome-stallerwin64.exe   |   **Win32/Malgent!MSR**    | 9597ac18b19d498230c56bf853e64855a4fe60e02fc4c2b723a331fc06b3a1f4 | 7fc303d0-923d-4300-a8ca-f48d0b62d5cb |                              无                              | 0040 |
| 2025/12/25 |     Chrome···4550.msi      |   **Win32/Malgent!MSR**    | e87ee6a08389cc69f3208247e0e65be770ad1ba5fc3e566aa3abe920ed8fc741 | 7fc303d0-923d-4300-a8ca-f48d0b62d5cb | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e87ee6a08389cc69f3208247e0e65be770ad1ba5fc3e566aa3abe920ed8fc741) | 0041 |
| 2025/12/25 |  Photoshop···单文件版.exe  |    **Win32/Tiggre!rfn**    | d49ec81f7be6eaabac6d77e8bc43a8ec61d368af5caa75690b95c18a6d52bcf7 | 51643783-afcb-4141-a8dd-95457d920f8e | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d49ec81f7be6eaabac6d77e8bc43a8ec61d368af5caa75690b95c18a6d52bcf7) | 0042 |
| 2025/12/26 |         jdk1.8.exe         |   **Win32/Malgent!MSR**    | 1764d210fdc967c7b23efcb42bad3d019412232d106733c2da8349d352f030ae | 3f07782f-6df5-43a0-a8ca-f8529b7180b7 | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1764d210fdc967c7b23efcb42bad3d019412232d106733c2da8349d352f030ae) | 0043 |
| 2025/12/26 |        CrashRep.exe        |  **Win32/Sabsik.EN.A!ml**  | 5140c7701c1f7dddfc0e53071661cebd40d576a02bca960be3199c22a0c60739 |                  无                  | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5140c7701c1f7dddfc0e53071661cebd40d576a02bca960be3199c22a0c60739) | 0044 |
| 2025/12/26 |         555555.msi         |    **Win32/Etset!rfn**     | aeb7528bace6ab26fb095bd84d4a8b5e1606c0ff8380eb451de8eab4aeb3871f | a60b7efe-7b7d-40ad-aea0-fc46ef1a58b1 |                              无                              | 0045 |
| 2025/12/26 |       12.25名单.exe        |   **Win32/Wacatac.C!ml**   | b883c01cdf40db90359f1978e83ded3cdb28bf8f6dfbe82caf810302d2d51396 | 1dbf8790-5bd3-440a-b037-8c0a80ebd64a | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b883c01cdf40db90359f1978e83ded3cdb28bf8f6dfbe82caf810302d2d51396) | 0046 |
| 2025/12/26 |     圣诞树给你···.exe      |    **Win32/Gracing.I**     | a59f8b25e7248e65bf5995d19fd5482ab39d02c5ff4c9b186122d6636a9feac1 |                  无                  | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a59f8b25e7248e65bf5995d19fd5482ab39d02c5ff4c9b186122d6636a9feac1) | 0047 |
| 2025/12/26 |        BypassAV.exe        | **Win64/TurtleLoader!rfn** | a85d9594291961d037a8aa9d4ce5529a4bdd7be97d299b984696ba36961473fe |                  无                  | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a85d9594291961d037a8aa9d4ce5529a4bdd7be97d299b984696ba36961473fe) | 0048 |
| 2025/12/26 |    ···内部调查信息.exe     |   **Win32/Wacatac.C!ml**   | 45d0ed22f30cb0f3551439fefc7ff7153f1557103fd86507152d67a500f12e1b |                  无                  | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/45d0ed22f30cb0f3551439fefc7ff7153f1557103fd86507152d67a500f12e1b) | 0049 |
| 2025/12/26 | 2025···人 员 名 单···.exe  |  **Win32/Conteban.A!ml**   | b19eda1354aeff70a9269a7096ac8e221ff0061133bc219fcb950608b207c9ee |                  无                  | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/b19eda1354aeff70a9269a7096ac8e221ff0061133bc219fcb950608b207c9ee) | 0050 |
| 2025/12/26 |        OneDrive.exe        |   **Win32/Malgent!MSR**    | 784ce917a01cc0eede501ab8f98927cb732486c9262215231c4c4885c5ade680 | 2549f62f-ed89-490c-aace-729e66fa617b | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/784ce917a01cc0eede501ab8f98927cb732486c9262215231c4c4885c5ade680) | 0051 |
| 2025/12/26 | photo···2025.12.23···.exe  |   **Win32/Malgent!MSR**    | 8bcfee677a8ec5a1fd2e020e0f9586ecee70ca1c3e7f9afba116b28223107e70 | 2549f62f-ed89-490c-aace-729e66fa617b | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/8bcfee677a8ec5a1fd2e020e0f9586ecee70ca1c3e7f9afba116b28223107e70) | 0052 |
| 2025/12/26 |      qzonehelper.exe       |   **Win32/Malgent!MSR**    | a43d75b99fea27596fdc3b0fb11512329589d6482a2954dc4799ed737fddac50 | a60b7efe-7b7d-40ad-aea0-fc46ef1a58b1 | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a43d75b99fea27596fdc3b0fb11512329589d6482a2954dc4799ed737fddac50) | 0053 |
| 2025/12/26 |         666666.exe         |   **Win32/Wacatac.C!ml**   | 380bcae2cbe211bfdb5229ef129d3188a3aeca61c2e3e20888b1dc29020b3d1a |                  无                  | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/380bcae2cbe211bfdb5229ef129d3188a3aeca61c2e3e20888b1dc29020b3d1a) | 0054 |
| 2025/12/27 |     huorong333333.exe      |   **Win32/Malgent!MSR**    | a1e780e075a822053bb3322108d29674462089bc0fb90ecf24eb18dfb3052a94 | 4ab4468f-8114-4c47-9857-0d6ca3cfa756 |                              无                              | 0055 |
| 2025/12/27 |   GWMeqk-itstos-2.35.msi   |   **Win32/Malgent!MSR**    | 918448e18b6fc75001634e154dabfe9d07aceac93ec997e833c592b31350b248 | 718ce763-129f-437b-badd-25b82fbc385a |                              无                              | 0056 |
| 2025/12/27 |  Chome-stallerrwin64.exe   |   **Win32/Malgent!MSR**    | bfd4b3c2e9b2ed661059a94d38017e20b478aed370bbee80d36224d1dd34c9a2 | 0d542bbe-d253-4abf-97d0-b854fa267f61 |                              无                              | 0057 |
| 2025/12/27 |   wps_ghwigzx64.5.3.exe    |   **Win32/Malgent!MSR**    | 30793d892d4ad1fb77093ccbe1bf6eed58de5eb9ea3ccdf675a61a121e4bf2dc | 5c771ea1-884b-4522-ab5c-75312b3dd9c2 |                              无                              | 0058 |
| 2025/12/27 |    WPS_office-8097.msi     |   **Win32/Dropper!MSR**    | 4d97c932a78e7e52450b87abd64813007c1fda9405f041d47b7259db78d24f73 | 808698da-9883-4a71-8e46-159ef161c9f0 |                              无                              | 0059 |
| 2025/12/27 |     WPS_Setup_X64.msi      |   **Win32/Malgent!MSR**    | bc6fcb450024b38f113f01cf7873657aede61549758191cd33d8597ad808f8e7 | 30849637-921e-4942-8207-d1dad45ec481 |                              无                              | 0060 |
| 2025/12/27 |   wpsdhbsi_x64.2.0.1.exe   |   **Win32/Malgent!MSR**    | 1511f60e41d93b8412b42078c1e69c30ec84d45cd7456ffb45ba9fa88b48182f | 3277d72b-4408-4de2-9da7-24485da1ec39 |                              无                              | 0061 |
|   ——————   |        ————————————        |        ————————————        |             ———————————————————————————————————              |         ————————————————————         |                         ————————————                         | ———  |

**注**：只保留最近 30 天内的最多 60 条数据，更早数据详见 LGSRC/[Archive.md](https://github.com/Lingggao/LGSRC/blob/main/Archive.md)。

## 如何提交文件进行分析？

&emsp;&emsp;**本中心不能代替 Microsoft 行使接收并分析疑似恶意软件样本的职责**。用户应始终通过 [**Microsoft Security Intelligence - Submit a file for malware analysis**](https://www.microsoft.com/en-us/wdsi/filesubmission) 官方平台提交文件。

&emsp;&emsp;如需联系 Ling Gao 共享信息，请发送电子邮件至 Ling@LGHUB.org。谢谢！😀

---

[回到顶部](#HEAD)

<img src="Images/CC.png" width = "3%" /> <img src="Images/BY.png" width = "3%" /> <img src="Images/SA.png" width = "3%" />

在 “[署名 - 相同方式共享 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode.zh-Hans)” 协议 (CC BY-SA 4.0) 之条款下提供。

2023 - 2026, [Ling Gao](https://github.com/Lingggao), 灵糕中心 · 安全响应分中心, [github.com/Lingggao/LGSRC](https://github.com/Lingggao/LGSRC)

[字体许可使用授权书](https://github.com/Lingggao/LGSRC/blob/main/Images/%E5%AD%97%E4%BD%93%E8%AE%B8%E5%8F%AF%E4%BD%BF%E7%94%A8%E6%8E%88%E6%9D%83%E4%B9%A6.png?raw=true) | [Windows Insider 最有价值专家](https://github.com/Lingggao/LGSRC/blob/main/Images/Windows%20Insider%20MVP.png?raw=true)