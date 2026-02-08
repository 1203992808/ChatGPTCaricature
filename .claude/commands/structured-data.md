---
description: 生成页面的 JSON-LD 结构化数据
argument-hint: [page-path] [schema-type]
---

为指定页面生成合适的 JSON-LD 结构化数据。支持多种 Schema.org 类型，自动检测页面内容，提供 Next.js App Router 和 Pages Router 的实现代码。

## 功能

- ✅ 自动检测页面类型和内容
- ✅ 生成优化的 JSON-LD 结构化数据
- ✅ 支持 Next.js App Router 和 Pages Router
- ✅ 提供验证工具链接
- ✅ 包含必需和推荐字段
- ✅ 支持多种 Schema.org 类型

## 参数

- `$1` 或 `$ARGUMENTS`: 页面路径（必需）
  - 文件路径或路由路径
  - 示例：`app/blog/post-1/page.tsx`、`/blog/post-1`、`blog/post-1`

- `$2`: Schema.org 类型（可选）
  - 如果不提供，自动检测
  - 支持类型：Article, BlogPosting, NewsArticle, Product, Organization, LocalBusiness, WebPage, FAQPage, Review, Event, Person

## 支持的 Schema 类型

### 内容类型

**Article / BlogPosting**
- 博客文章和新闻
- 包含：headline, image, datePublished, author, publisher

**NewsArticle**
- 新闻文章
- 额外字段：dateModified, headline, articleSection

**TechArticle**
- 技术教程
- 额外字段：dependencies, proficiencyLevel

### 商业类型

**Product**
- 产品页面
- 包含：name, image, description, offers (price, availability)

**Organization**
- 组织/公司
- 包含：name, url, logo, address, contactPoint

**LocalBusiness**
- 本地商家
- 包含：address, telephone, openingHours, priceRange

### 页面类型

**WebPage**
- 普通网页
- 包含：name, description, url

**FAQPage**
- FAQ 页面
- 包含：Question 和 Answer 列表

### 互动类型

**Review**
- 评论
- 包含：itemReviewed, reviewRating, author

**AggregateRating**
- 聚合评分
- 包含：ratingValue, reviewCount, bestRating

## 使用示例

### 示例 1：博客文章（自动检测）

```bash
/structured-data app/blog/nextjs-seo-guide/page.tsx
```

输出：
```markdown
# 结构化数据生成报告

## 页面分析
- 页面类型：博客文章
- 检测语言：中文
- 推荐类型：BlogPosting
- 标题：Next.js SEO 完全指南
- 作者：检测到或需要提供

## 生成的 JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Next.js SEO 完全指南：从入门到精通",
  "image": [
    "https://yourdomain.com/images/blog/nextjs-seo-cover.jpg"
  ],
  "datePublished": "2024-01-15T08:00:00+08:00",
  "dateModified": "2024-01-15T08:00:00+08:00",
  "author": {
    "@type": "Person",
    "name": "张三"
  },
  "publisher": {
    "@type": "Organization",
    "name": "YourBrand",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yourdomain.com/logo.png"
    }
  },
  "description": "深入了解如何在 Next.js 项目中实现 SEO 优化。涵盖元数据、结构化数据、性能优化和最佳实践。",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://yourdomain.com/blog/nextjs-seo-guide"
  }
}
```

## Next.js App Router 实现

将以下代码添加到 `app/blog/nextjs-seo-guide/page.tsx`：

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  'headline': 'Next.js SEO 完全指南：从入门到精通',
  'image': [
    'https://yourdomain.com/images/blog/nextjs-seo-cover.jpg'
  ],
  'datePublished': '2024-01-15T08:00:00+08:00',
  'dateModified': '2024-01-15T08:00:00+08:00',
  'author': {
    '@type': 'Person',
    'name': '张三'
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'YourBrand',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://yourdomain.com/logo.png'
    }
  },
  'description': '深入了解如何在 Next.js 项目中实现 SEO 优化。涵盖元数据、结构化数据、性能优化和最佳实践。',
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': 'https://yourdomain.com/blog/nextjs-seo-guide'
  }
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 页面内容 */}
    </>
  )
}
```

## Next.js Pages Router 实现

将以下代码添加到 `pages/blog/nextjs-seo-guide.tsx`：

```typescript
import Head from 'next/head'

export default function BlogPost() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': 'Next.js SEO 完全指南：从入门到精通',
    'image': [
      'https://yourdomain.com/images/blog/nextjs-seo-cover.jpg'
    ],
    'datePublished': '2024-01-15T08:00:00+08:00',
    'dateModified': '2024-01-15T08:00:00+08:00',
    'author': {
      '@type': 'Person',
      'name': '张三'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'YourBrand',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://yourdomain.com/logo.png'
      }
    },
    'description': '深入了解如何在 Next.js 项目中实现 SEO 优化。'
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      {/* 页面内容 */}
    </>
  )
}
```

## 验证工具

使用以下工具验证你的结构化数据：

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - 粘贴你的 URL 或代码

2. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - 粘贴 JSON-LD 代码

3. **Google Search Console**
   - 检查"增强"部分的结构化数据报告

## 优化建议

✅ 已包含必需字段
✅ 图片 URL 完整
✅ 日期格式正确（ISO 8601）
✅ 作者信息完整
⚠️ 建议添加的字段：
   - keywords（文章关键词）
   - articleSection（文章分类）
   - wordCount（字数）

需要我添加这些额外字段吗？
```

### 示例 2：产品页面

```bash
/structured-data products/plumbing-services Product
```

输出：
```markdown
# Product 结构化数据

## JSON-LD 代码

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "紧急管道维修服务",
  "image": [
    "https://yourdomain.com/images/products/plumbing-service.jpg"
  ],
  "description": "24小时紧急管道维修服务，专业团队快速响应，覆盖旧金山湾区。",
  "brand": {
    "@type": "Brand",
    "name": "SF Plumbing Services"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://yourdomain.com/products/plumbing-services",
    "priceCurrency": "USD",
    "price": "150.00",
    "priceValidUntil": "2024-12-31",
    "availability": "https://schema.org/InStock",
    "itemCondition": "https://schema.org/NewCondition"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "125"
  }
}
```

## Next.js 实现

[代码示例...]

## 优化建议

✅ Product 必需字段完整
✅ 价格信息清晰
✅ 评分数据增强可信度
⚠️ 考虑添加：
   - reviews（详细评论列表）
   - sku（产品 SKU）
   - mpn（制造商零件号）
```

### 示例 3：FAQ 页面

```bash
/structured-data faq FAQPage
```

输出：
```markdown
# FAQPage 结构化数据

## JSON-LD 代码

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "什么是紧急管道维修？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "紧急管道维修是指在管道系统出现突发问题时，如水管爆裂、严重堵塞等，需要立即处理的维修服务。这类问题通常会导致水淹、财产损失等严重后果，因此需要专业团队在最短时间内到达现场进行修复。"
      }
    },
    {
      "@type": "Question",
      "name": "紧急管道维修服务的费用是多少？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "紧急管道维修的费用取决于多个因素：问题类型、严重程度、所需材料和维修时间。一般来说，基础服务费在 $100-$200 之间，加上材料和工时费。建议在服务前要求详细报价，避免意外费用。"
      }
    },
    {
      "@type": "Question",
      "name": "如何选择可靠的紧急管道维修服务？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "选择紧急管道维修服务时，应考虑以下因素：1）24/7 服务 availability；2）持证和 insured；3）良好的评价和口碑；4）透明的定价；5）快速响应时间。建议提前研究并保存 2-3 个可靠服务的联系方式。"
      }
    }
  ]
}
```

## SEO 优势

FAQPage 结构化数据可以帮助你的内容在 Google 搜索结果中显示为 FAQ rich snippets，增加点击率。

## 最佳实践

- 保持问题简洁明确
- 答案应详细但不过长（150-300 字）
- 每个页面最多 5-10 个 FAQ
- 问题和答案应真实反映用户需求
```

### 示例 4：本地商家

```bash
/structured-data LocalBusiness
```

输出：
```markdown
# LocalBusiness 结构化数据

## JSON-LD 代码

```json
{
  "@context": "https://schema.org",
  "@type": "PlumbingService",
  "name": "SF Plumbing Services",
  "image": "https://yourdomain.com/images/business.jpg",
  "@id": "https://yourdomain.com",
  "url": "https://yourdomain.com",
  "telephone": "+1-415-555-0123",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street, Suite 100",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94102",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.774929,
    "longitude": -122.419418
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "14:00"
    }
  ],
  "priceRange": "$$",
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": 37.774929,
      "longitude": -122.419418
    },
    "geoRadius": "25000"
  }
}
```

## 本地 SEO 优势

LocalBusiness 结构化数据可以帮助：
- 在 Google Maps 中显示
- 在本地搜索结果中显示 rich snippets
- 显示营业时间、地址、电话等信息

## 注意事项

- 确保名称、地址、电话（NAP）与 Google Business Profile 完全一致
- 定期更新营业时间（包括节假日）
- 添加高质量照片
```

## 高级用法

### 多 Schema 组合

一个页面可以有多个 Schema 类型：

```typescript
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      'headline': '文章标题'
    },
    {
      '@type': 'Organization',
      'name': '公司名称'
    },
    {
      '@type': 'BreadcrumbList',
      'itemListElement': [...]
    }
  ]
}
```

### 动态生成

从 CMS 或 API 数据动态生成：

```typescript
async function getJsonLd(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'datePublished': post.publishedAt,
    'author': {
      '@type': 'Person',
      'name': post.author.name
    },
    'image': post.featuredImage.url
  }
}
```

### 条件 Schema

根据内容类型选择不同的 Schema：

```typescript
const getSchemaType = (type) => {
  switch(type) {
    case 'blog':
      return 'BlogPosting'
    case 'product':
      return 'Product'
    case 'faq':
      return 'FAQPage'
    default:
      return 'WebPage'
  }
}
```

## 验证清单

### 必需字段检查

**Article/BlogPosting:**
- [ ] @context: "https://schema.org"
- [ ] @type: "BlogPosting" 或 "Article"
- [ ] headline（标题）
- [ ] image（至少 1 张图片，1200x630px 推荐）
- [ ] datePublished（发布日期）
- [ ] author（作者，Person 或 Organization）
- [ ] publisher（发布者，Organization）

**Product:**
- [ ] @type: "Product"
- [ ] name（产品名称）
- [ ] image（产品图片）
- [ ] offers（Offer 对象，包含价格）

**Organization:**
- [ ] @type: "Organization"
- [ ] name（组织名称）
- [ ] url（网站 URL）

**FAQPage:**
- [ ] @type: "FAQPage"
- [ ] mainEntity（Question 和 Answer 数组）

### 数据质量检查

- [ ] 所有 URL 完整且可访问
- [ ] 图片尺寸符合建议（1200x630px）
- [ ] 日期格式正确（ISO 8601）
- [ ] 价格数字准确
- [ ] 作者信息完整

### SEO 最佳实践

- [ ] image URL 使用绝对路径
- [ ] description 包含关键词
- [ ] headline 有吸引力且包含关键词
- [ ] url 指向规范页面（canonical URL）

## 常见错误和修复

### 错误 1：缺少必需字段

```
错误：Missing required field
修复：添加所有必需字段
```

### 错误 2：图片 URL 无效

```
错误: Image not accessible
修复：使用完整的绝对 URL，确保图片可访问
```

### 错误 3：日期格式错误

```
错误：Invalid date format
修复：使用 ISO 8601 格式（如 2024-01-15T08:00:00+08:00）
```

### 错误 4：作者信息不完整

```
错误：Incomplete author information
修复：确保 author 包含 @type 和 name
```

## 相关命令

- `/metadata` - 生成页面元数据
- `/seo-check` - 快速 SEO 检查
- `/seo-audit` - 全面 SEO 审计
- Skill: structured-data - 自动结构化数据分析和优化

## 注意事项

- 结构化数据必须准确反映页面内容
- 不要提供误导性信息
- 定期验证和更新结构化数据
- 使用官方测试工具验证
- 遵循 Google 结构化数据指南
- 某些 Schema 类型可能需要额外的验证才能显示 Rich Snippets
