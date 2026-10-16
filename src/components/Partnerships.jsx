import { PARTNERS, pad } from '../data/content.js';
import Kicker from './Kicker.jsx';
import Reveal from './Reveal.jsx';
import SplitText from './SplitText.jsx';

export default function Partnerships() {
  return (
    <section id="partnerships" className="section partnerships" aria-labelledby="partnerships-title">
      <div className="container">
        <div className="section-head split">
          <div>
            <Kicker>Partnerships</Kicker>
            <SplitText id="partnerships-title">Infrastructure is built <em>together.</em></SplitText>
          </div>
          <Reveal as="p" className="section-intro">Energy projects depend on aligned interests. We work with the public and private parties each project needs.</Reveal>
        </div>
        <ul className="partner-list">
          {PARTNERS.map((partner, i) => (
            <Reveal as="li" key={partner.title} className="partner">
              <span className="partner-num">{pad(i + 1)}</span>
              <h3>{partner.title}</h3>
              <p>{partner.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
