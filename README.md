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

&emsp;&emsp;上次更新时间：2026 年 1 月 26 日 11:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 1 月 26 日，已打击计算机病毒 / 恶意软件 281 个、恶意网站 84 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |         文件名          |          检测          |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :---------------------: | :--------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/1/22 |       Chrome.exe        | **Win32/Sabsik.EN.A**  | 8d0095b1901cdddfdb941ad6136a08420c97a918becc547e75f4b2d87b185f8e | 0e1d7870-9cf6-41fc-ac83-49c18d5b3268 | [VirusTotal](https://www.virustotal.com/gui/file/8d0095b1901cdddfdb941ad6136a08420c97a918becc547e75f4b2d87b185f8e) (10) |                              无                              | A256 |
| 2026/1/22 |     Chrome-x64.exe      | **Win32/Malgent!MSR**  | eab636bb2dcc35f2eba051007e0bc8522f1ac3ed86c943d2067ef13c5effbe77 | be5fb691-932a-4c09-8056-d156a08a6e11 | [VirusTotal](https://www.virustotal.com/gui/file/eab636bb2dcc35f2eba051007e0bc8522f1ac3ed86c943d2067ef13c5effbe77) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/eab636bb2dcc35f2eba051007e0bc8522f1ac3ed86c943d2067ef13c5effbe77) | A257 |
| 2026/1/22 |   google12.3-3201.msi   | **Win32/Kepavll!rfn**  | 63f2c3f18220c0b71fe777fab66a06f95f2ec5f0b6c539e69149901a64f41f71 | 534059ff-ca7c-42b5-8785-f31ded625595 | [VirusTotal](https://www.virustotal.com/gui/file/63f2c3f18220c0b71fe777fab66a06f95f2ec5f0b6c539e69149901a64f41f71) (14) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/63f2c3f18220c0b71fe777fab66a06f95f2ec5f0b6c539e69149901a64f41f71) | A258 |
| 2026/1/22 |     win32-googl.exe     | **Win32/Malgent!MSR**  | a83dab49dda25fea5507f40e008ce474c4647676a88112f759e1fccbc7438160 | c4948d8b-9583-471c-b65f-45c6365b0d07 | [VirusTotal](https://www.virustotal.com/gui/file/a83dab49dda25fea5507f40e008ce474c4647676a88112f759e1fccbc7438160) (5) |                              无                              | A259 |
| 2026/1/23 |    ···22.01.2026.HTA    |   **HTA/Phish!MSR**    | bb7473c2ff86ed0f771726ce411b31ca0fd7d528fe6b90670f849c8c1cebcabb | 5d50c664-902a-438a-adf7-8dd952cabd78 | [VirusTotal](https://www.virustotal.com/gui/file/bb7473c2ff86ed0f771726ce411b31ca0fd7d528fe6b90670f849c8c1cebcabb) (3) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/bb7473c2ff86ed0f771726ce411b31ca0fd7d528fe6b90670f849c8c1cebcabb) | A260 |
| 2026/1/23 |     15paGk06W5Y.exe     |  **Win32/Etset!rfn**   | 26c0d7a785f99966422f6f93d8371c6dff9e5f270d58b8eab13498b89aed908f | c453bae2-7896-4a3e-a5ef-a6334ebd5676 | [VirusTotal](https://www.virustotal.com/gui/file/26c0d7a785f99966422f6f93d8371c6dff9e5f270d58b8eab13498b89aed908f) (21) |                              无                              | A261 |
| 2026/1/23 |       Chrome.exe        | **Win32/Malgent!MSR**  | 946e57ff749290932801082c4eeced5ca179e1b3b777bd93f11cf1a7b00727cd | 71041cac-4e78-4ee8-9033-388481e4f1f9 | [VirusTotal](https://www.virustotal.com/gui/file/946e57ff749290932801082c4eeced5ca179e1b3b777bd93f11cf1a7b00727cd) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/946e57ff749290932801082c4eeced5ca179e1b3b777bd93f11cf1a7b00727cd) | A262 |
| 2026/1/23 | Organized···INSTALL.exe | **Win32/Malgent!MSR**  | 191ee35d59e9a5931693a774419205bd3055408f449328a4d129ea2a4e61c19c | 5a953387-52da-40e1-8260-80d99e55a071 | [VirusTotal](https://www.virustotal.com/gui/file/191ee35d59e9a5931693a774419205bd3055408f449328a4d129ea2a4e61c19c) (18) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/191ee35d59e9a5931693a774419205bd3055408f449328a4d129ea2a4e61c19c) | A263 |
| 2026/1/23 |       666666.exe        | **Win32/Malgent!MSR**  | 9a4021ea3fbb4dacf23117f95aacf3bf2ebcee3266756bec1952300d4a39099c | 61f7cd9e-b5a3-41d4-b3d4-6c6711f65341 | [VirusTotal](https://www.virustotal.com/gui/file/9a4021ea3fbb4dacf23117f95aacf3bf2ebcee3266756bec1952300d4a39099c) (5) |                              无                              | A264 |
| 2026/1/24 |        urPty.rar        | **Win64/Malgent!MSR**  | 7ebec64b37ea3d9e00a5ed90720535ec11f76522d7fb0f4420c9e87e3e6bc6a6 | 8f330e51-1554-48e9-bec3-12d3173f0b6b | [VirusTotal](https://www.virustotal.com/gui/file/7ebec64b37ea3d9e00a5ed90720535ec11f76522d7fb0f4420c9e87e3e6bc6a6) (6) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/7ebec64b37ea3d9e00a5ed90720535ec11f76522d7fb0f4420c9e87e3e6bc6a6) | A265 |
| 2026/1/24 |   letsvpn-latest.exe    | **Win32/Kepavll!rfn**  | c7dafdf4837af753545e6bc68fe019d7db3aab6165aa6c73eacc179908224ec0 | 43d6d70f-e559-45ab-9499-8f430a4949fa | [VirusTotal](https://www.virustotal.com/gui/file/c7dafdf4837af753545e6bc68fe019d7db3aab6165aa6c73eacc179908224ec0) (10) |                              无                              | A266 |
| 2026/1/24 |   ···youdao_inrez.exe   | **Win32/Malgent!MSR**  | fe0eb0ce37e97f0708483f499799a311f0549c60a94d9ebe53f1530514739ca0 | 37a33248-0c3b-4307-b6f8-0587ef40df1a | [VirusTotal](https://www.virustotal.com/gui/file/fe0eb0ce37e97f0708483f499799a311f0549c60a94d9ebe53f1530514739ca0) (10) |                              无                              | A267 |
| 2026/1/24 |   telegarmStex3.0.exe   | **Win64/Malgent!MSR**  | 7ee804102a7156dc5fc20f87b1b0f4db7b27e895a94e95b276b9147f5996ff56 | 82063725-33ed-4036-8ffd-9a90484a28d2 | [VirusTotal](https://www.virustotal.com/gui/file/7ee804102a7156dc5fc20f87b1b0f4db7b27e895a94e95b276b9147f5996ff56) (15) |                              无                              | A268 |
| 2026/1/24 |   youdaofanyi08.4.exe   | **Win32/Malgent!MSR**  | 466503eaf866d60de346c9451452e910d99529ff35b87e5734aed5c41c7b79b9 | 03ba7539-ad83-4cbb-803a-65cc94cc7887 | [VirusTotal](https://www.virustotal.com/gui/file/466503eaf866d60de346c9451452e910d99529ff35b87e5734aed5c41c7b79b9) (7) |                              无                              | A269 |
| 2026/1/24 |    打砖块小游戏.exe     | **Win32/Malgent!MSR**  | 10b01d2bd5db60cf1d67e4269910c4e8a80ae6b4ed9443a49c37be63b49d70f7 | 382db139-70da-4fa5-b6bb-fe6d48e99164 | [VirusTotal](https://www.virustotal.com/gui/file/10b01d2bd5db60cf1d67e4269910c4e8a80ae6b4ed9443a49c37be63b49d70f7) (24) |                              无                              | A270 |
| 2026/1/24 |     GTRF19.3-6.exe      | **Win32/Malgent!MSR**  | e9555dbf4cad2b2a1e3f483f1f3ff689b91b6206aac23e6bb663b6f4bf300202 | 214c485e-5892-46b8-9944-607f7934ef3d | [VirusTotal](https://www.virustotal.com/gui/file/e9555dbf4cad2b2a1e3f483f1f3ff689b91b6206aac23e6bb663b6f4bf300202) (8) |                              无                              | A271 |
| 2026/1/24 |      Loiu9s361.exe      | **Win32/Malgent!MSR**  | 1ca1366b9ab077a719e9249b1b42d0e279ca477fb501fa8ec001ab38b502c8c9 | 5ad0456c-7c08-4146-9b62-7023bb3f6784 | [VirusTotal](https://www.virustotal.com/gui/file/1ca1366b9ab077a719e9249b1b42d0e279ca477fb501fa8ec001ab38b502c8c9) (10) |                              无                              | A272 |
| 2026/1/24 |      tsgx12.3.exe       | **Win32/Malgent!MSR**  | e5294bcaa5736f15c3c6a574ea1e26647eb6f0cedf40831e1fdcfddc6d112854 | 23ea1251-af69-43a2-b99c-63546e7d0d53 | [VirusTotal](https://www.virustotal.com/gui/file/e5294bcaa5736f15c3c6a574ea1e26647eb6f0cedf40831e1fdcfddc6d112854) (16) |                              无                              | A273 |
| 2026/1/24 |      Yghs1.3.6.exe      | **Win32/Malgent!MSR**  | f254de5f7655c316fd1ff60d65ade2f1950bd96b7468ab55260f6f4c23e22f79 | e05984d4-9fae-4c53-90b2-22d0a734e7c9 | [VirusTotal](https://www.virustotal.com/gui/file/f254de5f7655c316fd1ff60d65ade2f1950bd96b7468ab55260f6f4c23e22f79) (12) |                              无                              | A274 |
| 2026/1/25 |        bsod.exe         | **Win32/Malgent!MSR**  | 6e39e74c75072a5ef5533a429c2803278ed1704e84f966acbad405be49b977f0 | 085ab8a9-18ef-408d-8262-a3d3d43e88d2 | [VirusTotal](https://www.virustotal.com/gui/file/6e39e74c75072a5ef5533a429c2803278ed1704e84f966acbad405be49b977f0) (6) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/6e39e74c75072a5ef5533a429c2803278ed1704e84f966acbad405be49b977f0) | A275 |
| 2026/1/26 |   gou_pinyin15.4.msi    |   **Downloader!MSR**   | 1ee71fd14f85fe669ee4deb530b3269877cf0a2ee43e386c897a5e227aecff07 | 03da3034-5b52-4309-923c-9bbe1ab19205 | [VirusTotal](https://www.virustotal.com/gui/file/1ee71fd14f85fe669ee4deb530b3269877cf0a2ee43e386c897a5e227aecff07) (4) |                              无                              | A276 |
| 2026/1/26 |    LWPSFW-FWF···.msi    | **Win32/Malgent!MSR**  | 5335ec120a873c4469a9c0ba64a733affc0634c57eb4738b17e652150918c22e | 214fd7e2-ba39-4862-bdf3-70a945cd5943 | [VirusTotal](https://www.virustotal.com/gui/file/5335ec120a873c4469a9c0ba64a733affc0634c57eb4738b17e652150918c22e) (3) |                              无                              | A277 |
| 2026/1/26 |  wps-setup-1.5.69.msi   | **Win64/Malgent!MSR**  | 58a3b5853e0362014a617a3cfa9a383456ec0e388ea3d32d5fdb8cd088231754 | 945ae111-911d-4559-8786-3ac64e901b58 | [VirusTotal](https://www.virustotal.com/gui/file/58a3b5853e0362014a617a3cfa9a383456ec0e388ea3d32d5fdb8cd088231754) (6) |                              无                              | A278 |
| 2026/1/26 |  wps-setup1.8.6.18.msi  | **Win32/Malgent!MSR**  | 2e6bbb78e7ced7e9f8790b0f01156105d8046f81e43db413917e43f4eb7a1ef4 | 139ecc60-2ba5-49ae-b00e-be16b7dd634b | [VirusTotal](https://www.virustotal.com/gui/file/2e6bbb78e7ced7e9f8790b0f01156105d8046f81e43db413917e43f4eb7a1ef4) (2) |                              无                              | A279 |
| 2026/1/26 |     0820_25443.exe      | **Win32/AutoRun!atmn** | 4d5dff68622d9b547579e634463bfb1e3152a6ac791b5ae54c22e984151fb3ca | 422621fd-9d58-40ca-a01a-8cf24870f59f | [VirusTotal](https://www.virustotal.com/gui/file/4d5dff68622d9b547579e634463bfb1e3152a6ac791b5ae54c22e984151fb3ca) (58) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/4d5dff68622d9b547579e634463bfb1e3152a6ac791b5ae54c22e984151fb3ca) | A280 |
| 2026/1/26 |   GG_DesktopSetup.exe   | **Win32/Malgent!MSR**  | 5a99c0158935379354450641591d671c80d131c946eb73ac49321d48816cf8e6 | 0efacd6d-acc3-4711-ba09-0a3c3e92ad11 | [VirusTotal](https://www.virustotal.com/gui/file/5a99c0158935379354450641591d671c80d131c946eb73ac49321d48816cf8e6) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5a99c0158935379354450641591d671c80d131c946eb73ac49321d48816cf8e6) | A281 |
|  ——————   |      ————————————       |      ————————————      |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

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
| 2026/1/20 |     hxxps://todeskpc[.]com[.]cn     | 仿冒 ToDesk、传播病毒  | hxxps://todesk-cn[.]oss-cn-hongkong[.]aliyuncs[.]com/ToDesklets-stup1[.]7[.]79[.]zip |                            无                            | Z060 |
| 2026/1/20 |        hxxps://todesk[.]app         | 仿冒 ToDesk、传播病毒  | hxxps://2026kk[.]oss-cn-hongkong[.]aliyuncs[.]com/ToDesk_4[.]8[.]1[.]2[.]zip |                            无                            | Z061 |
| 2026/1/20 |    hxxps://www[.]todesk-cn[.]cn     | 仿冒 ToDesk、传播病毒  |                              无                              |                            无                            | Z062 |
| 2026/1/20 |    hxxps://www[.]zh-todesk[.]com    | 仿冒 ToDesk、传播病毒  |                              无                              |                            无                            | Z063 |
| 2026/1/20 |       hxxps://toamndkf[.]cyou       | 仿冒 ToDesk、传播病毒  | hxxps://pub-d57956a6ad284a3ea9a0112e6e0c4896[.]r2[.]dev/Sghmwidaniegv[.]zip |                            无                            | Z064 |
| 2026/1/22 |  hxxps://chroome-google[.]com[.]cn  | 仿冒 Chrome、传播病毒  |                              无                              |                            无                            | Z065 |
| 2026/1/22 |    hxxps://dd-google[.]com[.]cn     | 仿冒 Chrome、传播病毒  | hxxps://chrome[.]download-google-chrome[.]top/download/Chromeab-x64[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3761834) | Z066 |
| 2026/1/22 |    hxxps://sf-google[.]com[.]cn     | 仿冒 Chrome、传播病毒  | hxxps://googdownload[.]googcdngoogleownload[.]top/google/download/Chrome[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3761832) | Z067 |
| 2026/1/22 |    hxxps://oa-google[.]com[.]cn     | 仿冒 Chrome、传播病毒  |      hxxps://olekndx[.]hoyenoy[.]com/google12[.]3[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3761835) | Z068 |
| 2026/1/22 |     hxxps://cc-chrom[.]com[.]cn     | 仿冒 Chrome、传播病毒  |      hxxps://olekndx[.]hoyenoy[.]com/google12[.]3[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3761835) | Z069 |
| 2026/1/22 | hxxps://www[.]ro-google[.]com[.]cn  | 仿冒 Chrome、传播病毒  |                              无                              |                            无                            | Z070 |
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