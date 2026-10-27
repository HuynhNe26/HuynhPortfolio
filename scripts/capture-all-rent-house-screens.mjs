import { chromium } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../frontend/public/projects');

async function captureAll() {
  console.log('Launching Edge browser to capture all comprehensive Rent House screens...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop Context
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  const page = await context.newPage();

  console.log('Logging into Admin Portal...');
  await page.goto('https://nhatrothanhtam.netlify.app/admin/login', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  try {
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'Admin@123456');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/dashboard', { timeout: 15000 });
  } catch (e) {
    console.log('Already logged in or redirect:', e.message);
  }
  await page.waitForTimeout(1000);

  // 1. Admin Rooms
  console.log('Capturing rent-house-admin-rooms.png...');
  await page.goto('https://nhatrothanhtam.netlify.app/admin/rooms', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-admin-rooms.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  // 2. Admin Tenants
  console.log('Capturing rent-house-admin-tenants.png...');
  await page.goto('https://nhatrothanhtam.netlify.app/admin/tenants', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-admin-tenants.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  // 3. Admin Notifications
  console.log('Capturing rent-house-admin-notifications.png...');
  try {
    await page.goto('https://nhatrothanhtam.netlify.app/admin/notifications', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(outputDir, 'rent-house-admin-notifications.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (err) {
    console.log('Notifications skip:', err.message);
  }

  // 4. Admin Audit
  console.log('Capturing rent-house-admin-audit.png...');
  try {
    await page.goto('https://nhatrothanhtam.netlify.app/admin/audit', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(outputDir, 'rent-house-admin-audit.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (err) {
    console.log('Audit skip:', err.message);
  }

  // 5. Tenant Electricity
  console.log('Capturing rent-house-tenant-electricity.png...');
  await page.goto('https://nhatrothanhtam.netlify.app/tenant/electricity?demo=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-tenant-electricity.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  // 6. Tenant Water
  console.log('Capturing rent-house-tenant-water.png...');
  await page.goto('https://nhatrothanhtam.netlify.app/tenant/water?demo=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-tenant-water.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  // 7. Tenant History
  console.log('Capturing rent-house-tenant-history.png...');
  await page.goto('https://nhatrothanhtam.netlify.app/tenant/history?demo=1', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outputDir, 'rent-house-tenant-history.png'),
    clip: { x: 0, y: 0, width: 1440, height: 880 },
  });

  await context.close();

  // 8. Tablet Context (iPad Pro 1024x768)
  console.log('Capturing rent-house-tablet-responsive.png...');
  const tabletContext = await browser.newContext({
    viewport: { width: 1024, height: 768 },
    deviceScaleFactor: 2,
    hasTouch: true,
  });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto('https://nhatrothanhtam.netlify.app/', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(1500);
  await tabletPage.screenshot({
    path: path.join(outputDir, 'rent-house-tablet-responsive.png'),
    clip: { x: 0, y: 0, width: 1024, height: 768 },
  });
  await tabletContext.close();

  // 9. Mobile Context (iPhone 14 Pro 393x852) - Electricity & Water
  console.log('Capturing rent-house-mobile-utility.png...');
  const mobileContext = await browser.newContext({
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto('https://nhatrothanhtam.netlify.app/tenant/electricity?demo=1', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({
    path: path.join(outputDir, 'rent-house-mobile-utility.png'),
  });

  // 10. Mobile Context - Digital Signature & Contract
  console.log('Capturing rent-house-mobile-contract.png...');
  await mobilePage.goto('https://nhatrothanhtam.netlify.app/tenant/contract?demo=1', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1500);
  await mobilePage.screenshot({
    path: path.join(outputDir, 'rent-house-mobile-contract.png'),
  });

  await mobileContext.close();

  console.log('ALL EXPANDED REAL SCREENSHOTS CAPTURED SUCCESSFULLY!');
  await browser.close();
}

captureAll().catch((err) => {
  console.error('Capture error:', err);
  process.exit(1);
});
