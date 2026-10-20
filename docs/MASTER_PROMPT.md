MASTER PROMPT — NH HUYNH PORTFOLIO
You are a senior full-stack engineer, product designer and security-minded architect. Build a production-ready, Apple-inspired portfolio and headless-style admin CMS for Nguyễn Hoàng Huynh. Work task-by-task using docs/tasks, mark acceptance criteria, and do not fabricate screenshots, project features, GitHub URLs, employment claims or contributions. Ask for assets when missing; use clearly labeled placeholders.
Personal data
- Name: Nguyễn Hoàng Huynh; DOB 26 Aug 2005; hometown Đồng Nai, Vietnam.
- Web developer, third-year Information Technology student at Vietnam Aviation Academy, 2023–present; GPA 3.1/4.0.
- Email nguyenhoanghuynh.vn@gmail.com; phone +84 937 569 205.
- TOEIC Listening & Reading 550, October 2025.
- Profile photo, CV and social links to be supplied later.
Projects (seed editable records)
1. Ticket Concert Support System Based on Agentic RAG; Full-stack Developer; team 3; Aug 2025–Apr 2026; React.js, Node.js, MoMo API, JWT, Cloudinary, Gemini API, LangChain.js, Neon PostgreSQL, WebSocket, Resend; https://www.ticketconcert.online; violet.
2. Fashion Nail Morley Landing Page; Full-stack Developer; Sep–Oct 2026; React/Vite, Node.js, Resend, Neon PostgreSQL; https://fashionnailmorley.com.au; champagne rose.
3. ExamPlatform AI — AI-Powered Online Examination & Adaptive Learning Platform; Full-stack Developer; Apr 2026–present; React/Vite, Node.js, Neon PostgreSQL, Resend, Cloudinary, Redis; https://exam-platform.online; blue.
4. VK Digital Hub — Marketing Landing Page; Full-stack Developer; Sep–Oct 2026; React, Node.js, Make API for email; https://vkdigitalhub.netlify.app; emerald.
5. NH Huynh — Developer Portfolio & Project Stories; Full-stack Developer; Next.js, MongoDB, Resend; current portfolio; graphite.
   GitHub URLs, descriptions, images and contribution details are pending. Never invent them.
Stack
Next.js App Router with TypeScript for frontend/backend, Tailwind CSS, accessible UI primitives, MongoDB Atlas + Mongoose or official MongoDB driver, Resend for mail, image storage with signed uploads to Cloudinary (optional), Zod validation, React Hook Form as needed, server-side rendering and metadata. Prefer native fetch over Axios. Configure environment variables, deployment and tests.
Visual direction
Premium Apple-inspired editorial minimalism, restrained motion, immaculate typography, generous whitespace, dark graphite hero with light content sections. Distinct but harmonious accent per project. Responsive at 320px to wide desktop; no horizontal overflow, layout shifts, excessive glow or artificial-looking visuals. Motion via CSS and optional Framer Motion with prefers-reduced-motion support. Keyboard navigation, contrast, semantic HTML, optimized fonts/images, Core Web Vitals.
Pages
/, /about, /projects, /projects/[slug], /contact, /admin/login, /admin, /admin/projects, /admin/projects/new, /admin/projects/[id]/edit, /admin/media, /admin/messages, /admin/content, /admin/settings. Add custom not-found and error pages.
Project storytelling
Build a CMS-controlled sequence of chapters. Each chapter has title, image(s), alt text, feature description, role/contribution, technical decisions and optional animation. Admin can upload screenshots and request AI-assisted image analysis; analysis must be optional, use a configured vision-capable provider, produce draft structured chapter proposals only, and require manual review/approval. Never claim AI saw a live product unless a screenshot was actually supplied. Avoid unverified assertions.
Security
Single-owner admin seeded through protected bootstrap, never public signup. Hash password using Argon2id (or bcrypt with appropriate work factor). Server-side sessions with random opaque tokens, only hashes in MongoDB, Secure HttpOnly SameSite=Lax cookie, session rotation and expiry, logout revocation, rate limits, CSRF protection for state-changing routes, Origin validation, strict authorization on every admin route/action, login audit logging, secret management and environment separation. Do not store credentials or tokens in localStorage. Validate and sanitize input; protect contact form with anti-spam and Resend rate limiting. Do not expose secrets to browser.
CMS collections
AdminUser, Session, SiteSettings, Profile, Project, ProjectChapter, Education, Certificate, Skill, ContactMessage, MediaAsset, AuditLog. Add appropriate indexes, timestamps, ordering, draft/published state and slugs. Ensure safe unique constraints.
Contact
Public form name, email, subject optional, message; server-side Zod validation, spam control, save to MongoDB, notify admin via Resend and optionally send sender acknowledgement. Do not leak contact records publicly.
Delivery workflow
Read docs/tasks/README.md. Implement tasks in order. For each task: explain files changed, add tests, run lint/typecheck/build, document verification and update checkbox status. Use realistic seed data and explicit placeholders. Never silently skip security or accessibility acceptance criteria. Produce README, .env.example, seed script, deployment guide and admin setup instructions.