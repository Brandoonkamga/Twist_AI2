import { Comb } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

export const SkeletonList = ({ count = 3 }: { count?: number }) => (
  <div className="flex flex-col gap-4" role="status" aria-live="polite">
    {[...Array(count)].map((_, index) => (
      <div key={index} className="flex items-center gap-4 rounded-3xl border border-border/60 bg-white p-4 shadow-card">
        <Skeleton className="h-20 w-20 rounded-2xl" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-1/2" />
          <div className="flex items-center gap-2">
            <Comb className="h-4 w-4 animate-spin-slow text-primary" aria-hidden="true" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
