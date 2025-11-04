export type Service = {
  id: string;
  title: string;
  price: number;
  durationMin: number;
  kidOnly: boolean;
};

export type Stylist = {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  kidFriendly: boolean;
  verifiedID: boolean;
  city: string;
  distanceKm: number;
  services: Service[];
  bio: string;
  hygiene: string[];
  zoneKm: number;
  photos: string[];
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  mentionsNoTears: boolean;
};

export type Booking = {
  id: string;
  stylistId: string;
  serviceId: string;
  date: string;
  time: string;
  atHome: boolean;
  address?: string;
  travelFee: number;
  depositPct: number;
  status: 'pending' | 'confirmed' | 'completed' | 'canceled';
};

export type User = {
  id: string;
  role: 'parent' | 'stylist';
  name: string;
  email: string;
};

export type SearchQuery = {
  city: string;
  childAgeRange?: string;
  kidFriendlyOnly?: boolean;
};
