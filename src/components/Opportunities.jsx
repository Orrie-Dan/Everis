import { useEnquiry } from '../context/enquiry-context.js';
import { STAGES, SUBMISSION_ITEMS, pad } from '../data/content.js';
import Kicker, { Arrow } from './Kicker.jsx';
import Link from './Link.jsx';
import Reveal from './Reveal.jsx';
import SplitText from './SplitText.jsx';

/** Home page: the project stages Everis considers and what to include in a proposal. */
export default function Opportunities() {
  const { chooseInterest } = useEnquiry();

  return (
    <section id="opportunities" className="section opportunities" aria-labelledby="opportunities-title">
      <div className="container">
        <div className="section-head split">
          <div>
            <Kicker>Opportunities we consider</Kicker>
            <SplitText id="opportunities-title">Greenfield to operating. <span className="tone">At any stage.</span></SplitText>
          </div>
          <Reveal as="p" className="section-intro">We look at projects across the lifecycle. What matters is a clear energy need, a credible route to market and fundamentals that can support long-term ownership.</Reveal>
        </div>

        <div className="opportunities-grid">
          <ol className="stage-list">
            {STAGES.map((stage, i) => (
              <Reveal as="li" key={stage.title} className="stage">
                <span className="stage-num">{pad(i + 1)}</span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal className="submission">
            <h3>Bringing us a project?</h3>
            <p>An initial assessment is quicker when a proposal covers:</p>
            <ul className="submission-list">
              {SUBMISSION_ITEMS.map(item => <li key={item}>{item}</li>)}
            </ul>
            <Link className="btn btn-primary" to="/contact/#contact-form" onClick={() => chooseInterest('Project proposal')}>Submit a project proposal <Arrow /></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
