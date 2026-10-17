import { publicContent } from '@/lib/api';
import { HeroShowcase } from '@/components/hero-showcase';
import { FeaturedProjectsGrid } from '@/components/featured-projects-grid';
import { AboutMeBento } from '@/components/about-me-bento';

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

      {/* 2. FEATURED PROJECTS 2X2 GLOWING GRID */}
      <FeaturedProjectsGrid projects={projects} />

      {/* 3. ABOUT ME, EDUCATION, CERTIFICATES, SKILLS & CONTACT BENTO */}
      <AboutMeBento email={profile.email} />
    </main>
  );
}
