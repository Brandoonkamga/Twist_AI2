import { CheckCircle2 } from 'lucide-react';
import { Tabs } from '../ui/tabs';
import { useBookingStore } from '../../state/booking.store';

const labels = {
  service: 'Prestation',
  datetime: 'Date & heure',
  details: 'Détails',
  payment: 'Paiement',
  confirmation: 'Confirmation',
} as const;

export const BookingStepper = () => {
  const { step, goToStep } = useBookingStore();
  const steps = (['service', 'datetime', 'details', 'payment', 'confirmation'] as const).map((value) => ({
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
      <Tabs
        value={step}
        onChange={(value) => goToStep(value as typeof steps[number]['value'])}
        tabs={steps as unknown as { value: string; label: React.ReactNode }[]}
        className="overflow-x-auto"
      />
      <p className="text-sm text-subtext">
        Acompte de 20% débité maintenant. Annulation gratuite jusqu’à 24h avant, ensuite l’acompte est non remboursable.
      </p>
    </div>
  );
};
