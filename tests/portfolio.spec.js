import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('desktop content, links, architecture and modal keyboard behavior',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading',{level:1})).toContainText('Intelligence');
  await expect(page.locator('#core-scene canvas')).toBeVisible();
  await page.locator('#motion-toggle').click();await expect(page.locator('#motion-toggle')).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Explore the research'}).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button',{name:'Explore the research'})).toBeFocused();
  for(const key of ['legal','streaming','parking']){await page.locator(`[data-project="${key}"]`).click();await expect(page.locator('#dialog-source')).toHaveAttribute('href',/https:\/\/github.com\/wijdanelbakhouchi\//);await page.locator('.dialog-close').click();}
  await page.locator('[data-layer="policy"]').click();await expect(page.locator('#layer-description')).toContainText('SANITIZE');
  const broken=await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].filter(a=>!document.querySelector(a.getAttribute('href'))).map(a=>a.getAttribute('href')));expect(broken).toEqual([]);
  const cv=await page.request.get('/documents/CV_ELBAKHOUCHI_Wijdane.pdf');expect(cv.ok()).toBeTruthy();
  expect(await page.locator('img').evaluateAll(images=>images.every(image=>image.complete&&image.naturalWidth>0))).toBeTruthy();expect(errors).toEqual([]);
});
test('mobile menu, theme persistence and static scene',async({browser})=>{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,colorScheme:'dark'});const page=await context.newPage();await page.goto('/');
  await page.locator('.menu-toggle').click();await expect(page.locator('#navigation')).toBeVisible();await page.locator('#navigation a[href="#work"]').click();await expect(page.locator('.menu-toggle')).toHaveAttribute('aria-expanded','false');
  await page.locator('#theme-toggle').click();await expect(page.locator('html')).toHaveAttribute('data-theme','light');await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','light');
  expect(await page.locator('canvas').count()).toBe(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();await context.close();
});
test('reduced motion and unavailable WebGL preserve usable content',async({browser})=>{
  const context=await browser.newContext({reducedMotion:'reduce'});const page=await context.newPage();await page.goto('/');await expect(page.locator('#motion-toggle')).toHaveText('Static view');expect(await page.locator('canvas').count()).toBe(0);await expect(page.locator('.core-fallback')).toBeVisible();await context.close();
  const fallback=await browser.newContext();const p=await fallback.newPage();await p.addInitScript(()=>{HTMLCanvasElement.prototype.getContext=()=>null;});await p.goto('/');await expect(p.locator('.core-fallback')).toBeVisible();await expect(p.locator('h1')).toBeVisible();await fallback.close();
});
for(const theme of ['dark','light'])test(`accessibility: ${theme}`,async({page})=>{
  await page.emulateMedia({colorScheme:theme,reducedMotion:'reduce'});await page.goto('/');await page.waitForTimeout(500);
  const results=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(results.violations).toEqual([]);
  await page.locator('[data-project="agentshield"]').click();const modal=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(modal.violations).toEqual([]);
});
test('responsive layout across small phones, tablets, laptops and 4K',async({page})=>{
  for(const width of [320,390,600,768,820,1024,1440,1920,3840]){await page.setViewportSize({width,height:1000});await page.goto('/');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow at ${width}`).toBeTruthy();}
});
test('content remains readable without JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false});const page=await context.newPage();await page.goto('/');await expect(page.locator('h1')).toBeVisible();await expect(page.locator('#agentshield')).toBeVisible();await expect(page.locator('.core-fallback')).toBeVisible();await context.close();
});
