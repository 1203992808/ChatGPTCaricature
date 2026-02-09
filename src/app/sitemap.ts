import { MetadataRoute } from 'next';

import { envConfigs } from '@/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const appUrl = envConfigs.app_url;
  const lastModified = '2026-02-10T00:43:00Z';

  return [
    {
      url: appUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${appUrl}/create`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];
}
