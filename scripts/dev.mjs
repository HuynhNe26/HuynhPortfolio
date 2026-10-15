import { spawn } from 'node:child_process';

const processes = ['backend', 'frontend'].map((workspace) => {
  return spawn('npm', ['run', 'dev', '--workspace', workspace], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
});

function stop() {
  for (const child of processes) {
    child.kill('SIGTERM');
  }
}

process.on('SIGINT', stop);
process.on('SIGTERM', stop);

for (const child of processes) {
  child.on('exit', (code) => {
    if (code) {
      process.exitCode = code;
    }
    stop();
  });
}
