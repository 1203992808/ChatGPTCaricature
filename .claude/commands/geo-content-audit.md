---
description: 分析内容在 AI 搜索引擎（ChatGPT、Claude、Perplexity、Google SGE）中的引用优化潜力，识别引用障碍并提供优化建议。
argument-hint: <file-path-or-url> [--detailed] [--engines <list>] [--output <format>]
options:
  - detailed: 显示详细的分析过程
  - engines: 指定 AI 引擎（chatgpt,claude,perplexity,google-sge）
  - output: 输出格式（markdown,json）
examples:
  - /geo-content-audit blog/post.md
  - /geo-content-audit https://yoursite.com/article --detailed
  - /geo-content-audit post.md --engines chatgpt,claude --output json
---

## 功能说明

### 核心功能
**GEO 内容审计**分析内容在 AI 搜索引擎中的引用优化潜力，通过 6 维度评分系统识别引用障碍，并提供优先级排序的优化建议。

### 使用场景
- 评估博客文章的 AI 引用潜力
- 优化产品页面以提升 AI 搜索可见性
- 分析竞争对手内容的 GEO 表现
- 监控内容优化前后的 AI 引用率变化

## 执行流程

### 步骤 1: 内容读取
- **输入**: 文件路径或 URL
- **处理**:
  - 本地文件：使用 Read 工具直接读取
  - URL：使用 Bash (curl/wget) 获取内容
- **输出**: 原始内容字符串

### 步骤 2: 权威性信号检测
使用 Grep 工具检测：
```bash
# 检测 Schema.org JSON-LD
grep -r '@type' --include='*.json' --include='*.ld'

# 检测作者信息
grep -r 'author' --include='*.md' --include='*.tsx' --include='*.jsx'

# 检测引用来源
grep -E '\[.*\]\(http.*\)' content.md

# 检测时间戳
grep -E '(20\d{2}-\d{2}-\d{2}|January|February|March|April|May|June|July|August|September|October|November|December)' content.md
```

**评分逻辑**:
- 作者信息完整（+7 分）
- 有引用来源（+7 分）
- 有时间戳（+6 分）

### 步骤 3: 实体关系分析
使用 Grep + Read 工具：
```bash
# 提取标题结构
grep -E '^#+\s' content.md

# 计算段落长度
awk 'NF {print length}' content.md

# 检测内部链接
grep -E '\[.*\]\(\/.*\)' content.md

# 检测外部链接
grep -E '\[.*\]\(http.*\)' content.md
```

**评分逻辑**:
- 标题层级清晰（+7 分）
- 段落长度适中（50-150 词）（+7 分）
- 内部链接丰富（+6 分）

### 步骤 4: 数据质量评估
手动分析：
- 内容准确性（+7 分）：无明显错误
- 数据新鲜度（+7 分）：6 个月内更新
- 内容完整性（+6 分）：覆盖全面

### 步骤 5: 生成优化建议
基于评分结果，生成：
1. 🔴 高优先级建议（影响 +10 分以上）
2. 🟡 中优先级建议（影响 +5-10 分）
3. 🟢 低优先级建议（影响 +1-5 分）

### 步骤 6: 生成报告
- 保存到：`.claude-flow/cache/reports/geo/audit-时间戳.json`
- 输出：Markdown 格式报告

## 输出示例

### Markdown 输出（默认）

```markdown
# 🤖 AI 引用优化分析

## 内容分析：blog/post.md

**分析时间：** 2024-01-15 14:30
**目标引擎：** ChatGPT, Claude, Perplexity, Google SGE

---

## 📊 总体评分：58/100 ⚠️

| 维度 | 得分 | 满分 | 状态 |
|------|------|------|------|
| 权威性 | 42/100 | 20 | 🔴 |
| 实体关系 | 68/100 | 20 | 🟡 |
| 内容结构 | 55/100 | 20 | 🟡 |
| 数据质量 | 75/100 | 20 | ✅ |
| 引用密度 | 60/100 | 10 | 🟡 |
| 技术优化 | 50/100 | 10 | 🔴 |

**目标评分：** 70+/100
**当前差距：** -12 分

---

## 🔴 高优先级问题（影响 +10 分以上）

### 1. 缺少作者权威性标识 (-15 分)
**问题：**
- ❌ 无作者 Schema.org 标记
- ❌ 缺少作者资质说明
- ❌ 无专业背景信息

**修复方案：**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "author": {
    "@type": "Person",
    "name": "张三",
    "jobTitle": "高级 SEO 专家",
    "worksFor": {
      "@type": "Organization",
      "name": "Your Company"
    },
    "credential": "Google 认证 SEO 专家，10 年行业经验",
    "sameAs": [
      "https://linkedin.com/in/zhangsan",
      "https://twitter.com/zhangsan"
    ]
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15"
}
</script>
```

**预期提升：** +15 分

---

### 2. 实体关系不明确 (-12 分)
**问题：**
- ❌ 核心概念缺少明确定义
- ❌ 实体间关系不清晰
- ❌ 缺少知识图谱结构

**修复方案：**
```markdown
## 什么是 SEO？
**SEO（Search Engine Optimization）** 是通过优化网站内容和结构，提高在搜索引擎结果中排名的过程。

### 核心实体关系
- **SEO** 包含：[技术 SEO](/technical-seo)、[内容 SEO](/content-seo)、[外链建设](/link-building)
- **技术 SEO** 影响：网站速度、移动友好性、网站架构
- **内容 SEO** 需要：关键词研究、内容质量、用户体验
```

**预期提升：** +12 分

---

### 3. 内容结构不利于 AI 理解 (-10 分)
**问题：**
- ❌ 段落过长（平均 450 词）
- ❌ 缺少结构化标记
- ❌ 概念密度过高

**修复方案：**
```markdown
### TL;DR
SEO 是通过优化网站提高搜索引擎排名的过程，包含技术、内容和外链三大要素。（15 字总结）

### 什么是 SEO？
**定义：** SEO（Search Engine Optimization）是...
**重要性：** 80% 的流量来自有机搜索
**应用：** 适用于所有网站类型

### SEO 的三大支柱
#### 1. 技术 SEO
- **目标：** 优化网站技术基础
- **关键要素：**
  - 网站速度（< 3 秒）
  - 移动友好（响应式设计）
  - SSL 证书（HTTPS）

### 常见问题
#### Q: SEO 需要多长时间见效？
**A:** 通常 3-6 个月可见明显效果。
```

**预期提升：** +10 分

---

## 🟡 中优先级问题（影响 +5-10 分）

### 4. 数据新鲜度不足 (-5 分)
**问题：** 内容发布于 8 个月前

**修复方案：**
```markdown
**最后更新：** 2024-01-15
**数据来源：** 2024 年 1 月最新统计
**下次审查：** 2024-04-15

## 更新日志
- 2024-01-15：更新 Google 算法最新变化
- 2023-12-01：添加 AI 搜索优化内容
- 2023-06-15：初次发布
```

**预期提升：** +5 分

---

## 📈 预期改进

### 优化前后对比
| 维度 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 权威性 | 42 | 75 | +33 |
| 实体关系 | 68 | 85 | +17 |
| 内容结构 | 55 | 70 | +15 |
| 数据质量 | 75 | 80 | +5 |
| **总分** | **58** | **78** | **+20** |

### AI 引用率预测
- **ChatGPT:** 15% → 65% (+50%)
- **Claude:** 12% → 60% (+48%)
- **Perplexity:** 18% → 70% (+52%)
- **Google SGE:** 10% → 55% (+45%)

### 预期流量增长
**来自 AI 搜索的流量：** +35-50%

---

## 📝 快速修复清单

### 立即执行（今天）
- [ ] 添加作者 Schema.org 标记
- [ ] 优化内容结构（添加 TL;DR、FAQ）
- [ ] 明确核心概念定义

### 本周完成
- [ ] 建立实体关系和内部链接
- [ ] 更新数据和添加时间戳
- [ ] 优化段落长度

### 持续改进
- [ ] 定期更新内容（每 3 个月）
- [ ] 监控 AI 引用变化
- [ ] 收集用户反馈

---

**报告生成时间：** 2024-01-15
**下次审计建议：** 优化完成后重新评估
**数据文件：** `.claude-flow/cache/reports/geo/audit-20240115-143000.json`
```

### JSON 输出

```json
{
  "reportId": "geo-audit-20240115",
  "timestamp": "2024-01-15T14:30:00Z",
  "content": {
    "file": "blog/post.md",
    "url": "https://yoursite.com/article"
  },
  "scores": {
    "overall": 58,
    "authority": 42,
    "entityRelationships": 68,
    "contentStructure": 55,
    "dataQuality": 75,
    "citationDensity": 60,
    "technicalOptimization": 50
  },
  "issues": [
    {
      "priority": "high",
      "category": "authority",
      "issue": "缺少作者权威性标识",
      "impact": -15,
      "fix": "添加作者 Schema 和引用来源"
    },
    {
      "priority": "high",
      "category": "entityRelationships",
      "issue": "实体关系不明确",
      "impact": -12,
      "fix": "明确定义核心概念和关系"
    }
  ],
  "suggestions": [
    {
      "priority": "high",
      "action": "添加作者 Schema.org 标记",
      "code": "<script type=\"application/ld+json\">...",
      "expectedImprovement": 15
    }
  ]
}
```

## 使用示例

### 基础用法
```bash
# 审计本地文件
/geo-content-audit blog/my-post.md

# 审计 URL
/geo-content-audit https://example.com/article
```

### 高级选项
```bash
# 详细模式
/geo-content-audit post.md --detailed

# 指定 AI 引擎
/geo-content-audit post.md --engines chatgpt,claude

# 输出 JSON 格式
/geo-content-audit post.md --output json

# 组合使用
/geo-content-audit post.md --detailed --engines all --output json
```

## 相关命令
- `/geo-entity-extraction` - 提取实体和构建知识图谱
- `/geo-citation-monitor` - 监控 AI 引用表现
- `/seo-audit` - 传统 SEO 审计
- `/metadata` - 元数据优化

## 注意事项
- 支持本地文件和 URL
- 自动检测内容语言（中/英）
- 如果内容过长（>5000 词），建议分段分析
- JSON 输出可用于自动化集成
