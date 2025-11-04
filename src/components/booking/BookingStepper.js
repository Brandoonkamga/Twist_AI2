import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckCircle2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useBookingStore } from '../../state/booking.store';
import { SecurePayNotice } from '../common/SecurePayNotice';
import { useI18n } from '../../i18n/I18nProvider';
const steps = [
    { id: 'service', label: 'booking.steps.service' },
    { id: 'datetime', label: 'booking.steps.datetime' },
    { id: 'details', label: 'booking.steps.details' },
    { id: 'payment', label: 'booking.steps.payment' },
];
export const BookingStepper = ({ children }) => {
    const currentStep = useBookingStore((s) => s.currentStep);
    const setStep = useBookingStore((s) => s.setStep);
    const { t } = useI18n();
    const activeId = steps[currentStep]?.id ?? steps[0].id;
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs(Tabs, { defaultValue: activeId, value: activeId, onValueChange: (value) => {
                    const nextIndex = steps.findIndex((step) => step.id === value);
                    if (nextIndex >= 0)
                        setStep(nextIndex);
                }, className: "w-full", children: [_jsx(TabsList, { "aria-label": "\u00C9tapes de r\u00E9servation", children: steps.map((step, index) => {
                            const completed = index < currentStep;
                            return (_jsxs(TabsTrigger, { value: step.id, className: "flex items-center justify-center gap-2", children: [completed && _jsx(CheckCircle2, { className: "h-4 w-4 text-success", "aria-hidden": true }), _jsxs("span", { className: "text-xs font-medium uppercase tracking-wide", children: [index + 1, ". ", t(step.label)] })] }, step.id));
                        }) }), children.map((content, index) => (_jsx(TabsContent, { value: steps[index]?.id ?? `${index}`, children: content }, steps[index]?.id ?? index)))] }), _jsxs("div", { className: "space-y-3 text-sm text-subtext", children: [_jsx(SecurePayNotice, {}), _jsx("p", { children: t('booking.policy.deposit', { percent: '20' }) }), _jsx("p", { children: t('booking.policy.cancel') })] })] }));
};
