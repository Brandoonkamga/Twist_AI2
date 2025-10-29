import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchStylistById } from '../mock/api';
import { useBookingStore } from '../state/booking.store';
import { BookingStepper } from '../components/booking/BookingStepper';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { PriceBreakdown } from '../components/booking/PriceBreakdown';
import { SecurePayNotice } from '../components/common/SecurePayNotice';
import { Input } from '../components/ui/input';
import { formatDateTime, formatPrice } from '../lib/format';
import { useUIStore } from '../state/ui.store';
import { useI18n } from '../state/i18n.context';

const availableTimes = ['09:00', '10:30', '14:00', '16:30'];

const BookingFlow = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const addToast = useUIStore((state) => state.addToast);
  const {
    step,
    setStep,
    selectedStylistId,
    setService,
    selectedService,
    setDateTime,
    date,
    time,
    atHome,
    setAtHome,
    address,
    setAddress,
    computeTravelFee,
    travelFee,
    depositPct,
    buildBooking,
    reset
  } = useBookingStore();

  const { data: stylist } = useQuery({
    queryKey: ['booking-stylist', selectedStylistId],
    queryFn: () => fetchStylistById(selectedStylistId ?? ''),
    enabled: Boolean(selectedStylistId)
  });

  useEffect(() => {
    if (stylist && !selectedService) {
      setService(stylist.services[0]);
    }
  }, [stylist, selectedService, setService]);

  useEffect(() => {
    if (step === 'details') {
      computeTravelFee();
    }
  }, [step, computeTravelFee, atHome]);

  const [acceptCgv, setAcceptCgv] = useState(false);
  const [saveCard, setSaveCard] = useState(true);

  const priceItems = useMemo(() => {
    const servicePrice = selectedService?.price ?? 0;
    return [
      { label: 'Prestation', amount: servicePrice },
      { label: atHome ? 'Frais déplacement' : 'Salon', amount: atHome ? travelFee : 0 }
    ];
  }, [selectedService, atHome, travelFee]);

  const total = priceItems.reduce((sum, item) => sum + item.amount, 0);
  const depositAmount = total * (depositPct / 100);

  const goToStep = (next: typeof step) => setStep(next);

  const onConfirm = () => {
    const booking = buildBooking();
    if (!booking) {
      addToast({ title: 'Veuillez compléter les informations', status: 'error' });
      return;
    }
    setStep('confirmation');
    addToast({ title: 'Réservation confirmée 🎉', description: 'Vous recevrez un SMS de rappel 24h avant.', status: 'success' });
  };

  const renderStep = () => {
    if (!stylist) {
      return <p className="text-muted-foreground">Sélectionnez une coiffeuse depuis la page profil.</p>;
    }

    if (step === 'service') {
      return (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Choisissez une prestation</h2>
            <div className="space-y-3">
              {stylist.services.map((service) => (
                <label key={service.id} className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border px-4 py-3">
                  <div>
                    <p className="font-semibold text-foreground">{service.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(service.price)} · {service.durationMin} min {service.kidOnly ? '· Enfant' : ''}
                    </p>
                  </div>
                  <input
                    type="radio"
                    name="service"
                    checked={selectedService?.id === service.id}
                    onChange={() => setService(service)}
                    className="h-5 w-5"
                  />
                </label>
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={() => goToStep('datetime')} disabled={!selectedService}>
                Continuer
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (step === 'datetime') {
      return (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Date & heure</h2>
            <Input type="date" value={date ?? ''} onChange={(event) => setDateTime(event.target.value, time ?? availableTimes[0])} />
            <div className="flex flex-wrap gap-2">
              {availableTimes.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setDateTime(date ?? new Date().toISOString().slice(0, 10), slot)}
                  className={`rounded-2xl px-3 py-2 text-sm font-semibold ${time === slot ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}
                >
                  {slot}
                </button>
              ))}
            </div>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => goToStep('service')}>
                Retour
              </Button>
              <Button onClick={() => goToStep('details')} disabled={!date || !time}>
                Continuer
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    if (step === 'details') {
      return (
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Détails</h2>
              <label className="flex items-center gap-2 text-sm font-semibold">
                <input type="checkbox" checked={atHome} onChange={(event) => setAtHome(event.target.checked)} className="h-5 w-5" />
                À domicile (frais de déplacement automatiques)
              </label>
              {atHome ? (
                <Input
                  placeholder="Adresse complète"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  aria-label="Adresse du rendez-vous"
                />
              ) : null}
              <textarea
                className="w-full rounded-2xl border border-border px-4 py-3 text-sm"
                rows={3}
                placeholder="Note pour la coiffeuse (type de cheveux, préférences, etc.)"
              />
              <SecurePayNotice />
              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => goToStep('datetime')}>
                  Retour
                </Button>
                <Button onClick={() => goToStep('payment')}>
                  Continuer
                </Button>
              </div>
            </CardContent>
          </Card>
          <PriceBreakdown items={priceItems} total={total} />
        </div>
      );
    }

    if (step === 'payment') {
      return (
        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Paiement sécurisé</h2>
              <div className="rounded-2xl border border-border px-4 py-3">
                <p className="text-sm font-semibold text-foreground">Carte Visa se terminant par 4242</p>
                <label className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" checked={saveCard} onChange={(event) => setSaveCard(event.target.checked)} className="h-4 w-4" />
                  Mémoriser pour la prochaine réservation
                </label>
              </div>
              <div className="rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                <p>Acompte débité aujourd’hui : {formatPrice(depositAmount)}</p>
                <p>Solde ({formatPrice(total - depositAmount)}) à régler après la prestation.</p>
              </div>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="mt-1 h-4 w-4" checked={acceptCgv} onChange={(event) => setAcceptCgv(event.target.checked)} />
                <span>
                  J’ai lu et j’accepte les CGV, la politique d’annulation (24h) et confirme avoir partagé les besoins spécifiques de mon enfant.
                </span>
              </label>
              <div className="flex justify-between">
                <Button variant="ghost" onClick={() => goToStep('details')}>
                  Retour
                </Button>
                <Button onClick={onConfirm} disabled={!acceptCgv}>
                  Confirmer et payer l’acompte
                </Button>
              </div>
            </CardContent>
          </Card>
          <PriceBreakdown items={priceItems} total={total} />
        </div>
      );
    }

    const booking = buildBooking();
    return (
      <Card>
        <CardContent className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-semibold text-foreground">Réservation confirmée</h2>
          {booking ? (
            <p className="text-sm text-muted-foreground">
              {formatDateTime(booking.date, booking.time)} · Référence {booking.id}
            </p>
          ) : null}
          <div className="flex flex-col gap-3 md:flex-row md:justify-center">
            <Button variant="primary">Ajouter au calendrier</Button>
            <Button variant="secondary" onClick={() => navigate('/compte')}>
              Contacter / Messagerie
            </Button>
          </div>
          <Button variant="ghost" onClick={() => reset()}>
            Nouvelle réservation
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-10">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <BookingStepper active={step === 'confirmation' ? 'payment' : step} onChange={(next) => goToStep(next)} />
      </div>
      {renderStep()}
    </div>
  );
};

export default BookingFlow;
