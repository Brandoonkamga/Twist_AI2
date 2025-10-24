import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useBookingStore, BookingStep } from '../state/booking.store';
import { BookingStepper, BookingStepContent } from '../components/booking/BookingStepper';
import { Select } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { PriceBreakdown } from '../components/booking/PriceBreakdown';
import { useQuery } from '@tanstack/react-query';
import { fetchStylists } from '../mock/api';
import { formatCurrency } from '../lib/format';
import { Card } from '../components/ui/card';
import { SecurePayNotice } from '../components/common/SecurePayNotice';
import { useUIStore } from '../state/ui.store';

const detailsSchema = z.object({
  atHome: z.boolean(),
  address: z.string().min(3, 'Adresse requise').optional(),
  notes: z.string().max(250).optional()
});

const paymentSchema = z.object({
  acceptPolicy: z.literal(true, {
    errorMap: () => ({ message: 'Veuillez accepter les conditions.' })
  })
});

export const BookingFlow = () => {
  const {
    currentStep,
    goTo,
    setService,
    setSchedule,
    setDetails,
    setPricing,
    confirm,
    service,
    date,
    time,
    atHome,
    address,
    notes,
    travelFee,
    total,
    confirmationId
  } = useBookingStore();
  const { data: stylists } = useQuery({ queryKey: ['stylists'], queryFn: () => fetchStylists() });
  const { pushToast } = useUIStore();

  useEffect(() => {
    if (service) {
      const fee = atHome ? 12 : 0;
      const totalAmount = service.price + fee;
      setPricing({ travelFee: fee, total: totalAmount });
    }
  }, [service, atHome, setPricing]);

  const handleStepChange = (step: BookingStep) => {
    goTo(step);
  };

  const handleSelectService = (serviceId: string) => {
    const selected = stylists?.flatMap((stylist) => stylist.services).find((item) => item.id === serviceId);
    if (selected) {
      setService(selected);
      goTo('datetime');
    }
  };

  const handleSchedule = (value: string) => {
    const [selectedDate, selectedTime] = value.split(' ');
    setSchedule(selectedDate, selectedTime);
    goTo('details');
  };

  const detailsForm = useForm({
    resolver: zodResolver(detailsSchema),
    defaultValues: { atHome: atHome ?? false, address: address ?? '', notes: notes ?? '' }
  });

  const paymentForm = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: { acceptPolicy: false }
  });

  const handleDetailsSubmit = (values: any) => {
    setDetails({
      atHome: values.atHome,
      address: values.atHome ? values.address : undefined,
      notes: values.notes
    });
    goTo('payment');
  };

  const handlePaymentSubmit = (values: any) => {
    if (!values.acceptPolicy) return;
    const booking = confirm();
    pushToast({ title: 'Réservation confirmée', description: `ID ${booking.id}` });
  };

  const priceItems = service
    ? [
        { label: 'Prestation', amount: service.price },
        { label: 'Frais déplacement', amount: travelFee },
        { label: 'Acompte (20%)', amount: service.price * 0.2 }
      ]
    : [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-text">Réservation douce en 4 étapes</h1>
      <BookingStepper step={currentStep} onChange={handleStepChange}>
        <BookingStepContent step={currentStep} value="service">
          <div className="space-y-4">
            <p className="text-sm text-subtext">Choisissez la prestation idéale pour votre enfant.</p>
            <Select aria-label="Sélection prestation" onChange={(event) => handleSelectService(event.target.value)}>
              <option value="">Sélectionner</option>
              {stylists?.flatMap((stylist) => stylist.services).map((srv) => (
                <option key={srv.id} value={srv.id}>
                  {srv.title} — {formatCurrency(srv.price)} ({srv.kidOnly ? 'Enfant' : 'Tout public'})
                </option>
              ))}
            </Select>
          </div>
        </BookingStepContent>
        <BookingStepContent step={currentStep} value="datetime">
          <div className="space-y-4">
            <p className="text-sm text-subtext">Sélectionnez un créneau disponible.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {['2024-04-18 10:00', '2024-04-18 14:00', '2024-04-19 09:30', '2024-04-19 15:00'].map((slot) => (
                <Button key={slot} variant="secondary" onClick={() => handleSchedule(slot)}>
                  {slot.replace(' ', ' à ')}
                </Button>
              ))}
            </div>
          </div>
        </BookingStepContent>
        <BookingStepContent step={currentStep} value="details">
          <form className="space-y-4" onSubmit={detailsForm.handleSubmit(handleDetailsSubmit)}>
            <label className="flex items-center gap-2 text-sm text-text">
              <input
                type="checkbox"
                {...detailsForm.register('atHome')}
                className="h-5 w-5 rounded border-border text-primary"
              />
              À domicile ? (frais déplacement automatiques)
            </label>
            {detailsForm.watch('atHome') ? (
              <div>
                <label className="text-sm font-semibold text-text" htmlFor="address">
                  Adresse complète
                </label>
                <input
                  id="address"
                  {...detailsForm.register('address')}
                  className="mt-1 w-full rounded-[1.5rem] border border-border px-4 py-3"
                  placeholder="12 rue apaisée, Paris"
                  aria-required="true"
                />
                {detailsForm.formState.errors.address ? (
                  <p className="mt-1 text-xs text-danger">{`${detailsForm.formState.errors.address.message}`}</p>
                ) : null}
              </div>
            ) : null}
            <div>
              <label className="text-sm font-semibold text-text" htmlFor="notes">
                Note pour la coiffeuse
              </label>
              <textarea
                id="notes"
                {...detailsForm.register('notes')}
                className="mt-1 w-full rounded-[1.5rem] border border-border px-4 py-3"
                placeholder="Sensibilité du cuir chevelu, dessins animés préférés..."
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-subtext">
              <span>Acompte de 20% prélevé maintenant.</span>
              <span>Solde sur place.</span>
            </div>
            <Button type="submit">Continuer vers le paiement</Button>
          </form>
        </BookingStepContent>
        <BookingStepContent step={currentStep} value="payment">
          <form className="space-y-4" onSubmit={paymentForm.handleSubmit(handlePaymentSubmit)}>
            <PriceBreakdown items={priceItems} total={total} />
            <div className="rounded-[1.5rem] bg-white p-4 shadow-sm">
              <h2 className="text-lg font-semibold text-text">Paiement sécurisé</h2>
              <p className="mt-2 text-sm text-subtext">
                Carte terminant par 4242 (mock). Vous serez débité de l’acompte maintenant.
              </p>
              <label className="mt-3 flex items-start gap-2 text-sm text-text">
                <input
                  type="checkbox"
                  {...paymentForm.register('acceptPolicy')}
                  className="mt-1 h-5 w-5 rounded border-border text-primary"
                />
                <span>
                  J’ai lu et j’accepte l’acompte (20%) et la politique d’annulation (gratuite jusqu’à 24h, sinon acompte conservé).
                </span>
              </label>
              {paymentForm.formState.errors.acceptPolicy ? (
                <p className="mt-1 text-xs text-danger">{paymentForm.formState.errors.acceptPolicy.message as string}</p>
              ) : null}
            </div>
            <SecurePayNotice />
            <Button type="submit" className="w-full">
              Confirmer et payer l’acompte
            </Button>
          </form>
        </BookingStepContent>
        <BookingStepContent step={currentStep} value="confirmation">
          <Card className="space-y-4 p-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
              ✓
            </div>
            <h2 className="text-2xl font-semibold text-text">Réservation confirmée</h2>
            <p className="text-sm text-subtext">
              {date} à {time} — ID {confirmationId}
            </p>
            <div className="flex flex-col gap-3 md:flex-row md:justify-center">
              <Button variant="secondary">Ajouter au calendrier</Button>
              <Button variant="ghost">Contacter la coiffeuse</Button>
            </div>
            <p className="text-xs text-subtext">
              Une checklist pré-RDV vous sera envoyée par email 24h avant. Besoin d’aide ? Contactez-nous.
            </p>
          </Card>
        </BookingStepContent>
      </BookingStepper>
    </div>
  );
};
