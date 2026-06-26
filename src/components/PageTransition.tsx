import { motion } from "framer-motion";
import type { ReactNode } from "react";
import coris2 from "../assets/coris2.png";

const ease = [0.76, 0, 0.24, 1] as const;

const corisPositions = [
  { top: "10%",  left: "8%",  size: 140, rotate: 20,  opacity: 0.18 },
  { top: "5%",   left: "55%", size: 100, rotate: -35, opacity: 0.14 },
  { top: "20%",  left: "80%", size: 160, rotate: 50,  opacity: 0.16 },
  { top: "45%",  left: "20%", size: 120, rotate: -15, opacity: 0.2  },
  { top: "50%",  left: "50%", size: 200, rotate: 70,  opacity: 0.12 },
  { top: "60%",  left: "78%", size: 130, rotate: -50, opacity: 0.18 },
  { top: "75%",  left: "5%",  size: 110, rotate: 40,  opacity: 0.15 },
  { top: "80%",  left: "40%", size: 90,  rotate: -20, opacity: 0.13 },
  { top: "88%",  left: "68%", size: 150, rotate: 60,  opacity: 0.16 },
];

function CurtainContent() {
  return (
    <>
      {corisPositions.map((c, i) => (
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
    </>
  );
}

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Rideau ENTRANT : couvre l'écran lors du exit de l'ancienne page */}
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#1d454c",
          zIndex: 9999,
          pointerEvents: "none",
          transformOrigin: "bottom",
          overflow: "hidden",
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 0.45, ease }}
      >
        <CurtainContent />
      </motion.div>

      {/* Rideau SORTANT : découvre l'écran lors du enter de la nouvelle page */}
      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#1d454c",
          zIndex: 9998,
          pointerEvents: "none",
          transformOrigin: "top",
          overflow: "hidden",
        }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <CurtainContent />
      </motion.div>

      {/* Contenu de la page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
}
