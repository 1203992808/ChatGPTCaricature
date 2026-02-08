---
description: 生成或优化 robots.txt 文件
argument-hint: [domain]
---

为 Next.js 项目生成 SEO 友好的 robots.txt 文件。包含基本的爬虫规则、Sitemap 引用和常见目录的禁止规则。

## 功能

- ✅ 生成标准的 robots.txt 文件
- ✅ 自动包含 Sitemap 引用
- ✅ 禁止敏感目录和文件
- ✅ 允许所有主要爬虫
- ✅ 支持爬虫延迟设置
- ✅ 适配 Next.js 项目结构

## 参数

- `$1` 或 `$ARGUMENTS`: 网站域名（可选）
  - 用于生成 Sitemap URL
  - 示例：`https://yourdomain.com`
  - 如果不提供，Sitemap 行会被注释或省略

## 使用示例

### 示例 1：基本用法

```bash
/robots-txt
```

输出：
```markdown
# robots.txt 文件

为你的 Next.js 项目生成的 robots.txt 文件：

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow common Next.js and private directories
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /.well-known/

# Disallow admin and private areas (if applicable)
# Disallow: /admin/
# Disallow: /private/
# Disallow: /dashboard/

# Sitemap (uncomment and update with your domain)
# Sitemap: https://yourdomain.com/sitemap.xml
```

## 文件位置

将此文件放置在项目根目录的 `public/` 文件夹中：

**路径：** `public/robots.txt`

复制上面的内容到 `public/robots.txt` 文件。

## 验证

创建后，访问 `https://yourdomain.com/robots.txt` 验证文件可访问。

## Next.js 自动生成

如果你使用 Next.js 13.3+，也可以使用 `generateRobotTxt` 函数自动生成：

**`app/robots.ts` (推荐):**

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
      },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

这会自动生成 `/robots.txt` 路由。
```

### 示例 2：指定域名

```bash
/robots-txt https://yourdomain.com
```

输出：
```markdown
# robots.txt 文件（包含 Sitemap）

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow common Next.js directories
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Disallow private areas
Disallow: /admin/
Disallow: /_next/image/
Disallow: /private/

# Crawl delay (optional)
# Crawl-delay: 1

# Sitemap
Sitemap: https://yourdomain.com/sitemap.xml
```

## 部署

将上述内容保存到 `public/robots.txt`，部署后可通过以下 URL 访问：
https://yourdomain.com/robots.txt

## 注意事项

- robots.txt 文件必须位于网站根目录
- 文件名必须小写：`robots.txt`
- 文件更新后可能需要几天才能被搜索引擎重新抓取
- 使用 Google Search Console 的 robots.txt 测试工具验证
```

### 示例 3：博客项目

```bash
/robots-txt https://blog.yourdomain.com
```

输出：
```markdown
# robots.txt for Blog

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin and management areas
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /wp-admin/
Disallow: /wp-includes/

# Disallow search and filter pages (avoid duplicate content)
Disallow: /search?
Disallow: /filter?
Disallow: /tag/*/page/
Disallow: /category/*/page/

# Allow specific feeds
Allow: /feed/
Allow: /feed/rss/

# Disallow other feeds
Disallow: */feed/
Disallow: */feed/rss/
Disallow: */feed/atom/

# Sitemap
Sitemap: https://blog.yourdomain.com/sitemap.xml
```

## 博客特定规则说明

**禁止搜索和分页页面：**
- 避免重复内容问题
- 节省爬虫预算

**允许主要 feed：**
- 允许主 feed 被抓取
- 禁止其他 feed 变体

**防止爬虫陷入无限循环：**
- 禁止带参数的搜索 URL
- 禁止深层分页
```

### 示例 4：电商项目

```bash
/robots-txt https://store.yourdomain.com
```

输出：
```markdown
# robots.txt for E-commerce Store

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin and backend
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /checkout/
Disallow: /cart/
Disallow: /my-account/
Disallow: /wishlist/

# Disallow search and filter pages
Disallow: /search?
Disallow: /catalogsearch/
Disallow: /filter?

# Disallow sorted and filtered URLs
Disallow: /*?sort=
Disallow: /*?order=
Disallow: /*?filter=
Disallow: /*?price=

# Disallow session IDs and tracking parameters
Disallow: /*?PHPSESSID=
Disallow: /*?utm_source=
Disallow: /*?utm_medium=
Disallow: /*?utm_campaign=

# Allow product images
Allow: /media/catalog/
Allow: /products/images/

# Disallow temporary files
Disallow: /tmp/
Disallow: /var/
Disallow: /cache/

# Specific crawler rules
# Block aggressive crawlers (optional)
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

# Sitemap
Sitemap: https://store.yourdomain.com/sitemap.xml
Sitemap: https://store.yourdomain.com/sitemap-product.xml
Sitemap: https://store.yourdomain.com/sitemap-category.xml
```

## 电商特定规则说明

**禁止结账流程页面：**
- /checkout/, /cart/ 等页面不需要被索引

**禁止搜索和过滤 URL：**
- 避免重复内容
- 节省爬虫预算

**允许产品图片：**
- 图片搜索流量有价值

**阻止 SEO 工具爬虫：**
- SemrushBot, AhrefsBot 等可能消耗服务器资源

**多个 Sitemap：**
- 电商网站通常有多个 sitemap（产品、分类、静态页面）
```

### 示例 5：多语言项目

```bash
/robots-txt https://yourdomain.com
```

输出：
```markdown
# robots.txt for Multi-language Site

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow common directories
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Sitemap for all languages
Sitemap: https://yourdomain.com/sitemap.xml
Sitemap: https://yourdomain.com/en/sitemap.xml
Sitemap: https://yourdomain.com/zh/sitemap.xml
Sitemap: https://yourdomain.com/es/sitemap.xml
```

## 多语言 Sitemap 策略

**选项 1：主 sitemap 引用子 sitemap**
```xml
<!-- sitemap.xml -->
<sitemapindex>
  <sitemap>
    <loc>https://yourdomain.com/en/sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://yourdomain.com/zh/sitemap.xml</loc>
  </sitemap>
</sitemapindex>
```

**选项 2：每个语言的 sitemap 单独引用**
- 在 robots.txt 中列出所有语言的 sitemap
- 确保每个语言的 sitemap URL 正确
```

## 高级配置

### Crawl Delay（爬虫延迟）

```txt
User-agent: *
Crawl-delay: 1

# 或针对特定爬虫
User-agent: Googlebot
Crawl-delay: 0

User-agent: Bingbot
Crawl-delay: 1
```

**说明：**
- 设置爬虫请求之间的延迟（秒）
- Google 通常忽略 crawl-delay
- 对小网站可能有用

### 阻止特定爬虫

```txt
# 阻止 SEO 工具爬虫
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# 阻止存档网站
User-agent: archive.org_bot
Disallow: /
```

**注意：** 只阻止消耗大量资源的爬虫，不要阻止主要搜索引擎。

### 允许特定资源

```txt
User-agent: *
Allow: /images/
Allow: /css/
Allow: /js/

Disallow: /api/
Disallow: /admin/
```

**说明：** 在禁止规则之前使用 Allow 规则。

### 针对不同爬虫的不同规则

```txt
# Googlebot
User-agent: Googlebot
Allow: /
Disallow: /private/

# Bingbot
User-agent: Bingbot
Allow: /
Disallow: /private/

# 其他所有爬虫
User-agent: *
Allow: /
Disallow: /private/
Disallow: /admin/
```

## robots.txt 语法

### 基本指令

**User-agent：**
```
User-agent: *        # 所有爬虫
User-agent: Googlebot # 特定爬虫
```

**Disallow：**
```
Disallow: /          # 禁止整个网站
Disallow: /admin/    # 禁止目录
Disallow: /file.html # 禁止文件
Disallow: /*.pdf     # 禁止所有 PDF
```

**Allow：**
```
Allow: /             # 允许整个网站
Allow: /images/      # 允许目录
```

**Sitemap：**
```
Sitemap: https://yourdomain.com/sitemap.xml
Sitemap: https://yourdomain.com/sitemap-2.xml
```

**Crawl-delay：**
```
Crawl-delay: 1       # 1 秒延迟
```

### 通配符和模式

**`*` 匹配任意字符：**
```
Disallow: /*?        # 禁止所有带参数的 URL
Disallow: /*.pdf     # 禁止所有 PDF 文件
Disallow: /private*  # 禁止以 /private 开头的所有路径
```

**`$` 结束标记：**
```
Disallow: /*.pdf$    # 禁止以 .pdf 结尾的 URL
Disallow: /print$    # 禁止以 /print 结尾的 URL
```

## 最佳实践

### 1. 保持简单

```txt
User-agent: *
Allow: /
Disallow: /admin/
```

**大多数网站只需如此简单。**

### 2. 不要依赖 robots.txt 保护敏感内容

- robots.txt 是公开的，任何人都可以查看
- 使用身份验证保护敏感内容
- robots.txt 只是建议，不是强制

### 3. 禁止重复内容

```txt
# 禁止搜索结果、过滤、排序页面
Disallow: /search?
Disallow: /filter?
Disallow: /*?sort=
Disallow: /*?order=
```

### 4. 明确允许重要资源

```txt
User-agent: *
Allow: /images/
Allow: /css/
Allow: /js/

Disallow: /api/
```

### 5. 测试和验证

使用以下工具测试：
- Google Search Console - robots.txt 测试工具
- Bing Webmaster Tools - robots.txt 测试工具
- 在线验证工具

## 常见错误

### 错误 1：禁止整个网站

```txt
# 错误
User-agent: *
Disallow: /
```

**修复：**
```txt
# 正确
User-agent: *
Allow: /
Disallow: /admin/
```

### 错误 2：错误的路径

```txt
# 错误 - 缺少尾部斜杠
Disallow: /admin

# 正确 - 目录应该有尾部斜杠
Disallow: /admin/
```

### 错误 3：阻止搜索引擎

```txt
# 错误 - 阻止主要搜索引擎
User-agent: Googlebot
Disallow: /
```

**除非有充分理由，否则不要阻止主要搜索引擎。**

### 错误 4：过度复杂的规则

```txt
# 错误 - 过于复杂
User-agent: *
Allow: /images/jpeg/
Allow: /images/png/
Disallow: /images/gif/
Disallow: /images/webp/
Disallow: /images/svg/
# ... 更多规则
```

**保持简单：**
```txt
User-agent: *
Allow: /images/
Disallow: /private/
```

## Next.js 集成

### 选项 1：静态文件（简单）

将 `robots.txt` 放在 `public/` 目录：
```
public/
  robots.txt
  sitemap.xml
```

### 选项 2：自动生成（推荐）

**`app/robots.ts` 或 `app/robots.js`:**

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://yourdomain.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
          '/admin/',
        ],
      },
      {
        userAgent: ['SemrushBot', 'AhrefsBot'],
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

**环境变量配置：**

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

**动态配置：**

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: process.env.NODE_ENV === 'production'
          ? ['/admin/', '/private/']
          : ['/'],
      },
    ],
    sitemap: 'https://yourdomain.com/sitemap.xml',
  }
}
```

## 验证和测试

### 1. 本地验证

```bash
# 开发环境
curl http://localhost:3000/robots.txt

# 生产环境
curl https://yourdomain.com/robots.txt
```

### 2. Google Search Console

1. 打开 Google Search Console
2. 选择你的网站
3. 导航到"设置" → "robots.txt 测试工具"
4. 输入你的 robots.txt 内容
5. 测试特定 URL 是否被允许或禁止

### 3. 在线验证工具

- Google robots.txt 测试工具
- Bing robots.txt 测试工具
- Screaming Frog SEO Spider

### 4. 手动检查清单

- [ ] 文件位于根目录：`/robots.txt`
- [ ] 文件名小写：`robots.txt`
- [ ] 文件可访问：返回 200 状态码
- [ ] 语法正确：没有错误
- [ ] 规则合理：不会意外阻止重要内容
- [ ] Sitemap 引用正确：URL 完整且有效

## 常见问题

### Q: robots.txt 更新后多久生效？

A: 通常需要几天到一周。搜索引擎不会立即重新抓取。

### Q: 如何隐藏敏感内容？

A: 不要使用 robots.txt。使用：
- 身份验证（登录）
- noindex meta 标签
- HTTP 身份验证
- IP 限制

### Q: 禁止目录后，该目录的图片还能被索引吗？

A: 不能。禁止目录会禁止该目录下的所有资源。

### Q: 如何阻止特定参数的 URL？

A: 使用通配符：
```
Disallow: /*?parameter=
Disallow: /*?utm_source=
```

### Q: 需要为每个爬虫单独设置规则吗？

A: 通常不需要。大多数网站对所有爬虫使用相同规则。

### Q: robots.txt 与 meta robots 标签有什么区别？

A:
- **robots.txt**: 控制整个网站或目录的爬取
- **meta robots**: 控制单个页面的索引和跟随

通常结合使用以获得最佳效果。

## 相关命令

- `/llm-txt` - 生成 llm.txt 文件
- `/seo-audit` - 检查 robots.txt 配置
- `/seo-check` - 验证 robots.txt 可访问性

## 注意事项

- robots.txt 文件必须位于网站根目录
- 文件名必须小写：`robots.txt`
- robots.txt 是公开的，任何人都可以查看
- 不使用 robots.txt 保护敏感内容
- 定期测试和验证规则
- 更新后可能需要几天才能生效
- 使用 Google Search Console 监控爬取错误
