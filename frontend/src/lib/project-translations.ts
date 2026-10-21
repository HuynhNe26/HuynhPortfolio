import type { Language } from '@/context/language-context';
import type { Project } from '@/lib/types';

export interface ProjectLocalization {
  title: string;
  summary: string;
  role?: string;
}

export const PROJECT_TRANSLATIONS: Record<string, Partial<Record<Language, ProjectLocalization>>> = {
  'ticket-concert-agentic-rag': {
    zh: {
      title: '基于 Agentic RAG 的演唱会票务与智能客服系统',
      summary: '基于 Agentic RAG 智能体的高性能演唱会票务与实时客服平台，支持上下文智能问答解析与自动化支付工作流。',
      role: '全栈开发工程师',
    },
    vi: {
      title: 'Hệ thống hỗ trợ đặt vé hòa nhạc dựa trên Agentic RAG',
      summary: 'Nền tảng bán vé hòa nhạc thông minh và hỗ trợ khách hàng theo thời gian thực ứng dụng Agentic RAG để giải đáp ngữ cảnh và xử lý thanh toán mượt mà.',
      role: 'Lập trình viên Full-Stack',
    },
    en: {
      title: 'Ticket Concert Support System Based on Agentic RAG',
      summary: 'An intelligent concert ticketing and real-time customer support platform leveraging Agentic RAG for contextual inquiry resolution and seamless payment workflows.',
      role: 'Full-Stack Developer',
    },
  },
  'fashion-nail-morley': {
    zh: {
      title: 'Fashion Nail Morley 澳洲高端美甲沙龙官网',
      summary: '专为澳大利亚美甲沙龙量身打造的高响应式预约与作品展示营销落地页，集成客户实时咨询与预约流程。',
      role: '全栈开发工程师',
    },
    vi: {
      title: 'Trang đích thương mại Fashion Nail Morley',
      summary: 'Trang đích giới thiệu dịch vụ và đặt lịch hẹn chuẩn SEO, tốc độ cao dành cho tiệm nail tại Úc, tích hợp form tư vấn trực tiếp.',
      role: 'Lập trình viên Full-Stack',
    },
    en: {
      title: 'Fashion Nail Morley Landing Page',
      summary: 'A fast, responsive salon booking and showcase landing page designed for an Australian beauty salon with integrated customer inquiries.',
      role: 'Full-Stack Developer',
    },
  },
  'examplatform-ai': {
    zh: {
      title: 'ExamPlatform AI — AI 智能在线考试与自适应评测系统',
      summary: '具备自适应学习特性的在线考试评测系统，支持题目实时分发、安全防作弊监控与考生能力图谱追踪。',
      role: '全栈开发工程师',
    },
    vi: {
      title: 'ExamPlatform AI — Nền tảng thi trực tuyến thông minh',
      summary: 'Nền tảng học tập thích ứng và kiểm tra tự động hóa với khả năng tạo câu hỏi thời gian thực, đánh giá an toàn và theo dõi năng lực sinh viên.',
      role: 'Lập trình viên Full-Stack',
    },
    en: {
      title: 'ExamPlatform AI — AI-Powered Online Examination Platform',
      summary: 'An adaptive learning and automated examination platform featuring real-time question generation, secure evaluation, and student performance tracking.',
      role: 'Full-Stack Developer',
    },
  },
  'vk-digital-hub': {
    zh: {
      title: 'VK Digital Hub — 数字化营销机构业务增长官网',
      summary: '专为数字化营销机构打造的高转化率业务官网，集成基于 Make API 的自动化商机线索流转系统。',
      role: '全栈开发工程师',
    },
    vi: {
      title: 'VK Digital Hub — Trang đích cơ quan tiếp thị số',
      summary: 'Trang đích chuyển đổi cao cho agency tiếp thị số với quy trình thu thập khách hàng tiềm năng tự động hóa bằng Make API.',
      role: 'Lập trình viên Full-Stack',
    },
    en: {
      title: 'VK Digital Hub — Digital Marketing Landing Page',
      summary: 'A high-converting digital marketing agency landing page with automated lead capture workflows powered by Make API.',
      role: 'Full-Stack Developer',
    },
  },
  'nh-huynh-portfolio': {
    zh: {
      title: 'NH HUYNH — 个人全栈工程师技术作品集与 3D 交互平台',
      summary: '阮黄兄（Nguyễn Hoàng Huynh）的个人全栈技术作品集，融合现代化高质感浅色设计、3D 鼠标倾角卡片、分屏式交互叙事引擎与安全 CMS 内容管理中台。',
      role: '全栈开发工程师 & UI/UX 架构师',
    },
    vi: {
      title: 'NH HUYNH — Portfolio kỹ thuật & Nền tảng Scrollytelling tương tác',
      summary: 'Nền tảng portfolio kỹ thuật Full-Stack của Nguyễn Hoàng Huynh, kết hợp ngôn ngữ thiết kế Light Theme cao cấp, hiệu ứng thẻ 3D Tilt tương tác, động cơ Scrollytelling chia đôi màn hình và hệ quản trị nội dung CMS bảo mật.',
      role: 'Lập trình viên Full-Stack & UI/UX',
    },
    en: {
      title: 'NH HUYNH — Developer Portfolio & Interactive Scrollytelling Platform',
      summary: 'Full-stack technical portfolio featuring modern Light Theme, interactive 3D tilt cards, split-screen scrollytelling engine, and a secure CMS admin portal.',
      role: 'Full-Stack Developer & UI/UX Architect',
    },
  },
};

export function getLocalizedRole(role: string | undefined, lang: Language): string {
  if (!role) {
    if (lang === 'zh') return '全栈开发工程师';
    if (lang === 'vi') return 'Lập trình viên Full-Stack';
    return 'Full-Stack Developer';
  }

  if (lang === 'zh') {
    if (/full-stack/i.test(role) && /ui\/ux/i.test(role)) return '全栈开发工程师 & UI/UX 架构师';
    if (/full-stack/i.test(role)) return '全栈开发工程师';
    if (/frontend/i.test(role)) return '前端开发工程师';
    if (/backend/i.test(role)) return '后端开发工程师';
    if (/student/i.test(role)) return '计算机专业大三学生 / 全栈开发';
    return '全栈开发工程师';
  }

  if (lang === 'vi') {
    if (/full-stack/i.test(role) && /ui\/ux/i.test(role)) return 'Lập trình viên Full-Stack & UI/UX';
    if (/full-stack/i.test(role)) return 'Lập trình viên Full-Stack';
    if (/frontend/i.test(role)) return 'Lập trình viên Frontend';
    if (/backend/i.test(role)) return 'Lập trình viên Backend';
    return role;
  }

  return role;
}

export function getLocalizedTimeline(timeline: string | undefined, lang: Language): string {
  if (!timeline) return '';

  if (lang === 'zh') {
    let result = timeline;
    result = result.replace(/January/gi, '1月')
      .replace(/February/gi, '2月')
      .replace(/March/gi, '3月')
      .replace(/April/gi, '4月')
      .replace(/May/gi, '5月')
      .replace(/June/gi, '6月')
      .replace(/July/gi, '7月')
      .replace(/August/gi, '8月')
      .replace(/September/gi, '9月')
      .replace(/October/gi, '10月')
      .replace(/November/gi, '11月')
      .replace(/December/gi, '12月')
      .replace(/Tháng\s*10/gi, '10月')
      .replace(/Tháng\s*11/gi, '11月')
      .replace(/Tháng\s*12/gi, '12月')
      .replace(/Tháng\s*(\d+)/gi, '$1月')
      .replace(/Present|Hiện tại/gi, '至今');
    return result;
  }

  if (lang === 'vi') {
    let result = timeline;
    result = result.replace(/January/gi, 'Tháng 1')
      .replace(/February/gi, 'Tháng 2')
      .replace(/March/gi, 'Tháng 3')
      .replace(/April/gi, 'Tháng 4')
      .replace(/May/gi, 'Tháng 5')
      .replace(/June/gi, 'Tháng 6')
      .replace(/July/gi, 'Tháng 7')
      .replace(/August/gi, 'Tháng 8')
      .replace(/September/gi, 'Tháng 9')
      .replace(/October/gi, 'Tháng 10')
      .replace(/November/gi, 'Tháng 11')
      .replace(/December/gi, 'Tháng 12')
      .replace(/Present/gi, 'Hiện tại');
    return result;
  }

  return timeline;
}

export function getLocalizedProject(project: Project, lang: Language): {
  title: string;
  summary: string;
  role: string;
  timeline: string;
} {
  const match = PROJECT_TRANSLATIONS[project.slug];
  const loc = match ? match[lang] : undefined;

  return {
    title: loc?.title || project.title,
    summary: loc?.summary || project.summary,
    role: loc?.role || getLocalizedRole(project.role, lang),
    timeline: getLocalizedTimeline(project.timeline, lang) || String(project.year),
  };
}
