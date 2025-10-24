import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { PriceBreakdown } from '../components/booking/PriceBreakdown';
import { bookings, stylists } from '../mock/fixtures';
import { formatDate } from '../lib/format';

const tabs = ['Mes réservations', 'Favoris', 'Paiements', 'Paramètres'] as const;

type TabKey = (typeof tabs)[number];

const Account = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('Mes réservations');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const reservation = bookings[0];
  const stylist = stylists.find((s) => s.id === reservation.stylistId);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">Mon espace parent</h1>
      <nav className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`rounded-2xl px-4 py-2 text-sm font-medium ${activeTab === tab ? 'bg-primary text-white' : 'bg-white text-subtext'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'Mes réservations' && stylist && (
        <Card className="space-y-4">
          <h2 className="text-xl font-semibold text-text">Réservation passée</h2>
          <p className="text-sm text-subtext">
            {formatDate(`${reservation.date}T${reservation.time}`)} · {stylist.name}
          </p>
          <PriceBreakdown
            items={[
              { label: 'Prestation', amount: stylist.services[0].price },
              { label: 'Frais déplacement', amount: reservation.travelFee },
            ]}
            total={stylist.services[0].price + reservation.travelFee}
          />
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text">Note</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`h-10 w-10 rounded-full border ${rating >= value ? 'border-primary bg-primary/10 text-primary' : 'border-border text-subtext'}`}
                  onClick={() => setRating(value)}
                  aria-label={`${value} étoiles`}
                >
                  {value}★
                </button>
              ))}
            </div>
            <label className="block text-sm font-medium text-text" htmlFor="review">
              Votre retour bienveillant
            </label>
            <textarea
              id="review"
              className="w-full rounded-2xl border border-border px-4 py-3"
              rows={4}
              placeholder="Partagez l’expérience de votre enfant (aucune larme ? )"
              value={reviewText}
              onChange={(event) => {
                setReviewText(event.target.value);
                setSubmitted(false);
              }}
            />
            <Button
              onClick={() => {
                setSubmitted(true);
              }}
              className="mt-2"
            >
              Envoyer mon avis
            </Button>
            {submitted && <p className="text-sm text-success">Avis soumis, merci !</p>}
          </div>
        </Card>
      )}

      {activeTab !== 'Mes réservations' && (
        <Card>
          <p className="text-sm text-subtext">Section en cours de conception.</p>
        </Card>
      )}
    </div>
  );
};

export default Account;
