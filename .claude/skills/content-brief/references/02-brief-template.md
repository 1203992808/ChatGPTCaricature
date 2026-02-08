# Brief 输出模板

> CHECKPOINT 4 输出的 Brief 必须严格按照此模板格式。
> 每个章节都是必须的，不可省略。

---

## 模板

```markdown
# Content Brief: {keyword}

## 关键词策略

| 类型 | 关键词 | 搜索量（如有） | 来源 |
|------|--------|---------------|------|
| Primary | ... | ... | 调研/用户 |
| Long-tail | ... | ... | 调研/用户 |
| Semantic | ... | ... | 调研/用户 |
| Related | ... | ... | 调研/用户 |

### 关键词分布计划

- H1: "..." (keyword_type: primary)
- H2-1: "..." (keyword_type: primary/long-tail)
- H2-2: "..." (keyword_type: semantic)
- H2-3: "..." (keyword_type: related)
- H2-4: "..." (keyword_type: long-tail)
- ...
- 密度目标: X% (基于 seo-standards.md 中 {locale} 的标准)

### 竞品 H2 关键词模式

- 高频词: word1 (N次), word2 (N次), ...
- 高频短语: "phrase1" (N次), "phrase2" (N次), ...
- 常用修饰词: free, best, online, ...

## 竞品洞察

| # | Domain | 字数 | H2数 | 密度 | 特色 |
|---|--------|------|------|------|------|
| 1 | ... | ... | ... | ... | ... |
| 2 | ... | ... | ... | ... | ... |
| ... | ... | ... | ... | ... | ... |
| 10 | ... | ... | ... | ... | ... |

### 共性
- X/10 有在线 demo/generator
- X/10 有 showcase/gallery
- 平均字数: XXXX
- 平均 FAQ: X 个
- X/10 有对比表格

### 差异化机会
- [基于竞品弱点识别的机会]
- [我们独有的优势]

## 推荐页面结构

| 顺序 | Section Key | Block | 理由 | 目标字数 |
|------|------------|-------|------|---------|
| 1 | hero | hero-image | 100% 竞品有 | 50 |
| 2 | introduce | features-list | 80% 竞品有 | 200 |
| ... | ... | ... | ... | ... |

### show_sections
```json
["hero", "introduce", "howItWorks", "features", "useCases", "faq", "cta"]
```

## 目标参数

- 总字数: {X} words (不低于 seo-standards 最低值)
- FAQ 数量: {X} (不少于 6)
- 关键词密度: {X}% (参考 seo-standards.md)
- 内链数量: 3-5
```

---

## 模板字段说明

| 字段 | 必需 | 说明 |
|------|------|------|
| 关键词策略表 | 是 | 必须包含 4 种类型 |
| 来源列 | 是 | 标注"用户"或"调研"，用户提供的优先 |
| 关键词分布计划 | 是 | 每个 H2 映射关键词类型 |
| 竞品 H2 关键词模式 | 是 | 来自脚本 h2_keyword_patterns |
| 竞品洞察表 | 是 | 10 行，每个竞品一行 |
| 推荐页面结构 | 是 | Block 必须来自 01-block-registry.md |
| show_sections JSON | 是 | 可直接用于 page-builder |
| 目标参数 | 是 | 字数/密度参考 seo-standards.md |

---

**Last Updated:** 2026-02-07
