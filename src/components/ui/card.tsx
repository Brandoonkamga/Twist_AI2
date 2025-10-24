import { cn } from '../../utils/cn';
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';

export const Card = forwardRef(function Card(
  { className, ...props }: HTMLAttributes<HTMLDivElement>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn('rounded-3xl bg-white shadow-card border border-border/60', className)}
      {...props}
    />
  );
});

export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pb-0 flex flex-col gap-2', className)} {...props} />
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-4', className)} {...props} />
);

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
);
