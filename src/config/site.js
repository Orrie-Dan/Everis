/* SITE holds the only contact details and social links the website may display.
   Leave values empty until Everis has approved them — nothing is rendered for empty entries. */
export const SITE = {
  contact: {
    email: '',   // e.g. 'enquiries@example.com' — when set, the form opens an email draft instead of downloading
    phone: '',
    address: ''
  },
  social: [
    // { label: 'LinkedIn', url: 'https://www.linkedin.com/company/…' }
  ]
};

/** Social links with a label and an https URL; anything else is ignored. */
export function getSocialLinks(site = SITE) {
  return site.social.filter(item => item && item.label && /^https:\/\//.test(item.url || ''));
}
