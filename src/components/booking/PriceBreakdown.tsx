import { formatPrice } from '../../lib/format';
import { useI18n } from '../../state/i18n.context';

type Item = {
  label: string;
  amount: number;
};

export const PriceBreakdown = ({ items, total }: { items: Item[]; total: number }) => {
  const { t, locale } = useI18n();

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card">
      <h3 className="text-xl font-semibold text-foreground">Détail du prix</h3>
      <dl className="mt-4 space-y-2 text-sm">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <dt className="text-muted-foreground">{item.label}</dt>
            <dd className="font-semibold">{formatPrice(item.amount, locale)}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
          <dt>{t('booking.recap.total')}</dt>
          <dd>{formatPrice(total, locale)}</dd>
        </div>
      </dl>
      <p className="mt-3 text-xs text-muted-foreground">{t('booking.policy.cancel')}</p>
    </div>
  );
};
