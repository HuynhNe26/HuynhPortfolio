# NH HUYNH Developer Portfolio

A Next.js portfolio with a separate TypeScript backend, MongoDB CMS, secure admin sessions, and Resend contact notifications.

## Structure

```text
frontend/
  src/app/          Public pages, admin screens, same-origin API forwarding
  src/components/  Navigation, project cards, accessible forms, CMS editors
  src/lib/         Server API client and display types
  .env.local       Frontend configuration (ignored by Git)
backend/
  src/database.ts  MongoDB connection pool, collections, and indexes
  src/server.ts    Node.js HTTP API
  src/auth.ts      Password hashing, sessions, origin checks, rate limits
  src/models.ts    Database document types
  src/validation.ts Input schemas
  scripts/         Database setup and administrator provisioning
  tests/           Security and HTTP handler checks
  .env             Private backend configuration (ignored by Git)
docs/              Specification, checklist, progress, and database setup
```

The browser calls `/api` on the Next.js origin. Next.js forwards requests to the backend and passes HttpOnly session cookies through. Database credentials and email keys remain exclusively in the backend. Backend authorization applies to every admin endpoint, independent of frontend route guards.

## Start locally

Use Node.js 22.14+.

```sh
npm install
npm run dev
```

Open **http://localhost:3000**. The backend runs on **http://127.0.0.1:4000**. Both development processes start from the root command. You can also run them independently:

```sh
npm run dev --workspace backend
npm run dev --workspace frontend
```

Environment files have been created with empty secret fields. On a new checkout, copy `backend/.env.example` to `backend/.env` and `frontend/.env.example` to `frontend/.env.local`.

The public interface renders without MongoDB credentials. Project content displays an honest unavailable state until the database is configured. No client projects, testimonials, or performance metrics are seeded. Edit the profile defaults and add your real work through the CMS.

## Connect MongoDB

Put your connection URI in **backend/.env**, then run:

```sh
npm run db:setup
npm run admin:create
```

Before `admin:create`, set `ADMIN_EMAIL` and a unique `ADMIN_PASSWORD` with at least 14 characters in `backend/.env`. Remove the password after provisioning. Visit **http://localhost:3000/admin/login**.

See [the database setup guide](docs/DATABASE.md) for Atlas, collections, credentials, and email configuration.

## CMS

- Dashboard with project, message, and unread counts.
- Create, edit, publish, feature, and delete project stories.
- Write problem/approach/outcome sections in plain text.
- Edit biography, headline, skills, and social links.
- Review the latest 200 messages, mark read/unread, or archive.
- Projects are limited to the latest 200 records per listing.

Optional project covers use HTTPS image URLs and render directly from the image host. Keep image dimensions and file sizes appropriate for the web; images are lazy-loaded except on story headers. No upload/storage service is required.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

`npm test` exercises the actual HTTP handler in memory along with password, cookie, origin, validation, and missing-configuration behavior. It does not fake database writes or email delivery. Live MongoDB/Resend validation requires your credentials; see [progress](docs/progress.md) for actual validation results.

## Production

Set environment variables using your hosting platform. Use a production MongoDB database and verified Resend domain. Set `APP_URL` in both apps, `BACKEND_URL` in the frontend, and **NODE_ENV=production** on the backend to enable Secure cookies.

```sh
npm ci
npm run build
npm run start --workspace backend
npm run start --workspace frontend
```

Run the two start commands as separate supervised services. The backend defaults to loopback for a single-host deployment. For container/private-network deployments, explicitly configure `HOST` and firewall access. Serve the frontend over HTTPS. Set `APP_URL` to the canonical public origin for metadata and sitemap generation.

Further deployment checks: database backup/retention, real login/logout, draft visibility, complete project CRUD, contact delivery to the actual inbox, and browser checks at desktop and mobile widths.

## Browser checks

Playwright checks cover desktop/mobile layout, navigation, anonymous admin redirects, and reduced-motion behavior. Install its browser once, then run:

```sh
npx playwright install chromium
npm run test:e2e
```

The tests start both development servers. This requires an environment that permits local listeners. These browser checks are prepared but have not been verified in the restricted execution sandbox.
