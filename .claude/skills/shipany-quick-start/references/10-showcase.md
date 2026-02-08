# Step 10 — Showcase Gallery Component

## Goal

Add a showcase gallery to display example images/outputs with prompts, enabling users to quickly try prompts or copy them.

## When to Use

Use the showcase component when:
- You have a generator/tool page where users create content
- You want to display example outputs to inspire users
- You want users to quickly try pre-made prompts

## Files to Update

For each locale, add the `showcase` section to your page JSON:
- `src/config/locale/messages/en/pages/<your-page>.json`
- `src/config/locale/messages/zh/pages/<your-page>.json`

## JSON Structure

```json
{
  "showcase": {
    "enabled": true,
    "tag": "model-tag",
    "title": "Gallery Title",
    "description": "Explore stunning images created with this tool.",
    "labels": {
      "tryIt": "Try It Now",
      "copyPrompt": "Copy Prompt",
      "copied": "Copied!",
      "noItems": "No showcases yet"
    }
  }
}
```

## Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `enabled` | Yes | `true` to show, `false` to hide |
| `tag` | Yes | Database filter tag (e.g., `"z-image"`, `"gpt-image"`) |
| `title` | Yes | Section heading |
| `description` | Yes | Subtitle text |
| `labels.tryIt` | Yes | "Try It Now" button text |
| `labels.copyPrompt` | Yes | "Copy" button text |
| `labels.copied` | Yes | Success feedback text |
| `labels.noItems` | Yes | Empty state text |

## Example Configurations

### English (EN)

```json
{
  "showcase": {
    "enabled": true,
    "tag": "gpt-image",
    "title": "GPT Image Gallery",
    "description": "Explore stunning images created with GPT Image 1.5 AI.",
    "labels": {
      "tryIt": "Try It Now",
      "copyPrompt": "Copy Prompt",
      "copied": "Copied!",
      "noItems": "No showcases yet"
    }
  }
}
```

### Chinese (ZH)

```json
{
  "showcase": {
    "enabled": true,
    "tag": "gpt-image",
    "title": "GPT Image 作品展示",
    "description": "探索使用 GPT Image 1.5 AI 创作的精彩图像。",
    "labels": {
      "tryIt": "立即试用",
      "copyPrompt": "复制提示词",
      "copied": "已复制!",
      "noItems": "暂无展示内容"
    }
  }
}
```

## Technical Details

### Component Communication

The showcase uses CustomEvent for same-page communication:
- "Try It Now" dispatches `showcase-try-prompt` event with `{ prompt: string }`
- The generator component listens and fills the prompt input
- No URL parameters needed

### Database Schema

Showcases are stored in the `showcases` table:
- `img_url`: Generated image URL
- `prompt`: The prompt text
- `tag`: Category tag for filtering

### Page Placement

For optimal UX, place showcase **directly below** the generator:

```
[Hero/Generator Section]
[Showcase Gallery]        ← Immediate access to example prompts
[Features]
[FAQ]
[CTA]
```

## Checklist

- [ ] Add `showcase` section to EN page JSON
- [ ] Add `showcase` section to ZH page JSON
- [ ] Set correct `tag` matching database entries
- [ ] Set `enabled: true` when showcase data is ready
- [ ] Verify showcase data exists in database
