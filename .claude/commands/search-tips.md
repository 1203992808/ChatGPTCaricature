---
description: 学习 Google 高级搜索语法和 SEO 研究技巧
argument-hint: [topic]
---

提供交互式的 Google 高级搜索语法和 SEO 研究技巧教学。帮助用户掌握搜索技巧，发现客座博客机会、分析竞争对手、进行关键词研究和内容创作研究。

## 功能

- ✅ 交互式搜索技巧教学
- ✅ Google 高级搜索操作符详解
- ✅ 客座博客搜索技巧
- ✅ 关键词研究方法
- ✅ 竞争对手分析技巧
- ✅ 内容创作研究策略
- ✅ 实战示例和练习

## 参数

- `$1` 或 `$ARGUMENTS`: 选择特定主题（可选）
  - `basic` - 基础搜索操作符
  - `guest-post` - 客座博客搜索
  - `keywords` - 关键词研究
  - `competitor` - 竞争对手分析
  - `content` - 内容创作研究
  - 如果不提供，显示所有主题

## 使用示例

### 示例 1：所有搜索技巧

```bash
/search-tips
```

输出：
```markdown
# Google 高级搜索技巧完全指南

欢迎来到 Google 高级搜索技巧指南！这些技巧将帮助你：
- 发现客座博客机会
- 分析竞争对手
- 研究关键词
- 创作更好的内容
- 进行 SEO 研究

---

## 目录

1. [基础搜索操作符](#基础搜索操作符)
2. [客座博客搜索](#客座博客搜索)
3. [关键词研究](#关键词研究)
4. [竞争对手分析](#竞争对手分析)
5. [内容创作研究](#内容创作研究)
6. [实战练习](#实战练习)

---

## 基础搜索操作符

### 1. site: - 限定网站范围

**用途：** 在特定网站或网站类型内搜索

**基本语法：**
```bash
site:example.com keyword
site:.edu keyword
site:.gov keyword
```

**实战示例：**

**在 Wikipedia 搜索：**
```bash
site:wikipedia.org "search engine optimization"
```
→ 在 Wikipedia 中查找 SEO 相关文章

**查找教育机构资源：**
```bash
site:.edu "plumbing certification"
```
→ 查找提供管道认证的教育机构

**查找政府资源：**
```bash
site:.gov "building codes" "San Francisco"
```
→ 查找旧金山的建筑规范

**排除特定网站：**
```bash
"SEO tips" -site:example.com
```
→ 搜索 SEO 技巧，但排除 example.com

### 2. inurl: - URL 中包含关键词

**用途：** 查找 URL 中包含特定词语的页面

**基本语法：**
```bash
inurl:keyword
inurl:keyword1 inurl:keyword2
```

**实战示例：**

**查找博客 URL：**
```bash
"plumbing" inurl:blog
```
→ 查找 URL 中包含 "blog" 的管道相关页面

**查找特定页面类型：**
```bash
inurl:write-for-us "plumbing"
inurl:guest-post "home maintenance"
inurl:submit-article "DIY"
```
→ 查找接受投稿的页面

**组合使用：**
```bash
inurl:blog inurl:plumbing "emergency"
```
→ URL 同时包含 blog 和 plumbing，内容包含 emergency

### 3. intitle: - 标题中包含关键词

**用途：** 查找标题中包含特定词语的页面

**基本语法：**
```bash
intitle:keyword
intitle:"phrase"
```

**实战示例：**

**查找指南类页面：**
```bash
intitle:"complete guide" "plumbing"
intitle:"how to" "unclog drain"
```
→ 标题包含"complete guide"或"how to"的页面

**组合使用：**
```bash
intitle:"write for us" intitle:blog "plumbing"
```
→ 标题同时包含"write for us"和"blog"

**排除标题中的词：**
```bash
intitle:SEO -intitle:"services"
```
→ 标题包含 SEO 但不包含 services

### 4. "" - 精确匹配

**用途：** 搜索精确的短语，不拆分词语

**基本语法：**
```bash
"exact phrase"
```

**实战示例：**

**精确短语搜索：**
```bash
"emergency plumbing services"
```
→ 搜索这个完整短语（不是 emergency 或 plumbing 或 services）

**长尾关键词：**
```bash
"how to unclog a kitchen sink"
"best plumbing services in San Francisco"
```
→ 搜索完整的长尾问题

**组合使用：**
```bash
"emergency plumbing" site:.edu
"plumbing tips" intitle:blog
```

### 5. - - 排除关键词

**用途：** 从搜索结果中排除特定词语

**基本语法：**
```bash
keyword1 -keyword2
"phrase" -excluded
```

**实战示例：**

**排除付费内容：**
```bash
"write for us" -sponsored -paid
"guest post" -"payment required"
```
→ 排除需要付费的投稿机会

**排除特定网站：**
```bash
"SEO tips" -site:pinterest.com
```
→ 排除 Pinterest 的结果

**排除多个词：**
```bash
"plumbing services" -emergency -commercial
```
→ 排除包含 emergency 或 commercial 的结果

### 6. OR / AND - 逻辑操作符

**用途：** 组合多个搜索条件

**基本语法：**
```bash
keyword1 OR keyword2
(keyword1 OR keyword2) AND keyword3
```

**实战示例：**

**同义词搜索：**
```bash
"plumbing" OR "pipe repair"
"emergency" OR "urgent" OR "24/7"
```
→ 搜索包含任一词的结果

**组合条件：**
```bash
("plumbing" OR "pipe repair") AND "emergency"
```
→ 必须包含 plumbing/pipe repair 和 emergency

**多个话题：**
```bash
("write for us" OR "guest post" OR "contributor") AND "plumbing"
```

### 7. * - 通配符

**用途：** 匹配任意词语或词语的一部分

**基本语法：**
```bash
"word * word"
"prefix*"
```

**实战示例：**

**填空搜索：**
```bash
"plumbing * guide"
```
→ 可能匹配："plumbing repair guide", "plumbing maintenance guide"

**词语变体：**
```bash
"plumb*"
```
→ 可能匹配：plumbing, plumber, plumbers

**未知词语：**
```bash`
"best * for clogged drain"
```
→ 可能匹配："best product for clogged drain", "best method for clogged drain"

### 8. .. - 数字范围

**用途：** 搜索特定数字范围

**基本语法：**
```bash
keyword $10..$50
keyword 2020..2024
```

**实战示例：**

**价格范围：**
```bash
"plumbing services" $100..$500
```
→ 搜索价格在 $100-$500 的管道服务

**年份范围：**
```bash
"SEO trends" 2020..2024
```
→ 搜索 2020-2024 年的 SEO 趋势

**数量范围：**
```bash
"top 5..10" "plumbing tips"
```
→ 搜索 "top 5" 到 "top 10" 的列表

---

## 客座博客搜索

### 搜索模式 1：基础投稿机会

```bash
"[your keyword]" "write for us"
"[your keyword]" "guest post"
"[your keyword]" "become a contributor"
"[your keyword]" "submit article"
"[your keyword]" "guest article"
"[your keyword]" "submit post"
```

**示例（管道维修）：**
```bash
"plumbing" "write for us"
"emergency plumbing" "guest post"
"home maintenance" "become a contributor"
"pipe repair" "submit article"
```

### 搜索模式 2：网站限定

**Medium 平台：**
```bash
site:medium.com "[your keyword]" "write for us"
site:medium.com "[your keyword]" "become a contributor"
```

**开发者平台：**
```bash
site:dev.to "[your keyword]"
site:hashnode.com "[your keyword]"
site:css-tricks.com "[your keyword]"
```

**WordPress 博客：**
```bash
site:wordpress.com "[your keyword]" "guest post"
site:wordpress.com "[your keyword]" "write for us"
```

**Substack：**
```bash
site:substack.com "[your keyword]" "write"
```

### 搜索模式 3：URL 搜索

```bash
inurl:write-for-us "[your keyword]"
inurl:guest-post "[your keyword]"
inurl:submit-article "[your keyword]"
inurl:submit-post "[your keyword]"
inurl:contributor-guidelines "[your keyword]"
inurl:write-for-us "[your keyword]" -sponsored
```

### 搜索模式 4：教育/政府机构

```bash
site:.edu "[your keyword]" "write for us"
site:.edu "[your keyword]" "guest post"
site:.edu "[your keyword]" "contributor"
site:.gov "[your keyword]" "submit article"
```

### 搜索模式 5：行业特定

**根据你的行业选择相关网站：**

**科技/编程：**
```bash
site:github.com "[your keyword]" "contributing"
site:stackoverflow.com "[your keyword]"
site:reddit.com/r/programming "[your keyword]"
```

**商业/营销：**
```bash
site:forbes.com "contributor"
site:entrepreneur.com "write for us"
site:inc.com "contributor"
```

**设计/创意：**
```bash
site:dribbble.com "[your keyword]"
site:behance.net "[your keyword]"
```

**本地/区域：**
```bash
"[your city]" "[your keyword]" "write for us"
"[your region]" "[your keyword]" "blog"
```

### 搜索模式 6：高级组合

**排除付费机会：**
```bash
"[your keyword]" "write for us" -sponsored -paid -"payment required"
```

**精确匹配 + URL：**
```bash
"[your keyword]" intitle:"write for us" inurl:blog
```

**多关键词组合：**
```bash
("[keyword1]" OR "[keyword2]") AND ("write for us" OR "guest post")
```

**仅限最近内容：**
```bash
"[your keyword]" "write for us" after:2023-01-01
```

---

## 关键词研究

### 1. 发现话题和趋势

**搜索建议：**
```bash
"[your industry]" trends
"[your industry]" "best practices"
"[your industry]" guide
"[your industry]" tutorial
```

**示例（管道行业）：**
```bash
"plumbing" trends 2024
"home maintenance" best practices
"emergency plumbing" guide
"DIY plumbing" tutorial
```

### 2. 长尾关键词研究

**问题型搜索：**
```bash
"how to" "[your topic]"
"what is" "[your topic]"
"why" "[your topic]"
"best" "[your topic]"
"tips" "[your topic]"
```

**比较型搜索：**
```bash
"[topic A]" vs "[topic B]"
"[topic]" alternatives
"[topic]" comparison
```

**列表型搜索：**
```bash
"top 10" "[your topic]"
"best" "[your topic]" "list"
"[number] ways to" "[your topic]"
```

### 3. 搜索意图分析

**信息性意图：**
```bash
"[keyword]" guide
"[keyword]" tutorial
"[keyword]" how to
"[keyword]" what is
```

**交易性意图：**
```bash
"[keyword]" price
"[keyword]" cost
"[keyword]" buy
"[keyword]" discount
"[keyword]" coupon
```

**商业性意图：**
```bash
"[keyword]" services
"[keyword]" companies
"[keyword]" near me
"[keyword]" reviews
```

**导航性意图：**
```bash
"[brand]" official
"[brand]" website
"[brand]" login
```

### 4. 相关搜索发现

**使用 Google 的相关搜索：**
```
1. 搜索你的主关键词
2. 滚动到页面底部
3. 查看"相关搜索"部分
4. 记录相关搜索词
```

**示例：**
搜索 "plumbing services" → 底部显示：
- "emergency plumbing services"
- "residential plumbing services"
- "commercial plumbing services"
- "plumbing services near me"

### 5. 搜索量和竞争度估算

**使用以下方法估算：**

**方法 1：Google 自动完成**
```
输入关键词，查看 Google 的自动建议
高搜索量的词会出现在自动完成中
```

**方法 2：搜索结果数量**
```
"关键词" - 查看结果数量
结果多 = 高竞争度
结果少 = 低竞争度（但也可能是低搜索量）
```

**方法 3：页面标题分析**
```bash
allintitle:"your keyword"
```
→ 显示标题完全匹配的页面数量
数量少 = 排名机会大

**方法 4：精确匹配搜索**
```bash
"your keyword"
```
→ 用引号精确匹配，看真实竞争度

---

## 竞争对手分析

### 1. 识别竞争对手

**搜索竞争对手：**
```bash
"[your main keyword]"
"[your service]" "[your location]"
```

**示例：**
```bash
"plumbing services" "San Francisco"
"emergency plumber" "Bay Area"
```

**记录前 10 名网站：**
1. 分析他们的内容
2. 查看他们的关键词策略
3. 研究他们的结构化数据
4. 检查他们的外链

### 2. 竞争对手外链分析

**查找外链来源：**
```bash
link:competitor.com
```
→ 注意：Google 的 link: 命令不完整，建议使用工具

**查找提及竞争对手的内容：**
```bash
"competitor name" -site:competitor.com
"competitor name" inurl:blog -site:competitor.com
```

**查找客座博客：**
```bash
"competitor author name" guest post
site:medium.com "competitor author name"
```

### 3. 竞争对手内容分析

**查找他们的博客：**
```bash
site:competitor.com blog
site:competitor.com inurl:blog
```

**查找他们的热门文章：**
```bash
site:competitor.com "[popular topic]"
```

**分析内容类型：**
```bash
site:competitor.com filetype:pdf
site:competitor.com inurl:guide
site:competitor.com intitle:"how to"
```

### 4. 竞争对手关键词分析

**查找他们排名的关键词：**
```bash
site:competitor.com intitle:"keyword"
```

**分析页面标题：**
```bash
site:competitor.com
```
→ 查看前 10 个页面的标题

**查找 Meta Description：**
```bash
site:competitor.com "keyword"
```
→ 查看搜索结果中的描述

### 5. 相关网站分析

**查找相关网站：**
```bash
related:competitor.com
```

**查找行业目录：**
```bash
"[your industry]" directory
"[your industry]" "top companies"
```

**查找行业论坛：**
```bash
"[your industry]" forum
"[your industry]" community
"[your industry]" discussion
```

---

## 内容创作研究

### 1. 话题空白发现

**搜索现有内容：**
```bash
"[your topic]" guide
"[your topic]" tutorial
"[your topic]" complete
```

**分析内容空白：**
```
1. 查看前 10 个结果
2. 识别共同内容
3. 找出缺失内容
4. 创造更全面的内容
```

### 2. 内容类型研究

**查找教程：**
```bash
"[your topic]" tutorial
"[your topic]" "step by step"
"[your topic]" guide
```

**查找清单：**
```bash
"[your topic]" checklist
"[your topic]" "to-do list"
"[your topic]" template
```

**查找案例研究：**
```bash
"[your topic]" case study
"[your topic]" example
"[your topic]" "real world"
```

**查找数据和研究：**
```bash
"[your topic]" study
"[your topic]" research
"[your topic]" statistics
"[your topic]" data
```

### 3. Featured Snippets 优化

**查找 Featured Snippets：**
```bash
"what is" "[your topic]"
"how to" "[your topic]"
"why" "[your topic]"
"best" "[your topic]"
```

**优化策略：**
```
1. 识别现有的 Featured Snippets
2. 分析格式（列表、表格、定义）
3. 创建更好的内容
4. 使用清晰的结构
5. 提供简洁的答案
```

### 4. 内容格式研究

**列表内容：**
```bash
"top 10" "[your topic]"
"best" "[your topic]" "list"
"[your topic]" tips
```

**对比内容：**
```bash
"[topic A]" vs "[topic B]"
"[topic]" comparison
"[topic]" versus
```

**指南内容：**
```bash
"[your topic]" complete guide
"[your topic]" ultimate guide
"[your topic]" handbook
```

### 5. 多媒体内容机会

**查找视频：**
```bash
"[your topic]" site:youtube.com
```

**查找图片：**
```bash
"[your topic]" site:pinterest.com
"[your topic]" site:flickr.com
```

**查找演示文稿：**
```bash
"[your topic]" filetype:ppt
"[your topic]" site:slideshare.net
```

**查找 PDF：**
```bash
"[your topic]" filetype:pdf
```

---

## 实战练习

### 练习 1：客座博客机会发现

**任务：** 为你的行业找到 5 个客座博客机会

**步骤：**
1. 使用以下搜索语法：
   ```bash
   "[your main keyword]" "write for us"
   "[your main keyword]" intitle:"guest post"
   inurl:write-for-us "[your main keyword]"
   ```

2. 评估找到的网站：
   - DA > 50?
   - 相关性高?
   - DoFollow 链接?
   - 内容质量好?

3. 记录机会：
   - 网站名称和 URL
   - 联系方式
   - DA 和相关性评分
   - 投稿指南

### 练习 2：竞争对手分析

**任务：** 分析 1 个主要竞争对手

**步骤：**
1. 找到竞争对手：
   ```bash
   "[your main keyword]"
   ```
   → 选择前 5 名中的一个

2. 分析外链：
   ```bash
   "competitor name" -site:competitor.com
   "competitor name" inurl:blog -site:competitor.com
   ```

3. 分析内容：
   ```bash
   site:competitor.com inurl:blog
   ```

4. 记录发现：
   - 他们的主要话题
   - 内容类型
   - 外链来源
   - 可改进之处

### 练习 3：关键词研究

**任务：** 找到 10 个长尾关键词

**步骤：**
1. 基础搜索：
   ```bash
   "how to" "[your topic]"
   "what is" "[your topic]"
   "best" "[your topic]"
   ```

2. 使用自动完成：
   - 输入主关键词
   - 记录所有建议

3. 查看相关搜索：
   - 搜索主关键词
   - 滚动到底部
   - 记录相关搜索

4. 评估关键词：
   - 搜索量（使用工具估算）
   - 竞争度（查看结果数量）
   - 意图（信息性/交易性/商业性）

### 练习 4：内容空白分析

**任务：** 找到 1 个内容空白机会

**步骤：**
1. 搜索现有内容：
   ```bash
   "[your topic]" complete guide
   "[your topic]" tutorial
   ```

2. 分析前 10 个结果：
   - 它们覆盖了什么？
   - 有什么缺失？
   - 如何改进？

3. 创建更好的内容：
   - 更全面（2-3倍长度）
   - 更新（最新信息）
   - 更美观（图表、视频）
   - 更易读（结构、排版）

---

## 高级技巧

### 1. 组合搜索操作符

**复杂搜索：**
```bash
("keyword1" OR "keyword2") AND ("keyword3" OR "keyword4")
```

**排除多个：**
```bash
"keyword" -site:example1.com -site:example2.com
```

**精确 + URL + 标题：**
```bash
"keyword" inurl:blog intitle:"write for us"
```

### 2. 时间范围搜索

**最近更新：**
```bash
"keyword" after:2023-01-01
```

**特定年份：**
```bash
"keyword" 2024
"SEO trends" 2020..2024
```

### 3. 文件类型搜索

**特定文件：**
```bash
"keyword" filetype:pdf
"keyword" filetype:xls
"keyword" filetype:ppt
```

### 4. 网站深度搜索

**特定目录：**
```bash
site:example.com/blog "keyword"
site:example.com/products "keyword"
```

**子域名：**
```bash
site:blog.example.com "keyword"
```

---

## 搜索工具和资源

### Google 工具

1. **Google Advanced Search**
   - URL: https://www.google.com/advanced_search
   - 图形化搜索界面

2. **Google Trends**
   - URL: https://trends.google.com
   - 关键词趋势分析

3. **Google Keyword Planner**
   - URL: https://ads.google.com/home/tools/keyword-planner/
   - 搜索量和竞争度数据

### 第三方工具

1. **Ahrefs**
   - 关键词研究
   - 外链分析
   - 竞争对手分析

2. **SEMrush**
   - 关键词研究
   - 竞争对手分析
   - 排名跟踪

3. **Moz**
   - Domain Authority
   - 关键词难度
   - SEO 建议

4. **Ubersuggest**
   - 关键词建议
   - 内容创意
   - SEO 审计

---

## 最佳实践

### 1. 保持精确

**好的搜索：**
```bash
"emergency plumbing services" "San Francisco"
```

**不好的搜索：**
```bash
emergency plumbing
```

### 2. 逐步优化

**从广泛到精确：**
```
1. plumbing
2. "emergency plumbing"
3. "emergency plumbing services" "San Francisco"
4. "emergency plumbing services" "San Francisco" after:2023
```

### 3. 使用多个来源

不要依赖单一的搜索结果：
- 使用不同的搜索语法
- 查看多个页面
- 交叉验证信息

### 4. 记录和跟踪

保持搜索记录：
- 有效的搜索语法
- 发现的机会
- 竞争对手信息
- 关键词列表

### 5. 定期重复搜索

搜索结果会变化：
- 定期重复相同的搜索
- 发现新的机会
- 跟踪竞争对手变化

---

## 故障排除

### 问题 1：搜索结果太多

**解决：** 添加更精确的条件
```bash
"plumbing" "write for us"
→ 改为：
"emergency plumbing" "write for us" inurl:blog -sponsored
```

### 问题 2：搜索结果太少

**解决：** 减少限制或使用 OR
```bash
"emergency plumbing services" "guest post"
→ 改为：
("emergency plumbing" OR "pipe repair") AND ("guest post" OR "write for us")
```

### 问题 3：找不到特定内容

**解决：** 尝试不同的关键词组合
```bash
"write for us" "plumbing"
→ 尝试：
"become a contributor" "home maintenance"
"submit article" "pipe repair"
```

---

## 相关命令

- `/guest-blogs` - 查找客座博客机会
- Skill: guest-blogger - 自动客座博客分析
- `resources/guest-blog-sources.md` - 客座博客资源列表

## 持续学习

搜索技巧需要持续练习：
- 每周练习新的搜索语法
- 尝试不同的组合
- 记录有效的搜索
- 分享发现和技巧

搜索是 SEO 的核心技能，掌握这些技巧将大大提升你的 SEO 能力！
```

### 示例 2：特定主题

```bash
/search-tips guest-post
```

输出专注于客座博客搜索技巧：

```markdown
# 客座博客搜索技巧

## 基础搜索模式

[所有客座博客搜索相关的技巧...]
```

### 示例 3：关键词研究

```bash
/search-tips keywords
```

输出专注于关键词研究方法：

```markdown
# 关键词研究完全指南

## 发现关键词
## 评估关键词
## 分析竞争对手关键词
[所有关键词研究相关的技巧...]
```

---

## 互动学习模式

这个命令支持交互式学习：

1. **循序渐进** - 从基础到高级
2. **实战练习** - 提供实际练习任务
3. **示例丰富** - 每个技巧都有实战示例
4. **按需学习** - 可以选择特定主题深入学习

## 学习路径建议

**初学者：**
1. 先学习 `/search-tips basic`
2. 练习基础搜索操作符
3. 完成 3 个实战练习

**中级用户：**
1. 专注于特定领域：`/search-tips guest-post`
2. 学习关键词研究：`/search-tips keywords`
3. 开始竞争对手分析：`/search-tips competitor`

**高级用户：**
1. 掌握所有技巧
2. 创建自己的搜索模式
3. 开发高效的工作流程

## 注意事项

- 搜索语法可能随时间变化
- 不同搜索引擎语法略有不同
- 实践是最好的学习方式
- 保持记录和总结
