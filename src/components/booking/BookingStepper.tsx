import { CheckCircle2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { Tabs } from '../ui/tabs';
import { useBookingStore, type BookingStep } from '../../state/booking.store';

const labels: Record<BookingStep, string> = {
  service: 'Prestation',
  datetime: 'Date & heure',
  details: 'Détails',
  payment: 'Paiement',
  confirmation: 'Confirmation',
};

export const BookingStepper = () => {
  const { step, goToStep } = useBookingStore();
  const order: BookingStep[] = ['service', 'datetime', 'details', 'payment', 'confirmation'];
  const steps: { value: BookingStep; label: ReactNode }[] = order.map((value) => ({
    value,
    label: (
      <span className="flex items-center gap-2">
        {step === value ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : null}
        {labels[value]}
      </span>
    ),
  }));

  return (
    <div className="flex flex-col gap-2">
      <Tabs value={step} onChange={(value) => goToStep(value)} tabs={steps} className="overflow-x-auto" />
      <p className="text-sm text-subtext">
        Acompte de 20% débité maintenant. Annulation gratuite jusqu’à 24h avant, ensuite l’acompte est non remboursable.
      </p>
    </div>
  );
};
