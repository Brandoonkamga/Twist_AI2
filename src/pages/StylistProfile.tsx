import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CalendarDays, MapPin, MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { stylists, reviews } from '../mock/fixtures';
import { Badges } from '../components/common/Badges';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ReviewList } from '../components/profile/ReviewList';
import { formatCurrency, formatDuration } from '../lib/format';
import { SecurePayNotice } from '../components/common/SecurePayNotice';

const fetchStylist = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return stylists.find((stylist) => stylist.id === id);
};

const StylistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: stylist, isLoading } = useQuery({
    queryKey: ['stylist', id],
    queryFn: () => fetchStylist(id ?? ''),
    enabled: Boolean(id),
  });

  const stylistReviews = useMemo(() => reviews.filter((review) => review.mentionsNoTears), []);

  if (isLoading) {
    return <div className="py-12">Chargement du profil…</div>;
  }

  if (!stylist) {
    return (
      <Card className="text-center">
        <p className="text-lg font-semibold text-primary">Profil introuvable</p>
        <Button className="mt-4" onClick={() => navigate('/')}>Retour à l’accueil</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-card lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <p className="text-sm text-warning">Note {stylist.rating.toFixed(1)} · {stylist.reviewsCount} avis</p>
          <h1 className="text-3xl font-bold text-text">{stylist.name}</h1>
          <div className="flex flex-wrap gap-2">
            <Badges
              variants={[
                ...(stylist.kidFriendly ? (['KidFriendly'] as const) : []),
                ...(stylist.verifiedID ? (['VerifiedID'] as const) : []),
              ]}
            />
          </div>
          <p className="text-subtext">{stylist.bio}</p>
          <div className="flex items-center gap-2 text-sm text-subtext">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {stylist.city} · se déplace jusqu’à {stylist.zoneKm} km
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 rounded-2xl bg-muted p-4 lg:w-72">
          <SecurePayNotice />
          <Button onClick={() => navigate('/reservation')} className="w-full" aria-label="Réserver ce professionnel">
            Réserver
          </Button>
          <Button variant="secondary" onClick={() => navigate('/reservation')}>
            Voir les disponibilités
          </Button>
          <Button variant="ghost" className="text-primary" onClick={() => navigate('/reservation')}>
            Ajouter aux favoris
          </Button>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-semibold text-text">Prestations populaires</h2>
            <ul className="mt-4 space-y-3">
              {stylist.services.map((service) => (
                <li key={service.id} className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-muted px-4 py-3">
                  <div>
                    <p className="font-semibold text-text">{service.title}</p>
                    <p className="text-sm text-subtext">Durée {formatDuration(service.durationMin)}</p>
                  </div>
                  <Button variant="secondary" onClick={() => navigate('/reservation')} aria-label={`Réserver ${service.title}`}>
                    {formatCurrency(service.price)}
                  </Button>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-text">Hygiène & Produits</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-subtext">
              {stylist.hygiene.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-2xl font-semibold text-text">Avis</h2>
            <ReviewList reviews={stylistReviews} />
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="space-y-4">
            <h2 className="flex items-center gap-2 text-xl font-semibold text-text">
              <CalendarDays className="h-5 w-5 text-primary" aria-hidden="true" />
              Prochains créneaux
            </h2>
            <ul className="space-y-2">
              {['Mercredi 14h', 'Samedi 10h', 'Samedi 14h'].map((slot) => (
                <li key={slot} className="flex items-center justify-between rounded-2xl bg-muted px-3 py-2 text-sm">
                  <span>{slot}</span>
                  <Button size="sm" variant="secondary" onClick={() => navigate('/reservation')}>
                    Réserver
                  </Button>
                </li>
              ))}
            </ul>
            <p className="text-sm text-subtext">
              {`Acompte de 20% débité maintenant. Annulation gratuite jusqu’à 24h avant.`}
            </p>
          </Card>

          <Card className="space-y-3">
            <h2 className="text-xl font-semibold text-text">Zone d’intervention</h2>
            <p className="text-sm text-subtext">
              Disponible à domicile dans un rayon de {stylist.zoneKm} km. Frais déplacement calculés automatiquement.
            </p>
            <div className="flex flex-wrap gap-2 text-sm text-subtext">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <Sparkles className="h-4 w-4 text-primary" />
                Kid-friendly
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Paiement sécurisé
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
                <MessageCircle className="h-4 w-4 text-primary" />
                Chat avant RDV
              </span>
            </div>
          </Card>
        </aside>
      </section>

      <div className="sticky bottom-4 flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-card">
        <div>
          <p className="font-semibold text-text">Prête pour un rendez-vous tout en douceur ?</p>
          <p className="text-sm text-subtext">Réservez en sécurité, acompte de 20% seulement.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => navigate('/reservation')} className="px-6">
            Réserver
          </Button>
          <Button variant="secondary" onClick={() => navigate('/reservation')}>
            Contacter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StylistProfile;
