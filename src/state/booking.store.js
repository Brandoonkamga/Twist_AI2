import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const initialState = {
    currentStep: 0,
    selectedService: null,
    datetime: null,
    atHome: true,
    address: '',
    travelFee: 0,
    depositPct: 20,
    notes: '',
};
export const useBookingStore = create()(persist((set, get) => ({
    ...initialState,
    setStep: (step) => set({ currentStep: step }),
    chooseService: (service) => set({ selectedService: service }),
    setDatetime: (payload) => set({ datetime: payload }),
    setLocation: (payload) => set({
        atHome: payload.atHome,
        address: payload.address,
        travelFee: payload.travelFee,
    }),
    setNotes: (notes) => set({ notes }),
    reset: () => set(initialState),
    buildBooking: (stylistId) => {
        const { selectedService, datetime, atHome, address, travelFee, depositPct } = get();
        if (!selectedService || !datetime)
            return null;
        return {
            id: crypto.randomUUID(),
            stylistId,
            serviceId: selectedService.id,
            date: datetime.date,
            time: datetime.time,
            atHome,
            address,
            travelFee,
            depositPct,
            status: 'pending',
        };
    },
}), {
    name: 'afroconnect-booking',
    partialize: ({ currentStep, ...rest }) => rest,
}));
