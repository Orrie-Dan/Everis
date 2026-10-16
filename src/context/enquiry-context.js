import { createContext, useContext } from 'react';

export const EnquiryContext = createContext(null);

/** Shared enquiry state: the selected enquiry type and a way to jump to the form. */
export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error('useEnquiry must be used inside <EnquiryProvider>');
  return ctx;
}
