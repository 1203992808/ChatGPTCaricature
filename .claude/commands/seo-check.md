---
description: 快速 SEO 检查当前页面或选中的文件
argument-hint: [file-path]
---

对当前工作目录或指定文件进行快速 SEO 检查，重点关注元数据完整性和明显的 SEO 问题。

## 功能

快速 SEO 检查适用于：
- 检查单个页面的 SEO 状况
- 快速识别明显的 SEO 问题
- 提供即时修复建议
- 无需完整审计即可获得快速反馈

## 参数

- `$1` 或 `$ARGUMENTS`: 可选的文件或目录路径
  - 如果不提供，检查当前工作目录
  - 可以是单个文件路径
  - 可以是目录路径（检查目录下所有页面）

## 检查项目

### 元数据检查
- ✓ Title 标签存在性和长度
- ✓ Meta Description 存在性和长度
- ✓ Open Graph 标签完整性
- ✓ Twitter Cards 标签
- ✓ Canonical URL
- ✓ Viewport 配置

### 内容检查
- ✓ H1 标题（唯一性）
- ✓ 图片 alt 文本
- ✓ 链接锚文本
- ✓ 内容长度（初步判断）

### 技术检查
- ✓ robots.txt 文件存在性
- ✓ 页面加载速度提示
- ✓ 移动友好性提示
- ✓ HTTPS 配置

## 使用示例

### 示例 1：检查当前目录

```bash
/seo-check
```

输出：
```
🔍 快速 SEO 检查

📁 检查目录：app/
📄 发现文件：8 个

快速检查结果：

✅ 优秀（6/8）
  - /, /about, /services, /blog, /contact, /team

⚠️  需要关注（2/8）
  1. /blog/[slug]
     - ⚠️ Title: 65 字符（建议：50-60）
     - ⚠️ 缺少 Twitter Cards

  2. /products/[id]
     - ❌ 缺少 Description
     - ❌ 缺少 OG 标签

建议优先修复 /products/[id]，它缺少关键元数据。

需要详细分析吗？使用 /seo-audit 进行完整审计。
```

### 示例 2：检查单个文件

```bash
/seo-check app/about/page.tsx
```

输出：
```
🔍 快速 SEO 检查

📄 文件：app/about/page.tsx

元数据检查：
✅ Title: "关于我们 | YourBrand" (16 字符) ✓
✅ Description: "了解我们的团队、使命和价值观..." (85 字符) ✓
✅ OG 标签完整 ✓
❌ Twitter Cards 缺失 ⚠️
✅ Canonical URL ✓

内容检查：
✅ H1 标题唯一 ✓
⚠️  2 个图片缺少 alt 文本
✅ 内容长度充足 (450 词) ✓

技术检查：
✅ robots.txt 存在 ✓
✅ HTTPS 配置 ✓
✅ Viewport 配置 ✓

总结：页面 SEO 状况良好，建议添加 Twitter Cards 标签并修复图片 alt 文本。

需要我生成修复代码吗？
```

### 示例 3：检查目录

```bash
/seo-check app/blog/
```

输出：
```
🔍 快速 SEO 检查

📁 检查目录：app/blog/
📄 发现文件：12 个

博客页面检查结果：

✅ 优秀（8/12）
  所有元数据完整，结构化数据正确

⚠️  需要改进（3/12）
  1. /blog/post-1 - Title 过长（68 字符）
  2. /blog/post-5 - Description 过短（50 字符）
  3. /blog/post-9 - 缺少 OG 图片

❌ 严重问题（1/12）
  1. /blog/post-12 - 完全缺少元数据

建议：
1. 立即修复 /blog/post-12（添加所有元数据）
2. 优化 Title 和 Description 长度
3. 为所有博客文章添加 OG 图片

需要我为这些页面生成优化的元数据吗？
```

## 输出格式

### 简洁模式（默认）

```
🔍 快速 SEO 检查

✅ 12 个文件已检查
⚠️  4 个文件需要改进
❌ 1 个文件有严重问题

优先修复：
1. [文件路径] - [问题描述]
2. [文件路径] - [问题描述]
3. [文件路径] - [问题描述]

建议：[快速修复建议]
```

### 详细模式

当检测到问题时，自动提供详细的分析和修复建议。

## 检查标准

### Title 检查

**中文：**
- ✓ 最佳：20-30 字符
- ⚠️ 可接受：15-40 字符
- ❌ 问题：< 15 或 > 40 字符

**英文：**
- ✓ 最佳：50-60 字符
- ⚠️ 可接受：40-75 字符
- ❌ 问题：< 40 或 > 75 字符

### Description 检查

**中文：**
- ✓ 最佳：70-80 字符
- ⚠️ 可接受：50-100 字符
- ❌ 问题：< 50 或 > 100 字符

**英文：**
- ✓ 最佳：150-160 字符
- ⚠️ 可接受：120-180 字符
- ❌ 问题：< 120 或 > 180 字符

### 优先级标记

- ✅ 优秀 - 无需修改
- ⚠️ 警告 - 建议修改
- ❌ 错误 - 必须修改

## 快速修复建议

基于发现的问题，提供以下类型的快速修复建议：

1. **添加缺失的元数据**
   ```markdown
   建议添加：
   - Title 标签
   - Meta Description
   - OG 标签
   使用 /metadata [文件路径] 生成
   ```

2. **调整元数据长度**
   ```markdown
   建议调整：
   - 缩短 Title 到 X 字符
   - 扩展 Description 到 Y 字符
   当前：[当前值]
   建议：[建议值]
   ```

3. **添加结构化数据**
   ```markdown
   建议添加 JSON-LD：
   - Article Schema（博客文章）
   - WebPage Schema（页面）
   使用 /structured-data [文件路径] 生成
   ```

4. **修复技术问题**
   ```markdown
   建议修复：
   - 添加 robots.txt 文件
   - 配置 HTTPS
   - 添加 Viewport meta 标签
   ```

## 后续操作

在快速检查完成后，引导用户进行下一步：

```markdown
需要进一步操作？

📊 完整审计
   使用 /seo-audit 进行全面 SEO 审计和评分

📝 优化元数据
   使用 /metadata [文件路径] 生成优化的元数据

🏗️  添加结构化数据
   使用 /structured-data [文件路径] 生成 JSON-LD

🔍 深度分析
   使用 Agent: seo-analyzer 进行深度分析
```

## 自动检测

命令会自动：
- 检测项目类型（Next.js App Router vs Pages Router）
- 检测内容语言（中文 vs 英文）
- 检测文件类型（页面 vs 组件）
- 应用相应的检查标准

## 性能优化

- 使用 Glob 快速定位文件
- 仅读取必要部分
- 缓存重复检查
- 并行处理多个文件

## 注意事项

- 快速检查不提供完整的 SEO 评分
- 不包含 E-E-A-T 和内容策略分析
- 不包含竞争对手分析
- 对于完整分析，使用 `/seo-audit`

## 相关命令

- `/seo-audit` - 全面 SEO 审计（含评分）
- `/metadata` - 生成或优化元数据
- `/structured-data` - 生成 JSON-LD 结构化数据
- `Agent: seo-analyzer` - 深度 SEO 分析
