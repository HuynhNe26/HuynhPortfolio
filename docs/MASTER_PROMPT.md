# NH HUYNH Developer Portfolio

This specification is derived from the user's original instructions, with permission to create the checklist.

## Product
Build a complete, responsive developer portfolio for NH HUYNH with Next.js App Router, TypeScript, MongoDB, and Resend. Use Apple-inspired typography, generous spacing, restrained color, subtle motion, semantic HTML, keyboard access, and reduced-motion support.

## Public experience
- Home: introduction, capabilities, selected published projects, about, and contact CTA.
- Projects index and individual storytelling pages: overview, problem, approach, outcome, technology, role, and optional external links.
- Contact form with server validation, abuse protection, durable message storage, and real Resend delivery.
- SEO metadata, sitemap, robots, error/loading/not-found states.
- No invented client work, metrics, credentials, or testimonials. Empty project collections have an honest empty state. Owner can publish real content in CMS.

## Admin CMS
Single administrator, provisioned with a CLI; no public signup. Passwords hashed with scrypt. Random, hashed database-backed sessions in HttpOnly, SameSite cookies, Secure in production. Expiration, logout revocation, request-origin checks, and durable login rate limits. Check authorization on each protected read and mutation.
Dashboard with project/message counts, project CRUD and draft/published/featured controls, profile editing, and contact inbox with read/archive status. Validate all inputs and prevent unsafe URLs and raw HTML injection.

## Engineering
Use environment variables for secrets; supply .env.example. Cache database connections, initialize indexes, validate data at boundaries, and handle configuration/connection errors explicitly. No mock APIs or simulated email success. Complete tasks sequentially; update docs/tasks.md and docs/progress.md after each task. Run lint, type checks, production builds at milestones; fix failures. Add meaningful security/integration tests and document setup/deployment. Missing external credentials must not block local implementation; clearly distinguish local checks from live service validation.

## Scope assumptions
Use system fonts and original CSS artwork; no stock project imagery or fabricated biography. CMS profile controls headline, biography, contact links, and skills. Project cover images are optional HTTPS URLs. Deploy to a Node.js host with HTTPS, MongoDB, and a verified Resend sending domain. Actual hosting and live credentials are external setup steps.

## Approved architecture update
The user requested separate frontend and backend folders. Use npm workspaces: `frontend/` contains Next.js UI and a same-origin API forwarding route; `backend/` contains the standalone TypeScript Node.js API, MongoDB, auth, and Resend. Keep backend secrets in `backend/.env` and frontend configuration in `frontend/.env.local`. Format statements, JSX elements, and object properties on separate lines for readability. Implement the interface and database files without waiting for MongoDB credentials.
