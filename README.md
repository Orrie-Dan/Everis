# Everis corporate website

A responsive five-page site built with React 19 and Vite 6. `npm run build` outputs the production site to `dist/`, which is the folder `.openai/hosting.json` publishes.

## Getting started

Requires Node.js 20.19 or later.

```sh
npm install
npm run dev        # dev server with hot reload at http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the built dist/ at http://localhost:4173
npm test           # unit and component tests (Vitest + Testing Library)
npm run lint       # ESLint
```

Do not edit files in `dist/` by hand. The build regenerates that folder every time.

## Project structure

```
index.html                  HTML shell: meta tags, fonts, hero image preload
build/page-html.js          Writes each page's title/description into its copy of index.html at build time
public/                     Copied to dist/ unchanged (favicon, assets/*.webp)
src/
  main.jsx                  Entry point
  App.jsx                   Layout; picks the page for the current URL; mobile-menu state; enables motion
  styles.css                All styling (tokens → components → sections → responsive → motion)
  config/site.js            SITE: contact details and social links
  data/pages.js             The pages: path, nav label, <title> and meta description
  data/content.js           Page copy: activities, principles, steps, partners, enquiry options
  pages/index.jsx           One component per page, composed from the section components
  components/               One component per section, plus PageHero, ContactBanner, Link, Reveal, SplitText, Kicker
  context/                  Enquiry state shared by the shortcuts and the form
  hooks/                    Reduced-motion detection, shared scroll loop, in-view reveal, page-change handling
  lib/                      Router; enquiry validation and delivery; contact detail formatting
```

Most copy changes go in `src/data/content.js`. Section headings and intros are written in the matching component.

## Pages

| URL | Content |
| --- | --- |
| `/` | Hero → overview cards linking to About, Activities and Approach → market drivers (`#market`) → opportunities we consider, with a project-proposal shortcut (`#opportunities`) → responsible development (`#responsibility`) → contact banner |
| `/about/` | Page title → About → Investment Philosophy (`#philosophy`) → contact banner |
| `/activities/` | Page title → five activity cards and project structures → contact banner |
| `/approach/` | Page title → Identify → Evaluate → Structure → Finance → Deliver & Manage → Partnerships (`#partnerships`) → contact banner |
| `/contact/` | Page title with enquiry topics → enquiry form (`#contact-form`) |

Any other path shows a "Page not found" page. The main navigation links the five pages and marks the current one. The footer also links Philosophy and Partnerships.

Navigation between pages happens in the browser without a full reload (`src/lib/router.js`, `src/components/Link.jsx`). After each page change the title and description are updated, the page scrolls to the top (or to the `#section` in the link), focus moves to the new page's heading, and Back/Forward restore the previous scroll position. Use `<Link to="/path/">` for internal links. A plain `<a>` still works but reloads the page.

To add a page: add it to `src/data/pages.js`, write its component in `src/pages/index.jsx`, and map its path in `VIEWS` in `src/App.jsx`. The build creates its HTML file automatically.

## Contact details and social links

No contact details or social accounts have been published, and none have been invented. Set approved values in `src/config/site.js`:

- `contact.email`, `contact.phone`, `contact.address`: shown beside the form and in the footer only when set. When `email` is set, the form opens a pre-filled email draft instead of downloading a copy, and the "preview" notice is removed.
- `social`: an array of `{ label, url }`. Only https links are accepted. The footer shows links only for the entries present.

Until an email is set, the form validates input and downloads the enquiry as a text file. Nothing is sent or stored. Sending enquiries to a server would need a backend or form service, which this project does not include.

## Design

A white page with navy ink (`#0a1a2f`/`#0c2340`), grid blue (`#0057d9`) as the primary accent and solar amber (`#ffb81c`) used only on dark backgrounds (hero, image cards, contact banner, footer). Headings use Archivo and body text uses Inter (Google Fonts, with system fallbacks). Colour tokens are defined at the top of `src/styles.css`.

The layout is full-width: sections span the viewport with responsive side gutters (`--gutter`) rather than a centred column, and the hero is full-bleed. Corners are squared (4–6px), headlines are two-tone (navy with a blue or grey second phrase), and headings reveal word by word beside a scroll-linked statement.

Motion consists of a looping hero background video (shown only after it starts playing, over a still poster), a hero settle and light parallax, heading and card reveals, a statement whose words light up on scroll, and a progress line on the approach steps. When `prefers-reduced-motion: reduce` is set, all of it is turned off and content renders statically; the hero shows the still poster instead of the video, as it also does when the browser reports Save-Data. This updates live if the setting changes.

## Imagery

The photographs in `public/assets/` were downloaded from Unsplash under the [Unsplash License](https://unsplash.com/license), which permits free commercial use with no attribution required, and were resized to WebP. They are illustrative and do not depict Everis projects, and the page says so. Source photo IDs:

| File | Unsplash source |
| --- | --- |
| hero-solar-dusk-* | images.unsplash.com/photo-1611365892117-00ac5ef43c90 |
| savanna-dusk-* | images.unsplash.com/photo-1547471080-7cc2caa01a7e |
| savanna-tree-* | images.unsplash.com/photo-1516026672322-bc52d61a55d5 |
| generation-wind-dusk-* | images.unsplash.com/photo-1466611653911-95081537e5b7 |
| solar-aerial-* | images.unsplash.com/photo-1497435334941-8c899ee9e8e9 |
| industrial-works-* | images.unsplash.com/photo-1504328345606-18bbc8c9d7d1 |
| substation-* | images.unsplash.com/photo-1509390144018-eeaf65052242 |
| transmission-dusk-* | images.unsplash.com/photo-1473341304170-971dccb5ac1e |

These files were added later and are not from Unsplash. Record each source and licence here before launch:

| File | Source |
| --- | --- |
| hero-solar-aerial-*.mp4, hero-solar-aerial-*.webp (poster) | Drone video, source not yet recorded. 20s loop cut from the original with a 1.5s crossfade at the loop point |
| wind-savanna-dusk-* | AI-generated illustration, source not yet recorded |
| power-plant-savanna-dusk-* | AI-generated illustration, source not yet recorded |

Replace these with Everis-owned photography when it becomes available. Keep the same file names, or update the paths in `src/data/content.js` and the components.

## Hosting

`.openai/hosting.json` links this project to its private Sites deployment and publishes `dist/`. Run `npm run build` before republishing. Keep the project ID unchanged when editing and republishing. The build writes one HTML file per page (`dist/index.html`, `dist/about/index.html`, …, plus `dist/404.html`), each with that page's title and description. Deep links and refreshes therefore work on any static host without rewrite rules. Links use trailing slashes (`/about/`); most static hosts redirect `/about` to `/about/`. The site uses root-relative paths (`/assets/…`), so it must be served from the domain root. To host it under a sub-path, set `base` in `vite.config.js`.

`_legacy-static/` is a backup of the previous hand-written static build. It is not used by the app and can be deleted once you are happy with the React version.
