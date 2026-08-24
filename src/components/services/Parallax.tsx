import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import coris2 from "../../assets/coris2.webp";
import bgLoader from "../../assets/imgs/Cauris-bg.webp";

/**
 * Visuels en parallaxe de la page Services : le bandeau d'ouverture et les
 * images intercalées. Même principe dans les deux cas — l'image est agrandie
 * de 10 % puis translatée au scroll, la marge d'échelle évitant les bords
 * vides en haut et en bas de course.
 */
export function ParallaxHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden h-[40vh] min-h-[280px] md:h-[60vh] md:min-h-[400px]"
    >
      <motion.img
        src={bgLoader}
        alt=""
        style={{ y }}
        className="absolute inset-0 w-full h-full object-cover object-center scale-110"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {[
        { top: "15%", left: "5%", size: 140, rotate: 20, opacity: 0.08 },
        { top: "60%", left: "2%", size: 110, rotate: -35, opacity: 0.06 },
        { top: "20%", left: "88%", size: 130, rotate: 50, opacity: 0.07 },
        { top: "65%", left: "92%", size: 100, rotate: -15, opacity: 0.05 },
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
            filter: "brightness(2)",
          }}
        />
      ))}
    </section>
  );
}

/** Image d'illustration, parallaxe plus discrète que le bandeau. */
export function ParallaxImage({
  src,
  alt,
  height = 260,
}: {
  src: string;
  alt: string;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ height }}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="absolute inset-0 w-full h-full object-cover scale-110"
      />
    </div>
  );
}
