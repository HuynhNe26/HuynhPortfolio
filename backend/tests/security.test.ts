import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { IncomingMessage, ServerResponse } from 'node:http';
import { Socket } from 'node:net';
import { Writable } from 'node:stream';
import { assertOrigin, digest, hashPassword, sessionCookie, verifyPassword } from '../src/auth.js';
import { closeDatabase } from '../src/database.js';
import { handleRequest, server } from '../src/server.js';
import { contactSchema, projectSchema } from '../src/validation.js';

const base = 'http://localhost';

before(() => {
  delete process.env.DATABASE_URL;
  delete process.env.POSTGRES_URL;
  delete process.env.MONGODB_URI;
  process.env.APP_URL = 'http://localhost:3000';
});

after(async () => {
  server.close();
  await closeDatabase();
});

// Exercise real Node request/response objects in memory; no network listener
// is required in a sandbox. No database or delivery success is mocked.
async function request(url: string, init: RequestInit = {}) {
  const incoming = new IncomingMessage(new Socket());
  incoming.url = new URL(url).pathname;
  incoming.method = init.method || 'GET';
  incoming.headers = Object.fromEntries(new Headers(init.headers).entries());
  incoming.push(init.body ? Buffer.from(String(init.body)) : null);
  if (init.body) {
    incoming.push(null);
  }
  const outgoing = new ServerResponse(incoming);
  outgoing.useChunkedEncodingByDefault = false;
  const chunks: Buffer[] = [];
  const sink = new Writable({
    write(chunk, _encoding, callback) {
      chunks.push(Buffer.from(chunk));
      callback();
    },
  });
  outgoing.assignSocket(sink as unknown as Socket);
  const finished = new Promise<void>((resolve) => outgoing.on('finish', resolve));
  await handleRequest(incoming, outgoing);
  await finished;
  const raw = Buffer.concat(chunks).toString();
  return {
    status: outgoing.statusCode,
    json: async () => JSON.parse(raw.slice(raw.indexOf('\r\n\r\n') + 4)),
  };
}

test('scrypt passwords use different salts and reject incorrect passwords', async () => {
  const password = 'a long unique test password';
  const first = await hashPassword(password);
  const second = await hashPassword(password);
  assert.notEqual(first, second);
  assert.equal(await verifyPassword(password, first), true);
  assert.equal(await verifyPassword('wrong password', first), false);
  assert.equal(await verifyPassword(password, 'malformed'), false);
  assert.equal(digest('session-token').length, 64);
});

test('session cookies are HttpOnly, strict same-site, secure in production, and can expire', () => {
  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  const cookie = sessionCookie('token');
  assert.match(cookie, /HttpOnly/);
  assert.match(cookie, /SameSite=Strict/);
  assert.match(cookie, /Secure/);
  assert.match(sessionCookie('', true), /Max-Age=0/);
  if (previous === undefined) {
    delete process.env.NODE_ENV;
  } else {
    process.env.NODE_ENV = previous;
  }
});

test('origin checks reject absent and hostile origins', () => {
  assert.doesNotThrow(() => assertOrigin('http://localhost:3000'));
  assert.throws(() => assertOrigin('https://attacker.example'));
  assert.throws(() => assertOrigin(undefined));
});

test('contact validation rejects honeypots and oversized messages', () => {
  const input = {
    name: 'Visitor',
    email: 'visitor@example.com',
    message: 'A thoughtful project enquiry.'
  };
  assert.equal(contactSchema.safeParse(input).success, true);
  assert.equal(contactSchema.safeParse({
    ...input,
    website: 'spam'
  }).success, false);
  assert.equal(contactSchema.safeParse({
    ...input,
    message: 'x'.repeat(5001)
  }).success, false);
});

test('project URLs reject scripts, insecure URLs and credentials', () => {
  const input = {
    title: 'Test project',
    slug: 'test-project',
    summary: 'A test project summary.',
    category: 'Website',
    role: 'Developer',
    year: 2026,
    technologies: ['TypeScript'],
    problem: 'A sufficiently descriptive problem.',
    approach: 'A sufficiently descriptive approach.',
    outcome: 'A sufficiently descriptive outcome.',
    coverUrl: '',
    liveUrl: '',
    sourceUrl: '',
    featured: false,
    published: false,
  };
  assert.equal(projectSchema.safeParse(input).success, true);
  for (const liveUrl of ['javascript:alert(1)', 'http://example.com', 'https://user:pass@example.com']) {
    assert.equal(projectSchema.safeParse({
      ...input,
      liveUrl
    }).success, false);
  }
  assert.equal(projectSchema.safeParse({
    ...input,
    slug: '../private'
  }).success, false);
  assert.equal(projectSchema.safeParse({
    ...input,
    $set: {}
  }).success, false);
});

test('API remains available without PostgreSQL and clearly rejects data requests', async () => {
  assert.equal((await request(`${base}/api/health`)).status, 200);
  const response = await request(`${base}/api/projects`);
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'DATABASE_NOT_CONFIGURED');
});

test('private data and mutations cannot be accessed anonymously', async () => {
  assert.equal((await request(`${base}/api/admin/projects`)).status, 401);
  assert.equal((await request(`${base}/api/admin/messages`)).status, 401);
  const response = await request(`${base}/api/admin/projects`, {
    method: 'POST',
    headers: {
      Origin: 'http://localhost:3000',
      'Content-Type': 'application/json'
    },
    body: '{}',
  });
  assert.equal(response.status, 401);
});

test('HTTP layer rejects cross-origin login and malformed JSON', async () => {
  const hostile = await request(`${base}/api/auth/login`, {
    method: 'POST',
    headers: {
      Origin: 'https://attacker.example',
      'Content-Type': 'application/json'
    },
    body: '{}',
  });
  assert.equal(hostile.status, 403);
  const malformed = await request(`${base}/api/contact`, {
    method: 'POST',
    headers: {
      Origin: 'http://localhost:3000',
      'Content-Type': 'application/json'
    },
    body: '{broken',
  });
  assert.equal(malformed.status, 400);
});

test('contact does not claim delivery without configured credentials', async () => {
  delete process.env.RESEND_API_KEY;
  const response = await request(`${base}/api/contact`, {
    method: 'POST',
    headers: {
      Origin: 'http://localhost:3000',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Visitor',
      email: 'visitor@example.com',
      message: 'A thoughtful project enquiry.'
    }),
  });
  assert.equal(response.status, 503);
});
