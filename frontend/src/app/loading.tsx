'use client';

import { ProjectLoadingView } from '@/components/project-loading-overlay';

export default function RootLoading() {
  return <ProjectLoadingView isFullPage={true} />;
}
