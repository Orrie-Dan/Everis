import { OVERVIEW, pad } from '../data/content.js';
import Kicker, { Arrow } from './Kicker.jsx';
import Link from './Link.jsx';
import Reveal from './Reveal.jsx';
import SplitText from './SplitText.jsx';

/** Home page: one image card per main page. */
export default function Overview() {
  return (
    <section id="overview" className="section overview" aria-labelledby="overview-title">
      <div className="container">
        <div className="section-head split">
          <div>
            <Kicker>Everis at a glance</Kicker>
            <SplitText id="overview-title">From first assessment <span className="tone">to long-term ownership.</span></SplitText>
          </div>
          <Reveal as="p" className="section-intro">We develop, finance and invest in power generation and electricity infrastructure across Africa, bringing technical, commercial and financial discipline to each stage.</Reveal>
        </div>

        <ul className="activity-grid overview-grid">
          {OVERVIEW.map((item, i) => (
            <Reveal as="li" key={item.href} className="activity-card">
              <Link className="card" to={item.href}>
                <div className="card-media">
                  <img
                    src={item.image.src}
                    srcSet={item.image.srcSet}
                    sizes={item.image.sizes}
                    alt={item.image.alt}
                    loading="lazy"
                    width={item.image.width}
                    height={item.image.height}
                  />
                </div>
                <div className="card-body">
                  <span className="card-num">{pad(i + 1)}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="card-link">{item.link} <Arrow /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
        <p className="image-note">Photography is illustrative and does not depict Everis projects.</p>
      </div>
    </section>
  );
}
