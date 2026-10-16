import { describe, expect, it } from 'vitest';
import { NOT_FOUND, PAGES } from '../src/data/pages.js';
import { normalizePath } from '../src/lib/router.js';
import { pageFile, pageHtml } from './page-html.js';

const HTML = `<head>
  <title>Home title</title>
  <meta name="description" content="Home description">
  <meta property="og:title" content="Home title">
  <meta property="og:description" content="Home description">
  <link rel="preload" as="image" href="/assets/hero.webp">
</head>`;

describe('pageHtml', () => {
  it('sets the page title and description and drops the hero preload away from Home', () => {
    const out = pageHtml(HTML, { path: '/about/', title: 'About — "Everis" & co', description: 'A <b> "quoted" description' });
    expect(out).toContain('<title>About — "Everis" &amp; co</title>');
    expect(out).toContain('<meta name="description" content="A &lt;b> &quot;quoted&quot; description">');
    expect(out).toContain('<meta property="og:title" content="About — &quot;Everis&quot; &amp; co">');
    expect(out).not.toContain('rel="preload"');
  });

  it('keeps the hero preload on Home', () => {
    expect(pageHtml(HTML, PAGES[0])).toContain('rel="preload"');
  });
});

describe('pageFile', () => {
  it('maps every page to a static file', () => {
    expect([...PAGES, NOT_FOUND].map(p => pageFile(p.path))).toEqual([
      'index.html', 'about/index.html', 'activities/index.html', 'approach/index.html', 'contact/index.html', '404.html'
    ]);
  });
});

describe('normalizePath', () => {
  it('treats /x, /x/ and /x/index.html as one page', () => {
    expect(['/about', '/about/', '/about/index.html'].map(normalizePath)).toEqual(['/about/', '/about/', '/about/']);
    expect(['/', '/index.html'].map(normalizePath)).toEqual(['/', '/']);
  });
});
