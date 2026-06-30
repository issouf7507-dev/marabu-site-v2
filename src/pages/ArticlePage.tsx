import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { useArticle, formatDate } from "../hooks/useArticles";

function ArticleSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-full bg-black/10" style={{ height: 480 }} />
      <div className="maxwidth mx-auto px-6 py-16 max-w-3xl">
        <div className="h-3 bg-black/10 rounded w-32 mb-6" />
        <div className="h-10 bg-black/10 rounded w-full mb-4" />
        <div className="h-10 bg-black/10 rounded w-3/4 mb-12" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-4 bg-black/8 rounded w-full mb-3" />
        ))}
      </div>
    </div>
  );
}

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const { data: article, isLoading, isError } = useArticle(id ?? "");

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#ecede3]">
        <Navbar />

        {isLoading && (
          <div className="pt-20">
            <ArticleSkeleton />
          </div>
        )}

        {!isLoading && isError && (
          <div className="pt-40 text-center">
            <p className="text-black/30 text-sm uppercase tracking-widest mb-8">
              {t("blogPage.noArticles")}
            </p>
            <Link
              to="/actualites"
              className="text-xs uppercase tracking-[0.2em] text-[#1d454c] flex items-center gap-2 justify-center hover:gap-4 transition-all duration-300"
            >
              ← {t("blogPage.eyebrow")}
            </Link>
          </div>
        )}

        {!isLoading && article && (
          <>
            {/* Hero image */}
            <motion.div
              className="w-full overflow-hidden"
              style={{ height: "clamp(300px, 50vh, 560px)", paddingTop: 80 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Article body */}
            <div className="maxwidth mx-auto px-6 py-16" style={{ maxWidth: 800 }}>
              {/* Back link */}
              <Link
                to="/actualites"
                className="text-xs uppercase tracking-[0.2em] text-black/40 flex items-center gap-2 mb-10 hover:gap-4 hover:text-[#1d454c] transition-all duration-300"
              >
                ← {t("blogPage.eyebrow")}
              </Link>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                {article.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full"
                    style={{ backgroundColor: "#dde8d5", color: "#538253" }}
                  >
                    {cat.name}
                  </span>
                ))}
                <span className="text-xs text-black/35">
                  {formatDate(article.publishedAt, locale)}
                </span>
              </div>

              {/* Title */}
              <motion.h1
                className="text-[clamp(1.8rem,4vw,3rem)] font-light leading-snug text-[#1d454c] mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {article.title}
              </motion.h1>

              {/* Content */}
              <motion.div
                className="article-content"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
          </>
        )}

        <Footer />
      </div>
    </PageTransition>
  );
}
