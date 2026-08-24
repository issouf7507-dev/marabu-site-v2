import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useTranslation } from "react-i18next";
import { scrollToTop } from "../hooks/useLenis";

/**
 * Repère de progression pour les pages à scroll long : une fine barre en haut
 * qui suit l'avancement, et un bouton « retour en haut » qui apparaît une fois
 * qu'on a défilé. Répond au point d'audit UX-1 (accueil long, sans repère) sans
 * toucher au scroll narratif existant.
 */
export default function ScrollProgress() {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setVisible(v > 0.12);
  });

  return (
    <>
      {/* Barre de progression (décorative) */}
      <motion.div
        aria-hidden="true"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0% 50%",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: "#538253",
          zIndex: 60,
        }}
      />

      {/* Bouton retour en haut */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        aria-label={t("common.backToTop")}
        initial={false}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : 12,
          pointerEvents: visible ? "auto" : "none",
        }}
        transition={{ duration: 0.25 }}
        /* bottom-24 : le coin bas-droit revient au CTA de <FloatingContact />. */
        className="fixed bottom-24 right-6 z-[60] w-11 h-11 flex items-center justify-center rounded-full shadow-lg ring-1 ring-[#ecede3]/30"
        style={{ backgroundColor: "#1d454c", color: "#ecede3" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </motion.button>
    </>
  );
}
