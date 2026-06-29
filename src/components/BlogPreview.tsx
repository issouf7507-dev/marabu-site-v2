import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FadeIn } from "./ui/fade-in";

type Post = { id: string; date: string; category: string; title: string; excerpt: string; featured: boolean };

const postImages: Record<string, string> = {
  "01": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80",
  "02": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&q=80",
  "03": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  "Stratégie":      { bg: "#f5ede4", text: "#b07d5a" },
  "Strategy":       { bg: "#f5ede4", text: "#b07d5a" },
  "Intermédiation": { bg: "#e8dbd6", text: "#5a3728" },
  "Intermediation": { bg: "#e8dbd6", text: "#5a3728" },
  "Services":       { bg: "#e8e8e8", text: "#1a1a1a" },
  "Formation":      { bg: "#e8f0d8", text: "#538253" },
  "Training":       { bg: "#e8f0d8", text: "#538253" },
};

type PostWithImage = Post & { image: string; categoryColor: { bg: string; text: string } };

function ArticleFeatured({ post }: { post: PostWithImage }) {
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
      <ReadMoreLink />
    </motion.article>
  );
}

function ReadLink() {
  const { t } = useTranslation();
  return (
    <span className="text-xs text-black/35 flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300 mt-auto">
      {t("common.read")} <span>→</span>
    </span>
  );
}

function ReadMoreLink() {
  const { t } = useTranslation();
  return (
    <span className="text-xs uppercase tracking-[0.2em] text-black/40 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
      {t("common.readMore")} <span>→</span>
    </span>
  );
}

function ArticleSmall({
  post,
  delay,
}: {
  post: PostWithImage;
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
        <ReadLink />
      </div>
    </motion.article>
  );
}

export default function BlogPreview() {
  const { t } = useTranslation();
  const rawPosts = t("blogPreview.posts", { returnObjects: true }) as Post[];
  const posts: PostWithImage[] = rawPosts.map((p) => ({
    ...p,
    image: postImages[p.id] ?? "",
    categoryColor: categoryColors[p.category] ?? { bg: "#e5e5e5", text: "#333" },
  }));
  const [featured, ...rest] = posts;
  const headingLines = t("blogPreview.heading").split("\n");

  return (
    <section id="blog" className="py-24 max-w-[1800px] mx-auto px-6">
      {/* Header */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 md:gap-24 items-end mb-10 md:mb-16">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            {t("blogPreview.label")}
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h2 className="text-4xl font-light leading-snug text-gray-900">
              {headingLines[0]}<br />
              {headingLines[1]}
            </h2>
            <a
              href="#blog"
              className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors duration-300 flex items-center gap-2 pb-1"
            >
              {t("blogPreview.cta")} <span>→</span>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* Grid : 1 featured + 2 small */}
      <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-16 items-start">
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
