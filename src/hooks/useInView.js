import { useEffect, useRef, useState } from 'react';
import { useAllowMotion } from './useReducedMotion.js';

/**
 * Reports once when the element first enters the viewport, then stops observing.
 * Without motion it reports true immediately so content is never hidden.
 */
export function useInView({ rootMargin = '0px 0px -8% 0px', threshold = 0.12 } = {}) {
  const ref = useRef(null);
  const allowMotion = useAllowMotion();
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!allowMotion || seen || !ref.current) return undefined;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setSeen(true);
        observer.disconnect();
      }
    }, { rootMargin, threshold });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [allowMotion, seen, rootMargin, threshold]);

  return [ref, seen || !allowMotion];
}
