import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
export const SkeletonList = ({ count = 3 }) => (_jsxs("div", { className: "flex flex-col gap-4", role: "status", "aria-live": "polite", children: [_jsxs("div", { className: "flex items-center gap-2 text-subtext", children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin", "aria-hidden": true }), _jsx("span", { children: "Pr\u00E9paration de la liste\u2026" })] }), Array.from({ length: count }).map((_, index) => (_jsx(Skeleton, { className: "h-24 w-full" }, index)))] }));
