import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import { FadeIn } from "../components/ui/fade-in";
import coris2 from "../assets/coris2.png";

type BlogPost = {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  featured: boolean;
  image?: string;
};

const postImages: Record<string, string> = {
  "01": "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=80",
  "02": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
  "03": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
  "04": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "05": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
  "06": "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80",
  "07": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
};

const categoryColors: Record<string, { bg: string; text: string }> = {
  Stratégie: { bg: "#dde8d5", text: "#538253" },
  Strategy: { bg: "#dde8d5", text: "#538253" },
  Intermédiation: { bg: "#d4e0e2", text: "#1d454c" },
  Intermediation: { bg: "#d4e0e2", text: "#1d454c" },
  Services: { bg: "#c8d9db", text: "#1d454c" },
  Formation: { bg: "#e8f0d8", text: "#538253" },
  Training: { bg: "#e8f0d8", text: "#538253" },
};

function CategoryBadge({ category }: { category: string }) {
  const c = categoryColors[category] ?? { bg: "#e5e5e5", text: "#333" };
  return (
    <span
      className="text-xs uppercase tracking-[0.2em] px-3 py-1 rounded-full"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {category}
    </span>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const { t } = useTranslation();
  return (
    <motion.article
      className="group cursor-pointer grid md:grid-cols-[1.4fr_1fr] gap-0 overflow-hidden"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0, 0, 1] }}
    >
      <div className="overflow-hidden" style={{ maxHeight: 480 }}>
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
          style={{ minHeight: 380 }}
        />
      </div>
      <div
        className="flex flex-col justify-end p-10 lg:p-14"
        style={{ backgroundColor: "#1d454c" }}
      >
        {/* Coris décoratif */}
        <div className="flex items-center gap-2 mb-8 opacity-20">
          {[0, 18, -12].map((r, i) => (
            <img
              key={i}
              src={coris2}
              alt=""
              aria-hidden="true"
              style={{
                width: i === 0 ? 32 : 24,
                height: i === 0 ? 32 : 24,
                transform: `rotate(${r}deg)`,
                objectFit: "contain",
                filter: "brightness(2)",
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 mb-5">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-white/40">{post.date}</span>
          <span className="text-xs text-white/30">
            · {post.readTime} {t("common.readTime")}
          </span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-light leading-snug text-white mb-5 group-hover:translate-x-1 transition-transform duration-300">
          {post.title}
        </h2>
        <p className="text-sm text-white/55 leading-relaxed mb-8">
          {post.excerpt}
        </p>
        <span className="text-xs uppercase tracking-[0.2em] text-[#ecede3]/60 flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
          {t("common.readMore")} <span>→</span>
        </span>
      </div>
    </motion.article>
  );
}

function ArticleCard({ post, delay }: { post: BlogPost; delay: number }) {
  const { t } = useTranslation();
  return (
    <motion.article
      className="group cursor-pointer flex flex-col"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.25, 0, 0, 1], delay }}
    >
      <div className="overflow-hidden mb-5" style={{ height: 220 }}>
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-600"
        />
      </div>
      <div className="flex items-center gap-3 mb-3">
        <CategoryBadge category={post.category} />
        <span className="text-xs text-black/35">{post.date}</span>
        <span className="text-xs text-black/25">· {post.readTime}</span>
      </div>
      <h3 className="text-lg font-light leading-snug mb-3 flex-1 group-hover:translate-x-1 transition-transform duration-300 text-[#1d454c]">
        {post.title}
      </h3>
      <p className="text-sm text-black/50 leading-relaxed mb-5 line-clamp-2">
        {post.excerpt}
      </p>
      <span className="text-xs uppercase tracking-[0.2em] text-black/35 flex items-center gap-2 group-hover:gap-4 transition-all duration-300 mt-auto">
        {t("common.read")} <span>→</span>
      </span>
    </motion.article>
  );
}

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const categories = t("blogPage.categories", {
    returnObjects: true,
  }) as string[];
  const allPosts = t("blogPage.posts", { returnObjects: true }) as BlogPost[];
  const posts = allPosts.map((p) => ({ ...p, image: postImages[p.id] ?? "" }));

  const [activeCategory, setActiveCategory] = useState(categories[0] ?? "");

  // Reset to "all" category when language changes
  useEffect(() => {
    setActiveCategory(categories[0] ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const filtered =
    activeCategory === categories[0]
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#ecede3]">
        <Navbar />

        {/* ══ HERO ══ */}
        <section
          className="relative overflow-hidden pt-36 pb-20"
          style={{ backgroundColor: "#1d454c" }}
        >
          {/* Coris décoratifs */}
          {[
            { top: "8%", left: "4%", size: 120, rotate: 20, opacity: 0.12 },
            { top: "50%", left: "1%", size: 80, rotate: -35, opacity: 0.1 },
            { top: "15%", left: "88%", size: 140, rotate: 50, opacity: 0.11 },
            { top: "60%", left: "92%", size: 100, rotate: -20, opacity: 0.09 },
            { top: "30%", left: "50%", size: 180, rotate: 70, opacity: 0.06 },
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
                opacity: c.opacity,
                transform: `rotate(${c.rotate}deg)`,
                objectFit: "contain",
                pointerEvents: "none",
                filter: "brightness(2)",
              }}
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

        {/* ══ FILTRES ══ */}
        <div
          className="sticky top-0 z-40 border-b"
          style={{ backgroundColor: "#ecede3", borderColor: "#1d454c22" }}
        >
          <div className="maxwidth mx-auto px-6">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="shrink-0 text-xs uppercase tracking-[0.2em] px-5 py-2 transition-all duration-200"
                  style={{
                    backgroundColor:
                      activeCategory === cat ? "#1d454c" : "transparent",
                    color: activeCategory === cat ? "#ecede3" : "#1d454c99",
                    border: "1px solid",
                    borderColor:
                      activeCategory === cat ? "#1d454c" : "#1d454c33",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ══ CONTENU ══ */}
        <div className="maxwidth mx-auto px-6 py-16">
          {filtered.length === 0 ? (
            <div className="text-center py-32 text-black/30 text-sm uppercase tracking-widest">
              {t("blogPage.noArticles")}
            </div>
          ) : (
            <>
              {/* Article featured */}
              {featured && (
                <div className="mb-16">
                  <FeaturedCard post={featured} />
                </div>
              )}

              {/* Séparateur */}
              {rest.length > 0 && (
                <div
                  className="flex items-center gap-4 mb-12"
                  style={{
                    borderTop: "1px solid #1d454c22",
                    paddingTop: "3rem",
                  }}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-black/30 shrink-0">
                    {t("blogPage.recentLabel")}
                  </p>
                  <div className="flex items-center gap-2 opacity-15">
                    {[0, 18, -10, 28].map((r, i) => (
                      <img
                        key={i}
                        src={coris2}
                        alt=""
                        aria-hidden="true"
                        style={{
                          width: i % 2 === 0 ? 20 : 15,
                          height: i % 2 === 0 ? 20 : 15,
                          transform: `rotate(${r}deg)`,
                          objectFit: "contain",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Grille */}
              {rest.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {rest.map((post, i) => (
                    <ArticleCard key={post.id} post={post} delay={i * 0.08} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* ══ CTA NEWSLETTER ══ */}
        <section
          className="py-24 relative overflow-hidden"
          style={{ backgroundColor: "#538253" }}
        >
          {[
            { top: "10%", left: "3%", size: 120, rotate: 25, opacity: 0.2 },
            { top: "55%", left: "0%", size: 90, rotate: -40, opacity: 0.15 },
            { top: "20%", left: "88%", size: 150, rotate: 55, opacity: 0.18 },
            { top: "65%", left: "92%", size: 80, rotate: -15, opacity: 0.14 },
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
                opacity: c.opacity,
                transform: `rotate(${c.rotate}deg)`,
                objectFit: "contain",
                pointerEvents: "none",
                filter: "brightness(2)",
              }}
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
              <form
                className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  required
                  placeholder={t("blogPage.newsletter.placeholder")}
                  className="flex-1 px-5 py-3 text-sm text-[#1d454c] placeholder-[#1d454c]/40 focus:outline-none bg-[#ecede3]"
                />
                <button
                  type="submit"
                  className="px-8 py-3 text-xs uppercase tracking-[0.2em] text-[#ecede3] transition-opacity duration-200 hover:opacity-80 shrink-0"
                  style={{ backgroundColor: "#1d454c" }}
                >
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
