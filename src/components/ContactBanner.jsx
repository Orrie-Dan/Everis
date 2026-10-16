import Kicker, { Arrow } from './Kicker.jsx';
import Link from './Link.jsx';
import SplitText from './SplitText.jsx';

/** Closing call to action on every page except Contact. */
export default function ContactBanner() {
  return (
    <section id="contact-cta" className="section contact-cta" aria-labelledby="contact-cta-title">
      <div className="container">
        <div className="cta-card">
          <img className="cta-image" src="/assets/switchyard-insulators-1400.webp" alt="" loading="lazy" width="1400" height="933" />
          <div className="cta-shade" aria-hidden="true"></div>
          <div className="cta-content">
            <Kicker light>Contact</Kicker>
            <SplitText id="contact-cta-title">Bring us an <em>opportunity.</em></SplitText>
            <p>We welcome project proposals, acquisition opportunities and investment discussions from governments, utilities, developers, industrial users, lenders and investors.</p>
            <div className="cta-actions">
              <Link className="btn btn-primary" to="/contact/">Start a conversation <Arrow /></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
