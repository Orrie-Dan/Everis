import Kicker from './Kicker.jsx';
import SplitText from './SplitText.jsx';

/**
 * Navy title band at the top of every page except Home. `children` go beside the intro (actions, topics).
 * With an `image` (activity pages) the photo fills the screen behind the title.
 */
export default function PageHero({ num, kicker, title, intro, image, children }) {
  return (
    <div className={image ? 'page-hero page-hero-image' : 'page-hero'}>
      {image && (
        <>
          <div className="page-hero-media">
            <img src={image.src} srcSet={image.srcSet} sizes="100vw" alt={image.alt} width={image.width} height={image.height} fetchPriority="high" />
          </div>
          <div className="hero-shade" aria-hidden="true"></div>
        </>
      )}
      <div className="container">
        <Kicker num={num} light>{kicker}</Kicker>
        <SplitText as="h1" className="page-title" tabIndex={-1}>{title}</SplitText>
        <div className="page-hero-foot">
          <p className="page-intro">{intro}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
