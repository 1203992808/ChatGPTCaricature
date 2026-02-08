---
description: 生成多格式的高级 SEO 和 GEO 分析报告，支持 Markdown、HTML、PDF、JSON 和 Excel 输出
argument-hint: <type> --domain <domain> [--period <days>] [--format <output-format>] [--interactive] [--include-charts]
options:
  - type: 报告类型（executive-summary, technical-analysis, geo-comprehensive, competitive-intelligence）
  - domain: 目标域名
  - period: 报告周期（天），默认 30
  - format: 输出格式（markdown, html, pdf, json, excel），默认 markdown
  - interactive: 生成交互式 HTML 报告
  - include-charts: 包含可视化图表
examples:
  - /generate-report executive-summary --domain yoursite.com --period 90 --format html --interactive
  - /generate-report technical-analysis --domain yoursite.com --format pdf --include-charts
  - /generate-report geo-comprehensive --domain yoursite.com --period 30 --format html --interactive
---

## 完整实现

### 命令执行流程

```markdown
# 高级报告生成执行流程

## 步骤 1: 参数解析和验证
输入：type, domain, period, format, interactive, include-charts
处理：
- 验证域名格式
- 验证报告类型
- 检查数据可用性
输出：配置对象

## 步骤 2: 数据收集和处理
根据报告类型收集数据：
- executive-summary: 关键指标、主要发现、快速获胜
- technical-analysis: 详细技术分析、代码示例
- geo-comprehensive: 全部 GEO 数据、所有引擎
- competitive-intelligence: 竞争对手对比、差距分析

处理：
- 从缓存读取历史数据
- 整合多个数据源
- 计算趋势和增长率
- 准备可视化数据

## 步骤 3: 报告生成
根据 format 参数：
- markdown: < 10s
- html: < 15s（交互式 < 20s）
- pdf: < 20s
- json: < 5s
- excel: < 10s

## 步骤 4: 质量验证
- 数据准确性检查
- 格式一致性验证
- 可视化清晰度检查
- 交互功能测试

## 步骤 5: 报告输出
保存到：.claude-flow/cache/reports/报告ID.格式
返回：报告路径和摘要
```

## 报告类型详解

### 1. Executive Summary（执行摘要）

**特点：**
- 简洁明了（2-3 页）
- 突出关键指标
- 重点关注 ROI
- 可执行建议

**输出示例（Markdown）：**
```markdown
# 📊 GEO 执行摘要报告

**域名：** yoursite.com
**报告周期：** 2024-01-15 至 2024-02-15（90 天）
**报告时间：** 2024-02-15 10:30
**报告类型：** 执行摘要

---

## 🎯 关键指标

### 整体表现
| 指标 | 当前值 | 目标值 | 趋势 | 状态 |
|------|--------|--------|------|------|
| **GEO 评分** | **72/100** | 85/100 | ⬆️ +12 | 🟡 |
| AI 引用次数 | 677 | 800 | ⬆️ +45% | ✅ |
| 行业排名 | Top 10% | Top 5% | ⬆️ +15% | ✅ |
| 月度增长 | +45% | +50% | ⬆️ | 🟢 |

**总体评价：** 表现优秀，接近目标 ✅

---

## 🔍 主要发现

### ✅ 成功亮点
1. **AI 搜索可见性提升 45%**
   - ChatGPT: +18%（234 次引用）
   - Claude: +22%（189 次引用）
   - Perplexity: +15%（156 次引用）

2. **Claude 引用率达到行业 Top 10%**
   - 可见性评分：75/100
   - 排名：#3 / 50 竞争对手
   - 领先优势：+23 分

3. **内容质量显著提升**
   - 数据质量：75/100 → 80/100
   - 内容结构：55/100 → 70/100
   - 实体关系：68/100 → 78/100

### ⚠️ 需要改进
1. **Google SGE 表现落后**
   - 当前：55/100
   - 行业平均：60/100
   - 差距：-5 分
   - **优先级：高**

2. **内容更新频率不足**
   - 当前：每月 4 篇
   - 建议：每周 2 篇
   - **预期影响：** +15%

3. **多媒体内容缺乏**
   - 当前：2 个视频
   - 建议：10 个视频
   - **预期影响：** +8%

---

## 🎯 快速获胜（本月可完成）

### 高优先级（影响 +10 分以上）

#### 1. 优化 Google SGE 表现（+15 分）
**问题：** 缺少结构化数据和频繁更新
**解决方案：**
- ✅ 添加 FAQPage Schema（+5 分）
- ✅ 提高更新频率（+5 分）
- ✅ 增加引用来源（+5 分）

**实施时间：** 2 周
**预期效果：** Google SGE 55 → 70 (+27%)

#### 2. 增加案例研究（+10 分）
**问题：** 案例研究数量不足
**解决方案：**
- ✅ 创建 5 个新案例研究
- ✅ 添加视频版本
- ✅ 优化 SEO 和 GEO

**实施时间：** 3 周
**预期效果：** 引用次数 +20%

### 中优先级（影响 +5-10 分）

#### 3. 提升内容更新频率（+8 分）
**当前：** 每月 4 篇
**目标：** 每周 2 篇（每月 8 篇）
**预期效果：** 新鲜度 +10 分

#### 4. 优化核心内容（+7 分）
**目标页面：**
- AI SEO Complete Guide
- ChatGPT Prompts for SEO
- GEO Best Practices

**预期效果：** 整体可见性 +12%

---

## 📈 预期成果

### 30 天预测
**GEO 评分：** 72 → 80 (+11%)
**AI 引用：** 677 → 850 (+25%)
**行业排名：** Top 10% → Top 7%

### 90 天预测
**GEO 评分：** 72 → 88 (+22%)
**AI 引用：** 677 → 1,200 (+77%)
**行业排名：** Top 10% → Top 5%

**投资回报率（ROI）：**
- 投入：$5,000（内容创作 + 优化）
- 产出：$15,000（流量增长 + 转化提升）
- ROI：**200%**

---

## 📋 行动计划

### Week 1-2: 紧急修复
- [ ] 添加 3 个 FAQ Schema
- [ ] 创建内容更新日历
- [ ] 优化 5 个核心页面

### Week 3-4: 内容扩展
- [ ] 创建 5 个案例研究
- [ ] 制作 3 个视频
- [ ] 增加引用来源

### Month 2-3: 持续优化
- [ ] 每周发布 2 篇内容
- [ ] 定期更新旧内容
- [ ] 监控和调整策略

---

## 🏆 竞争对手对比

| 排名 | 网站 | 总分 | 趋势 |
|------|------|------|------|
| 1 🥇 | **yoursite.com** | **268** | ⬆️ |
| 2 🥈 | comp1.com | 207 | ➡️ |
| 3 🥉 | comp2.com | 162 | ⬇️ |

**竞争地位：** 领先 61 分 ✅

---

**报告生成：** 2024-02-15
**下次审查：** 2024-03-15
**报告文件：** `.claude-flow/cache/reports/executive-summary-20240215.md`
```

### 2. Technical Analysis（技术分析）

**特点：**
- 详细的技术分解
- 6 维度评分分析
- 具体代码示例
- 实施步骤

**输出示例（部分）：**
```markdown
# 🔧 GEO 技术分析报告

**域名：** yoursite.com
**报告周期：** 2024-01-15 至 2024-02-15
**报告类型：** 技术分析

---

## 📊 技术评分总览

| 维度 | 得分 | 满分 | 状态 | 影响 |
|------|------|------|------|------|
| 权威性 | 42/100 | 20 | 🔴 | -15 |
| 实体关系 | 68/100 | 20 | 🟡 | -7 |
| 内容结构 | 55/100 | 20 | 🟡 | -10 |
| 数据质量 | 75/100 | 20 | ✅ | -5 |
| 引用密度 | 60/100 | 10 | 🟡 | -4 |
| 技术优化 | 50/100 | 10 | 🔴 | -5 |

**总分：** 58/100 ⚠️
**目标：** 85/100
**差距：** -27 分

---

## 🔴 权威性分析（42/100）

### 问题诊断

#### 1. 缺少作者 Schema.org 标记（-7 分）
**问题描述：**
- ❌ 页面无作者信息
- ❌ 缺少作者资质
- ❌ 无专业背景展示

**影响：**
- ChatGPT 不信任内容
- Claude 降低引用率
- Google SGE 不展示

**解决方案：**
```html
<!-- 添加到页面 <head> -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "author": {
    "@type": "Person",
    "name": "张三",
    "jobTitle": "高级 SEO 专家",
    "worksFor": {
      "@type": "Organization",
      "name": "Your Company"
    },
    "credential": "Google 认证 SEO 专家，10 年行业经验",
    "sameAs": [
      "https://linkedin.com/in/zhangsan",
      "https://twitter.com/zhangsan"
    ]
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15"
}
</script>
```

**实施步骤：**
1. 收集作者信息（姓名、职位、资质）
2. 创建 LinkedIn 和 Twitter 个人资料
3. 添加 JSON-LD 到所有文章页面
4. 验证标记：https://validator.schema.org/

**预期提升：** +7 分

#### 2. 缺少引用来源标注（-7 分）
**问题描述：**
- ❌ 无引用来源
- ❌ 缺少外部链接
- ❌ 数据无出处

**解决方案：**
```markdown
## 优化前
SEO 是重要的营销策略，可以提高网站排名。

## 优化后
根据 [Google Search Central](https://developers.google.com/search) 的数据，SEO 是重要的营销策略，可以提高网站排名。[SEMrush 2024 报告](https://www.semrush.com/reports/) 显示，优化后的网站平均排名提升 45%。
```

**引用格式标准：**
- 权威来源优先（Google、官方机构）
- 学术研究（论文、报告）
- 行业报告（SEMrush、Ahrefs）
- 新闻媒体（TechCrunch、Wired）

**预期提升：** +7 分

[继续其他技术分析...]
```

### 3. GEO Comprehensive（GEO 综合报告）

**特点：**
- 最全面的 GEO 分析
- 所有引擎详细数据
- 竞争对手深度对比
- 完整的行动计划

**输出示例（结构）：**
```markdown
# 🤖 GEO 综合报告

[包含执行摘要 + 所有引擎详细分析 + 竞争对手对比 + 趋势分析 + 完整行动计划]
```

### 4. Competitive Intelligence（竞争情报）

**特点：**
- 5 维度竞争分析
- 差距识别
- 超越策略
- ROI 预测

**输出示例（结构）：**
```markdown
# 🔍 竞争情报深度报告

[包含所有竞争对手对比 + 差距分析 + 快速获胜 + 超越路线图]
```

## 可视化图表

### 包含图表类型

当使用 `--include-charts` 参数时，报告会包含：

1. **折线图** - 展示 30/90 天趋势
2. **柱状图** - 引擎对比、竞争对手对比
3. **饼图** - 内容类型分布、引用来源分布
4. **热力图** - 关键词机会分析
5. **漏斗图** - 内容转化漏斗

### 图表生成示例

```markdown
## AI 引用趋势（30 天）

**数据来源：** .claude-flow/cache/history/geo/citations.json
**图表类型：** 折线图

```
引用次数
250 │                         ●
    │                     ●
    │                 ●
200 │             ●
    │         ●
    │     ●
150 │ ●
    │
    │
100 │
    │
    │
 50 │
    │
  0 └────────────────────────────
    D1  D5  D10 D15 D20 D25 D30

ChatGPT ─●─●─●─●─●─●─●─●─●─●─ (增长 +18%)
Claude ────●─●─●─●─●─●─●─●─ (增长 +22%)
Perplexity ──●─●─●─●─●─●─●─ (增长 +15%)
Google SGE ─●─●─●─●─●─●─ (稳定)
```

**关键洞察：**
- Claude 增长最快（+22%）
- Google SGE 需要优化
- 整体趋势向上 ✅
```

## HTML 交互式报告

### 交互功能

当使用 `--interactive` 参数时，生成 HTML 报告包含：

1. **可展开章节** - 点击展开/收起详细内容
2. **数据筛选** - 按引擎、时间、类型筛选
3. **数据钻取** - 点击数据查看详情
4. **动态图表** - Chart.js 实现的交互式图表
5. **导出功能** - 导出为 PDF、Excel

### HTML 报告结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GEO 报告 - yoursite.com</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <div class="container">
        <!-- 导航栏 -->
        <nav class="navbar">
            <a href="#summary">执行摘要</a>
            <a href="#engines">引擎表现</a>
            <a href="#competitors">竞争对手</a>
            <a href="#recommendations">优化建议</a>
        </nav>

        <!-- 头部 -->
        <header class="header">
            <h1>🤖 GEO 综合报告</h1>
            <p>域名：yoursite.com | 报告周期：2024-01-15 至 2024-02-15</p>
        </header>

        <!-- 关键指标卡片 -->
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-icon">📊</div>
                <h3>GEO 评分</h3>
                <div class="metric-value">72/100</div>
                <div class="metric-trend up">⬆️ +12</div>
            </div>
            <!-- 更多指标卡片 -->
        </div>

        <!-- 可视化图表 -->
        <section class="charts-section">
            <h2>📈 引用趋势</h2>
            <div class="chart-container">
                <canvas id="trendChart"></canvas>
            </div>
        </section>

        <!-- 可展开章节 -->
        <section class="collapsible-section">
            <button class="collapsible" onclick="toggleSection(this)">
                <span>▼</span> ChatGPT 详细分析
            </button>
            <div class="collapsible-content">
                <!-- 详细内容 -->
            </div>
        </section>

        <!-- 数据表格 -->
        <section class="data-table">
            <h2>📊 引擎表现对比</h2>
            <table>
                <thead>
                    <tr>
                        <th>引擎</th>
                        <th>可见性</th>
                        <th>引用次数</th>
                        <th>趋势</th>
                        <th>排名</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ChatGPT</td>
                        <td>68/100</td>
                        <td>234</td>
                        <td class="trend-up">⬆️ +18%</td>
                        <td>Top 5</td>
                    </tr>
                    <!-- 更多行 -->
                </tbody>
            </table>
        </section>

        <!-- 导出按钮 -->
        <div class="export-buttons">
            <button onclick="exportPDF()">📄 导出 PDF</button>
            <button onclick="exportExcel()">📊 导出 Excel</button>
            <button onclick="printReport()">🖨️ 打印报告</button>
        </div>
    </div>

    <script>
        // Chart.js 图表初始化
        const trendChart = new Chart(document.getElementById('trendChart'), {
            type: 'line',
            data: {
                labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
                datasets: [{
                    label: 'ChatGPT',
                    data: [156, 168, 175, 182, 195, 210, 234],
                    borderColor: '#00FF00',
                    backgroundColor: 'rgba(0, 255, 0, 0.1)',
                    tension: 0.4
                }, {
                    label: 'Claude',
                    data: [120, 135, 148, 155, 168, 178, 189],
                    borderColor: '#FF6B6B',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });

        // 可展开章节交互
        function toggleSection(button) {
            button.classList.toggle('active');
            const content = button.nextElementSibling;
            const icon = button.querySelector('span');

            if (content.style.display === 'block') {
                content.style.display = 'none';
                icon.textContent = '▼';
            } else {
                content.style.display = 'block';
                icon.textContent = '▲';
            }
        }

        // 导出功能
        function exportPDF() {
            window.print();
        }

        function exportExcel() {
            // 使用 SheetJS 或类似库导出 Excel
            alert('Excel 导出功能开发中');
        }

        function printReport() {
            window.print();
        }
    </script>
</body>
</html>
```

## 使用示例

### 基础用法

```bash
# 生成执行摘要（Markdown）
/generate-report executive-summary --domain yoursite.com

# 生成技术分析报告
/generate-report technical-analysis --domain yoursite.com

# 生成 GEO 综合报告
/generate-report geo-comprehensive --domain yoursite.com --period 90

# 生成竞争情报报告
/generate-report competitive-intelligence --domain yoursite.com
```

### 高级选项

```bash
# 生成 HTML 交互式报告
/generate-report geo-comprehensive --domain yoursite.com --format html --interactive

# 生成包含图表的 PDF 报告
/generate-report executive-summary --domain yoursite.com --format pdf --include-charts

# 生成 JSON 数据（用于 API 集成）
/generate-report geo-comprehensive --domain yoursite.com --format json

# 完整配置（90 天 + HTML + 交互式 + 图表）
/generate-report geo-comprehensive \
  --domain yoursite.com \
  --period 90 \
  --format html \
  --interactive \
  --include-charts
```

## 输出文件位置

所有生成的报告保存在：
```
.claude-flow/cache/reports/
├── executive-summary-20240215.md
├── technical-analysis-20240215.html
├── geo-comprehensive-20240215.pdf
├── competitive-intelligence-20240215.json
└── geo-comprehensive-20240215.xlsx
```

## 相关命令

- `/geo-visibility-report` - GEO 可见性报告（Phase 1）
- `/geo-citation-monitor` - AI 引用监控（Phase 1）
- `/competitor-intel` - 竞争情报分析（Phase 2）
- `/geo-audit` - GEO 内容审计（Phase 1）

## 注意事项

- PDF 生成需要额外配置（wkhtmltopdf 或 Puppeteer）
- Excel 生成需要 SheetJS 库
- HTML 报告需要 Chart.js CDN 连接
- JSON 输出可用于自动化集成
- 大型报告（>100 页）可能需要更长生成时间
