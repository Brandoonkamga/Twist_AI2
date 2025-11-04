import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '../lib/format';
import { stylists } from '../mock/fixtures';
import { useBookingStore } from '../state/booking.store';
import { Button } from '../components/ui/button';
import { BookingStepper } from '../components/booking/BookingStepper';
import { PriceBreakdown } from '../components/booking/PriceBreakdown';
import { Input } from '../components/ui/input';
import { useI18n } from '../i18n/I18nProvider';
import { SecurePayNotice } from '../components/common/SecurePayNotice';
import type { Booking } from '../types';

const fetchServices = async () => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return stylists[0];
};

const timeSlots = ['09:00', '10:30', '14:00', '15:30'];

const BookingFlow = () => {
  const { t } = useI18n();
  const store = useBookingStore();
  const { data: stylist } = useQuery({ queryKey: ['booking-stylist'], queryFn: fetchServices });
  const [confirmation, setConfirmation] = useState<Booking | null>(null);

  const serviceStep = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">{t('booking.steps.service')}</h2>
      <div className="grid gap-3">
        {stylist?.services.map((service) => {
          const selected = store.selectedService?.id === service.id;
          return (
            <label
              key={service.id}
              className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 shadow-sm transition ${
                selected ? 'border-primary bg-primary/5' : 'border-muted/70 bg-white'
              }`}
            >
              <div>
                <p className="text-base font-semibold text-text">{service.title}</p>
                <p className="text-sm text-subtext">{service.durationMin} min</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-base font-semibold text-primary">{formatCurrency(service.price)}</p>
                <input
                  type="radio"
                  name="service"
                  checked={selected}
                  onChange={() => store.chooseService(service)}
                  aria-label={`Sélectionner ${service.title}`}
                />
              </div>
            </label>
          );
        })}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => store.setStep(1)} disabled={!store.selectedService}>
          Continuer
        </Button>
      </div>
    </div>
  );

  const datetimeStep = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">{t('booking.steps.datetime')}</h2>
      <div className="grid gap-3 md:grid-cols-2">
        {['2024-03-20', '2024-03-21', '2024-03-22', '2024-03-23'].map((date) => (
          <button
            key={date}
            type="button"
            onClick={() => store.setDatetime({ date, time: store.datetime?.time ?? timeSlots[0] })}
            className={`rounded-xl border p-4 text-left transition ${
              store.datetime?.date === date ? 'border-primary bg-primary/5' : 'border-muted/70 bg-white'
            }`}
          >
            <p className="text-base font-semibold text-text">{new Date(date).toLocaleDateString('fr-FR')}</p>
            <p className="text-sm text-subtext">4 créneaux disponibles</p>
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => store.setDatetime({ date: store.datetime?.date ?? '2024-03-20', time: slot })}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              store.datetime?.time === slot ? 'border-primary bg-primary text-white' : 'border-muted/70 bg-white'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
      <div className="flex justify-between">
        <Button variant="secondary" onClick={() => store.setStep(0)}>
          Retour
        </Button>
        <Button onClick={() => store.setStep(2)} disabled={!store.datetime}>
          Continuer
        </Button>
      </div>
    </div>
  );

  const detailsStep = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">{t('booking.steps.details')}</h2>
      <div className="space-y-3 rounded-2xl border border-muted/80 bg-white p-6 shadow-card">
        <label className="flex items-center gap-3 text-sm">
          <input
            type="radio"
            name="location"
            checked={store.atHome}
            onChange={() => store.setLocation({ atHome: true, address: store.address, travelFee: 12 })}
          />
          À domicile (frais calculés automatiquement)
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input
            type="radio"
            name="location"
            checked={!store.atHome}
            onChange={() => store.setLocation({ atHome: false, address: undefined, travelFee: 0 })}
          />
          Chez la coiffeuse (gratuit)
        </label>
        {store.atHome && (
          <Input
            placeholder="Adresse complète"
            value={store.address ?? ''}
            onChange={(e) => store.setLocation({ atHome: true, address: e.target.value, travelFee: 12 })}
          />
        )}
        <textarea
          className="min-h-[120px] w-full rounded-xl border border-muted/80 p-4 text-sm"
          placeholder="Notez ici les sensibilités, allergies, préférences de votre enfant."
          value={store.notes}
          onChange={(event) => store.setNotes(event.target.value)}
        />
        <p className="text-xs text-subtext">No-show : acompte conservé si annulation sous 24h.</p>
      </div>
      <div className="flex justify-between">
        <Button variant="secondary" onClick={() => store.setStep(1)}>
          Retour
        </Button>
        <Button onClick={() => store.setStep(3)} disabled={!store.datetime}>
          Continuer vers le paiement
        </Button>
      </div>
    </div>
  );

  const priceItems = useMemo(() => {
    const serviceAmount = store.selectedService?.price ?? 0;
    const travelFee = store.atHome ? store.travelFee : 0;
    return [
      { label: 'Prestation', amount: serviceAmount },
      { label: 'Frais déplacement', amount: travelFee },
    ];
  }, [store.selectedService, store.atHome, store.travelFee]);

  const total = priceItems.reduce((sum, item) => sum + item.amount, 0);
  const depositAmount = total * (store.depositPct / 100);

  const paymentStep = (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-text">{t('booking.steps.payment')}</h2>
      <PriceBreakdown items={priceItems} total={total} />
      <div className="rounded-2xl border border-muted/80 bg-white p-6 shadow-card space-y-4">
        <p className="text-sm text-subtext">
          {t('booking.policy.deposit', { percent: String(store.depositPct) })}
        </p>
        <p className="text-sm text-subtext">Montant de l’acompte débité aujourd’hui : {formatCurrency(depositAmount)}</p>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" required />
          J’ai lu et j’accepte les CGV et la politique d’annulation (24h).
        </label>
        <Button
          onClick={() => {
            const booking = store.buildBooking(stylist?.id ?? 'stylist-1');
            if (booking) {
              setConfirmation(booking);
              store.reset();
              store.setStep(3);
            }
          }}
          disabled={!store.selectedService || !store.datetime}
        >
          Confirmer et payer l’acompte
        </Button>
      </div>
      {confirmation && (
        <div className="space-y-4 rounded-2xl border border-success/40 bg-success/10 p-6 text-success">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            ✓ {t('booking.confirmation.title')}
          </h3>
          <p className="text-sm text-success/90">
            Rendez-vous le {new Date(confirmation.date).toLocaleDateString('fr-FR')} à {confirmation.time} — ID {confirmation.id}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">{t('booking.confirmation.calendar')}</Button>
            <Button variant="ghost">{t('booking.confirmation.contact')}</Button>
          </div>
          <a href="mailto:support@afroconnect.fr" className="text-xs text-success/90 underline">
            {t('booking.confirmation.support')}
          </a>
        </div>
      )}
      <SecurePayNotice />
    </div>
  );

  return <BookingStepper>{[serviceStep, datetimeStep, detailsStep, paymentStep]}</BookingStepper>;
};

export default BookingFlow;
