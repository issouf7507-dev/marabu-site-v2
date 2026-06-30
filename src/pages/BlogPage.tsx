import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { FadeIn } from "../components/ui/fade-in";
import coris2 from "../assets/coris2.png";
import { useArticles, formatDate, type Article, type Pagination } from "../hooks/useArticles";

// ─── Article cards ────────────────────────────────────────────────────────────

function FeaturedCard({ article, locale }: { article: Article; locale: string }) {
  const { t } = useTranslation();
  return (
    <Link to={`/actualites/${article.id}`} className="block">
      <motion.article
        className="group cursor-pointer grid md:grid-cols-[1.4fr_1fr] gap-0 overflow-hidden"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
      >
        <div className="overflow-hidden" style={{ maxHeight: 480 }}>
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
            style={{ minHeight: 380 }}
          />
        </div>
        <div className="flex flex-col justify-end p-10 lg:p-14" style={{ backgroundColor: "#1d454c" }}>
          <div className="flex items-center gap-2 mb-8 opacity-20">
            {[0, 18, -12].map((r, i) => (
              <img key={i} src={coris2} alt="" aria-hidden="true"
                style={{ width: i === 0 ? 32 : 24, height: i === 0 ? 32 : 24,
                  transform: `rotate(${r}deg)`, objectFit: "contain", filter: "brightness(2)" }}
              />
            ))}
          </div>
          <span className="text-xs text-white/40 mb-5">
            {formatDate(article.publishedAt, locale)}
          </span>
          <h2 className="text-2xl lg:text-3xl font-light leading-snug text-white mb-8 group-hover:translate-x-1 transition-transform duration-300">
            {article.title}
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] text-[#ecede3]/60 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
            {t("common.readMore")} <span>→</span>
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

function ArticleCard({ article, locale, delay }: { article: Article; locale: string; delay: number }) {
  const { t } = useTranslation();
  return (
    <Link to={`/actualites/${article.id}`} className="block">
      <motion.article
        className="group cursor-pointer flex flex-col"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.25, 0, 0, 1], delay }}
      >
        <div className="overflow-hidden mb-5" style={{ height: 220 }}>
          <img
            src={article.featuredImage}
            alt={article.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600"
          />
        </div>
        <span className="text-xs text-black/35 mb-3">
          {formatDate(article.publishedAt, locale)}
        </span>
        <h3 className="text-lg font-light leading-snug mb-5 flex-1 group-hover:translate-x-1 transition-transform duration-300 text-[#1d454c]">
          {article.title}
        </h3>
        <span className="text-xs uppercase tracking-[0.2em] text-black/35 flex items-center gap-2 group-hover:gap-4 transition-all duration-300 mt-auto">
          {t("common.read")} <span>→</span>
        </span>
      </motion.article>
    </Link>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function pageRange(current: number, total: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: Array<number | "…"> = [];
  const add = (n: number) => { if (!pages.includes(n)) pages.push(n); };
  [1, 2].forEach(add);
  if (current > 4) pages.push("…");
  for (let i = Math.max(3, current - 1); i <= Math.min(total - 2, current + 1); i++) add(i);
  if (current < total - 3) pages.push("…");
  [total - 1, total].forEach(add);
  return pages;
}

function Paginator({ pagination, onChange }: { pagination: Pagination; onChange: (p: number) => void }) {
  const { currentPage, totalPages, totalItems } = pagination;
  const pages = pageRange(currentPage, totalPages);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-6 pt-16">
      <p className="text-xs text-black/30 uppercase tracking-widest">
        {totalItems} articles · page {currentPage}/{totalPages}
      </p>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => onChange(currentPage - 1)}
          disabled={!pagination.hasPrev}
          className="w-10 h-10 flex items-center justify-center text-sm transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
          style={{ color: "#1d454c", border: "1px solid #1d454c33" }}
          aria-label="Page précédente"
        >
          ←
        </button>

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="w-10 h-10 flex items-center justify-center text-sm text-black/30">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className="w-10 h-10 flex items-center justify-center text-xs tracking-wider transition-all duration-200"
              style={{
                backgroundColor: p === currentPage ? "#1d454c" : "transparent",
                color: p === currentPage ? "#ecede3" : "#1d454c99",
                border: "1px solid",
                borderColor: p === currentPage ? "#1d454c" : "#1d454c33",
              }}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onChange(currentPage + 1)}
          disabled={!pagination.hasNext}
          className="w-10 h-10 flex items-center justify-center text-sm transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
          style={{ color: "#1d454c", border: "1px solid #1d454c33" }}
          aria-label="Page suivante"
        >
          →
        </button>
      </div>
    </div>
  );
}

// ─── Skeletons ────────────────────────────────────────────────────────────────

function FeaturedSkeleton() {
  return (
    <div className="grid md:grid-cols-[1.4fr_1fr] overflow-hidden mb-16 animate-pulse" style={{ height: 420 }}>
      <div className="bg-black/8" />
      <div style={{ backgroundColor: "#1d454c20" }} />
    </div>
  );
}

function GridSkeleton({ count }: { count: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="bg-black/8 rounded" style={{ height: 220 }} />
          <div className="h-3 bg-black/8 rounded w-24" />
          <div className="h-5 bg-black/8 rounded w-full" />
          <div className="h-5 bg-black/8 rounded w-3/4" />
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching } = useArticles(page);

  const articles = data?.articles ?? [];
  const pagination = data?.pagination;

  const isFirstPage = page === 1;
  const [featured, ...rest] = isFirstPage ? articles : [null, ...articles];

  function changePage(p: number) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#ecede3]">
        <Navbar />

        {/* ── HERO ── */}
        <section className="relative overflow-hidden pt-36 pb-20" style={{ backgroundColor: "#1d454c" }}>
          {[
            { top: "8%", left: "4%", size: 120, rotate: 20, opacity: 0.12 },
            { top: "50%", left: "1%", size: 80, rotate: -35, opacity: 0.1 },
            { top: "15%", left: "88%", size: 140, rotate: 50, opacity: 0.11 },
            { top: "60%", left: "92%", size: 100, rotate: -20, opacity: 0.09 },
            { top: "30%", left: "50%", size: 180, rotate: 70, opacity: 0.06 },
          ].map((c, i) => (
            <img key={i} src={coris2} alt="" aria-hidden="true"
              style={{ position: "absolute", top: c.top, left: c.left, width: c.size,
                height: c.size, opacity: c.opacity, transform: `rotate(${c.rotate}deg)`,
                objectFit: "contain", pointerEvents: "none", filter: "brightness(2)" }}
            />
          ))}
          <div className="maxwidth mx-auto px-6 relative">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.35em] text-[#ecede3]/40 mb-4">
                {t("blogPage.eyebrow")}
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="text-[clamp(3rem,7vw,7rem)] font-light leading-none text-[#ecede3] mb-6">
                {t("blogPage.title1")}
                <br />
                <span style={{ color: "#538253" }}>{t("blogPage.title2")}</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="text-[#ecede3]/50 text-sm leading-relaxed max-w-md">
                {t("blogPage.subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── CONTENU ── */}
        <div className="maxwidth mx-auto px-6 py-16" style={{ opacity: isFetching ? 0.6 : 1, transition: "opacity 0.2s" }}>

          {isLoading && (
            <>
              <FeaturedSkeleton />
              <GridSkeleton count={9} />
            </>
          )}

          {!isLoading && isError && (
            <div className="py-32 text-center text-black/30 text-sm uppercase tracking-widest">
              {t("blogPage.noArticles")}
            </div>
          )}

          {!isLoading && !isError && articles.length === 0 && (
            <div className="py-32 text-center text-black/30 text-sm uppercase tracking-widest">
              {t("blogPage.noArticles")}
            </div>
          )}

          {!isLoading && !isError && articles.length > 0 && (
            <>
              {/* Article en vedette sur la page 1 */}
              {isFirstPage && featured && (
                <div className="mb-16">
                  <FeaturedCard article={featured} locale={locale} />
                </div>
              )}

              {/* Séparateur */}
              {rest.length > 0 && (
                <div className="flex items-center gap-4 mb-12"
                  style={{ borderTop: "1px solid #1d454c22", paddingTop: isFirstPage ? "3rem" : "0" }}>
                  <p className="text-xs uppercase tracking-[0.3em] text-black/30 shrink-0">
                    {isFirstPage ? t("blogPage.recentLabel") : `Page ${page}`}
                  </p>
                  <div className="flex items-center gap-2 opacity-15">
                    {[0, 18, -10, 28].map((r, i) => (
                      <img key={i} src={coris2} alt="" aria-hidden="true"
                        style={{ width: i % 2 === 0 ? 20 : 15, height: i % 2 === 0 ? 20 : 15,
                          transform: `rotate(${r}deg)`, objectFit: "contain" }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Grille */}
              {rest.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {rest.map((article, i) => (
                    <ArticleCard key={article.id} article={article} locale={locale} delay={i * 0.06} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {pagination && (
                <Paginator pagination={pagination} onChange={changePage} />
              )}
            </>
          )}
        </div>

        {/* ── CTA NEWSLETTER ── */}
        <section className="py-24 relative overflow-hidden" style={{ backgroundColor: "#538253" }}>
          {[
            { top: "10%", left: "3%", size: 120, rotate: 25, opacity: 0.2 },
            { top: "55%", left: "0%", size: 90, rotate: -40, opacity: 0.15 },
            { top: "20%", left: "88%", size: 150, rotate: 55, opacity: 0.18 },
            { top: "65%", left: "92%", size: 80, rotate: -15, opacity: 0.14 },
          ].map((c, i) => (
            <img key={i} src={coris2} alt="" aria-hidden="true"
              style={{ position: "absolute", top: c.top, left: c.left, width: c.size,
                height: c.size, opacity: c.opacity, transform: `rotate(${c.rotate}deg)`,
                objectFit: "contain", pointerEvents: "none", filter: "brightness(2)" }}
            />
          ))}
          <div className="maxwidth mx-auto px-6 text-center relative">
            <FadeIn>
              <p className="text-xs uppercase tracking-[0.35em] text-[#ecede3]/60 mb-4">
                {t("blogPage.newsletter.eyebrow")}
              </p>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-light text-[#ecede3] mb-5 leading-snug">
                {t("blogPage.newsletter.heading")}
              </h2>
              <p className="text-[#ecede3]/60 text-sm max-w-md mx-auto mb-10">
                {t("blogPage.newsletter.desc")}
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"
                onSubmit={(e) => e.preventDefault()}>
                <input type="email" required placeholder={t("blogPage.newsletter.placeholder")}
                  className="flex-1 px-5 py-3 text-sm text-[#1d454c] placeholder-[#1d454c]/40 focus:outline-none bg-[#ecede3]"
                />
                <button type="submit"
                  className="px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#ecede3] transition-opacity duration-200 hover:opacity-80 shrink-0"
                  style={{ backgroundColor: "#1d454c" }}>
                  {t("blogPage.newsletter.cta")}
                </button>
              </form>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
