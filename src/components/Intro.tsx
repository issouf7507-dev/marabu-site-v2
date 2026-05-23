import { FadeIn } from './ui/fade-in';

export default function Intro() {
  return (
    <section id="about" className="py-24 max-w-[1800px] mx-auto px-6">
      <div className="grid grid-cols-[1fr_2fr] gap-24 items-start">

        <FadeIn>
          <p className="text-xs uppercase tracking-[0.25em] text-black/40 pt-1">Introduction</p>
        </FadeIn>

        <div>
          <FadeIn>
            <h2 className="text-4xl font-light leading-snug mb-8">
              Des stratégies innovantes pour une croissance durable et performante.
            </h2>
          </FadeIn>
          <div className="space-y-5 text-black/60 text-base leading-relaxed max-w-2xl">
            <FadeIn delay={0.1}>
              <p>
                Marabu Services accompagne les entreprises, institutions et organisations dans leurs défis stratégiques,
                opérationnels et relationnels. Notre approche allie la sagesse africaine à l'action stratégique moderne
                pour des solutions sur mesure, durables et à fort impact.
              </p>
            </FadeIn>
            <FadeIn delay={0.18}>
              <p>
                Spécialisés en conseil stratégique, en services opérationnels et en intermédiation institutionnelle,
                nous intervenons là où les décisions se prennent — auprès des gouvernements, des partenaires techniques
                et financiers, et des acteurs privés qui façonnent le continent.
              </p>
            </FadeIn>
            <FadeIn delay={0.26}>
              <p>
                Fondée en 2023 et basée à Abidjan, Marabu est le partenaire de ceux qui veulent bâtir avec méthode,
                influencer avec intégrité et croître avec vision.
              </p>
            </FadeIn>
          </div>
        </div>

      </div>
    </section>
  );
}
