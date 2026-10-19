'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project, ProjectChapter, StorytellingModeId } from '@/lib/types';
import { STORYTELLING_MODES_CATALOG } from '@/lib/types';
import { useLanguage } from '@/context/language-context';
import { MasterInteractiveScrollytelling } from './master-interactive-scrollytelling';

interface StorytellingEngineProps {
  project: Project;
  chapters: ProjectChapter[];
}

/**
 * ============================================================================
 * 2. CINEMATIC SCROLLYTELLING VIEW (Style 2: e.g. Fashion Nail Morley)
 * Theatrical 21:9 letterbox frame, Ken Burns pan/zoom, scene counter,
 * gold bokeh shimmer particles, camera viewfinder reticle.
 * ============================================================================
 */
function CinematicScrollytellingView({ project, chapters }: { project: Project; chapters: ProjectChapter[] }) {
  const { lang } = useLanguage();
  const [activeScene, setActiveScene] = useState(0);
  const currentChapter = chapters[activeScene] || chapters[0];
  const currentImg = currentChapter.screenshots?.[0]?.url || project.coverUrl || '/projects/fashion-nail-hero.png';

  return (
    <section className="cinematic-storytelling-root" id="case-scrollytelling-engine">
      <div className="container">
        {/* THEATRICAL CINEMATIC STAGE */}
        <div className="cinematic-theater-viewport">
          {/* Top Letterbox Bar */}
          <div className="cinematic-letterbox letterbox-top">
            <div className="viewfinder-meta">
              <span className="rec-dot">●</span>
              <span className="viewfinder-text">REC 4K WIDESCREEN // 24 FPS • SHUTTER 1/48 • PRORES 422HQ</span>
            </div>
            <div className="viewfinder-scene-badge">
              {lang === 'vi' ? 'CẢNH' : 'SCENE'} {activeScene + 1} / {chapters.length}
            </div>
          </div>

          {/* Film Visual Container with Ken Burns Zoom */}
          <div className="cinematic-film-stage">
            <Image
              key={currentImg}
              src={currentImg}
              alt={currentChapter.title}
              width={1400}
              height={700}
              className="cinematic-film-img animate-ken-burns"
              priority
              unoptimized
            />
            {/* Ambient Vignette & Golden Lens Flare */}
            <div className="cinematic-film-vignette" />
            <div className="cinematic-lens-flare" />

            {/* Overlaid Subtitle & Scene Focus Card */}
            <div className="cinematic-scene-overlay-card">
              <span className="cinematic-chapter-tag">
                ✦ {lang === 'vi' ? 'CHƯƠNG' : 'CHAPTER'} {currentChapter.number}
              </span>
              <h3 className="cinematic-scene-title">{currentChapter.title}</h3>
              <p className="cinematic-scene-desc">{currentChapter.content}</p>

              {currentChapter.technicalNotes && currentChapter.technicalNotes.length > 0 && (
                <div className="cinematic-tech-pills">
                  {currentChapter.technicalNotes.map((note, idx) => (
                    <span key={idx} className="cinematic-tech-pill">
                      ✦ {note}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Letterbox Bar with Scrubbing Timeline */}
          <div className="cinematic-letterbox letterbox-bottom">
            <div className="cinematic-scene-scrubber">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  className={`cinematic-scene-btn ${idx === activeScene ? 'active' : ''}`}
                  onClick={() => setActiveScene(idx)}
                >
                  <span className="scene-num">{ch.number}</span>
                  <span className="scene-title-preview">{ch.title.split('&')[0]}</span>
                </button>
              ))}
            </div>

            <div className="cinematic-nav-arrows">
              <button
                type="button"
                className="btn-cinematic-nav"
                disabled={activeScene === 0}
                onClick={() => setActiveScene((p) => Math.max(0, p - 1))}
              >
                ◀ {lang === 'vi' ? 'Cảnh trước' : 'Prev'}
              </button>
              <button
                type="button"
                className="btn-cinematic-nav"
                disabled={activeScene === chapters.length - 1}
                onClick={() => setActiveScene((p) => Math.min(chapters.length - 1, p + 1))}
              >
                {lang === 'vi' ? 'Cảnh sau' : 'Next'} ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * 3. TIMELINE-BASED STORYTELLING VIEW (Style 3: e.g. MediCare AI Triage)
 * Interactive vertical chronological spine, milestone badges, vital signs
 * ECG waveform, audit trail stamps, progressive reveal.
 * ============================================================================
 */
function TimelineStorytellingView({ project, chapters }: { project: Project; chapters: ProjectChapter[] }) {
  const { lang } = useLanguage();
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const milestonePhases = [
    { phaseVi: 'GIAI ĐOẠN 01', phaseEn: 'PHASE 01', time: '00:00 - INTAKE', icon: '🏥' },
    { phaseVi: 'GIAI ĐOẠN 02', phaseEn: 'PHASE 02', time: '02:15 - AI TRIAGE', icon: '🤖' },
    { phaseVi: 'GIAI ĐOẠN 03', phaseEn: 'PHASE 03', time: '05:30 - TELEHEALTH', icon: '📞' },
    { phaseVi: 'GIAI ĐOẠN 04', phaseEn: 'PHASE 04', time: '08:45 - RX DISPENSE', icon: '💊' },
    { phaseVi: 'GIAI ĐOẠN 05', phaseEn: 'PHASE 05', time: '12:00 - VITAL MONITOR', icon: '🩺' },
    { phaseVi: 'GIAI ĐOẠN 06', phaseEn: 'PHASE 06', time: '15:30 - HIPAA VAULT', icon: '🔒' },
    { phaseVi: 'GIAI ĐOẠN 07', phaseEn: 'PHASE 07', time: '24:00 - DEPLOYMENT', icon: '🚀' },
  ];

  return (
    <section className="timeline-storytelling-root" id="case-scrollytelling-engine">
      <div className="container">
        {/* TIMELINE HEADER STATUS STRIP */}
        <div className="timeline-journey-header">
          <div className="timeline-pulse-monitor">
            <span className="ecg-dot" />
            <span className="ecg-title">
              {lang === 'vi' ? 'TRỤC THỜI GIAN LÂM SÀNG & TIẾN TRÌNH PHÁT TRIỂN' : 'LONGITUDINAL CLINICAL TIMELINE JOURNEY'}
            </span>
          </div>
          <div className="timeline-step-badge">
            {lang === 'vi' ? 'Mốc đang chọn:' : 'Active Node:'} {selectedMilestone + 1} / {chapters.length}
          </div>
        </div>

        {/* CHRONOLOGICAL MILESTONE TRACK */}
        <div className="timeline-track-layout">
          {/* Left Vertical Spine with Milestones */}
          <div className="timeline-spine-col">
            <div className="timeline-spine-line" />
            {chapters.map((ch, idx) => {
              const meta = milestonePhases[idx] || milestonePhases[0];
              const isSelected = idx === selectedMilestone;
              return (
                <div
                  key={ch.id}
                  className={`timeline-milestone-node ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedMilestone(idx)}
                >
                  <div className="milestone-marker">
                    <span className="milestone-icon">{meta.icon}</span>
                  </div>
                  <div className="milestone-info">
                    <div className="milestone-meta-row">
                      <span className="milestone-phase">{lang === 'vi' ? meta.phaseVi : meta.phaseEn}</span>
                      <span className="milestone-time">{meta.time}</span>
                    </div>
                    <h4 className="milestone-title">{ch.title}</h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Active Milestone Focus Card */}
          <div className="timeline-focus-col">
            <div className="timeline-detail-card">
              {/* Screenshot Preview */}
              <div className="timeline-preview-frame">
                <Image
                  src={chapters[selectedMilestone]?.screenshots?.[0]?.url || project.coverUrl || '/projects/medicare-hero.png'}
                  alt={chapters[selectedMilestone]?.title || project.title}
                  width={900}
                  height={500}
                  className="timeline-preview-img"
                  unoptimized
                />
                <div className="timeline-vitals-overlay">
                  <span>HR: 72 bpm</span>
                  <span>SpO2: 98%</span>
                  <span>BP: 120/80</span>
                  <span className="vitals-tag">LIVE SIMULATION</span>
                </div>
              </div>

              {/* Milestone Narrative & Technical Specs */}
              <div className="timeline-narrative-box">
                <div className="narrative-phase-eyebrow">
                  <span className="phase-pill">
                    {lang === 'vi' ? 'CHƯƠNG' : 'CHAPTER'} {chapters[selectedMilestone]?.number}
                  </span>
                  <span className="phase-timestamp">
                    {milestonePhases[selectedMilestone]?.time}
                  </span>
                </div>

                <h3 className="timeline-card-heading">
                  {chapters[selectedMilestone]?.title}
                </h3>

                <p className="timeline-card-desc">
                  {chapters[selectedMilestone]?.content}
                </p>

                {chapters[selectedMilestone]?.technicalNotes && (
                  <div className="timeline-tech-checklist">
                    <strong>{lang === 'vi' ? 'Tiêu chuẩn kỹ thuật áp dụng:' : 'Applied Technical Standards:'}</strong>
                    <ul>
                      {chapters[selectedMilestone].technicalNotes?.map((note, nIdx) => (
                        <li key={nIdx}>
                          <span className="check-icon">✓</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * 4. 3D EXPLODED-VIEW STORYTELLING VIEW (Style 4: e.g. SkyRoute Aviation Ops)
 * Real CSS 3D isometric exploded perspective with 4 isolated system planes:
 * Presentation UI ➔ Gateway ➔ Aerodynamic Engine ➔ PostGIS / Redis Geo.
 * ============================================================================
 */
function ExplodedViewStorytellingView({ project, chapters }: { project: Project; chapters: ProjectChapter[] }) {
  const { lang } = useLanguage();
  const [isExploded, setIsExploded] = useState(true);
  const [activeLayer, setActiveLayer] = useState<number>(3); // 0 to 3

  const systemLayers = [
    {
      id: 0,
      nameVi: 'Tầng 1: PostGIS & Redis Geo Data Store',
      nameEn: 'Layer 1: PostGIS & Redis Geo Spatial Store',
      tech: 'Redis Geo / PostgreSQL Neon Serverless',
      descVi: 'Lưu trữ chỉ mục không gian GeoHash, xử lý truy vấn GEORADIUS dưới 5ms.',
      descEn: 'Sub-5ms in-memory geospatial queries indexing global airspace coordinates.',
      color: '#10B981',
    },
    {
      id: 1,
      nameVi: 'Tầng 2: Động cơ C.G & Khí động học Tàu bay',
      nameEn: 'Layer 2: Weight & Balance Aerodynamic C.G Engine',
      tech: 'C.G Physics Engine / Boeing 777F Envelope',
      descVi: 'Tính toán trọng tâm % MAC và đa giác phong bì an toàn cất/hạ cánh thời gian thực.',
      descEn: 'Real-time % MAC calculation with automated flight trim polygon boundary checks.',
      color: '#F59E0B',
    },
    {
      id: 2,
      nameVi: 'Tầng 3: Cổng Thu nhận Telemetry & Sơ đồ Hầm hàng',
      nameEn: 'Layer 3: ACARS Telex & 28-Bay Cargo Hold Matrix',
      tech: 'Node.js WebSocket Cluster / IATA Loadsheet',
      descVi: 'Phân bổ 28 vị trí container ULD, cách ly hàng nguy hiểm và ký số IATA loadsheet.',
      descEn: '28-position ULD container hold layout with tamper-evident cryptographic checksums.',
      color: '#6366F1',
    },
    {
      id: 3,
      nameVi: 'Tầng 4: Radar Không lưu & Cockpit HUD Telemetry',
      nameEn: 'Layer 4: ADS-B 1090MHz Radar Map & Cockpit HUD',
      tech: 'Next.js 15 / Leaflet Radar / 60FPS WebGL',
      descVi: 'Bản đồ radar không lưu giám sát chuyến bay toàn cầu với tần số ADS-B 1090MHz.',
      descEn: 'Global flight operations radar streaming telemetry vectors with sub-80ms latency.',
      color: '#38BDF8',
    },
  ];

  return (
    <section className="exploded-storytelling-root" id="case-scrollytelling-engine">
      <div className="container">
        {/* CONTROL TOOLBAR: EXPLODE / COLLAPSE & LAYER SWITCHER */}
        <div className="exploded-controls-toolbar">
          <div className="exploded-status-tag">
            <span className="radar-ping" />
            <span>{lang === 'vi' ? '3D EXPLODED ARCHITECTURE STACK' : '3D EXPLODED ARCHITECTURE STACK'}</span>
          </div>

          <div className="exploded-action-group">
            <button
              type="button"
              className={`btn-exploded-mode ${isExploded ? 'active' : ''}`}
              onClick={() => setIsExploded(!isExploded)}
            >
              {isExploded
                ? (lang === 'vi' ? '⚡ Thu gọn các tầng (Collapse)' : '⚡ Collapse Stack')
                : (lang === 'vi' ? '💥 Bóc tách 3D (Explode)' : '💥 Explode 3D Layers')}
            </button>
          </div>
        </div>

        {/* 3D ISOMETRIC STAGE */}
        <div className="exploded-3d-stage">
          <div className={`isometric-stack-container ${isExploded ? 'is-exploded-state' : 'is-collapsed-state'}`}>
            {systemLayers.map((layer) => {
              const isSelected = activeLayer === layer.id;
              // Z offset calculation for 3D explosion
              const zOffset = isExploded ? layer.id * 85 : layer.id * 18;
              return (
                <div
                  key={layer.id}
                  className={`isometric-layer-plane layer-${layer.id} ${isSelected ? 'is-focused' : ''}`}
                  style={{
                    transform: `translateZ(${zOffset}px)`,
                    borderColor: layer.color,
                  }}
                  onClick={() => setActiveLayer(layer.id)}
                >
                  <div className="layer-plane-header">
                    <span className="layer-indicator-dot" style={{ background: layer.color }} />
                    <span className="layer-header-title">{lang === 'vi' ? layer.nameVi : layer.nameEn}</span>
                    <span className="layer-tech-badge">{layer.tech}</span>
                  </div>

                  <div className="layer-plane-body">
                    {layer.id === 3 && (
                      <div className="plane-mockup-radar">
                        <Image
                          src="/projects/skyroute-hero.png"
                          alt="Radar layer"
                          width={600}
                          height={300}
                          className="plane-img"
                          unoptimized
                        />
                      </div>
                    )}
                    {layer.id === 2 && (
                      <div className="plane-mockup-cargo">
                        <Image
                          src="/projects/skyroute-cargo.png"
                          alt="Cargo layer"
                          width={600}
                          height={300}
                          className="plane-img"
                          unoptimized
                        />
                      </div>
                    )}
                    {layer.id < 2 && (
                      <div className="plane-wireframe-grid">
                        <div className="wireframe-nodes">
                          <span className="grid-cell" />
                          <span className="grid-cell active" />
                          <span className="grid-cell" />
                          <span className="grid-cell active" />
                        </div>
                        <p className="wireframe-caption">{lang === 'vi' ? layer.descVi : layer.descEn}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail Callout for Focused Layer */}
          <div className="exploded-layer-inspect-box">
            <span className="inspect-pill" style={{ color: systemLayers[activeLayer].color }}>
              🎯 {lang === 'vi' ? 'TẦNG ĐANG PHÂN TÍCH' : 'ACTIVE LAYER ANALYSIS'}
            </span>
            <h4 className="inspect-title">
              {lang === 'vi' ? systemLayers[activeLayer].nameVi : systemLayers[activeLayer].nameEn}
            </h4>
            <p className="inspect-desc">
              {lang === 'vi' ? systemLayers[activeLayer].descVi : systemLayers[activeLayer].descEn}
            </p>
            <div className="inspect-footer">
              <span className="inspect-stack-label">Stack: {systemLayers[activeLayer].tech}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * 5. BENTO GRID STORYTELLING VIEW (Style 5)
 * Asymmetrical bento grid cards summarizing diverse system capabilities.
 * ============================================================================
 */
function BentoGridStorytellingView({ project, chapters }: { project: Project; chapters: ProjectChapter[] }) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const currentChapter = chapters[activeTab] || chapters[0];

  return (
    <section className="bento-storytelling-root" id="case-scrollytelling-engine">
      <div className="container">
        {/* Chapter Switcher Tabs */}
        <div className="bento-chapter-tabs">
          {chapters.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              className={`bento-tab-btn ${idx === activeTab ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span>{ch.number}.</span> {ch.title.split('&')[0]}
            </button>
          ))}
        </div>

        {/* Dynamic Bento Grid Layout */}
        <div className="bento-story-grid">
          {/* Card 1: Main Feature Showcase (2x2 span) */}
          <div className="bento-box box-main-feature">
            <div className="bento-img-wrap">
              <Image
                src={currentChapter.screenshots?.[0]?.url || project.coverUrl || '/projects/ticket-concert-hero.png'}
                alt={currentChapter.title}
                width={800}
                height={450}
                className="bento-hero-img"
                unoptimized
              />
            </div>
            <div className="bento-box-content">
              <span className="bento-badge">CHƯƠNG {currentChapter.number}</span>
              <h3>{currentChapter.title}</h3>
              <p>{currentChapter.content}</p>
            </div>
          </div>

          {/* Card 2: Performance Telemetry (1x1 span) */}
          <div className="bento-box box-kpi">
            <span className="kpi-icon">⚡</span>
            <div className="kpi-stat">50ms</div>
            <div className="kpi-label">{lang === 'vi' ? 'Độ trễ truyền WebSocket' : 'WebSocket Broadcast Latency'}</div>
            <small>{lang === 'vi' ? 'Cập nhật tức thời không va chạm' : 'Real-time anti-collision sync'}</small>
          </div>

          {/* Card 3: Reliability Score (1x1 span) */}
          <div className="bento-box box-kpi">
            <span className="kpi-icon">🛡️</span>
            <div className="kpi-stat">99.9%</div>
            <div className="kpi-label">{lang === 'vi' ? 'Độ sẵn sàng dịch vụ' : 'High Availability Uptime'}</div>
            <small>{lang === 'vi' ? 'Khả năng phục hồi sự cố tự động' : 'Zero-downtime container cluster'}</small>
          </div>

          {/* Card 4: Architecture Notes (2x1 span) */}
          <div className="bento-box box-tech-notes">
            <h4>{lang === 'vi' ? 'Kiến trúc kỹ thuật then chốt:' : 'Key Architecture Highlights:'}</h4>
            <ul className="bento-notes-list">
              {currentChapter.technicalNotes?.map((note, idx) => (
                <li key={idx}>✦ {note}</li>
              )) || <li>✦ {project.approach}</li>}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * 6. HORIZONTAL SCROLL STORYTELLING VIEW (Style 6: e.g. NH Huynh Portfolio)
 * Horizontal scrolling lookbook sliding across chapters like an executive book.
 * ============================================================================
 */
function HorizontalScrollStorytellingView({ project, chapters }: { project: Project; chapters: ProjectChapter[] }) {
  const { lang } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  return (
    <section className="horizontal-storytelling-root" id="case-scrollytelling-engine">
      <div className="container">
        {/* Horizontal Navigation Header */}
        <div className="horizontal-header-strip">
          <div>
            <span className="horizontal-eyebrow">
              📖 {lang === 'vi' ? 'LẬT TỪNG CHƯƠNG TRỰC QUAN (HORIZONTAL SCROLL)' : 'HORIZONTAL CHAPTER LOOKBOOK'}
            </span>
            <h3 className="horizontal-main-heading">{project.title}</h3>
          </div>

          <div className="horizontal-arrows">
            <button type="button" className="btn-h-nav" onClick={scrollLeft} aria-label="Cuộn trái">
              ←
            </button>
            <button type="button" className="btn-h-nav" onClick={scrollRight} aria-label="Cuộn phải">
              →
            </button>
          </div>
        </div>

        {/* Scrollable Track */}
        <div className="horizontal-cards-track" ref={trackRef}>
          {chapters.map((ch, idx) => (
            <article key={ch.id} className="horizontal-chapter-card">
              <div className="h-card-img-wrap">
                <Image
                  src={ch.screenshots?.[0]?.url || project.coverUrl || '/projects/portfolio-hero.png'}
                  alt={ch.title}
                  width={600}
                  height={340}
                  className="h-card-img"
                  unoptimized
                />
                <span className="h-card-num">CH.{ch.number}</span>
              </div>

              <div className="h-card-body">
                <h4 className="h-card-title">{ch.title}</h4>
                <p className="h-card-desc">{ch.content}</p>

                {ch.technicalNotes && ch.technicalNotes.length > 0 && (
                  <div className="h-card-notes">
                    <small>✦ {ch.technicalNotes[0]}</small>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * 7. INTERACTIVE HOTSPOT STORYTELLING VIEW (Style 7: e.g. ExamPlatform AI)
 * Large interactive UI canvas with numbered hotspot pins & popover inspection.
 * ============================================================================
 */
function InteractiveHotspotStorytellingView({ project, chapters }: { project: Project; chapters: ProjectChapter[] }) {
  const { lang } = useLanguage();
  const [selectedHotspot, setSelectedHotspot] = useState(0);

  const hotspots = [
    {
      id: 0,
      x: 32,
      y: 35,
      titleVi: 'Phòng thi Trực tuyến Không phân tâm (Zero-Noise)',
      titleEn: 'Distraction-Free Exam Interface (Zero-Noise)',
      descVi: 'Giao diện tối giản loại bỏ 100% tiếng ồn thị giác, tối đa hóa tập trung cho thí sinh.',
      descEn: 'Minimalist view cutting visual noise, maximizing candidate cognitive bandwidth.',
      stack: 'Tailwind CSS / Canvas 60FPS',
    },
    {
      id: 1,
      x: 72,
      y: 42,
      titleVi: 'Hệ thống Telemetry Giám sát Gian lận Tab Defocus',
      titleEn: 'Anti-Cheat Tab Defocus Telemetry Engine',
      descVi: 'Bắt sự kiện chuyển tab, thu nhỏ cửa sổ và gửi cảnh báo vi phạm về máy chủ.',
      descEn: 'Captures tab blur / defocus events and logs security breaches in real time.',
      stack: 'Page Visibility API / JWT Token',
    },
    {
      id: 2,
      x: 52,
      y: 65,
      titleVi: 'Cơ chế Tự động Lưu Câu trả lời (Redis Cache 6ms)',
      titleEn: 'Autosave Response Engine (Redis Cache 6ms)',
      descVi: 'Lưu đáp án vào bộ nhớ Redis chỉ sau 6ms, bảo vệ bài thi kể cả khi mất kết nối mạng.',
      descEn: 'Persists responses to Redis within 6ms, safeguarding progress across network drops.',
      stack: 'Redis TTL / Debounce 300ms',
    },
    {
      id: 3,
      x: 85,
      y: 22,
      titleVi: 'Đồng hồ Đếm ngược Thời gian thi Đồng bộ Máy chủ',
      titleEn: 'Server-Synchronized Countdown Timer',
      descVi: 'Đồng bộ thời gian còn lại với server, chống chỉnh sửa đồng hồ máy tính cục bộ.',
      descEn: 'NTP-synchronized countdown timer immune to local client clock manipulation.',
      stack: 'WebSocket Heartbeat / UTC Sync',
    },
  ];

  const currentHotspot = hotspots[selectedHotspot] || hotspots[0];

  return (
    <section className="hotspot-storytelling-root" id="case-scrollytelling-engine">
      <div className="container">
        <div className="hotspot-header">
          <span className="hotspot-eyebrow">
            🎯 {lang === 'vi' ? 'KHÁM PHÁ CÁC ĐIỂM CHỨC NĂNG (INTERACTIVE HOTSPOTS)' : 'INTERACTIVE HOTSPOT DISCOVERY'}
          </span>
          <p className="hotspot-guide-text">
            {lang === 'vi'
              ? 'Bấm vào các điểm ghim số trên giao diện để giải thích cơ chế kỹ thuật.'
              : 'Click on numbered hotspot pins on the screen to inspect underlying engineering mechanisms.'}
          </p>
        </div>

        {/* INTERACTIVE STAGE CANVAS */}
        <div className="hotspot-stage-wrapper">
          <div className="hotspot-canvas">
            <Image
              src={project.coverUrl || '/projects/examplatform-hero.png'}
              alt={project.title}
              width={1100}
              height={620}
              className="hotspot-stage-img"
              unoptimized
            />

            {/* Glowing Hotspot Pins */}
            {hotspots.map((hs, idx) => (
              <button
                key={hs.id}
                type="button"
                className={`hotspot-canvas-pin ${idx === selectedHotspot ? 'is-active' : ''}`}
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                onClick={() => setSelectedHotspot(idx)}
                aria-label={`Hotspot ${idx + 1}`}
              >
                <span className="pin-pulse" />
                <span className="pin-number">{idx + 1}</span>
              </button>
            ))}
          </div>

          {/* Active Hotspot Inspector Card */}
          <div className="hotspot-inspector-card">
            <div className="inspector-pill">
              POINT 0{selectedHotspot + 1} • {currentHotspot.stack}
            </div>
            <h4 className="inspector-heading">
              {lang === 'vi' ? currentHotspot.titleVi : currentHotspot.titleEn}
            </h4>
            <p className="inspector-text">
              {lang === 'vi' ? currentHotspot.descVi : currentHotspot.descEn}
            </p>
            <div className="inspector-hotspots-pills">
              {hotspots.map((hs, idx) => (
                <button
                  key={hs.id}
                  type="button"
                  className={`inspector-nav-pill ${idx === selectedHotspot ? 'active' : ''}`}
                  onClick={() => setSelectedHotspot(idx)}
                >
                  Pin {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * 8. BEFORE–AFTER TRANSFORMATION VIEW (Style 8)
 * Interactive split comparison slider contrasting Before vs After.
 * ============================================================================
 */
function BeforeAfterStorytellingView({ project }: { project: Project }) {
  const { lang } = useLanguage();
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="before-after-storytelling-root" id="case-scrollytelling-engine">
      <div className="container">
        <div className="ba-header">
          <span className="ba-eyebrow">
            ⚖️ {lang === 'vi' ? 'ĐỐI CHIẾU TRƯỚC VÀ SAU KHI TỐI ƯU (BEFORE - AFTER)' : 'BEFORE VS AFTER TRANSFORMATION'}
          </span>
          <h3>{lang === 'vi' ? 'Vấn Đề Thách Thức vs Giải Pháp Triển Khai' : 'Challenge vs Engineered Solution'}</h3>
        </div>

        {/* Comparison Stage Slider */}
        <div className="ba-slider-container">
          <div className="ba-comparison-wrap">
            {/* Left/Before State Card */}
            <div className="ba-card before-card">
              <span className="ba-label red">{lang === 'vi' ? 'TRƯỚC KHI TỐI ƯU (BEFORE)' : 'BEFORE OPTIMIZATION'}</span>
              <h4>{lang === 'vi' ? 'Thách thức & Bế tắc kỹ thuật' : 'Legacy Pain Points'}</h4>
              <p>{project.problem}</p>
              <div className="ba-kpis">
                <span className="kpi-tag bad">❌ 15% Sai lệch tải trọng</span>
                <span className="kpi-tag bad">❌ Trễ 45 phút điều phái</span>
                <span className="kpi-tag bad">❌ Thao tác Excel thủ công</span>
              </div>
            </div>

            {/* Right/After State Card */}
            <div className="ba-card after-card">
              <span className="ba-label green">{lang === 'vi' ? 'SAU KHI TRIỂN KHAI (AFTER)' : 'AFTER TRANSFORMATION'}</span>
              <h4>{lang === 'vi' ? 'Kết quả Bứt phá & Giá trị' : 'Engineered Solution Value'}</h4>
              <p>{project.outcome}</p>
              <div className="ba-kpis">
                <span className="kpi-tag good">✓ 0% Lỗi va chạm ghế / tải trọng</span>
                <span className="kpi-tag good">✓ Độ trễ phản hồi sub-50ms</span>
                <span className="kpi-tag good">✓ 99.9% Uptime kiểm toán</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * 9. DATA-FLOW STORYTELLING VIEW (Style 9: e.g. Ticket Concert Agentic RAG)
 * Animated interactive data pipeline tracing:
 * Client ➔ WebSocket Gateway ➔ AI Agent RAG ➔ Redis Lock ➔ MoMo ➔ Database.
 * ============================================================================
 */
function DataFlowStorytellingView({ project, chapters }: { project: Project; chapters: ProjectChapter[] }) {
  const { lang } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const pipelineNodes = [
    {
      id: 0,
      labelVi: '1. Khách Xem Ghế',
      labelEn: '1. Client Browser',
      descVi: 'Khách click chọn ghế VIP-D04 trên sơ đồ sân vận động.',
      descEn: 'User selects seat VIP-D04 on stadium seating map.',
      latency: '0ms',
    },
    {
      id: 1,
      labelVi: '2. WebSocket Cluster',
      labelEn: '2. WebSocket Cluster',
      descVi: 'Broadcast sự kiện SEAT_LOCKED đến tất cả khách khác trong 50ms.',
      descEn: 'Broadcasts SEAT_LOCKED event to all clients in 50ms.',
      latency: '34ms',
    },
    {
      id: 2,
      labelVi: '3. LangChain & Gemini RAG',
      labelEn: '3. LangChain & Gemini RAG',
      descVi: 'Truy xuất chính sách vé và sơ đồ thực tế không ảo giác trong 340ms.',
      descEn: 'Queries vector store & rules without hallucinations in 340ms.',
      latency: '340ms',
    },
    {
      id: 3,
      labelVi: '4. Redis Atomic Lock',
      labelEn: '4. Redis Atomic Lock',
      descVi: 'Khóa giữ chỗ nguyên tử với TTL 600 giây, triệt tiêu race condition.',
      descEn: 'Atomic mutex lock with Redis TTL 600s eliminating race conditions.',
      latency: '6ms',
    },
    {
      id: 4,
      labelVi: '5. MoMo HMAC Gateway',
      labelEn: '5. MoMo HMAC Gateway',
      descVi: 'Quét mã QR và đối soát chữ ký số mật mã học qua IPN webhook.',
      descEn: 'QR scan with HMAC SHA-256 cryptographic signature verification.',
      latency: '180ms',
    },
    {
      id: 5,
      labelVi: '6. Neon PostgreSQL DB',
      labelEn: '6. Neon PostgreSQL DB',
      descVi: 'Ghi nhận giao dịch ACID-compliant và phát hành vé điện tử QR.',
      descEn: 'ACID transaction committed & e-ticket QR generated in 420ms.',
      latency: '25ms',
    },
  ];

  const runSimulation = () => {
    setIsSimulating(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < pipelineNodes.length) {
        setActiveStep(step);
      } else {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 600);
  };

  return (
    <section className="dataflow-storytelling-root" id="case-scrollytelling-engine">
      <div className="container">
        <div className="dataflow-header">
          <div>
            <span className="dataflow-eyebrow">
              ⚡ {lang === 'vi' ? 'LUỒNG TRUYỀN DỮ LIỆU THỜI GIAN THỰC (DATA-FLOW)' : 'REAL-TIME DATA-FLOW PIPELINE'}
            </span>
            <h3>{project.title}</h3>
          </div>

          <button
            type="button"
            className={`btn-simulate-packet ${isSimulating ? 'simulating' : ''}`}
            onClick={runSimulation}
            disabled={isSimulating}
          >
            {isSimulating
              ? (lang === 'vi' ? 'Đang truyền gói tin...' : 'Tracing packet...')
              : (lang === 'vi' ? '▶ Chạy mô phỏng luồng dữ liệu' : '▶ Simulate Data Pipeline')}
          </button>
        </div>

        {/* PIPELINE CIRCUIT BOARD */}
        <div className="dataflow-pipeline-board">
          {pipelineNodes.map((node, idx) => {
            const isActive = idx === activeStep;
            return (
              <div
                key={node.id}
                className={`pipeline-stage-node ${isActive ? 'is-active-packet' : ''}`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="node-head">
                  <span className="node-status-dot" />
                  <span className="node-name">{lang === 'vi' ? node.labelVi : node.labelEn}</span>
                  <span className="node-latency">{node.latency}</span>
                </div>
                <p className="node-desc">{lang === 'vi' ? node.descVi : node.descEn}</p>
                {idx < pipelineNodes.length - 1 && <span className="pipeline-cable-arrow">➔</span>}
              </div>
            );
          })}
        </div>

        {/* Live Packet Telemetry Card */}
        <div className="dataflow-packet-detail">
          <div className="packet-header">
            <span className="packet-badge">PACKET INSPECTOR // STAGE {activeStep + 1}</span>
            <span className="packet-latency-val">RESPONSE TIME: {pipelineNodes[activeStep].latency}</span>
          </div>
          <h4 className="packet-title">
            {lang === 'vi' ? pipelineNodes[activeStep].labelVi : pipelineNodes[activeStep].labelEn}
          </h4>
          <p className="packet-info">
            {lang === 'vi' ? pipelineNodes[activeStep].descVi : pipelineNodes[activeStep].descEn}
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * 10. DEVICE-MORPHING STORYTELLING VIEW (Style 10: e.g. VK Digital Hub)
 * Dynamic responsive device morphing between Desktop, Tablet, and Mobile.
 * ============================================================================
 */
function DeviceMorphingStorytellingView({ project, chapters }: { project: Project; chapters: ProjectChapter[] }) {
  const { lang } = useLanguage();
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  return (
    <section className="morphing-storytelling-root" id="case-scrollytelling-engine">
      <div className="container">
        <div className="morphing-header">
          <div>
            <span className="morphing-eyebrow">
              📱 {lang === 'vi' ? 'TRÌNH DIỄN ĐA THIẾT BỊ (DEVICE-MORPHING)' : 'DEVICE-MORPHING RESPONSIVE STAGE'}
            </span>
            <h3>{project.title}</h3>
          </div>

          {/* Device Mode Switcher Buttons */}
          <div className="device-switcher-buttons">
            <button
              type="button"
              className={`btn-device-mode ${deviceMode === 'desktop' ? 'active' : ''}`}
              onClick={() => setDeviceMode('desktop')}
            >
              🖥️ Desktop (1440px)
            </button>
            <button
              type="button"
              className={`btn-device-mode ${deviceMode === 'tablet' ? 'active' : ''}`}
              onClick={() => setDeviceMode('tablet')}
            >
              📱 Tablet (768px)
            </button>
            <button
              type="button"
              className={`btn-device-mode ${deviceMode === 'mobile' ? 'active' : ''}`}
              onClick={() => setDeviceMode('mobile')}
            >
              📲 Mobile (375px)
            </button>
          </div>
        </div>

        {/* Dynamic Morphing Device Shell */}
        <div className="morphing-stage-outer">
          <div className={`morphing-device-frame frame-${deviceMode}`}>
            <div className="device-bezel-top">
              <span className="camera-lens" />
              {deviceMode === 'mobile' && <span className="dynamic-island" />}
            </div>

            <div className="device-screen-inner">
              <Image
                src={project.coverUrl || '/projects/vk-digital-hero.png'}
                alt={project.title}
                width={1200}
                height={720}
                className="device-screen-img"
                unoptimized
              />
            </div>

            <div className="device-bezel-bottom">
              {deviceMode === 'mobile' && <span className="home-indicator-bar" />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * MASTER STORYTELLING ENGINE DISPATCHER
 * Routes to the exact storytelling view configured in Admin or project data.
 * Also offers a quick on-the-fly preview switcher so recruiters/admins can
 * test any of the 10 styles with 1 click!
 * ============================================================================
 */
export function StorytellingEngine({ project, chapters }: StorytellingEngineProps) {
  const { lang } = useLanguage();
  // Allow on-the-fly preview switching, defaulting to project's configured style
  const [selectedStyle, setSelectedStyle] = useState<StorytellingModeId>(
    (project.storytellingStyle as StorytellingModeId) || 'sticky-split'
  );

  const activeModeMeta = useMemo(() => {
    return (
      STORYTELLING_MODES_CATALOG.find((m) => m.id === selectedStyle) ||
      STORYTELLING_MODES_CATALOG[0]
    );
  }, [selectedStyle]);

  // Render the exact tailored storytelling component
  const renderEngine = () => {
    switch (selectedStyle) {
      case 'cinematic-scroll':
        return <CinematicScrollytellingView project={project} chapters={chapters} />;
      case 'timeline-based':
        return <TimelineStorytellingView project={project} chapters={chapters} />;
      case '3d-exploded':
        return <ExplodedViewStorytellingView project={project} chapters={chapters} />;
      case 'bento-grid':
        return <BentoGridStorytellingView project={project} chapters={chapters} />;
      case 'horizontal-scroll':
        return <HorizontalScrollStorytellingView project={project} chapters={chapters} />;
      case 'interactive-hotspot':
        return <InteractiveHotspotStorytellingView project={project} chapters={chapters} />;
      case 'before-after':
        return <BeforeAfterStorytellingView project={project} />;
      case 'data-flow':
        return <DataFlowStorytellingView project={project} chapters={chapters} />;
      case 'device-morphing':
        return <DeviceMorphingStorytellingView project={project} chapters={chapters} />;
      case 'sticky-split':
      default:
        return <MasterInteractiveScrollytelling project={project} chapters={chapters} />;
    }
  };

  return (
    <div className={`storytelling-engine-container mode-${selectedStyle}`}>
      {/* STORYTELLING MODE SWITCHER PREVIEW BAR */}
      <div className="storytelling-mode-preview-bar">
        <div className="container preview-bar-inner">
          <div className="current-mode-info">
            <span className="mode-eyebrow">
              {lang === 'vi' ? 'PHONG CÁCH KỂ CHUYỆN (STORYTELLING STYLE):' : 'ACTIVE STORYTELLING STYLE:'}
            </span>
            <span className="mode-active-pill">
              <span className="pill-icon">{activeModeMeta.icon}</span>
              <span className="pill-title">{lang === 'vi' ? activeModeMeta.titleVi : activeModeMeta.titleEn}</span>
            </span>
          </div>

          <div className="mode-quick-pills">
            <span className="quick-label">
              {lang === 'vi' ? 'Thử 10 phong cách khác:' : 'Test all 10 styles:'}
            </span>
            <div className="pills-scroll-row">
              {STORYTELLING_MODES_CATALOG.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`mode-quick-btn ${m.id === selectedStyle ? 'active' : ''}`}
                  onClick={() => setSelectedStyle(m.id)}
                  title={lang === 'vi' ? m.descriptionVi : m.descriptionEn}
                >
                  <span>{m.icon}</span>
                  <span className="btn-index">{m.index}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RENDER THE EXACT MATCHING BESPOKE STORYTELLING COMPONENT */}
      {renderEngine()}
    </div>
  );
}
