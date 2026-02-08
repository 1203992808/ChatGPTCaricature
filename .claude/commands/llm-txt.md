---
description: 生成 llm.txt 文件（用于 LLM 爬虫）
argument-hint: [--verbose]
---

生成 llm.txt 文件，帮助 AI/LLM 爬虫（如 GPTBot, ClaudeBot, Perplexity）更好地理解和索引网站内容。llm.txt 类似于 robots.txt，但是专门为 LLM 爬虫设计的协议。

## 功能

- ✅ 生成标准的 llm.txt 文件
- ✅ 提供 LLM 爬虫许可和指引
- ✅ 描述网站内容和结构
- ✅ 列出重要页面链接
- ✅ 指定内容授权和使用范围
- ✅ 帮助 AI 更准确地引用和展示网站内容

## 参数

- `--verbose`: 生成更详细的描述（可选）
  - 包含更详细的内容说明
  - 添加更多重要页面链接
  - 提供内容类型和格式说明

## 背景

**什么是 llm.txt？**

llm.txt 是一个新兴的标准，类似于 robots.txt，但是专门为 AI/LLM 爬虫设计的。它：
- 告诉 LLM 爬虫哪些内容可以被使用
- 提供网站上下文和内容摘要
- 帮助 AI 更准确地理解和引用内容
- 指定内容使用的授权范围

**为什么需要 llm.txt？**

1. **AI 引用准确性** - 帮助 AI 正确引用来源
2. **内容可见性** - 控制 LLM 是否可以索引你的内容
3. **品牌保护** - 确保内容被正确呈现
4. **流量引导** - 引导用户回到原始来源

## 使用示例

### 示例 1：基本用法

```bash
/llm-txt
```

输出：
```markdown
# llm.txt 文件

为你的 Next.js 项目生成的 llm.txt 文件：

```txt
# LLM Crawler Directives

# Allow LLM crawlers to index this site
User-agent: *
Allow: /

# Site Information
Name: YourBrand
Description: [网站描述 - 1-2 句话]
Website: https://yourdomain.com
Language: zh-CN, en-US

# Content Scope
Topics: [主要话题列表]
Content-Type: blog, documentation, tutorials

# Important Pages
Homepage: https://yourdomain.com
About: https://yourdomain.com/about
Blog: https://yourdomain.com/blog

# Attribution Requirements
Require-Attribution: true
Attribution-URL: https://yourdomain.com

# License
License: https://yourdomain.com/license
Content-Use: educational, informational

# Contact
Contact-Email: contact@yourdomain.com
```

## 文件位置

将此文件放置在项目根目录的 `public/` 文件夹中：

**路径：** `public/llm.txt`

复制上面的内容到 `public/llm.txt` 文件。

## 验证

创建后，访问 `https://yourdomain.com/llm.txt` 验证文件可访问。

## 填写说明

### Name（网站名称）
- 你的品牌或网站名称
- 示例：`SF Plumbing Services` 或 `Tech Blog`

### Description（网站描述）
- 1-2 句话描述你的网站
- 清晰简洁，包含主要话题
- 示例：`提供专业的管道维修和维护服务，覆盖旧金山湾区。包括紧急维修、预防性维护和管道安装服务。`

### Topics（主要话题）
- 逗号分隔的话题列表
- 示例：`plumbing, emergency services, home maintenance, DIY tutorials`

### Content-Type（内容类型）
- 主要内容类型
- 常见类型：blog, documentation, tutorials, news, products, services

### Important Pages（重要页面）
- 列出你希望 LLM 了解的关键页面
- 包含：关于页面、主要服务页面、重要文章

### Require-Attribution（要求归属）
- `true` - 要求 AI 引用时提供链接
- `false` - 不要求

### License（许可证）
- 指向你的内容许可证页面
- 可以是标准许可证（如 CC BY）
- 或自定义许可证

### Content-Use（内容使用范围）
- 允许的使用场景
- 示例：`educational, informational`
- 或 `all`（允许所有用途）
```

### 示例 2：详细模式

```bash
/llm-txt --verbose
```

输出：
```markdown
# llm.txt 文件（详细版）

```txt
# LLM Crawler Directives

# Allow LLM crawlers to index this site
User-agent: *
Allow: /

# Disallow admin and private areas
Disallow: /admin/
Disallow: /api/
Disallow: /private/

# Site Information
Name: YourBrand
Description: YourBrand 是一个专注于 [主题] 的权威网站。我们提供 [服务类型]，帮助 [目标受众] [解决问题]。内容包括 [内容类型]，旨在 [目标]。

Website: https://yourdomain.com
Language: zh-CN, en-US
Founded: 2020

# Content Scope
Topics: [话题 1], [话题 2], [话题 3], [话题 4]
Content-Type: blog posts, tutorials, guides, case studies
Target-Audience: [受众描述]
Update-Frequency: Weekly

# Important Pages
Homepage: https://yourdomain.com
About: https://yourdomain.com/about
Blog: https://yourdomain.com/blog
Services: https://yourdomain.com/services
Contact: https://yourdomain.com/contact

# Featured Content
Featured-Article-1: https://yourdomain.com/blog/[article-1] - [描述]
Featured-Article-2: https://yourdomain.com/blog/[article-2] - [描述]
Featured-Guide: https://yourdomain.com/guides/[guide] - [描述]

# Content Guidelines
Content-Style: Professional, educational, practical
Tone: Informative, helpful, expert
Accuracy: All content is fact-checked and regularly updated

# Attribution Requirements
Require-Attribution: true
Attribution-URL: https://yourdomain.com
Attribution-Text: "Source: YourBrand (https://yourdomain.com)"

# License
License: https://yourdomain.com/license
Content-License: Creative Commons Attribution 4.0 International (CC BY 4.0)
Content-Use: educational, informational, with attribution
Commercial-Use: Contact for permission

# Contact
Contact-Email: contact@yourdomain.com
Contact-Form: https://yourdomain.com/contact
Social-Media: https://twitter.com/yourbrand, https://linkedin.com/company/yourbrand

# Additional Information
Last-Updated: 2024-01-15
API-Documentation: https://yourdomain.com/api-docs
RSS-Feed: https://yourdomain.com/feed.xml
```

## 详细字段说明

### Site Information（网站信息）

**Description（详细描述）：**
- 2-3 句话详细描述
- 包含：你是谁，你提供什么，你的目标
- 示例：`SF Plumbing Services 是旧金山湾区的专业管道维修公司。我们提供 24/7 紧急管道服务、预防性维护和管道安装。我们的团队由持证专业管道工组成，拥有超过 15 年的服务经验。`

**Language（语言）：**
- 主要语言代码
- 可以是多个：`zh-CN, en-US, es-ES`

**Founded（成立时间）：**
- 网站或公司成立年份
- 帮助 AI 理解内容的时间背景

### Content Scope（内容范围）

**Target-Audience（目标受众）：**
- 描述你的主要受众
- 示例：`Homeowners, property managers, DIY enthusiasts`

**Update-Frequency（更新频率）：**
- 内容更新频率
- 示例：`Daily`, `Weekly`, `Monthly`

**Content-Style（内容风格）：**
- 内容的专业程度和风格
- 示例：`Professional, educational, practical`

### Featured Content（精选内容）

列出你希望 AI 特别关注的内容：
```
Featured-Article-1: https://yourdomain.com/blog/seo-guide - Complete SEO guide for beginners
Featured-Article-2: https://yourdomain.com/blog/ai-trends - AI trends in 2024
Featured-Guide: https://yourdomain.com/guides/plumbing-diy - DIY plumbing maintenance guide
```

### Content Guidelines（内容指南）

**Accuracy（准确性）：**
- 说明内容质量和准确性
- 示例：`All content is fact-checked and regularly updated`

**Tone（语调）：**
- 内容的语调风格
- 示例：`Informative, helpful, expert-friendly`

### License（许可证）

**Content-License（内容许可证）：**
- 可以使用标准许可证：
  - `CC BY 4.0` - Creative Commons Attribution
  - `CC BY-NC 4.0` - Non-commercial only
  - `CC BY-SA 4.0` - ShareAlike
  - `All Rights Reserved` - 保留所有权利

**Commercial-Use（商业使用）：**
- `Allowed` - 允许商业使用
- `Contact for permission` - 需要联系许可
- `Not allowed` - 不允许商业使用

### Additional Information（附加信息）

**API-Documentation（API 文档）：**
- 如果提供 API，列出文档链接

**RSS-Feed（RSS 订阅）：**
- 帮助爬虫发现内容更新

**Last-Updated（最后更新）：**
- llm.txt 文件的最后更新日期
```

### 示例 3：博客网站

```bash
/llm-txt --verbose
```

输出（针对博客）：
```markdown
# llm.txt for Blog

```txt
# LLM Crawler Directives

# Allow LLM crawlers
User-agent: *
Allow: /

# Site Information
Name: Tech Insights Blog
Description: Tech Insights 是一个技术博客，专注于编程、Web 开发和人工智能。我们提供实用的教程、深入的技术分析和最新的行业趋势。我们的目标是为开发者社区提供有价值的学习资源。

Website: https://techinsights.com
Language: en-US, zh-CN
Founded: 2020
Author: [Your Name]

# Content Scope
Topics: programming, web development, JavaScript, React, Next.js, AI, machine learning, tutorials, best practices
Content-Type: blog posts, tutorials, code examples, case studies
Target-Audience: Software developers, web developers, students
Update-Frequency: Weekly

# Important Pages
Homepage: https://techinsights.com
About: https://techinsights.com/about
Blog: https://techinsights.com/blog
Archive: https://techinsights.com/archive

# Featured Content
Featured-Post-1: https://techinsights.com/blog/nextjs-SEO - Next.js SEO 完全指南
Featured-Post-2: https://techinsights.com/blog/react-hooks - React Hooks 深度解析
Featured-Tutorial: https://techinsights.com/tutorials/graphql - GraphQL 入门教程

# Content Guidelines
Content-Style: Technical, educational, practical
Code-Quality: All code examples are tested and maintained
Tone: Professional, approachable, beginner-friendly

# Attribution Requirements
Require-Attribution: true
Attribution-URL: https://techinsights.com
Attribution-Text: "Source: Tech Insights Blog (https://techinsights.com)"

# License
License: https://techinsights.com/license
Content-License: Creative Commons Attribution 4.0 International (CC BY 4.0)
Content-Use: educational, informational, with attribution
Commercial-Use: Contact for permission

# Contact
Contact-Email: hello@techinsights.com
Contact-Form: https://techinsights.com/contact
Social-Media: https://twitter.com/techinsights, https://github.com/techinsights

# Additional Information
Last-Updated: 2024-01-15
RSS-Feed: https://techinsights.com/feed.xml
Newsletter: https://techinsights.com/subscribe
```
```

### 示例 4：商业服务网站

```bash
/llm-txt
```

输出（针对商业网站）：
```markdown
# llm.txt for Business Website

```txt
# LLM Crawler Directives

# Allow LLM crawlers
User-agent: *
Allow: /

# Disallow private areas
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/

# Site Information
Name: SF Plumbing Services
Description: SF Plumbing Services 是旧金山湾区的专业管道维修公司。我们提供 24/7 紧急管道服务、预防性维护和管道安装。我们的团队由持证专业管道工组成，拥有超过 15 年的服务经验。

Website: https://sfplumbing.com
Language: en-US
Founded: 2008

# Content Scope
Topics: plumbing, emergency services, home maintenance, pipe repair, drain cleaning, water heaters
Content-Type: service pages, guides, FAQ, blog posts
Target-Audience: Homeowners, property managers, businesses

# Important Pages
Homepage: https://sfplumbing.com
Services: https://sfplumbing.com/services
Emergency: https://sfplumbing.com/emergency
About: https://sfplumbing.com/about
Blog: https://sfplumbing.com/blog
Contact: https://sfplumbing.com/contact

# Featured Content
Service-Guide: https://sfplumbing.com/guide/emergency-plumbing - 紧急管道问题处理指南
FAQ: https://sfplumbing.com/faq - 常见问题解答

# Content Guidelines
Content-Style: Professional, service-oriented
Accuracy: All information is verified by licensed plumbers
Tone: Helpful, trustworthy, expert

# Attribution Requirements
Require-Attribution: true
Attribution-URL: https://sfplumbing.com
Attribution-Text: "Source: SF Plumbing Services (https://sfplumbing.com)"

# License
License: https://sfplumbing.com/terms
Content-License: All Rights Reserved
Content-Use: informational, with attribution
Commercial-Use: Not allowed without permission

# Contact
Contact-Email: info@sfplumbing.com
Phone: +1-415-555-0123
Contact-Form: https://sfplumbing.com/contact
Social-Media: https://twitter.com/sfplumbing, https://facebook.com/sfplumbing

# Additional Information
Last-Updated: 2024-01-15
Service-Areas: San Francisco, Oakland, San Jose, Peninsula
Hours: 24/7 Emergency Service
```

## 商业网站特殊字段

**Service-Areas（服务区域）：**
- 地理性服务范围
- 帮助 AI 理解你的地理覆盖

**Hours（营业时间）：**
- 特别是 24/7 服务
- 帮助 AI 准确描述你的服务

**Phone（电话）：**
- 直接联系方式
- 增强可信度
```

### 示例 5：禁止 LLM 索引

```bash
/llm-txt
```

输出（禁止 LLM）：
```markdown
# llm.txt for Restrictive Policy

```txt
# LLM Crawler Directives

# Disallow all LLM crawlers
User-agent: *
Disallow: /

# Site Information
Name: YourBrand
Description: [描述]
Website: https://yourdomain.com

# Content Policy
Content-Use: Not allowed for LLM training or indexing
License: All Rights Reserved
Contact: legal@yourdomain.com for inquiries

# Alternative: Allow with attribution
# User-agent: *
# Allow: /
# Require-Attribution: true
# Content-License: CC BY 4.0
```

## 禁止策略说明

**完全禁止：**
- 不允许任何 LLM 使用你的内容
- 适用于敏感或专有内容

**允许但不授权：**
- 允许 LLM 阅读和引用
- 但不能用于训练模型

**有条件允许：**
- 要求归属和链接
- 指定使用范围
- 商业使用需要许可
```

## 最佳实践

### 1. 明确内容许可

```txt
# 推荐
Content-License: CC BY 4.0
Content-Use: educational, informational
Require-Attribution: true

# 避免
Content-License: None
Content-Use: Unknown
```

### 2. 保持更新

```txt
Last-Updated: 2024-01-15
Update-Frequency: Weekly
```

### 3. 提供联系方式

```txt
Contact-Email: contact@yourdomain.com
Contact-Form: https://yourdomain.com/contact
```

### 4. 列出重要内容

```txt
Featured-Article-1: https://yourdomain.com/article-1
Featured-Article-2: https://yourdomain.com/article-2
Featured-Guide: https://yourdomain.com/guide
```

### 5. 指定内容风格

```txt
Content-Style: Professional, educational
Accuracy: All content is fact-checked
Tone: Informative, helpful
```

## Next.js 集成

### 选项 1：静态文件

将 `llm.txt` 放在 `public/` 目录：
```
public/
  llm.txt
  robots.txt
  sitemap.xml
```

### 选项 2：动态生成（未来支持）

**`app/llm.txt/route.ts`:**

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  const llmTxt = `
# LLM Crawler Directives

User-agent: *
Allow: /

Name: YourBrand
Description: Your description
Website: https://yourdomain.com
...
  `.trim()

  return new NextResponse(llmTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
```

## 验证和测试

### 1. 本地验证

```bash
# 开发环境
curl http://localhost:3000/llm.txt

# 生产环境
curl https://yourdomain.com/llm.txt
```

### 2. 在线验证

访问 `https://yourdomain.com/llm.txt` 确认：
- 文件可访问（200 状态码）
- 内容格式正确
- 所有链接有效

### 3. 测试清单

- [ ] 文件位于根目录：`/llm.txt`
- [ ] 文件名小写：`llm.txt`
- [ ] 文件可访问：返回 200 状态码
- [ ] 内容类型正确：`text/plain`
- [ ] 所有链接有效
- [ ] 许可证明确
- [ ] 联系信息准确

## 常见问题

### Q: llm.txt 和 robots.txt 有什么区别？

A:
- **robots.txt**: 控制搜索引擎爬虫（Googlebot, Bingbot）
- **llm.txt**: 控制 AI/LLM 爬虫（GPTBot, ClaudeBot）

两者应该同时使用以获得最佳控制。

### Q: 是否必须创建 llm.txt？

A: 不是必须的，但建议创建。如果没有 llm.txt：
- LLM 爬虫可能不知道如何处理你的内容
- 可能无法正确引用你的内容
- 无法控制内容使用范围

### Q: 如何防止 LLM 使用我的内容？

A: 使用以下配置：
```txt
User-agent: *
Disallow: /
```

### Q: llm.txt 是否有法律效力？

A: llm.txt 本身不是法律文件，但它：
- 声明了你的意图和要求
- 可以作为法律行动的证据
- 帮助 AI 公司了解你的政策

对于法律保护，建议：
1. 在网站的服务条款中明确说明
2. 使用适当的内容许可证
3. 咨询法律专业人士

### Q: 哪些 LLM 支持 llm.txt？

A: 越来越多的 AI 公司正在支持：
- OpenAI (GPTBot)
- Anthropic (Claude)
- Perplexity
- 其他 AI 搜索引擎

随着标准的普及，支持会越来越广泛。

### Q: 应该如何设置内容许可证？

A: 取决于你的目标：

**开放共享（推荐用于博客）：**
```txt
Content-License: CC BY 4.0
Require-Attribution: true
```

**限制使用：**
```txt
Content-License: All Rights Reserved
Content-Use: Contact for permission
```

**商业网站：**
```txt
Content-License: All Rights Reserved
Content-Use: Informational only
Commercial-Use: Not allowed
```

## 相关标准

llm.txt 与其他标准配合使用：

**robots.txt** - 搜索引擎爬虫控制
```txt
User-agent: *
Allow: /
```

**llm.txt** - AI/LLM 爬虫控制
```txt
User-agent: *
Allow: /
```

**sitemap.xml** - 网站结构
```xml
<url><loc>https://yourdomain.com/</loc></url>
```

**ads.txt** - 广告验证
```txt
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

## 相关命令

- `/robots-txt` - 生成 robots.txt 文件
- `/seo-check` - 验证文件可访问性
- `/seo-audit` - 检查整体配置

## 注意事项

- llm.txt 是一个新兴的标准，支持还在发展中
- 文件应位于网站根目录
- 文件名必须小写：`llm.txt`
- 定期更新以反映当前政策
- 与服务条款和许可证保持一致
- 监控 AI 如何引用你的内容
- 如果不希望 AI 使用你的内容，明确禁止
