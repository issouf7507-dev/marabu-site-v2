import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import cauriVert from "../assets/Cauris VertPlan de travail 1.svg";
import cauriLight from "../assets/Cauris LightPlan de travail 1.svg";

interface CfgType {
  src: string;
  left: number;
  size: number;
  startY: number;
  endY: number;
  startRotate: number;
  endRotate: number;
  peakOpacity: number;
  range: [number, number];
}

const CAURIS: CfgType[] = [
  { src: cauriVert,  left: 5,  size: 80,  startY: -280, endY: 400, startRotate: -30,  endRotate: 130,  peakOpacity: 0.85, range: [0,    0.85] },
  { src: cauriVert,  left: 18, size: 58,  startY: -220, endY: 340, startRotate: 55,   endRotate: -85,  peakOpacity: 0.72, range: [0.06, 0.9 ] },
  { src: cauriVert,  left: 33, size: 100, startY: -340, endY: 490, startRotate: 12,   endRotate: -195, peakOpacity: 0.90, range: [0,    0.82] },
  { src: cauriLight, left: 50, size: 68,  startY: -250, endY: 430, startRotate: -62,  endRotate: 108,  peakOpacity: 0.88, range: [0.08, 0.93] },
  { src: cauriVert,  left: 64, size: 88,  startY: -300, endY: 460, startRotate: 28,   endRotate: -155, peakOpacity: 0.85, range: [0.03, 0.88] },
  { src: cauriLight, left: 79, size: 62,  startY: -200, endY: 370, startRotate: -48,  endRotate: 92,   peakOpacity: 0.88, range: [0.13, 0.96] },
  { src: cauriVert,  left: 91, size: 52,  startY: -180, endY: 320, startRotate: 72,   endRotate: -52,  peakOpacity: 0.78, range: [0.1,  0.88] },
];

function FallingCauri({
  cfg,
  progress,
}: {
  cfg: CfgType;
  progress: MotionValue<number>;
}) {
  const mid = (cfg.range[0] + cfg.range[1]) / 2;
  const fadeIn  = Math.min(cfg.range[0] + 0.13, mid);
  const fadeOut = Math.max(cfg.range[1] - 0.13, mid);

  const y       = useTransform(progress, cfg.range, [cfg.startY, cfg.endY]);
  const rotate  = useTransform(progress, cfg.range, [cfg.startRotate, cfg.endRotate]);
  const opacity = useTransform(
    progress,
    [cfg.range[0], fadeIn, fadeOut, cfg.range[1]],
    [0, cfg.peakOpacity, cfg.peakOpacity, 0],
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `${cfg.left}%`,
        top: "50%",
        width: 0,
        height: 0,
        pointerEvents: "none",
      }}
    >
      <motion.img
        src={cfg.src}
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          width: cfg.size,
          height: cfg.size,
          maxWidth: "none",
          translateX: "-50%",
          translateY: "-50%",
          y,
          rotate,
          opacity,
          objectFit: "contain",
          userSelect: "none",
        }}
      />
    </div>
  );
}

export default function CaurisTransition() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: "55vh",
        overflow: "visible",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >
      {CAURIS.map((cfg, i) => (
        <FallingCauri key={i} cfg={cfg} progress={scrollYProgress} />
      ))}
    </div>
  );
}
