import { z } from 'zod';

const text = (minimum: number, maximum: number) => {
  return z.string().trim().min(minimum).max(maximum);
};

const safeUrl = z.union([
  z.literal(''),
  z.string().regex(/^\/[a-zA-Z0-9_\-\./]+$/, 'Root-relative path starting with /'),
  z.string().url().max(2048).refine((value) => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' && !url.username && !url.password;
    } catch {
      return false;
    }
  }, 'Use an HTTPS URL without embedded credentials.'),
]);

export const screenshotSchema = z.object({
  url: safeUrl,
  caption: text(1, 200),
  description: text(0, 1000).optional(),
  alt: text(0, 200).optional(),
});

export const chapterSchema = z.object({
  id: text(1, 100),
  number: text(1, 20),
  title: text(1, 200),
  content: text(1, 100000),
  screenshots: z.array(screenshotSchema).optional(),
  technicalNotes: z.array(text(1, 1000)).optional(),
});

export const featureSchema = z.object({
  id: text(1, 100).optional(),
  title: text(1, 200),
  description: text(1, 10000),
  category: text(0, 100).optional(),
  screenshotUrl: safeUrl.optional(),
  screenshotAlt: text(0, 200).optional(),
});

export const projectSchema = z.object({
  title: text(2, 200),
  slug: text(2, 120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens.'),
  summary: text(10, 2000),
  category: text(2, 100),
  role: text(2, 150),
  teamSize: z.number().int().min(1).max(500).optional(),
  timeline: text(0, 150).optional(),
  status: z.enum(['Completed', 'Ongoing']).optional(),
  year: z.number().int().min(1990).max(2100),
  technologies: z.array(text(1, 100)).min(1).max(100),
  themeColor: text(0, 50).optional(),
  themeBg: text(0, 50).optional(),
  problem: text(10, 50000),
  approach: text(10, 50000),
  outcome: text(10, 50000),
  coverUrl: safeUrl.optional(),
  liveUrl: safeUrl.optional(),
  sourceUrl: safeUrl.optional(),
  reportUrl: safeUrl.optional(),
  featured: z.boolean(),
  published: z.boolean(),
  order: z.number().int().optional(),
  storytellingStyle: text(0, 100).optional(),
  chapters: z.array(chapterSchema).optional(),
  features: z.array(featureSchema).optional(),
  gallery: z.array(screenshotSchema).optional(),
}).strict();

export const educationItemSchema = z.object({
  institution: text(2, 150),
  major: text(2, 100),
  degree: text(2, 150),
  period: text(2, 50),
  gpa: text(1, 20),
  note: text(0, 300).optional(),
});

export const certificateItemSchema = z.object({
  name: text(2, 150),
  issuer: text(2, 100),
  score: text(1, 50),
  issueDate: text(2, 50),
  verificationUrl: safeUrl.optional(),
});

export const categorizedSkillsSchema = z.object({
  frontend: z.array(text(1, 50)),
  backend: z.array(text(1, 50)),
  databases: z.array(text(1, 50)),
  apis: z.array(text(1, 50)),
  tools: z.array(text(1, 50)),
});

export const profileSchema = z.object({
  name: text(2, 100),
  title: text(2, 120).optional(),
  headline: text(5, 200),
  introduction: text(10, 1000),
  biography: text(20, 6000),
  dateOfBirth: text(0, 50).optional(),
  hometown: text(0, 100).optional(),
  email: z.string().email().max(254).optional(),
  phone: text(0, 50).optional(),
  location: text(0, 100).optional(),
  availability: text(0, 150).optional(),
  skills: z.array(text(1, 50)).max(50),
  skillsCategorized: categorizedSkillsSchema.optional(),
  education: z.array(educationItemSchema).optional(),
  certificates: z.array(certificateItemSchema).optional(),
  avatarUrl: safeUrl.optional(),
  resumeUrl: safeUrl.optional(),
  githubUrl: safeUrl.optional(),
  linkedinUrl: safeUrl.optional(),
});

export const loginSchema = z.object({
  email: z.string().email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(256),
}).strict();

export const contactSchema = z.object({
  name: text(2, 100),
  email: z.string().email().max(254),
  message: text(10, 5000),
  website: z.string().max(0, 'Unable to accept this submission.').optional(),
}).strict();

export const messageStatusSchema = z.object({
  status: z.enum(['unread', 'read', 'archived']),
}).strict();

export const siteSettingsSchema = z.object({
  siteTitle: text(2, 150),
  seoDescription: text(10, 300),
  canonicalUrl: safeUrl.optional(),
  contactEmail: z.string().email().optional(),
  publicVisibility: z.boolean(),
});
