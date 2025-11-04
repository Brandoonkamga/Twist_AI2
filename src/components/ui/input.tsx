import * as React from 'react';
import { cn } from '../../utils/cn';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-lg border border-muted/80 bg-white px-4 py-3 text-base text-text placeholder:text-subtext/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        hasError && 'border-danger focus-visible:outline-danger',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';
