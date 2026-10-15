import type { z } from 'zod';
import type {
  certificateItemSchema,
  chapterSchema,
  educationItemSchema,
  profileSchema,
  projectSchema,
  siteSettingsSchema,
} from './validation.js';

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ChapterInput = z.infer<typeof chapterSchema>;
export type EducationInput = z.infer<typeof educationItemSchema>;
export type CertificateInput = z.infer<typeof certificateItemSchema>;
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;

export interface Project extends ProjectInput {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile extends ProfileInput {
  _id: 'owner';
  updatedAt: Date;
}

export interface Admin {
  _id: 'owner';
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export interface Session {
  _id: string;
  adminId: 'owner';
  expiresAt: Date;
}

export interface RateLimit {
  _id: string;
  count: number;
  expiresAt: Date;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  delivery: 'pending' | 'sent' | 'failed';
  createdAt: Date;
}

export interface MediaAsset {
  _id: string;
  url: string;
  filename: string;
  publicId?: string;
  altText: string;
  format?: string;
  width?: number;
  height?: number;
  bytes?: number;
  createdAt: Date;
}

export interface SiteSettings extends SiteSettingsInput {
  _id: 'settings';
  updatedAt: Date;
}
