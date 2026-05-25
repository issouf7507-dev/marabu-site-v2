import { motion } from "framer-motion";
import { FadeIn } from "./ui/fade-in";

const posts = [
  {
    id: "01",
    date: "Mai 2026",
    category: "Stratégie",
    categoryColor: { bg: "#f5ede4", text: "#b07d5a" },
    title:
      "L'Afrique au cœur des nouvelles stratégies mondiales d'investissement",
    excerpt:
      "Les flux d'IDE vers l'Afrique subsaharienne ont atteint un niveau record en 2025. Analyse des secteurs porteurs, des risques réels et des leviers que les entreprises africaines peuvent actionner dès aujourd'hui.",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80",
    featured: true,
  },
  {
    id: "02",
    date: "Avril 2026",
    category: "Intermédiation",
    categoryColor: { bg: "#e8dbd6", text: "#5a3728" },
    title:
      "Soft power et diplomatie privée : comment les entreprises influencent les politiques publiques",
    excerpt:
      "Les acteurs privés jouent un rôle croissant dans la fabrique des décisions publiques. Décryptage des pratiques et des limites éthiques.",
    image:
      "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80",
    featured: false,
  },
  {
    id: "03",
    date: "Mars 2026",
    category: "Services",
    categoryColor: { bg: "#e8e8e8", text: "#1a1a1a" },
    title:
      "Former pour transformer : l'impact du capacity building sur la performance des organisations",
    excerpt:
      "Quand la formation cesse d'être un coût pour devenir un levier de compétitivité. Retour sur trois programmes à fort impact.",
    image:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
    featured: false,
  },
];

function ArticleFeatured({ post }: { post: (typeof posts)[0] }) {
  return (
    <motion.article
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
    >
      <div className="overflow-hidden aspect-[4/3] mb-6">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
        />
      </div>
      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full"
          style={{
            backgroundColor: post.categoryColor.bg,
            color: post.categoryColor.text,
          }}
        >
          {post.category}
        </span>
        <span className="text-xs text-black/35">{post.date}</span>
      </div>
      <h3 className="text-2xl font-light leading-snug mb-4 group-hover:translate-x-1 transition-transform duration-300">
        {post.title}
      </h3>
      <p className="text-sm text-black/55 leading-relaxed mb-6">
        {post.excerpt}
      </p>
      <span className="text-xs uppercase tracking-[0.2em] text-black/40 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
        Lire l'article <span>→</span>
      </span>
    </motion.article>
  );
}

function ArticleSmall({
  post,
  delay,
}: {
  post: (typeof posts)[0];
  delay: number;
}) {
  return (
    <motion.article
      className="group cursor-pointer flex gap-6 border-b border-black/10 pb-8 last:border-none last:pb-0"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0, 0, 1], delay }}
    >
      <div className="overflow-hidden w-28 h-24 shrink-0">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span
            className="text-xs uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: post.categoryColor.bg,
              color: post.categoryColor.text,
            }}
          >
            {post.category}
          </span>
          <span className="text-xs text-black/30">{post.date}</span>
        </div>
        <h3 className="text-sm font-light leading-snug group-hover:translate-x-1 transition-transform duration-300">
          {post.title}
        </h3>
        <span className="text-xs text-black/35 flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300 mt-auto">
          Lire <span>→</span>
        </span>
      </div>
    </motion.article>
  );
}

export default function BlogPreview() {
  const [featured, ...rest] = posts;

  return (
    <section id="blog" className="py-24 max-w-[1800px] mx-auto px-6">
      {/* Header */}
      <div className="grid grid-cols-[1fr_2fr] gap-24 items-end mb-16">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            Insights
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex items-end justify-between">
            <h2 className="text-4xl font-light leading-snug text-gray-900">
              Perspectives &<br />
              analyses.
            </h2>
            <a
              href="#blog"
              className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors duration-300 flex items-center gap-2 pb-1"
            >
              Tous les articles <span>→</span>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Grid : 1 featured + 2 small */}
      <div className="grid grid-cols-[3fr_2fr] gap-16 items-start">
        <ArticleFeatured post={featured} />

        <div className="flex flex-col gap-8 pt-2">
          {rest.map((post, i) => (
            <ArticleSmall key={post.id} post={post} delay={0.15 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
