import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/logo.png"

interface Props {
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotSpeed: number;
  shape: 'rect' | 'circle';
}

const COLORS = ['#ffffff', '#d4f5e0', '#a3e4bc', '#fef9c3', '#fde68a', '#c7f2a4'];
const DURATION = 2600;

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 8,
    y: 50 + (Math.random() - 0.5) * 8,
    vx: (Math.random() - 0.5) * 14,
    vy: -(Math.random() * 12 + 4),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: Math.random() * 10 + 5,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 12,
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
  }));
}

export default function Loader({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const gravityRef = useRef<number>(0);

  // Progress counter
  useEffect(() => {
    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const raw = Math.min(elapsed / DURATION, 1);
      const eased = raw < 0.5 ? 4 * raw ** 3 : 1 - (-2 * raw + 2) ** 3 / 2;
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setParticles(createParticles(90));
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 1000);
        }, 550);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  // Gravity on particles
  useEffect(() => {
    if (particles.length === 0) return;
    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          x: p.x + p.vx * 0.45,
          y: p.y + p.vy * 0.45,
          vy: p.vy + 0.5,
          rotation: p.rotation + p.rotSpeed,
          vx: p.vx * 0.99,
        }))
      );
      gravityRef.current = requestAnimationFrame(animate);
    };
    gravityRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(gravityRef.current);
  }, [particles.length]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#224851' }}
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
        >


          {/* Center content */}
          <div className="flex flex-col items-center gap-6 select-none z-10">
            <motion.div
              className="text-white font-bold tracking-tight"
              style={{ fontFamily: 'Poppins, sans-serif', fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={logo} className='w-80' />
            </motion.div>

            <motion.p
              className="text-white/60 text-xs tracking-[0.25em] uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              CONSEIL - SERVICES - INTERMEDIATION
            </motion.p>

            {/* Progress bar */}
            <div className="w-48 h-px bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Counter bottom-right */}
          <div
            className="absolute bottom-8 right-10 select-none"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            <motion.span
              className="tabular-nums"
              style={{
                fontSize: 'clamp(2rem, 6vw, 4rem)',
                color: 'white',
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {String(progress).padStart(2, '0')}
              <span style={{ fontSize: '0.4em', opacity: 0.5, verticalAlign: 'super', marginLeft: '0.1em' }}>%</span>
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
