---
description: 配置和管理 GEO 自动化任务，包括定期审计、报告生成、竞争对手监控和智能告警
argument-hint: <action> [--task <task-name>] [--schedule <cron>] [--alerts <notification-methods>]
options:
  - action: 操作类型（enable, disable, status, configure）
  - task: 任务名称（weekly-audit, monthly-report, competitor-monitor, content-update-reminder）
  - schedule: Cron 表达式（默认：每周一 9:00）
  - alerts: 告警方式（email, slack, sms, webhook）
examples:
  - /geo-automation enable --task weekly-audit --schedule "0 9 * * 1" --alerts email,slack
  - /geo-automation configure --task monthly-report --alerts email
  - /geo-automation status --task weekly-audit
  - /geo-automation disable --task competitor-monitor
---

## 完整实现

### 命令执行流程

```markdown
# GEO 自动化配置执行流程

## 步骤 1: 参数解析和验证
输入：action, task, schedule, alerts
处理：
- 验证操作类型
- 检查任务名称
- 验证 cron 表达式
- 检查告警配置
输出：配置对象

## 步骤 2: 任务配置
根据 action 执行：
- enable: 启用自动化任务
- disable: 禁用任务
- status: 查看任务状态
- configure: 修改任务配置

## 步骤 3: 工作流生成
生成任务执行流程：
- 定义步骤
- 设置依赖
- 配置重试
- 设置超时

## 步骤 4: 告警规则配置
配置告警：
- 设置触发条件
- 配置通知方式
- 定义优先级
- 创建告警模板

## 步骤 5: 保存配置
保存到：.claude-flow/cache/config/automation/task-name.json
返回：配置确认和状态
```

## 可用任务类型

### 1. weekly-audit（每周 GEO 审计）

**描述：** 每周自动执行完整的 GEO 审计并生成报告

**默认调度：** 每周一上午 9:00 (`0 9 * * 1`)

**任务步骤：**
```yaml
task: weekly-audit
schedule: "0 9 * * 1"  # 每周一 9:00
enabled: true
timezone: "Asia/Shanghai"

steps:
  - id: scan-content
    name: "扫描网站内容"
    command: "/geo-content-audit"
    params:
      domain: "{{domain}}"
      detailed: true
    timeout: 300
    retry: 3

  - id: monitor-citations
    name: "监控 AI 引用"
    command: "/geo-citation-monitor"
    params:
      url: "https://{{domain}}"
      period: 7
    timeout: 180
    retry: 2

  - id: compare-competitors
    name: "对比竞争对手"
    command: "/geo-competitor-compare"
    params:
      you: "{{domain}}"
      competitors: "{{competitors}}"
    timeout: 240
    retry: 2

  - id: generate-report
    name: "生成综合报告"
    command: "/generate-report"
    params:
      type: "geo-comprehensive"
      domain: "{{domain}}"
      period: 7
      format: "html"
      interactive: true
      include-charts: true
    timeout: 120
```

**告警规则：**
```yaml
alerts:
  - condition: "citation-drop > 10%"
    priority: "critical"
    actions:
      - type: "email"
        to: ["seo-manager@company.com"]
        subject: "🚨 紧急：AI 引用严重下降"

      - type: "slack"
        channel: "#seo-critical"
        message: "AI 引用 7 天内下降超过 10%"

  - condition: "score < 70"
    priority: "high"
    actions:
      - type: "slack"
        channel: "#seo-alerts"
        message: "GEO 评分低于 70，需要优化"

  - condition: "competitor-surpassed"
    priority: "warning"
    actions:
      - type: "email"
        to: "seo-team@company.com"
        subject: "⚠️ 竞争对手超越警告"
```

### 2. monthly-report（每月报告生成）

**描述：** 每月自动生成执行摘要和技术分析报告

**默认调度：** 每月1日上午 8:00 (`0 8 1 * *`)

**任务步骤：**
```yaml
task: monthly-report
schedule: "0 8 1 * *"  # 每月1日 8:00
enabled: true

steps:
  - id: collect-data
    name: "收集月度数据"
    action: "collect_metrics"
    params:
      period: 30
      metrics:
        - citations
        - rankings
        - traffic
        - competitors
    timeout: 300

  - id: exec-summary
    name: "生成执行摘要"
    command: "/generate-report"
    params:
      type: "executive-summary"
      domain: "{{domain}}"
      period: 30
      format: "pdf"
    timeout: 120

  - id: tech-analysis
    name: "生成技术分析"
    command: "/generate-report"
    params:
      type: "technical-analysis"
      domain: "{{domain}}"
      format: "html"
      include-charts: true
    timeout: 180

  - id: send-reports
    name: "发送报告"
    action: "send_email"
    params:
      to: "{{team_email}}"
      subject: "月度 GEO 报告 - {{month}} {{year}}"
      body: "请查看附件中的月度 GEO 报告"
      attachments:
        - "executive-summary-{{date}}.pdf"
        - "technical-analysis-{{date}}.html"
    timeout: 60
```

### 3. competitor-monitor（竞争对手监控）

**描述：** 每天监控竞争对手动态，识别快速追赶者

**默认调度：** 每天上午 10:00 (`0 10 * * *`)

**任务步骤：**
```yaml
task: competitor-monitor
schedule: "0 10 * * *"  # 每天 10:00
enabled: true

steps:
  - id: detect-new
    name: "检测新竞争对手"
    action: "detect_new_competitors"
    params:
      keywords: "{{target_keywords}}"
      threshold: "top-20"
    timeout: 180

  - id: track-changes
    name: "跟踪对手变化"
    action: "track_competitor_changes"
    params:
      competitors: "{{competitor_list}}"
      metrics:
        - new-content
        - ranking-changes
        - backlink-growth
        - citation-growth
    timeout: 240

  - id: identify-fast
    name: "识别快速追赶者"
    action: "identify_fast_movers"
    params:
      growth-rate: "> 20%"
      period: 7
    timeout: 120
```

**告警规则：**
```yaml
alerts:
  - condition: "new-competitor-detected"
    priority: "warning"
    actions:
      - type: "slack"
        channel: "#seo-alerts"
        message: "检测到新竞争对手：{{competitor}}"

  - condition: "competitor-fast-growth"
    priority: "high"
    actions:
      - type: "email"
        to: "seo-manager@company.com"
        subject: "⚠️ 竞争对手快速增长警告"
        message: "{{competitor}} 7 天内增长超过 20%"

  - condition: "competitor-surpassed"
    priority: "critical"
    actions:
      - type: "slack"
        channel: "#seo-critical"
        message: "竞争对手 {{competitor}} 已超越我们的排名！"

      - type: "email"
        to: ["seo-manager@company.com", "cto@company.com"]
        subject: "🚨 紧急：被竞争对手超越"

      - type: "create-task"
        priority: "urgent"
        title: "分析并应对竞争对手超越"
```

### 4. content-update-reminder（内容更新提醒）

**描述：** 定期检查内容新鲜度，提醒更新过期内容

**默认调度：** 每周一下午 2:00 (`0 14 * * 1`)

**任务步骤：**
```yaml
task: content-update-reminder
schedule: "0 14 * * 1"  # 每周一 14:00
enabled: true

steps:
  - id: find-outdated
    name: "查找过期内容"
    action: "find_outdated_content"
    params:
      domain: "{{domain}}"
      age-threshold: 90  # 天
      priority: "by-impact"
    timeout: 300

  - id: check-freshness
    name: "检查数据新鲜度"
    action: "check_data_freshness"
    params:
      content-type: "statistics"
      max-age: 180
    timeout: 180

  - id: create-plan
    name: "生成更新计划"
    action: "create_update_plan"
    params:
      outdated-pages: "{{outdated_list}}"
      priority: "by-traffic"
    timeout: 120

  - id: send-reminder
    name: "发送提醒"
    action: "send_email"
    params:
      to: "content-team@company.com"
      subject: "📝 内容更新提醒 - {{date}}"
      body: "以下内容需要更新：{{outdated_pages}}"
    timeout: 60
```

**告警规则：**
```yaml
alerts:
  - condition: "content-age > 180 days"
    priority: "info"
    actions:
      - type: "email"
        to: "content-team@company.com"
        subject: "📝 内容更新提醒"
        message: "有 {{count}} 个页面超过 6 个月未更新"

  - condition: "critical-content-stale"
    priority: "high"
    actions:
      - type: "slack"
        channel: "#content-alerts"
        message: "高价值内容已过期，需要立即更新"
```

## 使用示例

### 基础用法

```bash
# 启用每周 GEO 审计
/geo-automation enable --task weekly-audit

# 查看任务状态
/geo-automation status --task weekly-audit

# 禁用竞争对手监控
/geo-automation disable --task competitor-monitor
```

### 高级配置

```bash
# 自定义调度时间（每周三下午 3 点）
/geo-automation enable \
  --task weekly-audit \
  --schedule "0 15 * * 3" \
  --alerts email,slack

# 配置每月报告
/geo-automation configure \
  --task monthly-report \
  --schedule "0 8 1 * *" \
  --alerts email

# 仅邮件告警
/geo-automation enable \
  --task weekly-audit \
  --alerts email

# Slack + 邮件告警
/geo-automation enable \
  --task competitor-monitor \
  --alerts slack,email
```

## 输出格式

### 任务启用输出

```markdown
# ✅ 自动化任务已启用

**任务名称：** weekly-audit
**调度时间：** 每周一上午 9:00
**下次执行：** 2024-02-22 09:00

## 任务配置

### 执行步骤
1. ✅ 扫描网站内容（/geo-content-audit）
2. ✅ 监控 AI 引用（/geo-citation-monitor）
3. ✅ 对比竞争对手（/geo-competitor-compare）
4. ✅ 生成综合报告（/generate-report）

### 告警规则
- 🔴 AI 引用下降 >10% → 邮件 + Slack
- 🟡 GEO 评分 <70 → Slack
- 🟢 竞争对手超越 → 邮件

### 配置文件
`.claude-flow/cache/config/automation/weekly-audit.json`

### 执行历史
查看执行历史：
```bash
/geo-automation history --task weekly-audit
```

### 监控仪表盘
实时监控：
```
http://localhost:3000/automation/weekly-audit
```

---

**配置时间：** 2024-02-15 14:30
**配置人：** SEO Team
**状态：** 🟢 运行中
```

### 任务状态输出

```markdown
# 📊 任务状态：weekly-audit

## 基本信息
- **任务名称：** weekly-audit
- **状态：** 🟢 运行中
- **调度：** 每周一上午 9:00
- **下次执行：** 2024-02-22 09:00
- **时区：** Asia/Shanghai

## 执行统计
- **总执行次数：** 24
- **成功次数：** 23 (96%)
- **失败次数：** 1 (4%)
- **平均执行时间：** 845 秒
- **上次执行：** 2024-02-15 09:00
- **上次状态：** ✅ 成功

## 最近执行
| 执行ID | 时间 | 状态 | 耗时 | 告警 |
|--------|------|------|------|------|
| exec-20240215 | 2024-02-15 09:00 | ✅ | 845s | 0 |
| exec-20240208 | 2024-02-08 09:00 | ✅ | 812s | 0 |
| exec-20240201 | 2024-02-01 09:00 | ❌ | - | 1 |

## 告警统计（最近 30 天）
- 🔴 紧急告警：0
- 🟡 警告告警：2
- 🟢 信息告警：24

## 查看详细日志
```bash
/geo-automation logs --task weekly-audit --limit 10
```

## 管理任务
- 禁用：`/geo-automation disable --task weekly-audit`
- 配置：`/geo-automation configure --task weekly-audit`
- 立即执行：`/geo-automation run --task weekly-audit`
```

## Cron 表达式参考

```markdown
# Cron 表达式格式

格式：分 时 日 月 周

示例：

# 每天
0 9 * * *        # 每天上午 9 点
0 */6 * * *      # 每 6 小时

# 每周
0 9 * * 1        # 每周一上午 9 点
0 15 * * 5       # 每周五下午 3 点

# 每月
0 8 1 * *        # 每月1日上午 8 点
0 9 15 * *       # 每月15日上午 9 点

# 特殊时间
@weekly          # 每周（周一 0 点）
@monthly         # 每月（1 日 0 点）
@daily           # 每天（0 点）
@hourly          # 每小时
```

## 告警通知配置

### 邮件配置

```yaml
email:
  enabled: true
  smtp_server: "smtp.gmail.com"
  smtp_port: 587
  username: "your-email@gmail.com"
  password: "{{SMTP_PASSWORD}}"
  from: "SEO Assistant <noreply@company.com>"
  default_recipients:
    - "seo-team@company.com"
    - "manager@company.com"
```

### Slack 配置

```yaml
slack:
  enabled: true
  webhook_url: "{{SLACK_WEBHOOK_URL}}"
  channels:
    critical: "#seo-critical"
    warning: "#seo-alerts"
    info: "#seo-reports"
  username: "GEO Bot"
  icon_emoji: ":robot_face:"
```

### Webhook 配置

```yaml
webhook:
  enabled: true
  url: "{{WEBHOOK_URL}}"
  method: "POST"
  headers:
    Content-Type: "application/json"
    Authorization: "Bearer {{WEBHOOK_TOKEN}}"
  body_template: |
    {
      "alert": "{{alert_type}}",
      "priority": "{{priority}}",
      "message": "{{message}}",
      "timestamp": "{{timestamp}}"
    }
```

## 数据存储

### 配置文件结构

```
.claude-flow/cache/config/automation/
├── weekly-audit.json           # 每周审计配置
├── monthly-report.json         # 每月报告配置
├── competitor-monitor.json     # 竞争对手监控配置
├── content-update-reminder.json # 内容更新提醒配置
└── automation-settings.json    # 全局自动化设置
```

### 执行历史

```
.claude-flow/cache/history/automation/
├── weekly-audit/
│   ├── 2024-02-15.json
│   ├── 2024-02-08.json
│   └── 2024-02-01.json
└── competitor-monitor/
    ├── 2024-02-15.json
    └── 2024-02-14.json
```

### 告警记录

```
.claude-flow/cache/history/alerts/
├── 2024-02-15-critical.json
├── 2024-02-14-warning.json
└── 2024-02-13-info.json
```

## 相关命令

- `/generate-report` - 生成各类报告
- `/geo-content-audit` - GEO 内容审计
- `/geo-citation-monitor` - AI 引用监控
- `/geo-competitor-compare` - 竞争对手对比
- `/workflow-automation` - 工作流编排

## 注意事项

- ⚠️ 首次使用需要配置告警通知（邮件/Slack）
- ⚠️ 确保系统时间正确，影响任务调度
- ⚠️ 任务执行需要足够的系统资源
- ⚠️ 建议在低峰期执行大量任务
- ✅ 支持并行执行多个独立任务
- ✅ 自动重试失败的任务（最多 3 次）
- ✅ 详细的执行日志和错误报告
