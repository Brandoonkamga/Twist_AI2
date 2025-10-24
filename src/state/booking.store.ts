import { create } from 'zustand';
import { Booking, Service } from '../types';

export type BookingStep = 'service' | 'datetime' | 'details' | 'payment' | 'confirmation';

type BookingForm = {
  stylistId?: string;
  service?: Service;
  date?: string;
  time?: string;
  atHome: boolean;
  address?: string;
  notes?: string;
  travelFee: number;
  depositPct: number;
  total: number;
  confirmationId?: string;
};

type BookingState = BookingForm & {
  currentStep: BookingStep;
  setStylist: (id: string) => void;
  setService: (service: Service) => void;
  setSchedule: (date: string, time: string) => void;
  setDetails: (details: Partial<Pick<BookingForm, 'atHome' | 'address' | 'notes'>>) => void;
  setPricing: (payload: { travelFee: number; total: number; depositPct?: number }) => void;
  goTo: (step: BookingStep) => void;
  confirm: () => Booking;
  reset: () => void;
};

const initialState: BookingForm & { currentStep: BookingStep } = {
  stylistId: undefined,
  service: undefined,
  date: undefined,
  time: undefined,
  atHome: false,
  address: undefined,
  notes: undefined,
  travelFee: 0,
  depositPct: 20,
  total: 0,
  confirmationId: undefined,
  currentStep: 'service'
};

export const useBookingStore = create<BookingState>((set, get) => ({
  ...initialState,
  setStylist: (id) => set({ stylistId: id }),
  setService: (service) => set({ service }),
  setSchedule: (date, time) => set({ date, time }),
  setDetails: (details) => set(details),
  setPricing: ({ travelFee, total, depositPct }) =>
    set((state) => ({
      travelFee,
      total,
      depositPct: depositPct ?? state.depositPct
    })),
  goTo: (step) => set({ currentStep: step }),
  confirm: () => {
    const state = get();
    const booking: Booking = {
      id: `booking-${Date.now()}`,
      stylistId: state.stylistId ?? 'unknown',
      serviceId: state.service?.id ?? 'unknown',
      date: state.date ?? '',
      time: state.time ?? '',
      atHome: state.atHome,
      address: state.address,
      travelFee: state.travelFee,
      depositPct: state.depositPct,
      status: 'confirmed'
    };
    set({ confirmationId: booking.id, currentStep: 'confirmation' });
    return booking;
  },
  reset: () => set(initialState)
}));
