import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../state/auth.store';

export const RequireStylist: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const role = useAuthStore((s) => s.user?.role);
  if (role !== 'stylist') {
    return <Navigate to="/auth" replace />;
  }
  return children;
};
