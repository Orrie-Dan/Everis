import { useCallback, useMemo, useRef, useState } from 'react';
import { INTEREST_OPTIONS } from '../data/content.js';
import { EnquiryContext } from './enquiry-context.js';

export function EnquiryProvider({ children }) {
  const [interest, setInterest] = useState('');
  const formRef = useRef(null);
  const firstFieldRef = useRef(null);

  /* Preselect a known enquiry type and, optionally, move the visitor to the form. */
  const chooseInterest = useCallback((value, { focusForm = false } = {}) => {
    if (INTEREST_OPTIONS.includes(value)) setInterest(value);
    if (focusForm && formRef.current) {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      formRef.current.scrollIntoView?.({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      firstFieldRef.current?.focus({ preventScroll: true });
    }
  }, []);

  const value = useMemo(
    () => ({ interest, setInterest, chooseInterest, formRef, firstFieldRef }),
    [interest, chooseInterest]
  );
  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

