import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const buildAlternates = (routePath: string) => {
    const fullUrl = routePath === '/' ? base : `${base}${routePath}`;
    return {
      languages: {
        'vi-VN': fullUrl,
        'en-US': fullUrl,
        'zh-CN': fullUrl,
      },
    };
  };

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: buildAlternates('/'),
    },
    {
      url: `${base}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: buildAlternates('/projects'),
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: buildAlternates('/about'),
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
      alternates: buildAlternates('/contact'),
    },
  ];
}
