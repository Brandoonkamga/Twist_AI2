import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { StylistProfile } from './pages/StylistProfile';
import { BookingFlow } from './pages/BookingFlow';
import { Auth } from './pages/Auth';
import { Account } from './pages/Account';
import { Dashboard } from './pages/Pro/Dashboard';
import { Agenda } from './pages/Pro/Agenda';
import { Wallet } from './pages/Pro/Wallet';
import { RequireStylist } from './lib/guards';

export const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="coiffeuses/:id" element={<StylistProfile />} />
      <Route path="reservation" element={<BookingFlow />} />
      <Route path="auth" element={<Auth />} />
      <Route path="compte" element={<Account />} />
      <Route
        path="pro"
        element={
          <RequireStylist>
            <Dashboard />
          </RequireStylist>
        }
      />
      <Route
        path="pro/agenda"
        element={
          <RequireStylist>
            <Agenda />
          </RequireStylist>
        }
      />
      <Route
        path="pro/portefeuille"
        element={
          <RequireStylist>
            <Wallet />
          </RequireStylist>
        }
      />
    </Route>
  </Routes>
);
