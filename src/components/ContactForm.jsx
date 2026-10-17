import { useRef, useState } from 'react';
import { SITE, getFormEndpoint } from '../config/site.js';
import { useEnquiry } from '../context/enquiry-context.js';
import { INTEREST_OPTIONS } from '../data/content.js';
import { LIMITS, buildMailtoUrl, downloadEnquiry, sendEnquiry, validateEnquiry, validateField } from '../lib/enquiry.js';
import { Arrow } from './Kicker.jsx';

const EMPTY = { name: '', email: '', organisation: '', message: '' };

function Field({ id, label, required, error, help, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{required && <> <span aria-hidden="true">*</span></>}</label>
      {children}
      {help && <p className="field-help" id={`${id}-help`}>{help}</p>}
      {required && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}

export default function ContactForm({ site = SITE }) {
  const { interest, setInterest, formRef, firstFieldRef } = useEnquiry();
  const [fields, setFields] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ text: '', error: false });
  const [sending, setSending] = useState(false);
  const honeypotRef = useRef(null);
  const refs = { name: firstFieldRef, email: useRef(null), interest: useRef(null), message: useRef(null) };

  const values = { ...fields, interest };
  const email = site.contact.email;
  const endpoint = getFormEndpoint(site);
  const say = (text, error = false) => setStatus({ text, error });

  /* Clear a field's error as soon as its value becomes valid. */
  const clearIfValid = (name, value) => {
    if (errors[name] && !validateField(name, value)) {
      setErrors(({ [name]: _removed, ...rest }) => rest);
    }
  };

  const onChange = event => {
    const { name, value } = event.target;
    if (name === 'interest') setInterest(value);
    else setFields(prev => ({ ...prev, [name]: value }));
    clearIfValid(name, value);
  };

  // An error stays hidden once its field is valid, e.g. after a shortcut elsewhere fills in the enquiry type.
  const errorFor = name => (errors[name] && validateField(name, values[name]) ? errors[name] : '');

  /* Sent: clear the form so it cannot be submitted twice by accident. */
  const onSent = () => {
    setFields(EMPTY);
    setInterest('');
    say(`Thank you — your enquiry has been sent. We will reply to ${values.email.trim()}.`);
  };

  const onSubmit = async event => {
    event.preventDefault();
    if (sending) return;
    const found = validateEnquiry(values);
    const invalid = Object.keys(found);
    setErrors(found);
    if (invalid.length) {
      refs[invalid[0]].current?.focus();
      say(invalid.length === 1 ? 'One field needs your attention.' : `${invalid.length} fields need your attention.`, true);
      return;
    }

    if (endpoint) {
      // Bots fill the hidden field; pretend to accept without sending.
      if (honeypotRef.current?.value) { onSent(); return; }
      setSending(true);
      say('Sending your enquiry…');
      try {
        await sendEnquiry(endpoint, values);
        onSent();
      } catch {
        say(`Your enquiry could not be sent. Please check your connection and try again${email ? `, or email us at ${email}` : ''}.`, true);
      } finally {
        setSending(false);
      }
      return;
    }

    if (email) {
      window.location.href = buildMailtoUrl(email, values);
      say('Your email application should now open with the enquiry ready to send.');
      return;
    }
    downloadEnquiry(values);
    say('A copy of your enquiry has been downloaded. It has not been sent — please keep it until Everis’s contact details are published.');
  };

  const submitLabel = endpoint ? (sending ? 'Sending…' : 'Send enquiry') : email ? 'Prepare email' : 'Download enquiry';
  const help = 'Fields marked * are required. Please do not include confidential information at this stage.'
    + (endpoint ? ' Enquiries are delivered to Everis by email through our form provider, Formspree.' : '');

  const invalidProps = name => ({
    'aria-invalid': errorFor(name) ? 'true' : undefined,
    'aria-describedby': `${name}-error`,
    ref: refs[name],
    required: true
  });

  return (
    <form id="contact-form" className="contact-form" noValidate onSubmit={onSubmit} ref={formRef} tabIndex={-1} aria-label="Enquiry form">
      {!endpoint && !email && (
        <div className="form-notice">
          <strong>Enquiry preview</strong>
          <p>Online delivery has not been set up yet. Submitting this form downloads a copy of your enquiry; nothing is sent or stored by this website.</p>
        </div>
      )}
      <div className="field-row">
        <Field id="name" label="Full name" required error={errorFor('name')}>
          <input id="name" name="name" autoComplete="name" maxLength={LIMITS.name} value={fields.name} onChange={onChange} {...invalidProps('name')} />
        </Field>
        <Field id="email" label="Email address" required error={errorFor('email')}>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={LIMITS.email} value={fields.email} onChange={onChange} {...invalidProps('email')} />
        </Field>
      </div>
      <div className="field-row">
        <Field id="organisation" label="Organisation">
          <input id="organisation" name="organisation" autoComplete="organization" maxLength={LIMITS.organisation} value={fields.organisation} onChange={onChange} />
        </Field>
        <Field id="interest" label="Nature of enquiry" required error={errorFor('interest')}>
          <select id="interest" name="interest" value={interest} onChange={onChange} {...invalidProps('interest')}>
            <option value="">Please select</option>
            {INTEREST_OPTIONS.map(option => <option key={option}>{option}</option>)}
          </select>
        </Field>
      </div>
      <Field
        id="message"
        label="Message"
        required
        error={errorFor('message')}
        help={help}
      >
        <textarea id="message" name="message" rows={5} maxLength={LIMITS.message} value={fields.message} onChange={onChange} {...invalidProps('message')} aria-describedby="message-help message-error" />
      </Field>
      {endpoint && (
        <div className="form-trap" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" ref={honeypotRef} tabIndex={-1} autoComplete="off" defaultValue="" />
        </div>
      )}
      {/* aria-disabled rather than disabled, so focus stays on the button while sending. */}
      <button className="btn btn-dark" type="submit" aria-disabled={sending || undefined}><span>{submitLabel}</span> <Arrow /></button>
      <p className={status.error ? 'form-status is-error' : 'form-status'} id="form-status" role="status" aria-live="polite">{status.text}</p>
    </form>
  );
}
