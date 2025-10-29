import { cn } from '../../utils/cn';
import { HTMLAttributes } from 'react';

export const Badge = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-pill bg-mutedAlt text-primaryContrast px-3 py-1 text-xs font-semibold uppercase tracking-wide',
      className
    )}
    {...props}
  />
);
