/* Everis homepage interactions.
   SITE holds the only contact details and social links the page may display.
   Leave values empty until Everis has approved them — nothing is rendered for empty entries. */
const SITE = {
  contact: {
    email: '',   // e.g. 'enquiries@example.com' — when set, the form opens an email draft instead of downloading
    phone: '',
    address: ''
  },
  social: [
    // { label: 'LinkedIn', url: 'https://www.linkedin.com/company/…' }
  ]
};

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const allowMotion = () => !motionQuery.matches;
const root = document.documentElement;
if (allowMotion()) root.classList.add('js-motion');

/* Configured contact details and social links ----------------------------- */
(function renderContactDetails() {
  const { email, phone, address } = SITE.contact;
  const entries = [];
  if (email) entries.push(['Email', `<a href="mailto:${encodeURI(email)}">${escapeHtml(email)}</a>`]);
  if (phone) entries.push(['Telephone', `<a href="tel:${phone.replace(/[^+\d]/g, '')}">${escapeHtml(phone)}</a>`]);
  if (address) entries.push(['Office', escapeHtml(address).replace(/\n/g, '<br>')]);

  const details = document.querySelector('[data-contact-details]');
  if (entries.length && details) {
    details.innerHTML = '<dl>' + entries.map(([term, value]) => `<div><dt>${term}</dt><dd>${value}</dd></div>`).join('') + '</dl>';
    details.hidden = false;
  }
  const footer = document.querySelector('[data-footer-contact]');
  if (footer && (email || phone || address)) {
    footer.insertAdjacentHTML('beforeend', '<address>' + entries.map(([, value]) => `<div>${value}</div>`).join('') + '</address>');
  }

  const social = document.querySelector('[data-social]');
  const links = SITE.social.filter(item => item && item.label && /^https:\/\//.test(item.url || ''));
  if (social && links.length) {
    social.innerHTML = links.map(item => `<li><a href="${encodeURI(item.url)}" rel="noopener" target="_blank">${escapeHtml(item.label)}<span class="visually-hidden"> (opens in a new tab)</span></a></li>`).join('');
    social.hidden = false;
  }

  if (email) {
    const notice = document.querySelector('[data-form-notice]');
    if (notice) notice.remove();
    const label = document.querySelector('[data-submit-label]');
    if (label) label.textContent = 'Prepare email';
  }
})();

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

/* Header: solid after scroll, hides on scroll down ------------------------ */
const header = document.querySelector('[data-header]');
let lastY = window.scrollY;

function updateHeader() {
  const y = window.scrollY;
  header.classList.toggle('is-solid', y > 40);
  const goingDown = y > lastY + 4;
  const goingUp = y < lastY - 4;
  if (goingDown && y > 600) header.classList.add('is-hidden');
  else if (goingUp || y < 600) header.classList.remove('is-hidden');
  lastY = y;
}

/* Mobile menu ------------------------------------------------------------- */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
const toggleLabel = toggle.querySelector('.menu-label');
const outside = [document.querySelector('main'), document.querySelector('footer')];

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggleLabel.textContent = open ? 'Close' : 'Menu';
  nav.classList.toggle('is-open', open);
  header.classList.toggle('menu-open', open);
  document.body.classList.toggle('menu-locked', open);
  outside.forEach(el => { el.inert = open; });
  if (open) nav.querySelector('a').focus();
}

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', event => { if (event.target.closest('a') && nav.classList.contains('is-open')) setMenu(false); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
});
window.matchMedia('(min-width: 901px)').addEventListener('change', e => { if (e.matches && nav.classList.contains('is-open')) setMenu(false); });

/* Active navigation link -------------------------------------------------- */
const navLinks = [...nav.querySelectorAll('ul a')];
const navSections = navLinks.map(link => document.querySelector(link.hash)).filter(Boolean);

function updateActiveLink() {
  const marker = window.scrollY + window.innerHeight * 0.35;
  let current = navSections[0];
  navSections.forEach(section => { if (section.offsetTop <= marker) current = section; });
  // Sections without a nav link (philosophy, partnerships) clear the indicator.
  const unlinked = [...document.querySelectorAll('main > section[id]')]
    .filter(s => !navSections.includes(s) && s.offsetTop <= marker && s.offsetTop > current.offsetTop);
  navLinks.forEach(link => {
    const active = !unlinked.length && link.hash === '#' + current.id;
    if (active) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
  });
}

/* Split headings into words for the staggered reveal ---------------------- */
function splitWords(el) {
  let index = 0;
  const walk = node => {
    [...node.childNodes].forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = child.textContent.split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.append(' '); return; }
          const outer = document.createElement('span');
          outer.className = 'split-word';
          const inner = document.createElement('span');
          inner.className = 'split-inner';
          inner.style.setProperty('--i', index++);
          inner.textContent = part;
          outer.append(inner);
          frag.append(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        walk(child);
      }
    });
  };
  walk(el);
}

/* Statement: words light up as the paragraph scrolls through view --------- */
const statement = document.querySelector('[data-scrub]');
let statementWords = [];
if (statement && allowMotion()) {
  const words = statement.textContent.trim().split(/\s+/);
  statement.textContent = '';
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'word';
    span.textContent = word;
    statement.append(span, i < words.length - 1 ? ' ' : '');
  });
  statementWords = [...statement.querySelectorAll('.word')];
}

function updateStatement() {
  if (!statementWords.length) return;
  const rect = statement.getBoundingClientRect();
  const vh = window.innerHeight;
  const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.35)));
  const lit = Math.round(progress * statementWords.length);
  statementWords.forEach((word, i) => word.classList.toggle('is-lit', i < lit));
}

/* Parallax and approach progress ------------------------------------------ */
const parallaxEls = [...document.querySelectorAll('[data-parallax]')];
const steps = document.querySelector('[data-steps]');
const stepItems = steps ? [...steps.querySelectorAll('.step')] : [];

function updateParallax() {
  const vh = window.innerHeight;
  parallaxEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) return;
    if (el.classList.contains('hero-media')) {
      el.style.transform = `translate3d(0, ${Math.min(window.scrollY, vh) * 0.18}px, 0)`;
    } else {
      const img = el.querySelector('img');
      const offset = ((rect.top + rect.height / 2) - vh / 2) / vh; // -1 … 1
      img.style.transform = `translate3d(0, ${-7 + offset * -6}%, 0)`;
    }
  });
}

function updateSteps() {
  if (!steps) return;
  const rect = steps.getBoundingClientRect();
  const marker = window.innerHeight * 0.6;
  const progress = Math.min(1, Math.max(0, (marker - rect.top) / rect.height));
  steps.style.setProperty('--progress', progress.toFixed(3));
  stepItems.forEach(step => step.classList.toggle('is-active', step.getBoundingClientRect().top < marker));
}

/* Scroll loop ------------------------------------------------------------- */
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateHeader();
    updateActiveLink();
    if (allowMotion()) { updateStatement(); updateParallax(); }
    updateSteps();
    ticking = false;
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
onScroll();

/* Reveal on enter --------------------------------------------------------- */
if (allowMotion() && 'IntersectionObserver' in window) {
  document.querySelectorAll('[data-split]').forEach(splitWords);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  document.querySelectorAll('.reveal, [data-split]').forEach(el => observer.observe(el));
} else {
  root.classList.remove('js-motion');
}

/* Enquiry shortcuts ------------------------------------------------------- */
const form = document.querySelector('#contact-form');
const interest = form.querySelector('#interest');

document.querySelectorAll('[data-interest]').forEach(trigger => {
  trigger.addEventListener('click', () => {
    if ([...interest.options].some(o => o.value === trigger.dataset.interest || o.text === trigger.dataset.interest)) {
      interest.value = trigger.dataset.interest;
      clearError(interest);
    }
    if (trigger.hasAttribute('data-focus-form')) {
      form.scrollIntoView({ behavior: allowMotion() ? 'smooth' : 'auto', block: 'start' });
      form.querySelector('#name').focus({ preventScroll: true });
    }
  });
});

/* Form validation and delivery -------------------------------------------- */
const messages = {
  name: 'Please enter your full name.',
  email: 'Please enter a valid email address.',
  interest: 'Please choose the nature of your enquiry.',
  message: 'Please add a short message.'
};

function showError(field) {
  const error = document.getElementById(field.id + '-error');
  field.setAttribute('aria-invalid', 'true');
  if (error) error.textContent = messages[field.name] || field.validationMessage;
}
function clearError(field) {
  const error = document.getElementById(field.id + '-error');
  field.removeAttribute('aria-invalid');
  if (error) error.textContent = '';
}

form.querySelectorAll('[required]').forEach(field => {
  field.addEventListener('input', () => { if (field.validity.valid) clearError(field); });
  field.addEventListener('change', () => { if (field.validity.valid) clearError(field); });
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const status = form.querySelector('#form-status');
  const invalid = [...form.querySelectorAll('[required]')].filter(field => {
    if (field.value.trim() === '' && field.tagName !== 'SELECT') field.value = '';
    const ok = field.checkValidity();
    ok ? clearError(field) : showError(field);
    return !ok;
  });
  if (invalid.length) {
    invalid[0].focus();
    status.textContent = invalid.length === 1 ? 'One field needs your attention.' : `${invalid.length} fields need your attention.`;
    return;
  }

  const data = new FormData(form);
  const body = [
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Organisation: ${data.get('organisation') || 'Not provided'}`,
    `Nature of enquiry: ${data.get('interest')}`,
    '',
    data.get('message')
  ].join('\n');

  if (SITE.contact.email) {
    const subject = `Enquiry: ${data.get('interest')}`;
    window.location.href = `mailto:${SITE.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email application should now open with the enquiry ready to send.';
    return;
  }

  const content = `ENQUIRY FOR EVERIS\nPrepared locally — not sent\n\n${body}\n`;
  const url = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'everis-enquiry.txt';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'A copy of your enquiry has been downloaded. It has not been sent — please keep it until Everis’s contact details are published.';
});
