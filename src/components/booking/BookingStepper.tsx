import { CheckCircle2 } from 'lucide-react';
import { useI18n } from '../../state/i18n.context';

type Step = 'service' | 'datetime' | 'details' | 'payment';

const stepOrder: Step[] = ['service', 'datetime', 'details', 'payment'];

export const BookingStepper = ({ active, onChange }: { active: Step; onChange: (step: Step) => void }) => {
  const { t } = useI18n();

  return (
    <div>
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist">
          {stepOrder.map((step) => {
            const index = stepOrder.indexOf(step) + 1;
            const isActive = step === active;
            const completed = stepOrder.indexOf(step) < stepOrder.indexOf(active);
            return (
              <button
                key={step}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : completed
                    ? 'bg-success/10 text-success'
                    : 'bg-muted text-muted-foreground'
                }`}
                onClick={() => onChange(step)}
              >
                {completed ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : <span>{index}</span>}
                <span>{t(`booking.steps.${step}`)}</span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {t('booking.policy.deposit', { percent: '20' })}
      </p>
    </div>
  );
};
