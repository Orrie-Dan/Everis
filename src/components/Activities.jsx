import { ACTIVITIES, STRUCTURES, activityPath, pad } from '../data/content.js';
import Kicker, { Arrow } from './Kicker.jsx';
import Link from './Link.jsx';
import Reveal from './Reveal.jsx';
import SplitText from './SplitText.jsx';

export default function Activities() {
  return (
    <section id="activities" className="section activities" aria-labelledby="activities-title">
      <div className="container">
        <div className="section-head split">
          <div>
            <Kicker>Our Activities</Kicker>
            <SplitText id="activities-title">Five areas of activity. <span className="tone">One investment discipline.</span></SplitText>
          </div>
          <Reveal as="p" className="section-intro">Thermal and renewable generation, solar PV, battery storage, industrial power and selected electricity infrastructure. Each area is assessed on whether the energy need is clear and the commercial fundamentals hold.</Reveal>
        </div>

        <ul className="activity-grid">
          {ACTIVITIES.map((activity, i) => (
            <Reveal as="li" key={activity.title} className={['activity-card', activity.variant].filter(Boolean).join(' ')}>
              <Link className="card" to={activityPath(activity)}>
                <div className="card-media">
                  <img
                    src={activity.image.src}
                    srcSet={activity.image.srcSet}
                    sizes={activity.image.sizes}
                    alt={activity.image.alt}
                    loading="lazy"
                    width={activity.image.width}
                    height={activity.image.height}
                  />
                </div>
                <div className="card-body">
                  <span className="card-num">{pad(i + 1)}</span>
                  <h3>{activity.title}</h3>
                  <p>{activity.text}</p>
                  <span className="card-link">View details <Arrow /></span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>

        <Reveal className="structures">
          <p className="kicker">Project structures</p>
          <ul>{STRUCTURES.map(s => <li key={s}>{s}</li>)}</ul>
        </Reveal>
        <p className="image-note">Photography is illustrative and does not depict Everis projects.</p>
      </div>
    </section>
  );
}
