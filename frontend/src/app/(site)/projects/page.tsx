import type { Metadata } from 'next';
import { publicContent } from '@/lib/api';
import { EmptyProjects, ProjectCard } from '@/components/project-card';

export const metadata: Metadata = {
  title: 'Work'
};
export const dynamic = 'force-dynamic';

export default async function Projects() {
  const { projects, unavailable } = await publicContent();

  return (
    <main id="main-content" className="container section">
      <div className="page-intro">
        <p className="eyebrow">
          THE WORK / THE THINKING
        </p>
        <h1>
          Built with purpose
          <span className="brand-dot">
            .
          </span>
        </h1>
        <p>
          Projects, experiments, and the decisions that brought them to life.
        </p>
      </div>
      {projects.length ? (
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project._id} />))}
        </div>
      ) : (
        <EmptyProjects unavailable={unavailable} />)}
    </main>
  );
}
