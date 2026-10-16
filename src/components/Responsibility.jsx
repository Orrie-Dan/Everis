import { useId, useState } from 'react';
import { COMMITMENTS } from '../data/content.js';
import Kicker from './Kicker.jsx';
import Reveal from './Reveal.jsx';
import SplitText from './SplitText.jsx';

const pad = n => String(n).padStart(2, '0');

/**
 * Home page: how projects are expected to be developed and run.
 * An index of commitments; opening one reveals its text and brings its image forward.
 */
export default function Responsibility() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const current = COMMITMENTS[active];

  return (
    <section id="responsibility" className="section responsibility" aria-labelledby="responsibility-title">
      <div className="container">
        <div className="section-head split">
          <div>
            <Kicker>Responsible development</Kicker>
            <SplitText id="responsibility-title">Built for decades. <em>Built responsibly.</em></SplitText>
          </div>
          <p className="section-intro">An energy asset is part of its landscape and community for its whole life. We hold the projects we back to standards that last as long.</p>
        </div>

        <div className="responsibility-grid">
          <ol className="commitment-index">
            {COMMITMENTS.map((item, i) => {
              const open = i === active;
              const triggerId = `${baseId}-trigger-${i}`;
              const panelId = `${baseId}-panel-${i}`;
              return (
                <Reveal as="li" key={item.title} className={`commitment${open ? ' is-active' : ''}`}>
                  <h3>
                    <button
                      type="button"
                      id={triggerId}
                      className="commitment-trigger"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setActive(i)}
                    >
                      <span className="commitment-num">{pad(i + 1)}</span>
                      <span className="commitment-title">{item.title}</span>
                      <span className="commitment-icon" aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={panelId} className="commitment-panel" role="region" aria-labelledby={triggerId} inert={!open}>
                    <div><p>{item.text}</p></div>
                  </div>
                </Reveal>
              );
            })}
          </ol>

          <figure className="commitment-media">
            {COMMITMENTS.map(({ title, image }, i) => (
              <img
                key={title}
                className={i === active ? 'is-active' : undefined}
                aria-hidden={i === active ? undefined : 'true'}
                {...image}
                loading="lazy"
              />
            ))}
            <figcaption className="commitment-caption" aria-hidden="true">
              <span>{pad(active + 1)} / {pad(COMMITMENTS.length)}</span>
              {current.title}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
