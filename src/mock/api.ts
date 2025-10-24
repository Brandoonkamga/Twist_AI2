import { stylists, reviews, bookings } from './fixtures';
import { Booking, Stylist } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchStylists = async (city: string, kidOnly: boolean): Promise<Stylist[]> => {
  await delay(250);
  const normalized = city.trim().toLowerCase();
  return stylists.filter((stylist) => {
    const matchCity = !normalized || stylist.city.toLowerCase().includes(normalized);
    const matchKid = kidOnly ? stylist.kidFriendly : true;
    return matchCity && matchKid;
  });
};

export const fetchStylistById = async (id: string) => {
  await delay(250);
  return stylists.find((stylist) => stylist.id === id) ?? null;
};

export const fetchReviewsForStylist = async (id: string) => {
  await delay(200);
  return reviews[id] ?? [];
};

export const fetchUpcomingBookings = async (): Promise<Booking[]> => {
  await delay(200);
  return bookings;
};
