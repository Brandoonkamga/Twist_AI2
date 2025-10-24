import * as React from 'react';
import { cn } from '../../utils/cn';

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export const Tabs: React.FC<React.PropsWithChildren<TabsProps>> = ({
  defaultValue,
  value,
  onValueChange,
  className,
  children,
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value ?? internalValue;

  const setValue = React.useCallback(
    (next: string) => {
      setInternalValue(next);
      onValueChange?.(next);
    },
    [onValueChange]
  );

  React.useEffect(() => {
    if (value) {
      setInternalValue(value);
    }
  }, [value]);

  return (
    <TabsContext.Provider value={{ value: currentValue, setValue }}>
      <div className={cn('flex flex-col gap-4', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex gap-2 rounded-lg bg-muted p-1', className)} role="tablist" {...props} />
);

export const TabsTrigger: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
> = ({ className, value, children, ...props }) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs');
  const isActive = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      onClick={() => ctx.setValue(value)}
      className={cn(
        'flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary',
        isActive ? 'bg-white shadow-card text-primary' : 'text-subtext hover:text-primary'
      )}
      aria-selected={isActive}
      {...props}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { value: string }
> = ({ className, value, ...props }) => {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error('TabsContent must be used within Tabs');
  const isActive = ctx.value === value;
  return (
    <div role="tabpanel" hidden={!isActive} className={cn(className)} {...props} />
  );
};
