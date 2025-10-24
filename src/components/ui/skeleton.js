import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../utils/cn';
export const Skeleton = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn('animate-pulse rounded-lg bg-gradient-to-r from-muted via-white/80 to-muted', className), ...props })));
Skeleton.displayName = 'Skeleton';
