'use client';

import React from 'react';
import Link from 'next/link';
import type { Project, ProjectChapter } from '@/lib/types';
import { useLanguage } from '@/context/language-context';
import { MasterInteractiveScrollytelling } from './master-interactive-scrollytelling';

interface ProjectStoryBodyProps {
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
}

export function ProjectStoryBody({
  project,
  prevProject,
  nextProject,
}: ProjectStoryBodyProps) {
  const { t, lang } = useLanguage();

  const defaultChapters: ProjectChapter[] = lang === 'vi'
    ? [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Tổng quan & Giới thiệu Dự án',
          content: project.summary,
          technicalNotes: project.technologies,
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'Ý tưởng & Khái niệm Cốt lõi',
          content: project.approach,
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'Thách thức & Bài toán Đặt ra',
          content: project.problem,
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'Trải nghiệm & Thiết kế Giao diện',
          content: 'Thiết kế phân tầng trực quan, tối ưu hóa hiển thị thích ứng mọi thiết bị và hướng dẫn người dùng xuyên suốt toàn bộ vòng đời ứng dụng.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Kiến trúc Kỹ thuật & Công nghệ',
          content: project.approach,
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'Đóng góp & Trách nhiệm Của Tôi',
          content: `Trách nhiệm then chốt với vai trò ${project.role}: thiết kế kiến trúc component, xây dựng API endpoint, tích hợp cơ sở dữ liệu và tối ưu hiệu năng toàn diện.`,
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Kết quả & Bài học Rút ra',
          content: project.outcome,
        },
      ]
    : [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Introduction & Project Overview',
          content: project.summary,
          technicalNotes: project.technologies,
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'The Idea & Core Concept',
          content: project.approach,
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'The Challenge & Problem',
          content: project.problem,
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'The Experience & Design',
          content: 'Designed with clean hierarchy, responsive layout adaptation, and direct user guidance throughout the application lifecycle.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Engineering Architecture',
          content: project.approach,
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'My Contribution',
          content: `Key responsibilities as ${project.role}: full-stack feature development, component architecture, API routing, and performance optimization.`,
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Outcome & Reflection',
          content: project.outcome,
        },
      ];

  const chapters = project.chapters && project.chapters.length > 0
    ? project.chapters
    : defaultChapters;

  return (
    <>
      {/* CHAPTER NAVIGATION STRIP */}
      <nav className="chapter-sticky-nav" aria-label="Case study chapters">
        <div className="container chapter-nav-inner">
          <span className="chapter-nav-label">{t('story.chaptersNav')}</span>
          <div className="chapter-links-scroll">
            {chapters.map((ch) => (
              <a key={ch.id} href={`#${ch.id}`} className="chapter-nav-link">
                <span>{ch.number}</span> {ch.title.split('&')[0].trim()}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* MASTER SYNCHRONIZED INTERACTIVE SCROLLYTELLING ENGINE */}
      <MasterInteractiveScrollytelling
        project={project}
        chapters={chapters}
      />

      {/* PROJECT PAGER (PREV / NEXT) */}
      <section className="project-pager container">
        <div className="pager-grid">
          {prevProject ? (
            <Link href={`/projects/${prevProject.slug}`} className="pager-card prev">
              <span className="pager-direction">{t('story.prev')}</span>
              <h4>{prevProject.title}</h4>
              <span className="pager-cat">{prevProject.category}</span>
            </Link>
          ) : (
            <div className="pager-card empty" />
          )}

          {nextProject ? (
            <Link href={`/projects/${nextProject.slug}`} className="pager-card next">
              <span className="pager-direction">{t('story.next')}</span>
              <h4>{nextProject.title}</h4>
              <span className="pager-cat">{nextProject.category}</span>
            </Link>
          ) : (
            <div className="pager-card empty" />
          )}
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="story-contact-cta container">
        <div className="cta-inner">
          <p className="eyebrow">{t('story.ctaEyebrow')}</p>
          <h2>{t('story.ctaTitle')}</h2>
          <div className="cta-buttons">
            <Link href="/contact" className="button button-pro-primary">
              {t('story.ctaTalk')}
            </Link>
            <Link href="/projects" className="button button-pro-secondary">
              {t('story.ctaMore')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
