---
description: 生成本地商家结构化数据
argument-hint: [business-type] [--validate]
---

生成 LocalBusiness JSON-LD 结构化数据。支持 LocalBusiness 及其子类型（Restaurant, Plumber, Lawyer 等）。

## 参数
- `$1`: 商家类型（默认 LocalBusiness）
- `--validate`: 提供验证工具链接和检查清单

## 包含字段
- @context, @type, name, image, address, geo, url, telephone, openingHoursSpecification, priceRange
