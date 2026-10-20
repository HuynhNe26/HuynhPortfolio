import { backendUrl } from '@/lib/api';

export const runtime = 'nodejs';

async function proxy(request: Request, context: { params: Promise<{ path: string[]; }>; }) {
  const { path } = await context.params;
  const allowed = ['auth', 'admin', 'contact', 'projects', 'profile', 'health'];

  if (!allowed.includes(path[0]) || path.some((part) => !/^[a-zA-Z0-9-]+$/.test(part))) {
    return Response.json({
      error: 'Endpoint not found.'
    }, {
      status: 404
    });
  }

  const headers = new Headers();

  for (const key of ['content-type', 'cookie']) {
    const value = request.headers.get(key);

    if (value) {
      headers.set(key, value);
    }
  }

  // Derive and forward client origin to backend for CSRF validation
  let origin = request.headers.get('origin');
  if (!origin) {
    const referer = request.headers.get('referer');
    if (referer) {
      try {
        origin = new URL(referer).origin;
      } catch {
        // ignore
      }
    }
  }
  if (!origin) {
    const host = request.headers.get('host');
    const proto = request.headers.get('x-forwarded-proto') || 'http';
    if (host) {
      origin = `${proto}://${host}`;
    }
  }
  if (!origin && process.env.APP_URL) {
    try {
      origin = new URL(process.env.APP_URL).origin;
    } catch {
      // ignore
    }
  }
  if (!origin) {
    origin = 'http://localhost:3000';
  }

  headers.set('origin', origin);

  let body: Uint8Array | undefined;

  if (request.method !== 'GET' && request.body) {
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;

    while (true) {
      const result = await reader.read();

      if (result.done) {
        break;
      }

      size += result.value.byteLength;

      if (size > 4 * 1024 * 1024) {
        await reader.cancel();
        return Response.json({
          error: 'The submitted content is too large.'
        }, {
          status: 413
        });
      }

      chunks.push(result.value);
    }

    body = Buffer.concat(chunks);
  }

  try {
    const upstream = await fetch(`${backendUrl}/api/${path.join('/')}`, {
      method: request.method,
      headers,
      body: body as BodyInit | undefined,
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(20000),
    });
    const responseHeaders = new Headers({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    });
    const cookie = upstream.headers.get('set-cookie');

    if (cookie) {
      responseHeaders.set('set-cookie', cookie);
    }

    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch {
    return Response.json({
      error: 'The service is temporarily unavailable. Please try again later.'
    }, {
      status: 503
    });
  }
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE };
