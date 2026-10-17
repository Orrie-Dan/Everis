import { useEnquiry } from '../context/enquiry-context.js';
import { ACTIVITIES, activityPath, pad } from '../data/content.js';
import Kicker, { Arrow } from './Kicker.jsx';
import Link from './Link.jsx';
import Reveal from './Reveal.jsx';

/** Body of an activity's detail page: overview, what it covers, what we look for, and the next activity. */
export default function ActivityDetail({ activity }) {
  const { chooseInterest } = useEnquiry();
  const index = ACTIVITIES.indexOf(activity);
  const next = ACTIVITIES[(index + 1) % ACTIVITIES.length];
  const { details } = activity;

  return (
    <section id="activity" className="section activity-detail" aria-labelledby="activity-overview-title">
      <div className="container">
        <div className="activity-detail-body">
          <Kicker>Overview</Kicker>
          <h2 id="activity-overview-title" className="visually-hidden">Overview</h2>
          <Reveal as="p" className="activity-overview">{details.overview}</Reveal>

          <div className="activity-lists">
            <Reveal>
              <h3>What it covers</h3>
              <ul>{details.covers.map(item => <li key={item}>{item}</li>)}</ul>
            </Reveal>
            <Reveal>
              <h3>What we look for</h3>
              <ul>{details.criteria.map(item => <li key={item}>{item}</li>)}</ul>
            </Reveal>
          </div>

          <div className="activity-actions">
            <Link className="btn btn-primary" to="/contact/#contact-form" onClick={() => chooseInterest(activity.interest)}>
              Discuss an opportunity <Arrow />
            </Link>
            <Link className="btn btn-outline" to="/activities/">All activities</Link>
          </div>
        </div>

        <nav className="activity-next" aria-label="Next activity">
          <Link to={activityPath(next)}>
            <span className="kicker">Next activity · {pad(ACTIVITIES.indexOf(next) + 1)}</span>
            <span className="activity-next-title">{next.title} <Arrow /></span>
          </Link>
        </nav>
        <p className="image-note">Photography is illustrative and does not depict Everis projects.</p>
      </div>
    </section>
  );
}
