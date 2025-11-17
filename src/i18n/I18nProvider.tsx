import * as React from 'react';
import { fr } from './fr-FR';
import { en } from './en-GB';

type Locale = 'fr-FR' | 'en-GB';

type Messages = typeof fr;

interface I18nContextValue {
  locale: Locale;
  messages: Messages;
  t: (path: string, params?: Record<string, string | number>) => string;
  switchLocale: (locale: Locale) => void;
}

const dictionaries: Record<Locale, Messages> = {
  'fr-FR': fr,
  'en-GB': en as unknown as Messages,
};

export const I18nContext = React.createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = React.useState<Locale>('fr-FR');

  const t = React.useCallback(
    (path: string, params?: Record<string, string | number>) => {
      const segments = path.split('.');
      let current: any = dictionaries[locale];
      for (const segment of segments) {
        if (current?.[segment] == null) return path;
        current = current[segment];
      }
      if (typeof current !== 'string') return path;
      if (!params) return current;
      return Object.entries(params).reduce(
        (acc, [key, value]) => acc.replace(`{${key}}`, String(value)),
        current
      );
    },
    [locale]
  );

  const value = React.useMemo<I18nContextValue>(
    () => ({ locale, messages: dictionaries[locale], t, switchLocale: setLocale }),
    [locale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = React.useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
};
