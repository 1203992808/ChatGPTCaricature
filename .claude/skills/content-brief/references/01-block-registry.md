# Block Registry — 项目可用的页面组件

> Content Brief 推荐页面结构时，**只能从下表中选择 block**。
> 不能推荐项目中不存在的组件。

---

## Hero 区域（页面顶部，必选一个）

| Block | 用途 | 何时推荐 |
|-------|------|----------|
| `hero` | 基础 Hero：标题+描述+按钮+背景图 | 简单展示页、无交互需求 |
| `hero-image` | 高级 Hero：支持交互式 AI 图片生成 | **默认推荐**，产品/功能页 |
| `hero-generator` | Generator 专用 Hero | 有生成器交互的页面 |

---

## 内容展示区域

| Block | 用途 | 何时推荐 | 竞品对应 |
|-------|------|----------|----------|
| `features` | 网格特性卡片（icon+标题+描述） | "Features"、"Key Capabilities" | Features section |
| `features-list` | 图片+特性列表（左右布局） | "What is"、"Introduction"、"Overview" | Introduction / About |
| `features-accordion` | 手风琴展开（带图片切换） | "Benefits"、"Why Choose"、"Comparison" | Benefits / vs Competitors |
| `features-step` | 步骤引导（1→2→3） | "How it Works"、"Getting Started" | How-to / Steps |
| `features-media` | 带媒体的特性展示 | "Use Cases"、"Applications" | Use Cases |
| `features-flow` | 水平流式网格 | "Types"、"Styles"、"Categories" | Category listing |

---

## 社会证明区域

| Block | 用途 | 何时推荐 | 竞品对应 |
|-------|------|----------|----------|
| `showcases` | 简单作品展示网格 | 少量示例展示 | Gallery (simple) |
| `showcases-flow` | 高级画廊（分组筛选+弹窗） | **推荐**，有大量示例图 | Gallery / Showcase |
| `testimonials` | 用户评价（头像+引用） | 有用户好评 | Reviews / Testimonials |
| `stats` | 数字统计（大数字+描述） | 有数据背书（用户数、生成量等） | Stats / Numbers |
| `logos` | Logo 展示 | 合作品牌展示 | Trusted by |
| `social-avatars` | 社交头像展示 | 社区/社交证明 | Community |

---

## 转化区域

| Block | 用途 | 何时推荐 |
|-------|------|----------|
| `faq` | FAQ 手风琴（问答折叠） | **几乎所有页面都需要**，SEO 长尾词+结构化数据 |
| `cta` | 行动召唤（标题+描述+按钮） | **所有页面末尾必须有** |
| `pricing` | 价格方案表 | 有付费计划的页面 |
| `subscribe` | 邮件订阅表单 | 需要收集 leads |

---

## Section Key → Block 映射规则

页面 JSON 中 `show_sections` 的每个 key 需要对应一个 block：

```json
{
  "page": {
    "show_sections": ["hero", "introduce", "howItWorks", "features", "faq", "cta"],
    "sections": {
      "hero": { "block": "hero-image", ... },
      "introduce": { "block": "features-list", ... },
      "howItWorks": { "block": "features-step", ... },
      "features": { "block": "features", ... },
      "faq": { "block": "faq", ... },
      "cta": { "block": "cta", ... }
    }
  }
}
```

**注意：** `section key` 可以自定义命名（如 `introduce`、`howItWorks`、`benefits`），
但 `block` 字段必须是上表中的某个 block 名称。

---

## 常见页面结构模板

### 标准产品/功能页（推荐）

```
hero-image → features-list → features-step → features → showcases-flow → faq → cta
```

### 工具页（有 generator）

```
hero-generator → showcases-flow → features-list → features → faq → cta
```

### 对比/竞品页

```
hero → features-list → features-accordion → features → faq → cta
```

### 内容驱动页（博客/指南类）

```
hero → features-list → features-media → features-step → faq → cta
```

---

## Props 快速参考

所有 block 共享的基础 props：

```typescript
{
  id?: string;          // HTML id（用于锚点）
  block?: string;       // block 类型名
  title?: string;       // 章节标题（映射到 H2）
  description?: string; // 章节描述
  items?: SectionItem[]; // 列表项
  buttons?: Button[];   // 按钮
  image?: Image;        // 图片
  className?: string;   // Tailwind CSS 类（如 "bg-muted"）
}
```

`SectionItem` 通用结构：
```typescript
{
  title: string;        // 项标题（可映射到 H3）
  description: string;  // 项描述
  icon?: string;        // 图标名（Remix/Lucide）
  image?: Image;        // 项图片
}
```

---

**Last Updated:** 2026-02-07
