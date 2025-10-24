import { Suspense } from 'react';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import Home from './pages/Home';
import StylistProfile from './pages/StylistProfile';
import BookingFlow from './pages/BookingFlow';
import Auth from './pages/Auth';
import Account from './pages/Account';
import ProDashboard from './pages/Pro/Dashboard';
import ProAgenda from './pages/Pro/Agenda';
import ProWallet from './pages/Pro/Wallet';
import { RequireStylist } from './lib/guards';
import { ToastViewport } from './components/ui/toast';
import { SkeletonList } from './components/common/SkeletonList';
import { useI18n } from './i18n/I18nProvider';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, switchLocale, locale } = useI18n();
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <header className="sticky top-0 z-30 border-b border-muted/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="text-lg font-bold text-primary" aria-label="AfroConnect Home">
            AfroConnect
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-subtext">
            <Link className="hover:text-primary" to="/">
              Accueil
            </Link>
            <Link className="hover:text-primary" to="/reservation">
              Réservation
            </Link>
            <Link className="hover:text-primary" to="/compte">
              Mon compte
            </Link>
            <Link className="hover:text-primary" to="/pro">
              Espace Pro
            </Link>
            <button
              type="button"
              onClick={() => switchLocale(locale === 'fr-FR' ? 'en-GB' : 'fr-FR')}
              className="rounded-full border border-muted/80 px-3 py-1 text-xs"
            >
              {locale === 'fr-FR' ? 'EN' : 'FR'}
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-muted/80 bg-white/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-subtext md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} AfroConnect. Paiement sécurisé & conformité RGPD.</p>
          <div className="flex gap-4">
            <a href="mailto:support@afroconnect.fr" className="hover:text-primary">
              {t('booking.confirmation.support')}
            </a>
            <a href="#confidentialite" className="hover:text-primary">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </footer>
      <ToastViewport />
    </div>
  );
};

const LoadingFallback = () => (
  <div className="space-y-4">
    <SkeletonList />
  </div>
);

const App = () => (
  <Suspense fallback={<LoadingFallback />}>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/coiffeuses/:id"
        element={
          <Layout>
            <StylistProfile />
          </Layout>
        }
      />
      <Route
        path="/reservation"
        element={
          <Layout>
            <BookingFlow />
          </Layout>
        }
      />
      <Route
        path="/auth"
        element={
          <Layout>
            <Auth />
          </Layout>
        }
      />
      <Route
        path="/compte"
        element={
          <Layout>
            <Account />
          </Layout>
        }
      />
      <Route
        path="/pro"
        element={
          <Layout>
            <RequireStylist>
              <ProDashboard />
            </RequireStylist>
          </Layout>
        }
      />
      <Route
        path="/pro/agenda"
        element={
          <Layout>
            <RequireStylist>
              <ProAgenda />
            </RequireStylist>
          </Layout>
        }
      />
      <Route
        path="/pro/portefeuille"
        element={
          <Layout>
            <RequireStylist>
              <ProWallet />
            </RequireStylist>
          </Layout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default App;
