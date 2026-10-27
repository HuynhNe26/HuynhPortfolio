export interface EducationItem {
  institution: string;
  major: string;
  degree: string;
  period: string;
  gpa: string;
  note?: string;
}

export interface CertificateItem {
  name: string;
  issuer: string;
  score: string;
  issueDate: string;
  verificationUrl?: string;
  imageUrl?: string;
  pdfUrl?: string;
}

export interface CategorizedSkills {
  frontend: string[];
  backend: string[];
  databases: string[];
  apis: string[];
  tools: string[];
}

export interface Profile {
  name: string;
  title: string;
  headline: string;
  introduction: string;
  biography: string;
  dateOfBirth: string;
  hometown: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  skills: string[];
  skillsCategorized: CategorizedSkills;
  education: EducationItem[];
  certificates: CertificateItem[];
  avatarUrl?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export interface ScreenshotItem {
  url: string;
  caption: string;
  description?: string;
  alt: string;
}

export interface ProjectChapter {
  id: string;
  number: string;
  title: string;
  content: string;
  screenshots?: ScreenshotItem[];
  technicalNotes?: string[];
}

export interface ProjectFeature {
  id: string;
  title: string;
  description: string;
  category?: string;
  screenshotUrl?: string;
  screenshotAlt?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  role: string;
  teamSize?: number;
  timeline: string;
  status: 'Completed' | 'Ongoing';
  year: number;
  technologies: string[];
  themeColor: string;
  themeBg: string;
  coverUrl: string;
  liveUrl: string;
  sourceUrl: string;
  reportUrl?: string;
  featured: boolean;
  published: boolean;
  order?: number;
  problem: string;
  approach: string;
  outcome: string;
  gallery?: ScreenshotItem[];
  features?: ProjectFeature[];
  chapters?: ProjectChapter[];
  storytellingStyle?: StorytellingModeId | 'agentic-radar' | 'luxury-editorial' | 'edtech-terminal' | 'growth-pipeline' | 'apple-keynote' | string;
  createdAt: string;
  updatedAt: string;
}

export type StorytellingModeId =
  | 'sticky-split'
  | 'cinematic-scroll'
  | 'timeline-based'
  | '3d-exploded'
  | 'bento-grid'
  | 'horizontal-scroll'
  | 'interactive-hotspot'
  | 'before-after'
  | 'data-flow'
  | 'device-morphing';

export interface StorytellingModeDefinition {
  id: StorytellingModeId;
  index: number;
  icon: string;
  titleVi: string;
  titleEn: string;
  descriptionVi: string;
  descriptionEn: string;
  bestForVi: string;
  bestForEn: string;
  badgeTag: string;
}

export const STORYTELLING_MODES_CATALOG: StorytellingModeDefinition[] = [
  {
    id: 'sticky-split',
    index: 1,
    icon: '📱',
    titleVi: 'Sticky Split-Screen Storytelling',
    titleEn: 'Sticky Split-Screen Storytelling',
    descriptionVi: 'Màn hình chia hai phần: một bên kể câu chuyện, bên còn lại giữ cố định hình ảnh sản phẩm. Khi cuộn qua từng chức năng, hình ảnh tự thay đổi.',
    descriptionEn: 'Split-screen layout: narrative card on one side, sticky product device stage on the other. Scrolling smoothly updates visual context.',
    bestForVi: 'Giới thiệu chức năng của từng dự án',
    bestForEn: 'Introducing detailed features of individual projects',
    badgeTag: 'SPLIT-SCREEN DUAL STAGE',
  },
  {
    id: 'cinematic-scroll',
    index: 2,
    icon: '🎬',
    titleVi: 'Cinematic Scrollytelling',
    titleEn: 'Cinematic Scrollytelling',
    descriptionVi: 'Kể chuyện bằng hiệu ứng điện ảnh, chuyển cảnh, zoom, chiều sâu 3D và animation điều khiển theo thanh cuộn.',
    descriptionEn: 'Storytelling through cinematic camera transitions, smooth Ken Burns zoom, 3D atmospheric depth and scroll-bound animations.',
    bestForVi: 'Mở đầu dự án, giới thiệu tầm nhìn và sản phẩm cuối',
    bestForEn: 'Project inception, brand vision & finalized hero experience',
    badgeTag: 'CINEMATIC SCOPE // 3D DEPTH',
  },
  {
    id: 'timeline-based',
    index: 3,
    icon: '⏳',
    titleVi: 'Timeline-Based Storytelling',
    titleEn: 'Timeline-Based Storytelling',
    descriptionVi: 'Kể chuyện theo mốc thời gian, từ nghiên cứu, thiết kế cơ sở dữ liệu, phát triển backend/frontend đến kiểm thử, triển khai.',
    descriptionEn: 'Chronological milestone journey: from research and schema design through backend/frontend sprints to QA and cloud deployment.',
    bestForVi: 'Thể hiện quá trình phát triển và vai trò của developer',
    bestForEn: 'Demonstrating engineering lifecycle and developer ownership',
    badgeTag: 'DEV TIMELINE // SDLC SPRINTS',
  },
  {
    id: '3d-exploded',
    index: 4,
    icon: '🧊',
    titleVi: '3D Exploded-View Storytelling',
    titleEn: '3D Exploded-View Storytelling',
    descriptionVi: 'Các thành phần hệ thống được tách thành nhiều lớp 3D, ví dụ Frontend → API → Backend → Database, sau đó kết nối lại.',
    descriptionEn: 'Multi-layered 3D isometric separation: peeling apart Frontend UI, Gateway APIs, Backend Services, and Database layers.',
    bestForVi: 'Giải thích kiến trúc hệ thống, microservices và AI',
    bestForEn: 'Explaining distributed architecture, microservices and AI pipelines',
    badgeTag: '3D ISOMETRIC // SYSTEM STACK',
  },
  {
    id: 'bento-grid',
    index: 5,
    icon: '🍱',
    titleVi: 'Bento Grid Storytelling',
    titleEn: 'Bento Grid Storytelling',
    descriptionVi: 'Chia các tính năng thành những ô có kích thước khác nhau, kết hợp ảnh, mô tả, chỉ số và video demo.',
    descriptionEn: 'Modular bento partitions combining high-density metrics, interactive video demos, and capability highlights.',
    bestForVi: 'Tóm tắt nhiều tính năng sau phần kể chuyện chính',
    bestForEn: 'Synthesizing feature highlights following the primary narrative',
    badgeTag: 'BENTO MATRIX // MODULAR HIGHLIGHTS',
  },
  {
    id: 'horizontal-scroll',
    index: 6,
    icon: '↔️',
    titleVi: 'Horizontal Scroll Storytelling',
    titleEn: 'Horizontal Scroll Storytelling',
    descriptionVi: 'Khi cuộn xuống, các màn hình giao diện lần lượt trượt ngang như đang lật những chương trong một cuốn sách.',
    descriptionEn: 'Horizontal card conveyor where vertical scrolling translates to lateral canvas transitions across UI suites.',
    bestForVi: 'Trình diễn các màn hình Login, Dashboard, Admin, Analytics',
    bestForEn: 'Showcasing Login, Dashboard, Admin, and Analytics suites',
    badgeTag: 'LATERAL CAROUSEL // CHAPTER FLIP',
  },
  {
    id: 'interactive-hotspot',
    index: 7,
    icon: '🎯',
    titleVi: 'Interactive Hotspot Storytelling',
    titleEn: 'Interactive Hotspot Storytelling',
    descriptionVi: 'Đánh dấu các vị trí ngay trên ảnh giao diện. Khi người xem nhấn hoặc di chuột, một bảng nhỏ xuất hiện giải thích chức năng và cách hoạt động.',
    descriptionEn: 'Live coordinate hotspot pins placed directly on screenshot UI with contextual interactive callouts.',
    bestForVi: 'Giúp nhà tuyển dụng hiểu chi tiết các chức năng',
    bestForEn: 'Guiding recruiters and tech leads through precision feature locations',
    badgeTag: 'RADAR HOTSPOTS // UI CALLOUTS',
  },
  {
    id: 'before-after',
    index: 8,
    icon: '⚖️',
    titleVi: 'Before–After Transformation',
    titleEn: 'Before–After Transformation',
    descriptionVi: 'So sánh tình trạng ban đầu và giải pháp sau khi phát triển, qua hai hình ảnh hoặc thanh trượt đối chiếu.',
    descriptionEn: 'Side-by-side interactive curtain comparison revealing baseline latency/friction versus engineered solution.',
    bestForVi: 'Giải thích vấn đề và giá trị mà dự án mang lại',
    bestForEn: 'Proving problem resolution and measurable business impact',
    badgeTag: 'DUAL CURTAIN // TRANSFORMATION LIFT',
  },
  {
    id: 'data-flow',
    index: 9,
    icon: '⚡',
    titleVi: 'Data-Flow Storytelling',
    titleEn: 'Data-Flow Storytelling',
    descriptionVi: 'Những đường kết nối chuyển động giúp minh họa dữ liệu đi từ người dùng đến API, hệ thống AI, cơ sở dữ liệu và quay về giao diện.',
    descriptionEn: 'Animated circuit conduits tracing telemetry and packet lifecycles from client triggers to AI inference and DB writes.',
    bestForVi: 'Chứng minh kiến thức backend, AI, security và system design',
    bestForEn: 'Proving backend mastery, AI orchestration and system resilience',
    badgeTag: 'LIVE TELEMETRY // DATA PIPELINE',
  },
  {
    id: 'device-morphing',
    index: 10,
    icon: '💻',
    titleVi: 'Device-Morphing Storytelling',
    titleEn: 'Device-Morphing Storytelling',
    descriptionVi: 'Hình ảnh giao diện chuyển từ desktop sang tablet, rồi smartphone trong lúc cuộn để thể hiện responsive design.',
    descriptionEn: 'Dynamic viewport morphing from 4K desktop monitor to tablet slate to smartphone viewport on scroll.',
    bestForVi: 'Trình diễn giao diện thích ứng trên nhiều thiết bị',
    bestForEn: 'Proving seamless adaptive UI/UX and multi-formfactor ergonomics',
    badgeTag: 'DEVICE MORPHING // MULTI-SCREEN',
  },
];

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  delivery: 'pending' | 'sent' | 'failed';
  createdAt: string;
}

export const defaultProfile: Profile = {
  name: 'Nguyễn Hoàng Huynh',
  title: 'Full-Stack Web Developer',
  headline: 'Full-Stack Web Developer — Crafting Thoughtful Digital Products',
  introduction: 'I am a passionate Information Technology student and Full-Stack Web Developer who enjoys transforming creative ideas into functional, scalable, and user-friendly digital products.',
  biography: 'Currently in my third year of Information Technology at Vietnam Aviation Academy (GPA 3.1/4.0), I continuously explore modern web technologies, backend engineering, database design, authentication, API integrations, and practical software architecture. Through academic projects, collaborative development, and real-world website implementations, I aim to strengthen my engineering skills and build meaningful digital experiences.',
  dateOfBirth: 'August 26, 2005',
  hometown: 'Đồng Nai City, Vietnam',
  email: 'nguyenhoanghuynh.vn@gmail.com',
  phone: '+84 937 569 205',
  location: 'Đồng Nai & Ho Chi Minh City, Vietnam',
  availability: 'Available for Full-Stack Developer Intern, Fresher & Junior roles',
  skills: [
    'React.js',
    'Next.js',
    'TypeScript',
    'Node.js',
    'MongoDB',
    'PostgreSQL (Neon)',
    'Tailwind CSS',
    'LangChain.js',
    'Gemini API',
    'Resend API',
  ],
  skillsCategorized: {
    frontend: ['React.js', 'Next.js', 'Vite', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5 / CSS3'],
    backend: ['Node.js', 'Express.js', 'REST APIs', 'WebSocket', 'Authentication (JWT / Session)'],
    databases: ['MongoDB Atlas', 'PostgreSQL (Neon)', 'Redis'],
    apis: ['Resend API', 'Cloudinary', 'MoMo API', 'Gemini API', 'LangChain.js', 'Make Automation'],
    tools: ['Git', 'GitHub', 'Vercel', 'Docker', 'Postman'],
  },
  education: [
    {
      institution: 'Vietnam Aviation Academy (Học viện Hàng không Việt Nam)',
      major: 'Information Technology',
      degree: 'Bachelor of Science in Information Technology',
      period: '2023 – Present',
      gpa: '3.1 / 4.0',
      note: 'Third-year university student (as of October 2026)',
    },
  ],
  certificates: [
    {
      name: 'TOEIC Listening & Reading',
      issuer: 'ETS',
      score: '550',
      issueDate: 'October 2025',
      verificationUrl: '/certificates/toeic-550.pdf',
      imageUrl: '/certificates/toeic-550-thumb.jpg',
      pdfUrl: '/certificates/toeic-550.pdf',
    },
  ],
  avatarUrl: '/avatar.jpg',
  githubUrl: 'https://github.com/HuynhNe26',
  linkedinUrl: '',
};

export const defaultProjects: Project[] = [
  {
    _id: 'default-01',
    title: 'Ticket Concert Support System Based on Agentic RAG',
    slug: 'ticket-concert-agentic-rag',
    summary: 'An intelligent concert ticketing and real-time customer support platform leveraging Agentic RAG for contextual inquiry resolution and seamless payment workflows.',
    category: 'AI & Full-Stack Application',
    role: 'Full-Stack Developer',
    teamSize: 3,
    timeline: 'August 2025 – April 2026',
    status: 'Completed',
    year: 2026,
    technologies: [
      'React.js',
      'Node.js',
      'MoMo API',
      'JWT',
      'Cloudinary',
      'Gemini API',
      'LangChain.js',
      'PostgreSQL (Neon)',
      'WebSocket',
      'Resend API',
    ],
    themeColor: '#7C3AED',
    themeBg: '#F5F3FF',
    coverUrl: '/projects/ticket-concert-hero.png',
    liveUrl: 'https://www.ticketconcert.online',
    sourceUrl: '',
    reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    featured: true,
    published: true,
    order: 1,
    storytellingStyle: 'data-flow', // 9. Data-Flow Storytelling
    problem: 'Concert attendees frequently face delays obtaining event information, seating confirmation, and payment resolution during high-traffic ticket sales.',
    approach: 'Engineered an agentic retrieval-augmented generation (RAG) system with LangChain.js and Gemini API integrated with Node.js and real-time WebSocket communication.',
    outcome: 'Delivered an automated support workflow handling multi-turn ticketing inquiries with MoMo API payment verification and reliable transactional email notifications.',
    gallery: [
      {
        url: '/projects/ticket-concert-hero.png',
        caption: 'Live Concert Discovery & Event Schedule Portal',
        alt: 'Ticket Concert Discovery Interface',
        description: 'High-throughput event listing with live status badges, interactive schedules, and venue information.',
      },
      {
        url: '/projects/ticket-concert-booking.png',
        caption: 'Interactive Seating Map & Ticket Checkout Flow',
        alt: 'Seat selection and ticket checkout workflow',
        description: 'Real-time seat mapping, pricing tier calculations, and MoMo API checkout modal.',
      },
      {
        url: '/projects/ticket-concert-full.png',
        caption: 'Comprehensive System Architecture & Live Support Ecosystem',
        alt: 'Full-page system architecture and live support integration',
        description: 'End-to-end user journey supported by real-time WebSocket messaging and Gemini Agentic RAG assistant.',
      },
      {
        url: '/projects/ticket-concert-home.png',
        caption: 'Mobile-Optimized Event Booking Portal',
        alt: 'Mobile responsive concert booking view',
        description: 'Responsive mobile interface optimized for fast event search, booking, and ticket retrieval.',
      },
    ],
    features: [
      {
        id: 'feat-tc-01',
        title: 'Agentic RAG Intelligent Assistant',
        description: 'Context-aware AI assistant built with LangChain.js and Google Gemini API, retrieving live concert schedules and answering multi-turn attendee inquiries in real time.',
        category: 'AI & Intelligence',
        screenshotUrl: '/projects/ticket-concert-full.png',
        screenshotAlt: 'Ticket Concert AI Support Assistant Interface',
      },
      {
        id: 'feat-tc-02',
        title: 'Interactive Seating Matrix & Hold Engine',
        description: 'Dynamic venue seat map with category pricing tiers, live availability locks, and WebSocket anti-collision state synchronization.',
        category: 'Real-Time Systems',
        screenshotUrl: '/projects/ticket-concert-booking.png',
        screenshotAlt: 'Interactive seating map and real-time seat lock flow',
      },
      {
        id: 'feat-tc-03',
        title: 'MoMo Payment Gateway Integration',
        description: 'Automated QR checkout flow integrated with MoMo API, featuring HMAC SHA-256 signature verification and atomic order state transitions.',
        category: 'Payment & Security',
        screenshotUrl: '/projects/ticket-concert-booking.png',
        screenshotAlt: 'MoMo payment checkout modal',
      },
      {
        id: 'feat-tc-04',
        title: 'Concert Discovery Portal & Event Timetable',
        description: 'High-throughput event browsing interface with artist information, venue logistics, category filters, and live ticket status.',
        category: 'User Experience',
        screenshotUrl: '/projects/ticket-concert-hero.png',
        screenshotAlt: 'Concert discovery portal and event listing',
      },
      {
        id: 'feat-tc-05',
        title: 'Automated Ticket Dispatch via Resend API',
        description: 'Instant transactional e-ticket generation dispatched via email with secure QR verification codes and calendar integration.',
        category: 'Automation',
        screenshotUrl: '/projects/ticket-concert-home.png',
        screenshotAlt: 'Email e-ticket dispatch preview',
      },
    ],
    chapters: [
      {
        id: 'chapter-01',
        number: '01',
        title: 'Introduction & Project Overview',
        content: 'Ticket Concert Support System is a collaborative full-stack web application developed by a team of three. It combines high-throughput event ticket booking with an intelligent support agent capable of resolving complex user queries about seat availability, venues, and booking policies.',
        technicalNotes: [
          'Full-stack architecture with React.js frontend and Node.js backend',
          'Agentic RAG workflow powered by LangChain.js and Google Gemini API',
          'Real-time bi-directional messaging with WebSockets',
        ],
        screenshots: [
          {
            url: '/projects/ticket-concert-hero.png',
            caption: 'Live Concert Discovery & Event Schedule Portal',
            alt: 'Ticket Concert Discovery Interface',
            description: 'High-throughput event listing with live status badges, interactive schedules, and venue information.',
          },
        ],
      },
      {
        id: 'chapter-02',
        number: '02',
        title: 'The Idea & Motivation',
        content: 'Traditional event ticketing systems suffer from bottlenecks during peak sales: support queues explode, and users abandon carts when unsure about seat selections. We envisioned an intelligent virtual assistant that not only answers questions but actively assists with order status and seat discovery.',
      },
      {
        id: 'chapter-03',
        number: '03',
        title: 'The Challenge & Technical Constraints',
        content: 'Handling simultaneous ticket queries without hallucinations required grounding the AI model strictly in up-to-date concert schedules, seat categories, and refund policies. Furthermore, payment webhooks needed strict reconciliation with order states.',
      },
      {
        id: 'chapter-04',
        number: '04',
        title: 'The User Experience & Booking Flow',
        content: 'Users can browse live concert listings, inspect dynamic venue maps, interact with the AI assistant through a persistent conversational drawer, and complete checkout with MoMo payment gateways.',
        screenshots: [
          {
            url: '/projects/ticket-concert-booking.png',
            caption: 'Interactive Seating Map & Ticket Checkout Flow',
            alt: 'Seat selection and ticket checkout workflow',
            description: 'Real-time seat mapping, pricing tier calculations, and MoMo API checkout modal.',
          },
        ],
      },
      {
        id: 'chapter-05',
        number: '05',
        title: 'Engineering & Integration',
        content: 'Built using PostgreSQL (Neon) for ACID-compliant transaction records, JWT authentication for secure account sessions, Cloudinary for high-res banner delivery, and Resend API for ticket confirmation dispatch.',
        technicalNotes: [
          'Neon Serverless PostgreSQL connection pooling',
          'MoMo payment webhook HMAC signature validation',
          'Resend API transactional templates',
        ],
        screenshots: [
          {
            url: '/projects/ticket-concert-full.png',
            caption: 'Comprehensive System Architecture & Live Support Ecosystem',
            alt: 'Full-page system architecture and live support integration',
            description: 'End-to-end user journey supported by real-time WebSocket messaging and Gemini Agentic RAG assistant.',
          },
        ],
      },
      {
        id: 'chapter-06',
        number: '06',
        title: 'My Contribution',
        content: 'As Full-Stack Developer on the 3-member team, I contributed to API architecture, database schema design in PostgreSQL, WebSocket event handlers for live chat, and payment gateway integration with MoMo.',
      },
      {
        id: 'chapter-07',
        number: '07',
        title: 'Outcome & Reflection',
        content: 'Successfully deployed at ticketconcert.online, demonstrating how AI agents and modern backend engineering create responsive, consumer-ready ticketing platforms.',
      },
    ],
    createdAt: '2026-04-01T00:00:00.000Z',
    updatedAt: '2026-04-01T00:00:00.000Z',
  },
  {
    _id: 'default-02',
    title: 'Fashion Nail Morley Landing Page',
    slug: 'fashion-nail-morley',
    summary: 'A fast, responsive salon booking and showcase landing page designed for an Australian beauty salon with integrated customer inquiries.',
    category: 'Client Web Solution',
    role: 'Full-Stack Developer',
    timeline: 'September 2026 – October 2026',
    status: 'Completed',
    year: 2026,
    technologies: ['React', 'Vite', 'JavaScript', 'Node.js', 'Resend API', 'PostgreSQL (Neon)'],
    themeColor: '#D9777F',
    themeBg: '#FFF1F2',
    coverUrl: '/projects/fashion-nail-hero.jpg',
    liveUrl: 'https://fashionnailmorley.com.au',
    sourceUrl: '',
    reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    featured: true,
    published: true,
    order: 2,
    storytellingStyle: 'cinematic-scroll', // 2. Cinematic Scrollytelling
    problem: 'The salon needed an elegant, mobile-first web presence for Western Australian customers to view service menus, gallery work, and request appointments.',
    approach: 'Built a lightweight, high-performance React application powered by Vite, integrated with a Node.js backend and Resend API for immediate booking inquiry notifications.',
    outcome: 'Achieved sub-second page loads, accessible mobile navigation, and streamlined booking conversion without friction.',
    gallery: [
      {
        url: '/projects/fashion-nail-hero.jpg',
        caption: 'Luxury Salon Visual Identity & Digital Front Door',
        alt: 'Fashion Nail Morley Storefront',
        description: 'Western Australia beauty salon storefront with Champagne Rose aesthetics and mobile-first appointment booking.',
      },
      {
        url: '/projects/fashion-nail-services.jpg',
        caption: 'Interactive Treatment Menus & Instant Booking Workflow',
        alt: 'Service Pricing & Booking Form',
        description: 'Streamlined service categorization with one-tap inquiry dispatch to salon team via Resend API.',
      },
    ],
    features: [
      {
        id: 'feat-fn-01',
        title: 'Interactive Treatment & Pricing Menu',
        description: 'Mobile-first categorized pricing for acrylic extensions, shellac manicures, nail art, and deluxe spa pedicures with transparent AUD pricing.',
        category: 'Commerce & UX',
        screenshotUrl: '/projects/fashion-nail-services.jpg',
        screenshotAlt: 'Treatment pricing menu and service cards',
      },
      {
        id: 'feat-fn-02',
        title: 'High-Resolution Visual Lookbook',
        description: 'Curated studio nail design showcase with Champagne Rose aesthetics, seasonal collections, and retina-optimized photography.',
        category: 'Branding & UI',
        screenshotUrl: '/projects/fashion-nail-hero.jpg',
        screenshotAlt: 'Fashion Nail Morley storefront visual identity',
      },
      {
        id: 'feat-fn-03',
        title: 'Instant Appointment Inquiry Workflow',
        description: 'Streamlined booking modal capturing service, preferred technician, date, and customer contact with instant email dispatch to salon staff via Resend API.',
        category: 'Automation & Backend',
        screenshotUrl: '/projects/fashion-nail-services.jpg',
        screenshotAlt: 'Appointment inquiry modal',
      },
      {
        id: 'feat-fn-04',
        title: 'Localized SEO & Google Maps Embed',
        description: 'Embedded interactive location guide for Morley, Western Australia clients with one-tap directions, trading hours, and click-to-call integration.',
        category: 'Local Optimization',
        screenshotUrl: '/projects/fashion-nail-hero.jpg',
        screenshotAlt: 'Location map and contact section',
      },
    ],
    chapters: [
      {
        id: 'chapter-01',
        number: '01',
        title: 'Introduction & Project Overview',
        content: 'Fashion Nail Morley is a bespoke commercial web application created for a nail and beauty salon located in Morley, Western Australia. The focus was on luxurious visual branding, clear service pricing, and effortless appointment scheduling.',
        screenshots: [
          {
            url: '/projects/fashion-nail-hero.jpg',
            caption: 'Luxury Salon Visual Identity & Digital Front Door',
            alt: 'Fashion Nail Morley Storefront',
            description: 'Western Australia beauty salon storefront with Champagne Rose aesthetics and mobile-first appointment booking.',
          },
        ],
      },
      {
        id: 'chapter-02',
        number: '02',
        title: 'The Idea & Brand Direction',
        content: 'Reflecting the salon’s warm, premium atmosphere with a Champagne Rose color aesthetic, high-quality typography, and clear navigation designed for mobile phone users on the go.',
      },
      {
        id: 'chapter-03',
        number: '03',
        title: 'The Challenge',
        content: 'The majority of salon customers browse on mobile devices through Instagram and Google Maps links. The interface had to load instantly, require minimal bandwidth, and guide users directly to booking without confusion.',
      },
      {
        id: 'chapter-04',
        number: '04',
        title: 'The Experience & Booking Features',
        content: 'Features include interactive price cards, curated gallery grids with categorized nail art styles, Google Maps location integration, and a one-tap appointment request form.',
        screenshots: [
          {
            url: '/projects/fashion-nail-hero.jpg',
            caption: 'Interactive Treatment Menus & Instant Booking Workflow',
            alt: 'Service Pricing & Booking Form',
            description: 'Streamlined service categorization with one-tap inquiry dispatch to salon team via Resend API.',
          },
        ],
      },
      {
        id: 'chapter-05',
        number: '05',
        title: 'Engineering & Delivery',
        content: 'Engineered with React and Vite for zero-bundle bloat, backed by a Node.js inquiry handler with PostgreSQL persistence on Neon and instant notification routing via Resend API.',
      },
      {
        id: 'chapter-06',
        number: '06',
        title: 'My Contribution',
        content: 'End-to-end full-stack implementation: user interface design, responsive layout engineering, backend booking API, email notification integration, and custom domain deployment.',
      },
      {
        id: 'chapter-07',
        number: '07',
        title: 'Outcome & Reflection',
        content: 'Live and active at fashionnailmorley.com.au, significantly improving customer inquiry rates and establishing a credible online brand presence.',
      },
    ],
    createdAt: '2026-10-01T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z',
  },
  {
    _id: 'default-03',
    title: 'ExamPlatform AI — AI-Powered Online Examination Platform',
    slug: 'examplatform-ai',
    summary: 'An adaptive learning and automated examination platform featuring real-time question generation, secure evaluation, and student performance tracking.',
    category: 'EdTech & AI System',
    role: 'Full-Stack Developer',
    timeline: 'April 2026 – Present',
    status: 'Ongoing',
    year: 2026,
    technologies: ['React', 'Vite', 'JavaScript', 'Node.js', 'PostgreSQL (Neon)', 'Resend API', 'Cloudinary', 'Redis'],
    themeColor: '#1D4ED8',
    themeBg: '#EFF6FF',
    coverUrl: '/projects/exam-platform-hero.png',
    liveUrl: 'https://exam-platform.online',
    sourceUrl: '',
    reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    featured: true,
    published: true,
    order: 3,
    storytellingStyle: 'interactive-hotspot', // 7. Interactive Hotspot Storytelling
    problem: 'Traditional online examination systems lack personalization and struggle with high concurrency during simultaneous exam submissions.',
    approach: 'Architected a decoupled React and Node.js platform utilizing Redis caching for session tokens and question banks, with PostgreSQL for ACID compliance.',
    outcome: 'Currently active in ongoing development, providing reliable test sessions and automated scoring algorithms.',
    gallery: [
      {
        url: '/projects/exam-platform-hero.png',
        caption: 'Distraction-Free Exam Engine & Real-Time Autosave',
        alt: 'ExamPlatform Assessment Room',
        description: 'Fullscreen assessment room with live question countdown timers, question palette navigation, and sub-second auto-syncing of student selections to Redis cache.',
      },
      {
        url: '/projects/exam-platform-overview.png',
        caption: 'AI Evaluation Rubrics & Conceptual Performance Analytics',
        alt: 'ExamPlatform AI Evaluation',
        description: 'Automated post-exam rubric breakdown providing conceptual mastery scores, step-by-step reasoning explanations, and targeted revision roadmaps.',
      },
    ],
    features: [
      {
        id: 'feat-ep-01',
        title: 'Distraction-Free Exam Engine & Autosave',
        description: 'Fullscreen assessment room with live question countdown timers, question palette navigation, and sub-second auto-syncing of student selections to Redis cache.',
        category: 'Core Assessment',
        screenshotUrl: '/projects/exam-platform-hero.png',
        screenshotAlt: 'ExamPlatform AI Student Examination Room',
      },
      {
        id: 'feat-ep-02',
        title: 'AI Evaluation Rubrics & Performance Analytics',
        description: 'Automated post-exam rubric breakdown providing conceptual mastery scores, step-by-step reasoning explanations, and targeted revision roadmaps.',
        category: 'AI & Learning Analytics',
        screenshotUrl: '/projects/exam-platform-overview.png',
        screenshotAlt: 'AI Evaluation and performance dashboard',
      },
      {
        id: 'feat-ep-03',
        title: 'Adaptive Difficulty Progression Engine',
        description: 'Dynamic question sequencing that recalibrates subsequent question difficulty in real time according to previous answer accuracy.',
        category: 'Adaptive Learning',
        screenshotUrl: '/projects/exam-platform-hero.png',
        screenshotAlt: 'Adaptive difficulty question view',
      },
      {
        id: 'feat-ep-04',
        title: 'Anti-Cheat Session Security & Tab Monitoring',
        description: 'Cryptographic session tokens, tab blur telemetry detection, and duplicate submission locks to preserve strict academic assessment integrity.',
        category: 'Security & Integrity',
        screenshotUrl: '/projects/exam-platform-overview.png',
        screenshotAlt: 'Session verification and integrity metrics',
      },
    ],
    chapters: [
      {
        id: 'chapter-01',
        number: '01',
        title: 'Introduction & Project Overview',
        content: 'ExamPlatform AI is an advanced educational technology application designed to streamline student assessments, provide AI-assisted evaluation feedback, and maintain secure test sessions.',
        screenshots: [
          {
            url: '/projects/exam-platform-hero.png',
            caption: 'Examination Room & Student Assessment Portal',
            alt: 'ExamPlatform AI Assessment Room',
            description: 'Distraction-free student examination room with live question countdown timers, question palettes, and autosave.',
          },
        ],
      },
      {
        id: 'chapter-02',
        number: '02',
        title: 'The Idea & Core Philosophy',
        content: 'Moving beyond static multiple-choice questionnaires, ExamPlatform AI incorporates adaptive difficulty scaling and comprehensive post-exam conceptual analysis for learners.',
      },
      {
        id: 'chapter-03',
        number: '03',
        title: 'The Challenge & Security Constraints',
        content: 'Preventing duplicate submissions, handling transient network drops during ongoing exams, and guaranteeing strict timing constraints on student answer records.',
      },
      {
        id: 'chapter-04',
        number: '04',
        title: 'The Experience & Student Features',
        content: 'A clean, distraction-free examination room with countdown timers, question navigation palettes, instant autosaving of responses, and real-time score summaries.',
        screenshots: [
          {
            url: '/projects/exam-platform-overview.png',
            caption: 'AI Evaluation Rubrics & Conceptual Performance Analytics',
            alt: 'Evaluation and Analytics Dashboard',
            description: 'Comprehensive question breakdown, difficulty adaptivity, and automated score metrics.',
          },
        ],
      },
      {
        id: 'chapter-05',
        number: '05',
        title: 'Engineering & Cache Architecture',
        content: 'Combines Redis for fast in-memory session synchronization, PostgreSQL (Neon) for durable question banks and student scores, Cloudinary for diagram media, and Resend for score reporting.',
      },
      {
        id: 'chapter-06',
        number: '06',
        title: 'My Contribution',
        content: 'Full-Stack Developer responsible for examination session state management, Redis cache integration, backend REST endpoints, and responsive student dashboard UI.',
      },
      {
        id: 'chapter-07',
        number: '07',
        title: 'Current Status & Future Work',
        content: 'Active ongoing engineering phase at exam-platform.online, with planned enhancements in AI code evaluation and automated rubrics.',
      },
    ],
    createdAt: '2026-04-15T00:00:00.000Z',
    updatedAt: '2026-10-15T00:00:00.000Z',
  },
  {
    _id: 'default-04',
    title: 'VK Digital Hub — Digital Marketing Landing Page',
    slug: 'vk-digital-hub',
    summary: 'A high-converting digital marketing agency landing page with automated lead capture workflows powered by Make API.',
    category: 'Marketing Platform',
    role: 'Full-Stack Developer',
    timeline: 'September 2026 – October 2026',
    status: 'Completed',
    year: 2026,
    technologies: ['React', 'Node.js', 'Make API / Make Automation'],
    themeColor: '#059669',
    themeBg: '#ECFDF5',
    coverUrl: '/projects/vk-digital-hero.png',
    liveUrl: 'https://vkdigitalhub.netlify.app',
    sourceUrl: '',
    reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    featured: true,
    published: true,
    order: 4,
    storytellingStyle: 'device-morphing', // 10. Device-Morphing Storytelling
    problem: 'Agency needed a modern showcase for digital growth services with automated routing of prospective client inquiries directly to CRM and team inboxes.',
    approach: 'Developed a component-driven React interface with webhook integration to Make.com scenarios for zero-latency lead routing and email acknowledgment.',
    outcome: 'Seamlessly deployed on Netlify with automated email workflows handling marketing consultations.',
    gallery: [
      {
        url: '/projects/vk-digital-hero.png',
        caption: 'Digital Growth Agency Front Door & Client Showcase',
        alt: 'VK Digital Hub Agency Landing',
        description: 'High-conversion marketing landing page presenting core service offerings, client ROI metrics, and social proof.',
      },
      {
        url: '/projects/vk-digital-services.png',
        caption: 'Interactive Service Matrix & Make.com Lead Ingestion',
        alt: 'VK Digital Hub Services & Automation',
        description: 'Zero-latency webhook ingestion dispatching prospective customer data instantly into CRM, Slack channels, and spreadsheet trackers.',
      },
    ],
    features: [
      {
        id: 'feat-vk-01',
        title: 'High-Conversion Digital Marketing Front Door',
        description: 'Conversion-optimized agency landing page presenting core service offerings, client ROI metrics, and social proof.',
        category: 'Growth & Branding',
        screenshotUrl: '/projects/vk-digital-hero.png',
        screenshotAlt: 'VK Digital Hub agency landing page preview',
      },
      {
        id: 'feat-vk-02',
        title: 'Interactive Growth Service Matrix',
        description: 'Transparent tier breakdown covering SEO optimization, PPC campaigns, content production, and brand architecture.',
        category: 'Service Architecture',
        screenshotUrl: '/projects/vk-digital-services.png',
        screenshotAlt: 'Service matrices and interactive comparison table',
      },
      {
        id: 'feat-vk-03',
        title: 'Make.com Webhook Lead Automation Engine',
        description: 'Zero-latency webhook ingestion dispatching prospective customer data instantly into CRM, Slack channels, and spreadsheet trackers.',
        category: 'No-Code & Backend Automation',
        screenshotUrl: '/projects/vk-digital-services.png',
        screenshotAlt: 'Lead automation workflow',
      },
      {
        id: 'feat-vk-04',
        title: 'Automated Prospect Follow-Up Sequences',
        description: 'Immediate branded acknowledgment emails sent to prospects with consultation scheduling links and service overviews.',
        category: 'Lifecycle Email',
        screenshotUrl: '/projects/vk-digital-hero.png',
        screenshotAlt: 'Email acknowledgment preview',
      },
    ],
    chapters: [
      {
        id: 'chapter-01',
        number: '01',
        title: 'Introduction & Project Overview',
        content: 'VK Digital Hub serves as the digital front door for a modern growth agency, presenting service tiers, case studies, and automated consultation scheduling.',
        screenshots: [
          {
            url: '/projects/vk-digital-hero.png',
            caption: 'Digital Growth Agency Front Door & Client Showcase',
            alt: 'VK Digital Hub Agency Landing',
            description: 'High-conversion marketing landing page with interactive case studies and clear service tiers.',
          },
        ],
      },
      {
        id: 'chapter-02',
        number: '02',
        title: 'The Idea & Marketing Strategy',
        content: 'Focusing on clean, high-conversion visual design with Emerald Green accents, structured service comparisons, and fast response times to prospective client inquiries.',
      },
      {
        id: 'chapter-03',
        number: '03',
        title: 'The Challenge',
        content: 'The client needed zero-maintenance backend automation that would immediately synchronize inbound website leads into their existing productivity apps.',
      },
      {
        id: 'chapter-04',
        number: '04',
        title: 'The Experience & Consultation Workflow',
        content: 'Interactive consultation request forms, dynamic client testimonial sliders, clear service matrices, and rapid responsive page navigation.',
        screenshots: [
          {
            url: '/projects/vk-digital-services.png',
            caption: 'Growth Service Matrices & Make.com Lead Automation',
            alt: 'Service Matrices & Lead Capture',
            description: 'Automated consultation workflows streaming prospect data directly into CRM and team inboxes.',
          },
        ],
      },
      {
        id: 'chapter-05',
        number: '05',
        title: 'Engineering & Automation',
        content: 'Built using React and Node.js with secure webhook endpoints connected to Make (Integromat) scenarios that parse, validate, and broadcast leads.',
      },
      {
        id: 'chapter-06',
        number: '06',
        title: 'My Contribution',
        content: 'Developed the front-end layout, form validation with client feedback states, and configured webhook integrations for lead automation.',
      },
      {
        id: 'chapter-07',
        number: '07',
        title: 'Outcome & Reflection',
        content: 'Deployed at vkdigitalhub.netlify.app with 100% operational reliability and instant response dispatch for all marketing inquiries.',
      },
    ],
    createdAt: '2026-09-15T00:00:00.000Z',
    updatedAt: '2026-10-01T00:00:00.000Z',
  },
  {
    _id: 'default-05',
    title: 'NH HUYNH — Developer Portfolio & Interactive Scrollytelling Platform',
    slug: 'nh-huynh-portfolio',
    summary: 'Nền tảng portfolio kỹ thuật Full-Stack của Nguyễn Hoàng Huynh, kết hợp ngôn ngữ thiết kế Light Theme cao cấp, hiệu ứng thẻ 3D Tilt tương tác, động cơ Scrollytelling chia đôi màn hình và hệ quản trị nội dung CMS bảo mật.',
    category: 'Full-Stack Web Product & CMS',
    role: 'Full-Stack Developer & UI/UX Architect',
    timeline: 'Tháng 10/2026 – Hiện tại',
    status: 'Ongoing',
    year: 2026,
    technologies: [
      'Next.js 16',
      'TypeScript',
      'Node.js',
      'PostgreSQL (Neon)',
      'Tailwind CSS',
      'LangChain.js',
      'Gemini API',
      'Resend API',
    ],
    themeColor: '#2563EB',
    themeBg: '#EFF6FF',
    coverUrl: '/projects/portfolio-hero.png',
    liveUrl: '',
    sourceUrl: 'https://github.com/HuynhNe26/HuynhPortfolio',
    reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    featured: true,
    published: true,
    order: 5,
    storytellingStyle: 'horizontal-scroll', // 6. Horizontal Scroll Storytelling
    problem: 'Các website portfolio truyền thống thường nhàm chán, hiển thị danh sách tĩnh và không thể hiện được chiều sâu kỹ thuật, khả năng xử lý tương tác thời gian thực cũng như câu chuyện đằng sau mỗi sản phẩm công nghệ.',
    approach: 'Kiến trúc nền tảng với Next.js 16 App Router & Node.js backend. Ứng dụng ngôn ngữ thiết kế Light Theme tối giản sang trọng với thẻ 3D tilt kèm hào quang theo chuột, chuyển đổi ngôn ngữ 1 chạm EN/VI, động cơ Scrollytelling chia đôi màn hình đồng bộ hình ảnh và radar hotspot trực quan, cùng bộ giả lập tương tác thực tế.',
    outcome: 'Một nền tảng cá nhân chuẩn mực, tải trang nhanh dưới 1 giây, mang lại trải nghiệm xem dự án sống động như một câu chuyện thực thụ, tích hợp hệ thống CMS quản trị backend bảo mật.',
    gallery: [
      {
        url: '/projects/portfolio-hero.png',
        caption: 'Giao diện Trang chủ & Hero Section Chân dung 3D Light Theme',
        alt: 'Nguyễn Hoàng Huynh Portfolio Hero View',
        description: 'Giao diện Light Theme tinh tế, hiệu ứng ánh sáng phát quang tên, chân dung 3D lát cắt và các chỉ số học vấn GPA 3.1/4.0.',
      },
      {
        url: '/projects/portfolio-projects.png',
        caption: 'Bộ sưu tập Dự án Nổi bật với Hiệu ứng 3D Tilt & Hào quang Động',
        alt: 'Featured Projects Showcase',
        description: 'Các thẻ dự án nghiêng 3D theo con trỏ chuột, vầng hào quang backlight tương tác, huy hiệu vai trò và mốc thời gian chi tiết.',
      },
      {
        url: '/projects/portfolio-scrollytelling.png',
        caption: 'Hệ thống Scrollytelling Tương tác Chia đôi Màn hình',
        alt: 'Interactive Scrollytelling Engine',
        description: 'Sân khấu trực quan ghim cố định, radar hotspot định vị thành phần UI, con trỏ thao tác mô phỏng và bộ simulator thử nghiệm trực tiếp.',
      },
      {
        url: '/projects/portfolio-themes.png',
        caption: 'Mỗi Dự án Sở hữu Animation & Storytelling Riêng biệt',
        alt: 'Bespoke Domain-Specific Storytelling Themes',
        description: 'Giao diện độc bản theo từng dự án: Ticket Concert sóng âm Cyber, Fashion Nail sang trọng, ExamPlatform radar AI proctoring.',
      },
      {
        url: '/projects/portfolio-bento.png',
        caption: 'Hệ thống Kỹ năng & Khối Bento Grid Tương tác',
        alt: 'Interactive Skills Matrix & Bento Grid Layout',
        description: 'Tổ chức ma trận kỹ năng phân loại theo danh mục (Frontend, Backend, Database, Cloud APIs), khối Học vấn VAA và chứng chỉ TOEIC 550.',
      },
      {
        url: '/projects/portfolio-admin.png',
        caption: 'Cổng Quản trị Nội dung CMS Bảo mật Phiên HttpOnly',
        alt: 'Portfolio CMS Admin Portal',
        description: 'Trang xác thực quản trị viên, quản lý toàn diện dự án, nội dung các chương câu chuyện, danh mục kỹ năng và tin nhắn liên hệ.',
      },
      {
        url: '/projects/portfolio-about.png',
        caption: 'Trang Hồ sơ Kỹ thuật Về tôi (/about) & Giá trị Kỹ thuật',
        alt: 'About Profile & Technical Credentials',
        description: 'Trang Về tôi độc lập với thông tin học vấn VAA GPA 3.1, chứng chỉ TOEIC 550, hệ sinh thái công nghệ và 4 nguyên tắc kỹ thuật cốt lõi.',
      },
    ],
    features: [
      {
        id: 'feat-pf-01',
        title: 'Light Theme Hiện đại & Hiệu ứng Ánh sáng Phát quang',
        description: 'Hệ thống màu sáng nhất quán (#F8FAFC, #FFFFFF, #0F172A), hiệu ứng ánh sáng gradient động chuyển màu tinh tế trên tên Nguyễn Hoàng Huynh.',
        category: 'UI/UX & Design Systems',
        screenshotUrl: '/projects/portfolio-hero.png',
        screenshotAlt: 'Giao diện Light Theme và hiệu ứng phát quang',
      },
      {
        id: 'feat-pf-02',
        title: 'Thẻ Dự án 3D Tilt & Vầng Hào quang Ambient Backlight',
        description: 'Các thẻ dự án nghiêng theo chuột tự nhiên, vầng hào quang backlight phía sau trôi theo tọa độ con trỏ, hiển thị vai trò và thời gian làm dự án.',
        category: '3D & Creative Frontend',
        screenshotUrl: '/projects/portfolio-projects.png',
        screenshotAlt: 'Thẻ dự án 3D Tilt và vầng hào quang',
      },
      {
        id: 'feat-pf-03',
        title: 'Động cơ Scrollytelling Chia đôi Màn hình & Radar Hotspot',
        description: 'Khi cuộn nội dung, sân khấu trực quan bên phải được ghim cố định và tự động chuyển ảnh giải thích chính xác thành phần UI kèm radar phát sáng và con trỏ chuột mô phỏng.',
        category: 'Interactive Engineering',
        screenshotUrl: '/projects/portfolio-scrollytelling.png',
        screenshotAlt: 'Scrollytelling chia đôi màn hình',
      },
      {
        id: 'feat-pf-04',
        title: 'Bộ Giả lập Hành động Thực tế (Live Action Simulators)',
        description: 'Tích hợp các bảng thử nghiệm trực tiếp cho người xem (chọn ghế WebSocket, hỏi AI RAG, quét MoMo QR, tính ROI marketing, autosave phòng thi).',
        category: 'Interactive Simulators',
        screenshotUrl: '/projects/portfolio-scrollytelling.png',
        screenshotAlt: 'Bộ giả lập tương tác thực tế',
      },
      {
        id: 'feat-pf-05',
        title: 'Chuyển đổi Ngôn ngữ Tức thì 1 Chạm (Bilingual EN/VI)',
        description: 'Công tắc trượt chuyển ngữ mượt mà chỉ sau 1 lần bấm, hỗ trợ lưu trữ trạng thái vào LocalStorage và dịch toàn diện nội dung.',
        category: 'Internationalization',
        screenshotUrl: '/projects/portfolio-hero.png',
        screenshotAlt: 'Nút chuyển đổi ngôn ngữ 1 chạm',
      },
      {
        id: 'feat-pf-06',
        title: 'Hệ Thống Quản trị Nội dung CMS Bảo mật HttpOnly',
        description: 'Quản trị viên quản lý danh sách dự án, cập nhật câu chuyện từng chương, chỉnh sửa hồ sơ kỹ năng và tiếp nhận tin nhắn từ form liên hệ.',
        category: 'Full-Stack Architecture',
        screenshotUrl: '/projects/portfolio-admin.png',
        screenshotAlt: 'Cổng CMS quản trị viên',
      },
    ],
    chapters: [
      {
        id: 'chapter-01',
        number: '01',
        title: 'Tổng quan & Triết lý Thiết kế Light Theme Hiện đại',
        content: 'Portfolio cá nhân được thiết kế như một sản phẩm số hoàn chỉnh, tôn vinh các dự án kỹ thuật thực tế với ngôn ngữ thiết kế Light Theme tinh tế, typography hiện đại và bố cục phân tầng sắc sảo.',
        technicalNotes: [
          'Kiến trúc Next.js 16 App Router với SSR tối ưu SEO và Core Web Vitals',
          'Hệ màu Light Theme #F8FAFC, #FFFFFF, viền #E2E8F0 và chữ Slate #0F172A',
          'Hiệu ứng hào quang phát sáng tinh tế trên tiêu đề tên cá nhân',
        ],
        screenshots: [
          {
            url: '/projects/portfolio-hero.png',
            caption: 'Giao diện Trang chủ & Hero Section Chân dung 3D',
            alt: 'Portfolio Hero Overview',
            description: 'Bố cục Hero ấn tượng với hiệu ứng ánh sáng phát quang tên, chân dung lát cắt 3D và các chỉ số học vấn.',
          },
        ],
      },
      {
        id: 'chapter-02',
        number: '02',
        title: 'Thẻ Dự án 3D Tilt & Vầng Hào quang Ambient Tương tác',
        content: 'Thay vì các thẻ dự án phẳng thông thường, các card dự án nổi bật sở hữu cơ chế tính toán góc nghiêng 3D theo con trỏ chuột, kết hợp vầng hào quang backlight phát sáng theo hướng di chuyển của chuột.',
        screenshots: [
          {
            url: '/projects/portfolio-projects.png',
            caption: 'Bộ sưu tập Dự án Nổi bật với Hiệu ứng 3D Tilt & Hào quang Động',
            alt: 'Featured Projects Showcase',
            description: 'Các thẻ dự án nghiêng 3D theo con trỏ chuột, vầng hào quang backlight tương tác, huy hiệu vai trò và mốc thời gian chi tiết.',
          },
        ],
      },
      {
        id: 'chapter-03',
        number: '03',
        title: 'Thách thức Kỹ thuật: Trải nghiệm Scrollytelling Thực thụ',
        content: 'Làm thế nào để người xem khi cuộn đến đâu thì hình ảnh thực tế sẽ giải thích ngay cho những gì đang nói, đồng thời cho người xem biết vị trí thành phần và hành động tương tác diễn ra ra sao mà không làm gián đoạn dòng đọc?',
      },
      {
        id: 'chapter-04',
        number: '04',
        title: 'Sân khấu Trực quan Ghim Cố định & Radar Hotspot Định vị',
        content: 'Giải pháp là phân tách bố cục 2 cột: cột trái là dòng chảy câu chuyện, cột phải là thiết bị mockup được ghim cố định (sticky). Điểm radar phát sóng chỉ rõ thành phần UI kèm con trỏ chuột mô phỏng hành động.',
        screenshots: [
          {
            url: '/projects/portfolio-scrollytelling.png',
            caption: 'Hệ thống Scrollytelling Tương tác Chia đôi Màn hình',
            alt: 'Interactive Scrollytelling Engine',
            description: 'Sân khấu trực quan ghim cố định, radar hotspot định vị thành phần UI, con trỏ thao tác mô phỏng và bộ simulator thử nghiệm trực tiếp.',
          },
        ],
      },
      {
        id: 'chapter-05',
        number: '05',
        title: 'Bộ Giả lập Hành động Thực tế (Live Action Simulator)',
        content: 'Ngay dưới thiết bị, người xem có thể trực tiếp click thử nghiệm: chọn ghế WebSocket với đồng hồ đếm ngược, gửi câu hỏi cho AI RAG, quét mã MoMo, tính ROI marketing hay nộp bài thi lưu vào Redis cache.',
      },
      {
        id: 'chapter-06',
        number: '06',
        title: 'Đóng góp của Tôi: Kiến trúc Full-Stack & Cổng CMS Quản trị',
        content: 'Một mình đảm nhiệm toàn bộ vòng đời phát triển: thiết kế UI/UX, lập trình component React/Next.js, xây dựng REST API backend Node.js, thiết kế CSDL PostgreSQL Neon và cổng đăng nhập quản trị CMS bảo mật.',
        screenshots: [
          {
            url: '/projects/portfolio-admin.png',
            caption: 'Cổng Quản trị Nội dung CMS Bảo mật Phiên HttpOnly',
            alt: 'Portfolio CMS Admin Portal',
            description: 'Trang xác thực quản trị viên, quản lý toàn diện dự án, nội dung các chương câu chuyện, danh mục kỹ năng và tin nhắn liên hệ.',
          },
        ],
      },
      {
        id: 'chapter-07',
        number: '07',
        title: 'Kết quả Triển khai, Tối ưu Hiệu năng & Tương lai',
        content: 'Website đạt tốc độ tải trang cực nhanh, tối ưu hóa toàn diện cho thiết bị di động, chứng minh năng lực kỹ thuật vững chắc và sẵn sàng cho các cơ hội Full-Stack Developer chuyên nghiệp.',
        screenshots: [
          {
            url: '/projects/portfolio-about.png',
            caption: 'Hồ sơ Năng lực Kỹ thuật & Chứng chỉ Xác thực',
            alt: 'About Profile & Credentials',
            description: 'Thông tin sinh viên năm 3 Học viện Hàng không Việt Nam, chứng chỉ TOEIC 550, cây kỹ năng phân tầng Frontend/Backend/Database/APIs.',
          },
        ],
      },
    ],
    createdAt: '2026-10-15T00:00:00.000Z',
    updatedAt: '2026-10-18T00:00:00.000Z',
  },
  {
    _id: 'default-06',
    title: 'SkyRoute Dispatcher — Real-Time Flight Operations & Cargo Management',
    slug: 'skyroute-aviation-ops',
    summary: 'Nền tảng điều phối bay và kiểm soát tải trọng hàng không thời gian thực với bản đồ bay radar, tính toán trọng tâm máy bay (Center of Gravity) và phân bổ ULD tối ưu.',
    category: 'Aviation IT & Real-Time Logistics',
    role: 'Lead Full-Stack Developer',
    teamSize: 2,
    timeline: 'Tháng 9, 2025 – Hiện tại',
    status: 'Completed',
    year: 2026,
    technologies: [
      'Next.js 15',
      'TypeScript',
      'Node.js',
      'WebSocket',
      'Redis Geo',
      'PostgreSQL (Neon)',
      'Leaflet / Mapbox',
      'Docker',
      'Tailwind CSS',
    ],
    themeColor: '#0284C7',
    themeBg: '#F0F9FF',
    coverUrl: '/projects/skyroute-hero.png',
    liveUrl: 'https://aviaops.online',
    sourceUrl: 'https://github.com/HuynhNe26/skyroute-aviation-ops',
    reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    featured: true,
    published: true,
    order: 6,
    storytellingStyle: '3d-exploded', // 4. 3D Exploded-View Storytelling
    problem: 'Nhân viên điều phái bay và loadmaster thường phải thao tác thủ công trên nhiều phần mềm rời rạc để tính toán trọng tâm máy bay (CG) và giám sát tải trọng bay, dễ gây chậm trễ lịch trình và sai lệch tải trọng khí động học.',
    approach: 'Kiến trúc nền tảng thời gian thực với Next.js 15 và Node.js WebSocket hai chiều. Xây dựng động cơ tính toán Weight & Balance tự động cho tàu bay Boeing 777F, lưu trữ tọa độ radar bay với Redis Geo và CSDL PostgreSQL Neon Serverless.',
    outcome: 'Triệt tiêu hoàn toàn sai sót tính toán trọng tâm máy bay, đồng bộ hóa tọa độ radar bay toàn cầu dưới 100ms và tự động xuất điện văn tải trọng chuẩn IATA.',
    gallery: [
      {
        url: '/projects/skyroute-hero.png',
        caption: 'Bản đồ Radar Giám sát Chuyến bay Toàn cầu & Bảng Đo lường Trọng tâm C.G',
        alt: 'SkyRoute Dispatch Operations Dashboard',
        description: 'Bản đồ radar bay trực tiếp, biểu đồ phong bì trọng tâm C.G Boeing 777F, danh sách chuyến bay đang hoạt động và bảng chỉ số telemetry.',
      },
      {
        url: '/projects/skyroute-cargo.png',
        caption: 'Sơ đồ Mặt cắt Hầm hàng Boeing 777F & Ma trận Phân bổ Container ULD',
        alt: 'SkyRoute LoadMaster Cargo Bay Schematic',
        description: 'Sơ đồ phân bổ pallet boong chính và hầm dưới, khóa vị trí tải trọng, bảng tính nhiên liệu bay và biểu đồ giới hạn an toàn C.G.',
      },
    ],
    features: [
      {
        id: 'feat-sr-01',
        title: 'Bản đồ Radar Bay Toàn cầu & Stream Telemetry Thời gian thực',
        description: 'Theo dõi vị trí tàu bay trên bản đồ thế giới với độ cao, tốc độ mặt đất và hướng bay đồng bộ qua Redis Geo và WebSocket.',
        category: 'Real-Time Telemetry',
        screenshotUrl: '/projects/skyroute-hero.png',
        screenshotAlt: 'Global flight radar telemetry view',
      },
      {
        id: 'feat-sr-02',
        title: 'Động cơ Tính toán Trọng tâm & Cân bằng Khí động học Tự động',
        description: 'Tự động tính trọng lượng không nhiên liệu (ZFW), trọng lượng cất cánh tối đa (MTOW) và vị trí trọng tâm (% MAC) đảm bảo máy bay luôn bay trong vùng an toàn.',
        category: 'Aviation Engineering',
        screenshotUrl: '/projects/skyroute-cargo.png',
        screenshotAlt: 'Weight and balance envelope diagram',
      },
      {
        id: 'feat-sr-03',
        title: 'Phân bổ Vị trí Thùng Hàng ULD & Xuất Điện văn Loadsheet IATA',
        description: 'Hệ thống xếp chỗ pallet hàng hóa boong chính và hầm dưới phân loại hàng nguy hiểm (DG), hàng dễ vỡ với khả năng xuất điện văn IATA điện tử.',
        category: 'Cargo Logistics',
        screenshotUrl: '/projects/skyroute-cargo.png',
        screenshotAlt: 'Boeing 777F cargo bay schematic view',
      },
    ],
    chapters: [
      {
        id: 'chapter-01',
        number: '01',
        title: 'Tổng quan & Trung tâm Điều hành Bay Hàng không Toàn cầu',
        content: 'SkyRoute Dispatcher là nền tảng công nghệ hàng không chuyên sâu được thiết kế để hiện đại hóa quy trình điều phái bay và bốc xếp hàng hóa hàng không. Dự án do sinh viên ngành CNTT tại Học viện Hàng không Việt Nam phát triển, kết hợp giữa nghiệp vụ hàng không thực tế và công nghệ web hiệu năng cao.',
        technicalNotes: ['Kiến trúc Next.js 15 App Router & TypeScript hiệu năng cao', 'Giao diện radar buồng lái tối màu chuẩn hàng không Retina', 'Được tối ưu cho nhân viên điều phái bay và chuyên viên Loadmaster'],
        screenshots: [{ url: '/projects/skyroute-hero.png', caption: 'Bản đồ Radar Bay & Trung tâm Điều phối', alt: 'SkyRoute Hero' }],
      },
      {
        id: 'chapter-02',
        number: '02',
        title: 'Bóc tách Kiến trúc 3D Đa tầng: 4 Lớp Hệ thống Phân tán',
        content: 'Hệ thống áp dụng kiến trúc 3D Exploded 4 tầng lớp rõ rệt: Tầng Trình diễn (Next.js & Bản đồ Radar Leaflet) ➔ Tầng Cổng Thu nhận Telemetry (Node.js & WebSocket stream) ➔ Tầng Động cơ Tính toán Khí động học (Weight & Balance Engine) ➔ Tầng Lưu trữ Tốc độ cao (Redis Geo Cache & Neon PostgreSQL).',
        technicalNotes: ['Bóc tách kiến trúc 3D Exploded-View đa tầng lớp', 'Luồng truyền dữ liệu WebSocket hai chiều kết hợp Redis Geo spatial', 'Cô lập tiến trình tính toán khí động học độc lập'],
        screenshots: [{ url: '/projects/skyroute-hero.png', caption: 'Kiến trúc Thu nhận Dữ liệu Bay Telemetry', alt: 'System Telemetry HUD' }],
      },
      {
        id: 'chapter-03',
        number: '03',
        title: 'Cân bằng Trọng lượng & Trọng tâm Tàu bay (Center of Gravity Envelope)',
        content: 'Tính toán trọng tâm chính xác là yếu tố sống còn cho an toàn bay. Động cơ tự động tính toán vị trí dây cung khí động trung bình (% MAC) khi thay đổi tải trọng hàng hóa, vẽ biểu đồ phong bì giới hạn trọng tâm cất cánh và hạ cánh theo thời gian thực.',
        technicalNotes: ['Đồ thị đa giác phong bì trọng tâm CG Boeing 777F theo thời gian thực', 'Kiểm soát nghiêm ngặt giới hạn tải trọng cất cánh và hạ cánh', 'Cảnh báo tức thì khi trọng tâm tiến sát biên giới hạn an toàn'],
        screenshots: [{ url: '/projects/skyroute-cargo.png', caption: 'Biểu đồ Phong bì Trọng tâm C.G Real-time', alt: 'CG Envelope' }],
      },
      {
        id: 'chapter-04',
        number: '04',
        title: 'Sơ đồ Tương tác Mặt cắt Hầm hàng & Bố trí Vị trí Thùng Hàng ULD',
        content: 'Chuyên viên Loadmaster trực tiếp sắp xếp các thùng hàng Unit Load Devices (ULD) trên 28 vị trí boong chính và hầm dưới. Sơ đồ tự động nhận diện hàng nguy hiểm (DG), hàng dễ vỡ và pallet siêu trọng với màu sắc phân biệt trực quan.',
        technicalNotes: ['Sơ đồ mặt cắt tàu bay Boeing 777F định dạng vector SVG tương tác', 'Tự động tính phân bổ tải trọng giữa boong chính và hầm dưới', 'Cộng dồn trọng lượng pallet và so sánh với giới hạn sàn chịu tải'],
        screenshots: [{ url: '/projects/skyroute-cargo.png', caption: 'Sơ đồ Mặt cắt Hầm hàng 777F', alt: 'Cargo Bay Schematic' }],
      },
      {
        id: 'chapter-05',
        number: '05',
        title: 'Đồng bộ Tọa độ Radar Bay qua WebSocket & Redis Geo',
        content: 'Tín hiệu tọa độ từ các chuyến bay đang bay được nạp qua các lệnh Redis Geo (GEOADD, GEORADIUS) và phát sóng đến tất cả bàn điều phối chỉ trong dưới 80ms, mang lại khả năng nắm bắt tình hình không lưu toàn cầu liên tục.',
        technicalNotes: ['Lưu trữ tọa độ không gian Redis Geo với độ trễ micro-second', 'Cơ chế phát sóng bản tin WebSocket pub/sub đến các bàn điều phái', 'Tự động tái kết nối và đối soát trạng thái không bị mất gói tin'],
      },
      {
        id: 'chapter-06',
        number: '06',
        title: 'Tự động Xuất Điện văn Tải trọng Loadsheet Chuẩn IATA',
        content: 'Sau khi hoàn tất sơ đồ xếp dỡ, hệ thống xuất điện văn loadsheet điện tử theo đúng chuẩn IATA AHMR. Chữ ký số mã hóa bảo đảm không xảy ra bất kỳ sự can thiệp dữ liệu trái phép nào giữa khâu phát hành và buồng lái.',
        technicalNotes: ['Định dạng điện văn loadsheet điện tử chuẩn IATA', 'Xác thực tính toàn vẹn dữ liệu bằng checksum mật mã học', 'Hỗ trợ xuất file PDF tải trọng và gửi điện văn ACARS lên buồng lái'],
      },
      {
        id: 'chapter-07',
        number: '07',
        title: 'Đóng gói Triển khai Container Docker & Đảm bảo Tính Sẵn sàng Cao',
        content: 'Toàn bộ hệ thống được đóng gói container hóa với Docker, thiết lập cơ chế giám sát trạng thái sức khỏe tự động, đảm bảo thời gian hoạt động liên tục 99.9% cho các quy trình điều hành bay nghiêm ngặt.',
        technicalNotes: ['Quy trình Docker multi-stage build tối ưu kích thước image', 'Pipeline triển khai không gián đoạn dịch vụ (Zero-downtime)', 'Cơ sở dữ liệu PostgreSQL Neon Serverless với cơ chế connection pool tự động'],
      },
    ],
    createdAt: '2026-10-18T00:00:00.000Z',
    updatedAt: '2026-10-19T00:00:00.000Z',
  },
  {
    _id: 'default-07',
    title: 'MediCare AI — Smart Telehealth & Clinical Decision Support System',
    slug: 'medicare-ai-triage',
    summary: 'Hệ thống bệnh án điện tử (EMR) và phân loại triệu chứng bệnh nhân bằng AI, tích hợp phòng khám video WebRTC và kê đơn thuốc số cảnh báo tương tác thuốc.',
    category: 'Healthcare & Clinical AI',
    role: 'Full-Stack Developer',
    teamSize: 3,
    timeline: 'Tháng 11, 2025 – Tháng 5, 2026',
    status: 'Completed',
    year: 2026,
    technologies: [
      'React.js',
      'TypeScript',
      'Express.js',
      'MongoDB Atlas',
      'WebRTC',
      'Gemini AI API',
      'JWT Role Auth',
      'Tailwind CSS',
      'Cloudinary',
    ],
    themeColor: '#0D9488',
    themeBg: '#F0FDFA',
    coverUrl: '/projects/medicare-hero.png',
    liveUrl: 'https://medicare-ai.health',
    sourceUrl: 'https://github.com/HuynhNe26/medicare-ai-triage',
    reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    featured: true,
    published: true,
    order: 7,
    storytellingStyle: 'timeline-based', // 3. Timeline-Based Storytelling
    problem: 'Các phòng khám và bệnh viện thường xuyên quá tải ở khâu tiếp đón ban đầu, bệnh nhân chờ đợi lâu, thiếu phân loại mức độ khẩn cấp tự động và tiềm ẩn nguy cơ kê đơn tương tác thuốc nguy hiểm.',
    approach: 'Xây dựng quy trình khám bệnh khép kín tích hợp AI phân loại triệu chứng bằng Gemini API, phòng khám trực tuyến bảo mật WebRTC, hồ sơ bệnh án điện tử EMR lưu trữ trên MongoDB Atlas và động cơ cảnh báo tương tác thuốc tự động.',
    outcome: 'Rút ngắn 55% thời gian chờ đợi tiếp nhận, ưu tiên xử lý tức thì các ca khẩn cấp, hỗ trợ bác sĩ chẩn đoán phân biệt chính xác và giảm thiểu rủi ro dùng thuốc.',
    gallery: [
      {
        url: '/projects/medicare-hero.png',
        caption: 'Hàng đợi Tiếp nhận Bệnh nhân & Phân loại Triệu chứng Cấp cứu AI',
        alt: 'MediCare EMR Dashboard Interface',
        description: 'Hàng đợi tiếp nhận thời gian thực với nhãn mức độ AI Triage (Emergency, Urgent, Routine), xem trước hồ sơ bệnh án và biểu đồ sinh tồn.',
      },
      {
        url: '/projects/medicare-consult.png',
        caption: 'Trục Thời gian Lâm sàng Khám bệnh & Bộ Kê đơn Thuốc Điện tử',
        alt: 'MediCare Clinical Consultation Console',
        description: 'Bàn làm việc của bác sĩ với trục thời gian lịch sử khám, chẩn đoán phân biệt gợi ý bởi AI, đồ thị chỉ số sinh tồn và bộ tính liều lượng thuốc.',
      },
    ],
    features: [
      {
        id: 'feat-mc-01',
        title: 'Phân loại Triệu chứng & Đánh giá Cấp độ Cấp cứu Tự động với AI',
        description: 'Phân tích triệu chứng bệnh nhân nhập vào bằng Google Gemini AI, tự động gán nhãn mức độ Cấp cứu (Emergency), Khẩn cấp (Urgent) hoặc Định kỳ (Routine).',
        category: 'Clinical AI',
        screenshotUrl: '/projects/medicare-hero.png',
        screenshotAlt: 'AI patient triage queue interface',
      },
      {
        id: 'feat-mc-02',
        title: 'Phòng Khám Telehealth Trực tuyến Mã hóa WebRTC',
        description: 'Kết nối video và âm thanh trực tiếp giữa bác sĩ và bệnh nhân với độ trễ thấp, tích hợp công cụ ghi chú lâm sàng song song trên cùng một màn hình.',
        category: 'Telemedicine',
        screenshotUrl: '/projects/medicare-consult.png',
        screenshotAlt: 'Doctor telehealth consultation view',
      },
      {
        id: 'feat-mc-03',
        title: 'Kê đơn Thuốc Số & Tự động Cảnh báo Tương tác Thuốc Nguy hại',
        description: 'Tự động tính liều lượng theo cân nặng/độ tuổi và đối soát đơn thuốc với cơ sở dữ liệu tương tác thuốc, đưa ra cảnh báo tức thì khi có tương tác bất lợi.',
        category: 'Patient Safety',
        screenshotUrl: '/projects/medicare-consult.png',
        screenshotAlt: 'Digital e-prescription builder with pharmacy routing',
      },
    ],
    chapters: [
      {
        id: 'chapter-01',
        number: '01',
        title: 'Cổng Tiếp nhận Khám Trực tuyến & Hàng đợi Bệnh nhân',
        content: 'MediCare AI là giải pháp khám chữa bệnh từ xa và quản lý bệnh án điện tử (EMR) được xây dựng nhằm chuẩn hóa quy trình chăm sóc sức khỏe ban đầu. Hệ thống kết nối bệnh nhân với đội ngũ y bác sĩ thông qua một cổng dịch vụ duy nhất.',
        technicalNotes: ['Giao diện y tế React.js chuẩn màn hình y khoa với TypeScript', 'Kiến trúc phân quyền nghiêm ngặt với xác thực JWT và mã hóa đường truyền', 'Bảng màu xanh ngọc lam (Teal) và trắng sạch sẽ, thân thiện với bệnh nhân'],
        screenshots: [{ url: '/projects/medicare-hero.png', caption: 'Hàng đợi Tiếp nhận & Xem trước Bệnh án Điện tử', alt: 'MediCare Hero' }],
      },
      {
        id: 'chapter-02',
        number: '02',
        title: 'Trục Thời gian Lâm sàng: Quy trình 4 Giai đoạn từ Tiếp nhận đến Kê đơn',
        content: 'Toàn bộ câu chuyện dự án được thể hiện qua Trục thời gian lâm sàng (Timeline-Based): Giai đoạn 1 (Đăng ký & Đo lường Chỉ số Sinh tồn) ➔ Giai đoạn 2 (AI Phân loại Triệu chứng Khẩn cấp) ➔ Giai đoạn 3 (Bác sĩ Khám Trực tuyến WebRTC) ➔ Giai đoạn 4 (Xuất Đơn thuốc Điện tử & Lịch Tái khám).',
        technicalNotes: ['Kiến trúc kể chuyện Timeline-Based Storytelling', 'Đồng bộ hóa trạng thái mốc thời gian dọc theo từng giai đoạn khám bệnh', 'Ghi nhật ký kiểm toán (Audit Log) theo dõi mọi biến động hồ sơ bệnh án'],
        screenshots: [{ url: '/projects/medicare-consult.png', caption: 'Trục Thời gian Lâm sàng & Ghi chú Bác sĩ', alt: 'Clinical Timeline' }],
      },
      {
        id: 'chapter-03',
        number: '03',
        title: 'Động cơ Phân loại Triệu chứng Cấp cứu Tự động với Gemini Medical AI',
        content: 'Bệnh nhân mô tả triệu chứng bằng ngôn ngữ tự nhiên. Mô hình Gemini AI phân tích lý do khám, tiền sử bệnh án và các chỉ số sinh tồn để xếp lớp cấp cứu: Khẩn cấp đỏ (Emergency), Cần khám sớm (Urgent), hoặc Khám thông thường (Routine), giúp phòng khám xử lý ngay các ca nguy kịch.',
        technicalNotes: ['Prompt engineering chuyên sâu với mô hình Gemini AI y khoa', 'Tự động trích xuất các chỉ số sinh tồn (Nhịp tim 108 bpm, SpO2 95%, Huyết áp 145/92)', 'Tự động xếp lại thứ tự hàng đợi theo mức độ khẩn cấp y tế'],
        screenshots: [{ url: '/projects/medicare-hero.png', caption: 'Hàng đợi Phân loại Cấp cứu AI', alt: 'AI Triage Queue' }],
      },
      {
        id: 'chapter-04',
        number: '04',
        title: 'Phòng Khám Video Trực tuyến Bảo mật Peer-to-Peer WebRTC',
        content: 'Buổi tư vấn diễn ra qua kênh truyền thông video WebRTC ngang hàng được mã hóa hai đầu cuối. Bác sĩ vừa có thể quan sát triệu chứng của bệnh nhân, vừa tra cứu hồ sơ bệnh án và cập nhật ghi chú khám bệnh trong thời gian thực.',
        technicalNotes: ['Kênh truyền thông media ngang hàng WebRTC qua máy chủ STUN/TURN', 'Độ trễ truyền video và âm thanh dưới 200ms', 'Không lưu trữ video trên máy chủ nhằm đảm bảo quyền riêng tư người bệnh'],
      },
      {
        id: 'chapter-05',
        number: '05',
        title: 'Hồ sơ Bệnh án Điện tử (EMR) & Biểu đồ Chỉ số Sinh tồn Theo Thời gian',
        content: 'Bác sĩ có thể theo dõi biểu đồ diễn tiến sinh tồn của bệnh nhân qua các đợt khám: huyết áp tâm thu/tâm trương, nhịp tim, nhiệt độ và nồng độ oxy trong máu SpO2, hỗ trợ chẩn đoán phân biệt chuẩn xác.',
        technicalNotes: ['Đồ thị vector SVG diễn tiến huyết áp và nhịp tim liên tục', 'Cơ sở dữ liệu MongoDB Atlas lưu trữ cấu trúc tài liệu bệnh án linh hoạt', 'Tối ưu hóa truy vấn lịch sử khám qua nhiều lần tái khám'],
        screenshots: [{ url: '/projects/medicare-consult.png', caption: 'Đồ thị Diễn tiến Chỉ số Sinh tồn', alt: 'Vital Signs History' }],
      },
      {
        id: 'chapter-06',
        number: '06',
        title: 'Bộ Kê đơn Thuốc Điện tử & Cảnh báo Tương tác Thuốc Nguy hại',
        content: 'Công cụ kê đơn tự động tính toán liều lượng chuẩn (ví dụ Amoxicillin 500mg, ngày 4 lần) và tự động đối chiếu với danh mục thuốc bệnh nhân đang sử dụng để phát hiện cảnh báo tương tác thuốc chéo, ngăn ngừa sốc thuốc hoặc tương tác bất lợi.',
        technicalNotes: ['Tự động tính toán liều lượng và thời gian điều trị theo thể trọng/tuổi', 'Ma trận đối soát tương tác thuốc (Drug-Drug Interaction matrix)', 'Liên kết trực tiếp với hệ thống nhà thuốc phân phối thuốc điện tử'],
        screenshots: [{ url: '/projects/medicare-consult.png', caption: 'Bộ Kê đơn Thuốc Số & Định tuyến Nhà thuốc', alt: 'e-Prescription Builder' }],
      },
      {
        id: 'chapter-07',
        number: '07',
        title: 'Phân quyền Vai trò (Bác sĩ, Y tá, Bệnh nhân) & Bảo mật Y tế',
        content: 'Hệ thống áp dụng cơ chế phân quyền RBAC nghiêm ngặt: Bác sĩ có quyền chẩn đoán và kê đơn; Y tá phụ trách tiếp nhận và ghi nhận chỉ số sinh tồn ban đầu; Bệnh nhân có cổng riêng theo dõi đơn thuốc và lịch hẹn.',
        technicalNotes: ['Phân quyền người dùng theo vai trò (RBAC) với JWT token an toàn', 'Mã hóa các trường dữ liệu nhạy cảm trong cơ sở dữ liệu', 'Tuân thủ các nguyên tắc bảo vệ quyền riêng tư dữ liệu y tế'],
      },
    ],
    createdAt: '2026-10-18T00:00:00.000Z',
    updatedAt: '2026-10-19T00:00:00.000Z',
  },
  {
    _id: 'default-08',
    title: 'Smart Rental House Management & Local AI OCR — Nhà Trọ Thanh Tâm',
    slug: 'rent-house-smart-management',
    summary:
      'End-to-end rental boarding house management system featuring local AI OCR microservices for automated utility meter reading from actual photos, human-in-the-loop audit verification, automated multi-channel billing (SMS OTP & Resend Email), and SHA-256 tamper-proof electronic contract signing on PostgreSQL Neon.',
    category: 'PropTech & Local AI Microservices',
    role: 'Full-Stack Developer & AI Microservices Architect',
    teamSize: 1,
    timeline: 'August 2025 – October 2026',
    status: 'Completed',
    year: 2026,
    technologies: [
      'React 18',
      'Vite 6',
      'Node.js (Express)',
      'PostgreSQL (Neon)',
      'FastAPI (Python)',
      'OpenCV',
      'Tesseract OCR',
      'Capacitor 8 (Android/iOS)',
      'Resend API',
      'SMS OTP',
      'PDFKit (SHA-256)',
      'Docker',
    ],
    themeColor: '#0284C7',
    themeBg: '#F0F9FF',
    coverUrl: '/projects/rent-house-hero.png',
    liveUrl: 'https://nhatrothanhtam.netlify.app',
    sourceUrl: 'https://github.com/HuynhNe26/rent_house',
    reportUrl: 'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    featured: true,
    published: true,
    order: 8,
    storytellingStyle: 'sticky-split',
    problem:
      'Boarding house landlords face immense friction managing tenant utility records manually using paper notebooks: time-consuming data collection, transcription errors, dispute risks over utility calculations, vulnerable paper lease contracts susceptible to alteration, and tenant friction tracking historical consumption.',
    approach:
      'Architected a closed-loop PropTech solution: FastAPI + OpenCV + Tesseract microservice with Laplacian variance blur detection for zero-cost local OCR meter reading, human-in-the-loop audit verification, tiered automated billing with Snapshot Pricing, multi-channel notifications (SMS OTP & Resend Email), and HTML5 Canvas touchscreen lease signing secured by SHA-256 cryptographic hashes and PostgreSQL immutability triggers.',
    outcome:
      'Saved 85% of monthly billing audit hours, achieved 98.6% OCR recognition accuracy, provided 100% photographic transparency for tenants, eliminated contract forgery risks, and delivered a production-ready cross-platform Android APK.',
    gallery: [
      {
        url: '/projects/rent-house-hero.png',
        caption: 'Public Rental Catalog & Discovery Portal',
        alt: 'Landing Page & Room Catalog for Thanh Tam Rental House',
        description: 'Public-facing property showcase with real-time room availability, transparent pricing, and responsive filtering.',
      },
      {
        url: '/projects/rent-house-admin-dashboard.png',
        caption: 'Central Administrative Dashboard & Financial Analytics',
        alt: 'Admin Analytics and Boarding House Operations',
        description: 'Unified management dashboard aggregating occupancy metrics, revenue forecasting, and utility consumption trends.',
      },
      {
        url: '/projects/rent-house-ai-meters.png',
        caption: 'AI OCR Meter Processing & Human-in-the-Loop Review',
        alt: 'AI OCR Meter Reading & Human-in-the-loop Review',
        description: 'Dual-camera meter capture with Laplacian blur detection, confidence scoring, and one-click manual adjustments.',
      },
      {
        url: '/projects/rent-house-billing.png',
        caption: 'Automated Invoice Generation & Multi-Channel Dispatch',
        alt: 'Admin Bills Management & Multi-channel Dispatch',
        description: 'Snapshot Pricing calculations for rent and utilities with instant dispatch via SMS OTP and Resend Email.',
      },
      {
        url: '/projects/rent-house-contracts.png',
        caption: 'Immutable Electronic Lease Contracts with SHA-256 Hashing',
        alt: 'Admin Electronic Contracts Management',
        description: 'Legally compliant PDF lease agreements sealed with SHA-256 cryptographic digests and database immutability triggers.',
      },
      {
        url: '/projects/rent-house-tenant-portal.png',
        caption: 'High-Contrast Accessible Tenant Dashboard & Meter Inspector',
        alt: 'Tenant Portal High-Contrast Accessible Dashboard',
        description: 'Ergonomic tenant interface with high legibility (≥18px text, 32px amounts), OTP login, and full-resolution meter photo inspector.',
      },
      {
        url: '/projects/rent-house-signing.png',
        caption: 'HTML5 Canvas Touchscreen SignaturePad Interface',
        alt: 'HTML5 Canvas SignaturePad on Touch Devices',
        description: 'Direct finger and stylus electronic signature capturing on mobile viewports.',
      },
      {
        url: '/projects/rent-house-mobile.png',
        caption: 'Cross-Platform Android APK & Liquid Glass Dock Navigation',
        alt: 'Mobile Card UI & Liquid Glass Dock Navigation',
        description: 'Native hybrid packaging via Capacitor 8 with iOS/Android fluid dock navigation.',
      },
      {
        url: '/projects/rent-house-meter-real.jpg',
        caption: 'Actual Electric Meter Photo (GELEX EMIC CV140)',
        alt: 'Actual Electric Meter Photo from Boarding House',
        description: 'Raw on-site meter photography processed and archived by the AI OCR engine for auditing.',
      },
    ],
    features: [
      {
        id: 'feat-rh-01',
        title: 'Local AI OCR & Laplacian Blur Detector',
        description: 'Automated utility meter reading microservice with Laplacian variance image quality detection, confidence score auditing, and human-in-the-loop review.',
        category: 'AI & Computer Vision',
        screenshotUrl: '/projects/rent-house-ai-meters.png',
        screenshotAlt: 'AI OCR Meter Reading & Human-in-the-loop Review',
      },
      {
        id: 'feat-rh-02',
        title: 'Automated Multi-Channel Billing (SMS & Email)',
        description: 'Unified calculation of rent, tiered electricity, water, and services using immutable Snapshot Pricing with instant SMS OTP and Resend API dispatch.',
        category: 'Automated Billing',
        screenshotUrl: '/projects/rent-house-billing.png',
        screenshotAlt: 'Admin Bills Management & Multi-channel Dispatch',
      },
      {
        id: 'feat-rh-03',
        title: 'Immutable Electronic Contracts (SHA-256)',
        description: 'Touchscreen contract signing, PDFKit generation with SHA-256 cryptographic integrity hash, and PostgreSQL database immutability triggers.',
        category: 'Security & Legal Tech',
        screenshotUrl: '/projects/rent-house-contracts.png',
        screenshotAlt: 'Admin Electronic Contracts Management',
      },
      {
        id: 'feat-rh-04',
        title: 'Accessible High-Contrast Tenant Portal',
        description: 'Dedicated portal with high-contrast ergonomic styling (≥18px font, 32px currency), OTP passwordless auth, and full-size meter photo verification.',
        category: 'Accessibility & UI/UX',
        screenshotUrl: '/projects/rent-house-tenant-portal.png',
        screenshotAlt: 'Tenant Portal High-Contrast Accessible Dashboard',
      },
      {
        id: 'feat-rh-05',
        title: 'Cross-Platform Mobile App (Android APK & iOS)',
        description: 'Packaged with Capacitor 8 featuring Apple-inspired Liquid Glass Dock navigation, non-horizontal mobile card layout, and direct APK download.',
        category: 'Mobile Engineering',
        screenshotUrl: '/projects/rent-house-mobile.png',
        screenshotAlt: 'Mobile Card UI & Liquid Glass Dock Navigation',
      },
    ],
    chapters: [
      {
        id: 'chapter-01',
        number: '01',
        title: 'Public Rental Catalog & Discovery Portal (Landing Page)',
        content:
          'The public-facing portal at nhatrothanhtam.netlify.app welcomes prospective tenants with an intuitive catalog of available rooms, transparent pricing matrices, real-time availability filters, and comprehensive amenity listings.',
        technicalNotes: [
          'Schema.org (ApartmentComplex) & OpenGraph SEO metadata',
          'Real-time room availability status and transparent pricing',
          'Mobile-first responsive layout optimized for all device form factors',
        ],
        screenshots: [
          {
            url: '/projects/rent-house-hero.png',
            caption: 'Public Rental Catalog & Room Showcase',
            alt: 'Landing Page & Room Catalog for Thanh Tam Rental House',
          },
        ],
      },
      {
        id: 'chapter-02',
        number: '02',
        title: 'Central Administrative Dashboard & Operations Analytics',
        content:
          'Central operations console for boarding house owners, aggregating occupancy rates, rent revenue, electric/water collections against projections, 3-6 month consumption trend charts, and automated overdue payment flags.',
        technicalNotes: [
          'HTTP-Only Cookie session security with aggressive Rate Limiting',
          'Real-time aggregated financial, revenue, and debt statistics',
          'Interactive Recharts data visualization for monthly utility patterns',
        ],
        screenshots: [
          {
            url: '/projects/rent-house-admin-dashboard.png',
            caption: 'Central Administrative Dashboard & Financial Analytics',
            alt: 'Admin Dashboard for Thanh Tam Rental House',
          },
        ],
      },
      {
        id: 'chapter-03',
        number: '03',
        title: 'AI OCR Meter Reading Engine & Human-in-the-Loop Review',
        content:
          'A proprietary AI OCR microservice pairing Computer Vision algorithms with Tesseract. Automatically assesses image sharpness using Laplacian variance, warning against blurry, glare-heavy, or underexposed photos. Landlords inspect side-by-side original photos against AI-detected figures for one-touch approvals.',
        technicalNotes: [
          'Zero-cost self-hosted Local AI OCR Microservice (FastAPI + OpenCV + Tesseract)',
          'Laplacian variance blur detector for automated photographic quality control',
          'Human-in-the-loop workflow: parallel verification of raw photos and OCR outputs',
        ],
        screenshots: [
          {
            url: '/projects/rent-house-ai-meters.png',
            caption: 'AI OCR Meter Verification Interface & Real Photo Inspection',
            alt: 'AI OCR Meter Reading & Human-in-the-loop Review',
          },
        ],
      },
      {
        id: 'chapter-04',
        number: '04',
        title: 'Automated Tiered Billing & Multi-Channel Dispatch (SMS OTP & Resend)',
        content:
          'Upon meter verification, the billing engine aggregates rent, tiered electricity, water, and service fees. Immutable Snapshot Pricing seals unit tariffs at statement generation time to prevent retroactive accounting shifts. Invoices are dispatched immediately to tenants via SMS OTP and detailed email receipts via Resend API.',
        technicalNotes: [
          'Snapshot Pricing mechanism freezing unit rates at statement creation',
          'Automated surcharge computation, deposit deductions, and prior debt carryover',
          'Resend API transactional email integration with meter photo attachments and SMS triggers',
        ],
        screenshots: [
          {
            url: '/projects/rent-house-billing.png',
            caption: 'Billing Management & Automated Multi-Channel Dispatch',
            alt: 'Admin Bills Management & Multi-channel Dispatch',
          },
        ],
      },
      {
        id: 'chapter-05',
        number: '05',
        title: 'Immutable Electronic Lease Contracts & SHA-256 PostgreSQL Triggers',
        content:
          'Eliminates paper contract loss and unauthorized modifications. Generates standardized PDF lease agreements, computes SHA-256 cryptographic hashes over document bytes, and enforces permanent record immutability via a dedicated PostgreSQL trigger (trg_enforce_contract_immutability) on Neon database.',
        technicalNotes: [
          'Standardized PDF contract generation using PDFKit engine',
          'SHA-256 cryptographic digest verification ensuring document integrity',
          'PostgreSQL database trigger preventing retroactive updates or deletions of signed leases',
        ],
        screenshots: [
          {
            url: '/projects/rent-house-contracts.png',
            caption: 'Immutable Lease Agreements with SHA-256 Cryptographic Seals',
            alt: 'Admin Electronic Contracts Management',
          },
        ],
      },
      {
        id: 'chapter-06',
        number: '06',
        title: 'Accessible Tenant Portal: High-Contrast Ergonomics & Meter Inspector',
        content:
          'Engineered specifically for everyday tenants and older demographics with high ergonomics: large typography (≥18px), prominent bold sums (32px), and generous touch targets (≥52px). Passwordless OTP authentication allows quick access, while the built-in modal inspector lets tenants zoom in on raw meter photos for complete peace of mind.',
        technicalNotes: [
          'Passwordless phone number + SMS OTP authentication',
          'High-contrast accessible user experience designed for all age groups',
          'Interactive modal inspector providing 100% photographic transparency',
        ],
        screenshots: [
          {
            url: '/projects/rent-house-tenant-portal.png',
            caption: 'High-Contrast Tenant Portal & Full-Resolution Meter Photo Inspector',
            alt: 'Tenant Portal High-Contrast Accessible Dashboard',
          },
        ],
      },
      {
        id: 'chapter-07',
        number: '07',
        title: 'Touchscreen SignaturePad & Capacitor 8 Cross-Platform Android APK',
        content:
          'Tenants sign lease documents directly using their fingertips or styluses on a fluid HTML5 Canvas SignaturePad. The client is fully packaged as a native hybrid mobile application using Capacitor 8 for Android and iOS, featuring an Apple-inspired Liquid Glass Dock and standalone APK distribution.',
        technicalNotes: [
          'Direct touchscreen electronic signature capture with HTML5 Canvas SignaturePad',
          'Native mobile packaging via Capacitor 8 (Android Studio / Gradle toolchain)',
          'Standalone Android APK compilation and iOS PWA Standalone compliance',
        ],
        screenshots: [
          {
            url: '/projects/rent-house-mobile.png',
            caption: 'Cross-Platform Mobile Android APK & Liquid Glass Navigation Dock',
            alt: 'Mobile Card UI & Liquid Glass Dock Navigation',
          },
        ],
      },
    ],
    createdAt: '2026-10-25T00:00:00.000Z',
    updatedAt: '2026-10-27T00:00:00.000Z',
  },
];

export interface MediaAsset {
  _id: string;
  url: string;
  filename: string;
  publicId?: string;
  altText: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  createdAt: string | Date;
}

