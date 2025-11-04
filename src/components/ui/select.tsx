import { forwardRef } from 'react';
import { clsx } from 'clsx';

export const Select = forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={clsx(
        'w-full rounded-[1.5rem] border border-border bg-white px-4 py-3 text-sm text-text',
        'transition-all duration-[var(--friendly-duration)] ease-[var(--friendly-easing)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent',
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);

Select.displayName = 'Select';
