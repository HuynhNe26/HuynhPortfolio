import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/lib/types';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <Link
      className="project-card"
      href={`/projects/${project.slug}`}
      style={{
        '--card-accent': project.themeColor || '#3268D8',
        '--card-bg': project.themeBg || '#F5F5F7',
      } as React.CSSProperties}
    >
      <div className={`project-cover cover-${index % 3}`}>
        {project.coverUrl ? (
          <Image
            src={project.coverUrl}
            alt={`${project.title} project cover`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
        ) : (
          <div className="project-monogram" aria-hidden="true">
            <span className="mono-brand">{project.title.slice(0, 2).toUpperCase()}</span>
            <span className="mono-arrow">↗</span>
          </div>
        )}
        <div className="project-card-badges">
          <span className="project-category">{project.category}</span>
          {project.status && (
            <span className={`project-status-badge ${project.status === 'Ongoing' ? 'ongoing' : 'completed'}`}>
              <span className="status-dot" />
              {project.status}
            </span>
          )}
        </div>
      </div>

      <div className="project-info">
        <div>
          <p className="eyebrow">
            {project.timeline || `${project.year}`} • {project.role}
          </p>
          <h3>{project.title}</h3>
        </div>
        <span className="circle-arrow" aria-hidden="true">
          ↗
        </span>
      </div>

      <p className="project-summary-text">{project.summary}</p>

      <div className="project-card-footer">
        <div className="tags">
          {project.technologies.slice(0, 5).map((technology) => (
            <span key={technology} className="tech-tag">
              {technology}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="tech-tag more">+{project.technologies.length - 5}</span>
          )}
        </div>

        <span className="view-case-study">View Case Study ↗</span>
      </div>
    </Link>
  );
}

export function EmptyProjects({ unavailable }: { unavailable: boolean }) {
  return (
    <div className="empty-projects">
      <div className="empty-mark" aria-hidden="true">
        [ / ]
      </div>
      <div>
        <h3>{unavailable ? 'Project stories are on their way.' : 'A space for the work ahead.'}</h3>
        <p>
          {unavailable
            ? 'The project collection is currently unavailable. In the meantime, let’s talk about what you have in mind.'
            : 'New projects and the thinking behind them will appear here as they are published.'}
        </p>
      </div>
      <Link className="text-link" href="/contact">
        Start a conversation
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
