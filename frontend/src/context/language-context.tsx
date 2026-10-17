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
    'aboutPreview.title': 'Driven by Engineering Rigor & Clean Code',
    'aboutPreview.desc': 'A concise snapshot of my academic journey, core strengths, and passion for building scalable web platforms.',
    'aboutPreview.summaryP1': 'I am a third-year Information Technology student at Vietnam Aviation Academy with a cumulative GPA of 3.1/4.0 and an ETS-certified TOEIC score of 550. My focus spans end-to-end full-stack development, distributed database design, and intelligent AI-assisted workflows.',
    'aboutPreview.summaryP2': 'Whether architecting resilient backend APIs in Node.js, designing high-throughput relational schemas in PostgreSQL (Neon), or crafting intuitive user interfaces in React and Next.js 16, I strive for clean architecture, rock-solid security, and delightful user experiences.',
    'aboutPreview.readMore': 'Read Full Engineering Background, Coursework & Timeline',

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
    'aboutPreview.title': 'Đam mê Kỹ thuật, Tối ưu Hiệu năng & Mã nguồn Sạch',
    'aboutPreview.desc': 'Tóm tắt ngắn gọn về hành trình học tập, thế mạnh cốt lõi và định hướng phát triển phần mềm.',
    'aboutPreview.summaryP1': 'Tôi là sinh viên năm 3 ngành Công nghệ Thông tin tại Học viện Hàng không Việt Nam với GPA tích lũy 3.1/4.0 và chứng chỉ TOEIC 550 do ETS cấp. Thế mạnh của tôi tập trung vào lập trình Full-Stack end-to-end, thiết kế cơ sở dữ liệu phân tán và ứng dụng giải pháp AI thông minh.',
    'aboutPreview.summaryP2': 'Từ việc xây dựng hệ thống API backend vững chắc trên Node.js, tối ưu hóa cơ sở dữ liệu quan hệ PostgreSQL (Neon), đến việc trau chuốt giao diện người dùng mượt mà trên React và Next.js 16, tôi luôn theo đuổi kiến trúc sạch, an toàn và tối ưu trải nghiệm người dùng.',
    'aboutPreview.readMore': 'Xem Chi tiết Học vấn, Môn học & Quá trình Phát triển',

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
