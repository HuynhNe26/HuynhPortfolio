import type { Metadata } from 'next';
import { publicContent } from '@/lib/api';
import { ProjectStackShowcase } from '@/components/project-stack-showcase';
import { ProjectsPageIntro } from '@/components/projects-page-intro';

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
      <ProjectsPageIntro />
      <ProjectStackShowcase projects={projects} />
    </main>
  );
}
