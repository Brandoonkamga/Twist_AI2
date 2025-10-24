import { ArrowRight, MapPin, Star } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badges } from '../common/Badges';
import type { Stylist } from '../../types';
import { formatCurrency } from '../../lib/format';

export type StylistCardProps = {
  stylist: Stylist;
  onClick: () => void;
};

export const StylistCard = ({ stylist, onClick }: StylistCardProps) => {
  const featuredService = stylist.services[0];
  const variants = [
    ...(stylist.kidFriendly ? (['KidFriendly'] as const) : []),
    ...(stylist.verifiedID ? (['VerifiedID'] as const) : []),
  ];

  return (
    <Card className="flex flex-col gap-4 lg:flex-row lg:items-center" role="article">
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" aria-hidden="true" />
            <span className="text-lg font-semibold text-text">
              {stylist.rating.toFixed(2)} · {stylist.reviewsCount} avis
            </span>
          </div>
          <h3 className="text-2xl font-semibold text-text">{stylist.name}</h3>
          {variants.length > 0 && <Badges variants={variants} />}
        </div>
        <p className="text-subtext">{featuredService.title} · {formatCurrency(featuredService.price)}</p>
        <div className="flex items-center gap-2 text-sm text-subtext">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          <span>
            {stylist.city} · {stylist.distanceKm.toFixed(1)} km
          </span>
        </div>
        {stylist.rating >= 4.9 && <p className="text-sm text-success">98% des parents recommandent</p>}
      </div>
      <div className="flex flex-col items-stretch gap-2 lg:items-end">
        <Button onClick={onClick} className="flex items-center justify-center gap-2" aria-label={`Ouvrir le profil de ${stylist.name}`}>
          <span>Voir le profil</span>
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Button>
        <Button variant="secondary" onClick={onClick} aria-label={`Réserver ${featuredService.title} avec ${stylist.name}`}>
          Réserver dès {formatCurrency(featuredService.price)}
        </Button>
      </div>
    </Card>
  );
};
