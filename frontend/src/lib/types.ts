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
  featured: boolean;
  published: boolean;
  order?: number;
  problem: string;
  approach: string;
  outcome: string;
  gallery?: ScreenshotItem[];
  features?: ProjectFeature[];
  chapters?: ProjectChapter[];
  createdAt: string;
  updatedAt: string;
}

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
    featured: true,
    published: true,
    order: 1,
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
    featured: true,
    published: true,
    order: 2,
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
    featured: true,
    published: true,
    order: 3,
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
    featured: true,
    published: true,
    order: 4,
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
    title: 'NH HUYNH — Developer Portfolio & Content Management System',
    slug: 'nh-huynh-portfolio',
    summary: 'A personal portfolio platform designed to showcase projects, technical skills, education, and engineering experience through interactive case studies and a custom-built content management system.',
    category: 'Full-Stack Web Product & CMS',
    role: 'Full-Stack Developer',
    timeline: 'October 2026 – Present',
    status: 'Ongoing',
    year: 2026,
    technologies: ['Next.js 16', 'TypeScript', 'PostgreSQL (Neon)', 'Tailwind CSS', 'Resend API'],
    themeColor: '#4B5563',
    themeBg: '#F3F4F6',
    coverUrl: '/projects/portfolio-preview.jpg',
    liveUrl: 'https://huynhportfolio.com',
    sourceUrl: '',
    featured: true,
    published: true,
    order: 5,
    problem: 'Standard static developer templates cannot securely manage live project storytelling, message auditing, or profile configuration dynamically.',
    approach: 'Engineered an App Router Next.js application with a dedicated Node.js backend, HttpOnly session authentication, and PostgreSQL Neon serverless database.',
    outcome: 'Delivered an Apple-inspired editorial design system with full CMS administration, contact rate-limiting, and 7-chapter storytelling.',
    gallery: [
      {
        url: '/projects/portfolio-preview.jpg',
        caption: 'Apple-Inspired Editorial Portfolio & 3D Interactive Showcase',
        alt: 'NH Huynh Portfolio Preview',
        description: 'Modern editorial portfolio featuring 7-chapter storytelling, verified credentials, and full-stack matrix.',
      },
      {
        url: '/projects/portfolio-cms.jpg',
        caption: 'Authenticated Headless CMS & Live Engineering Studio',
        alt: 'Portfolio CMS Admin Portal',
        description: 'Secure HttpOnly session authentication for real-time CRUD management across projects, biography, skills, and contact messages.',
      },
    ],
    features: [
      {
        id: 'feat-pf-01',
        title: 'Editorial Design System & Glassmorphism',
        description: 'Sophisticated typography hierarchy, transparent navbar with scroll blur, dark case study accents, and responsive layout craftsmanship.',
        category: 'UI/UX & Design Systems',
        screenshotUrl: '/projects/portfolio-preview.jpg',
        screenshotAlt: 'Portfolio design system preview',
      },
      {
        id: 'feat-pf-02',
        title: '3D Perspective Cinematic Portrait',
        description: 'Interactive sliced perspective portrait with real-time mouse tilt physics, depth lighting, and dual presentation styles.',
        category: '3D & Creative Frontend',
        screenshotUrl: '/projects/portfolio-preview.jpg',
        screenshotAlt: '3D Portrait interactive demo',
      },
      {
        id: 'feat-pf-03',
        title: 'Horizontal Sticky Stacking Project Deck',
        description: 'Apple-style stacked card deck that sticky-scrolls and overlaps as the user browses through projects.',
        category: 'Interactive Engineering',
        screenshotUrl: '/projects/portfolio-preview.jpg',
        screenshotAlt: 'Horizontal sticky cards preview',
      },
      {
        id: 'feat-pf-04',
        title: 'Full CMS Administration Portal',
        description: 'Secure HttpOnly session authentication for real-time CRUD management across projects, biography, skills, and contact messages.',
        category: 'Full-Stack Architecture',
        screenshotUrl: '/projects/portfolio-cms.jpg',
        screenshotAlt: 'CMS Administration console',
      },
      {
        id: 'feat-pf-05',
        title: 'Bilingual Localization (EN / VI)',
        description: 'Instant client-side language switching between English and Vietnamese with persistent preference storage.',
        category: 'Internationalization',
        screenshotUrl: '/projects/portfolio-preview.jpg',
        screenshotAlt: 'Language switcher preview',
      },
    ],
    chapters: [
      {
        id: 'chapter-01',
        number: '01',
        title: 'Introduction & Project Overview',
        content: 'NH HUYNH Developer Portfolio is a full-featured digital product combining an Apple-inspired editorial public showcase with an authenticated content management system for projects, storytelling, profile, education, certificates, and inbox management.',
        screenshots: [
          {
            url: '/projects/portfolio-preview.jpg',
            caption: 'Full-Stack Developer Architectural Showcase',
            alt: 'Portfolio Overview',
            description: 'Modern editorial portfolio featuring 7-chapter storytelling, verified credentials, and full-stack matrix.',
          },
        ],
      },
      {
        id: 'chapter-02',
        number: '02',
        title: 'The Idea & Philosophy',
        content: 'Built to demonstrate real-world software engineering: clean separation of concerns, defense-in-depth security, strict TypeScript typings, and zero reliance on mock data.',
      },
      {
        id: 'chapter-03',
        number: '03',
        title: 'The Challenge & Security Posture',
        content: 'Protecting admin operations without exposing credentials, preventing CSRF and SQL injection, enforcing rate limits, and ensuring resilient rendering even when external services are pending configuration.',
      },
      {
        id: 'chapter-04',
        number: '04',
        title: 'The Experience & CMS Administration Studio',
        content: 'Features a bespoke 7-chapter storytelling case study layout, interactive filterable project index, responsive navigation across 320px–1920px displays, and a streamlined admin suite.',
        screenshots: [
          {
            url: '/projects/portfolio-cms.jpg',
            caption: 'Mission Control CMS Administration Studio',
            alt: 'CMS Admin Studio',
            description: 'Authenticated administration dashboard for managing projects, 7-chapter storytelling, contact inbox, and site SEO.',
          },
        ],
      },
      {
        id: 'chapter-05',
        number: '05',
        title: 'Engineering Architecture',
        content: 'Next.js App Router with server-side API proxying, PostgreSQL Neon connection pooling with pg.Pool, scrypt password hashing, and durable Resend email dispatch.',
      },
      {
        id: 'chapter-06',
        number: '06',
        title: 'My Contribution',
        content: 'Solo architect and engineer: visual design system, frontend component architecture, backend API and database schemas, authentication, security controls, and documentation.',
      },
      {
        id: 'chapter-07',
        number: '07',
        title: 'Outcome & Ongoing Development',
        content: 'An extensible, production-ready portfolio establishing a strong professional foundation for Full-Stack Developer opportunities.',
      },
    ],
    createdAt: '2026-10-15T00:00:00.000Z',
    updatedAt: '2026-10-15T00:00:00.000Z',
  },
];
