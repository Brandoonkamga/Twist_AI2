import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchReviewsForStylist, fetchStylistById } from '../mock/api';
import { Badges } from '../components/common/Badges';
import { Button } from '../components/ui/button';
import { ReviewList } from '../components/profile/ReviewList';
import { formatPrice } from '../lib/format';
import { SkeletonList } from '../components/common/SkeletonList';
import { useBookingStore } from '../state/booking.store';
import { useEffect } from 'react';

const upcomingSlots = ['2024-06-06T09:00', '2024-06-06T14:00', '2024-06-07T10:00'];

const StylistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const setStylist = useBookingStore((state) => state.setStylist);

  const {
    data: stylist,
    isLoading: isLoadingStylist
  } = useQuery({
    queryKey: ['stylist', id],
    queryFn: () => fetchStylistById(id ?? ''),
    enabled: Boolean(id)
  });

  const { data: stylistReviews, isLoading: isLoadingReviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => fetchReviewsForStylist(id ?? ''),
    enabled: Boolean(id)
  });

  useEffect(() => {
    if (id) {
      setStylist(id);
    }
  }, [id, setStylist]);

  if (isLoadingStylist) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-10">
        <SkeletonList count={2} />
      </div>
    );
  }

  if (!stylist) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <p className="text-lg text-muted-foreground">Coiffeuse introuvable. Revenez vers la recherche.</p>
        <Button className="mt-4" onClick={() => navigate('/')}>Retour à l’accueil</Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10">
        <header className="flex flex-col gap-6 rounded-3xl bg-white p-6 shadow-card md:flex-row md:items-center">
          <img
            src={stylist.photos[0]}
            alt={`Portrait de ${stylist.name}`}
            className="h-40 w-40 rounded-3xl object-cover"
          />
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-3xl font-semibold text-foreground">{stylist.name}</h1>
                <p className="text-sm text-muted-foreground">
                  {stylist.city} · {stylist.distanceKm} km — Note {stylist.rating.toFixed(1)} ({stylist.reviewsCount} avis)
                </p>
              </div>
              <Button onClick={() => navigate('/reservation')}>Réserver</Button>
            </div>
            <Badges
              variants={[
                ...(stylist.kidFriendly ? ['KidFriendly' as const] : []),
                ...(stylist.verifiedID ? ['VerifiedID' as const] : []),
                'TopRated',
                'Hygiene'
              ]}
            />
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <article className="rounded-3xl bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold text-foreground">À propos</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stylist.bio}</p>
            </article>

            <article className="rounded-3xl bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold text-foreground">Prestations enfants</h2>
              <ul className="mt-4 space-y-4">
                {stylist.services.map((service) => (
                  <li key={service.id} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{service.title}</p>
                      <p className="text-sm text-muted-foreground">Durée {service.durationMin} min</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{formatPrice(service.price)}</p>
                      <Button
                        variant="secondary"
                        className="mt-2"
                        onClick={() => {
                          setStylist(stylist.id);
                          navigate('/reservation');
                        }}
                      >
                        Réserver
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl bg-white p-6 shadow-card">
              <h2 className="text-xl font-semibold text-foreground">Hygiène & produits</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {stylist.hygiene.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Avis des parents</h2>
                <span className="rounded-pill bg-success/10 px-3 py-1 text-xs font-semibold text-success">Aucune larme mise en avant</span>
              </div>
              <div className="mt-4">
                {isLoadingReviews ? <SkeletonList count={1} /> : <ReviewList reviews={stylistReviews ?? []} />}
              </div>
            </article>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground">Prochains créneaux</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {upcomingSlots.map((slot) => (
                  <li key={slot} className="flex items-center justify-between rounded-2xl bg-muted px-3 py-2">
                    <span>{new Date(slot).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                    <span>{new Date(slot).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-card">
              <h2 className="text-lg font-semibold text-foreground">Zone d’intervention</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {stylist.city} et alentours (jusqu’à {stylist.zoneKm} km). Frais de déplacement calculés automatiquement selon votre adresse.
              </p>
            </div>
          </aside>
        </section>
      </div>

      <div className="sticky bottom-0 left-0 right-0 border-t border-border/60 bg-white/95 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Prête à tisser un moment doux ?</p>
            <p className="text-xs text-muted-foreground">Acompte 20% sécurisé, annulation gratuite jusqu’à 24h avant.</p>
          </div>
          <Button size="lg" onClick={() => navigate('/reservation')}>
            Réserver avec {stylist.name}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StylistProfile;
