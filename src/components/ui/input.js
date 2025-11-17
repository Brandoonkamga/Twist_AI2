import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../utils/cn';
export const Input = React.forwardRef(({ className, hasError, ...props }, ref) => (_jsx("input", { ref: ref, className: cn('w-full rounded-lg border border-muted/80 bg-white px-4 py-3 text-base text-text placeholder:text-subtext/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary', hasError && 'border-danger focus-visible:outline-danger', className), ...props })));
Input.displayName = 'Input';
