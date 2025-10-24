import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../state/auth.store';

export const RequireStylist = ({ children }: { children: ReactNode }) => {
  const role = useAuthStore((state) => state.user?.role);
  if (role !== 'stylist') {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};
