import * as React from 'react';
import { cn } from '../../utils/cn';

export const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('animate-pulse rounded-lg bg-gradient-to-r from-muted via-white/80 to-muted', className)}
      {...props}
    />
  )
);
Skeleton.displayName = 'Skeleton';
