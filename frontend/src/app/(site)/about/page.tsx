import type { Metadata } from 'next';
import { publicContent } from '@/lib/api';
import { AboutPageClient } from '@/components/about-page-client';
import { BreadcrumbsJsonLd, ProfilePageJsonLd } from '@/components/seo-json-ld';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Về tôi & Hồ sơ Kỹ thuật — Nguyễn Hoàng Huynh | Full-Stack Web Developer',
  description:
    'Hồ sơ kỹ thuật của Nguyễn Hoàng Huynh: Sinh viên ngành Công nghệ thông tin Học viện Hàng không Việt Nam (GPA 3.1/4.0), chứng chỉ TOEIC 550, năng lực Full-Stack Next.js 16, Node.js, AI Agentic RAG và cơ sở dữ liệu cloud.',
  keywords: [
    ...siteConfig.keywords,
    'Về tôi Nguyễn Hoàng Huynh',
    'Giới thiệu Nguyễn Hoàng Huynh',
    'Nguyen Hoang Huynh Bio',
    'CV Nguyễn Hoàng Huynh',
    'Hồ sơ kỹ thuật Nguyễn Hoàng Huynh',
    'Học viện Hàng không Việt Nam IT',
    'TOEIC 550 Nguyễn Hoàng Huynh',
  ],
  alternates: {
    canonical: '/about',
    languages: {
      'vi-VN': '/about',
      'en-US': '/about',
      'zh-CN': '/about',
      'x-default': '/about',
    },
  },
  openGraph: {
    type: 'profile',
    title: 'Về tôi & Hồ sơ Kỹ thuật — Nguyễn Hoàng Huynh',
    description:
      'Hồ sơ năng lực kỹ thuật, quá trình đào tạo tại Học viện Hàng không Việt Nam (GPA 3.1/4.0), chứng chỉ TOEIC 550 và chuyên môn Full-Stack Web Developer của Nguyễn Hoàng Huynh.',
    url: '/about',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nguyễn Hoàng Huynh — Full-Stack Developer',
      },
      {
        url: '/avatar.jpg',
        width: 800,
        height: 800,
        alt: 'Chân dung Nguyễn Hoàng Huynh — Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Về tôi & Hồ sơ Kỹ thuật — Nguyễn Hoàng Huynh',
    description:
      'Sinh viên CNTT Học viện Hàng không Việt Nam (GPA 3.1/4.0), TOEIC 550, chuyên sâu Next.js 16, TypeScript, Node.js & AI Agentic RAG.',
    creator: '@HuynhNe26',
    images: ['/og-image.png'],
  },
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const { profile } = await publicContent();

  return (
    <>
      <ProfilePageJsonLd path="/about" />
      <BreadcrumbsJsonLd
        items={[
          { name: 'Trang chủ', url: '/' },
          { name: 'Về tôi', url: '/about' },
        ]}
      />
      <AboutPageClient profile={profile} />
    </>
  );
}
