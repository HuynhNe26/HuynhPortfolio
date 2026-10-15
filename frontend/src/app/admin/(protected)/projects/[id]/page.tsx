import { notFound } from 'next/navigation';
import { ProjectEditor } from '@/components/project-editor';
import { api, ApiError, requireAdmin } from '@/lib/api';
import type { Project } from '@/lib/types';

export default async function EditProject({ params }: { params: Promise<{ id: string; }>; }) {
  await requireAdmin();
  const { id } = await params;

  if (!/^[a-f0-9]{24}$/i.test(id)) {
    notFound();
  }

  let project: Project;

  try {
    project = await api<Project>(`/admin/projects/${id}`, true);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }

  return 
  <ProjectEditor project={project} />;
}
