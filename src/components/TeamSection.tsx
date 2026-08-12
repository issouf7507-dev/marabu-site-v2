import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FadeIn } from "./ui/fade-in";
import { LINKEDIN } from "../config/site";
import { TEAM, type TeamMember } from "../config/team";
import { hasCv } from "../config/cv-ids";

/**
 * Portrait du membre, avec repli sur ses initiales : les photos vivent dans
 * `public/persons/` et peuvent manquer selon le déploiement.
 *
 * `alt=""` + `aria-hidden` volontaires : le nom et la fonction sont énoncés
 * juste en dessous, un alt descriptif les ferait lire deux fois par les
 * lecteurs d'écran (même principe que les témoignages, cf.
 * AUDIT-ERGONOMIE-ACCESSIBILITE.md §A11Y-5).
 */
function Portrait({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(member.photo) && !failed;

  const initials = member.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

  return (
    <div
      className="w-full aspect-square overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#53825314" }}
      aria-hidden="true"
    >
      {showImage ? (
        <img
          src={member.photo}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-2xl font-light tracking-widest text-[#3f6b3f]">
          {initials}
        </span>
      )}
    </div>
  );
}

/**
 * Section « Notre équipe » (specs V2, §2.3).
 *
 * Pilotée par `TEAM` (src/config/team.ts) : ajouter un membre ne demande
 * aucune modification de ce composant.
 *
 * L'icône LinkedIn n'est rendue que si `linkedin` est renseigné — même règle
 * que le footer : un lien mort est pire qu'un lien absent. La section entière
 * disparaît tant qu'aucun membre n'est déclaré.
 *
 * Même règle pour le CV : la carte n'est cliquable que si le membre a une
 * entrée dans `src/config/cv.ts`. Sinon elle reste statique, plutôt que de
 * mener à une page vide.
 */
export default function TeamSection() {
  const { t } = useTranslation();

  if (TEAM.length === 0) return null;

  return (
    <section
      id="team"
      className="scroll-mt-28 py-20"
      style={{ borderBottom: "1px solid #f0f0f0" }}
    >
      <FadeIn>
        <p className="text-xs uppercase tracking-[0.3em] text-black/60 mb-6">
          {t("about.team.label")}
        </p>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 className="text-2xl font-light leading-snug text-[#1d454c] max-w-lg mb-12">
          {t("about.team.heading")}
        </h2>
      </FadeIn>

      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 list-none p-0">
        {TEAM.map((member, i) => {
          /*
           * Tant que le profil personnel n'est pas fourni, l'icône renvoie au
           * compte Marabu (mesure d'attente demandée le 6 août).
           *
           * Le libellé accessible change alors lui aussi : annoncer « Profil
           * LinkedIn de X » pour un lien qui ouvre le compte de l'entreprise
           * ferait dire au lecteur d'écran autre chose que ce qui s'ouvre.
           * À supprimer dès que les 8 URLs personnelles sont renseignées.
           */
          const href = member.linkedin || LINKEDIN.url;
          const label = member.linkedin
            ? t("about.team.linkedinAria", { name: member.name })
            : t("about.team.linkedinCompanyAria");

          const cvPath = hasCv(member.id) ? `/equipe/${member.id}` : null;
          const cvLabel = t("about.team.viewCv", { name: member.name });

          return (
            <FadeIn key={member.id} delay={i * 0.06}>
              <li>
                {cvPath ? (
                  <Link to={cvPath} aria-label={cvLabel} className="block">
                    <Portrait member={member} />
                  </Link>
                ) : (
                  <Portrait member={member} />
                )}
                <div className="flex items-start justify-between gap-3 mt-4">
                  <div>
                    {cvPath ? (
                      <Link
                        to={cvPath}
                        className="text-sm font-medium text-gray-900 hover:text-[#3f6b3f] transition-colors duration-200"
                      >
                        {member.name}
                      </Link>
                    ) : (
                      <p className="text-sm font-medium text-gray-900">
                        {member.name}
                      </p>
                    )}
                    <p className="text-xs text-black/65 leading-relaxed mt-1">
                      {t(`about.team.roles.${member.id}`)}
                    </p>
                    {cvPath && (
                      <Link
                        to={cvPath}
                        aria-label={cvLabel}
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-[#3f6b3f] mt-3 hover:gap-3 transition-all duration-300"
                      >
                        {t("about.team.viewCvShort")}
                        <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>

                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-9 h-9 shrink-0 flex items-center justify-center transition-all duration-200 hover:opacity-100"
                      style={{ border: "1px solid #1d454c25", opacity: 0.55 }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        className="w-3.5 h-3.5"
                        style={{ color: "#1d454c" }}
                      >
                        <path d={LINKEDIN.path} />
                      </svg>
                    </a>
                  )}
                </div>
              </li>
            </FadeIn>
          );
        })}
      </ul>
    </section>
  );
}
