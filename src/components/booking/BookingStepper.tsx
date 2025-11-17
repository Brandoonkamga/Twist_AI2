import { CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useBookingStore } from '../../state/booking.store';
import { SecurePayNotice } from '../common/SecurePayNotice';
import { useI18n } from '../../i18n/I18nProvider';

const steps = [
  { id: 'service', label: 'booking.steps.service' },
  { id: 'datetime', label: 'booking.steps.datetime' },
  { id: 'details', label: 'booking.steps.details' },
  { id: 'payment', label: 'booking.steps.payment' },
];

export const BookingStepper: React.FC<{ children: React.ReactNode[] }> = ({ children }) => {
  const currentStep = useBookingStore((s) => s.currentStep);
  const setStep = useBookingStore((s) => s.setStep);
  const { t } = useI18n();
  const activeId = steps[currentStep]?.id ?? steps[0].id;

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue={activeId}
        value={activeId}
        onValueChange={(value) => {
          const nextIndex = steps.findIndex((step) => step.id === value);
          if (nextIndex >= 0) setStep(nextIndex);
        }}
        className="w-full"
      >
        <TabsList aria-label="Étapes de réservation">
          {steps.map((step, index) => {
            const completed = index < currentStep;
            return (
              <TabsTrigger
                key={step.id}
                value={step.id}
                className="flex items-center justify-center gap-2"
              >
                {completed && <CheckCircle2 className="h-4 w-4 text-success" aria-hidden />}
                <span className="text-xs font-medium uppercase tracking-wide">
                  {index + 1}. {t(step.label)}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        {children.map((content, index) => (
          <TabsContent key={steps[index]?.id ?? index} value={steps[index]?.id ?? `${index}`}>
            {content}
          </TabsContent>
        ))}
      </Tabs>
      <div className="space-y-3 text-sm text-subtext">
        <SecurePayNotice />
        <p>{t('booking.policy.deposit', { percent: '20' })}</p>
        <p>{t('booking.policy.cancel')}</p>
      </div>
    </div>
  );
};
