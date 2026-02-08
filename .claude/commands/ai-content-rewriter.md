---
description: 重写和优化现有内容，提升 GEO 评分，使内容更适合 AI 搜索引擎引用
argument-hint: <file-path-or-url> [--focus <area>] [--tone <style>] [--optimize-for <target>]
options:
  - focus: 优化重点（geo, seo, readability, structure, all）
  - tone: 语气风格（professional, casual, friendly, authoritative）
  - optimize-for: 优化目标（seo, geo, both）
  - preserve-style: 保留原有风格
  - target-citation-rate: 目标引用率（60-90）
examples:
  - /ai-content-rewriter blog/post.md --focus geo --optimize-for geo
  - /ai-content-rewriter https://yoursite.com/article --focus all --optimize-for both
  - /ai-content-rewriter post.md --tone authoritative --target-citation-rate 85
---

## 完整实现

### 命令执行流程

```markdown
# AI 内容重写执行流程

## 步骤 1: 内容读取和分析
输入：文件路径或 URL
处理：
- 读取原始内容
- 分析内容结构
- 识别优化机会
- 评估当前 GEO/SEO 评分
输出：内容分析报告

## 步骤 2: 确定优化策略
根据 focus 参数确定：
- geo: 专注 GEO 优化（权威性、实体、结构）
- seo: 专注 SEO 优化（关键词、元标签、链接）
- readability: 提升可读性（段落、句子、词汇）
- structure: 优化内容结构（标题、层级、流程）
- all: 全面优化

## 步骤 3: 内容重写
应用优化策略：
- 添加 TL;DR 总结（如果 GEO 优化）
- 优化概念定义
- 改进段落结构
- 增强引用来源
- 调整语气风格
输出：优化后的内容

## 步骤 4: GEO 增强（如果启用）
- 添加 Schema.org 标记
- 建立实体关系
- 优化开头 100 词
- 添加 FAQ 部分
- 增强权威性信号

## 步骤 5: 质量验证
检查重写后内容：
- 事实一致性
- 语法正确性
- 可读性评分
- SEO 评分
- GEO 评分
输出：质量报告

## 步骤 6: 生成多个版本（可选）
- 版本 A：保守优化（保留原风格）
- 版本 B：积极优化（最大化 GEO）
- 版本 C：平衡版本（GEO + SEO）
输出：多个版本供选择

## 步骤 7: 保存和对比
- 保存优化后内容
- 生成对比报告（优化前 vs 优化后）
- 提供改进建议
```

## 优化重点详解

### 1. GEO 优化（--focus geo）

**目标：** 提升 AI 搜索引擎引用率

**核心改进：**

#### A. 权威性提升
```markdown
**原始内容：**
SEO is important for websites.

**优化后：**
根据 [Google Search Central](https://developers.google.com/search) 的数据，SEO（Search Engine Optimization）对网站成功至关重要。研究表明，75% 的用户从未超出第一页结果。

**优化措施：**
✅ 添加引用来源
✅ 使用具体统计数据
✅ 明确术语定义
✅ 引用权威来源
```

#### B. 实体关系清晰化
```markdown
**原始内容：**
SEO and content marketing work well together.

**优化后：**
**SEO** 和 **内容营销** 密切相关：
- SEO 需要高质量内容作为基础
- 内容营销通过 SEO 获得更多曝光
- 两者结合可提升 3 倍流量增长

查看我们的 [内容营销指南](/content-marketing) 了解详情。

**优化措施：**
✅ 明确两个概念的关系
✅ 说明相互影响
✅ 添加内部链接
✅ 提供具体数据
```

#### C. 内容结构优化
```markdown
**原始内容（段落过长）：**
SEO is a complex process that involves many different factors including keyword research, on-page optimization, technical SEO, link building, and content creation. You need to focus on all of these areas to succeed... (350 words)

**优化后（LLM 友好结构）：**
## SEO 的核心要素

SEO 包含 5 个关键要素：

### 1. 关键词研究 🔍
**目标：** 识别目标搜索词
**工具：** Google Keyword Planner, SEMrush
**重要性：** 关键词是 SEO 的基础

### 2. 页面优化 📝
**目标：** 优化内容相关性
**关键：** 标题、描述、H1 标签

### 3. 技术 SEO ⚙️
**目标：** 确保网站可访问性
**重点：** 速度、移动友好、SSL

**优化措施：**
✅ 分解为短段落（50-100 词）
✅ 使用清晰的标题层级
✅ 添加图标和视觉元素
✅ 列表化关键信息
```

#### D. TL;DR 和 FAQ
```markdown
**添加 TL;DR 总结：**
## TL;DR
SEO 是通过优化网站内容和技术，提高在搜索引擎排名的过程。核心要素包括关键词研究、内容优化、技术 SEO 和外链建设。

**添加 FAQ 部分：**
## 常见问题

### Q: SEO 需要多长时间见效？
**A:** 通常 3-6 个月可见明显效果，取决于竞争程度和优化力度。

### Q: SEO 和 PPC 哪个更好？
**A:** 两者结合效果最佳。SEO 提供长期流量，PPC 提供即时曝光。

### Q: 我可以自己做 SEO 吗？
**A:** 可以，但需要学习大量知识。建议使用专业工具或聘请专家。
```

---

### 2. SEO 优化（--focus seo）

**目标：** 提升搜索引擎排名

**核心改进：**

#### A. 关键词优化
```markdown
**原始内容：**
Our tool helps with marketing.

**优化后：**
Our **SEO marketing tool** helps with **digital marketing** strategies. Whether you need **keyword research** or **content optimization**, our tool provides comprehensive **marketing solutions**.

**优化措施：**
✅ 添加主要关键词（SEO marketing tool）
✅ 包含相关关键词（digital marketing）
✅ 使用长尾关键词（keyword research）
✅ 保持自然流畅
```

#### B. 元标签优化
```markdown
**生成的元标签：**
<title>SEO Marketing Tool | Complete Keyword Research & Content Optimization</title>
<meta name="description" content="Boost your rankings with our SEO marketing tool. Features keyword research, content optimization, and comprehensive marketing solutions. Try free today.">
<meta name="keywords" content="SEO tool, keyword research, content optimization, digital marketing">
```

#### C. 内部链接
```markdown
**优化后内容：**
我们的 SEO 工具提供 [关键词研究功能](/keyword-research) 和 [内容优化功能](/content-optimization)。

查看 [完整功能列表](/features) 了解详情。

相关文章：
- [关键词研究最佳实践](/blog/keyword-research-best-practices)
- [如何优化内容](/blog/content-optimization-guide)

**优化措施：**
✅ 链接到相关页面
✅ 使用描述性锚文本
✅ 建立主题集群
✅ 传递链接权重
```

---

### 3. 可读性优化（--focus readability）

**目标：** 提升 Flesch 可读性评分到 60-80

**核心改进：**

#### A. 简化句子
```markdown
**原始内容（复杂句子）：**
In order to achieve success in the field of search engine optimization, it is absolutely necessary that you implement a comprehensive strategy which encompasses various different aspects including but not limited to keyword research, technical optimization, and content creation.

**优化后（简单句子）：**
SEO success requires a comprehensive strategy. Focus on three key areas: keyword research, technical optimization, and content creation.

**优化措施：**
✅ 分解长句
✅ 使用简单词汇
✅ 减少从句
✅ 直接表达
```

#### B. 段落优化
```markdown
**原始内容（过长段落）：**
When you are creating content for your website, it is important to consider many different factors that will affect how well your content performs in search results. You should think about the keywords you want to target, the structure of your content, the quality of information you provide, and how easy it is for readers to understand what you are saying... (200 words)

**优化后（短段落）：**
When creating website content, consider these key factors:

**Keywords**
Target relevant search terms your audience uses. Place them naturally in titles, headings, and throughout the content.

**Structure**
Organize content with clear headings (H1, H2, H3). Use short paragraphs of 50-100 words.

**Quality**
Provide accurate, up-to-date information. Cite authoritative sources to build trust.

**优化措施：**
✅ 段落 50-100 词
✅ 使用项目符号
✅ 清晰的小标题
✅ 逻辑流畅
```

#### C. 词汇简化
```markdown
**原始内容：**
Utilize this methodology to facilitate enhancement of your optimization endeavors.

**优化后：**
Use this method to improve your optimization efforts.

**词汇替换表：**
- "utilize" → "use"
- "facilitate" → "help" / "make easier"
- "enhancement" → "improvement"
- "endeavors" → "efforts"
- "consequently" → "so" / "therefore"
- "nevertheless" → "however"
```

---

### 4. 结构优化（--focus structure）

**目标：** 改善内容组织和流程

**核心改进：**

#### A. 开头优化
```markdown
**原始内容（开头拖沓）：**
In today's digital landscape, where businesses are constantly competing for attention online, it has become increasingly important to have a strong online presence. Many companies struggle with... (150 words before main point)

**优化后（直接切入）：**
SEO drives 75% of website traffic. Yet most businesses fail to optimize properly.

This guide shows you how to master SEO in 5 steps.

**优化措施：**
✅ 前 100 词包含核心信息
✅ 直接点明主题
✅ 吸引读者继续阅读
✅ 避免冗余开头
```

#### B. 标题层级
```markdown
**原始内容（层级混乱）：**
# Main Title
### Subtitle
#### Sub-subtitle
## Another Section
### Subsection

**优化后（清晰层级）：**
# Main Title (H1)
## Section 1 (H2)
### Subsection 1.1 (H3)
#### Detail 1.1.1 (H4)
## Section 2 (H2)
### Subsection 2.1 (H3)

**优化措施：**
✅ H1：文章标题（仅 1 个）
✅ H2：主要章节（3-5 个）
✅ H3：子章节
✅ H4-H6：细节（按需使用）
✅ 不跳级（H1 → H3）
```

#### C. 内容流程
```markdown
**优化的流程结构：**
1. **吸引人的开头** (100-150 词)
   - TL;DR（如果 GEO 优化）
   - 问题陈述
   - 价值承诺

2. **核心内容** (主体)
   - 按逻辑顺序组织
   - 使用过渡语句
   - 每个观点有支撑

3. **实用建议** (可操作)
   - 具体步骤
   - 工具推荐
   - 示例和案例

4. **常见问题** (FAQ)
   - 解决常见疑问
   - 提供直接答案

5. **结论和行动号召** (CTA)
   - 总结关键要点
   - 引导下一步行动

**示例过渡语句：**
- "Now that we understand X, let's explore Y..."
- "Building on this concept, we can see..."
- "This leads us to the next important point..."
- "Let's look at a practical example..."
```

---

### 5. 全面优化（--focus all）

**目标：** 同时优化所有方面

**优化流程：**
1. 先进行 GEO 优化（添加权威性、实体、结构）
2. 再进行 SEO 优化（关键词、元标签、链接）
3. 然后优化可读性（简化语言、段落）
4. 最后优化结构（流程、层级、组织）
5. 生成平衡的最终版本

**示例：**
```markdown
# How to Do Keyword Research: Complete Guide

## TL;DR
Keyword research identifies search terms your target audience uses. Use tools like Google Keyword Planner and SEMrush to find high-volume, low-competition keywords.

## What is Keyword Research?

**Definition:** Keyword research is the process of finding and analyzing search terms that people enter into search engines.

**Why it matters:**
- 75% of users never scroll past the first page
- Proper keywords can increase traffic by 300%
- Foundation of all SEO strategies

**Who needs it:** Website owners, content marketers, SEO professionals

## Step 1: Brainstorm Seed Keywords

**Goal:** Identify 10-20 broad topics related to your business

**How to do it:**
1. List your main products/services
2. Think about customer pain points
3. Consider industry terms

**Example:**
For a fitness website:
- "weight loss"
- "muscle building"
- "diet plans"
- "exercise routines"

## Step 2: Use Keyword Research Tools

**Recommended Tools:**
- [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/) - Free, basic data
- [SEMrush](https://www.semrush.com/) - Comprehensive analysis ($119/mo)
- [Ahrefs](https://ahrefs.com/) - Advanced features ($129/mo)

**What to look for:**
- Search volume (aim for 500-5,000/month)
- Competition level (lower is better)
- Keyword difficulty (target <30 for new sites)

## Common Questions

### Q: How many keywords should I target?
**A:** Focus on 3-5 primary keywords per page, plus 10-15 long-tail variations.

### Q: What's the difference between short-tail and long-tail keywords?
**A:**
- **Short-tail:** "SEO" (high volume, high competition)
- **Long-tail:** "how to do SEO for beginners" (lower volume, lower competition, higher conversion)

### Q: How often should I update my keyword research?
**A:** Review every 3-6 months, or when you notice significant ranking changes.

## Key Takeaways

✅ Start with seed keywords from your business
✅ Use research tools to find opportunities
✅ Balance search volume with competition
✅ Focus on long-tail keywords for quick wins
✅ Update research regularly

## Next Steps

Ready to dive deeper? Check out:
- [On-Page SEO Guide](/on-page-seo)
- [Content Optimization Tips](/content-optimization)
- [Free SEO Tools](/seo-tools)

---
**Last updated:** January 2024
**Author:** SEO Team
**Sources:** Google Search Central, Moz, Ahrefs
```

---

## 使用示例

### 基础用法

```bash
# GEO 优化
/ai-content-rewriter blog/post.md --focus geo --optimize-for geo

# SEO 优化
/ai-content-rewriter post.md --focus seo --optimize-for seo

# 可读性优化
/ai-content-rewriter article.md --focus readability

# 全面优化
/ai-content-rewriter page.md --focus all --optimize-for both
```

### 高级选项

```bash
# GEO + 权威性语气
/ai-content-rewriter guide.md \
  --focus geo \
  --tone authoritative \
  --optimize-for geo

# SEO + 专业语气 + 目标引用率 85%
/ai-content-rewriter post.md \
  --focus seo \
  --tone professional \
  --target-citation-rate 85 \
  --optimize-for both

# 全面优化 + 保留原有风格
/ai-content-rewriter article.md \
  --focus all \
  --preserve-style \
  --optimize-for geo
```

## 输出格式

### 优化报告

```markdown
# ✅ 内容重写完成

**原始文件：** blog/post.md
**优化重点：** GEO（生成式引擎优化）
**优化目标：** 提升 AI 搜索引用率

---

## 📊 优化前后对比

### GEO 评分
| 维度 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 权威性 | 42 | 78 | +36 ✅ |
| 实体关系 | 58 | 82 | +24 ✅ |
| 内容结构 | 55 | 75 | +20 ✅ |
| 数据质量 | 70 | 80 | +10 ✅ |
| 引用密度 | 50 | 72 | +22 ✅ |
| 技术优化 | 45 | 68 | +23 ✅ |
| **总分** | **53** | **76** | **+23** ⭐ |

### SEO 评分
| 维度 | 优化前 | 优化后 |
|------|--------|--------|
| 标题优化 | 12/15 | 15/15 ✅ |
| 内容质量 | 25/30 | 28/30 ✅ |
| 关键词使用 | 14/20 | 18/20 ✅ |
| 结构 | 12/15 | 15/15 ✅ |
| 链接 | 6/10 | 9/10 ✅ |
| **总分** | **69** | **85** ✅ |

### 可读性评分
- **Flesch Reading Ease:** 58 → 72 (+14) ✅
- **平均段落长度:** 180 词 → 85 词 (-53%) ✅
- **平均句子长度:** 18 词 → 12 词 (-33%) ✅

---

## 🔧 主要优化内容

### 1. 添加了 TL;DR 总结
**位置：** 开头
**长度：** 2 句话
**作用：** 帮助 AI 快速理解核心内容

### 2. 优化了概念定义
**添加定义：** 5 个核心概念
**定义位置：** 每个概念首次出现时
**定义格式：** 加粗 + 清晰解释

### 3. 增加了引用来源
**原始引用数：** 2 个
**优化后引用数：** 12 个
**权威来源：** Google Search Central, SEMrush, Ahrefs, Moz

### 4. 改进了内容结构
**标题层级：** H1 → H2 → H3（清晰）
**段落长度：** 50-100 词（原来 150-250 词）
**添加 FAQ：** 5 个常见问题

### 5. 增强了权威性
**作者信息：** 添加资质说明
**时间戳：** 发布日期 + 最后更新
**引用来源：** 12 个权威来源
**Schema 标记：** Article + FAQPage

---

## 📝 优化示例

### 示例 1：开头优化

**原始内容：**
> In the world of digital marketing, there are many strategies that businesses can use to improve their online presence. One of the most important strategies is search engine optimization, which helps websites rank higher in search results... (120 words)

**优化后：**
> SEO drives 75% of website traffic. Yet most businesses fail to optimize properly.
>
> This guide shows you how to master SEO in 5 practical steps. (23 words)

**改进：**
- ✅ 直接切入主题（节省 97 词）
- ✅ 使用具体数据（75%）
- ✅ 明确价值承诺（5 个步骤）
- ✅ 更适合 AI 引用

### 示例 2：概念定义

**原始内容：**
> Keyword research is important for SEO.

**优化后：**
> **What is Keyword Research?**
>
> **Definition:** Keyword research is the process of finding and analyzing search terms that people enter into search engines.
>
> **Why it matters:**
> - 75% of users never scroll past the first page
> - Proper keywords can increase traffic by 300%
> - Foundation of all SEO strategies

**改进：**
- ✅ 明确定义
- ✅ 说明重要性
- ✅ 使用数据支持
- ✅ 清晰的格式

### 示例 3：引用来源

**原始内容：**
> Studies show that SEO is important.

**优化后：**
> According to [Google Search Central](https://developers.google.com/search), SEO is crucial for online visibility. Research by [SEMrush](https://www.semrush.com/) shows that organic search drives 53% of website traffic.

**改进：**
- ✅ 具体引用来源
- ✅ 可验证的数据
- ✅ 权威性增强
- ✅ 可点击链接

---

## 📄 生成文件

### 优化后的内容
**文件：** `blog/post-optimized.md`
**内容：** 完整的优化后内容

### Schema.org 标记
**文件：** `blog/post-schema.json`
**内容：** Article + FAQPage JSON-LD

### 对比报告
**文件：** `blog/post-comparison.md`
**内容：** 优化前后详细对比

---

## 🎯 预期效果

### AI 引用率提升
- **ChatGPT:** 22% → 68% (+46%)
- **Claude:** 18% → 72% (+54%)
- **Perplexity:** 25% → 78% (+53%)
- **Google SGE:** 15% → 55% (+40%)

### SEO 排名提升
- **目标关键词：** 排名 #15 → #8 (前 2 页)
- **长尾关键词：** 排名 #25 → #5 (首页)
- **有机流量：** +40-60% (3-6 个月内)

### 用户体验改善
- **页面停留时间：** +35%
- **跳出率：** -25%
- **社交分享：** +50%

---

## 🔍 下一步建议

### 立即发布
1. ✅ 内容已优化，可直接发布
2. 📝 添加图片和视频（建议）
3. 🔗 设置内部链接
4. 📢 在社交媒体分享

### 进一步优化
1. 根据目标受众调整语气
2. 添加品牌特定信息
3. 包含更多案例和示例
4. 优化关键词密度

### 监控效果
```bash
# 监控 AI 引用表现
/geo-citation-monitor --url "https://yoursite.com/blog/post-optimized"

# 检查 GEO 评分
/geo-content-audit blog/post-optimized.md
```

---

**重写时间：** 2024-01-15 16:45
**优化用时：** 3 分钟
**内容 ID：** rewrite-20240115-164500
**状态：** ✅ 准备发布
```

## 多版本生成

### 版本对比

```markdown
# 📊 三个版本对比

## 版本 A：保守优化（保留原风格）
**特点：**
- 最小化改动
- 保留原有语气
- 仅修复明显问题
**适用：** 品牌声音强烈的内容
**GEO 评分提升：** +8 分

## 版本 B：积极优化（最大化 GEO）⭐ 推荐
**特点：**
- 全面 GEO 优化
- 添加所有增强元素
- 最大化 AI 引用率
**适用：** 教育性内容、指南
**GEO 评分提升：** +23 分

## 版本 C：平衡版本（GEO + SEO）
**特点：**
- GEO 和 SEO 平衡
- 中等改动程度
- 兼顾两者需求
**适用：** 商业页面、产品描述
**GEO 评分提升：** +15 分
**SEO 评分提升：** +12 分

### 推荐选择
- 教育内容 → 版本 B（积极 GEO）
- 商业页面 → 版本 C（平衡）
- 品牌内容 → 版本 A（保守）
```

## 质量保证

### 验证检查清单

```markdown
## ✅ 优化完成检查

### 内容完整性
- [ ] 所有原始信息保留
- [ ] 无事实错误
- [ ] 逻辑连贯
- [ ] 无遗漏内容

### GEO 优化
- [ ] TL;DR 总结（如果指南）
- [ ] 概念定义清晰
- [ ] 引用来源充足（10+）
- [ ] Schema.org 标记生成
- [ ] 内部链接建立

### SEO 优化
- [ ] 关键词自然使用
- [ ] 标题优化
- [ ] 元描述生成
- [ ] 内部链接添加
- [ ] 锚文本描述性

### 可读性
- [ ] Flesch 评分 60-80
- [ ] 段落长度 50-100 词
- [ ] 句子长度 <15 词
- [ ] 无复杂术语
- [ ] 过渡语句流畅

### 技术要求
- [ ] H1-H6 层级正确
- [ ] 无标题跳级
- [ ] 链接有效
- [ ] 格式一致
- [ ] 无拼写错误
```

## 相关命令

- `/ai-content-generator` - 生成新内容
- `/geo-content-audit` - 审计内容 GEO 评分
- `/geo-citation-monitor` - 监控 AI 引用表现
- `/generate-report` - 生成优化报告

## 注意事项

- ⚠️ 保留原始内容的核心信息
- ⚠️ 避免过度优化（关键词堆砌）
- ⚠️ 保持事实准确性
- ⚠️ 维护品牌声音
- ✅ 支持中英文双语
- ✅ 自动生成 Schema 标记
- ✅ 提供多个版本选择
- ✅ 详细的对比报告

---

**命令版本：** 1.0.0
**最后更新：** 2024-01-15
**维护者：** ai-content-creator skill
