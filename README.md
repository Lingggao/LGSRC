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

&emsp;&emsp;上次更新时间：2026 年 3 月 24 日 10:00 (GMT+8)

&emsp;&emsp;**截至 2026 年 3 月 24 日，已打击计算机病毒 / 恶意软件 676 个、恶意网站 223 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |          文件名          |           检测           |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :----------------------: | :----------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/3/20 |       LetsVPN.exe        |   **ShellcodeRunner**    | 06ce77ff596c35c7c8fadbf45d5b5928c57af9a5bc3afd4592a0a8836572aa3e | aca6ba30-f40f-4717-a6c7-1f6734e78b78 | [VirusTotal](https://www.virustotal.com/gui/file/06ce77ff596c35c7c8fadbf45d5b5928c57af9a5bc3afd4592a0a8836572aa3e) (4) |                              无                              | A650 |
| 2026/3/20 |     letsvp_setup.exe     | **银狐 (SilverFox.sa)**  | c0fcad0ba982fd95958248c73ee12f1732229632fde97d645e2e479cc664bf84 | 9b65f7ea-bdda-40c4-9406-fbc2e6f53752 | [VirusTotal](https://www.virustotal.com/gui/file/c0fcad0ba982fd95958248c73ee12f1732229632fde97d645e2e479cc664bf84) (11) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c0fcad0ba982fd95958248c73ee12f1732229632fde97d645e2e479cc664bf84) | A651 |
| 2026/3/20 |     %e6%96···048.exe     | **银狐 (SilverFox.sa)**  | d02ca30fbc880b849ef53cfb14fd5c8c2afc246ee9350fc7ab1793d5588d11b9 | 3a2d13d9-2983-484d-b282-bf1b7353bad0 | [VirusTotal](https://www.virustotal.com/gui/file/d02ca30fbc880b849ef53cfb14fd5c8c2afc246ee9350fc7ab1793d5588d11b9) (3) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d02ca30fbc880b849ef53cfb14fd5c8c2afc246ee9350fc7ab1793d5588d11b9) | A652 |
| 2026/3/20 |        danma.exe         | **银狐 (SilverFox.wos)** | 0f07ad05a0f1c0f0c232ed50bc56de228f1500c98be8bacda16035c318709ca9 | 44ff83dc-45db-4f53-9865-86611995f27e | [VirusTotal](https://www.virustotal.com/gui/file/0f07ad05a0f1c0f0c232ed50bc56de228f1500c98be8bacda16035c318709ca9) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/0f07ad05a0f1c0f0c232ed50bc56de228f1500c98be8bacda16035c318709ca9) | A653 |
| 2026/3/20 |    QQ截图···.png.com     |      **Cybercrime**      | c0861f5be19ead006864f44bbf542572ebf35ab3da3a547ec06770a5685d8b29 | 8f956777-f7c3-4c98-821d-8a4e38e5c4e9 | [VirusTotal](https://www.virustotal.com/gui/file/c0861f5be19ead006864f44bbf542572ebf35ab3da3a547ec06770a5685d8b29) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c0861f5be19ead006864f44bbf542572ebf35ab3da3a547ec06770a5685d8b29) | A654 |
| 2026/3/20 |  苹果···快递单号···.exe  |   **银狐 (SilverFox)**   | d4c7157d593e6ac6c4afc9a466f731d577caee271a29ca8ef0bc9acd12322c4e | db621112-52fa-49af-b568-eeda10f39c4f | [VirusTotal](https://www.virustotal.com/gui/file/d4c7157d593e6ac6c4afc9a466f731d577caee271a29ca8ef0bc9acd12322c4e) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d4c7157d593e6ac6c4afc9a466f731d577caee271a29ca8ef0bc9acd12322c4e) | A655 |
| 2026/3/21 |      3.20ToDesk.exe      | **银狐 (SilverFox.sa)**  | 5666ea13363e66098c490f88821dd251b2082ef2fa4d9de797a5701a3584969b | d766fae0-2a20-4744-b6ba-920f20ae0782 | [VirusTotal](https://www.virustotal.com/gui/file/5666ea13363e66098c490f88821dd251b2082ef2fa4d9de797a5701a3584969b) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5666ea13363e66098c490f88821dd251b2082ef2fa4d9de797a5701a3584969b) | A656 |
| 2026/3/21 |   qishui64x···192.exe    |   **银狐 (SilverFox)**   | 0a4824698404f31c692ed4867716efa290575c277139f291a23c2a52d1a5ac32 | 9f29ebe7-ad63-45b0-a85d-8ff5172e534f | [VirusTotal](https://www.virustotal.com/gui/file/0a4824698404f31c692ed4867716efa290575c277139f291a23c2a52d1a5ac32) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/0a4824698404f31c692ed4867716efa290575c277139f291a23c2a52d1a5ac32) | A657 |
| 2026/3/21 |     qishuiyy3.5.exe      |   **银狐 (SilverFox)**   | 1d60335eb78ecb9d8069e1c902e9914e31c64e513370e0dbb579f2544dc49835 | 19c1e3dd-0da0-43df-8b61-bfdf564a5048 | [VirusTotal](https://www.virustotal.com/gui/file/1d60335eb78ecb9d8069e1c902e9914e31c64e513370e0dbb579f2544dc49835) (8) |                              无                              | A658 |
| 2026/3/22 |        77979.exe         |   **银狐 (SilverFox)**   | ff53f6208eb91890aedfc7e51b769f2c2aca95c985000ef9ddcb32e16d2a6788 | 31dfd708-d20d-4c20-936d-76a2ffef9117 | [VirusTotal](https://www.virustotal.com/gui/file/ff53f6208eb91890aedfc7e51b769f2c2aca95c985000ef9ddcb32e16d2a6788) (29) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ff53f6208eb91890aedfc7e51b769f2c2aca95c985000ef9ddcb32e16d2a6788) | A659 |
| 2026/3/22 |     KuaiLianLets.exe     | **银狐 (SilverFox.sa)**  | f14deb920da627d47f205163fc2c9002c598fbc6e5233d91ab185294cb9a38ef | 92373710-0fac-4662-9f85-5d5619c70b92 | [VirusTotal](https://www.virustotal.com/gui/file/f14deb920da627d47f205163fc2c9002c598fbc6e5233d91ab185294cb9a38ef) (7) |                              无                              | A660 |
| 2026/3/22 |    ···简体语言包.exe     | **银狐 (SilverFox.sae)** | a47803a514f65e1c94a01f3ba83baaf2547a94ec266b92def5df8232ddee5cdf |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/a47803a514f65e1c94a01f3ba83baaf2547a94ec266b92def5df8232ddee5cdf) (4) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a47803a514f65e1c94a01f3ba83baaf2547a94ec266b92def5df8232ddee5cdf) | A661 |
| 2026/3/22 |  柬埔寨警方通告···.exe   |  **Win32/Malgent!MSR**   | 1447b57a09a8759ab98c8958b655ed082388bf562261477664f9e90ce87ac2a9 | 07781c45-6264-4f64-ad4a-4d2900b4c30f | [VirusTotal](https://www.virustotal.com/gui/file/1447b57a09a8759ab98c8958b655ed082388bf562261477664f9e90ce87ac2a9) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1447b57a09a8759ab98c8958b655ed082388bf562261477664f9e90ce87ac2a9) | A662 |
| 2026/3/22 |   AisiTools···x64.exe    | **银狐 (SilverFox.wos)** | 7570f4c001af6efd19899e178aadf7a6ca9b3ab140f84050182a395e1fb496a8 | e9808016-3f06-453d-bf7a-52e53cbb78db | [VirusTotal](https://www.virustotal.com/gui/file/7570f4c001af6efd19899e178aadf7a6ca9b3ab140f84050182a395e1fb496a8) (14) |                              无                              | A663 |
| 2026/3/23 |       infected.exe       |   **银狐 (SilverFox)**   | 9e35b8217ae4cc4c77db3eeb0303eeef9e614500202b76377b8a2c7b52de3220 | ea44055e-c994-4f9d-bd78-417805cfa378 | [VirusTotal](https://www.virustotal.com/gui/file/9e35b8217ae4cc4c77db3eeb0303eeef9e614500202b76377b8a2c7b52de3220) (8) |                              无                              | A664 |
| 2026/3/23 |   sun_oray_v16.2.0.msi   |   **银狐 (SilverFox)**   | d39c9c034e5ac5023060995c0393b090ecb69f288d41aecad6227f8bb5df2931 | 81a1a3c4-760e-4d20-86b4-1a0c1e234c00 | [VirusTotal](https://www.virustotal.com/gui/file/d39c9c034e5ac5023060995c0393b090ecb69f288d41aecad6227f8bb5df2931) (13) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d39c9c034e5ac5023060995c0393b090ecb69f288d41aecad6227f8bb5df2931) | A665 |
| 2026/3/23 |     3.210ToDesk.exe      | **银狐 (SilverFox.sa)**  | b7ee0c399d6706c799d38cc79e72710875f13917bd0763ab07cad806d44b16ad | 3a3de9af-b5a4-43c4-a92c-5480f21ea0a6 | [VirusTotal](https://www.virustotal.com/gui/file/b7ee0c399d6706c799d38cc79e72710875f13917bd0763ab07cad806d44b16ad) (3) |                              无                              | A666 |
| 2026/3/23 |       TD-Setup.msi       | **银狐 (SilverFox.cw)**  | 42588b248c62d435629ef601eab4e1f984791154ad43be9347aa400a63708c77 | 15cbc31a-8bda-4708-8f38-93d64e54b3b0 | [VirusTotal](https://www.virustotal.com/gui/file/42588b248c62d435629ef601eab4e1f984791154ad43be9347aa400a63708c77) (3) |                              无                              | A667 |
| 2026/3/23 |     ToDesk_Setup.exe     |  **Win32/Malgent!MSR**   | 922facf46d6d16e6553cb5e2c62dfb84bda37c3d285ef6b83a527b2e8caed0b9 | 33228810-3d80-46da-9f3f-18cef1a747d0 | [VirusTotal](https://www.virustotal.com/gui/file/922facf46d6d16e6553cb5e2c62dfb84bda37c3d285ef6b83a527b2e8caed0b9) (1) |                              无                              | A668 |
| 2026/3/23 |   ToDsored···x6.2.msi    |   **银狐 (SilverFox)**   | 88ec0aa0210d9dfb6ad524bd46e2386a535bd139a459d7add3e6f51b5c2debea | 5a53600d-45ca-4c80-bccc-408cbfebb8bd | [VirusTotal](https://www.virustotal.com/gui/file/88ec0aa0210d9dfb6ad524bd46e2386a535bd139a459d7add3e6f51b5c2debea) (4) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/88ec0aa0210d9dfb6ad524bd46e2386a535bd139a459d7add3e6f51b5c2debea) | A669 |
| 2026/3/23 | ···最 新 人 员 信 息.exe | **银狐 (SilverFox.sad)** | f6c99db6a66da81b103dbcbc984c8ad4f2878b0a3e561bd8a1a38c7578db48ed | 6fd054cc-81e7-4a4c-bb33-d09e70b64fd0 | [VirusTotal](https://www.virustotal.com/gui/file/f6c99db6a66da81b103dbcbc984c8ad4f2878b0a3e561bd8a1a38c7578db48ed) (11) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f6c99db6a66da81b103dbcbc984c8ad4f2878b0a3e561bd8a1a38c7578db48ed) | A670 |
| 2026/3/23 | ···03.23裁员名单···.exe  | **银狐 (SilverFox.bg)**  | 44e525ee84e2b8d8429dfa4acff55e8c4aec790e348d02a1b834358787d19616 | 30a43ae2-0d99-4281-b03b-3e593a94bbdf | [VirusTotal](https://www.virustotal.com/gui/file/44e525ee84e2b8d8429dfa4acff55e8c4aec790e348d02a1b834358787d19616) (6) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/44e525ee84e2b8d8429dfa4acff55e8c4aec790e348d02a1b834358787d19616) | A671 |
| 2026/3/23 |        temp!_.exe        |      **Cybercrime**      | 20d4833af9c6c79a3758c5a71c1332966c44783de0070444f93814a91fec5dbb | 54cddb59-e902-4c79-ab18-5c7fb23e643d | [VirusTotal](https://www.virustotal.com/gui/file/20d4833af9c6c79a3758c5a71c1332966c44783de0070444f93814a91fec5dbb) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/20d4833af9c6c79a3758c5a71c1332966c44783de0070444f93814a91fec5dbb) | A672 |
| 2026/3/23 |   接码用户端2.0版s.exe   |    **Backdoor/Gh0st**    | 6b4038f0a5e9a245e0cfadcf3c92da10b84129841b5ce007b056206e79af08b0 | 7e9bf04c-7200-42b2-8e05-e80ef0035404 | [VirusTotal](https://www.virustotal.com/gui/file/6b4038f0a5e9a245e0cfadcf3c92da10b84129841b5ce007b056206e79af08b0) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/6b4038f0a5e9a245e0cfadcf3c92da10b84129841b5ce007b056206e79af08b0) | A673 |
| 2026/3/23 |        loader.exe        |   **银狐 (SilverFox)**   | c092e3b047c6173359e3e9d870de4db19c494de42d7ef511b822e301860e56a3 | 0ffea019-f146-463a-959c-354bf33e84c8 | [VirusTotal](https://www.virustotal.com/gui/file/c092e3b047c6173359e3e9d870de4db19c494de42d7ef511b822e301860e56a3) (8) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c092e3b047c6173359e3e9d870de4db19c494de42d7ef511b822e301860e56a3) | A674 |
| 2026/3/23 |    Eal-cnnqot···.exe     |   **银狐 (SilverFox)**   | ee596eba614770d22d93e5c588ba8e56613bb6900b2706396707508e5a868baa | a4182eac-46eb-4744-9885-26a5862ca16d | [VirusTotal](https://www.virustotal.com/gui/file/ee596eba614770d22d93e5c588ba8e56613bb6900b2706396707508e5a868baa) (4) |                              无                              | A675 |
| 2026/3/23 |   uardian_gogle···.exe   | **银狐 (SilverFox.sa)**  | 0c881c61077d2931bd9d5cb60507e44eee7165b79c47a8206fa309c499c11b08 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/0c881c61077d2931bd9d5cb60507e44eee7165b79c47a8206fa309c499c11b08) (6) |                              无                              | A676 |
|  ——————   |       ————————————       |       ————————————       |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近约 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---

【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期    |                   URL                   |          类别          |                           有效载荷                           |                         URLhaus                          | 编号 |
| :-------: | :-------------------------------------: | :--------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/3/16 |  hxxps://www[.]cc-openclaw[.]com[.]cn   |  仿冒 OpenClaw “龙虾”  |    hxxp://www[.]web-openclaw[.]com[.]cn/pc/openclaw[.]zip    |                            无                            | Z201 |
| 2026/3/18 |   hxxps://google-google-web[.]hl[.]cn   | 仿冒 Chrome、传播病毒  |       hxxps://www[.]irbis2000[.]com/Chro_Setup64[.]exe       |                            无                            | Z202 |
| 2026/3/18 |  hxxps://chromeapps-google[.]com[.]cn   | 仿冒 Chrome、传播病毒  |                              无                              |                            无                            | Z203 |
| 2026/3/18 |    hxxps://chrom-gooogle[.]com[.]cn     | 仿冒 Chrome、传播病毒  |       hxxps://hjendcs[.]x98665[.]com/liulanSetup[.]zip       | [URLhaus Database](https://urlhaus.abuse.ch/url/3798427) | Z204 |
| 2026/3/18 |   hxxps://ad-google-google[.]com[.]cn   | 仿冒 Chrome、传播病毒  |           hxxps://tranyasy[.]com[.]cn/Google[.]zip           | [URLhaus Database](https://urlhaus.abuse.ch/url/3798428) | Z205 |
| 2026/3/18 |     hxxps://cn-gooogle-zh[.]hl[.]cn     | 仿冒 Chrome、传播病毒  |   hxxps://daw[.]tos-cn-hongkong[.]volces[.]com/Dwglq[.]zip   | [URLhaus Database](https://urlhaus.abuse.ch/url/3798426) | Z206 |
| 2026/3/18 | hxxps://cn[.]h-google-google[.]com[.]cn | 仿冒 Chrome、传播病毒  |                              无                              |                            无                            | Z207 |
| 2026/3/21 |  hxxps://qishuimusic-music[.]com[.]cn   | 仿冒汽水音乐、传播病毒 |                              无                              |                            无                            | Z208 |
| 2026/3/21 |       hxxps://qishui-zh[.]hl[.]cn       | 仿冒汽水音乐、传播病毒 | hxxps://klsmw[.]oss-cn-hongkong[.]aliyuncs[.]com/qishui0317_setup154[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3802100) | Z209 |
| 2026/3/21 |      hxxps://www-qishui[.]com[.]cn      | 仿冒汽水音乐、传播病毒 |                              有                              |                            无                            | Z210 |
| 2026/3/21 |    hxxps://qiishuiyinyue[.]com[.]cn     | 仿冒汽水音乐、传播病毒 |    hxxps://j3hednc[.]x98665[.]com/Sodaqishui14[.]2[.]zip     |                            无                            | Z211 |
| 2026/3/21 |   hxxps://qishuimusic-music[.]hl[.]cn   | 仿冒汽水音乐、传播病毒 |                              无                              |                            无                            | Z212 |
| 2026/3/23 |          hxxps://todesk[.]app           | 仿冒 ToDesk、传播病毒  |   hxxps://download-pc[.]us/ToDesk_Setup[.]exe_FCzpH[.]zip    |                            无                            | Z213 |
| 2026/3/23 |        hxxps://www[.]todesk[.]im        | 仿冒 ToDesk、传播病毒  |                              有                              |                            无                            | Z214 |
| 2026/3/23 |      hxxps://apd-todesk[.]com[.]cn      | 仿冒 ToDesk、传播病毒  |          hxxps://tranyasy[.]com[.]cn/TD-Setup[.]zip          | [URLhaus Database](https://urlhaus.abuse.ch/url/3802588) | Z215 |
| 2026/3/23 |      hxxps://www[.]todeskapp[.]com      | 仿冒 ToDesk、传播病毒  |                              有                              |                            无                            | Z216 |
| 2026/3/23 |       hxxps://www[.]todeski[.]com       | 仿冒 ToDesk、传播病毒  |    hxxps://xiazguawanzhuanbao[.]com/1/3[.]210ToDesk[.]zip    |                            无                            | Z217 |
| 2026/3/23 |       hxxps://www[.]todeske[.]com       | 仿冒 ToDesk、传播病毒  |    hxxps://xiazguawanzhuanbao[.]com/1/3[.]210ToDesk[.]zip    |                            无                            | Z218 |
| 2026/3/23 |      hxxps://www[.]zh-todesk[.]com      | 仿冒 ToDesk、传播病毒  |                              无                              |                            无                            | Z219 |
| 2026/3/23 |    hxxps://www[.]to-desk[.]com[.]cn     | 仿冒 ToDesk、传播病毒  |                              无                              |                            无                            | Z220 |
| 2026/3/23 |         hxxps://toamndkf[.]cyou         | 仿冒 ToDesk、传播病毒  |    hxxps://xiazguawanzhuanbao[.]com/1/3[.]210ToDesk[.]zip    |                            无                            | Z221 |
| 2026/3/23 |  hxxps://cn[.]cn-google-com[.]com[.]cn  | 仿冒 Chrome、传播病毒  | hxxps://googelfasdjkta[.]s3[.]ap-south-1[.]amazonaws[.]com/uardian_gogletipam[.]zip |                            无                            | Z222 |
| 2026/3/23 |     hxxps://cn-www-google[.]hl[.]cn     | 仿冒 Chrome、传播病毒  | hxxps://googelfasdjkta[.]s3[.]ap-south-1[.]amazonaws[.]com/Eal-cnnqotbstueiakll[.]zip |                            无                            | Z223 |
|  ——————   |          ————————————————————           |    ———————————————     |                ——————————————————————————————                |                        ——————————                        | ———  |

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