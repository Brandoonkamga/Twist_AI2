import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '../lib/format';
import { stylists } from '../mock/fixtures';
import { useBookingStore } from '../state/booking.store';
import { Button } from '../components/ui/button';
import { BookingStepper } from '../components/booking/BookingStepper';
import { PriceBreakdown } from '../components/booking/PriceBreakdown';
import { Input } from '../components/ui/input';
import { useI18n } from '../i18n/I18nProvider';
import { SecurePayNotice } from '../components/common/SecurePayNotice';
const fetchServices = async () => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return stylists[0];
};
const timeSlots = ['09:00', '10:30', '14:00', '15:30'];
const BookingFlow = () => {
    const { t } = useI18n();
    const store = useBookingStore();
    const { data: stylist } = useQuery({ queryKey: ['booking-stylist'], queryFn: fetchServices });
    const [confirmation, setConfirmation] = useState(null);
    const serviceStep = (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-text", children: t('booking.steps.service') }), _jsx("div", { className: "grid gap-3", children: stylist?.services.map((service) => {
                    const selected = store.selectedService?.id === service.id;
                    return (_jsxs("label", { className: `flex cursor-pointer items-center justify-between rounded-xl border p-4 shadow-sm transition ${selected ? 'border-primary bg-primary/5' : 'border-muted/70 bg-white'}`, children: [_jsxs("div", { children: [_jsx("p", { className: "text-base font-semibold text-text", children: service.title }), _jsxs("p", { className: "text-sm text-subtext", children: [service.durationMin, " min"] })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("p", { className: "text-base font-semibold text-primary", children: formatCurrency(service.price) }), _jsx("input", { type: "radio", name: "service", checked: selected, onChange: () => store.chooseService(service), "aria-label": `Sélectionner ${service.title}` })] })] }, service.id));
                }) }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { onClick: () => store.setStep(1), disabled: !store.selectedService, children: "Continuer" }) })] }));
    const datetimeStep = (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-text", children: t('booking.steps.datetime') }), _jsx("div", { className: "grid gap-3 md:grid-cols-2", children: ['2024-03-20', '2024-03-21', '2024-03-22', '2024-03-23'].map((date) => (_jsxs("button", { type: "button", onClick: () => store.setDatetime({ date, time: store.datetime?.time ?? timeSlots[0] }), className: `rounded-xl border p-4 text-left transition ${store.datetime?.date === date ? 'border-primary bg-primary/5' : 'border-muted/70 bg-white'}`, children: [_jsx("p", { className: "text-base font-semibold text-text", children: new Date(date).toLocaleDateString('fr-FR') }), _jsx("p", { className: "text-sm text-subtext", children: "4 cr\u00E9neaux disponibles" })] }, date))) }), _jsx("div", { className: "flex flex-wrap gap-2", children: timeSlots.map((slot) => (_jsx("button", { type: "button", onClick: () => store.setDatetime({ date: store.datetime?.date ?? '2024-03-20', time: slot }), className: `rounded-full border px-4 py-2 text-sm transition ${store.datetime?.time === slot ? 'border-primary bg-primary text-white' : 'border-muted/70 bg-white'}`, children: slot }, slot))) }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Button, { variant: "secondary", onClick: () => store.setStep(0), children: "Retour" }), _jsx(Button, { onClick: () => store.setStep(2), disabled: !store.datetime, children: "Continuer" })] })] }));
    const detailsStep = (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-text", children: t('booking.steps.details') }), _jsxs("div", { className: "space-y-3 rounded-2xl border border-muted/80 bg-white p-6 shadow-card", children: [_jsxs("label", { className: "flex items-center gap-3 text-sm", children: [_jsx("input", { type: "radio", name: "location", checked: store.atHome, onChange: () => store.setLocation({ atHome: true, address: store.address, travelFee: 12 }) }), "\u00C0 domicile (frais calcul\u00E9s automatiquement)"] }), _jsxs("label", { className: "flex items-center gap-3 text-sm", children: [_jsx("input", { type: "radio", name: "location", checked: !store.atHome, onChange: () => store.setLocation({ atHome: false, address: undefined, travelFee: 0 }) }), "Chez la coiffeuse (gratuit)"] }), store.atHome && (_jsx(Input, { placeholder: "Adresse compl\u00E8te", value: store.address ?? '', onChange: (e) => store.setLocation({ atHome: true, address: e.target.value, travelFee: 12 }) })), _jsx("textarea", { className: "min-h-[120px] w-full rounded-xl border border-muted/80 p-4 text-sm", placeholder: "Notez ici les sensibilit\u00E9s, allergies, pr\u00E9f\u00E9rences de votre enfant.", value: store.notes, onChange: (event) => store.setNotes(event.target.value) }), _jsx("p", { className: "text-xs text-subtext", children: "No-show : acompte conserv\u00E9 si annulation sous 24h." })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx(Button, { variant: "secondary", onClick: () => store.setStep(1), children: "Retour" }), _jsx(Button, { onClick: () => store.setStep(3), disabled: !store.datetime, children: "Continuer vers le paiement" })] })] }));
    const priceItems = useMemo(() => {
        const serviceAmount = store.selectedService?.price ?? 0;
        const travelFee = store.atHome ? store.travelFee : 0;
        return [
            { label: 'Prestation', amount: serviceAmount },
            { label: 'Frais déplacement', amount: travelFee },
        ];
    }, [store.selectedService, store.atHome, store.travelFee]);
    const total = priceItems.reduce((sum, item) => sum + item.amount, 0);
    const depositAmount = total * (store.depositPct / 100);
    const paymentStep = (_jsxs("div", { className: "space-y-6", children: [_jsx("h2", { className: "text-xl font-semibold text-text", children: t('booking.steps.payment') }), _jsx(PriceBreakdown, { items: priceItems, total: total }), _jsxs("div", { className: "rounded-2xl border border-muted/80 bg-white p-6 shadow-card space-y-4", children: [_jsx("p", { className: "text-sm text-subtext", children: t('booking.policy.deposit', { percent: String(store.depositPct) }) }), _jsxs("p", { className: "text-sm text-subtext", children: ["Montant de l\u2019acompte d\u00E9bit\u00E9 aujourd\u2019hui : ", formatCurrency(depositAmount)] }), _jsxs("label", { className: "flex items-center gap-2 text-sm", children: [_jsx("input", { type: "checkbox", required: true }), "J\u2019ai lu et j\u2019accepte les CGV et la politique d\u2019annulation (24h)."] }), _jsx(Button, { onClick: () => {
                            const booking = store.buildBooking(stylist?.id ?? 'stylist-1');
                            if (booking) {
                                setConfirmation(booking);
                                store.reset();
                                store.setStep(3);
                            }
                        }, disabled: !store.selectedService || !store.datetime, children: "Confirmer et payer l\u2019acompte" })] }), confirmation && (_jsxs("div", { className: "space-y-4 rounded-2xl border border-success/40 bg-success/10 p-6 text-success", children: [_jsxs("h3", { className: "flex items-center gap-2 text-lg font-semibold", children: ["\u2713 ", t('booking.confirmation.title')] }), _jsxs("p", { className: "text-sm text-success/90", children: ["Rendez-vous le ", new Date(confirmation.date).toLocaleDateString('fr-FR'), " \u00E0 ", confirmation.time, " \u2014 ID ", confirmation.id] }), _jsxs("div", { className: "flex flex-wrap gap-3", children: [_jsx(Button, { variant: "secondary", children: t('booking.confirmation.calendar') }), _jsx(Button, { variant: "ghost", children: t('booking.confirmation.contact') })] }), _jsx("a", { href: "mailto:support@afroconnect.fr", className: "text-xs text-success/90 underline", children: t('booking.confirmation.support') })] })), _jsx(SecurePayNotice, {})] }));
    return _jsx(BookingStepper, { children: [serviceStep, datetimeStep, detailsStep, paymentStep] });
};
export default BookingFlow;
