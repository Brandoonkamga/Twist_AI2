import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { fr } from './fr-FR';
import { en } from './en-GB';
const dictionaries = {
    'fr-FR': fr,
    'en-GB': en,
};
export const I18nContext = React.createContext(undefined);
export const I18nProvider = ({ children }) => {
    const [locale, setLocale] = React.useState('fr-FR');
    const t = React.useCallback((path, params) => {
        const segments = path.split('.');
        let current = dictionaries[locale];
        for (const segment of segments) {
            if (current?.[segment] == null)
                return path;
            current = current[segment];
        }
        if (typeof current !== 'string')
            return path;
        if (!params)
            return current;
        return Object.entries(params).reduce((acc, [key, value]) => acc.replace(`{${key}}`, String(value)), current);
    }, [locale]);
    const value = React.useMemo(() => ({ locale, messages: dictionaries[locale], t, switchLocale: setLocale }), [locale, t]);
    return _jsx(I18nContext.Provider, { value: value, children: children });
};
export const useI18n = () => {
    const ctx = React.useContext(I18nContext);
    if (!ctx) {
        throw new Error('useI18n must be used within I18nProvider');
    }
    return ctx;
};
