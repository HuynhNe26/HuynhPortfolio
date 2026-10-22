'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate?: {
    name: string;
    issuer: string;
    score: string;
    issueDate: string;
    imageUrl?: string;
    pdfUrl?: string;
  };
}

export function CertificateModal({ isOpen, onClose, certificate }: CertificateModalProps) {
  const { lang } = useLanguage();

  // Close on ESC
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const imageUrl = certificate?.imageUrl || '/certificates/toeic-550-official.jpg';
  const pdfUrl = certificate?.pdfUrl || '/certificates/toeic-550.pdf';

  return (
    <div
      className="cert-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={certificate?.name || 'Certificate Preview'}
    >
      <div
        className="cert-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="cert-modal-header">
          <div className="cert-modal-title-group">
            <span className="cert-badge-verified">
              <span className="cert-verified-dot" />
              {lang === 'vi' ? 'Chứng chỉ chính thức ETS' : lang === 'zh' ? 'ETS 官方权威认证' : 'ETS Official Credential'}
            </span>
            <h3 className="cert-modal-title">
              {certificate?.name || 'TOEIC Listening & Reading Test'}
            </h3>
          </div>
          <button
            type="button"
            className="cert-modal-close"
            onClick={onClose}
            aria-label={lang === 'vi' ? 'Đóng' : lang === 'zh' ? '关闭' : 'Close'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* IMAGE CONTAINER WITH ZOOM HOVER */}
        <div className="cert-modal-image-wrap">
          <Image
            src={imageUrl}
            alt={certificate?.name || 'TOEIC Certificate'}
            width={1200}
            height={900}
            className="cert-modal-image"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* MODAL FOOTER METRICS & ACTIONS */}
        <div className="cert-modal-footer">
          <div className="cert-modal-meta-pills">
            <div className="cert-pill">
              <span className="pill-k">{lang === 'vi' ? 'Thí sinh' : lang === 'zh' ? '考生姓名' : 'Candidate'}:</span>
              <span className="pill-v">Nguyễn Hoàng Huynh</span>
            </div>
            <div className="cert-pill highlight">
              <span className="pill-k">{lang === 'vi' ? 'Tổng điểm' : lang === 'zh' ? '考试总分' : 'Total Score'}:</span>
              <span className="pill-v">550 / 990</span>
            </div>
            <div className="cert-pill">
              <span className="pill-k">{lang === 'vi' ? 'Thời gian thi' : lang === 'zh' ? '考试时间' : 'Test Date'}:</span>
              <span className="pill-v">{certificate?.issueDate || '10/2025'}</span>
            </div>
            <div className="cert-pill">
              <span className="pill-k">{lang === 'vi' ? 'Đơn vị cấp' : lang === 'zh' ? '发证机构' : 'Issuer'}:</span>
              <span className="pill-v">{certificate?.issuer || 'ETS'}</span>
            </div>
          </div>

          <div className="cert-modal-actions">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-btn-full"
            >
              <span>{lang === 'vi' ? 'Xem chi tiết chứng chỉ (PDF) ↗' : lang === 'zh' ? '查看官方证书详情 (PDF) ↗' : 'View Certificate PDF ↗'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
