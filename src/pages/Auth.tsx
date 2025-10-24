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

type FormValues = z.infer<typeof schema>;

const Auth = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: 'parent' },
  });

  const onSubmit = handleSubmit((values) => {
    login({ id: 'user-1', name: 'Invité', email: values.email, role: values.role });
    navigate(values.role === 'stylist' ? '/pro' : '/');
  });

  return (
    <section className="mx-auto max-w-md space-y-6 rounded-3xl border border-muted/80 bg-white p-8 shadow-card">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-text">{mode === 'login' ? t('auth.login') : t('auth.register')}</h1>
        <p className="text-sm text-subtext">
          AfroConnect respecte la vie privée des enfants : aucune donnée sensible n’est conservée sans votre consentement.
        </p>
      </header>
      <form className="space-y-4" onSubmit={onSubmit} noValidate>
        <label className="space-y-2 text-sm font-medium text-text">
          Email
          <Input type="email" {...register('email')} hasError={!!formState.errors.email} autoComplete="email" />
          {formState.errors.email && (
            <span className="text-xs text-danger">{formState.errors.email.message}</span>
          )}
        </label>
        <label className="space-y-2 text-sm font-medium text-text">
          Mot de passe
          <Input type="password" {...register('password')} hasError={!!formState.errors.password} autoComplete="current-password" />
          {formState.errors.password && (
            <span className="text-xs text-danger">{formState.errors.password.message}</span>
          )}
        </label>
        <Select label="Je suis" {...register('role')}>
          <option value="parent">Parent</option>
          <option value="stylist">Coiffeuse</option>
        </Select>
        <Button type="submit" className="w-full">
          {mode === 'login' ? t('auth.login') : t('auth.register')}
        </Button>
      </form>
      <p className="text-xs text-subtext">
        Données traitées conformément au RGPD. Vous pouvez demander la suppression de votre compte à tout moment.
      </p>
      <button
        type="button"
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        className="text-sm font-semibold text-primary"
      >
        {mode === 'login' ? 'Créer un compte' : 'J’ai déjà un compte'}
      </button>
    </section>
  );
};

export default Auth;
