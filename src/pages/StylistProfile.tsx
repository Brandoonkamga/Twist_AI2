import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { TrustBadge } from '../components/common/Badges';
import { ReviewList } from '../components/profile/ReviewList';
import { SkeletonList } from '../components/common/SkeletonList';
import { stylists, reviews } from '../mock/fixtures';
import { formatCurrency, formatDuration } from '../lib/format';
import { SecurePayNotice } from '../components/common/SecurePayNotice';

const fetchStylist = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return stylists.find((s) => s.id === id) ?? null;
};

const StylistProfile = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const stylistId = params.id ?? 'stylist-1';
  const { data: stylist, isLoading } = useQuery({
    queryKey: ['stylist', stylistId],
    queryFn: () => fetchStylist(stylistId),
  });

  const stylistReviews = useMemo(() => reviews.slice(0, 4), []);

  if (isLoading) {
    return <SkeletonList count={3} />;
  }

  if (!stylist) {
    return (
      <div className="rounded-2xl border border-danger/40 bg-white p-8 text-center shadow-card">
        <p className="text-lg font-semibold text-danger">Coiffeuse introuvable.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>Retour à l’accueil</Button>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-24">
      <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <header className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-text">{stylist.name}</h1>
                <div className="mt-3 flex flex-wrap gap-2">
                  {stylist.kidFriendly && <TrustBadge variant="KidFriendly" />}
                  {stylist.verifiedID && <TrustBadge variant="VerifiedID" />}
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => navigate('/reservation')}>Réserver</Button>
                <Button variant="secondary">Contacter</Button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-subtext">
              <span>{stylist.city}</span>
              <span>{stylist.distanceKm.toFixed(1)} km</span>
              <span>{stylist.reviewsCount} avis</span>
            </div>
            <p className="text-base text-text">{stylist.bio}</p>
          </header>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-text">Prestations</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {stylist.services.map((service) => (
                <div key={service.id} className="rounded-2xl border border-muted/80 bg-white p-4 shadow-card">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text">{service.title}</h3>
                    {service.kidOnly && <Badge tone="success">Enfants</Badge>}
                  </div>
                  <p className="mt-2 text-sm text-subtext">{formatDuration(service.durationMin)}</p>
                  <p className="mt-2 text-base font-semibold text-text">{formatCurrency(service.price)}</p>
                  <Button className="mt-4 w-full" onClick={() => navigate('/reservation')}>
                    Réserver
                  </Button>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-text">Hygiène & Produits</h2>
            <ul className="grid gap-2 rounded-2xl border border-muted/60 bg-white p-6 shadow-card">
              {stylist.hygiene.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-text">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="sticky top-32 space-y-4 self-start">
          <div className="rounded-2xl border border-primary/20 bg-white p-6 shadow-card">
            <h2 className="text-xl font-semibold text-text">Zone d’intervention</h2>
            <p className="mt-2 text-sm text-subtext">
              Jusqu’à {stylist.zoneKm} km depuis {stylist.city}. Frais déplacement calculés automatiquement selon l’adresse.
            </p>
            <p className="mt-4 text-sm text-text">Frais estimés : 0,80 € / km</p>
          </div>
          <SecurePayNotice />
          <Button className="w-full">Réserver</Button>
        </aside>
      </section>
      <ReviewList reviews={stylistReviews} />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-muted/80 bg-white/95 p-4 backdrop-blur md:hidden">
        <Button className="w-full" onClick={() => navigate('/reservation')}>
          Réserver avec {stylist.name}
        </Button>
      </div>
    </div>
  );
};

export default StylistProfile;
