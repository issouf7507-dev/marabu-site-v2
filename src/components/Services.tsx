import { motion } from 'framer-motion';
import FlowArt, { FlowSection } from './ui/story-scroll';
import { FadeIn } from './ui/fade-in';
import img1 from '../assets/imgs/marabu_conseil_accueil.jpg';
import img2 from '../assets/imgs/marabu_services_accueil.png';

const ITEM_H = 300;
const GAP = 14;
const REEL_W = 320;

function VerticalReel({ images, tilt = -5 }: { images: string[]; tilt?: number }) {
  const looped = [...images, ...images];
  const loopH = images.length * (ITEM_H + GAP);

  return (
    <div
      style={{
        position: 'absolute',
        right: '4vw',
        top: 0,
        bottom: 0,
        width: REEL_W,
        overflow: 'hidden',
        transform: `rotate(${tilt}deg) scaleY(1.08)`,
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <motion.div
        style={{ display: 'flex', flexDirection: 'column', gap: GAP }}
        animate={{ y: [0, -loopH] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
      >
        {looped.map((src, i) => (
          <div
            key={i}
            style={{ width: REEL_W, height: ITEM_H, flexShrink: 0, overflow: 'hidden', borderRadius: 6 }}
          >
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

const services = [
  {
    index: '01',
    name: 'Conseil',
    tagline: 'On vous aide à prendre les bonnes décisions.',
    description: 'Stratégie, transformation, gouvernance — aux côtés des dirigeants qui veulent avancer avec méthode et exigence.',
    tags: ['Stratégie', 'Transformation', 'Gouvernance', 'Gestion du changement'],
    images: [img1, img2, img1, img2],
    bg: '#009689',
    accent: '#1a1a1a',
  },
  {
    index: '02',
    name: 'Services',
    tagline: 'On fait le travail avec vous.',
    description: 'Formation, communication, événements — des dispositifs opérationnels pour renforcer vos équipes et amplifier votre impact.',
    tags: ['Formation', 'Communication', 'Événements', 'Contenus'],
    images: [img2, img1, img2, img1],
    bg: '#1a1a1a',
    accent: '#f5ede4',
  },
  {
    index: '03',
    name: 'Intermédiation',
    tagline: 'On vous ouvre les portes qui comptent.',
    description: 'Relations gouvernementales, diplomatie privée, partenariats internationaux — Marabu agit en coulisses avec discrétion et méthode.',
    tags: ['Relations gov.', 'Diplomatie', 'Partenariats PTF', 'Influence'],
    images: [img1, img2, img1, img2],
    bg: '#2c1810',
    accent: '#f5ede4',
  },
];

export default function Services() {
  return (
    <section id="services">
      <div className="max-w-[1800px] mx-auto px-6 pt-24 pb-10">
        <div className="flex items-end justify-between mb-16">
          <FadeIn>
            <p className="text-[clamp(2.2rem,6vw,4.5rem)] uppercase tracking-[0.25em] text-black/40">Nos services</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl font-light max-w-md text-right leading-snug">
              Trois expertises,<br />un seul engagement.
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
            {/* Full-height reel — absolute on the right */}
            <VerticalReel images={s.images} tilt={-5} />

            {/* Top row */}
            <div className="flex items-start justify-between" style={{ paddingRight: REEL_W + 40 }}>
              <span className="text-[clamp(2.2rem,6vw,5.5rem)] uppercase tracking-[0.25em] opacity-40">{s.name}</span>
              <span className="text-xs uppercase tracking-[0.25em] opacity-40">Marabu Services</span>
            </div>

            {/* Center — tagline */}
            <div style={{ paddingRight: REEL_W + 40 }}>
              <h3 className="text-[clamp(2.2rem,6vw,3.5rem)] font-light leading-tight">
                {s.tagline}
              </h3>
            </div>

            {/* Bottom — description + tags */}
            <div className="flex flex-col gap-5" style={{ paddingRight: REEL_W + 40 }}>
              <p className="text-base opacity-60 leading-relaxed max-w-md">
                {s.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs uppercase tracking-widest px-3 py-1.5 rounded-full"
                    style={{ border: '1px solid currentColor', opacity: 0.5 }}
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
