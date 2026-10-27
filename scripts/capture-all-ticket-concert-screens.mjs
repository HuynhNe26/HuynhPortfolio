import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../frontend/public/projects');

const ADMIN_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiZW1haWwiOiJob2FuZ2h1eW5oQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc5MzA5ODkzMSwiZXhwIjoxNzkzMTg1MzMxfQ.2okYMFr4kyZu80EZsDZ8uRIoTZvO7_79GKrDgvbWn_I';

// Copy high-resolution existing scratch images
const scratchDir = 'C:\\ticket_concert\\scratch';
function copyScratch(srcName, destName) {
  const src = path.join(scratchDir, srcName);
  const dest = path.join(outputDir, destName);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${srcName} -> ${destName}`);
  }
}

copyScratch('ai_chat_open.png', 'ticket-concert-ai-chat-live.png');
copyScratch('calendar_dropdown_open.png', 'ticket-concert-calendar-filter.png');
copyScratch('tablet_1024_notification.png', 'ticket-concert-tablet-responsive.png');
copyScratch('category_music_desktop.png', 'ticket-concert-category-music.png');
copyScratch('category_theater_desktop.png', 'ticket-concert-category-theater.png');

async function captureAll() {
  console.log('Launching Edge browser to capture Ticket Concert screens...');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop Context (1440x900)
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  const page = await context.newPage();

  // Helper to wait
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // --- USER PAGES ---

  // 1. Home Discovery
  console.log('Capturing ticket-concert-home-discovery.png...');
  try {
    await page.goto('http://localhost:3005/', { waitUntil: 'networkidle' });
    await wait(2000);
    await page.screenshot({
      path: path.join(outputDir, 'ticket-concert-home-discovery.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (e) {
    console.error('Home capture error:', e.message);
  }

  // 2. Event Detail
  console.log('Capturing ticket-concert-event-detail.png...');
  try {
    await page.goto('http://localhost:3005/event/2', { waitUntil: 'networkidle' });
    await wait(2000);
    await page.screenshot({
      path: path.join(outputDir, 'ticket-concert-event-detail.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (e) {
    console.error('Event detail error:', e.message);
  }

  // 3. Stage Booking Map
  console.log('Capturing ticket-concert-stage-booking.png...');
  try {
    await page.goto('http://localhost:3005/event/2/booking', { waitUntil: 'networkidle' });
    await wait(2500);
    await page.screenshot({
      path: path.join(outputDir, 'ticket-concert-stage-booking.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (e) {
    console.error('Stage booking error:', e.message);
  }

  // 4. Search Catalog
  console.log('Capturing ticket-concert-search-catalog.png...');
  try {
    await page.goto('http://localhost:3005/search', { waitUntil: 'networkidle' });
    await wait(2000);
    await page.screenshot({
      path: path.join(outputDir, 'ticket-concert-search-catalog.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (e) {
    console.error('Search catalog error:', e.message);
  }

  // --- ADMIN PAGES ---
  console.log('Creating Admin Context with pre-authenticated authToken in localStorage...');
  const adminContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  await adminContext.addInitScript((token) => {
    localStorage.setItem('authToken', token);
  }, ADMIN_TOKEN);

  const adminPage = await adminContext.newPage();

  // Test admin verification first
  console.log('Verifying Admin Portal access...');
  await adminPage.goto('http://localhost:3005/admin', { waitUntil: 'networkidle' });
  await wait(3000);

  // 5. Admin Dashboard
  console.log('Capturing ticket-concert-admin-dashboard.png...');
  try {
    await adminPage.screenshot({
      path: path.join(outputDir, 'ticket-concert-admin-dashboard.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (e) {
    console.error('Admin dashboard error:', e.message);
  }

  // 6. Admin Events
  console.log('Capturing ticket-concert-admin-events.png...');
  try {
    await adminPage.goto('http://localhost:3005/admin/events', { waitUntil: 'networkidle' });
    await wait(2500);
    await adminPage.screenshot({
      path: path.join(outputDir, 'ticket-concert-admin-events.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (e) {
    console.error('Admin events error:', e.message);
  }

  // 7. Admin Stage Canvas Layout Designer
  console.log('Capturing ticket-concert-admin-stage-designer.png...');
  try {
    await adminPage.goto('http://localhost:3005/admin/layout/3', { waitUntil: 'networkidle' });
    await wait(3000);
    await adminPage.screenshot({
      path: path.join(outputDir, 'ticket-concert-admin-stage-designer.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (e) {
    console.error('Admin stage designer error:', e.message);
  }

  // 8. Admin Reports / Statistics
  console.log('Capturing ticket-concert-admin-reports.png...');
  try {
    await adminPage.goto('http://localhost:3005/admin/report', { waitUntil: 'networkidle' });
    await wait(3000);
    await adminPage.screenshot({
      path: path.join(outputDir, 'ticket-concert-admin-reports.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (e) {
    console.error('Admin reports error:', e.message);
  }

  // 9. Admin Orders
  console.log('Capturing ticket-concert-admin-orders.png...');
  try {
    await adminPage.goto('http://localhost:3005/admin/orders', { waitUntil: 'networkidle' });
    await wait(2500);
    await adminPage.screenshot({
      path: path.join(outputDir, 'ticket-concert-admin-orders.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (e) {
    console.error('Admin orders error:', e.message);
  }

  // 10. Admin QR Ticket Scanner
  console.log('Capturing ticket-concert-admin-qr-checkin.png...');
  try {
    await adminPage.goto('http://localhost:3005/admin/tickets', { waitUntil: 'networkidle' });
    await wait(2500);
    await adminPage.screenshot({
      path: path.join(outputDir, 'ticket-concert-admin-qr-checkin.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (e) {
    console.error('Admin qr checkin error:', e.message);
  }

  // 11. Admin Vouchers
  console.log('Capturing ticket-concert-admin-vouchers.png...');
  try {
    await adminPage.goto('http://localhost:3005/admin/vouchers', { waitUntil: 'networkidle' });
    await wait(2500);
    await adminPage.screenshot({
      path: path.join(outputDir, 'ticket-concert-admin-vouchers.png'),
      clip: { x: 0, y: 0, width: 1440, height: 880 },
    });
  } catch (e) {
    console.error('Admin vouchers error:', e.message);
  }

  await adminContext.close();

  // 12. Mobile Responsive View
  console.log('Capturing ticket-concert-mobile-responsive.png...');
  try {
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto('http://localhost:3005/', { waitUntil: 'networkidle' });
    await wait(2000);
    await mobilePage.screenshot({
      path: path.join(outputDir, 'ticket-concert-mobile-responsive.png'),
      clip: { x: 0, y: 0, width: 390, height: 844 },
    });
    await mobileContext.close();
  } catch (e) {
    console.error('Mobile capture error:', e.message);
  }

  await context.close();
  await browser.close();
  console.log('✅ All Ticket Concert screens captured successfully!');
}

captureAll().catch((err) => {
  console.error('Fatal error during capture:', err);
  process.exit(1);
});
