import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import Seo from "../components/Seo";
import { FadeIn } from "../components/ui/fade-in";
import OfferingExpert from "../components/services/OfferingExpert";
import ServicesContact from "../components/services/ServicesContact";
import {
  findOffering,
  useServiceData,
} from "../components/services/serviceData";
import { SITE_NAME, SITE_URL } from "../config/site";

function scrollToContact() {
  document
    .getElementById("contact")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Titre de rubrique, repris des sections du CV (`TeamMemberPage`). */
function SectionTitle({ children }: { children: string }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] text-black/60 mb-6">
      {children}
    </p>
  );
}

/** Repli d'un slug inconnu : même disposition que le CV introuvable. */
function OfferingNotFound() {
  const { t } = useTranslation();
  return (
    <PageTransition>
      <Seo
        title={t("servicesPage.offering.notFoundTitle")}
        description={t("servicesPage.offering.notFoundDesc")}
        path="/services"
      />
      <div className="min-h-screen bg-[#ecede3] flex flex-col">
        <Navbar />
        <main
          id="main-content"
          className="flex-1 flex items-center justify-center px-6 py-40"
        >
          <div className="text-center max-w-lg">
            <h1 className="text-2xl font-light text-[#1d454c] mb-4">
              {t("servicesPage.offering.notFoundTitle")}
            </h1>
            <p className="text-black/65 text-sm leading-relaxed mb-10">
              {t("servicesPage.offering.notFoundDesc")}
            </p>
            <Link
              to="/services"
              className="inline-block text-xs uppercase tracking-[0.2em] px-8 py-3.5 text-[#ecede3] transition-opacity duration-200 hover:opacity-85"
              style={{ backgroundColor: "#1d454c" }}
            >
              {t("servicesPage.offering.back")}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}

/**
 * Page d'une prestation (`/services/:slug`).
 *
 * Remplace l'ancienne modale de la page Services : une prestation par URL,
 * c'est un titre, une description et un contenu indexables séparément, et une
 * adresse que l'on peut partager. Le slug vient de `OFFERING_SLUGS` et ne
 * dépend pas de la langue.
 */
export default function OfferingPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { services } = useServiceData();

  const found = findOffering(services, slug);
  if (!found) return <OfferingNotFound />;

  const { svc, item } = found;
  const path = `/services/${item.slug}`;
  const related = svc.offerings.filter((o) => o.slug !== item.slug);
  // og:image doit être absolue : les scrapers ne résolvent pas les chemins.
  const image = `${SITE_URL}${item.img}`;

  /*
    Données structurées : la prestation comme `Service` rattaché à Marabu, et
    le fil d'Ariane, que Google peut afficher à la place de l'URL brute.
  */
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: item.title,
      serviceType: svc.name,
      description: item.details.intro,
      url: `${SITE_URL}${path}`,
      image,
      audience: { "@type": "Audience", audienceType: item.details.audience },
      provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      areaServed: "Africa",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { name: t("navbar.home"), url: `${SITE_URL}/` },
        { name: t("navbar.services"), url: `${SITE_URL}/services` },
        { name: svc.name, url: `${SITE_URL}/services#${svc.id}` },
        { name: item.title, url: `${SITE_URL}${path}` },
      ].map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    },
  ];

  return (
    <PageTransition>
      <Seo
        title={`${item.title} · ${svc.name}`}
        description={item.desc}
        path={path}
        image={image}
      />
      <script
        type="application/ld+json"
        // Contenu issu de nos seuls fichiers i18n ; `<` échappé pour qu'un
        // texte ne puisse jamais refermer la balise.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="min-h-screen bg-[#ecede3]">
        <Navbar />

        <main id="main-content">
          {/* ══ EN-TÊTE : visuel de la prestation, assombri pour le texte ══ */}
          <section className="relative overflow-hidden min-h-[440px] md:min-h-[60vh] flex items-end">
            <img
              src={item.img}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/45 to-black/40" />

            <div className="relative w-full maxwidth mx-auto px-6 lg:px-12 pt-36 pb-12">
              <nav aria-label={t("servicesPage.offering.breadcrumb")}>
                <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] uppercase tracking-[0.2em] text-white/65 mb-6 list-none p-0">
                  <li>
                    <Link to="/services" className="hover:text-white">
                      {t("navbar.services")}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      to={`/services#${svc.id}`}
                      className="hover:text-white"
                    >
                      {svc.name}
                    </Link>
                  </li>
                </ol>
              </nav>
              <h1 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-light leading-tight text-white max-w-4xl">
                {item.title}
              </h1>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl mt-6">
                {item.desc}
              </p>
              <div
                className="h-1 w-24 mt-8"
                style={{ backgroundColor: svc.color }}
              />
            </div>
          </section>

          {/* ══ CORPS ══ */}
          <div className="maxwidth mx-auto px-6 lg:px-12 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">
              <div>
                <FadeIn>
                  <SectionTitle>
                    {t("servicesPage.offering.eyebrow")}
                  </SectionTitle>
                  <p className="text-base sm:text-lg text-black/75 leading-relaxed max-w-3xl">
                    {item.details.intro}
                  </p>
                </FadeIn>

                <div className="grid sm:grid-cols-2 gap-10 mt-14">
                  <FadeIn>
                    <h2 className="text-xs uppercase tracking-[0.25em] text-black/60 mb-5 font-normal">
                      {t("servicesPage.offering.includes")}
                    </h2>
                    <ul className="space-y-3.5 list-none p-0">
                      {item.details.includes.map((line) => (
                        <li
                          key={line}
                          className="flex gap-3 text-sm text-black/70 leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: svc.color }}
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </FadeIn>

                  <FadeIn delay={0.05}>
                    <h2 className="text-xs uppercase tracking-[0.25em] text-black/60 mb-5 font-normal">
                      {t("servicesPage.offering.deliverables")}
                    </h2>
                    <ul className="space-y-3.5 list-none p-0">
                      {item.details.deliverables.map((line) => (
                        <li
                          key={line}
                          className="flex gap-3 text-sm text-black/70 leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 shrink-0 w-1.5 h-1.5"
                            style={{ backgroundColor: svc.color }}
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </FadeIn>
                </div>

                <FadeIn>
                  <div
                    className="mt-12 p-6"
                    style={{ backgroundColor: `${svc.color}12` }}
                  >
                    <h2 className="text-xs uppercase tracking-[0.25em] text-black/60 mb-2 font-normal">
                      {t("servicesPage.offering.audience")}
                    </h2>
                    <p className="text-sm text-black/70 leading-relaxed">
                      {item.details.audience}
                    </p>
                  </div>
                </FadeIn>
              </div>

              {/* ── Colonne latérale : référent + prise de contact ── */}
              <aside className="lg:sticky lg:top-28">
                {item.expert && (
                  <FadeIn>
                    <OfferingExpert member={item.expert} color={svc.color} />
                  </FadeIn>
                )}
                <FadeIn delay={0.05}>
                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToContact();
                      }}
                      className="text-center text-xs uppercase tracking-[0.2em] px-7 py-3.5 text-white transition-opacity duration-300 hover:opacity-90"
                      style={{ backgroundColor: svc.color }}
                    >
                      {t("common.contactUs")}
                    </a>
                    <Link
                      to="/services"
                      className="text-center text-xs uppercase tracking-[0.2em] px-7 py-3.5 border border-[#1d454c]/25 text-black/65 hover:bg-[#1d454c]/5 transition-colors duration-300"
                    >
                      ← {t("servicesPage.offering.back")}
                    </Link>
                  </div>
                </FadeIn>
              </aside>
            </div>
          </div>

          {/* ══ AUTRES PRESTATIONS DU MÊME SERVICE ══ */}
          <section
            className="maxwidth mx-auto px-6 lg:px-12 pb-24"
            aria-labelledby="related-offerings"
          >
            <h2
              id="related-offerings"
              className="text-xs uppercase tracking-[0.3em] text-black/60 mb-8 pt-12"
              style={{ borderTop: "1px solid #e5e7eb" }}
            >
              {t("servicesPage.offering.related", { service: svc.name })}
            </h2>
            <ul className="grid sm:grid-cols-3 gap-6 list-none p-0">
              {related.map((o, i) => (
                <li key={o.slug}>
                  <FadeIn delay={i * 0.05}>
                    <Link to={`/services/${o.slug}`} className="group block">
                      <div className="overflow-hidden h-44">
                        <img
                          src={o.img}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <p
                        className="text-xs tracking-widest mt-4"
                        style={{ color: svc.color }}
                      >
                        {o.n}
                      </p>
                      <h3 className="text-base font-medium text-gray-900 mt-1 underline-offset-4 decoration-1 group-hover:underline">
                        {o.title}
                      </h3>
                      <p className="text-sm text-black/65 leading-relaxed mt-2 line-clamp-3">
                        {o.desc}
                      </p>
                    </Link>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </section>

          <ServicesContact source={`Services — ${item.title}`} />
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
