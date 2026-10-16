import Link from 'next/link';
import { publicContent } from '@/lib/api';
import { EmptyProjects, ProjectCard } from '@/components/project-card';
import { TechIcon } from '@/components/tech-icon';
import { HeroPortrait3D } from '@/components/hero-portrait-3d';
import { ArchitectureFlow } from '@/components/architecture-flow';
import { TechStackMatrix } from '@/components/tech-stack-matrix';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const { profile, projects, unavailable } = await publicContent();
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

      {/* SECTION 2: INTERACTIVE ARCHITECTURE FLOW */}
      <section className="architecture-section container section" id="architecture">
        <div className="section-heading">
          <div>
            <div className="section-pill-tag">
              <span className="pill-dot" />
              <span>SYSTEMS &amp; INFRASTRUCTURE ARCHITECTURE</span>
            </div>
            <h2>
              Production Architecture Flow
              <span className="brand-dot">.</span>
            </h2>
          </div>
          <p className="section-aside">
            Interactive breakdown of modern distributed layers: edge streaming SSR, hardened Node.js runtime, serverless pooled PostgreSQL on Neon, and Agentic RAG inference.
          </p>
        </div>

        <ArchitectureFlow />
      </section>

      {/* SECTION 3: FEATURED PROJECTS SHOWCASE */}
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

        {displayedProjects.length ? (
          <div className="project-grid">
            {displayedProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <EmptyProjects unavailable={unavailable} />
        )}
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

      {/* SECTION 5: ACADEMIC PROFILE & ENGINEERING PHILOSOPHY */}
      <section id="about-preview" className="about-preview-section">
        <div className="container section">
          <div className="section-heading">
            <div>
              <div className="section-pill-tag">
                <span className="pill-dot" />
                <span>BACKGROUND &amp; PHILOSOPHY</span>
              </div>
              <h2>
                Bridging Theory With
                <br />
                Production Engineering<span className="brand-dot">.</span>
              </h2>
            </div>
            <p className="section-aside">
              Connecting academic computer science with scalable production code, hardened architectures, and modern web engineering.
            </p>
          </div>

          <div className="about-preview-grid">
            <div className="about-preview-card highlight">
              <span className="badge-pill">Academic Profile • IT Major</span>
              <h3>Vietnam Aviation Academy</h3>
              <p className="academy-sub">Học viện Hàng không Việt Nam • Khoa Công nghệ Thông tin</p>
              <div className="academic-meta">
                <div>
                  <span className="meta-label">Discipline / Major</span>
                  <span className="meta-val">Information Technology</span>
                </div>
                <div>
                  <span className="meta-label">Academic Standing</span>
                  <span className="meta-val">Third Year (2023 – Present)</span>
                </div>
                <div>
                  <span className="meta-label">Cumulative GPA</span>
                  <span className="meta-val gpa-highlight">3.1 / 4.0</span>
                </div>
                <div>
                  <span className="meta-label">English Certification</span>
                  <span className="meta-val">TOEIC 550 [ETS Verified]</span>
                </div>
              </div>
            </div>

            <div className="about-preview-card">
              <span className="badge-pill">Engineering Philosophy</span>
              <h3>Architecture, Security &amp; Pragmatism</h3>
              <p>
                {profile.biography.slice(0, 260)}...
              </p>
              <div className="card-footer-action">
                <Link href="/about" className="text-link">
                  Read full engineering background &amp; coursework ↗
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CONTACT BANNER */}
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
