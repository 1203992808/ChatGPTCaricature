---
description: 生成 AI 搜索可见性综合报告，包含所有引擎的详细数据、趋势分析和可视化图表。
argument-hint: <domain> [--period <days>] [--format <markdown|html|json>]
options:
  - period: 报告周期（天），默认 30
  - format: 报告格式（markdown, html, json）
examples:
  - /geo-visibility-report --domain "yoursite.com"
  - /geo-visibility-report --domain "yoursite.com" --period 90
  - /geo-visibility-report --domain "yoursite.com" --period 30 --format html
---

## 功能说明

### 核心功能
**AI 搜索可见性综合报告**从所有监控数据源收集信息，整合历史数据，计算趋势和增长率，生成包含表格、图表和对比分析的综合报告。

### 使用场景
- 生成月度 GEO 表现报告
- 为管理层创建可视化报告
- 导出数据用于进一步分析
- 与团队分享 GEO 优化成果

## 输出示例

### Markdown 格式（默认）

```markdown
# 📊 AI 搜索可见性月度报告

**域名：** yoursite.com
**报告周期：** 2024-01-15 至 2024-02-15
**报告类型：** 综合分析报告
**生成时间：** 2024-02-15 10:30

---

## 执行摘要

### 关键发现
✅ **整体可见性提升 45%**（所有引擎平均）
✅ **Claude 引用率达到行业 Top 10%**
⚠️ **Google SGE 表现需要改进**

### 月度目标完成情况
- [x] ChatGPT 可见性目标（68/65）✅
- [x] Claude 可见性目标（75/70）✅
- [ ] Perplexity 可见性目标（70/75）❌
- [ ] Google SGE 可见性目标（55/65）❌

---

## 详细分析

### ChatGPT 表现
**引用次数：** 234 次（+18% vs 上月）
**平均排名：** 4.2
**引用率：** 68/100

**顶级引用内容：**
1. "AI SEO Complete Guide" - 45 次引用 ⭐
2. "ChatGPT Prompts for SEO" - 38 次引用
3. "GEO Best Practices" - 32 次引用

**改进机会：**
- 🎯 添加更多案例研究（+15% 预期）
- 🎯 更新统计数据（+10% 预期）

### Claude 表现
**引用次数：** 189 次（+22% vs 上月）
**平均排名：** 3.8
**引用率：** 75/100 ⭐

**顶级引用内容：**
1. "GEO vs Traditional SEO" - 42 次引用 ⭐
2. "LLM-Friendly Content Structure" - 35 次引用
3. "AI Citation Optimization" - 28 次引用

### Perplexity 表现
**引用次数：** 156 次（+15% vs 上月）
**平均排名：** 4.5
**引用率：** 70/100

**内容类型表现：**
- 指南教程：85% 引用率
- 案例分析：72% 引用率
- 对比分析：68% 引用率

### Google SGE 表现
**引用次数：** 98 次（稳定）
**平均排名：** 7.2
**引用率：** 55/100 ⚠️

**问题诊断：**
- ❌ 缺少结构化数据
- ❌ 内容更新频率低
- ❌ E-E-A-T 信号不足

**修复建议：**
🔴 **立即执行**
1. 添加 Schema.org 标记（+20% 预期）
2. 更新内容时间戳（+10% 预期）
3. 增加引用来源（+15% 预期）

---

## 竞争对手对比

### AI 搜索可见性对比
| 网站 | ChatGPT | Claude | Perplexity | Google SGE | 总分 | 排名 |
|------|---------|--------|------------|------------|------|------|
| 你们 | 68 | 75 | 70 | 55 | 268 | #1 |
| Competitor A | 45 | 52 | 48 | 62 | 207 | #2 |
| Competitor B | 38 | 41 | 35 | 48 | 162 | #3 |

---

## 内容优化建议

### 高优先级优化（预期 +20-30% 引用率）
**页面：** "AI SEO Complete Guide"
**当前评分：** 58/100
**目标评分：** 85/100

**需要优化：**
1. ✅ 添加作者 Schema（JSON-LD）
2. ✅ 增加引用来源（10+ 权威来源）
3. ✅ 更新数据（2024 年最新统计）
4. ✅ 优化内容结构（更短的段落）
5. ✅ 添加 FAQ Schema

---

## 行动计划

### Week 1-2: 紧急修复
- [ ] 优化 Google SGE 表现
- [ ] 更新 10 个核心页面
- [ ] 增加引用来源

### Week 3-4: 内容优化
- [ ] 优化高优先级页面
- [ ] 创建 5 个新页面（高引用潜力）

### Month 2: 扩展优化
- [ ] 建立 AI 搜索监控体系
- [ ] 优化内部链接网络

---

## 预期成果

### 30 天预期
**ChatGPT 可见性：** 68 → 78 (+15%)
**Claude 可见性：** 75 → 82 (+9%)
**Perplexity 可见性：** 70 → 78 (+11%)
**Google SGE 可见性：** 55 → 70 (+27%)

**流量增长：** +35-40%（来自 AI 搜索）

---

**报告生成：** 2024-02-15
**下次报告：** 2024-03-15
**负责人：** SEO Team
```

## 使用示例

```bash
# 生成 30 天报告（Markdown）
/geo-visibility-report --domain "yoursite.com"

# 生成 90 天报告
/geo-visibility-report --domain "yoursite.com" --period 90

# 生成 HTML 报告
/geo-visibility-report --domain "yoursite.com" --format html

# 生成 JSON 数据
/geo-visibility-report --domain "yoursite.com" --format json
```

## 相关命令
- `/geo-citation-monitor` - 监控引用数据
- `/geo-competitor-compare` - 竞争对手对比
- `/generate-report` - 生成其他类型报告
