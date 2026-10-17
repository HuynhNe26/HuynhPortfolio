import type { Metadata } from 'next';
import { publicContent } from '@/lib/api';
import { ProjectStackShowcase } from '@/components/project-stack-showcase';

export const metadata: Metadata = {
  title: 'All Projects — Nguyễn Hoàng Huynh',
  description:
    'Full-stack web applications, AI integrations, and commercial digital solutions engineered by Nguyễn Hoàng Huynh.',
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const { projects } = await publicContent();

  return (
    <main id="main-content" className="container section">
      <div className="page-intro">
        <p className="eyebrow">PRODUCTION SYSTEMS &amp; CASE STUDIES</p>
        <h1>
          Engineered for scale &amp; resilience
          <span className="brand-dot">.</span>
        </h1>
        <p className="lead-text">
          Explore complete full-stack web applications, AI Agentic RAG implementations, and commercial web platforms engineered by Nguyễn Hoàng Huynh.
        </p>
      </div>

      <ProjectStackShowcase projects={projects} />
    </main>
  );
}
