# Content Brief Generator — 使用指南

## 概述

Content Brief 是一个**调研编排器**，在创建页面之前做深度 SEO 调研。
它不写代码、不改文件，只产出一份结构化的调研报告（Brief），
这份 Brief 可以直接作为 `/shipany-page-builder` 的输入。

## 使用场景

| 场景 | 示例 |
|------|------|
| 新关键词建页 | "我要做 AI Image Generator 这个词" |
| 竞品调研 | "帮我看看 AI art generator 这个词的竞争情况" |
| 内容规划 | "我打算做一个新的 landing page，先帮我调研" |

## 输入格式

### 最简输入

```
/content-brief "AI Image Generator"
```

### 带用户关键词

```
/content-brief "AI Image Generator"
用户关键词:
- AI image generator (22,000/月)
- free AI image generator (12,000/月)
- AI art generator (8,500/月)
- text to image AI (6,200/月)
```

### 带竞品 URL

```
/content-brief "AI Image Generator"
竞品:
- https://www.fotor.com/ai-image-generator/
- https://picsart.com/ai-image-generator/
```

### 完整输入

```
/content-brief "AI Image Generator" --locale en
用户关键词:
- AI image generator (22,000/月)
- free AI image generator (12,000/月)
竞品:
- https://www.fotor.com/ai-image-generator/
- https://picsart.com/ai-image-generator/
```

## 输出内容

Brief 包含 4 部分：

1. **关键词策略** — primary + long-tail + semantic + related，含分布计划
2. **竞品洞察** — 10 个竞品的结构、字数、关键词、特征分析
3. **推荐页面结构** — 映射到项目真实 block 组件
4. **目标参数** — 字数、FAQ 数、密度目标

## 与 shipany-page-builder 的衔接

Brief 完成后，用户可以：

```
用户: 按照这个 brief 创建页面
→ Claude 调用 /shipany-page-builder
→ 使用 brief 中的关键词、结构、字数目标来生成页面
```

## 分析脚本

竞品分析使用 Python 脚本自动化：

```bash
python3 .claude/skills/content-brief/scripts/analyze_competitors.py \
  --keyword "AI Image Generator" \
  --urls "url1,url2,...,url10" \
  --locale en \
  --output /tmp/competitor-analysis.json
```

脚本功能：
- 抓取每个竞品页面的 HTML
- 解析 H1/H2/H3 标题结构
- 统计字数和关键词密度
- 检测内容特征（FAQ、demo、gallery、对比表等）
- 检测 Schema 标记
- 生成聚合摘要和推荐结构

**无外部依赖** — 仅使用 Python 标准库。

## 注意事项

- 脚本抓取依赖页面的静态 HTML（JS 渲染的内容可能无法获取）
- 如果脚本抓取失败，Claude 会用 WebFetch 补充分析
- 关键词拓展基于 AI 知识，如需精确搜索量数据，请用户提供

---

**Last Updated:** 2026-02-07
