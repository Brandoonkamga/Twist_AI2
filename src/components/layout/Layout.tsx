import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { ToastViewport } from '../ui/toast';

export const Layout = () => (
  <div className="flex min-h-screen flex-col bg-muted">
    <Header />
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      <Outlet />
    </main>
    <Footer />
    <ToastViewport />
  </div>
);
