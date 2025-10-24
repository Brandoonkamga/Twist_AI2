import { Stylist } from '../../types';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { MapPin, Star } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { formatCurrency } from '../../lib/format';

interface StylistCardProps {
  stylist: Stylist;
  onClick: () => void;
}

export const StylistCard = ({ stylist, onClick }: StylistCardProps) => {
  const { t } = useTranslation();
  const topRecommendation = stylist.rating >= 4.8 && stylist.reviewsCount > 50;
  const minPrice = Math.min(...stylist.services.map((service) => service.price));

  return (
    <Card
      className="flex flex-col gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
      role="article"
      aria-label={`Profil ${stylist.name}`}
    >
      <div className="flex items-start gap-4">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-muted">
          <img
            src={stylist.photos[0] ?? 'https://placehold.co/160x160'}
            alt={`Photo de ${stylist.name}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-text">{stylist.name}</h3>
            <div className="flex items-center gap-1 rounded-full bg-warning/10 px-2 py-1 text-xs text-warning" aria-label={`Note ${stylist.rating}`}>
              <Star className="h-3 w-3" aria-hidden="true" />
              <span>{stylist.rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-sm text-subtext">
            <MapPin className="mr-1 inline h-4 w-4 text-primary" aria-hidden="true" />
            {stylist.city} · {stylist.distanceKm.toFixed(1)} km
          </p>
          <div className="flex flex-wrap gap-2">
            {stylist.kidFriendly ? (
              <Badge variant="success">{t('common.labels.kidFriendly')}</Badge>
            ) : null}
            {stylist.verifiedID ? (
              <Badge variant="outline" className="border-primary/40 text-primary">
                {t('common.labels.verifiedID')}
              </Badge>
            ) : null}
            {topRecommendation ? (
              <Badge variant="warning">98% des parents recommandent</Badge>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-subtext">
        <span>À partir de {formatCurrency(minPrice)}</span>
        <Button onClick={onClick} aria-label={`Ouvrir le profil de ${stylist.name}`}>
          {t('common.cta.reserve')}
        </Button>
      </div>
    </Card>
  );
};
