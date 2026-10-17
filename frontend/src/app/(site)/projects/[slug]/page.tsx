import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getProjectBySlug, publicContent } from '@/lib/api';
import { TechIcon } from '@/components/tech-icon';
import { ProjectCaseStudyHero } from '@/components/project-case-study-hero';
import { ProjectStoryBody } from '@/components/storytelling/project-story-body';

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

      {/* 2. BILINGUAL CHAPTERS NAVIGATION, BESPOKE 3D STORYTELLING, PAGER & CTA */}
      <ProjectStoryBody
        project={project}
        prevProject={prevProject}
        nextProject={nextProject}
      />
    </main>
  );
}
