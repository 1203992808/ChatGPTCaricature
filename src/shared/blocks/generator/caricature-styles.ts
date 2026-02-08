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
    thumbnail: '/example/classic-style.png',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create a traditional hand-drawn caricature with a highly exaggerated large head and a tiny, expressive body. Illustrated with vibrant alcohol marker textures and bold ink outlines. High contrast, professional editorial cartoon style.`;
      if (jobTitle) prompt += ` The subject is a ${jobTitle} with relevant professional attire.`;
      if (personality) prompt += ` Their facial expression conveys a ${personality} mood.`;
      if (hobbies) prompt += ` Incorporate ${hobbies} into the background as whimsical, sketchy doodles.`;
      return prompt;
    },
  },
  {
    key: 'job',
    label: 'Job Caricature',
    description:
      'Career-centric caricature with oversized professional tools and playful proportions',
    thumbnail: '/example/job-style.png',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      const job = jobTitle || 'professional';
      let prompt = `${ID_PREFIX}create a creative career-centric caricature illustration. The character is a ${job}, depicted using oversized professional tools and props in their work environment. The art style is a polished digital vector with smooth gradients and playful proportions, focusing on a narrative professional scene.`;
      if (personality) prompt += ` Their demeanor reflects a ${personality} nature.`;
      if (hobbies) prompt += ` Surround the scene with fun, symbolic icons related to ${hobbies}.`;
      return prompt;
    },
  },
  {
    key: '3d-cartoon',
    label: '3D Cartoon',
    description:
      'Premium 3D character render with cinematic lighting and rich textures',
    thumbnail: '/example/3D-cartoon-style.png',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create a premium 3D character render in a modern animation studio style. The character features stylized proportions with a charming, expressive face. Use cinematic soft lighting, rich textures, and vivid colors. 8k resolution, high-fidelity surfaces.`;
      if (jobTitle) prompt += ` They are dressed as a ${jobTitle} with appropriate outfit and props.`;
      if (personality) prompt += ` The character radiates a ${personality} aura.`;
      if (hobbies) prompt += ` They are holding 3D props representing ${hobbies}.`;
      return prompt;
    },
  },
  {
    key: 'comic',
    label: 'Comic Style',
    description:
      'Dynamic comic book splash page with strong ink lines, halftone dots and retro aesthetics',
    thumbnail: '/example/comic-style.png',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create a dynamic comic book splash page art. Features strong ink lines, halftone dot patterns, and a high-action pose. Use a vibrant primary color palette with dramatic shadows and retro comic aesthetics.`;
      if (jobTitle) prompt += ` The character is portrayed as a heroic ${jobTitle} with themed costume elements.`;
      if (personality) prompt += ` The pose and expression capture a ${personality} vibe.`;
      if (hobbies) prompt += ` Visual 'superpowers' themed after ${hobbies} are woven into the composition.`;
      return prompt;
    },
  },
  {
    key: 'chibi',
    label: 'Chibi',
    description:
      'Ultra-deformed chibi with 2-head-high proportion, sparkling eyes and cel-shaded art',
    thumbnail: '/example/chibi-style.png',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create an ultra-deformed Chibi character with a 2-head-high proportion. The character has massive, sparkling eyes and a cute blushing face. Clean cel-shaded art, pastel color scheme, soft rounded edges, and a simple, clean background.`;
      if (jobTitle) prompt += ` Dressed in a cute, simplified ${jobTitle} outfit with tiny props.`;
      if (personality) prompt += ` Their sparkling eyes reflect a ${personality} trait.`;
      if (hobbies) prompt += ` Surrounded by adorable kawaii versions of ${hobbies}.`;
      return prompt;
    },
  },
  {
    key: 'pop-art',
    label: 'Pop Art',
    description:
      'Bold Andy Warhol-inspired portrait with silk-screen effect and saturated color blocks',
    thumbnail: '/example/pop-art-style.png',
    buildPrompt: ({ jobTitle, hobbies, personality }) => {
      let prompt = `${ID_PREFIX}create a bold Pop Art portrait inspired by Andy Warhol. High-contrast silk-screen effect with flat, vibrant saturated color blocks. Sharp graphic edges, iconic silhouette, and a 1960s modern art gallery feel.`;
      if (jobTitle) prompt += ` The ${jobTitle} subject is stylized with profession-themed visual elements.`;
      if (personality) prompt += ` The overall mood conveys a ${personality} look.`;
      if (hobbies) prompt += ` Repetitive, simplified patterns of ${hobbies} fill the background panels.`;
      return prompt;
    },
  },
];
