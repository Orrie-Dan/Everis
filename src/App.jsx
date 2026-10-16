import { useEffect, useState } from 'react';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import { EnquiryProvider } from './context/EnquiryContext.jsx';
import { findActivity } from './data/content.js';
import { NOT_FOUND, findPage } from './data/pages.js';
import { usePageChange } from './hooks/usePageChange.js';
import { useAllowMotion } from './hooks/useReducedMotion.js';
import { useLocation } from './lib/router.js';
import { AboutPage, ActivitiesPage, ActivityPage, ApproachPage, ContactPage, HomePage, NotFoundPage } from './pages/index.jsx';

/* Page component for each path in data/pages.js. */
const VIEWS = {
  '/': HomePage,
  '/about/': AboutPage,
  '/activities/': ActivitiesPage,
  '/approach/': ApproachPage,
  '/contact/': ContactPage
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const allowMotion = useAllowMotion();
  const { path, hash } = useLocation();
  const activity = findActivity(path);
  const page = findPage(path);
  const View = VIEWS[path] ?? (activity && page ? ActivityPage : NotFoundPage);
  usePageChange(path, hash, page ?? NOT_FOUND);

  // .js-motion gates every reveal style in styles.css; without it content renders statically.
  useEffect(() => {
    document.documentElement.classList.toggle('js-motion', allowMotion);
  }, [allowMotion]);

  return (
    <EnquiryProvider>
      <a className="skip" href="#main">Skip to content</a>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="main" inert={menuOpen}>
        <View key={path} activity={activity} />
      </main>
      <Footer inert={menuOpen} />
    </EnquiryProvider>
  );
}
