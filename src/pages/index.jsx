import About from '../components/About.jsx';
import ActivityDetail from '../components/ActivityDetail.jsx';
import Activities from '../components/Activities.jsx';
import Approach from '../components/Approach.jsx';
import Contact from '../components/Contact.jsx';
import ContactBanner from '../components/ContactBanner.jsx';
import Drivers from '../components/Drivers.jsx';
import Hero from '../components/Hero.jsx';
import { Arrow } from '../components/Kicker.jsx';
import Link from '../components/Link.jsx';
import Opportunities from '../components/Opportunities.jsx';
import Overview from '../components/Overview.jsx';
import PageHero from '../components/PageHero.jsx';
import Partnerships from '../components/Partnerships.jsx';
import Philosophy from '../components/Philosophy.jsx';
import Responsibility from '../components/Responsibility.jsx';
import { useEnquiry } from '../context/enquiry-context.js';
import { ACTIVITIES, CTA_TOPICS, pad } from '../data/content.js';

/* One component per page. Paths and titles live in data/pages.js. */

export function HomePage() {
  return (
    <>
      <Hero />
      <Overview />
      <Drivers />
      <Opportunities />
      <Responsibility />
      <ContactBanner />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero num="01" kicker="About" title={<>About <em>Everis.</em></>} intro="A developer and investor in African energy infrastructure, and the principles that guide where we commit capital." />
      <About />
      <Philosophy />
      <ContactBanner />
    </>
  );
}

export function ActivitiesPage() {
  return (
    <>
      <PageHero num="02" kicker="Activities" title={<>What we <em>do.</em></>} intro="We develop and invest in power generation, solar and storage, industrial power, operating assets and electricity infrastructure." />
      <Activities />
      <ContactBanner />
    </>
  );
}

export function ActivityPage({ activity }) {
  return (
    <>
      <PageHero num={pad(ACTIVITIES.indexOf(activity) + 1)} kicker="Activities" title={activity.title} intro={activity.text}>
        <Link className="btn btn-ghost" to="/activities/"><span aria-hidden="true">←</span> All activities</Link>
      </PageHero>
      <ActivityDetail activity={activity} />
      <ContactBanner />
    </>
  );
}

export function ApproachPage() {
  return (
    <>
      <PageHero num="03" kicker="Approach" title={<>How we <em>work.</em></>} intro="One sequence from first screening to long-term ownership, and the partners each project brings together." />
      <Approach />
      <Partnerships />
      <ContactBanner />
    </>
  );
}

export function ContactPage() {
  const { chooseInterest } = useEnquiry();
  return (
    <>
      <PageHero num="04" kicker="Contact" title={<>Get in <em>touch.</em></>} intro="We welcome project proposals, acquisition opportunities and investment discussions from governments, utilities, developers, industrial users, lenders and investors.">
        <ul className="cta-topics" aria-label="Choose a topic">
          {CTA_TOPICS.map(topic => (
            <li key={topic.interest}>
              <button type="button" onClick={() => chooseInterest(topic.interest, { focusForm: true })}>{topic.label}</button>
            </li>
          ))}
        </ul>
      </PageHero>
      <Contact />
    </>
  );
}

export function NotFoundPage() {
  return (
    <PageHero kicker="Error 404" title={<>Page not <em>found.</em></>} intro="The page you were looking for does not exist or has moved.">
      <Link className="btn btn-primary" to="/">Back to home <Arrow /></Link>
    </PageHero>
  );
}
