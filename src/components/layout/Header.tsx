import { NavLink } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuthStore } from '../../state/auth.store';
import { useTranslation } from '../../i18n';
import { Baby, Menu } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
  const { user, logout } = useAuthStore();
  const { t, setLocale, locale } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold text-primary" aria-label="AfroConnect">
          <Baby className="h-6 w-6" aria-hidden="true" /> AfroConnect
        </NavLink>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-subtext md:flex">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
            Accueil
          </NavLink>
          <NavLink to="/reservation" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
            Parcours réservation
          </NavLink>
          <NavLink to="/compte" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
            Mon compte
          </NavLink>
          <NavLink to="/pro" className={({ isActive }) => (isActive ? 'text-primary' : '')}>
            Espace pro
          </NavLink>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            onClick={() => setLocale(locale === 'fr-FR' ? 'en-GB' : 'fr-FR')}
            aria-label="Changer de langue"
          >
            {locale === 'fr-FR' ? 'FR' : 'EN'}
          </Button>
          {user ? (
            <Button variant="secondary" onClick={logout} aria-label="Se déconnecter">
              Déconnexion
            </Button>
          ) : (
            <Button asChild>
              <NavLink to="/auth">{t('auth.login')}</NavLink>
            </Button>
          )}
        </div>
        <Button
          variant="secondary"
          className="md:hidden"
          aria-label="Ouvrir la navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
      {open ? (
        <div className="md:hidden">
          <nav className="flex flex-col gap-2 border-t border-border bg-white p-4 text-sm font-semibold text-subtext">
            <NavLink to="/" onClick={() => setOpen(false)}>
              Accueil
            </NavLink>
            <NavLink to="/reservation" onClick={() => setOpen(false)}>
              Parcours réservation
            </NavLink>
            <NavLink to="/compte" onClick={() => setOpen(false)}>
              Mon compte
            </NavLink>
            <NavLink to="/pro" onClick={() => setOpen(false)}>
              Espace pro
            </NavLink>
            <Button
              variant="ghost"
              onClick={() => {
                setLocale(locale === 'fr-FR' ? 'en-GB' : 'fr-FR');
                setOpen(false);
              }}
            >
              {locale === 'fr-FR' ? 'Passer en EN' : 'Passer en FR'}
            </Button>
            {user ? (
              <Button
                variant="secondary"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                Déconnexion
              </Button>
            ) : (
              <Button asChild onClick={() => setOpen(false)}>
                <NavLink to="/auth">{t('auth.login')}</NavLink>
              </Button>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
};
