import { closeDatabase, query } from '../src/database.js';
import type { ProjectInput } from '../src/models.js';

async function seed() {
  console.log('Seeding portfolio database with verified records (PostgreSQL Neon)...');

  const now = new Date();

  // 1. Seed Owner Profile
  const profileData = {
    name: 'Nguyễn Hoàng Huynh',
    title: 'Full-Stack Web Developer',
    headline: 'Full-Stack Web Developer — Crafting Thoughtful Digital Products',
    introduction:
      'I am a passionate Information Technology student and Full-Stack Web Developer who enjoys transforming creative ideas into functional, scalable, and user-friendly digital products.',
    biography:
      'Currently in my third year of Information Technology at Vietnam Aviation Academy (GPA 3.1/4.0), I continuously explore modern web technologies, backend engineering, database design, authentication, API integrations, and practical software architecture. Through academic projects, collaborative development, and real-world website implementations, I aim to strengthen my engineering skills and build meaningful digital experiences.',
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
    updatedAt: now,
  };

  await query(
    `INSERT INTO profiles (
      id, name, title, headline, introduction, biography, date_of_birth, hometown,
      email, phone, location, availability, skills, skills_categorized, education,
      certificates, updated_at
    ) VALUES (
      'owner', $1, $2, $3, $4, $5, $6, $7,
      $8, $9, $10, $11, $12::jsonb, $13::jsonb, $14::jsonb, $15::jsonb, $16
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
      updated_at = EXCLUDED.updated_at`,
    [
      profileData.name,
      profileData.title,
      profileData.headline,
      profileData.introduction,
      profileData.biography,
      profileData.dateOfBirth,
      profileData.hometown,
      profileData.email,
      profileData.phone,
      profileData.location,
      profileData.availability,
      JSON.stringify(profileData.skills),
      JSON.stringify(profileData.skillsCategorized),
      JSON.stringify(profileData.education),
      JSON.stringify(profileData.certificates),
      now,
    ]
  );
  console.log('✓ Profile seeded.');

  // 2. Seed 5 Real Projects with 7 Chapters each
  const projectsData: ProjectInput[] = [
    {
      title: 'Ticket Concert Support System Based on Agentic RAG',
      slug: 'ticket-concert-agentic-rag',
      summary:
        'An intelligent concert ticketing and real-time customer support platform leveraging Agentic RAG for contextual inquiry resolution and seamless payment workflows.',
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
      coverUrl: '',
      liveUrl: 'https://www.ticketconcert.online',
      sourceUrl: '',
      featured: true,
      published: true,
      order: 1,
      problem:
        'Concert attendees frequently face delays obtaining event information, seating confirmation, and payment resolution during high-traffic ticket sales.',
      approach:
        'Engineered an agentic retrieval-augmented generation (RAG) system with LangChain.js and Gemini API integrated with Node.js and real-time WebSocket communication.',
      outcome:
        'Delivered an automated support workflow handling multi-turn ticketing inquiries with MoMo API payment verification and reliable transactional email notifications.',
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Introduction & Project Overview',
          content:
            'Ticket Concert Support System is a collaborative full-stack web application developed by a team of three. It combines high-throughput event ticket booking with an intelligent support agent capable of resolving complex user queries about seat availability, venues, and booking policies.',
          technicalNotes: [
            'Full-stack architecture with React.js frontend and Node.js backend',
            'Agentic RAG workflow powered by LangChain.js and Google Gemini API',
            'Real-time bi-directional messaging with WebSockets',
          ],
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'The Idea & Motivation',
          content:
            'Traditional event ticketing systems suffer from bottlenecks during peak sales: support queues explode, and users abandon carts when unsure about seat selections. We envisioned an intelligent virtual assistant that not only answers questions but actively assists with order status and seat discovery.',
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'The Challenge & Technical Constraints',
          content:
            'Handling simultaneous ticket queries without hallucinations required grounding the AI model strictly in up-to-date concert schedules, seat categories, and refund policies. Furthermore, payment webhooks needed strict reconciliation with order states.',
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'The User Experience',
          content:
            'Users can browse live concert listings, inspect dynamic venue maps, interact with the AI assistant through a persistent conversational drawer, and complete checkout with MoMo payment gateways.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Engineering & Integration',
          content:
            'Built using PostgreSQL (Neon) for ACID-compliant transaction records, JWT authentication for secure account sessions, Cloudinary for high-res banner delivery, and Resend API for ticket confirmation dispatch.',
          technicalNotes: [
            'Neon Serverless PostgreSQL connection pooling',
            'MoMo payment webhook HMAC signature validation',
            'Resend API transactional templates',
          ],
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'My Contribution',
          content:
            'As Full-Stack Developer on the 3-member team, I contributed to API architecture, database schema design in PostgreSQL, WebSocket event handlers for live chat, and payment gateway integration with MoMo.',
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Outcome & Reflection',
          content:
            'Successfully deployed at ticketconcert.online, demonstrating how AI agents and modern backend engineering create responsive, consumer-ready ticketing platforms.',
        },
      ],
    },
    {
      title: 'Fashion Nail Morley Landing Page',
      slug: 'fashion-nail-morley',
      summary:
        'A fast, responsive salon booking and showcase landing page designed for an Australian beauty salon with integrated customer inquiries.',
      category: 'Client Web Solution',
      role: 'Full-Stack Developer',
      timeline: 'September 2026 – October 2026',
      status: 'Completed',
      year: 2026,
      technologies: ['React', 'Vite', 'JavaScript', 'Node.js', 'Resend API', 'PostgreSQL (Neon)'],
      themeColor: '#D9777F',
      themeBg: '#FFF1F2',
      coverUrl: '',
      liveUrl: 'https://fashionnailmorley.com.au',
      sourceUrl: '',
      featured: true,
      published: true,
      order: 2,
      problem:
        'The salon needed an elegant, mobile-first web presence for Western Australian customers to view service menus, gallery work, and request appointments.',
      approach:
        'Built a lightweight, high-performance React application powered by Vite, integrated with a Node.js backend and Resend API for immediate booking inquiry notifications.',
      outcome:
        'Achieved sub-second page loads, accessible mobile navigation, and streamlined booking conversion without friction.',
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Introduction & Project Overview',
          content:
            'Fashion Nail Morley is a bespoke commercial web application created for a nail and beauty salon located in Morley, Western Australia. The focus was on luxurious visual branding, clear service pricing, and effortless appointment scheduling.',
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'The Idea & Brand Direction',
          content:
            'Reflecting the salon’s warm, premium atmosphere with a Champagne Rose color aesthetic, high-quality typography, and clear navigation designed for mobile phone users on the go.',
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'The Challenge',
          content:
            'The majority of salon customers browse on mobile devices through Instagram and Google Maps links. The interface had to load instantly, require minimal bandwidth, and guide users directly to booking without confusion.',
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'The Experience',
          content:
            'Features include interactive price cards, curated gallery grids with categorized nail art styles, Google Maps location integration, and a one-tap appointment request form.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Engineering & Delivery',
          content:
            'Engineered with React and Vite for zero-bundle bloat, backed by a Node.js inquiry handler with PostgreSQL persistence on Neon and instant notification routing via Resend API.',
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'My Contribution',
          content:
            'End-to-end full-stack implementation: user interface design, responsive layout engineering, backend booking API, email notification integration, and custom domain deployment.',
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Outcome & Reflection',
          content:
            'Live and active at fashionnailmorley.com.au, significantly improving customer inquiry rates and establishing a credible online brand presence.',
        },
      ],
    },
    {
      title: 'ExamPlatform AI — AI-Powered Online Examination Platform',
      slug: 'examplatform-ai',
      summary:
        'An adaptive learning and automated examination platform featuring real-time question generation, secure evaluation, and student performance tracking.',
      category: 'EdTech & AI System',
      role: 'Full-Stack Developer',
      timeline: 'April 2026 – Present',
      status: 'Ongoing',
      year: 2026,
      technologies: ['React', 'Vite', 'JavaScript', 'Node.js', 'PostgreSQL (Neon)', 'Resend API', 'Cloudinary', 'Redis'],
      themeColor: '#1D4ED8',
      themeBg: '#EFF6FF',
      coverUrl: '',
      liveUrl: 'https://exam-platform.online',
      sourceUrl: '',
      featured: true,
      published: true,
      order: 3,
      problem:
        'Traditional online examination systems lack personalization and struggle with high concurrency during simultaneous exam submissions.',
      approach:
        'Architected a decoupled React and Node.js platform utilizing Redis caching for session tokens and question banks, with PostgreSQL for ACID compliance.',
      outcome:
        'Currently active in ongoing development, providing reliable test sessions and automated scoring algorithms.',
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Introduction & Project Overview',
          content:
            'ExamPlatform AI is an advanced educational technology application designed to streamline student assessments, provide AI-assisted evaluation feedback, and maintain secure test sessions.',
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'The Idea & Core Philosophy',
          content:
            'Moving beyond static multiple-choice questionnaires, ExamPlatform AI incorporates adaptive difficulty scaling and comprehensive post-exam conceptual analysis for learners.',
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'The Challenge & Security Constraints',
          content:
            'Preventing duplicate submissions, handling transient network drops during ongoing exams, and guaranteeing strict timing constraints on student answer records.',
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'The Experience',
          content:
            'A clean, distraction-free examination room with countdown timers, question navigation palettes, instant autosaving of responses, and real-time score summaries.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Engineering & Cache Architecture',
          content:
            'Combines Redis for fast in-memory session synchronization, PostgreSQL (Neon) for durable question banks and student scores, Cloudinary for diagram media, and Resend for score reporting.',
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'My Contribution',
          content:
            'Full-Stack Developer responsible for examination session state management, Redis cache integration, backend REST endpoints, and responsive student dashboard UI.',
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Current Status & Future Work',
          content:
            'Active ongoing engineering phase at exam-platform.online, with planned enhancements in AI code evaluation and automated rubrics.',
        },
      ],
    },
    {
      title: 'VK Digital Hub — Digital Marketing Landing Page',
      slug: 'vk-digital-hub',
      summary:
        'A high-converting digital marketing agency landing page with automated lead capture workflows powered by Make API.',
      category: 'Marketing Platform',
      role: 'Full-Stack Developer',
      timeline: 'September 2026 – October 2026',
      status: 'Completed',
      year: 2026,
      technologies: ['React', 'Node.js', 'Make API / Make Automation'],
      themeColor: '#059669',
      themeBg: '#ECFDF5',
      coverUrl: '',
      liveUrl: 'https://vkdigitalhub.netlify.app',
      sourceUrl: '',
      featured: true,
      published: true,
      order: 4,
      problem:
        'Agency needed a modern showcase for digital growth services with automated routing of prospective client inquiries directly to CRM and team inboxes.',
      approach:
        'Developed a component-driven React interface with webhook integration to Make.com scenarios for zero-latency lead routing and email acknowledgment.',
      outcome:
        'Seamlessly deployed on Netlify with automated email workflows handling marketing consultations.',
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Introduction & Project Overview',
          content:
            'VK Digital Hub serves as the digital front door for a modern growth agency, presenting service tiers, case studies, and automated consultation scheduling.',
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'The Idea & Marketing Strategy',
          content:
            'Focusing on clean, high-conversion visual design with Emerald Green accents, structured service comparisons, and fast response times to prospective client inquiries.',
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'The Challenge',
          content:
            'The client needed zero-maintenance backend automation that would immediately synchronize inbound website leads into their existing productivity apps.',
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'The Experience',
          content:
            'Interactive consultation request forms, dynamic client testimonial sliders, clear service matrices, and rapid responsive page navigation.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Engineering & Automation',
          content:
            'Built using React and Node.js with secure webhook endpoints connected to Make (Integromat) scenarios that parse, validate, and broadcast leads.',
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'My Contribution',
          content:
            'Developed the front-end layout, form validation with client feedback states, and configured webhook integrations for lead automation.',
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Outcome & Reflection',
          content:
            'Deployed at vkdigitalhub.netlify.app with 100% operational reliability and instant response dispatch for all marketing inquiries.',
        },
      ],
    },
    {
      title: 'NH HUYNH — Developer Portfolio & Content Management System',
      slug: 'nh-huynh-portfolio',
      summary:
        'A personal portfolio platform designed to showcase projects, technical skills, education, and engineering experience through interactive case studies and a custom-built content management system.',
      category: 'Full-Stack Web Product & CMS',
      role: 'Full-Stack Developer',
      timeline: 'October 2026 – Present',
      status: 'Ongoing',
      year: 2026,
      technologies: ['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Resend API'],
      themeColor: '#4B5563',
      themeBg: '#F3F4F6',
      coverUrl: '',
      liveUrl: 'https://huynhportfolio.com',
      sourceUrl: '',
      featured: true,
      published: true,
      order: 5,
      problem:
        'Standard static developer templates cannot securely manage live project storytelling, message auditing, or profile configuration dynamically.',
      approach:
        'Engineered an App Router Next.js application with a dedicated Node.js backend, HttpOnly session authentication, and MongoDB Atlas database.',
      outcome:
        'Delivered an Apple-inspired editorial design system with full CMS administration, contact rate-limiting, and 7-chapter storytelling.',
      chapters: [
        {
          id: 'chapter-01',
          number: '01',
          title: 'Introduction & Project Overview',
          content:
            'NH HUYNH Developer Portfolio is a full-featured digital product combining an Apple-inspired editorial public showcase with an authenticated content management system for projects, storytelling, profile, education, certificates, and inbox management.',
        },
        {
          id: 'chapter-02',
          number: '02',
          title: 'The Idea & Philosophy',
          content:
            'Built to demonstrate real-world software engineering: clean separation of concerns, defense-in-depth security, strict TypeScript typings, and zero reliance on mock data.',
        },
        {
          id: 'chapter-03',
          number: '03',
          title: 'The Challenge & Security Posture',
          content:
            'Protecting admin operations without exposing credentials, preventing CSRF and NoSQL injection, enforcing rate limits, and ensuring resilient rendering even when external services are pending configuration.',
        },
        {
          id: 'chapter-04',
          number: '04',
          title: 'The Experience',
          content:
            'Features a bespoke 7-chapter storytelling case study layout, interactive filterable project index, responsive navigation across 320px–1920px displays, and a streamlined admin suite.',
        },
        {
          id: 'chapter-05',
          number: '05',
          title: 'Engineering Architecture',
          content:
            'Next.js App Router with server-side API proxying, cached MongoClient connection pooling, scrypt password hashing, and durable Resend email dispatch.',
        },
        {
          id: 'chapter-06',
          number: '06',
          title: 'My Contribution',
          content:
            'Solo architect and engineer: visual design system, frontend component architecture, backend API and database schemas, authentication, security controls, and documentation.',
        },
        {
          id: 'chapter-07',
          number: '07',
          title: 'Outcome & Ongoing Development',
          content:
            'An extensible, production-ready portfolio establishing a strong professional foundation for Full-Stack Developer opportunities.',
        },
      ],
    },
  ];

  for (const proj of projectsData) {
    await query(
      `INSERT INTO projects (
        title, slug, summary, category, role, team_size, timeline, status, year,
        technologies, theme_color, theme_bg, problem, approach, outcome,
        cover_url, live_url, source_url, featured, published, display_order, chapters,
        created_at, updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10::jsonb, $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20, $21, $22::jsonb,
        $23, $24
      ) ON CONFLICT (slug) DO UPDATE SET
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
        updated_at = EXCLUDED.updated_at`,
      [
        proj.title,
        proj.slug,
        proj.summary,
        proj.category,
        proj.role,
        proj.teamSize ?? null,
        proj.timeline ?? null,
        proj.status ?? 'Completed',
        proj.year,
        JSON.stringify(proj.technologies || []),
        proj.themeColor ?? null,
        proj.themeBg ?? null,
        proj.problem,
        proj.approach,
        proj.outcome,
        proj.coverUrl ?? '',
        proj.liveUrl ?? '',
        proj.sourceUrl ?? '',
        Boolean(proj.featured),
        Boolean(proj.published),
        proj.order ?? 0,
        JSON.stringify(proj.chapters || []),
        now,
        now,
      ]
    );
    console.log(`✓ Project [${proj.slug}] upserted.`);
  }

  // 3. Seed Site Settings
  await query(
    `INSERT INTO site_settings (id, site_title, seo_description, canonical_url, contact_email, public_visibility, updated_at)
     VALUES ('settings', $1, $2, $3, $4, $5, $6)
     ON CONFLICT (id) DO UPDATE SET
       site_title = EXCLUDED.site_title,
       seo_description = EXCLUDED.seo_description,
       canonical_url = EXCLUDED.canonical_url,
       contact_email = EXCLUDED.contact_email,
       public_visibility = EXCLUDED.public_visibility,
       updated_at = EXCLUDED.updated_at`,
    [
      'Nguyễn Hoàng Huynh — Full-Stack Developer Portfolio',
      'Personal developer portfolio, AI Agentic RAG case studies, and engineering showcase of Nguyễn Hoàng Huynh.',
      'https://huynhportfolio.com',
      'nguyenhoanghuynh.vn@gmail.com',
      true,
      now,
    ]
  );
  console.log('✓ Site settings seeded.');

  console.log('Seeding completed successfully.');
}

try {
  await seed();
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Database seeding failed.');
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
