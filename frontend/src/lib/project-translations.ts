import type { Language } from '@/context/language-context';
import type { Project, ProjectFeature } from '@/lib/types';

export interface LocalizedFeatureItem {
  title: string;
  description: string;
}

export interface ProjectLocalization {
  title: string;
  summary: string;
  role?: string;
  category?: string;
  features?: LocalizedFeatureItem[];
}

export function isPublicLiveUrl(url?: string): boolean {
  if (!url) return false;
  return !/localhost|127\.0\.0\.1/i.test(url);
}

export const PROJECT_TRANSLATIONS: Record<string, Partial<Record<Language, ProjectLocalization>>> = {
  'ticket-concert-agentic-rag': {
    zh: {
      title: '基于 Agentic RAG 的智能演唱会票务与全流程运营系统',
      summary:
        '基于 Agentic RAG（LangGraph + Gemini 2.5 Flash + pgvector）的高性能演唱会票务与全流程管理生态系统，集成 React-Konva 舞台可视化分区设计器、Socket.IO 实时防重锁座机制、MoMo/VNPay 双通道支付以及现场二维码扫码验票。',
      role: '全栈开发工程师',
      category: 'AI 智能体与全栈应用',
      features: [
        {
          title: '多工具 Agentic RAG 智能助手 (LangGraph & Gemini 2.5 Flash)',
          description: '结合 pgvector 语义检索与实时 PostgreSQL 工具调用，精准解答票档、排期与订单状态，零幻觉响应。',
        },
        {
          title: 'Canvas 舞台分区可视化设计器 (React-Konva)',
          description: '支持管理端自由绘制多边形与矩形看台区域，直观配置票价与容量并持久化至 JSONB。',
        },
        {
          title: '交互式选座与实时防重锁座 (Socket.IO)',
          description: '按场次房间毫秒级广播余票变动，彻底杜绝高并发抢票下的重复锁座冲突。',
        },
      ],
    },
    vi: {
      title: 'Hệ thống hỗ trợ đặt vé hòa nhạc dựa trên Agentic RAG',
      summary:
        'Nền tảng phân phối vé concert quy mô lớn tích hợp Trợ lý AI Agentic RAG (LangGraph + Gemini 2.5 Flash + pgvector), bộ công cụ thiết kế sân khấu Canvas (React-Konva), bản đồ chọn chỗ thời gian thực (Socket.IO), thanh toán MoMo/VNPay và máy quét mã QR soát vé tại cổng.',
      role: 'Lập trình viên Full-Stack',
      category: 'Ứng dụng AI & Full-Stack',
      features: [
        {
          title: 'Trợ lý AI Agentic RAG Đa Công Cụ (LangGraph & Gemini 2.5 Flash)',
          description: 'Tích hợp Gemini 2.5 Flash kết hợp LangGraph và pgvector, tự động kích hoạt 7 công cụ truy vấn dữ liệu vé thực tế.',
        },
        {
          title: 'Bộ Công Cụ Admin Vẽ Sơ Đồ Sân Khấu Canvas (React-Konva)',
          description: 'Thiết kế sơ đồ mặt bằng trực quan trên Canvas, vẽ phân khu đa giác/chữ nhật và cấu hình giá vé lưu JSONB.',
        },
        {
          title: 'Sơ Đồ Chọn Chỗ Tương Tác & Đồng Bộ Realtime (Socket.IO)',
          description: 'Đồng bộ số lượng vé hai chiều theo phòng sự kiện qua Socket.IO, ngăn chặn hoàn toàn xung đột đặt trùng vé.',
        },
      ],
    },
    en: {
      title: 'Ticket Concert Support System Based on Agentic RAG',
      summary:
        'A comprehensive concert ticketing and event management ecosystem featuring a multi-tool Agentic RAG AI Assistant (LangGraph + Gemini 2.5 Flash + pgvector), interactive Canvas stage designer (React-Konva), real-time seat sync via Socket.IO, dual MoMo & VNPay payment gateways, and gate check-in QR scanner.',
      role: 'Full-Stack Developer',
      category: 'AI & Full-Stack Application',
      features: [
        {
          title: 'Multi-Tool Agentic RAG Assistant (LangGraph & Gemini 2.5 Flash)',
          description: 'Combines pgvector semantic search with 7 live PostgreSQL tools for grounded event, ticket, and order resolution.',
        },
        {
          title: 'Admin Canvas Stage Layout Designer (React-Konva)',
          description: 'Custom HTML5 Canvas editor allowing organizers to draw polygon/rect seating zones and configure pricing in JSONB.',
        },
        {
          title: 'Interactive Seating Map & Real-Time Sync (Socket.IO)',
          description: 'Bi-directional room broadcasts synchronize ticket inventory in real time and prevent concurrent booking collisions.',
        },
      ],
    },
  },
  'colorbox-event-lighting': {
    zh: {
      title: 'COLORBOX — 专业大型活动舞台灯光视觉与实时制作运营平台',
      summary:
        '专为 COLORBOX 打造的舞台灯光视觉展示与实时运营管理平台。融合电影级体积光束（Volumetric Light Beams）、四象限角度交互圆盘 HUD、万人级音乐节技术档案、Resend 自动勘景预约以及基于 Socket.IO 与 Web Audio API 的实时管理中枢。',
      role: '全栈主程开发工程师',
      category: '全栈系统与实时舞台制作',
      features: [
        {
          title: '电影级体积光束与动态舞台视觉 (Volumetric Beams)',
          description: '运用几何光学布局与 Framer Motion / GSAP 还原大型演唱会聚光灯矩阵与调光氛围。',
        },
        {
          title: '四象限极坐标交互圆盘导航 (Four-Piece Circle HUD)',
          description: '基于三角函数角度计算打造四分区圆盘交互，直观浏览音乐节灯光方案与设备配置。',
        },
        {
          title: '万人级演出技术档案与实时预约中枢 (Socket.IO)',
          description: '数字化呈现大型跨年与音乐节灯光 Rider 参数，结合 Resend 邮件与 Web Audio 实时通知。',
        },
      ],
    },
    vi: {
      title: 'COLORBOX — Nền Tảng Trực Quan & Quản Trị Hệ Thống Ánh Sáng Sân Khấu Sự Kiện',
      summary:
        'Nền tảng trực quan và trung tâm điều hành sản xuất ánh sáng sân khấu sự kiện chuyên nghiệp cho COLORBOX. Tích hợp hiệu ứng sân khấu điện ảnh Volumetric Lighting Beams, vòng tròn tương tác Four-Piece Circle HUD, hồ sơ kỹ thuật đại nhạc hội, đặt lịch khảo sát qua Resend API và quản trị Real-Time qua Socket.IO.',
      role: 'Lập trình viên Full-Stack Chính',
      category: 'Full-Stack & Điều hành Sản xuất Realtime',
      features: [
        {
          title: 'Sân Khấu Volumetric Light Beams & Chuyển Động Điện Ảnh',
          description: 'Ứng dụng hình học CSS, Framer Motion và GSAP mô phỏng chùm sáng sân khấu hội tụ mượt mà 60FPS.',
        },
        {
          title: 'Vòng Tròn Tương Tác Four-Piece Circle HUD Theo Tọa Độ Góc',
          description: 'Bộ điều hướng 4 phân vùng tính toán bằng lượng giác Math.atan2 giúp khám phá hồ sơ đại nhạc hội trực quan.',
        },
        {
          title: 'Hồ Sơ Rider Kỹ Thuật & Trung Tâm Quản Trị Booking Realtime',
          description: 'Số hóa thông số kỹ thuật sự kiện 50.000 khán giả, tự động hóa đặt lịch qua Resend API và cảnh báo Socket.IO.',
        },
      ],
    },
    en: {
      title: 'COLORBOX — Professional Event Stage Lighting & Real-Time Production Platform',
      summary:
        'Visual showcase and real-time production operations platform for COLORBOX stage lighting. Features cinematic Volumetric Lighting Beams, trigonometric Four-Piece Circle HUD navigation, stadium festival technical dossiers, automated survey booking via Resend API, and a Socket.IO + Web Audio API live admin center.',
      role: 'Lead Full-Stack Developer',
      category: 'Full-Stack & Real-Time Production',
      features: [
        {
          title: 'Cinematic Volumetric Light Beams & 60FPS Stage Motion',
          description: 'Combines geometric CSS optics with Framer Motion and GSAP to simulate concert-grade beam arrays and dimmers.',
        },
        {
          title: 'Trigonometric Four-Piece Circle HUD Navigation',
          description: 'Interactive 4-quadrant radial controller powered by Math.atan2 for exploring stadium festival lighting riders.',
        },
        {
          title: 'Festival Technical Dossiers & Real-Time Booking Console',
          description: 'Digitizes lighting specs for 50,000-attendee concerts with Resend email dispatch and Socket.IO audio alerts.',
        },
      ],
    },
  },
  'fashion-nail-morley': {
    zh: {
      title: 'Fashion Nail Morley — 澳洲 Morley Galleria 高端美甲沙龙全流程在线预约与管理系统',
      summary:
        '专为西澳珀斯 Morley Galleria 高端美甲沙龙打造的全流程在线预约与数字化运营中枢。涵盖 29 种医疗级灭菌护理（BIAB 强化胶、Gel-X、水晶延甲、水疗美足），严格遵循珀斯时区（AWST UTC+8）的 6 步智能预约向导，24/7 AI 礼宾咨询顾问，以及基于 WebSocket 实时同步与 Node-cron 定时调度的管理后台。',
      role: '全栈开发工程师',
      category: '商业预约平台与管理后台',
      features: [
        {
          title: '29 项美甲护理菜单与透明澳元定价体系',
          description: '科学分类 BIAB、Gel-X、水晶甲与水疗项目，提供清晰透明的服务时长与价格说明。',
        },
        {
          title: '严格同步珀斯时区 (AWST UTC+8) 的 6 步预约向导',
          description: '无缝引导服务选择、未来 14 天排期校验与双通道邮件确认，防止跨时区偏差。',
        },
        {
          title: '24/7 AI 礼宾顾问与 WebSocket 实时管理后台',
          description: '全天候解答护理与报价咨询，配合 WebSocket 实时预约看板与定时优惠券分发。',
        },
      ],
    },
    vi: {
      title: 'Fashion Nail Morley — Hệ Thống Đặt Lịch & Quản Trị Salon Nail Cao Cấp (Morley Galleria, WA)',
      summary:
        'Nền tảng thương mại và quản trị vận hành toàn diện cho salon nail tại Morley Galleria, Tây Úc (Perth). Tích hợp danh mục 29 dịch vụ chuẩn y tế (BIAB, Gel-X, Acrylic, Spa), quy trình đặt lịch 6 bước theo múi giờ Perth (AWST), Trợ lý AI Fashion Nails Concierge tư vấn 24/7 và Executive Admin Suite quản lý lịch hẹn realtime qua WebSocket & điều phối voucher tự động qua Cronjob.',
      role: 'Lập trình viên Full-Stack',
      category: 'Nền tảng Đặt lịch Thương mại & Quản trị',
      features: [
        {
          title: 'Menu 29 Liệu Trình Làm Móng & Bảng Giá AUD Minh Bạch',
          description: 'Phân loại khoa học theo 6 nhóm BIAB, Gel-X, Acrylic và Spa kèm thời lượng và chi phí rõ ràng.',
        },
        {
          title: 'Quy Trình Đặt Lịch 6 Bước Chuẩn Múi Giờ Perth (AWST UTC+8)',
          description: 'Kiểm tra khung giờ khả dụng trong 14 ngày tới và gửi xác nhận tự động không lệch múi giờ.',
        },
        {
          title: 'Trợ Lý AI Concierge 24/7 & Quản Trị Lịch Hẹn WebSocket',
          description: 'Tư vấn dịch vụ tự động 24/7 kết hợp bảng điều khiển quản trị đồng bộ lịch hẹn thời gian thực.',
        },
      ],
    },
    en: {
      title: 'Fashion Nail Morley — Luxury Salon Booking & Executive Admin Suite (Morley Galleria, WA)',
      summary:
        'An end-to-end commercial booking and administrative management platform for a premier beauty salon at Morley Galleria, Western Australia (Perth). Features a 29-treatment medical-grade menu (BIAB, Gel-X, Acrylic, Spa), a 6-step booking wizard synchronized with Perth time (AWST UTC+8), 24/7 AI Concierge consultation, and an Executive Admin Suite with real-time WebSocket appointment feeds and automated Node-cron voucher scheduling.',
      role: 'Full-Stack Developer',
      category: 'Commercial Booking & Admin Platform',
      features: [
        {
          title: '29-Treatment Service Menu & Transparent AUD Pricing',
          description: 'Structured across 6 categories (BIAB, Gel-X, Acrylic, Spa) with clear durations and upfront pricing.',
        },
        {
          title: '6-Step Booking Wizard Synced to Perth Time (AWST UTC+8)',
          description: 'Guides clients from treatment selection to 14-day slot validation and instant email confirmation.',
        },
        {
          title: '24/7 AI Salon Concierge & Real-Time WebSocket Admin',
          description: 'Answers client service inquiries around the clock while streaming live bookings to salon staff.',
        },
      ],
    },
  },
  'examplatform-ai': {
    zh: {
      title: 'ExamPlatform AI — 遵循 GDPT 2018 标准的新一代自适应在线考试与苏格拉底 AI 启发式导学系统',
      summary:
        '贯穿小学至大学 18 大专业的自适应测评系统。集成 OpenCV 实时考场诚信监控、LangGraph 苏格拉底三阶思维导学引擎、Hamilton-Hare 题阵防重复算法、Pure SVG 60FPS 能力图谱与 BullMQ 自动化家长监护中枢。',
      role: '全栈开发工程师',
      category: '教育科技与自适应 AI 测评',
      features: [
        {
          title: '符合 GDPT 2018 标准的自适应组卷算法 (Hamilton-Hare)',
          description: '精准分配识记、理解与高阶应用题型比例，保障每次模拟测试无重复抽题。',
        },
        {
          title: '覆盖小学至大学 18 大专业的四级教育体系',
          description: '提供人性化“尚未学习”标记与薄弱知识点矩阵诊断，生成个性化复习路径。',
        },
        {
          title: '三阶苏格拉底 AI 启发式导师 (LangGraph Workflows)',
          description: '通过渐进式提问引导解题思路与公式推导，而非直接给出答案，真正培养思维能力。',
        },
      ],
    },
    vi: {
      title: 'ExamPlatform AI — Nền Tảng Thi Thử Thích Ứng & Khai Phóng Tư Duy Chuẩn GDPT 2018',
      summary:
        'Hệ thống khảo thí thích ứng và rèn luyện tư duy thế hệ mới chuẩn GDPT 2018 (Tiểu học đến Đại học 18 ngành), tích hợp Camera AI giám sát liêm chính thời gian thực, Gia sư Socratic 3 tầng dẫn dắt tư duy, Ma trận đề Hamilton-Hare không trùng lặp và Cổng phụ huynh minh bạch đồng hành.',
      role: 'Lập trình viên Full-Stack',
      category: 'EdTech & Khảo thí AI Thích ứng',
      features: [
        {
          title: 'Ma Trận Đề Thích Ứng Chuẩn GDPT 2018 (Hamilton-Hare)',
          description: 'Phân bổ chuẩn xác tỉ lệ Nhận biết – Thông hiểu – Vận dụng, đảm bảo đề thi không trùng lặp.',
        },
        {
          title: '4 Khối Cấp Học Toàn Diện (Tiểu Học Đến Đại Học 18 Ngành)',
          description: 'Tích hợp cơ chế đánh dấu kiến thức chưa học và phân tích lỗ hổng năng lực trực quan bằng SVG 60FPS.',
        },
        {
          title: 'Gia Sư AI Socratic 3 Tầng & LangGraph Workflows',
          description: 'Dẫn dắt tư duy qua 3 cấp độ gợi mở phương pháp thay vì giải hộ, kết hợp báo cáo phụ huynh tự động.',
        },
      ],
    },
    en: {
      title: 'ExamPlatform AI — Adaptive Examination & Socratic AI Tutoring Platform (GDPT 2018)',
      summary:
        'Next-generation adaptive assessment and cognitive development platform covering Grades 1–12 and 18 University disciplines. Features real-time OpenCV AI proctoring, LangGraph 3-tier Socratic tutoring, Hamilton-Hare non-repeating exam matrices, 60FPS Pure SVG radar charts, and BullMQ automated parent reporting.',
      role: 'Full-Stack Developer',
      category: 'EdTech & Adaptive AI Assessment',
      features: [
        {
          title: 'Adaptive Exam Matrix Engine (Hamilton-Hare Algorithm)',
          description: 'Balances cognitive difficulty tiers across 30/45-minute exams with zero question repetition.',
        },
        {
          title: '4 Educational Tiers (Grades 1–12 & 18 University Majors)',
          description: 'Includes unlearned-topic filtering and 60FPS SVG skill radar diagnostics for targeted study.',
        },
        {
          title: '3-Tier Socratic AI Tutor & LangGraph Workflows',
          description: 'Guides students step-by-step through conceptual hints and formulas rather than spoiling answers.',
        },
      ],
    },
  },
  'vk-digital-hub': {
    zh: {
      title: 'VK Digital Hub — 数字化营销机构业务增长官网',
      summary: '专为数字化营销机构打造的高转化率业务官网，集成基于 Make API 的自动化商机线索流转系统。',
      role: '全栈开发工程师',
      category: '数字营销与自动化增长落地页',
      features: [
        {
          title: '高转化率品牌增长门户设计',
          description: '清晰呈现核心营销服务、客户 ROI 增长指标与品牌案例，最大化访客转化效率。',
        },
        {
          title: '模块化数字营销服务矩阵',
          description: '透明拆解 SEO 优化、付费广告投放、内容制作与品牌建设服务层级。',
        },
        {
          title: 'Make.com Webhook 自动化线索流转引擎',
          description: '毫秒级采集潜在客户咨询并自动同步至 CRM、团队通知渠道与确认邮件。',
        },
      ],
    },
    vi: {
      title: 'VK Digital Hub — Trang đích cơ quan tiếp thị số',
      summary: 'Trang đích chuyển đổi cao cho agency tiếp thị số với quy trình thu thập khách hàng tiềm năng tự động hóa bằng Make API.',
      role: 'Lập trình viên Full-Stack',
      category: 'Trang đích Tiếp thị Số & Tự động hóa',
      features: [
        {
          title: 'Giao diện Trang đích Tối ưu Tỷ lệ Chuyển đổi',
          description: 'Trình bày mạch lạc hệ sinh thái dịch vụ, chỉ số tăng trưởng ROI và uy tín thương hiệu cho agency.',
        },
        {
          title: 'Ma trận Gói Dịch vụ Tăng trưởng Trực quan',
          description: 'Phân tách minh bạch các gói SEO, quảng cáo đa kênh, sản xuất nội dung và chiến lược thương hiệu.',
        },
        {
          title: 'Tự động hóa Thu thập Lead qua Make.com Webhook',
          description: 'Tiếp nhận thông tin khách hàng tiềm năng tức thời, đồng bộ tự động vào CRM và gửi email phản hồi.',
        },
      ],
    },
    en: {
      title: 'VK Digital Hub — Digital Marketing Landing Page',
      summary: 'A high-converting digital marketing agency landing page with automated lead capture workflows powered by Make API.',
      role: 'Full-Stack Developer',
      category: 'Digital Marketing & Lead Automation',
      features: [
        {
          title: 'High-Conversion Digital Marketing Front Door',
          description: 'Conversion-optimized agency landing page presenting service offerings, ROI metrics, and social proof.',
        },
        {
          title: 'Interactive Growth Service Matrix',
          description: 'Transparent tier breakdown covering SEO optimization, PPC campaigns, content, and brand strategy.',
        },
        {
          title: 'Make.com Webhook Lead Automation Engine',
          description: 'Zero-latency webhook ingestion dispatching prospective leads instantly into CRM and email workflows.',
        },
      ],
    },
  },
  'nh-huynh-portfolio': {
    zh: {
      title: 'NH HUYNH — 个人全栈工程师技术作品集与交互展示平台',
      summary: '阮黄兄（Nguyen Hoang Huynh）的个人全栈技术作品集，融合现代化双色主题设计、3D 鼠标倾角卡片、多语言切换动效与安全 CMS 内容管理后台。',
      role: '全栈开发工程师 & UI/UX 架构师',
      category: '全栈作品集与安全 CMS 平台',
      features: [
        {
          title: '精致明暗双主题与高性能视觉体系',
          description: '兼顾浅色与深色模式对比度规范，针对高刷与 Retina 屏幕深度优化渲染帧率。',
        },
        {
          title: '3D 鼠标倾角项目卡片与动态环境背光',
          description: '实时追踪光标位置呈现自然三维透视倾角与柔和背光反馈，突出产品细节。',
        },
        {
          title: '越/英/中三语国际化与独立安全 CMS 后台',
          description: '内置完整多语言本地化与排版动效，配合基于 PostgreSQL Neon 的安全内容管理端。',
        },
      ],
    },
    vi: {
      title: 'NH HUYNH — Portfolio Kỹ thuật & Nền tảng Quản trị Nội dung Full-Stack',
      summary: 'Nền tảng portfolio kỹ thuật Full-Stack của Nguyễn Hoàng Huynh, kết hợp giao diện Sáng/Tối hiện đại, hiệu ứng thẻ 3D Tilt tương tác, đa ngôn ngữ Việt/Anh/Trung và hệ quản trị CMS bảo mật.',
      role: 'Lập trình viên Full-Stack & UI/UX',
      category: 'Full-Stack Portfolio & Hệ quản trị CMS',
      features: [
        {
          title: 'Giao diện Sáng / Tối Hiện đại & Tối ưu Hiệu năng',
          description: 'Thiết kế chuẩn tương phản cao cho cả Light/Dark mode, vận hành mượt mà trên màn hình Retina.',
        },
        {
          title: 'Thẻ Dự án 3D Tilt & Hào quang Ambient Theo Con trỏ',
          description: 'Hiệu ứng nghiêng 3D tự nhiên kết hợp ánh sáng nền phản hồi mượt theo chuyển động chuột.',
        },
        {
          title: 'Đa Ngôn ngữ Việt – Anh – Trung & CMS Quản trị Bảo mật',
          description: 'Chuyển đổi 3 ngôn ngữ tức thời kèm hiệu ứng chữ sắc nét và cổng quản trị dữ liệu PostgreSQL Neon.',
        },
      ],
    },
    en: {
      title: 'NH HUYNH — Full-Stack Developer Portfolio & Secure CMS Platform',
      summary: 'Full-stack technical portfolio of Nguyen Hoang Huynh featuring refined Light/Dark themes, interactive 3D tilt project cards, trilingual localization (VI/EN/ZH), and a secure CMS admin portal.',
      role: 'Full-Stack Developer & UI/UX Architect',
      category: 'Full-Stack Portfolio & CMS Platform',
      features: [
        {
          title: 'Refined Light/Dark Themes & Retina Performance',
          description: 'Engineered for high-contrast readability and zero-jank compositing across macOS and mobile displays.',
        },
        {
          title: 'Interactive 3D Tilt Cards & Cursor Ambient Backlight',
          description: 'Hardware-accelerated 3D perspective cards with smooth cursor-tracked specular highlights.',
        },
        {
          title: 'Trilingual i18n (VI/EN/ZH) & Secure Neon Postgres CMS',
          description: 'Seamless three-language switching paired with an authenticated administrative content portal.',
        },
      ],
    },
  },
  'rent-house-smart-management': {
    zh: {
      title: '智能出租屋管理系统与本地 AI 抄表识别 — Thanh Tâm 公寓',
      summary:
        '集成计算机视觉与本地 AI OCR 微服务的端到端出租屋智慧管理系统，支持实际水电表图像自动识别与人机协同审核、SMS 与邮件多渠道账单推送、SHA-256 不可篡改电子合同及跨平台 Android 原生应用。',
      role: '全栈开发工程师 & AI 微服务架构师',
      category: '智慧房产与本地 AI 微服务',
      features: [
        {
          title: '本地 AI OCR 水电表识别与清晰度检测',
          description: '基于 FastAPI + OpenCV 拉普拉斯方差检测照片模糊度，结合人机协同复核保障抄表零误差。',
        },
        {
          title: '阶梯计费快照与多渠道自动账单推送 (SMS & Email)',
          description: '采用价格快照冻结历史费率，一键核算房租水电并通过短信与邮件即时发送账单。',
        },
        {
          title: 'SHA-256 防篡改电子租约与 PostgreSQL 不可变触发器',
          description: '支持触屏手写签章生成 PDF 合同，结合哈希校验与数据库触发器杜绝合同篡改。',
        },
      ],
    },
    vi: {
      title: 'Hệ thống quản lý nhà trọ thông minh & AI OCR cục bộ — Nhà Trọ Thanh Tâm',
      summary:
        'Hệ thống quản trị nhà trọ toàn diện với Microservice AI OCR nhận diện chỉ số điện nước từ ảnh chụp thực tế, quy trình duyệt Human-in-the-loop, tự động lập hóa đơn đa kênh (SMS OTP & Email Resend), ký hợp đồng điện tử bất biến bảo mật mã băm SHA-256 trên Neon PostgreSQL và ứng dụng di động Android APK (Capacitor).',
      role: 'Lập trình viên Full-Stack & Kiến trúc sư AI Microservices',
      category: 'PropTech & AI OCR Microservices',
      features: [
        {
          title: 'AI OCR Đọc Công Tơ Cục Bộ & Kiểm Định Độ Nét OpenCV',
          description: 'Tự động phát hiện ảnh mờ bằng phương sai Laplacian và đối chiếu ảnh gốc Human-in-the-loop chuẩn xác.',
        },
        {
          title: 'Tính Hóa Đơn Bậc Thang & Gửi Đa Kênh (SMS OTP & Email)',
          description: 'Cơ chế Snapshot Pricing khóa đơn giá lịch sử, tự động tổng hợp tiền phòng và gửi thông báo tức thì.',
        },
        {
          title: 'Hợp Đồng Điện Tử Bất Biến Bảo Mật Mã Băm SHA-256',
          description: 'Ký tay trực tiếp trên màn hình cảm ứng, xuất PDF kèm chữ ký băm SHA-256 và trigger chống sửa đổi.',
        },
      ],
    },
    en: {
      title: 'Smart Rental House Management & Local AI OCR — Nhà Trọ Thanh Tâm',
      summary:
        'End-to-end rental boarding house management system featuring local AI OCR microservices for automated utility meter reading from actual photos, human-in-the-loop audit verification, automated multi-channel billing (SMS OTP & Resend Email), and SHA-256 tamper-proof electronic contract signing on PostgreSQL Neon.',
      role: 'Full-Stack Developer & AI Microservices Architect',
      category: 'PropTech & Local AI Microservices',
      features: [
        {
          title: 'Local AI OCR & Laplacian Blur Detector',
          description: 'Automated utility meter reading microservice with image sharpness validation and human-in-the-loop review.',
        },
        {
          title: 'Automated Multi-Channel Billing (SMS & Email)',
          description: 'Calculates rent and tiered utilities using immutable Snapshot Pricing with instant SMS & Resend dispatch.',
        },
        {
          title: 'Immutable Electronic Contracts (SHA-256)',
          description: 'Touchscreen lease signing, PDFKit generation with SHA-256 integrity hashes, and PostgreSQL immutability triggers.',
        },
      ],
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
    if (/lead/i.test(role) && /full-stack/i.test(role)) return '全栈主程开发工程师';
    if (/full-stack/i.test(role)) return '全栈开发工程师';
    if (/frontend/i.test(role)) return '前端开发工程师';
    if (/backend/i.test(role)) return '后端开发工程师';
    if (/student/i.test(role)) return '计算机专业大三学生 / 全栈开发';
    return '全栈开发工程师';
  }

  if (lang === 'vi') {
    if (/full-stack/i.test(role) && /ui\/ux/i.test(role)) return 'Lập trình viên Full-Stack & UI/UX';
    if (/lead/i.test(role) && /full-stack/i.test(role)) return 'Lập trình viên Full-Stack Chính';
    if (/full-stack/i.test(role)) return 'Lập trình viên Full-Stack';
    if (/frontend/i.test(role)) return 'Lập trình viên Frontend';
    if (/backend/i.test(role)) return 'Lập trình viên Backend';
    return role;
  }

  return role;
}

export function getLocalizedStatus(status: Project['status'] | string | undefined, lang: Language): string {
  const isOngoing = status === 'Ongoing';
  if (lang === 'vi') return isOngoing ? 'Đang phát triển' : 'Hoàn thành';
  if (lang === 'zh') return isOngoing ? '进行中' : '已完成';
  return isOngoing ? 'Ongoing' : 'Completed';
}

export function getLocalizedTimeline(timeline: string | undefined, lang: Language): string {
  if (!timeline) return '';

  if (lang === 'zh') {
    let result = timeline;
    result = result
      .replace(/January/gi, '1月')
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
    result = result
      .replace(/January/gi, 'Tháng 1')
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
  category: string;
  status: string;
  timeline: string;
  features: Array<ProjectFeature | LocalizedFeatureItem>;
} {
  const match = PROJECT_TRANSLATIONS[project.slug];
  const loc = match ? match[lang] : undefined;

  return {
    title: loc?.title || project.title,
    summary: loc?.summary || project.summary,
    role: loc?.role || getLocalizedRole(project.role, lang),
    category: loc?.category || project.category,
    status: getLocalizedStatus(project.status, lang),
    timeline: getLocalizedTimeline(project.timeline, lang) || String(project.year),
    features: loc?.features || project.features || [],
  };
}
