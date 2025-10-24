import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useTranslation } from '../../i18n';
import { ReactNode } from 'react';
import { BookingStep } from '../../state/booking.store';

const ORDER: BookingStep[] = ['service', 'datetime', 'details', 'payment', 'confirmation'];

interface BookingStepperProps {
  step: BookingStep;
  onChange: (step: BookingStep) => void;
  children: ReactNode;
}

export const BookingStepper = ({ step, onChange, children }: BookingStepperProps) => {
  const { t } = useTranslation();
  return (
    <Tabs value={step} onValueChange={(value) => onChange(value as BookingStep)}>
      <TabsList aria-label="Étapes de réservation">
        {ORDER.filter((item) => item !== 'confirmation').map((value) => (
          <TabsTrigger key={value} value={value} disabled={ORDER.indexOf(value) > ORDER.indexOf(step)}>
            {t(`booking.steps.${value}`)}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="mt-4 rounded-[1.5rem] bg-white p-4 shadow-sm" role="region" aria-live="polite">
        {children}
      </div>
      <p className="mt-3 text-xs text-subtext">
        {t('booking.policy.deposit', { percent: '20' })}
      </p>
    </Tabs>
  );
};

export const BookingStepContent = ({ value, step, children }: { value: BookingStep; step: BookingStep; children: ReactNode }) => (
  <TabsContent value={value} hidden={value !== step} className="outline-none">
    {children}
  </TabsContent>
);
