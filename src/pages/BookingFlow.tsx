import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { stylists } from '../mock/fixtures';
import { useBookingStore } from '../state/booking.store';
import { BookingStepper } from '../components/booking/BookingStepper';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { PriceBreakdown } from '../components/booking/PriceBreakdown';
import { formatCurrency, formatDate } from '../lib/format';
import { SecurePayNotice } from '../components/common/SecurePayNotice';

const detailsSchema = z.object({
  atHome: z.boolean().default(false),
  address: z.string().optional(),
  notes: z.string().optional(),
  acceptPolicy: z.boolean().refine((value) => value === true, 'Vous devez accepter les conditions.'),
});

type DetailsFormValues = z.infer<typeof detailsSchema>;

const fetchStylists = async () => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return stylists;
};

const BookingFlow = () => {
  const {
    step,
    selectedStylist,
    selectedService,
    date,
    time,
    atHome,
    address,
    travelFee,
    depositPct,
    confirmation,
    setStylist,
    selectService,
    setDateTime,
    setLocation,
    setNotes,
    goToStep,
    confirm,
  } = useBookingStore();

  const { data: stylistsData } = useQuery({ queryKey: ['booking-stylists'], queryFn: fetchStylists });

  useEffect(() => {
    if (stylistsData && !selectedStylist) {
      setStylist(stylistsData[0].id);
    }
  }, [stylistsData, selectedStylist, setStylist]);

  const slots = ['2024-03-22T10:00', '2024-03-23T14:00', '2024-03-25T09:30'];

  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      atHome: atHome,
      address,
      notes: '',
      acceptPolicy: false,
    },
  });

  useEffect(() => {
    form.setValue('atHome', atHome);
    form.setValue('address', address ?? '');
  }, [atHome, address, form]);

  const total = (selectedService?.price ?? 0) + travelFee;
  const deposit = (total * depositPct) / 100;

  const renderStep = () => {
    switch (step) {
      case 'service':
        return (
          <Card className="space-y-4">
            <h2 className="text-xl font-semibold text-text">Choisissez la prestation</h2>
            <div className="space-y-3">
              {selectedStylist?.services.map((service) => (
                <label
                  key={service.id}
                  className={`flex cursor-pointer flex-col gap-1 rounded-2xl border px-4 py-3 ${
                    selectedService?.id === service.id ? 'border-primary bg-primary/5' : 'border-border bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-text">{service.title}</span>
                    <span className="text-primary">{formatCurrency(service.price)}</span>
                  </div>
                  <span className="text-sm text-subtext">Durée {service.durationMin} min</span>
                  <input
                    type="radio"
                    name="service"
                    className="sr-only"
                    checked={selectedService?.id === service.id}
                    onChange={() => selectService(service.id)}
                  />
                </label>
              ))}
            </div>
            <div className="flex justify-end">
              <Button onClick={() => goToStep('datetime')} disabled={!selectedService}>
                Continuer
              </Button>
            </div>
          </Card>
        );
      case 'datetime':
        return (
          <Card className="space-y-4">
            <h2 className="text-xl font-semibold text-text">Date & heure</h2>
            <p className="text-sm text-subtext">Sélectionnez un créneau doux pour votre enfant.</p>
            <div className="grid gap-3 md:grid-cols-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`rounded-2xl border px-4 py-3 text-left ${date === slot.split('T')[0] && time === slot.split('T')[1] ? 'border-primary bg-primary/5' : 'border-border bg-white'}`}
                  onClick={() => {
                    const [slotDate, slotTime] = slot.split('T');
                    setDateTime(slotDate, slotTime);
                  }}
                >
                  <p className="font-semibold text-text">{formatDate(slot)}</p>
                  <p className="text-sm text-subtext">{slot.split('T')[1]}</p>
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
          </Card>
        );
      case 'details':
        return (
          <Card className="space-y-4">
            <h2 className="text-xl font-semibold text-text">Détails du rendez-vous</h2>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit((values) => {
                setLocation(values.atHome, values.address);
                setNotes(values.notes ?? '');
                goToStep('payment');
              })}
            >
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-text">Lieu</legend>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="atHome"
                    checked={!form.watch('atHome')}
                    onChange={() => {
                      form.setValue('atHome', false);
                      setLocation(false);
                    }}
                  />
                  <span>Chez la coiffeuse</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="atHome"
                    checked={form.watch('atHome')}
                    onChange={() => {
                      form.setValue('atHome', true);
                      setLocation(true, form.getValues('address'));
                    }}
                  />
                  <span>À domicile (+ frais déplacement)</span>
                </label>
              </fieldset>

              {form.watch('atHome') && (
                <label className="flex flex-col gap-1">
                  <span className="text-sm text-text">Adresse</span>
                  <input
                    className="rounded-2xl border border-border px-4 py-3"
                    placeholder="Adresse complète"
                    value={form.watch('address') ?? ''}
                    onChange={(event) => form.setValue('address', event.target.value)}
                  />
                </label>
              )}

              <label className="flex flex-col gap-1">
                <span className="text-sm text-text">Notes pour la coiffeuse</span>
                <textarea
                  className="rounded-2xl border border-border px-4 py-3"
                  rows={3}
                  placeholder="Allergies, préférences..."
                  value={form.watch('notes') ?? ''}
                  onChange={(event) => form.setValue('notes', event.target.value)}
                />
              </label>

              <label className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.watch('acceptPolicy')}
                  onChange={(event) => form.setValue('acceptPolicy', event.target.checked)}
                />
                <span>
                  J’ai lu et j’accepte l’acompte de 20% débité maintenant et l’annulation gratuite jusqu’à 24h avant le rendez-vous.
                </span>
              </label>
              {form.formState.errors.acceptPolicy && (
                <p className="text-sm text-danger">{form.formState.errors.acceptPolicy.message}</p>
              )}

              <div className="flex justify-between">
                <Button variant="ghost" type="button" onClick={() => goToStep('datetime')}>
                  Retour
                </Button>
                <Button type="submit">Continuer</Button>
              </div>
            </form>
          </Card>
        );
      case 'payment':
        return (
          <Card className="space-y-4">
            <h2 className="text-xl font-semibold text-text">Paiement sécurisé</h2>
            <SecurePayNotice />
            <div className="rounded-2xl border border-border bg-muted/40 p-4">
              <p className="font-semibold text-text">Carte Visa terminant par 4242</p>
              <p className="text-sm text-subtext">Aucun numéro réel n’est stocké. Simulation de paiement.</p>
            </div>
            <PriceBreakdown
              items={[
                { label: 'Prestation', amount: selectedService?.price ?? 0 },
                { label: 'Frais déplacement', amount: travelFee },
              ]}
              total={total}
            />
            <p className="text-sm text-subtext">
              Acompte de {depositPct}% soit {formatCurrency(deposit)} débité maintenant. Annulation gratuite jusqu’à 24h avant, ensuite l’acompte est non remboursable.
            </p>
            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => goToStep('details')}>
                Retour
              </Button>
              <Button onClick={() => confirm()} disabled={!selectedService || !date || !time}>
                Confirmer la réservation
              </Button>
            </div>
          </Card>
        );
      case 'confirmation':
        return (
          <Card className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
              ✓
            </div>
            <h2 className="text-2xl font-semibold text-text">Réservation confirmée !</h2>
            <p className="text-sm text-subtext">
              RDV le {confirmation ? formatDate(`${confirmation.date}T${confirmation.time}`) : ''} — ID {confirmation?.id}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="secondary">Ajouter au calendrier</Button>
              <Button variant="ghost">Contacter la coiffeuse</Button>
            </div>
            <p className="text-sm text-subtext">
              Besoin d’aide ? Consultez notre centre d’assistance pour toute question ou litige.
            </p>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <BookingStepper />
      {renderStep()}
    </div>
  );
};

export default BookingFlow;
