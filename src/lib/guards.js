import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../state/auth.store';
export const RequireStylist = ({ children }) => {
    const role = useAuthStore((s) => s.user?.role);
    if (role !== 'stylist') {
        return _jsx(Navigate, { to: "/auth", replace: true });
    }
    return children;
};
