import { Fragment, useRef, useState } from 'react';
import { LIFECYCLE, ROLES, pad } from '../data/content.js';
import { useAllowMotion } from '../hooks/useReducedMotion.js';
import { useScrollFrame } from '../hooks/useScrollFrame.js';
import Kicker from './Kicker.jsx';
import Reveal from './Reveal.jsx';

const STATEMENT = 'Everis is a developer and investor in African energy infrastructure. We take projects from the first identification of an opportunity to the long-term ownership of an operating asset, bringing technical, commercial and financial discipline to each stage.';
const WORDS = STATEMENT.split(/\s+/);

/* Words light up as the paragraph scrolls through view. */
function Statement() {
  const allowMotion = useAllowMotion();
  const ref = useRef(null);
  const [lit, setLit] = useState(0);

  useScrollFrame(() => {
    const rect = ref.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.35)));
    setLit(Math.round(progress * WORDS.length));
  }, allowMotion);

  return (
    <p className="statement" ref={ref}>
      {allowMotion
        ? WORDS.map((word, i) => (
          <Fragment key={i}>
            <span className={i < lit ? 'word is-lit' : 'word'}>{word}</span>
            {i < WORDS.length - 1 ? ' ' : ''}
          </Fragment>
        ))
        : STATEMENT}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <div className="section-head">
          <Kicker>About Everis</Kicker>
          <h2 id="about-title" className="visually-hidden">About Everis</h2>
        </div>
        <Statement />

        <div className="about-grid">
          <Reveal as="figure" className="about-media">
            <img
              src="/assets/power-plant-savanna-dusk-760.webp"
              srcSet="/assets/power-plant-savanna-dusk-760.webp 760w, /assets/power-plant-savanna-dusk-1400.webp 1400w"
              sizes="(max-width: 900px) 100vw, 45vw"
              alt="A gas-fired power plant and switchyard on the savanna at sunset"
              loading="lazy"
              width="1400"
              height="933"
            />
          </Reveal>
          <div className="about-body">
            <Reveal as="p" className="lead">Depending on the opportunity, Everis may act as project sponsor, developer, investor, acquirer or shareholder. Our involvement can cover the full project lifecycle, usually through dedicated project companies.</Reveal>
            <Reveal as="ol" className="lifecycle-list" aria-label="Project lifecycle">
              {LIFECYCLE.map((name, i) => (
                <li key={name}><span className="li-num">{pad(i + 1)}</span><span className="li-name">{name}</span></li>
              ))}
            </Reveal>
            <Reveal as="ul" className="role-tags" aria-label="Roles Everis may take">
              {ROLES.map(role => <li key={role}>{role}</li>)}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
