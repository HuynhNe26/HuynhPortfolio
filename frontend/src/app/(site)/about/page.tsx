import type { Metadata } from 'next';
import { publicContent } from '@/lib/api';
import { AboutPageClient } from '@/components/about-page-client';

export const metadata: Metadata = {
  title: 'Giới thiệu — Nguyễn Hoàng Huynh',
  description:
    'Hồ sơ kỹ thuật, quá trình học vấn tại Học viện Hàng không Việt Nam và chuyên môn Full-Stack Web Developer của Nguyễn Hoàng Huynh.',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const { profile } = await publicContent();

  return <AboutPageClient profile={profile} />;
}
