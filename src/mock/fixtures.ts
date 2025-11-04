import { Booking, Review, Service, Stylist } from '../types';

const makeService = (
  id: string,
  title: string,
  price: number,
  durationMin: number,
  kidOnly: boolean
): Service => ({ id, title, price, durationMin, kidOnly });

const services: Record<string, Service[]> = {
  nadine: [
    makeService('nadine-braids', 'Tresses protectrices enfant', 75, 120, true),
    makeService('nadine-touchup', 'Retouches rapides (15 jours)', 35, 45, true),
    makeService('nadine-parent', 'Coiffure duo parent + enfant', 110, 150, false)
  ],
  amy: [
    makeService('amy-bun', 'Chignons festifs sans douleur', 60, 90, true),
    makeService('amy-locks', 'Locks entretien enfant', 80, 120, true)
  ],
  julie: [
    makeService('julie-cornrows', 'Cornrows créatifs', 55, 90, true),
    makeService('julie-adult', 'Vanilles adulte', 70, 120, false)
  ],
  lea: [
    makeService('lea-baby', 'Premières tresses (3-6 ans)', 45, 75, true),
    makeService('lea-atelier', 'Atelier nattes parent', 50, 90, false)
  ],
  sonia: [
    makeService('sonia-home', 'Box braids à domicile', 95, 150, false),
    makeService('sonia-detress', 'Dépose & soin apaisant', 40, 60, false)
  ],
  fatou: [
    makeService('fatou-protect', 'Nattes collées enfant', 50, 90, true),
    makeService('fatou-hydra', 'Soin hydratant + coiffage', 38, 60, false)
  ]
};

export const stylists: Stylist[] = [
  {
    id: 'stylist-nadine',
    name: 'Nadine D.',
    rating: 4.9,
    reviewsCount: 128,
    kidFriendly: true,
    verifiedID: true,
    city: 'Paris',
    distanceKm: 2.4,
    services: services.nadine,
    bio: 'Spécialiste des tresses protectrices sans larmes depuis 12 ans. Formée en pédagogie positive pour accompagner les plus sensibles.',
    hygiene: [
      'Matériel désinfecté entre chaque enfant',
      'Gants pour les soins et lavage des mains systématique',
      'Produits hypoallergéniques testés dermatologiquement'
    ],
    zoneKm: 10,
    photos: ['/images/nadine-1.jpg', '/images/nadine-2.jpg']
  },
  {
    id: 'stylist-amy',
    name: 'Amy S.',
    rating: 4.8,
    reviewsCount: 96,
    kidFriendly: true,
    verifiedID: true,
    city: 'Montreuil',
    distanceKm: 5.1,
    services: services.amy,
    bio: 'Maman de deux filles, j’adapte chaque séance aux besoins sensoriels de votre enfant. Ambiance musique douce & dessins animés.',
    hygiene: [
      'Stations nettoyées entre chaque rendez-vous',
      'Peignes personnels fournis sur demande',
      'Sprays apaisants sans parabènes'
    ],
    zoneKm: 15,
    photos: ['/images/amy-1.jpg']
  },
  {
    id: 'stylist-julie',
    name: 'Julie K.',
    rating: 4.7,
    reviewsCount: 84,
    kidFriendly: true,
    verifiedID: false,
    city: 'Saint-Denis',
    distanceKm: 6.3,
    services: services.julie,
    bio: 'Coiffeuse éducatrice spécialisée, j’intègre des jeux et histoires pour que la séance soit un moment de plaisir.',
    hygiene: [
      'Peignoirs individuels',
      'Nettoyage vapeur du matériel',
      'Stock produits biosourcés'
    ],
    zoneKm: 12,
    photos: ['/images/julie-1.jpg']
  },
  {
    id: 'stylist-lea',
    name: 'Léa M.',
    rating: 4.6,
    reviewsCount: 64,
    kidFriendly: true,
    verifiedID: true,
    city: 'Boulogne-Billancourt',
    distanceKm: 7.8,
    services: services.lea,
    bio: 'Je me déplace avec un kit sensoriel (bulles, livres) pour transformer la coiffure en pause douceur.',
    hygiene: [
      'Protection jetable pour les sièges',
      'Gel hydroalcoolique à disposition',
      'Rangement scellé des accessoires'
    ],
    zoneKm: 20,
    photos: ['/images/lea-1.jpg']
  },
  {
    id: 'stylist-sonia',
    name: 'Sonia P.',
    rating: 4.9,
    reviewsCount: 152,
    kidFriendly: false,
    verifiedID: true,
    city: 'Cergy',
    distanceKm: 18.2,
    services: services.sonia,
    bio: 'Experte box braids et twists longue durée. Séances détentes avec playlist afro chill.',
    hygiene: [
      'Bacs shampoing désinfectés',
      'Serviettes lavées à 60°',
      'Charte hygiène affichée en salon'
    ],
    zoneKm: 25,
    photos: ['/images/sonia-1.jpg']
  },
  {
    id: 'stylist-fatou',
    name: 'Fatou B.',
    rating: 4.5,
    reviewsCount: 52,
    kidFriendly: true,
    verifiedID: false,
    city: 'Versailles',
    distanceKm: 21.5,
    services: services.fatou,
    bio: 'Je crée des routines capillaires personnalisées pour toute la famille, avec un coin jeux pour patienter.',
    hygiene: [
      'Cuillères doseuses stérilisées',
      'Diffuseurs nettoyés après chaque soin',
      'Produits naturels maison'
    ],
    zoneKm: 18,
    photos: ['/images/fatou-1.jpg']
  }
];

export const reviews: Record<string, Review[]> = {
  'stylist-nadine': [
    {
      id: 'rev-1',
      author: 'Mélanie',
      rating: 5,
      date: '2024-03-04',
      text: 'Aucune larme du début à la fin, Nadine a un don avec les enfants !',
      mentionsNoTears: true
    },
    {
      id: 'rev-2',
      author: 'Pauline',
      rating: 5,
      date: '2024-02-21',
      text: 'Accueil chaleureux et explications claires sur l’entretien.',
      mentionsNoTears: false
    }
  ],
  'stylist-amy': [
    {
      id: 'rev-3',
      author: 'Luc',
      rating: 5,
      date: '2024-01-14',
      text: 'Mon fils a adoré. Zéro pleurs, merci pour la patience.',
      mentionsNoTears: true
    }
  ],
  'stylist-julie': [
    {
      id: 'rev-4',
      author: 'Sonia',
      rating: 4,
      date: '2024-02-10',
      text: 'Julie a raconté une histoire tout du long, ma fille en redemande.',
      mentionsNoTears: true
    }
  ],
  'stylist-lea': [
    {
      id: 'rev-5',
      author: 'Arnaud',
      rating: 5,
      date: '2024-03-12',
      text: 'Organisation parfaite, Léa a même prévu un coussin sensoriel.',
      mentionsNoTears: false
    }
  ],
  'stylist-sonia': [
    {
      id: 'rev-6',
      author: 'Maud',
      rating: 5,
      date: '2024-01-08',
      text: 'Tresses impeccables et ambiance détendue.',
      mentionsNoTears: false
    }
  ],
  'stylist-fatou': [
    {
      id: 'rev-7',
      author: 'Karine',
      rating: 4,
      date: '2024-02-28',
      text: 'Fatou a pris le temps d’expliquer chaque geste, ma fille était rassurée.',
      mentionsNoTears: true
    }
  ]
};

export const bookings: Booking[] = [
  {
    id: 'booking-1',
    stylistId: 'stylist-nadine',
    serviceId: 'nadine-braids',
    date: '2024-04-10',
    time: '14:00',
    atHome: true,
    address: 'Paris 11e',
    travelFee: 12,
    depositPct: 20,
    status: 'confirmed'
  }
];
