import { navigate, normalizePath } from '../lib/router.js';

/**
 * Internal link. Other pages load without a full reload; a same-page #hash is left
 * to the browser. Modified clicks (new tab, etc.) behave like a normal link.
 */
export default function Link({ to, onClick, ...rest }) {
  const handleClick = event => {
    onClick?.(event);
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(to, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (normalizePath(url.pathname) === normalizePath(window.location.pathname)) {
      if (url.hash) return;
      event.preventDefault();
      window.scrollTo({ top: 0 });
      return;
    }
    event.preventDefault();
    navigate(url.pathname + url.hash);
  };

  return <a {...rest} href={to} onClick={handleClick} />;
}
