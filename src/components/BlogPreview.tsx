import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FadeIn } from "./ui/fade-in";
import { useArticles, formatDate, type Article } from "../hooks/useArticles";

function ArticleFeatured({ article, locale }: { article: Article; locale: string }) {
  const { t } = useTranslation();
  return (
    <Link to={`/actualites/${article.id}`} className="block">
      <motion.article
        className="group cursor-pointer"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
      >
        <div className="overflow-hidden aspect-[4/3] mb-6">
          <img
            src={article.featuredImage}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
        </div>
        <p className="text-xs text-black/35 mb-4">
          {formatDate(article.publishedAt, locale)}
        </p>
        <h3 className="text-2xl font-light leading-snug mb-6 group-hover:translate-x-1 transition-transform duration-300">
          {article.title}
        </h3>
        <span className="text-xs uppercase tracking-[0.2em] text-black/40 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
          {t("common.readMore")} <span>→</span>
        </span>
      </motion.article>
    </Link>
  );
}

function ArticleSmall({ article, locale, delay }: { article: Article; locale: string; delay: number }) {
  const { t } = useTranslation();
  return (
    <Link to={`/actualites/${article.id}`} className="block">
      <motion.article
        className="group cursor-pointer flex gap-6 border-b border-black/10 pb-8 last:border-none last:pb-0"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.25, 0, 0, 1], delay }}
      >
        <div className="overflow-hidden w-28 h-24 shrink-0">
          <img
            src={article.featuredImage}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs text-black/30">
            {formatDate(article.publishedAt, locale)}
          </span>
          <h3 className="text-sm font-light leading-snug group-hover:translate-x-1 transition-transform duration-300">
            {article.title}
          </h3>
          <span className="text-xs text-black/35 flex items-center gap-1.5 group-hover:gap-3 transition-all duration-300 mt-auto">
            {t("common.read")} <span>→</span>
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

function PreviewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-16 items-start animate-pulse">
      <div className="aspect-[4/3] bg-black/8 rounded" />
      <div className="flex flex-col gap-8 pt-2">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-6 border-b border-black/10 pb-8 last:border-none">
            <div className="w-28 h-24 bg-black/8 rounded shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-black/8 rounded w-24" />
              <div className="h-4 bg-black/8 rounded w-full" />
              <div className="h-4 bg-black/8 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BlogPreview() {
  const { t, i18n } = useTranslation();
  const { data, isLoading } = useArticles(1);
  const locale = i18n.language;
  const headingLines = t("blogPreview.heading").split("\n");

  const preview = data?.articles.slice(0, 3) ?? [];
  const [featured, ...rest] = preview;

  return (
    <section id="blog" className="py-24 max-w-[1800px] mx-auto px-6">
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
            <Link
              to="/actualites"
              className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors duration-300 flex items-center gap-2 pb-1"
            >
              {t("blogPreview.cta")} <span>→</span>
            </Link>
          </div>
        </FadeIn>
      </div>

      {isLoading && <PreviewSkeleton />}

      {!isLoading && preview.length === 0 && (
        <p className="text-sm text-black/30 text-center py-16 uppercase tracking-widest">
          {t("blogPage.noArticles")}
        </p>
      )}

      {!isLoading && preview.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-16 items-start">
          {featured && <ArticleFeatured article={featured} locale={locale} />}
          <div className="flex flex-col gap-8 pt-2">
            {rest.map((article, i) => (
              <ArticleSmall
                key={article.id}
                article={article}
                locale={locale}
                delay={0.15 + i * 0.1}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
