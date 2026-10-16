import { useSyncExternalStore } from 'react';

/* A minimal History API router: the URL is the only state. Every page also has its
   own HTML file in dist/, so deep links and refreshes work on a plain static host. */

const listeners = new Set();
const emit = () => listeners.forEach(fn => fn());

function subscribe(callback) {
  listeners.add(callback);
  window.addEventListener('popstate', callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener('popstate', callback);
  };
}

const getSnapshot = () => window.location.pathname + window.location.hash;

/** "/about", "/about/" and "/about/index.html" are the same page: "/about/". */
export function normalizePath(pathname) {
  const path = pathname.replace(/index\.html$/, '');
  return path.endsWith('/') ? path : path + '/';
}

/** The current normalised path and hash; re-renders on navigation and back/forward. */
export function useLocation() {
  const value = useSyncExternalStore(subscribe, getSnapshot, () => '/');
  const i = value.indexOf('#');
  return {
    path: normalizePath(i < 0 ? value : value.slice(0, i)),
    hash: i < 0 ? '' : value.slice(i)
  };
}

/** Go to another page without reloading. The scroll position of the page being left is kept for Back. */
export function navigate(href) {
  const url = new URL(href, window.location.href);
  window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '');
  window.history.pushState(null, '', url.pathname + url.search + url.hash);
  emit();
}
