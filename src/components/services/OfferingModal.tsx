import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import type { OpenOffering } from "./serviceData";

/**
 * Fiche détaillée d'une prestation, ouverte au clic sur une ligne de service.
 *
 * Rendue dans un portail sur `body` : la page empile un `aside` collant, une
 * navbar fixe et le CTA flottant, et la modale doit passer au-dessus de tout
 * sans dépendre du contexte d'empilement de la section où l'on a cliqué.
 *
 * Accessibilité : `role="dialog"` + `aria-modal`, focus posé sur la fermeture
 * à l'ouverture, focus piégé dans le panneau, Échap et clic sur le fond pour
 * fermer, scroll du body verrouillé pendant l'affichage. Le retour du focus
 * sur le bouton d'origine est géré par la page (`closeOffering`).
 */
export default function OfferingModal({
  offering,
  onClose,
  onContact,
}: {
  offering: OpenOffering | null;
  onClose: () => void;
  onContact: () => void;
}) {
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = offering !== null;

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const titleId = "offering-modal-title";

  return createPortal(
    <AnimatePresence>
      {offering && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-[#1d454c]/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative w-full sm:max-w-3xl max-h-[92svh] sm:max-h-[88svh] overflow-y-auto bg-[#ecede3] shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.25, 0, 0, 1] }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t("servicesPage.modal.close")}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[#ecede3]/90 text-[#1d454c] hover:bg-white transition-colors duration-200"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                ×
              </span>
            </button>

            {/* Bandeau : le visuel de la prestation, assombri pour le texte */}
            <div className="relative h-40 sm:h-52 overflow-hidden">
              <img
                src={offering.item.img}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/35 to-black/10" />
              <div className="absolute bottom-5 left-6 right-6">
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/70 mb-2">
                  {offering.svc.name} · {t("servicesPage.modal.eyebrow")}
                </p>
                <h2
                  id={titleId}
                  className="text-2xl sm:text-3xl font-light text-white leading-tight"
                >
                  {offering.item.title}
                </h2>
              </div>
            </div>

            <div className="px-6 sm:px-10 py-8">
              <p className="text-sm sm:text-base text-black/75 leading-relaxed">
                {offering.item.details.intro}
              </p>

              <div className="grid sm:grid-cols-2 gap-8 mt-10">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-black/50 mb-4">
                    {t("servicesPage.modal.includes")}
                  </p>
                  <ul className="space-y-3">
                    {offering.item.details.includes.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-sm text-black/70 leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: offering.svc.color }}
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-black/50 mb-4">
                    {t("servicesPage.modal.deliverables")}
                  </p>
                  <ul className="space-y-3">
                    {offering.item.details.deliverables.map((line) => (
                      <li
                        key={line}
                        className="flex gap-3 text-sm text-black/70 leading-relaxed"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 shrink-0 w-1.5 h-1.5"
                          style={{ backgroundColor: offering.svc.color }}
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className="mt-8 p-5"
                style={{ backgroundColor: `${offering.svc.color}12` }}
              >
                <p className="text-[11px] uppercase tracking-[0.25em] text-black/50 mb-2">
                  {t("servicesPage.modal.audience")}
                </p>
                <p className="text-sm text-black/70 leading-relaxed">
                  {offering.item.details.audience}
                </p>
              </div>

              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onContact}
                  className="text-xs uppercase tracking-[0.2em] px-7 py-3.5 text-white transition-opacity duration-300 hover:opacity-90"
                  style={{ backgroundColor: offering.svc.color }}
                >
                  {t("common.contactUs")}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs uppercase tracking-[0.2em] px-7 py-3.5 border border-[#1d454c]/25 text-black/65 hover:bg-[#1d454c]/5 transition-colors duration-300"
                >
                  {t("servicesPage.modal.close")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
