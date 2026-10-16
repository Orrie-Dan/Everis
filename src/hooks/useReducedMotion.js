import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/** True when the visitor has asked for reduced motion. Updates live. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/** True when decorative motion (reveals, parallax, scrubbing) may run. */
export function useAllowMotion() {
  const reduced = useReducedMotion();
  return !reduced && typeof window !== 'undefined' && 'IntersectionObserver' in window;
}
