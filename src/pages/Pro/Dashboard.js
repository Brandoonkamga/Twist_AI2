import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import { bookings, stylists } from '../../mock/fixtures';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
const Dashboard = () => {
    const navigate = useNavigate();
    const upcoming = bookings.filter((booking) => booking.status !== 'completed').slice(0, 3);
    const stylist = stylists[0];
    const avgRating = stylist.rating.toFixed(1);
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("header", { className: "flex flex-col gap-2", children: [_jsxs("h1", { className: "text-3xl font-bold text-text", children: ["Bonjour ", stylist.name] }), _jsx("p", { className: "text-sm text-subtext", children: "Suivez vos rendez-vous, votre note et acc\u00E9dez \u00E0 vos raccourcis pros." })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-3", children: [_jsxs(Card, { className: "md:col-span-2", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Prochains rendez-vous" }) }), _jsx(CardContent, { className: "space-y-4", children: upcoming.map((booking) => (_jsxs("div", { className: "flex items-center justify-between rounded-xl border border-muted/60 p-4", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-sm font-semibold text-text", children: [booking.date, " \u2022 ", booking.time] }), _jsxs("p", { className: "text-xs text-subtext", children: [booking.atHome ? 'À domicile' : 'Salon', " \u2014 ID ", booking.id] })] }), _jsx(Button, { variant: "secondary", onClick: () => navigate('/pro/agenda'), children: "Voir l\u2019agenda" })] }, booking.id))) })] }), _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Note moyenne" }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-4xl font-bold text-primary", children: avgRating }), _jsxs("p", { className: "text-sm text-subtext", children: ["Bas\u00E9e sur ", stylist.reviewsCount, " avis de parents."] })] })] })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [_jsx(Button, { className: "w-full", onClick: () => navigate('/pro/agenda'), children: "Agenda" }), _jsx(Button, { variant: "secondary", className: "w-full", onClick: () => navigate('/pro/portefeuille'), children: "Portefeuille" }), _jsx(Button, { variant: "ghost", className: "w-full", onClick: () => navigate('/coiffeuses/stylist-1'), children: "Mon profil public" })] })] }));
};
export default Dashboard;
