import Link from 'next/link';
import { api, requireAdmin } from '@/lib/api';
import type { Project } from '@/lib/types';
import { defaultProjects, STORYTELLING_MODES_CATALOG } from '@/lib/types';
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
        {projects.map((project) => {
          const modeMeta = STORYTELLING_MODES_CATALOG.find((m) => m.id === project.storytellingStyle);
          return (
            <article className="admin-list-item" key={project._id}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
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
                  {modeMeta && (
                    <span className="badge badge-accent" style={{ background: 'rgba(37, 99, 235, 0.1)', color: '#2563EB', borderColor: '#93C5FD' }}>
                      {modeMeta.icon} {modeMeta.titleVi}
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
          );
        })}
      </div>
    </>
  );
}
