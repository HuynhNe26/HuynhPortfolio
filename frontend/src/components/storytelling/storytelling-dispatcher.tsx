'use client';

import React from 'react';
import type { Project, ProjectChapter } from '@/lib/types';
import { AgenticCyberStorytelling } from './agentic-cyber-storytelling';
import { LuxuryEditorialStorytelling } from './luxury-editorial-storytelling';
import { TerminalTacticalStorytelling } from './terminal-tactical-storytelling';
import { GrowthPipelineStorytelling } from './growth-pipeline-storytelling';
import { AppleKeynoteStorytelling } from './apple-keynote-storytelling';

interface StorytellingDispatcherProps {
  project: Project;
  chapters: ProjectChapter[];
}

export function StorytellingDispatcher({ project, chapters }: StorytellingDispatcherProps) {
  // Resolve storytelling style
  let style = project.storytellingStyle;

  if (!style) {
    if (project.slug === 'ticket-concert-agentic-rag' || project._id === 'default-01') {
      style = 'agentic-radar';
    } else if (project.slug === 'fashion-nail-morley' || project._id === 'default-02') {
      style = 'luxury-editorial';
    } else if (project.slug === 'examplatform-ai' || project._id === 'default-03') {
      style = 'edtech-terminal';
    } else if (project.slug === 'vk-digital-hub' || project._id === 'default-04') {
      style = 'growth-pipeline';
    } else if (project.slug === 'nh-huynh-portfolio' || project._id === 'default-05') {
      style = 'apple-keynote';
    } else {
      // Deterministic hash assignment so arbitrary new projects cycle through distinct animations
      const styles = [
        'agentic-radar',
        'luxury-editorial',
        'edtech-terminal',
        'growth-pipeline',
        'apple-keynote',
      ];
      const str = project.slug || project._id || project.title || 'project';
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }
      style = styles[Math.abs(hash) % styles.length];
    }
  }

  switch (style) {
    case 'agentic-radar':
      return <AgenticCyberStorytelling project={project} chapters={chapters} />;
    case 'luxury-editorial':
      return <LuxuryEditorialStorytelling project={project} chapters={chapters} />;
    case 'edtech-terminal':
      return <TerminalTacticalStorytelling project={project} chapters={chapters} />;
    case 'growth-pipeline':
      return <GrowthPipelineStorytelling project={project} chapters={chapters} />;
    case 'apple-keynote':
      return <AppleKeynoteStorytelling project={project} chapters={chapters} />;
    default:
      return <AgenticCyberStorytelling project={project} chapters={chapters} />;
  }
}
