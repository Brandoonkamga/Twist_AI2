import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { cn } from '../../utils/cn';
const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
};
const variantClasses = {
    primary: 'bg-primary text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryContrast',
    secondary: 'bg-white text-primary border border-primary/20 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    ghost: 'bg-transparent text-primary hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
};
export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', ...props }, ref) => (_jsx("button", { ref: ref, className: cn('inline-flex items-center justify-center rounded-pill font-semibold transition-colors duration-normal disabled:cursor-not-allowed disabled:opacity-60', variantClasses[variant], sizeClasses[size], className), ...props })));
Button.displayName = 'Button';
