import type { ObjectId } from 'mongodb';
import type { z } from 'zod';
import type { profileSchema, projectSchema } from './validation.js';

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;

export interface Project extends ProjectInput {
  _id: ObjectId;
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
  _id: ObjectId;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  delivery: 'pending' | 'sent' | 'failed';
  createdAt: Date;
}
