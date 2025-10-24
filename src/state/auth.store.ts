import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'parent-1',
    role: 'parent',
    name: 'Camille',
    email: 'parent@example.com',
  },
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
