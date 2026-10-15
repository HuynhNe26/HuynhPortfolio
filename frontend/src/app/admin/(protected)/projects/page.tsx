import Link from 'next/link';
import { api, requireAdmin } from '@/lib/api';
import type { Project } from '@/lib/types';
import { defaultProjects } from '@/lib/types';
import { MutationButton } from '@/components/forms';

export default async function AdminProjects() {
  await requireAdmin();

  let projects: Project[] = defaultProjects;
  try {
    const fetched = await api<Project[]>('/admin/projects', true);
    if (fetched && fetched.length > 0) {
      projects = fetched;
    }
  } catch {
    // Graceful offline fallback
  }

  return (
    <>
      <div className="section-heading">
        <div>
          <p className="eyebrow">PORTFOLIO / CASE STUDIES</p>
          <h1>Projects Management</h1>
        </div>
        <Link className="button button-dark" href="/admin/projects/new">
          New project +
        </Link>
      </div>

      <div className="admin-list">
        {projects.map((project) => (
          <article className="admin-list-item" key={project._id}>
            <div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <span className="badge">
                  {project.published ? 'Published' : 'Draft'}
                </span>
                {project.featured && (
                  <span className="badge">
                    Featured
                  </span>
                )}
                {project.status && (
                  <span className="badge">
                    {project.status}
                  </span>
                )}
              </div>
              <h2>
                <Link href={`/admin/projects/${project._id}`}>
                  {project.title}
                </Link>
              </h2>
              <p>
                {project.category} · {project.timeline || project.year} · {project.role}
              </p>
            </div>
            <div className="row-actions">
              <Link className="button button-outline" href={`/admin/projects/${project._id}`}>
                Edit Story
              </Link>
              <MutationButton
                endpoint={`/api/admin/projects/${project._id}`}
                method="DELETE"
                label="Delete"
                confirmMessage={`Delete “${project.title}”? This cannot be undone.`}
              />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
