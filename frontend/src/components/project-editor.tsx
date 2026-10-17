'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Project, ProjectChapter, ScreenshotItem } from '@/lib/types';

interface ProjectEditorProps {
  project?: Project;
}

export function ProjectEditor({ project }: ProjectEditorProps) {
  const router = useRouter();

  // Basic project fields
  const [title, setTitle] = useState(project?.title || '');
  const [slug, setSlug] = useState(project?.slug || '');
  const [category, setCategory] = useState(project?.category || '');
  const [role, setRole] = useState(project?.role || '');
  const [timeline, setTimeline] = useState(project?.timeline || '');
  const [teamSize, setTeamSize] = useState(project?.teamSize ? String(project.teamSize) : '');
  const [status, setStatus] = useState<'Completed' | 'Ongoing'>(project?.status || 'Completed');
  const [year, setYear] = useState(project?.year ? String(project.year) : String(new Date().getFullYear()));
  const [themeColor, setThemeColor] = useState(project?.themeColor || '#2563EB');
  const [themeBg, setThemeBg] = useState(project?.themeBg || '#EFF6FF');
  const [technologies, setTechnologies] = useState(project?.technologies ? project.technologies.join(', ') : '');
  const [summary, setSummary] = useState(project?.summary || '');
  const [problem, setProblem] = useState(project?.problem || '');
  const [approach, setApproach] = useState(project?.approach || '');
  const [outcome, setOutcome] = useState(project?.outcome || '');
  const [coverUrl, setCoverUrl] = useState(project?.coverUrl || '');
  const [liveUrl, setLiveUrl] = useState(project?.liveUrl || '');
  const [sourceUrl, setSourceUrl] = useState(project?.sourceUrl || '');
  const [featured, setFeatured] = useState(Boolean(project?.featured));
  const [published, setPublished] = useState(project ? Boolean(project.published) : true);

  // UNLIMITED DETAILED DESCRIPTIONS & CHAPTER STORYTELLING
  const [chapters, setChapters] = useState<ProjectChapter[]>(
    project?.chapters && project.chapters.length > 0
      ? project.chapters
      : [
          {
            id: 'chapter-01',
            number: '01',
            title: 'Giới thiệu & Tổng quan Dự án',
            content: project?.summary || 'Mô tả chi tiết mục tiêu, quy mô và bài toán giải quyết của dự án.',
            technicalNotes: ['React.js & Node.js architecture', 'PostgreSQL Neon persistence'],
            screenshots: project?.coverUrl ? [{ url: project.coverUrl, caption: 'Giao diện chính', alt: 'Giao diện' }] : [],
          },
        ]
  );

  const [pending, setPending] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 1. ADD CHAPTER (UNLIMITED)
  const handleAddChapter = () => {
    const nextIdx = chapters.length + 1;
    const padded = String(nextIdx).padStart(2, '0');
    setChapters((prev) => [
      ...prev,
      {
        id: `chapter-${Date.now()}`,
        number: padded,
        title: `Giai đoạn ${padded}: Chi tiết giải pháp kỹ thuật`,
        content: '',
        technicalNotes: [],
        screenshots: [],
      },
    ]);
  };

  // 2. REMOVE CHAPTER
  const handleRemoveChapter = (index: number) => {
    if (chapters.length <= 1) {
      if (!confirm('Dự án nên có ít nhất một phần mô tả chi tiết. Bạn có chắc muốn xóa không?')) {
        return;
      }
    }
    const updated = chapters.filter((_, idx) => idx !== index).map((ch, idx) => ({
      ...ch,
      number: String(idx + 1).padStart(2, '0'),
    }));
    setChapters(updated);
  };

  // 3. REORDER CHAPTERS (MOVE UP / DOWN)
  const handleMoveChapter = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= chapters.length) return;

    const copy = [...chapters];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;

    const renumbered = copy.map((ch, idx) => ({
      ...ch,
      number: String(idx + 1).padStart(2, '0'),
    }));
    setChapters(renumbered);
  };

  // 4. UPDATE CHAPTER FIELD
  const handleUpdateChapter = (index: number, field: keyof ProjectChapter, value: any) => {
    setChapters((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  // 5. UPDATE CHAPTER TECHNICAL NOTES (RAW STRING TO ARRAY)
  const handleUpdateTechNotes = (index: number, rawString: string) => {
    const notes = rawString
      .split('\n')
      .map((n) => n.trim())
      .filter(Boolean);
    handleUpdateChapter(index, 'technicalNotes', notes);
  };

  // 6. ADD SCREENSHOT TO CHAPTER
  const handleAddScreenshotToChapter = (chapterIndex: number) => {
    const chapter = chapters[chapterIndex];
    const currentScreens = chapter.screenshots || [];
    const updatedScreens = [
      ...currentScreens,
      {
        url: '',
        caption: 'Ảnh minh họa tính năng',
        alt: 'Ảnh minh họa',
      },
    ];
    handleUpdateChapter(chapterIndex, 'screenshots', updatedScreens);
  };

  // 7. UPDATE SCREENSHOT IN CHAPTER
  const handleUpdateScreenshot = (
    chapterIndex: number,
    screenshotIndex: number,
    field: keyof ScreenshotItem,
    val: string
  ) => {
    const chapter = chapters[chapterIndex];
    const currentScreens = [...(chapter.screenshots || [])];
    currentScreens[screenshotIndex] = {
      ...currentScreens[screenshotIndex],
      [field]: val,
    };
    handleUpdateChapter(chapterIndex, 'screenshots', currentScreens);
  };

  // 8. REMOVE SCREENSHOT FROM CHAPTER
  const handleRemoveScreenshot = (chapterIndex: number, screenshotIndex: number) => {
    const chapter = chapters[chapterIndex];
    const currentScreens = (chapter.screenshots || []).filter((_, idx) => idx !== screenshotIndex);
    handleUpdateChapter(chapterIndex, 'screenshots', currentScreens);
  };

  // 9. FORM SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    setErrorMsg('');
    setSuccessMsg('');

    // Format payload
    const formattedTechnologies = technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (formattedTechnologies.length === 0) {
      setErrorMsg('Vui lòng nhập ít nhất một công nghệ (phân cách bằng dấu phẩy).');
      setPending(false);
      return;
    }

    // Validate chapters
    for (let i = 0; i < chapters.length; i++) {
      if (!chapters[i].title.trim()) {
        setErrorMsg(`Phần mô tả thứ 0${i + 1} đang thiếu tiêu đề.`);
        setPending(false);
        return;
      }
      if (!chapters[i].content.trim()) {
        setErrorMsg(`Phần mô tả thứ 0${i + 1} ("${chapters[i].title}") đang thiếu nội dung chi tiết.`);
        setPending(false);
        return;
      }
    }

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      role: role.trim(),
      timeline: timeline.trim() || undefined,
      teamSize: teamSize ? Number(teamSize) : undefined,
      status,
      year: Number(year),
      technologies: formattedTechnologies,
      themeColor: themeColor.trim() || '#2563EB',
      themeBg: themeBg.trim() || '#EFF6FF',
      summary: summary.trim(),
      problem: problem.trim() || summary.trim(),
      approach: approach.trim() || summary.trim(),
      outcome: outcome.trim() || summary.trim(),
      coverUrl: coverUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
      sourceUrl: sourceUrl.trim() || undefined,
      featured,
      published,
      chapters,
      features: project?.features || [],
      gallery: project?.gallery || [],
    };

    const isEdit = Boolean(project && project._id && !project._id.startsWith('default-'));
    const endpoint = isEdit ? `/api/admin/projects/${project!._id}` : '/api/admin/projects';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Không thể lưu dự án. Vui lòng kiểm tra lại thông tin.');
      }

      setSuccessMsg('Đã lưu dự án và toàn bộ các phần mô tả chi tiết thành công!');
      setTimeout(() => {
        router.push('/admin/projects');
        router.refresh();
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Lỗi lưu dự án.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="project-editor-container">
      <div className="editor-nav-back">
        <Link className="text-link" href="/admin/projects">
          ← Quay lại Danh sách Dự án
        </Link>
      </div>

      <div className="editor-page-heading">
        <h1>{project ? `Chỉnh sửa Dự án: ${project.title}` : 'Thêm Dự Án Mới'}</h1>
        <p className="muted">
          Quản lý toàn bộ thông tin cơ bản, công nghệ và các phần mô tả chi tiết không giới hạn số lượng.
        </p>
      </div>

      {errorMsg && (
        <div className="alert-box error" role="alert">
          <span className="alert-icon">⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="alert-box success" role="alert">
          <span className="alert-icon">✓</span>
          <span>{successMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="project-editor-form">
        {/* KHỐI 1: THÔNG TIN CƠ BẢN DỰ ÁN */}
        <section className="form-panel editor-card">
          <h2 className="editor-section-title">1. Thông Tin Cơ Bản &amp; Thương Hiệu</h2>
          <p className="muted">Tiêu đề, vai trò, thời gian và huy hiệu công nghệ hiển thị trên thẻ dự án.</p>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="title">Tên Dự án *</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Ticket Concert Support System Based on Agentic RAG"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="slug">Đường dẫn URL Slug *</label>
              <input
                id="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                placeholder="VD: ticket-concert-agentic-rag"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="category">Phân loại Dự án *</label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="VD: AI & Full-Stack Application"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="role">Vai trò của bạn *</label>
              <input
                id="role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="VD: Full-Stack Developer (Team of 3)"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="timeline">Thời gian thực hiện</label>
              <input
                id="timeline"
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="VD: Tháng 8/2025 – Tháng 4/2026"
              />
            </div>

            <div className="field">
              <label htmlFor="teamSize">Quy mô đội ngũ (Số lượng thành viên)</label>
              <input
                id="teamSize"
                type="number"
                min="1"
                max="100"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                placeholder="VD: 3"
              />
            </div>

            <div className="field">
              <label htmlFor="status">Trạng thái triển khai</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Completed' | 'Ongoing')}
                className="select-field"
              >
                <option value="Completed">Completed (Đã hoàn thành)</option>
                <option value="Ongoing">Ongoing (Đang phát triển tiếp)</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="year">Năm *</label>
              <input
                id="year"
                type="number"
                min="2000"
                max="2100"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="themeColor">Màu Chủ Đạo (Theme Color Hex)</label>
              <div className="color-input-wrap">
                <input
                  type="color"
                  value={themeColor.startsWith('#') && themeColor.length === 7 ? themeColor : '#2563EB'}
                  onChange={(e) => setThemeColor(e.target.value)}
                  className="color-picker-native"
                />
                <input
                  id="themeColor"
                  type="text"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  placeholder="#7C3AED"
                />
              </div>
            </div>

            <div className="field">
              <label htmlFor="themeBg">Màu Nền Nhạt (Theme Soft Background Hex)</label>
              <div className="color-input-wrap">
                <input
                  type="color"
                  value={themeBg.startsWith('#') && themeBg.length === 7 ? themeBg : '#EFF6FF'}
                  onChange={(e) => setThemeBg(e.target.value)}
                  className="color-picker-native"
                />
                <input
                  id="themeBg"
                  type="text"
                  value={themeBg}
                  onChange={(e) => setThemeBg(e.target.value)}
                  placeholder="#F5F3FF"
                />
              </div>
            </div>

            <div className="field span-full">
              <label htmlFor="technologies">Danh sách Công nghệ Lõi (Phân cách bằng dấu phẩy) *</label>
              <input
                id="technologies"
                type="text"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                placeholder="VD: React, Node.js, MoMo API, Gemini API, LangChain.js, PostgreSQL (Neon), WebSocket"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="summary">Tóm tắt Điều hành (Executive Summary) *</label>
            <textarea
              id="summary"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Tóm tắt ngắn gọn 2-3 câu giới thiệu cốt lõi của ứng dụng."
              required
            />
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="coverUrl">Ảnh Bìa Dự án (Cover Image URL)</label>
              <input
                id="coverUrl"
                type="text"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
                placeholder="VD: /projects/ticket-concert-hero.png hoặc HTTPS URL"
              />
            </div>

            <div className="field">
              <label htmlFor="liveUrl">Địa chỉ Website Thực tế (Live URL)</label>
              <input
                id="liveUrl"
                type="text"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="VD: https://ticketconcert.online"
              />
            </div>

            <div className="field">
              <label htmlFor="sourceUrl">Mã nguồn GitHub (Source URL)</label>
              <input
                id="sourceUrl"
                type="text"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="VD: https://github.com/..."
              />
            </div>
          </div>

          <div className="checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
              />
              <span>Hiển thị trên Trang chủ (Featured Project Card)</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
              <span>Công khai cho Khách truy cập (Public)</span>
            </label>
          </div>
        </section>

        {/* KHỐI 2: CÁC PHẦN MÔ TẢ CHI TIẾT KHÔNG GIỚI HẠN SỐ LƯỢNG (CHAPTERS STORYTELLING) */}
        <section className="form-panel editor-card chapters-manager-panel">
          <div className="chapters-manager-header">
            <div>
              <div className="section-pill-tag">
                <span className="pill-dot" style={{ backgroundColor: themeColor }} />
                <span>MÔ TẢ CHI TIẾT KHÔNG GIỚI HẠN</span>
              </div>
              <h2 className="editor-section-title">
                2. Các Phần Mô Tả Chi Tiết &amp; Storytelling 3D
              </h2>
              <p className="muted">
                Admin có thể <strong>thêm tùy thích bao nhiêu phần mô tả chi tiết cũng được</strong> (không bị giới hạn số lượng). Mỗi phần sẽ trở thành một chặng kể chuyện 3D trực quan trên trang Case Study, kèm ghi chú kiến trúc và hình ảnh minh họa riêng.
              </p>
            </div>

            <button
              type="button"
              className="button button-pro-primary"
              onClick={handleAddChapter}
            >
              <span>+ Thêm Phần Mô Tả Mới</span>
            </button>
          </div>

          <div className="chapters-counter-badge">
            Tổng cộng: <strong>{chapters.length} phần mô tả chi tiết</strong>
          </div>

          {/* DANH SÁCH CÁC PHẦN MÔ TẢ */}
          <div className="chapters-editor-list">
            {chapters.map((chapter, cIdx) => (
              <div key={chapter.id || cIdx} className="chapter-edit-card">
                <div className="chapter-card-topbar">
                  <div className="chapter-card-title-left">
                    <span className="chapter-num-pill" style={{ backgroundColor: themeColor }}>
                      Phần 0{cIdx + 1}
                    </span>
                    <span className="chapter-phase-id">Phase {chapter.number || String(cIdx + 1).padStart(2, '0')}</span>
                  </div>

                  <div className="chapter-card-actions">
                    <button
                      type="button"
                      className="btn-action-mini"
                      onClick={() => handleMoveChapter(cIdx, 'up')}
                      disabled={cIdx === 0}
                      title="Di chuyển lên trên"
                    >
                      ↑ Lên
                    </button>
                    <button
                      type="button"
                      className="btn-action-mini"
                      onClick={() => handleMoveChapter(cIdx, 'down')}
                      disabled={cIdx === chapters.length - 1}
                      title="Di chuyển xuống dưới"
                    >
                      ↓ Xuống
                    </button>
                    <button
                      type="button"
                      className="btn-action-mini delete"
                      onClick={() => handleRemoveChapter(cIdx)}
                      title="Xóa phần mô tả này"
                    >
                      🗑 Xóa
                    </button>
                  </div>
                </div>

                <div className="chapter-card-body">
                  <div className="form-grid">
                    <div className="field">
                      <label>Tiêu đề Phần mô tả *</label>
                      <input
                        type="text"
                        value={chapter.title}
                        onChange={(e) => handleUpdateChapter(cIdx, 'title', e.target.value)}
                        placeholder="VD: 01. Giới thiệu & Tổng quan Hệ thống"
                        required
                      />
                    </div>

                    <div className="field">
                      <label>Mã số hiển thị (Phase Tag)</label>
                      <input
                        type="text"
                        value={chapter.number}
                        onChange={(e) => handleUpdateChapter(cIdx, 'number', e.target.value)}
                        placeholder="VD: 01"
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label>Nội dung Mô tả Chi tiết (Hỗ trợ định dạng văn bản dài) *</label>
                    <textarea
                      rows={5}
                      value={chapter.content}
                      onChange={(e) => handleUpdateChapter(cIdx, 'content', e.target.value)}
                      placeholder="Mô tả cụ thể bối cảnh, giải pháp kỹ thuật, phân tích kiến trúc hoặc trải nghiệm người dùng trong phần này..."
                      required
                    />
                  </div>

                  {/* GHI CHÚ KỸ THUẬT / QUYẾT ĐỊNH KIẾN TRÚC */}
                  <div className="field">
                    <label>
                      Ghi chú Kỹ thuật &amp; Quyết định Kiến trúc (Mỗi dòng là một gạch đầu dòng)
                    </label>
                    <textarea
                      rows={3}
                      value={(chapter.technicalNotes || []).join('\n')}
                      onChange={(e) => handleUpdateTechNotes(cIdx, e.target.value)}
                      placeholder={"Kiến trúc Full-Stack với React.js frontend và Node.js backend\nAgentic RAG workflow với LangChain.js & Google Gemini API\nWebSocket kết nối thời gian thực"}
                    />
                    <p className="field-hint">Mỗi dòng sẽ được hiển thị như một mục bullet point kiến trúc riêng biệt trong khung 3D.</p>
                  </div>

                  {/* ẢNH MINH HỌA CHO RIÊNG PHẦN MÔ TẢ NÀY */}
                  <div className="chapter-screenshots-subpanel">
                    <div className="screenshots-subpanel-header">
                      <span className="subpanel-title">Ảnh Minh Họa Cho Phần Này (Tùy chọn)</span>
                      <button
                        type="button"
                        className="btn-add-screen"
                        onClick={() => handleAddScreenshotToChapter(cIdx)}
                      >
                        + Thêm Ảnh Minh Họa
                      </button>
                    </div>

                    {(chapter.screenshots || []).map((scr, sIdx) => (
                      <div key={sIdx} className="chapter-screenshot-row">
                        <div className="screen-field">
                          <label>Đường dẫn ảnh (URL hoặc /projects/...) *</label>
                          <input
                            type="text"
                            value={scr.url}
                            onChange={(e) => handleUpdateScreenshot(cIdx, sIdx, 'url', e.target.value)}
                            placeholder="/projects/ticket-concert-booking.png"
                            required
                          />
                        </div>
                        <div className="screen-field">
                          <label>Chú thích ảnh (Caption)</label>
                          <input
                            type="text"
                            value={scr.caption}
                            onChange={(e) => handleUpdateScreenshot(cIdx, sIdx, 'caption', e.target.value)}
                            placeholder="Sơ đồ ghế ngồi & Thanh toán MoMo"
                          />
                        </div>
                        <button
                          type="button"
                          className="btn-del-screen"
                          onClick={() => handleRemoveScreenshot(cIdx, sIdx)}
                          title="Xóa ảnh này"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="chapters-footer-actions">
            <button
              type="button"
              className="button button-pro-secondary"
              onClick={handleAddChapter}
            >
              <span>+ Thêm Phần Mô Tả Khác</span>
            </button>
          </div>
        </section>

        {/* NÚT LƯU HOÀN TẤT */}
        <div className="editor-submit-bar">
          <Link href="/admin/projects" className="button button-pro-secondary">
            Hủy bỏ
          </Link>
          <button
            type="submit"
            className="button button-pro-primary large"
            disabled={pending}
          >
            <span>{pending ? 'Đang lưu dự án...' : 'Lưu Dự Án & Các Phần Mô Tả'}</span>
            <span aria-hidden="true">✓</span>
          </button>
        </div>
      </form>
    </div>
  );
}
