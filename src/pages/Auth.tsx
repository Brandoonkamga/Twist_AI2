import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { useAuthStore } from '../state/auth.store';
import { useTranslations } from '../i18n';

const schema = z.object({
  name: z.string().min(2, 'Merci d’indiquer un prénom'),
  email: z.string().email('Email invalide'),
  role: z.enum(['parent', 'stylist']),
});

type FormValues = z.infer<typeof schema>;

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const t = useTranslations();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', role: 'parent' },
  });

  const onSubmit = (values: FormValues) => {
    login({ id: `user-${Date.now()}`, ...values });
    navigate(values.role === 'parent' ? '/' : '/pro');
  };

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Card className="space-y-4">
        <h1 className="text-3xl font-bold text-text">{mode === 'login' ? t.auth.login : t.auth.register}</h1>
        <p className="text-sm text-subtext">
          Vos données personnelles sont protégées. Aucun email ni adresse n’est stocké sans votre consentement.
        </p>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-text">Prénom</span>
            <Input placeholder="Amina" {...form.register('name')} />
            {form.formState.errors.name && <span className="text-sm text-danger">{form.formState.errors.name.message}</span>}
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-text">Email</span>
            <Input placeholder="vous@email.com" type="email" autoComplete="email" {...form.register('email')} />
            {form.formState.errors.email && <span className="text-sm text-danger">{form.formState.errors.email.message}</span>}
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm text-text">Je suis</span>
            <Select {...form.register('role')}>
              <option value="parent">Parent</option>
              <option value="stylist">Coiffeuse professionnelle</option>
            </Select>
          </label>
          <p className="text-xs text-subtext">
            RGPD : AfroConnect ne conserve aucune donnée sensible des enfants. Vous pouvez demander la suppression à tout moment.
          </p>
          <Button type="submit" className="w-full">
            {mode === 'login' ? 'Se connecter' : 'Créer mon compte' }
          </Button>
        </form>
        <Button variant="ghost" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Pas encore de compte ? Inscrivez-vous' : 'Déjà un compte ? Connectez-vous'}
        </Button>
      </Card>
    </div>
  );
};

export default Auth;
