import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { hasCv } from "../../config/cv-ids";
import type { TeamMember } from "../../config/team";

/**
 * Le référent de la prestation : un visage sur la compétence vendue.
 *
 * La photo est décorative — le nom la suit en texte, l'annoncer deux fois
 * alourdirait la lecture d'écran (même règle que `Avatar` dans Testimonials et
 * `Portrait` dans TeamSection, cf. audit A11Y-5). D'où `aria-hidden` sur le
 * cadre et le repli en initiales si le fichier manque.
 *
 * Vignette carrée de 80 px et non pastille ronde : les portraits de l'équipe
 * sont des plans larges (`build-portraits.py` cadre le buste dans son décor,
 * pas un visage détouré). Réduits en rond à 56 px, les visages devenaient
 * illisibles. Le carré reprend en outre le cadrage de « Notre équipe » — le
 * rond reste réservé aux clients, dans Testimonials.
 *
 * Le bloc ne devient un lien que si le membre a un CV publié : `/equipe/:id`
 * n'existe pas pour les autres (cf. `hasCv`).
 */
export default function OfferingExpert({
  member,
  color,
}: {
  member: TeamMember;
  color: string;
}) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(member.photo) && !failed;

  const initials = member.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

  const content = (
    <>
      <div
        className="w-20 h-20 shrink-0 overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: `${color}1a` }}
        aria-hidden="true"
      >
        {showImage ? (
          <img
            src={member.photo}
            alt=""
            /*
              Pas de `loading="lazy"` ici, contrairement aux portraits de
              « Notre équipe » : le bloc est dans le premier écran de la page,
              en différer le chargement ne fait qu'exposer un instant les
              initiales de repli.
            */
            width={80}
            height={80}
            decoding="async"
            className="w-full h-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <span
            className="text-lg font-light tracking-widest"
            style={{ color }}
          >
            {initials}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.25em] text-black/50">
          {t("servicesPage.offering.expert")}
        </p>
        <p className="text-sm font-medium text-gray-900 mt-1.5">
          {member.name}
        </p>
        <p className="text-xs text-black/60 leading-relaxed mt-0.5">
          {t(`about.team.roles.${member.id}`)}
        </p>
      </div>
    </>
  );

  /*
    `flex-wrap` : sous ~340 px de large, « Voir le CV » ne tient plus à côté de
    la photo et du nom. Il passe alors à la ligne, aligné à droite par
    `ml-auto`, plutôt que de comprimer le poste sur trois lignes.
  */
  const className =
    "mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-b border-[#1d454c]/10 py-5";

  return hasCv(member.id) ? (
    <Link
      to={`/equipe/${member.id}`}
      aria-label={t("about.team.viewCv", { name: member.name })}
      className={`${className} group transition-colors duration-300 hover:bg-[#1d454c]/[0.03]`}
    >
      {content}
      <span
        aria-hidden="true"
        className="ml-auto shrink-0 text-xs uppercase tracking-[0.15em] text-black/45 group-hover:text-black/70 transition-colors duration-300"
      >
        {t("about.team.viewCvShort")} →
      </span>
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
