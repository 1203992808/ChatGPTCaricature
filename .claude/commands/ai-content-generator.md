---
description: 使用 AI 生成高质量的 SEO 和 GEO 优化内容，支持多种内容类型和风格
argument-hint: --topic <topic> --type <content-type> --length <words> [--tone <style>] [--optimize-for <target>]
options:
  - topic: 内容主题
  - type: 内容类型（blog-post, guide, case-study, comparison, listicle）
  - length: 内容长度（词数）
  - tone: 语气风格（professional, casual, friendly, authoritative）
  - optimize-for: 优化目标（seo, geo, both）
  - include-schema: 是否包含 Schema.org 标记
examples:
  - /ai-content-generator --topic "ChatGPT for SEO" --type blog-post --length 1500 --tone professional --optimize-for geo
  - /ai-content-generator --topic "GEO optimization strategies" --type guide --length 3000 --optimize-for geo --include-schema
  - /ai-content-generator --topic "SEO tools comparison" --type comparison --length 2000 --tone authoritative
---

## 完整实现

### 命令执行流程

```markdown
# AI 内容生成执行流程

## 步骤 1: 参数解析和需求分析
输入：topic, type, length, tone, optimize-for
处理：
- 验证主题相关性
- 确定内容类型
- 设定字数目标
- 选择语气风格
输出：内容需求规范

## 步骤 2: 主题研究和信息收集
根据主题进行：
- 关键概念识别
- 引用来源搜索
- 竞争内容分析
- GEO 机会识别
输出：主题研究数据

## 步骤 3: 大纲生成
创建内容大纲：
- 生成多个标题选项
- 规划章节结构
- 列出关键要点
- 确定引用来源
输出：结构化大纲

## 步骤 4: 内容生成
根据大纲生成：
- 吸引人的标题
- 清晰的引言
- 详细的主体内容
- 有力的结论
- CTA（如果适用）
输出：完整初稿

## 步骤 5: GEO 优化（如果启用）
优化内容：
- 添加 TL;DR 总结
- 优化核心概念定义
- 添加引用来源标注
- 优化内容结构
- 生成 Schema.org 标记
输出：GEO 优化版本

## 步骤 6: 质量验证
检查内容质量：
- 事实准确性
- 语法正确性
- 可读性评分
- SEO 评分
- GEO 评分
输出：质量报告

## 步骤 7: 最终输出
保存到文件并返回摘要
```

## 内容类型详解

### 1. blog-post（博客文章）

**特点：**
- 字数：1,000-2,000 词
- 结构：引言 + 3-5 个小节 + 结论
- 语气：专业但易懂
- 目的：教育、吸引流量

**生成模板：**
```markdown
# [标题]

## 引言
[100-150 词引言]

## [小节1]
[300-500 词内容]

## [小节2]
[300-500 词内容]

## [小节3]
[300-500 词内容]

## 结论
[100-150 词总结]

## 常见问题
### Q: [问题]？
**A:** [答案]

---
**作者：** [姓名]
**日期：** [日期]
```

### 2. guide（指南教程）

**特点：**
- 字数：2,000-4,000 词
- 结构：TL;DR + 定义 + 步骤 + FAQ
- 语气：指导性、详细
- 目的：教育、操作指导
- **AI 引用率：** 85%（最高）

**生成模板：**
```markdown
# [主题]完整指南

## TL;DR
[100 字总结]

## [主题]是什么？
**定义：** [清晰定义]
**重要性：** [为什么重要]
**应用：** [适用于谁]

## 为什么重要？
1. [理由1]
2. [理由2]
3. [理由3]

## 如何实施（分步骤）

### 步骤1：[标题]
- **目标：** [明确目标]
- **所需时间：** [预期时间]
- **工具：** [推荐工具]
- **详细说明：**
  1. [子步骤1]
  2. [子步骤2]
  3. [子步骤3]
- **示例：** [实际案例]
- **注意事项：** [重要提醒]

[继续其他步骤...]

## 常见问题
### Q: [问题]？
**A:** [直接答案]
**详情：** [详细解释]
**参考：** [来源链接]

## 专家建议
✅ [建议1]
✅ [建议2]
✅ [建议3]

## 相关资源
- [资源1](链接)
- [资源2](链接)

---
**最后更新：** [日期]
**作者：** [姓名 + 资质]
```

### 3. case-study（案例研究）

**特点：**
- 字数：1,200-1,800 词
- 结构：背景 + 策略 + 结果 + 要点
- 语气：叙述性、数据驱动
- 目的：展示成功案例

**生成模板：**
```markdown
# 案例研究：[公司]如何[成果]

## 背景和挑战
**公司：** [公司名]
**行业：** [行业]
**规模：** [公司规模]
**挑战：** [面临问题]
- [挑战1]
- [挑战2]
- [挑战3]

## 策略和实施

### 第一阶段：[策略名]
[详细实施过程]

### 第二阶段：[策略名]
[详细实施过程]

### 第三阶段：[策略名]
[详细实施过程]

## 结果和数据

### 关键指标
| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 流量 | 5,000 | 12,500 | +150% |
| 转化率 | 2.1% | 4.8% | +129% |
| 排名 | #15 | #3 | +12位 |

### 时间线
- **第1个月：** [结果]
- **第3个月：** [结果]
- **第6个月：** [结果]

## 关键要点
1. [要点1]
2. [要点2]
3. [要点3]

## 适用性
这个策略适用于：
- [适用场景1]
- [适用场景2]

## 经验教训
### 成功因素
- [因素1]
- [因素2]

### 潜在挑战
- [挑战1]
- [挑战2]

---
**案例研究期间：** [日期范围]
**数据来源：** [来源]
**联系方式：** [公司信息]
```

### 4. comparison（对比分析）

**特点：**
- 字数：1,500-2,500 词
- 结构：对比表 + 详细分析 + 建议
- 语气：客观、比较性
- 目的：帮助选择

**生成模板：**
```markdown
# [选项A] vs [选项B]：完整对比

## 快速总结
[1-2 句话总结核心差异]

## 对比表格

| 特性 | [选项A] | [选项B] | 优胜者 |
|------|---------|---------|--------|
| 价格 | $XXX | $YYY | [A/B] |
| 功能 | [功能1] | [功能2] | [A/B] |
| 易用性 | [评分] | [评分] | [A/B] |
| 性能 | [数据] | [数据] | [A/B] |

## [选项A] 详细分析

### 优点
- [优点1]
- [优点2]

### 缺点
- [缺点1]
- [缺点2]

### 适用场景
- [场景1]
- [场景2]

## [选项B] 详细分析

### 优点
- [优点1]
- [优点2]

### 缺点
- [缺点1]
- [缺点2]

### 适用场景
- [场景1]
- [场景2]

## 深度对比

### 价格分析
[详细价格对比]

### 功能对比
[详细功能对比]

### 用户体验
[用户体验分析]

## 选择建议

### 选择 [选项A] 如果你：
- [条件1]
- [条件2]

### 选择 [选项B] 如果你：
- [条件1]
- [条件2]

### 其他选择
- [替代方案1]
- [替代方案2]

## 常见问题
### Q: [最常见问题]？
**A:** [答案]

---

**对比时间：** [日期]
**数据来源：** [来源]
```

### 5. listicle（列表文章）

**特点：**
- 字数：1,500-3,000 词
- 结构：引言 + 10+ 项列表 + 结论
- 语气：轻松、易读
- 目的：吸引社交媒体分享

**生成模板：**
```markdown
# [数字] 个[主题][最佳/最重要/有效]的方法

## 引言
[100-150 词引言]

## 列表内容

### 1. [第一项]
**为什么重要：** [重要性说明]
**如何实施：** [步骤]
**预期效果：** [效果]
**示例：** [实际案例]

### 2. [第二项]
[重复上述结构]

[继续到第10项或更多...]

## 结论
[100-150 词总结]

## 相关资源
- [资源1](链接)
- [资源2](链接)

---

**作者：** [姓名]
**日期：** [日期]
```

## 使用示例

### 基础用法

```bash
# 生成博客文章
/ai-content-generator \
  --topic "ChatGPT for SEO optimization" \
  --type blog-post \
  --length 1500 \
  --tone professional

# 生成指南教程（GEO 优化）
/ai-content-generator \
  --topic "GEO optimization strategies" \
  --type guide \
  --length 3000 \
  --optimize-for geo \
  --include-schema

# 生成案例研究
/ai-content-generator \
  --topic "How Company X increased traffic by 300%" \
  --type case-study \
  --length 1800 \
  --tone data-driven
```

### 高级选项

```bash
# 生成 GEO 优化指南（包含 Schema）
/ai-content-generator \
  --topic "Complete guide to AI search optimization" \
  --type guide \
  --length 4000 \
  --tone authoritative \
  --optimize-for geo \
  --include-schema

# 生成对比分析文章
/ai-content-generator \
  --topic "SEO vs PPC: which is better?" \
  --type comparison \
  --length 2500 \
  --tone objective \
  --optimize-for both

# 生成列表文章（社交媒体友好）
/ai-content-generator \
  --topic "10 essential SEO tools for 2024" \
  --type listicle \
  --length 2000 \
  --tone casual \
  --optimize-for seo
```

## 输出格式

### 成功生成输出

```markdown
# ✅ 内容生成成功

**内容类型：** guide（指南教程）
**主题：** GEO optimization strategies
**字数：** 3,127 词
**生成时间：** 45 秒

## 内容摘要

### 标题
**GEO 优化策略完整指南：如何在 AI 搜索时代获得优势**

### 核心章节
1. 什么是 GEO？（定义和重要性）
2. GEO vs 传统 SEO（核心差异）
3. GEO 优化核心策略（5 大策略）
4. 实施步骤（分步指南）
5. 常见问题（8 个 FAQ）

### 质量评分
- **事实准确性：** ✅ 通过
- **语法正确性：** ✅ 通过
- **可读性评分：** 72/100（良好）
- **SEO 评分：** 82/100（优秀）
- **GEO 评分：** 85/100（优秀）

### GEO 优化
- ✅ TL;DR 总结
- ✅ 清晰的概念定义（5 个核心概念）
- ✅ 引用来源标注（12 个权威来源）
- ✅ Schema.org 标记（Article + FAQPage）
- ✅ 内部链接网络（8 个相关链接）

### 预期表现
- **AI 引用率：** 82%（非常高）
- **预期引用：** 45 次/月
- **预期流量：** 2,500 访客/月
- **目标引擎：** ChatGPT, Claude, Perplexity

## 文件输出

**内容文件：**
`.claude-flow/cache/content/generated/geo-guide-20240215.md`

**Schema 文件：**
`.claude-flow/cache/content/generated/geo-guide-schema.json`

**质量报告：**
`.claude-flow/cache/reports/content-quality/geo-guide-20240215.json`

## 下一步操作

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

---

**生成时间：** 2024-02-15 16:30
**内容 ID：** geo-guide-20240215-163000
**状态：** ✅ 准备发布
```

## 质量验证详情

### 1. 事实准确性验证

**检查项目：**
- ✅ 统计数据可验证性
- ✅ 引用来源真实性和权威性
- ✅ 技术术语使用准确性
- ✅ 日期和时间戳准确性
- ✅ 无虚假或误导信息

**验证方法：**
```yaml
validation_steps:
  - name: "检查引用来源"
    action: "verify_urls"
    check:
      - URL 可访问性
      - 域名权威性
      - 内容相关性

  - name: "验证统计数据"
    action: "cross_reference"
    sources:
      - "官方统计数据"
      - "权威行业报告"
      - "学术研究论文"

  - name: "技术术语验证"
    action: "terminology_check"
    dictionary:
      - "SEO 标准术语"
      - "行业词典"
      - "技术文档"
```

### 2. 可读性评分

**Flesch Reading Ease 评分标准：**
```
90-100 分：非常易读（5年级水平）✅
80-89 分：易读（6年级水平）✅
70-79 分：较易读（7年级水平）✅
60-69 分：中等（8-9年级水平）⚠️
50-59 分：较难（10-12年级水平）⚠️
30-49 分：难（13-16年级水平）❌
```

**可读性优化建议：**
- 使用短段落（50-150 词）
- 避免长句（<20 词）
- 使用简单的词汇
- 添加小标题和列表
- 避免技术术语堆砌

### 3. SEO 评分标准

**评分维度（总分 100）：**
```yaml
seo_scoring:
  title_optimization:
    weight: 15
    criteria:
      - contains_keyword: 5
      - compelling: 5
      - right_length: 5

  content_quality:
    weight: 30
    criteria:
      - word_count: 10
      - depth: 10
      - originality: 10

  keyword_usage:
    weight: 20
    criteria:
      - density: 10
      - placement: 10

  structure:
    weight: 15
    criteria:
      - headings: 5
      - paragraphs: 5
      - lists: 5

  links:
    weight: 10
    criteria:
      - internal: 5
      - external: 5

  multimedia:
    weight: 10
    criteria:
      - images: 5
      - videos: 5
```

### 4. GEO 评分标准

**6 维度评分（总分 100）：**
```yaml
geo_scoring:
  authority:
    weight: 20
    criteria:
      - author_info: 7
      - citations: 7
      - timestamps: 6

  entity_relationships:
    weight: 20
    criteria:
      - definitions: 7
      - schema_markup: 7
      - internal_links: 6

  content_structure:
    weight: 20
    criteria:
      - paragraph_length: 7
      - heading_hierarchy: 7
      - concept_density: 6

  data_quality:
    weight: 20
    criteria:
      - accuracy: 7
      - freshness: 7
      - completeness: 6

  citation_density:
    weight: 10
    criteria:
      - keyword_density: 5
      - semantic_relevance: 5

  technical_optimization:
    weight: 10
    criteria:
      - structured_data: 5
      - performance: 5
```

## Schema.org 标记生成

### Article Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[文章标题]",
  "description": "[文章描述]",
  "author": {
    "@type": "Person",
    "name": "[作者姓名]",
    "jobTitle": "[职位]",
    "credential": "[资质]",
    "sameAs": [
      "https://linkedin.com/in/[author]",
      "https://twitter.com/[@author]"
    ]
  },
  "publisher": {
    "@type": "Organization",
    "name": "[公司名称]",
    "logo": {
      "@type": "ImageObject",
      "url": "[Logo URL]"
    }
  },
  "datePublished": "[发布日期]",
  "dateModified": "[修改日期]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "[页面 URL]"
  },
  "about": [
    {
      "@type": "Thing",
      "name": "[核心概念1]",
      "description": "[定义]"
    }
  ],
  "keywords": "[关键词1], [关键词2], [关键词3]"
}
```

### FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[问题1]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[答案1]"
      }
    },
    {
      "@type": "Question",
      "name": "[问题2]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[答案2]"
      }
    }
  ]
}
```

## 数据存储

### 生成的内容

```
.claude-flow/cache/content/generated/
├── 2024-02-15/
│   ├── blog-post-001.md
│   ├── guide-001.md
│   └── case-study-001.md
└── schema/
    ├── article-schema-001.json
    └── faq-schema-001.json
```

### 质量报告

```
.claude-flow/cache/reports/content-quality/
├── 2024-02-15-blog-post.json
├── 2024-02-15-guide.json
└── 2024-02-15-case-study.json
```

## 相关命令

- `/ai-content-rewriter` - 内容重写和优化
- `/generate-report` - 生成各类报告
- Phase 1 GEO 命令（审计、监控、对比）
- Phase 3 报告命令（生成报告）

## 注意事项

- ⚠️ 生成的内容需要人工审核和编辑
- ⚠️ 确保 AI API 密钥已配置
- ⚠️ 引用来源需要验证准确性
- ⚠️ 避免生成敏感或争议内容
- ✅ 支持中英文双语生成
- ✅ 自动检测并优化内容结构
- ✅ 生成完整的 Schema.org 标记

---

**命令版本：** 1.0.0
**最后更新：** 2024-02-15
**维护者：** ai-content-creator skill
