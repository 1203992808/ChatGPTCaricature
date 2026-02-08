---
description: 生成作者简介页面
argument-hint: [author-name]
---

为博客作者生成专业的作者简介页面。包含 E-E-A-T 要素、社交媒体链接、专业背景和作品展示，并优化 Schema.org 标记。

## 参数

- `$1` 或 `$ARGUMENTS`: 作者姓名

## 包含内容

- 作者专业背景
- 领域经验和成就
- 联系方式
- 社交媒体链接
- 代表作品列表
- 专业认证

## 使用示例

```bash
/author-bio "张三"
```

为"张三"生成完整的作者简介页面，包括 HTML 代码和 Schema 标记。

## 相关命令

- `/ee-audit` - E-E-A-T 审计
- `/structured-data` - 添加 Person Schema
