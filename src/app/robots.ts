import { MetadataRoute } from 'next';

import { envConfigs } from '@/config';

export default function robots(): MetadataRoute.Robots {
  const appUrl = envConfigs.app_url;

  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/create',
        '/pricing',
        '/showcases',
        '/privacy-policy',
        '/terms-of-service',
      ],
      disallow: [
        '/*?*q=',
        '/settings/*',
        '/activity/*',
        '/admin/*',
        '/api/*',
      ],
    },
    sitemap: `${appUrl}/sitemap.xml`,
  };
}

