import { create } from 'zustand';
import { Booking, Service } from '../types';
import { stylists } from '../mock/fixtures';

type BookingStep = 'service' | 'datetime' | 'details' | 'payment' | 'confirmation';

type BookingState = {
  step: BookingStep;
  selectedStylistId: string | null;
  selectedService: Service | null;
  date: string | null;
  time: string | null;
  atHome: boolean;
  address: string;
  travelFee: number;
  depositPct: number;
  setStylist: (id: string) => void;
  setService: (service: Service) => void;
  setDateTime: (date: string, time: string) => void;
  setAtHome: (atHome: boolean) => void;
  setAddress: (address: string) => void;
  setStep: (step: BookingStep) => void;
  computeTravelFee: () => number;
  reset: () => void;
  buildBooking: () => Booking | null;
};

const DEFAULT_DEPOSIT = 20;

const initialState = {
  step: 'service' as BookingStep,
  selectedStylistId: 'sty-1',
  selectedService: null,
  date: null,
  time: null,
  atHome: true,
  address: '',
  travelFee: 0,
  depositPct: DEFAULT_DEPOSIT
};

export const useBookingStore = create<BookingState>((set, get) => ({
  ...initialState,
  setStylist: (id) => set({ selectedStylistId: id }),
  setService: (service) => set({ selectedService: service }),
  setDateTime: (date, time) => set({ date, time }),
  setAtHome: (atHome) => set({ atHome }),
  setAddress: (address) => set({ address }),
  setStep: (step) => set({ step }),
  computeTravelFee: () => {
    const { atHome, selectedStylistId } = get();
    if (!atHome || !selectedStylistId) return 0;
    const stylist = stylists.find((sty) => sty.id === selectedStylistId);
    if (!stylist) return 0;
    const fee = Math.round(Math.max(0, stylist.distanceKm - 3) * 1.5);
    set({ travelFee: fee });
    return fee;
  },
  reset: () => set({ ...initialState }),
  buildBooking: () => {
    const { selectedStylistId, selectedService, date, time, atHome, address, travelFee, depositPct } = get();
    if (!selectedStylistId || !selectedService || !date || !time) {
      return null;
    }
    return {
      id: `bk-${Math.random().toString(36).slice(2, 9)}`,
      stylistId: selectedStylistId,
      serviceId: selectedService.id,
      date,
      time,
      atHome,
      address: atHome ? address : undefined,
      travelFee,
      depositPct,
      status: 'pending'
    };
  }
}));
