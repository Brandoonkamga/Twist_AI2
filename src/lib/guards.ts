import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../state/auth.store';

export const RequireStylist = ({ children }: { children: JSX.Element }) => {
  const role = useAuthStore((state) => state.user?.role);
  if (role !== 'stylist') {
    return <Navigate to="/auth" replace />;
  }
  return children;
};
