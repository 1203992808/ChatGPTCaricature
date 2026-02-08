---
description: 查找客座博客机会
argument-hint: [--niche <topic>] [--template]
---

基于项目内容分析，提供客座博客机会和投稿策略。生成 Google 搜索语法、列出高质量资源网站、提供质量评估标准和投稿建议。

## 功能

- ✅ 自动分析项目主题和关键词
- ✅ 生成 Google 高级搜索语法
- ✅ 列出客座博客资源（从 resources/guest-blog-sources.md 读取）
- ✅ 提供质量评估标准
- ✅ 生成投稿邮件模板（使用 --template）
- ✅ 提供个性化投稿建议

## 参数

- `--niche <topic>`: 指定细分领域（可选）
  - 如果不提供，自动分析项目内容
  - 示例：`--niche "plumbing"`, `--niche "web development"`

- `--template`: 生成投稿邮件模板（可选标志）
  - 包含初次联系邮件和内容提案邮件
  - 从 templates/guest-blog-pitch.md 读取

## 使用示例

### 示例 1：自动分析项目

```bash
/guest-blogs
```

输出：
```markdown
# 客座博客机会分析

## 项目内容分析

基于对项目内容的分析，识别出以下主题和关键词：

### 主要话题

1. **话题 1：管道维修**
   - 关键词：plumbing repair, emergency plumbing, pipe maintenance
   - 相关文章：8 篇
   - 受众兴趣：高

2. **话题 2：家庭维护**
   - 关键词：home maintenance, DIY plumbing, household tips
   - 相关文章：5 篇
   - 受众兴趣：中高

3. **话题 3：管道服务**
   - 关键词：plumbing services, local plumber, professional plumbing
   - 相关文章：4 篇
   - 受众兴趣：高

### 目标受众
- **人群特征**：房主、物业经理、DIY 爱好者
- **地理位置**：旧金山湾区
- **主要需求**：紧急维修、预防性维护、成本估算

---

## Google 搜索策略

### 立即可用的搜索语法

**话题 1：管道维修**

```bash
# 基础客座博客搜索
"plumbing repair" "write for us"
"emergency plumbing" "guest post"
"pipe maintenance" "become a contributor"

# 网站限定搜索
site:medium.com "plumbing" "write for us"
site:wordpress.com "plumbing" "guest post"

# URL 搜索
inurl:write-for-us "plumbing"
inurl:guest-post "emergency plumbing"

# 教育机构
site:.edu "plumbing" "write for us"
site:.edu "home maintenance" "guest post"

# 行业特定
site:homes.com "plumbing" "contributor"
site:realtor.com "home maintenance" "write for us"

# 高级组合
("plumbing repair" OR "emergency plumbing") AND ("write for us" OR "guest post")
"plumbing" "write for us" -sponsored -paid -"payment required"
"plumbing" intitle:"write for us" inurl:blog
```

**话题 2：家庭维护**

```bash
"home maintenance" "write for us"
"DIY plumbing" "guest post"
"household tips" "become a contributor"
site:medium.com "home maintenance" "write for us"
```

**话题 3：管道服务**

```bash
"plumbing services" "write for us"
"local plumber" "guest post"
"professional plumbing" "become a contributor"
```

### 地理位置搜索

```bash
# 旧金山湾区本地网站
"San Francisco" "plumbing" "write for us"
"Bay Area" "home maintenance" "guest post"
site:.org "California" "plumbing" "contributor"
```

---

## 推荐目标网站

从资源列表中，以下网站最适合你的项目：

### 高优先级（DA > 80，高度相关）

1. **HomeAdvisor Blog**
   - DA：88
   - 网址：https://www.homeadvisor.com/blog/
   - 相关性：高度相关（家庭维修）
   - 投稿方式：联系编辑团队
   - 预计流量：高
   - 链接类型：DoFollow ✓

2. **Houzz**
   - DA：91
   - 网址：https://www.houzz.com/
   - 相关性：高度相关（家居改进）
   - 投稿方式：成为 Contributor
   - 预计流量：非常高
   - 链接类型：DoFollow ✓

3. **BobVila.com**
   - DA：82
   - 网址：https://www.bobvila.com/
   - 相关性：高度相关（家庭维修）
   - 投稿方式：投稿文章
   - 预计流量：高
   - 链接类型：DoFollow ✓

### 中优先级（DA 50-80，中度相关）

4. **The Spruce**
   - DA：85
   - 网址：https://www.thespruce.com/
   - 相关性：中度相关（家庭和花园）
   - 投稿方式：提交提案
   - 预计流量：高

5. **Family Handyman**
   - DA：75
   - 网址：https://www.familyhandyman.com/
   - 相关性：中度相关（DIY 和家庭维修）
   - 投稿方式：联系编辑
   - 预计流量：中高

### 本地机会

6. **San Francisco Chronicle (Home & Garden section)**
   - DA：92
   - 网址：https://www.sfchronicle.com/
   - 相关性：高度相关（本地）
   - 投稿方式：联系版面编辑
   - 预计流量：非常高
   - 链接类型：DoFollow ✓

7. **Curbed SF**
   - DA：78
   - 网址：https://sf.curbed.com/
   - 相关性：中度相关（本地房地产）
   - 投稿方式：投稿建议
   - 预计流量：中

---

## 质量评估标准

### 评估清单

在投稿之前，使用以下清单评估目标网站：

**Domain Authority (DA)**
- [ ] DA > 50 (优秀 ✓)
- [ ] DA 30-50 (良好)
- [ ] DA < 30 (一般)

**相关性**
- [ ] 主题完全匹配 ✓
- [ ] 目标受众匹配 ✓
- [ ] 内容风格一致

**流量**
- [ ] 使用 SimilarWeb 检查流量
- [ ] 流量 > 10,000 访问/月 ✓

**审核机制**
- [ ] 有人工审核 ✓
- [ ] 质量要求高
- [ ] 拒绝垃圾内容

**SEO 友好**
- [ ] DoFollow 链接 ✓
- [ ] 作者署名 ✓
- [ ] 作者简介链接 ✓

### 综合评分

每个维度 1-5 分，总分 25 分

**评分标准：**
- 20-25 分：优秀 ✓ 立即投稿
- 15-19 分：良好 ✓ 值得投稿
- 10-14 分：一般 ⚠️ 谨慎考虑
- < 10 分：不建议 ❌

### 红旗警告

**避免以下网站：**
```
❌ 要求付费才能发布
❌ 内容农场（大量低质量内容）
❌ 仅接受 NoFollow 链接
❌ 无审核机制
❌ 可疑的 SEO 策略
❌ 与你的主题完全不相关
❌ 过度广告
❌ 低质量评论和链接
```

---

## 投稿策略建议

### 阶段 1：准备（第 1 周）

**研究和内容准备：**
- [ ] 阅读 5-10 篇目标网站的文章
- [ ] 了解风格和格式
- [ ] 识别内容空白
- [ ] 研究"关于我们"和作者指南
- [ ] 准备 2-3 篇高质量文章
- [ ] 准备作者简介和照片

### 阶段 2：高优先级网站（第 2-3 周）

**目标：HomeAdvisor, Houzz, BobVila**

**第 1 周：**
- 周一：研究 Houzz 的文章风格和格式
- 周二：研究 HomeAdvisor 的内容空白
- 周三：研究 BobVila 的作者指南
- 周四：为 Houzz 准备内容提案
- 周五：发送 Houzz 内容提案邮件

**第 2 周：**
- 周一：为 HomeAdvisor 准备完整文章
- 周二：发送 HomeAdvisor 投稿邮件
- 周三：为 BobVila 准备内容提案
- 周四：发送 BobVila 投稿邮件
- 周五：跟进上周的 Houstack 提案

**第 3 周：**
- 跟进所有未回复的邮件
- 根据反馈修改文章
- 开始研究中优先级网站

### 阶段 3：扩展（第 4-8 周）

**每周目标：**
- 发送 3-5 个新投稿
- 跟进之前的投稿
- 根据反馈优化内容
- 建立与编辑的关系

### 成功指标

**第 1 个月目标：**
- 发送投稿：15-20 个网站
- 获得回复：3-5 个
- 成功发布：1-2 篇

**第 3 个月目标：**
- 累计投稿：40-50 个网站
- 累计发布：8-12 篇
- 获得高质量外链：8-12 个
- Domain Authority 提升：+3-5

**第 6 个月目标：**
- 累计发布：20-30 篇
- 建立长期关系：3-5 个网站
- 成为常驻作者：1-2 个平台
- Domain Authority 提升：+5-10

---

## 投稿最佳实践

### 1. 个性化邮件

**好的邮件：**
```
Hi Sarah,

I came across your recent article "10 Common Plumbing Mistakes" on Houzz and found it incredibly helpful. As a licensed plumber with 15 years of experience in the Bay Area, I especially appreciated your point about...

I'd love to contribute an article on "Emergency Plumbing: What Every Homeowner Needs to Know" based on my experience helping homeowners during plumbing emergencies...

[详细内容]
```

**不好的邮件：**
```
Dear Editor,

I want to write a guest post for your website. Please let me know if you're interested.

Thanks,
[Name]
```

### 2. 提供独特价值

**内容角度建议：**
- 分享真实案例研究
- 提供原创数据和统计
- 基于专业经验提供见解
- 创建实用清单和模板
- 分享前后对比

### 3. 遵守指南

- 严格遵守字数要求
- 遵循格式指南
- 提供高质量图片
- 包含作者简介
- 提供社交媒体链接

### 4. 及时跟进

- 1 周后跟进一次
- 保持专业礼貌
- 不要频繁发送邮件
- 接受拒绝，保持关系

### 5. 建立关系

- 评论和分享他们的内容
- 在社交媒体上互动
- 推荐他们的内容
- 感谢编辑的反馈

---

## 常见问题

### Q: 需要付费才能发布客座博客吗？

A: 不应该。高质量的客座博客机会是免费的。如果网站要求付费，通常是广告或赞助内容，不是真正的客座博客。

### Q: 多少字数合适？

A: 取决于目标网站：
- 短文章：500-800 词
- 标准文章：1000-1500 词
- 深度文章：2000+ 词

### Q: 可以发布相同的内容到多个网站吗？

A: 不可以。搜索引擎会惩罚重复内容。每个客座博客必须是独特的原创内容。

### Q: 如何找到编辑的联系方式？

A:
1. 查看网站的"Write for Us"或"Contributors"页面
2. 查看文章末尾的作者信息
3. 查看网站的联系页面
4. 在 LinkedIn 上搜索编辑名字
5. 使用 Twitter 或社交媒体联系

### Q: 如果被拒绝怎么办？

A: 被拒绝是正常的。建议：
- 询问具体原因（如果可能）
- 根据反馈改进
- 尝试其他网站
- 不要放弃，继续尝试

---

## 下一步行动

### 立即行动

1. **使用提供的搜索语法**
   - 复制搜索语法到 Google
   - 发现 10-20 个新机会
   - 评估每个网站的质量

2. **准备内容**
   - 创建 2-3 篇高质量文章
   - 准备作者简介
   - 准备相关图片

3. **开始投稿**
   - 优先联系高优先级网站
   - 发送个性化邮件
   - 记录所有投稿和回复

### 本周任务清单

- [ ] 研究 10 个新目标网站
- [ ] 评估每个网站的质量（使用评分清单）
- [ ] 准备 1 篇完整文章
- [ ] 发送 5 个投稿邮件
- [ ] 设置投稿跟踪表

### 需要更多帮助？

- 使用 `/search-tips` 学习更多搜索技巧
- 查看 `resources/guest-blog-sources.md` 获取完整资源列表
- 使用 `/guest-blogs --template` 获取邮件模板
- 查看 `templates/guest-blog-pitch.md` 获取更多模板示例
```

### 示例 2：指定细分领域

```bash
/guest-blogs --niche "web development"
```

输出：
```markdown
# 客座博客机会分析：Web Development

## 话题分析

**细分领域：** Web Development
**目标受众：** 开发者、程序员、技术学习者
**主要关键词：**
- web development
- frontend development
- backend development
- JavaScript, React, Next.js
- web development tutorials

## Google 搜索策略

```bash
# 基础搜索
"web development" "write for us"
"frontend development" "guest post"
"JavaScript tutorial" "become a contributor"

# 技术特定
site:dev.to "write for us"
site:css-tricks.com "guest post"
site:smashingmagazine.com "contributor"

# 高级组合
("web development" OR "frontend") AND ("write for us" OR "guest post")
"JavaScript" "write for us" -sponsored
```

## 推荐目标网站

1. **CSS-Tricks** (DA 92)
2. **Smashing Magazine** (DA 92)
3. **Dev.to** (DA 88)
4. **SitePoint** (DA 85)
5. **freeCodeCamp** (DA 91)

[完整分析...]
```

### 示例 3：带邮件模板

```bash
/guest-blogs --template
```

输出包含：
- 项目分析
- 搜索策略
- 推荐网站
- **完整的投稿邮件模板**

邮件模板包括：
1. 初次联系邮件（中文和英文）
2. 内容提案邮件（中文和英文）
3. 跟进邮件（中文和英文）
4. 拒绝回应邮件（中文和英文）

[完整模板...]

---

## 跟踪和管理

### 投稿跟踪表

建议创建一个表格来跟踪所有投稿：

| 目标网站 | DA | 联系日期 | 提交类型 | 当前状态 | 跟进日期 | 结果 |
|---------|-----|---------|---------|---------|---------|------|
| Houzz | 91 | 2024-01-15 | 内容提案 | 已联系 | 2024-01-22 | 待回复 |
| HomeAdvisor | 88 | 2024-01-16 | 完整文章 | 已联系 | - | 接受 ✓ |
| BobVila | 82 | - | - | 准备中 | - | - |

**当前状态类型：**
- 研究中：正在研究网站
- 准备中：正在准备内容
- 已联系：已发送邮件
- 跟进中：已发送跟进
- 接受：文章被接受
- 已发布：文章已上线
- 拒绝：文章被拒绝
- 已放弃：放弃此目标

### Google Sheets 模板

```markdown
列标题：
- 目标网站
- 网站链接
- DA
- 相关性 (1-5)
- 预期流量
- 联系方式
- 联系日期
- 提交类型（提案/完整文章）
- 文章标题
- 当前状态
- 跟进日期 1
- 跟进日期 2
- 最终结果
- 备注
```

---

## 相关资源

- `resources/guest-blog-sources.md` - 完整资源列表
- `templates/guest-blog-pitch.md` - 邮件模板
- `/search-tips` - Google 搜索技巧
- Skill: guest-blogger - 自动客座博客分析

## 注意事项

- 质量永远 > 数量
- 优先投稿高质量网站
- 建立长期关系比单次投稿更有价值
- 被拒绝是正常的，不要气馁
- 持续跟进但不要骚扰
- 保持专业和礼貌
- 提供真实价值，不要过度推销
