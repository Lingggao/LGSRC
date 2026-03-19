VT-Insight_OpenClaw_Skill_ZH-CN.md

请将本文档作为 Skill 在 OpenClaw 中安装。

名称：VT-Insight

作者：Ling Gao (微软安全顾问)

Skill 版本：1.1.3

# VirusTotal 样本查询

根据用户提供的 SHA256 / MD5，自动在 VirusTotal 平台查询样本信息。

1. 检测统计：测试了多少个杀毒引擎，其中多少个报毒
2. 家族标签：各杀毒软件厂商普遍判定的恶意软件家族
3. 文件名：样本首次提交时的原始文件名
4. 沙箱分析：提取对安全研究员有价值的信息

## 使用方式

用户输入 `VT-Insight {hash}` 即可自动查询并格式化输出查询报告。

## 工具依赖

- 需要浏览器自动化，由 AI 模型自行斟酌如何实现
- 访问 https://www.virustotal.com/gui/search/{hash}

## 输出格式

要求 1：{family} 只用一串字符说明家族；{family profile} 则用几句话总结家族，一般不超过 50 个汉字。

要求 2：{statistical table} 格式要求如下。表格中仅列出以下 12 个杀毒引擎，不得自行增删。如果对应引擎未检出或不可用，则应填入 “未检出” 或 “不可用” (不加粗)。如果检出，需将检测结果加粗。

|       引擎       |   检测    |        引擎        |   检测    |
| :--------------: | :-------: | :----------------: | :-------: |
|  火绒 (Huorong)  | {results} | 阿里云 (AliCloud)  | {results} |
| 金山 (Kingsoft)  | {results} |   腾讯 (Tencent)   | {results} |
| 安天 (Antiy-AVL) | {results} |  江民 (Jiangmin)   | {results} |
|    Microsoft     | {results} |     Kaspersky      | {results} |
|    ESET-NOD32    | {results} |       Avast        | {results} |
|   BitDefender    | {results} | CrowdStrike Falcon | {results} |

要求 3：{conclusion} 位置需整理并输出 VirusTotal 平台中所有可能对安全研究员有重要价值的关键信息，由 AI 模型自行甄别并整理。

**必须严格按以下格式输出**：

```
(换行)
# 查询报告 (注：一级标题)

原始文件名：{filename}
MD5：{MD5 hash}
SHA256：{SHA256 hash}
VirusTotal：www.virustotal.com/gui/search/{hash}

## 检测统计 (注：二级标题)

共测试 {total} (需加粗) 个安全引擎，其中 {malicious} (需加粗) 个将其判定为恶意软件。

部分引擎检测结果 (需加粗)

{statistical table}

## 家族判定 (注：二级标题)

{family} (需加粗)

{family profile} (无需加粗)

## 沙箱分析 (注：二级标题)

{behavior} (注：由 AI 模型自行斟酌，可对重点内容加粗)

## 总结 (注：二级标题)

{conclusion} (注：由 AI 模型自行斟酌，可对重点内容加粗)
```