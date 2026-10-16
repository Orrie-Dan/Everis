import Kicker from './Kicker.jsx';
import SplitText from './SplitText.jsx';

/** Navy title band at the top of every page except Home. `children` go beside the intro (actions, topics). */
export default function PageHero({ num, kicker, title, intro, children }) {
  return (
    <div className="page-hero">
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
