# ChatGPT Caricature 产品需求文档 (PRD)

> **项目名称**: ChatGPT Caricature
> **域名**: chatgptcaricature.pro
> **文档版本**: v1.0
> **最后更新**: 2026-02-08
> **基础项目**: ShipAny Template Two (Z Image Turbo)

---

## 1. 项目背景与目标

### 1.1 市场背景

"ChatGPT Caricature" 是 2026 年 2 月爆发的病毒式社交趋势，用户使用 AI 将真人照片转换为夸张风格的漫画肖像，并在 Instagram、TikTok、Twitter 等平台分享。搜索量在短时间内暴增，英文市场存在巨大的 SEO 抢占机会。

### 1.2 产品目标

将现有 AI SaaS 模板（Z Image Turbo，支持图片/视频/音乐生成）改造为**专注「上传照片 → 生成漫画肖像」单一功能**的垂直产品，抢占全球英文 SEO 市场。

### 1.3 关键决策

| 决策项 | 决策结果 | 理由 |
|--------|---------|------|
| AI Provider | 复用现有 Provider（Gemini > Fal > Replicate > Kie）+ Prompt 工程 | 降低开发成本，不新增 OpenAI |
| 功能范围 | 砍掉音乐/视频/文生图，只保留「上传照片 → 生成漫画肖像」 | 聚焦单一垂直场景 |
| 目标语言 | 英文优先 | 面向全球英文搜索市场 |
| 域名 | chatgptcaricature.pro | 精准匹配主关键词 |

---

## 2. 功能需求

### 2.1 核心功能：CaricatureGenerator 漫画生成器

#### 2.1.1 功能概述

用户上传一张人脸照片，选择漫画风格，可选填个性化信息，点击生成按钮后 AI 将照片转换为对应风格的漫画肖像。

#### 2.1.2 用户流程

```
上传照片 → 选择风格 → (可选) 填写个性化信息 → 点击生成 → 等待 AI 处理 → 查看/下载结果
```

#### 2.1.3 风格预设（6 种）

每种风格包含：`key`（唯一标识）、`label`（显示名称）、`description`（描述）、`thumbnail`（缩略图路径）、`buildPrompt`（Prompt 构建函数）。

| # | 风格 Key | 显示名称 | 描述 | 核心 Prompt 要素 |
|---|---------|---------|------|-----------------|
| 1 | `classic` | Classic Caricature | 传统漫画肖像 | 大头小身，夸张五官，粗线条，温暖色彩 |
| 2 | `job` | Job Caricature | 融入职业元素 | 职业装扮、工作道具、工作环境 |
| 3 | `3d-cartoon` | 3D Cartoon | 3D 渲染风格 | Pixar/Disney 风格，光滑材质，夸张大眼 |
| 4 | `comic` | Comic Style | 漫画书风格 | 粗黑线条，半色调网点，动感构图，超级英雄感 |
| 5 | `chibi` | Chibi | Q 版可爱风格 | 超大头(60%)超小身，闪亮大眼，腮红，柔和粉彩 |
| 6 | `pop-art` | Pop Art | 波普艺术风格 | Andy Warhol / Roy Lichtenstein 风格，Ben-Day 点，鲜艳原色 |

**Prompt 模板结构**:
```
基础风格描述 + 用户照片参考(image-to-image) + 可选细节(职业/爱好/性格) + 附加描述
```

**风格缩略图路径**: `public/imgs/caricature-styles/{key}.png`
- `classic.png`
- `job.png`
- `3d-cartoon.png`
- `comic.png`
- `chibi.png`
- `pop-art.png`

#### 2.1.4 用户输入

| 输入项 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| 照片上传 | 图片文件 | **是** | 单张模式，最大 5MB，支持 JPG/PNG/WebP |
| 风格选择 | 单选卡片网格 | **是** | 6 种预设，默认选中 Classic |
| Job Title | 文本输入框 | 否 | 职业/工作，如 "Doctor"、"Teacher" |
| Hobbies | 文本输入框 | 否 | 爱好，如 "Guitar"、"Cooking" |
| Personality | 文本输入框 | 否 | 性格，如 "Cheerful"、"Mysterious" |
| Additional Details | 多行文本框 | 否 | 用户自定义的额外描述 |

#### 2.1.5 AI 调用规则

| 参数 | 值 |
|------|---|
| mediaType | `IMAGE` |
| scene | `image-to-image`（固定） |
| 每次消耗 | **20 credits** |
| Provider 优先级 | gemini → fal → replicate → kie（自动选择第一个可用的） |
| 轮询间隔 | 5 秒 |
| 超时时间 | 180 秒（3 分钟） |

**支持的 image-to-image 模型（按优先级排序）**:

| 优先级 | Provider | Model ID |
|--------|----------|----------|
| 1 | gemini | `gemini-3-pro-image-preview` |
| 2 | fal | `fal-ai/bytedance/seedream/v4.5/edit` |
| 3 | fal | `fal-ai/bytedance/seedream/v4/edit` |
| 4 | replicate | `bytedance/seedream-4` |
| 5 | kie | `nano-banana-pro` |

#### 2.1.6 生成结果处理

- 生成成功后自动保存到 Showcase（标签为 `caricature`）
- 用户可直接下载生成的图片（通过 proxy 代理下载）
- 下载文件名格式：`caricature-{taskId}-{index}.png`

#### 2.1.7 UI 布局

左右两栏布局（桌面端），移动端上下堆叠：

**左栏（输入区）**：
1. 标题栏（带魔杖图标）
2. 风格选择卡片网格（3x2）
3. 照片上传区域
4. 个性化输入（3 列：Job Title / Hobbies / Personality）
5. 附加描述文本框
6. 生成按钮
7. Credits 信息（消耗 / 剩余）
8. 进度条（生成中显示）

**右栏（结果区）**：
1. 标题栏（带图片图标）
2. 生成中：LoadingAnimation 动画
3. 有结果：图片展示 + 下载按钮
4. 空状态：占位图标 + 提示文案

#### 2.1.8 与 ImageGenerator 的差异对比

| 特性 | ImageGenerator（原） | CaricatureGenerator（新） |
|------|---------------------|--------------------------|
| 模式切换 | text-to-image / image-to-image Tab | 固定 image-to-image |
| 风格选择 | 无 | 6 种可视化卡片 |
| Prompt 输入 | 用户手动输入完整 prompt | 自动由风格模板 + 用户可选信息生成 |
| Provider/Model 选择 | 对用户可见（已注释但存在） | 完全隐藏，自动选择 |
| 个性化输入 | 无 | Job Title / Hobbies / Personality |
| 参考图片 | 支持多张 | 固定单张 |
| Credits 消耗 | 5 (text) / 20 (image) | 固定 20 |
| promptKey 支持 | 有 | 无 |

---

### 2.2 页面结构

#### 2.2.1 首页 `/`

| 区域 | 内容 |
|------|------|
| Hero | 标题 "ChatGPT Caricature"（渐变分行显示），内嵌 CaricatureGenerator 组件 |
| Announcement | "The viral AI caricature trend everyone is talking about"，链接到 `/chatgpt-caricature` |
| Showcases Flow | AI Caricature Gallery，展示用户生成的漫画肖像 |
| Introduce | "What is AI Caricature Generator?"，4 个特性介绍 |
| Features | "Why Choose AI Caricature Generator?"，6 个核心优势 |
| FAQ | 7 个常见问答（Caricature 主题） |
| CTA | "Create Your AI Caricature Now" |

**首页不显示的区域**（hidden: true）: logos, benefits, usage, stats, testimonials, subscribe

#### 2.2.2 创建页 `/create`

| 区域 | 内容 |
|------|------|
| Features Block | "AI Caricature Generator" 标题 + 描述 |
| Generator | CaricatureGenerator 组件 |

**Metadata**:
- Title: "Create AI Caricature - Turn Your Photo into a Cartoon Portrait"
- Description: "Upload your photo and transform it into a fun caricature portrait with AI. Choose from 6 unique styles."

#### 2.2.3 SEO 着陆页 `/chatgpt-caricature`

专为主关键词 "chatgpt-caricature" 打造的 SEO 页面。

| 区域 | 内容 |
|------|------|
| Hero | 标题 "ChatGPT Caricature" + SEO 优化描述 |
| Generator | CaricatureGenerator 组件 |
| Showcases Flow | AI Caricature Gallery（最新 12 张） |
| FAQ | 复用首页 FAQ |
| CTA | 复用首页 CTA |

**Metadata**:
- Title: "ChatGPT Caricature - AI Caricature Generator | Turn Photos into Cartoon Portraits"
- Description: "Create viral ChatGPT-style caricature portraits from your photos. Upload any face photo and choose from 6 unique AI caricature styles including classic, 3D cartoon, chibi, comic, and pop art."
- Canonical: `https://chatgptcaricature.pro/chatgpt-caricature`

#### 2.2.4 定价页 `/pricing`

保持原有定价页面框架，更新内容（详见 3.1 定价方案）。

#### 2.2.5 Gallery 页 `/showcases`

保持原有 Showcases 页面，展示用户生成的漫画肖像作品。

#### 2.2.6 其他保留页面

- `/privacy-policy` — 隐私政策（已更新品牌名和域名）
- `/terms-of-service` — 服务条款（已更新品牌名和域名）
- `/settings/*` — 用户设置
- `/activity/*` — 用户活动
- `/admin/*` — 管理后台
- `/sign-in`、`/sign-up` — 登录注册

#### 2.2.7 重定向页面

| 原路径 | 行为 |
|--------|------|
| `/ai-image-generator` | 301 重定向到 `/create` |

#### 2.2.8 已删除页面

| 页面 | 原功能 | 删除原因 |
|------|--------|---------|
| `/ai-music-generator` | AI 音乐生成 | 不在产品范围内 |
| `/ai-video-generator` | AI 视频生成 | 不在产品范围内 |
| `/hairstyles` | AI 发型试戴 | 不在产品范围内 |

---

### 2.3 导航结构

#### 2.3.1 顶部导航

| 菜单项 | 链接 | 图标 |
|--------|------|------|
| Create | `/create` | Zap |
| Pricing | `/pricing` | DollarSign |
| Gallery | `/showcases` | Box |

品牌名: "AI Caricature Generator"

#### 2.3.2 底部导航

**Product 栏目**: Create Caricature, Pricing, Gallery, FAQ

**Styles 栏目**: Classic Caricature, 3D Cartoon, Chibi Style, Pop Art, ChatGPT Caricature（链接到 SEO 页）

**Friend Links 栏目**: 外部友链（保持原有）

---

## 3. 商业需求

### 3.1 定价方案

每张漫画消耗 **20 credits**。

| 方案 | 价格 | Credits | 约等于漫画张数 | 有效期 | 类型 | product_id |
|------|------|---------|---------------|--------|------|------------|
| Credits Pack | $4.9 (一次性) | 400 | ~20 张 | 1 年 | one-time | `credits-package` |
| Starter Plan | $9.9/月 | 500/月 | ~25 张/月 | 30 天 | monthly | `starter-monthly` |
| Premium Plan | $59.9/年 | 6000/年 | ~300 张/年 | 1 年 | yearly | `premium-yearly` |

**Features 文案**（每个方案均包含）:
- X credits (约 Y 张漫画)
- All 6 caricature styles
- High-quality AI caricature generation
- Free download of all caricatures
- 有效期 / Cancel anytime

### 3.2 Credits 消耗规则

| 操作 | 消耗 |
|------|------|
| 生成漫画肖像（image-to-image） | 20 credits |

> 注：原系统中 text-to-image 消耗 5 credits，但在 CaricatureGenerator 中不提供 text-to-image 模式。原 ImageGenerator 仍保留在代码中供 API 兼容。

---

## 4. SEO 需求

### 4.1 Sitemap

| URL | Priority | changeFrequency |
|-----|----------|----------------|
| `/` | 1.0 | weekly |
| `/chatgpt-caricature` | 0.9 | weekly |
| `/create` | 0.8 | weekly |
| `/pricing` | 0.8 | weekly |
| `/showcases` | 0.8 | weekly |
| `/privacy-policy` | 0.8 | weekly |
| `/terms-of-service` | 0.8 | weekly |

### 4.2 全局 Metadata

- **Title**: "ChatGPT Caricature | AI Caricature Generator - Turn Photos into Cartoon Portraits"
- **Description**: "Transform your photos into fun AI caricature portraits. Choose from 6 unique styles including classic caricature, 3D cartoon, chibi, pop art and more. The viral ChatGPT caricature trend."

### 4.3 关键词策略

主关键词: `chatgpt caricature`, `ai caricature generator`, `caricature portrait`, `cartoon portrait`

长尾关键词: `chatgpt caricature style`, `ai cartoon portrait generator`, `turn photo into caricature`, `3d cartoon portrait`, `chibi portrait generator`, `pop art portrait`

---

## 5. 品牌替换清单

所有代码和配置中的旧品牌引用需替换为新品牌：

| 旧值 | 新值 | 涉及范围 |
|------|------|---------|
| `Z Image Turbo` | `ChatGPT Caricature` | 全局品牌名 |
| `zimageturbo.site` | `chatgptcaricature.pro` | 域名引用 |
| `AI Image Generator` | `AI Caricature Generator` | 功能描述 |
| `http://localhost:3000` | `https://chatgptcaricature.pro` | 默认 app_url |

**涉及的文件**:

| 文件 | 替换内容 |
|------|---------|
| `src/config/index.ts` | `app_name` 默认值, `app_url` 默认值 |
| `.env.example` | `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_APP_NAME` |
| `src/config/locale/messages/en/common.json` | metadata title/description |
| `src/config/locale/messages/en/landing.json` | 全部品牌相关文案 |
| `src/config/locale/messages/en/pricing.json` | 全部品牌相关文案 |
| `src/config/locale/messages/en/pages/create.json` | metadata + page 文案 |
| `src/themes/default/blocks/hero.tsx` | 渐变标题判断字符串 |
| `src/shared/blocks/common/built-with.tsx` | 链接和文案 |
| `src/shared/services/settings.ts` | Plausible 域名 placeholder |
| `src/config/locale/messages/zh/landing.json` | 友链 utm_source |
| `content/pages/privacy-policy.mdx` | 域名 + 品牌名 |
| `content/pages/privacy-policy.zh.mdx` | 域名 + 品牌名 |
| `content/pages/terms-of-service.mdx` | 域名 + 品牌名 |
| `content/pages/terms-of-service.zh.mdx` | 域名 + 品牌名 |

---

## 6. i18n 消息配置

### 6.1 消息文件加载路径

**文件**: `src/config/locale/index.ts` 中 `localeMessagesPaths` 数组。

**保留的路径**:
```
common, landing, showcases, blog, pricing,
settings/sidebar, settings/profile, settings/security, settings/billing,
settings/payments, settings/credits, settings/apikeys,
admin/sidebar, admin/users, admin/roles, admin/permissions,
admin/categories, admin/posts, admin/prompts, admin/payments,
admin/subscriptions, admin/credits, admin/settings, admin/apikeys,
admin/ai-tasks, admin/chats, admin/showcases,
ai/image, ai/caricature,
activity/sidebar, activity/ai-tasks, activity/chats,
pages/create
```

**已移除的路径**: `ai/music`, `ai/chat`, `ai/video`, `hairstyles`

### 6.2 新增消息文件

**文件路径**: `src/config/locale/messages/en/ai/caricature.json`

**命名空间**: `ai.caricature`

**主要 Key**:

```
ai.caricature.metadata.title / description
ai.caricature.page.title / description
ai.caricature.generator.title
ai.caricature.generator.select_style
ai.caricature.generator.upload_photo / upload_photo_hint / upload_error
ai.caricature.generator.optional_details
ai.caricature.generator.job_title / job_title_placeholder
ai.caricature.generator.hobbies / hobbies_placeholder
ai.caricature.generator.personality / personality_placeholder
ai.caricature.generator.additional_details / additional_details_placeholder
ai.caricature.generator.generate
ai.caricature.generator.generating / loading / checking_account
ai.caricature.generator.sign_in_to_generate
ai.caricature.generator.credits_cost / credits_remaining / buy_credits
ai.caricature.generator.progress
ai.caricature.generator.result_title
ai.caricature.generator.no_images_generated / upload_and_generate_hint
ai.caricature.generator.failed_to_load_image
ai.caricature.generator.status_pending / status_processing / status_success / status_failed
ai.caricature.generator.timeout_error / no_results_error / generation_failed / query_failed
ai.caricature.generator.no_providers_error / insufficient_credits / upload_photo_first
ai.caricature.generator.success_message / download_success / download_failed
```

---

## 7. 技术架构

### 7.1 新增文件

| 文件路径 | 说明 |
|---------|------|
| `src/shared/blocks/generator/caricature-styles.ts` | 6 种漫画风格预设定义 |
| `src/shared/blocks/generator/caricature.tsx` | CaricatureGenerator 组件 |
| `src/config/locale/messages/en/ai/caricature.json` | i18n 消息 |
| `src/app/[locale]/(landing)/(ai)/chatgpt-caricature/page.tsx` | SEO 着陆页 |
| `public/imgs/caricature-styles/*.png` | 风格缩略图（6 张） |

### 7.2 修改文件

| 文件路径 | 修改内容 |
|---------|---------|
| `src/shared/blocks/generator/index.tsx` | 添加 `export * from './caricature'` |
| `src/config/locale/index.ts` | 添加 `ai/caricature` 路径，移除 `ai/music`, `ai/chat`, `ai/video`, `hairstyles` |
| `src/app/[locale]/(landing)/page.tsx` | ImageGenerator → CaricatureGenerator，更新 hero 配置 |
| `src/app/[locale]/(landing)/create/page.tsx` | ImageGenerator → CaricatureGenerator，移除 promptKey |
| `src/themes/default/blocks/hero.tsx` | 渐变标题匹配 "ChatGPT Caricature" |
| `src/app/[locale]/(landing)/(ai)/ai-image-generator/page.tsx` | 改为 redirect 到 `/create` |
| `src/app/sitemap.ts` | 添加 `/chatgpt-caricature`，移除旧路由 |
| `src/config/index.ts` | app_name, app_url 默认值 |
| `.env.example` | URL 和 APP_NAME |
| 各 i18n JSON 文件 | 品牌文案更新 |
| 各 MDX 法律文档 | 域名和品牌名更新 |
| `src/shared/blocks/common/built-with.tsx` | 域名和品牌名 |
| `src/shared/services/settings.ts` | Plausible 域名 placeholder |

### 7.3 删除文件/目录

| 路径 | 原功能 |
|------|--------|
| `src/app/[locale]/(landing)/(ai)/ai-music-generator/` | AI 音乐生成页面 |
| `src/app/[locale]/(landing)/(ai)/ai-video-generator/` | AI 视频生成页面 |
| `src/app/[locale]/(landing)/hairstyles/` | 发型试戴页面 |

### 7.4 保留但不使用的代码

以下代码保留在代码库中，不主动删除，保持 API 兼容性：

- `src/shared/blocks/generator/image.tsx` — 原 ImageGenerator 组件
- `src/shared/blocks/generator/music.tsx` — 原 MusicGenerator 组件
- `src/shared/blocks/generator/video.tsx` — 原 VideoGenerator 组件
- `src/config/locale/messages/en/ai/image.json` — 原图片生成 i18n
- `src/config/locale/messages/en/ai/music.json` — 原音乐生成 i18n
- `src/config/locale/messages/en/ai/video.json` — 原视频生成 i18n
- `src/config/locale/messages/en/hairstyles.json` — 原发型 i18n
- `src/app/api/ai/generate/route.ts` — API 路由（支持所有 mediaType）
- `src/app/api/hairstyles/` — 发型 API（无前端页面调用）

---

## 8. 视觉资源需求

### 8.1 风格缩略图

需要 6 张风格缩略图，用于风格选择卡片的视觉展示。

| 文件名 | 尺寸建议 | 内容描述 |
|--------|---------|---------|
| `public/imgs/caricature-styles/classic.png` | 200x200px | 经典大头漫画肖像示例 |
| `public/imgs/caricature-styles/job.png` | 200x200px | 职业漫画肖像示例（穿职业装） |
| `public/imgs/caricature-styles/3d-cartoon.png` | 200x200px | 3D 卡通风格示例（Pixar 风） |
| `public/imgs/caricature-styles/comic.png` | 200x200px | 漫画书风格示例 |
| `public/imgs/caricature-styles/chibi.png` | 200x200px | Q 版可爱风格示例 |
| `public/imgs/caricature-styles/pop-art.png` | 200x200px | 波普艺术风格示例 |

### 8.2 品牌 Logo

| 文件 | 用途 | 状态 |
|------|------|------|
| `public/logo.png` | 网站 Logo（导航栏、页脚） | 待更新 |
| `public/preview.png` | OG Image（社交分享预览图） | 待更新 |

### 8.3 Showcase 种子数据

首页和 Gallery 页需要展示漫画肖像示例。当前复用了原有的 showcase 图片（`/imgs/showcases/*.jpeg`），建议替换为真实的 AI 漫画肖像作品。

---

## 9. 验证与测试

### 9.1 构建验证

```bash
pnpm build    # 必须无报错通过
```

### 9.2 页面功能验证

| 测试项 | 验证内容 |
|--------|---------|
| 首页渲染 | Hero 标题显示 "ChatGPT / Caricature"（渐变），CaricatureGenerator 正常渲染 |
| 风格选择 | 6 种风格卡片可点击切换，选中态有视觉反馈 |
| 照片上传 | 单张上传、压缩、上传到服务器，状态跟踪正常 |
| 个性化输入 | Job Title / Hobbies / Personality 输入正常反映到 Prompt |
| 生成流程 | 上传照片 → 选风格 → 点击 Create → 进度条 → 结果展示 |
| 下载功能 | 点击下载按钮，图片正确下载 |
| Credits 系统 | 显示消耗 20 credits，余额不足时提示并引导购买 |
| 未登录状态 | 点击生成弹出登录框 |
| `/create` 页面 | CaricatureGenerator 正常渲染 |
| `/chatgpt-caricature` 页面 | SEO 页面包含 Generator + Gallery + FAQ |
| `/pricing` 页面 | 显示 3 个方案，价格和 credits 数正确 |
| `/showcases` 页面 | Gallery 正常展示 |
| `/ai-image-generator` | 自动重定向到 `/create` |
| 已删除页面 | `/ai-music-generator`、`/ai-video-generator`、`/hairstyles` 返回 404 |

### 9.3 SEO 验证

| 测试项 | 验证内容 |
|--------|---------|
| Sitemap | 访问 `/sitemap.xml`，确认包含 7 个 URL，`/chatgpt-caricature` priority 0.9 |
| Metadata | 首页 title 包含 "ChatGPT Caricature" |
| OG Tags | `/chatgpt-caricature` 页面有正确的 OpenGraph 标签 |
| Canonical | `/chatgpt-caricature` 页面有 canonical URL |

### 9.4 品牌一致性验证

确认以下位置不再出现 "Z Image Turbo" 或 "zimageturbo.site"：
- 页面标题和描述
- 导航栏品牌名
- 页脚品牌名和描述
- FAQ 问答内容
- 定价页面
- 隐私政策和服务条款
- Sitemap

---

## 10. 实施优先级与进度

> **整体代码进度: ~90%** | Phase 1~5 已完成，Phase 6 视觉资源待完成
> **最后更新**: 2026-02-08

```
Phase 1: 核心组件（CaricatureGenerator + 风格预设 + i18n）    ✅ 已完成
Phase 2: 品牌重塑（Landing Page + Hero + 全局 Metadata）     ✅ 已完成
Phase 3: 删减功能（删除音乐/视频/发型页面 + 重定向）         ✅ 已完成
Phase 4: 定价调整（pricing.json 更新）                       ✅ 已完成
Phase 5: SEO 优化（/chatgpt-caricature 页面 + Sitemap）      ✅ 已完成
Phase 6: 视觉资源（风格缩略图 + Logo + Showcase 种子数据）    ❌ 未完成
```

### 10.1 Phase 1 详细进度：核心组件 ✅

| 任务 | 状态 | 文件 |
|------|------|------|
| CaricatureGenerator 组件 | ✅ 完成 | `src/shared/blocks/generator/caricature.tsx`（新建） |
| 6 种漫画风格预设定义 | ✅ 完成 | `src/shared/blocks/generator/caricature-styles.ts`（新建） |
| i18n 消息文件 | ✅ 完成 | `src/config/locale/messages/en/ai/caricature.json`（新建） |
| Generator 模块导出 | ✅ 完成 | `src/shared/blocks/generator/index.tsx`（添加 export） |
| locale 路径配置 | ✅ 完成 | `src/config/locale/index.ts`（添加 `ai/caricature`，移除 `ai/music`, `ai/chat`, `ai/video`, `hairstyles`） |

### 10.2 Phase 2 详细进度：品牌重塑 ✅

| 任务 | 状态 | 文件 |
|------|------|------|
| 首页 ImageGenerator → CaricatureGenerator | ✅ 完成 | `src/app/[locale]/(landing)/page.tsx` |
| Hero 渐变标题匹配 "ChatGPT Caricature" | ✅ 完成 | `src/themes/default/blocks/hero.tsx` |
| 全局 Metadata (title/description) | ✅ 完成 | `src/config/locale/messages/en/common.json` |
| Landing 全部品牌文案 | ✅ 完成 | `src/config/locale/messages/en/landing.json` |
| app_name / app_url 默认值 | ✅ 完成 | `src/config/index.ts` |
| .env.example 示例值 | ✅ 完成 | `.env.example` |
| built-with 组件品牌 | ✅ 完成 | `src/shared/blocks/common/built-with.tsx` |
| Plausible 域名 placeholder | ✅ 完成 | `src/shared/services/settings.ts` |
| 隐私政策 (en) | ✅ 完成 | `content/pages/privacy-policy.mdx` |
| 隐私政策 (zh) | ✅ 完成 | `content/pages/privacy-policy.zh.mdx` |
| 服务条款 (en) | ✅ 完成 | `content/pages/terms-of-service.mdx` |
| 服务条款 (zh) | ✅ 完成 | `content/pages/terms-of-service.zh.mdx` |
| zh landing 友链 utm_source | ✅ 完成 | `src/config/locale/messages/zh/landing.json` |

### 10.3 Phase 3 详细进度：删减功能 ✅

| 任务 | 状态 | 文件 |
|------|------|------|
| 删除 ai-music-generator 页面 | ✅ 完成 | `src/app/[locale]/(landing)/(ai)/ai-music-generator/page.tsx`（已删除） |
| 删除 ai-video-generator 页面 | ✅ 完成 | `src/app/[locale]/(landing)/(ai)/ai-video-generator/page.tsx`（已删除） |
| 删除 hairstyles 页面 | ✅ 完成 | `src/app/[locale]/(landing)/hairstyles/`（2 个文件已删除） |
| /ai-image-generator → 301 重定向 /create | ✅ 完成 | `src/app/[locale]/(landing)/(ai)/ai-image-generator/page.tsx` |

### 10.4 Phase 4 详细进度：定价调整 ✅

| 任务 | 状态 | 文件 |
|------|------|------|
| pricing.json 品牌文案与方案更新 | ✅ 完成 | `src/config/locale/messages/en/pricing.json` |
| create 页面 metadata 与文案 | ✅ 完成 | `src/config/locale/messages/en/pages/create.json` |

### 10.5 Phase 5 详细进度：SEO 优化 ✅

| 任务 | 状态 | 文件 |
|------|------|------|
| /chatgpt-caricature SEO 着陆页 | ✅ 完成 | `src/app/[locale]/(landing)/(ai)/chatgpt-caricature/page.tsx`（新建） |
| Sitemap 更新 | ✅ 完成 | `src/app/sitemap.ts`（添加 `/chatgpt-caricature`，移除旧路由） |

### 10.6 Phase 6 详细进度：视觉资源 ❌

| 任务 | 状态 | 说明 |
|------|------|------|
| classic.png 缩略图 | ❌ 缺失 | `public/imgs/caricature-styles/classic.png` |
| job.png 缩略图 | ❌ 缺失 | `public/imgs/caricature-styles/job.png` |
| 3d-cartoon.png 缩略图 | ❌ 缺失 | `public/imgs/caricature-styles/3d-cartoon.png` |
| comic.png 缩略图 | ❌ 缺失 | `public/imgs/caricature-styles/comic.png` |
| chibi.png 缩略图 | ❌ 缺失 | `public/imgs/caricature-styles/chibi.png` |
| pop-art.png 缩略图 | ❌ 缺失 | `public/imgs/caricature-styles/pop-art.png` |
| Logo 更新 | ❌ 待更新 | `public/logo.png`（当前仍为旧 Logo） |
| OG 预览图更新 | ❌ 待更新 | `public/preview.png`（当前仍为旧预览图） |
| Showcase 种子数据 | ❌ 待替换 | `public/imgs/showcases/` 下仍为旧图片 |

### 10.7 构建验证

| 检查项 | 状态 |
|--------|------|
| `pnpm build` 无报错通过 | ✅ 通过 |

---

## 附录 A: Hero 渐变标题实现

`src/themes/default/blocks/hero.tsx` 中对标题 `'ChatGPT Caricature'` 做特殊渲染：

```tsx
<h1 className="flex flex-col items-center justify-center ...">
  <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 bg-clip-text text-transparent ...">
    ChatGPT
  </span>
  <span className="text-foreground ...">
    Caricature
  </span>
</h1>
```

"ChatGPT" 使用紫-品红-琥珀渐变色，"Caricature" 使用前景色。

## 附录 B: 环境变量

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `NEXT_PUBLIC_APP_URL` | 应用 URL | `https://chatgptcaricature.pro` |
| `NEXT_PUBLIC_APP_NAME` | 应用名称 | `ChatGPT Caricature` |
| `DATABASE_URL` | PostgreSQL 连接字符串 | — |
| `AUTH_SECRET` | better-auth 密钥 | `openssl rand -base64 32` |

## 附录 C: 完整 FAQ 内容

1. **What is a ChatGPT Caricature?** — A ChatGPT Caricature is a viral AI art trend where advanced AI models transform your photo into a fun, exaggerated cartoon portrait. Our tool makes this easy with 6 unique styles to choose from.

2. **How does the AI Caricature Generator work?** — Simply upload a clear face photo, select one of our 6 caricature styles (Classic, Job, 3D Cartoon, Comic, Chibi, or Pop Art), optionally add your job title or hobbies, and click Create. The AI analyzes your photo and generates a personalized caricature in seconds.

3. **What photo works best for caricatures?** — A clear, well-lit face photo works best. Front-facing portraits with good lighting will give the most accurate and fun caricature results. Avoid group photos or images where the face is obscured.

4. **How much does it cost?** — Each caricature costs 20 credits. You can start with our Credits Pack at $4.9 for 400 credits (20 caricatures), or subscribe to our monthly plan at $9.9/month for 500 credits (25 caricatures/month).

5. **Can I use my caricature for commercial purposes?** — Yes, you own the rights to your generated caricatures. You can use them for social media profiles, business cards, gifts, merchandise, and more.

6. **What caricature styles are available?** — We offer 6 styles: Classic Caricature (traditional big-head style), Job Caricature (with profession elements), 3D Cartoon (Pixar/Disney style), Comic Style (superhero comic look), Chibi (cute anime style), and Pop Art (Andy Warhol inspired).

7. **How is this different from other AI image generators?** — Unlike generic AI image generators, our tool is specifically designed for caricature portraits. We use optimized prompts and specialized styles that produce the best caricature results from your photos, similar to the trending ChatGPT caricature style.
