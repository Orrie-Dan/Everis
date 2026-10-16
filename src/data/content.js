/* Page content. Image paths point to files in public/assets. */
import { PAGES } from './pages.js';

export const NAV_LINKS = PAGES.map(({ path, label }) => ({ href: path, label }));

export const FOOTER_LINKS = [
  { href: '/about/', label: 'About' },
  { href: '/about/#philosophy', label: 'Philosophy' },
  { href: '/activities/', label: 'Activities' },
  { href: '/approach/', label: 'Approach' },
  { href: '/approach/#partnerships', label: 'Partnerships' },
  { href: '/contact/', label: 'Contact' }
];

export const LIFECYCLE = [
  'Opportunity identification',
  'Feasibility',
  'Financing',
  'Construction oversight',
  'Long-term asset management'
];

export const ROLES = ['Sponsor', 'Developer', 'Investor', 'Acquirer', 'Shareholder'];

const srcset = (name, sizes) => sizes.map(w => `/assets/${name}-${w}.webp ${w}w`).join(', ');

/* Activities page. Each `slug` names its detail page (ACTIVITY_PAGES in data/pages.js);
   `details` fills that page: qualitative only, no figures or named projects.
   DRAFT copy pending review by Everis. */
export const ACTIVITIES = [
  {
    title: 'Power Generation',
    slug: 'power-generation',
    interest: 'Power generation',
    text: 'Development of and investment in thermal and renewable power projects, including independent power production under long-term offtake arrangements.',
    variant: 'card-lg',
    details: {
      overview: 'Everis develops and invests in thermal and renewable power plants that supply national grids and large offtakers. Projects are typically structured as independent power producers selling electricity under long-term agreements with utilities or other creditworthy buyers.',
      covers: [
        'Wind, hydro and other renewable generation',
        'Gas-fired and other thermal generation',
        'Independent power production under long-term offtake',
        'Greenfield development and brownfield expansion'
      ],
      criteria: [
        'A clear demand for new capacity',
        'A creditworthy offtaker and bankable power purchase terms',
        'Proven resource, fuel supply and site conditions',
        'A realistic path to grid connection and permits'
      ]
    },
    image: {
      src: '/assets/wind-savanna-dusk-760.webp',
      srcSet: srcset('wind-savanna-dusk', [760, 1400]),
      sizes: '(max-width: 700px) 100vw, (max-width: 1100px) 100vw, 58vw',
      alt: 'Wind turbines across bushveld hills at sunset',
      width: 1400, height: 933
    }
  },
  {
    title: 'Solar & Energy Storage',
    slug: 'solar-energy-storage',
    interest: 'Solar and energy storage',
    text: 'Solar PV and battery storage projects, including integrated solar-plus-storage solutions for industrial customers.',
    variant: 'card-tall',
    details: {
      overview: 'Solar PV is one of the fastest ways to add generation, and battery storage makes it more useful by shifting supply to when it is needed. We back utility-scale and distributed projects, including integrated solar-plus-storage systems for industrial customers.',
      covers: [
        'Utility-scale and ground-mounted solar PV',
        'Battery energy storage systems',
        'Solar-plus-storage for industrial and commercial sites',
        'Hybrid systems alongside existing generation'
      ],
      criteria: [
        'Strong solar resource and suitable land or rooftops',
        'A defined use for storage, from peak shifting to backup',
        'Offtake or savings that support the investment',
        'Proven technology and experienced delivery partners'
      ]
    },
    image: {
      src: '/assets/solar-aerial-760.webp',
      srcSet: srcset('solar-aerial', [760, 1400]),
      sizes: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 40vw',
      alt: 'Aerial view of rows of ground-mounted solar panels',
      width: 1400, height: 1050
    }
  },
  {
    title: 'Commercial & Industrial Power',
    slug: 'commercial-industrial-power',
    interest: 'Commercial and industrial power',
    text: 'Dedicated power supply for mining operations, manufacturers and other energy-intensive users.',
    details: {
      overview: 'Mines, manufacturers and processors often need more reliable or lower-cost power than the grid can provide. We develop, finance and own dedicated supply on or near the customer’s site, so they can focus on their core operations.',
      covers: [
        'Captive power for mining and processing operations',
        'On-site and near-site generation for manufacturers',
        'Solar, storage, thermal and hybrid solutions',
        'Supply under long-term energy or lease agreements'
      ],
      criteria: [
        'An energy-intensive customer with a long operating horizon',
        'A clear reliability or cost case against existing supply',
        'Contract terms that match the life of the asset',
        'Site access, permits and integration with operations'
      ]
    },
    image: {
      src: '/assets/industrial-solar-campus-760.webp',
      srcSet: srcset('industrial-solar-campus', [760, 1400]),
      sizes: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw',
      alt: 'An industrial warehouse with rooftop solar, solar car-park canopies and battery storage units at sunset',
      width: 1400, height: 933
    }
  },
  {
    title: 'Energy Asset Acquisitions',
    slug: 'energy-asset-acquisitions',
    interest: 'Energy asset acquisitions',
    text: 'Evaluation and acquisition of operating plants, project companies and energy portfolios, together with shareholdings in them.',
    details: {
      overview: 'Not every opportunity starts from a greenfield site. We evaluate and acquire operating plants, project companies and portfolios, as well as shareholdings in them, and manage them as long-term owners.',
      covers: [
        'Operating power plants and project companies',
        'Portfolios of generation or infrastructure assets',
        'Majority or minority shareholdings',
        'Projects that need a new sponsor to reach completion'
      ],
      criteria: [
        'A sound operating and contractual record',
        'Clear ownership, permits and title',
        'Room to improve performance or extend asset life',
        'Sellers and co-shareholders aligned on governance'
      ]
    },
    image: {
      src: '/assets/power-plant-savanna-dusk-760.webp',
      srcSet: srcset('power-plant-savanna-dusk', [760, 1400]),
      sizes: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw',
      alt: 'A gas-fired power plant and switchyard on the savanna at sunset',
      width: 1400, height: 933
    }
  },
  {
    title: 'Electricity Infrastructure',
    slug: 'electricity-infrastructure',
    interest: 'Electricity infrastructure',
    text: 'Selected investments in transmission, distribution and related electricity infrastructure.',
    details: {
      overview: 'New generation is only as useful as the network that carries it. We make selected investments in transmission, distribution and related infrastructure that connect supply to demand and strengthen the reliability of power systems.',
      covers: [
        'Transmission lines and substations',
        'Distribution networks and upgrades',
        'Grid connections for generation projects',
        'Related infrastructure under concessions or partnerships'
      ],
      criteria: [
        'A clear system need recognised by the utility or regulator',
        'A stable regulatory or concession framework',
        'Revenue arrangements that support long-term investment',
        'Partners with the capability to build and operate'
      ]
    },
    image: {
      src: '/assets/transmission-dusk-760.webp',
      srcSet: srcset('transmission-dusk', [760, 1400]),
      sizes: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw',
      alt: 'High-voltage transmission towers against an orange sunset',
      width: 1400, height: 933
    }
  }
];

/* Home page previews of the other pages. */
export const OVERVIEW = [
  {
    href: '/about/',
    title: 'About Everis',
    text: 'Who we are, the roles we take on projects and the investment philosophy behind them.',
    link: 'About us',
    image: {
      src: '/assets/power-plant-savanna-dusk-760.webp',
      srcSet: srcset('power-plant-savanna-dusk', [760, 1400]),
      sizes: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw',
      alt: 'A gas-fired power plant and switchyard on the savanna at sunset',
      width: 1400, height: 933
    }
  },
  {
    href: '/activities/',
    title: 'Our Activities',
    text: 'Power generation, solar and storage, industrial power, asset acquisitions and electricity infrastructure.',
    link: 'Explore our activities',
    image: {
      src: '/assets/wind-savanna-dusk-760.webp',
      srcSet: srcset('wind-savanna-dusk', [760, 1400]),
      sizes: '(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw',
      alt: 'Wind turbines across bushveld hills at sunset',
      width: 1400, height: 933
    }
  },
  {
    href: '/approach/',
    title: 'Our Approach',
    text: 'One sequence from first screening to long-term ownership, and the partners each project needs.',
    link: 'See our approach',
    image: {
      src: '/assets/solar-rows-aerial-760.webp',
      srcSet: srcset('solar-rows-aerial', [760, 1400]),
      sizes: '(max-width: 1100px) 100vw, 33vw',
      alt: 'Aerial view of diagonal rows of solar panels across a field of dry grass',
      width: 1400, height: 933
    }
  }
];

export const STRUCTURES = [
  'Independent power production',
  'Power purchase agreements',
  'Public-private partnerships',
  'Concessions',
  'Acquisitions',
  'Co-investments'
];

export const PRINCIPLES = [
  { num: 'I', title: 'Commercial discipline', text: 'Each opportunity must answer a clear energy need, have a creditworthy route to market and sound project economics before we commit to it.' },
  { num: 'II', title: 'Risk management', text: 'We assess technical, contractual, financial and counterparty risks early, and allocate them in the project structure to the parties best placed to manage them.' },
  { num: 'III', title: 'Practical execution', text: 'We put coordinated delivery ahead of theoretical plans, overseeing engineering, procurement and construction with the operating phase in mind.' },
  { num: 'IV', title: 'Long-term value creation', text: 'We invest as owners, managing assets through operation to keep them reliable, well governed and valuable over the long term.' }
];

export const STEPS = [
  { title: 'Identify', text: 'Source and screen opportunities where the energy need is clear and the fundamentals look sound, whether greenfield, brownfield or operating.' },
  { title: 'Evaluate', text: 'Assess technical feasibility, resource and site conditions, offtake, project economics and key risks.' },
  { title: 'Structure', text: 'Establish the contractual, ownership and investment structures, from PPAs and concessions to joint ventures and co-investments.' },
  { title: 'Finance', text: 'Arrange equity and debt with lenders, investors and project partners on terms that suit the asset’s life.' },
  { title: 'Deliver & Manage', text: 'Coordinate delivery, oversee construction and manage the asset through operation as a long-term owner.' }
];

export const PARTNERS = [
  { title: 'Governments', text: 'Public-private partnerships, concessions and national energy priorities.' },
  { title: 'Utilities', text: 'Generation capacity, offtake and grid infrastructure that strengthen supply.' },
  { title: 'Industrial customers', text: 'Dependable, dedicated power for mining, manufacturing and heavy industry.' },
  { title: 'Developers', text: 'Co-development, project acquisition and capital for promising projects.' },
  { title: 'Lenders', text: 'Bankable structures, robust due diligence and an engaged sponsor.' },
  { title: 'Investors', text: 'Co-investment in carefully selected, well-structured energy assets.' }
];

/* Home page: why the market needs investment. Qualitative on purpose; add figures only with a cited source. */
export const DRIVERS = [
  { title: 'Rising demand', text: 'Growing populations, expanding cities and new industry are adding electricity demand faster than many systems can add supply.' },
  { title: 'Reliable industrial supply', text: 'Mines, manufacturers and processors need dependable power to operate and expand, and many cannot rely on the grid alone.' },
  { title: 'Abundant resources', text: 'Strong solar, wind, hydro and gas resources can be developed into competitive, long-lived generation.' },
  { title: 'Grids that need investment', text: 'Transmission and distribution networks need new capital to connect generation, reduce losses and reach more users.' }
];

/* Home page: the project stages Everis looks at, and what helps an early assessment. */
export const STAGES = [
  { title: 'Early-stage development', text: 'Projects with an identified site and energy need, where we can lead or join development, studies, permitting and offtake negotiation.' },
  { title: 'Construction-ready', text: 'Projects approaching financial close that need an engaged sponsor, equity, or support in finalising contracts and financing.' },
  { title: 'Operating assets', text: 'Operating plants, project companies and portfolios available for acquisition, or shareholdings in them.' }
];

export const SUBMISSION_ITEMS = [
  'Location, technology and intended capacity',
  'Current stage and development history',
  'Offtaker or route to market',
  'Status of land, permits and grid connection',
  'Studies completed to date',
  'Ownership and capital sought'
];

/* Home page: how projects are expected to be developed and run. */
/* Home page responsible development index: each commitment swaps the image beside the list. */
const COMMITMENT_SIZES = '(max-width: 900px) 100vw, 45vw';

export const COMMITMENTS = [
  {
    title: 'Environment and society',
    text: 'Environmental and social impacts are assessed from feasibility onwards and managed through construction and operation.',
    image: {
      src: '/assets/power-station-lakeside-760.webp',
      srcSet: srcset('power-station-lakeside', [760, 1400]),
      sizes: COMMITMENT_SIZES,
      alt: 'A power station across a lake, seen past reeds and a wooden jetty',
      width: 1400, height: 933
    }
  },
  {
    title: 'Health and safety',
    text: 'Safe working practices are a condition of every site, from early surveys through to long-term operation.',
    image: {
      src: '/assets/solar-site-safety-760.webp',
      srcSet: srcset('solar-site-safety', [760, 1400]),
      sizes: COMMITMENT_SIZES,
      alt: 'Two engineers in hard hats reviewing documents beside a row of solar panels',
      width: 1400, height: 933
    }
  },
  {
    title: 'Local communities',
    text: 'We engage early with the communities around a project and look for local employment and supply opportunities.',
    image: {
      src: '/assets/solar-village-dusk-760.webp',
      srcSet: srcset('solar-village-dusk', [760, 1400]),
      sizes: COMMITMENT_SIZES,
      alt: 'Villagers at a market stall and a vegetable garden beside a solar-roofed community building at sunset',
      width: 1400, height: 933
    }
  },
  {
    title: 'Governance and integrity',
    text: 'Clear governance, transparent reporting and zero tolerance for corruption in every project company.',
    image: {
      src: '/assets/control-centre-dusk-760.webp',
      srcSet: srcset('control-centre-dusk', [760, 1400]),
      sizes: COMMITMENT_SIZES,
      alt: 'Operators at their desks in a power plant control room, with the plant visible through the windows at sunset',
      width: 1400, height: 788
    }
  }
];

export const CTA_TOPICS = [
  { label: 'Project proposals', interest: 'Project proposal' },
  { label: 'Acquisition opportunities', interest: 'Acquisition opportunity' },
  { label: 'Investment discussions', interest: 'Investment discussion' }
];

/** Options for the "Nature of enquiry" select. Shortcuts may only preselect one of these. */
export const INTEREST_OPTIONS = [
  'Project proposal',
  'Acquisition opportunity',
  'Investment discussion',
  'Partnership enquiry',
  'Power generation',
  'Solar and energy storage',
  'Commercial and industrial power',
  'Energy asset acquisitions',
  'Electricity infrastructure',
  'General enquiry'
];

export const pad = n => String(n).padStart(2, '0');

/** Detail page path for an activity. */
export const activityPath = activity => `/activities/${activity.slug}/`;

/** The activity whose detail page is at a normalised path, or undefined. */
export const findActivity = path => ACTIVITIES.find(activity => activityPath(activity) === path);
