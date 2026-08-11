/**
 * Coordonnées et liens externes du site, centralisés ici pour éviter
 * qu'ils divergent entre Footer, ContactPage et les métadonnées SEO.
 */

export const SITE_URL = "https://v2.marabu.services";
export const SITE_NAME = "Marabu Services";
export const CONTACT_EMAIL = "contact@marabu.services";
export const CONTACT_PHONE = "+225 07 20 77 70 00";
/**
 * Dérivé de CONTACT_PHONE plutôt que saisi à la main : les deux avaient
 * divergé (un zéro de trop dans le lien, qui composait un numéro invalide).
 */
export const CONTACT_PHONE_HREF = `tel:${CONTACT_PHONE.replace(/[^\d+]/g, "")}`;

export type SocialLink = { label: string; url: string; path: string };

/**
 * Compte LinkedIn de Marabu. Nommé à part de SOCIAL_LINKS car il sert aussi
 * hors de la liste : carte « Suivez-nous » et `sameAs` du JSON-LD.
 *
 * L'URL est volontairement nettoyée des paramètres `utm_*` que LinkedIn ajoute
 * au partage depuis son app mobile : ils n'attribuent rien de notre côté.
 *
 * NB : c'est un profil (`/in/`), pas une page entreprise (`/company/`). Si une
 * page entreprise est créée, seule cette URL est à changer.
 */
export const LINKEDIN: SocialLink = {
  label: "LinkedIn",
  url: "https://www.linkedin.com/in/marabu-services-3703992b0",
  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

/**
 * Un réseau n'apparaît dans l'UI que si son `url` est renseignée : un lien
 * mort (`href="#"`) est pire qu'un lien absent.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  LINKEDIN,
  {
    label: "X",
    url: "",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
];

export const ACTIVE_SOCIAL_LINKS = SOCIAL_LINKS.filter((s) => s.url !== "");
