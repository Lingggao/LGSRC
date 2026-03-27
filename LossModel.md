<h1 align="center">预期经济损失统计学模型</h1>

<h3 align="center">(Expected Economic Loss Model)</h3>

灵糕中心 · 安全响应中心采用以下**统计学模型**评估计算机病毒 / 恶意软件的经济破坏力。我们将 “一个” 计算机病毒 / 恶意软件定义为 “一次独立的攻击活动或一个具有独立功能的变种”，而非 “单一文件哈希”。

**$$E = \sum (W_i \times P_{exec} \times N_{victim} \times P_{monetize} \times V_{loss})$$**

参数释义

- $E$：一个计算机病毒 / 恶意软件造成的预期经济损失
- $W_i$ (Weight)：某一技术层级在整体大盘中的占比
- $P_{exec}$ (Probability of Execution)：在覆盖范围内病毒成功绕过防御的概率
- $N_{victim}$ (Number of Victims)：
- $P_{monetize}$ (Probability of Monetization)：
- $V_{loss}$ (Value of Loss)：