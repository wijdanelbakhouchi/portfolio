import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const projectIds = ['agentshield', 'legal', 'parking', 'streaming', 'pricing', 'libdata', 'gestion'];

test('one Projects experience, real assets and working internal links', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Wijdane');
  await expect(page.locator('#work .project')).toHaveCount(7);
  await expect(page.locator('main > section#agentshield')).toHaveCount(0);
  for (const id of projectIds) {
    await expect(page.locator(`[data-project-id="${id}"]`)).toHaveCount(1);
    const tags = page.locator(`#${id} > .project-copy > .tags > li`);
    expect(await tags.count()).toBeLessThanOrEqual(5);
  }
  const invalidAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(link => !document.getElementById(link.hash.slice(1))).map(link => link.hash));
  expect(invalidAnchors).toEqual([]);
  const response = await page.request.get('/documents/CV_ELBAKHOUCHI_Wijdane.pdf');
  expect(response.ok()).toBeTruthy();
  expect((await response.body()).subarray(0, 4).toString()).toBe('%PDF');
  await expect(page.locator('img')).toBeVisible();
  expect(await page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBeTruthy();
  expect(errors).toEqual([]);
});

test('all case studies open, contain full information and restore focus', async ({ page }) => {
  await page.goto('/');
  for (const id of projectIds) {
    const trigger = page.locator(`#details-${id} > summary`);
    await trigger.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.locator('#dialog-title')).not.toBeEmpty();
    await expect(page.getByRole('dialog').getByRole('heading', { name: 'Complete technology stack' })).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('link', { name: 'View repository' })).toHaveAttribute('href', /^https:\/\/github.com\/wijdanelbakhouchi\//);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect(page.locator('#dialog-content')).toBeEmpty();
  }
});

test('modal traps keyboard focus and closes with its close button', async ({ page }) => {
  await page.goto('/');
  await page.locator('#details-agentshield > summary').click();
  const close = page.getByRole('button', { name: 'Close project details' });
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('dialog').getByRole('link', { name: 'View repository' })).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await close.click();
  await expect(page.locator('#details-agentshield > summary')).toBeFocused();
});

test('mobile menu, disclosures, reduced motion and theme toggle', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/');
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).colorScheme)).toBe('dark');
  // Toggle theme to light
  await page.locator('.theme-toggle').click();
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).colorScheme)).toBe('light');
  // Toggle back to dark
  await page.locator('.theme-toggle').click();
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).colorScheme)).toBe('dark');
  expect(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior)).toBe('auto');
  await page.locator('.menu-toggle').click();
  await expect(page.locator('#navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.menu-toggle')).toBeFocused();
  await expect(page.locator('#navigation')).not.toBeVisible();
  await page.locator('.menu-toggle').click();
  await page.locator('#navigation a[href="#work"]').click();
  await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#work$/);
  await page.locator('.skill-group > summary').first().click();
  await expect(page.locator('.skill-group').first()).toHaveAttribute('open', '');
  await expect(page.locator('.skill-group').first().getByText('Computer Vision', { exact: true })).toBeVisible();
  await page.locator('#details-agentshield > summary').click();
  expect(await page.getByRole('dialog').evaluate(el => el.scrollWidth <= el.clientWidth)).toBeTruthy();
  await page.keyboard.press('Escape');
  expect(await page.locator('canvas').count()).toBe(0);
});

test('contact form validates required inputs and supports message dispatch', async ({ page }) => {
  await page.goto('/');
  const submitBtn = page.locator('.form-submit');
  await submitBtn.click();
  await expect(page.locator('#name-error')).toHaveText('Please enter your name.');

  await page.locator('#contact-name').fill('Alex Recruiter');
  await submitBtn.click();
  await expect(page.locator('#email-error')).toHaveText('Please enter your email address.');

  await page.locator('#contact-email').fill('invalid-email-address');
  await submitBtn.click();
  await expect(page.locator('#email-error')).toHaveText('Please enter a valid email address.');

  await page.locator('#contact-email').fill('recruiter@tech.corp');
  await submitBtn.click();
  await expect(page.locator('#subject-error')).toHaveText('Please enter a subject.');

  await page.locator('#contact-subject').fill('AI Engineer Role');
  await submitBtn.click();
  await expect(page.locator('#message-error')).toHaveText('Please enter your message.');

  await page.locator('#contact-message').fill('Hello Wijdane, we are impressed by AgentShield.');
  await submitBtn.click();
  await expect(page.locator('#form-status')).toBeVisible();
});

const heroViewports = [
  { width: 1920, height: 1080 },
  { width: 1536, height: 864 },
  { width: 1440, height: 900 },
  { width: 1366, height: 768 },
  { width: 1024, height: 1366 },
  { width: 768, height: 1024 },
  { width: 430, height: 932 },
  { width: 390, height: 844 },
  { width: 375, height: 667 },
  { width: 360, height: 800 },
];

for (const vp of heroViewports) {
  test(`hero occupies full viewport and about is below fold at ${vp.width}x${vp.height}`, async ({ page }) => {
    await page.setViewportSize(vp);
    await page.goto('/');
    const aboutBox = await page.locator('#about').boundingBox();
    expect(aboutBox).not.toBeNull();
    expect(aboutBox.y).toBeGreaterThanOrEqual(vp.height - 5);
  });
}

for (const width of [320, 375, 390, 412, 700, 768, 820, 1000, 1024, 1366, 1440, 1920]) {
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    const clipped = await page.locator('h1, h2, h3, h4, .button, .project, .skill-group').evaluateAll(nodes => nodes.filter(node => node.getBoundingClientRect().width && node.scrollWidth > node.clientWidth + 1).map(node => node.textContent.slice(0, 80)));
    expect(clipped).toEqual([]);
    await page.locator('.timeline-item summary').first().click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  });
}

for (const width of [390, 1440]) {
  test(`WCAG AA including expanded content and modal at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.locator('.disclosure > summary, .skill-group > summary').evaluateAll(nodes => nodes.forEach(node => node.click()));
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(results.violations).toEqual([]);
    await page.locator('#details-agentshield > summary').click();
    const modal = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(modal.violations).toEqual([]);
  });
}

test('content and all case studies work with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('#navigation')).toBeVisible();
  for (const id of projectIds) {
    await page.locator(`#details-${id} > summary`).click();
    await expect(page.locator(`#details-${id} .case-study`)).toBeVisible();
    await page.locator(`#details-${id} > summary`).click();
  }
  await expect(page.locator('.project')).toHaveCount(7);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await context.close();
});

test('capture production desktop and mobile for visual review', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    // Explicitly capture light mode
    await page.goto('/');
    await page.evaluate(() => {
      sessionStorage.setItem('wijdane_intro_seen', '1');
      localStorage.setItem('portfolio_theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
      document.documentElement.style.colorScheme = 'light';
    });
    await page.reload();
    await page.waitForSelector('#system-loader', { state: 'detached', timeout: 3000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `test-results/portfolio-${width}-light.png`, fullPage: true });

    // Explicitly capture dark mode
    await page.evaluate(() => {
      sessionStorage.setItem('wijdane_intro_seen', '1');
      localStorage.setItem('portfolio_theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.style.colorScheme = 'dark';
    });
    await page.reload();
    await page.waitForSelector('#system-loader', { state: 'detached', timeout: 3000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `test-results/portfolio-${width}-dark.png`, fullPage: true });

    await page.locator('#details-agentshield > summary').click();
    await page.screenshot({ path: `test-results/case-study-${width}.png` });
  }
});
