import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { frFR } from '../i18n/fr-FR';
import { enGB } from '../i18n/en-GB';

type Locale = 'fr-FR' | 'en-GB';

type Messages = typeof frFR;

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
};

const dictionaries: Record<Locale, Messages> = {
  'fr-FR': frFR,
  'en-GB': enGB as Messages
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const interpolate = (template: string, params?: Record<string, string | number>) => {
  if (!params) return template;
  return Object.entries(params).reduce((acc, [key, value]) => acc.replace(`{${key}}`, String(value)), template);
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('fr-FR');

  const value = useMemo<I18nContextValue>(() => {
    const messages = dictionaries[locale];
    return {
      locale,
      messages,
      setLocale,
      t: (path: string, params?: Record<string, string | number>) => {
        const keys = path.split('.');
        let current: any = messages;
        for (const key of keys) {
          current = current?.[key];
        }
        if (typeof current === 'string') {
          return interpolate(current, params);
        }
        return path;
      }
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
};
