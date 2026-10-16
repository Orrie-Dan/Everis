/** Small uppercase section label, optionally numbered. */
export default function Kicker({ num, light = false, children }) {
  return (
    <p className={light ? 'kicker kicker-light' : 'kicker'}>
      {num && <span className="kicker-num">{num}</span>}
      {children}
    </p>
  );
}

export const Arrow = ({ children = '→' }) => <span className="btn-arrow" aria-hidden="true">{children}</span>;
