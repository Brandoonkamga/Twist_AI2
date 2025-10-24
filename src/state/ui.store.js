import { create } from 'zustand';
export const useUIStore = create((set) => ({
    isLoading: false,
    skeletons: {},
    toasts: [],
    setLoading: (value) => set({ isLoading: value }),
    setSkeleton: (key, value) => set((state) => ({ skeletons: { ...state.skeletons, [key]: value } })),
    pushToast: (toast) => set((state) => ({
        toasts: [...state.toasts, { ...toast, id: crypto.randomUUID() }],
    })),
    removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));
