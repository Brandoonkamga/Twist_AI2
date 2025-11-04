import * as TabsPrimitive from '@radix-ui/react-tabs';
import { clsx } from 'clsx';

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({ className, ...props }: TabsPrimitive.TabsListProps) => (
  <TabsPrimitive.List
    className={clsx(
      'inline-flex w-full gap-2 rounded-[1.5rem] bg-muted/60 p-1',
      className
    )}
    {...props}
  />
);

export const TabsTrigger = ({ className, ...props }: TabsPrimitive.TabsTriggerProps) => (
  <TabsPrimitive.Trigger
    className={clsx(
      'flex-1 rounded-[1.5rem] px-4 py-2 text-sm font-semibold text-subtext transition-all duration-[var(--friendly-duration)] ease-[var(--friendly-easing)] data-[state=active]:bg-white data-[state=active]:text-text data-[state=active]:shadow-sm focus-visible:outline-primary',
      className
    )}
    {...props}
  />
);

export const TabsContent = ({ className, ...props }: TabsPrimitive.TabsContentProps) => (
  <TabsPrimitive.Content className={clsx('focus-visible:outline-none', className)} {...props} />
);
