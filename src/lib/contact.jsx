import { SITE } from '../config/site.js';

/** [term, value] pairs for the configured contact details, in display order. */
export function contactEntries(contact = SITE.contact) {
  const entries = [];
  if (contact.email) entries.push(['Email', <a href={`mailto:${encodeURI(contact.email)}`}>{contact.email}</a>]);
  if (contact.phone) entries.push(['Telephone', <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>{contact.phone}</a>]);
  if (contact.address) {
    const lines = contact.address.split('\n');
    entries.push(['Office', lines.map((line, i) => <span key={i}>{line}{i < lines.length - 1 && <br />}</span>)]);
  }
  return entries;
}
