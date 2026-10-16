/* Builds each page's HTML entry from the built index.html, so every URL can be
   served as a static file with its own title and description. */

const escapeAttr = value => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escapeText = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** index.html with the page's title and description; the hero image preload is kept only for Home. */
export function pageHtml(html, page) {
  const out = html
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeText(page.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeAttr(page.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(page.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeAttr(page.description)}$2`);
  return page.path === '/' ? out : out.replace(/\s*<link rel="preload" as="image"[^>]*>/, '');
}

/** Output file for a page path: "/" → "index.html", "/about/" → "about/index.html", "/404.html" → "404.html". */
export function pageFile(path) {
  if (path.endsWith('.html')) return path.slice(1);
  return path.slice(1) + 'index.html';
}
