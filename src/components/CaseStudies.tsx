import { motion } from 'framer-motion';
import { FadeIn } from './ui/fade-in';

const cases = [
  {
    id: '01',
    category: 'Conseil',
    categoryColor: '#b07d5a',
    client: 'Ministère de l\'Économie',
    project: 'Stratégie nationale d\'investissement',
    description:
      'Refonte complète de la stratégie nationale d\'attraction des investissements directs étrangers, avec un nouveau cadre de gouvernance et des outils de pilotage sur mesure.',
    metric: '+40%',
    metricLabel: 'IDE en 18 mois',
    year: '2024',
  },
  {
    id: '02',
    category: 'Services',
    categoryColor: '#1a1a1a',
    client: 'Orange Côte d\'Ivoire',
    project: 'Programme leadership & transformation',
    description:
      'Conception et déploiement d\'un programme de formation au leadership pour les cadres dirigeants, couvrant 15 pays d\'Afrique subsaharienne.',
    metric: '200+',
    metricLabel: 'managers formés',
    year: '2024',
  },
  {
    id: '03',
    category: 'Intermédiation',
    categoryColor: '#5a3728',
    client: 'BOAD',
    project: 'Mobilisation de financements climatiques',
    description:
      'Facilitation d\'un accord de co-financement entre la BOAD et un consortium de partenaires techniques et financiers européens pour des projets d\'infrastructure verte.',
    metric: '50M€',
    metricLabel: 'mobilisés en 6 mois',
    year: '2023',
  },
  {
    id: '04',
    category: 'Conseil',
    categoryColor: '#b07d5a',
    client: 'Groupe industriel privé',
    project: 'Restructuration & gouvernance',
    description:
      'Accompagnement d\'un groupe familial dans sa transition vers une gouvernance professionnalisée, avec mise en place d\'un conseil d\'administration indépendant.',
    metric: '×2',
    metricLabel: 'valorisation en 2 ans',
    year: '2023',
  },
];

const categoryTag = {
  Conseil: { bg: '#f5ede4', text: '#b07d5a' },
  Services: { bg: '#e8e8e8', text: '#1a1a1a' },
  Intermédiation: { bg: '#e8dbd6', text: '#5a3728' },
} as const;

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 max-w-[1800px] mx-auto px-6">

      {/* Header */}
      <div className="grid grid-cols-[1fr_2fr] gap-24 items-end mb-20">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.25em] text-black/40">Client Success Stories</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="text-4xl font-light leading-snug">
            Des résultats mesurables,<br />des partenariats durables.
          </h2>
        </FadeIn>
      </div>

      {/* Cases */}
      <div className="border-t border-black/10">
        {cases.map((c, i) => {
          const tag = categoryTag[c.category as keyof typeof categoryTag];
          return (
            <motion.div
              key={c.id}
              className="group border-b border-black/10 py-10 grid grid-cols-[80px_1fr_auto] gap-10 items-start cursor-default"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.25, 0, 0, 1], delay: i * 0.08 }}
            >
              {/* Ghost number */}
              <span className="text-5xl font-light text-black/10 leading-none mt-1 select-none">
                {c.id}
              </span>

              {/* Main content */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                    style={{ backgroundColor: tag.bg, color: tag.text }}
                  >
                    {c.category}
                  </span>
                  <span className="text-xs text-black/30">{c.year}</span>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-black/35 mb-1">{c.client}</p>
                  <h3 className="text-2xl font-light leading-snug group-hover:translate-x-2 transition-transform duration-300">
                    {c.project}
                  </h3>
                </div>

                <p className="text-sm text-black/55 leading-relaxed max-w-xl">
                  {c.description}
                </p>
              </div>

              {/* Metric */}
              <div className="text-right pt-1">
                <p className="text-4xl font-light leading-none">{c.metric}</p>
                <p className="text-xs text-black/40 mt-2 uppercase tracking-wider">{c.metricLabel}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
