import { useTranslation } from "react-i18next";
import { FadeIn } from "./ui/fade-in";
import logo from "../assets/Logo_Marabu_.webp";
import { LINKEDIN } from "../config/site";

/**
 * Carte « Suivez-nous » statique (specs V2, §2.2).
 *
 * Volontairement sans widget LinkedIn : le script officiel charge ~100 ko de
 * JS tiers, dépose des cookies de suivi (donc consentement RGPD à gérer) et
 * impose son propre style. Une carte maison rend le même service, au design du
 * site, sans aucune de ces contreparties.
 *
 * Ne rend rien si l'URL n'est pas renseignée, même règle que le footer.
 */
export default function LinkedInCard() {
  const { t } = useTranslation();

  if (!LINKEDIN.url) return null;

  return (
    <FadeIn>
      <div
        className="flex flex-col sm:flex-row sm:items-center gap-6 p-8"
        style={{
          backgroundColor: "#1d454c",
          border: "1px solid #1d454c",
        }}
      >
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
          className="h-14 w-14 object-contain shrink-0 brightness-0 invert"
        />

        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.25em] text-white/60 mb-2">
            {t("linkedinCard.label")}
          </p>
          <p className="text-sm text-white/80 leading-relaxed max-w-md">
            {t("linkedinCard.desc")}
          </p>
        </div>

        <a
          href={LINKEDIN.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 text-xs uppercase tracking-[0.2em] px-6 py-3.5 text-[#ecede3] transition-opacity duration-200 hover:opacity-85 whitespace-nowrap shrink-0"
          style={{ backgroundColor: "#538253" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path d={LINKEDIN.path} />
          </svg>
          {t("linkedinCard.cta")}
        </a>
      </div>
    </FadeIn>
  );
}
