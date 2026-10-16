# Everis corporate website

An editable, responsive, buildless website. Edit `dist/index.html` for content, `dist/styles.css` for styling and `dist/app.js` for interactions. No dependency installation or build is needed.

## Preview

From this directory run `python -m http.server 4173 --directory dist`, then open http://localhost:4173. You can also open `dist/index.html` directly.

## Contact form

The form validates required fields and email format and downloads an enquiry text file. It does not send or store messages. Replace the clearly marked contact placeholders with approved company details and connect a verified delivery service before enabling submission. Do not replace the preview notice with a success message until real delivery is implemented. No company address, credentials, project portfolio or metrics have been invented.

## Design and assets

Forest green, warm ivory and champagne gold; Libre Caslon Display headings and DM Sans body type. Fonts are loaded from Google Fonts with local system fallbacks. Cinematic infrastructure visuals are generated with the built-in Image Generation tool and served locally as optimized WebP assets. They are clearly identified as AI-generated illustrations, not Everis-owned projects. Only remote fonts require an internet connection. All motion respects reduced-motion preferences. Edit `dist/imagery.css` for background overlays and crop positions. Image prompts are recorded in `IMAGE-PROMPTS.md`.

Navigation links to five labelled sections, mobile menu supports Escape, activities use keyboard-accessible native details controls, and the form has visible labels and live status feedback.

## Hosting

`.openai/hosting.json` links this project to its private Sites deployment. Preserve its project ID when editing and republishing.
