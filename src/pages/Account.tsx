import { useState } from 'react';
import { bookings } from '../mock/fixtures';
import { formatDateTime } from '../lib/format';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const tabs = ['Mes réservations', 'Favoris', 'Paiements', 'Paramètres'] as const;

type Tab = (typeof tabs)[number];

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Mes réservations');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10">
      <h1 className="text-3xl font-semibold text-foreground">Mon compte</h1>
      <div className="flex flex-wrap gap-2 rounded-3xl bg-muted p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`rounded-2xl px-4 py-2 text-sm font-semibold ${tab === activeTab ? 'bg-white shadow-card text-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Mes réservations' ? (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-foreground">Réservation #{booking.id}</p>
                  <p className="text-sm text-muted-foreground">{formatDateTime(booking.date, booking.time)}</p>
                  <p className="text-xs text-muted-foreground">Statut : {booking.status}</p>
                </div>
                <div className="rounded-2xl bg-muted px-4 py-3 text-sm">
                  <p className="font-semibold">Laisser un avis</p>
                  <label className="mt-2 flex items-center gap-2 text-xs font-semibold">
                    Note :
                    <Input
                      type="number"
                      min={1}
                      max={5}
                      value={rating}
                      onChange={(event) => setRating(Number(event.target.value))}
                      className="w-20"
                    />
                  </label>
                  <textarea
                    className="mt-2 w-full rounded-2xl border border-border px-4 py-3 text-sm"
                    rows={3}
                    placeholder="Partagez votre expérience (aucune larme ? ambiance ?)."
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                  <Button className="mt-2" variant="primary">
                    Soumettre l’avis
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}

      {activeTab === 'Favoris' ? (
        <Card>
          <CardContent>
            <p className="text-sm text-muted-foreground">Ajoutez vos coiffeuses préférées pour les retrouver en un clin d’œil.</p>
          </CardContent>
        </Card>
      ) : null}

      {activeTab === 'Paiements' ? (
        <Card>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Carte Visa se terminant par 4242 — ajoutée le 12 avril 2024.</p>
            <p>Retrait automatique du solde après la prestation.</p>
          </CardContent>
        </Card>
      ) : null}

      {activeTab === 'Paramètres' ? (
        <Card>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>Notifications SMS la veille : activées.</p>
            <p>Suppression de compte : contactez support@afroconnect.fr.</p>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default AccountPage;
