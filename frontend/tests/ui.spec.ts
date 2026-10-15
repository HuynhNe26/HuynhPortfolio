import { expect, test } from '@playwright/test';

test('homepage renders and fits the viewport', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Thoughtfully');
  await expect(page.getByRole('link', { name: 'Explore my work' })).toBeVisible();
  const fits = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
  expect(fits).toBe(true);
});

test('visitors can navigate to work and contact', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Built with purpose');
  await page.goto('/contact');
  await expect(page.getByLabel('Your name')).toBeVisible();
  await expect(page.getByLabel('Email address')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Send message' })).toBeVisible();
});

test('anonymous administrators are redirected to login', async ({ page }) => {
  await page.goto('/admin');
  await expect(page).toHaveURL(/\/admin\/login$/);
  await expect(page.getByLabel('Password')).toBeVisible();
});

test('reduced-motion visitors retain all content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Good things start with a conversation.' })).toBeVisible();
  const animation = await page.locator('.code-window').evaluate((element) => getComputedStyle(element).animationName);
  expect(animation).toBe('none');
});
