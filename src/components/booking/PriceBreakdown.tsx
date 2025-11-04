import { formatCurrency } from '../../lib/format';

export interface PriceItem {
  label: string;
  amount: number;
}

export const PriceBreakdown = ({ items, total }: { items: PriceItem[]; total: number }) => (
  <div className="space-y-3 rounded-[1.5rem] bg-muted p-4" aria-live="polite">
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.label} className="flex items-center justify-between text-sm text-text">
          <span>{item.label}</span>
          <span>{formatCurrency(item.amount)}</span>
        </li>
      ))}
    </ul>
    <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold text-text">
      <span>Total</span>
      <span>{formatCurrency(total)}</span>
    </div>
  </div>
);
