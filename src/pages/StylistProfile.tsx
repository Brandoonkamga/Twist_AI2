import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchReviews, fetchStylist } from '../mock/api';
import { ReviewList } from '../components/profile/ReviewList';
import { Badges } from '../components/common/Badges';
import { Button } from '../components/ui/button';
import { SecurePayNotice } from '../components/common/SecurePayNotice';
import { CalendarDays, Clock3, MapPin, MessageCircle } from 'lucide-react';
import { formatCurrency, formatDuration } from '../lib/format';
import { Card } from '../components/ui/card';
import { SkeletonList } from '../components/common/SkeletonList';

export const StylistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: stylist, isPending } = useQuery({
    queryKey: ['stylist', id],
    queryFn: () => fetchStylist(id ?? ''),
    enabled: Boolean(id)
  });

  const { data: reviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => fetchReviews(id ?? ''),
    enabled: Boolean(id)
  });

  if (isPending) {
    return <SkeletonList count={3} />;
  }

  if (!stylist) {
    return (
      <Card className="space-y-4 p-6 text-center">
        <p className="text-lg font-semibold text-text">Coiffeuse introuvable.</p>
        <Button onClick={() => navigate('/')}>Retourner à la recherche</Button>
      </Card>
    );
  }

  const badges: ('KidFriendly' | 'VerifiedID' | 'TopRated' | 'Hygiene')[] = ['Hygiene'];
  if (stylist.kidFriendly) badges.push('KidFriendly');
  if (stylist.verifiedID) badges.push('VerifiedID');
  if (stylist.rating >= 4.8) badges.push('TopRated');

  return (
    <div className="space-y-10 pb-24">
      <section className="flex flex-col gap-6 md:flex-row">
        <div className="flex-1 space-y-4">
          <div className="h-60 overflow-hidden rounded-[1.5rem] bg-muted">
            <img src={stylist.photos[0] ?? 'https://placehold.co/600x400'} alt={stylist.name} className="h-full w-full object-cover" />
          </div>
          <SecurePayNotice />
        </div>
        <aside className="flex w-full flex-col gap-4 md:w-72">
          <div>
            <h1 className="text-3xl font-bold text-text">{stylist.name}</h1>
            <p className="mt-1 text-sm text-subtext">{stylist.city} · {stylist.distanceKm.toFixed(1)} km</p>
          </div>
          <Badges badges={badges} />
          <p className="text-sm text-subtext">
            Note {stylist.rating.toFixed(1)} ({stylist.reviewsCount} avis parents)
          </p>
          <Button onClick={() => navigate('/reservation')} className="w-full" aria-label="Réserver avec cette coiffeuse">
            Réserver un créneau
          </Button>
          <Button variant="secondary" className="w-full" aria-label="Contacter la coiffeuse">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Contacter
          </Button>
        </aside>
      </section>
      <section className="grid gap-8 md:grid-cols-5">
        <article className="space-y-6 md:col-span-3">
          <div>
            <h2 className="text-2xl font-semibold text-text">À propos</h2>
            <p className="mt-2 text-sm text-subtext">{stylist.bio}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-text">Prestations</h2>
            <div className="mt-4 space-y-3">
              {stylist.services.map((service) => (
                <Card key={service.id} className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-base font-semibold text-text">{service.title}</h3>
                    <p className="text-sm text-subtext">
                      <Clock3 className="mr-1 inline h-4 w-4" aria-hidden="true" /> {formatDuration(service.durationMin)}
                    </p>
                  </div>
                  <div className="text-right text-sm text-text">
                    <p className="font-semibold">{formatCurrency(service.price)}</p>
                    {service.kidOnly ? <p className="text-xs text-success">Spécial enfants</p> : null}
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-text">Hygiène & produits</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-sm text-subtext">
              {stylist.hygiene.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-text">Avis</h2>
            <ReviewList reviews={reviews ?? []} />
          </div>
        </article>
        <aside className="space-y-6 md:col-span-2">
          <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-text">Disponibilités</h3>
            <p className="mt-2 text-sm text-subtext">Prochains créneaux (48h)</p>
            <ul className="mt-3 space-y-2">
              {['Demain 10:00', 'Demain 14:00', 'Samedi 09:30'].map((slot) => (
                <li key={slot} className="flex items-center justify-between rounded-full bg-muted px-4 py-2 text-sm">
                  <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="flex-1 px-2 text-text">{slot}</span>
                  <Button size="sm" variant="ghost" onClick={() => navigate('/reservation')}>
                    Réserver
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-text">Zone d’intervention</h3>
            <p className="mt-2 text-sm text-subtext">
              {stylist.city} + {stylist.zoneKm} km. Frais déplacement calculés automatiquement.
            </p>
            <div className="mt-3 flex items-center gap-2 text-sm text-text">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" /> Paris intra-muros, proche banlieue est.
            </div>
          </div>
        </aside>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/95 p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.1)]">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-text">Prête à réserver {stylist.name} ?</p>
            <p className="text-xs text-subtext">Annulation gratuite jusqu’à 24h avant le rendez-vous.</p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <Button onClick={() => navigate('/reservation')}>Réserver maintenant</Button>
            <Button variant="secondary">
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> Contacter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
