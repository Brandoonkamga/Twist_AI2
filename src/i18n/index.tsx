import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { frFR } from './fr-FR';
import { enGB } from './en-GB';

type Dictionary = typeof frFR;

type Locale = 'fr-FR' | 'en-GB';

type Translations = {
  [K in Locale]: Dictionary;
};

const dictionaries: Translations = {
  'fr-FR': frFR,
  'en-GB': enGB as Dictionary
};

type I18nContextValue = {
  locale: Locale;
  t: (path: string, params?: Record<string, string | number>) => string;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const interpolate = (value: string, params?: Record<string, string | number>) => {
  if (!params) return value;
  return Object.keys(params).reduce((acc, key) => acc.replace(`{${key}}`, String(params[key])), value);
};

const getValue = (dict: Dictionary, path: string): string => {
  const keys = path.split('.');
  let current: any = dict;
  for (const key of keys) {
    current = current?.[key];
    if (current === undefined) {
      return path;
    }
  }
  if (typeof current === 'string') return current;
  return path;
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('fr-FR');

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale,
    t: (path, params) => interpolate(getValue(dictionaries[locale], path), params)
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
};
