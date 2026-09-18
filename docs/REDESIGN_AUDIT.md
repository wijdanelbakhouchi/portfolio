# Redesign audit — 17 September 2026

## Supplied checkout, before edits

One Vite/TypeScript page, eight content sections plus hero, contact and GitHub callout. Reviewed index.html, all src modules/data, styles, assets, tests, deployment configuration and existing audit notes. The working tree was clean. Earlier docs describe a different, older four-file starting point and are not evidence about this checkout.

## Project repetition: exact finding

The current source has one hardcoded grid containing six regular project cards, each once. AgentShield has a separate flagship section, an extensive thesis card in Education, another repository link in “More research & experiments”, and another in the GitHub callout. There is no second six-card rendering loop in main.ts. Thus literal duplication of every project cannot be reproduced from this checkout; AgentShield is repeatedly presented, and the fragmented experience explains the repetition that is verifiable here.

All seven projects are also maintained in src/data/projects.ts, but cards are hardcoded in HTML while the data feeds only the modal via src/content.ts. This duplicates maintenance and causes content drift; importing data does not itself render duplicate cards.

## Problems

- Dark, saturated theme, animated Three.js scene, technical ticker, glowing portrait rings, multiple badges and oversized architecture presentation compete with the actual profile.
- Hero emphasizes a slogan instead of the person's name. Projects follow lengthy About, Education and Skills sections.
- Six large skills cards expose dozens of badges immediately. Coursework, research interests and full internship bullets add more density.
- Three font families (including Georgia), a 2,399-line stylesheet and an unused palette override complicate the visual system.
- Seven navigation entries plus theme control crowd intermediate widths; hidden overflow can mask layout problems.
- Contact form has no delivery service: it only constructs a mailto URL. It cannot truthfully promise a sent message.
- Existing tests target older labels and interactions. Old verification reports must not be presented as current results.
- Duplicate WebP avatar assets have identical hashes. The current visible avatar is the JPEG; preserve it.
- Certificate dates/credential links and live demos are absent. Do not invent them. Existing notes flag a CV/site email discrepancy.

## Preservation / design plan

One build-time renderer consumes existing typed data and produces crawlable HTML, including when JavaScript is disabled. One Projects section contains all seven cards; AgentShield leads at full width. Education references that card with a text link only. Preserve all details, complete technology lists, research interests, languages, three degrees, internship and two certificates using native disclosures and enhanced accessible case-study dialogs. Preserve supplemental MAS_Course_Labs and Code_C links.

Use off-white, pale blue, beige, navy and warm brown; local Manrope and IBM Plex Mono only. Remove Three.js, theme logic, decorative motion, duplicated callouts and mailto form. No fake project screenshots or results. Follow the reference only for clarity and breathing room, not its layout or identity.
