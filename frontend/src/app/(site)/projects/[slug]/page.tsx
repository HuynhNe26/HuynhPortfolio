import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { api, ApiError } from '@/lib/api';
import type { Project } from '@/lib/types';

const getProject = cache(async (slug: string) => {
  try {
    return await api<Project>(`/projects/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string; }>; }): Promise<Metadata> {
  const project = await getProject((await params).slug);
  return {
    title: project.title,
    description: project.summary
  };
}

export default async function ProjectStory({ params }: { params: Promise<{ slug: string; }>; }) {
  const project = await getProject((await params).slug);

  return (
    <main id="main-content" className="container section">
      <Link className="text-link" href="/projects">
        ← All work
      </Link>
      <div className="page-intro">
        <p className="eyebrow">
          {project.category} / {project.year}
        </p>
        <h1>
          {project.title}
        </h1>
        <p>
          {project.summary}
        </p>
      </div>
      <div className="story-meta">
        <div>
          <p className="eyebrow">
            ROLE
          </p>
          <p>
            {project.role}
          </p>
        </div>
        <div>
          <p className="eyebrow">
            TOOLKIT
          </p>
          <div className="tags">
            {project.technologies.map((item) => (
              <span key={item}>
                {item}
              </span>))}
          </div>
        </div>
        <div className="social-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live project ↗
            </a>)}{project.sourceUrl && (
              <a href={project.sourceUrl} target="_blank" rel="noreferrer">
                Source code ↗
              </a>)}
        </div>
      </div>
      {project.coverUrl && (
        <div className="story-cover">
          <Image src={project.coverUrl} alt={`${project.title} overview`} fill sizes="100vw" unoptimized priority />
        </div>)}
      <div className="story-sections">
        {[['01 / THE PROBLEM', 'Starting with why.', project.problem], ['02 / THE APPROACH', 'Making it work.', project.approach], ['03 / THE OUTCOME', 'What came together.', project.outcome]].map(([label, title, text]) => (
          <section className="story-section" key={label}>
            <div>
              <p className="eyebrow">
                {label}
              </p>
              <h2>
                {title}
              </h2>
            </div>
            <p className="preserve-lines">
              {text}
            </p>
          </section>))}
      </div>
      <Link className="button button-dark" href="/contact">
        Discuss a similar project ↗
      </Link>
    </main>
  );
}
