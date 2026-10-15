# Database Architecture & Schemas — MongoDB

## 1. Connection & Index Strategy

The application interfaces with MongoDB through a cached `MongoClient` connection pool configured in `backend/src/database.ts`.

### Collections and Indexes

```javascript
// projects
db.projects.createIndex({ slug: 1 }, { unique: true });
db.projects.createIndex({ published: 1, featured: -1, order: 1, createdAt: -1 });

// profiles
// Single document keyed by _id: 'owner'

// admins
// Single administrator document keyed by _id: 'owner'

// sessions
db.sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// rateLimits
db.rateLimits.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// messages
db.messages.createIndex({ createdAt: -1 });
db.messages.createIndex({ status: 1 });

// mediaAssets
db.mediaAssets.createIndex({ createdAt: -1 });

// siteSettings
// Keyed by _id: 'settings'
```

---

## 2. Document Models

### `Project` Document
```typescript
interface ProjectChapter {
  id: string; // 'chapter-01', 'chapter-02', etc.
  number: string; // '01', '02', ...
  title: string; // 'The Idea', 'The Experience', etc.
  content: string; // Narrative text
  screenshots?: {
    url: string;
    caption: string;
    description?: string;
    alt: string;
  }[];
  technicalNotes?: string[];
}

interface Project {
  _id: ObjectId;
  title: string;
  slug: string;
  summary: string;
  category: string;
  role: string;
  teamSize?: number;
  timeline: string;
  status: 'Completed' | 'Ongoing';
  year: number;
  technologies: string[];
  themeColor: string; // Hex color for project brand
  themeBg: string; // Soft background tint
  coverUrl: string;
  liveUrl: string;
  sourceUrl: string;
  featured: boolean;
  published: boolean;
  order: number;
  // Standard 3-part legacy + 7-part storytelling
  problem: string;
  approach: string;
  outcome: string;
  chapters?: ProjectChapter[];
  createdAt: Date;
  updatedAt: Date;
}
```

### `Profile` Document
```typescript
interface Profile {
  _id: 'owner';
  name: string; // 'Nguyễn Hoàng Huynh'
  headline: string; // 'Full-Stack Web Developer'
  introduction: string;
  biography: string;
  dateOfBirth: string; // 'August 26, 2005'
  hometown: string; // 'Đồng Nai City, Vietnam'
  email: string; // 'nguyenhoanghuynh.vn@gmail.com'
  phone: string; // '+84 937 569 205'
  avatarUrl?: string;
  resumeUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  education: {
    institution: string; // 'Vietnam Aviation Academy'
    degree: string; // 'Bachelor of Information Technology'
    period: string; // '2023 – Present'
    gpa: string; // '3.1/4.0'
    status: string; // 'Third year university student'
  }[];
  certificates: {
    name: string; // 'TOEIC Listening & Reading'
    issuer: string; // 'ETS'
    score: string; // '550'
    issueDate: string; // 'October 2025'
  }[];
  skills: {
    frontend: string[];
    backend: string[];
    databases: string[];
    apis: string[];
    tools: string[];
  };
  updatedAt: Date;
}
```

---

## 3. Idempotent Seeding

The seed script (`backend/scripts/seed.ts`) populates the real verified data for Nguyễn Hoàng Huynh and the 5 projects. It uses `updateOne` with `upsert: true` and `$setOnInsert` for existing documents so it never overwrites production customizations.
