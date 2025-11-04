import { delay } from '../lib/format';
import { SearchQuery, Stylist } from '../types';
import { bookings, reviews, stylists } from './fixtures';

export const fetchStylists = async (query?: SearchQuery): Promise<Stylist[]> => {
  await delay(250);
  if (!query) return stylists;
  const normalized = query.city.trim().toLowerCase();
  return stylists.filter((stylist) => {
    const matchesCity = stylist.city.toLowerCase().includes(normalized);
    const kidCheck = query.kidFriendlyOnly ? stylist.kidFriendly : true;
    return matchesCity && kidCheck;
  });
};

export const fetchStylist = async (id: string): Promise<Stylist | undefined> => {
  await delay(250);
  return stylists.find((stylist) => stylist.id === id);
};

export const fetchReviews = async (stylistId: string) => {
  await delay(200);
  return reviews[stylistId] ?? [];
};

export const fetchBookings = async () => {
  await delay(200);
  return bookings;
};
