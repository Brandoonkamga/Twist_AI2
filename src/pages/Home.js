import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '../components/search/SearchBar';
import { StylistCard } from '../components/search/StylistCard';
import { SkeletonList } from '../components/common/SkeletonList';
import { Button } from '../components/ui/button';
import { stylists } from '../mock/fixtures';
import { useI18n } from '../i18n/I18nProvider';
const fetchStylists = async () => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return stylists;
};
const Home = () => {
    const { t } = useI18n();
    const navigate = useNavigate();
    const [query, setQuery] = useState({ city: 'Paris', kidFriendlyOnly: true });
    const { data, isLoading } = useQuery({ queryKey: ['stylists'], queryFn: fetchStylists });
    const filtered = useMemo(() => {
        if (!data)
            return [];
        return data
            .filter((stylist) => query.kidFriendlyOnly ? stylist.kidFriendly : true)
            .filter((stylist) => stylist.city.toLowerCase().includes(query.city.toLowerCase()) ||
            String(stylist.distanceKm).includes(query.city.toLowerCase()))
            .sort((a, b) => a.distanceKm - b.distanceKm);
    }, [data, query]);
    return (_jsxs("div", { className: "space-y-10", children: [_jsx("section", { className: "rounded-3xl bg-primary text-white p-8 md:p-12 shadow-card", children: _jsxs("div", { className: "space-y-6", children: [_jsx("h1", { className: "text-4xl font-bold md:text-5xl", children: t('home.title') }), _jsx("p", { className: "max-w-2xl text-lg text-white/80", children: t('home.subtitle') }), _jsx(SearchBar, { initialQuery: query.city, onSubmit: (values) => setQuery(values) })] }) }), _jsxs("section", { className: "space-y-6", children: [_jsxs("header", { className: "flex flex-col justify-between gap-4 md:flex-row md:items-center", children: [_jsx("h2", { className: "text-2xl font-semibold text-text", children: "Coiffeuses proches" }), _jsx(Button, { variant: "secondary", onClick: () => navigate('/reservation'), children: t('common.cta.reserve') })] }), isLoading ? (_jsx(SkeletonList, { count: 4 })) : filtered.length ? (_jsx("div", { className: "grid gap-6 md:grid-cols-2", children: filtered.map((stylist) => (_jsx(StylistCard, { stylist: stylist, onClick: () => navigate(`/coiffeuses/${stylist.id}`) }, stylist.id))) })) : (_jsxs("div", { className: "rounded-2xl border border-dashed border-primary/40 bg-white p-8 text-center shadow-card", children: [_jsx("p", { className: "text-lg font-semibold text-text", children: t('home.empty') }), _jsx(Button, { variant: "primary", className: "mt-4", children: t('home.alert') })] }))] })] }));
};
export default Home;
