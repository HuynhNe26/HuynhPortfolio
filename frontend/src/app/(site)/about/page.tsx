import type { Metadata } from 'next';
import { publicContent } from '@/lib/api';
import { AboutPageClient } from '@/components/about-page-client';
import { BreadcrumbsJsonLd } from '@/components/seo-json-ld';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Giới thiệu & Hồ sơ Kỹ thuật — Nguyễn Hoàng Huynh | Full-Stack Web Developer',
  description:
    'Hồ sơ kỹ thuật của Nguyễn Hoàng Huynh: Sinh viên ngành Công nghệ thông tin Học viện Hàng không Việt Nam (GPA 3.1/4.0), chứng chỉ TOEIC 550, năng lực Full-Stack Next.js 16, Node.js, AI Agentic RAG và cơ sở dữ liệu cloud.',
  keywords: [
    ...siteConfig.keywords,
    'Giới thiệu Nguyễn Hoàng Huynh',
    'Nguyen Hoang Huynh Bio',
    'CV Nguyễn Hoàng Huynh',
    'Hồ sơ kỹ thuật Nguyễn Hoàng Huynh',
    'Học viện Hàng không Việt Nam IT',
    'TOEIC 550 Nguyễn Hoàng Huynh',
  ],
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'Giới thiệu & Hồ sơ Kỹ thuật — Nguyễn Hoàng Huynh',
    description:
      'Hồ sơ năng lực kỹ thuật, quá trình đào tạo tại Học viện Hàng không Việt Nam (GPA 3.1/4.0), chứng chỉ TOEIC 550 và chuyên môn Full-Stack Web Developer của Nguyễn Hoàng Huynh.',
    url: '/about',
    images: [
      {
        url: '/avatar.jpg',
        width: 800,
        height: 800,
        alt: 'Nguyễn Hoàng Huynh — Full-Stack Developer',
      },
    ],
  },
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const { profile } = await publicContent();

  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: 'Trang chủ', url: '/' },
          { name: 'Giới thiệu', url: '/about' },
        ]}
      />
      <AboutPageClient profile={profile} />
    </>
  );
}
