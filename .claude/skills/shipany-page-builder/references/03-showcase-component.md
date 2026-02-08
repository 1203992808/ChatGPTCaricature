# Showcase Component Integration

## Overview

The Showcase component displays a gallery of example images with prompts, allowing users to:
- View example images created with a specific model/tool
- Copy prompts to clipboard
- Click "Try It Now" to automatically fill the prompt in the generator

## JSON Configuration

Add a `showcase` section to your page JSON file:

```json
{
  "showcase": {
    "enabled": true,
    "tag": "your-model-tag",
    "title": "Gallery Title",
    "description": "Gallery description text.",
    "labels": {
      "tryIt": "Try It Now",
      "copyPrompt": "Copy Prompt",
      "copied": "Copied!",
      "noItems": "No showcases yet"
    }
  }
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `enabled` | boolean | Set to `true` to display the showcase section |
| `tag` | string | Filter tag to fetch showcases from database (e.g., `"z-image"`, `"gpt-image"`) |
| `title` | string | Section title displayed above the gallery |
| `description` | string | Subtitle/description text |
| `labels.tryIt` | string | Button text for trying the prompt |
| `labels.copyPrompt` | string | Button text for copying prompt |
| `labels.copied` | string | Text shown after copying |
| `labels.noItems` | string | Text shown when no showcases exist |

## Database Integration

Showcases are fetched from the `showcases` table filtered by the `tag` field. Each showcase item contains:
- `img_url`: URL of the generated image
- `prompt`: The prompt used to generate the image
- `tag`: Category tag matching the JSON config

## Component Behavior

### "Try It Now" Button
- Dispatches a `showcase-try-prompt` CustomEvent with the prompt
- The hero-generator component listens for this event and fills the prompt input
- No URL parameters are used (same-page communication)

### "Copy Prompt" Button
- Copies the prompt text to clipboard
- Shows "Copied!" feedback temporarily

## Placement

The showcase section should be placed **directly below** the hero-generator component for optimal UX:

```
[Hero Generator Section]
[Showcase Gallery Section] ← Users can quickly try prompts
[Features Section]
[FAQ Section]
[CTA Section]
```

## Multi-locale Support

Create the showcase configuration in each locale file:

- `src/config/locale/messages/en/pages/<slug>.json`
- `src/config/locale/messages/zh/pages/<slug>.json`

### Chinese Example

```json
{
  "showcase": {
    "enabled": true,
    "tag": "z-image",
    "title": "Z-Image 作品展示",
    "description": "探索使用 Z-Image AI 创作的精彩图像。",
    "labels": {
      "tryIt": "立即试用",
      "copyPrompt": "复制提示词",
      "copied": "已复制!",
      "noItems": "暂无展示内容"
    }
  }
}
```

## Quick Setup Checklist

1. Add `showcase` section to page JSON (both locales)
2. Set `enabled: true`
3. Set appropriate `tag` matching your database entries
4. Customize `title`, `description`, and `labels`
5. Ensure showcase data exists in database with matching tag
