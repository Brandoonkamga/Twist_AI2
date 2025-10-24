import * as React from 'react';
import { clsx } from 'clsx';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={clsx(
      'w-full rounded-2xl border border-border bg-white px-4 py-3 text-base text-text placeholder:text-subtext/70 focus-visible:ring-primary',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';
