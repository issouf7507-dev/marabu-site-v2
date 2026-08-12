/**
 * Membres dont le CV est publié sur `/equipe/:id`.
 *
 * Séparé de `cv.ts` pour une raison de poids : « À propos » n'a besoin que de
 * savoir *qui* est cliquable, pas du contenu des CV. Importer `CVS` depuis
 * TeamSection embarquerait les ~15 ko (gzip) de texte des CV dans le bundle de
 * la page, alors qu'ils ne servent que sur la fiche elle-même.
 *
 * Les deux fichiers ne peuvent pas diverger : `CVS` est typé sur cette liste,
 * un id en trop ou en moins d'un côté casse la compilation.
 */
export const CV_IDS = [
  "houssene-ben-souda",
  "thomas-dabadie",
  "aida-ouattara",
  "brice-brou",
  "kimana-misago",
  "gilles-dogbo",
  "bossoh-aka",
  "issouf-ouattara",
  "souleymane-coulibaly",
] as const;

export type CvId = (typeof CV_IDS)[number];

/** Un membre n'est cliquable sur « Notre équipe » que si son CV existe. */
export function hasCv(id: string): id is CvId {
  return (CV_IDS as readonly string[]).includes(id);
}
