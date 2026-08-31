import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FadeIn } from "./ui/fade-in";
import { TEAM } from "../config/team";
import { hasCv } from "../config/cv-ids";

/*
  Les cinq associés, affichés sur l'accueil juste après l'introduction : le
  texte dit ce que fait Marabu, ces visages disent qui le fait.

  La liste est nommée par identifiants plutôt que recopiée — nom, photo et
  poste restent lus dans `TEAM` et `about.team.roles`, seule source de vérité
  de l'équipe. Un membre retiré de `TEAM` disparaît d'ici sans rien casser.
*/
const ASSOCIES = [
  "houssene-ben-souda",
  "thomas-dabadie",
  "aida-ouattara",
  "yapo-marius-bessekon",
  "brice-brou",
];

export default function TeamPreview() {
  const { t } = useTranslation();

  const membres = ASSOCIES.map((id) => TEAM.find((m) => m.id === id)).filter(
    (m): m is (typeof TEAM)[number] => Boolean(m),
  );

  if (membres.length === 0) return null;

  return (
    <section
      className="maxwidth mx-auto px-6 pb-24"
      aria-labelledby="equipe-accueil"
    >
      <FadeIn>
        <p className="text-xs uppercase tracking-[0.3em] text-black/50 mb-4">
          {t("about.team.label")}
        </p>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2
          id="equipe-accueil"
          className="text-2xl font-light leading-snug text-[#1d454c] max-w-lg mb-10"
        >
          {t("about.team.heading")}
        </h2>
      </FadeIn>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-10 list-none p-0">
        {membres.map((m, i) => {
          /*
            Même règle que sur « À propos » : la carte ne mène à une fiche que
            si le membre a un CV. Sinon elle reste statique, plutôt que de
            pointer vers une page vide.
          */
          const cvPath = hasCv(m.id) ? `/equipe/${m.id}` : null;
          const contenu = (
            <>
              <div className="aspect-square overflow-hidden bg-[#538253]/10">
                <img
                  src={m.photo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 text-sm font-medium text-gray-900">{m.name}</p>
              <p className="text-xs text-black/60 leading-relaxed mt-1">
                {t(`about.team.roles.${m.id}`)}
              </p>
            </>
          );

          return (
            <FadeIn key={m.id} delay={i * 0.06}>
              <li>
                {cvPath ? (
                  <Link
                    to={cvPath}
                    aria-label={t("about.team.viewCv", { name: m.name })}
                    className="group block no-underline"
                  >
                    {contenu}
                  </Link>
                ) : (
                  <div className="group">{contenu}</div>
                )}
              </li>
            </FadeIn>
          );
        })}
      </ul>
    </section>
  );
}
