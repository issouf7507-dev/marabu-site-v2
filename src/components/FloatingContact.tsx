import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * Raccourci « Nous contacter » flottant, présent sur toutes les pages : le
 * parcours est long (home narrative, articles, pages équipe) et le CTA d'entête
 * disparaît dès les premiers pixels de scroll.
 *
 * Monté dans <AppRoutes /> hors de l'<AnimatePresence> des routes pour ne pas
 * être démonté/rejoué à chaque navigation.
 */
export default function FloatingContact() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  // Inutile (et trompeur) de proposer le raccourci sur la page qu'il vise.
  if (pathname === "/contact") return null;

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-[70]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
    >
      <Link
        to="/contact"
        /*
          Le liseré crème détache le bouton du footer, qui est du même bleu :
          sans lui, seul le texte restait visible en bas de page.
        */
        className="block rounded-full bg-[#1d454c] text-[#ecede3] text-xs uppercase tracking-[0.2em] px-6 py-3.5 shadow-lg ring-1 ring-[#ecede3]/30 hover:bg-[#538253] transition-colors duration-300 whitespace-nowrap"
      >
        {t("common.contactUs")}
      </Link>
    </motion.div>
  );
}
