import type { Metadata } from 'next';
import { publicContent } from '@/lib/api';
import { EmptyProjects } from '@/components/project-card';
import { ProjectFilter } from '@/components/project-filter';

export const metadata: Metadata = {
  title: 'All Projects — Nguyễn Hoàng Huynh',
  description:
    'Full-stack web applications, AI integrations, and commercial digital solutions engineered by Nguyễn Hoàng Huynh.',
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const { projects, unavailable } = await publicContent();

  return (
    <main id="main-content" className="container section">
      <div className="page-intro">
        <p className="eyebrow">02 // SYSTEM MODULES &amp; PRODUCTION ARCHITECTURES</p>
        <h1>
          Engineered for scale &amp; resilience
          <span className="brand-dot">.</span>
        </h1>
        <p className="lead-text">
          Explore complete full-stack web applications, AI Agentic RAG implementations, and commercial web platforms engineered by Nguyễn Hoàng Huynh.
        </p>
      </div>

      {projects.length > 0 ? (
        <ProjectFilter projects={projects} unavailable={unavailable} />
      ) : (
        <EmptyProjects unavailable={unavailable} />
      )}
    </main>
  );
}
