import { DRIVERS, pad } from '../data/content.js';
import Kicker from './Kicker.jsx';
import Reveal from './Reveal.jsx';
import SplitText from './SplitText.jsx';

/** Home page: why African energy infrastructure needs investment. */
export default function Drivers() {
  return (
    <section id="market" className="section drivers" aria-labelledby="market-title">
      <div className="container">
        <div className="section-head split">
          <div>
            <Kicker light>The opportunity</Kicker>
            <SplitText id="market-title">Demand is growing. <em>Supply has to follow.</em></SplitText>
          </div>
          <Reveal as="p" className="section-intro">Reliable, affordable electricity underpins industry, jobs and growth. Meeting it takes new generation, stronger networks and patient capital.</Reveal>
        </div>
        <ul className="driver-list">
          {DRIVERS.map((driver, i) => (
            <Reveal as="li" key={driver.title} className="driver">
              <span className="driver-num">{pad(i + 1)}</span>
              <h3>{driver.title}</h3>
              <p>{driver.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
