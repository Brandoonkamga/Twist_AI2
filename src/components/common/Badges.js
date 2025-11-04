import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ShieldCheck, Baby, Sparkles, Sprout } from 'lucide-react';
import { Badge } from '../ui/badge';
const badgeConfig = {
    KidFriendly: {
        label: 'Kid-Friendly certifiée',
        icon: _jsx(Baby, { className: "mr-1 h-4 w-4", "aria-hidden": true }),
        tone: 'success',
    },
    VerifiedID: {
        label: 'Identité vérifiée',
        icon: _jsx(ShieldCheck, { className: "mr-1 h-4 w-4", "aria-hidden": true }),
        tone: 'primary',
    },
    TopRated: {
        label: 'Parents recommandent',
        icon: _jsx(Sparkles, { className: "mr-1 h-4 w-4", "aria-hidden": true }),
        tone: 'info',
    },
    Hygiene: {
        label: 'Hygiène impeccable',
        icon: _jsx(Sprout, { className: "mr-1 h-4 w-4", "aria-hidden": true }),
        tone: 'info',
    },
};
export const TrustBadge = ({ variant }) => {
    const badge = badgeConfig[variant];
    return (_jsxs(Badge, { tone: badge.tone, className: "gap-1", children: [badge.icon, _jsx("span", { children: badge.label })] }));
};
