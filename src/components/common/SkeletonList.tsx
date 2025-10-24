const combWidth = ['w-16', 'w-24', 'w-20'];

export type SkeletonListProps = {
  count?: number;
};

export const SkeletonList = ({ count = 3 }: SkeletonListProps) => (
  <div className="space-y-4" aria-hidden="true">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card"
      >
        <div className="h-16 w-16 rounded-2xl bg-muted animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-1/3 rounded-full bg-muted animate-pulse" />
          <div className="h-4 w-1/2 rounded-full bg-muted/80 animate-pulse" />
          <div className={`h-3 rounded-full bg-muted ${combWidth[index % combWidth.length]} animate-pulse`} />
        </div>
        <div className="h-10 w-10 rounded-full border-2 border-dashed border-primary/40" aria-label="Chargement">
          <span className="sr-only">Chargement</span>
        </div>
      </div>
    ))}
  </div>
);
