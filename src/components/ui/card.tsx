import { clsx } from 'clsx';
import type { HTMLAttributes } from 'react';

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'bg-white rounded-2xl shadow-card border border-border/50 p-6 transition duration-normal ease-friendly',
      className
    )}
    {...props}
  />
);
