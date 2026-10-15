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

  for (const key of ['content-type', 'cookie', 'origin']) {
    const value = request.headers.get(key);

    if (value) {
      headers.set(key, value);
    }
  }

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

      if (size > 64 * 1024) {
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
