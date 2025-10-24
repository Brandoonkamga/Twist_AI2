import { create } from 'zustand';

type Toast = {
  id: string;
  title: string;
  description?: string;
};

type UIState = {
  isLoadingList: boolean;
  isLoadingCalendar: boolean;
  toasts: Toast[];
  setLoadingList: (value: boolean) => void;
  setLoadingCalendar: (value: boolean) => void;
  pushToast: (toast: Omit<Toast, 'id'>) => void;
  dismissToast: (id: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isLoadingList: false,
  isLoadingCalendar: false,
  toasts: [],
  setLoadingList: (value) => set({ isLoadingList: value }),
  setLoadingCalendar: (value) => set({ isLoadingCalendar: value }),
  pushToast: (toast) =>
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }]
    })),
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id)
    }))
}));
