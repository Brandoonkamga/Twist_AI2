export const en = {
  locale: 'en-GB',
  common: {
    cta: {
      search: 'Search',
      reserve: 'Book now',
    },
    labels: {
      kidFriendly: 'Kid-friendly certified',
      verifiedID: 'Verified ID',
      hygiene: 'Impeccable hygiene',
      topRated: 'Parents recommend',
    },
    states: {
      loading: 'Loading…',
      error: 'Something went wrong. Please try again.',
    },
  },
  home: {
    title: 'Find a gentle stylist near you',
    subtitle: 'Certified kid-friendly pros trusted by parents.',
    empty: 'No stylists found. Try expanding your filters or come back soon. ✨',
    alert: 'Notify me',
  },
  profile: {
    about: 'About',
    services: 'Services',
    hygiene: 'Hygiene & products',
    reviews: 'Parent reviews',
    noTears: '98% of parents would rebook',
  },
  booking: {
    steps: {
      service: 'Select service',
      datetime: 'Date & time',
      details: 'Details',
      payment: 'Payment',
    },
    recap: {
      total: 'Total',
    },
    policy: {
      deposit: '{percent}% deposit charged today. Free cancellation up to 24h before, otherwise the deposit is kept.',
      cancel: 'Let your stylist know 24h ahead to avoid losing the deposit.',
    },
    confirmation: {
      title: 'Booking confirmed',
      contact: 'Contact',
      calendar: 'Add to calendar',
      support: 'Need help?',
    },
  },
  auth: {
    login: 'Sign in',
    register: 'Create account',
  },
  account: {
    tabs: {
      bookings: 'My bookings',
      favorites: 'Favourites',
      payments: 'Payments',
      settings: 'Settings',
    },
    reviews: {
      cta: 'Leave a review',
      ratingLabel: 'Rating',
      commentLabel: 'Your feedback reassures other parents…',
      submit: 'Publish',
    },
  },
  pro: {
    dashboard: {
      title: 'Dashboard',
      upcoming: 'Upcoming appointments',
      rating: 'Average rating',
      shortcuts: 'Shortcuts',
    },
    agenda: {
      title: 'Agenda management',
      openSlot: 'Open a slot',
      blockLeave: 'Block time off',
      synced: 'Synced with parent search',
    },
    wallet: {
      title: 'Wallet',
      balance: 'Available balance',
      pending: 'Pending earnings',
      instantPay: 'Instant Pay (48h)',
      payoutEta: 'Next payout expected on {date}',
    },
  },
};

export type EnMessages = typeof en;
