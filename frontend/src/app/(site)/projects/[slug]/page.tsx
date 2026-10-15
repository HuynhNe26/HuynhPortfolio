import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getProjectBySlug, publicContent } from '@/lib/api';
import type { Project } from '@/lib/types';
import { TechIcon } from '@/components/tech-icon';

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

  return (
    <main
      id="main-content"
      className="project-story-page"
      style={{
        '--project-accent': project.themeColor || '#3268D8',
        '--project-accent-bg': project.themeBg || '#EFF6FF',
      } as React.CSSProperties}
    >
      {/* Hero Section */}
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

          <div className="story-specs-bar">
            <div className="spec-item">
              <span className="spec-label">Role</span>
              <span className="spec-value">{project.role}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Timeline</span>
              <span className="spec-value">{project.timeline || `${project.year}`}</span>
            </div>
            {project.teamSize && (
              <div className="spec-item">
                <span className="spec-label">Team Size</span>
                <span className="spec-value">{project.teamSize} members</span>
              </div>
            )}
            <div className="spec-item tech-spec">
              <span className="spec-label">Stack</span>
              <div className="tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    <TechIcon name={tech} className="tech-tag-icon" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="spec-item links-spec">
              <span className="spec-label">Links</span>
              <div className="story-links">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="button button-dark small">
                    Live Website ↗
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

      {/* Hero Media / Banner */}
      <section className="story-cover-section container">
        {project.coverUrl ? (
          <div className="story-cover-image">
            <Image
              src={project.coverUrl}
              alt={`${project.title} showcase`}
              fill
              sizes="100vw"
              unoptimized
              priority
            />
          </div>
        ) : (
          <div className="story-cover-placeholder">
            <div className="cover-art-grid" />
            <div className="cover-monogram">{project.title.slice(0, 2).toUpperCase()}</div>
            <div className="cover-caption">
              <span>{project.category}</span>
              <span>Case Study Storytelling</span>
            </div>
          </div>
        )}
      </section>

      {/* Sticky Chapter Navigation Bar */}
      <nav className="chapter-sticky-nav" aria-label="Case study chapters">
        <div className="container chapter-nav-inner">
          <span className="chapter-nav-label">Chapters:</span>
          <div className="chapter-links-scroll">
            {chapters.map((ch) => (
              <a key={ch.id} href={`#${ch.id}`} className="chapter-nav-link">
                <span>{ch.number}</span> {ch.title.split('&')[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* 7-Chapter Storytelling Flow */}
      <article className="story-body container">
        {chapters.map((chapter) => (
          <section key={chapter.id} id={chapter.id} className="story-chapter-block">
            <div className="chapter-marker">
              <span className="chapter-number">Chapter {chapter.number}</span>
              <span className="chapter-line" />
            </div>

            <div className="chapter-content-grid">
              <div className="chapter-header">
                <h2>{chapter.title}</h2>
              </div>
              <div className="chapter-narrative">
                <p className="preserve-lines">{chapter.content}</p>

                {chapter.technicalNotes && chapter.technicalNotes.length > 0 && (
                  <div className="technical-notes-box">
                    <h4>Key Engineering Decisions</h4>
                    <ul>
                      {chapter.technicalNotes.map((note, idx) => (
                        <li key={idx}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {chapter.screenshots && chapter.screenshots.length > 0 && (
                  <div className="chapter-screenshots-gallery">
                    {chapter.screenshots.map((s, idx) => (
                      <figure key={idx} className="screenshot-figure">
                        <div className="screenshot-wrapper">
                          <Image
                            src={s.url}
                            alt={s.alt || s.caption}
                            width={1200}
                            height={750}
                            className="screenshot-img"
                            unoptimized
                          />
                        </div>
                        <figcaption>
                          <strong>{s.caption}</strong>
                          {s.description && <span> — {s.description}</span>}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </article>

      {/* Project Navigation (Prev / Next) */}
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

      {/* Contact CTA */}
      <section className="story-contact-cta container">
        <div className="cta-inner">
          <p className="eyebrow">READY TO COLLABORATE?</p>
          <h2>Let’s discuss what we can build together.</h2>
          <div className="cta-buttons">
            <Link href="/contact" className="button button-dark">
              Start a Conversation ↗
            </Link>
            <Link href="/projects" className="button button-light">
              Explore More Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
