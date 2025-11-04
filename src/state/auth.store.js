import { create } from 'zustand';
export const useAuthStore = create((set) => ({
    user: {
        id: 'parent-1',
        role: 'parent',
        name: 'Camille',
        email: 'parent@example.com',
    },
    login: (user) => set({ user }),
    logout: () => set({ user: null }),
}));
