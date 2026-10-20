# ROLE & OBJECTIVE
You are a Principal Full-Stack Engineer and Apple Design Systems Architect. Build a production-ready, Apple-inspired personal portfolio and CMS web application for **Nguyễn Hoàng Huynh** using **Next.js (App Router, TypeScript)**, **MongoDB (Mongoose)**, **HttpOnly Cookie JWT Authentication**, **Resend API**, **Tailwind CSS**, and **Framer Motion**.

---

# 1. OWNER PROFILE DATA (SEED DATA)
- **Full Name:** Nguyễn Hoàng Huynh
- **Date of Birth:** 26/08/2005
- **Role:** Full-Stack Web Developer
- **Hometown / Location:** Đồng Nai, Việt Nam
- **Email:** nguyenhoanghuynh.vn@gmail.com
- **Phone:** 0937569205 (Display option: +84 937 569 205)
- **Education:**
  - Institution: Học viện Hàng không Việt Nam (Vietnam Aviation Academy - VAA)
  - Major: Công nghệ Thông tin (Information Technology) — Sinh viên năm 3 (2023 – Nay)
  - GPA: 3.1 / 4.0
  - Bio Summary: Đam mê nghiên cứu và phát triển các hệ thống Web Full-Stack thực chiến, tích hợp AI Agentic và tối ưu trải nghiệm người dùng. Từng tham gia phát triển nhiều dự án Lab chuyên sâu tại trường.
- **Certifications:**
  - TOEIC 550 (Listening & Reading) — Issued: 10/2025
- **Avatar / Portrait:** Use a clean, replaceable placeholder component with upload capability via `/admin`.

---

# 2. PROJECTS DATA (5 DISTINCT COLOR THEMES)
Each project MUST have its own cohesive, subtle Apple-style color theme (`themeColor`, `surfaceBg`, `accentText`, `borderAccent`) and support a **Storytelling Modal** when the user clicks "Xem chi tiết".

1. **TICKET CONCERT SUPPORT SYSTEM BASED ON AGENTIC RAG**
   - **Role:** Full-Stack Developer | **Team Size:** 3 | **Duration:** 08/2025 – 04/2026
   - **Tech Stack:** React.js, Node.js, MoMo API, JWT, Cloudinary, Gemini API, LangChain.js, PostgreSQL (Neon), WebSocket, Resend API
   - **Live URL:** https://www.ticketconcert.online | **GitHub URL:** (Editable placeholder via Admin)
   - **Color Theme:** Deep Titanium Indigo (`surface: #EEF2FF`, `accent: #3730A3`, `badge: #E0E7FF`)

2. **FASHION NAIL MORLEY LANDING PAGE**
   - **Role:** Full-Stack Developer | **Team Size:** 1 | **Duration:** 09/2026 – 10/2026
   - **Tech Stack:** React (Vite.js), Node.js, Resend API, PostgreSQL (Neon)
   - **Live URL:** https://fashionnailmorley.com.au | **GitHub URL:** (Editable placeholder via Admin)
   - **Color Theme:** Warm Rose Quartz (`surface: #FDF2F8`, `accent: #9D174D`, `badge: #FCE7F3`)

3. **ExamPlatform AI - AI Powered Online Examination & Adaptive Learning Platform**
   - **Role:** Full-Stack Developer | **Team Size:** 1 | **Duration:** 04/2026 – PRESENT
   - **Tech Stack:** React (Vite.js), Node.js, Neon PostgreSQL, Resend API, Cloudinary, Redis
   - **Live URL:** https://exam-platform.online | **GitHub URL:** (Editable placeholder via Admin)
   - **Color Theme:** Alpine Emerald Teal (`surface: #ECFDF5`, `accent: #065F46`, `badge: #D1FAE5`)

4. **VK Digital Hub Landing Page Marketing**
   - **Role:** Full-Stack Developer | **Team Size:** 1 | **Duration:** 09/2026 – 10/2026
   - **Tech Stack:** React, Node.js, Make API (Email Automation)
   - **Live URL:** https://vkdigitalhub.netlify.app | **GitHub URL:** (Editable placeholder via Admin)
   - **Color Theme:** Amber Terracotta (`surface: #FFFBEB`, `accent: #92400E`, `badge: #FEF3C7`)

5. **Huynh.OS — Apple-Inspired Storytelling Portfolio & Headless CMS** (Self-titled Portfolio Project)
   - **Role:** Full-Stack Developer | **Team Size:** 1 | **Duration:** 10/2026 – PRESENT
   - **Tech Stack:** Next.js (App Router), MongoDB, HttpOnly Cookie Auth (JWT), Resend API, Gemini Vision AI, Tailwind CSS, Framer Motion
   - **Live URL:** Current Domain | **GitHub URL:** (Editable placeholder via Admin)
   - **Color Theme:** Space Graphite & Silver (`surface: #F3F4F6`, `accent: #111827`, `badge: #E5E7EB`)

---

# 3. SPECIAL FEATURE: AI IMAGE SCROLLYTELLING ("XEM CHI TIẾT")
When a visitor clicks **"Xem chi tiết"** on any project card:
- Open an Apple-style Fullscreen / Sheet Modal with smooth backdrop blur.
- Render the project's gallery as an interactive **Visual Storytelling Journey (Scrollytelling)**.
- Each project image (`storySlides` array in MongoDB) is displayed alongside:
  1. **Chapter Number & Headline** (e.g., "01. Kiến trúc Đặt vé Thời gian thực với WebSocket")
  2. **Storytelling Narrative:** Engaging explanation of the user journey and engineering problem solved in that screen.
  3. **Feature Callout Pins / Breakdown List:** Specific UI/Backend mechanisms visible in the screenshot (e.g., Flow thanh toán MoMo, Luồng truy xuất Agentic RAG qua LangChain & Gemini).
- **In `/admin` Dashboard:** When the admin uploads screenshots for a project, provide an **"Analyze Image with AI Storytelling"** button (`/api/admin/analyze-screenshot`) that sends the image to Gemini Vision API (or allows manual editing) to automatically dissect the screenshot into structured storytelling chapters and functional breakdowns.

---

# 4. DESIGN & UI/UX CONSTRAINTS (ANTI-AI-CLICHÉ RULES)
- **Apple Aesthetic:** Inspired by apple.com. Use `#F5F5F7` primary background, pure `#FFFFFF` elevated cards, `#1D1D1F` primary typography, and `#86868B` secondary text.
- **NO AI Clichés:** Strictly NO neon purple/cyan glowing gradients, NO glitch animations, NO floating cyberpunk particles, NO overused generic AI copy.
- **Animations:** Subtle, spring-physics or `cubic-bezier(0.22, 1, 0.36, 1)` transitions only. Respect `prefers-reduced-motion`.
- **Responsive Perfection:** Zero horizontal overflow (`overflow-x-hidden`). Testable across 320px, 375px, 768px, 1024px, and 1440px+ viewports. All grids must collapse cleanly without breaking card heights.

---

# 5. BACKEND, AUTH & ADMIN REQUIREMENTS
- **Database:** MongoDB via Mongoose (`Profile`, `Project`, `Certificate`, `ContactMessage` schemas). Auto-seed initial data if database is empty.
- **Cookie Security (`/admin`):**
  - Login page at `/admin/login`.
  - Authenticate against admin credentials and issue a signed JWT using `jose` stored in an `HttpOnly`, `Secure`, `SameSite=Strict` cookie (`admin_token`).
  - Protect `/admin/*` pages and `/api/admin/*` routes via Next.js `middleware.ts`.
  - Admin CMS allows editing ALL profile text, avatar image, GPA, certificates, and full CRUD on Projects + their Storytelling Slides.
- **Contact Form & Resend API:**
  - Public contact form validates input (`zod`), saves message to MongoDB, and sends instant email notification to `nguyenhoanghuynh.vn@gmail.com` via **Resend API**.