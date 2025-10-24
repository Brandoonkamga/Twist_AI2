import { User } from '../types';

export const isStylist = (user?: User | null): user is User & { role: 'stylist' } =>
  Boolean(user && user.role === 'stylist');

export const isParent = (user?: User | null): user is User & { role: 'parent' } =>
  Boolean(user && user.role === 'parent');
