import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { EnquiryProvider } from '../context/EnquiryContext.jsx';
import ContactForm from './ContactForm.jsx';

const ENDPOINT = 'https://formspree.io/f/testform';
const site = (overrides = {}) => ({ contact: { email: '', phone: '', address: '' }, social: [], formEndpoint: ENDPOINT, ...overrides });

const setup = siteConfig => {
  const user = userEvent.setup();
  render(<EnquiryProvider><ContactForm site={siteConfig} /></EnquiryProvider>);
  return user;
};

const fillIn = async user => {
  await user.type(screen.getByLabelText(/Full name/), 'Ada Obi');
  await user.type(screen.getByLabelText(/Email address/), 'ada@example.com');
  await user.selectOptions(screen.getByLabelText(/Nature of enquiry/), 'Project proposal');
  await user.type(screen.getByLabelText(/Message/), 'A 20 MW solar site.');
};

afterEach(() => vi.unstubAllGlobals());

describe('enquiry form with a Formspree endpoint', () => {
  it('posts the enquiry, confirms it and clears the form', async () => {
    const fetchMock = vi.fn(() => Promise.resolve({ ok: true, status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const user = setup(site());

    expect(screen.queryByText('Enquiry preview')).toBeNull();
    await fillIn(user);
    await user.click(screen.getByRole('button', { name: /Send enquiry/ }));

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(ENDPOINT);
    expect(init.method).toBe('POST');
    expect(init.headers.Accept).toBe('application/json');
    expect(JSON.parse(init.body)).toEqual({
      name: 'Ada Obi',
      email: 'ada@example.com',
      organisation: '',
      interest: 'Project proposal',
      message: 'A 20 MW solar site.',
      _subject: 'Website enquiry: Project proposal'
    });
    expect(await screen.findByText(/your enquiry has been sent\. We will reply to ada@example\.com/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/)).toHaveValue('');
    expect(screen.getByLabelText(/Nature of enquiry/)).toHaveValue('');
  });

  it('keeps the enquiry and reports an error when delivery fails', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: false, status: 422 })));
    const user = setup(site({ contact: { email: 'enquiries@example.com', phone: '', address: '' } }));

    await fillIn(user);
    await user.click(screen.getByRole('button', { name: /Send enquiry/ }));

    const status = await screen.findByText(/could not be sent/);
    expect(status).toHaveTextContent('or email us at enquiries@example.com');
    expect(status).toHaveClass('is-error');
    expect(screen.getByLabelText(/Full name/)).toHaveValue('Ada Obi');
    expect(screen.getByRole('button', { name: /Send enquiry/ })).not.toHaveAttribute('aria-disabled');
  });

  it('does not post when the hidden bot field is filled', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    const user = setup(site());

    await fillIn(user);
    document.getElementById('website').value = 'spam';
    await user.click(screen.getByRole('button', { name: /Send enquiry/ }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText(/your enquiry has been sent/)).toBeInTheDocument();
  });

  it('ignores an endpoint that is not a Formspree form and falls back to the download', () => {
    setup(site({ formEndpoint: 'https://evil.example/f/abc' }));
    expect(screen.getByRole('button', { name: /Download enquiry/ })).toBeInTheDocument();
    expect(screen.getByText('Enquiry preview')).toBeInTheDocument();
  });
});
