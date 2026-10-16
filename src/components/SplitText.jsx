import { Children, cloneElement, isValidElement } from 'react';
import { useInView } from '../hooks/useInView.js';
import { useAllowMotion } from '../hooks/useReducedMotion.js';

/* Wrap every word (including words inside <em>/<span>) for the staggered reveal. */
function splitWords(children, counter) {
  return Children.map(children, child => {
    if (typeof child === 'string') {
      return child.split(/(\s+)/).filter(Boolean).map(part => {
        if (/^\s+$/.test(part)) return ' ';
        const i = counter.next++;
        return (
          <span className="split-word" key={i}>
            <span className="split-inner" style={{ '--i': i }}>{part}</span>
          </span>
        );
      });
    }
    if (isValidElement(child)) {
      return cloneElement(child, undefined, splitWords(child.props.children, counter));
    }
    return child;
  });
}

/** Heading whose words slide up one after another when it enters the viewport. */
export default function SplitText({ as: Tag = 'h2', className = '', children, ...rest }) {
  const allowMotion = useAllowMotion();
  const [ref, inView] = useInView();
  const classes = [className, allowMotion && inView && 'is-in'].filter(Boolean).join(' ') || undefined;
  return (
    <Tag ref={ref} className={classes} data-split="" {...rest}>
      {allowMotion ? splitWords(children, { next: 0 }) : children}
    </Tag>
  );
}
