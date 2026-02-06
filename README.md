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

&emsp;&emsp;上次更新时间：2026 年 2 月 7 日 1:00 (UTC+8)。

&emsp;&emsp;**截至 2026 年 2 月 7 日，已打击计算机病毒 / 恶意软件 400 个、恶意网站 115 个**。

---

【**计算机病毒 / 恶意软件**】

> [!CAUTION]
>
> &emsp;为确保安全，本中心**不提供**病毒 / 恶意软件样本下载服务。

|   日期   |           文件名           |         检测          |                            SHA256                            |             Internal ID              |                          VirusTotal                          |                        MalwareBazaar                         | 编号 |
| :------: | :------------------------: | :-------------------: | :----------------------------------------------------------: | :----------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :--: |
| 2026/2/4 |    SG.Setup.0.2.0.1.exe    |  **Win32/Etset!rfn**  | 7867e9f5be414c804a64723ce52b8de7bfa678b5aab2689d4d43eedda460edd7 | f89eaa4c-df5a-4a89-a7e1-d78f063b699c | [VirusTotal](https://www.virustotal.com/gui/file/7867e9f5be414c804a64723ce52b8de7bfa678b5aab2689d4d43eedda460edd7) (23) |                              无                              | A374 |
| 2026/2/4 |   sluvou_pinyin5.024.exe   | **Win32/Malgent!MSR** | 64656eea38a3bd645f8cee25c7ce8b0f41a8bce4a8471a5a14f34c5ef38bed00 | 2206ce35-6e01-43ef-88d4-25cd5c18ffe3 | [VirusTotal](https://www.virustotal.com/gui/file/64656eea38a3bd645f8cee25c7ce8b0f41a8bce4a8471a5a14f34c5ef38bed00) (7) |                              无                              | A375 |
| 2026/2/5 |   Clash.Verge_2.4.4.exe    | **Win32/Malgent!MSR** | 930236706dac79e929ed51a0bc993b528e1efa6254a86ac653d49306fd078246 | 60df7178-8ada-4ab0-8d62-cee838876090 | [VirusTotal](https://www.virustotal.com/gui/file/930236706dac79e929ed51a0bc993b528e1efa6254a86ac653d49306fd078246) (20) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/930236706dac79e929ed51a0bc993b528e1efa6254a86ac653d49306fd078246) | A376 |
| 2026/2/5 |   deep大模型安装助手.exe   | **Win32/Dropper!MSR** | a5e8494d6df69947380c86e1d9661125397885a9251f9ee3b1459e1d0e0dbc01 | 46830dc6-24e0-4a57-9236-e5cf7af7e74f | [VirusTotal](https://www.virustotal.com/gui/file/a5e8494d6df69947380c86e1d9661125397885a9251f9ee3b1459e1d0e0dbc01) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/a5e8494d6df69947380c86e1d9661125397885a9251f9ee3b1459e1d0e0dbc01) | A377 |
| 2026/2/5 |     xmrig_launcher.exe     | **Win32/CoinMiner.N** | 208fbb1b50982f53fd65c6437e43147bc74899ad5f40863d7d95d9c6dfdc1bb3 | f9105c37-38c0-43df-8004-60e855c4f790 | [VirusTotal](https://www.virustotal.com/gui/file/208fbb1b50982f53fd65c6437e43147bc74899ad5f40863d7d95d9c6dfdc1bb3) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/208fbb1b50982f53fd65c6437e43147bc74899ad5f40863d7d95d9c6dfdc1bb3) | A378 |
| 2026/2/5 |   VC_radist.x64 (2).exe    | **Win32/Malgent!MSR** | e86c74fc39924e5c86d3ede3098f5c0d5c1655e2414f9b19359f32e35608e670 | 6c668b46-22aa-4870-a3e0-a1c6affd6f75 | [VirusTotal](https://www.virustotal.com/gui/file/e86c74fc39924e5c86d3ede3098f5c0d5c1655e2414f9b19359f32e35608e670) (14) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/e86c74fc39924e5c86d3ede3098f5c0d5c1655e2414f9b19359f32e35608e670) | A379 |
| 2026/2/5 |      YYdispose···.exe      | **Win32/Malgent!MSR** | 5804ab1cab517dbc9c314360988d0f44e9226626071c933c86f336fc68d89ff4 | e6de82e1-7aa7-4c42-bced-3d230889dd14 | [VirusTotal](https://www.virustotal.com/gui/search/5804ab1cab517dbc9c314360988d0f44e9226626071c933c86f336fc68d89ff4) (7) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5804ab1cab517dbc9c314360988d0f44e9226626071c933c86f336fc68d89ff4) | A380 |
| 2026/2/5 | ···违纪人员内部调查···.exe | **Win32/Malgent!MSR** | ed1c730a532dab5f4e9b3194437ab3fa5b03948869773b5347671950e0641a43 | 64e32828-7e1f-40d2-b42b-3e366f03eacd | [VirusTotal](https://www.virustotal.com/gui/file/ed1c730a532dab5f4e9b3194437ab3fa5b03948869773b5347671950e0641a43) (33) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/ed1c730a532dab5f4e9b3194437ab3fa5b03948869773b5347671950e0641a43) | A381 |
| 2026/2/5 |       202602053.msi        |  **Win32/Vigorf.A**   | 979f8470bc155a62d32041c37bfc8c8abdfec193338ab27940560181899d800a | fab6dce4-7e6d-4581-a2ad-2722787f6e0a | [VirusTotal](https://www.virustotal.com/gui/file/979f8470bc155a62d32041c37bfc8c8abdfec193338ab27940560181899d800a) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/979f8470bc155a62d32041c37bfc8c8abdfec193338ab27940560181899d800a) | A382 |
| 2026/2/5 |        chromasj.msi        | **Win64/Malgent!MSR** | 74bee981edd3316032cae86dde78b3d57dae950302f70d154b3d746495b1ab7a | 211d6da1-1a60-4b90-a276-f4a0170c9787 | [VirusTotal](https://www.virustotal.com/gui/file/74bee981edd3316032cae86dde78b3d57dae950302f70d154b3d746495b1ab7a) (6) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/74bee981edd3316032cae86dde78b3d57dae950302f70d154b3d746495b1ab7a) | A383 |
| 2026/2/5 |     YD_fanyiweb···.exe     | **Win32/Kepavll!rfn** | 4bccf7f4713dcd31319f9349fe90352a93e40290149101f7fd22f4961282408a | be44a0eb-737b-404d-bdf0-5c71236b6714 | [VirusTotal](https://www.virustotal.com/gui/search/4bccf7f4713dcd31319f9349fe90352a93e40290149101f7fd22f4961282408a) (13) |                              无                              | A384 |
| 2026/2/6 |      secure_tool.exe       | **Win32/Egairtigado** | 9f56f791d572e709207170057f565473a470d0837addda77e9ac06d07b38d468 | 305f9544-0981-41c5-9809-4e2a53046402 | [VirusTotal](https://www.virustotal.com/gui/file/9f56f791d572e709207170057f565473a470d0837addda77e9ac06d07b38d468) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/9f56f791d572e709207170057f565473a470d0837addda77e9ac06d07b38d468) | A385 |
| 2026/2/6 |       7zip_PC···.exe       | **Win32/Malgent!MSR** | 6373afd213310e56556cb1c4c274aab36b34f638964f5cde822416ba2cc5468b | 6acf7086-5115-4fd1-ad87-a306d554d757 | [VirusTotal](https://www.virustotal.com/gui/file/6373afd213310e56556cb1c4c274aab36b34f638964f5cde822416ba2cc5468b) (27) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/6373afd213310e56556cb1c4c274aab36b34f638964f5cde822416ba2cc5468b) | A386 |
| 2026/2/6 |    Chrorne0af0-x64.exe     | **Win32/Malgent!MSR** | 11102393d678f2cd98549207235bda614e2e1fb3ea56fbfca3fe919459aa1120 | f234a9ff-4f9e-4b5c-9611-3626928ac6b1 | [VirusTotal](https://www.virustotal.com/gui/file/11102393d678f2cd98549207235bda614e2e1fb3ea56fbfca3fe919459aa1120) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/11102393d678f2cd98549207235bda614e2e1fb3ea56fbfca3fe919459aa1120) | A387 |
| 2026/2/6 |      SExplorer···.exe      | **Win32/Malgent!MSR** | 92555e71e83dae5af4a3fdd232f42767800ea9c91439ad54d64b66888bbc6d8c | 39fc93ce-fcf8-43b5-8acf-01895d21a06b | [VirusTotal](https://www.virustotal.com/gui/file/92555e71e83dae5af4a3fdd232f42767800ea9c91439ad54d64b66888bbc6d8c) (20) |                              无                              | A388 |
| 2026/2/6 |          150.exe           | **Win32/Malgent!MSR** | 8b87dd755de641e2c3f4e5e2db19e2df1e9d120f226e168bd4ed6d2212f45be1 | 27afb4a8-2e83-407c-92fd-8872ba50cd62 | [VirusTotal](https://www.virustotal.com/gui/file/8b87dd755de641e2c3f4e5e2db19e2df1e9d120f226e168bd4ed6d2212f45be1) (21) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/8b87dd755de641e2c3f4e5e2db19e2df1e9d120f226e168bd4ed6d2212f45be1) | A389 |
| 2026/2/6 |        cherome.exe         | **Win32/Malgent!MSR** | 26ddeea6d5171984cd054b33cab67970716611064972b44ed7297703d0848df1 | d63aca7f-d174-4263-89f1-cf9541208780 | [VirusTotal](https://www.virustotal.com/gui/file/26ddeea6d5171984cd054b33cab67970716611064972b44ed7297703d0848df1) (17) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/26ddeea6d5171984cd054b33cab67970716611064972b44ed7297703d0848df1) | A390 |
| 2026/2/6 |    meSetup13.2A···.msi     | **Win32/Malgent!MSR** | 94620117e0c4878da2fa57362058aadd437f1639d3c6d1337b27b8c3070357cf | 3f8a76c0-228d-4992-8db9-353e1a393011 | [VirusTotal](https://www.virustotal.com/gui/file/94620117e0c4878da2fa57362058aadd437f1639d3c6d1337b27b8c3070357cf) (5) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/94620117e0c4878da2fa57362058aadd437f1639d3c6d1337b27b8c3070357cf) | A391 |
| 2026/2/6 |     Yòydaofanyi···.msi     |  **Win32/Vigorf.A**   | 9a54f0b5417c8ae82f4bc423edf940d817c9585b385284a927ebd6a0b17c5399 | 0cd7ec5a-297a-4d16-a0bc-265e46f3c458 | [VirusTotal](https://www.virustotal.com/gui/file/9a54f0b5417c8ae82f4bc423edf940d817c9585b385284a927ebd6a0b17c5399) (9) |                              无                              | A392 |
| 2026/2/6 |      WOS_SAN_088.exe       | **Win32/Malgent!MSR** | 0dee76d3f834ca80d6f14c312159f9cf3c3deb5f5894c0165ec2091f370474bc | d52bc050-1cfe-4031-bcf0-331309030066 | [VirusTotal](https://www.virustotal.com/gui/file/0dee76d3f834ca80d6f14c312159f9cf3c3deb5f5894c0165ec2091f370474bc) (3) |                              无                              | A393 |
| 2026/2/6 |        Project1.exe        | **Win32/Malgent!MSR** | f2db3b97950873f2cf496bba7b50d63e5f734e9009ddd8bc70088a935f0a0357 | 4491bbf7-fd88-4c29-a06b-125910c63ddc | [VirusTotal](https://www.virustotal.com/gui/file/f2db3b97950873f2cf496bba7b50d63e5f734e9009ddd8bc70088a935f0a0357) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f2db3b97950873f2cf496bba7b50d63e5f734e9009ddd8bc70088a935f0a0357) | A394 |
| 2026/2/6 |      迷你罗德···.exe       |   **Win32/Zusy.LM**   | 1563283dc6e72018240bc34062d30361ada87b6006f8ca554b01a2d780d80e2a | 5dc072ca-e4d8-4a9f-b71c-414fbcd99d53 | [VirusTotal](https://www.virustotal.com/gui/file/1563283dc6e72018240bc34062d30361ada87b6006f8ca554b01a2d780d80e2a) (29) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/1563283dc6e72018240bc34062d30361ada87b6006f8ca554b01a2d780d80e2a) | A395 |
| 2026/2/6 |        explorer.exe        |   **GhostRat.CKD**    | f4541e8a44142832d5ad0897a22d88d0caab4ffc0179026906e9f19c3dbcffcb | ecd93426-464e-44eb-8cae-f9c06dd964d4 | [VirusTotal](https://www.virustotal.com/gui/file/f4541e8a44142832d5ad0897a22d88d0caab4ffc0179026906e9f19c3dbcffcb) (47) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/f4541e8a44142832d5ad0897a22d88d0caab4ffc0179026906e9f19c3dbcffcb) | A396 |
| 2026/2/7 |     AJiaSu_4.9.6.0.msi     | **Win64/Malgent!MSR** | 4410442a1ab1ddb19c40bec809ed78a7183cb28fbf990fa23ea6796c8f44357c | 07c94f2e-9e5e-4efe-ac9b-27d29b828f84 | [VirusTotal](https://www.virustotal.com/gui/file/4410442a1ab1ddb19c40bec809ed78a7183cb28fbf990fa23ea6796c8f44357c) (9) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/4410442a1ab1ddb19c40bec809ed78a7183cb28fbf990fa23ea6796c8f44357c) | A397 |
| 2026/2/7 |       what's up.chm        |  **Win32/Vigorf.A**   | 5f0a8fb984f5fac8718e1cf760a3f997166ff968df2531a094cf615514072576 | fd6b3a43-c6a8-40d5-87e0-e58758bf78f8 | [VirusTotal](https://www.virustotal.com/gui/file/5f0a8fb984f5fac8718e1cf760a3f997166ff968df2531a094cf615514072576) (2) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/5f0a8fb984f5fac8718e1cf760a3f997166ff968df2531a094cf615514072576) | A398 |
| 2026/2/7 |    artifact_x64···.exe     |  **CobaltStrike.CB**  | 0b147b343a1e37a94d6e19b5400a5a4082dda5af715d475e8b03b02a5608de85 | 2966e369-0d46-47dc-a044-8e8ea32aa468 | [VirusTotal](https://www.virustotal.com/gui/file/0b147b343a1e37a94d6e19b5400a5a4082dda5af715d475e8b03b02a5608de85) (42) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/0b147b343a1e37a94d6e19b5400a5a4082dda5af715d475e8b03b02a5608de85) | A399 |
| 2026/2/7 |     fs_windows···.exe      | **Win32/Malgent!MSR** | d4483b235b21eb695eb5ddfff9467081dd486f78e9000a5e39d8ae2ce28e1d7d | 2966e369-0d46-47dc-a044-8e8ea32aa468 | [VirusTotal](https://www.virustotal.com/gui/file/d4483b235b21eb695eb5ddfff9467081dd486f78e9000a5e39d8ae2ce28e1d7d) (10) | [MalwareBazaar Database](https://bazaar.abuse.ch/sample/d4483b235b21eb695eb5ddfff9467081dd486f78e9000a5e39d8ae2ce28e1d7d) | A400 |
|  ——————  |        ————————————        |     ————————————      |             ———————————————————————————————————              |         ————————————————————         |                           ————————                           |                         ————————————                         | ———  |

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
| 2026/1/30 |        hxxps://mail[.]qcqzaa[.]shop         |    钓鱼网站、QQ 盗号     |                              无                              |                            无                            | Z090 |
| 2026/1/31 |       hxxps://appb-youdao[.]com[.]cn        |  仿冒有道翻译、传播病毒  | hxxps://youdao02[.]oss-cn-hongkong[.]aliyuncs[.]com/Youdao02Dict_fanyiweb_navigation[.]zip |                            无                            | Z091 |
| 2026/1/31 |          hxxps://apps-youdao[.]com          |  仿冒有道翻译、传播病毒  | hxxps://xinjiapox[.]oss-ap-southeast-1[.]aliyuncs[.]com/youdaofanyi058[.]zip |                            无                            | Z092 |
| 2026/1/31 |        hxxps://wp-youdao[.]com[.]cn         |  仿冒有道翻译、传播病毒  | hxxps://ww3[.]wangmeipo[.]cn/api/v3/file/get/44036/youdaofanyi261301620[.]zip?sign=KofEYK49f-d63hzDE0LkCe1M8gE7gNLvEBpnCjyGzOI%3D%3A0 |                            无                            | Z093 |
| 2026/1/31 |        hxxps://www[.]cp-youdao[.]com        |  仿冒有道翻译、传播病毒  |                              无                              |                            无                            | Z094 |
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