import * as React from 'react';
import { cn } from '../../utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
};

const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-normal ease hover:shadow-card focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none rounded-full';

const variantStyles: Record<string, string> = {
  primary: 'bg-primary text-white px-6 py-3',
  secondary: 'bg-white text-foreground border border-border px-5 py-3',
  ghost: 'bg-transparent text-primary px-4 py-3 hover:bg-muted'
};

const sizeStyles: Record<string, string> = {
  sm: 'text-sm px-3 py-2',
  md: 'text-base px-5 py-3',
  lg: 'text-lg px-6 py-4'
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    />
  )
);

Button.displayName = 'Button';
