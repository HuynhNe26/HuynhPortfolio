# Implementation checklist

User-approved adjustment: split the frontend and backend, format code on separate lines, and build the interface/database integration before credentials are supplied.

- [x] T01 — Establish specification, Next.js/TypeScript foundation, scripts, and environment templates. Split into frontend/backend workspaces. Baseline production build passed.
- [x] T02 — Implement MongoDB connection, indexes, typed models, validation, and repository layer. Backend typecheck passed. Live connection awaits MONGODB_URI.
- [x] T03 — Implement admin provisioning, secure session authentication, origin protection, and database-backed rate limits. Security verification tracked in T08.
- [x] T04 — Build responsive public portfolio, project index, and storytelling pages. Production route compilation passed; live browser review still pending environment support.
- [x] T05 — Build authenticated admin dashboard, project CRUD, profile CMS, and inbox. Real database persistence requires supplied credentials.
- [x] T06 — Implement validated contact form, durable storage, and Resend delivery. Actual delivery awaits credentials and verified sender.
- [x] T07 — Add SEO, accessible forms, reduced motion, loading/error states, and security headers.
- [ ] T08 — Complete final security/HTTP checks, lint, typecheck, production build, and deployment documentation. Local checks in progress; external verification requires credentials.
