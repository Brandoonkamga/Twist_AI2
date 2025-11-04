import { forwardRef } from 'react';
import { clsx } from 'clsx';

export const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={clsx(
        'w-full rounded-[1.5rem] border border-border bg-white px-4 py-3 text-sm text-text placeholder:text-subtext/70',
        'transition-all duration-[var(--friendly-duration)] ease-[var(--friendly-easing)] focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent',
        className
      )}
      {...props}
    />
  )
);

Input.displayName = 'Input';
