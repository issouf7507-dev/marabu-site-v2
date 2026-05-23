import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "./ui/fade-in";
import img1 from "../assets/imgs/marabu_conseil_accueil.jpg";
import img2 from "../assets/imgs/marabu_services_accueil.png";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const edgeGap = useTransform(scrollYProgress, [0.1, 0.9], [40, 0]);
  const borderRadius = useTransform(scrollYProgress, [0.1, 0.35], ["1rem", "0rem"]);

  // 3-image cross-fade sequence
  const opacity1 = useTransform(scrollYProgress, [0.25, 0.38], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.25, 0.38, 0.62, 0.72], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.62, 0.72], [0, 1]);

  return (
    <section
      id="home"
      className="pt-32 pb-10 max-w-[1800px] mx-auto"
    >

      <div>
        <FadeIn>
          <h1 className="text-6xl">L'expertise qui transforme <br /> vos ambitions en impact durable.</h1>
        </FadeIn>

        <div className="mt-5 flex justify-between items-end">
          <FadeIn delay={0.12}>
            <p className="text-lg">Du conseil stratégique à l'intermédiation internationale, <br />
              Marabu Services accompagne entreprises et institutions <br />
              dans leur transformation, leur rayonnement et leur influence.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a href="#" className="block border p-2">
              Get in touch
            </a>
          </FadeIn>
        </div>
      </div>

      {/* Scroll container — 350vh for 3 images */}
      <div ref={containerRef} className="mt-10 h-[350vh]">
        {/* breakout of max-w container so the full-screen state covers 100vw */}
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
        >
          {/* Image 1 — Conseil */}
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
              <p className="text-white/55 text-xs uppercase tracking-[0.2em] mb-3">Stratégie · Transformation · Gouvernance</p>
              <h2 className="text-white text-3xl font-light leading-snug">
                Conseil
              </h2>
              <p className="mt-3 text-white/70 text-sm max-w-sm">
                Des solutions sur mesure pour accompagner les entreprises et institutions dans leur croissance durable.
              </p>
            </div>
          </motion.div>

          {/* Image 2 — Services */}
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
              <p className="text-white/55 text-xs uppercase tracking-[0.2em] mb-3">Formation · Communication · Événements</p>
              <h2 className="text-white text-3xl font-light leading-snug">
                Services
              </h2>
              <p className="mt-3 text-white/70 text-sm max-w-sm">
                Des dispositifs opérationnels pour renforcer votre visibilité, vos équipes et votre rayonnement.
              </p>
            </div>
          </motion.div>

          {/* Image 3 — Intermédiation (placeholder) */}
          <motion.div
            className="absolute overflow-hidden"
            style={{
              top: edgeGap,
              right: edgeGap,
              bottom: edgeGap,
              left: edgeGap,
              borderRadius,
              opacity: opacity3,
              background: "linear-gradient(135deg, #0f1c2e 0%, #1a3a4a 40%, #0d2b38 70%, #0a1520 100%)",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12">
              <p className="text-white/55 text-xs uppercase tracking-[0.2em] mb-3">Institutions · Diplomatie · Partenariats</p>
              <h2 className="text-white text-3xl font-light leading-snug">
                Intermédiation
              </h2>
              <p className="mt-3 text-white/70 text-sm max-w-sm">
                Relations gouvernementales, diplomatie privée et alliances internationales pour accroître votre influence.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
