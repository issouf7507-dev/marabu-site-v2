/**
 * Adresse de la page de chaque prestation : `/services/<slug>`.
 *
 * Un tableau par service, dans l'ordre de `servicesPage.services` des fichiers
 * i18n, et dans chaque tableau l'ordre des prestations du JSON — même
 * disposition que les visuels et référents de `serviceData.ts`.
 *
 * Les slugs sont en français et ne suivent pas la langue d'affichage : une URL
 * indexée ne doit pas changer quand le visiteur bascule en anglais. Ils vivent
 * dans le code et non dans le JSON pour la même raison que les images, et pour
 * que `scripts/prerender.mjs` puisse les lire sans charger l'app.
 *
 * Renommer un slug casse les liens déjà partagés et indexés : prévoir alors une
 * redirection 301 côté serveur. Garder public/sitemap.xml aligné.
 */
export const OFFERING_SLUGS = [
  [
    "strategie-d-entreprise",
    "transformation-organisationnelle",
    "gouvernance-et-conformite",
    "gestion-du-changement",
  ],
  [
    "formation-professionnelle",
    "communication-institutionnelle",
    "evenementiel-strategique",
    "creation-de-contenus",
  ],
  [
    "relations-gouvernementales",
    "diplomatie-privee",
    "partenariats-ptf",
    "strategie-d-influence",
  ],
] as const;
