import { clsx } from 'clsx';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'outline';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = ({ variant = 'default', className, ...props }: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
      'transition-all duration-[var(--friendly-duration)] ease-[var(--friendly-easing)]',
      {
        default: 'bg-primary text-white',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        outline: 'border border-border text-text bg-white'
      }[variant],
      className
    )}
    {...props}
  />
);
