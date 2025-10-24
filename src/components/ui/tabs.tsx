import { clsx } from 'clsx';
import type { ReactNode } from 'react';

export type TabsProps = {
  value: string;
  onChange?: (value: string) => void;
  tabs: { value: string; label: ReactNode }[];
  className?: string;
};

export const Tabs = ({ value, onChange, tabs, className }: TabsProps) => (
  <div className={clsx('flex flex-wrap gap-2', className)} role="tablist">
    {tabs.map((tab) => {
      const active = value === tab.value;
      return (
        <button
          key={tab.value}
          role="tab"
          aria-selected={active}
          className={clsx(
            'rounded-2xl px-4 py-2 text-sm font-medium focus-visible:ring-primary',
            active ? 'bg-primary text-white shadow-card' : 'bg-muted text-subtext hover:bg-muted/80'
          )}
          onClick={() => onChange?.(tab.value)}
          type="button"
        >
          {tab.label}
        </button>
      );
    })}
  </div>
);
