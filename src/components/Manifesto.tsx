import { motion } from 'framer-motion';
import bg from '../assets/imgs/marabu_conseil_accueil.jpg';

const lines = [
  'Conseillers, médiateurs',
  'et gardiens de la connaissance.',
];

export default function Manifesto() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* Background image */}
      <img
        src={bg}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/20" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">

        <motion.p
          className="text-white/50 text-xs uppercase tracking-[0.3em] mb-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
        >
          Notre raison d'être
        </motion.p>

        <div className="overflow-hidden">
          {lines.map((line, i) => (
            <motion.h2
              key={i}
              className="text-white text-[clamp(2rem,5.5vw,5.5rem)] font-light leading-tight"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0, 0, 1], delay: 0.1 + i * 0.12 }}
            >
              {line}
            </motion.h2>
          ))}
        </div>

        <motion.p
          className="mt-10 text-white/55 text-base font-light max-w-lg leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0, 0, 1], delay: 0.42 }}
        >
          Allier la sagesse africaine à l'action stratégique moderne,
          pour des solutions qui durent et des impacts qui comptent.
        </motion.p>

        <motion.a
          href="#contact"
          className="mt-12 border border-[#224851] text-white/80 text-xs uppercase tracking-[0.2em] px-8 py-3 hover:bg-[#224851]  transition-all duration-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Travailler avec nous
        </motion.a>

      </div>
    </section>
  );
}
