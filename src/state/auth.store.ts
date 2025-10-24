import { create } from 'zustand';
import { User } from '../types';

type AuthState = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'user-1',
    role: 'parent',
    name: 'Amina',
    email: 'amina@example.com',
  },
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
