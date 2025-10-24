import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'primary' | 'success' | 'neutral';
};

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  neutral: 'bg-muted text-subtext',
};

export const Badge = ({ className, variant = 'neutral', ...props }: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium',
      variantClasses[variant],
      className
    )}
    {...props}
  />
);
