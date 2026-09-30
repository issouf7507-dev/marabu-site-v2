import { useTranslation } from "react-i18next";
import { TEAM, type TeamMember } from "../../config/team";
import { OFFERING_SLUGS } from "../../config/offering-slugs";
import conseil1 from "../../assets/imgs/conseils/conseil-1.webp";
import conseil2 from "../../assets/imgs/conseils/conseil-2.webp";
import conseil4 from "../../assets/imgs/conseils/conseil-4.webp";
import conseil7 from "../../assets/imgs/conseils/conseil-7.webp";
import conseil8 from "../../assets/imgs/conseils/conseil-8.webp";
import conseil9 from "../../assets/imgs/conseils/conseil-9.webp";
import services1 from "../../assets/imgs/services/services-1.webp";
import services2 from "../../assets/imgs/services/services-2.webp";
import services5 from "../../assets/imgs/services/services-5.webp";
import services6 from "../../assets/imgs/services/services-6.webp";
import services7 from "../../assets/imgs/services/services-7.webp";
import services8 from "../../assets/imgs/services/services-8.webp";
import inter1 from "../../assets/imgs/intermediation/intermediation-1.webp";
import inter2 from "../../assets/imgs/intermediation/intermediation-2.webp";
import inter4 from "../../assets/imgs/intermediation/intermediation-4.webp";
import inter5 from "../../assets/imgs/intermediation/intermediation-5.webp";
import inter6 from "../../assets/imgs/intermediation/intermediation-6.webp";
import inter7 from "../../assets/imgs/intermediation/intermediation-7.webp";
import ereputation from "../../assets/imgs/formation-e-reputation.webp";

/** Contenu long d'une prestation, affiché sur sa page (`OfferingPage`). */
export type OfferingDetails = {
  intro: string;
  includes: string[];
  deliverables: string[];
  audience: string;
};

export type OfferingItem = {
  n: string;
  title: string;
  desc: string;
  details: OfferingDetails;
};

/** Prestation enrichie de son adresse et de ses médias : visuel et référent. */
export type OfferingWithMedia = OfferingItem & {
  /** Dernier segment de `/services/<slug>`, cf. `OFFERING_SLUGS`. */
  slug: string;
  img: string;
  /**
   * Absent si l'id ne correspond plus à personne dans `TEAM` (membre retiré) :
   * la page masque alors le bloc, plutôt que d'afficher un nom fantôme.
   */
  expert?: TeamMember;
};

export type Service = {
  id: string;
  index: string;
  name: string;
  intro: string;
  offerings: OfferingItem[];
};

export type Step = { n: string; title: string; desc: string };

/*
  Visuels et couleurs, dans l'ordre des services déclarés sous
  `servicesPage.services` dans les fichiers i18n. Ils vivent ici et non dans le
  JSON : un import d'asset est résolu et empreinté par le bundler, un chemin en
  dur dans une traduction ne le serait pas.

  Ajouter un service = une entrée dans les trois tableaux, à la même position
  que dans le JSON.
*/
const serviceHeroImages = [conseil1, services1, inter1];
const serviceColors = ["#538253", "#1d454c", "#5a3728"];
const serviceOfferingImages = [
  [conseil4, conseil2, conseil8, conseil7],
  [ereputation, services2, services5, services6],
  [inter4, inter2, inter5, inter6],
];
const stepImages = [conseil9, services7, inter7, services8];

/*
  Référent métier de chaque prestation, affiché sur sa page : on ne vend pas
  une ligne de catalogue, on met un visage sur la compétence.

  Les quatre associés couvrent les douze prestations, chacun sur son domaine
  (cf. `expertise` dans src/config/cv.ts). La liste restreinte est typée : un id
  hors des quatre, ou mal orthographié, casse la compilation.

  Même disposition que `serviceOfferingImages` — un tableau par service, dans
  l'ordre des prestations du JSON.
*/
type ExpertId =
  | "houssene-ben-souda"
  | "thomas-dabadie"
  | "aida-ouattara"
  | "brice-brou";

const serviceOfferingExperts: ExpertId[][] = [
  [
    "thomas-dabadie", // Stratégie d'entreprise
    "houssene-ben-souda", // Transformation organisationnelle
    "aida-ouattara", // Gouvernance & conformité
    "thomas-dabadie", // Gestion du changement
  ],
  [
    "houssene-ben-souda", // Formation professionnelle
    "brice-brou", // Communication institutionnelle
    "brice-brou", // Événementiel stratégique
    "brice-brou", // Création de contenus
  ],
  [
    "houssene-ben-souda", // Relations gouvernementales
    "houssene-ben-souda", // Diplomatie privée
    "aida-ouattara", // Partenariats PTF
    "brice-brou", // Stratégie d'influence
  ],
];

const membersById = new Map(TEAM.map((m) => [m.id, m]));

export type ServiceWithMedia = Omit<Service, "offerings"> & {
  color: string;
  bg: string;
  heroImage: string;
  offerings: OfferingWithMedia[];
};

/**
 * Assemble le contenu traduit (i18n) et les visuels locaux : le texte reste
 * seul dans les fichiers de traduction, les images seules dans le code.
 */
export function useServiceData() {
  const { t } = useTranslation();

  const services = (
    t("servicesPage.services", { returnObjects: true }) as Service[]
  ).map((svc, si) => ({
    ...svc,
    color: serviceColors[si],
    bg: "#ecede3",
    heroImage: serviceHeroImages[si],
    offerings: svc.offerings.map((o, oi) => ({
      ...o,
      slug: OFFERING_SLUGS[si][oi],
      img: serviceOfferingImages[si][oi],
      expert: membersById.get(serviceOfferingExperts[si][oi]),
    })),
  }));

  const steps = (
    t("servicesPage.methode.steps", { returnObjects: true }) as Step[]
  ).map((step, i) => ({ ...step, img: stepImages[i] }));

  return { services, steps };
}

/** Retrouve une prestation et son service par le slug de l'URL. */
export function findOffering(services: ServiceWithMedia[], slug: string) {
  for (const svc of services) {
    const item = svc.offerings.find((o) => o.slug === slug);
    if (item) return { svc, item };
  }
  return undefined;
}

export type StepWithMedia = ReturnType<typeof useServiceData>["steps"][number];
