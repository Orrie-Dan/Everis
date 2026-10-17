/* SITE holds the only contact details and social links the website may display.
   Leave values empty until Everis has approved them — nothing is rendered for empty entries. */
export const SITE = {
  contact: {
    email: '',   // e.g. 'enquiries@example.com' — when set, the form opens an email draft instead of downloading
    phone: '',
    address: 'Unit PC-1, Level 7, Al Maryah Tower\nAbu Dhabi Global Market Square\nAl Maryah Island, Abu Dhabi\nUnited Arab Emirates'
  },
  /* Company registration statement shown in the footer. */
  legal: 'A private company limited by shares, registered in Abu Dhabi Global Market under number 39949. Registered office: Unit PC-1, Level 7, Al Maryah Tower, Abu Dhabi Global Market Square, Al Maryah Island, Abu Dhabi, United Arab Emirates.',
  social: [
    // { label: 'LinkedIn', url: 'https://www.linkedin.com/company/…' }
  ],
  /* Formspree endpoint that delivers the enquiry form by email, e.g. 'https://formspree.io/f/abcdwxyz'.
     The form ID is public by design. When set, it takes priority over the email draft and the download. */
  formEndpoint: ''
};

/** The configured Formspree endpoint, or '' when it is missing or not a Formspree form URL. */
export function getFormEndpoint(site = SITE) {
  const url = site.formEndpoint || '';
  return /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(url) ? url : '';
}

/** Social links with a label and an https URL; anything else is ignored. */
export function getSocialLinks(site = SITE) {
  return site.social.filter(item => item && item.label && /^https:\/\//.test(item.url || ''));
}
