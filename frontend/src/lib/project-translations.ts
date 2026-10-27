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
      title: '基于 Agentic RAG 的智能演唱会票务与全流程运营系统',
      summary: '基于 Agentic RAG（LangGraph + Gemini 2.5 Flash + pgvector）的高性能演唱会票务与全流程管理生态系统，集成 React-Konva 舞台可视化分区设计器、Socket.IO 实时防重锁座机制、MoMo/VNPay 双通道支付以及现场二维码扫码验票。',
      role: '全栈开发工程师',
    },
    vi: {
      title: 'Hệ thống hỗ trợ đặt vé hòa nhạc dựa trên Agentic RAG',
      summary: 'Nền tảng phân phối vé concert quy mô lớn tích hợp Trợ lý AI Agentic RAG (LangGraph + Gemini 2.5 Flash + pgvector), bộ công cụ thiết kế sân khấu Canvas (React-Konva), bản đồ chọn chỗ thời gian thực (Socket.IO), thanh toán MoMo/VNPay và máy quét mã QR soát vé tại cổng.',
      role: 'Lập trình viên Full-Stack',
    },
    en: {
      title: 'Ticket Concert Support System Based on Agentic RAG',
      summary: 'A comprehensive concert ticketing and event management ecosystem featuring a multi-tool Agentic RAG AI Assistant (LangGraph + Gemini 2.5 Flash + pgvector), interactive Canvas stage designer (React-Konva), real-time seat sync via Socket.IO, dual MoMo & VNPay payment gateways, and gate check-in QR scanner.',
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
      title: 'ExamPlatform AI — 遵循 GDPT 2018 标准的新一代自适应在线考试与苏格拉底 AI 启发式导学系统',
      summary: '贯穿小学至大学 18 大专业的自适应测评系统。集成 OpenCV 实时考场诚信监控、LangGraph 苏格拉底三阶思维导学引擎、Hamilton-Hare 题阵防重复算法、Pure SVG 60FPS 能力图谱与 BullMQ 自动化家长监护中枢。',
      role: '全栈开发工程师',
    },
    vi: {
      title: 'ExamPlatform AI — Nền Tảng Thi Thử Thích Ứng & Khai Phóng Tư Duy Chuẩn GDPT 2018',
      summary: 'Hệ thống khảo thí thích ứng và rèn luyện tư duy thế hệ mới chuẩn GDPT 2018 (Tiểu học đến Đại học 18 ngành), tích hợp Camera AI giám sát liêm chính thời gian thực, Gia sư Socratic 3 tầng dẫn dắt tư duy, Ma trận đề Hamilton-Hare không trùng lặp và Cổng phụ huynh minh bạch đồng hành.',
      role: 'Lập trình viên Full-Stack',
    },
    en: {
      title: 'ExamPlatform AI — Adaptive Examination & Socratic AI Tutoring Platform (GDPT 2018)',
      summary: 'Next-generation adaptive assessment and cognitive development platform covering Grades 1–12 and 18 University disciplines. Features real-time OpenCV AI proctoring, LangGraph 3-tier Socratic tutoring, Hamilton-Hare non-repeating exam matrices, 60FPS Pure SVG radar charts, and BullMQ automated parent reporting.',
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
  'skyroute-aviation-ops': {
    zh: {
      title: 'SkyRoute Dispatcher — 民航实时航班调度与货物载重平衡中台',
      summary: '基于实时雷达空域地图的民航航班调度与货物载重平衡中台，支持航空器重心包线（Center of Gravity）精确计算与 ULD 集装箱最优装载配置。',
      role: '全栈开发工程师 & 航空系统架构师',
    },
    vi: {
      title: 'SkyRoute Dispatcher — Nền tảng điều phối bay & kiểm soát tải trọng',
      summary: 'Nền tảng điều phối bay và kiểm soát tải trọng hàng không thời gian thực với bản đồ bay radar, tính toán trọng tâm máy bay (Center of Gravity) và phân bổ ULD tối ưu.',
      role: 'Lập trình viên Full-Stack & Hệ thống Hàng không',
    },
    en: {
      title: 'SkyRoute Dispatcher — Real-Time Flight Operations & Cargo Management',
      summary: 'Real-time flight dispatch and cargo load control platform featuring radar airspace mapping, aircraft center of gravity (CG) calculations, and optimal ULD pallet allocation.',
      role: 'Full-Stack Developer & Aviation Systems Architect',
    },
  },
  'medicare-ai-triage': {
    zh: {
      title: 'MediCare AI — 智慧远程医疗问诊与临床辅助决策分诊系统',
      summary: '具备智能临床辅助决策的智慧医疗与 AI 分诊平台，集成 WebRTC 高清远程视频问诊、数字化电子处方与药物相互作用冲突预警引擎。',
      role: '全栈开发工程师 & 医疗 AI 架构师',
    },
    vi: {
      title: 'MediCare AI — Hệ thống phân loại bệnh & khám từ xa thông minh',
      summary: 'Hệ thống bệnh án điện tử (EMR) và phân loại triệu chứng bệnh nhân bằng AI, tích hợp phòng khám video WebRTC và kê đơn thuốc số cảnh báo tương tác thuốc.',
      role: 'Lập trình viên Full-Stack & Kỹ sư AI Y tế',
    },
    en: {
      title: 'MediCare AI — Smart Telehealth & Clinical Decision Support System',
      summary: 'Smart electronic medical records (EMR) and AI clinical triage platform featuring real-time WebRTC video consultation and digital prescription with drug interaction alerts.',
      role: 'Full-Stack Developer & Healthcare AI Engineer',
    },
  },
  'rent-house-smart-management': {
    zh: {
      title: '智能出租屋管理系统与本地 AI 抄表识别 — Thanh Tâm 公寓',
      summary: '集成计算机视觉与本地 AI OCR 微服务的端到端出租屋智慧管理系统，支持实际水电表图像自动识别与人机协同审核、SMS 与邮件多渠道账单推送、SHA-256 不可篡改电子合同及跨平台 Android 原生应用。',
      role: '全栈开发工程师 & AI 微服务架构师',
    },
    vi: {
      title: 'Hệ thống quản lý nhà trọ thông minh & AI OCR cục bộ — Nhà Trọ Thanh Tâm',
      summary: 'Hệ thống quản trị nhà trọ toàn diện với Microservice AI OCR nhận diện chỉ số điện nước từ ảnh chụp thực tế, quy trình duyệt Human-in-the-loop, tự động lập hóa đơn đa kênh (SMS OTP & Email Resend), ký hợp đồng điện tử bất biến bảo mật mã băm SHA-256 trên Neon PostgreSQL và ứng dụng di động Android APK (Capacitor).',
      role: 'Lập trình viên Full-Stack & Kiến trúc sư AI Microservices',
    },
    en: {
      title: 'Smart Rental House Management & Local AI OCR — Nhà Trọ Thanh Tâm',
      summary: 'End-to-end rental boarding house management system featuring local AI OCR microservices for automated utility meter reading from actual photos, human-in-the-loop audit verification, automated multi-channel billing (SMS OTP & Resend Email), and SHA-256 tamper-proof electronic contract signing on PostgreSQL Neon.',
      role: 'Full-Stack Developer & AI Microservices Architect',
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
