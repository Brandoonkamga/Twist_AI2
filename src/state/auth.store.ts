import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const parentUser: User = {
  id: 'usr-parent-1',
  role: 'parent',
  name: 'Fatou P.',
  email: 'fatou@example.com'
};

export const useAuthStore = create<AuthState>((set) => ({
  user: parentUser,
  login: (user) => set({ user }),
  logout: () => set({ user: null })
}));
