import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "./ui/fade-in";
import conseil4 from "../assets/imgs/conseils/conseil-4.jpg";
import erepution from "../assets/imgs/formation-e-reputation.jpg";
import inter1 from "../assets/imgs/intermediation/intermediation-1.jpg";
const cases = [
  {
    id: "01",
    category: "Événementiel",
    categoryColor: "#b07d5a",
    client: "Yango",
    project:
      "Marabu, architecte de l'inauguration du siège national de Yango Côte d'Ivoire",
    description:
      "Conception, organisation et coordination globale de l'inauguration du siège national de Yango à Abidjan — scénographie, logistique, communication événementielle et coordination protocolaire.",
    metric: "24 Août",
    metricLabel: "2025",
    year: "2025",
    image: conseil4,
  },
  {
    id: "02",
    category: "Formation",
    categoryColor: "#1a1a1a",
    client: "GUCE CI",
    project: "Formation E-réputation & Communication de Crise",
    description:
      "Animation d'une session de formation stratégique dédiée à l'e-réputation et la communication de crise pour les responsables du Guichet Unique du Commerce Extérieur de Côte d'Ivoire, en 5 modules animés par des experts.",
    metric: "5",
    metricLabel: "modules de formation",
    year: "2025",
    image: erepution,
  },
  {
    id: "03",
    category: "Intermédiation",
    categoryColor: "#5a3728",
    client: "GUCE CI",
    project:
      "Tournée stratégique auprès des Partenaires Techniques et Financiers",
    description:
      "Accompagnement du GUCE CI dans une tournée stratégique auprès des Partenaires Techniques et Financiers internationaux, dont l'ambassade de Turquie, pour promouvoir la dématérialisation du commerce extérieur en Côte d'Ivoire.",
    metric: "Mai 2024",
    metricLabel: "Tournée PTF",
    year: "2024",
    image: inter1,
  },
  // {
  //   id: "04",
  //   category: "Formation",
  //   categoryColor: "#b07d5a",
  //   client: "GUCE CI",
  //   project: "Formation E-réputation & Communication de Crise",
  //   description:
  //     "Animation d'une session de formation stratégique en 5 modules à l'hôtel Mövenpick d'Abidjan, couvrant l'e-réputation institutionnelle, la gestion de crise digitale, la veille stratégique et la reconstruction d'image post-crise.",
  //   metric: "27 Juin",
  //   metricLabel: "2025",
  //   year: "2025",
  //   image: null,
  // },
];

const categoryTag = {
  Conseil: { bg: "#f5ede4", text: "#b07d5a", placeholder: "#e8d5c0" },
  Services: { bg: "#e8e8e8", text: "#1a1a1a", placeholder: "#d0d0d0" },
  Intermédiation: { bg: "#e8dbd6", text: "#5a3728", placeholder: "#d4c0b8" },
  Événementiel: { bg: "#e4f0ed", text: "#009689", placeholder: "#c0ddd9" },
  Formation: { bg: "#eaf0f8", text: "#2a5298", placeholder: "#c8d8ee" },
} as const;

export default function CaseStudies() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mouseY, setMouseY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouseY(e.clientY - rect.top);
  };

  return (
    <section id="case-studies" className="py-24 maxwidth mx-auto px-6">
      {/* Header */}
      <div className="grid grid-cols-[1fr_2fr] gap-24 items-end mb-20">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-900">
            Client Success Stories
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-4xl font-light leading-snug">
            Des résultats mesurables,
            <br />
            des partenariats durables.
          </h2>
        </FadeIn>
      </div>

      {/* Cases */}
      <div
        className="border-t border-black/10 relative"
        onMouseMove={handleMouseMove}
      >
        {cases.map((c, i) => {
          const tag = categoryTag[c.category as keyof typeof categoryTag];
          const isHovered = hoveredId === c.id;

          return (
            <motion.div
              key={c.id}
              className="group border-b border-black/10 py-10 grid grid-cols-[80px_1fr_auto] gap-10 items-start cursor-default relative"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0, 0, 1],
                delay: i * 0.08,
              }}
              onMouseEnter={() => setHoveredId(c.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Ghost number */}
              <span className="text-5xl font-light text-[#009689] leading-none mt-1 select-none">
                {c.id}
              </span>

              {/* Main content */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                    style={{ backgroundColor: tag.bg, color: tag.text }}
                  >
                    {c.category}
                  </span>
                  <span className="text-xs text-black/30">{c.year}</span>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">
                    {c.client}
                  </p>
                  <h3 className="text-2xl font-light leading-snug group-hover:translate-x-2 transition-transform duration-300 text-gray-900">
                    {c.project}
                  </h3>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed max-w-xl">
                  {c.description}
                </p>
              </div>

              {/* Metric */}
              <div className="text-right pt-1">
                <p className="text-4xl font-light leading-none">{c.metric}</p>
                <p className="text-xs text-black/40 mt-2 uppercase tracking-wider">
                  {c.metricLabel}
                </p>
              </div>

              {/* Hover image reveal */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="absolute right-0 pointer-events-none z-20 overflow-hidden rounded-xl shadow-2xl"
                    style={{
                      width: 280,
                      height: 180,
                      top: "50%",
                      translateY: "-50%",
                    }}
                    initial={{ opacity: 0, scale: 0.88, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.88, x: 20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {c.image ? (
                      <img
                        src={c.image}
                        alt={c.project}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex flex-col items-center justify-center gap-2"
                        style={{ backgroundColor: tag.placeholder }}
                      >
                        <span
                          className="text-xs uppercase tracking-[0.2em] opacity-50"
                          style={{ color: tag.text }}
                        >
                          {c.category}
                        </span>
                        <span
                          className="text-3xl font-light"
                          style={{ color: tag.text }}
                        >
                          {c.metric}
                        </span>
                        <span
                          className="text-xs opacity-50 uppercase tracking-wider"
                          style={{ color: tag.text }}
                        >
                          {c.metricLabel}
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
