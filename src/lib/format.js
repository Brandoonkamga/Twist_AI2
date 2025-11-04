export const formatCurrency = (value, locale = 'fr-FR') => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale === 'fr-FR' ? 'EUR' : 'GBP',
    minimumFractionDigits: 2,
}).format(value);
export const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (!hours)
        return `${minutes} min`;
    return `${hours}h${mins.toString().padStart(2, '0')}`;
};
