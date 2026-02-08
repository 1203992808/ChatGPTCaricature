---
description: 生成或优化页面的元数据
argument-hint: [page-path]
---

为指定页面生成 SEO 友好的元数据，包括 Title、Meta Description、Open Graph 标签和 Twitter Cards 标签。

## 功能

根据页面内容自动生成：
- ✅ 优化的 Title 标签
- ✅ 吸引人的 Meta Description
- ✅ 完整的 Open Graph 标签
- ✅ Twitter Cards 标签
- ✅ Canonical URL
- ✅ 其他有用的 meta 标签

## 参数

- `$1` 或 `$ARGUMENTS`: 页面路径（必需）
  - 可以是文件路径
  - 可以是 URL 路径
  - 示例：`app/about/page.tsx`、`/about`、`about`

## 支持的框架/模式

### Next.js App Router

```typescript
// app/[path]/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '...',
  description: '...',
  openGraph: {
    title: '...',
    description: '...',
    images: ['/og-image.jpg'],
  },
}
```

### Next.js Pages Router

```typescript
// pages/[path].tsx
import Head from 'next/head'

export default function Page() {
  return (
    <Head>
      <title>...</title>
      <meta name="description" content="..." />
      {/* Other meta tags */}
    </Head>
  )
}
```

### 纯 HTML

```html
<head>
  <title>...</title>
  <meta name="description" content="..." />
  <!-- Other meta tags -->
</head>
```

## 使用示例

### 示例 1：为关于页面生成元数据

```bash
/metadata app/about/page.tsx
```

输出：
```markdown
# 为关于页面生成的元数据

## 基本信息
- 页面类型：关于页面
- 检测语言：中文
- 目标关键词：关于我们、团队、公司介绍

## App Router 实现

将以下代码添加到 `app/about/page.tsx`：

\`\`\`typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '关于我们 | YourBrand - 专业团队介绍',
  description: '了解我们的专业团队、公司使命和价值观。我们致力于为客户提供优质的服务，拥有10年行业经验。立即联系我们了解更多！',
  keywords: ['关于我们', '团队介绍', '公司使命', 'YourBrand'],
  authors: [{ name: 'YourBrand Team', url: 'https://yourbrand.com/team' }],
  creator: 'YourBrand',
  publisher: 'YourBrand',

  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://yourbrand.com/about',
    title: '关于我们 | YourBrand',
    description: '了解我们的专业团队、公司使命和价值观。我们致力于为客户提供优质的服务，拥有10年行业经验。',
    siteName: 'YourBrand',
    images: [
      {
        url: 'https://yourbrand.com/images/og-about.jpg',
        width: 1200,
        height: 630,
        alt: '关于我们 - YourBrand',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: '关于我们 | YourBrand - 专业团队介绍',
    description: '了解我们的专业团队、公司使命和价值观。我们致力于为客户提供优质的服务，拥有10年行业经验。',
    images: ['https://yourbrand.com/images/og-about.jpg'],
    creator: '@yourbrand',
  },

  alternates: {
    canonical: 'https://yourbrand.com/about',
  },
}
\`\`\`

## Pages Router 实现

将以下代码添加到 `pages/about.tsx`：

\`\`\`typescript
import Head from 'next/head'

export default function AboutPage() {
  return (
    <Head>
      <title>关于我们 | YourBrand - 专业团队介绍</title>
      <meta name="description" content="了解我们的专业团队、公司使命和价值观。我们致力于为客户提供优质的服务，拥有10年行业经验。立即联系我们了解更多！" />
      <meta name="keywords" content="关于我们,团队介绍,公司使命,YourBrand" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="zh_CN" />
      <meta property="og:url" content="https://yourbrand.com/about" />
      <meta property="og:title" content="关于我们 | YourBrand" />
      <meta property="og:description" content="了解我们的专业团队、公司使命和价值观。我们致力于为客户提供优质的服务，拥有10年行业经验。" />
      <meta property="og:site_name" content="YourBrand" />
      <meta property="og:image" content="https://yourbrand.com/images/og-about.jpg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="关于我们 - YourBrand" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="关于我们 | YourBrand - 专业团队介绍" />
      <meta name="twitter:description" content="了解我们的专业团队、公司使命和价值观。我们致力于为客户提供优质的服务，拥有10年行业经验。" />
      <meta name="twitter:image" content="https://yourbrand.com/images/og-about.jpg" />
      <meta name="twitter:creator" content="@yourbrand" />

      {/* Canonical */}
      <link rel="canonical" href="https://yourbrand.com/about" />
    </Head>
  )
}
\`\`\`

## 优化说明

✅ Title 长度：26 字符（建议：20-30）✓
✅ Description 长度：78 字符（建议：70-80）✓
✅ 包含主要关键词：关于我们✓
✅ 包含行动号召：立即联系我们✓
✅ 包含品牌名称：YourBrand✓

## 下一步

1. 更新文件中的元数据
2. 创建或更新 OG 图片（1200x630px）
3. 在社交媒体上测试预览效果
4. 使用 /seo-check 验证

需要我调整任何内容吗？
```

### 示例 2：为博客文章生成元数据

```bash
/metadata app/blog/nextjs-seo-guide/page.tsx
```

输出：
```markdown
# 为博客文章生成的元数据

## 基本信息
- 页面类型：博客文章
- 文章标题：Next.js SEO 完全指南
- 检测语言：中文
- 目标关键词：Next.js SEO、搜索引擎优化

## 推荐元数据

\`\`\`typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js SEO 完全指南：从入门到精通 | YourBrand',
  description: '深入了解如何在 Next.js 项目中实现 SEO 优化。涵盖元数据、结构化数据、性能优化和最佳实践。提升网站排名，吸引更多流量！',
  keywords: ['Next.js SEO', '搜索引擎优化', 'React SEO', 'SSR SEO', 'SSG SEO'],
  authors: [{ name: '张三', url: 'https://yourbrand.com/author/zhangsan' }],
  creator: '张三',

  article: {
    publishedTime: '2024-01-15T00:00:00Z',
    modifiedTime: '2024-01-15T00:00:00Z',
    expirationTime: '2025-01-15T00:00:00Z',
    authors: ['张三'],
    tags: ['Next.js', 'SEO', 'Web开发'],
  },

  openGraph: {
    type: 'article',
    url: 'https://yourbrand.com/blog/nextjs-seo-guide',
    title: 'Next.js SEO 完全指南：从入门到精通',
    description: '深入了解如何在 Next.js 项目中实现 SEO 优化。涵盖元数据、结构化数据、性能优化和最佳实践。',
    siteName: 'YourBrand Blog',
    images: [
      {
        url: 'https://yourbrand.com/images/blog/nextjs-seo.jpg',
        width: 1200,
        height: 630,
        alt: 'Next.js SEO 完全指南封面图',
      },
    ],
    publishedTime: '2024-01-15T00:00:00Z',
    authors: ['张三'],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Next.js SEO 完全指南：从入门到精通',
    description: '深入了解如何在 Next.js 项目中实现 SEO 优化。涵盖元数据、结构化数据、性能优化和最佳实践。',
    images: ['https://yourbrand.com/images/blog/nextjs-seo.jpg'],
  },

  alternates: {
    canonical: 'https://yourbrand.com/blog/nextjs-seo-guide',
  },
}
\`\`\`

## JSON-LD 结构化数据建议

建议同时添加 Article Schema：

\`\`\`typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Next.js SEO 完全指南：从入门到精通',
  description: '深入了解如何在 Next.js 项目中实现 SEO 优化...',
  image: 'https://yourbrand.com/images/blog/nextjs-seo.jpg',
  datePublished: '2024-01-15',
  dateModified: '2024-01-15',
  author: {
    '@type': 'Person',
    name: '张三',
    url: 'https://yourbrand.com/author/zhangsan',
  },
  publisher: {
    '@type': 'Organization',
    name: 'YourBrand',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yourbrand.com/logo.png',
    },
  },
}
\`\`\`

[完整输出...]
```

### 示例 3：为英文页面生成元数据

```bash
/metadata pages/products.tsx --language en
```

输出：
```markdown
# Metadata for English Page

[English metadata with proper formatting...]
```

## 自定义选项

### 指定关键词

```bash
/metadata about --keywords "团队介绍,公司文化,公司历史"
```

### 指定品牌名称

```bash
/metadata about --brand "YourBrand"
```

### 指定作者

```bash
/metadata blog/post --author "张三" --author-url "https://yourbrand.com/author/zhangsan"
```

### 指定图片

```bash
/metadata about --og-image "https://yourbrand.com/images/og-about.jpg"
```

## 元数据最佳实践

### Title 最佳实践

**中文：**
- 长度：20-30 字符
- 格式：`主关键词 | 次要关键词 | 品牌名称`
- 示例：`管道工服务 | 24小时紧急维修 | SF Plumbing`

**英文：**
- 长度：50-60 字符
- 格式：`Primary Keyword - Secondary Keyword | Brand Name`
- 示例：`Plumbing Services | 24/7 Emergency Repair | SF Plumbing`

### Description 最佳实践

**中文：**
- 长度：70-80 字符
- 包含：关键词 + 独特价值 + 行动号召
- 示例：`提供专业的管道维修服务。24小时紧急服务，覆盖旧金山湾区。立即致电 (415) 555-0123。`

**英文：**
- 长度：150-160 字符
- 包含：Keyword + Unique Value + Call to Action
- 示例：`Professional plumbing services in San Francisco. 24/7 emergency service, covering the Bay Area. Call (415) 555-0123 now.`

### OG 图片最佳实践

- 推荐尺寸：1200x630 像素
- 格式：JPG 或 PNG
- 文件大小：< 500KB
- 内容：品牌名称 + 标题 + 视觉元素

## 语言特定建议

### 中文 SEO

```markdown
- Title: 20-30 字符
- Description: 70-80 字符
- 关键词密度: 2-4%
- 搜索引擎: 百度、搜狗、Google
- 编码: UTF-8
```

### 英文 SEO

```markdown
- Title: 50-60 characters
- Description: 150-160 characters
- Keyword density: 1-2%
- Search engines: Google, Bing
- Encoding: UTF-8
```

## 验证工具

生成元数据后，使用以下工具验证：

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - 验证结构化数据和预览

2. **Facebook Sharing Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - 验证 OG 标签和预览

3. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - 验证 Twitter Cards

4. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - 验证 JSON-LD 结构

## 输出格式

可以选择不同的输出格式：

### Markdown 格式（默认）
```bash
/metadata about --format markdown
```

### 代码格式（直接可用的代码）
```bash
/metadata about --format code
```

### JSON 格式（机器可读）
```bash
/metadata about --format json
```

## 集成到项目中

### App Router
直接复制 `metadata` 对象到页面文件

### Pages Router
复制 `<Head>` 内容到页面组件

### 其他框架
使用 HTML 格式，复制到 `<head>` 标签

## 相关命令

- `/structured-data` - 生成 JSON-LD 结构化数据
- `/seo-check` - 检查现有元数据
- `/seo-audit` - 全面 SEO 审计
- `Agent: seo-analyzer` - 深度分析

## 注意事项

- 确保元数据准确反映页面内容
- 定期更新元数据以保持时效性
- 使用真实的品牌和作者信息
- 创建高质量的 OG 图片
- 测试所有社交媒体预览效果
