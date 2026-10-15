import type { MetadataRoute } from 'next';
import { publicContent } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.APP_URL || 'http://localhost:3000';
  const { projects } = await publicContent();

  return [
    {
      url: base,
      priority: 1
    },
    {
      url: `${base}/projects`,
      priority: 0.8
    },
    {
      url: `${base}/contact`,
      priority: 0.7
    },
    ...projects.map((project) => ({
      url: `${base}/projects/${project.slug}`,
      lastModified: new Date(project.updatedAt),
      priority: 0.8,
    })),
  ];
}
