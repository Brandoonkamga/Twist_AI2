import * as React from 'react';
import { clsx } from 'clsx';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
};

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-white hover:bg-indigo-600 focus-visible:ring-primary shadow-card transition duration-normal ease-friendly rounded-2xl',
  secondary:
    'bg-white text-primary border border-primary hover:bg-primary/10 focus-visible:ring-primary rounded-2xl',
  ghost: 'bg-transparent text-primary hover:bg-primary/10 rounded-2xl',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-base',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button ref={ref} className={clsx(variantClasses[variant], sizeClasses[size], className)} {...props} />
  )
);

Button.displayName = 'Button';
