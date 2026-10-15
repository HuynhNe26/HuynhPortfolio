# API Specification — NH HUYNH Developer Portfolio

All requests to the backend are routed through the Next.js API proxy at `/api/*` or consumed directly by Server Components via `BACKEND_URL`.

## 1. Authentication Endpoints

### `POST /api/auth/login`
- **Description**: Authenticates administrator and sets secure `session` cookie.
- **Rate Limit**: 30 requests/15m globally, 8 requests/15m per email.
- **Request Body**:
  ```json
  {
    "email": "nguyenhoanghuynh.vn@gmail.com",
    "password": "string (min 14 chars)"
  }
  ```
- **Response**: `200 OK` + `Set-Cookie: session=...; HttpOnly; SameSite=Strict; Path=/`

### `POST /api/auth/logout`
- **Description**: Revokes active session and clears session cookie.
- **Response**: `200 OK` + `Set-Cookie: session=; Max-Age=0`

### `GET /api/auth/session`
- **Description**: Verifies session validity.
- **Response**: `200 OK` `{ "authenticated": true }` or `401 Unauthorized`

---

## 2. Public Content Endpoints

### `GET /api/profile`
- **Description**: Returns owner profile, education, certifications, and skills.
- **Response**: `200 OK`
  ```json
  {
    "name": "Nguyễn Hoàng Huynh",
    "headline": "Full-Stack Web Developer",
    "introduction": "...",
    "biography": "...",
    "hometown": "Đồng Nai City, Vietnam",
    "email": "nguyenhoanghuynh.vn@gmail.com",
    "phone": "+84 937 569 205",
    "education": [...],
    "certificates": [...],
    "skills": { "frontend": [...], "backend": [...], "databases": [...], "apis": [...], "tools": [...] }
  }
  ```

### `GET /api/projects`
- **Description**: Lists all published projects (sorted by featured status and date).
- **Response**: `200 OK` array of `Project` objects.

### `GET /api/projects/:slug`
- **Description**: Retrieves single project with full 7-chapter storytelling data.
- **Response**: `200 OK` `Project` object or `404 Not Found`.

### `POST /api/contact`
- **Description**: Submits contact message, stores in MongoDB, and triggers Resend notification.
- **Rate Limit**: 30 requests/1h globally, 3 requests/1h per email.
- **Request Body**:
  ```json
  {
    "name": "Recruiter Name",
    "email": "recruiter@example.com",
    "message": "We would like to invite you for an interview..."
  }
  ```
- **Response**: `201 Created` or `202 Accepted` (saved to database even if Resend is delayed).

---

## 3. Admin Protected Endpoints (`Cookie: session=...` Required)

### `GET /api/admin/dashboard`
- **Description**: Returns counts of total projects, published, drafts, and inbox messages.

### `GET /api/admin/projects` & `POST /api/admin/projects`
- **Description**: List all projects (including drafts) or create a new project.

### `GET /api/admin/projects/:id` & `PUT /api/admin/projects/:id` & `DELETE /api/admin/projects/:id`
- **Description**: Retrieve, update (with chapters & screenshots), or delete project.

### `GET /api/admin/profile` & `PUT /api/admin/profile`
- **Description**: Retrieve or update owner biography, contact, and career settings.

### `GET /api/admin/messages` & `PATCH /api/admin/messages/:id` & `DELETE /api/admin/messages/:id`
- **Description**: Review messages, mark read/unread/archived, or delete.

### `POST /api/admin/media/upload`
- **Description**: Upload media asset to Cloudinary or local storage.

### `POST /api/admin/ai/analyze-screenshot`
- **Description**: Optional AI vision inspection of uploaded screenshot with human approval workflow.
