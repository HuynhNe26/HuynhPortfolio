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

const { execSync } = require('node:child_process');

const port = Number(process.env.PORT) || 3000;
const hostname = '127.0.0.1';

// Automatically free port if already in use by a stale process
function freePort(p) {
  try {
    if (process.platform === 'win32') {
      const output = execSync('netstat -ano', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      const lines = output.trim().split('\n');
      for (const line of lines) {
        if ((line.includes(`:${p} `) || line.includes(`:${p}\t`)) && (line.includes('LISTENING') || line.includes('LISTEN'))) {
          const parts = line.trim().split(/\s+/);
          const pid = Number(parts[parts.length - 1]);
          if (pid && pid !== process.pid) {
            try {
              execSync(`taskkill /F /T /PID ${pid}`, { stdio: 'ignore' });
              log(`✓ Freed occupied port ${p} (terminated stale PID ${pid})`);
            } catch (_) {}
          }
        }
      }
    } else {
      try {
        const pids = execSync(`lsof -ti :${p} -sTCP:LISTEN 2>/dev/null`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
        for (const pid of pids) {
          if (Number(pid) !== process.pid) {
            try {
              process.kill(Number(pid), 'SIGKILL');
              log(`✓ Freed occupied port ${p} (terminated stale PID ${pid})`);
            } catch (_) {}
          }
        }
      } catch (_) {}
    }
  } catch (_) {}
}

freePort(port);

log(`Initializing Next.js app in ${frontendDir} on ${hostname}:${port}...`);
const app = next({ dev: true, hostname, port, dir: frontendDir });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  log('✓ Next.js prepare completed!');
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      log(`⚠️  Port ${port} was busy. Re-clearing and restarting...`);
      freePort(port);
      setTimeout(() => {
        server.close();
        server.listen(port, hostname, () => {
          log(`\n🚀 Next.js Portfolio Ready! Serving at: http://${hostname}:${port}\n`);
        });
      }, 500);
    } else {
      console.error('Server error:', err);
    }
  });

  server.listen(port, hostname, () => {
    log(`\n🚀 Next.js Portfolio Ready! Serving at: http://${hostname}:${port}\n`);
  });
}).catch(err => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
