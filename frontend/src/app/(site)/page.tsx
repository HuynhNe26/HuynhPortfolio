import type { Metadata } from 'next';
import { publicContent } from '@/lib/api';
import { HeroShowcase } from '@/components/hero-showcase';
import { AboutMeSection, SkillsEducationContact } from '@/components/about-me-bento';
import { FeaturedProjectsGrid } from '@/components/featured-projects-grid';
import { ProfilePageJsonLd } from '@/components/seo-json-ld';
import { siteConfig } from '@/lib/site-config';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: `${siteConfig.name} — Full-Stack Web Developer & Software Engineer | Portfolio`,
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: '/',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
};

export default async function Home() {
  const { profile, projects } = await publicContent();

  return (
    <main id="main-content" className="hh-home-root">
      <ProfilePageJsonLd />

      {/* 1. HERO SHOWCASE WITH REAL PHOTO & MOTTO */}
      <HeroShowcase
        name={profile.name}
        avatarUrl={profile.avatarUrl || '/avatar.jpg'}
        email={profile.email}
        githubUrl={profile.githubUrl || 'https://github.com/HuynhNe26'}
        linkedinUrl={profile.linkedinUrl || ''}
      />

      {/* 2. GIỚI THIỆU BẢN THÂN (ABOUT ME HERO CARD) */}
      <AboutMeSection email={profile.email} />

      {/* 3. DỰ ÁN NỔI BẬT (FEATURED PROJECTS 2X2 3D TILT GRID) */}
      <FeaturedProjectsGrid projects={projects} />

      {/* 4. KỸ NĂNG, HỌC VẤN & LIÊN HỆ BENTO */}
      <SkillsEducationContact email={profile.email} />
    </main>
  );
}
