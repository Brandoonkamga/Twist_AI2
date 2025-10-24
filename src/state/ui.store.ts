import { create } from 'zustand';

type Toast = {
  id: string;
  title: string;
  description?: string;
  status?: 'success' | 'error' | 'info';
};

type UIState = {
  isLoading: boolean;
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  setLoading: (loading: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id: crypto.randomUUID(), status: 'info', ...toast }
      ]
    })),
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
  setLoading: (loading) => set({ isLoading: loading })
}));
