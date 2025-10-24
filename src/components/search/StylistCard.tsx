import { Star } from 'lucide-react';
import { Stylist } from '../../types';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badges } from '../common/Badges';
import { useI18n } from '../../state/i18n.context';
import { formatPrice } from '../../lib/format';

export const StylistCard = ({ stylist, onClick }: { stylist: Stylist; onClick: () => void }) => {
  const { t } = useI18n();
  const mainService = stylist.services[0];

  return (
    <Card className="flex flex-col md:flex-row md:items-center md:gap-8" role="article">
      <div className="p-6 md:w-48">
        <img
          src={stylist.photos[0]}
          alt={`Photo de ${stylist.name}`}
          className="h-40 w-full rounded-2xl object-cover"
        />
      </div>
      <div className="flex-1">
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-2xl font-semibold text-foreground">{stylist.name}</h3>
              <p className="text-sm text-muted-foreground">{stylist.city} · {stylist.distanceKm} km</p>
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold text-warning">
              <Star className="h-4 w-4" aria-hidden="true" />
              {stylist.rating.toFixed(1)} ({stylist.reviewsCount})
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {mainService.title} · {formatPrice(mainService.price)} · {mainService.durationMin} min
              </p>
              {stylist.reviewsCount > 0 && stylist.rating >= 4.8 ? (
                <p className="text-sm font-semibold text-success">98% des parents recommandent</p>
              ) : null}
              <Badges
                variants={[
                  ...(stylist.kidFriendly ? ['KidFriendly' as const] : []),
                  ...(stylist.verifiedID ? ['VerifiedID' as const] : []),
                  'TopRated'
                ]}
              />
            </div>
            <Button onClick={onClick} aria-label={`${t('common.cta.reserve')} ${stylist.name}`}>
              {t('common.cta.reserve')}
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
