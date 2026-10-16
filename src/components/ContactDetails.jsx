import { SITE } from '../config/site.js';
import { contactEntries } from '../lib/contact.jsx';

/** Definition list of contact details beside the form; renders nothing until details are configured. */
export default function ContactDetails({ contact = SITE.contact }) {
  const entries = contactEntries(contact);
  if (!entries.length) return null;
  return (
    <div className="contact-details">
      <dl>
        {entries.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}
      </dl>
    </div>
  );
}
