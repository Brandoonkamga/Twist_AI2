import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../utils/cn';
export const Select = React.forwardRef(({ className, children, helperText, label, id, ...props }, ref) => {
    const selectId = id ?? React.useId();
    return (_jsxs("label", { className: "flex w-full flex-col gap-2 text-sm font-medium text-text", children: [label && _jsx("span", { children: label }), _jsx("select", { id: selectId, ref: ref, className: cn('w-full rounded-lg border border-muted/80 bg-white px-4 py-3 text-base text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary', className), ...props, children: children }), helperText && _jsx("span", { className: "text-xs text-subtext", children: helperText })] }));
});
Select.displayName = 'Select';
