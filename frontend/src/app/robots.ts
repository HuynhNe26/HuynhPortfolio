import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/projects',
          '/contact',
          '/cv/',
          '/certificates/',
          '/avatar.jpg',
          '/about-developer-studio.jpg',
          '/og-image.png',
          '/icon.svg',
        ],
        disallow: ['/admin', '/admin/', '/api', '/api/', '/_next/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/about', '/projects', '/contact', '/cv/', '/certificates/'],
        disallow: ['/admin', '/admin/', '/api', '/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: [
          '/',
          '/avatar.jpg',
          '/about-developer-studio.jpg',
          '/certificates/',
          '/og-image.png',
          '/icon.svg',
        ],
        disallow: ['/admin', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/about', '/projects', '/contact'],
        disallow: ['/admin', '/admin/', '/api', '/api/'],
      },
      {
        userAgent: 'Applebot',
        allow: ['/', '/about', '/projects', '/contact'],
        disallow: ['/admin', '/admin/', '/api', '/api/'],
      },
      {
        userAgent: 'Baiduspider',
        allow: ['/', '/about', '/projects', '/contact'],
        disallow: ['/admin', '/admin/', '/api', '/api/'],
      },
      {
        userAgent: 'YandexBot',
        allow: ['/', '/about', '/projects', '/contact'],
        disallow: ['/admin', '/admin/', '/api', '/api/'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
