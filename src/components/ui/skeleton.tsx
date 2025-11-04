import { clsx } from 'clsx';

export const Skeleton = ({ className }: { className?: string }) => (
  <div
    role="presentation"
    className={clsx('animate-pulse rounded-[1.5rem] bg-muted', className)}
  />
);
