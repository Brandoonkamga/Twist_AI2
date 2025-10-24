import { Review } from '../../types';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';

export const ReviewList = ({ reviews }: { reviews: Review[] }) => (
  <div className="space-y-4">
    {reviews.map((review) => (
      <Card key={review.id} className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-text">{review.author}</p>
            <p className="text-xs text-subtext">{new Date(review.date).toLocaleDateString('fr-FR')}</p>
          </div>
          <div className="flex items-center gap-1 text-warning" aria-label={`${review.rating} sur 5`}>
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-semibold">{review.rating.toFixed(1)}</span>
          </div>
        </div>
        <blockquote className="mt-3 italic text-sm text-text">“{review.text}”</blockquote>
        {review.mentionsNoTears ? (
          <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
            <Sparkles className="h-3 w-3" aria-hidden="true" /> Aucune larme signalée
          </p>
        ) : null}
      </Card>
    ))}
    <Button variant="secondary" className="w-full justify-center" aria-label="Voir tous les avis">
      Voir tous les avis
    </Button>
  </div>
);
