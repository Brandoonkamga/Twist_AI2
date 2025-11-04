import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg' | 'sm';
}

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary shadow-sm',
  secondary:
    'bg-surface text-text border border-border hover:bg-muted focus-visible:outline-primary',
  ghost: 'bg-transparent text-primary hover:bg-primary/10 focus-visible:outline-primary'
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, variant = 'primary', size = 'md', className, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        className={clsx(
          'inline-flex items-center justify-center gap-2 rounded-[1.5rem] font-semibold transition-all duration-[var(--friendly-duration)] ease-[var(--friendly-easing)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary disabled:opacity-60 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref as any}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
