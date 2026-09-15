# Verification record

Run on 15 September 2026 from the supplied Windows workspace.

## Automated checks

- `npm run typecheck` — passed.
- `npm run lint` — passed.
- `npm test` — 3 content and security checks passed.
- `npm run test:e2e` — 7 browser checks passed in Microsoft Edge.
- `npm audit --json` — 0 vulnerabilities across 253 installed packages.
- Public GitHub links used in the site — all checked with HTTP 200 responses.

## Browser coverage

The browser suite covers desktop content, keyboard navigation, modal focus return, architecture-layer interactions, mobile navigation, persisted themes, reduced-motion and WebGL fallbacks, dark/light axe accessibility checks, 320 px through 3840 px layouts, no horizontal overflow, image loading, CV availability, and content without JavaScript.

## Lighthouse snapshot

Lighthouse runs against the production preview scored 100 for Performance, Accessibility, Best Practices and SEO in both the mobile and desktop presets. The mobile LCP was reported as 1.5 seconds, TBT 0 ms and CLS 0.004; desktop LCP 0.3 seconds, TBT 10 ms and CLS 0.002.

The agentic-browsing score is a separate experimental Lighthouse category and does not represent standard web quality. Lighthouse also reports a raw optional Three.js chunk warning; the scene is lazy-loaded, capability-gated and omitted from mobile and reduced-motion clients by design.

## Visual review

Desktop and mobile screenshots were inspected after the build. The hero network core, portrait framing, flagship architecture panel, project illustrations, timeline, contact area and mobile stacking were all visible and free of clipping. The site stays usable if WebGL, JavaScript animation or local storage is unavailable.
