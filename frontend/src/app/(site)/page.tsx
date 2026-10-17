import Link from 'next/link';
import { publicContent } from '@/lib/api';
import { HeroPortrait3D } from '@/components/hero-portrait-3d';
import { AboutMePreview } from '@/components/about-me-preview';
import { ProjectStackShowcase } from '@/components/project-stack-showcase';
import { TechStackMatrix } from '@/components/tech-stack-matrix';
import { TechIcon } from '@/components/tech-icon';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { profile, projects } = await publicContent();
  const featuredProjects = projects.filter((project) => project.featured);
  const displayedProjects = (featuredProjects.length ? featuredProjects : projects).slice(0, 4);

  return (
    <main id="main-content" className="homepage-wrapper">
      {/* SECTION 1: HERO */}
      <section className="hero container">
        <div className="hero-copy">
          <div className="pro-hero-badge">
            <span className="pro-status-dot" />
            <span>Available for Roles • Vietnam Aviation Academy (Class of 2026)</span>
          </div>

          <h1 className="hero-name">
            <span className="hero-name-gradient">{profile.name}</span>
          </h1>

          <p className="hero-subtitle">
            Full-Stack Software Engineer &amp; System Architect
          </p>

          <p className="hero-intro">
            Third-year Information Technology student at <strong>Vietnam Aviation Academy</strong> (Cumulative GPA 3.1 / 4.0).
            Specializing in high-performance web applications, resilient backend architectures, and AI Agentic workflows using <strong>TypeScript</strong>, <strong>Next.js 16</strong>, and <strong>PostgreSQL Neon</strong>.
          </p>

          <div className="hero-actions">
            <Link className="button button-pro-primary" href="#work">
              View Featured Projects
              <span aria-hidden="true">↓</span>
            </Link>
            <Link className="button button-pro-secondary" href="/contact">
              Get in Touch
              <span aria-hidden="true">↗</span>
            </Link>
            <a
              className="button button-pro-ghost"
              href="https://github.com/HuynhNe26"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TechIcon name="Git" className="tech-tag-icon" />
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="hero-metrics-strip">
            <div className="hero-metric-item">
              <strong>3.1 / 4.0</strong>
              <span>Academic GPA</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <strong>Class of 2026</strong>
              <span>IT Major</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <strong>TOEIC 550</strong>
              <span>ETS Certified</span>
            </div>
            <div className="hero-metric-divider" />
            <div className="hero-metric-item">
              <strong>5 Systems</strong>
              <span>Live Case Studies</span>
            </div>
          </div>
        </div>

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
