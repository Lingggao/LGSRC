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

&emsp;&emsp;上次更新时间：2026 年 1 月 17 日 2:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 1 月 17 日，已打击计算机病毒 / 恶意软件 220 个、恶意网站 53 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期    |         文件名         |           检测            |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :-------: | :--------------------: | :-----------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/1/12 |     installer2.exe     |  **Win32/Wacatac.H!ml**   | c9a756ab2e92496f25123f6be368ed0e00e834b59cb671313541b35d9f58c1e7 | 6ba7eb78-1c32-438c-8d4d-a8a43855e23b | [VirusTotal](https://www.virustotal.com/gui/file/c9a756ab2e92496f25123f6be368ed0e00e834b59cb671313541b35d9f58c1e7) (23) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c9a756ab2e92496f25123f6be368ed0e00e834b59cb671313541b35d9f58c1e7) | A195 |
| 2026/1/12 |         ma.exe         |  **Win32/Wacatac.H!ml**   | 45f02409a587411a0c3411d1a70c75f7eab801e6158efc24b4a0eb464906c816 | 9aaf273e-036e-4239-8d92-57098a9aabb8 | [VirusTotal](https://www.virustotal.com/gui/file/45f02409a587411a0c3411d1a70c75f7eab801e6158efc24b4a0eb464906c816) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/45f02409a587411a0c3411d1a70c75f7eab801e6158efc24b4a0eb464906c816) | A196 |
| 2026/1/12 |  款式_20251231···.exe  |  **Win32/Wacatac.H!ml**   | 2433d08babdaa7ae1d61bfa55913e75d0cafb37a8cdf37703d7caddf4a36d993 | 19572fdd-f4e5-4432-bdb0-4572c3208961 | [VirusTotal](https://www.virustotal.com/gui/file/2433d08babdaa7ae1d61bfa55913e75d0cafb37a8cdf37703d7caddf4a36d993) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/2433d08babdaa7ae1d61bfa55913e75d0cafb37a8cdf37703d7caddf4a36d993) | A197 |
| 2026/1/12 |        eqsN.exe        |  **PureLogStealer.RVA**   | 24d264c5b777a6a199916aa7afa32e92358aa9d13e695035a2b18285facdab0e | a9f4ab0c-47e8-4557-b58f-fd5d29b0488e | [VirusTotal](https://www.virustotal.com/gui/file/24d264c5b777a6a199916aa7afa32e92358aa9d13e695035a2b18285facdab0e) (26) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/24d264c5b777a6a199916aa7afa32e92358aa9d13e695035a2b18285facdab0e) | A198 |
| 2026/1/12 |     chromeX_64.exe     |   **Win32/Malgent!MSR**   | 11f61b765f5b70c176bae9420d9f2a399a6aff8d38fc9dd3c68fa066f06d1c62 | 2db71973-9cfc-4c4e-8bd5-356e83e5aebc | [VirusTotal](https://www.virustotal.com/gui/file/11f61b765f5b70c176bae9420d9f2a399a6aff8d38fc9dd3c68fa066f06d1c62) (7) |                              无                              | A199 |
| 2026/1/13 | 财务部固定资产台账.exe |  **Win32/Wacatac.H!ml**   | 89fab2f1675210d76d997897f14f60b1bfdf73726e96f8aab9203c24cea27460 |                  无                  | [VirusTotal](https://www.virustotal.com/gui/file/89fab2f1675210d76d997897f14f60b1bfdf73726e96f8aab9203c24cea27460) (22) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/89fab2f1675210d76d997897f14f60b1bfdf73726e96f8aab9203c24cea27460) | A200 |
| 2026/1/13 |  RVtools-4.7.0.2.msi   |    **Win32/Vigorf.A**     | ee0f0f2f089ee0594da5750bb4e342c34d703ea045ed80c3b73c81d2f3de8bd4 | 1f736c18-e061-418e-99b5-2776a680b277 | [VirusTotal](https://www.virustotal.com/gui/file/ee0f0f2f089ee0594da5750bb4e342c34d703ea045ed80c3b73c81d2f3de8bd4) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ee0f0f2f089ee0594da5750bb4e342c34d703ea045ed80c3b73c81d2f3de8bd4) | A201 |
| 2026/1/13 |   Setup12.2-1208.msi   |  **Script/Wacatac.C!ml**  | c7d7dfa9d33f18eee6b6459fd39473caeb42dfd5d8f198443935e07d0575b5b9 | 0fc5ae52-43a2-4ce1-8b88-af84be397f18 | [VirusTotal](https://www.virustotal.com/gui/file/c7d7dfa9d33f18eee6b6459fd39473caeb42dfd5d8f198443935e07d0575b5b9) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/c7d7dfa9d33f18eee6b6459fd39473caeb42dfd5d8f198443935e07d0575b5b9) | A202 |
| 2026/1/14 |   精聊思路必看：.bat   |   **Win32/Egairtigado**   | 5b2c762d82cd1a07170719fdd5c5c9a00592ea6164513d9d0642bce84c1221b7 | 1872db7d-2da5-453a-93b3-a6fa38d4a8f8 | [VirusTotal](https://www.virustotal.com/gui/file/5b2c762d82cd1a07170719fdd5c5c9a00592ea6164513d9d0642bce84c1221b7) (41) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5b2c762d82cd1a07170719fdd5c5c9a00592ea6164513d9d0642bce84c1221b7) | A203 |
| 2026/1/14 |  sogou_pinyin···.exe   |   **Win32/Malgent!MSR**   | 6af981e75f136f051e738f5bc8ec1be42afc24b1b520c1dd5c7a7d603766c678 | 1872db7d-2da5-453a-93b3-a6fa38d4a8f8 | [VirusTotal](https://www.virustotal.com/gui/file/6af981e75f136f051e738f5bc8ec1be42afc24b1b520c1dd5c7a7d603766c678) (15) |                              无                              | A204 |
| 2026/1/14 |       duilib.dll       |   **Win32/Kepavll!rfn**   | 03c2632bc7ae92e409c063e4f260b1a7199ff6cdd7ba0b0455fd1947afe79b99 | dc4718ab-e7c7-48ad-9353-216f612dd04d | [VirusTotal](https://www.virustotal.com/gui/file/03c2632bc7ae92e409c063e4f260b1a7199ff6cdd7ba0b0455fd1947afe79b99) (45) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/03c2632bc7ae92e409c063e4f260b1a7199ff6cdd7ba0b0455fd1947afe79b99) | A205 |
| 2026/1/14 |   token-builder.exe    |   **Win64/Malgent!MSR**   | 99e803a6c0607464f019d58656881780fae48213a01de292384751aa8eddcf78 | f4fd0c3c-2a48-4c33-a351-30e13f63ac53 | [VirusTotal](https://www.virustotal.com/gui/file/99e803a6c0607464f019d58656881780fae48213a01de292384751aa8eddcf78) (1) |                              无                              | A206 |
| 2026/1/14 |   Setup12.2-5267.msi   |   **Win32/Malgent!MSR**   | 4d3c21b0b02ad7664be9df6ed3a85c08be4af8ca7a7ac31dc373a8c09971feca | ed6a3fea-333a-4e16-81d7-8fed2f10a2bf | [VirusTotal](https://www.virustotal.com/gui/file/4d3c21b0b02ad7664be9df6ed3a85c08be4af8ca7a7ac31dc373a8c09971feca) (12) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/4d3c21b0b02ad7664be9df6ed3a85c08be4af8ca7a7ac31dc373a8c09971feca) | A207 |
| 2026/1/16 |       design.exe       |   **Win32/Malgent!MSR**   | 2ef10f54c2edb27cb8ce2ba8f8c8f9f643618fb05816f559069aa74c5f6b4e6c | 364c1524-bbe9-410d-9411-e67c82354399 | [VirusTotal](https://www.virustotal.com/gui/file/2ef10f54c2edb27cb8ce2ba8f8c8f9f643618fb05816f559069aa74c5f6b4e6c) (9) |                              无                              | A208 |
| 2026/1/16 |   Setup12.2-4515.msi   |   **Win32/Malgent!MSR**   | 2f9cc5150036a050cb20ce4ed9da99447df1a2e65982ebf962694e562ac39470 | 412fd200-6016-45b9-a488-69195e8d4daa | [VirusTotal](https://www.virustotal.com/gui/file/2f9cc5150036a050cb20ce4ed9da99447df1a2e65982ebf962694e562ac39470) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/2f9cc5150036a050cb20ce4ed9da99447df1a2e65982ebf962694e562ac39470) | A209 |
| 2026/1/16 |     Installer.msi      |   **Win32/Malgent!MSR**   | dd44bf8dd431961fd87edcbc709ff334d41b2d5c3986af9832ab932afb4c8104 | c7758fcc-9823-4a95-8ecf-8ab7b17d9fa6 | [VirusTotal](https://www.virustotal.com/gui/file/dd44bf8dd431961fd87edcbc709ff334d41b2d5c3986af9832ab932afb4c8104) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/dd44bf8dd431961fd87edcbc709ff334d41b2d5c3986af9832ab932afb4c8104) | A210 |
| 2026/1/16 |       Weixin.exe       |   **Win32/Malgent!MSR**   | 69f720f1caae81d5897244ffbed547e9cb11643a26966c7880973b61df5436a8 | 02558d2c-347c-4041-9bc6-cb0fbde19bb1 | [VirusTotal](https://www.virustotal.com/gui/file/69f720f1caae81d5897244ffbed547e9cb11643a26966c7880973b61df5436a8) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/69f720f1caae81d5897244ffbed547e9cb11643a26966c7880973b61df5436a8) | A211 |
| 2026/1/16 |       888888.exe       |   **Win32/Malgent!MSR**   | a92ecd1a211c7114b9309c6706189edcbcf982a261a66d8960befa1fbb73e9b4 | 243e13c6-e272-47d2-8fd9-eaeca5851537 | [VirusTotal](https://www.virustotal.com/gui/file/a92ecd1a211c7114b9309c6706189edcbcf982a261a66d8960befa1fbb73e9b4) (3) |                              无                              | A212 |
| 2026/1/16 |         1.exe          |   **Win32/Egairtigado**   | 648a2523aa0392033a003d9d9d8e13c67124447b99aedfb319f6644cb59b9d64 | edb8e3c7-53f4-4426-8e7d-51da189fe26a | [VirusTotal](https://www.virustotal.com/gui/file/648a2523aa0392033a003d9d9d8e13c67124447b99aedfb319f6644cb59b9d64) (20) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/648a2523aa0392033a003d9d9d8e13c67124447b99aedfb319f6644cb59b9d64) | A213 |
| 2026/1/16 |         2.exe          |   **Win32/Egairtigado**   | a53ef8240fc2260ea62ef6a426c04e6333d96517d4d2f91492ab6de81a9eeee6 | edb8e3c7-53f4-4426-8e7d-51da189fe26a | [VirusTotal](https://www.virustotal.com/gui/file/a53ef8240fc2260ea62ef6a426c04e6333d96517d4d2f91492ab6de81a9eeee6) (25) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a53ef8240fc2260ea62ef6a426c04e6333d96517d4d2f91492ab6de81a9eeee6) | A214 |
| 2026/1/16 |         3.exe          |  **Win64/Filecoder!MSR**  | da23f2f8f56b914c11beb31d1e3b4d663abf4ecb750554475fab11bf5d0a66b3 | edb8e3c7-53f4-4426-8e7d-51da189fe26a | [VirusTotal](https://www.virustotal.com/gui/file/da23f2f8f56b914c11beb31d1e3b4d663abf4ecb750554475fab11bf5d0a66b3) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/da23f2f8f56b914c11beb31d1e3b4d663abf4ecb750554475fab11bf5d0a66b3) | A215 |
| 2026/1/16 |    shurufa15.14.msi    |   **Win32/Malgent!MSR**   | 9d9bb9e0f824c4899a90fae437709ad2b48af83b3b7bd634751d772b23e37345 | 81deccf8-7a27-429a-a10c-75dbd796d7ce | [VirusTotal](https://www.virustotal.com/gui/file/9d9bb9e0f824c4899a90fae437709ad2b48af83b3b7bd634751d772b23e37345) (5) |                              无                              | A216 |
| 2026/1/17 |  WPS_Setup_17147.msi   | **Script/Sabsik.EN.A!ml** | c3eea656ebeabde3adc272e3444db4586dbb3997863700ebe2f3629ca205a9dd | fb14140f-4821-49a8-828f-07444c618da2 | [VirusTotal](https://www.virustotal.com/gui/file/c3eea656ebeabde3adc272e3444db4586dbb3997863700ebe2f3629ca205a9dd) (13) |                              无                              | A217 |
| 2026/1/17 | wps···Ikhtdnler···.exe |  **Win32/Wacapew.C!ml**   | cfd2ee74e10efd029f2fc49af31189a2e6a10f5b7280e38b967c15b54e7cf008 | 0e5c2d33-f089-460d-9004-0b2f3c023579 | [VirusTotal](https://www.virustotal.com/gui/file/cfd2ee74e10efd029f2fc49af31189a2e6a10f5b7280e38b967c15b54e7cf008) (12) |                              无                              | A218 |
| 2026/1/17 |    client_64_01.exe    |   **Win64/Malgent!MSR**   | 696cd5c7b0d8f0e3c751cafa60b2fab2a6317b4c6e94f1775321d3d1194b1e42 | fd771fad-e2c2-46a9-8310-acc1f6ad43cc | [VirusTotal](https://www.virustotal.com/gui/file/696cd5c7b0d8f0e3c751cafa60b2fab2a6317b4c6e94f1775321d3d1194b1e42) (15) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/696cd5c7b0d8f0e3c751cafa60b2fab2a6317b4c6e94f1775321d3d1194b1e42) | A219 |
| 2026/1/17 |    client_64_01.exe    |   **Win64/Malgent!MSR**   | a919dbcfac1a78d6d52acd328933ab641718b321ba4e8fab734e029cbbbf616a | a949ecee-48f0-49ea-90e1-bb50e4ee02d6 | [VirusTotal](https://www.virustotal.com/gui/file/a919dbcfac1a78d6d52acd328933ab641718b321ba4e8fab734e029cbbbf616a) (18) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a919dbcfac1a78d6d52acd328933ab641718b321ba4e8fab734e029cbbbf616a) | A220 |
|  ——————   |      ————————————      |       ————————————        |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

> [!NOTE]
>
> &emsp;只显示最近 30 条数据，更早数据详见 LGSRC/[Archive_1.md](https://github.com/Lingggao/LGSRC/blob/main/Archive_1.md) (计算机病毒 / 恶意软件归档)。

---

【**恶意网站**】

> [!CAUTION]
>
> &emsp;为确保安全，网站地址将用 “hxxps://” 与 “[.]” 进行替换。**切勿尝试访问表格中列出的任何网址**。

|   日期    |                  URL                   |           类别           |                           有效载荷                           |                         URLhaus                          | 编号 |
| :-------: | :------------------------------------: | :----------------------: | :----------------------------------------------------------: | :------------------------------------------------------: | :--: |
| 2026/1/6  |     hxxps://apps-youdao[.]com[.]cn     |  仿冒有道翻译、传播病毒  | hxxps://hk-vip-oss-20251231[.]oss-cn-hongkong[.]aliyuncs[.]com/0106/YoudaoDict__X64[.]5[.]8[.]2[.]exe |                            无                            | Z026 |
| 2026/1/6  |    hxxps://fanyi-youdao[.]com[.]cn     |  仿冒有道翻译、传播病毒  | hxxps://hk-vip-oss-20251231[.]oss-cn-hongkong[.]aliyuncs[.]com/0106/YoudaoDict__X64[.]5[.]8[.]2[.]exe |                            无                            | Z027 |
| 2026/1/6  |     hxxps://www[.]cp-youdao[.]com      |  仿冒有道翻译、传播病毒  |                              无                              |                            无                            | Z028 |
| 2026/1/9  |    hxxps://pinyin-sogou[.]com[.]cn     | 仿冒搜狗输入法、传播病毒 |     hxxps://jkemdr[.]hoyenoy[.]com/shurufa15[.]12[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3753789) | Z029 |
| 2026/1/9  | hxxps://sougoupinyin-cn[.]com/download | 仿冒搜狗输入法、传播病毒 |                              无                              |                            无                            | Z030 |
| 2026/1/9  |         hxxps://ai-sogou[.]com         | 仿冒搜狗输入法、传播病毒 | hxxps://apps-sogou[.]com/downloads/windows/SsogSgooun[.]guanwang[.]1[.]5[.]8[.]exe | [URLhaus Database](https://urlhaus.abuse.ch/url/3753788) | Z031 |
| 2026/1/9  | hxxps://sogoushurufa-sogou[.]com[.]cn  | 仿冒搜狗输入法、传播病毒 |     hxxps://jkemdr[.]hoyenoy[.]com/shurufa15[.]12[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3753789) | Z032 |
| 2026/1/9  |        hxxps://pc-sougous[.]com        | 仿冒搜狗输入法、传播病毒 |                              无                              |                            无                            | Z033 |
| 2026/1/9  | hxxps://zhcn-sougoushurufa[.]com[.]cn  | 仿冒搜狗输入法、传播病毒 |                              无                              |                            无                            | Z034 |
| 2026/1/9  |       hxxps://cnzh-sougou[.]com        | 仿冒搜狗输入法、传播病毒 |     hxxps://jkemdr[.]hoyenoy[.]com/shurufa15[.]12[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3753789) | Z035 |
| 2026/1/9  |       hxxps://shouji-sogou[.]com       | 仿冒搜狗输入法、传播病毒 | hxxps://apps-sogou[.]com/downloads/windows/SsogSgooun[.]guanwang[.]1[.]5[.]8[.]exe | [URLhaus Database](https://urlhaus.abuse.ch/url/3753788) | Z036 |
| 2026/1/10 |     hxxps://www[.]app-teams[.]com      |   仿冒 Teams、传播病毒   | hxxps://xinjuiogh[.]oss-cn-hongkong[.]aliyuncs[.]com/MSTea%D1%87msSetup[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3754717) | Z037 |
| 2026/1/10 |      hxxps://teams-app[.]com[.]cn      |   仿冒 Teams、传播病毒   |        hxxps://lkejxfss[.]hoyenoy[.]com/MSTeams[.]zip        | [URLhaus Database](https://urlhaus.abuse.ch/url/3754716) | Z038 |
| 2026/1/10 |      hxxps://www[.]teamscn[.]com       |   仿冒 Teams、传播病毒   | hxxps://xinjuiogh[.]oss-cn-hongkong[.]aliyuncs[.]com/MSTea%D1%87msSetup[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3754717) | Z039 |
| 2026/1/11 |  hxxps://www[.]zh-letsvpn[.]com[.]cn   |  借助 VPN 工具传播病毒   | hxxps://lmf2110[.]oss-ap-southeast-1[.]aliyuncs.com/letsvpnSbing[.]zip |                            无                            | Z040 |
| 2026/1/11 |  hxxps://www[.]nf-letsvpn[.]com[.]cn   |  借助 VPN 工具传播病毒   |                              无                              |                            无                            | Z041 |
| 2026/1/11 |      hxxps://www[.]lets-vpn[.]dev      |  借助 VPN 工具传播病毒   | hxxps://www[.]kuaipan[.]org/download_share[.]php?code=6p9K3B8T6lejg3BX&download=1 |                            无                            | Z042 |
| 2026/1/12 |       hxxps://desktop-wps[.]com        |    仿冒 WPS、传播病毒    | hxxps://desktop-wps[.]com/downloads/windows/vvps-ll-ws[.]1[.]2[.]3[.]exe |                            无                            | Z043 |
| 2026/1/12 |    hxxps://apps-wps[.]com/download     |    仿冒 WPS、传播病毒    | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/WPS_Sietup_4725[.]zip |                            无                            | Z044 |
| 2026/1/12 |       hxxps://off-wps[.]com[.]cn       |    仿冒 WPS、传播病毒    |       hxxps://hjekd8c[.]hoyenoy[.]com/WPS_office[.]zip       |                            无                            | Z045 |
| 2026/1/12 |       hxxps://wps-wp[.]com[.]cn        |    仿冒 WPS、传播病毒    |       hxxps://hjekd8c[.]hoyenoy[.]com/WPS_office[.]zip       |                            无                            | Z046 |
| 2026/1/12 |    hxxps://www[.]cp-wps[.]com[.]cn     |    仿冒 WPS、传播病毒    |       hxxps://www[.]cp-wps[.]com[.]cn/WPS_Setup[.]zip        |                            无                            | Z047 |
| 2026/1/13 |     hxxps://ing-google[.]com[.]cn      |  仿冒 Chrome、传播病毒   |      hxxps://olekndx[.]hoyenoy[.]com/Setup12[.]2[.]zip       |                            无                            | Z048 |
| 2026/1/16 |    hxxps://pinyin-sogou[.]com[.]cn     | 仿冒搜狗输入法、传播病毒 |     hxxps://jkemdr[.]hoyenoy[.]com/shurufa15[.]14[.]zip      | [URLhaus Database](https://urlhaus.abuse.ch/url/3758898) | Z049 |
| 2026/1/16 |       hxxps://pp-wps[.]com[.]cn        |    仿冒 WPS、传播病毒    | hxxps://1998qwertyuiasdg-1998[.]s3[.]ap-southeast-1[.]amazonaws[.]com/wps_Version_Ikhtdnler-2026[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3759111) | Z050 |
| 2026/1/16 |       hxxps://com-wps[.]com[.]cn       |    仿冒 WPS、传播病毒    | hxxps://da05-1382952907[.]cos[.]ap-singapore[.]myqcloud[.]com/WPS_Setup_17147[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3759112) | Z051 |
| 2026/1/16 |    hxxps://zh-wpsoffice[.]com[.]cn     |    仿冒 WPS、传播病毒    | hxxps://da05-1382952907[.]cos[.]ap-singapore[.]myqcloud[.]com/WPS_Setup_17147[.]zip | [URLhaus Database](https://urlhaus.abuse.ch/url/3759112) | Z052 |
| 2026/1/16 |    hxxps://www[.]wps-download[.]im     |    仿冒 WPS、传播病毒    |                              无                              |                            无                            | Z053 |
|  ——————   |          ————————————————————          |     ———————————————      |                ——————————————————————————————                |                        ——————————                        | ———  |

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