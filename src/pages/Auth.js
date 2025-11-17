import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { useAuthStore } from '../state/auth.store';
import { useI18n } from '../i18n/I18nProvider';
const schema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(6, '6 caractères minimum'),
    role: z.enum(['parent', 'stylist']),
});
const Auth = () => {
    const { t } = useI18n();
    const navigate = useNavigate();
    const login = useAuthStore((s) => s.login);
    const [mode, setMode] = useState('login');
    const { register, handleSubmit, formState } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { role: 'parent' },
    });
    const onSubmit = handleSubmit((values) => {
        login({ id: 'user-1', name: 'Invité', email: values.email, role: values.role });
        navigate(values.role === 'stylist' ? '/pro' : '/');
    });
    return (_jsxs("section", { className: "mx-auto max-w-md space-y-6 rounded-3xl border border-muted/80 bg-white p-8 shadow-card", children: [_jsxs("header", { className: "space-y-2 text-center", children: [_jsx("h1", { className: "text-3xl font-bold text-text", children: mode === 'login' ? t('auth.login') : t('auth.register') }), _jsx("p", { className: "text-sm text-subtext", children: "AfroConnect respecte la vie priv\u00E9e des enfants : aucune donn\u00E9e sensible n\u2019est conserv\u00E9e sans votre consentement." })] }), _jsxs("form", { className: "space-y-4", onSubmit: onSubmit, noValidate: true, children: [_jsxs("label", { className: "space-y-2 text-sm font-medium text-text", children: ["Email", _jsx(Input, { type: "email", ...register('email'), hasError: !!formState.errors.email, autoComplete: "email" }), formState.errors.email && (_jsx("span", { className: "text-xs text-danger", children: formState.errors.email.message }))] }), _jsxs("label", { className: "space-y-2 text-sm font-medium text-text", children: ["Mot de passe", _jsx(Input, { type: "password", ...register('password'), hasError: !!formState.errors.password, autoComplete: "current-password" }), formState.errors.password && (_jsx("span", { className: "text-xs text-danger", children: formState.errors.password.message }))] }), _jsxs(Select, { label: "Je suis", ...register('role'), children: [_jsx("option", { value: "parent", children: "Parent" }), _jsx("option", { value: "stylist", children: "Coiffeuse" })] }), _jsx(Button, { type: "submit", className: "w-full", children: mode === 'login' ? t('auth.login') : t('auth.register') })] }), _jsx("p", { className: "text-xs text-subtext", children: "Donn\u00E9es trait\u00E9es conform\u00E9ment au RGPD. Vous pouvez demander la suppression de votre compte \u00E0 tout moment." }), _jsx("button", { type: "button", onClick: () => setMode(mode === 'login' ? 'register' : 'login'), className: "text-sm font-semibold text-primary", children: mode === 'login' ? 'Créer un compte' : 'J’ai déjà un compte' })] }));
};
export default Auth;
