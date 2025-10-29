import { cn } from '../../utils/cn';
import { SelectHTMLAttributes } from 'react';

export const Select = ({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={cn(
      'w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
      className
    )}
    {...props}
  >
    {children}
  </select>
);
