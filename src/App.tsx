import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import Home from './pages/Home';
import StylistProfile from './pages/StylistProfile';
import BookingFlow from './pages/BookingFlow';
import AuthPage from './pages/Auth';
import AccountPage from './pages/Account';
import ProDashboard from './pages/Pro/Dashboard';
import ProAgenda from './pages/Pro/Agenda';
import ProWallet from './pages/Pro/Wallet';
import { ToastContainer } from './components/ui/toast';
import { RequireStylist } from './lib/guards';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="coiffeuses/:id" element={<StylistProfile />} />
          <Route path="reservation" element={<BookingFlow />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="compte" element={<AccountPage />} />
          <Route
            path="pro"
            element={
              <RequireStylist>
                <ProDashboard />
              </RequireStylist>
            }
          />
          <Route
            path="pro/agenda"
            element={
              <RequireStylist>
                <ProAgenda />
              </RequireStylist>
            }
          />
          <Route
            path="pro/portefeuille"
            element={
              <RequireStylist>
                <ProWallet />
              </RequireStylist>
            }
          />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
