import { spawn } from 'node:child_process';

const isWin = process.platform === 'win32';

const backend = spawn('npm', ['run', 'dev', '--workspace', 'backend'], {
  stdio: 'inherit',
  shell: isWin,
});

const frontend = spawn('npm', ['run', 'dev', '--workspace', 'frontend'], {
  stdio: 'inherit',
  shell: isWin,
});

function stop() {
  backend.kill('SIGTERM');
  frontend.kill('SIGTERM');
}

process.on('SIGINT', () => {
  stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  stop();
  process.exit(0);
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
  backend.kill('SIGTERM');
});
