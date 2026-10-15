'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/lib/types';
import { EmptyProjects, ProjectCard } from '@/components/project-card';

interface ProjectFilterProps {
  projects: Project[];
  unavailable: boolean;
}

export function ProjectFilter({ projects, unavailable }: ProjectFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTech, setActiveTech] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['all', ...Array.from(set)];
  }, [projects]);

  const topTechnologies = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => {
      p.technologies?.forEach((t) => {
        counts.set(t, (counts.get(t) || 0) + 1);
      });
    });
    const sorted = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0])
      .slice(0, 8);
    return ['all', ...sorted];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCat = activeCategory === 'all' || project.category === activeCategory;
      const matchTech = activeTech === 'all' || project.technologies?.includes(activeTech);
      return matchCat && matchTech;
    });
  }, [projects, activeCategory, activeTech]);

  return (
    <div className="project-filter-system">
      <div className="filter-controls">
        <div className="filter-group">
          <span className="filter-label">Category:</span>
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {topTechnologies.length > 2 && (
          <div className="filter-group">
            <span className="filter-label">Tech Stack:</span>
            <div className="filter-buttons">
              {topTechnologies.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  className={`filter-btn ${activeTech === tech ? 'active' : ''}`}
                  onClick={() => setActiveTech(tech)}
                >
                  {tech === 'all' ? 'All Technologies' : tech}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="filter-results-info">
        <span>
          Showing {filteredProjects.length} of {projects.length} {projects.length === 1 ? 'project' : 'projects'}
        </span>
        {(activeCategory !== 'all' || activeTech !== 'all') && (
          <button
            type="button"
            className="text-link reset-btn"
            onClick={() => {
              setActiveCategory('all');
              setActiveTech('all');
            }}
          >
            Reset filters ✕
          </button>
        )}
      </div>

      {filteredProjects.length ? (
        <div className="project-grid">
          {filteredProjects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project._id} />
          ))}
        </div>
      ) : (
        <div className="empty-filter-state">
          <h3>No projects match your filter</h3>
          <p>Try resetting the category or technology filter to view all work.</p>
          <button
            type="button"
            className="button button-dark"
            onClick={() => {
              setActiveCategory('all');
              setActiveTech('all');
            }}
          >
            View all projects
          </button>
        </div>
      )}
    </div>
  );
}
