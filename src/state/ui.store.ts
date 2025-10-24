import { create } from 'zustand';

type Toast = {
  id: string;
  title: string;
  description?: string;
  status?: 'success' | 'error' | 'info';
};

type UIState = {
  loading: boolean;
  skeleton: boolean;
  toasts: Toast[];
  setLoading: (value: boolean) => void;
  setSkeleton: (value: boolean) => void;
  pushToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  loading: false,
  skeleton: true,
  toasts: [],
  setLoading: (value) => set({ loading: value }),
  setSkeleton: (value) => set({ skeleton: value }),
  pushToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
