import { Booking, Review, Service, Stylist } from '../types';

const baseServices: Service[] = [
  { id: 'srv-box', title: 'Box braids enfant', price: 65, durationMin: 120, kidOnly: true },
  { id: 'srv-vanilles', title: 'Vanilles protectrices', price: 55, durationMin: 90, kidOnly: true },
  { id: 'srv-cornrows', title: 'Tresses collées avec perles', price: 45, durationMin: 80, kidOnly: false }
];

export const stylists: Stylist[] = [
  {
    id: 'sty-1',
    name: 'Nadine D.',
    rating: 4.9,
    reviewsCount: 124,
    kidFriendly: true,
    verifiedID: true,
    city: 'Paris',
    distanceKm: 2.4,
    services: baseServices,
    bio: 'Spécialiste du tressage protecteur pour enfants sensibles, avec des techniques sans tension.',
    hygiene: ['Désinfection des outils entre chaque enfant', 'Produits hypoallergéniques', 'Zone de jeux douce et rassurante'],
    zoneKm: 15,
    photos: ['/images/stylists/nadine-1.jpg', '/images/stylists/nadine-2.jpg']
  },
  {
    id: 'sty-2',
    name: 'Aïssata B.',
    rating: 4.8,
    reviewsCount: 98,
    kidFriendly: true,
    verifiedID: true,
    city: 'Paris',
    distanceKm: 4.1,
    services: baseServices,
    bio: 'Ancienne auxiliaire de crèche, je coiffe les bouts de chou avec patience et jeux sensoriels.',
    hygiene: ['Nettoyage vapeur des peignes', 'Gants jetables sur demande', 'Massage cuir chevelu doux'],
    zoneKm: 12,
    photos: ['/images/stylists/aissata-1.jpg']
  },
  {
    id: 'sty-3',
    name: 'Ruth M.',
    rating: 4.7,
    reviewsCount: 87,
    kidFriendly: true,
    verifiedID: false,
    city: 'Montreuil',
    distanceKm: 6.3,
    services: baseServices,
    bio: 'Tantine rassurante, je transforme les coiffures en moments de complicité.',
    hygiene: ['Shampooing bio uniquement', 'Peignes stérilisés', 'Brumisation apaisante à la lavande'],
    zoneKm: 18,
    photos: ['/images/stylists/ruth-1.jpg']
  },
  {
    id: 'sty-4',
    name: 'Mariam K.',
    rating: 4.95,
    reviewsCount: 155,
    kidFriendly: true,
    verifiedID: true,
    city: 'Saint-Denis',
    distanceKm: 7.5,
    services: baseServices,
    bio: 'Maman de deux princesses, je maîtrise les coiffures protectrices rapides et sans larmes.',
    hygiene: ['Stations désinfectées', 'Huiles naturelles pressées à froid', 'Oreillers ergonomiques pour nuque'],
    zoneKm: 20,
    photos: ['/images/stylists/mariam-1.jpg']
  },
  {
    id: 'sty-5',
    name: 'Inès L.',
    rating: 4.6,
    reviewsCount: 74,
    kidFriendly: false,
    verifiedID: true,
    city: 'Paris',
    distanceKm: 3.2,
    services: baseServices,
    bio: 'Coiffeuse studio, je propose des ateliers express pour apprendre à entretenir les tresses à la maison.',
    hygiene: ['Matériel UV', 'Serviettes individuelles', 'Nettoyage approfondi hebdomadaire'],
    zoneKm: 10,
    photos: ['/images/stylists/ines-1.jpg']
  },
  {
    id: 'sty-6',
    name: 'Clarisse J.',
    rating: 4.85,
    reviewsCount: 112,
    kidFriendly: true,
    verifiedID: true,
    city: 'Ivry-sur-Seine',
    distanceKm: 8.9,
    services: baseServices,
    bio: 'Tressage artistique avec contes africains pour occuper les enfants pendant la séance.',
    hygiene: ['Gel hydroalcoolique à l’entrée', 'Protège-nuque individuels', 'Purificateur d’air permanent'],
    zoneKm: 22,
    photos: ['/images/stylists/clarisse-1.jpg']
  }
];

export const reviews: Record<string, Review[]> = {
  'sty-1': [
    {
      id: 'rev-1',
      author: 'Sonia P.',
      rating: 5,
      date: '2024-05-02',
      text: 'Ma fille n’a pas versé une larme, Nadine chante des comptines tout du long !',
      mentionsNoTears: true
    },
    {
      id: 'rev-2',
      author: 'Luc M.',
      rating: 5,
      date: '2024-04-12',
      text: 'Organisation parfaite et hygiène irréprochable, bravo.',
      mentionsNoTears: false
    }
  ],
  'sty-2': [
    {
      id: 'rev-3',
      author: 'Myriam K.',
      rating: 5,
      date: '2024-05-19',
      text: 'Aïssata explique chaque geste, aucun pleur, juste des rires.',
      mentionsNoTears: true
    },
    {
      id: 'rev-4',
      author: 'Clara V.',
      rating: 4,
      date: '2024-03-30',
      text: 'Très douce, peut-être prévoir plus de jeux pendant l’attente.',
      mentionsNoTears: false
    }
  ],
  'sty-3': [
    {
      id: 'rev-5',
      author: 'Sophie T.',
      rating: 5,
      date: '2024-05-01',
      text: 'Ruth a transformé la séance en storytelling, aucune larme !',
      mentionsNoTears: true
    },
    {
      id: 'rev-6',
      author: 'Aline G.',
      rating: 4,
      date: '2024-02-18',
      text: 'Tresses soignées et rapides, merci.',
      mentionsNoTears: false
    }
  ],
  'sty-4': [
    {
      id: 'rev-7',
      author: 'Damien R.',
      rating: 5,
      date: '2024-04-22',
      text: 'Ma fille s’est endormie pendant le coiffage, zéro stress.',
      mentionsNoTears: true
    },
    {
      id: 'rev-8',
      author: 'Hawa S.',
      rating: 5,
      date: '2024-01-15',
      text: 'Toujours un accueil chaleureux et un résultat impeccable.',
      mentionsNoTears: false
    }
  ],
  'sty-5': [
    {
      id: 'rev-9',
      author: 'Binta L.',
      rating: 4,
      date: '2024-04-05',
      text: 'Conseils utiles pour entretenir les tresses, merci Inès.',
      mentionsNoTears: false
    },
    {
      id: 'rev-10',
      author: 'Anaïs D.',
      rating: 4,
      date: '2024-03-12',
      text: 'Un peu de tiraillement mais coiffure impeccable.',
      mentionsNoTears: false
    }
  ],
  'sty-6': [
    {
      id: 'rev-11',
      author: 'Rokia M.',
      rating: 5,
      date: '2024-05-20',
      text: 'Clarisse raconte des histoires, aucune larme malgré les cheveux épais.',
      mentionsNoTears: true
    },
    {
      id: 'rev-12',
      author: 'Yann C.',
      rating: 5,
      date: '2024-02-08',
      text: 'Ponctuelle et super douce, je recommande.',
      mentionsNoTears: false
    }
  ]
};

export const bookings: Booking[] = [
  {
    id: 'bk-1',
    stylistId: 'sty-1',
    serviceId: 'srv-box',
    date: '2024-06-12',
    time: '09:30',
    atHome: true,
    address: '12 rue des Lilas, Paris',
    travelFee: 8,
    depositPct: 20,
    status: 'confirmed'
  }
];
