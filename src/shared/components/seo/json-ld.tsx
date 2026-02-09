/**
 * JSON-LD Structured Data Component
 *
 * Renders schema.org JSON-LD structured data as a script tag in the page head.
 * Supports multiple schema types: FAQPage, HowTo, WebApplication, Organization.
 */

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// ── Schema Builders ──

export interface FAQItem {
  question: string;
  answer: string;
}

export function buildFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface HowToStep {
  name: string;
  text: string;
  position: number;
}

export function buildHowToSchema({
  name,
  description,
  steps,
  imageUrl,
  totalTime,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
  imageUrl?: string;
  totalTime?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    ...(imageUrl && { image: imageUrl }),
    ...(totalTime && { totalTime }),
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      position: step.position,
      name: step.name,
      text: step.text,
    })),
  };
}

export function buildWebApplicationSchema({
  name,
  description,
  url,
  imageUrl,
  applicationCategory,
  offers,
  operatingSystem,
}: {
  name: string;
  description: string;
  url: string;
  imageUrl?: string;
  applicationCategory?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  operatingSystem?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    ...(imageUrl && { image: imageUrl }),
    applicationCategory: applicationCategory || 'DesignApplication',
    operatingSystem: operatingSystem || 'All',
    ...(offers && {
      offers: {
        '@type': 'Offer',
        price: offers.price,
        priceCurrency: offers.priceCurrency,
      },
    }),
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };
}

export function buildOrganizationSchema({
  name,
  url,
  logoUrl,
  description,
  email,
}: {
  name: string;
  url: string;
  logoUrl?: string;
  description?: string;
  email?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logoUrl && { logo: logoUrl }),
    ...(description && { description }),
    ...(email && { contactPoint: { '@type': 'ContactPoint', email } }),
  };
}
