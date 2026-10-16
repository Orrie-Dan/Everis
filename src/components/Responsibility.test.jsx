import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { COMMITMENTS } from '../data/content.js';
import Responsibility from './Responsibility.jsx';

describe('Responsibility', () => {
  it('opens the first commitment and shows only its image', () => {
    render(<Responsibility />);
    const [first, ...rest] = COMMITMENTS;
    expect(screen.getByRole('button', { name: new RegExp(first.title) })).toHaveAttribute('aria-expanded', 'true');
    rest.forEach(c => expect(screen.getByRole('button', { name: new RegExp(c.title) })).toHaveAttribute('aria-expanded', 'false'));
    expect(screen.getByRole('img')).toHaveAttribute('alt', first.image.alt);
  });

  it('keeps exactly one commitment open and swaps the image to match', async () => {
    const user = userEvent.setup();
    render(<Responsibility />);
    const target = COMMITMENTS[2];
    const trigger = screen.getByRole('button', { name: new RegExp(target.title) });
    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('button', { expanded: true })).toHaveLength(1);
    expect(screen.getByRole('region', { name: new RegExp(target.title) })).toHaveTextContent(target.text);
    expect(screen.getByRole('img')).toHaveAttribute('alt', target.image.alt);

    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('makes closed panels inert so their text is not reachable', () => {
    render(<Responsibility />);
    const closed = screen.getByRole('button', { name: new RegExp(COMMITMENTS[1].title) });
    expect(document.getElementById(closed.getAttribute('aria-controls'))).toHaveAttribute('inert');
  });
});
