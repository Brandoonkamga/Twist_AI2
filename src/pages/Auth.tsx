import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useAuthStore } from '../state/auth.store';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../state/i18n.context';

const schema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, '6 caractères minimum'),
  name: z.string().min(2, 'Prénom requis')
});

type FormValues = z.infer<typeof schema>;

const AuthPage = () => {
  const { t } = useI18n();
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState<'parent' | 'stylist'>('parent');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', name: '' }
  });

  const onSubmit = (values: FormValues) => {
    login({ id: 'usr-demo', role, name: values.name, email: values.email });
    navigate(role === 'parent' ? '/' : '/pro');
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-semibold text-foreground">{isRegister ? t('auth.register') : t('auth.login')}</h1>
        <p className="mt-2 text-sm text-muted-foreground">Vos données sont protégées. Aucun numéro de carte n’est conservé.</p>
      </div>
      <Card>
        <CardContent className="space-y-4">
          <div className="flex justify-center gap-2 rounded-2xl bg-muted p-1" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={role === 'parent'}
              className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold ${role === 'parent' ? 'bg-white shadow-card text-primary' : 'text-muted-foreground'}`}
              onClick={() => setRole('parent')}
            >
              Parent
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={role === 'stylist'}
              className={`flex-1 rounded-2xl px-4 py-2 text-sm font-semibold ${role === 'stylist' ? 'bg-white shadow-card text-primary' : 'text-muted-foreground'}`}
              onClick={() => setRole('stylist')}
            >
              Coiffeuse
            </button>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-sm font-semibold" htmlFor="name">
                Prénom
              </label>
              <Input id="name" {...register('name')} />
              {errors.name ? <p className="text-xs text-danger">{errors.name.message}</p> : null}
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="email">
                Email
              </label>
              <Input id="email" type="email" autoComplete="email" {...register('email')} />
              {errors.email ? <p className="text-xs text-danger">{errors.email.message}</p> : null}
            </div>
            <div>
              <label className="text-sm font-semibold" htmlFor="password">
                Mot de passe
              </label>
              <Input id="password" type="password" autoComplete="current-password" {...register('password')} />
              {errors.password ? <p className="text-xs text-danger">{errors.password.message}</p> : null}
            </div>
            <div className="rounded-2xl bg-muted px-4 py-3 text-xs text-muted-foreground">
              Données personnelles : AfroConnect respecte le RGPD. Contactez-nous pour supprimer votre compte à tout moment.
            </div>
            <Button type="submit" className="w-full">
              {isRegister ? 'Créer mon compte' : 'Me connecter'}
            </Button>
          </form>
          <button
            type="button"
            className="w-full text-center text-sm font-semibold text-primary underline"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister ? 'Déjà membre ? Se connecter' : 'Nouveau sur AfroConnect ? Créer un compte'}
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
