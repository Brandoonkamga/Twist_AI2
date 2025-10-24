export const formatCurrency = (amount: number, locale = 'fr-FR') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(amount);

export const formatDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hours}h${mins.toString().padStart(2, '0')}` : `${hours}h`;
};

export const formatDate = (iso: string, locale = 'fr-FR') =>
  new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(new Date(iso));

export const formatTime = (time: string) => time;
