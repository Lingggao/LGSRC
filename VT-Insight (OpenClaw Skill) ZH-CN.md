# VT-Insight (OpenClaw Skill) ZH-CN.md

# VirusTotal 样本查询技能

根据用户提供的 SHA256 / MD5 / SHA1，自动在 VirusTotal 平台查询样本信息，整合并输出：

1. 检测统计：测试了多少个杀毒引擎，其中多少个报毒
2. 家族标签：各杀毒软件厂商普遍判定的恶意家族
3. 文件名：样本首次提交时的原始名称
4. 沙箱分析：提取对安全研究员有价值的信息

## 使用方式

用户输入 `查询 [hash]` 即可自动查询并格式化输出结果。

## 工具依赖

- 需要浏览器自动化 (playwright)
- 访问 https://www.virustotal.com/gui/search/{hash}

## 输出格式

```
## 查询报告：{hash}

### 1. 检测统计
- 共测试 {total} (需加粗) 家安全引擎
- 其中 {malicious} (需加粗) 家将其判定为恶意软件

### 2. 家族判定
{family}

### 3. 文件名称
{filename}

### 4. 沙箱分析
{behavior}

### 结论
{conclusion}
注：整理并输出 VirusTotal 平台中所有对安全研究员有重要价值的关键信息，由 AI 模型自行甄别。
```