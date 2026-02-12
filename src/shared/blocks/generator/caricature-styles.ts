export interface CaricatureStyle {
  key: string;
  label: string;
  description: string;
  thumbnail: string;
  buildPrompt: (options: {
    jobTitle?: string;
    hobbies?: string;
    personality?: string;
  }) => string;
}

// Identity preservation prefix — activates GPT Image 1.5's face-matching capability
const ID_PREFIX =
  'Based on the facial features of the uploaded image, ';

export const CARICATURE_STYLES: CaricatureStyle[] = [
  {
    key: 'classic',
    label: 'Classic Caricature',
    description:
      'Traditional hand-drawn caricature with exaggerated head, bold ink outlines and marker textures',
    thumbnail: '/example/classic-style.webp',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create a traditional hand-drawn caricature that makes the subject LARGER THAN LIFE. Wildly exaggerated proportions with a massive head (3-4x body size) and tiny expressive body. This style captures the essence of personality traits and distinctive features through deliberate exaggeration for emotional impact. Illustrated with vibrant alcohol marker textures, bold confident ink outlines, and high contrast shading. Professional editorial cartoon quality that evokes the charm of boardwalk caricature artists combined with the precision of political cartoonists. The exaggeration should draw out the most significant aspects of the person, making them instantly recognizable and emotionally resonant.`;
      if (jobTitle) prompt += ` The subject is a ${jobTitle} — amplify profession-specific stereotypes and iconic tools/attire to larger-than-life proportions.`;
      if (personality) prompt += ` Their facial expression radiates an exaggerated ${personality} mood that evokes immediate emotional response.`;
      if (hobbies) prompt += ` Background features whimsical, sketchy doodles of ${hobbies}, distilled to their core essence.`;
      return prompt;
    },
  },
  {
    key: 'job',
    label: 'Pro-Roast',
    description:
      'Workplace satire with oversized professional gear and "being forced to thrive" expressions',
    thumbnail: '/example/job-style.webp',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      const job = jobTitle || 'professional';
      let prompt = `${ID_PREFIX}create a satirical workplace caricature illustration. The character is a ${job}, hilariously overwhelmed by oversized professional equipment (like programmers trapped by multiple monitors, doctors with giant stethoscopes). The art style combines polished digital vectors with exaggerated comic proportions. The facial expression should convey a "被迫营业" (forced to work) or "疯狂工作" (crazy busy) mood with slightly dark humor and ironic charm.`;
      if (personality) prompt += ` Emphasize their ${personality} personality through body language and props.`;
      if (hobbies) prompt += ` Add small ironic details showing ${hobbies} being neglected in the background.`;
      return prompt;
    },
  },
  {
    key: '3d-cartoon',
    label: '3D Cartoon',
    description:
      'Premium 3D character render with cinematic lighting and rich textures',
    thumbnail: '/example/3D-cartoon-style.webp',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create a premium 3D character render in Pixar/Disney animation studio style, designed for emotional storytelling. The character features ULTRA-EXPRESSIVE OVERSIZED EYES that convey every raw emotion with soul-touching clarity. Stylized proportions with soft, plush-like texture inspired by 2026 Plushcore aesthetic — rounded edges, approachable warmth, and gentle curves. The 3D realism brings authentic heartfelt emotions that 2D cannot capture. Use cinematic soft rim lighting, rich tactile surfaces with subtle fuzz/felt texture, and vivid nostalgic colors. 8k resolution, Pixar-quality render with emotional depth. The character should feel both visually stunning and deeply emotionally resonant, creating instant connection with viewers.`;
      if (jobTitle) prompt += ` They are dressed as a ${jobTitle} with adorable profession-themed outfit and oversized iconic props.`;
      if (personality) prompt += ` Their massive expressive eyes and body language radiate ${personality} emotion with Pixar-level nuance.`;
      if (hobbies) prompt += ` They're holding soft plush-textured 3D props representing ${hobbies}, integrated into the emotional narrative.`;
      return prompt;
    },
  },
  {
    key: 'comic',
    label: 'Comic Style',
    description:
      'Dynamic comic book splash page with strong ink lines, halftone dots and retro aesthetics',
    thumbnail: '/example/comic-style.webp',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create a dynamic vintage comic book splash page that evokes NOSTALGIC MEMORIES of the golden age of comics. Features bold confident ink outlines, iconic BEN DAY halftone dot patterns that add captivating texture and depth, and a high-action superhero pose. This style honors comic book tradition with its signature halftone aesthetic — the enchanting visual pattern that has become synonymous with comic culture itself. Use a punchy primary color palette (red, blue, yellow) with dramatic noir shadows and retro Silver/Bronze Age comic aesthetics. The composition should feel like an iconic superhero cover that captures readers' attention instantly. Include action lines, speech bubble space, and that unmistakable vintage comic print quality.`;
      if (jobTitle) prompt += ` The character is portrayed as a heroic ${jobTitle} superhero with themed costume elements and profession-specific superpowers.`;
      if (personality) prompt += ` The dynamic pose and expression capture a ${personality} heroic energy.`;
      if (hobbies) prompt += ` Visual 'superpowers' and background effects themed after ${hobbies} are woven into the action-packed composition.`;
      return prompt;
    },
  },
  {
    key: 'pop-art',
    label: 'Pop Art',
    description:
      'Bold Andy Warhol-inspired portrait with silk-screen effect and saturated color blocks',
    thumbnail: '/example/pop-art-style.webp',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create a bold Pop Art portrait inspired by Andy Warhol's revolutionary silkscreen printing technique that ELEVATES ORDINARY PEOPLE TO CELEBRITY ICON STATUS. This style embraces the power of mechanical reproduction and INTENTIONAL IMPERFECTIONS — celebrate misalignments, ink smudges, registration errors, and variations in color density as unique character, not flaws. The aesthetic mirrors mass production's assembly-line ethos, transforming the subject into both a religious icon and a reproducible product. Use high-contrast silkscreen effect with flat, electric saturated color blocks (bright pink, yellow, turquoise, orange). Sharp graphic edges with visible screen-print texture, iconic simplified silhouette, and 1960s modern art gallery sophistication. The composition should comment on fame, media worship, and consumer culture — themes that remain powerfully relevant in today's social media and digital celebrity era. Include slight printing artifacts and color separation for authentic screen-print charm.`;
      if (jobTitle) prompt += ` The ${jobTitle} subject is transformed into an iconic figure with profession-themed visual elements, elevated to pop culture celebrity status.`;
      if (personality) prompt += ` The overall mood conveys a ${personality} attitude with bold graphic simplification and media-worship aesthetics.`;
      if (hobbies) prompt += ` Repetitive Warhol-style grid panels showing simplified, mass-produced versions of ${hobbies} symbols.`;
      return prompt;
    },
  },
  {
    key: 'chibi',
    label: 'Chibi',
    description:
      'Ultra-deformed chibi with 2-head-high proportion, sparkling eyes and cel-shaded art',
    thumbnail: '/example/chibi-style.webp',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create an ultra-deformed Super-Deformed (SD) Chibi character that ACTIVATES PROTECTIVE INSTINCTS through irresistible cuteness. The design features NEOTENIC FEATURES (childish proportions, massive head, tiny body) with a strict 2-head-high ratio that awakens the same affection you'd feel for a baby or puppy. The character has ENORMOUS sparkling eyes (taking up 40% of the face) with glossy highlights, rosy blushing cheeks, a tiny button nose, stubby limbs, and clumsy adorable proportions. This collectible-grade design style makes characters instantly more marketable, relatable, and emotionally expressive. Clean cel-shaded anime art with pastel kawaii color scheme, soft rounded edges with no sharp angles, and simple clean background. The aesthetic should make even dark or serious characters appear cute and accessible to a larger audience — perfect for merchandise appeal.`;
      if (jobTitle) prompt += ` Dressed in an adorably simplified ${jobTitle} outfit with miniature kawaii props that enhance the cute factor.`;
      if (personality) prompt += ` Their sparkling oversized eyes convey EXAGGERATED ${personality} emotions with maximum kawaii charm.`;
      if (hobbies) prompt += ` Surrounded by tiny adorable chibi-fied versions of ${hobbies} that trigger protective warmth.`;
      return prompt;
    },
  },
  {
    key: 'claymation',
    label: 'Claymation',
    description:
      'Handcrafted clay animation style with visible fingerprints, warm texture, and Aardman charm',
    thumbnail: '/example/claymation-style.webp',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create a charming claymation character in the style of Wallace & Gromit (Aardman Animations). The character should have tactile clay texture with visible subtle fingerprints and tool marks, soft rounded edges, and warm handcrafted imperfections. Use gentle rim lighting to emphasize the material's warmth and depth. The character has expressive large eyes with simple black pupils, a wide friendly mouth, and smooth plasticine surfaces. Soft color palette with matte finish. The aesthetic should feel nostalgic, cozy, and lovingly handmade — a deliberate counter to digital perfection.`;
      if (jobTitle) prompt += ` The character is shaped as a ${jobTitle} with clay-sculpted professional attire and props.`;
      if (personality) prompt += ` Their clay-molded facial expression radiates a ${personality} warmth.`;
      if (hobbies) prompt += ` Surround with miniature clay-crafted props representing ${hobbies}.`;
      return prompt;
    },
  },
  {
    key: 'action-figure',
    label: 'Action Figure',
    description:
      'Collectible toy in transparent packaging with accessories, background card, and limited edition label',
    thumbnail: '/example/action-figure-style.webp',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create a collectible action figure toy design in clear plastic blister packaging. The character has an oversized head (chibi proportions), glossy toy-like eyes, and visible plastic joints. Include: transparent packaging box with window, colorful background insert card, small accessory pieces (tools, props), "LIMITED EDITION" badge, and product information card at the bottom. The overall aesthetic should evoke Pop Mart/Labubu designer toy vibes with a touch of ugly-cute charm. Studio lighting with slight plastic sheen and reflection effects. Ultra-detailed product photography style.`;
      if (jobTitle) prompt += ` The figure is dressed as a ${jobTitle} with miniature profession-themed accessories attached.`;
      if (personality) prompt += ` The toy's expression captures a ${personality} mood with exaggerated features.`;
      if (hobbies) prompt += ` Include tiny accessory pack showing ${hobbies} items in the packaging.`;
      return prompt;
    },
  },
  {
    key: 'tv-satire-southpark',
    label: 'TV Satire - South Park',
    description:
      'Paper cutout construction paper style with crude cardboard aesthetic and chunky proportions',
    thumbnail: '/example/tv-satire-southpark-style.webp',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create a character in the exact style of South Park TV show. The character should look like a paper cutout made from construction paper, with a flat 2D cardboard aesthetic. CRITICAL FEATURES: simple circular or oval head, minimal facial features (dot eyes, simple mouth line), chunky round body, no neck, short stubby limbs. The art style is intentionally crude and simplistic with rough cut-paper edges, flat matte colors (no gradients), and thick black outlines. The overall look should feel like stop-motion paper puppets.`;
      if (jobTitle) prompt += ` The character wears a simplified ${jobTitle} outfit in South Park's minimal style.`;
      if (personality) prompt += ` Their simple face shows a ${personality} expression with minimal detail.`;
      if (hobbies) prompt += ` Add crude paper-cutout props representing ${hobbies}.`;
      return prompt;
    },
  },
];
