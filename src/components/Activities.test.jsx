import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EnquiryProvider } from '../context/EnquiryContext.jsx';
import { ACTIVITIES, activityPath, findActivity } from '../data/content.js';
import { ACTIVITY_PAGES, PAGES, findPage } from '../data/pages.js';
import { ActivityPage } from '../pages/index.jsx';
import Activities from './Activities.jsx';
import ActivityDetail from './ActivityDetail.jsx';

describe('Activities', () => {
  it('links every card to its activity page', () => {
    render(<Activities />);
    ACTIVITIES.forEach(activity => {
      const link = screen.getByRole('link', { name: new RegExp(activity.title) });
      expect(link).toHaveAttribute('href', activityPath(activity));
      expect(link).toHaveTextContent('View details');
    });
  });
});

describe('ActivityDetail', () => {
  it('shows the overview, both lists and an enquiry link', () => {
    const activity = ACTIVITIES[2];
    render(<EnquiryProvider><ActivityDetail activity={activity} /></EnquiryProvider>);

    expect(screen.getByText(activity.details.overview)).toBeInTheDocument();
    const list = name => within(screen.getByRole('heading', { name }).parentElement).getAllByRole('listitem').map(li => li.textContent);
    expect(list('What it covers')).toEqual(activity.details.covers);
    expect(list('What we look for')).toEqual(activity.details.criteria);
    expect(screen.getByRole('link', { name: /Discuss an opportunity/ })).toHaveAttribute('href', '/contact/#contact-form');
    expect(screen.getByRole('link', { name: /All activities/ })).toHaveAttribute('href', '/activities/');
  });
});

describe('ActivityPage', () => {
  it('shows the activity photo full-bleed behind the title', () => {
    const activity = ACTIVITIES[0];
    render(<EnquiryProvider><ActivityPage activity={activity} /></EnquiryProvider>);

    const hero = screen.getByRole('heading', { level: 1, name: activity.title }).closest('.page-hero');
    expect(hero).toHaveClass('page-hero-image');
    expect(within(hero).getByRole('img', { name: activity.image.alt })).toHaveAttribute('src', activity.image.src);
    expect(screen.getAllByRole('img', { name: activity.image.alt })).toHaveLength(1);
  });
});

describe('activity pages', () => {
  it('has exactly one page entry, with title and description, for each activity', () => {
    expect(ACTIVITY_PAGES.map(p => p.slug)).toEqual(ACTIVITIES.map(a => a.slug));
    ACTIVITIES.forEach(activity => {
      const page = findPage(activityPath(activity));
      expect(page.title.startsWith(`${activity.title} — `)).toBe(true);
      expect(page.description).toBeTruthy();
      expect(findActivity(page.path)).toBe(activity);
    });
  });

  it('keeps activity pages out of the main navigation', () => {
    ACTIVITY_PAGES.forEach(page => expect(PAGES.map(p => p.path)).not.toContain(page.path));
  });

  it('every activity has details to show', () => {
    ACTIVITIES.forEach(({ details }) => {
      expect(details.overview).toBeTruthy();
      expect(details.covers.length).toBeGreaterThan(0);
      expect(details.criteria.length).toBeGreaterThan(0);
    });
  });
});
