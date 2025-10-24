import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './state/auth.store';
import { isStylist } from './lib/guards';
import { SkeletonList } from './components/common/SkeletonList';
import { I18nProvider } from './i18n';

const Home = lazy(() => import('./pages/Home'));
const StylistProfile = lazy(() => import('./pages/StylistProfile'));
const BookingFlow = lazy(() => import('./pages/BookingFlow'));
const Auth = lazy(() => import('./pages/Auth'));
const Account = lazy(() => import('./pages/Account'));
const ProDashboard = lazy(() => import('./pages/Pro/Dashboard'));
const ProAgenda = lazy(() => import('./pages/Pro/Agenda'));
const ProWallet = lazy(() => import('./pages/Pro/Wallet'));

const queryClient = new QueryClient();

const ProtectedProRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  if (!isStylist(user)) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-muted">
    <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-primary" aria-label="Retour à l’accueil">
          AfroConnect
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/compte" className="text-subtext hover:text-primary">
            Mon compte
          </Link>
          <Link to="/reservation" className="text-subtext hover:text-primary">
            Réserver
          </Link>
          <Link to="/pro" className="rounded-full bg-primary px-4 py-2 text-white">
            Espace Pro
          </Link>
        </nav>
      </div>
    </header>
    <main className="flex-1 bg-muted">
      <div className="mx-auto w-full max-w-6xl px-4 py-8">{children}</div>
    </main>
    <footer className="border-t border-border bg-white py-6 text-center text-sm text-subtext">
      AfroConnect © {new Date().getFullYear()} — Marketplace kid-friendly.
    </footer>
  </div>
);

const AppRoutes = () => (
  <Suspense fallback={<SkeletonList count={4} />}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/coiffeuses/:id" element={<StylistProfile />} />
      <Route path="/reservation" element={<BookingFlow />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/compte" element={<Account />} />
      <Route
        path="/pro"
        element={
          <ProtectedProRoute>
            <ProDashboard />
          </ProtectedProRoute>
        }
      />
      <Route
        path="/pro/agenda"
        element={
          <ProtectedProRoute>
            <ProAgenda />
          </ProtectedProRoute>
        }
      />
      <Route
        path="/pro/portefeuille"
        element={
          <ProtectedProRoute>
            <ProWallet />
          </ProtectedProRoute>
        }
      />
    </Routes>
  </Suspense>
);

export const App = () => (
  <I18nProvider locale="fr-FR">
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  </I18nProvider>
);

export default App;
