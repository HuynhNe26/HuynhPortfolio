'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/language-context';

export interface DeviceScreenItem {
  id: string;
  nameVi: string;
  nameEn: string;
  badge: string;
  imageUrl: string;
  alt: string;
  descriptionVi: string;
  descriptionEn: string;
  deviceType: 'desktop' | 'tablet' | 'mobile';
}

const DEVICE_SCREENS: DeviceScreenItem[] = [
  // DESKTOP SCREENS
  {
    id: 'desk-01',
    nameVi: 'Bảng Điều Khiển Quản Trị & Biểu Đồ Doanh Thu',
    nameEn: 'Admin Operations Dashboard & Revenue Analytics',
    badge: 'Desktop • 1440px',
    imageUrl: '/projects/rent-house-admin-dashboard.png',
    alt: 'Admin Operations Dashboard on Desktop',
    descriptionVi: 'Biểu đồ Recharts tổng hợp doanh thu 6 tháng, tiền phòng, điện nước và cảnh báo phòng trễ hạn.',
    descriptionEn: 'Unified operations dashboard aggregating 6-month revenue trends, rent, utilities, and overdue alerts.',
    deviceType: 'desktop',
  },
  {
    id: 'desk-02',
    nameVi: 'Động Cơ AI OCR Đối Chiếu Chỉ Số & Ảnh Thực Tế',
    nameEn: 'Local AI OCR Meter Reading & Image Verification',
    badge: 'Desktop • 1440px',
    imageUrl: '/projects/rent-house-ai-meters.png',
    alt: 'Local AI OCR Meter Reading on Desktop',
    descriptionVi: 'Nhận diện chỉ số bằng FastAPI + OpenCV + Tesseract, kiểm tra độ mờ Laplacian và duyệt Human-in-the-loop.',
    descriptionEn: 'Microservice meter recognition with Laplacian blur detection and side-by-side human-in-the-loop audit.',
    deviceType: 'desktop',
  },
  {
    id: 'desk-03',
    nameVi: 'Quản Lý Danh Sách Phòng & Cấu Hình Dịch Vụ',
    nameEn: 'Room Inventory & Pricing Configuration Matrix',
    badge: 'Desktop • 1440px',
    imageUrl: '/projects/rent-house-admin-rooms.png',
    alt: 'Room Inventory and Facilities Management',
    descriptionVi: 'Quản lý toàn bộ danh mục phòng trọ, lọc trạng thái phòng trống/đang thuê, thiết lập giá điện nước bậc thang.',
    descriptionEn: 'Comprehensive room catalog with real-time occupancy status, facility amenities, and tiered utility rates.',
    deviceType: 'desktop',
  },
  {
    id: 'desk-04',
    nameVi: 'Tự Động Lập Hóa Đơn & Phát Thông Báo Đa Kênh',
    nameEn: 'Automated Billing & Multi-Channel Dispatch',
    badge: 'Desktop • 1440px',
    imageUrl: '/projects/rent-house-billing.png',
    alt: 'Automated Invoice Generation and Multi-channel Dispatch',
    descriptionVi: 'Cơ chế Snapshot Pricing đóng băng đơn giá, tự động gửi SMS OTP và email chi tiết qua Resend API.',
    descriptionEn: 'Snapshot Pricing calculation with automated SMS OTP and detailed email receipts via Resend API.',
    deviceType: 'desktop',
  },
  {
    id: 'desk-05',
    nameVi: 'Hợp Đồng Điện Tử Bất Biến & Khóa Mật Mã SHA-256',
    nameEn: 'Immutable Electronic Lease Contracts (SHA-256)',
    badge: 'Desktop • 1440px',
    imageUrl: '/projects/rent-house-contracts.png',
    alt: 'Immutable Electronic Contracts with SHA-256 Hash',
    descriptionVi: 'Hợp đồng số xuất PDFKit với chuỗi băm SHA-256 và trigger CSDL PostgreSQL ngăn chặn sửa đổi vĩnh viễn.',
    descriptionEn: 'Legally compliant PDF lease agreements sealed with SHA-256 cryptographic digests and DB triggers.',
    deviceType: 'desktop',
  },
  {
    id: 'desk-06',
    nameVi: 'Trung Tâm Thông Báo & Nhật Ký Kiểm Toán Audit',
    nameEn: 'Notification Hub & System Audit Trail',
    badge: 'Desktop • 1440px',
    imageUrl: '/projects/rent-house-admin-audit.png',
    alt: 'System Audit Trail and Security Access Logs',
    descriptionVi: 'Nhật ký truy vết toàn bộ thao tác sửa đổi chỉ số, đăng nhập và lịch sử phát thông báo khách thuê.',
    descriptionEn: 'Full system audit trail tracking meter adjustments, administrator logins, and tenant broadcasts.',
    deviceType: 'desktop',
  },

  // TABLET SCREENS
  {
    id: 'tab-01',
    nameVi: 'Giao Diện Máy Tính Bảng iPad Khảo Sát & Kiểm Tra Phòng',
    nameEn: 'Tablet iPad View for On-Site Room Inspection',
    badge: 'Tablet • 1024px',
    imageUrl: '/projects/rent-house-tablet-responsive.png',
    alt: 'Responsive Tablet View on iPad Pro',
    descriptionVi: 'Thiết kế bố cục thích ứng tối ưu cho chủ nhà cầm iPad đi kiểm tra phòng, xem sơ đồ và ghi nhận số liệu.',
    descriptionEn: 'Ergonomic tablet layout designed for landlords conducting on-site room audits and catalog reviews.',
    deviceType: 'tablet',
  },
  {
    id: 'tab-02',
    nameVi: 'Cổng Khám Phá & Danh Mục Phòng Trên Màn Hình Cỡ Lớn',
    nameEn: 'Public Room Showcase on High-Res Tablet Display',
    badge: 'Tablet • 1024px',
    imageUrl: '/projects/rent-house-hero.png',
    alt: 'Public Rental Catalog on Tablet',
    descriptionVi: 'Khách tìm phòng lướt danh mục phòng tiện nghi, ảnh sắc nét và bộ lọc phòng trống trực quan.',
    descriptionEn: 'Prospective tenants browse room listings with high-contrast filter chips and transparent pricing.',
    deviceType: 'tablet',
  },

  // MOBILE SCREENS
  {
    id: 'mob-01',
    nameVi: 'Ứng Dụng Di Động Android APK & Thanh Điều Hướng Liquid Glass Dock',
    nameEn: 'Android APK Mobile App & Liquid Glass Dock',
    badge: 'Mobile • 393px',
    imageUrl: '/projects/rent-house-mobile.png',
    alt: 'Mobile Card UI with Apple Liquid Glass Dock',
    descriptionVi: 'Đóng gói Native bằng Capacitor 8, thanh dock kính lỏng phong cách Apple, giao diện card không cuộn ngang.',
    descriptionEn: 'Native mobile packaging with Capacitor 8, Apple-inspired Liquid Glass Dock, and non-horizontal card UX.',
    deviceType: 'mobile',
  },
  {
    id: 'mob-02',
    nameVi: 'Cổng Người Thuê Tra Cứu Tiền Phòng & Số Điện Nước',
    nameEn: 'Accessible Tenant Portal & Utility Inspector',
    badge: 'Mobile • 393px',
    imageUrl: '/projects/rent-house-tenant-portal.png',
    alt: 'High-Contrast Accessible Tenant Dashboard',
    descriptionVi: 'Thiết kế công thái học chữ to rõ (≥18px), số tiền đậm nét (32px), nút bấm lớn cho mọi đối tượng khách thuê.',
    descriptionEn: 'Ergonomic accessibility with large typography (≥18px), bold sums (32px), and generous touch targets.',
    deviceType: 'mobile',
  },
  {
    id: 'mob-03',
    nameVi: 'Chi Tiết Tiêu Thụ Điện Năng & Phóng To Ảnh Công Tơ',
    nameEn: 'Mobile Electricity Tracker & Meter Photo Zoom',
    badge: 'Mobile • 393px',
    imageUrl: '/projects/rent-house-mobile-utility.png',
    alt: 'Mobile Utility Breakdown and Meter Photo Verification',
    descriptionVi: 'Khách thuê tự kiểm tra số kWh tiêu thụ hàng tháng và mở modal phóng to ảnh chụp đồng hồ thực tế.',
    descriptionEn: 'Tenants review monthly kWh consumption and zoom into full-resolution raw meter photography.',
    deviceType: 'mobile',
  },
  {
    id: 'mob-04',
    nameVi: 'Ký Hợp Đồng Cảm Ứng HTML5 Canvas SignaturePad',
    nameEn: 'Touchscreen SignaturePad & Mobile Lease Review',
    badge: 'Mobile • 393px',
    imageUrl: '/projects/rent-house-mobile-contract.png',
    alt: 'Mobile Contract Review and Touchscreen SignaturePad',
    descriptionVi: 'Ký số trực tiếp bằng ngón tay hoặc bút cảm ứng trên điện thoại, khóa bất biến với mã băm SHA-256.',
    descriptionEn: 'Direct finger and stylus signing on smartphone viewports, locked with SHA-256 cryptographic hashes.',
    deviceType: 'mobile',
  },
];

export function ResponsiveOmniDeviceShowcase() {
  const { lang } = useLanguage();
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeScreenId, setActiveScreenId] = useState<string>('desk-01');
  const [isAutoMorphing, setIsAutoMorphing] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const autoMorphTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filter screens by active device
  const currentScreens = DEVICE_SCREENS.filter((s) => s.deviceType === device);
  const activeScreen = currentScreens.find((s) => s.id === activeScreenId) || currentScreens[0] || DEVICE_SCREENS[0];

  // Auto-morphing animation cycle (Desktop -> Tablet -> Mobile -> Desktop)
  useEffect(() => {
    if (!isAutoMorphing) {
      if (autoMorphTimerRef.current) clearInterval(autoMorphTimerRef.current);
      return;
    }

    const devicesOrder: ('desktop' | 'tablet' | 'mobile')[] = ['desktop', 'tablet', 'mobile'];

    autoMorphTimerRef.current = setInterval(() => {
      setDevice((prev) => {
        const nextIndex = (devicesOrder.indexOf(prev) + 1) % devicesOrder.length;
        const nextDevice = devicesOrder[nextIndex];
        const nextScreens = DEVICE_SCREENS.filter((s) => s.deviceType === nextDevice);
        if (nextScreens.length > 0) {
          setActiveScreenId(nextScreens[0].id);
        }
        return nextDevice;
      });
    }, 3800);

    return () => {
      if (autoMorphTimerRef.current) clearInterval(autoMorphTimerRef.current);
    };
  }, [isAutoMorphing]);

  const handleDeviceChange = (newDevice: 'desktop' | 'tablet' | 'mobile') => {
    setIsAutoMorphing(false);
    setDevice(newDevice);
    const screens = DEVICE_SCREENS.filter((s) => s.deviceType === newDevice);
    if (screens.length > 0) {
      setActiveScreenId(screens[0].id);
    }
  };

  return (
    <section className="rh-omni-device-showcase container" aria-label="Omni-Device Responsive Showcase">
      {/* SECTION HEADER */}
      <div className="rh-omni-header">
        <div className="rh-omni-tag">
          <span className="rh-omni-dot-ping" />
          <span>{lang === 'vi' ? 'MINH CHỨNG THIẾT KẾ ĐA THIẾT BỊ' : 'OMNI-DEVICE RESPONSIVE ARCHITECTURE'}</span>
        </div>
        <h2 className="rh-omni-title">
          {lang === 'vi'
            ? 'Trải Nghiệm Tương Thích & Thích Ứng Trên Mọi Kích Thước Màn Hình'
            : 'Pixel-Perfect Fluid Responsiveness Across Desktop, Tablet & Mobile'}
        </h2>
        <p className="rh-omni-lead">
          {lang === 'vi'
            ? 'Hệ thống được phát triển với triết lý Mobile-First kết hợp công thái học màn hình lớn: Từ Bảng điều khiển Quản trị viên trên PC, máy tính bảng iPad cho chủ trọ đi khảo sát, đến Cổng người thuê và Ứng dụng Android APK bỏ túi.'
            : 'Architected with a mobile-first paradigm and desktop ergonomics: from full-spectrum administrative analytics on desktop PC, iPad audits on-site, to tenant utility portals and native Android APK distribution.'}
        </p>
      </div>

      {/* INTERACTIVE CONTROLS BAR */}
      <div className="rh-omni-toolbar">
        {/* DEVICE SELECTOR BUTTONS */}
        <div className="rh-omni-device-pills" role="tablist" aria-label="Device form factors">
          <button
            type="button"
            className={`rh-device-btn ${device === 'desktop' ? 'active' : ''}`}
            onClick={() => handleDeviceChange('desktop')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
            <span>{lang === 'vi' ? 'Máy tính (Desktop)' : 'Desktop'}</span>
            <span className="rh-res-chip">1440 × 900</span>
          </button>

          <button
            type="button"
            className={`rh-device-btn ${device === 'tablet' ? 'active' : ''}`}
            onClick={() => handleDeviceChange('tablet')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <span>{lang === 'vi' ? 'Máy tính bảng (Tablet)' : 'Tablet iPad'}</span>
            <span className="rh-res-chip">1024 × 768</span>
          </button>

          <button
            type="button"
            className={`rh-device-btn ${device === 'mobile' ? 'active' : ''}`}
            onClick={() => handleDeviceChange('mobile')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="5" y="2" width="14" height="20" rx="3" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <span>{lang === 'vi' ? 'Điện thoại (Mobile APK)' : 'Mobile Phone'}</span>
            <span className="rh-res-chip">393 × 852</span>
          </button>
        </div>

        {/* AUTO-MORPH ANIMATION TOGGLE */}
        <button
          type="button"
          className={`rh-auto-morph-btn ${isAutoMorphing ? 'active' : ''}`}
          onClick={() => setIsAutoMorphing(!isAutoMorphing)}
          title={lang === 'vi' ? 'Tự động luân chuyển hoạt ảnh co giãn màn hình' : 'Auto-morph through responsive viewports'}
        >
          <span className="morph-icon-sparkle">✨</span>
          <span>
            {isAutoMorphing
              ? (lang === 'vi' ? 'Đang chạy hoạt ảnh chuyển đổi 3 giao diện...' : 'Auto-morphing active...')
              : (lang === 'vi' ? 'Xem hoạt ảnh co giãn đa thiết bị (Auto)' : 'Play Responsive Morphing Animation')}
          </span>
          <span className={`morph-pulse ${isAutoMorphing ? 'pulsing' : ''}`} />
        </button>
      </div>

      {/* DEVICE FRAME STAGE */}
      <div className={`rh-device-stage stage-${device}`}>
        {/* 1. DESKTOP FRAME */}
        {device === 'desktop' && (
          <div className="rh-frame-desktop">
            <div className="rh-browser-chrome">
              <div className="rh-window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <div className="rh-browser-address">
                <span className="address-lock">🔒</span>
                <span className="address-url">nhatrothanhtam.netlify.app/admin/dashboard</span>
              </div>
              <div className="rh-chrome-badge">Desktop Viewport • 1440px</div>
            </div>
            <div className="rh-screen-viewport" onClick={() => setLightboxImage(activeScreen.imageUrl)}>
              <Image
                src={activeScreen.imageUrl}
                alt={activeScreen.alt}
                width={1440}
                height={900}
                className="rh-viewport-img"
                priority
                unoptimized
              />
              <div className="rh-zoom-hint">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>{lang === 'vi' ? 'Nhấn để phóng to ảnh siêu nét' : 'Click to zoom full resolution'}</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. TABLET IPAD FRAME */}
        {device === 'tablet' && (
          <div className="rh-frame-tablet">
            <div className="rh-tablet-bezel">
              <div className="rh-tablet-camera-notch" />
              <div className="rh-screen-viewport" onClick={() => setLightboxImage(activeScreen.imageUrl)}>
                <Image
                  src={activeScreen.imageUrl}
                  alt={activeScreen.alt}
                  width={1024}
                  height={768}
                  className="rh-viewport-img"
                  priority
                  unoptimized
                />
                <div className="rh-zoom-hint">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>{lang === 'vi' ? 'Nhấn để phóng to ảnh siêu nét' : 'Click to zoom full resolution'}</span>
                </div>
              </div>
              <div className="rh-tablet-home-indicator" />
            </div>
          </div>
        )}

        {/* 3. MOBILE SMARTPHONE FRAME */}
        {device === 'mobile' && (
          <div className="rh-frame-mobile">
            <div className="rh-phone-bezel">
              <div className="rh-phone-dynamic-island">
                <span className="island-lens" />
                <span className="island-speaker" />
              </div>
              <div className="rh-screen-viewport" onClick={() => setLightboxImage(activeScreen.imageUrl)}>
                <Image
                  src={activeScreen.imageUrl}
                  alt={activeScreen.alt}
                  width={393}
                  height={852}
                  className="rh-viewport-img"
                  priority
                  unoptimized
                />
                <div className="rh-zoom-hint">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  <span>{lang === 'vi' ? 'Nhấn để phóng to ảnh siêu nét' : 'Click to zoom full resolution'}</span>
                </div>
              </div>
              <div className="rh-phone-home-indicator" />
            </div>
          </div>
        )}
      </div>

      {/* ACTIVE SCREEN INFO & SUB-SCREEN THUMBNAIL SELECTOR */}
      <div className="rh-screen-details-bar">
        <div className="rh-active-meta">
          <span className="rh-active-badge">{activeScreen.badge}</span>
          <h3 className="rh-active-title">
            {lang === 'vi' ? activeScreen.nameVi : activeScreen.nameEn}
          </h3>
          <p className="rh-active-desc">
            {lang === 'vi' ? activeScreen.descriptionVi : activeScreen.descriptionEn}
          </p>
        </div>

        {/* SCREEN SWITCHER BUTTONS FOR CURRENT DEVICE */}
        <div className="rh-screen-thumbs-strip" role="group" aria-label="Available screens for this device">
          {currentScreens.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              className={`rh-screen-thumb-card ${s.id === activeScreen.id ? 'active' : ''}`}
              onClick={() => setActiveScreenId(s.id)}
            >
              <div className="thumb-preview">
                <Image
                  src={s.imageUrl}
                  alt={s.alt}
                  width={140}
                  height={85}
                  className="thumb-img"
                  unoptimized
                />
                <span className="thumb-index">{idx + 1}</span>
              </div>
              <span className="thumb-name">{lang === 'vi' ? s.nameVi : s.nameEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ALL FUNCTIONAL MODULES MATRIX (KHÔNG BỎ SÓT CHỨC NĂNG NÀO) */}
      <div className="rh-full-features-section">
        <div className="rh-full-feat-head">
          <span className="feat-eyebrow">
            {lang === 'vi' ? 'MA TRẬN PHÂN HỆ ĐẦY ĐỦ' : 'FULL ARCHITECTURAL CAPABILITY MATRIX'}
          </span>
          <h3 className="feat-heading">
            {lang === 'vi'
              ? 'Tổng Hợp 100% Chức Năng Đã Hiện Thực Hóa Của Dự Án'
              : 'Complete Breakdown of All Implemented System Capabilities'}
          </h3>
          <p className="feat-sub">
            {lang === 'vi'
              ? 'Hệ thống bao phủ trọn vẹn vòng đời quản trị bất động sản cho thuê: Từ thu thập dữ liệu bằng thị giác máy tính, tính toán tự động, phát hành thông báo, kiểm toán pháp lý số, đến cổng tương tác công thái học cho người thuê.'
              : 'End-to-end property management lifecycle: computer vision utility auditing, automated invoicing, multi-channel dispatch, cryptographic legaltech, and ergonomic tenant accessibility.'}
          </p>
        </div>

        <div className="rh-modules-grid">
          {/* MODULE 1 */}
          <div className="rh-module-card">
            <div className="mod-header">
              <span className="mod-icon">⚡</span>
              <span className="mod-cat">AI & Computer Vision</span>
            </div>
            <h4>{lang === 'vi' ? 'AI OCR Chỉ Số Điện Nước & Lọc Ảnh Mờ' : 'Local AI OCR & Laplacian Quality Filter'}</h4>
            <p>
              {lang === 'vi'
                ? 'Microservice FastAPI tự host, giải thuật phương sai Laplacian phát hiện ảnh mờ/lóa sáng, tự động trích xuất chỉ số công tơ điện nước với độ chính xác 98.6%.'
                : 'Self-hosted FastAPI microservice with OpenCV Laplacian variance blur filter, automatically extracting meter digits with 98.6% recognition accuracy.'}
            </p>
            <div className="mod-tags">
              <span>FastAPI</span>
              <span>OpenCV</span>
              <span>Tesseract</span>
              <span>Confidence Score</span>
            </div>
          </div>

          {/* MODULE 2 */}
          <div className="rh-module-card">
            <div className="mod-header">
              <span className="mod-icon">🏢</span>
              <span className="mod-cat">Administrative Core</span>
            </div>
            <h4>{lang === 'vi' ? 'Bảng Điều Khiển & Phân Tích Tài Chính 6 Tháng' : 'Admin Operations & Financial Analytics'}</h4>
            <p>
              {lang === 'vi'
                ? 'Tổng hợp tỷ lệ lấp đầy phòng, doanh thu thực thu, tiền điện, tiền nước và biểu đồ xu hướng Recharts. Cảnh báo các phòng quá hạn thanh toán.'
                : 'Aggregates occupancy rate, realized revenue, electric & water consumption trends via Recharts. Automatically flags overdue rooms.'}
            </p>
            <div className="mod-tags">
              <span>Recharts</span>
              <span>HTTP-Only Cookie</span>
              <span>Rate Limiting</span>
              <span>Debt Warning</span>
            </div>
          </div>

          {/* MODULE 3 */}
          <div className="rh-module-card">
            <div className="mod-header">
              <span className="mod-icon">🧾</span>
              <span className="mod-cat">Automated Billing</span>
            </div>
            <h4>{lang === 'vi' ? 'Hóa Đơn Tự Động & Snapshot Pricing' : 'Snapshot Pricing & Automated Invoicing'}</h4>
            <p>
              {lang === 'vi'
                ? 'Tự động tính tiền điện theo biểu giá bậc thang và dịch vụ. Cơ chế Snapshot Pricing khóa cứng đơn giá tại thời điểm lập hóa đơn để lịch sử kế toán không bao giờ lệch.'
                : 'Automated tiered electricity calculations. Snapshot Pricing mechanism permanently seals unit rates at generation time to prevent accounting drift.'}
            </p>
            <div className="mod-tags">
              <span>Snapshot Pricing</span>
              <span>Tiered Tariff</span>
              <span>Zero-Drift</span>
            </div>
          </div>

          {/* MODULE 4 */}
          <div className="rh-module-card">
            <div className="mod-header">
              <span className="mod-icon">📲</span>
              <span className="mod-cat">Multi-Channel Dispatch</span>
            </div>
            <h4>{lang === 'vi' ? 'Phát Thông Báo Đa Kênh (SMS OTP & Resend Email)' : 'Multi-Channel Dispatch (SMS & Resend)'}</h4>
            <p>
              {lang === 'vi'
                ? 'Tự động gửi tin nhắn SMS OTP kèm link tra cứu và gửi email bảng kê chi tiết có đính kèm ảnh chụp công tơ thực tế qua Resend API.'
                : 'Automated SMS OTP alerts with inspection links, coupled with comprehensive email receipts featuring attached meter photos via Resend API.'}
            </p>
            <div className="mod-tags">
              <span>Resend API</span>
              <span>SMS Gateway</span>
              <span>Receipt Attachments</span>
            </div>
          </div>

          {/* MODULE 5 */}
          <div className="rh-module-card">
            <div className="mod-header">
              <span className="mod-icon">🔒</span>
              <span className="mod-cat">LegalTech & Security</span>
            </div>
            <h4>{lang === 'vi' ? 'Hợp Đồng Điện Tử Bất Biến Mã Băm SHA-256' : 'Immutable Electronic Contracts (SHA-256)'}</h4>
            <p>
              {lang === 'vi'
                ? 'Sinh hợp đồng PDF chuẩn pháp lý, mã hóa băm SHA-256 (document_hash) và khóa bất biến bằng database trigger PostgreSQL trên Neon.'
                : 'Generates legally binding PDF leases, generates SHA-256 document digests, and enforces database-level immutability triggers on Neon PostgreSQL.'}
            </p>
            <div className="mod-tags">
              <span>PDFKit</span>
              <span>SHA-256</span>
              <span>PostgreSQL Trigger</span>
            </div>
          </div>

          {/* MODULE 6 */}
          <div className="rh-module-card">
            <div className="mod-header">
              <span className="mod-icon">📱</span>
              <span className="mod-cat">Mobile Engineering</span>
            </div>
            <h4>{lang === 'vi' ? 'Ứng Dụng Di Động Android APK & iOS PWA' : 'Android APK & Liquid Glass Navigation'}</h4>
            <p>
              {lang === 'vi'
                ? 'Đóng gói Native bằng Capacitor 8, thanh điều hướng Liquid Glass Dock phong cách Apple tinh tế, biên dịch tệp APK cài đặt trực tiếp trên smartphone.'
                : 'Packaged natively using Capacitor 8, Apple-inspired Liquid Glass Dock navigation, and standalone APK compilation for direct Android distribution.'}
            </p>
            <div className="mod-tags">
              <span>Capacitor 8</span>
              <span>Android APK</span>
              <span>Liquid Glass Dock</span>
            </div>
          </div>

          {/* MODULE 7 */}
          <div className="rh-module-card">
            <div className="mod-header">
              <span className="mod-icon">👁️</span>
              <span className="mod-cat">Tenant Ergonomics</span>
            </div>
            <h4>{lang === 'vi' ? 'Cổng Người Thuê Chữ To & Đối Chiếu Ảnh Công Tơ' : 'High-Contrast Accessible Tenant Experience'}</h4>
            <p>
              {lang === 'vi'
                ? 'Giao diện thân thiện người lớn tuổi với chữ to (≥18px), số tiền đậm nét (32px), đăng nhập mã OTP không cần mật khẩu và modal xem ảnh đồng hồ thực tế.'
                : 'Designed for accessibility with large typography (≥18px), prominent bold sums (32px), passwordless OTP login, and full-resolution photo inspector.'}
            </p>
            <div className="mod-tags">
              <span>Accessible UX</span>
              <span>Passwordless OTP</span>
              <span>Photo Modal</span>
            </div>
          </div>

          {/* MODULE 8 */}
          <div className="rh-module-card">
            <div className="mod-header">
              <span className="mod-icon">✍️</span>
              <span className="mod-cat">Digital Signature</span>
            </div>
            <h4>{lang === 'vi' ? 'Ký Hợp Đồng Cảm Ứng HTML5 Canvas SignaturePad' : 'HTML5 Canvas Touchscreen SignaturePad'}</h4>
            <p>
              {lang === 'vi'
                ? 'Khách thuê và chủ nhà ký số trực tiếp trên màn hình cảm ứng điện thoại bằng ngón tay hoặc bút cảm ứng, lưu trữ vector nét ký an toàn.'
                : 'Landlords and tenants sign lease agreements directly on touchscreen viewports with fingertips or styluses, saving crisp vector signatures.'}
            </p>
            <div className="mod-tags">
              <span>Canvas Signature</span>
              <span>Touch Support</span>
              <span>Vector Paths</span>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxImage && (
        <div className="rh-lightbox-overlay" onClick={() => setLightboxImage(null)}>
          <div className="rh-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="rh-lightbox-close"
              onClick={() => setLightboxImage(null)}
              aria-label="Close full size view"
            >
              ✕
            </button>
            <Image
              src={lightboxImage}
              alt="Full size screenshot"
              width={1600}
              height={1000}
              className="rh-lightbox-img"
              unoptimized
            />
          </div>
        </div>
      )}
    </section>
  );
}
