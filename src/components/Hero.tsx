import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { FadeIn } from "./ui/fade-in";
import img1 from "../assets/imgs/conseils/conseil-marabu.webp";
import img2 from "../assets/imgs/services/services-marabu.webp";
import img3 from "../assets/imgs/intermediation/intermediation-marabu.webp";
// import coris2 from "../assets/coris2.webp";

/*
  Longueur du rail de scroll du panneau, en écrans (`svh`). Le panneau reste
  collé pendant `RAIL - 1` écrans : un écran est consommé par son entrée dans
  le champ, un autre par sa sortie. C'est cette fenêtre collée qui doit
  contenir les trois visuels.

  Le rail valait 3,5 écrans, soit près de 4,5 écrans de défilement avant le
  premier contenu de la page — agréable à la découverte, long dès la deuxième
  visite. À 2,4, chaque visuel dispose encore d'environ un demi-écran de
  défilement, assez pour être lu sans que la séquence traîne.
*/
const RAIL = 2.4;

/*
  `useScroll` mesure la progression sur `RAIL + 1` écrans (hauteur du rail +
  hauteur de la fenêtre). Le panneau est plein cadre entre `PIN_START` et
  `PIN_END` ; les trois visuels se partagent cette fenêtre à parts égales, le
  fondu débordant de part et d'autre de chaque frontière. Tout est dérivé de
  `RAIL` : changer le rail suffit, les fondus suivent.
*/
const PIN_START = 1 / (RAIL + 1);
const PIN_END = RAIL / (RAIL + 1);
const SLIDE = (PIN_END - PIN_START) / 3;
const FADE = SLIDE * 0.55;
const CUT_1 = PIN_START + SLIDE;
const CUT_2 = PIN_START + SLIDE * 2;

export default function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  /*
    La marge autour du visuel se resserre au scroll. Elle est exprimée en
    proportion (1 → 0) d'une variable CSS `--hero-gap` : 40px en `wide`, 0 hors
    `wide` où la mise en page carte gère elle-même ses marges (une marge animée
    aurait fini par coller le texte au bord de l'écran).
  */
  const gapProgress = useTransform(scrollYProgress, [0.1, 0.9], [1, 0]);
  const edgeGap = useMotionTemplate`calc(var(--hero-gap) * ${gapProgress})`;
  // Les coins sont carrés au moment où le panneau devient plein cadre.
  const borderRadius = useTransform(
    scrollYProgress,
    [PIN_START * 0.4, PIN_START],
    ["1rem", "0rem"],
  );

  const opacity1 = useTransform(
    scrollYProgress,
    [CUT_1 - FADE / 2, CUT_1 + FADE / 2],
    [1, 0],
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [CUT_1 - FADE / 2, CUT_1 + FADE / 2, CUT_2 - FADE / 2, CUT_2 + FADE / 2],
    [0, 1, 1, 0],
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [CUT_2 - FADE / 2, CUT_2 + FADE / 2],
    [0, 1],
  );

  /*
    Les trois volets sont superposés : celui qui est encore transparent
    resterait au-dessus et capterait le clic destiné au volet visible. On
    n'ouvre les événements de pointeur qu'au volet réellement lisible.
  */
  const clickable1 = useTransform(opacity1, (o) => (o > 0.5 ? "auto" : "none"));
  const clickable2 = useTransform(opacity2, (o) => (o > 0.5 ? "auto" : "none"));
  const clickable3 = useTransform(opacity3, (o) => (o > 0.5 ? "auto" : "none"));

  const images = t("hero.images", { returnObjects: true }) as {
    subtitle: string;
    title: string;
    desc: string;
  }[];

  const slides = [
    {
      src: img1,
      opacity: opacity1,
      pointerEvents: clickable1,
      to: "/services#conseil",
    },
    {
      src: img2,
      opacity: opacity2,
      pointerEvents: clickable2,
      to: "/services#services",
    },
    {
      src: img3,
      opacity: opacity3,
      pointerEvents: clickable3,
      to: "/services#intermediation",
    },
  ];

  return (
    <motion.section
      id="home"
      /*
        `overflow-x-clip` (et non `hidden`, qui casserait le `position: sticky`
        du panneau) : le plein-bleed `100vw` déborde de la largeur utile quand
        le navigateur affiche une scrollbar classique, d'où un scroll
        horizontal parasite sur desktop.
      */
      className="pt-32 pb-10 maxwidth mx-auto px-6 overflow-x-clip"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <div style={{ position: "relative", overflowX: "hidden" }}>
        <FadeIn>
          <h1 className="text-[clamp(2rem,8vw,3.75rem)] leading-tight text-[#1d454c]">
            {t("hero.tagline1")} <br />
            <span style={{ color: "#538253" }}>{t("hero.tagline2")}</span>
          </h1>
        </FadeIn>

        <div className="mt-5 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <FadeIn delay={0.12}>
            <p className="text-lg text-gray-600">{t("hero.description")}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              to="/contact"
              className="block border border-[#1d454c] text-gray-700 text-xs uppercase tracking-[0.2em] px-8 py-3 hover:bg-[#1d454c] hover:text-[#ecede3] transition-all duration-300 w-fit whitespace-nowrap"
            >
              {t("hero.cta")}
            </Link>
          </FadeIn>
        </div>
      </div>

      <div
        ref={containerRef}
        className="mt-10"
        style={{ height: `${RAIL * 100}svh` }}
      >
        {/*
          `100svh` plutôt que `100vh` : sur mobile, 100vh vaut la hauteur écran
          barre d'URL rétractée, ce qui poussait le bas du panneau (le texte)
          hors du champ visible tant que la barre est déployée.
        */}
        <div
          className="sticky top-0 h-svh overflow-hidden [--hero-gap:0px] wide:[--hero-gap:2.5rem]"
          style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
        >
          {slides.map(({ src, opacity, pointerEvents, to }, i) => (
            <motion.div
              key={src}
              /*
                Écran étroit ou portrait : colonne centrée (visuel au ratio 4/3
                puis texte en dessous). En `wide`, les enfants repassent en
                absolu pour retrouver le visuel plein cadre avec texte en
                surimpression.
              */
              className="absolute flex flex-col justify-center overflow-hidden px-5 wide:block wide:px-0"
              style={{
                top: edgeGap,
                right: edgeGap,
                bottom: edgeGap,
                left: edgeGap,
                borderRadius,
                opacity,
                pointerEvents,
              }}
            >
              {/*
                Hors `wide`, le cadre plein écran est très portrait alors que
                les visuels sont en 1920×1280 : `cover` en rognait jusqu'à 60 %
                de la largeur (sujets coupés). Le ratio 4/3 ramène le rognage à
                une dizaine de pourcents. `max-h` protège le cas paysage court
                (téléphone couché), où 4/3 dépasserait la hauteur du panneau.
              */}
              <div
                className="w-full aspect-4/3 max-h-[55svh] rounded-2xl wide:absolute wide:inset-0 wide:max-h-none wide:aspect-auto wide:rounded-none"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <div className="absolute inset-0 hidden bg-linear-to-t from-black/65 via-black/15 to-transparent wide:block" />

              <div className="mt-6 wide:absolute wide:bottom-12 wide:left-12 wide:mt-0">
                {/*
                  Chaque volet mène à la section correspondante de la page
                  Services (`/services#conseil`, etc.). Le lien porte le bloc
                  de texte plutôt que le panneau entier : un panneau plein
                  cadre cliquable transformerait le moindre clic pendant le
                  défilement en changement de page.
                */}
                <Link to={to} className="group block no-underline">
                  <p className="text-[#1d454c]/60 text-xs uppercase tracking-[0.2em] mb-3 wide:text-white/55">
                    {images[i]?.subtitle}
                  </p>
                  <h2 className="text-[#1d454c] text-2xl font-light leading-snug underline-offset-4 decoration-1 group-hover:underline wide:text-white wide:text-3xl">
                    {images[i]?.title}
                  </h2>
                  <p className="mt-3 text-gray-600 text-sm max-w-sm wide:text-white/70">
                    {images[i]?.desc}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#538253] wide:text-white/80">
                    {t("hero.discover")}
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
