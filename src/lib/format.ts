export const formatPrice = (amount: number, locale: string = 'fr-FR') =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);

export const formatDateTime = (date: string, time?: string, locale: string = 'fr-FR') => {
  const dateObj = new Date(`${date}T${time ?? '09:00'}`);
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj);
};
