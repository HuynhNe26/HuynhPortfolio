-- ==============================================================================
-- NH HUYNH Developer Portfolio & CMS — PostgreSQL (Neon) Database Setup
-- Complete Production DDL & Verified Seed Data for Neon Serverless PostgreSQL
--
-- INSTRUCTIONS FOR NEON CONSOLE:
-- 1. Go to https://console.neon.tech
-- 2. Select your Project and navigate to the "SQL Editor" tab.
-- 3. Paste the entire contents of this file and click "Run".
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. Admins Table (Salted scrypt authentication)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admins (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 2. Sessions Table (HttpOnly SameSite cookie authentication)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sessions (
    token_hash VARCHAR(64) PRIMARY KEY,
    admin_id VARCHAR(64) NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- ------------------------------------------------------------------------------
-- 3. Profiles Table (Owner Profile & CV Information)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profiles (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    headline VARCHAR(500),
    introduction TEXT,
    biography TEXT,
    date_of_birth VARCHAR(100),
    hometown VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(100),
    location VARCHAR(255),
    availability VARCHAR(255),
    skills JSONB NOT NULL DEFAULT '[]'::jsonb,
    skills_categorized JSONB NOT NULL DEFAULT '{}'::jsonb,
    education JSONB NOT NULL DEFAULT '[]'::jsonb,
    certificates JSONB NOT NULL DEFAULT '[]'::jsonb,
    avatar_url TEXT,
    resume_url TEXT,
    github_url TEXT,
    linkedin_url TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. Projects Table (Showcase Projects with 7-Chapter Storytelling & Google Docs Report)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    team_size INT,
    timeline VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Completed',
    year INT NOT NULL,
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    theme_color VARCHAR(50),
    theme_bg VARCHAR(50),
    problem TEXT NOT NULL,
    approach TEXT NOT NULL,
    outcome TEXT NOT NULL,
    cover_url TEXT,
    live_url TEXT,
    source_url TEXT,
    report_url TEXT,
    featured BOOLEAN NOT NULL DEFAULT false,
    published BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    storytelling_style VARCHAR(100),
    chapters JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Safe migrations in case table already existed
ALTER TABLE projects ADD COLUMN IF NOT EXISTS storytelling_style VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS report_url TEXT;

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published_featured ON projects(published, featured, display_order, created_at DESC);

-- ------------------------------------------------------------------------------
-- 5. Rate Limits Table (Brute-force & abuse protection)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rate_limits (
    id VARCHAR(128) PRIMARY KEY,
    count INT NOT NULL DEFAULT 1,
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_expires_at ON rate_limits(expires_at);

-- ------------------------------------------------------------------------------
-- 6. Contact Messages Table (Persisted inquiries)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'unread',
    delivery VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);

-- ------------------------------------------------------------------------------
-- 7. Media Assets Table (Cloudinary library metadata)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media_assets (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    filename VARCHAR(255) NOT NULL,
    format VARCHAR(50),
    bytes INT,
    alt TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_media_assets_created_at ON media_assets(created_at DESC);

-- ------------------------------------------------------------------------------
-- 8. Site Settings Table (SEO metadata & configuration)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
    id VARCHAR(64) PRIMARY KEY,
    site_title VARCHAR(255) NOT NULL,
    seo_description TEXT NOT NULL,
    canonical_url TEXT,
    contact_email VARCHAR(255),
    public_visibility BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- PRODUCTION SEED DATA FOR NGUYỄN HOÀNG HUYNH
-- ==============================================================================

-- 1. Insert Profile
INSERT INTO profiles (
    id, name, title, headline, introduction, biography, date_of_birth, hometown,
    email, phone, location, availability, skills, skills_categorized, education,
    certificates, avatar_url, resume_url, github_url, linkedin_url, updated_at
) VALUES (
    'owner',
    'Nguyễn Hoàng Huynh',
    'Full-Stack Web Developer',
    'Full-Stack Web Developer — Crafting Thoughtful Digital Products',
    'I am a passionate Information Technology student and Full-Stack Web Developer who enjoys transforming creative ideas into functional, scalable, and user-friendly digital products.',
    'Currently in my third year of Information Technology at Vietnam Aviation Academy (GPA 3.1/4.0), I continuously explore modern web technologies, backend engineering, database design, authentication, API integrations, and practical software architecture. Through academic projects, collaborative development, and real-world website implementations, I aim to strengthen my engineering skills and build meaningful digital experiences.',
    'August 26, 2005',
    'Đồng Nai City, Vietnam',
    'nguyenhoanghuynh.vn@gmail.com',
    '+84 937 569 205',
    'Đồng Nai & Ho Chi Minh City, Vietnam',
    'Available for Full-Stack Developer Intern, Fresher & Junior roles',
    '["React.js", "Next.js", "TypeScript", "Node.js", "MongoDB", "PostgreSQL (Neon)", "Tailwind CSS", "LangChain.js", "Gemini API", "Resend API"]'::jsonb,
    '{
        "frontend": ["React.js", "Next.js", "Vite", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5 / CSS3"],
        "backend": ["Node.js", "Express.js", "REST APIs", "WebSocket", "Authentication (JWT / Session)"],
        "databases": ["MongoDB Atlas", "PostgreSQL (Neon)", "Redis"],
        "apis": ["Resend API", "Cloudinary", "MoMo API", "Gemini API", "LangChain.js", "Make Automation"],
        "tools": ["Git", "GitHub", "Vercel", "Docker", "Postman"]
    }'::jsonb,
    '[
        {
            "institution": "Vietnam Aviation Academy (Học viện Hàng không Việt Nam)",
            "major": "Information Technology",
            "degree": "Bachelor of Science in Information Technology",
            "period": "2023 – Present",
            "gpa": "3.1 / 4.0",
            "note": "Third-year university student (as of October 2026)"
        }
    ]'::jsonb,
    '[
        {
            "name": "TOEIC Listening & Reading",
            "issuer": "ETS",
            "score": "550",
            "issueDate": "October 2025",
            "verificationUrl": "",
            "imageUrl": "/certificates/toeic-550.jpg"
        }
    ]'::jsonb,
    '/avatar.jpg',
    '',
    'https://github.com/HuynhNe26',
    '',
    NOW()
) ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    title = EXCLUDED.title,
    headline = EXCLUDED.headline,
    introduction = EXCLUDED.introduction,
    biography = EXCLUDED.biography,
    date_of_birth = EXCLUDED.date_of_birth,
    hometown = EXCLUDED.hometown,
    email = EXCLUDED.email,
    phone = EXCLUDED.phone,
    location = EXCLUDED.location,
    availability = EXCLUDED.availability,
    skills = EXCLUDED.skills,
    skills_categorized = EXCLUDED.skills_categorized,
    education = EXCLUDED.education,
    certificates = EXCLUDED.certificates,
    avatar_url = EXCLUDED.avatar_url,
    resume_url = EXCLUDED.resume_url,
    github_url = EXCLUDED.github_url,
    linkedin_url = EXCLUDED.linkedin_url,
    updated_at = NOW();

-- 2. Insert All 7 Production Projects (Full Storytelling & Google Docs Report URLs)
INSERT INTO projects (
    title, slug, summary, category, role, team_size, timeline, status, year,
    technologies, theme_color, theme_bg, problem, approach, outcome, cover_url,
    live_url, source_url, report_url, featured, published, display_order, storytelling_style, chapters, updated_at
) VALUES
(
    'Ticket Concert Support System Based on Agentic RAG',
    'ticket-concert-agentic-rag',
    'An intelligent concert ticketing and real-time customer support platform leveraging Agentic RAG for contextual inquiry resolution and seamless payment workflows.',
    'AI & Full-Stack Application',
    'Full-Stack Developer',
    3,
    'August 2025 – April 2026',
    'Completed',
    2026,
    '["React.js", "Node.js", "MoMo API", "JWT", "Cloudinary", "Gemini API", "LangChain.js", "PostgreSQL (Neon)", "WebSocket", "Resend API"]'::jsonb,
    '#7C3AED',
    '#F5F3FF',
    'Concert attendees frequently face delays obtaining event information, seating confirmation, and payment resolution during high-traffic ticket sales.',
    'Engineered an agentic retrieval-augmented generation (RAG) system with LangChain.js and Gemini API integrated with Node.js and real-time WebSocket communication.',
    'Delivered an automated support workflow handling multi-turn ticketing inquiries with MoMo API payment verification and reliable transactional email notifications.',
    '/projects/ticket-concert-hero.png',
    'https://www.ticketconcert.online',
    '',
    'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    true,
    true,
    1,
    'data-flow',
    '[
        {"id": "chapter-01", "number": "01", "title": "Introduction & Project Overview", "content": "Ticket Concert Support System is a collaborative full-stack web application developed by a team of three. It combines high-throughput event ticket booking with an intelligent support agent capable of resolving complex user queries about seat availability, venues, and booking policies.", "technicalNotes": ["Full-stack architecture with React.js frontend and Node.js backend", "Agentic RAG workflow powered by LangChain.js and Google Gemini API", "Real-time bi-directional messaging with WebSockets"], "screenshots": [{"url": "/projects/ticket-concert-hero.png", "caption": "Live Concert Discovery & Event Schedule Portal", "alt": "Ticket Concert Discovery Interface", "description": "High-throughput event listing with live status badges, interactive schedules, and venue information."}]},
        {"id": "chapter-02", "number": "02", "title": "The Idea & Motivation", "content": "Traditional event ticketing systems suffer from bottlenecks during peak sales: support queues explode, and users abandon carts when unsure about seat selections. We envisioned an intelligent virtual assistant that not only answers questions but actively assists with order status and seat discovery."},
        {"id": "chapter-03", "number": "03", "title": "The Challenge & Technical Constraints", "content": "Handling simultaneous ticket queries without hallucinations required grounding the AI model strictly in up-to-date concert schedules, seat categories, and refund policies. Furthermore, payment webhooks needed strict reconciliation with order states."},
        {"id": "chapter-04", "number": "04", "title": "The User Experience & Booking Flow", "content": "Users can browse live concert listings, inspect dynamic venue maps, interact with the AI assistant through a persistent conversational drawer, and complete checkout with MoMo payment gateways.", "screenshots": [{"url": "/projects/ticket-concert-booking.png", "caption": "Interactive Seating Map & Ticket Checkout Flow", "alt": "Seat selection and ticket checkout workflow", "description": "Real-time seat mapping, pricing tier calculations, and MoMo API checkout modal."}]},
        {"id": "chapter-05", "number": "05", "title": "Engineering & Integration", "content": "Built using PostgreSQL (Neon) for ACID-compliant transaction records, JWT authentication for secure account sessions, Cloudinary for high-res banner delivery, and Resend API for ticket confirmation dispatch.", "technicalNotes": ["Neon Serverless PostgreSQL connection pooling", "MoMo payment webhook HMAC signature validation", "Resend API transactional templates"], "screenshots": [{"url": "/projects/ticket-concert-full.png", "caption": "Comprehensive System Architecture & Live Support Ecosystem", "alt": "Full-page system architecture and live support integration", "description": "End-to-end user journey supported by real-time WebSocket messaging and Gemini Agentic RAG assistant."}]},
        {"id": "chapter-06", "number": "06", "title": "My Contribution", "content": "As Full-Stack Developer on the 3-member team, I contributed to API architecture, database schema design in PostgreSQL, WebSocket event handlers for live chat, and payment gateway integration with MoMo."},
        {"id": "chapter-07", "number": "07", "title": "Outcome & Reflection", "content": "Successfully deployed at ticketconcert.online, demonstrating how AI agents and modern backend engineering create responsive, consumer-ready ticketing platforms."}
    ]'::jsonb,
    NOW()
),
(
    'Fashion Nail Morley Landing Page',
    'fashion-nail-morley',
    'A fast, responsive salon booking and showcase landing page designed for an Australian beauty salon with integrated customer inquiries.',
    'Client Web Solution',
    'Full-Stack Developer',
    1,
    'September 2026 – October 2026',
    'Completed',
    2026,
    '["React", "Vite", "JavaScript", "Node.js", "Resend API", "PostgreSQL (Neon)"]'::jsonb,
    '#D9777F',
    '#FFF1F2',
    'The salon needed an elegant, mobile-first web presence for Western Australian customers to view service menus, gallery work, and request appointments.',
    'Built a lightweight, high-performance React application powered by Vite, integrated with a Node.js backend and Resend API for immediate booking inquiry notifications.',
    'Achieved sub-second page loads, accessible mobile navigation, and streamlined booking conversion without friction.',
    '/projects/fashion-nail-hero.jpg',
    'https://fashionnailmorley.com.au',
    '',
    'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    true,
    true,
    2,
    'sticky-split',
    '[
        {"id": "chapter-01", "number": "01", "title": "Introduction & Project Overview", "content": "Fashion Nail Morley is a bespoke commercial web application created for a nail and beauty salon located in Morley, Western Australia. The focus was on luxurious visual branding, clear service pricing, and effortless appointment scheduling.", "screenshots": [{"url": "/projects/fashion-nail-hero.jpg", "caption": "Luxury Salon Visual Identity & Digital Front Door", "alt": "Fashion Nail Morley Storefront", "description": "Western Australia beauty salon storefront with Champagne Rose aesthetics and mobile-first appointment booking."}]},
        {"id": "chapter-02", "number": "02", "title": "The Idea & Brand Direction", "content": "Reflecting the salon’s warm, premium atmosphere with a Champagne Rose color aesthetic, high-quality typography, and clear navigation designed for mobile phone users on the go."},
        {"id": "chapter-03", "number": "03", "title": "The Challenge", "content": "The majority of salon customers browse on mobile devices through Instagram and Google Maps links. The interface had to load instantly, require minimal bandwidth, and guide users directly to booking without confusion."},
        {"id": "chapter-04", "number": "04", "title": "The Experience & Booking Features", "content": "Features include interactive price cards, curated gallery grids with categorized nail art styles, Google Maps location integration, and a one-tap appointment request form.", "screenshots": [{"url": "/projects/fashion-nail-hero.jpg", "caption": "Interactive Treatment Menus & Instant Booking Workflow", "alt": "Service Pricing & Booking Form", "description": "Streamlined service categorization with one-tap inquiry dispatch to salon team via Resend API."}]},
        {"id": "chapter-05", "number": "05", "title": "Engineering & Delivery", "content": "Engineered with React and Vite for zero-bundle bloat, backed by a Node.js inquiry handler with PostgreSQL persistence on Neon and instant notification routing via Resend API."},
        {"id": "chapter-06", "number": "06", "title": "My Contribution", "content": "End-to-end full-stack implementation: user interface design, responsive layout engineering, backend booking API, email notification integration, and custom domain deployment."},
        {"id": "chapter-07", "number": "07", "title": "Outcome & Reflection", "content": "Live and active at fashionnailmorley.com.au, significantly improving customer inquiry rates and establishing a credible online brand presence."}
    ]'::jsonb,
    NOW()
),
(
    'ExamPlatform AI — AI-Powered Online Examination Platform',
    'examplatform-ai',
    'An adaptive learning and automated examination platform featuring real-time question generation, secure evaluation, and student performance tracking.',
    'EdTech & AI System',
    'Full-Stack Developer',
    1,
    'April 2026 – Present',
    'Ongoing',
    2026,
    '["React", "Vite", "JavaScript", "Node.js", "PostgreSQL (Neon)", "Resend API", "Cloudinary", "Redis"]'::jsonb,
    '#1D4ED8',
    '#EFF6FF',
    'Traditional online examination systems lack personalization and struggle with high concurrency during simultaneous exam submissions.',
    'Architected a decoupled React and Node.js platform utilizing Redis caching for session tokens and question banks, with PostgreSQL for ACID compliance.',
    'Currently active in ongoing development, providing reliable test sessions and automated scoring algorithms.',
    '/projects/exam-platform-hero.png',
    'https://exam-platform.online',
    '',
    'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    true,
    true,
    3,
    'cinematic-scroll',
    '[
        {"id": "chapter-01", "number": "01", "title": "Introduction & Project Overview", "content": "ExamPlatform AI is an advanced educational technology application designed to streamline student assessments, provide AI-assisted evaluation feedback, and maintain secure test sessions.", "screenshots": [{"url": "/projects/exam-platform-hero.png", "caption": "Examination Room & Student Assessment Portal", "alt": "ExamPlatform AI Assessment Room", "description": "Distraction-free student examination room with live question countdown timers, question palettes, and autosave."}]},
        {"id": "chapter-02", "number": "02", "title": "The Idea & Core Philosophy", "content": "Moving beyond static multiple-choice questionnaires, ExamPlatform AI incorporates adaptive difficulty scaling and comprehensive post-exam conceptual analysis for learners."},
        {"id": "chapter-03", "number": "03", "title": "The Challenge & Security Constraints", "content": "Preventing duplicate submissions, handling transient network drops during ongoing exams, and guaranteeing strict timing constraints on student answer records."},
        {"id": "chapter-04", "number": "04", "title": "The Experience & Student Features", "content": "A clean, distraction-free examination room with countdown timers, question navigation palettes, instant autosaving of responses, and real-time score summaries.", "screenshots": [{"url": "/projects/exam-platform-overview.png", "caption": "AI Evaluation Rubrics & Conceptual Performance Analytics", "alt": "Evaluation and Analytics Dashboard", "description": "Comprehensive question breakdown, difficulty adaptivity, and automated score metrics."}]},
        {"id": "chapter-05", "number": "05", "title": "Engineering & Cache Architecture", "content": "Combines Redis for fast in-memory session synchronization, PostgreSQL (Neon) for durable question banks and student scores, Cloudinary for diagram media, and Resend for score reporting."},
        {"id": "chapter-06", "number": "06", "title": "My Contribution", "content": "Full-Stack Developer responsible for examination session state management, Redis cache integration, backend REST endpoints, and responsive student dashboard UI."},
        {"id": "chapter-07", "number": "07", "title": "Current Status & Future Work", "content": "Active ongoing engineering phase at exam-platform.online, with planned enhancements in AI code evaluation and automated rubrics."}
    ]'::jsonb,
    NOW()
),
(
    'VK Digital Hub — Digital Marketing Landing Page',
    'vk-digital-hub',
    'A high-converting digital marketing agency landing page with automated lead capture workflows powered by Make API.',
    'Marketing Platform',
    'Full-Stack Developer',
    1,
    'September 2026 – October 2026',
    'Completed',
    2026,
    '["React", "Node.js", "Make API / Make Automation"]'::jsonb,
    '#059669',
    '#ECFDF5',
    'Agency needed a modern showcase for digital growth services with automated routing of prospective client inquiries directly to CRM and team inboxes.',
    'Developed a component-driven React interface with webhook integration to Make.com scenarios for zero-latency lead routing and email acknowledgment.',
    'Seamlessly deployed on Netlify with automated email workflows handling marketing consultations.',
    '/projects/vk-digital-hero.png',
    'https://vkdigitalhub.netlify.app',
    '',
    'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    false,
    true,
    4,
    'interactive-hotspot',
    '[
        {"id": "chapter-01", "number": "01", "title": "Introduction & Project Overview", "content": "VK Digital Hub serves as the digital front door for a modern growth agency, presenting service tiers, case studies, and automated consultation scheduling.", "screenshots": [{"url": "/projects/vk-digital-hero.png", "caption": "Digital Growth Agency Front Door & Client Showcase", "alt": "VK Digital Hub Agency Landing", "description": "High-conversion marketing landing page with interactive case studies and clear service tiers."}]},
        {"id": "chapter-02", "number": "02", "title": "The Idea & Marketing Strategy", "content": "Focusing on clean, high-conversion visual design with Emerald Green accents, structured service comparisons, and fast response times to prospective client inquiries."},
        {"id": "chapter-03", "number": "03", "title": "The Challenge", "content": "The client needed zero-maintenance backend automation that would immediately synchronize inbound website leads into their existing productivity apps."},
        {"id": "chapter-04", "number": "04", "title": "The Experience & Consultation Workflow", "content": "Interactive consultation request forms, dynamic client testimonial sliders, clear service matrices, and rapid responsive page navigation.", "screenshots": [{"url": "/projects/vk-digital-services.png", "caption": "Growth Service Matrices & Make.com Lead Automation", "alt": "Service Matrices & Lead Capture", "description": "Automated consultation workflows streaming prospect data directly into CRM and team inboxes."}]},
        {"id": "chapter-05", "number": "05", "title": "Engineering & Automation", "content": "Built using React and Node.js with secure webhook endpoints connected to Make (Integromat) scenarios that parse, validate, and broadcast leads."},
        {"id": "chapter-06", "number": "06", "title": "My Contribution", "content": "Developed the front-end layout, form validation with client feedback states, and configured webhook integrations for lead automation."},
        {"id": "chapter-07", "number": "07", "title": "Outcome & Reflection", "content": "Deployed at vkdigitalhub.netlify.app with 100% operational reliability and instant response dispatch for all marketing inquiries."}
    ]'::jsonb,
    NOW()
),
(
    'NH HUYNH — Developer Portfolio & Content Management System',
    'nh-huynh-portfolio',
    'A personal portfolio platform designed to showcase projects, technical skills, education, and engineering experience through interactive case studies and a custom-built content management system.',
    'Full-Stack Web Product & CMS',
    'Full-Stack Developer',
    1,
    'October 2026 – Present',
    'Ongoing',
    2026,
    '["Next.js 16", "TypeScript", "PostgreSQL (Neon)", "Tailwind CSS", "Resend API"]'::jsonb,
    '#4B5563',
    '#F3F4F6',
    'Standard static developer templates cannot securely manage live project storytelling, message auditing, or profile configuration dynamically.',
    'Engineered an App Router Next.js application with a dedicated Node.js backend, HttpOnly session authentication, and PostgreSQL Neon serverless database.',
    'Delivered an Apple-inspired editorial design system with full CMS administration, contact rate-limiting, and 7-chapter storytelling.',
    '/projects/portfolio-preview.jpg',
    'https://huynhportfolio.com',
    '',
    'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    true,
    true,
    5,
    'apple-keynote',
    '[
        {"id": "chapter-01", "number": "01", "title": "Introduction & Project Overview", "content": "NH HUYNH Developer Portfolio is a full-featured digital product combining an Apple-inspired editorial public showcase with an authenticated content management system for projects, storytelling, profile, education, certificates, and inbox management.", "screenshots": [{"url": "/projects/portfolio-preview.jpg", "caption": "Full-Stack Developer Architectural Showcase", "alt": "Portfolio Overview", "description": "Modern editorial portfolio featuring 7-chapter storytelling, verified credentials, and full-stack matrix."}]},
        {"id": "chapter-02", "number": "02", "title": "The Idea & Philosophy", "content": "Built to demonstrate real-world software engineering: clean separation of concerns, defense-in-depth security, strict TypeScript typings, and zero reliance on mock data."},
        {"id": "chapter-03", "number": "03", "title": "The Challenge & Security Posture", "content": "Protecting admin operations without exposing credentials, preventing CSRF and SQL injection, enforcing rate limits, and ensuring resilient rendering even when external services are pending configuration."},
        {"id": "chapter-04", "number": "04", "title": "The Experience & CMS Administration Studio", "content": "Features a bespoke 7-chapter storytelling case study layout, interactive filterable project index, responsive navigation across 320px–1920px displays, and a streamlined admin suite.", "screenshots": [{"url": "/projects/portfolio-cms.jpg", "caption": "Mission Control CMS Administration Studio", "alt": "CMS Admin Studio", "description": "Authenticated administration dashboard for managing projects, 7-chapter storytelling, contact inbox, and site SEO."}]},
        {"id": "chapter-05", "number": "05", "title": "Engineering Architecture", "content": "Next.js App Router with server-side API proxying, PostgreSQL Neon connection pooling with pg.Pool, scrypt password hashing, and durable Resend email dispatch."},
        {"id": "chapter-06", "number": "06", "title": "My Contribution", "content": "Solo architect and engineer: visual design system, frontend component architecture, backend API and database schemas, authentication, security controls, and documentation."},
        {"id": "chapter-07", "number": "07", "title": "Outcome & Ongoing Development", "content": "An extensible, production-ready portfolio establishing a strong professional foundation for Full-Stack Developer opportunities."}
    ]'::jsonb,
    NOW()
),
(
    'SkyRoute Dispatcher — Real-Time Flight Operations & Cargo Management',
    'skyroute-aviation-ops',
    'Nền tảng điều phối bay và kiểm soát tải trọng hàng không thời gian thực với bản đồ bay radar, tính toán trọng tâm máy bay (Center of Gravity) và phân bổ ULD tối ưu.',
    'Aviation IT & Real-Time Logistics',
    'Lead Full-Stack Developer',
    2,
    'September 2025 – Present',
    'Completed',
    2026,
    '["Next.js 15", "TypeScript", "Node.js", "WebSocket", "Redis Geo", "PostgreSQL (Neon)", "Leaflet / Mapbox", "Docker", "Tailwind CSS"]'::jsonb,
    '#0284C7',
    '#F0F9FF',
    'Nhân viên điều phái bay và loadmaster thường phải thao tác thủ công trên nhiều phần mềm rời rạc để tính toán trọng tâm máy bay (CG) và giám sát tải trọng bay, dễ gây chậm trễ lịch trình và sai lệch tải trọng khí động học.',
    'Kiến trúc nền tảng thời gian thực với Next.js 15 và Node.js WebSocket hai chiều. Xây dựng động cơ tính toán Weight & Balance tự động cho tàu bay Boeing 777F, lưu trữ tọa độ radar bay với Redis Geo và CSDL PostgreSQL Neon Serverless.',
    'Triệt tiêu hoàn toàn sai sót tính toán trọng tâm máy bay, đồng bộ hóa tọa độ radar bay toàn cầu dưới 100ms và tự động xuất điện văn tải trọng chuẩn IATA.',
    '/projects/skyroute-hero.png',
    'https://aviaops.online',
    'https://github.com/HuynhNe26/skyroute-aviation-ops',
    'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    true,
    true,
    6,
    '3d-exploded',
    '[
        {"id": "chapter-01", "number": "01", "title": "Tổng quan & Trung tâm Điều hành Bay Hàng không Toàn cầu", "content": "SkyRoute Dispatcher là nền tảng công nghệ hàng không chuyên sâu được thiết kế để hiện đại hóa quy trình điều phái bay và bốc xếp hàng hóa hàng không. Dự án do sinh viên ngành CNTT tại Học viện Hàng không Việt Nam phát triển, kết hợp giữa nghiệp vụ hàng không thực tế và công nghệ web hiệu năng cao.", "technicalNotes": ["Kiến trúc Next.js 15 App Router & TypeScript hiệu năng cao", "Giao diện radar buồng lái tối màu chuẩn hàng không Retina", "Được tối ưu cho nhân viên điều phái bay và chuyên viên Loadmaster"], "screenshots": [{"url": "/projects/skyroute-hero.png", "caption": "Bản đồ Radar Bay & Trung tâm Điều phối", "alt": "SkyRoute Hero"}]},
        {"id": "chapter-02", "number": "02", "title": "Bóc tách Kiến trúc 3D Đa tầng: 4 Lớp Hệ thống Phân tán", "content": "Hệ thống áp dụng kiến trúc 3D Exploded 4 tầng lớp rõ rệt: Tầng Trình diễn (Next.js & Bản đồ Radar Leaflet) ➔ Tầng Cổng Thu nhận Telemetry (Node.js & WebSocket stream) ➔ Tầng Động cơ Tính toán Khí động học (Weight & Balance Engine) ➔ Tầng Lưu trữ Tốc độ cao (Redis Geo Cache & Neon PostgreSQL).", "technicalNotes": ["Bóc tách kiến trúc 3D Exploded-View đa tầng lớp", "Luồng truyền dữ liệu WebSocket hai chiều kết hợp Redis Geo spatial", "Cô lập tiến trình tính toán khí động học độc lập"], "screenshots": [{"url": "/projects/skyroute-hero.png", "caption": "Kiến trúc Thu nhận Dữ liệu Bay Telemetry", "alt": "System Telemetry HUD"}]},
        {"id": "chapter-03", "number": "03", "title": "Cân bằng Trọng lượng & Trọng tâm Tàu bay (Center of Gravity Envelope)", "content": "Tính toán trọng tâm chính xác là yếu tố sống còn cho an toàn bay. Động cơ tự động tính toán vị trí dây cung khí động trung bình (% MAC) khi thay đổi tải trọng hàng hóa, vẽ biểu đồ phong bì giới hạn trọng tâm cất cánh và hạ cánh theo thời gian thực.", "technicalNotes": ["Đồ thị đa giác phong bì trọng tâm CG Boeing 777F theo thời gian thực", "Kiểm soát nghiêm ngặt giới hạn tải trọng cất cánh và hạ cánh", "Cảnh báo tức thì khi trọng tâm tiến sát biên giới hạn an toàn"], "screenshots": [{"url": "/projects/skyroute-cargo.png", "caption": "Biểu đồ Phong bì Trọng tâm C.G Real-time", "alt": "CG Envelope"}]},
        {"id": "chapter-04", "number": "04", "title": "Sơ đồ Tương tác Mặt cắt Hầm hàng & Bố trí Vị trí Thùng Hàng ULD", "content": "Chuyên viên Loadmaster trực tiếp sắp xếp các thùng hàng Unit Load Devices (ULD) trên 28 vị trí boong chính và hầm dưới. Sơ đồ tự động nhận diện hàng nguy hiểm (DG), hàng dễ vỡ và pallet siêu trọng với màu sắc phân biệt trực quan.", "technicalNotes": ["Sơ đồ mặt cắt tàu bay Boeing 777F định dạng vector SVG tương tác", "Tự động tính phân bổ tải trọng giữa boong chính và hầm dưới", "Cộng dồn trọng lượng pallet và so sánh với giới hạn sàn chịu tải"], "screenshots": [{"url": "/projects/skyroute-cargo.png", "caption": "Sơ đồ Mặt cắt Hầm hàng 777F", "alt": "Cargo Bay Schematic"}]},
        {"id": "chapter-05", "number": "05", "title": "Đồng bộ Tọa độ Radar Bay qua WebSocket & Redis Geo", "content": "Tín hiệu tọa độ từ các chuyến bay đang bay được nạp qua các lệnh Redis Geo (GEOADD, GEORADIUS) và phát sóng đến tất cả bàn điều phối chỉ trong dưới 80ms, mang lại khả năng nắm bắt tình hình không lưu toàn cầu liên tục.", "technicalNotes": ["Lưu trữ tọa độ không gian Redis Geo với độ trễ micro-second", "Cơ chế phát sóng bản tin WebSocket pub/sub đến các bàn điều phái", "Tự động tái kết nối và đối soát trạng thái không bị mất gói tin"]},
        {"id": "chapter-06", "number": "06", "title": "Tự động Xuất Điện văn Tải trọng Loadsheet Chuẩn IATA", "content": "Sau khi hoàn tất sơ đồ xếp dỡ, hệ thống xuất điện văn loadsheet điện tử theo đúng chuẩn IATA AHMR. Chữ ký số mã hóa bảo đảm không xảy ra bất kỳ sự can thiệp dữ liệu trái phép nào giữa khâu phát hành và buồng lái.", "technicalNotes": ["Định dạng điện văn loadsheet điện tử chuẩn IATA", "Xác thực tính toàn vẹn dữ liệu bằng checksum mật mã học", "Hỗ trợ xuất file PDF tải trọng và gửi điện văn ACARS lên buồng lái"]},
        {"id": "chapter-07", "number": "07", "title": "Đóng gói Triển khai Container Docker & Đảm bảo Tính Sẵn sàng Cao", "content": "Toàn bộ hệ thống được đóng gói container hóa với Docker, thiết lập cơ chế giám sát trạng thái sức khỏe tự động, đảm bảo thời gian hoạt động liên tục 99.9% cho các quy trình điều hành bay nghiêm ngặt.", "technicalNotes": ["Quy trình Docker multi-stage build tối ưu kích thước image", "Pipeline triển khai không gián đoạn dịch vụ (Zero-downtime)", "Cơ sở dữ liệu PostgreSQL Neon Serverless với cơ chế connection pool tự động"]}
    ]'::jsonb,
    NOW()
),
(
    'MediCare AI — Smart Telehealth & Clinical Decision Support System',
    'medicare-ai-triage',
    'Hệ thống bệnh án điện tử (EMR) và phân loại triệu chứng bệnh nhân bằng AI, tích hợp phòng khám video WebRTC và kê đơn thuốc số cảnh báo tương tác thuốc.',
    'Healthcare & Clinical AI',
    'Full-Stack Developer',
    3,
    'November 2025 – May 2026',
    'Completed',
    2026,
    '["React.js", "TypeScript", "Express.js", "MongoDB Atlas", "WebRTC", "Gemini AI API", "JWT Role Auth", "Tailwind CSS", "Cloudinary"]'::jsonb,
    '#0D9488',
    '#F0FDFA',
    'Các phòng khám và bệnh viện thường xuyên quá tải ở khâu tiếp đón ban đầu, bệnh nhân chờ đợi lâu, thiếu phân loại mức độ khẩn cấp tự động và tiềm ẩn nguy cơ kê đơn tương tác thuốc nguy hiểm.',
    'Xây dựng quy trình khám bệnh khép kín tích hợp AI phân loại triệu chứng bằng Gemini API, phòng khám trực tuyến bảo mật WebRTC, hồ sơ bệnh án điện tử EMR lưu trữ trên MongoDB Atlas và động cơ cảnh báo tương tác thuốc tự động.',
    'Rút ngắn 55% thời gian chờ đợi tiếp nhận, ưu tiên xử lý tức thì các ca khẩn cấp, hỗ trợ bác sĩ chẩn đoán phân biệt chính xác và giảm thiểu rủi ro dùng thuốc.',
    '/projects/medicare-hero.png',
    'https://medicare-ai.health',
    'https://github.com/HuynhNe26/medicare-ai-triage',
    'https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing',
    true,
    true,
    7,
    'timeline-based',
    '[
        {"id": "chapter-01", "number": "01", "title": "Cổng Tiếp nhận Khám Trực tuyến & Hàng đợi Bệnh nhân", "content": "MediCare AI là giải pháp khám chữa bệnh từ xa và quản lý bệnh án điện tử (EMR) được xây dựng nhằm chuẩn hóa quy trình chăm sóc sức khỏe ban đầu. Hệ thống kết nối bệnh nhân với đội ngũ y bác sĩ thông qua một cổng dịch vụ duy nhất.", "technicalNotes": ["Giao diện y tế React.js chuẩn màn hình y khoa với TypeScript", "Kiến trúc phân quyền nghiêm ngặt với xác thực JWT và mã hóa đường truyền", "Bảng màu xanh ngọc lam (Teal) và trắng sạch sẽ, thân thiện với bệnh nhân"], "screenshots": [{"url": "/projects/medicare-hero.png", "caption": "Hàng đợi Tiếp nhận & Xem trước Bệnh án Điện tử", "alt": "MediCare Hero"}]},
        {"id": "chapter-02", "number": "02", "title": "Trục Thời gian Lâm sàng: Quy trình 4 Giai đoạn từ Tiếp nhận đến Kê đơn", "content": "Toàn bộ câu chuyện dự án được thể hiện qua Trục thời gian lâm sàng (Timeline-Based): Giai đoạn 1 (Đăng ký & Đo lường Chỉ số Sinh tồn) ➔ Giai đoạn 2 (AI Phân loại Triệu chứng Khẩn cấp) ➔ Giai đoạn 3 (Bác sĩ Khám Trực tuyến WebRTC) ➔ Giai đoạn 4 (Xuất Đơn thuốc Điện tử & Lịch Tái khám).", "technicalNotes": ["Kiến trúc kể chuyện Timeline-Based Storytelling", "Đồng bộ hóa trạng thái mốc thời gian dọc theo từng giai đoạn khám bệnh", "Ghi nhật ký kiểm toán (Audit Log) theo dõi mọi biến động hồ sơ bệnh án"], "screenshots": [{"url": "/projects/medicare-consult.png", "caption": "Trục Thời gian Lâm sàng & Ghi chú Bác sĩ", "alt": "Clinical Timeline"}]},
        {"id": "chapter-03", "number": "03", "title": "Động cơ Phân loại Triệu chứng Cấp cứu Tự động với Gemini Medical AI", "content": "Bệnh nhân mô tả triệu chứng bằng ngôn ngữ tự nhiên. Mô hình Gemini AI phân tích lý do khám, tiền sử bệnh án và các chỉ số sinh tồn để xếp lớp cấp cứu: Khẩn cấp đỏ (Emergency), Cần khám sớm (Urgent), hoặc Khám thông thường (Routine), giúp phòng khám xử lý ngay các ca nguy kịch.", "technicalNotes": ["Prompt engineering chuyên sâu với mô hình Gemini AI y khoa", "Tự động trích xuất các chỉ số sinh tồn (Nhịp tim 108 bpm, SpO2 95%, Huyết áp 145/92)", "Tự động xếp lại thứ tự hàng đợi theo mức độ khẩn cấp y tế"], "screenshots": [{"url": "/projects/medicare-hero.png", "caption": "Hàng đợi Phân loại Cấp cứu AI", "alt": "AI Triage Queue"}]},
        {"id": "chapter-04", "number": "04", "title": "Phòng Khám Video Trực tuyến Bảo mật Peer-to-Peer WebRTC", "content": "Buổi tư vấn diễn ra qua kênh truyền thông video WebRTC ngang hàng được mã hóa hai đầu cuối. Bác sĩ vừa có thể quan sát triệu chứng của bệnh nhân, vừa tra cứu hồ sơ bệnh án và cập nhật ghi chú khám bệnh trong thời gian thực.", "technicalNotes": ["Kênh truyền thông media ngang hàng WebRTC qua máy chủ STUN/TURN", "Độ trễ truyền video và âm thanh dưới 200ms", "Không lưu trữ video trên máy chủ nhằm đảm bảo quyền riêng tư người bệnh"]},
        {"id": "chapter-05", "number": "05", "title": "Hồ sơ Bệnh án Điện tử (EMR) & Biểu đồ Chỉ số Sinh tồn Theo Thời gian", "content": "Bác sĩ có thể theo dõi biểu đồ diễn tiến sinh tồn của bệnh nhân qua các đợt khám: huyết áp tâm thu/tâm trương, nhịp tim, nhiệt độ và nồng độ oxy trong máu SpO2, hỗ trợ chẩn đoán phân biệt chuẩn xác.", "technicalNotes": ["Đồ thị vector SVG diễn tiến huyết áp và nhịp tim liên tục", "Cơ sở dữ liệu MongoDB Atlas lưu trữ cấu trúc tài liệu bệnh án linh hoạt", "Tối ưu hóa truy vấn lịch sử khám qua nhiều lần tái khám"], "screenshots": [{"url": "/projects/medicare-consult.png", "caption": "Đồ thị Diễn tiến Chỉ số Sinh tồn", "alt": "Vital Signs History"}]},
        {"id": "chapter-06", "number": "06", "title": "Bộ Kê đơn Thuốc Điện tử & Cảnh báo Tương tác Thuốc Nguy hại", "content": "Công cụ kê đơn tự động tính toán liều lượng chuẩn (ví dụ Amoxicillin 500mg, ngày 4 lần) và tự động đối chiếu với danh mục thuốc bệnh nhân đang sử dụng để phát hiện cảnh báo tương tác thuốc chéo, ngăn ngừa sốc thuốc hoặc tương tác bất lợi.", "technicalNotes": ["Tự động tính toán liều lượng và thời gian điều trị theo thể trọng/tuổi", "Ma trận đối soát tương tác thuốc (Drug-Drug Interaction matrix)", "Liên kết trực tiếp với hệ thống nhà thuốc phân phối thuốc điện tử"], "screenshots": [{"url": "/projects/medicare-consult.png", "caption": "Bộ Kê đơn Thuốc Số & Định tuyến Nhà thuốc", "alt": "e-Prescription Builder"}]},
        {"id": "chapter-07", "number": "07", "title": "Phân quyền Vai trò (Bác sĩ, Y tá, Bệnh nhân) & Bảo mật Y tế", "content": "Hệ thống áp dụng cơ chế phân quyền RBAC nghiêm ngặt: Bác sĩ có quyền chẩn đoán và kê đơn; Y tá phụ trách tiếp nhận và ghi nhận chỉ số sinh tồn ban đầu; Bệnh nhân có cổng riêng theo dõi đơn thuốc và lịch hẹn.", "technicalNotes": ["Phân quyền người dùng theo vai trò (RBAC) với JWT token an toàn", "Mã hóa các trường dữ liệu nhạy cảm trong cơ sở dữ liệu", "Tuân thủ các nguyên tắc bảo vệ quyền riêng tư dữ liệu y tế"]}
    ]'::jsonb,
    NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    summary = EXCLUDED.summary,
    category = EXCLUDED.category,
    role = EXCLUDED.role,
    team_size = EXCLUDED.team_size,
    timeline = EXCLUDED.timeline,
    status = EXCLUDED.status,
    year = EXCLUDED.year,
    technologies = EXCLUDED.technologies,
    theme_color = EXCLUDED.theme_color,
    theme_bg = EXCLUDED.theme_bg,
    problem = EXCLUDED.problem,
    approach = EXCLUDED.approach,
    outcome = EXCLUDED.outcome,
    cover_url = EXCLUDED.cover_url,
    live_url = EXCLUDED.live_url,
    source_url = EXCLUDED.source_url,
    report_url = EXCLUDED.report_url,
    featured = EXCLUDED.featured,
    published = EXCLUDED.published,
    display_order = EXCLUDED.display_order,
    storytelling_style = EXCLUDED.storytelling_style,
    chapters = EXCLUDED.chapters,
    updated_at = NOW();

-- 3. Insert Site Settings
INSERT INTO site_settings (
    id, site_title, seo_description, canonical_url, contact_email, public_visibility, updated_at
) VALUES (
    'default',
    'Nguyễn Hoàng Huynh — Full-Stack Web Developer',
    'Personal developer portfolio of Nguyễn Hoàng Huynh, Information Technology student at Vietnam Aviation Academy. Showcasing AI Agentic RAG systems, full-stack applications, and engineering case studies.',
    'https://huynhportfolio.com',
    'nguyenhoanghuynh.vn@gmail.com',
    true,
    NOW()
) ON CONFLICT (id) DO UPDATE SET
    site_title = EXCLUDED.site_title,
    seo_description = EXCLUDED.seo_description,
    canonical_url = EXCLUDED.canonical_url,
    contact_email = EXCLUDED.contact_email,
    public_visibility = EXCLUDED.public_visibility,
    updated_at = NOW();
