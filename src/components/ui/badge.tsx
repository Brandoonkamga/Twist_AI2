import * as React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'primary' | 'success' | 'info';
}

export const Badge: React.FC<BadgeProps> = ({ className, tone = 'primary', ...props }) => {
  const colors: Record<NonNullable<BadgeProps['tone']>, string> = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    success: 'bg-success/10 text-success border border-success/20',
    info: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-3 py-1 text-sm font-medium',
        colors[tone],
        className
      )}
      {...props}
    />
  );
};
