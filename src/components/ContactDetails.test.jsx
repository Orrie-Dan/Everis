import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { getSocialLinks } from '../config/site.js';
import ContactDetails from './ContactDetails.jsx';

describe('ContactDetails', () => {
  it('renders nothing when no details are configured', () => {
    const { container } = render(<ContactDetails contact={{ email: '', phone: '', address: '' }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders configured details as text, not HTML', () => {
    render(<ContactDetails contact={{ email: 'a@b.co', phone: '+250 788 000 000', address: '<b>Kigali</b>\nRwanda' }} />);
    expect(screen.getByRole('link', { name: 'a@b.co' })).toHaveAttribute('href', 'mailto:a@b.co');
    expect(screen.getByRole('link', { name: '+250 788 000 000' })).toHaveAttribute('href', 'tel:+250788000000');
    expect(screen.getByText('<b>Kigali</b>')).toBeInTheDocument();
    expect(document.querySelector('b')).toBeNull();
  });
});

describe('getSocialLinks', () => {
  it('keeps only labelled https links', () => {
    const links = getSocialLinks({
      social: [
        { label: 'LinkedIn', url: 'https://www.linkedin.com/company/x' },
        { label: 'Bad', url: 'javascript:alert(1)' },
        { label: '', url: 'https://example.com' },
        null
      ]
    });
    expect(links.map(l => l.label)).toEqual(['LinkedIn']);
  });
});
