import type { Messages } from './fr-FR';

export const enGB: Messages = {
  locale: 'en-GB',
  common: {
    cta: {
      search: 'Search',
      reserve: 'Book now',
    },
    labels: {
      kidFriendly: 'Kid-Friendly certified',
      verifiedID: 'Verified ID',
    },
  },
  home: {
    title: 'Find a gentle stylist near you',
    subtitle: 'Certified kid-friendly pros parents love.',
    empty: 'Oops, no stylists found. Try adjusting your filters or come back soon. ✨',
  },
  profile: {
    about: 'About',
    services: 'Services',
    hygiene: 'Hygiene & Products',
    reviews: 'Parent reviews',
  },
  booking: {
    steps: {
      service: 'Service',
      datetime: 'Date & time',
      details: 'Details',
      payment: 'Payment',
    },
    recap: {
      total: 'Total',
    },
    policy: {
      deposit: 'A {percent}% deposit is charged now. Free cancellation up to 24h before, then the deposit is non-refundable.',
      cancel: 'Free cancellation up to 24h before the appointment.',
    },
  },
  auth: {
    login: 'Log in',
    register: 'Create account',
  },
};
