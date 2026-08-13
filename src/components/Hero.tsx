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
  const borderRadius = useTransform(
    scrollYProgress,
    [0.1, 0.35],
    ["1rem", "0rem"],
  );

  const opacity1 = useTransform(scrollYProgress, [0.25, 0.38], [1, 0]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.25, 0.38, 0.62, 0.72],
    [0, 1, 1, 0],
  );
  const opacity3 = useTransform(scrollYProgress, [0.62, 0.72], [0, 1]);

  const images = t("hero.images", { returnObjects: true }) as {
    subtitle: string;
    title: string;
    desc: string;
  }[];

  const slides = [
    { src: img1, opacity: opacity1 },
    { src: img2, opacity: opacity2 },
    { src: img3, opacity: opacity3 },
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

      <div ref={containerRef} className="mt-10 h-[350svh]">
        {/*
          `100svh` plutôt que `100vh` : sur mobile, 100vh vaut la hauteur écran
          barre d'URL rétractée, ce qui poussait le bas du panneau (le texte)
          hors du champ visible tant que la barre est déployée.
        */}
        <div
          className="sticky top-0 h-svh overflow-hidden [--hero-gap:0px] wide:[--hero-gap:2.5rem]"
          style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
        >
          {slides.map(({ src, opacity }, i) => (
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
                <p className="text-[#1d454c]/60 text-xs uppercase tracking-[0.2em] mb-3 wide:text-white/55">
                  {images[i]?.subtitle}
                </p>
                <h2 className="text-[#1d454c] text-2xl font-light leading-snug wide:text-white wide:text-3xl">
                  {images[i]?.title}
                </h2>
                <p className="mt-3 text-gray-600 text-sm max-w-sm wide:text-white/70">
                  {images[i]?.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
