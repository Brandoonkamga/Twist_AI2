import { MapPin, Star } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { TrustBadge } from '../common/Badges';
import { Button } from '../ui/button';
import type { Stylist } from '../../types';

interface Props {
  stylist: Stylist;
  onClick: () => void;
}

export const StylistCard: React.FC<Props> = ({ stylist, onClick }) => {
  const primaryService = stylist.services[0];
  return (
    <Card
      className="flex flex-col gap-4 p-4 transition hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary"
    >
      <CardContent className="flex flex-col gap-4 p-0">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-text">{stylist.name}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {stylist.kidFriendly && <TrustBadge variant="KidFriendly" />}
              {stylist.verifiedID && <TrustBadge variant="VerifiedID" />}
              {stylist.rating >= 4.8 && <TrustBadge variant="TopRated" />}
            </div>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="flex items-center gap-1 text-sm font-semibold text-primary">
              <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
              {stylist.rating.toFixed(1)}
            </span>
            <span className="text-xs text-subtext">{stylist.reviewsCount} avis</span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-subtext">
          <MapPin className="h-4 w-4" aria-hidden />
          <span>
            {stylist.city} • {stylist.distanceKm.toFixed(1)} km
          </span>
        </div>
        {primaryService && (
          <div className="rounded-lg bg-muted px-3 py-2 text-sm">
            <p className="font-semibold text-text">{primaryService.title}</p>
            <p className="text-subtext">
              {primaryService.price} € • {primaryService.durationMin} min
            </p>
            {stylist.kidFriendly && <p className="mt-1 text-xs text-success">98% des parents recommandent</p>}
          </div>
        )}
        <Button type="button" onClick={onClick} className="w-full md:w-auto">
          Voir le profil
        </Button>
      </CardContent>
    </Card>
  );
};
