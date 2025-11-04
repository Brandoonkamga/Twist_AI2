import type { User } from '../types';

export const isStylist = (user: User | null): boolean => {
  return user?.role === 'stylist';
};
