import { useEffect, useRef, useState } from 'react';
import { NAV_LINKS } from '../data/content.js';
import { useScrollFrame } from '../hooks/useScrollFrame.js';
import { useLocation } from '../lib/router.js';
import { Arrow } from './Kicker.jsx';
import Link from './Link.jsx';

/* "page" for the current page; "true" for its section when on a page below it (an activity under Activities). */
const navCurrent = (path, href) => {
  if (path === href) return 'page';
  return href !== '/' && path.startsWith(href) ? 'true' : undefined;
};

export default function Header({ menuOpen, setMenuOpen }) {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { path } = useLocation();
  const lastY = useRef(0);
  const toggleRef = useRef(null);
  const navRef = useRef(null);

  useScrollFrame(() => {
    const y = window.scrollY;
    setSolid(y > 40);
    if (y > lastY.current + 4 && y > 600) setHidden(true);
    else if (y < lastY.current - 4 || y < 600) setHidden(false);
    lastY.current = y;
  });

  /* Menu side effects: lock scroll, focus first link, Escape closes, wide screens close it. */
  useEffect(() => {
    document.body.classList.toggle('menu-locked', menuOpen);
    if (!menuOpen) return undefined;
    navRef.current?.querySelector('a')?.focus();

    const onKey = event => {
      if (event.key === 'Escape') { setMenuOpen(false); toggleRef.current?.focus(); }
    };
    const wide = window.matchMedia('(min-width: 901px)');
    const onWide = e => { if (e.matches) setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      document.body.classList.remove('menu-locked');
      document.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [menuOpen, setMenuOpen]);

  const closeOnLink = event => { if (menuOpen && event.target.closest('a')) setMenuOpen(false); };

  const classes = ['site-header', solid && 'is-solid', hidden && 'is-hidden', menuOpen && 'menu-open'].filter(Boolean).join(' ');

  return (
    <header className={classes}>
      <div className="header-inner">
        <Link className="wordmark" to="/" aria-label="Everis — home">Everis</Link>
        <nav ref={navRef} className={menuOpen ? 'primary-nav is-open' : 'primary-nav'} id="primary-nav" aria-label="Main" onClick={closeOnLink}>
          <ul>
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <Link to={link.href} aria-current={navCurrent(path, link.href)}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <Link className="btn btn-primary nav-cta" to="/contact/">Get in touch <Arrow /></Link>
        </nav>
        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={() => setMenuOpen(open => !open)}
        >
          <span className="menu-label">{menuOpen ? 'Close' : 'Menu'}</span>
          <span className="menu-icon" aria-hidden="true"><span></span><span></span></span>
        </button>
      </div>
    </header>
  );
}
