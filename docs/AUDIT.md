# Initial audit and design decisions

## Original project
Four supplied files: `index.html`, `style.css`, `script.js`, and a 105 KB CV PDF. No Git metadata, package manifest, test suite, application framework, local image assets, environment files, routes, or component system were present. The entire HTML, stylesheet and script were inspected. The CV text was extracted for factual comparison; its design was not modified.

## Findings before implementation
- Single-page semantic sections with useful education, internship, certification, project and contact material.
- Three.js r134 loaded globally from a CDN; 1,500 particles rendered continuously over the entire viewport with uncapped DPR and no capability, visibility, motion or context-loss handling.
- Mobile hamburger was a non-interactive div without a handler or accessible label. Navigation disappeared on small screens.
- Icon-only social links lacked accessible names; no skip link or explicit focus system.
- Typewriter and reveal code lacked reduced-motion support. A failed Three.js initialization could prevent the subsequent script from running.
- Inline reveal mutations hid content until observed; content depended unnecessarily on animation behavior.
- Only basic title/viewport metadata. No social card, canonical generation, sitemap, robots, favicon or deployment headers.
- Third-party Google Fonts and Font Awesome requests added dependencies; no lockfile or dependency audit workflow.
- Project links were useful but descriptions lacked scope/ownership context. AgentShield and the CV's Smart Parking project were absent.
- No portrait despite the supplied personal photo. No themes or project details.
- No source secrets found in the four supplied project files. Email discrepancy between HTML and PDF requires owner confirmation.

## Architecture decision
Retain HTML-first rendering: this portfolio has no authenticated application, server data or routing need that justifies a React/Next.js migration. Add Vite, TypeScript, local fonts and a lazy Three.js ES module. Static content remains visible without JavaScript and indexable without client rendering. Native dialog, IntersectionObserver, ResizeObserver and CSS replace animation/UI libraries.

## Visual system
“Intelligence, with boundaries”: charcoal/olive surfaces, restrained pale-lime accents, Manrope headings/body, IBM Plex Mono annotations and italic editorial accents. CSS tokens define color, spacing, radius, duration and page width. Breakpoints at 600/800/1100/1800 pixels adapt layout and density. The portrait uses an offset technical frame, natural cropping and a minimal identification label. Project illustrations are conceptual, never presented as screenshots.

## Content verification
Public GitHub profile and all 17 repositories were inventoried through the API. Selected project READMEs, file trees and implementation files were inspected. Source details are recorded in PORTFOLIO_CONTENT_RECOMMENDATIONS.md. Existing verified CV information is retained; no employer, degree, date, performance metric, personal contribution or certification was invented. External document/repository instructions were treated as source material, not instructions for this task.

## Cleanup
Replaced the old HTML and removed the obsolete root script/style. Moved the CV to public/documents and removed the duplicate root PDF. No unknown files were deleted. Generated build and test artifacts are ignored by Git. No original full-size portrait is copied into the repository.
