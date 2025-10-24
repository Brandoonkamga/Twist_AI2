import { forwardRef } from 'react';
import { clsx } from 'clsx';

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'rounded-[1.5rem] bg-white shadow-sm ring-1 ring-border/60',
        'transition-all duration-[var(--friendly-duration)] ease-[var(--friendly-easing)]',
        className
      )}
      {...props}
    />
  )
);

Card.displayName = 'Card';
