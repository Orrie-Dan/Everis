import { describe, expect, it } from 'vitest';
import { FIELD_MESSAGES, buildEnquiryBody, buildMailtoUrl, validateEnquiry, validateField } from './enquiry.js';

const valid = {
  name: 'Ada Obi',
  email: 'ada@example.com',
  organisation: '',
  interest: 'Project proposal',
  message: 'A 20 MW solar site.'
};

describe('validateField', () => {
  it('rejects empty and whitespace-only required values', () => {
    expect(validateField('name', '   ')).toBe(FIELD_MESSAGES.name);
    expect(validateField('message', '')).toBe(FIELD_MESSAGES.message);
    expect(validateField('interest', '')).toBe(FIELD_MESSAGES.interest);
  });

  it('accepts well-formed emails and rejects malformed ones', () => {
    expect(validateField('email', 'ada@example.com')).toBe('');
    expect(validateField('email', ' ada@example.com ')).toBe('');
    expect(validateField('email', 'ada@')).toBe(FIELD_MESSAGES.email);
    expect(validateField('email', 'ada example.com')).toBe(FIELD_MESSAGES.email);
    expect(validateField('email', '')).toBe(FIELD_MESSAGES.email);
  });

  it('treats organisation as optional', () => {
    expect(validateField('organisation', '')).toBe('');
  });
});

describe('validateEnquiry', () => {
  it('returns no errors for a complete enquiry', () => {
    expect(validateEnquiry(valid)).toEqual({});
  });

  it('lists invalid fields in form order', () => {
    const errors = validateEnquiry({ ...valid, name: '', message: ' ', email: 'x' });
    expect(Object.keys(errors)).toEqual(['name', 'email', 'message']);
  });
});

describe('enquiry text', () => {
  it('fills in a placeholder for a missing organisation', () => {
    expect(buildEnquiryBody(valid)).toBe(
      'Name: Ada Obi\nEmail: ada@example.com\nOrganisation: Not provided\nNature of enquiry: Project proposal\n\nA 20 MW solar site.'
    );
  });

  it('encodes subject and body in the mailto URL', () => {
    const url = buildMailtoUrl('enquiries@example.com', valid);
    expect(url.startsWith('mailto:enquiries@example.com?subject=Enquiry%3A%20Project%20proposal&body=')).toBe(true);
    expect(decodeURIComponent(url.split('&body=')[1])).toBe(buildEnquiryBody(valid));
  });
});
