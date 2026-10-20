import type { Metadata } from 'next';
import { publicContent } from '@/lib/api';
import { ProjectStackShowcase } from '@/components/project-stack-showcase';
import { ProjectsPageIntro } from '@/components/projects-page-intro';
import { BreadcrumbsJsonLd } from '@/components/seo-json-ld';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Dự án Kỹ thuật & Case Studies — Nguyễn Hoàng Huynh',
  description:
    'Khám phá 7 dự án Full-Stack Web, hệ thống AI Agentic RAG, điều hành bay hàng không thời gian thực và nền tảng y tế số do Nguyễn Hoàng Huynh thiết kế, lập trình và triển khai.',
  keywords: [
    ...siteConfig.keywords,
    'Dự án Nguyễn Hoàng Huynh',
    'Nguyen Hoang Huynh Projects',
    'Case Studies Full-Stack',
    'Web Application Portfolio',
  ],
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Dự án Kỹ thuật & Case Studies — Nguyễn Hoàng Huynh',
    description:
      'Hồ sơ kỹ thuật tổng hợp 7 dự án thực tế: AI Agentic RAG, Điều phối hàng không SkyRoute, Y tế số MediCare, Luyện thi AI ExamPlatform, Thương mại điện tử.',
    url: '/projects',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Dự án Kỹ thuật — Nguyễn Hoàng Huynh',
      },
    ],
  },
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const { projects } = await publicContent();

  return (
    <main id="main-content" className="container section">
      <BreadcrumbsJsonLd
        items={[
          { name: 'Trang chủ', url: '/' },
          { name: 'Dự án kỹ thuật', url: '/projects' },
        ]}
      />
      <ProjectsPageIntro />
      <ProjectStackShowcase projects={projects} />
    </main>
  );
}
