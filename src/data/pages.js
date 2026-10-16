/* Site pages, in navigation order. vite.config.js also reads this list to write
   one HTML entry per page into dist/, so keep it free of imports. */

export const PAGES = [
  {
    path: '/',
    label: 'Home',
    title: 'Everis — Developing and Investing in Africa’s Energy Infrastructure',
    description: 'Everis develops and invests in energy infrastructure across Africa — from opportunity identification, feasibility and financing to construction oversight and long-term asset management.'
  },
  {
    path: '/about/',
    label: 'About',
    title: 'About — Everis',
    description: 'Everis is a developer and investor in African energy infrastructure. Learn about the roles we take on projects and the investment philosophy behind them.'
  },
  {
    path: '/activities/',
    label: 'Activities',
    title: 'Activities — Everis',
    description: 'Power generation, solar and energy storage, commercial and industrial power, energy asset acquisitions and electricity infrastructure.'
  },
  {
    path: '/approach/',
    label: 'Approach',
    title: 'Approach — Everis',
    description: 'How Everis takes projects from opportunity to operating asset (identify, evaluate, structure, finance, deliver and manage) and the partners it works with.'
  },
  {
    path: '/contact/',
    label: 'Contact',
    title: 'Contact — Everis',
    description: 'Bring Everis a project proposal, acquisition opportunity or investment discussion.'
  }
];

/* One detail page per activity, outside the navigation. Each slug matches an
   entry in ACTIVITIES (data/content.js), which holds the page content. */
const activityPage = (slug, name, description) => ({
  slug,
  path: `/activities/${slug}/`,
  title: `${name} — Activities — Everis`,
  description
});

export const ACTIVITY_PAGES = [
  activityPage('power-generation', 'Power Generation', 'How Everis develops and invests in thermal and renewable power projects, including independent power production under long-term offtake.'),
  activityPage('solar-energy-storage', 'Solar & Energy Storage', 'How Everis develops and invests in solar PV, battery storage and integrated solar-plus-storage for industrial customers.'),
  activityPage('commercial-industrial-power', 'Commercial & Industrial Power', 'Dedicated power supply from Everis for mining operations, manufacturers and other energy-intensive users.'),
  activityPage('energy-asset-acquisitions', 'Energy Asset Acquisitions', 'How Everis evaluates and acquires operating plants, project companies, energy portfolios and shareholdings in them.'),
  activityPage('electricity-infrastructure', 'Electricity Infrastructure', 'Everis’s selected investments in transmission, distribution and related electricity infrastructure.')
];

export const NOT_FOUND = {
  path: '/404.html',
  title: 'Page not found — Everis',
  description: 'The page you were looking for could not be found.'
};

/** The page for a normalised path (see normalizePath in lib/router.js), or undefined. */
export const findPage = path => [...PAGES, ...ACTIVITY_PAGES].find(page => page.path === path);
