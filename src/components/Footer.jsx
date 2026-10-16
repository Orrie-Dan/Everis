import { SITE, getSocialLinks } from '../config/site.js';
import { FOOTER_LINKS } from '../data/content.js';
import { contactEntries } from '../lib/contact.jsx';
import Link from './Link.jsx';

export default function Footer({ inert }) {
  const entries = contactEntries(SITE.contact);
  const social = getSocialLinks(SITE);

  return (
    <footer className="site-footer" inert={inert}>
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="wordmark" to="/" aria-label="Everis — home">Everis</Link>
            <p>Developing and investing in Africa’s energy infrastructure.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            <ul>
              {FOOTER_LINKS.map(link => <li key={link.href}><Link to={link.href}>{link.label}</Link></li>)}
            </ul>
          </nav>
          <div className="footer-contact">
            <p className="kicker kicker-light">Enquiries</p>
            <Link className="footer-link" to="/contact/#contact-form">Use the enquiry form <span aria-hidden="true">→</span></Link>
            {entries.length > 0 && (
              <address>{entries.map(([term, value]) => <div key={term}>{value}</div>)}</address>
            )}
          </div>
        </div>
        <p className="footer-mark" aria-hidden="true">Everis</p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Everis. All rights reserved.</span>
          {social.length > 0 && (
            <ul className="footer-social" aria-label="Social media">
              {social.map(item => (
                <li key={item.url}>
                  <a href={item.url} rel="noopener noreferrer" target="_blank">
                    {item.label}<span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <a href="#main">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </div>
    </footer>
  );
}
