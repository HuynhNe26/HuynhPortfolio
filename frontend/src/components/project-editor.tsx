import Link from 'next/link';
import type { Project } from '@/lib/types';
import { ApiForm, Field } from './forms';

export function ProjectEditor({ project }: { project?: Project; }) {
  return (
    <>
      <Link className="text-link" href="/admin/projects">
        ← Projects
      </Link>
      <h1>
        {project ? 'Edit project' : 'A new project story'}
      </h1>
      <p className="muted">
        Write in plain text. Separate technology names with commas.
      </p>
      <div className="form-panel">
        <ApiForm endpoint={project ? `/api/admin/projects/${project._id}` : '/api/admin/projects'} method={project ? 'PUT' : 'POST'} submitLabel="Save project" transform="project" redirectTo="/admin/projects">
          <div className="form-grid">
            <Field name="title" label="Project title" defaultValue={project?.title} required minLength={2} maxLength={100} />
            <Field name="slug" label="URL slug" defaultValue={project?.slug} required minLength={2} maxLength={100} placeholder="my-project" />
            <Field name="category" label="Category" defaultValue={project?.category} required minLength={2} maxLength={60} />
            <Field name="role" label="Your role" defaultValue={project?.role} required minLength={2} maxLength={100} />
            <Field name="year" label="Year" type="number" defaultValue={project?.year || new Date().getFullYear()} min={2000} max={2100} required />
            <Field name="technologies" label="Technologies, comma separated" defaultValue={project?.technologies.join(', ')} required />
          </div>
          <Field name="summary" label="Short summary" multiline defaultValue={project?.summary} required minLength={10} maxLength={400} />
          <Field name="problem" label="The problem" multiline defaultValue={project?.problem} required minLength={20} maxLength={8000} />
          <Field name="approach" label="Your approach" multiline defaultValue={project?.approach} required minLength={20} maxLength={8000} />
          <Field name="outcome" label="The outcome" multiline defaultValue={project?.outcome} required minLength={20} maxLength={8000} />
          <Field name="coverUrl" label="Cover image HTTPS URL (optional)" type="url" defaultValue={project?.coverUrl} maxLength={2048} />
          <Field name="liveUrl" label="Live project HTTPS URL (optional)" type="url" defaultValue={project?.liveUrl} maxLength={2048} />
          <Field name="sourceUrl" label="Source code HTTPS URL (optional)" type="url" defaultValue={project?.sourceUrl} maxLength={2048} />
          <label className="checkbox-label">
            <input type="checkbox" name="featured" defaultChecked={project?.featured} />
            Feature on homepage
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="published" defaultChecked={project?.published} />
            Publish publicly
          </label>
        </ApiForm>
      </div>
    </>
  );
}
