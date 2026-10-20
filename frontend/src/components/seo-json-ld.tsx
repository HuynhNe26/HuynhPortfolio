import React from 'react';
import type { Project } from '@/lib/types';
import { getSiteUrl, siteConfig } from '@/lib/site-config';

interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Schema.org Person & Profile Entity for Nguyễn Hoàng Huynh
 * Tells Google and Bing Knowledge Graph who the author is, their education, skills, and links.
 */
export function PersonJsonLd() {
  const siteUrl = getSiteUrl();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: siteConfig.name,
    alternateName: siteConfig.alternateNames,
    jobTitle: siteConfig.author.role,
    description: siteConfig.description,
    url: siteUrl,
    image: `${siteUrl}/avatar.jpg`,
    email: `mailto:${siteConfig.author.email}`,
    telephone: siteConfig.author.phone,
    gender: 'Male',
    nationality: {
      '@type': 'Country',
      name: 'Vietnam',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: siteConfig.author.university,
      url: 'https://vaa.edu.vn',
      sameAs: 'https://vi.wikipedia.org/wiki/H%E1%BB%8Dc_vi%E1%BB%87n_H%C3%A0ng_kh%C3%B4ng_Vi%E1%BB%87t_Nam',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Đồng Nai & TP. Hồ Chí Minh',
      addressRegion: 'Đông Nam Bộ',
      addressCountry: 'VN',
    },
    sameAs: [
      siteConfig.author.github,
      siteConfig.author.repo,
      'https://github.com/HuynhNe26',
    ],
    knowsAbout: [
      'Full-Stack Web Development',
      'Next.js 16',
      'React.js',
      'TypeScript',
      'Node.js',
      'Agentic RAG (Retrieval-Augmented Generation)',
      'LangChain.js',
      'Google Gemini AI API',
      'PostgreSQL (Neon Serverless)',
      'MongoDB Atlas',
      'Redis Caching & Redis Geo',
      'WebSocket Real-Time Systems',
      'Tailwind CSS',
      'Docker Containerization',
      'Aviation IT Operations & Weight & Balance Engine',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Bachelor of Science in Information Technology (In Progress)',
        credentialCategory: 'degree',
        educationalLevel: 'Undergraduate',
        recognizedBy: {
          '@type': 'EducationalOrganization',
          name: siteConfig.author.university,
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'TOEIC Listening & Reading 550',
        credentialCategory: 'certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'ETS (Educational Testing Service)',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Schema.org WebSite Entity with search action & publisher reference
 */
export function WebSiteJsonLd() {
  const siteUrl = getSiteUrl();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: siteConfig.title,
    alternateName: [siteConfig.shortTitle, 'HuynhPortfolio', 'Nguyễn Hoàng Huynh Portfolio'],
    description: siteConfig.description,
    inLanguage: ['vi-VN', 'en-US'],
    publisher: {
      '@id': `${siteUrl}/#person`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Schema.org ProfilePage Entity
 */
export function ProfilePageJsonLd() {
  const siteUrl = getSiteUrl();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: siteConfig.title,
    mainEntity: {
      '@id': `${siteUrl}/#person`,
    },
    dateCreated: '2026-10-15T00:00:00Z',
    dateModified: new Date().toISOString(),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Schema.org SoftwareApplication / WebApplication Schema for Project Pages
 * Enables Google rich results for individual project searches (e.g. Ticket Concert Agentic RAG, SkyRoute, MediCare)
 */
export function ProjectJsonLd({ project }: { project: Project }) {
  const siteUrl = getSiteUrl();
  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const imageUrl = project.coverUrl.startsWith('http')
    ? project.coverUrl
    : `${siteUrl}${project.coverUrl}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['SoftwareApplication', 'WebApplication'],
    '@id': `${projectUrl}#software`,
    name: project.title,
    headline: project.title,
    description: project.summary,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All (Web Browser)',
    url: projectUrl,
    image: imageUrl,
    datePublished: project.createdAt,
    dateModified: project.updatedAt || project.createdAt,
    author: {
      '@id': `${siteUrl}/#person`,
    },
    creator: {
      '@id': `${siteUrl}/#person`,
    },
    publisher: {
      '@id': `${siteUrl}/#person`,
    },
    softwareRequirements: project.technologies.join(', '),
    keywords: [
      project.title,
      project.category,
      ...project.technologies,
      'Nguyễn Hoàng Huynh',
      'Nguyen Hoang Huynh',
      'Full-Stack Project',
    ].join(', '),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    ...(project.liveUrl && !project.liveUrl.includes('localhost')
      ? { sameAs: [project.liveUrl] }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Schema.org BreadcrumbList Schema
 * Produces readable breadcrumbs in Google SERP results (e.g. Home > Projects > Ticket Concert)
 */
export function BreadcrumbsJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const siteUrl = getSiteUrl();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
