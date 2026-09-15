# Wijdane Elbakhouchi — portfolio

A custom HTML-first portfolio around **intelligence, with boundaries**. Built in the existing project with Vite, strict TypeScript and optional Three.js. No React runtime, backend, tokens or contact-service account are required.

## Run locally
Requires Node.js 22.12+ (22.x), or Node.js 24+. Node 24 is recommended.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. On Windows PowerShell, use `npm.cmd` if local execution policy blocks the `npm.ps1` wrapper.

## Build and check
```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
npm run preview
```
`test:e2e` uses installed Microsoft Edge by default. To use Chromium elsewhere, remove `channel: 'msedge'` from playwright.config.js, then run `npx playwright install chromium`. Browser tests start a production preview automatically.

## Deploy to Vercel
1. Push the source and package-lock.json to your Git repository. This supplied folder initially had no `.git` directory.
2. Import that repository into Vercel. Use Node 24, `npm run build`, and output directory `dist`.
3. Set optional build variable `SITE_URL` to the final HTTPS origin, such as `https://your-portfolio.example`, then deploy.
4. Confirm the public site, CV download, CSP headers, canonical tag and sitemap after deployment.

`vercel.json` supplies security headers. For Netlify or Cloudflare Pages, deploy `dist`; `public/_headers` supplies equivalent rules where supported. Other static hosts require configuring those headers separately. No deployment was performed as part of this rebuild.

## Environment variables
No required variables or secrets. `.env.example` documents only `SITE_URL`, an optional public origin. Without it, robots.txt is emitted but no invented canonical URL or sitemap is published. With it, the build emits canonical, og:url, absolute social image URL and sitemap.xml. Never put private credentials in `VITE_*` variables.

## Structure
```text
index.html                         Crawlable page content and semantic sections
src/
  content.ts                       Verified project case studies and diagram text
  main.ts                          Navigation, dialogs, motion and optional scene loading
  scene.ts                         Three.js scene and complete resource cleanup
  theme.ts                         System theme and stored preference
  style.css                        Design tokens, components and responsive layouts
  vite-env.d.ts                    Vite type declarations
public/
  documents/CV_ELBAKHOUCHI_Wijdane.pdf
  images/avatar/profile-avatar.webp
  images/social-card.svg           Editable source artwork
  images/social-card.png           Social sharing raster
  favicon.svg
  _headers
scripts/                           Reproducible auditing utilities
 tests/                            Browser and content safety tests
 docs/                             Audit and final verification notes
PORTFOLIO_CONTENT_RECOMMENDATIONS.md
vite.config.js / tsconfig.json / eslint.config.js
playwright.config.js / vercel.json / package.json / package-lock.json
```

## Interaction and accessibility
Keyboard-accessible mobile menu, visible focus states, active section links, native modal with focus return, architecture explorer, system-aware persisted theme, reduced motion, motion pause control, semantic landmarks and skip link. Type `agentshield` outside text inputs for the single quiet Easter egg. Standard cursor is preserved for familiar pointer behavior.

## 3D and performance
The optional Three.js chunk loads after critical UI on desktop devices with a fine pointer and adequate capability. Mobile, reduced-motion and data-saving clients receive a static CSS illustration without downloading the scene. The renderer caps DPR at 1.5, reduces it on slow frames, targets approximately 30 fps, pauses offscreen/in background, and disposes geometries/materials on teardown. A WebGL failure leaves the illustration and page usable. The scene has four agent nodes, thin protective rings, a faceted core, 60 sparse points and one moving packet. This is a conceptual illustration, not actual security telemetry.

All fonts are local. The portrait is ~37 KB WebP with fixed intrinsic dimensions and lazy loading. Critical application JavaScript is ~5.4 KB gzip; the optional scene includes Three.js and is ~134 KB gzip. Vite reports a >500 KB raw scene-chunk warning; it is lazy, excluded from mobile/reduced-motion critical paths, and documented rather than hidden.

## Security and content
No forms, credentials, remote APIs, unsafe HTML insertion or analytics. External links isolate the opener. Security headers restrict scripts, frames, objects, media permissions and form submissions. User text is assigned with textContent. npm audit was run; see docs/VERIFICATION.md for dated results. Source audit is not a guarantee against all future vulnerabilities.

## Editing
Edit page copy in index.html, case studies in src/content.ts and design tokens in src/style.css. Preserve the research scope qualifications and team attribution. Consult PORTFOLIO_CONTENT_RECOMMENDATIONS.md before adding any unverified achievements. The existing website email was preserved; it differs from the CV email and needs confirmation.
