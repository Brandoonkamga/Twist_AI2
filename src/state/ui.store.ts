import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
  tone?: 'success' | 'danger' | 'info';
}

interface UIState {
  isLoading: boolean;
  skeletons: Record<string, boolean>;
  toasts: Toast[];
  setLoading: (value: boolean) => void;
  setSkeleton: (key: string, value: boolean) => void;
  pushToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  skeletons: {},
  toasts: [],
  setLoading: (value) => set({ isLoading: value }),
  setSkeleton: (key, value) =>
    set((state) => ({ skeletons: { ...state.skeletons, [key]: value } })),
  pushToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
