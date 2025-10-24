export const frFR = {
  locale: 'fr-FR',
  common: {
    cta: {
      search: 'Rechercher',
      reserve: 'Réserver',
    },
    labels: {
      kidFriendly: 'Kid-Friendly certifiée',
      verifiedID: 'Identité vérifiée',
    },
  },
  home: {
    title: 'Trouver une coiffeuse douce près de chez vous',
    subtitle: 'Des pros certifiées Kid-Friendly, recommandées par des parents.',
    empty: 'Oups, aucune coiffeuse trouvée. Essayez d’élargir vos filtres ou revenez plus tard. ✨',
  },
  profile: {
    about: 'À propos',
    services: 'Prestations',
    hygiene: 'Hygiène & Produits',
    reviews: 'Avis de parents',
  },
  booking: {
    steps: {
      service: 'Prestation',
      datetime: 'Date & heure',
      details: 'Détails',
      payment: 'Paiement',
    },
    recap: {
      total: 'Total',
    },
    policy: {
      deposit: 'Acompte de {percent}% débité maintenant. Annulation gratuite jusqu’à 24h avant, ensuite l’acompte est non remboursable.',
      cancel: 'Annulation gratuite jusqu’à 24h avant le rendez-vous.',
    },
  },
  auth: {
    login: 'Connexion',
    register: 'Créer un compte',
  },
};

export type Messages = typeof frFR;
