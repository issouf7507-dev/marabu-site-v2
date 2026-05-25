import { motion } from "framer-motion";
import FlowArt, { FlowSection } from "./ui/story-scroll";
import { FadeIn } from "./ui/fade-in";
import img1 from "../assets/imgs/marabu_conseil_accueil.jpg";
import img2 from "../assets/imgs/marabu_services_accueil.png";
import coris2 from "../assets/coris2.png";

const ITEM_H = 300;
const GAP = 14;
const REEL_W = 320;

function VerticalReel({
  images,
  tilt = -5,
}: {
  images: string[];
  tilt?: number;
}) {
  const looped = [...images, ...images];
  const loopH = images.length * (ITEM_H + GAP);

  return (
    <div
      style={{
        position: "absolute",
        right: "4vw",
        top: 0,
        bottom: 0,
        width: REEL_W,
        overflow: "hidden",
        transform: `rotate(${tilt}deg) scaleY(1.08)`,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <motion.div
        style={{ display: "flex", flexDirection: "column", gap: GAP }}
        animate={{ y: [0, -loopH] }}
        transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
      >
        {looped.map((src, i) => (
          <div
            key={i}
            style={{
              width: REEL_W,
              height: ITEM_H,
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const services = [
  {
    index: "01",
    name: "Conseil",
    tagline: "On vous aide à prendre les bonnes décisions.",
    description:
      "Stratégie, transformation, gouvernance — aux côtés des dirigeants qui veulent avancer avec méthode et exigence.",
    tags: [
      "Stratégie",
      "Transformation",
      "Gouvernance",
      "Gestion du changement",
    ],
    images: [img1, img2, img1, img2],
    bg: "#009689",
    accent: "#f1f1f1",
  },
  {
    index: "02",
    name: "Services",
    tagline: "On fait le travail avec vous.",
    description:
      "Formation, communication, événements — des dispositifs opérationnels pour renforcer vos équipes et amplifier votre impact.",
    tags: ["Formation", "Communication", "Événements", "Contenus"],
    images: [img2, img1, img2, img1],
    bg: "#edf2d0",
    accent: "#000",
  },
  {
    index: "03",
    name: "Intermédiation",
    tagline: "On vous ouvre les portes qui comptent.",
    description:
      "Relations gouvernementales, diplomatie privée, partenariats internationaux — Marabu agit en coulisses avec discrétion et méthode.",
    tags: ["Relations gov.", "Diplomatie", "Partenariats PTF", "Influence"],
    images: [img1, img2, img1, img2],
    bg: "#224851",
    accent: "#f5ede4",
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="maxwidth mx-auto px-6 pt-24 pb-10">
        <div className="flex items-end justify-between mb-16">
          <FadeIn>
            <p className="text-[clamp(2.2rem,6vw,4.5rem)] uppercase tracking-[0.25em] text-[#009689]">
              Nos services
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl font-light max-w-md text-right leading-snug text-gray-900">
              Trois expertises,
              <br />
              un seul engagement.
            </h2>
          </FadeIn>
        </div>
      </div>

      <FlowArt aria-label="Services Marabu">
        {services.map((s) => (
          <FlowSection
            key={s.index}
            aria-label={s.name}
            style={{ backgroundColor: s.bg, color: s.accent }}
          >
            {/* Large centered coris */}
            <img
              src={coris2}
              alt=""
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "55%",
                maxWidth: 600,
                opacity: 0.22,
                pointerEvents: "none",
                userSelect: "none",
                objectFit: "contain",
              }}
            />

            {/* Scattered coris decoration */}
            {[
              { top: "8%", left: "6%", size: 90, rotate: 15, opacity: 0.35 },
              { top: "18%", left: "38%", size: 60, rotate: -30, opacity: 0.28 },
              { top: "5%", left: "62%", size: 75, rotate: 55, opacity: 0.32 },
              { top: "42%", left: "12%", size: 110, rotate: -10, opacity: 0.3 },
              { top: "55%", left: "45%", size: 50, rotate: 80, opacity: 0.25 },
              { top: "70%", left: "22%", size: 80, rotate: 40, opacity: 0.35 },
              { top: "78%", left: "55%", size: 65, rotate: -50, opacity: 0.28 },
              { top: "30%", left: "72%", size: 95, rotate: 20, opacity: 0.3 },
              { top: "88%", left: "8%", size: 55, rotate: 70, opacity: 0.25 },
              { top: "60%", left: "80%", size: 70, rotate: -25, opacity: 0.32 },
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

            {/* Full-height reel — absolute on the right */}
            <VerticalReel images={s.images} tilt={-5} />

            {/* Top row */}
            <div
              className="flex items-start justify-between"
              style={{ paddingRight: REEL_W + 40 }}
            >
              <span className="text-[clamp(2.2rem,6vw,5.5rem)] uppercase tracking-[0.25em] opacity-40">
                {s.name}
              </span>
              {/* <span className="text-xs uppercase tracking-[0.25em] opacity-40">
                Marabu Services
              </span> */}
            </div>

            {/* Center — tagline */}
            <div style={{ paddingRight: REEL_W + 40 }}>
              <h3 className="text-[clamp(2.2rem,6vw,3.5rem)] font-light leading-tight">
                {s.tagline}
              </h3>
            </div>

            {/* Bottom — description + tags */}
            <div
              className="flex flex-col gap-5"
              style={{ paddingRight: REEL_W + 40 }}
            >
              <p className="text-base opacity-60 leading-relaxed max-w-md">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ border: "1px solid currentColor", opacity: 0.5 }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FlowSection>
        ))}
      </FlowArt>
    </section>
  );
}
