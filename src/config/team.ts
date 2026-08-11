/**
 * Composition de l'équipe affichée sur « À propos » (specs V2, §2.3).
 *
 * Source unique : seul le poste (`role`) est traduit, via la clé
 * `about.team.roles.<id>` des fichiers i18n. Le nom, la photo et l'URL
 * LinkedIn sont identiques en FR et en EN — les dupliquer dans les deux
 * fichiers de traduction les ferait fatalement diverger (même écueil que
 * CONTACT_PHONE, cf. src/config/site.ts).
 *
 * Ajouter un membre = une entrée ici + une ligne dans `about.team.roles`
 * de fr.json et en.json. Aucun composant à modifier.
 */
export type TeamMember = {
  /** Identifiant stable, sert de clé de traduction du poste. */
  id: string;
  name: string;
  /** Fichier servi depuis `public/persons/` — cf. docs/photos-equipe.md. */
  photo?: string;
  /**
   * Profil LinkedIn personnel. Laisser vide tant qu'il n'est pas confirmé :
   * l'icône n'est alors pas rendue, plutôt qu'un lien mort.
   */
  linkedin?: string;
};

export const TEAM: TeamMember[] = [
  {
    id: "houssene-ben-souda",
    name: "Houssene Ben Souda",
    photo: "/persons/Houssene_Ben_Souda_marabu.webp",
    linkedin: "https://ci.linkedin.com/in/hbensouda",
  },
  {
    id: "thomas-dabadie",
    name: "Thomas Dabadie",
    photo: "/persons/Thomas_Dabadie_marabu.webp",
    linkedin: "https://www.linkedin.com/in/thomas-dabadie-68b2345/",
  },
  {
    id: "aida-ouattara",
    name: "Aida Ouattara",
    photo: "/persons/Aida_Ouattara_marabu.webp",
    // Le « ï » est percent-encodé par LinkedIn : à conserver tel quel.
    linkedin: "https://www.linkedin.com/in/a%C3%AFda-ouattara-b4ab0682/",
  },
  {
    id: "brice-brou",
    name: "Brice Brou",
    photo: "/persons/Brice_Brou_marabu.webp",
    linkedin: "",
  },
  {
    id: "kimana-misago",
    name: "Kimana Misago",
    photo: "/persons/Kimana_Misago_marabu.webp",
    linkedin: "https://www.linkedin.com/in/kimana-misago/",
  },
  {
    id: "bossoh-aka",
    name: "Bossoh Aka",
    photo: "/persons/Bossoh_Aka_marabu.webp",
    linkedin: "https://www.linkedin.com/in/bossoh-guy-aka-89284b1a2/",
  },
  {
    id: "gilles-dogbo",
    name: "Gilles Dogbo",
    photo: "/persons/Gilles_Dogbo_marabu.webp",
    linkedin: "https://www.linkedin.com/in/gillesdogbo/",
  },
  {
    id: "issouf-ouattara",
    name: "Issouf Ouattara",
    photo: "/persons/Issouf_Ouattara_marabu.webp",
    linkedin: "https://www.linkedin.com/in/bitcheresse-issouf-ouattara-a350aa341/",
  },
  {
    id: "herve-toure",
    name: "Hervé Touré",
    photo: "/persons/Herve_Toure_marabu.webp",
    linkedin: "",
  },
  {
    id: "souleymane-coulibaly",
    name: "Souleymane Coulibaly",
    photo: "/persons/Souleymane_Coulibaly_marabu.webp",
    linkedin: "https://www.linkedin.com/in/nourgo-coulibaly-ab54aa339/",
  },
  {
    id: "khalil-diop",
    name: "Khalil Diop",
    photo: "/persons/Khalil_Diop_marabu.webp",
    linkedin: "",
  },
];
