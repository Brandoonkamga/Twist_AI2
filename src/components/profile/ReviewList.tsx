import { MessageCircleHeart } from 'lucide-react';
import type { Review } from '../../types';
import { Button } from '../ui/button';

interface Props {
  reviews: Review[];
}

export const ReviewList: React.FC<Props> = ({ reviews }) => (
  <section aria-labelledby="reviews-title" className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h2 id="reviews-title" className="text-2xl font-semibold text-text">
          Avis de parents
        </h2>
        <p className="text-sm text-subtext">
          Nous mettons en avant les retours mentionnant une expérience sans larmes pour rassurer les enfants sensibles.
        </p>
      </div>
      <Button variant="ghost" size="sm" type="button">
        Voir tous les avis
      </Button>
    </div>
    <div className="grid gap-4 md:grid-cols-2">
      {reviews.map((review) => (
        <blockquote key={review.id} className="rounded-xl border border-muted/80 bg-white p-4 shadow-card">
          <div className="flex items-center gap-2 text-primary">
            <MessageCircleHeart className="h-4 w-4" aria-hidden />
            <span className="text-sm font-semibold">{review.author}</span>
          </div>
          <p className="mt-2 italic text-text">“{review.text}”</p>
          <footer className="mt-3 text-xs text-subtext">
            {new Date(review.date).toLocaleDateString('fr-FR')} • {review.rating}/5
            {review.mentionsNoTears && <span className="ml-2 text-success">aucune larme</span>}
          </footer>
        </blockquote>
      ))}
    </div>
  </section>
);
