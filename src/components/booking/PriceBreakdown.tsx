import { formatCurrency } from '../../lib/format';

export type PriceItem = {
  label: string;
  amount: number;
};

export type PriceBreakdownProps = {
  items: PriceItem[];
  total: number;
};

export const PriceBreakdown = ({ items, total }: PriceBreakdownProps) => (
  <dl className="space-y-3 rounded-2xl border border-border bg-white p-4">
    {items.map((item) => (
      <div key={item.label} className="flex items-center justify-between text-sm">
        <dt className="text-subtext">{item.label}</dt>
        <dd className="font-semibold text-text">{formatCurrency(item.amount)}</dd>
      </div>
    ))}
    <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
      <dt>Total</dt>
      <dd>{formatCurrency(total)}</dd>
    </div>
  </dl>
);
