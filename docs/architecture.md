# Architecture Specification — NH HUYNH Developer Portfolio

## 1. System Overview

The portfolio of **Nguyễn Hoàng Huynh** is engineered as a high-performance, modular full-stack application following Apple-inspired minimalism and modern software engineering principles.

```
+-----------------------------------------------------------------------------------+
|                                  USER / CLIENT                                    |
|             (Desktop, Tablet, Mobile Browsers - Responsive 320px to 1920px)       |
+-----------------------------------------------------------------------------------+
                                       |
                                       | HTTPS
                                       v
+-----------------------------------------------------------------------------------+
|                        NEXT.JS APP ROUTER (Frontend Service)                      |
|                                                                                   |
|   Public Pages:                                                                   |
|     - /                  (Hero, About Preview, Featured Projects, Skills, Edu)    |
|     - /about             (Full Profile, Timeline, Education, Certificates)        |
|     - /projects          (All Projects with Category/Technology Filtering)        |
|     - /projects/[slug]   (Interactive 7-Chapter Storytelling Case Study)          |
|     - /contact           (Contact Form with Rate Limiting & Validation)           |
|                                                                                   |
|   Admin CMS (Protected):                                                          |
|     - /admin/login       (Secure Authentication)                                  |
|     - /admin             (Metrics & Activity Dashboard)                           |
|     - /admin/profile     (Profile & Career Information Editor)                    |
|     - /admin/projects    (Project CRUD & Chapter Storytelling Manager)            |
|     - /admin/education   (Education History CRUD)                                 |
|     - /admin/certificates(Certifications CRUD)                                    |
|     - /admin/skills      (Categorized Skills Management)                          |
|     - /admin/messages    (Contact Inquiries Inbox & Delivery Audit)               |
|     - /admin/media       (Media Library & Cloudinary Uploads)                     |
|     - /admin/settings    (Site Metadata, Visibility & SEO Settings)               |
|                                                                                   |
|   API Forwarding & Server Actions:                                                |
|     - /api/[...path]     (Same-Origin Reverse Proxy with Header Sanitization)     |
+-----------------------------------------------------------------------------------+
                                       |
                                       | Internal HTTP (Authenticated / Cookie-forwarded)
                                       v
+-----------------------------------------------------------------------------------+
|                     NODE.JS / TYPESCRIPT BACKEND SERVICE                          |
|                                                                                   |
|   - Server (src/server.ts): Routing, Rate Limiting, CORS & Origin Protection      |
|   - Auth (src/auth.ts): Argon2id/scrypt Password Hashing, 256-bit Secure Sessions |
|   - Repository (src/repository.ts): Safe Data Access & CRUD Operations            |
|   - Validation (src/validation.ts): Strict Zod Schemas for all Inputs             |
|   - Integrations:                                                                 |
|       * Resend API (Transactional Inquiries Notification)                         |
|       * Cloudinary (Secure Media Storage)                                         |
|       * AI Vision / Gemini (Optional Screenshot Analysis for Storytelling)        |
+-----------------------------------------------------------------------------------+
                                       |
                                       | TLS
                                       v
+-----------------------------------------------------------------------------------+
|                            DATABASE LAYER (MongoDB Atlas)                         |
|                                                                                   |
|   Collections:                                                                    |
|     - profiles: Owner profile, biographical data, contact details, social links   |
|     - projects: 5 Real Projects, metadata, 7-chapter storytelling data, screenshots|
|     - education: Academic timeline, institutions, degrees, GPAs                   |
|     - certificates: Certifications, issuing bodies, scores, issue dates           |
|     - skills: Categorized skills (Frontend, Backend, DB, APIs, Tools)             |
|     - admins: Admin credentials, password hashes                                  |
|     - sessions: Hashed session tokens with TTL indexes                            |
|     - messages: Inquiries from contact form with delivery auditing                |
|     - mediaAssets: Media metadata, URLs, dimensions, alt text                     |
|     - siteSettings: Global SEO, visibility, metadata configuration                |
+-----------------------------------------------------------------------------------+
```

## 2. Core Architectural Decisions

1. **Separation of Concerns & Defense in Depth**:
   - The browser never communicates directly with MongoDB or third-party secret APIs (Resend, Cloudinary, Gemini).
   - The Next.js frontend calls `/api/*` on its own origin. Next.js validates origin headers and forwards requests to the backend service.
   - Every admin mutation is independently authorized server-side on the backend, ensuring route tampering cannot bypass security.

2. **Zero-Flicker & Resilient Offline/Default State**:
   - The frontend includes verified, accurately structured default records matching the real profile of **Nguyễn Hoàng Huynh** and all 5 projects.
   - If MongoDB or external services are not yet connected or experiencing downtime, public visitors still experience a fully functional, complete, beautifully rendered portfolio without 500 crashes or empty broken pages.

3. **Session Authentication & Security**:
   - HttpOnly, SameSite=Strict cookies.
   - Plaintext session tokens are never stored; only SHA-256 digests are kept in MongoDB.
   - Dual-tier rate limiting for login attempts (global + per-account) and contact submissions.

4. **Extensible Storytelling Architecture**:
   - Project detail pages adhere to a 7-chapter case study format:
     - Chapter 01: Introduction & Architecture Blueprint
     - Chapter 02: The Idea & Motivation
     - Chapter 03: The Challenge & Constraints
     - Chapter 04: The Experience & Interface Breakdown
     - Chapter 05: Engineering & Technical Decisions
     - Chapter 06: My Contribution & Key Responsibilities
     - Chapter 07: Outcome & Future Roadmap
