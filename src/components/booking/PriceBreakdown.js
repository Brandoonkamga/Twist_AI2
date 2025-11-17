import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatCurrency } from '../../lib/format';
import { useI18n } from '../../i18n/I18nProvider';
export const PriceBreakdown = ({ items, total, locale = 'fr-FR' }) => {
    const { t } = useI18n();
    return (_jsxs("div", { className: "space-y-3 rounded-xl border border-muted/80 bg-white p-4 shadow-card", children: [_jsx("h3", { className: "text-lg font-semibold text-text", children: "D\u00E9tail du prix" }), _jsx("ul", { className: "space-y-2 text-sm text-subtext", children: items.map((item) => (_jsxs("li", { className: "flex items-center justify-between", children: [_jsx("span", { children: item.label }), _jsx("span", { className: "font-medium text-text", children: formatCurrency(item.amount, locale) })] }, item.label))) }), _jsxs("div", { className: "flex items-center justify-between border-t border-muted/60 pt-3 text-base font-semibold text-text", children: [_jsx("span", { children: t('booking.recap.total') }), _jsx("span", { children: formatCurrency(total, locale) })] }), _jsx("p", { className: "text-xs text-subtext", children: t('booking.policy.cancel') })] }));
};
