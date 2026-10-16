import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pageFile, pageHtml } from './build/page-html.js';
import { ACTIVITY_PAGES, NOT_FOUND, PAGES } from './src/data/pages.js';

/* Writes dist/<page>/index.html (and 404.html) for every page and activity page in src/data/pages.js,
   so each URL loads directly from a static host with the right title and description. */
function pageEntries() {
  return {
    name: 'everis-page-entries',
    apply: 'build',
    async writeBundle({ dir }) {
      const html = await readFile(join(dir, 'index.html'), 'utf8');
      for (const page of [...PAGES, ...ACTIVITY_PAGES, NOT_FOUND]) {
        const file = join(dir, pageFile(page.path));
        await mkdir(dirname(file), { recursive: true });
        await writeFile(file, pageHtml(html, page));
      }
    }
  };
}

// Builds into dist/, the directory .openai/hosting.json publishes.
export default defineConfig({
  plugins: [react(), pageEntries()],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: { port: 5173 },
  preview: { port: 4173 },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: false,
    testTimeout: 20000
  }
});
