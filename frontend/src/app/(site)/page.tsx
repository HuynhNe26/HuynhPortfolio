import Link from 'next/link';
import { publicContent } from '@/lib/api';
import { HeroPortrait3D } from '@/components/hero-portrait-3d';
import { HeroHeadline } from '@/components/hero-headline';
import { AboutMePreview } from '@/components/about-me-preview';
import { ProjectStackShowcase } from '@/components/project-stack-showcase';
import { TechStackMatrix } from '@/components/tech-stack-matrix';
import { TechIcon } from '@/components/tech-icon';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { profile, projects } = await publicContent();
  const displayedProjects = projects;

  return (
    <main id="main-content" className="homepage-wrapper">
      {/* SECTION 1: HERO */}
      <section className="hero container">
        <HeroHeadline name={profile.name} />

        <div className="hero-portrait-wrapper">
          <HeroPortrait3D
            avatarUrl={profile.avatarUrl || '/avatar.jpg'}
            name={profile.name}
            role={profile.title || 'Full-Stack Software Engineer'}
          />
        </div>
      </section>

      {/* SECTION 2: CONCISE ABOUT ME (REPLACES PRODUCTION ARCHITECTURE) */}
      <AboutMePreview
        name={profile.name}
        biography={profile.biography}
        email={profile.email}
      />

      {/* SECTION 3: FEATURED PROJECTS STACKED HORIZONTAL SHOWCASE */}
      <section id="work" className="section container">
        <div className="section-heading">
          <div>
            <div className="section-pill-tag">
              <span className="pill-dot" />
              <span>SELECTED WORKS &amp; CASE STUDIES</span>
            </div>
            <h2>
              Featured Engineering Projects
              <span className="brand-dot">.</span>
            </h2>
          </div>
          <div className="heading-aside-actions">
            <Link className="button button-pro-secondary" href="/projects">
              View All {projects.length} Case Studies
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>

        <ProjectStackShowcase projects={displayedProjects} />
      </section>

      {/* SECTION 4: INTERACTIVE TECH MATRIX */}
      <section className="tech-matrix-wrapper container section" id="stack">
        <div className="section-heading">
          <div>
            <div className="section-pill-tag">
              <span className="pill-dot" />
              <span>TECHNICAL CAPABILITIES</span>
            </div>
            <h2>
              Core Engineering Stack
              <span className="brand-dot">.</span>
            </h2>
          </div>
          <p className="section-aside">
            Tools and runtimes applied in production applications, academic implementations, and real-time APIs.
          </p>
        </div>

        <TechStackMatrix />
      </section>

      {/* SECTION 5: CONTACT BANNER */}
      <section className="contact-banner container" id="contact">
        <p className="eyebrow">READY TO COLLABORATE?</p>
        <h2>
          Let’s Build Something
          <br />
          Exceptional Together<span className="brand-dot">.</span>
        </h2>
        <p className="contact-banner-desc">
          Currently open to Full-Stack Developer Intern, Fresher &amp; Junior opportunities in Ho Chi Minh City and remote.
        </p>
        <div className="contact-banner-actions">
          <Link className="button button-pro-primary" href="/contact">
            Start a Conversation
            <span aria-hidden="true">↗</span>
          </Link>
          <a href="tel:+84937569205" className="button button-pro-secondary">
            <span aria-hidden="true">📞</span>
            +84 937 569 205
          </a>
          <a href={`mailto:${profile.email}`} className="button button-pro-secondary">
            {profile.email}
          </a>
          <Link href="/admin" className="button button-pro-ghost">
            CMS Admin Portal ↗
          </Link>
        </div>
        {profile.availability && (
          <p className="availability">
            <span className="status-dot" />
            <span>{profile.availability}</span>
          </p>
        )}
      </section>
    </main>
  );
}
