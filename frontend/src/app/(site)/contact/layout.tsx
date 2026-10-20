import type { Metadata } from 'next';
import { BreadcrumbsJsonLd } from '@/components/seo-json-ld';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Liên hệ Hợp tác & Tuyển dụng — Nguyễn Hoàng Huynh | Full-Stack Developer',
  description:
    'Kết nối trực tiếp với Nguyễn Hoàng Huynh — Sẵn sàng tiếp nhận các cơ hội Full-Stack Web Developer Intern, Fresher & Junior. Email: nguyenhoanghuynh.vn@gmail.com, Hotline: +84 937 569 205.',
  keywords: [
    ...siteConfig.keywords,
    'Liên hệ Nguyễn Hoàng Huynh',
    'Tuyển dụng Nguyễn Hoàng Huynh',
    'Thuê lập trình viên Full-Stack',
    'Contact Nguyen Hoang Huynh',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Liên hệ Hợp tác & Tuyển dụng — Nguyễn Hoàng Huynh',
    description:
      'Kết nối trực tiếp với Nguyễn Hoàng Huynh qua email nguyenhoanghuynh.vn@gmail.com hoặc hotline +84 937 569 205.',
    url: '/contact',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Liên hệ Nguyễn Hoàng Huynh',
      },
    ],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbsJsonLd
        items={[
          { name: 'Trang chủ', url: '/' },
          { name: 'Liên hệ hợp tác', url: '/contact' },
        ]}
      />
      {children}
    </>
  );
}
