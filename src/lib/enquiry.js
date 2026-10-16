/* Enquiry form rules and delivery helpers (pure, so they can be unit tested). */

export const FIELD_MESSAGES = {
  name: 'Please enter your full name.',
  email: 'Please enter a valid email address.',
  interest: 'Please choose the nature of your enquiry.',
  message: 'Please add a short message.'
};

export const REQUIRED_FIELDS = ['name', 'email', 'interest', 'message'];

// Same pattern browsers use for <input type="email"> validation (WHATWG HTML spec).
const EMAIL_PATTERN = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const LIMITS = { name: 120, email: 254, organisation: 160, message: 5000 };

/** Returns an error message for a field, or '' when it is valid. */
export function validateField(name, value) {
  const v = String(value ?? '').trim();
  switch (name) {
    case 'name':
    case 'interest':
    case 'message':
      return v ? '' : FIELD_MESSAGES[name];
    case 'email':
      return v && EMAIL_PATTERN.test(v) ? '' : FIELD_MESSAGES.email;
    default:
      return '';
  }
}

/** Validates all required fields; returns { fieldName: message } for the invalid ones, in form order. */
export function validateEnquiry(values) {
  const errors = {};
  REQUIRED_FIELDS.forEach(name => {
    const message = validateField(name, values[name]);
    if (message) errors[name] = message;
  });
  return errors;
}

export function buildEnquiryBody(values) {
  return [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Organisation: ${values.organisation.trim() || 'Not provided'}`,
    `Nature of enquiry: ${values.interest}`,
    '',
    values.message.trim()
  ].join('\n');
}

export function buildMailtoUrl(to, values) {
  const subject = `Enquiry: ${values.interest}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildEnquiryBody(values))}`;
}

/** Downloads the enquiry as a text file. Nothing is sent anywhere. */
export function downloadEnquiry(values) {
  const content = `ENQUIRY FOR EVERIS\nPrepared locally — not sent\n\n${buildEnquiryBody(values)}\n`;
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'everis-enquiry.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
