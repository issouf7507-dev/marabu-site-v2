import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
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

  const edgeGap = useTransform(scrollYProgress, [0.1, 0.9], [40, 0]);
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

  return (
    <motion.section
      id="home"
      className="pt-32 pb-10 maxwidth mx-auto px-6"
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

      <div ref={containerRef} className="mt-10 h-[350vh]">
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
        >
          {/* Image 1 */}
          <motion.div
            className="absolute overflow-hidden"
            style={{
              top: edgeGap,
              right: edgeGap,
              bottom: edgeGap,
              left: edgeGap,
              borderRadius,
              opacity: opacity1,
              backgroundImage: `url(${img1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
              <p className="text-white/55 text-xs uppercase tracking-[0.2em] mb-3">
                {images[0]?.subtitle}
              </p>
              <h2 className="text-white text-3xl font-light leading-snug">
                {images[0]?.title}
              </h2>
              <p className="mt-3 text-white/70 text-sm max-w-sm">
                {images[0]?.desc}
              </p>
            </div>
          </motion.div>

          {/* Image 2 */}
          <motion.div
            className="absolute overflow-hidden"
            style={{
              top: edgeGap,
              right: edgeGap,
              bottom: edgeGap,
              left: edgeGap,
              borderRadius,
              opacity: opacity2,
              backgroundImage: `url(${img2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
              <p className="text-white/55 text-xs uppercase tracking-[0.2em] mb-3">
                {images[1]?.subtitle}
              </p>
              <h2 className="text-white text-3xl font-light leading-snug">
                {images[1]?.title}
              </h2>
              <p className="mt-3 text-white/70 text-sm max-w-sm">
                {images[1]?.desc}
              </p>
            </div>
          </motion.div>

          {/* Image 3 */}
          <motion.div
            className="absolute overflow-hidden"
            style={{
              top: edgeGap,
              right: edgeGap,
              bottom: edgeGap,
              left: edgeGap,
              borderRadius,
              opacity: opacity3,
              backgroundImage: `url(${img3})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/15 to-transparent" />

            <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12">
              <p className="text-white/55 text-xs uppercase tracking-[0.2em] mb-3">
                {images[2]?.subtitle}
              </p>
              <h2 className="text-white text-3xl font-light leading-snug">
                {images[2]?.title}
              </h2>
              <p className="mt-3 text-white/70 text-sm max-w-sm">
                {images[2]?.desc}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
