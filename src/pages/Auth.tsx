import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useAuthStore } from '../state/auth.store';
import { useNavigate } from 'react-router-dom';
import { Select } from '../components/ui/select';

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, '6 caractères minimum'),
  role: z.enum(['parent', 'stylist'])
});

type AuthValues = z.infer<typeof schema>;

export const Auth = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const form = useForm<AuthValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', role: 'parent' }
  });

  const onSubmit = (values: AuthValues) => {
    login({ id: `user-${Date.now()}`, role: values.role, email: values.email, name: 'Invité·e' });
    navigate(values.role === 'parent' ? '/' : '/pro');
  };

  return (
    <div className="mx-auto max-w-md space-y-6">
      <Card className="space-y-6 p-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-text">
            {mode === 'login' ? 'Connexion' : 'Inscription'}
          </h1>
          <p className="text-sm text-subtext">
            Vos données sont protégées. Aucun email ni adresse n’est partagé sans consentement.
          </p>
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-text">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...form.register('email')}
              className="mt-1 w-full rounded-[1.5rem] border border-border px-4 py-3"
            />
            {form.formState.errors.email ? (
              <p className="mt-1 text-xs text-danger">{form.formState.errors.email.message}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-text">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              {...form.register('password')}
              className="mt-1 w-full rounded-[1.5rem] border border-border px-4 py-3"
            />
            {form.formState.errors.password ? (
              <p className="mt-1 text-xs text-danger">{form.formState.errors.password.message}</p>
            ) : null}
          </div>
          <div>
            <label htmlFor="role" className="text-sm font-semibold text-text">
              Je suis
            </label>
            <Select id="role" {...form.register('role')}>
              <option value="parent">Parent</option>
              <option value="stylist">Coiffeuse</option>
            </Select>
          </div>
          <p className="text-xs text-subtext">
            En créant un compte, vous acceptez notre politique de confidentialité adaptée aux mineurs.
          </p>
          <Button type="submit" className="w-full">
            {mode === 'login' ? 'Se connecter' : 'Créer un compte'}
          </Button>
        </form>
      </Card>
      <Card className="space-y-3 p-4 text-sm text-subtext">
        <p>RGPD Kids : AfroConnect ne conserve aucune information sans consentement parental.</p>
        <p>Vous pouvez supprimer votre compte à tout moment depuis l’espace Paramètres.</p>
        <button
          className="text-primary underline"
          onClick={() => setMode((value) => (value === 'login' ? 'register' : 'login'))}
        >
          {mode === 'login' ? 'Besoin d’un compte ? Inscrivez-vous' : 'Déjà un compte ? Connectez-vous'}
        </button>
      </Card>
    </div>
  );
};
