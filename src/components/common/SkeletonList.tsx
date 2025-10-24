import { Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface SkeletonListProps {
  count?: number;
}

export const SkeletonList: React.FC<SkeletonListProps> = ({ count = 3 }) => (
  <div className="flex flex-col gap-4" role="status" aria-live="polite">
    <div className="flex items-center gap-2 text-subtext">
      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      <span>Préparation de la liste…</span>
    </div>
    {Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} className="h-24 w-full" />
    ))}
  </div>
);
