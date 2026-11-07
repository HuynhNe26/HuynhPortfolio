'use client';

import React from 'react';
import Link from 'next/link';
import type { Project } from '@/lib/types';
import { useLanguage } from '@/context/language-context';
import { getLocalizedProject, isPublicLiveUrl } from '@/lib/project-translations';
import { TechIcon } from '@/components/tech-icon';

interface ProjectUnderConstructionProps {
  project: Project;
}

export function ProjectUnderConstruction({ project }: ProjectUnderConstructionProps) {
  const { lang } = useLanguage();
  const localized = getLocalizedProject(project, lang);
  const hasPublicLive = isPublicLiveUrl(project.liveUrl) && project.slug !== 'nh-huynh-portfolio';

  const copy =
    lang === 'vi'
      ? {
          back: 'Quay lại danh sách dự án',
          badge: 'TRANG ĐANG ĐƯỢC HOÀN THIỆN',
          subtitle:
            'Nội dung phân tích kiến trúc, sơ đồ hệ thống và số liệu chi tiết của dự án này đang được biên tập và cập nhật lại để đảm bảo chất lượng tốt nhất. Vui lòng quay lại sau hoặc trải nghiệm trực tiếp sản phẩm thực tế.',
          step1: 'Sản phẩm & Mã nguồn',
          step1State: 'Đã sẵn sàng',
          step2: ' Ảnh chụp & Demo thực tế',
          step2State: 'Đang chuẩn hóa',
          step3: 'Bài viết chi tiết kỹ thuật',
          step3State: 'Đang biên soạn',
          techLabel: 'Công nghệ cốt lõi của dự án',
          backAllBtn: 'Xem tất cả dự án',
          liveBtn: 'Trải nghiệm sản phẩm thực tế',
          contactBtn: 'Liên hệ trao đổi trực tiếp',
        }
      : lang === 'zh'
      ? {
          back: '返回项目列表',
          badge: '项目详情页正在完善中',
          subtitle:
            '该项目的系统架构拆解、核心技术细节与实测数据正在重新撰写与打磨中，以确保呈现最佳阅读体验。欢迎稍后访问，或直接体验线上运行产品。',
          step1: '核心系统与源码',
          step1State: '已完成',
          step2: '实机截图与演示',
          step2State: '整理优化中',
          step3: '深度技术案例解析',
          step3State: '正在撰写',
          techLabel: '项目核心技术栈',
          backAllBtn: '浏览全部项目',
          liveBtn: '访问线上产品',
          contactBtn: '直接联系交流',
        }
      : {
          back: 'Back to Projects',
          badge: 'PAGE UNDER CONSTRUCTION',
          subtitle:
            'The in-depth architecture breakdown, engineering trade-offs, and detailed documentation for this project are currently being rewritten and refined. Please check back soon or explore the live product directly.',
          step1: 'Core Product & Codebase',
          step1State: 'Ready',
          step2: 'Visual Assets & Walkthrough',
          step2State: 'Refining',
          step3: 'Technical Case Study',
          step3State: 'In Progress',
          techLabel: 'Core Technology Stack',
          backAllBtn: 'Explore All Projects',
          liveBtn: 'Visit Live Product',
          contactBtn: 'Contact Me Directly',
        };

  return (
    <section
      className="hh-wip-section"
      style={
        {
          '--wip-accent': project.themeColor || '#2563EB',
        } as React.CSSProperties
      }
    >
      <div className="container hh-wip-container">
        {/* TOP BACK NAVIGATION */}
        <div className="hh-wip-topbar">
          <Link href="/projects" className="hh-wip-back-link">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span className="hh-lang-text">{copy.back}</span>
          </Link>
        </div>

        {/* CENTRAL WORK-IN-PROGRESS CARD */}
        <div className="hh-wip-card">
          <div className="hh-wip-ambient-glow" aria-hidden="true" />

          {/* ANIMATED BLUEPRINT ICON + STATUS PILL */}
          <div className="hh-wip-badge-row">
            <span className="hh-wip-status-pill">
              <span className="hh-wip-pulse-dot" aria-hidden="true" />
              <span className="hh-wip-badge-text hh-lang-text">{copy.badge}</span>
            </span>
            <span className="hh-wip-category-chip">
              <span className="hh-lang-text">{localized.category}</span>
            </span>
          </div>

          <div className="hh-wip-icon-shell" aria-hidden="true">
            <svg
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>

          {/* PROJECT TITLE */}
          <h1 className="hh-wip-title">{localized.title}</h1>

          {/* EXPLANATION */}
          <p className="hh-wip-desc">{copy.subtitle}</p>

          {/* PROGRESS MILESTONES */}
          <div className="hh-wip-steps-grid">
            <div className="hh-wip-step is-done">
              <span className="hh-wip-step-indicator" aria-hidden="true">✓</span>
              <div className="hh-wip-step-body">
                <strong className="hh-wip-step-text hh-lang-text">{copy.step1}</strong>
                <span className="hh-wip-step-state hh-lang-text">{copy.step1State}</span>
              </div>
            </div>

            <div className="hh-wip-step is-active">
              <span className="hh-wip-step-indicator" aria-hidden="true">⟳</span>
              <div className="hh-wip-step-body">
                <strong className="hh-wip-step-text hh-lang-text">{copy.step2}</strong>
                <span className="hh-wip-step-state hh-lang-text">{copy.step2State}</span>
              </div>
            </div>

            <div className="hh-wip-step is-active">
              <span className="hh-wip-step-indicator" aria-hidden="true">✎</span>
              <div className="hh-wip-step-body">
                <strong className="hh-wip-step-text hh-lang-text">{copy.step3}</strong>
                <span className="hh-wip-step-state hh-lang-text">{copy.step3State}</span>
              </div>
            </div>
          </div>

          {/* CORE TECH STACK PREVIEW */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="hh-wip-tech-block">
              <span className="hh-wip-tech-label hh-lang-text">{copy.techLabel}</span>
              <div className="hh-wip-tech-list">
                {project.technologies.slice(0, 8).map((tech) => (
                  <span key={tech} className="hh-wip-tech-pill">
                    <TechIcon name={tech} className="hh-wip-tech-icon" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="hh-wip-actions">
            <Link href="/projects" className="button button-pro-primary hh-wip-btn-primary">
              <span className="hh-lang-text">{copy.backAllBtn}</span>
              <span aria-hidden="true">→</span>
            </Link>

            {hasPublicLive && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-pro-secondary hh-wip-btn-live"
              >
                <span className="hh-lang-text">{copy.liveBtn}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}

            <Link href="/contact" className="hh-wip-contact-btn">
              <span className="hh-lang-text">{copy.contactBtn}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
