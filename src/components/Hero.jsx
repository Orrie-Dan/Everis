import { useEffect, useRef, useState } from 'react';
import { useEnquiry } from '../context/enquiry-context.js';
import { useAllowMotion } from '../hooks/useReducedMotion.js';
import { useScrollFrame } from '../hooks/useScrollFrame.js';
import { Arrow } from './Kicker.jsx';
import Link from './Link.jsx';
import SplitText from './SplitText.jsx';

export default function Hero() {
  const { chooseInterest } = useEnquiry();
  const allowMotion = useAllowMotion();
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  /* The background video plays only when motion is allowed and the visitor has not
     asked to save data; otherwise the still image stands in for it. */
  const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData === true;
  const playVideo = allowMotion && !saveData;

  /* React does not reflect `muted` as an attribute, which some browsers need before
     they will autoplay, so set it on the element and start playback explicitly. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play()?.catch(() => {});
  }, [playVideo]);

  /* Light parallax on the hero image while it is on screen. */
  useScrollFrame(() => {
    const el = mediaRef.current;
    if (!el) return;
    const vh = window.innerHeight;
    if (el.getBoundingClientRect().top > vh) return;
    el.style.transform = `translate3d(0, ${Math.min(window.scrollY, vh) * 0.18}px, 0)`;
  }, allowMotion);

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-frame">
        <div className="hero-media" ref={mediaRef} style={allowMotion ? undefined : { transform: 'none' }}>
          <img
            src="/assets/hero-solar-aerial-2400.webp"
            srcSet="/assets/hero-solar-aerial-1200.webp 1200w, /assets/hero-solar-aerial-2400.webp 2400w"
            sizes="100vw"
            alt="Aerial view of a utility-scale solar plant stretching to distant hills"
            fetchPriority="high"
            width="2400"
            height="1350"
          />
          {playVideo && (
            <video
              ref={videoRef}
              className={`hero-video${playing ? ' is-playing' : ''}`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              onPlaying={() => setPlaying(true)}
            >
              <source src="/assets/hero-solar-aerial-720.mp4" type="video/mp4" media="(max-width: 900px)" />
              <source src="/assets/hero-solar-aerial-1080.mp4" type="video/mp4" />
            </video>
          )}
        </div>
        <div className="hero-shade" aria-hidden="true"></div>
        <div className="hero-content">
          <p className="kicker kicker-light hero-kicker"><span className="kicker-rule" aria-hidden="true"></span>Energy infrastructure · Africa</p>
          <SplitText as="h1" id="hero-title" className="hero-title" tabIndex={-1}>
            Developing and Investing in <em>Africa’s Energy Infrastructure.</em>
          </SplitText>
          <div className="hero-foot">
            <p className="hero-intro">Everis develops, finances and invests in power generation and electricity infrastructure, from first assessment through to long-term ownership.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/activities/">Explore Our Activities <Arrow /></Link>
              <Link className="btn btn-ghost" to="/contact/#contact-form" onClick={() => chooseInterest('Partnership enquiry')}>Partner With Us</Link>
            </div>
          </div>
        </div>
        <a className="hero-scroll" href="#overview"><span>Scroll</span><span className="hero-scroll-line" aria-hidden="true"></span></a>
      </div>
    </section>
  );
}
