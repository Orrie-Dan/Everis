import { useRef, useState } from 'react';
import { STEPS, pad } from '../data/content.js';
import { useScrollFrame } from '../hooks/useScrollFrame.js';
import Kicker from './Kicker.jsx';
import SplitText from './SplitText.jsx';

export default function Approach() {
  const listRef = useRef(null);
  const [activeCount, setActiveCount] = useState(0);

  /* Progress line fills and steps light up as they pass 60% of the viewport. */
  useScrollFrame(() => {
    const list = listRef.current;
    const rect = list.getBoundingClientRect();
    const marker = window.innerHeight * 0.6;
    const progress = Math.min(1, Math.max(0, (marker - rect.top) / rect.height));
    list.style.setProperty('--progress', progress.toFixed(3));
    const steps = [...list.children];
    setActiveCount(steps.filter(step => step.getBoundingClientRect().top < marker).length);
  });

  return (
    <section id="approach" className="section approach" aria-labelledby="approach-title">
      <div className="container approach-grid">
        <div className="approach-head">
          <Kicker>Our Approach</Kicker>
          <SplitText id="approach-title">From opportunity <span className="tone">to operating asset.</span></SplitText>
          <p className="section-intro">One sequence, from first screening to long-term ownership.</p>
        </div>
        <ol className="steps" ref={listRef}>
          {STEPS.map((step, i) => (
            <li key={step.title} className={i < activeCount ? 'step is-active' : 'step'}>
              <span className="step-num">{pad(i + 1)}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
