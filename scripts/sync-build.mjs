import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const frontendNext = path.join(root, 'frontend', '.next');
const rootNext = path.join(root, '.next');

if (fs.existsSync(frontendNext)) {
  try {
    if (fs.existsSync(rootNext)) {
      fs.rmSync(rootNext, { recursive: true, force: true });
    }
    if (process.env.NETLIFY || process.env.CI) {
      fs.cpSync(frontendNext, rootNext, { recursive: true });
      console.log('✓ Copied frontend/.next to root .next for Netlify CI deployment.');
    } else {
      try {
        fs.symlinkSync(path.join('frontend', '.next'), rootNext, 'dir');
        console.log('✓ Linked frontend/.next to root .next for Netlify deployment.');
      } catch {
        fs.cpSync(frontendNext, rootNext, { recursive: true });
        console.log('✓ Copied frontend/.next to root .next for Netlify deployment.');
      }
    }
  } catch (err) {
    console.warn('Warning syncing .next directory:', err);
  }
}
