import { Review } from '../../types';
import { Card, CardContent } from '../ui/card';
import { formatDateTime } from '../../lib/format';

export const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  if (!reviews.length) {
    return <p className="text-sm text-muted-foreground">Pas encore d’avis. Soyez le premier à partager votre expérience.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id} className="border-none bg-muted/50">
          <CardContent className="space-y-2">
            <p className="text-sm font-semibold text-foreground">{review.author}</p>
            <p className="text-xs text-muted-foreground">{formatDateTime(review.date, '09:00')}</p>
            <blockquote className="italic text-sm text-foreground">
              “{review.text}”
              {review.mentionsNoTears ? <span className="ml-2 text-success">(aucune larme)</span> : null}
            </blockquote>
          </CardContent>
        </Card>
      ))}
      <button className="text-sm font-semibold text-primary underline" type="button">
        Voir tous les avis
      </button>
    </div>
  );
};
