'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'vi';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'nav.stack': 'Stack',
    'nav.cms': 'CMS Portal',
    'nav.contact': 'Get in Touch',
    'nav.status': 'Available for Roles',

    // Hero
    'hero.badge': 'Available for Roles • Vietnam Aviation Academy (Class of 2026)',
    'hero.subtitle': 'Full-Stack Software Engineer & System Architect',
    'hero.intro': 'Third-year Information Technology student at Vietnam Aviation Academy (Cumulative GPA 3.1 / 4.0). Specializing in high-performance web applications, resilient backend architectures, and AI Agentic workflows using TypeScript, Next.js 16, and PostgreSQL Neon.',
    'hero.viewWork': 'View Featured Projects',
    'hero.getInTouch': 'Get in Touch',
    'hero.gpaLabel': 'Academic GPA',
    'hero.majorLabel': 'IT Major',
    'hero.toeicLabel': 'ETS Certified',
    'hero.systemsLabel': 'Live Case Studies',

    // About Me Preview (Homepage)
    'aboutPreview.pill': 'ABOUT ME & ENGINEERING PROFILE',

    // About Page
    'about.eyebrowProfile': 'PROFILE & BACKGROUND',
    'about.title': 'Engineering with precision & curiosity',
    'about.eyebrowBio': '01 / BIOGRAPHY & OUTLOOK',
    'about.bioHeading': 'Connecting clean code with human interaction.',
    'about.eyebrowEdu': '02 / EDUCATION',
    'about.eduHeading': 'Academic Foundation',
    'about.eyebrowCert': '03 / CERTIFICATIONS',
    'about.certHeading': 'Verified Credentials',
    'about.eyebrowSkills': '04 / TECHNICAL EXPERTISE',
    'about.skillsHeading': 'Categorized Toolkit',
    'about.getInTouch': 'Get in Touch',
    'about.downloadResume': 'Download Resume',
    'aboutPreview.title': 'Driven by Engineering Rigor & Clean Code',
    'aboutPreview.desc': 'A concise snapshot of my academic journey, core strengths, and passion for building scalable web platforms.',
    'aboutPreview.summaryP1': 'I am a third-year Information Technology student at Vietnam Aviation Academy with a cumulative GPA of 3.1/4.0 and an ETS-certified TOEIC score of 550. My focus spans end-to-end full-stack development, distributed database design, and intelligent AI-assisted workflows.',
    'aboutPreview.summaryP2': 'Whether architecting resilient backend APIs in Node.js, designing high-throughput relational schemas in PostgreSQL (Neon), or crafting intuitive user interfaces in React and Next.js 16, I strive for clean architecture, rock-solid security, and delightful user experiences.',
    'aboutPreview.readMore': 'Read Full Engineering Background, Coursework & Timeline',
    'aboutPreview.credentialsBadge': 'Academic Credentials',
    'aboutPreview.academy': 'Vietnam Aviation Academy',
    'aboutPreview.academySub': 'Vietnam Aviation Academy • Faculty of Information Technology',
    'aboutPreview.majorLabel': 'Major / Discipline',
    'aboutPreview.majorVal': 'Information Technology (IT)',
    'aboutPreview.standingLabel': 'Academic Standing',
    'aboutPreview.standingVal': 'Third Year (Class of 2026)',
    'aboutPreview.gpaLabel': 'Cumulative GPA',
    'aboutPreview.englishLabel': 'English Proficiency',
    'aboutPreview.englishVal': 'TOEIC 550 [ETS Verified]',
    'aboutPreview.phoneLabel': 'Phone / WhatsApp',
    'aboutPreview.stackLabel': 'Primary Stack',
    'aboutPreview.contactPrompt': 'Interested in working together?',
    'aboutPreview.sendMessage': 'Send Message',
    'aboutPreview.strengthPerf': 'High Performance',
    'aboutPreview.strengthPerfSub': 'Sub-second page loads, edge rendering & minimal bundles',
    'aboutPreview.strengthSecurity': 'Security & Resilience',
    'aboutPreview.strengthSecuritySub': 'HttpOnly sessions, rate limiting & signature validation',
    'aboutPreview.strengthFrontend': 'Modern Web Architecture',
    'aboutPreview.strengthFrontendSub': 'Next.js 16 App Router, React, Node.js API & high-throughput endpoints',
    'aboutPreview.strengthAgentic': 'Agentic Intelligence',
    'aboutPreview.strengthAgenticSub': 'LangChain.js, Gemini API & context-grounded RAG',
    'aboutPreview.strengthCleanCode': 'Clean Codebase',
    'aboutPreview.strengthCleanCodeSub': 'Strict TypeScript, modular components & robust typing',

    // Dossier (Hero)
    'dossier.tabStack': 'Core Stack',
    'dossier.tabArchitecture': 'Architecture Focus',
    'dossier.tabCredentials': 'Credentials & Education',
    'dossier.degree': 'Degree Program',
    'dossier.degreeName': 'Bachelor of Science in Information Technology',
    'dossier.institution': 'Vietnam Aviation Academy (Học viện Hàng không Việt Nam)',
    'dossier.timelineLabel': 'Timeline: 2023 – Present',
    'dossier.gpaLabel': 'Cumulative GPA: 3.1 / 4.0',
    'dossier.langCert': 'Language Certification',
    'dossier.toeic': 'TOEIC Listening & Reading',
    'dossier.issuedLabel': 'Issued: October 2025',
    'dossier.scoreLabel': 'Verified Score: 550 / 990',
    'dossier.copied': 'Copied to Clipboard!',

    // Projects
    'projects.pill': 'SELECTED WORKS & CASE STUDIES',
    'projects.title': 'Featured Engineering Projects',
    'projects.subtitle': 'Stacked horizontal case studies detailing architecture, key features, and live production deployments.',
    'projects.allTitle': 'Engineered for scale & resilience',
    'projects.allSubtitle': 'Explore complete full-stack web applications, AI Agentic RAG implementations, and commercial web platforms engineered by Nguyễn Hoàng Huynh.',
    'projects.viewAll': 'View All Case Studies',
    'projects.caseStudy': 'Explore Case Study',
    'projects.liveSite': 'Live Website',
    'projects.role': 'Role',
    'projects.timeline': 'Timeline',
    'projects.featuresTitle': 'Key Features & Capabilities',

    // Case Study Detail
    'study.back': '← All Projects',
    'study.overview': 'Project Overview',
    'study.featuresSection': 'Core Product Features & Capabilities',
    'study.storytelling': 'Engineering Journey & 3D Storytelling',
    'study.role': 'Role',
    'study.timeline': 'Timeline',
    'study.teamSize': 'Team Size',
    'study.stack': 'Technical Stack',
    'study.links': 'Project Links',
    'study.visitLive': 'Visit Live Website',
    'study.sourceCode': 'Source Code',
    'study.live': 'Live Website',
    'study.verified': 'Verified Feature',

    // Gallery Showcase
    'gallery.title': 'Website Interface & Screens Showcase',
    'gallery.viewGrid': 'View All Screens (Grid)',
    'gallery.viewShowcase': 'Showcase View',
    'gallery.fullscreen': 'Fullscreen Zoom',
    'gallery.close': 'Close',
    'gallery.prev': 'Previous Screen',
    'gallery.next': 'Next Screen',
    'gallery.screensCount': 'Screens',
    'gallery.visit': 'Visit Live Website',

    // Footer
    'footer.tagline': 'Engineered for performance, resilience, and visual craftsmanship.',
    'footer.rights': 'All rights reserved.',
    'footer.admin': 'Admin Console',
    'footer.top': 'Back to Top ↑',
    'footer.available': 'Currently open to Full-Stack Developer Intern, Fresher & Junior opportunities.',
  },
  vi: {
    // Nav
    'nav.projects': 'Dự án',
    'nav.about': 'Giới thiệu',
    'nav.stack': 'Kỹ năng',
    'nav.cms': 'Cổng CMS',
    'nav.contact': 'Liên hệ',
    'nav.status': 'Sẵn sàng nhận việc',

    // Hero
    'hero.badge': 'Sẵn sàng nhận việc • Học viện Hàng không Việt Nam (Khóa 2026)',
    'hero.subtitle': 'Kỹ sư Phần mềm Full-Stack & Kiến trúc Hệ thống',
    'hero.intro': 'Sinh viên năm thứ ba ngành Công nghệ Thông tin tại Học viện Hàng không Việt Nam (GPA tích lũy 3.1 / 4.0). Chuyên sâu phát triển ứng dụng web hiệu năng cao, kiến trúc backend tin cậy và luồng tích hợp AI Agentic với TypeScript, Next.js 16 và PostgreSQL Neon.',
    'hero.viewWork': 'Xem Dự án Tiêu biểu',
    'hero.getInTouch': 'Liên hệ Hợp tác',
    'hero.gpaLabel': 'GPA Tích lũy',
    'hero.majorLabel': 'Chuyên ngành CNTT',
    'hero.toeicLabel': 'Chứng chỉ ETS',
    'hero.systemsLabel': 'Dự án Thực tế',

    // About Me Preview (Homepage)
    'aboutPreview.pill': 'GIỚI THIỆU & HỒ SƠ KỸ THUẬT',

    // About Page
    'about.eyebrowProfile': 'HỒ SƠ & TIỂU SỬ KỸ THUẬT',
    'about.title': 'Kỹ thuật Chính xác, Hiệu năng & Đam mê Sáng tạo',
    'about.eyebrowBio': '01 / TIỂU SỬ & ĐỊNH HƯỚNG',
    'about.bioHeading': 'Kết nối mã nguồn sạch với trải nghiệm người dùng thực tế.',
    'about.eyebrowEdu': '02 / HỌC VẤN & BẰNG CẤP',
    'about.eduHeading': 'Nền tảng Học vấn & Đào tạo',
    'about.eyebrowCert': '03 / CHỨNG CHỈ XÁC THỰC',
    'about.certHeading': 'Chứng chỉ & Văn bằng Quốc tế',
    'about.eyebrowSkills': '04 / KỸ NĂNG CHUYÊN MÔN',
    'about.skillsHeading': 'Hệ sinh thái Công nghệ',
    'about.getInTouch': 'Liên hệ Hợp tác',
    'about.downloadResume': 'Tải Hồ Sơ CV',
    'aboutPreview.title': 'Đam mê Kỹ thuật, Tối ưu Hiệu năng & Mã nguồn Sạch',
    'aboutPreview.desc': 'Tóm tắt ngắn gọn về hành trình học tập, thế mạnh cốt lõi và định hướng phát triển phần mềm.',
    'aboutPreview.summaryP1': 'Tôi là sinh viên năm 3 ngành Công nghệ Thông tin tại Học viện Hàng không Việt Nam với GPA tích lũy 3.1/4.0 và chứng chỉ TOEIC 550 do ETS cấp. Thế mạnh của tôi tập trung vào lập trình Full-Stack end-to-end, thiết kế cơ sở dữ liệu phân tán và ứng dụng giải pháp AI thông minh.',
    'aboutPreview.summaryP2': 'Từ việc xây dựng hệ thống API backend vững chắc trên Node.js, tối ưu hóa cơ sở dữ liệu quan hệ PostgreSQL (Neon), đến việc trau chuốt giao diện người dùng mượt mà trên React và Next.js 16, tôi luôn theo đuổi kiến trúc sạch, an toàn và tối ưu trải nghiệm người dùng.',
    'aboutPreview.readMore': 'Xem Chi tiết Học vấn, Môn học & Quá trình Phát triển',
    'aboutPreview.credentialsBadge': 'Học Vấn & Chứng Chỉ',
    'aboutPreview.academy': 'Học viện Hàng không Việt Nam',
    'aboutPreview.academySub': 'Học viện Hàng không Việt Nam • Khoa Công nghệ Thông tin',
    'aboutPreview.majorLabel': 'Chuyên ngành',
    'aboutPreview.majorVal': 'Công nghệ Thông tin (CNTT)',
    'aboutPreview.standingLabel': 'Niên khóa / Trình độ',
    'aboutPreview.standingVal': 'Năm thứ 3 (Khóa 2026)',
    'aboutPreview.gpaLabel': 'GPA Tích lũy',
    'aboutPreview.englishLabel': 'Trình độ Ngoại ngữ',
    'aboutPreview.englishVal': 'TOEIC 550 [Chứng Chỉ ETS]',
    'aboutPreview.phoneLabel': 'Điện thoại / Zalo',
    'aboutPreview.stackLabel': 'Công nghệ Chủ lực',
    'aboutPreview.contactPrompt': 'Bạn muốn trao đổi cơ hội hợp tác?',
    'aboutPreview.sendMessage': 'Gửi Tin Nhắn',
    'aboutPreview.strengthPerf': 'Hiệu Năng Vượt Trội',
    'aboutPreview.strengthPerfSub': 'Tải trang dưới 1 giây, kết xuất biên & tối ưu kích thước gói mã',
    'aboutPreview.strengthSecurity': 'Bảo Mật & Độ Tin Cậy',
    'aboutPreview.strengthSecuritySub': 'Phiên đăng nhập HttpOnly, giới hạn tần suất & xác thực chữ ký',
    'aboutPreview.strengthFrontend': 'Kiến Trúc Web Hiện Đại',
    'aboutPreview.strengthFrontendSub': 'Next.js 16 App Router, React, API Node.js & xử lý dữ liệu thông suốt',
    'aboutPreview.strengthAgentic': 'Trí Tuệ Nhân Tạo Agentic',
    'aboutPreview.strengthAgenticSub': 'LangChain.js, Gemini API & RAG truy xuất dữ liệu ngữ cảnh',
    'aboutPreview.strengthCleanCode': 'Mã Nguồn Chuẩn Mực & Sạch Sẽ',
    'aboutPreview.strengthCleanCodeSub': 'TypeScript nghiêm ngặt, kiến trúc component module hóa & kiểu dữ liệu an toàn',

    // Dossier (Hero)
    'dossier.tabStack': 'Công nghệ Cốt lõi',
    'dossier.tabArchitecture': 'Kiến trúc Hệ thống',
    'dossier.tabCredentials': 'Học vấn & Chứng chỉ',
    'dossier.degree': 'Chương trình Đào tạo',
    'dossier.degreeName': 'Cử nhân Công nghệ Thông tin',
    'dossier.institution': 'Học viện Hàng không Việt Nam',
    'dossier.timelineLabel': 'Thời gian: 2023 – Hiện tại',
    'dossier.gpaLabel': 'GPA Tích lũy: 3.1 / 4.0',
    'dossier.langCert': 'Chứng chỉ Ngoại ngữ',
    'dossier.toeic': 'TOEIC Listening & Reading',
    'dossier.issuedLabel': 'Cấp ngày: Tháng 10, 2025',
    'dossier.scoreLabel': 'Điểm xác thực: 550 / 990',
    'dossier.copied': 'Đã sao chép email!',

    // Projects
    'projects.pill': 'DỰ ÁN & HỒ SƠ KỸ THUẬT',
    'projects.title': 'Dự án Kỹ thuật Tiêu biểu',
    'projects.subtitle': 'Các bài case study dạng thẻ ngang xếp chồng, phân tích chi tiết tính năng, kiến trúc và quy trình triển khai thực tế.',
    'projects.allTitle': 'Thiết kế cho Quy mô & Độ Tin cậy',
    'projects.allSubtitle': 'Khám phá trọn bộ các ứng dụng web Full-Stack, hệ thống AI Agentic RAG và các dự án thực tế do Nguyễn Hoàng Huynh phát triển.',
    'projects.viewAll': 'Xem Tất cả Dự án',
    'projects.caseStudy': 'Chi tiết Dự án',
    'projects.liveSite': 'Trang Trực tiếp',
    'projects.role': 'Vai trò',
    'projects.timeline': 'Thời gian',
    'projects.featuresTitle': 'Chức năng & Năng lực Sản phẩm',

    // Case Study Detail
    'study.back': '← Tất cả Dự án',
    'study.overview': 'Tổng quan Dự án',
    'study.featuresSection': 'Danh sách Chức năng Sản phẩm Chi tiết',
    'study.storytelling': 'Hành trình Kỹ thuật & Storytelling 3D',
    'study.role': 'Vai trò',
    'study.timeline': 'Thời gian',
    'study.teamSize': 'Quy mô Đội ngũ',
    'study.stack': 'Công nghệ Sử dụng',
    'study.links': 'Liên kết Dự án',
    'study.visitLive': 'Truy cập Website Trực tiếp',
    'study.sourceCode': 'Mã nguồn GitHub',
    'study.live': 'Trang Trực tiếp',
    'study.verified': 'Tính năng Đã Kiểm chứng',

    // Gallery Showcase
    'gallery.title': 'Hình ảnh Giao diện Website Trực tiếp',
    'gallery.viewGrid': 'Xem tất cả ảnh (Lưới)',
    'gallery.viewShowcase': 'Trình chiếu tập trung',
    'gallery.fullscreen': 'Phóng to toàn màn hình',
    'gallery.close': 'Đóng',
    'gallery.prev': 'Ảnh trước',
    'gallery.next': 'Ảnh tiếp theo',
    'gallery.screensCount': 'Hình ảnh',
    'gallery.visit': 'Truy cập Website Trực tiếp',

    // Footer
    'footer.tagline': 'Thiết kế tối ưu hiệu năng, độ tin cậy và trải nghiệm thị giác.',
    'footer.rights': 'Bảo lưu mọi quyền.',
    'footer.admin': 'Cổng Quản trị CMS',
    'footer.top': 'Lên Đầu trang ↑',
    'footer.available': 'Hiện đang sẵn sàng cho các vị trí Thực tập, Fresher & Junior Full-Stack Developer.',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_lang');
      if (stored === 'en' || stored === 'vi') {
        setLangState(stored);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('portfolio_lang', newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'vi' : 'en');
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
