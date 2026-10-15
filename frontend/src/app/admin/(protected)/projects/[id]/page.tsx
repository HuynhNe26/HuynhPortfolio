import { notFound } from 'next/navigation';
import { ProjectEditor } from '@/components/project-editor';
import { api, requireAdmin } from '@/lib/api';
import type { Project } from '@/lib/types';
import { defaultProjects } from '@/lib/types';

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;

  let project: Project | undefined;

  if (id.startsWith('default-')) {
    project = defaultProjects.find((p) => p._id === id);
    if (!project) {
      notFound();
    }
  } else {
    try {
      project = await api<Project>(`/admin/projects/${id}`, true);
    } catch {
      project = defaultProjects.find((p) => p._id === id);
      if (!project) {
        notFound();
      }
    }
  }

  return <ProjectEditor project={project} />;
}
