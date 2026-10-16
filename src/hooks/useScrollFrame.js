import { useEffect, useRef } from 'react';

/* One requestAnimationFrame-throttled scroll/resize loop shared by every subscriber. */
const subscribers = new Set();
let ticking = false;

function run() {
  ticking = false;
  subscribers.forEach(fn => fn());
}

function schedule() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(run);
}

/**
 * Calls `callback` once per animation frame while the page scrolls or resizes,
 * and once on mount. Pass `enabled = false` to pause.
 */
export function useScrollFrame(callback, enabled = true) {
  const saved = useRef(callback);
  useEffect(() => { saved.current = callback; });

  useEffect(() => {
    if (!enabled) return undefined;
    const fn = () => saved.current();
    if (subscribers.size === 0) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
    }
    subscribers.add(fn);
    fn();
    return () => {
      subscribers.delete(fn);
      if (subscribers.size === 0) {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      }
    };
  }, [enabled]);
}
