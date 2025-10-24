export const enGB = {
  common: {
    cta: {
      search: 'Search',
      reserve: 'Book now'
    },
    labels: {
      kidFriendly: 'Kid-Friendly certified',
      verifiedID: 'Verified ID'
    }
  },
  home: {
    title: 'Find a gentle braider near you',
    subtitle: 'Certified Kid-Friendly pros, trusted by parents.',
    empty: 'No stylists found. Try widening your filters or come back soon. ✨'
  },
  profile: {
    about: 'About',
    services: 'Services',
    hygiene: 'Hygiene & products',
    reviews: 'Parent reviews'
  },
  booking: {
    steps: {
      service: 'Service selection',
      datetime: 'Date & time',
      details: 'Details',
      payment: 'Payment'
    },
    recap: {
      total: 'Total due on appointment day'
    },
    policy: {
      deposit: 'A {percent}% deposit is charged now. Free cancellation up to 24h before, otherwise the deposit is kept.',
      cancel: 'Cancelling less than 24h before keeps the deposit.'
    }
  },
  auth: {
    login: 'Log in',
    register: 'Sign up'
  }
} as const;

export type MessagesEn = typeof enGB;
