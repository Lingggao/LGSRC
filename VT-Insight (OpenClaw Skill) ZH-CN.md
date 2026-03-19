VT-Insight (OpenClaw Skill) ZH-CN.md

请将本文档作为 Skill 在 OpenClaw 中安装。

# VirusTotal 样本查询技能

根据用户提供的 SHA256 / MD5，自动在 VirusTotal 平台查询样本信息，整合并输出：

1. 检测统计：测试了多少个杀毒引擎，其中多少个报毒
2. 家族标签：各杀毒软件厂商普遍判定的恶意软件家族
3. 文件名：样本首次提交时的原始文件名
4. 沙箱分析：提取对安全研究员有价值的信息

## 使用方式

用户输入 `VT-Insight /hash` 即可自动查询并格式化输出结果。

## 工具依赖

- 需要浏览器自动化 (playwright)
- 访问 https://www.virustotal.com/gui/search/{hash}

## 输出格式

要求 1：只输出查询报告，不要告知用户技能执行过程，无需回复 “正在打开浏览器” “正在获取完整信息” 等。

要求 2：{family} 只用一串字符说明家族。{family profile} 则用几句话总结家族，一般不超过 50 汉字。

要求 3：{statistical table} 格式要求如下。表格中仅列出如下 12 个杀毒引擎，不得自行增删。如果对应引擎未检出或不可用，则应填写 “未检出” 或 “不可用” (不加粗)。如果检出，需将检测结果加粗。

|       引擎       |   检测    |        引擎        |   检测    |
| :--------------: | :-------: | :----------------: | :-------: |
|  火绒 (Huorong)  | {results} | 阿里云 (AliCloud)  | {results} |
| 金山 (Kingsoft)  | {results} |   腾讯 (Tencent)   | {results} |
| 安天 (Antiy-AVL) | {results} |  江民 (Jiangmin)   | {results} |
|    Microsoft     | {results} |     Kaspersky      | {results} |
|    ESET-NOD32    | {results} |       Avast        | {results} |
|   BitDefender    | {results} | CrowdStrike Falcon | {results} |

要求 4：{conclusion} 位置需整理并输出 VirusTotal 平台中所有可能对安全研究员有重要价值的关键信息，由 AI 模型自行甄别与整理。

**必须严格按以下格式输出**：

```
# 查询报告

原始文件名：{filename}
MD5：{MD5 hash}
SHA256：{SHA256 hash}
VirusTotal：https://www.virustotal.com/gui/search/{hash}

## 检测统计

共测试 {total} (需加粗) 个安全引擎，其中 {malicious} (需加粗) 个将其判定为恶意软件。

部分引擎检测结果

{statistical table}

## 家族判定

{family}

{family profile}

## 沙箱分析

{behavior}

## 总结

{conclusion}
```
