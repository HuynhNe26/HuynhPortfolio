import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getProjectBySlug, publicContent } from '@/lib/api';
import { TechIcon } from '@/components/tech-icon';
import { Storytelling3DFlow } from '@/components/storytelling-3d-flow';

const fetchProject = cache(async (slug: string) => {
  const project = await getProjectBySlug(slug);
  if (!project) {
    notFound();
  }
  return project;
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = await fetchProject((await params).slug);
  return {
    title: `${project.title} — Case Study | Nguyễn Hoàng Huynh`,
    description: project.summary,
  };
}

export default async function ProjectStory({ params }: { params: Promise<{ slug: string }> }) {
  const project = await fetchProject((await params).slug);
  const { projects } = await publicContent();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const chapters = project.chapters && project.chapters.length > 0
    ? project.chapters
    : [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Introduction & Project Overview',
          content: project.summary,
          technicalNotes: project.technologies,
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'The Idea & Core Concept',
          content: project.approach,
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'The Challenge & Problem',
          content: project.problem,
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'The Experience & Design',
          content: 'Designed with clean hierarchy, responsive layout adaptation, and direct user guidance throughout the application lifecycle.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Engineering Architecture',
          content: project.approach,
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'My Contribution',
          content: `Key responsibilities as ${project.role}: full-stack feature development, component architecture, API routing, and performance optimization.`,
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Outcome & Reflection',
          content: project.outcome,
        },
      ];

  const features = project.features || [];

  return (
    <main
      id="main-content"
      className="project-story-page"
      style={{
        '--project-accent': project.themeColor || '#2563EB',
        '--project-accent-bg': project.themeBg || '#EFF6FF',
      } as React.CSSProperties}
    >
      {/* 1. HERO SECTION WITH PROJECT THEME ACCENT */}
      <header className="story-hero-section">
        <div className="container">
          <div className="story-nav-back">
            <Link className="text-link" href="/projects">
              ← All Projects
            </Link>
          </div>

          <div className="story-hero-header">
            <div className="story-pills">
              <span className="story-category-pill">{project.category}</span>
              <span className={`story-status-pill ${project.status === 'Ongoing' ? 'ongoing' : 'completed'}`}>
                <span className="status-dot" />
                {project.status || 'Completed'}
              </span>
              <span className="story-year-pill">{project.year}</span>
            </div>

            <h1 className="story-title">{project.title}</h1>
            <p className="story-summary">{project.summary}</p>
          </div>

          {/* HIGH-CONTRAST ENGINEERING SPECS BAR */}
          <div className="story-specs-bar">
            <div className="spec-item">
              <span className="spec-label">Role</span>
              <span className="spec-value">
                {project.role}
                {project.teamSize ? ` (Team of ${project.teamSize})` : ' (Solo Developer)'}
              </span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Timeline</span>
              <span className="spec-value">{project.timeline || `${project.year}`}</span>
            </div>
            {project.teamSize && (
              <div className="spec-item">
                <span className="spec-label">Team Size</span>
                <span className="spec-value">{project.teamSize} Members</span>
              </div>
            )}
            <div className="spec-item tech-spec">
              <span className="spec-label">Core Stack</span>
              <div className="story-tech-tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    <TechIcon name={tech} className="tech-tag-icon" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="spec-item links-spec">
              <span className="spec-label">Live Deployment</span>
              <div className="story-links">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button button-pro-primary small"
                  >
                    <span>Visit Live Website</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {project.sourceUrl && (
                  <a href={project.sourceUrl} target="_blank" rel="noreferrer" className="text-link">
                    Source Code ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MACOS BROWSER HERO SHOWCASE */}
      <section className="story-cover-section container">
        <div className="story-browser-mockup">
          <div className="story-browser-bar">
            <div className="window-dots" aria-hidden="true">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="story-browser-address">
              <span className="address-lock" aria-hidden="true">🔒</span>
              <span className="address-url">{project.liveUrl || `https://${project.slug}.dev`}</span>
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="story-browser-action"
                title="Open live website in new tab"
              >
                <span>Live Website</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>

          {project.coverUrl ? (
            <div className="story-cover-image">
              <Image
                src={project.coverUrl}
                alt={`${project.title} live interface showcase`}
                fill
                sizes="100vw"
                unoptimized
                priority
              />
            </div>
          ) : (
            <div className="story-cover-placeholder">
              <div className="cover-monogram">{project.title.slice(0, 2).toUpperCase()}</div>
              <div className="cover-caption">
                <span>{project.category}</span>
                <span>Case Study Storytelling</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. CORE PRODUCT FEATURES & FUNCTIONAL CAPABILITIES LIST */}
      {features.length > 0 && (
        <section className="story-features-section container" id="features">
          <div className="features-section-heading">
            <div className="section-pill-tag">
              <span className="pill-dot" />
              <span>CORE PRODUCT FEATURES &amp; CAPABILITIES</span>
            </div>
            <h2>
              Key Product Functionality
              <span className="brand-dot">.</span>
            </h2>
            <p className="features-aside">
              Comprehensive breakdown of functional capabilities, user interactions, and production modules engineered into this system.
            </p>
          </div>

          <div className="features-detailed-grid">
            {features.map((feat, idx) => (
              <article key={feat.id || idx} className="feature-detailed-card">
                <div className="feature-card-header">
                  <span className="feature-num-badge">0{idx + 1}</span>
                  {feat.category && <span className="feature-cat-tag">{feat.category}</span>}
                  <span className="feature-verified-tag">
                    <span className="pro-status-dot" />
                    Verified Feature
                  </span>
                </div>

                <h3 className="feature-card-title">{feat.title}</h3>
                <p className="feature-card-desc">{feat.description}</p>

                {feat.screenshotUrl && (
                  <div className="feature-screenshot-frame">
                    <div className="feature-window-topbar">
                      <div className="window-dots-mini" aria-hidden="true">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                      </div>
                      <span className="feature-window-title">{feat.title}</span>
                    </div>

                    <div className="feature-screenshot-img-wrap">
                      <Image
                        src={feat.screenshotUrl}
                        alt={feat.screenshotAlt || feat.title}
                        width={1200}
                        height={750}
                        className="feature-img"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 4. CHAPTER NAVIGATION STRIP */}
      <nav className="chapter-sticky-nav" aria-label="Case study chapters">
        <div className="container chapter-nav-inner">
          <span className="chapter-nav-label">3D Story Chapters:</span>
          <div className="chapter-links-scroll">
            {chapters.map((ch) => (
              <a key={ch.id} href={`#${ch.id}`} className="chapter-nav-link">
                <span>{ch.number}</span> {ch.title.split('&')[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 5. 7-CHAPTER 3D STORYTELLING FLOW */}
      <Storytelling3DFlow
        chapters={chapters}
        accentColor={project.themeColor || '#2563EB'}
      />

      {/* 6. PROJECT PAGER (PREV / NEXT) */}
      <section className="project-pager container">
        <div className="pager-grid">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="pager-card prev">
              <span className="pager-direction">← Previous Project</span>
              <h4>{prevProject.title}</h4>
              <span className="pager-cat">{prevProject.category}</span>
            </Link>
          ) : (
            <div className="pager-card empty" />
          )}

          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="pager-card next">
              <span className="pager-direction">Next Project →</span>
              <h4>{nextProject.title}</h4>
              <span className="pager-cat">{nextProject.category}</span>
            </Link>
          ) : (
            <div className="pager-card empty" />
          )}
        </div>
      </section>

      {/* 7. CONTACT CTA */}
      <section className="story-contact-cta container">
        <div className="cta-inner">
          <p className="eyebrow">READY TO COLLABORATE?</p>
          <h2>Let’s discuss what we can build together.</h2>
          <div className="cta-buttons">
            <Link href="/contact" className="button button-pro-primary">
              Start a Conversation ↗
            </Link>
            <Link href="/projects" className="button button-pro-secondary">
              Explore More Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
