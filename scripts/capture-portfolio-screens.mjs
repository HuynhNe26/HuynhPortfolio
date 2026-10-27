import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../frontend/public/projects');

async function capture() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  const page = await context.newPage();

  console.log('1. Capturing portfolio-hero.png...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(outputDir, 'portfolio-hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });

  console.log('2. Capturing portfolio-projects.png...');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(outputDir, 'portfolio-projects.png'),
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });

  console.log('3. Capturing portfolio-bento.png (Skills & Education)...');
  await page.evaluate(() => {
    const el = document.getElementById('skills');
    if (el) el.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(outputDir, 'portfolio-bento.png'),
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });

  console.log('4. Capturing portfolio-scrollytelling.png...');
  await page.goto('http://localhost:3000/projects/ticket-concert-agentic-rag', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    window.scrollTo(0, 950);
  });
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(outputDir, 'portfolio-scrollytelling.png'),
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });

  console.log('5. Capturing portfolio-themes.png...');
  await page.goto('http://localhost:3000/projects/examplatform-ai', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.evaluate(() => {
    window.scrollTo(0, 950);
  });
  await page.waitForTimeout(700);
  await page.screenshot({
    path: path.join(outputDir, 'portfolio-themes.png'),
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });

  console.log('6. Capturing portfolio-admin.png...');
  await page.goto('http://localhost:3000/admin', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(outputDir, 'portfolio-admin.png'),
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });

  console.log('7. Capturing portfolio-about.png...');
  await page.goto('http://localhost:3000/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(outputDir, 'portfolio-about.png'),
    clip: { x: 0, y: 0, width: 1440, height: 860 },
  });

  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
  await browser.close();
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
