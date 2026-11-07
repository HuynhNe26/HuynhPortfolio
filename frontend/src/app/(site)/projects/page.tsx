import type { Metadata } from 'next';
import { publicContent } from '@/lib/api';
import { ProjectStackShowcase } from '@/components/project-stack-showcase';
import { ProjectsPageIntro } from '@/components/projects-page-intro';
import { BreadcrumbsJsonLd, ProjectsCollectionJsonLd } from '@/components/seo-json-ld';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Dự án Kỹ thuật & Sản phẩm Thực tế — Nguyễn Hoàng Huynh',
  description:
    'Khám phá danh mục dự án Full-Stack Web, hệ thống đặt vé sự kiện AI Agentic RAG, nền tảng điều phối ánh sáng sân khấu COLORBOX, khảo thí thích ứng ExamPlatform AI và quản lý phòng trọ AI OCR do Nguyễn Hoàng Huynh phát triển.',
  keywords: [
    ...siteConfig.keywords,
    'Dự án Nguyễn Hoàng Huynh',
    'Nguyen Hoang Huynh Projects',
    'Full-Stack Web Applications',
    'Web Application Portfolio',
  ],
  alternates: {
    canonical: '/projects',
    languages: {
      'vi-VN': '/projects',
      'en-US': '/projects',
      'zh-CN': '/projects',
      'x-default': '/projects',
    },
  },
  openGraph: {
    type: 'website',
    title: 'Dự án Kỹ thuật & Sản phẩm Thực tế — Nguyễn Hoàng Huynh',
    description:
      'Tổng hợp các dự án thực tế và hệ thống AI của Nguyễn Hoàng Huynh: Ticket Concert Agentic RAG, COLORBOX Stage Lighting, Fashion Nail Morley, ExamPlatform AI, VK Digital Hub và Nhà Trọ Thanh Tâm AI OCR.',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Dự án Kỹ thuật & Sản phẩm Thực tế — Nguyễn Hoàng Huynh',
    description:
      'Khám phá các dự án Full-Stack Web, AI Agentic RAG và sản phẩm thương mại thực tế do Nguyễn Hoàng Huynh phát triển.',
    creator: '@HuynhNe26',
    images: ['/og-image.png'],
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
      <ProjectsCollectionJsonLd projects={projects} path="/projects" />
      <ProjectsPageIntro />
      <ProjectStackShowcase projects={projects} />
    </main>
  );
}
