export const frFR = {
  locale: 'fr-FR',
  common: {
    cta: {
      search: 'Rechercher',
      reserve: 'Réserver'
    },
    labels: {
      kidFriendly: 'Kid-Friendly certifiée',
      verifiedID: 'Identité vérifiée',
      topRated: 'Top avis parents',
      hygiene: 'Hygiène irréprochable'
    }
  },
  home: {
    title: 'Trouver une coiffeuse douce près de chez vous',
    subtitle: 'Des pros certifiées Kid-Friendly, recommandées par des parents.',
    empty: "Oups, aucune coiffeuse trouvée. Essayez d’élargir vos filtres ou revenez plus tard. ✨"
  },
  profile: {
    about: 'À propos',
    services: 'Prestations',
    hygiene: 'Hygiène & produits',
    reviews: 'Avis de parents'
  },
  booking: {
    steps: {
      service: 'Prestation',
      datetime: 'Date & heure',
      details: 'Détails',
      payment: 'Paiement'
    },
    recap: {
      total: 'Total'
    },
    policy: {
      deposit: "Acompte de {percent}% débité maintenant. Annulation gratuite jusqu’à 24h avant, ensuite l’acompte est non remboursable.",
      cancel: 'Annulation 24h avant : acompte conservé pour dédommager la coiffeuse.'
    }
  },
  auth: {
    login: 'Se connecter',
    register: "Créer un compte"
  },
  account: {
    reservations: 'Mes réservations',
    favorites: 'Favoris',
    payments: 'Paiements',
    settings: 'Paramètres'
  },
  pro: {
    dashboard: 'Tableau de bord',
    agenda: 'Agenda',
    wallet: 'Portefeuille'
  }
};

export type TranslationKeys = typeof frFR;
