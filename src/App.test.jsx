import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App.jsx';

// jsdom's Blob has no .text(); FileReader works.
const readBlob = blob => new Promise(resolve => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.readAsText(blob);
});

const setup = (path = '/') => {
  window.history.replaceState(null, '', path);
  const user = userEvent.setup();
  render(<App />);
  return { user, form: () => document.getElementById('contact-form') };
};

const sectionIds = () => [...document.querySelectorAll('main > section')].map(s => s.id);
const mainNav = () => screen.getByRole('navigation', { name: 'Main' });

describe('pages', () => {
  it.each([
    ['/', 'Developing and Investing in Africa’s Energy Infrastructure.', ['home', 'overview', 'market', 'opportunities', 'responsibility', 'contact-cta'], 'Everis — Developing and Investing in Africa’s Energy Infrastructure'],
    ['/about/', 'About Everis.', ['about', 'philosophy', 'contact-cta'], 'About — Everis'],
    ['/activities/', 'What we do.', ['activities', 'contact-cta'], 'Activities — Everis'],
    ['/approach/', 'How we work.', ['approach', 'partnerships', 'contact-cta'], 'Approach — Everis'],
    ['/contact/', 'Get in touch.', ['contact'], 'Contact — Everis']
  ])('%s renders its own heading, sections and title', (path, heading, ids, title) => {
    setup(path);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading);
    expect(sectionIds()).toEqual(ids);
    expect(document.title).toBe(title);
  });

  it('treats a path without a trailing slash as the same page', () => {
    setup('/about');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Everis.');
    expect(within(mainNav()).getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  });

  it('opens an activity’s own page from its card, under Activities in the menu', async () => {
    const { user } = setup('/activities/');
    await user.click(screen.getByRole('link', { name: /Solar & Energy Storage/ }));

    expect(window.location.pathname).toBe('/activities/solar-energy-storage/');
    expect(document.title).toBe('Solar & Energy Storage — Activities — Everis');
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Solar & Energy Storage');
    expect(heading).toHaveFocus();
    expect(sectionIds()).toEqual(['activity', 'contact-cta']);
    expect(within(mainNav()).getByRole('link', { name: 'Activities' })).toHaveAttribute('aria-current', 'true');
  });

  it('loads an activity page directly and links on to the next one', async () => {
    const { user } = setup('/activities/electricity-infrastructure');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Electricity Infrastructure');

    await user.click(within(screen.getByRole('navigation', { name: 'Next activity' })).getByRole('link'));
    expect(window.location.pathname).toBe('/activities/power-generation/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Power Generation');
  });

  it('shows the not-found page for an unknown activity', () => {
    setup('/activities/no-such-activity/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page not found.');
  });

  it('shows a not-found page for unknown paths', () => {
    setup('/no-such-page/');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Page not found.');
    expect(document.title).toBe('Page not found — Everis');
    expect(within(mainNav()).queryByRole('link', { current: 'page' })).toBeNull();
  });

  it('lists the five activities on the activities page', () => {
    setup('/activities/');
    expect(within(document.querySelector('.activity-grid')).getAllByRole('heading', { level: 3 })).toHaveLength(5);
  });

  it('shows the preview notice, the registered office and legal line, and no email, phone or social links while none are configured', () => {
    setup('/contact/');
    expect(screen.getByText('Enquiry preview')).toBeInTheDocument();
    const details = document.querySelector('.contact-details');
    expect(within(details).getByText('Registered office')).toBeInTheDocument();
    expect(within(details).getByText('Unit PC-1, Level 7, Al Maryah Tower')).toBeInTheDocument();
    expect(within(details).queryByText('Email')).toBeNull();
    expect(within(details).queryByText('Telephone')).toBeNull();
    expect(screen.getByText(/registered in Abu Dhabi Global Market under number 39949/)).toBeInTheDocument();
    expect(within(document.querySelector('.footer-contact address')).getByText('Unit PC-1, Level 7, Al Maryah Tower')).toBeInTheDocument();
    expect(document.querySelector('.footer-social')).toBeNull();
    expect(screen.getByRole('button', { name: /Download enquiry/ })).toBeInTheDocument();
  });
});

describe('navigation', () => {
  it('moves between pages without reloading, marks the current page and focuses its heading', async () => {
    const { user } = setup('/');
    expect(within(mainNav()).getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');

    await user.click(within(mainNav()).getByRole('link', { name: 'Approach' }));
    expect(window.location.pathname).toBe('/approach/');
    expect(document.title).toBe('Approach — Everis');
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('How we work.');
    expect(heading).toHaveFocus();
    expect(within(mainNav()).getByRole('link', { name: 'Approach' })).toHaveAttribute('aria-current', 'page');
    expect(within(mainNav()).getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('restores the previous page on Back', async () => {
    const { user } = setup('/');
    await user.click(within(mainNav()).getByRole('link', { name: 'About' }));
    expect(window.history.state).toBeNull();

    act(() => {
      window.history.replaceState({ scrollY: 0 }, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Developing and Investing');
    expect(document.title).toBe('Everis — Developing and Investing in Africa’s Energy Infrastructure');
  });

  it('a footer link to a section opens that page and focuses the section', async () => {
    const { user } = setup('/');
    await user.click(within(screen.getByRole('navigation', { name: 'Footer' })).getByRole('link', { name: 'Philosophy' }));
    expect(window.location.pathname + window.location.hash).toBe('/about/#philosophy');
    expect(document.getElementById('philosophy')).toHaveFocus();
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('leaves modified clicks (open in new tab) to the browser', () => {
    setup('/');
    const link = within(mainNav()).getByRole('link', { name: 'About' });
    let interceptedByApp;
    // Runs after React's handler; stops jsdom attempting a real navigation.
    window.addEventListener('click', e => { interceptedByApp = e.defaultPrevented; e.preventDefault(); }, { once: true });
    link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true }));
    expect(interceptedByApp).toBe(false);
    expect(window.location.pathname).toBe('/');
  });
});

describe('mobile menu', () => {
  it('opens, makes the rest of the page inert, and closes on Escape', async () => {
    const { user } = setup();
    const toggle = screen.getByRole('button', { name: /Menu/ });
    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveTextContent('Close');
    expect(document.getElementById('primary-nav')).toHaveClass('is-open');
    expect(document.querySelector('main')).toHaveAttribute('inert');
    expect(document.querySelector('footer')).toHaveAttribute('inert');
    expect(document.body).toHaveClass('menu-locked');

    await user.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.querySelector('main')).not.toHaveAttribute('inert');
    expect(document.body).not.toHaveClass('menu-locked');
    expect(toggle).toHaveFocus();
  });

  it('closes when a page link is chosen', async () => {
    const { user } = setup();
    await user.click(screen.getByRole('button', { name: /Menu/ }));
    await user.click(within(mainNav()).getByRole('link', { name: 'Activities' }));

    expect(window.location.pathname).toBe('/activities/');
    expect(screen.getByRole('button', { name: /Menu/ })).toHaveAttribute('aria-expanded', 'false');
    expect(document.querySelector('main')).not.toHaveAttribute('inert');
    expect(document.body).not.toHaveClass('menu-locked');
  });
});

describe('enquiry shortcuts', () => {
  it('an activity page opens the contact form with its enquiry type preselected', async () => {
    const { user } = setup('/activities/');
    await user.click(screen.getByRole('link', { name: /Energy Asset Acquisitions/ }));
    await user.click(screen.getByRole('link', { name: /Discuss an opportunity/ }));
    expect(window.location.pathname + window.location.hash).toBe('/contact/#contact-form');
    expect(screen.getByLabelText(/Nature of enquiry/)).toHaveValue('Energy asset acquisitions');
    expect(document.getElementById('contact-form')).toHaveFocus();
  });

  it('Partner With Us on the home page preselects a partnership enquiry', async () => {
    const { user } = setup('/');
    await user.click(screen.getByRole('link', { name: 'Partner With Us' }));
    expect(screen.getByLabelText(/Nature of enquiry/)).toHaveValue('Partnership enquiry');
  });

  it('Submit a project proposal on the home page preselects a project proposal', async () => {
    const { user } = setup('/');
    await user.click(screen.getByRole('link', { name: /Submit a project proposal/ }));
    expect(window.location.pathname + window.location.hash).toBe('/contact/#contact-form');
    expect(screen.getByLabelText(/Nature of enquiry/)).toHaveValue('Project proposal');
  });

  it('a contact topic preselects its type and focuses the form', async () => {
    const { user } = setup('/contact/');
    await user.click(screen.getByRole('button', { name: 'Investment discussions' }));
    expect(screen.getByLabelText(/Nature of enquiry/)).toHaveValue('Investment discussion');
    expect(screen.getByLabelText(/Full name/)).toHaveFocus();
  });
});

describe('enquiry form', () => {
  it('reports every invalid field and focuses the first', async () => {
    const { user, form } = setup('/contact/');
    await user.click(within(form()).getByRole('button', { name: /Download enquiry/ }));

    expect(screen.getByText('4 fields need your attention.')).toBeInTheDocument();
    expect(screen.getByLabelText(/Full name/)).toHaveFocus();
    expect(screen.getByLabelText(/Full name/)).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('clears an error once the field becomes valid, including via a shortcut', async () => {
    const { user, form } = setup('/contact/');
    await user.click(within(form()).getByRole('button', { name: /Download enquiry/ }));
    await user.type(screen.getByLabelText(/Full name/), 'Ada');
    expect(screen.queryByText('Please enter your full name.')).toBeNull();
    expect(screen.getByLabelText(/Full name/)).not.toHaveAttribute('aria-invalid');

    await user.click(screen.getByRole('button', { name: 'Project proposals' }));
    expect(screen.queryByText('Please choose the nature of your enquiry.')).toBeNull();
  });

  it('downloads the enquiry as a text file when it is valid', async () => {
    const createObjectURL = vi.fn(() => 'blob:enquiry');
    URL.createObjectURL = createObjectURL;
    URL.revokeObjectURL = vi.fn();
    const clicked = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

    const { user, form } = setup('/contact/');
    await user.type(screen.getByLabelText(/Full name/), 'Ada Obi');
    await user.type(screen.getByLabelText(/Email address/), 'ada@example.com');
    await user.selectOptions(screen.getByLabelText(/Nature of enquiry/), 'General enquiry');
    await user.type(screen.getByLabelText(/Message/), 'Hello');
    await user.click(within(form()).getByRole('button', { name: /Download enquiry/ }));

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    const text = await readBlob(createObjectURL.mock.calls[0][0]);
    expect(text).toContain('Prepared locally — not sent');
    expect(text).toContain('Nature of enquiry: General enquiry');
    expect(clicked).toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent('has not been sent');
    clicked.mockRestore();
  });
});
