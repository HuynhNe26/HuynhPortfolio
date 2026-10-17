import { ProjectEditor } from '@/components/project-editor';
import { requireAdmin } from '@/lib/api';

export default async function NewProject() {
  await requireAdmin();
  return <ProjectEditor />;
}
