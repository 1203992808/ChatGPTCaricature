/**
 * Content Moderation System
 * 内容审核系统
 *
 * Features:
 * - Comprehensive keyword coverage (adult, violence, drugs, hate speech, etc.)
 * - Text normalization (handles spaces, symbols, leet speak, variants)
 * - Categorized blocking with specific error messages
 * - Detailed logging for audit and appeals
 */

// ==================== Types ====================

export enum ModerationCategory {
  SEXUAL = 'sexual',
  CHILD_SAFETY = 'child_safety',
  VIOLENCE = 'violence',
  SELF_HARM = 'self_harm',
  DRUGS = 'drugs',
  WEAPONS = 'weapons',
  HATE_SPEECH = 'hate_speech',
  EXTREMISM = 'extremism',
}

type ModerationRule = {
  id: string;
  category: ModerationCategory;
  reason: string;
  pattern: RegExp;
  severity: 'high' | 'medium' | 'low';
};

type ModerationResult = {
  allowed: boolean;
  blocked?: {
    category: ModerationCategory;
    ruleId: string;
    reason: string;
    severity: string;
    matchedText: string;
    normalizedText: string;
    timestamp: string;
  };
};

// ==================== Text Normalization ====================

/**
 * Normalize text to catch evasion attempts
 * 归一化文本以捕捉规避尝试
 */
function normalizeText(text: string): string {
  let normalized = text.toLowerCase();

  // Handle leet speak and common character substitutions FIRST
  // 先处理 leet speak 和常见字符替换
  const leetMap: Record<string, string> = {
    '0': 'o',
    '1': 'i',
    '3': 'e',
    '4': 'a',
    '5': 's',
    '7': 't',
    '8': 'b',
    '9': 'g',
    '@': 'a',
    '!': 'i',
    '\\$': 's',
    '€': 'e',
    '£': 'e',
  };

  for (const [leet, normal] of Object.entries(leetMap)) {
    normalized = normalized.replace(new RegExp(leet, 'g'), normal);
  }

  // Remove special symbols often used to evade filters
  // 移除常用于规避过滤的特殊符号
  normalized = normalized.replace(/[@#$%^&*()+=\[\]{}|\\:;"'<>?,/~`]/g, '');

  // Remove intra-word separators (underscores, hyphens, dots) but keep spaces
  // 移除单词内部的分隔符（下划线、连字符、点）但保留空格
  normalized = normalized.replace(/[_\-\.]+/g, '');

  // Collapse multiple spaces into single space
  // 将多个空格合并为单个空格
  normalized = normalized.replace(/\s+/g, ' ');

  // Handle zero-width characters and invisible characters
  // 处理零宽字符和不可见字符
  normalized = normalized.replace(/[\u200B-\u200D\uFEFF]/g, '');

  return normalized.trim();
}

/**
 * Create multiple variants of a keyword to catch evasion attempts
 * 创建关键词的多个变体以捕捉规避尝试
 */
function createVariants(base: string): string[] {
  const variants = [base];

  // Add spacing variants: "porn" -> "p orn", "po rn", etc.
  // 添加空格变体
  for (let i = 1; i < base.length; i++) {
    variants.push(base.slice(0, i) + ' ' + base.slice(i));
    variants.push(base.slice(0, i) + '\\s+' + base.slice(i));
  }

  return variants;
}

// ==================== Moderation Rules ====================

const MODERATION_RULES: ModerationRule[] = [
  // ==================== Child Safety (HIGHEST PRIORITY) ====================
  {
    id: 'child-sexual-en',
    category: ModerationCategory.CHILD_SAFETY,
    reason: 'Child sexual abuse material (CSAM)',
    severity: 'high',
    pattern:
      /\b(?:child.*porn|childporn|cp|preteen|pre.*teen|underage.*sex|minor.*sex|kid.*porn|loli|lolita|shota|child.*abuse|child.*molest|child.*exploit|pedo|pedophile|pedophilia|hebephil|grooming|jailbait)\b/i,
  },
  {
    id: 'child-sexual-zh',
    category: ModerationCategory.CHILD_SAFETY,
    reason: 'Child sexual abuse material (CSAM) (Chinese)',
    severity: 'high',
    pattern:
      /(?:儿童色情|未成年.*(?:色情|性)|幼女|幼男|萝莉|正太|恋童|儿童.*性虐|诱拐.*儿童|猥亵.*儿童|性侵.*儿童|幼齿)/,
  },
  {
    id: 'child-harm-en',
    category: ModerationCategory.CHILD_SAFETY,
    reason: 'Content depicting harm to children',
    severity: 'high',
    pattern:
      /\b(?:child.*abuse|child.*neglect|child.*torture|child.*trafficking|child.*exploitation|harm.*child|hurt.*child|abuse.*minor)\b/i,
  },
  {
    id: 'child-harm-zh',
    category: ModerationCategory.CHILD_SAFETY,
    reason: 'Content depicting harm to children (Chinese)',
    severity: 'high',
    pattern: /(?:虐待.*儿童|伤害.*儿童|贩卖.*儿童|拐卖.*儿童|虐童)/,
  },

  // ==================== Extremism & Terrorism (HIGH PRIORITY) ====================
  {
    id: 'extremism-terrorism-en',
    category: ModerationCategory.EXTREMISM,
    reason: 'Terrorism or violent extremism',
    severity: 'high',
    pattern:
      /\b(?:isis|isil|al.*qaeda|taliban|boko.*haram|hamas|hezbollah|jihad(?!i\s+(?:prevention|awareness|against|counter))|jihadist|terrorist(?!.*(?:prevention|awareness|against|counter|victim))|terrorism(?!.*(?:prevention|awareness|against|counter))|holy.*war|martyrdom|shahid|allahu.*akbar.*attack|lone.*wolf.*attack|radicalization)\b/i,
  },
  {
    id: 'extremism-terrorism-zh',
    category: ModerationCategory.EXTREMISM,
    reason: 'Terrorism or violent extremism (Chinese)',
    severity: 'high',
    pattern:
      /(?:恐怖主义(?!.*(?:预防|防范|反对|打击))|恐怖分子|恐怖袭击|恐怖活动|圣战|基地组织|塔利班|伊斯兰国|ISIS|博科圣地|哈马斯|真主党|暴力极端|激进化|殉道)/,
  },
  {
    id: 'extremism-political-violence',
    category: ModerationCategory.EXTREMISM,
    reason: 'Political violence or insurrection',
    severity: 'high',
    pattern:
      /\b(?:armed.*rebellion|coup.*d'etat|insurrection|overthrow.*government|political.*assassination|armed.*resistance|guerrilla.*warfare|paramilitary)\b/i,
  },
  {
    id: 'extremism-manifestos',
    category: ModerationCategory.EXTREMISM,
    reason: 'Extremist manifestos or propaganda',
    severity: 'high',
    pattern:
      /\b(?:accelerationism|doomer|boogaloo|day.*of.*the.*rope|turner.*diaries|siege.*culture|read.*siege|going.*postal)\b/i,
  },

  // ==================== Adult/Sexual Content ====================
  {
    id: 'sexual-explicit-en',
    category: ModerationCategory.SEXUAL,
    reason: 'Explicit sexual content',
    severity: 'high',
    pattern:
      /\b(?:porn|pornography|xxx|x{3,}|nude|nudity|naked|nsfw|erotic|explicit|sexual|sex|intercourse|orgasm|masturbat|blowjob|handjob|footjob|titjob|anal|vaginal|penis|vagina|dick|cock|pussy|cunt|boob|breast|nipple|genitals?|hentai|ahegao|cameltoe|upskirt|lingerie|stripper|prostitut|escort|brothel|hooker|incest|rape|molest|grope|seduce|kinky|bdsm|bondage|fetish|kink)\b/i,
  },
  {
    id: 'sexual-explicit-zh',
    category: ModerationCategory.SEXUAL,
    reason: 'Explicit sexual content (Chinese)',
    severity: 'high',
    pattern:
      /(?:色情|裸露|裸体|裸照|性爱|性行为|做爱|交配|性交|强奸|强暴|性侵|猥亵|淫秽|淫荡|骚|荡妇|妓女|嫖娼|卖淫|援交|性器官|生殖器|阴茎|阴道|乳房|胸部|下体|私处|手淫|自慰|口交|肛交|群交|乱伦|兽交|恋童|露出|偷拍|走光|春药|迷药)/,
  },
  {
    id: 'sexual-services',
    category: ModerationCategory.SEXUAL,
    reason: 'Sexual services or solicitation',
    severity: 'high',
    pattern:
      /\b(?:onlyfans|patreon.*adult|cam.*girl|cam.*boy|sugar.*daddy|sugar.*baby|escort.*service|call.*girl|happy.*ending|massage.*parlor|strip.*club|adult.*entertain)\b/i,
  },

  // ==================== Violence & Gore ====================
  {
    id: 'violence-extreme-en',
    category: ModerationCategory.VIOLENCE,
    reason: 'Extreme violence or gore',
    severity: 'high',
    pattern:
      /\b(?:gore|gory|beheading|decapitation|dismember|disembowel|mutilat|torture|tortur|massacre|slaughter|bloodbath|carnage|brutal.*murder|serial.*killer|mass.*shooting|school.*shooting|terrorist.*attack|execution|lynch|crucif)\b/i,
  },
  {
    id: 'violence-extreme-zh',
    category: ModerationCategory.VIOLENCE,
    reason: 'Extreme violence or gore (Chinese)',
    severity: 'high',
    pattern:
      /(?:血腥|血腹|残忍|残暴|虐杀|酷刑|斩首|肢解|屠杀|屠戮|大屠杀|砍头|砍杀|割喉|剖腹|枪杀|枪决|处决|行刑|私刑|凌迟)/,
  },
  {
    id: 'violence-general-en',
    category: ModerationCategory.VIOLENCE,
    reason: 'Violent content',
    severity: 'medium',
    pattern:
      /\b(?:murder|kill|assassinat|stab|shoot|strangle|suffocate|poison|drown|beat.*death|fight.*death|violent|brutal|sadistic|assault|attack|harm|hurt|injure|wound)\b/i,
  },
  {
    id: 'violence-general-zh',
    category: ModerationCategory.VIOLENCE,
    reason: 'Violent content (Chinese)',
    severity: 'medium',
    pattern:
      /(?:杀人|杀害|谋杀|刺杀|暗杀|捅刀|刺伤|毒杀|勒死|溺死|打死|殴打|暴力|残害|伤害|攻击)/,
  },

  // ==================== Self-Harm & Suicide ====================
  {
    id: 'self-harm-explicit-en',
    category: ModerationCategory.SELF_HARM,
    reason: 'Self-harm or suicide content',
    severity: 'high',
    pattern:
      /\b(?:self.*harm|self.*injury|self.*mutilat|cut.*myself|cutting|burn.*myself|suicide|suicidal|kill.*myself|end.*my.*life|want.*to.*die|how.*to.*die|suicide.*method|suicide.*note|hang.*myself|overdose|slit.*wrist|jump.*off|depression.*suicide)\b/i,
  },
  {
    id: 'self-harm-explicit-zh',
    category: ModerationCategory.SELF_HARM,
    reason: 'Self-harm or suicide content (Chinese)',
    severity: 'high',
    pattern:
      /(?:自杀|自残|自伤|自我伤害|割腕|上吊|跳楼|服毒|寻死|想死|轻生|了结.*生命|结束.*生命|自尽|厌世)/,
  },
  {
    id: 'eating-disorder',
    category: ModerationCategory.SELF_HARM,
    reason: 'Promotion of eating disorders',
    severity: 'medium',
    pattern:
      /\b(?:pro.*ana|pro.*mia|thinspo|fitspo|ana.*tips|mia.*tips|purge|purging|starv.*yourself|extreme.*diet|anorexia.*tips|bulimia.*tips)\b/i,
  },

  // ==================== Drugs & Substances ====================
  {
    id: 'drugs-hard-en',
    category: ModerationCategory.DRUGS,
    reason: 'Hard drugs or controlled substances',
    severity: 'high',
    pattern:
      /\b(?:cocaine|heroin|meth|methamphetamine|crystal.*meth|fentanyl|carfentanil|opioid|oxycontin|percocet|crack|lsd|acid.*trip|ecstasy|mdma|molly|ketamine|special.*k|pcp|angel.*dust|ghb|roofies|bath.*salts|synthetic.*drug|designer.*drug|drug.*deal|drug.*trafficking|drug.*smuggl)\b/i,
  },
  {
    id: 'drugs-hard-zh',
    category: ModerationCategory.DRUGS,
    reason: 'Hard drugs or controlled substances (Chinese)',
    severity: 'high',
    pattern:
      /(?:毒品|海洛因|冰毒|可卡因|大麻|摇头丸|K粉|氯胺酮|吗啡|鸦片|芬太尼|安非他明|麻古|病毒|贩毒|制毒|毒贩|吸毒|贩卖毒品)/,
  },
  {
    id: 'drugs-instructions',
    category: ModerationCategory.DRUGS,
    reason: 'Drug manufacturing or usage instructions',
    severity: 'high',
    pattern:
      /\b(?:how.*to.*make.*meth|how.*to.*cook.*crack|grow.*marijuana|cultivate.*cannabis|extract.*dmt|synthesize.*drug|drug.*recipe|drug.*formula)\b/i,
  },

  // ==================== Weapons & Explosives ====================
  {
    id: 'weapons-firearms-en',
    category: ModerationCategory.WEAPONS,
    reason: 'Firearms or weapons',
    severity: 'high',
    pattern:
      /\b(?:gun|firearm|rifle|pistol|handgun|shotgun|machine.*gun|assault.*rifle|ar-15|ak-47|uzi|glock|beretta|revolver|sniper.*rifle|weapon|ammunition|ammo|bullet|cartridge|magazine|clip|silencer|suppressor|holster|trigger|scope|tactical)\b/i,
  },
  {
    id: 'weapons-firearms-zh',
    category: ModerationCategory.WEAPONS,
    reason: 'Firearms or weapons (Chinese)',
    severity: 'high',
    pattern:
      /(?:枪|手枪|步枪|冲锋枪|机枪|狙击枪|猎枪|气枪|火器|弹药|子弹|武器|军火|刀|匕首|砍刀|管制刀具)/,
  },
  {
    id: 'weapons-explosives-en',
    category: ModerationCategory.WEAPONS,
    reason: 'Explosives or bomb-making',
    severity: 'high',
    pattern:
      /\b(?:bomb|explosive|dynamite|tnt|c4|plastique|grenade|ieds?|improvised.*explosive|pipe.*bomb|pressure.*cooker.*bomb|fertilizer.*bomb|molotov|napalm|det.*cord|blasting.*cap|gunpowder|how.*to.*make.*bomb|bomb.*making|bomb.*instructions)\b/i,
  },
  {
    id: 'weapons-explosives-zh',
    category: ModerationCategory.WEAPONS,
    reason: 'Explosives or bomb-making (Chinese)',
    severity: 'high',
    pattern:
      /(?:炸弹|爆炸物|炸药|雷管|手榴弹|地雷|火药|TNT|硝化甘油|汽油弹|燃烧瓶|制作.*炸弹|爆破)/,
  },
  {
    id: 'weapons-bioweapons',
    category: ModerationCategory.WEAPONS,
    reason: 'Bioweapons or chemical weapons',
    severity: 'high',
    pattern:
      /\b(?:bioweapon|biological.*weapon|chemical.*weapon|nerve.*agent|sarin|vx.*gas|ricin|anthrax|smallpox|weaponiz.*virus|weaponiz.*bacteria)\b/i,
  },

  // ==================== Hate Speech ====================
  {
    id: 'hate-slurs-en',
    category: ModerationCategory.HATE_SPEECH,
    reason: 'Hate speech or slurs',
    severity: 'high',
    pattern:
      /\b(?:n[i1]gg[ae]r|ch[i1]nk|sp[i1]c|k[i1]ke|f[a4]gg[o0]t|tr[a4]nny|ret[a4]rd|mongoloid|wetback|beaner|gook|towelhead|raghead|sandnigger|kaffir)\b/i,
  },
  {
    id: 'hate-slurs-zh',
    category: ModerationCategory.HATE_SPEECH,
    reason: 'Hate speech or slurs (Chinese)',
    severity: 'high',
    pattern:
      /(?:支那|东亚病夫|黑鬼|白皮猪|绿绿|穆畜|小日本|日本鬼子|高丽棒子|阿三|死基佬|死同性恋|人妖|变态|智障|弱智)/,
  },
  {
    id: 'hate-groups-en',
    category: ModerationCategory.HATE_SPEECH,
    reason: 'Hate groups or discriminatory ideologies',
    severity: 'high',
    pattern:
      /\b(?:kkk|ku.*klux.*klan|neo.*nazi|white.*supremac|white.*power|aryan|fourteen.*words|blood.*soil|hitler.*youth|nazi.*party|alt.*right.*extremism|race.*war|ethnic.*cleansing|genocide)\b/i,
  },
  {
    id: 'hate-discrimination',
    category: ModerationCategory.HATE_SPEECH,
    reason: 'Discriminatory content',
    severity: 'medium',
    pattern:
      /\b(?:subhuman|inferior.*race|master.*race|racial.*purity|race.*traitor|miscegenation|deport.*all|ban.*all.*muslims|kill.*all.*jews|exterminate)\b/i,
  },
];

// ==================== Error Messages ====================

const ERROR_MESSAGES: Record<ModerationCategory, string> = {
  [ModerationCategory.SEXUAL]:
    'Content contains adult or sexually explicit material that violates our policy.',
  [ModerationCategory.CHILD_SAFETY]:
    'Content related to child safety has been blocked. This is strictly prohibited.',
  [ModerationCategory.VIOLENCE]:
    'Content contains graphic violence or harmful material that violates our policy.',
  [ModerationCategory.SELF_HARM]:
    'Content related to self-harm or suicide has been blocked. If you need help, please contact a mental health professional.',
  [ModerationCategory.DRUGS]:
    'Content related to illegal drugs or controlled substances has been blocked.',
  [ModerationCategory.WEAPONS]:
    'Content related to weapons, explosives, or dangerous materials has been blocked.',
  [ModerationCategory.HATE_SPEECH]:
    'Content contains hate speech or discriminatory language that violates our policy.',
  [ModerationCategory.EXTREMISM]:
    'Content related to extremism or terrorism has been blocked.',
};

const ERROR_MESSAGES_ZH: Record<ModerationCategory, string> = {
  [ModerationCategory.SEXUAL]: '内容包含成人或色情内容，违反我们的政策。',
  [ModerationCategory.CHILD_SAFETY]:
    '涉及儿童安全的内容已被拦截。这是严格禁止的。',
  [ModerationCategory.VIOLENCE]: '内容包含血腥暴力或有害内容，违反我们的政策。',
  [ModerationCategory.SELF_HARM]:
    '涉及自残或自杀的内容已被拦截。如果您需要帮助，请联系心理健康专业人士。',
  [ModerationCategory.DRUGS]: '涉及非法毒品或管制物质的内容已被拦截。',
  [ModerationCategory.WEAPONS]: '涉及武器、爆炸物或危险材料的内容已被拦截。',
  [ModerationCategory.HATE_SPEECH]: '内容包含仇恨言论或歧视性语言，违反我们的政策。',
  [ModerationCategory.EXTREMISM]: '涉及极端主义或恐怖主义的内容已被拦截。',
};

// ==================== Helper Functions ====================

function looksLikeUrl(value: string): boolean {
  return (
    /^https?:\/\//i.test(value) ||
    value.startsWith('data:') ||
    value.startsWith('blob:')
  );
}

function collectModerationText(value: unknown, collected: string[]) {
  if (!value) {
    return;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed || looksLikeUrl(trimmed)) {
      return;
    }
    collected.push(trimmed);
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectModerationText(item, collected);
    }
    return;
  }

  if (typeof value === 'object') {
    for (const item of Object.values(value as Record<string, unknown>)) {
      collectModerationText(item, collected);
    }
  }
}

function truncateForLog(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

// ==================== Main Moderation Function ====================

/**
 * Check if content is allowed or should be blocked
 * 检查内容是否允许或应被拦截
 */
export function moderateContent(
  prompt: unknown,
  options?: unknown
): ModerationResult {
  const collected: string[] = [];
  collectModerationText(prompt, collected);
  collectModerationText(options, collected);

  if (collected.length === 0) {
    return { allowed: true };
  }

  const combinedText = collected.join('\n');
  const normalizedText = normalizeText(combinedText);

  // Create aggressive normalization (remove ALL spaces for anti-evasion)
  const aggressiveNormalized = normalizedText.replace(/\s+/g, '');

  // Test against all rules
  for (const rule of MODERATION_RULES) {
    let matched = false;
    let matchedText = 'unknown';

    // Test original and normalized text with full regex
    if (rule.pattern.test(combinedText)) {
      matched = true;
      const match = combinedText.match(rule.pattern);
      matchedText = match ? match[0] : 'unknown';
    } else if (rule.pattern.test(normalizedText)) {
      matched = true;
      const match = normalizedText.match(rule.pattern);
      matchedText = match ? match[0] : 'unknown';
    } else if (rule.pattern.test(aggressiveNormalized)) {
      matched = true;
      const match = aggressiveNormalized.match(rule.pattern);
      matchedText = match ? match[0] : 'unknown';
    } else {
      // For aggressive normalization, test without word boundaries ONLY for high-risk categories
      // This prevents over-blocking while still catching evasion attempts for the most harmful content
      const useRelaxedMatching =
        rule.category === ModerationCategory.SEXUAL ||
        rule.category === ModerationCategory.CHILD_SAFETY ||
        rule.category === ModerationCategory.DRUGS;

      if (useRelaxedMatching) {
        // Remove \b from pattern for substring matching
        const patternStr = rule.pattern.source.replace(/\\b/g, '');
        const patternFlags = rule.pattern.flags;
        const relaxedPattern = new RegExp(patternStr, patternFlags);

        if (relaxedPattern.test(aggressiveNormalized)) {
          matched = true;
          const match = aggressiveNormalized.match(relaxedPattern);
          matchedText = match ? match[0] : 'unknown';
        }
      }
    }

    if (matched) {
      return {
        allowed: false,
        blocked: {
          category: rule.category,
          ruleId: rule.id,
          reason: rule.reason,
          severity: rule.severity,
          matchedText: truncateForLog(matchedText, 50),
          normalizedText: truncateForLog(normalizedText, 100),
          timestamp: new Date().toISOString(),
        },
      };
    }
  }

  return { allowed: true };
}

/**
 * Assert that content is allowed, throw error if blocked
 * 断言内容允许，如果被拦截则抛出错误
 *
 * @param prompt - User prompt or content to moderate
 * @param options - Additional options or parameters to moderate
 * @param locale - User locale for error messages (default: 'en')
 */
export function assertPromptAllowed(
  prompt: unknown,
  options?: unknown,
  locale: string = 'en'
) {
  const result = moderateContent(prompt, options);

  if (!result.allowed && result.blocked) {
    // Log detailed information for audit
    console.warn('Content moderation triggered', {
      category: result.blocked.category,
      ruleId: result.blocked.ruleId,
      reason: result.blocked.reason,
      severity: result.blocked.severity,
      matchedText: result.blocked.matchedText,
      normalizedText: result.blocked.normalizedText,
      timestamp: result.blocked.timestamp,
    });

    // Return user-friendly error message based on category and locale
    const errorMessage =
      locale === 'zh'
        ? ERROR_MESSAGES_ZH[result.blocked.category]
        : ERROR_MESSAGES[result.blocked.category];

    throw new Error(errorMessage);
  }
}

/**
 * Export for external logging/analytics systems
 * 导出供外部日志/分析系统使用
 */
export type { ModerationResult };
