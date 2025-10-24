import { MessageCircle, UserRound } from 'lucide-react';
import type { Review } from '../../types';
import { Button } from '../ui/button';
import { formatDate } from '../../lib/format';

export type ReviewListProps = {
  reviews: Review[];
};

export const ReviewList = ({ reviews }: ReviewListProps) => (
  <div className="space-y-6">
    {reviews.slice(0, 3).map((review) => (
      <article key={review.id} className="rounded-2xl border border-border bg-white p-4 shadow-sm">
        <header className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserRound aria-hidden="true" />
          </div>
          <div>
            <p className="font-semibold text-text">{review.author}</p>
            <p className="text-sm text-subtext">{formatDate(review.date)}</p>
          </div>
        </header>
        <p className="mt-3 italic text-text">“{review.text}”</p>
        {review.mentionsNoTears && (
          <p className="mt-2 text-sm text-success">✨ Mention spéciale : aucune larme signalée par ce parent.</p>
        )}
      </article>
    ))}
    <Button variant="secondary" className="flex items-center gap-2" aria-label="Voir tous les avis">
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      Voir tous les avis
    </Button>
  </div>
);
