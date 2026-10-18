import { publicContent } from '@/lib/api';
import { HeroShowcase } from '@/components/hero-showcase';
import { AboutMeSection, SkillsEducationContact } from '@/components/about-me-bento';
import { FeaturedProjectsGrid } from '@/components/featured-projects-grid';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { profile, projects } = await publicContent();

  return (
    <main id="main-content" className="hh-home-root">
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
