<SPAN ID = 'HEAD'/>

<div align="center">
<img src="Images/Microsoft MCI.png" width = "12%" /><img src="Images/LING_2.png" width = "25%" /> <img src="Images/WCC2024_2.png" width = "12%" />
</div>

<h1 align="center">灵糕中心 · 安全响应分中心</h1>

<h3 align="center">(LGHUB · Security Response Center)</h3>

[github.com/Lingggao/LGSRC](https://github.com/Lingggao/LGSRC) (GitHub) & [lingggao.github.io/LGSRC](https://lingggao.github.io/LGSRC) (Pages)

&emsp;&emsp;**用于打击计算机病毒与恶意软件的 “[灵糕中心](https://github.com/Lingggao/LGHUB) · 安全响应分中心”**。由 2021 Windows Insider 最有价值专家 (MVP) · [**Ling Gao**](https://github.com/Lingggao) 先生管理。灵糕中心 · 安全响应分中心成立于 2025 年 12 月 20 日。

> [!IMPORTANT]
>
> &emsp;灵糕中心为个人项目，管理者**不是** Microsoft 公司员工，**不能**代表 Microsoft 公司立场、态度。

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

&emsp;&emsp;上次更新时间：2026 年 1 月 5 日 20:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 1 月 5 日，已打击计算机病毒 / 恶意软件 141 个、恶意网站 2 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期   |           文件名           |          检测          |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :------: | :------------------------: | :--------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/1/2 |        uftutrt.exe         | **Win32/Malgent!MSR**  | 454972a63c641af5f72bd9ba8bde7c0caf4fc8872cbbcc3162a47e1e2f3dc386 | 6d11747f-aeb2-43e6-8787-250d48c39715 | [VirusTotal](https://www.virustotal.com/gui/file/454972a63c641af5f72bd9ba8bde7c0caf4fc8872cbbcc3162a47e1e2f3dc386) (16) |                              无                              | 0116 |
| 2026/1/2 |      sfhfdhhjrsj.exe       | **Win32/Malgent!MSR**  | 3d0887289e3cc85b09b575e5b65e121ee25d33d66b21082a75363a3e397f9123 | 486c9fba-f155-4485-848c-48d16094bcfa | [VirusTotal](https://www.virustotal.com/gui/file/3d0887289e3cc85b09b575e5b65e121ee25d33d66b21082a75363a3e397f9123) (7) |                              无                              | 0117 |
| 2026/1/3 |       值班表.xls.exe       | **Win32/Malgent!MSR**  | 28a3c1554c3025c4a252094e18ad1aed931c71edc992eec9dfc991f893f6b438 | 639caee4-e5ad-4e20-b82b-f7dec372ed0e | [VirusTotal](https://www.virustotal.com/gui/file/28a3c1554c3025c4a252094e18ad1aed931c71edc992eec9dfc991f893f6b438) (19) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/28a3c1554c3025c4a252094e18ad1aed931c71edc992eec9dfc991f893f6b438) | 0118 |
| 2026/1/3 |   D..e.e.p.L_X64.1.3.exe   | **Win32/Malgent!MSR**  | 5eb2299706493e2a6a3c30c2253ffbf0f644515745035b7f858e5b90d29c5662 | 9000180b-30d2-40a6-9a54-4f154bb6a025 | [VirusTotal](https://www.virustotal.com/gui/file/5eb2299706493e2a6a3c30c2253ffbf0f644515745035b7f858e5b90d29c5662) (4) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5eb2299706493e2a6a3c30c2253ffbf0f644515745035b7f858e5b90d29c5662) | 0119 |
| 2026/1/3 |  wincows_lestx64.1.3.exe   | **Win32/Malgent!MSR**  | 405d1935735fd061b48bb1080223a297e23fcf53eccfde4e5f1de20977645f44 | 9000180b-30d2-40a6-9a54-4f154bb6a025 | [VirusTotal](https://www.virustotal.com/gui/file/405d1935735fd061b48bb1080223a297e23fcf53eccfde4e5f1de20977645f44) (2) |                              无                              | 0120 |
| 2026/1/3 |       output_64.exe        | **Win64/GhostRat.CKD** | 7e19d36f49962f9606608514a34032e5b8af6ca64b97d0986f0c08fada006a70 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/7e19d36f49962f9606608514a34032e5b8af6ca64b97d0986f0c08fada006a70) (51) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/7e19d36f49962f9606608514a34032e5b8af6ca64b97d0986f0c08fada006a70) | 0121 |
| 2026/1/3 |         getexe.exe         | **Win32/Wacatac.F!ml** | af524c3cc9c894c6b6e91094cbf7c834ebdf5acc93c17dbaf5f8cb9a51c53187 | ed693798-bb38-4c42-bea0-dfd06ace5901 | [VirusTotal](https://www.virustotal.com/gui/file/af524c3cc9c894c6b6e91094cbf7c834ebdf5acc93c17dbaf5f8cb9a51c53187) (14) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/af524c3cc9c894c6b6e91094cbf7c834ebdf5acc93c17dbaf5f8cb9a51c53187) | 0122 |
| 2026/1/3 |      QQ1666213767.exe      | **Win32/AutoRun!atmn** | 451fe418159b0826d1b007d8bba9b8374760b9eee8a99bcad38bb62375a049e7 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/451fe418159b0826d1b007d8bba9b8374760b9eee8a99bcad38bb62375a049e7) (62) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/451fe418159b0826d1b007d8bba9b8374760b9eee8a99bcad38bb62375a049e7) | 0123 |
| 2026/1/3 |   ···安装中文语言包.exe    | **Win32/Wacatac.C!ml** | d378fabc30fb2defa95124ca6220497dcdc0f95253afaf0f209810ba68db64a5 | 23cc46d7-97c1-4abd-9b7f-28fcadbfc694 | [VirusTotal](https://www.virustotal.com/gui/file/d378fabc30fb2defa95124ca6220497dcdc0f95253afaf0f209810ba68db64a5) (31) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d378fabc30fb2defa95124ca6220497dcdc0f95253afaf0f209810ba68db64a5) | 0124 |
| 2026/1/4 |   googlo_Intelest···.msi   | **Win32/Malgent!MSR**  | 77576ae75f5e8139698a78a431dfeffb182998850020a4b1328a7d3b01c9b9e8 | 0dd2e15e-3e49-4c20-8b19-1177a83cb9fa | [VirusTotal](https://www.virustotal.com/gui/file/77576ae75f5e8139698a78a431dfeffb182998850020a4b1328a7d3b01c9b9e8) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/77576ae75f5e8139698a78a431dfeffb182998850020a4b1328a7d3b01c9b9e8) | 0125 |
| 2026/1/4 |       谷歌浏览器.msi       | **Win32/Malgent!MSR**  | dc3f65a78d171f91d2309592cd4d3528cad11d0fe5fe3ae6232150961e3960a8 | edf6c68e-631e-48ec-bb08-429affa3d1f3 | [VirusTotal](https://www.virustotal.com/gui/file/dc3f65a78d171f91d2309592cd4d3528cad11d0fe5fe3ae6232150961e3960a8) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/dc3f65a78d171f91d2309592cd4d3528cad11d0fe5fe3ae6232150961e3960a8) | 0126 |
| 2026/1/4 |         777777.exe         | **Win32/Malgent!MSR**  | ade35af6b9f4da96ae0b64c57df3eb5fc33e72847921b8ee929ba8620756788e | 2f1d0b94-edce-4fb2-a0fa-16d4032d0979 | [VirusTotal](https://www.virustotal.com/gui/file/ade35af6b9f4da96ae0b64c57df3eb5fc33e72847921b8ee929ba8620756788e) (10) |                              无                              | 0127 |
| 2026/1/4 |     Quark_WebH···.msi      | **Win32/Malgent!MSR**  | ae0c28da1bf3acde19ba33b275fe09e73d6a49b6d3282fb1057d50f5c752b553 | 64cd8312-2519-49c6-8fe6-3b9aeead0e8d | [VirusTotal](https://www.virustotal.com/gui/file/ae0c28da1bf3acde19ba33b275fe09e73d6a49b6d3282fb1057d50f5c752b553) (6) |                              无                              | 0128 |
| 2026/1/4 |     AweSun_yuan···.exe     | **Win32/Malgent!MSR**  | 8521cb16a844b81d87e591288b186da46f585a9c7756c3aac6eb8940e67ca09d |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/8521cb16a844b81d87e591288b186da46f585a9c7756c3aac6eb8940e67ca09d) (27) |                              无                              | 0129 |
| 2026/1/4 |     兴趣爱好旅行：.bat     | **Win32/Wacatac.F!ml** | 007da2fdf5cfdd224365517c1f9a1a73d0765624bd7a56df7585d0a614895f57 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/007da2fdf5cfdd224365517c1f9a1a73d0765624bd7a56df7585d0a614895f57) (25) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/007da2fdf5cfdd224365517c1f9a1a73d0765624bd7a56df7585d0a614895f57) | 0130 |
| 2026/1/4 |        myexetra.exe        |  **Backdoor:Farfli**   | 192ec289aef24bf1cdb74a5c4cd25b84d458e078c732b3aef9d1eda336f6e338 | f05eb2cc-5d5c-4786-b5ca-f76cc6c2bca6 | [VirusTotal](https://www.virustotal.com/gui/file/192ec289aef24bf1cdb74a5c4cd25b84d458e078c732b3aef9d1eda336f6e338) (31) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/192ec289aef24bf1cdb74a5c4cd25b84d458e078c732b3aef9d1eda336f6e338) | 0131 |
| 2026/1/4 |         Setup1.exe         | **Win32/Malgent!MSR**  | 749a094dd333916249a24c7e9540c9f7f22c8ead8a9b1bb353aeaf1b8e195fb9 | f05eb2cc-5d5c-4786-b5ca-f76cc6c2bca6 | [VirusTotal](https://www.virustotal.com/gui/file/749a094dd333916249a24c7e9540c9f7f22c8ead8a9b1bb353aeaf1b8e195fb9) (15) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/749a094dd333916249a24c7e9540c9f7f22c8ead8a9b1bb353aeaf1b8e195fb9) | 0132 |
| 2026/1/4 |        version.dll         | **Win32/Malgent!MSR**  | a67db7889b2bb834b178bd712724b0a2b636890eadaad917ce6256975cddda3c | fae8576a-245b-4292-a4d4-59a12e1573f1 | [VirusTotal](https://www.virustotal.com/gui/file/a67db7889b2bb834b178bd712724b0a2b636890eadaad917ce6256975cddda3c) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a67db7889b2bb834b178bd712724b0a2b636890eadaad917ce6256975cddda3c) | 0133 |
| 2026/1/5 |   ToDsured-star-x6.4.msi   |  **Win32/Etset!rfn**   | c84fab7e95b214dc20804c41ec32cc8f3fe5dc36e2b9d6f82ff816bc7ff8e28f | 48de4c3f-4676-4590-a58d-9cfce170acd9 | [VirusTotal](https://www.virustotal.com/gui/file/c84fab7e95b214dc20804c41ec32cc8f3fe5dc36e2b9d6f82ff816bc7ff8e28f) (11) |                              无                              | 0134 |
| 2026/1/5 | ···违纪人员内部调查···.exe | **Win32/Wacatac.F!ml** | e41a662cfe3e1395bf1a75461e08e3f5d213e46e41b2fd67a27fa69621fc5095 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/e41a662cfe3e1395bf1a75461e08e3f5d213e46e41b2fd67a27fa69621fc5095) (33) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e41a662cfe3e1395bf1a75461e08e3f5d213e46e41b2fd67a27fa69621fc5095) | 0135 |
| 2026/1/5 | ···违纪人员内部调查···.exe | **Win32/Wacatac.F!ml** | eb7d0a443bfcd9c112285d307c119dd73ee8ac0a0f5b72aff21e4b3f281e4500 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/eb7d0a443bfcd9c112285d307c119dd73ee8ac0a0f5b72aff21e4b3f281e4500) (26) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/eb7d0a443bfcd9c112285d307c119dd73ee8ac0a0f5b72aff21e4b3f281e4500) | 0136 |
| 2026/1/5 |          exe.exe           | **Win32/Wacatac.F!ml** | e15dc8069c3c3d37b1113216e318117c6b9bb532e675b22421521708e5457846 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/e15dc8069c3c3d37b1113216e318117c6b9bb532e675b22421521708e5457846) (16) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e15dc8069c3c3d37b1113216e318117c6b9bb532e675b22421521708e5457846) | 0137 |
| 2026/1/5 |     01.04违法人员.exe      | **Win64/Malgent!MSR**  | 0eb4fbd10784e8412d9d8d086b1f05c28ea9f5d26cef9a9b9d12f9446d9f9304 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/0eb4fbd10784e8412d9d8d086b1f05c28ea9f5d26cef9a9b9d12f9446d9f9304) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/0eb4fbd10784e8412d9d8d086b1f05c28ea9f5d26cef9a9b9d12f9446d9f9304) | 0138 |
| 2026/1/5 |     人员名单···155.exe     | **Win64/Malgent!MSR**  | c88c2f98d3ccd66354dabfd7919a7f96b90659b1682f8810340b71d34165f461 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/c88c2f98d3ccd66354dabfd7919a7f96b90659b1682f8810340b71d34165f461) (18) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c88c2f98d3ccd66354dabfd7919a7f96b90659b1682f8810340b71d34165f461) | 0139 |
| 2026/1/5 |          2025.exe          |  **Win32/Fuery.D!cl**  | 67c6dee50d41bae5c85c4b347cf471d0ba0b9edb33de8a93abb4fa1ae0fdeba0 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/67c6dee50d41bae5c85c4b347cf471d0ba0b9edb33de8a93abb4fa1ae0fdeba0) (39) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/67c6dee50d41bae5c85c4b347cf471d0ba0b9edb33de8a93abb4fa1ae0fdeba0) | 0140 |
| 2026/1/5 |        identity.exe        | **Win64/Donut.C!MTB**  | f50b9b888107644204921d8449bc7ef4fe358cd5ccca87a7cf5944a00d00dcc8 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/f50b9b888107644204921d8449bc7ef4fe358cd5ccca87a7cf5944a00d00dcc8) (29) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f50b9b888107644204921d8449bc7ef4fe358cd5ccca87a7cf5944a00d00dcc8) | 0141 |
|  ——————  |        ————————————        |      ————————————      |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只保留 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (归档)。

---
【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行部分替换。**切勿尝试访问表格中列出的地址**。

|   日期   |              URL              |           类别           |                           有效载荷                           |                         URLhaus                          | 编号 |
| :------: | :---------------------------: | :----------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/1/5 | hxxps://kuanicalawdjif[.]cyou |  仿冒火绒、传播恶意软件  | hxxps://pub-df13d803030c4cab8b69722fbd66d7cd[.]r2[.]dev/din-Hr20254861[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3749994) | 0001 |
| 2026/1/5 |      hxxps://orayy[.]com      | 仿冒向日葵、传播恶意软件 | hxxps://officelilne[.]oss-cn-hongkong[.]aliyuncs[.]com/AweSun_yuancheng_x64[.]1[.]2[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3750000) | 0002 |
|  ——————  |     ————————————————————      |     ———————————————      |                ——————————————————————————————                |                        ——————————                        | ———  |

> [!NOTE]
>
> &emsp;只保留 30 条数据，更早数据详见 LGSRC/[Archive_2.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_2.md) (归档)。

## 如何提交文件进行分析？

&emsp;&emsp;**本中心不能代替 Microsoft 公司行使接收并分析疑似恶意软件样本的职责**。用户应始终通过 [**Microsoft Security Intelligence - Submit a file for malware analysis**](https://www.microsoft.com/en-us/wdsi/filesubmission) 官方平台提交文件。

&emsp;&emsp;如需联系 Ling Gao 共享信息，请发送电子邮件至 Ling@LGHUB.org。谢谢！😀

---

[回到顶部](#HEAD)

<img src="Images/CC.png" width = "3%" /> <img src="Images/BY.png" width = "3%" /> <img src="Images/SA.png" width = "3%" />

在 “[署名 - 相同方式共享 4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode.zh-Hans)” (CC BY-SA 4.0) 协议之条款下提供。

2025 - 2026, [Ling Gao](https://github.com/Lingggao), 灵糕中心 · 安全响应分中心, [github.com/Lingggao/LGSRC](https://github.com/Lingggao/LGSRC)

[字体许可使用授权书](https://github.com/Lingggao/LGSRC/blob/main/Images/%E5%AD%97%E4%BD%93%E8%AE%B8%E5%8F%AF%E4%BD%BF%E7%94%A8%E6%8E%88%E6%9D%83%E4%B9%A6.png?raw=true) | [Windows Insider 最有价值专家](https://github.com/Lingggao/LGSRC/blob/main/Images/Windows%20Insider%20MVP.png?raw=true)