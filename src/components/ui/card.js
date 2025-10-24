import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../utils/cn';
export const Card = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn('rounded-lg bg-white shadow-card border border-muted/60', className), ...props })));
Card.displayName = 'Card';
export const CardHeader = ({ className, ...props }) => (_jsx("div", { className: cn('p-6', className), ...props }));
export const CardContent = ({ className, ...props }) => (_jsx("div", { className: cn('px-6 pb-6', className), ...props }));
export const CardTitle = ({ className, ...props }) => (_jsx("h3", { className: cn('text-xl font-semibold text-text', className), ...props }));
export const CardDescription = ({ className, ...props }) => (_jsx("p", { className: cn('text-subtext text-sm', className), ...props }));
