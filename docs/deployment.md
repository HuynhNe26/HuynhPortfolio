# Deployment Guide — Vercel, MongoDB Atlas & Resend

## 1. Prerequisites
- GitHub Repository connected: `https://github.com/HuynhNe26/HuynhPortfolio.git`
- MongoDB Atlas M0 (Free) or Serverless Cluster
- Resend Account with verified sending domain
- Cloudinary Account (Free tier)

---

## 2. Environment Variables Matrix

### Frontend (Vercel Project Settings)
```dotenv
BACKEND_URL=https://your-backend-service.app # Or internal URL if deploying unified
APP_URL=https://huynhportfolio.com # Public production URL
```

### Backend (Server / Container / Serverless)
```dotenv
NODE_ENV=production
PORT=4000
HOST=0.0.0.0
APP_URL=https://huynhportfolio.com
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nh_huynh?retryWrites=true&w=majority
MONGODB_DB=nh_huynh
RESEND_API_KEY=re_123456789
CONTACT_FROM=contact@yourverifieddomain.com
CONTACT_TO=nguyenhoanghuynh.vn@gmail.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
# Optional AI Vision for Screenshot Storytelling
AI_API_KEY=
```

---

## 3. Database Initialization & Admin Provisioning

Once `MONGODB_URI` is populated:
```bash
# Initialize indexes and default verified portfolio content
npm run db:setup
npm run db:seed

# Provision administrator account (one-time)
ADMIN_EMAIL=nguyenhoanghuynh.vn@gmail.com ADMIN_PASSWORD=your_secure_password_14_chars npm run admin:create
```

---

## 4. Production Checklist

- [x] HTTPS enforced with secure cookies (`SameSite=Strict`, `Secure=true`).
- [x] Passwords hashed using salted scrypt with memory-hard parameters.
- [x] Session tokens stored as cryptographic SHA-256 hashes only.
- [x] NoSQL injection and XSS defenses active.
- [x] Rate limiting on contact form and login endpoints.
- [x] Canonical tags, Open Graph, Twitter Cards, `robots.txt`, and `sitemap.xml` active.
