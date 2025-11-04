import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../state/auth.store';
import { isStylist } from '../../lib/guards';

export const RequireStylist = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);

  if (!isStylist(user)) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};
