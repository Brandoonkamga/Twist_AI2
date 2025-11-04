import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../utils/cn';
export const Badge = ({ className, tone = 'primary', ...props }) => {
    const colors = {
        primary: 'bg-primary/10 text-primary border border-primary/20',
        success: 'bg-success/10 text-success border border-success/20',
        info: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
    };
    return (_jsx("span", { className: cn('inline-flex items-center rounded-pill px-3 py-1 text-sm font-medium', colors[tone], className), ...props }));
};
