# Beyond The Stories — Version 8

Pages: index.html, digital-solutions.html, coaching.html, portfolio.html, portfolio-manager.html.

## What's new
- Homepage featured “Our Work” area with a “View All Work” link.
- Dedicated portfolio page with responsive project grid, category filters, project detail lightbox, and photography-led scroll experience.
- A browser-local project manager for uploading multiple images and videos plus text, with a remove feature.
- Standard SVG arrow icons, not emoji arrows.

## Important: Publishing projects
This is a **static GitHub Pages website**. Opening `portfolio-manager.html` and uploading files saves them in **IndexedDB in the browser on that device**, and only that browser will see the uploaded projects. This does NOT publish them to GitHub, sync them across browsers, or make them visible to public visitors. The editor is NOT password-protected and must NOT be mistaken for a live administration backend. Do not upload confidential assets in shared browsers.

To make an actual online CMS: connect a backend such as Supabase Storage + database with authenticated admin access and appropriate access policies, then replace the IndexedDB functions in `portfolio.js` with remote create/read/delete requests. Public visitors should only have read access to approved projects. Configure the hosting and database credentials separately.

The visual photos from Unsplash elsewhere in the site are editorial examples, **not** represented as actual client projects. The portfolio starts empty until real projects are supplied.

## Setup
1. Extract the folder and upload the files to the same GitHub Pages directory.
2. Open `index.html` for the site, and `portfolio.html` for the portfolio.
3. Open `portfolio-manager.html` to test local image and video uploading in your browser.
4. Add a backend before expecting clients/public visitors to see uploaded work on other devices.
5. Set the recipient email in `script.js` (currently `hello@example.com`).

Images elsewhere load from Unsplash and need network access. Replacing these with verified brand imagery is recommended for production.


## V9 — Continuous parallax storytelling
The original cinematic hero is preserved. All public pages now feature viewport-driven parallax depth for headings, photography, staggered cards, and service rows. Editorial bridge bands link the homepage's sections and the other pages' closing transitions. Motion is lighter on phones and disabled when a visitor requests reduced motion. No scroll-jacking or third-party animation dependencies are used.

V10: The homepage philosophy and photography are now pinned scroll sequences, with horizontal headline movement, image handoff, and shared motion through services, work and contact. Reduced-motion settings disable these animations.


V11: Fixed blank approach-to-services intervals and card clipping. Home scenes now use flow-based heights, controlled depth, and mobile-safe effects.


## Version 12
Removed all scrolling text ticker/bridge strips from the homepage. Added synchronized scroll-based depth and 3D motion to both discipline cards, images, selected work, section introductions, photography, and contact. Reduced motion is respected. The portfolio uploader remains browser-local; it is not yet a public hosted CMS.


## Version 13: Full homepage scroll animation
- The homepage loads `cinematic.js` AFTER `script.js`. Both files and `styles.css` must be uploaded together.
- Scroll-linked entrance, 3D tilt, image drift and depth effects are now applied to approach, full-screen photograph, service cards, work gallery and contact.
- Existing hero effect remains as before.
- The new script writes CSS custom properties and is designed to work without third-party animation libraries.
- If your device's operating system has Reduce Motion enabled, movement is intentionally disabled for accessibility.
- The portfolio manager is still browser-local and not a published, authenticated CMS.
- Browser-driven visual testing could not be completed due to restricted local browser navigation; JavaScript syntax and local link integrity can be verified statically.


V14: Added rotating brand insignia to Our Approach, settling as the section scrolls into view; accessible SVG; responsive layout and reduced-motion fallback.

V15: The Our Approach section is now a sticky 1.85-viewport scroll sequence. Rectangular logo falls from above and rotates into place in sync with scroll; text and photo move independently. Motion is reversible on reverse scrolling. Reduced-motion fallback is provided.


## Version 16 — Office cabin sequence
The main homepage now includes the scroll-controlled `cabin-journey` scene, between the falling-logo philosophy section and Two Disciplines. Upload `cabin.js` with the rest of the files.

Its foreground glass doors are CSS perspective elements over **real Unsplash architectural photography**, not a filmed walkthrough of the exact office. The effect is an art-directed approximation of entering and leaving a private room; for photorealistic continuity of the same physical space, replace with licensed matched-angle footage or a 3D environment. The photos require internet access. Reduced-motion users see a static interior.
