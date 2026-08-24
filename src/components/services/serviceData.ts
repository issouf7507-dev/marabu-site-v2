import { useTranslation } from "react-i18next";
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

/** Contenu long d'une prestation, affiché dans la modale (`OfferingModal`). */
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

export type Service = {
  id: string;
  index: string;
  name: string;
  intro: string;
  offerings: OfferingItem[];
};

export type Step = { n: string; title: string; desc: string };

/** Prestation ouverte dans la modale, avec le service dont elle relève. */
export type OpenOffering = {
  svc: { name: string; color: string };
  item: OfferingItem & { img: string };
};

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

export type ServiceWithMedia = Service & {
  color: string;
  bg: string;
  heroImage: string;
  offerings: (OfferingItem & { img: string })[];
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
      img: serviceOfferingImages[si][oi],
    })),
  }));

  const steps = (
    t("servicesPage.methode.steps", { returnObjects: true }) as Step[]
  ).map((step, i) => ({ ...step, img: stepImages[i] }));

  return { services, steps };
}

export type StepWithMedia = ReturnType<typeof useServiceData>["steps"][number];
