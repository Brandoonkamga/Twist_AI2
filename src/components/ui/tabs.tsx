import { ReactNode, useState } from 'react';
import { cn } from '../../utils/cn';

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  initialTab?: string;
  onTabChange?: (id: string) => void;
};

export const Tabs = ({ tabs, initialTab, onTabChange }: TabsProps) => {
  const [active, setActive] = useState(initialTab ?? tabs[0]?.id);

  const handleChange = (id: string) => {
    setActive(id);
    onTabChange?.(id);
  };

  const currentTab = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <div>
      <div className="flex flex-wrap gap-2 rounded-2xl bg-muted p-2" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={tab.id === active}
            className={cn(
              'rounded-2xl px-4 py-2 text-sm font-semibold transition-all duration-normal',
              tab.id === active ? 'bg-white shadow-card text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
            onClick={() => handleChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4" role="tabpanel">
        {currentTab?.content}
      </div>
    </div>
  );
};
