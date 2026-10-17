import 'server-only';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { Profile, Project } from './types';
import { defaultProfile, defaultProjects } from './types';

export const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:4000';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

let backendOfflineUntil = 0;

export async function api<T>(path: string, authenticated = false): Promise<T> {
  const headers: Record<string, string> = {};

  if (authenticated) {
    headers.Cookie = (await cookies()).toString();
  }

  // Fast circuit breaker: if backend was recently confirmed unreachable, fail instantly for public SSR reads
  if (!authenticated && Date.now() < backendOfflineUntil) {
    throw new ApiError(503, 'The content service is temporarily offline.');
  }

  let response: Response;

  try {
    response = await fetch(`${backendUrl}/api${path}`, {
      headers,
      cache: 'no-store',
      signal: AbortSignal.timeout(authenticated ? 3000 : 350),
    });
    // On success, reset offline circuit
    backendOfflineUntil = 0;
  } catch {
    if (!authenticated) {
      // Mark offline for 10 seconds to protect SSR and link-prefetching from queuing
      backendOfflineUntil = Date.now() + 10000;
    }
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

  const projects =
    projectsResult.status === 'fulfilled' && projectsResult.value && projectsResult.value.length > 0
      ? projectsResult.value
      : defaultProjects;

  const profile =
    profileResult.status === 'fulfilled' && profileResult.value ? profileResult.value : defaultProfile;

  return {
    profile,
    projects,
    unavailable: false,
  };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const fallback = defaultProjects.find((p) => p.slug === slug);
  try {
    const fetched = await api<Project>(`/projects/${encodeURIComponent(slug)}`);
    if (fetched) {
      return {
        ...fallback,
        ...fetched,
        gallery: fetched.gallery && fetched.gallery.length > 0 ? fetched.gallery : fallback?.gallery,
        features: fetched.features && fetched.features.length > 0 ? fetched.features : fallback?.features,
        chapters: fetched.chapters && fetched.chapters.length > 0 ? fetched.chapters : fallback?.chapters,
      };
    }
  } catch {
    // Graceful fallback to verified project registry
  }

  return fallback || null;
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
