/**
 * CV des membres de l'équipe, affichés sur `/equipe/:id`.
 *
 * Source : `src/assets/CV_MARABU_2026_v2.pptx` (une diapositive par personne).
 * Le contenu est repris tel quel, à l'exception de coquilles manifestes
 * (accords, dates inversées) corrigées à la saisie.
 *
 * Volontairement monolingue (français) : traduire des parcours professionnels
 * détaillés relève de la relecture humaine, pas d'une clé i18n. Seuls les
 * intitulés de rubriques sont traduits, via `teamMember.*` dans fr/en.json.
 *
 * La clé de chaque entrée est l'`id` du membre dans `src/config/team.ts`. Un
 * membre sans entrée ici n'a pas de page CV : sa carte reste non cliquable
 * (cf. TeamSection). Aucun composant à modifier pour en ajouter un — seule
 * `CV_IDS` (cv-ids.ts) est à compléter, faute de quoi la compilation échoue.
 */
import type { CvId } from "./cv-ids";

export type CvExperience = {
  /** Période telle qu'écrite sur le CV, ex. « Oct. 2023 – Présent ». */
  period: string;
  role: string;
  /** Employeur et lieu. Absent quand le CV n'en mentionne pas. */
  org?: string;
};

export type CvReference = {
  title: string;
  text: string;
};

export type Cv = {
  /** Ligne de spécialités sous le nom, ex. « Stratégie • Innovation ». */
  tagline: string;
  /**
   * Adresse professionnelle. Omise pour les membres dont le CV ne porte
   * qu'une adresse personnelle : une page publique n'est pas le bon endroit.
   */
  email?: string;
  languages: string[];
  expertise: string[];
  /** Chiffres clés (rubrique « Repères » du CV). */
  figures: string[];
  /** Paragraphes de la rubrique « Profil ». */
  profile: string[];
  experience: CvExperience[];
  education: string[];
  references: CvReference[];
  certifications?: string[];
};

export const CVS: Record<CvId, Cv> = {
  "houssene-ben-souda": {
    tagline:
      "Transformation • Innovation • Gouvernance • Relations Institutionnelles",
    email: "houssene.bensouda@marabu.services",
    languages: ["Français", "Anglais"],
    expertise: [
      "Transformation et modernisation",
      "Gouvernance et conduite du changement",
      "Stratégie et transformation numérique",
      "Innovation et Intelligence Artificielle",
      "Relations gouvernementales et affaires publiques",
      "Gestion de programmes complexes",
      "Développement économique et partenariats",
      "Architecture des systèmes d'information",
      "PMO et transformation organisationnelle",
    ],
    figures: [
      "16+ années d'expérience",
      "70+ missions de conseil",
      "30+ grands comptes accompagnés",
      "15+ institutions publiques accompagnées",
      "5 pays d'intervention",
      "20+ programmes de transformation pilotés",
      "500+ cadres et décideurs accompagnés",
      "Plusieurs programmes nationaux structurés",
    ],
    profile: [
      "Fort de plus de 16 années d'expérience dans le conseil stratégique, la transformation numérique et la modernisation des organisations, Houssène BEN SOUDA accompagne les gouvernements, institutions publiques et entreprises privées dans la conception, le pilotage et la mise en œuvre de programmes de transformation à fort impact.",
      "Ancien Senior Manager chez EY et Conseiller Technique auprès du Ministre de la Promotion de la Bonne Gouvernance, il intervient sur les problématiques de gouvernance publique, d'innovation, de transformation digitale, de conduite du changement et de partenariats stratégiques.",
      "Son parcours lui confère une double expertise en stratégie et en exécution opérationnelle, renforcée par la direction de programmes nationaux, la coordination de projets multisectoriels et l'accompagnement de décideurs publics et privés.",
      "Au sein de MARABU, il met son expertise au service de la transformation des administrations, du développement économique et de l'innovation en Afrique.",
    ],
    experience: [
      {
        period: "Oct. 2023 – Présent",
        role: "Fondateur et associé",
        org: "MARABU – Abidjan, Côte d'Ivoire",
      },
      {
        period: "Août 2023 – Janv. 2026",
        role: "Consultant en Relations Gouvernementales",
        org: "YANGO – Côte d'Ivoire",
      },
      {
        period: "Déc. 2022 – Oct. 2023",
        role: "Secrétaire Permanent du Président",
        org: "International Anti-Corruption Academy (IACA) – Autriche",
      },
      {
        period: "Avr. 2022 – Oct. 2023",
        role: "Conseiller et Assistant Technique du Ministre",
        org: "Ministère de la Promotion de la Bonne Gouvernance et de la Lutte Contre la Corruption – Côte d'Ivoire",
      },
      {
        period: "Oct. 2019 – Mars 2022",
        role: "Senior Manager Advisory Services",
        org: "Ernst & Young (EY) – Côte d'Ivoire",
      },
      {
        period: "Oct. 2019 – Fév. 2020",
        role: "Conseiller Spécial",
        org: "Digital Opportunity Trust – Côte d'Ivoire",
      },
      {
        period: "Juin 2019 – Oct. 2019",
        role: "Directeur de Projet",
        org: "DIGITECH – Côte d'Ivoire",
      },
      {
        period: "Oct. 2018 – Juin 2019",
        role: "Directeur de Projet de Transformation Digitale",
        org: "ARPT – Guinée",
      },
      {
        period: "Mai 2017 – Sept. 2018",
        role: "Directeur de la Transformation Digitale",
        org: "Poste CI – Côte d'Ivoire",
      },
      {
        period: "Avr. 2014 – Mai 2017",
        role: "Directeur de projet",
        org: "LUXINCEPTO – Luxembourg",
      },
      {
        period: "Avr. 2012 – Avr. 2014",
        role: "Chef de Projet Développement Logiciel",
        org: "Sopra Steria Group – Luxembourg",
      },
      {
        period: "Janv. 2010 – Mars 2012",
        role: "Développeur d'Application Senior",
        org: "Accent Jobs For People – Luxembourg",
      },
      {
        period: "Janv. 2009 – Déc. 2009",
        role: "Développeur d'Application Stagiaire",
        org: "POST.lu – Luxembourg",
      },
    ],
    education: [
      "Sept. 2006 – Juin 2009 : Bachelor en Informatique de Gestion – Université du Luxembourg, Luxembourg",
    ],
    references: [
      {
        title:
          "Table Ronde sur l'Attraction des Investissements Américains dans l'Immobilier Ivoirien",
        text: "Pilotage de l'organisation de bout en bout de l'atelier des réflexions stratégiques portant sur les mécanismes d'attraction des investissements étatsuniens dans le secteur immobilier ivoirien.",
      },
      {
        title: "Optimisation UI/UX de la plateforme GUCE",
        text: "Supervision et coordination des équipes d'intervention sur le projet.",
      },
      {
        title: "Redynamisation des modules logistiques de GUCE CI",
        text: "Coordination de la mission de promotion de l'adoption systématique du PCS du Guichet Unique du Commerce Extérieur de Côte d'Ivoire, incluant la gestion des relations avec les partenaires techniques et financiers et l'organisation d'un voyage de benchmarking à Djibouti et au Maroc.",
      },
      {
        title: "Relations Publiques YANGO",
        text: "Mise en conformité des outils numériques de la plateforme avec la réglementation ivoirienne, tout en promouvant les bonnes pratiques de l'entreprise auprès de ses partenaires techniques, financiers et des communautés. Houssène a également piloté l'ancrage stratégique de YANGO auprès du gouvernement ivoirien, notamment en supervisant le lancement de son hub régional à Abidjan, en orchestrant les signatures de MoU avec les institutions publiques et en facilitant les échanges entre les acteurs publics et privés.",
      },
      {
        title:
          "Projet PARAE (Programme d'Appui au Renforcement de l'Administration Électronique)",
        text: "Directeur de projet de l'étude de faisabilité chez Ernst & Young, contribuant au cadrage stratégique de ce programme national de modernisation de l'administration publique ivoirienne.",
      },
      {
        title: "Transformation Digitale de La Poste CI",
        text: "Pilotage de la digitalisation des services postaux avec implémentation de systèmes de suivi en temps réel et développement d'une plateforme en ligne. Le projet a modernisé les opérations, renforcé la confiance de plus de 500 000 utilisateurs et eu un impact transformateur sur les services publics en Côte d'Ivoire.",
      },
      {
        title: "Projet ARPT Guinée",
        text: "Coordination de projets de dématérialisation et digitalisation des processus de l'administration publique guinéenne, visant à renforcer la régulation des secteurs des télécommunications et des postes pour promouvoir un environnement concurrentiel.",
      },
      {
        title: "Projet SPACIA (Ministère de la Bonne Gouvernance)",
        text: "Gestion d'un projet innovant ayant permis de réduire l'informalité au sein de l'administration en fournissant un cadre de dénonciation des actes de corruption dans l'administration publique ivoirienne.",
      },
      {
        title: "Pôle Recherche et Développement (R&D) du GIM UEMOA et de la CIE",
        text: "Mise en place du pôle R&D pour ces institutions stratégiques, contribuant à l'innovation et à la modernisation des infrastructures numériques.",
      },
      {
        title: "Plateforme digitale de cession légale",
        text: "Conception et déploiement d'une plateforme de cession légale au 1er franc pour la CICA-RE, démontrant une capacité à créer des solutions innovantes pour le secteur financier.",
      },
    ],
  },

  "thomas-dabadie": {
    tagline: "Stratégie • Optimisation de la performance • Transformation",
    email: "thomas.dabadie@marabu.services",
    languages: ["Français", "Anglais"],
    expertise: [
      "Transformation et modernisation",
      "Optimisation des processus métiers",
      "Intelligence Artificielle et IA Générative",
      "Robotisation des processus (RPA)",
      "Transformation numérique",
      "Assistance à Maîtrise d'Ouvrage (AMOA)",
      "Architecture des processus métiers",
      "Gouvernance des projets",
      "ERP et systèmes d'information",
      "PMO et conduite du changement",
    ],
    figures: [
      "20+ années d'expérience",
      "150+ missions de conseil",
      "30+ grands comptes accompagnés",
      "100+ processus optimisés",
      "10+ programmes de transformation pilotés",
      "5 pays d'intervention",
      "20+ projets IA et Robotisation",
      "Plusieurs projets stratégiques nationaux",
    ],
    profile: [
      "Fort de plus de 20 années d'expérience dans le conseil en transformation, l'optimisation de la performance et la modernisation des organisations, Thomas DABADIE accompagne les administrations publiques, les institutions financières et les grandes entreprises dans la définition, le pilotage et la mise en œuvre de programmes de transformation à fort impact.",
      "Ancien Senior Manager chez EY, il intervient sur les problématiques d'excellence opérationnelle, de transformation digitale, d'intelligence artificielle, de robotisation des processus (RPA), d'assistance à maîtrise d'ouvrage et de gouvernance des projets.",
      "Son parcours lui confère une double expertise en stratégie et en exécution, renforcée par la direction de programmes de transformation complexes, l'optimisation de processus critiques, le pilotage de projets internationaux et l'accompagnement de dirigeants dans leurs projets de modernisation.",
      "Au sein de MARABU, il met son expertise au service de la performance des organisations, de l'innovation technologique et de la transformation des entreprises et administrations africaines.",
    ],
    experience: [
      {
        period: "Oct. 2024 – Présent",
        role: "Partner",
        org: "MARABU – Abidjan",
      },
      {
        period: "Janv. 2023 – Sept. 2024",
        role: "Directeur Développement Commercial",
        org: "Trigger's Reports – Abidjan",
      },
      {
        period: "Janv. 2022 – Déc. 2022",
        role: "Directeur Côte d'Ivoire et Afrique de l'Ouest",
        org: "FCB.ai – Abidjan",
      },
      {
        period: "Août 2015 – Janv. 2022",
        role: "Senior Manager",
        org: "EY – Abidjan",
      },
      {
        period: "Fév. 2012 – Août 2015",
        role: "Manager",
        org: "ADVENTS Consulting – Paris",
      },
      {
        period: "Fév. 2005 – Fév. 2012",
        role: "Consultant Senior",
        org: "Logica Management Consulting – Paris",
      },
    ],
    education: [
      "2003 – 2005 : Master en Robotique et Automatique, IA – Université de Salford, Manchester, Royaume-Uni",
      "2002 – 2005 : Diplôme d'Ingénieur – École Supérieure des Technologies Industrielles Avancées, Bidart, France",
    ],
    references: [
      {
        title: "Optimisation UI/UX de la plateforme GUCE",
        text: "Pilotage intégral de la mission d'optimisation de l'expérience utilisateur de la plateforme du Guichet Unique du Commerce Extérieur de Côte d'Ivoire, avec production de recommandations opérationnelles visant à améliorer l'ergonomie, le parcours utilisateur et la performance globale de l'interface.",
      },
      {
        title:
          "Ministère de la Transition Numérique et de la Digitalisation – Côte d'Ivoire",
        text: "Assistance à l'élaboration de la Stratégie Nationale des Données à Caractère Personnel et de l'Intelligence Artificielle, incluant l'analyse de l'écosystème, la conception du cadre de gouvernance, les recommandations stratégiques et le plan de déploiement.",
      },
      {
        title: "FINAPTIK",
        text: "Réalisation d'une plateforme SaaS boostée à l'intelligence artificielle pour le rapprochement bancaire automatisé des entreprises.",
      },
      {
        title: "Missions de recrutement",
        text: "Recrutement de plus d'une dizaine de hauts cadres dirigeants pour l'administration ivoirienne (Directeurs Généraux et centraux).",
      },
      {
        title: "Migration de SI",
        text: "AMOA du projet de migration d'ERP d'une multinationale sur le continent africain, assurant la continuité opérationnelle, l'intégrité des données et l'alignement des nouvelles infrastructures sur les standards du groupe.",
      },
      {
        title: "Projet PARAE",
        text: "Stratégie de Conduite du Changement pour le Programme d'Appui au Renforcement de l'Administration Électronique en Côte d'Ivoire.",
      },
      {
        title: "Allianz",
        text: "Assistance à la refonte et à l'optimisation de processus de l'entreprise par la mise en place d'une solution IA. Analyse des processus existants et identification des gisements d'optimisation. Identification des processus à robotiser. Description détaillée et pilotage du développement et de la mise en production des robots.",
      },
      {
        title: "CNCE / Banque Populaire",
        text: "Pilotage de la restructuration du système d'information et de la monétique, incluant l'élaboration du schéma directeur, l'évaluation des processus de migration, le contrôle de la complétude et de l'exactitude des données transférées, ainsi que la formalisation des procédures. La mission a assuré la continuité opérationnelle et la sécurisation du nouvel environnement technologique.",
      },
      {
        title: "Agence Emploi Jeunes",
        text: "Mission de revue et d'accompagnement à la migration du système opérationnel et financier. Les travaux ont porté sur la vérification de l'exhaustivité des données transférées, l'évaluation de la gouvernance du projet de migration, la validation des processus déployés et la mise en place d'un manuel de procédures pour garantir la fiabilité du nouveau système.",
      },
      {
        title: "Banque de France",
        text: "Mission d'étude de cadrage pour la ré-implémentation de l'ERP Oracle et la refonte des processus achats et logistiques. La mission a inclus l'analyse de la gouvernance du projet de migration, la vérification de l'intégrité des données, l'évaluation des risques liés aux contrôles internes et la préparation à la bascule vers le nouvel environnement SI.",
      },
      {
        title: "Caisse des Dépôts et Consignations de France",
        text: "Refonte de la gestion de la chaîne des dépenses avec mise en œuvre d'Oracle. La mission a couvert la vérification de la qualité des données migrées, l'harmonisation des processus, l'audit des procédures de migration et l'évaluation des dispositifs de contrôle interne afin d'assurer l'intégrité et la fiabilité du nouveau système.",
      },
    ],
  },

  "aida-ouattara": {
    tagline: "Opérations • Finances • Optimisation des processus",
    email: "ouattara.aida@marabu.services",
    languages: ["Français"],
    expertise: [
      "Transformation secteur bancaire",
      "Expertise des fintechs et de la e-money",
      "Optimisation de l'entreprise",
      "Stratégie de développement",
      "Gestion des risques opérationnels",
    ],
    figures: [
      "11+ années d'expérience",
      "40+ commerciaux encadrés",
      "100 000+ téléchargements EME",
      "15 % de fraude réduite",
      "400+ sous-agents supervisés",
      "20+ typologies de projets",
      "10 000+ utilisateurs monétiques",
    ],
    profile: [
      "Forte de plus de 11 années d'expérience dans le secteur bancaire, Aïda OUATTARA accompagne les institutions financières dans leurs programmes de transformation, d'optimisation de la performance et de modernisation des services bancaires.",
      "Experte en gouvernance des risques, contrôle permanent, conformité réglementaire, banque digitale et transformation des opérations, elle a piloté des projets stratégiques couvrant le déploiement de nouveaux services financiers, l'amélioration des dispositifs de contrôle, l'optimisation des processus et le développement commercial.",
      "Son parcours lui confère une double expertise métier et managériale, renforcée par la direction d'équipes de plus de quarante collaborateurs et la conduite de projets à fort impact.",
      "Au sein de MARABU, elle met son expertise au service des institutions publiques et privées dans leurs projets de transformation, d'amélioration de la performance et de modernisation des organisations.",
    ],
    experience: [
      {
        period: "2026 – Présent",
        role: "Associé",
        org: "MARABU – Abidjan, Côte d'Ivoire",
      },
      {
        period: "2019 – 2025",
        role: "Directrice du Retail Banking",
        org: "Afriland First Bank CI – Abidjan",
      },
      {
        period: "2017 – 2019",
        role: "Chef du Département Contrôle Permanent",
        org: "Afriland First Bank CI – Abidjan",
      },
      {
        period: "2015 – 2017",
        role: "Contrôleur Comptable",
        org: "Afriland First Bank CI – Abidjan, Côte d'Ivoire",
      },
      {
        period: "2014 – 2015",
        role: "Stage",
        org: "Afriland First Bank CI – Abidjan, Côte d'Ivoire",
      },
      {
        period: "2013",
        role: "Stage",
        org: "Attijariwafa Bank, siège Moulay Youssef – Casablanca",
      },
    ],
    education: [
      "2011 – 2013 : Master International II, Banque et Marchés Financiers – Faculté Hassan II / Académie Attijariwafa Bank, Casablanca et Université de Cantabrie, Espagne",
      "2010 – 2011 : Licence des études fondamentales – F.S.J.E.S. Sidi Mohamed Ben Abdellah, Fès",
      "2008 – 2010 : DEUG II, Économie et Gestion – F.S.J.E.S. Sidi Mohamed Ben Abdellah, Fès",
    ],
    certifications: [
      "2021 – 2022 : HEC Paris / COFEB — Certificat Executive Management de la Transformation Digitale",
      "2020 : GIM UEMOA Academy — Gestion des incidents et méthode de résolution des problèmes monétiques",
      "2019 : GIM UEMOA Academy — Les services financiers numériques comme levier de croissance",
      "2018 : GIM UEMOA Academy — L'interface back office monétique GIM-UEMOA et les banques ; prévention fraude monétique",
    ],
    references: [
      {
        title: "Optimisation des processus bancaires",
        text: "Diagnostic des dysfonctionnements opérationnels au sein de la banque, identification des besoins métiers et supervision de la digitalisation des processus afin d'élever la qualité de service.",
      },
      {
        title: "Pilotage qualité & conformité réglementaire",
        text: "Conduite de démarches qualité et accompagnement des structures dans leur mise en conformité avec les normes et référentiels en vigueur.",
      },
      {
        title: "Architecture du contrôle permanent",
        text: "Élaboration et déploiement de dispositifs de contrôle inspirés des principes de Bâle, incluant l'automatisation des contrôles documentaires, la cartographie des risques opérationnels, le traitement des réclamations et le suivi du portefeuille de crédits.",
      },
      {
        title: "Transformation digitale & core banking",
        text: "Pilotage du déploiement de la banque digitale, du cadrage initial jusqu'à son adoption généralisée, avec une contribution métier active à l'implémentation du système central TEMENOS T24.",
      },
      {
        title: "Lancement de la monnaie électronique (EME)",
        text: "Pilotage intégral du projet, depuis la validation réglementaire auprès de la BCEAO jusqu'au déploiement commercial, générant plus de 100 000 téléchargements en un an.",
      },
      {
        title: "Gouvernance du risque crédit",
        text: "Présidence du Comité de crédit 1, avec autorité d'analyse et de décision sur les engagements compris entre 200 000 et 10 000 000 FCFA.",
      },
      {
        title: "Conception et animation de formations professionnelles",
        text: "Élaboration de programmes de formation portant sur la monétique, la qualité de service, la gestion des réclamations, la prévention de la fraude et les services financiers numériques.",
      },
      {
        title: "Sécurisation des transactions monétiques",
        text: "Mise en place de dispositifs de contrôle avancés ayant permis une baisse de 15 % du taux de fraude.",
      },
      {
        title: "Investigation et traitement des fraudes",
        text: "Détection, signalement et résolution de trois cas de fraude (deux informatiques, un comptable).",
      },
      {
        title: "Projets monétiques",
        text: "Déploiement de cartes privatives, régionales et internationales, de terminaux de paiement (TPE) et de guichets automatiques (GAB). Organisation de cérémonies de lancement de cartes ; pilotage des relations GIM-UEMOA, Visa et Mastercard.",
      },
      {
        title: "Extension du réseau de distribution (sous-agents et fintechs)",
        text: "Recrutement et mobilisation de plus de 400 sous-agents autour des produits de la banque ; structuration de partenariats avec trois fintechs, élargissant l'offre numérique et générant 5 000 utilisateurs actifs supplémentaires.",
      },
      {
        title: "Développement commercial et partenariats stratégiques",
        text: "Gestion de grands comptes, animation du réseau commercial et déploiement d'initiatives partenariales contribuant à la croissance de l'activité.",
      },
    ],
  },

  "brice-brou": {
    tagline:
      "Communication Stratégique • Influence • Affaires Publiques • Développement Institutionnel",
    email: "brice.brou@marabu.services",
    languages: ["Français", "Anglais"],
    expertise: [
      "Communication stratégique",
      "Relations publiques",
      "Développement institutionnel",
      "Influence & réputation",
      "Communication digitale",
      "Stratégie éditoriale",
      "Événementiel stratégique",
      "Community management",
      "Branding",
      "Gestion de crise",
    ],
    figures: [
      "15+ années d'expérience",
      "400 000+ abonnés cumulés",
      "100+ contenus stratégiques",
      "50+ campagnes de communication",
      "30+ événements pilotés",
      "10+ partenariats institutionnels",
      "1 biographie officielle publiée",
      "1 fondation cofondée",
    ],
    profile: [
      "Fort de plus de 15 années d'expérience dans la communication stratégique, les relations publiques, le développement institutionnel et le pilotage de projets de communication à fort impact, Brice BROU accompagne les administrations publiques, les entreprises et les organisations dans la définition et le déploiement de leurs stratégies d'influence, de réputation et de rayonnement.",
      "Expert en communication institutionnelle, stratégie de marque, production éditoriale, relations médias, communication digitale et événementiel stratégique, il pilote des campagnes de communication, accompagne les dirigeants dans leur positionnement et conçoit des dispositifs de visibilité destinés à renforcer l'image et la notoriété des organisations.",
      "Son parcours lui confère une double expertise en stratégie de communication et en exécution opérationnelle, renforcée par la conduite de projets de grande envergure, la gestion de communautés de plusieurs centaines de milliers d'abonnés, le développement de partenariats stratégiques et l'accompagnement de dirigeants publics et privés.",
      "Au sein de MARABU, il met son expertise au service du rayonnement des institutions, du développement de la marque MARABU et de l'accompagnement des organisations dans leurs stratégies de communication, d'influence et de développement.",
    ],
    experience: [
      {
        period: "2026 – Présent",
        role: "Directeur Communication & Développement",
        org: "MARABU – Abidjan",
      },
      {
        period: "2015 – 2020",
        role: "Chef de Projet & Chargé de Communication",
        org: "AM PLUS – Paris",
      },
      {
        period: "2016 – 2020",
        role: "Consultant événementiel",
        org: "BHB Event – Paris",
      },
      {
        period: "2010 – 2018",
        role: "Gérant",
        org: "BHB Import / Export – Paris",
      },
      {
        period: "2013 – 2017",
        role: "Responsable Logistique",
        org: "BDS Office – Abidjan",
      },
      {
        period: "2014 – Présent",
        role: "Co-fondateur & Chargé de Communication",
        org: "Fondation Cœur de Kellys – France",
      },
      {
        period: "2007 – 2026",
        role: "Fondateur, Éditorial & Community Manager",
        org: "Beauté de Côte d'Ivoire",
      },
      {
        period: "2007 – 2026",
        role: "Community Manager & Stratégie Éditoriale",
        org: "Mme Marie-Thérèse Houphouët-Boigny",
      },
      {
        period: "2003 – 2005",
        role: "Conseiller Client",
        org: "Crédit Lyonnais – Reims",
      },
    ],
    education: [
      "2003 – 2004 : Maîtrise Administration Économique et Sociale – Université de Reims",
      "2001 – 2002 : DEUG Droit – Université de Reims Champagne-Ardenne",
    ],
    certifications: [
      "2014 : CFNDI – Communication Entreprise, formation certifiante",
      "2012 : CFNDI – Écrivain Public, formation certifiante",
      "2010 : CFNDI – Chargé de Projets Événementiels, formation certifiante",
    ],
    references: [
      {
        title: "Coordination de la communication digitale de AMT Trans'It",
        text: "Coordination de la stratégie de communication digitale d'AMT Trans'It, incluant la conception et le déploiement de campagnes sur les réseaux sociaux, la production de contenus éditoriaux et l'animation des communautés en ligne. Cette mission a permis de renforcer la visibilité et la notoriété de la marque dans l'écosystème du transport et de la logistique en Côte d'Ivoire, tout en consolidant son image de référence auprès de ses partenaires et clients.",
      },
      {
        title: "Supervision de la logistique chez BDS Office",
        text: "Supervision de la chaîne de distribution de matériel de bureau chez BDS Office, avec pilotage de l'optimisation des processus opérationnels et réduction des délais de livraison. Cette mission a permis de dégager des gains quantitatifs significatifs, renforçant l'efficacité globale de la structure.",
      },
      {
        title: "Conseil client dans le secteur bancaire",
        text: "Accompagnement d'une clientèle de particuliers et professionnels au sein du Crédit Lyonnais, couplé à une gestion de portefeuille et au développement des relations commerciales. Cette expérience a conféré une solide connaissance des enjeux financiers et une capacité à piloter la performance commerciale.",
      },
      {
        title:
          "Rédaction de la biographie autorisée de Marie-Thérèse Houphouët-Boigny",
        text: "Rédaction de la première biographie autorisée de la toute première Première Dame de Côte d'Ivoire, un ouvrage de valorisation patrimoniale et de devoir de mémoire, salué pour sa rigueur historique et sa contribution à la transmission de l'histoire ivoirienne. Ce projet a mobilisé un travail approfondi d'enquête et de rédaction, renforçant l'expertise en production éditoriale de haut niveau.",
      },
      {
        title: "Stratégie de marque pour Moulin Sako CI",
        text: "Accompagnement stratégique de Moulin Sako Côte d'Ivoire dans la définition et le déploiement de sa stratégie de branding, incluant la supervision de la conception de contenus et la valorisation de l'identité de la marque. Cette mission a permis de créer la notoriété de l'enseigne sur le marché ivoirien, d'accroître son engagement auprès de ses consommateurs et de consolider son positionnement en tant qu'acteur de référence.",
      },
      {
        title: "Community Management Marie-Thérèse Houphouët-Boigny",
        text: "Animation de communautés cumulées de plus de 400 000 abonnés, avec mise en œuvre d'une stratégie éditoriale rigoureuse et un travail de valorisation de l'image et du patrimoine de la Première Dame. Cette mission a démontré une maîtrise des enjeux de notoriété publique, d'influence et de gestion de réputation à très grande échelle.",
      },
      {
        title: "Co-fondation de la Fondation Cœur de Kellys",
        text: "Co-fondation d'une association dédiée à l'inclusion scolaire et sociale des enfants porteurs de handicaps physiques, sensoriels et psychiques, avec conception et déploiement de campagnes de communication ayant sensibilisé un large public. Ces actions ont permis de mobiliser des partenaires institutionnels et de faire évoluer les mentalités sur les questions d'accessibilité et d'intégration.",
      },
    ],
  },

  "kimana-misago": {
    tagline:
      "Architecture Cloud • Intelligence Artificielle • Transformation Digitale • DevOps",
    email: "kimana.misago@marabu.services",
    languages: ["Français", "Anglais"],
    expertise: [
      "Architecture Cloud",
      "DevOps & CI/CD",
      "Intelligence Artificielle",
      "Data Platform",
      "Architecture microservices",
      "Transformation digitale",
      "Cybersécurité Cloud",
      "Développement full stack",
      "Kubernetes & Docker",
      "Gouvernance technique",
    ],
    figures: [
      "10+ années d'expérience",
      "200+ entreprises desservies",
      "30 % de réduction des coûts Cloud",
      "70 % d'amélioration des performances",
      "99,9 % de disponibilité des plateformes",
      "500 K$ de budget piloté",
      "5 pays d'intervention",
      "Plusieurs plateformes nationales déployées",
    ],
    profile: [
      "Fort de plus de 10 années d'expérience dans la transformation digitale, l'architecture cloud et le développement de solutions numériques, Kimana MISAGO accompagne les administrations publiques, les entreprises privées et les organisations internationales dans la conception, la modernisation et le déploiement de plateformes technologiques à forte valeur ajoutée.",
      "Expert en architecture cloud, DevOps, intelligence artificielle, développement full-stack et automatisation des infrastructures, il pilote des projets stratégiques couvrant la modernisation des systèmes d'information, les migrations cloud, la mise en œuvre de plateformes de données, les architectures microservices et l'intégration de solutions d'IA générative.",
      "Son parcours lui confère une double expertise technique et opérationnelle, renforcée par la conduite de projets complexes, la gestion d'équipes techniques, l'optimisation des performances applicatives et la sécurisation des infrastructures numériques.",
      "Au sein de MARABU, il met son expertise au service des administrations publiques, des entreprises et des partenaires techniques dans leurs projets de transformation digitale, d'innovation technologique et de modernisation des systèmes d'information.",
    ],
    experience: [
      {
        period: "Sept. 2025 – Présent",
        role: "Manager Senior",
        org: "MARABU – Abidjan, Côte d'Ivoire",
      },
      {
        period: "Fév. 2024 – Juil. 2025",
        role: "Ingénieur Cloud Senior & PMO IT",
        org: "Digitech World Wide Inc – Abidjan, Côte d'Ivoire",
      },
      {
        period: "Avr. 2023 – Août 2023",
        role: "Développeur Full Stack Senior (freelance)",
        org: "Stuttgart, Allemagne (télétravail)",
      },
      {
        period: "Nov. 2022 – Déc. 2022",
        role: "Développeur Full Stack",
        org: "Loadstone Canada – Kapuskasing, Canada (télétravail)",
      },
      {
        period: "Juin 2021 – Août 2021",
        role: "Consultant Cloud",
        org: "Ministère de la Bonne Gouvernance – Abidjan, Côte d'Ivoire",
      },
      {
        period: "Sept. 2020 – Présent",
        role: "Projet parallèle : Co-fondateur & CEO",
        org: "MPLACES – Abidjan, Côte d'Ivoire",
      },
      {
        period: "Avr. 2018 – Fév. 2024",
        role: "Chef de Projet IT & Responsable DevOps",
        org: "Digitech Ltd – Abidjan / Lomé",
      },
      {
        period: "Avr. 2016 – Juin 2017",
        role: "Lead Web Developer",
        org: "La Poste CI – Abidjan, Côte d'Ivoire",
      },
    ],
    education: [
      "2016 : Licence en Informatique – ESCOGET Group, Abidjan",
      "2013 : Baccalauréat D – Lycée Commandant Cousteau, Abidjan",
    ],
    certifications: [
      "AWS Solutions Architect Associate (en cours)",
      "ALX-T Fullstack Nanodegree – Udacity",
      "Kubernetes and Cloud Native Essentials (LFS250) – Linux Foundation (2025)",
      "Introduction to Kubernetes (LFS158) – Linux Foundation (2025)",
      "AWS Machine Learning Foundations – Amazon Web Services",
      "Explore Generative AI with Vertex AI Gemini API – Google Cloud (2025)",
      "Develop GenAI Apps with Gemini and Streamlit – Google Cloud (2025)",
      "AWS Certified Cloud Practitioner (2022)",
      "Google Cloud Big Data & Machine Learning Fundamentals (2022)",
    ],
    references: [
      {
        title: "Formation en UX/UI",
        text: "Pilotage de bout en bout et coordination logistique de la formation en optimisation UX/UI dispensée aux directeurs techniques du Guichet Unique du Commerce Extérieur de Côte d'Ivoire.",
      },
      {
        title: "Formation en Architecture Microservice",
        text: "Pilotage de bout en bout et coordination logistique de la formation en architecture microservice dispensée aux équipes techniques du Guichet Unique du Commerce Extérieur de Côte d'Ivoire.",
      },
      {
        title: "Data platform GUCE",
        text: "Pilotage stratégique et technique du projet de mise en œuvre de la Data Plateforme du GUCE-CI, de la définition de l'architecture au déploiement des solutions de centralisation des données.",
      },
      {
        title: "ERP Ocean Core Platform",
        text: "Conception et développement de la plateforme de gestion de carburant d'Ocean Transport (Ocean Core), intégrant le suivi temps réel des ravitaillements, la gestion multi-chauffeurs et un système d'alerte d'anomalies basé sur les données GPS.",
      },
      {
        title: "Plateforme de réassurance Hyperion 2 (DIGITECH)",
        text: "Direction de la transformation digitale d'une plateforme SaaS desservant plus de 200 compagnies d'assurance, avec architecture GCP, orchestration Kubernetes et automatisation CI/CD. Résultat : réduction de 30 % des coûts serveur, amélioration de 70 % des délais opérationnels et maintien d'une disponibilité de 99,9 %.",
      },
      {
        title: "Projets freelance IA/ML (Allemagne)",
        text: "Développement d'un système automatisé de validation d'avis Google Maps utilisant des modèles ML Python, et conception d'une plateforme d'automatisation de support client avec API OpenAI. Livraison de solutions d'IA générative intégrées à des applications Laravel et React.",
      },
      {
        title: "Migration cloud – Ministère de la Bonne Gouvernance",
        text: "Conception et mise en œuvre d'une stratégie de migration AWS ayant réduit les temps d'arrêt système de 85 % et atteint 99 % de fiabilité, avec établissement d'un cadre de gouvernance cloud et de protocoles de sécurité.",
      },
      {
        title: "Co-fondation de MPLACES",
        text: "Création d'une plateforme marketplace digitale et communautaire, avec architecture Django/React et déploiement sur AWS, démontrant une capacité à mener des projets entrepreneuriaux de bout en bout.",
      },
    ],
  },

  "gilles-dogbo": {
    tagline: "Stratégie • Innovation • Performance • Développement Économique",
    email: "gilles.dogbo@marabu.services",
    languages: ["Français", "Anglais"],
    expertise: [
      "Stratégie d'entreprise",
      "Innovation",
      "Développement économique",
      "Études stratégiques",
      "Business development",
      "Transformation organisationnelle",
      "Optimisation de la performance",
      "Intelligence de marché",
      "Finance stratégique",
      "Facilitation stratégique",
    ],
    figures: [
      "14+ années d'expérience",
      "20+ missions de conseil",
      "15+ organisations accompagnées",
      "5+ livres blancs",
      "5+ publications professionnelles",
      "10+ ateliers stratégiques",
      "Plusieurs feuilles de route nationales",
      "2 MBA internationaux",
    ],
    profile: [
      "Fort de plus de 14 années d'expérience dans le conseil en stratégie, l'innovation et la transformation des organisations, Gilles DOGBO accompagne les administrations publiques, les entreprises privées et les organisations internationales dans la conception, la structuration et la mise en œuvre de projets à fort impact.",
      "Expert en stratégie d'entreprise, innovation, développement économique, intelligence de marché et optimisation de la performance, il intervient sur des missions de diagnostic stratégique, d'élaboration de feuilles de route, de conduite d'études sectorielles, de transformation organisationnelle et d'accompagnement des décideurs.",
      "Son parcours lui confère une double expertise en stratégie et en finance, renforcée par la production de livres blancs, la conduite d'études stratégiques, l'animation d'ateliers de haut niveau et le développement de recommandations destinées aux décideurs publics et privés.",
      "Au sein de MARABU, il met son expertise au service des administrations publiques, des entreprises et des partenaires techniques et financiers dans leurs projets de transformation, d'innovation et de développement économique.",
    ],
    experience: [
      {
        period: "Janv. 2026 – Présent",
        role: "Manager Stratégie",
        org: "MARABU – Abidjan, Côte d'Ivoire",
      },
      {
        period: "Avr. 2024 – Janv. 2026",
        role: "Consultant Senior en Stratégie, Innovation et Finance",
        org: "MARABU – Abidjan, Côte d'Ivoire",
      },
      {
        period: "Avr. 2021 – Présent",
        role: "Secrétaire Général",
        org: "Hope Restorers – Abidjan, Côte d'Ivoire",
      },
      {
        period: "Mai 2020 – Présent",
        role: "Écrivain-Auteur",
        org: "Amazon – En ligne",
      },
      {
        period: "Juil. 2012 – Sept. 2012",
        role: "Auditeur",
        org: "Compagnie Ivoirienne d'Électricité (CIE) – Abidjan",
      },
    ],
    education: [
      "Mai 2020 – Mars 2024 : MBA Finance – Unicaf University (Chypre)",
      "Janv. 2016 – Mars 2019 : MBA Stratégie et Innovation – Université Laval (Canada)",
      "Sept. 2009 – Nov. 2014 : Bachelor en Administration des Affaires (BAA) – Institut Britannique de Management et Technologie (Côte d'Ivoire)",
      "Août 2007 : Baccalauréat série D – Lycée Classique d'Abidjan (Côte d'Ivoire)",
    ],
    references: [
      {
        title: "Formation des équipes techniques de GUCE CI",
        text: "Planification et restitution d'une formation sur l'optimisation UX/UI destinée aux équipes techniques afin de faciliter l'amélioration de l'expérience des utilisateurs de la plateforme GUCE.",
      },
      {
        title: "MOUCHOIR BLANC",
        text: "Supervision de la création du site web de l'ONG et production de la stratégie de communication et des recommandations pour la création du Journal de l'institution.",
      },
      {
        title: "GUCE CI – Optimisation UI/UX de la plateforme GUCE",
        text: "Exécution des travaux de diagnostic et d'amélioration de l'expérience utilisateur de la plateforme. Production du rapport de visualisation des parcours utilisateurs, du diagnostic UI/UX, de la maquette dynamique de l'écran d'accueil amélioré et du plan de mise en œuvre des recommandations.",
      },
      {
        title:
          "Table Ronde sur l'Attraction des Investissements Américains dans l'Immobilier Ivoirien",
        text: "Contribution à la préparation et à la restitution des réflexions stratégiques portant sur les mécanismes d'attraction des investissements étatsuniens dans le secteur immobilier ivoirien.",
      },
      {
        title: "GUCE CI – Redynamisation du Port Community System (PCS)",
        text: "Mission dont l'objectif principal a été d'évaluer le niveau actuel de performance des modules logistiques du Guichet Unique du Commerce Extérieur de Côte d'Ivoire et de trouver des solutions pour une adoption systématique de ceux-ci par les acteurs de la chaîne logistique du commerce extérieur. Plus précisément : réalisation du diagnostic opérationnel, benchmark international et élaboration d'une feuille de route de transformation et d'un livre blanc de structuration.",
      },
      {
        title: "YANGO CI – Développement du commerce électronique en Côte d'Ivoire",
        text: "Organisation et restitution d'ateliers stratégiques multi-acteurs. Élaboration d'un livre blanc national et d'une feuille de route des initiatives stratégiques pour le développement du e-commerce.",
      },
      {
        title: "Formation des cadres dirigeants de GUCE CI",
        text: "Planification et restitution d'une formation sur le leadership agile destinée aux cadres dirigeants afin d'accompagner la transformation organisationnelle et le renforcement des capacités managériales.",
      },
      {
        title:
          "Atelier National sur l'Intégration des Chauffeurs VTC à la Protection Sociale",
        text: "Planification et restitution d'ateliers stratégiques réunissant les parties prenantes du secteur du transport numérique. Production de recommandations visant l'intégration des chauffeurs VTC dans les dispositifs de protection sociale et de couverture maladie universelle.",
      },
    ],
  },

  "bossoh-aka": {
    tagline: "Contrôle de Gestion • Finance • Stratégie",
    email: "bossoh.aka@marabu.services",
    languages: ["Français"],
    expertise: [
      "Stimuler la croissance par la finance",
      "Audit et planification financière",
      "Contrôle interne",
      "Pilotage budgétaire",
      "Restructuration organisationnelle",
    ],
    figures: [
      "8+ années d'expérience",
      "15+ organisations accompagnées",
      "20+ missions de conseil",
      "Master 2 en Comptabilité & Finance",
      "Contrôle interne CYRIAN",
      "Conseil GUDE PME",
    ],
    profile: [
      "Titulaire d'un Master en Comptabilité et Finance obtenu à PIGIER-CI, Guy Marcel AKA dispose de plus de 8 années d'expérience professionnelle en Finance, Comptabilité et Contrôle de Gestion, acquises aussi bien dans le secteur privé que dans le conseil.",
      "Son parcours lui a permis de développer une solide expertise en diagnostic financier, pilotage budgétaire, contrôle interne et restructuration organisationnelle. Il a accompagné plusieurs organisations (cabinet de conseil, multinationales, PME et institutions publiques) dans leurs projets de transformation, d'optimisation de la performance et de renforcement des procédures financières.",
      "Il occupe actuellement le poste de Manager Contrôle de Gestion au sein du Cabinet MARABU, où il intervient dans le pilotage de missions stratégiques et l'accompagnement des directions financières.",
    ],
    experience: [
      {
        period: "2024 – Présent",
        role: "Consultant en Contrôle de Gestion et Finances",
        org: "Cabinet MARABU – Abidjan, Côte d'Ivoire",
      },
      {
        period: "2023",
        role: "Contrôle Interne & Contrôle de Gestion",
        org: "Pharmacie Sainte Agathe",
      },
      {
        period: "2021 – 2022",
        role: "Assistant Consultant Contrôle de Gestion",
        org: "Cabinet BSB",
      },
      {
        period: "2018 – 2021",
        role: "Assistant Opérations",
        org: "FIN'Elle",
      },
    ],
    education: [
      "2015 – 2017 : Master 2 en Comptabilité et Finance – PIGIER-CI",
      "2012 – 2014 : Licence en Comptabilité Financière – PIGIER-CI",
      "2011 – 2012 : Baccalauréat série D – Lycée Moderne d'Aboisso",
    ],
    references: [
      {
        title:
          "Ministère de la Transformation Numérique et de la Digitalisation (MTND)",
        text: "Validation de la stratégie nationale de gestion des données et de l'IA. Vérification de la qualité et de la fiabilité des données à migrer, contrôle des dispositifs de collecte et recommandations d'amélioration.",
      },
      {
        title: "CADERAC",
        text: "Audit IT dans le cadre de l'évaluation des dispositifs de gouvernance et de sécurité des systèmes. Analyse des processus critiques, contrôle des habilitations et identification des risques liés à l'intégrité des données et à la continuité opérationnelle. Participation à l'élaboration d'un schéma directeur des systèmes d'information, comprenant le diagnostic des infrastructures existantes, la définition des besoins stratégiques, la proposition d'axes de modernisation et la mise en place d'une feuille de route opérationnelle.",
      },
      {
        title: "GUDE PME",
        text: "Élaboration des procédures de gestion budgétaire, financière et comptable dans le cadre du financement des PME par l'AFD. Conception d'un dispositif structuré de gestion des ressources, définition des circuits de validation, production des fiches projets et mise en place des livrables clés pour garantir la transparence, la traçabilité et la conformité des opérations financées.",
      },
      {
        title: "ERHAN",
        text: "Vérification de la conformité des dossiers de soumission AMI suite à l'intégration de nouvelles exigences SI. Revue des supports produits et amélioration des livrables.",
      },
      {
        title: "Pharmacie Sainte Agathe",
        text: "Audit des nouvelles procédures mises en place après déploiement d'un système de gestion intégré. Validation des circuits comptables et RH, fiabilisation des données financières migrées, analyse des indicateurs de performance et mise en place d'outils de suivi post-migration.",
      },
      {
        title: "CYRIAN International",
        text: "Contrôle du manuel de procédures mis à jour suite à la migration, test des processus restructurés et évaluation de la pertinence des tableaux de bord déployés. Revue budgétaire de la campagne café-cacao 2022/2023, contrôle de l'arrêté comptable 2021 et validation des flux financiers.",
      },
      {
        title: "FIN'Elle",
        text: "Revue des procédures opérationnelles et de caisse après migration du système transactionnel. Contrôle de la bonne application des règles de conformité, suivi de la sécurité des transactions et validation des données transférées dans le nouveau dispositif.",
      },
    ],
  },

  "issouf-ouattara": {
    tagline: "Full Stack — Applications, Automatisation, IA",
    email: "issouf.ouattara@marabu.services",
    languages: ["Français"],
    expertise: [
      "Conception d'applications web",
      "Next.js, React & TypeScript",
      "Architecture d'applications scalables",
      "Automatisation & intégration d'API",
      "Node.js & PostgreSQL",
    ],
    figures: [
      "4+ années d'expérience",
      "20+ projets web réalisés",
      "100 000+ lignes traitées (FNE)",
      "10+ API intégrées",
      "10+ applications déployées",
    ],
    profile: [
      "Développeur Full Stack et entrepreneur passionné par les technologies numériques et l'intelligence artificielle, Issouf OUATTARA conçoit des applications web modernes, automatisées et scalables en s'appuyant sur un stack JavaScript complet (Next.js, React, Node.js, TypeScript, PostgreSQL).",
      "Fort d'une expérience significative dans l'accompagnement d'entreprises vers leur transformation numérique, il intervient sur l'ensemble du cycle de vie des projets, du cadrage technique au déploiement, en passant par l'intégration d'API tierces et l'optimisation des processus métiers.",
      "Issouf OUATTARA a rejoint MARABU en 2024 en tant que Développeur Full Stack & Consultant Digital, où il met ses compétences au service du développement d'applications web, de l'automatisation de processus et de l'accompagnement des entreprises dans leur visibilité digitale.",
    ],
    experience: [
      {
        period: "2024 – Présent",
        role: "Développeur Full Stack & Consultant Digital",
        org: "MARABU – Abidjan, Côte d'Ivoire",
      },
      {
        period: "2023",
        role: "Contrat — Conception d'une application de gestion et de facturation des clients avec suivi des services et paiements, optimisant les processus et améliorant la productivité de l'entreprise",
        org: "Lassiré Déchets Services",
      },
      {
        period: "2022",
        role: "Stage professionnel — Développement d'outils internes d'automatisation et d'applications de gestion logistique, contribuant à la digitalisation des flux opérationnels",
        org: "SEA-Invest",
      },
    ],
    education: [
      "Juil. 2023 : Licence en Informatique, spécialisation Développement Web – Université des Technologies d'Abidjan (UTA)",
      "Juin 2020 : Baccalauréat série D (mention Très Bien) – GSAM Koumassi",
    ],
    references: [
      {
        title: "CADERAC – Configuration des équipements réseaux et du load balancer",
        text: "Configuration et mise en service des équipements réseau, notamment des répéteurs Wi-Fi et des routeurs assurant la connectivité Internet du site. Paramétrage d'un load balancer permettant de basculer automatiquement entre plusieurs connexions Internet afin de garantir la continuité de service en cas de défaillance d'un fournisseur ou d'une liaison. Réalisation des tests de fonctionnement, des procédures de basculement et mise en œuvre de règles de sécurité adaptées pour renforcer la disponibilité et la fiabilité du réseau.",
      },
      {
        title: "MOUCHOIR BLANC – Finalisation de la conception d'un site WordPress",
        text: "Intervention sur un projet de site web WordPress déjà initié afin d'en assurer l'achèvement et la mise en production. Réalisation des développements complémentaires, intégration des contenus et harmonisation de l'interface pour garantir une expérience utilisateur cohérente.",
      },
      {
        title: "Certification de factures FNE",
        text: "Conception d'un MVP permettant la certification en masse de factures Excel via l'API de la Facturation Normalisée ivoirienne, avec traitement de centaines de milliers de lignes. Développé avec Next.js, PostgreSQL et API REST, l'outil a permis à l'entreprise d'automatiser un processus auparavant manuel, réduisant les délais de traitement de plusieurs jours à quelques minutes.",
      },
      {
        title: "Plateforme de colocation",
        text: "Création d'une application de mise en relation pour la colocation, couvrant l'intégralité du parcours utilisateur de la recherche à la prise de contact. Développée avec Next.js, Prisma et PostgreSQL, la solution propose une expérience fluide et sécurisée, adaptée aux besoins du marché local.",
      },
      {
        title: "Système de QR codes pour avis Google",
        text: "Développement d'un système d'activation de QR codes par code alphanumérique, avec redirection automatique vers les pages d'avis Google. La solution, construite avec Next.js et une base de données relationnelle, permet aux commerçants de générer dynamiquement des QR codes pour faciliter la collecte d'avis clients.",
      },
      {
        title: "Application de covoiturage",
        text: "Conception et définition de l'architecture fonctionnelle et technique d'une plateforme de covoiturage adaptée au marché ivoirien. Réalisée avec Next.js, l'application intègre une approche produit centrée utilisateur, avec des fonctionnalités de recherche, de mise en relation et de gestion de trajets.",
      },
    ],
  },

  "souleymane-coulibaly": {
    tagline: "UI/UX • Infographie • Création Visuelle",
    /*
     * Le CV source ne porte qu'une adresse personnelle (Outlook) : elle n'est
     * pas reprise ici. À renseigner dès qu'une adresse @marabu.services existe.
     */
    languages: ["Français"],
    expertise: [
      "Conception d'identités visuelles",
      "UI/UX & infographie",
      "Design graphique & identité de marque",
      "Marketing digital & communication",
      "Développement front-end",
    ],
    figures: [
      "5+ années d'expérience",
      "5+ missions de conception",
      "1000+ dossiers traités (SIGFU)",
      "4 secteurs d'activité",
    ],
    profile: [
      "Passionné par le design et les technologies numériques, Nourgo COULIBALY est un créatif polyvalent spécialisé en design graphique, conception UI/UX et infographie, avec une solide expertise complémentaire en marketing digital, développement front-end et publicité en ligne. Curieux et investi dans l'exploration de l'intelligence artificielle et de son impact sur l'évolution du design, il met sa créativité au service de projets innovants, en concevant des identités visuelles percutantes et des expériences utilisateur fluides.",
      "Il a rejoint le cabinet MARABU en mai 2025 en tant que Consultant Junior (Designer UI/UX / Infographie), où il est en charge de l'ensemble des conceptions visuelles pour MARABU et ses clients. Fort de ses expériences antérieures au sein du projet SIGFU, au Ministère de la Construction et chez Madata, il apporte une vision à 360° alliant esthétique, performance et stratégie digitale.",
    ],
    experience: [
      {
        period: "Depuis mai 2025",
        role: "Consultant Junior (Designer UI/UX / Infographie)",
        org: "MARABU – Abidjan, Côte d'Ivoire",
      },
      {
        period: "Déc. 2024 – Mars 2025",
        role: "Designer UI/UX",
        org: "MADATA – Abidjan, Côte d'Ivoire",
      },
      {
        period: "Mars – Août 2024",
        role: "Stagiaire Développeur Web & Informaticien Réseau",
        org: "Ministère de la Construction, du Logement et de l'Urbanisme (MCLU) – DMISSA, Abidjan, Côte d'Ivoire",
      },
      {
        period: "Janv. 2021 – Nov. 2023",
        role: "Agent Conversion de Données Textuelles",
        org: "Projet SIGFU (Système Intégré de Gestion du Foncier Urbain) – Abidjan, Côte d'Ivoire",
      },
    ],
    education: ["BTS & Licence Professionnelle – HETEC Abidjan (2018 – 2021)"],
    certifications: [
      "Certification PMI (Marketing Digital) – En ligne (déc. 2023)",
      "Certification Microsoft (Cybersécurité) – En ligne (déc. 2023)",
    ],
    references: [
      {
        title: "MSCI",
        text: "Conception et création d'identité de marque (logo, branding) et conception visuelle pour l'usine de production MSCI et leur farine MAGIC.",
      },
      {
        title: "YANGO",
        text: "Conception et création de visuels et assistance conception 3D pour l'événement YANGO HUB Abidjan.",
      },
      {
        title: "AMT Transit",
        text: "Conception et création de visuels pour la communication digitale d'AMT Transit.",
      },
      {
        title: "Insight Financial (événement)",
        text: "Conception et création de visuels pour l'ouverture officielle des bureaux d'Insight Financial.",
      },
      {
        title: "Création de l'identité visuelle de Madata",
        text: "Conception de l'ensemble de l'univers graphique d'une start-up (site web WordPress, maquettes application, icônes, supports imprimables). Réalisation d'une charte graphique cohérente qui a renforcé la reconnaissance de la marque et accompagné son lancement sur le marché.",
      },
      {
        title: "Magazine corporate MARABU",
        text: "Conception intégrale d'un magazine institutionnel (infographies, illustrations, mise en page) présentant les réalisations et l'offre de services du cabinet. Le document a été utilisé comme support de prospection auprès des partenaires et institutions, contribuant à renforcer l'image de marque de MARABU.",
      },
      {
        title: "Application web pour le MCLU",
        text: "Développement et déploiement d'une application de gestion interne pour le service informatique du ministère de la Construction, incluant la conception de l'interface utilisateur et l'administration réseau. L'outil a permis de digitaliser des processus auparavant manuels, réduisant les délais de traitement de 30 %.",
      },
      {
        title: "Projet SIGFU",
        text: "Participation à la conversion numérique de milliers de dossiers fonciers dans le cadre du projet pilote du Système Intégré de Gestion du Foncier Urbain à Abidjan. Contribution à la structuration des données et à la mise en place des bases de données, dans un contexte de projet public à forte exigence de qualité et de délais.",
      },
    ],
  },
};
