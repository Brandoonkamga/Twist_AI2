export const enGB = {
  locale: 'en-GB',
  common: {
    cta: {
      search: 'Search',
      reserve: 'Book now'
    },
    labels: {
      kidFriendly: 'Kid-Friendly certified',
      verifiedID: 'Verified ID',
      topRated: 'Top parent rated',
      hygiene: 'Hygiene checked'
    }
  },
  home: {
    title: 'Find a gentle stylist nearby',
    subtitle: 'Certified Kid-Friendly pros, trusted by parents.',
    empty: 'No stylist found. Try broadening your filters or come back later. ✨'
  },
  profile: {
    about: 'About',
    services: 'Services',
    hygiene: 'Hygiene & products',
    reviews: 'Parent reviews'
  },
  booking: {
    steps: {
      service: 'Service',
      datetime: 'Date & time',
      details: 'Details',
      payment: 'Payment'
    },
    recap: {
      total: 'Total'
    },
    policy: {
      deposit: 'A {percent}% deposit is charged now. Free cancellation up to 24h before, then the deposit is non-refundable.',
      cancel: 'Cancelling within 24h means the deposit is kept for the stylist.'
    }
  },
  auth: {
    login: 'Log in',
    register: 'Create account'
  },
  account: {
    reservations: 'My bookings',
    favorites: 'Favourites',
    payments: 'Payments',
    settings: 'Settings'
  },
  pro: {
    dashboard: 'Dashboard',
    agenda: 'Agenda',
    wallet: 'Wallet'
  }
};

export type TranslationEN = typeof enGB;
