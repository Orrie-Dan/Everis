import { useInView } from '../hooks/useInView.js';

/** Fades and lifts its content in the first time it scrolls into view. */
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  const classes = ['reveal', className, inView && 'is-in'].filter(Boolean).join(' ');
  return <Tag ref={ref} className={classes} {...rest}>{children}</Tag>;
}
