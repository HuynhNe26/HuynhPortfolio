import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getProjectBySlug } from '@/lib/api';
import { ProjectUnderConstruction } from '@/components/project-under-construction';
import { BreadcrumbsJsonLd } from '@/components/seo-json-ld';
import { getSiteUrl } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

const fetchProject = cache(async (slug: string) => {
  const project = await getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  return project;
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = await fetchProject((await params).slug);
  const siteUrl = getSiteUrl();
  const canonicalUrl = `/projects/${project.slug}`;
  const fullCover = project.coverUrl.startsWith('http')
    ? project.coverUrl
    : `${siteUrl}${project.coverUrl}`;

  return {
    title: `${project.title} — Đang cập nhật chi tiết | Nguyễn Hoàng Huynh`,
    description: `${project.summary} — Trang chi tiết dự án đang được Nguyễn Hoàng Huynh biên tập và hoàn thiện.`,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: `${project.title} | Nguyễn Hoàng Huynh`,
      description: project.summary,
      url: canonicalUrl,
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt || project.createdAt,
      authors: ['Nguyễn Hoàng Huynh'],
      tags: project.technologies,
      images: [
        {
          url: fullCover,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — Nguyễn Hoàng Huynh`,
      description: project.summary,
      images: [fullCover],
      creator: '@HuynhNe26',
    },
  };
}

export default async function ProjectStory({ params }: { params: Promise<{ slug: string }> }) {
  const project = await fetchProject((await params).slug);

  return (
    <main
      id="main-content"
      className="case-study-wip-page"
      data-project-slug={project.slug}
    >
      <BreadcrumbsJsonLd
        items={[
          { name: 'Trang chủ', url: '/' },
          { name: 'Dự án', url: '/projects' },
          { name: project.title, url: `/projects/${project.slug}` },
        ]}
      />

      <ProjectUnderConstruction project={project} />
    </main>
  );
}
