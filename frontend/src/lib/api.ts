import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Profile, Project } from './types';
import { defaultProfile } from './types';

export const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:4000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function api<T>(path: string, authenticated = false): Promise<T> {
  const headers: Record<string, string> = {};

  if (authenticated) {
    headers.Cookie = (await cookies()).toString();
  }

  let response: Response;

  try {
    response = await fetch(`${backendUrl}/api${path}`, {
      headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(7000),
    });
  } catch {
    throw new ApiError(503, 'The content service is unavailable.');
  }

  if (!response.ok) {
    throw new ApiError(response.status, 'Unable to load this content.');
  }

  return response.json() as Promise<T>;
}

export async function publicContent() {
  const [profileResult, projectsResult] = await Promise.allSettled([
    api<Profile | null>('/profile'),
    api<Project[]>('/projects'),
  ]);

  return {
    profile: profileResult.status === 'fulfilled' && profileResult.value ? profileResult.value : defaultProfile,
    projects: projectsResult.status === 'fulfilled' ? projectsResult.value : [],
    unavailable: projectsResult.status === 'rejected',
  };
}

export async function requireAdmin(): Promise<void> {
  try {
    await api('/auth/session', true);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect('/admin/login');
    }

    throw error;
  }
}
