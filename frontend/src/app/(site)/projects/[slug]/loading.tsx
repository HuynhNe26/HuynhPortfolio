'use client';

import { ProjectLoadingView } from '@/components/project-loading-overlay';

export default function ProjectDetailLoading() {
  return <ProjectLoadingView isFullPage={true} />;
}
