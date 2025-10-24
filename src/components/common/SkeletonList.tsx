import { Skeleton } from '../ui/skeleton';
import { Comb } from 'lucide-react';

export const SkeletonList = ({ count = 4 }: { count?: number }) => (
  <div className="space-y-4" role="status" aria-live="polite">
    <div className="flex items-center gap-2 text-subtext">
      <Comb className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
      <span>Préparation des meilleures coiffeuses...</span>
    </div>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="flex items-start gap-4">
        <Skeleton className="h-20 w-20 rounded-2xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    ))}
  </div>
);
