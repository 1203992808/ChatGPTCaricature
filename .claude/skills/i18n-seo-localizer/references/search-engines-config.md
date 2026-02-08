# Search Engines Configuration

Market-specific search engine configuration for keyword research and validation.

## Core Principle

> **Different markets use different search engines. Always validate keywords on the search engine users actually use.**

## Search Engine by Market

| Locale | Market | Primary Engine | Market Share | Trends Tool | URL Pattern |
|--------|--------|---------------|--------------|-------------|-------------|
| **zh** | 🇨🇳 中国大陆 | **百度 (Baidu)** | 70% | 百度指数 | baidu.com |
| **zh-TW** | 🇹🇼 台湾 | **Google** | 90% | Google Trends | google.com.tw |
| **zh-HK** | 🇭🇰 香港 | **Google** | 85% | Google Trends | google.com.hk |
| **ja** | 🇯🇵 日本 | **Google** | 75% | Google Trends | google.co.jp |
| **ko** | 🇰🇷 韩国 | **Naver** | 60% | Naver DataLab | naver.com |
| **ru** | 🇷🇺 俄罗斯 | **Yandex** | 55% | Yandex Wordstat | yandex.ru |
| **de** | 🇩🇪 德国 | **Google** | 95% | Google Trends | google.de |
| **fr** | 🇫🇷 法国 | **Google** | 92% | Google Trends | google.fr |
| **es** | 🇪🇸 西班牙 | **Google** | 95% | Google Trends | google.es |
| **pt** | 🇧🇷 巴西 | **Google** | 95% | Google Trends | google.com.br |
| **it** | 🇮🇹 意大利 | **Google** | 95% | Google Trends | google.it |
| **ar** | 🇸🇦 沙特阿拉伯 | **Google** | 95% | Google Trends | google.com.sa |
| **id** | 🇮🇩 印尼 | **Google** | 97% | Google Trends | google.co.id |
| **hi** | 🇮🇳 印度 | **Google** | 95% | Google Trends | google.co.in |

---

## Market-Specific Configurations

### 🇨🇳 China Mainland (zh)

**Primary Engine: 百度 (Baidu)**

```json
{
  "locale": "zh",
  "market": "中国大陆",
  "primaryEngine": {
    "name": "Baidu",
    "url": "baidu.com",
    "marketShare": 70,
    "searchPattern": "https://www.baidu.com/s?wd={keyword}",
    "siteOperator": "site:"
  },
  "trendsTools": {
    "primary": {
      "name": "百度指数 (Baidu Index)",
      "url": "https://index.baidu.com/v2/index.html",
      "description": "Most reliable search trends data for China",
      "access": "Free with Baidu account"
    }
  },
  "notes": [
    "❌ Google is NOT accessible in China mainland",
    "❌ google.com.cn does NOT exist",
    "✅ MUST use Baidu for all keyword research",
    "✅ Baidu Index is the equivalent of Google Trends",
    "⚠️ Baidu search results include many ads (first 5-8 results)",
    "⚠️ Baidu result counts are estimates, less accurate than Google"
  ]
}
```

**Validation Workflow:**
1. **Search:** Use baidu.com for WebSearch validation
2. **Autocomplete:** Baidu dropdown suggestions
3. **Trends:** Use 百度指数 (Baidu Index) instead of Google Trends
4. **Related Searches:** Check page bottom "相关搜索"

---

### 🇹🇼 Taiwan (zh-TW)

**Primary Engine: Google**

```json
{
  "locale": "zh-TW",
  "market": "台湾",
  "primaryEngine": {
    "name": "Google",
    "url": "google.com.tw",
    "marketShare": 90,
    "searchPattern": "https://www.google.com.tw/search?q={keyword}&gl=tw&hl=zh-TW"
  },
  "trendsTools": {
    "primary": {
      "name": "Google Trends",
      "url": "https://trends.google.com/trends/?geo=TW",
      "geoCode": "TW"
    }
  }
}
```

---

### 🇰🇷 Korea (ko)

**Primary Engine: Naver (60%), Secondary: Google (30%)**

```json
{
  "locale": "ko",
  "market": "韩国",
  "primaryEngine": {
    "name": "Naver",
    "url": "naver.com",
    "marketShare": 60,
    "searchPattern": "https://search.naver.com/search.naver?query={keyword}",
    "siteOperator": "site:"
  },
  "secondaryEngine": {
    "name": "Google",
    "url": "google.co.kr",
    "marketShare": 30,
    "searchPattern": "https://www.google.co.kr/search?q={keyword}&gl=kr&hl=ko"
  },
  "trendsTools": {
    "primary": {
      "name": "Naver DataLab",
      "url": "https://datalab.naver.com/keyword/trendSearch.naver",
      "description": "Most accurate for Korean market"
    },
    "secondary": {
      "name": "Google Trends",
      "geoCode": "KR"
    }
  },
  "notes": [
    "✅ Naver is dominant, prioritize Naver keyword research",
    "✅ Use Naver DataLab for trend validation",
    "⚠️ SEO strategies differ between Naver and Google",
    "Consider validating on both engines for comprehensive coverage"
  ]
}
```

---

### 🇷🇺 Russia (ru)

**Primary Engine: Yandex (55%), Secondary: Google (40%)**

```json
{
  "locale": "ru",
  "market": "俄罗斯",
  "primaryEngine": {
    "name": "Yandex",
    "url": "yandex.ru",
    "marketShare": 55,
    "searchPattern": "https://yandex.ru/search/?text={keyword}",
    "siteOperator": "site:"
  },
  "secondaryEngine": {
    "name": "Google",
    "url": "google.ru",
    "marketShare": 40
  },
  "trendsTools": {
    "primary": {
      "name": "Yandex Wordstat",
      "url": "https://wordstat.yandex.ru/",
      "description": "Keyword statistics for Yandex"
    },
    "secondary": {
      "name": "Google Trends",
      "geoCode": "RU"
    }
  },
  "notes": [
    "✅ Market is split between Yandex and Google",
    "✅ Validate on both engines when possible",
    "Yandex Wordstat provides precise search volume data"
  ]
}
```

---

### 🇯🇵 Japan (ja)

**Primary Engine: Google (75%), Secondary: Yahoo Japan (20%)**

```json
{
  "locale": "ja",
  "market": "日本",
  "primaryEngine": {
    "name": "Google",
    "url": "google.co.jp",
    "marketShare": 75,
    "searchPattern": "https://www.google.co.jp/search?q={keyword}&gl=jp&hl=ja"
  },
  "secondaryEngine": {
    "name": "Yahoo Japan",
    "url": "yahoo.co.jp",
    "marketShare": 20,
    "searchPattern": "https://search.yahoo.co.jp/search?p={keyword}"
  },
  "trendsTools": {
    "primary": {
      "name": "Google Trends",
      "geoCode": "JP"
    }
  },
  "notes": [
    "Yahoo Japan uses Google's search technology",
    "Google Trends data represents majority of searches"
  ]
}
```

---

### 🌍 Other Markets (Google-Dominant)

For **de, fr, es, pt, it, ar, id, hi**: Use standard Google configuration.

```json
{
  "primaryEngine": {
    "name": "Google",
    "marketShare": "90-97%",
    "searchPattern": "https://www.google.{tld}/search?q={keyword}&gl={country}&hl={lang}"
  },
  "trendsTools": {
    "primary": {
      "name": "Google Trends",
      "geoCode": "{COUNTRY_CODE}"
    }
  }
}
```

**TLD Mapping:**
- de → google.de (Germany)
- fr → google.fr (France)
- es → google.es (Spain)
- pt → google.com.br (Brazil)
- it → google.it (Italy)
- ar → google.com.sa (Saudi Arabia)
- id → google.co.id (Indonesia)
- hi → google.co.in (India)

---

## Common Mistakes

### ❌ Don't Do This

```bash
# WRONG: google.com.cn doesn't exist
site:google.com.cn "AI绘画"

# WRONG: Using Google for China market research
https://www.google.com/search?q=AI绘画&gl=cn

# WRONG: Ignoring Naver for Korean keywords
# (Only checking Google when Naver has 60% market share)
```

### ✅ Do This

```bash
# CORRECT: Use Baidu for China
site:baidu.com "AI绘画"
百度指数: https://index.baidu.com/

# CORRECT: Use Naver for Korea
site:naver.com "AI 이미지 생성"
Naver DataLab for trends

# CORRECT: Use Yandex for Russia
site:yandex.ru "AI генератор изображений"
```

---

## Quick Reference

### Search Engine Selection Logic

```
IF locale == "zh":
    USE Baidu + 百度指数

ELSE IF locale == "ko":
    USE Naver (primary) + Google (secondary)
    USE Naver DataLab for trends

ELSE IF locale == "ru":
    USE Yandex + Google (both)

ELSE:
    USE Google (appropriate TLD)
```

### Trends Tool URLs

| Market | Tool | URL |
|--------|------|-----|
| China | 百度指数 | https://index.baidu.com/v2/index.html |
| Korea | Naver DataLab | https://datalab.naver.com/keyword/trendSearch.naver |
| Russia | Yandex Wordstat | https://wordstat.yandex.ru/ |
| Others | Google Trends | https://trends.google.com/trends/?geo={CODE} |

---

## Implementation Notes

When implementing keyword research:

1. **Check locale first** - Use this file to determine correct search engine
2. **Use market-appropriate tools** - Don't assume Google everywhere
3. **Document search engine used** - Add `searchEngine` field to keyword entries
4. **Validate on primary engine** - Market share matters for keyword research
5. **Consider secondary engines** - When market is split (Korea, Russia)

**Field to add in keywords-{locale}.json:**

```json
{
  "searchEngine": "baidu",           // or "google-tw", "naver", "yandex"
  "searchEngineMarket": "中国大陆"    // human-readable market name
}
```
