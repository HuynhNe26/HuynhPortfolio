import { z } from 'zod';

const text = (minimum: number, maximum: number) => {
  return z.string().trim().min(minimum).max(maximum);
};

const safeUrl = z.union([
  z.literal(''),
  z.url().max(2048).refine((value) => {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  }, 'Use an HTTPS URL without embedded credentials.'),
]);

export const projectSchema = z.object({
  title: text(2, 100),
  slug: text(2, 100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens.'),
  summary: text(10, 400),
  category: text(2, 60),
  role: text(2, 100),
  year: z.number().int().min(2000).max(2100),
  technologies: z.array(text(1, 40)).min(1).max(20),
  problem: text(20, 8000),
  approach: text(20, 8000),
  outcome: text(20, 8000),
  coverUrl: safeUrl,
  liveUrl: safeUrl,
  sourceUrl: safeUrl,
  featured: z.boolean(),
  published: z.boolean(),
}).strict();

export const profileSchema = z.object({
  name: text(2, 80),
  headline: text(5, 160),
  introduction: text(10, 600),
  biography: text(20, 4000),
  location: text(0, 100),
  availability: text(0, 100),
  skills: z.array(text(1, 40)).max(30),
  githubUrl: safeUrl,
  linkedinUrl: safeUrl,
}).strict();

export const loginSchema = z.object({
  email: z.email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(256),
}).strict();

export const contactSchema = z.object({
  name: text(2, 100),
  email: z.email().max(254),
  message: text(20, 5000),
  website: z.string().max(0, 'Unable to accept this submission.').optional(),
}).strict();

export const messageStatusSchema = z.object({
  status: z.enum(['unread', 'read', 'archived']),
}).strict();
