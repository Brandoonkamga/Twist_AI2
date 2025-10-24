import { createContext, useContext, useMemo } from 'react';
import { frFR } from './fr-FR';
import { enGB } from './en-GB';

const dictionaries = {
  'fr-FR': frFR,
  'en-GB': enGB,
};

type Locale = keyof typeof dictionaries;

type I18nContextValue = {
  locale: Locale;
  t: typeof frFR;
};

const I18nContext = createContext<I18nContextValue>({ locale: 'fr-FR', t: frFR });

export const I18nProvider = ({ locale = 'fr-FR', children }: { locale?: Locale; children: React.ReactNode }) => {
  const value = useMemo(() => ({ locale, t: dictionaries[locale] }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslations = () => useContext(I18nContext).t;
