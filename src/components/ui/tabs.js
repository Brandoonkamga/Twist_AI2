import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../utils/cn';
const TabsContext = React.createContext(undefined);
export const Tabs = ({ defaultValue, value, onValueChange, className, children, }) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const currentValue = value ?? internalValue;
    const setValue = React.useCallback((next) => {
        setInternalValue(next);
        onValueChange?.(next);
    }, [onValueChange]);
    React.useEffect(() => {
        if (value) {
            setInternalValue(value);
        }
    }, [value]);
    return (_jsx(TabsContext.Provider, { value: { value: currentValue, setValue }, children: _jsx("div", { className: cn('flex flex-col gap-4', className), children: children }) }));
};
export const TabsList = ({ className, ...props }) => (_jsx("div", { className: cn('flex gap-2 rounded-lg bg-muted p-1', className), role: "tablist", ...props }));
export const TabsTrigger = ({ className, value, children, ...props }) => {
    const ctx = React.useContext(TabsContext);
    if (!ctx)
        throw new Error('TabsTrigger must be used within Tabs');
    const isActive = ctx.value === value;
    return (_jsx("button", { type: "button", role: "tab", onClick: () => ctx.setValue(value), className: cn('flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-normal focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary', isActive ? 'bg-white shadow-card text-primary' : 'text-subtext hover:text-primary'), "aria-selected": isActive, ...props, children: children }));
};
export const TabsContent = ({ className, value, ...props }) => {
    const ctx = React.useContext(TabsContext);
    if (!ctx)
        throw new Error('TabsContent must be used within Tabs');
    const isActive = ctx.value === value;
    return (_jsx("div", { role: "tabpanel", hidden: !isActive, className: cn(className), ...props }));
};
