import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-config';
import { defaultProjects } from '@/lib/types';
import { EXCLUDED_PROJECT_SLUGS } from '@/lib/api';

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

  const staticEntries: MetadataRoute.Sitemap = [
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
      changeFrequency: 'weekly',
      priority: 0.95,
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

  // Include valid active public projects for deeper search engine indexing
  const validProjects = defaultProjects.filter(
    (p) => !EXCLUDED_PROJECT_SLUGS.has(p.slug)
  );

  const projectEntries: MetadataRoute.Sitemap = validProjects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: buildAlternates(`/projects/${p.slug}`),
  }));

  return [...staticEntries, ...projectEntries];
}
