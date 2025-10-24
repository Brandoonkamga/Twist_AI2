export const frFR = {
  common: {
    cta: {
      search: 'Rechercher',
      reserve: 'Réserver maintenant'
    },
    labels: {
      kidFriendly: 'Kid-Friendly certifiée',
      verifiedID: 'Identité vérifiée'
    }
  },
  home: {
    title: 'Trouver une coiffeuse douce près de chez vous',
    subtitle: 'Des pros certifiées Kid-Friendly, recommandées par des parents.',
    empty: 'Oups, aucune coiffeuse trouvée. Essayez d’élargir vos filtres ou revenez plus tard. ✨'
  },
  profile: {
    about: 'À propos',
    services: 'Prestations',
    hygiene: 'Hygiène & produits',
    reviews: 'Avis des parents'
  },
  booking: {
    steps: {
      service: 'Choix de la prestation',
      datetime: 'Date & heure',
      details: 'Détails',
      payment: 'Paiement'
    },
    recap: {
      total: 'Total à régler le jour J'
    },
    policy: {
      deposit: 'Acompte de {percent}% débité maintenant. Annulation gratuite jusqu’à 24h avant, ensuite l’acompte est non remboursable.',
      cancel: 'En cas d’annulation moins de 24h avant, l’acompte reste dû.'
    }
  },
  auth: {
    login: 'Connexion',
    register: 'Inscription'
  }
} as const;

export type MessagesFr = typeof frFR;
