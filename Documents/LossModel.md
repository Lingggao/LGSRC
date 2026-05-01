<h1 align="center">预期经济损失统计学模型</h1>

<h3 align="center">(Expected Economic Loss Model)</h3>

&emsp;&emsp;灵糕中心 · 安全响应中心采用以下**统计学模型**，以评估计算机病毒 / 恶意软件的经济破坏力。我们将 “一个” 计算机病毒 / 恶意软件定义为 “一次独立的攻击活动或一个具有独立功能的变种”，而非 “单一文件哈希”。

**$$E = \sum (W_i \times P_{\text{exec}} \times N_{\text{victim}} \times P_{\text{monetize}} \times V_{\text{loss}})$$**

&emsp;&emsp;**参数释义**

- **$E$ (Expected)**：一个计算机病毒 / 恶意软件所造成的预期经济损失
- **$W_i$ (Weight)**：某一技术层级 / 攻击方式在整体大盘中的占比
- **$P_{\text{exec}}$ (Probability of Execution)**：在覆盖范围内，其成功绕过防御的概率
- **$N_{\text{victim}}$ (Number of Victims)**：单次活动中，攻击者平均成功控制的有效终端数量
- **$P_{\text{monetize}}$ (Probability of Monetization)**：在取得控制权后，攻击者能够成功将其转化为经济利益的概率
- **$V_{\text{loss}}$ (Value of Loss)**：成功变现时的平均经济损失 (以人民币计，含资产盗窃、勒索、企业停工、电信诈骗转账等)

&emsp;&emsp;综合**个人计算** (6858 元) 与 **AI 大模型保守估算** —— 包括 DeepSeek 专家模式 (500 元)、Qwen3.5-千问深度研究 (48400 元)、豆包专家模式 (50 元)、智谱 GLM-5.1 专家模式 (140000 元)、秘塔 MetaLLM 深度研究 (1500 元)、微步 XGPT Chat Agent 模式 (68000 元)、OpenAI GPT‑5.4 Thinking (352 元)、Google Gemini 3.1 Pro (1000 元)，本中心决定将打击一个计算机病毒 / 恶意软件预期可为潜在受害者规避的经济损失暂定为 **4250 元**。