import { useEffect, useLayoutEffect, useRef } from 'react';

function setMeta(page) {
  document.title = page.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
}

/**
 * After each change of page: update the title and description, restore the saved
 * scroll position (Back/Forward, reload) or go to the #hash or the top, and move
 * focus into the new page so screen readers announce it.
 * Hash-only changes within a page are left to the browser.
 */
export function usePageChange(path, hash, page) {
  const lastPath = useRef(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    const save = () => window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '');
    window.addEventListener('pagehide', save);
    return () => window.removeEventListener('pagehide', save);
  }, []);

  useLayoutEffect(() => {
    if (lastPath.current === path) return;
    const firstLoad = lastPath.current === null;
    lastPath.current = path;
    setMeta(page);

    const saved = window.history.state?.scrollY;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    if (typeof saved === 'number') window.scrollTo({ top: saved, behavior: 'instant' });
    else if (target) target.scrollIntoView?.({ behavior: 'instant', block: 'start' });
    else if (!firstLoad) window.scrollTo({ top: 0, behavior: 'instant' });

    if (firstLoad) return;
    const focusTarget = target ?? document.querySelector('main h1');
    if (!focusTarget) return;
    if (!focusTarget.hasAttribute('tabindex')) focusTarget.setAttribute('tabindex', '-1');
    focusTarget.focus({ preventScroll: true });
  }, [path, hash, page]);
}
