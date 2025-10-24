import * as React from 'react';
import { clsx } from 'clsx';

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={clsx(
      'w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-text focus-visible:ring-primary',
      className
    )}
    {...props}
  >
    {children}
  </select>
));

Select.displayName = 'Select';
