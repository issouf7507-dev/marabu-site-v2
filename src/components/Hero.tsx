import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FadeIn } from "./ui/fade-in";
import img1 from "../assets/imgs/marabu_conseil_accueil.jpg";
import img2 from "../assets/imgs/marabu_services_accueil.png";
import coris2 from "../assets/coris2.png";

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
      className="pt-32 pb-10 maxwidth mx-auto"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <div style={{ position: "relative" }}>
        {[
          { top: "-18px", left: "48%", size: 70, rotate: 25, opacity: 0.35 },
          { top: "10px", left: "72%", size: 50, rotate: -40, opacity: 0.28 },
          { top: "55px", left: "88%", size: 85, rotate: 60, opacity: 0.32 },
          { top: "-10px", left: "92%", size: 45, rotate: 10, opacity: 0.25 },
          { top: "80px", left: "60%", size: 60, rotate: -15, opacity: 0.3 },
          { top: "120px", left: "80%", size: 55, rotate: 80, opacity: 0.22 },
        ].map((c, i) => (
          <img
            key={i}
            src={coris2}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              top: c.top,
              left: c.left,
              width: c.size,
              height: c.size,
              opacity: c.opacity,
              transform: `rotate(${c.rotate}deg)`,
              objectFit: "contain",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        ))}

        <FadeIn>
          <h1 className="text-6xl leading-tight text-gray-900">
            {t("hero.tagline1")} <br />
            <span style={{ color: "#538253" }}>{t("hero.tagline2")}</span>
          </h1>
        </FadeIn>

        <div className="mt-5 flex justify-between items-end">
          <FadeIn delay={0.12}>
            <p className="text-lg text-gray-500">{t("hero.description")}</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a
              href="#contact"
              className="block border border-[#1d454c] text-gray-500 text-xs uppercase tracking-[0.2em] px-8 py-3 hover:bg-[#1d454c] hover:text-[#ecede3] transition-all duration-300 w-fit"
            >
              {t("hero.cta")}
            </a>
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
            <div className="absolute bottom-12 left-12">
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
            <div className="absolute bottom-12 left-12">
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
              background:
                "linear-gradient(135deg, #0f2a2e 0%, #1d454c 40%, #152f35 70%, #0a1d21 100%)",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            {[
              { top: "12%", left: "15%", size: 100, rotate: 20, opacity: 0.4 },
              { top: "5%", left: "50%", size: 70, rotate: -35, opacity: 0.35 },
              { top: "20%", left: "75%", size: 90, rotate: 55, opacity: 0.38 },
              { top: "50%", left: "30%", size: 60, rotate: -10, opacity: 0.3 },
              { top: "65%", left: "65%", size: 80, rotate: 70, opacity: 0.35 },
              { top: "75%", left: "10%", size: 55, rotate: 45, opacity: 0.28 },
              { top: "40%", left: "85%", size: 65, rotate: -60, opacity: 0.32 },
            ].map((c, i) => (
              <img
                key={i}
                src={coris2}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: c.top,
                  left: c.left,
                  width: c.size,
                  height: c.size,
                  opacity: c.opacity,
                  transform: `rotate(${c.rotate}deg)`,
                  objectFit: "contain",
                  pointerEvents: "none",
                  userSelect: "none",
                  filter: "brightness(2)",
                }}
              />
            ))}
            <div className="absolute bottom-12 left-12">
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
