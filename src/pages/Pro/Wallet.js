import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { bookings } from '../../mock/fixtures';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
const Wallet = () => {
    const { balance, pending } = useMemo(() => {
        const confirmed = bookings.filter((booking) => booking.status === 'confirmed');
        const completed = bookings.filter((booking) => booking.status === 'completed');
        return {
            balance: completed.length * 48,
            pending: confirmed.length * 32,
        };
    }, []);
    const nextPayout = new Date();
    nextPayout.setDate(nextPayout.getDate() + 2);
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("header", { className: "space-y-2", children: [_jsx("h1", { className: "text-3xl font-bold text-text", children: "Portefeuille" }), _jsx("p", { className: "text-sm text-subtext", children: "Suivez vos gains confirm\u00E9s, ceux en attente et retirez en Instant Pay 48h." })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Solde disponible" }) }), _jsxs(CardContent, { children: [_jsxs("p", { className: "text-3xl font-bold text-primary", children: [balance.toFixed(2), " \u20AC"] }), _jsx("p", { className: "text-xs text-subtext", children: "Retirable imm\u00E9diatement." })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Gains en attente" }) }), _jsxs(CardContent, { children: [_jsxs("p", { className: "text-3xl font-bold text-text", children: [pending.toFixed(2), " \u20AC"] }), _jsx("p", { className: "text-xs text-subtext", children: "Lib\u00E9ration 24h apr\u00E8s chaque rendez-vous." })] })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Prochain versement" }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-xl font-semibold text-text", children: nextPayout.toLocaleDateString('fr-FR') }), _jsx("p", { className: "text-xs text-subtext", children: "Instant Pay disponible en 48h ouvr\u00E9es." })] })] })] }), _jsx(Button, { className: "w-full md:w-auto", children: "Retirer via Instant Pay" })] }));
};
export default Wallet;
