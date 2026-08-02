import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.webp";
import bgLoader from "../assets/imgs/Cauris-bg.webp";

interface Props {
  onComplete: () => void;
}

const DURATION = 1200;
/** Petite pause à 100 % avant que le voile ne remonte. */
const HOLD = 400;
const EXIT_DURATION = 700;

export default function Loader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
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

      timers.push(
        window.setTimeout(() => {
          setVisible(false);
          timers.push(
            window.setTimeout(() => onCompleteRef.current(), EXIT_DURATION),
          );
        }, HOLD),
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
