import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, Filter } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useI18n } from '../../i18n/I18nProvider';
const schema = z.object({
    city: z.string().min(2, 'Veuillez indiquer une ville'),
    kidFriendlyOnly: z.boolean().default(true),
});
const suggestedCities = ['Paris', 'Montreuil', 'Ivry-sur-Seine', 'Saint-Denis'];
export const SearchBar = ({ initialQuery = '', onSubmit }) => {
    const { t } = useI18n();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const { register, handleSubmit, setValue, watch, formState } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            city: initialQuery,
            kidFriendlyOnly: true,
        },
    });
    const submit = handleSubmit((values) => {
        onSubmit(values);
        setShowSuggestions(false);
    });
    const cityValue = watch('city');
    return (_jsxs("form", { onSubmit: submit, className: "w-full rounded-2xl bg-white p-4 shadow-card", "aria-label": "Recherche de coiffeuses", children: [_jsxs("div", { className: "flex flex-col gap-4 md:flex-row md:items-end", children: [_jsxs("label", { className: "flex w-full flex-col gap-2 text-sm font-medium text-text", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-4 w-4", "aria-hidden": true }), "Ville ou code postal"] }), _jsxs("div", { className: "relative", children: [_jsx(Input, { ...register('city'), "aria-invalid": !!formState.errors.city, onFocus: () => setShowSuggestions(true), placeholder: "Paris, Montreuil\u2026" }), showSuggestions && cityValue.length < 3 && (_jsx("p", { className: "mt-2 text-xs text-subtext", children: "Tapez au moins 3 lettres pour personnaliser la recherche." })), showSuggestions && cityValue.length >= 2 && (_jsx("ul", { className: "absolute z-20 mt-2 w-full rounded-lg border border-muted/80 bg-white shadow-card", role: "listbox", children: suggestedCities
                                            .filter((city) => city.toLowerCase().includes(cityValue.toLowerCase()))
                                            .map((city) => (_jsx("li", { children: _jsx("button", { type: "button", className: "w-full px-4 py-2 text-left text-sm hover:bg-muted", onClick: () => {
                                                    setValue('city', city, { shouldValidate: true });
                                                    setShowSuggestions(false);
                                                }, children: city }) }, city))) }))] }), formState.errors.city && (_jsx("span", { className: "text-xs text-danger", children: formState.errors.city.message }))] }), _jsxs("div", { className: "flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center", children: [_jsxs("label", { className: "flex items-center gap-2 text-sm", children: [_jsx("input", { type: "checkbox", ...register('kidFriendlyOnly'), className: "h-4 w-4 rounded border border-muted/80 text-primary focus:ring-primary", "aria-label": t('common.labels.kidFriendly') }), "Kid-Friendly par d\u00E9faut"] }), _jsx(Button, { type: "submit", className: "w-full md:w-auto", children: t('common.cta.search') })] })] }), _jsxs("div", { className: "mt-3 flex items-center gap-2 text-xs text-subtext", children: [_jsx(Filter, { className: "h-4 w-4", "aria-hidden": true }), "Ajustez les filtres apr\u00E8s votre recherche."] })] }));
};
