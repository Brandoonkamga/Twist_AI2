import { formatCurrency } from '../../lib/format';
import { useI18n } from '../../i18n/I18nProvider';

interface Item {
  label: string;
  amount: number;
}

interface Props {
  items: Item[];
  total: number;
  locale?: string;
}

export const PriceBreakdown: React.FC<Props> = ({ items, total, locale = 'fr-FR' }) => {
  const { t } = useI18n();
  return (
    <div className="space-y-3 rounded-xl border border-muted/80 bg-white p-4 shadow-card">
      <h3 className="text-lg font-semibold text-text">Détail du prix</h3>
      <ul className="space-y-2 text-sm text-subtext">
        {items.map((item) => (
          <li key={item.label} className="flex items-center justify-between">
            <span>{item.label}</span>
            <span className="font-medium text-text">{formatCurrency(item.amount, locale)}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-muted/60 pt-3 text-base font-semibold text-text">
        <span>{t('booking.recap.total')}</span>
        <span>{formatCurrency(total, locale)}</span>
      </div>
      <p className="text-xs text-subtext">{t('booking.policy.cancel')}</p>
    </div>
  );
};
