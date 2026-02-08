---
description: 支柱页面（Pillar Pages）分析和生成
argument-hint: [topic] [--analyze]
---

分析和生成支柱页面策略。识别现有的支柱页面、评估支柱页面的完整性、建议需要创建的支柱页面、生成支柱页面大纲、建议关联的集群内容。

## 参数

- `$1` 或 `--topic`: 指定主题（可选）
- `--analyze`: 分析现有支柱页面

## 支柱页面要素

- 全面覆盖主题的综述
- 内部链接到相关子话题
- 清晰的章节结构
- 多媒体内容嵌入
- FAQ 部分（针对 Featured Snippets）

## 使用示例

```bash
/pillar-pages --analyze
```

分析现有支柱页面的完整性和质量。

```bash
/pillar-pages "emergency plumbing"
```

为指定主题生成支柱页面大纲和策略。

## 相关命令

- `/topic-clusters` - 集群内容分析
- `/content-strategy` - 内容策略分析
