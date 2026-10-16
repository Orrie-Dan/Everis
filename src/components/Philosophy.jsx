import { useRef } from 'react';
import { PRINCIPLES } from '../data/content.js';
import { useAllowMotion } from '../hooks/useReducedMotion.js';
import { useScrollFrame } from '../hooks/useScrollFrame.js';
import Kicker from './Kicker.jsx';
import Reveal from './Reveal.jsx';
import SplitText from './SplitText.jsx';

export default function Philosophy() {
  const allowMotion = useAllowMotion();
  const figureRef = useRef(null);
  const imgRef = useRef(null);

  /* Image drifts within its frame as the figure crosses the viewport. */
  useScrollFrame(() => {
    const rect = figureRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < 0 || rect.top > vh) return;
    const offset = ((rect.top + rect.height / 2) - vh / 2) / vh; // -1 … 1
    imgRef.current.style.transform = `translate3d(0, ${-7 + offset * -6}%, 0)`;
  }, allowMotion);

  return (
    <section id="philosophy" className="section philosophy" aria-labelledby="philosophy-title">
      <div className="container philosophy-grid">
        <div className="philosophy-intro">
          <Kicker>Investment Philosophy</Kicker>
          <SplitText id="philosophy-title">Selective by design. <em>Built to endure.</em></SplitText>
          <p className="section-intro">Energy assets run for decades. We commit capital only where a project can stand up technically, commercially and financially for that long.</p>
          <figure className="philosophy-media" ref={figureRef}>
            <img
              ref={imgRef}
              style={allowMotion ? undefined : { transform: 'none' }}
              src="/assets/savanna-tree-1000.webp"
              srcSet="/assets/savanna-tree-1000.webp 1000w, /assets/savanna-tree-2000.webp 2000w"
              sizes="(max-width: 900px) 100vw, 40vw"
              alt="A lone tree on the savanna as the sun sets behind it"
              loading="lazy"
              width="2000"
              height="1333"
            />
          </figure>
        </div>
        <ol className="principles">
          {PRINCIPLES.map(p => (
            <Reveal as="li" key={p.num} className="principle">
              <span className="principle-num">{p.num}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
