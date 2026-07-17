import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.webp";
import bgLoader from "../assets/imgs/Cauris-bg.webp";

interface Props {
  onComplete: () => void;
}

const DURATION = 1200;
const BURST_HOLD = 400;
const EXIT_DURATION = 700;
const PARTICLE_COUNT = 40;
const PARTICLE_STEPS = 24;
const PARTICLE_FLIGHT = 1.6;

const COLORS = ["#ffffff", "#d4f5e0", "#a3e4bc", "#fef9c3", "#fde68a", "#c7f2a4"];

interface Particle {
  id: number;
  color: string;
  size: number;
  shape: "rect" | "circle";
  /** Trajectoires précalculées : Framer les joue sans repasser par React. */
  x: number[];
  y: number[];
  rotate: number[];
}

/**
 * Simule la balistique une seule fois et en extrait des keyframes.
 * L'ancienne version appelait setState à chaque frame sur 90 particules, soit
 * ~5 400 objets alloués par seconde et autant de rendus React (cf. audit M2).
 */
function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    let x = 50 + (Math.random() - 0.5) * 8;
    let y = 50 + (Math.random() - 0.5) * 8;
    let vx = (Math.random() - 0.5) * 14;
    let vy = -(Math.random() * 12 + 4);
    let rotation = Math.random() * 360;
    const rotSpeed = (Math.random() - 0.5) * 12;

    const xs: number[] = [];
    const ys: number[] = [];
    const rs: number[] = [];

    for (let step = 0; step < PARTICLE_STEPS; step++) {
      xs.push(x);
      ys.push(y);
      rs.push(rotation);
      x += vx * 0.45;
      y += vy * 0.45;
      vy += 0.5;
      vx *= 0.99;
      rotation += rotSpeed;
    }

    return {
      id: i,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 10 + 5,
      shape: Math.random() > 0.5 ? "rect" : "circle",
      x: xs,
      y: ys,
      rotate: rs,
    };
  });
}

export default function Loader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(true);

  // onComplete est appelé depuis des timers : on le garde dans une ref pour ne
  // pas relancer la séquence si le parent recrée la fonction.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const timers: number[] = [];

    const tick = (now: number) => {
      if (start === null) start = now;
      const raw = Math.min((now - start) / DURATION, 1);
      const eased = raw < 0.5 ? 4 * raw ** 3 : 1 - (-2 * raw + 2) ** 3 / 2;
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }

      setParticles(createParticles(PARTICLE_COUNT));
      timers.push(
        window.setTimeout(() => {
          setVisible(false);
          timers.push(
            window.setTimeout(() => onCompleteRef.current(), EXIT_DURATION),
          );
        }, BURST_HOLD),
      );
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Le loader couvre l'écran : sans ça, on peut scroller le contenu derrière.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden h-screen w-full"
          style={{
            backgroundImage: `url(${bgLoader})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: EXIT_DURATION / 1000,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >
          <div className="absolute inset-0 bg-black/50 z-0" />

          {particles.map((p) => (
            <motion.span
              key={p.id}
              aria-hidden="true"
              className="absolute z-20"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.shape === "circle" ? "50%" : 2,
                pointerEvents: "none",
              }}
              initial={{
                left: `${p.x[0]}%`,
                top: `${p.y[0]}%`,
                rotate: p.rotate[0],
              }}
              animate={{
                left: p.x.map((v) => `${v}%`),
                top: p.y.map((v) => `${v}%`),
                rotate: p.rotate,
                opacity: [1, 1, 0],
              }}
              transition={{ duration: PARTICLE_FLIGHT, ease: "linear" }}
            />
          ))}

          {/* Center content */}
          <div className="flex flex-col items-center gap-6 select-none z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={logo} alt="Marabu Services" className="w-80" />
            </motion.div>

            <motion.div
              className="flex items-center gap-3 tracking-[0.3em] uppercase"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(0.6rem, 1.5vw, 0.8rem)",
              }}
            >
              {["CONSEIL", "·", "SERVICES", "·", "INTERMEDIATION"].map(
                (word, i) => (
                  <motion.span
                    key={i}
                    className={
                      i % 2 === 1
                        ? "text-white/70 text-base"
                        : "text-white font-semibold"
                    }
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.07,
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}
                  </motion.span>
                ),
              )}
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Counter bottom-right */}
          <div
            className="absolute bottom-8 right-10 select-none z-10"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <motion.span
              className="tabular-nums"
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                color: "white",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
            >
              {String(progress).padStart(2, "0")}
              <span
                style={{
                  fontSize: "0.4em",
                  opacity: 0.5,
                  verticalAlign: "super",
                  marginLeft: "0.1em",
                }}
              >
                %
              </span>
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
