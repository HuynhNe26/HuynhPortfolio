'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'vi' | 'zh';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.education': 'Education',
    'nav.contact': 'Contact',
    'nav.letsTalk': "Let's Talk",
    'nav.stack': 'Stack',
    'nav.cms': 'CMS Portal',
    'nav.status': 'Available for Roles',

    // Hero Showcase (Frame 1)
    'hero.role': 'Web Developer',
    'hero.badge': 'Available for Roles • Vietnam Aviation Academy (Class of 2026)',
    'hero.subtitle': 'Full-Stack Software Engineer & System Architect',
    'hero.bio': 'A passionate full-stack developer and a 3rd year IT student at Vietnam Aviation Academy, building practical solutions with modern technologies.',
    'hero.intro': 'Third-year Information Technology student at Vietnam Aviation Academy (Cumulative GPA 3.1 / 4.0). Specializing in high-performance web applications, resilient backend architectures, and AI Agentic workflows using TypeScript, Next.js 16, and PostgreSQL Neon.',
    'hero.viewProjects': 'View My Projects',
    'hero.contactMe': 'Contact Me',
    'hero.viewWork': 'View Featured Projects',
    'hero.getInTouch': 'Get in Touch',
    'hero.stats.gpa': 'GPA',
    'hero.stats.projects': 'Projects',
    'hero.stats.learning': 'Years learning',
    'hero.stats.passion': 'Passion',
    'hero.scrollHint': 'Scroll to explore',

    // Featured Projects (Frame 2)
    'featured.eyebrow': 'MY WORK',
    'featured.title': 'Featured Projects',
    'featured.subtitle': "A collection of projects I've built during my academic journey and personal learning, each with unique challenges and real-world impact.",
    'featured.role': 'Role',
    'featured.timeline': 'Timeline',
    'featured.techStack': 'Technologies',
    'featured.viewDetails': 'View Details',
    'featured.viewReport': 'View Report',
    'featured.visitProduct': 'Live Demo',
    'filter.all': 'All',
    'filter.webApp': 'Web Application',
    'filter.landing': 'Landing Page',
    'filter.academic': 'Academic',
    'filter.ongoing': 'Ongoing',

    // Bento Grid: About Me (Frame 4)
    'bento.about.eyebrow': 'ABOUT ME',
    'bento.about.heading1': 'Turning Ideas',
    'bento.about.heading2': 'Into Real Products',
    'bento.about.bio': "I'm Nguyễn Hoàng Huynh, a 3rd year Information Technology student at Vietnam Aviation Academy. I'm passionate about web development and love building products that solve real-world problems.",
    'bento.about.downloadCv': 'Download CV',
    'bento.badge.student': '3rd year',
    'bento.badge.studentSub': 'IT Student',
    'bento.badge.passionate': 'Passionate about',
    'bento.badge.passionateSub': 'Web Development',

    // Bento Grid: Education & Certificates (Frame 5)
    'bento.edu.title': 'Education',
    'bento.cert.title': 'Certificates',
    'bento.more': 'More →',
    'bento.edu.school': 'Vietnam Aviation Academy',
    'bento.edu.major': 'Information Technology',
    'bento.edu.period': '2023 – Present',
    'bento.edu.gpa': 'GPA: 3.1/4.0',
    'bento.cert.name': 'TOEIC 550 - Listening & Reading',
    'bento.cert.issuer': 'Educational Testing Service',
    'bento.cert.date': 'October 2025',
    'bento.cert.score': 'Score: 550',

    // Bento Grid: Skills (Frame 6)
    'bento.skills.title': 'My Skills',
    'bento.skills.subtitle': 'Technologies I work with',
    'bento.skills.all': 'All',
    'bento.skills.frontend': 'Frontend',
    'bento.skills.backend': 'Backend',
    'bento.skills.database': 'Database',
    'bento.skills.tools': 'Tools & APIs',

    // Bento Grid: Contact (Frame 7)
    'bento.contact.eyebrow': 'GET IN TOUCH',
    'bento.contact.title': "Let's Build Something Amazing",
    'bento.contact.desc': "I'm always open to discussing new opportunities, interesting projects or just having a chat about technology.",
    'bento.contact.namePlaceholder': 'Your name',
    'bento.contact.emailPlaceholder': 'Your email',
    'bento.contact.msgPlaceholder': 'Your message',
    'bento.contact.sendBtn': 'Send Message',
    'bento.contact.sending': 'Sending...',
    'bento.contact.success': '✓ Message sent successfully! Thank you for reaching out.',

    // Case Study Detail (Frame 3)
    'case.back': '← Back to projects',
    'case.visitSite': 'Visit Website',
    'case.viewReport': 'View Report (Docs)',
    'case.viewGithub': 'View on GitHub',
    'case.exploreArch': 'Explore Architecture',
    'case.role': 'My Role',
    'case.teamSize': 'Team Size',
    'case.solo': 'Solo Developer',
    'case.members': 'members',
    'case.time': 'Time',
    'case.status': 'Status',
    'case.inDev': 'In Development',
    'case.completed': 'Completed',
    'case.techsUsed': 'Technologies Used',
    'case.overview': 'Project Overview',
    'case.features': 'Key Features',

    // Storytelling & Pager
    'story.chaptersNav': '3D Story Chapters:',
    'story.prev': '← Previous Project',
    'story.next': 'Next Project →',
    'story.ctaEyebrow': 'READY TO COLLABORATE?',
    'story.ctaTitle': 'Let’s discuss what we can build together.',
    'story.ctaTalk': 'Start a Conversation ↗',
    'story.ctaMore': 'Explore More Work',

    // Projects Page (/projects)
    'projects.viewReport': 'View Report',
    'projectsPage.eyebrow': 'PRODUCTION SYSTEMS & CASE STUDIES',
    'projectsPage.title': 'Engineered for scale & resilience',
    'projectsPage.desc': 'Explore complete full-stack web applications, AI Agentic RAG implementations, and commercial web platforms engineered by Nguyễn Hoàng Huynh.',

    // About Page (/about)
    'aboutPage.eyebrow': 'PROFILE & BACKGROUND',
    'aboutPage.title': 'Engineering with precision & curiosity',
    'aboutPage.factsTitle': 'System Profile',
    'aboutPage.fullName': 'Full Name',
    'aboutPage.standing': 'Academic Standing',
    'aboutPage.standingVal': '3rd Year IT Student (Class of 2026)',
    'aboutPage.institution': 'Institution',
    'aboutPage.institutionVal': 'Vietnam Aviation Academy',
    'aboutPage.gpa': 'Cumulative GPA',
    'aboutPage.english': 'English Credential',
    'aboutPage.englishVal': 'TOEIC 550 [ETS Certified]',
    'aboutPage.hometown': 'Location',
    'aboutPage.phone': 'Phone / Direct',
    'aboutPage.email': 'Email Address',

    // Contact Page (/contact)
    'contactPage.eyebrow': 'GET IN TOUCH',
    'contactPage.title': 'Let’s build something exceptional together.',
    'contactPage.desc': 'Have a software project, an internship opportunity, or a technical inquiry in mind? I’m always open to discussing new engineering challenges.',
    'contactPage.directChannel': 'Direct communication channel. Responses typically sent within 24 hours.',
    'contactPage.phoneDirect': 'Direct Phone & WhatsApp:',
    'contactPage.formTitle': 'Send a Message',
    'contactPage.formSubtitle': "Fill in your details below and I'll get back to you promptly.",
    'contactPage.fieldName': 'Your name',
    'contactPage.fieldEmail': 'Email address',
    'contactPage.fieldMsg': 'What do you have in mind?',
    'contactPage.fieldSubmit': 'Send Message →',

    // Footer
    'footer.tagline': 'Engineered for performance, resilience, and visual craftsmanship.',
    'footer.rights': 'All rights reserved.',
    'footer.admin': 'Admin Console',
    'footer.top': 'Back to Top ↑',
    'footer.available': 'Currently open to Full-Stack Developer Intern, Fresher & Junior opportunities.',
  },
  vi: {
    // Nav
    'nav.home': 'Trang chủ',
    'nav.about': 'Giới thiệu',
    'nav.projects': 'Dự án',
    'nav.experience': 'Kinh nghiệm',
    'nav.education': 'Học vấn',
    'nav.contact': 'Liên hệ',
    'nav.letsTalk': 'Liên hệ ngay',
    'nav.stack': 'Kỹ năng',
    'nav.cms': 'Cổng CMS',
    'nav.status': 'Sẵn sàng nhận việc',

    // Hero Showcase (Frame 1)
    'hero.role': 'Lập trình viên Web',
    'hero.badge': 'Sẵn sàng nhận việc • Học viện Hàng không Việt Nam (Khóa 2026)',
    'hero.subtitle': 'Kỹ sư Phần mềm Full-Stack & Kiến trúc Hệ thống',
    'hero.bio': 'Lập trình viên Full-Stack đầy đam mê và là sinh viên năm 3 ngành Công nghệ Thông tin tại Học viện Hàng không Việt Nam, chuyên xây dựng các giải pháp thực tế với công nghệ hiện đại.',
    'hero.intro': 'Sinh viên năm thứ ba ngành Công nghệ Thông tin tại Học viện Hàng không Việt Nam (GPA tích lũy 3.1 / 4.0). Chuyên sâu phát triển ứng dụng web hiệu năng cao, kiến trúc backend tin cậy và luồng tích hợp AI Agentic với TypeScript, Next.js 16 và PostgreSQL Neon.',
    'hero.viewProjects': 'Xem Dự án của tôi',
    'hero.contactMe': 'Liên hệ với tôi',
    'hero.viewWork': 'Xem Dự án Tiêu biểu',
    'hero.getInTouch': 'Liên hệ Hợp tác',
    'hero.stats.gpa': 'Điểm GPA',
    'hero.stats.projects': 'Dự án',
    'hero.stats.learning': 'Năm học hỏi',
    'hero.stats.passion': 'Đam mê',
    'hero.scrollHint': 'Cuộn để khám phá',

    // Featured Projects (Frame 2)
    'featured.eyebrow': 'DỰ ÁN CỦA TÔI',
    'featured.title': 'Dự án Nổi bật',
    'featured.subtitle': 'Tổng hợp các dự án tôi đã phát triển trong quá trình học đại học và tự nghiên cứu, mỗi dự án đều mang bài toán thực tế và ứng dụng công nghệ hiện đại.',
    'featured.role': 'Vai trò',
    'featured.timeline': 'Thời gian',
    'featured.techStack': 'Công nghệ',
    'featured.viewDetails': 'Xem chi tiết',
    'featured.viewReport': 'Xem báo cáo',
    'featured.visitProduct': 'Xem sản phẩm',
    'filter.all': 'Tất cả',
    'filter.webApp': 'Ứng dụng Web',
    'filter.landing': 'Trang đích Marketing',
    'filter.academic': 'Đồ án Học thuật',
    'filter.ongoing': 'Đang phát triển',

    // Bento Grid: About Me (Frame 4)
    'bento.about.eyebrow': 'VỀ BẢN THÂN',
    'bento.about.heading1': 'Biến ý tưởng',
    'bento.about.heading2': 'Thành sản phẩm thực tế',
    'bento.about.bio': 'Tôi là Nguyễn Hoàng Huynh, sinh viên năm 3 ngành Công nghệ Thông tin tại Học viện Hàng không Việt Nam. Tôi đam mê phát triển web và tâm huyết tạo ra những sản phẩm giải quyết vấn đề thực tế.',
    'bento.about.downloadCv': 'Tải xuống CV',
    'bento.badge.student': 'Năm thứ 3',
    'bento.badge.studentSub': 'Sinh viên CNTT',
    'bento.badge.passionate': 'Đam mê phát triển',
    'bento.badge.passionateSub': 'Lập trình Web',

    // Bento Grid: Education & Certificates (Frame 5)
    'bento.edu.title': 'Học vấn',
    'bento.cert.title': 'Chứng chỉ',
    'bento.more': 'Xem thêm →',
    'bento.edu.school': 'Học viện Hàng không Việt Nam',
    'bento.edu.major': 'Công nghệ Thông tin',
    'bento.edu.period': '2023 – Hiện tại',
    'bento.edu.gpa': 'GPA: 3.1/4.0',
    'bento.cert.name': 'TOEIC 550 - Nghe & Đọc',
    'bento.cert.issuer': 'Tổ chức Khảo thí ETS Hoa Kỳ',
    'bento.cert.date': 'Tháng 10, 2025',
    'bento.cert.score': 'Điểm đạt: 550',

    // Bento Grid: Skills (Frame 6)
    'bento.skills.title': 'Kỹ năng chuyên môn',
    'bento.skills.subtitle': 'Công nghệ tôi sử dụng',
    'bento.skills.all': 'Tất cả',
    'bento.skills.frontend': 'Frontend',
    'bento.skills.backend': 'Backend',
    'bento.skills.database': 'Cơ sở dữ liệu',
    'bento.skills.tools': 'Công cụ & API',

    // Bento Grid: Contact (Frame 7)
    'bento.contact.eyebrow': 'LIÊN HỆ VỚI TÔI',
    'bento.contact.title': 'Cùng nhau xây dựng sản phẩm tuyệt vời',
    'bento.contact.desc': 'Tôi luôn sẵn sàng đón nhận cơ hội nghề nghiệp, thảo luận các dự án tiềm năng hoặc trao đổi về công nghệ.',
    'bento.contact.namePlaceholder': 'Họ và tên của bạn',
    'bento.contact.emailPlaceholder': 'Địa chỉ email của bạn',
    'bento.contact.msgPlaceholder': 'Nội dung tin nhắn...',
    'bento.contact.sendBtn': 'Gửi Tin Nhắn',
    'bento.contact.sending': 'Đang gửi...',
    'bento.contact.success': '✓ Tin nhắn đã được gửi thành công! Cảm ơn bạn đã liên hệ.',

    // Case Study Detail (Frame 3)
    'case.back': '← Quay lại danh sách dự án',
    'case.visitSite': 'Truy cập Website',
    'case.viewReport': 'Xem báo cáo (Google Docs)',
    'case.viewGithub': 'Xem trên GitHub',
    'case.exploreArch': 'Khám phá Kiến trúc',
    'case.role': 'Vai trò của tôi',
    'case.teamSize': 'Quy mô nhóm',
    'case.solo': 'Lập trình viên độc lập',
    'case.members': 'thành viên',
    'case.time': 'Thời gian',
    'case.status': 'Trạng thái',
    'case.inDev': 'Đang phát triển',
    'case.completed': 'Đã hoàn thành',
    'case.techsUsed': 'Công nghệ sử dụng',
    'case.overview': 'Tổng quan dự án',
    'case.features': 'Tính năng cốt lõi',

    // Storytelling & Pager
    'story.chaptersNav': 'Các chương Kể chuyện 3D:',
    'story.prev': '← Dự án trước',
    'story.next': 'Dự án tiếp theo →',
    'story.ctaEyebrow': 'SẴN SÀNG HỢP TÁC?',
    'story.ctaTitle': 'Hãy cùng trao đổi những gì chúng ta có thể tạo nên.',
    'story.ctaTalk': 'Bắt đầu cuộc trò chuyện ↗',
    'story.ctaMore': 'Xem thêm các dự án khác',

    // Projects Page (/projects)
    'projects.viewReport': 'Xem báo cáo',
    'projectsPage.eyebrow': 'HỆ THỐNG THỰC TẾ & BÀI HỌC KỸ THUẬT',
    'projectsPage.title': 'Thiết kế tối ưu cho Quy mô & Độ Tin cậy',
    'projectsPage.desc': 'Khám phá toàn bộ các ứng dụng web Full-Stack, hệ thống AI Agentic RAG và các nền tảng thương mại thực tế do Nguyễn Hoàng Huynh phát triển.',

    // About Page (/about)
    'aboutPage.eyebrow': 'HỒ SƠ & TIỂU SỬ KỸ THUẬT',
    'aboutPage.title': 'Kỹ thuật Chính xác, Hiệu năng & Đam mê Sáng tạo',
    'aboutPage.factsTitle': 'Thông tin Hệ thống',
    'aboutPage.fullName': 'Họ và Tên',
    'aboutPage.standing': 'Trình độ / Niên khóa',
    'aboutPage.standingVal': 'Sinh viên năm 3 CNTT (Khóa 2026)',
    'aboutPage.institution': 'Cơ sở đào tạo',
    'aboutPage.institutionVal': 'Học viện Hàng không Việt Nam',
    'aboutPage.gpa': 'GPA Tích lũy',
    'aboutPage.english': 'Chứng chỉ Ngoại ngữ',
    'aboutPage.englishVal': 'TOEIC 550 [Chứng nhận ETS]',
    'aboutPage.hometown': 'Địa điểm',
    'aboutPage.phone': 'Điện thoại trực tiếp',
    'aboutPage.email': 'Địa chỉ Email',

    // Contact Page (/contact)
    'contactPage.eyebrow': 'LIÊN HỆ VỚI TÔI',
    'contactPage.title': 'Cùng nhau xây dựng sản phẩm chất lượng vượt trội.',
    'contactPage.desc': 'Bạn có dự án phần mềm, cơ hội thực tập, hoặc câu hỏi kỹ thuật cần thảo luận? Tôi luôn sẵn sàng trao đổi các bài toán kỹ thuật mới.',
    'contactPage.directChannel': 'Kênh liên lạc trực tiếp. Phản hồi thường được gửi trong vòng 24 giờ.',
    'contactPage.phoneDirect': 'Điện thoại & Zalo trực tiếp:',
    'contactPage.formTitle': 'Gửi Tin Nhắn',
    'contactPage.formSubtitle': 'Điền thông tin của bạn vào bên dưới và tôi sẽ phản hồi sớm nhất.',
    'contactPage.fieldName': 'Họ và tên của bạn',
    'contactPage.fieldEmail': 'Địa chỉ email',
    'contactPage.fieldMsg': 'Bạn đang ấp ủ dự án hay ý tưởng gì?',
    'contactPage.fieldSubmit': 'Gửi Tin Nhắn →',

    // Footer
    'footer.tagline': 'Thiết kế tối ưu hiệu năng, độ tin cậy và trải nghiệm thị giác.',
    'footer.rights': 'Bảo lưu mọi quyền.',
    'footer.admin': 'Cổng Quản trị CMS',
    'footer.top': 'Lên Đầu trang ↑',
    'footer.available': 'Hiện đang sẵn sàng cho các vị trí Thực tập, Fresher & Junior Full-Stack Developer.',
  },
  zh: {
    // Nav
    'nav.home': '首页',
    'nav.about': '关于我',
    'nav.projects': '项目作品',
    'nav.experience': '专业技能',
    'nav.education': '教育背景',
    'nav.contact': '联系方式',
    'nav.letsTalk': '立即沟通',
    'nav.stack': '技术栈',
    'nav.cms': 'CMS 门户',
    'nav.status': '可随时到岗',

    // Hero Showcase (Frame 1)
    'hero.role': 'Web 全栈开发工程师',
    'hero.badge': '可随时到岗 • 越南航空学院 (2026届)',
    'hero.subtitle': '全栈软件工程师 & 系统架构',
    'hero.bio': '充满热情的全栈开发工程师，越南航空学院计算机科学与技术专业大三学生，致力于运用现代技术构建高效实用的工程方案。',
    'hero.intro': '越南航空学院计算机科学与技术专业三年级学生（累计 GPA 3.1 / 4.0）。专注高并发高性能 Web 应用程序、高可用后端架构以及基于 TypeScript、Next.js 16 和 PostgreSQL Neon 的 AI Agentic 智能体工作流。',
    'hero.viewProjects': '查看我的项目',
    'hero.contactMe': '联系我',
    'hero.viewWork': '浏览精选项目',
    'hero.getInTouch': '建立合作',
    'hero.stats.gpa': 'GPA 绩点',
    'hero.stats.projects': '实战项目',
    'hero.stats.learning': '研习年限',
    'hero.stats.passion': '技术热情',
    'hero.scrollHint': '向下滚动探索',

    // Featured Projects (Frame 2)
    'featured.eyebrow': '精选项目',
    'featured.title': '核心项目作品',
    'featured.subtitle': '汇集我在大学阶段与自主钻研中独立开发的实战项目，涵盖实际商业痛点与前沿技术方案。',
    'featured.role': '担任角色',
    'featured.timeline': '项目周期',
    'featured.techStack': '核心技术',
    'featured.viewDetails': '查看详情',
    'featured.viewReport': '技术报告',
    'featured.visitProduct': '在线演示',
    'filter.all': '全部',
    'filter.webApp': 'Web 应用',
    'filter.landing': '营销落地页',
    'filter.academic': '学术课设',
    'filter.ongoing': '进行中',

    // Bento Grid: About Me (Frame 4)
    'bento.about.eyebrow': '关于我',
    'bento.about.heading1': '将创意与构想',
    'bento.about.heading2': '转化为落地产品',
    'bento.about.bio': '我是阮黄兄（Nguyễn Hoàng Huynh），越南航空学院信息技术专业大三学生。热爱 Web 开发，乐于构建解决现实问题的优质软件。',
    'bento.about.downloadCv': '下载个人简历',
    'bento.badge.student': '大学三年级',
    'bento.badge.studentSub': '计算机专业',
    'bento.badge.passionate': '专注探索',
    'bento.badge.passionateSub': 'Web 开发',

    // Bento Grid: Education & Certificates (Frame 5)
    'bento.edu.title': '教育经历',
    'bento.cert.title': '资格证书',
    'bento.more': '更多 →',
    'bento.edu.school': '越南航空学院',
    'bento.edu.major': '信息技术 / 计算机科学',
    'bento.edu.period': '2023 – 至今',
    'bento.edu.gpa': 'GPA: 3.1/4.0',
    'bento.cert.name': 'TOEIC 550 - 听力与阅读',
    'bento.cert.issuer': '美国教育考试服务中心 (ETS)',
    'bento.cert.date': '2025年10月',
    'bento.cert.score': '成绩: 550',

    // Bento Grid: Skills (Frame 6)
    'bento.skills.title': '专业技能',
    'bento.skills.subtitle': '日常使用的技术栈与工具',
    'bento.skills.all': '全部',
    'bento.skills.frontend': '前端开发',
    'bento.skills.backend': '后端架构',
    'bento.skills.database': '数据库',
    'bento.skills.tools': '开发工具与 API',

    // Bento Grid: Contact (Frame 7)
    'bento.contact.eyebrow': '保持联系',
    'bento.contact.title': '携手打造卓越产品',
    'bento.contact.desc': '随时欢迎交流新的职业机会、探讨有趣的项目或技术交流。',
    'bento.contact.namePlaceholder': '您的姓名',
    'bento.contact.emailPlaceholder': '电子邮箱',
    'bento.contact.msgPlaceholder': '请输入您的留言内容...',
    'bento.contact.sendBtn': '发送留言',
    'bento.contact.sending': '发送中...',
    'bento.contact.success': '✓ 留言发送成功！感谢您的联系。',

    // Case Study Detail (Frame 3)
    'case.back': '← 返回项目列表',
    'case.visitSite': '访问线上网站',
    'case.viewReport': '技术报告 (Docs)',
    'case.viewGithub': 'GitHub 源码',
    'case.exploreArch': '系统架构图',
    'case.role': '担任职责',
    'case.teamSize': '团队规模',
    'case.solo': '独立全栈开发',
    'case.members': '人',
    'case.time': '开发周期',
    'case.status': '项目状态',
    'case.inDev': '开发中',
    'case.completed': '已完成',
    'case.techsUsed': '所用技术栈',
    'case.overview': '项目概述',
    'case.features': '核心特性',

    // Storytelling & Pager
    'story.chaptersNav': '3D 交互叙事章节:',
    'story.prev': '← 上一个项目',
    'story.next': '下一个项目 →',
    'story.ctaEyebrow': '准备好开始合作了吗？',
    'story.ctaTitle': '一起探讨我们能共同打造的卓越系统。',
    'story.ctaTalk': '发起沟通 ↗',
    'story.ctaMore': '浏览更多项目',

    // Projects Page (/projects)
    'projects.viewReport': '查看报告',
    'projectsPage.eyebrow': '生产级系统与技术案例',
    'projectsPage.title': '专为高可用与可扩展性设计',
    'projectsPage.desc': '探索阮黄兄（Nguyễn Hoàng Huynh）自主构建的全栈 Web 应用、AI Agentic RAG 智能体以及商业化落地系统。',

    // About Page (/about)
    'aboutPage.eyebrow': '个人档案与技术履历',
    'aboutPage.title': '秉承工程严谨，追求卓越性能',
    'aboutPage.factsTitle': '系统档案',
    'aboutPage.fullName': '姓名',
    'aboutPage.standing': '学历 / 年级',
    'aboutPage.standingVal': '信息技术大三在读 (2026届)',
    'aboutPage.institution': '毕业 / 在读院校',
    'aboutPage.institutionVal': '越南航空学院',
    'aboutPage.gpa': '累计 GPA',
    'aboutPage.english': '外语资质',
    'aboutPage.englishVal': 'TOEIC 550 [美国 ETS 认证]',
    'aboutPage.hometown': '所在地区',
    'aboutPage.phone': '联系电话',
    'aboutPage.email': '电子邮箱',

    // Contact Page (/contact)
    'contactPage.eyebrow': '联系我',
    'contactPage.title': '携手创造不凡的产品与系统。',
    'contactPage.desc': '如果您有软件开发项目、实习招聘机会或技术问题想要探讨，欢迎随时与我联络。',
    'contactPage.directChannel': '直接沟通渠道。通常在 24 小时内回复。',
    'contactPage.phoneDirect': '电话 & WhatsApp/Zalo:',
    'contactPage.formTitle': '发送消息',
    'contactPage.formSubtitle': '在下方填写您的信息，我会尽快回复。',
    'contactPage.fieldName': '您的姓名',
    'contactPage.fieldEmail': '电子邮箱',
    'contactPage.fieldMsg': '您有什么想法或项目需要探讨？',
    'contactPage.fieldSubmit': '发送消息 →',

    // Footer
    'footer.tagline': '专注性能、高可用与极致视觉体验。',
    'footer.rights': '保留所有权利。',
    'footer.admin': 'CMS 管理后台',
    'footer.top': '回到顶部 ↑',
    'footer.available': '目前正在积极寻找全栈开发实习生、Fresher 及 Junior 岗位机会。',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'vi',
  setLang: () => {},
  toggleLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to 'vi' as requested by user, but restore preference if stored
  const [lang, setLangState] = useState<Language>('vi');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_lang');
      if (stored === 'en' || stored === 'vi' || stored === 'zh') {
        setLangState(stored as Language);
        document.documentElement.lang = stored === 'zh' ? 'zh-CN' : stored;
      } else {
        // Default to Vietnamese
        setLangState('vi');
        localStorage.setItem('portfolio_lang', 'vi');
        document.documentElement.lang = 'vi';
      }
    } catch {
      // ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('portfolio_lang', newLang);
      document.documentElement.lang = newLang === 'zh' ? 'zh-CN' : newLang;
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    const cycleMap: Record<Language, Language> = {
      vi: 'en',
      en: 'zh',
      zh: 'vi',
    };
    setLang(cycleMap[lang] || 'vi');
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.vi[key] || translations.en[key] || key;
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
