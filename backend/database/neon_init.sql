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
-- 4. Projects Table (Showcase Projects with 7-Chapter Storytelling)
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
    featured BOOLEAN NOT NULL DEFAULT false,
    published BOOLEAN NOT NULL DEFAULT true,
    display_order INT NOT NULL DEFAULT 0,
    chapters JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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
    certificates, updated_at
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
            "issueDate": "October 2025"
        }
    ]'::jsonb,
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
    updated_at = NOW();

-- 2. Insert 5 Verified Projects
INSERT INTO projects (
    title, slug, summary, category, role, team_size, timeline, status, year,
    technologies, theme_color, theme_bg, problem, approach, outcome, cover_url,
    live_url, source_url, featured, published, display_order, chapters, updated_at
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
    '',
    'https://www.ticketconcert.online',
    '',
    true,
    true,
    1,
    '[
        {"id": "chapter-01", "number": "01", "title": "Introduction & Project Overview", "content": "Ticket Concert Support System is a collaborative full-stack web application developed by a team of three. It combines high-throughput event ticket booking with an intelligent support agent capable of resolving complex user queries about seat availability, venues, and booking policies.", "technicalNotes": ["Full-stack architecture with React.js frontend and Node.js backend", "Agentic RAG workflow powered by LangChain.js and Google Gemini API", "Real-time bi-directional messaging with WebSockets"]},
        {"id": "chapter-02", "number": "02", "title": "The Idea & Motivation", "content": "Traditional event ticketing systems suffer from bottlenecks during peak sales: support queues explode, and users abandon carts when unsure about seat selections. We envisioned an intelligent virtual assistant that not only answers questions but actively assists with order status and seat discovery."},
        {"id": "chapter-03", "number": "03", "title": "The Challenge & Technical Constraints", "content": "Handling simultaneous ticket queries without hallucinations required grounding the AI model strictly in up-to-date concert schedules, seat categories, and refund policies. Furthermore, payment webhooks needed strict reconciliation with order states."},
        {"id": "chapter-04", "number": "04", "title": "The User Experience", "content": "Users can browse live concert listings, inspect dynamic venue maps, interact with the AI assistant through a persistent conversational drawer, and complete checkout with MoMo payment gateways."},
        {"id": "chapter-05", "number": "05", "title": "Engineering & Integration", "content": "Built using PostgreSQL (Neon) for ACID-compliant transaction records, JWT authentication for secure account sessions, Cloudinary for high-res banner delivery, and Resend API for ticket confirmation dispatch.", "technicalNotes": ["Neon Serverless PostgreSQL connection pooling", "MoMo payment webhook HMAC signature validation", "Resend API transactional templates"]},
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
    '',
    'https://fashionnailmorley.com.au',
    '',
    true,
    true,
    2,
    '[
        {"id": "chapter-01", "number": "01", "title": "Introduction & Project Overview", "content": "Fashion Nail Morley is a bespoke commercial web application created for a nail and beauty salon located in Morley, Western Australia. The focus was on luxurious visual branding, clear service pricing, and effortless appointment scheduling."},
        {"id": "chapter-02", "number": "02", "title": "The Idea & Brand Direction", "content": "Reflecting the salon’s warm, premium atmosphere with a Champagne Rose color aesthetic, high-quality typography, and clear navigation designed for mobile phone users on the go."},
        {"id": "chapter-03", "number": "03", "title": "The Challenge", "content": "The majority of salon customers browse on mobile devices through Instagram and Google Maps links. The interface had to load instantly, require minimal bandwidth, and guide users directly to booking without confusion."},
        {"id": "chapter-04", "number": "04", "title": "The Experience", "content": "Features include interactive price cards, curated gallery grids with categorized nail art styles, Google Maps location integration, and a one-tap appointment request form."},
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
    '',
    'https://exam-platform.online',
    '',
    true,
    true,
    3,
    '[
        {"id": "chapter-01", "number": "01", "title": "Introduction & Project Overview", "content": "ExamPlatform AI is an advanced educational technology application designed to streamline student assessments, provide AI-assisted evaluation feedback, and maintain secure test sessions."},
        {"id": "chapter-02", "number": "02", "title": "The Idea & Core Philosophy", "content": "Moving beyond static multiple-choice questionnaires, ExamPlatform AI incorporates adaptive difficulty scaling and comprehensive post-exam conceptual analysis for learners."},
        {"id": "chapter-03", "number": "03", "title": "The Challenge & Security Constraints", "content": "Preventing duplicate submissions, handling transient network drops during ongoing exams, and guaranteeing strict timing constraints on student answer records."},
        {"id": "chapter-04", "number": "04", "title": "The Experience", "content": "A clean, distraction-free examination room with countdown timers, question navigation palettes, instant autosaving of responses, and real-time score summaries."},
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
    '',
    'https://vkdigitalhub.netlify.app',
    '',
    false,
    true,
    4,
    '[
        {"id": "chapter-01", "number": "01", "title": "Introduction & Project Overview", "content": "VK Digital Hub serves as the digital front door for a modern growth agency, presenting service tiers, case studies, and automated consultation scheduling."},
        {"id": "chapter-02", "number": "02", "title": "The Idea & Marketing Strategy", "content": "Focusing on clean, high-conversion visual design with Emerald Green accents, structured service comparisons, and fast response times to prospective client inquiries."},
        {"id": "chapter-03", "number": "03", "title": "The Challenge", "content": "The client needed zero-maintenance backend automation that would immediately synchronize inbound website leads into their existing productivity apps."},
        {"id": "chapter-04", "number": "04", "title": "The Experience", "content": "Interactive consultation request forms, dynamic client testimonial sliders, clear service matrices, and rapid responsive page navigation."},
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
    '["Next.js", "TypeScript", "PostgreSQL (Neon)", "Tailwind CSS", "Resend API"]'::jsonb,
    '#4B5563',
    '#F3F4F6',
    'Standard static developer templates cannot securely manage live project storytelling, message auditing, or profile configuration dynamically.',
    'Engineered an App Router Next.js application with a dedicated Node.js backend, HttpOnly session authentication, and PostgreSQL Neon serverless database.',
    'Delivered an Apple-inspired editorial design system with full CMS administration, contact rate-limiting, and 7-chapter storytelling.',
    '',
    'https://huynhportfolio.com',
    '',
    true,
    true,
    5,
    '[
        {"id": "chapter-01", "number": "01", "title": "Introduction & Project Overview", "content": "NH HUYNH Developer Portfolio is a full-featured digital product combining an Apple-inspired editorial public showcase with an authenticated content management system for projects, storytelling, profile, education, certificates, and inbox management."},
        {"id": "chapter-02", "number": "02", "title": "The Idea & Philosophy", "content": "Built to demonstrate real-world software engineering: clean separation of concerns, defense-in-depth security, strict TypeScript typings, and zero reliance on mock data."},
        {"id": "chapter-03", "number": "03", "title": "The Challenge & Security Posture", "content": "Protecting admin operations without exposing credentials, preventing CSRF and SQL injection, enforcing rate limits, and ensuring resilient rendering even when external services are pending configuration."},
        {"id": "chapter-04", "number": "04", "title": "The Experience", "content": "Features a bespoke 7-chapter storytelling case study layout, interactive filterable project index, responsive navigation across 320px–1920px displays, and a streamlined admin suite."},
        {"id": "chapter-05", "number": "05", "title": "Engineering Architecture", "content": "Next.js App Router with server-side API proxying, PostgreSQL Neon connection pooling with pg.Pool, scrypt password hashing, and durable Resend email dispatch."},
        {"id": "chapter-06", "number": "06", "title": "My Contribution", "content": "Solo architect and engineer: visual design system, frontend component architecture, backend API and database schemas, authentication, security controls, and documentation."},
        {"id": "chapter-07", "number": "07", "title": "Outcome & Ongoing Development", "content": "An extensible, production-ready portfolio establishing a strong professional foundation for Full-Stack Developer opportunities."}
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
    featured = EXCLUDED.featured,
    published = EXCLUDED.published,
    display_order = EXCLUDED.display_order,
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
