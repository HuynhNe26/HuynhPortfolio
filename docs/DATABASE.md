# MongoDB setup

MongoDB uses a **connection string**, not a MongoDB Atlas management API key.

1. Create or select your MongoDB Atlas cluster.
2. Create a database user with read/write access to the `nh_huynh` database.
3. Allow your backend host's outbound IP in Atlas Network Access.
4. In Atlas, choose **Connect → Drivers → Node.js** and copy the connection string.
5. Paste it into `backend/.env`:

```dotenv
MONGODB_URI=mongodb+srv://USERNAME:URL_ENCODED_PASSWORD@YOUR_CLUSTER/nh_huynh?retryWrites=true&w=majority
MONGODB_DB=nh_huynh
APP_URL=http://localhost:3000
```

Replace the uppercase values with your own values. URL-encode special characters in the password. Never paste database credentials into frontend files, `NEXT_PUBLIC_*` variables, or version control.

Run from the repository root:

```sh
npm run db:setup
```

The database connection is implemented in `backend/src/database.ts`. It creates a reusable connection pool, retries after failed connections, and initializes indexes. MongoDB creates collections as data is first saved.

## Collections

| Collection | Purpose | Indexes |
| --- | --- | --- |
| projects | Draft and published project stories | Unique slug; publication/featured/date |
| profiles | Single owner profile | `_id: owner` |
| admins | Single admin and scrypt password hash | `_id: owner` |
| sessions | Hashed random session tokens | Expiry TTL |
| rateLimits | Shared request counters | Expiry TTL |
| messages | Contact inbox and notification status | Creation date |

Sessions are checked against their expiration on every request; TTL deletion is only cleanup. Login and contact limits use database-backed fixed windows shared across API processes. Global limits deliberately do not trust client-supplied IP headers.

## Provision the administrator

Set these temporarily in `backend/.env`:

```dotenv
ADMIN_EMAIL=your-address@example.com
ADMIN_PASSWORD=YOUR_UNIQUE_PASSWORD_OF_AT_LEAST_14_CHARACTERS
```

Run:

```sh
npm run admin:create
```

Remove `ADMIN_PASSWORD` afterward. Existing administrators are never overwritten. Open `/admin/login` to sign in. There is no public registration endpoint.

## Email

Set `RESEND_API_KEY`, `CONTACT_FROM` (a sender on your verified domain), and `CONTACT_TO` (your private inbox) in `backend/.env`. Contact messages are stored before notification delivery. A failed email notification remains visible in the admin inbox with `delivery: failed`; the visitor receives an explicit saved-but-delayed response. There is no automatic notification retry worker; the inbox remains the durable source of messages.

## Before deployment

Use HTTPS, set `NODE_ENV=production`, and set `APP_URL` to the exact public origin in both apps. Keep the API bound to loopback when running on the same host as Next.js. For separate hosts, configure `BACKEND_URL` to a private network endpoint and use transport security. Restrict database network access to the backend host. Apply your backup and retention policies to inbox data.
