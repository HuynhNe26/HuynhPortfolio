import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getProjectBySlug, publicContent } from '@/lib/api';
import { TechIcon } from '@/components/tech-icon';
import { StorytellingDispatcher } from '@/components/storytelling/storytelling-dispatcher';
import { ProjectCaseStudyHero } from '@/components/project-case-study-hero';

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
      {/* 1. MOCKUP HERO WITH 3D LAPTOP, 4 SPECS, TECH ICONS & KEY FEATURES */}
      <ProjectCaseStudyHero project={project} />

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

      {/* 5. BESPOKE 3D STORYTELLING FLOW (UNIQUE ENGINE PER PROJECT) */}
      <StorytellingDispatcher
        project={project}
        chapters={chapters}
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
