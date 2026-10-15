import Link from 'next/link';
import { api, requireAdmin } from '@/lib/api';
import type { Project } from '@/lib/types';
import { MutationButton } from '@/components/forms';

export default async function AdminProjects() {
  await requireAdmin();
  const projects = await api<Project[]>('/admin/projects', true);

  return (
    <>
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            YOUR WORK
          </p>
          <h1>
            Projects
          </h1>
        </div>
        <Link className="button button-dark" href="/admin/projects/new">
          New project +
        </Link>
      </div>
      {!projects.length && (
        <div className="form-panel">
          <h2>
            Your first story starts here.
          </h2>
          <p>
            Create a project to document the problem, your approach, and the result.
          </p>
        </div>
      )}
      <div className="admin-list">
        {projects.map((project) => (
          <article className="admin-list-item" key={project._id}>
            <div>
              <span className="badge">
                {project.published ? 'Published' : 'Draft'}
              </span>
              {project.featured && (
                <span className="badge">
                  Featured
                </span>)}
              <h2>
                <Link href={`/admin/projects/${project._id}`}>
                  {project.title}
                </Link>
              </h2>
              <p>
                {project.category} · {project.year}
              </p>
            </div>
            <div className="row-actions">
              <Link className="button button-outline" href={`/admin/projects/${project._id}`}>
                Edit
              </Link>
              <MutationButton endpoint={`/api/admin/projects/${project._id}`} method="DELETE" label="Delete" confirmMessage={`Delete “${project.title}”? This cannot be undone.`} />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
