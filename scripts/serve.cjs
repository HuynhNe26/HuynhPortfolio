process.env.NEXT_TELEMETRY_DISABLED = '1';

const http = require('node:http');
const fs = require('node:fs');
const next = require('next');

function log(msg) {
  process.stdout.write(msg + '\n');
}

const frontendDir = fs.existsSync('./frontend') ? './frontend' : '.';

// Remove stale dev lock if exists
try {
  const lock = `${frontendDir}/.next/dev/lock`;
  if (fs.existsSync(lock)) {
    fs.rmSync(lock, { force: true });
    log('Cleared stale .next/dev/lock');
  }
} catch (_) {}

const port = Number(process.env.PORT) || 3000;
const hostname = '127.0.0.1';

log(`Initializing Next.js app in ${frontendDir} on ${hostname}:${port}...`);
const app = next({ dev: true, hostname, port, dir: frontendDir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  log('✓ Next.js prepare completed!');
  const server = http.createServer((req, res) => {
    handle(req, res);
  });
  server.listen(port, hostname, () => {
    log(`\n🚀 Next.js Portfolio Ready! Serving at: http://${hostname}:${port}\n`);
  });
}).catch(err => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
