import * as React from 'react';
import { cn } from '../../utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, helperText, label, id, ...props }, ref) => {
    const selectId = id ?? React.useId();
    return (
      <label className="flex w-full flex-col gap-2 text-sm font-medium text-text">
        {label && <span>{label}</span>}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'w-full rounded-lg border border-muted/80 bg-white px-4 py-3 text-base text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
            className
          )}
          {...props}
        >
          {children}
        </select>
        {helperText && <span className="text-xs text-subtext">{helperText}</span>}
      </label>
    );
  }
);
Select.displayName = 'Select';
