import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Booking, Service, Stylist } from '../types';
import { stylists } from '../mock/fixtures';

export type BookingStep = 'service' | 'datetime' | 'details' | 'payment' | 'confirmation';

export type BookingState = {
  step: BookingStep;
  selectedStylist?: Stylist;
  selectedService?: Service;
  date?: string;
  time?: string;
  atHome: boolean;
  address?: string;
  notes?: string;
  travelFee: number;
  depositPct: number;
  confirmation?: Booking;
  setStylist: (stylistId: string) => void;
  selectService: (serviceId: string) => void;
  setDateTime: (date: string, time: string) => void;
  setLocation: (atHome: boolean, address?: string) => void;
  setNotes: (notes: string) => void;
  goToStep: (step: BookingStep) => void;
  confirm: () => void;
};

export const useBookingStore = create<BookingState>()(
  devtools((set, get) => ({
    step: 'service',
    atHome: false,
    travelFee: 0,
    depositPct: 20,
    setStylist: (stylistId) => {
      const stylist = stylists.find((s) => s.id === stylistId);
      set({
        selectedStylist: stylist,
        selectedService: stylist?.services[0],
        step: 'service',
      });
    },
    selectService: (serviceId) => {
      const stylist = get().selectedStylist;
      const selectedService = stylist?.services.find((s) => s.id === serviceId);
      set({ selectedService });
    },
    setDateTime: (date, time) => set({ date, time }),
    setLocation: (atHome, address) =>
      set({
        atHome,
        address,
        travelFee: atHome ? 10 : 0,
      }),
    setNotes: (notes) => set({ notes }),
    goToStep: (step) => set({ step }),
    confirm: () => {
      const { selectedStylist, selectedService, date, time, atHome, address, travelFee, depositPct } = get();
      if (!selectedStylist || !selectedService || !date || !time) return;
      const booking: Booking = {
        id: `book-${Date.now()}`,
        stylistId: selectedStylist.id,
        serviceId: selectedService.id,
        date,
        time,
        atHome,
        address,
        travelFee,
        depositPct,
        status: 'confirmed',
      };
      set({ confirmation: booking, step: 'confirmation' });
    },
  }))
);
