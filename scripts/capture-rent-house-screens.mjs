import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../frontend/public/projects');

async function capture() {
  console.log('Launching browser to capture Rent House actual screens...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop Context
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  const page = await context.newPage();

  console.log('1. Capturing rent-house-hero.png (Landing Page & Catalog)...');
  await page.goto('https://nhatrothanhtam.netlify.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  console.log('2. Logging into Admin Portal...');
  await page.goto('https://nhatrothanhtam.netlify.app/admin/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.fill('input[type="text"]', 'admin');
  await page.fill('input[type="password"]', 'Admin@123456');
  await page.click('button[type="submit"]');
  await page.waitForURL('**/admin/dashboard', { timeout: 15000 });
  await page.waitForTimeout(1500);

  console.log('3. Capturing rent-house-admin-dashboard.png...');
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-admin-dashboard.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  console.log('4. Capturing rent-house-ai-meters.png (AI OCR Meter Readings & Human-in-the-loop)...');
  await page.goto('https://nhatrothanhtam.netlify.app/admin/meters', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-ai-meters.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  console.log('5. Capturing rent-house-billing.png (Automated Billing & Dispatch)...');
  await page.goto('https://nhatrothanhtam.netlify.app/admin/bills', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-billing.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  console.log('6. Capturing rent-house-contracts.png (Electronic Contracts & SHA-256 Hash)...');
  await page.goto('https://nhatrothanhtam.netlify.app/admin/contracts', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-contracts.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  console.log('7. Capturing rent-house-tenant-portal.png (High-Contrast Tenant Dashboard)...');
  await page.goto('https://nhatrothanhtam.netlify.app/tenant/home?demo=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-tenant-portal.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  console.log('8. Capturing rent-house-signing.png (HTML5 Canvas Digital Signature)...');
  await page.goto('https://nhatrothanhtam.netlify.app/tenant/contract?demo=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-signing.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  await context.close();

  // 9. Mobile Context for App & Liquid Glass Dock
  console.log('9. Capturing rent-house-mobile.png (Mobile Card UI & Liquid Glass Dock)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 412, height: 915 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('https://nhatrothanhtam.netlify.app/tenant/home?demo=1', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({
    path: path.join(outputDir, 'rent-house-mobile.png'),
  });
  await mobileContext.close();

  console.log('ALL RENT HOUSE REAL SCREENSHOTS CAPTURED SUCCESSFULLY!');
  await browser.close();
}

capture().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
