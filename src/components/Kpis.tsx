import { useTranslation } from "react-i18next";
import { FadeIn } from "./ui/fade-in";
import coris2 from "../assets/coris2.webp";

/*
  Bandeau de chiffres clés, entre l'introduction et la section Solutions.
  L'introduction décrit Marabu en mots ; ce bandeau donne la mesure avant que
  la narration ne reprenne, et sert de respiration entre deux blocs de texte.

  Les valeurs viennent d'i18n (`kpis.stats`) et non du code : ce sont des
  données éditoriales, appelées à bouger sans qu'on touche au composant.
*/
export default function Kpis() {
  const { t } = useTranslation();
  const stats = t("kpis.stats", { returnObjects: true }) as {
    value: string;
    label: string;
  }[];

  return (
    <section
      className="maxwidth mx-auto px-6 pb-24"
      aria-label={t("kpis.label")}
    >
      <div className="relative overflow-hidden py-14 md:py-16 border-y border-[#1d454c]/15">
        {[
          { top: "12%", left: "4%", size: 70, rotate: 25 },
          { top: "58%", left: "48%", size: 55, rotate: -40 },
          { top: "20%", left: "90%", size: 80, rotate: 60 },
        ].map((c, i) => (
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
              opacity: 0.1,
              transform: `rotate(${c.rotate}deg)`,
              objectFit: "contain",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        ))}

        <FadeIn>
          <p className="relative text-xs uppercase tracking-[0.3em] text-black/50 text-center mb-10">
            {t("kpis.label")}
          </p>
        </FadeIn>

        {/*
          Le filet de séparation n'est ajouté qu'aux cellules qui ne commencent
          pas une rangée : les paires en deux colonnes, plus la troisième de
          chaque groupe quand la grille passe à quatre. Ajouter la bordure là
          où il en faut, plutôt que la retirer là où il n'en faut pas, évite
          deux règles de même spécificité qui se disputent la première cellule.
        */}
        <div className="relative grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <FadeIn
              key={s.label}
              delay={i * 0.08}
              className="border-[#1d454c]/15 [&:nth-child(even)]:border-l md:[&:nth-child(4n+3)]:border-l"
            >
              <div className="px-4 py-5 text-center">
                <span className="block text-[clamp(2.25rem,6vw,3.25rem)] font-light leading-none text-[#538253]">
                  {s.value}
                </span>
                <span className="mt-3 block text-xs uppercase tracking-[0.2em] text-black/55">
                  {s.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
