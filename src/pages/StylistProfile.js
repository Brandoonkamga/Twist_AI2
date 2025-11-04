import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { TrustBadge } from '../components/common/Badges';
import { ReviewList } from '../components/profile/ReviewList';
import { SkeletonList } from '../components/common/SkeletonList';
import { stylists, reviews } from '../mock/fixtures';
import { formatCurrency, formatDuration } from '../lib/format';
import { SecurePayNotice } from '../components/common/SecurePayNotice';
const fetchStylist = async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return stylists.find((s) => s.id === id) ?? null;
};
const StylistProfile = () => {
    const params = useParams();
    const navigate = useNavigate();
    const stylistId = params.id ?? 'stylist-1';
    const { data: stylist, isLoading } = useQuery({
        queryKey: ['stylist', stylistId],
        queryFn: () => fetchStylist(stylistId),
    });
    const stylistReviews = useMemo(() => reviews.slice(0, 4), []);
    if (isLoading) {
        return _jsx(SkeletonList, { count: 3 });
    }
    if (!stylist) {
        return (_jsxs("div", { className: "rounded-2xl border border-danger/40 bg-white p-8 text-center shadow-card", children: [_jsx("p", { className: "text-lg font-semibold text-danger", children: "Coiffeuse introuvable." }), _jsx(Button, { className: "mt-4", onClick: () => navigate('/'), children: "Retour \u00E0 l\u2019accueil" })] }));
    }
    return (_jsxs("div", { className: "space-y-10 pb-24", children: [_jsxs("section", { className: "grid gap-6 md:grid-cols-[2fr,1fr]", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("header", { className: "flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-text", children: stylist.name }), _jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [stylist.kidFriendly && _jsx(TrustBadge, { variant: "KidFriendly" }), stylist.verifiedID && _jsx(TrustBadge, { variant: "VerifiedID" })] })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { onClick: () => navigate('/reservation'), children: "R\u00E9server" }), _jsx(Button, { variant: "secondary", children: "Contacter" })] })] }), _jsxs("div", { className: "flex flex-wrap gap-4 text-sm text-subtext", children: [_jsx("span", { children: stylist.city }), _jsxs("span", { children: [stylist.distanceKm.toFixed(1), " km"] }), _jsxs("span", { children: [stylist.reviewsCount, " avis"] })] }), _jsx("p", { className: "text-base text-text", children: stylist.bio })] }), _jsxs("section", { className: "space-y-4", children: [_jsx("h2", { className: "text-2xl font-semibold text-text", children: "Prestations" }), _jsx("div", { className: "grid gap-4 md:grid-cols-2", children: stylist.services.map((service) => (_jsxs("div", { className: "rounded-2xl border border-muted/80 bg-white p-4 shadow-card", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-text", children: service.title }), service.kidOnly && _jsx(Badge, { tone: "success", children: "Enfants" })] }), _jsx("p", { className: "mt-2 text-sm text-subtext", children: formatDuration(service.durationMin) }), _jsx("p", { className: "mt-2 text-base font-semibold text-text", children: formatCurrency(service.price) }), _jsx(Button, { className: "mt-4 w-full", onClick: () => navigate('/reservation'), children: "R\u00E9server" })] }, service.id))) })] }), _jsxs("section", { className: "space-y-4", children: [_jsx("h2", { className: "text-2xl font-semibold text-text", children: "Hygi\u00E8ne & Produits" }), _jsx("ul", { className: "grid gap-2 rounded-2xl border border-muted/60 bg-white p-6 shadow-card", children: stylist.hygiene.map((item) => (_jsxs("li", { className: "flex items-start gap-2 text-sm text-text", children: [_jsx("span", { className: "mt-1 h-2 w-2 rounded-full bg-primary", "aria-hidden": true }), item] }, item))) })] })] }), _jsxs("aside", { className: "sticky top-32 space-y-4 self-start", children: [_jsxs("div", { className: "rounded-2xl border border-primary/20 bg-white p-6 shadow-card", children: [_jsx("h2", { className: "text-xl font-semibold text-text", children: "Zone d\u2019intervention" }), _jsxs("p", { className: "mt-2 text-sm text-subtext", children: ["Jusqu\u2019\u00E0 ", stylist.zoneKm, " km depuis ", stylist.city, ". Frais d\u00E9placement calcul\u00E9s automatiquement selon l\u2019adresse."] }), _jsx("p", { className: "mt-4 text-sm text-text", children: "Frais estim\u00E9s : 0,80 \u20AC / km" })] }), _jsx(SecurePayNotice, {}), _jsx(Button, { className: "w-full", children: "R\u00E9server" })] })] }), _jsx(ReviewList, { reviews: stylistReviews }), _jsx("div", { className: "fixed inset-x-0 bottom-0 z-40 border-t border-muted/80 bg-white/95 p-4 backdrop-blur md:hidden", children: _jsxs(Button, { className: "w-full", onClick: () => navigate('/reservation'), children: ["R\u00E9server avec ", stylist.name] }) })] }));
};
export default StylistProfile;
