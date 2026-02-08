---
description: 创建、管理和执行自定义工作流，支持多步骤任务编排、并行执行和条件触发
argument-hint: <action> [--workflow <workflow-name>] [--file <workflow-file>] [--trigger <trigger-type>]
options:
  - action: 操作类型（create, execute, list, status, delete）
  - workflow: 工作流名称
  - file: 工作流定义文件（YAML/JSON）
  - trigger: 触发方式（schedule, event, manual, api）
examples:
  - /workflow-automation create --workflow comprehensive-geo --file workflow.yaml
  - /workflow-automation execute --workflow weekly-audit
  - /workflow-automation list --status active
  - /workflow-automation status --workflow comprehensive-geo
---

## 完整实现

### 工作流定义

工作流是多个任务的有序编排，支持：
- **顺序执行** - 任务按定义顺序依次执行
- **并行执行** - 多个任务同时执行
- **条件分支** - 根据条件执行不同路径
- **错误处理** - 失败重试和回滚
- **数据传递** - 任务间传递数据

### 工作流结构

```yaml
name: "comprehensive-geo-workflow"
description: "完整的 GEO 优化工作流"
version: "1.0.0"
author: "SEO Team"
created: "2024-02-15"

# 触发器配置
triggers:
  - type: "schedule"
    cron: "0 9 * * 1"  # 每周一上午 9:00
    enabled: true

  - type: "event"
    event: "competitor-surpassed"
    enabled: true

  - type: "manual"
    enabled: true

# 全局变量
variables:
  domain: "yoursite.com"
  competitors: "comp1.com,comp2.com,comp3.com"
  team_email: "seo-team@company.com"
  slack_channel: "#seo-alerts"

# 全局配置
config:
  timeout: 3600  # 总超时时间（秒）
  retry_on_failure: true
  max_retries: 3
  parallel_tasks: 5
  notify_on_complete: true

# 工作流步骤
steps:
  # 第一步：内容审计
  - id: audit
    name: "GEO 内容审计"
    description: "对网站进行全面的内容审计"
    command: "/geo-content-audit"
    params:
      domain: "{{variables.domain}}"
      detailed: true
    timeout: 300
    retry: 3
    on_success: citation-monitor
    on_failure: notify-error
    continue_on_failure: false

  # 第二步：引用监控
  - id: citation-monitor
    name: "AI 引用监控"
    description: "监控 AI 搜索引擎的引用情况"
    command: "/geo-citation-monitor"
    params:
      url: "https://{{variables.domain}}"
      period: 7
    timeout: 180
    retry: 2
    depends_on: audit
    on_success: competitor-compare
    on_failure: notify-error

  # 第三步：竞争对手对比
  - id: competitor-compare
    name: "竞争对手对比"
    description: "对比分析竞争对手表现"
    command: "/geo-competitor-compare"
    params:
      you: "{{variables.domain}}"
      competitors: "{{variables.competitors}}"
    timeout: 240
    retry: 2
    depends_on: citation-monitor
    on_success: generate-report
    on_failure: notify-error

  # 第四步：生成报告（并行）
  - id: generate-report
    name: "生成综合报告"
    description: "生成多格式 GEO 综合报告"
    parallel:
      # 子步骤 4a：执行摘要
      - id: exec-summary
        name: "生成执行摘要"
        command: "/generate-report"
        params:
          type: "executive-summary"
          domain: "{{variables.domain}}"
          period: 30
          format: "pdf"
        timeout: 120
        on_complete: send-report

      # 子步骤 4b：技术分析
      - id: tech-analysis
        name: "生成技术分析"
        command: "/generate-report"
        params:
          type: "technical-analysis"
          domain: "{{variables.domain}}"
          format: "html"
          include-charts: true
        timeout: 180
        on_complete: send-report

      # 子步骤 4c：交互式报告
      - id: interactive-report
        name: "生成交互式报告"
        command: "/generate-report"
        params:
          type: "geo-comprehensive"
          domain: "{{variables.domain}}"
          period: 30
          format: "html"
          interactive: true
        timeout: 150
        on_complete: send-report

  # 第五步：发送报告
  - id: send-report
    name: "发送报告给团队"
    description: "通过邮件发送生成的报告"
    action: "send_email"
    params:
      to: "{{variables.team_email}}"
      subject: "📊 GEO 综合报告 - {{date}}"
      body: |
        亲爱的团队，

        附件是最新的 GEO 综合报告，包含以下内容：

        1. 执行摘要（PDF）
        2. 技术分析（HTML）
        3. 交互式报告（HTML）

        主要发现：
        - 整体 GEO 评分：72/100
        - AI 引用次数：677（+45%）
        - 行业排名：Top 10%

        请查看附件了解详情。

        祝好，
        SEO Assistant
      attachments:
        - "{{steps.exec-summary.output}}"
        - "{{steps.tech-analysis.output}}"
        - "{{steps.interactive-report.output}}"
    timeout: 60
    depends_on: generate-report
    on_success: notify-success
    on_failure: notify-error

  # 错误处理
  - id: notify-error
    name: "发送错误通知"
    description: "工作流执行失败时发送通知"
    action: "send_slack"
    params:
      channel: "{{variables.slack_channel}}"
      message: |
        ❌ 工作流执行失败

        工作流：{{workflow.name}}
        失败步骤：{{failed_step.name}}
        错误信息：{{error.message}}
        时间：{{timestamp}}

        请立即检查！
      priority: "high"

  # 成功通知
  - id: notify-success
    name: "发送成功通知"
    description: "工作流执行成功时发送通知"
    action: "send_slack"
    params:
      channel: "{{variables.slack_channel}}"
      message: |
        ✅ 工作流执行成功

        工作流：{{workflow.name}}
        执行时间：{{duration}}
        生成报告：{{report_count}}
        时间：{{timestamp}}
      priority: "info"

# 工作流输出
output:
  format: "json"
  path: ".claude-flow/cache/workflows/{{workflow.name}}/{{timestamp}}.json"
  include:
    - execution_summary
    - step_outputs
    - alerts
    - metrics
```

## 工作流类型

### 1. 顺序工作流

任务按定义的顺序依次执行：

```yaml
name: "sequential-content-audit"
steps:
  - id: step1
    name: "第一步"
    command: "/command1"
    on_success: step2

  - id: step2
    name: "第二步"
    command: "/command2"
    depends_on: step1
    on_success: step3

  - id: step3
    name: "第三步"
    command: "/command3"
    depends_on: step2
```

### 2. 并行工作流

多个任务同时执行：

```yaml
name: "parallel-content-audit"
steps:
  - id: parallel-audit
    parallel:
      - id: blog-audit
        name: "审计博客文章"
        command: "/geo-content-audit"
        params:
          path: "/blog"

      - id: product-audit
        name: "审计产品页面"
        command: "/geo-content-audit"
        params:
          path: "/products"

      - id: case-audit
        name: "审计案例研究"
        command: "/geo-content-audit"
        params:
          path: "/case-studies"

    # 所有并行任务完成后继续
    on_complete: aggregate-results
```

### 3. 条件工作流

根据条件执行不同路径：

```yaml
name: "conditional-workflow"
steps:
  - id: check-score
    name: "检查 GEO 评分"
    action: "check_condition"
    params:
      condition: "geo-score < 70"

    # 如果评分 < 70
    on_true: optimize-content

    # 如果评分 >= 70
    on_false: generate-report

  - id: optimize-content
    name: "优化内容"
    command: "/optimize-content"
    condition: "{{check-score.result}} == true"

  - id: generate-report
    name: "生成报告"
    command: "/generate-report"
    condition: "{{check-score.result}} == false"
```

### 4. 循环工作流

重复执行任务直到满足条件：

```yaml
name: "iterative-optimization"
steps:
  - id: optimize-loop
    name: "迭代优化循环"
    loop:
      max_iterations: 5
      until: "geo-score >= 85"

      steps:
        - id: audit
          name: "审计内容"
          command: "/geo-content-audit"

        - id: optimize
          name: "优化内容"
          command: "/optimize-content"
          depends_on: audit

        - id: check
          name: "检查是否达标"
          action: "check_score"
          target: 85
```

## 使用示例

### 创建工作流

```bash
# 从文件创建工作流
/workflow-automation create \
  --workflow comprehensive-geo \
  --file workflow.yaml

# 从模板创建工作流
/workflow-automation create \
  --workflow weekly-audit \
  --template weekly-audit
```

### 执行工作流

```bash
# 立即执行工作流
/workflow-automation execute --workflow comprehensive-geo

# 带参数执行
/workflow-automation execute \
  --workflow comprehensive-geo \
  --params domain=test.com,competitors=comp1.com

# 后台执行
/workflow-automation execute \
  --workflow comprehensive-geo \
  --background
```

### 管理工作流

```bash
# 列出所有工作流
/workflow-automation list

# 列出活跃工作流
/workflow-automation list --status active

# 查看工作流状态
/workflow-automation status --workflow comprehensive-geo

# 查看工作流执行历史
/workflow-automation history --workflow comprehensive-geo --limit 10

# 删除工作流
/workflow-automation delete --workflow old-workflow
```

## 输出格式

### 工作流创建输出

```markdown
# ✅ 工作流创建成功

**工作流名称：** comprehensive-geo
**版本：** 1.0.0
**创建时间：** 2024-02-15 15:30

## 工作流配置

### 基本信息
- **描述：** 完整的 GEO 优化工作流
- **作者：** SEO Team
- **步骤数量：** 7 个
- **预计耗时：** ~20 分钟

### 触发器
1. 🕐 定时触发：每周一上午 9:00
2. 🎯 事件触发：竞争对手超越
3. 🖱️ 手动触发：支持

### 执行步骤
1. GEO 内容审计
2. AI 引用监控
3. 竞争对手对比
4. 生成报告（并行 3 个子任务）
5. 发送报告

### 错误处理
- ✅ 失败重试：最多 3 次
- ✅ 错误通知：Slack + 邮件
- ✅ 继续执行：否（遇到错误停止）

### 通知配置
- ✅ 成功通知：Slack #seo-reports
- 🔴 失败通知：Slack #seo-critical + 邮件

## 保存位置
`.claude-flow/cache/workflows/comprehensive-geo/workflow.yaml`

## 立即执行
```bash
/workflow-automation execute --workflow comprehensive-geo
```

## 监控执行
实时监控：
```
http://localhost:3000/workflows/comprehensive-geo
```

---

**创建时间：** 2024-02-15 15:30
**状态：** 🟢 已启用
```

### 工作流状态输出

```markdown
# 📊 工作流状态：comprehensive-geo

## 基本信息
- **名称：** comprehensive-geo
- **版本：** 1.0.0
- **状态：** 🟢 运行中
- **创建时间：** 2024-02-15 15:30

## 当前执行
- **执行ID：** exec-20240215-153000
- **开始时间：** 2024-02-15 15:30
- **当前步骤：** generate-report
- **进度：** 60% (3/5 完成)
- **耗时：** 12 分钟

## 步骤执行情况
| 步骤 | 状态 | 耗时 | 输出 |
|------|------|------|------|
| audit | ✅ | 4:45 | report-001.json |
| citation-monitor | ✅ | 2:48 | 677 citations |
| competitor-compare | ✅ | 3:52 | ranked #1 |
| generate-report | 🔄 | - | - |
| send-report | ⏳ | - | - |

## 下次执行
- **调度时间：** 2024-02-22 09:00
- **触发方式：** 定时触发
- **倒计时：** 6 天 17 小时

## 执行统计
- **总执行次数：** 12
- **成功次数：** 11 (92%)
- **失败次数：** 1 (8%)
- **平均耗时：** 18 分钟

## 最近执行历史
| 执行ID | 时间 | 状态 | 耗时 |
|--------|------|------|------|
| exec-20240215 | 15:30 | 🔄 | - |
| exec-20240208 | 09:00 | ✅ | 17:23 |
| exec-20240201 | 09:00 | ✅ | 18:45 |
| exec-20240125 | 09:00 | ❌ | - |

## 管理操作
- 停止：`/workflow-automation stop --workflow comprehensive-geo`
- 重启：`/workflow-automation restart --workflow comprehensive-geo`
- 查看：`/workflow-automation logs --workflow comprehensive-geo`

---

**查询时间：** 2024-02-15 15:42
**数据来源：** 工作流执行引擎
```

## 工作流模板

### 快速启动模板

**模板名称：** `quick-start-workflow`

```yaml
name: "quick-start"
description: "快速启动工作流模板"
version: "1.0.0"

triggers:
  - type: "manual"
    enabled: true

variables:
  domain: "your-domain.com"

steps:
  - id: audit
    name: "快速审计"
    command: "/geo-content-audit"
    params:
      domain: "{{variables.domain}}"
    timeout: 180

  - id: report
    name: "生成报告"
    command: "/generate-report"
    params:
      type: "executive-summary"
      domain: "{{variables.domain}}"
    timeout: 120
```

### 每周审计模板

**模板名称：** `weekly-audit-template`

```yaml
name: "weekly-audit"
description: "每周 GEO 审计工作流"
version: "1.0.0"

triggers:
  - type: "schedule"
    cron: "0 9 * * 1"
    enabled: true

steps:
  - id: audit
    name: "内容审计"
    command: "/geo-content-audit"
    timeout: 300

  - id: monitor
    name: "引用监控"
    command: "/geo-citation-monitor"
    timeout: 180

  - id: report
    name: "生成报告"
    command: "/generate-report"
    timeout: 120
```

## 工作流变量

### 全局变量

```yaml
variables:
  # 域名配置
  domain: "yoursite.com"
  base_url: "https://{{domain}}"

  # 竞争对手
  competitors:
    - "comp1.com"
    - "comp2.com"
    - "comp3.com"

  # 团队信息
  team_email: "seo-team@company.com"
  slack_channel: "#seo-alerts"

  # API 密钥
  openai_key: "{{OPENAI_API_KEY}}"
  anthropic_key: "{{ANTHROPIC_API_KEY}}"

  # 文件路径
  output_dir: ".claude-flow/cache/reports"
  log_dir: ".claude-flow/cache/logs"
```

### 变量引用

在步骤中引用变量：

```yaml
steps:
  - id: audit
    name: "审计 {{variables.domain}}"
    command: "/geo-content-audit"
    params:
      domain: "{{variables.domain}}"      # yoursite.com
      url: "{{variables.base_url}}"       # https://yoursite.com
      competitors: "{{variables.competitors}}"  # ["comp1.com", "comp2.com"]
```

## 数据存储

### 工作流配置

```
.claude-flow/cache/workflows/
├── comprehensive-geo/
│   ├── workflow.yaml          # 工作流定义
│   ├── config.json            # 配置文件
│   └── variables.json         # 变量文件
└── weekly-audit/
    ├── workflow.yaml
    ├── config.json
    └── variables.json
```

### 执行历史

```
.claude-flow/cache/history/workflows/
├── comprehensive-geo/
│   ├── exec-20240215-153000.json
│   ├── exec-20240208-090000.json
│   └── exec-20240201-090000.json
└── weekly-audit/
    ├── exec-20240215.json
    └── exec-20240208.json
```

### 执行日志

```
.claude-flow/cache/logs/workflows/
├── comprehensive-geo/
│   ├── 2024-02-15.log
│   └── 2024-02-08.log
└── weekly-audit/
    ├── 2024-02-15.log
    └── 2024-02-08.log
```

## 相关命令

- `/geo-automation` - 自动化任务配置
- `/generate-report` - 生成各类报告
- Phase 1 GEO 命令（审计、监控、对比）
- Phase 3 报告命令（生成报告）

## 最佳实践

### 工作流设计原则

1. **单一职责** - 每个工作流专注一个目标
2. **步骤精简** - 避免过多步骤（建议 <10 个）
3. **错误处理** - 配置失败重试和错误通知
4. **超时设置** - 为每个步骤设置合理超时
5. **数据传递** - 使用变量在步骤间传递数据

### 性能优化

1. **并行执行** - 独立任务使用并行执行
2. **超时控制** - 避免任务无限等待
3. **资源限制** - 控制并行任务数量
4. **增量处理** - 只处理变化的数据

### 错误处理

1. **重试策略** - 失败任务自动重试（最多 3 次）
2. **继续执行** - 非关键任务失败后继续
3. **回滚机制** - 失败后自动回滚
4. **详细日志** - 记录所有执行日志

---

**命令版本：** 1.0.0
**最后更新：** 2024-02-15
**维护者：** automation-coordinator skill
