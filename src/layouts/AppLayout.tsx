import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAuthStore } from '../state/auth.store';
import { useI18n } from '../state/i18n.context';

export const AppLayout = () => {
  const { user, logout } = useAuthStore();
  const { setLocale, locale } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <NavLink to="/" className="text-xl font-bold text-primary">
            AfroConnect
          </NavLink>
          <nav className="flex items-center gap-4 text-sm font-semibold">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary')}>
              Parents
            </NavLink>
            <NavLink
              to="/pro"
              className={({ isActive }) => (isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary')}
            >
              Espace Pro
            </NavLink>
            <NavLink
              to="/reservation"
              className={({ isActive }) => (isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary')}
            >
              Réservations
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            <select
              aria-label="Langue"
              value={locale}
              onChange={(event) => setLocale(event.target.value as 'fr-FR' | 'en-GB')}
              className="rounded-2xl border border-border bg-white px-3 py-2 text-sm"
            >
              <option value="fr-FR">FR</option>
              <option value="en-GB">EN</option>
            </select>
            {user ? (
              <Button variant="secondary" onClick={logout} className="text-sm">
                Déconnexion
              </Button>
            ) : (
              <Button variant="secondary" className="text-sm" onClick={() => navigate('/auth')}>
                Connexion
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-white py-6 text-sm text-muted-foreground">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AfroConnect — Marketplace de confiance.</p>
          <div className="flex gap-4">
            <NavLink to="/support">Besoin d’aide ?</NavLink>
            <NavLink to="/rgpd">RGPD & parents</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};
