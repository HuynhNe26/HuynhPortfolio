import { spawn, execSync } from 'node:child_process';

const isWin = process.platform === 'win32';

function freePort(port) {
  try {
    if (isWin) {
      const output = execSync('netstat -ano', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      for (const line of output.split('\n')) {
        if ((line.includes(`:${port} `) || line.includes(`:${port}\t`)) && (line.includes('LISTENING') || line.includes('LISTEN'))) {
          const parts = line.trim().split(/\s+/);
          const pid = Number(parts[parts.length - 1]);
          if (pid && pid !== process.pid) {
            try {
              execSync(`taskkill /F /T /PID ${pid}`, { stdio: 'ignore' });
            } catch (_) {}
          }
        }
      }
    } else {
      try {
        const pids = execSync(`lsof -ti :${port} -sTCP:LISTEN 2>/dev/null`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
        for (const pid of pids) {
          if (Number(pid) !== process.pid) {
            try {
              process.kill(Number(pid), 'SIGKILL');
            } catch (_) {}
          }
        }
      } catch (_) {}
    }
  } catch (_) {}
}

// Clean ports 3000 and 4000 before start
freePort(3000);
freePort(4000);

const backend = spawn('npm', ['run', 'dev', '--workspace', 'backend'], {
  stdio: 'inherit',
  shell: isWin,
});

const frontend = spawn('npm', ['run', 'dev', '--workspace', 'frontend'], {
  stdio: 'inherit',
  shell: isWin,
});

function killTree(child) {
  if (!child || !child.pid) return;
  try {
    if (isWin) {
      execSync(`taskkill /F /T /PID ${child.pid} 2>nul`);
    } else {
      child.kill('SIGTERM');
    }
  } catch (_) {
    try {
      child.kill('SIGTERM');
    } catch (_) {}
  }
}

function stop() {
  killTree(backend);
  killTree(frontend);
  freePort(3000);
  freePort(4000);
}

process.on('SIGINT', () => {
  stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stop();
  process.exit(0);
});

process.on('exit', () => {
  stop();
});

backend.on('exit', (code) => {
  if (code && code !== 0) {
    console.warn('\n⚠️  [backend] Backend process exited (likely waiting for DATABASE_URL). Frontend continues running on http://127.0.0.1:3000\n');
  }
});

frontend.on('exit', (code) => {
  if (code && code !== 0) {
    process.exitCode = code;
  }
  killTree(backend);
});
