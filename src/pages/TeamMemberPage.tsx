import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import Seo from "../components/Seo";
import { FadeIn } from "../components/ui/fade-in";
import { LINKEDIN, SITE_URL } from "../config/site";
import { TEAM } from "../config/team";
import { CVS, type Cv } from "../config/cv";
import { hasCv } from "../config/cv-ids";
import coris2 from "../assets/coris2.webp";

/**
 * Portrait du CV, avec repli sur les initiales — même contrat que la vignette
 * de TeamSection : les photos vivent dans `public/persons/` et peuvent manquer.
 * Ici le nom est porté par le <h1> voisin, d'où `alt=""`.
 */
function Portrait({ name, photo }: { name: string; photo?: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("");

  return (
    <div
      className="w-full aspect-square overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#53825314" }}
      aria-hidden="true"
    >
      {photo && !failed ? (
        <img
          src={photo}
          alt=""
          decoding="async"
          className="w-full h-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-4xl font-light tracking-widest text-[#3f6b3f]">
          {initials}
        </span>
      )}
    </div>
  );
}

/** Titre de rubrique, repris à l'identique des sections de « À propos ». */
function SectionTitle({ children }: { children: string }) {
  return (
    <p className="text-xs uppercase tracking-[0.3em] text-black/60 mb-6">
      {children}
    </p>
  );
}

/** Bloc de la colonne latérale : titre discret + liste. */
function AsideBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[#3f6b3f] mb-4">
        {title}
      </p>
      <ul className="space-y-2.5 list-none p-0">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm text-black/65 leading-relaxed pl-4 relative"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-[0.6em] w-1.5 h-px"
              style={{ backgroundColor: "#538253" }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CvBody({ cv }: { cv: Cv }) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-16 items-start">
      {/* ── COLONNE LATÉRALE : expertise, repères, formation ── */}
      {/* Pas de `sticky` ici : la colonne est plus haute que l'écran sur la
          plupart des CV, elle n'aurait aucune marge pour se décaler. */}
      <aside className="space-y-10">
        <FadeIn>
          <AsideBlock
            title={t("teamMember.expertise")}
            items={cv.expertise}
          />
        </FadeIn>

        <FadeIn delay={0.05}>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-[#3f6b3f] mb-4">
              {t("teamMember.figures")}
            </p>
            <ul className="grid grid-cols-2 gap-3 list-none p-0">
              {cv.figures.map((figure) => (
                <li
                  key={figure}
                  className="text-xs leading-snug text-black/70 p-3"
                  style={{ backgroundColor: "#53825310" }}
                >
                  {figure}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <AsideBlock
            title={t("teamMember.education")}
            items={cv.education}
          />
        </FadeIn>

        {cv.certifications && (
          <FadeIn delay={0.15}>
            <AsideBlock
              title={t("teamMember.certifications")}
              items={cv.certifications}
            />
          </FadeIn>
        )}
      </aside>

      {/* ── COLONNE PRINCIPALE : profil, expérience, références ── */}
      <div>
        <section className="pb-16" style={{ borderBottom: "1px solid #f0f0f0" }}>
          <FadeIn>
            <SectionTitle>{t("teamMember.profile")}</SectionTitle>
          </FadeIn>
          <div className="space-y-5">
            {cv.profile.map((paragraph, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                {/* Largeur de lecture bornée : la colonne fait ~1000 px sur
                    grand écran, soit des lignes bien trop longues. */}
                <p className="text-black/65 leading-relaxed text-sm max-w-3xl">
                  {paragraph}
                </p>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="py-16" style={{ borderBottom: "1px solid #f0f0f0" }}>
          <FadeIn>
            <SectionTitle>{t("teamMember.experience")}</SectionTitle>
          </FadeIn>
          <ol className="list-none p-0 m-0">
            {cv.experience.map((job, i) => (
              <FadeIn key={`${job.period}-${job.role}`} delay={i * 0.04}>
                <li
                  className="grid grid-cols-1 sm:grid-cols-[170px_1fr] gap-2 sm:gap-6 py-5"
                  style={{ borderTop: i === 0 ? undefined : "1px solid #f0f0f0" }}
                >
                  <p className="text-xs text-[#3f6b3f] tracking-wide pt-0.5">
                    {job.period}
                  </p>
                  <div>
                    <p className="text-sm font-medium text-gray-900 leading-relaxed">
                      {job.role}
                    </p>
                    {job.org && (
                      <p className="text-sm text-black/60 mt-1">{job.org}</p>
                    )}
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </section>

        <section className="pt-16">
          <FadeIn>
            <SectionTitle>{t("teamMember.references")}</SectionTitle>
          </FadeIn>
          <div className="space-y-4">
            {cv.references.map((ref, i) => (
              <FadeIn key={ref.title} delay={i * 0.04}>
                <div
                  className="flex gap-6 py-5"
                  style={{ borderTop: "1px solid #f0f0f0" }}
                >
                  <span className="text-xs text-[#3f6b3f] tracking-widest shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="max-w-3xl">
                    <p className="font-medium text-gray-900 mb-1 text-sm">
                      {ref.title}
                    </p>
                    <p className="text-black/65 text-sm leading-relaxed">
                      {ref.text}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/**
 * CV d'un membre de l'équipe (`/equipe/:id`).
 *
 * L'`id` de l'URL est celui de `TEAM` : il sert de clé à la fois pour la fiche
 * (nom, photo, LinkedIn), pour le poste traduit (`about.team.roles.<id>`) et
 * pour le CV (`CVS`). Un membre sans CV n'a pas de page — sa carte n'est pas
 * cliquable côté « À propos », et l'URL saisie à la main affiche le repli.
 */
export default function TeamMemberPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const member = TEAM.find((m) => m.id === id);
  const cv = id && hasCv(id) ? CVS[id] : undefined;

  if (!member || !cv) {
    return (
      <PageTransition>
        <Seo
          title={t("teamMember.notFoundTitle")}
          description={t("teamMember.notFoundDesc")}
          path="/a-propos#team"
        />
        <div className="min-h-screen bg-[#ecede3] flex flex-col">
          <Navbar />
          <main
            id="main-content"
            className="flex-1 flex items-center justify-center px-6 py-40"
          >
            <div className="text-center max-w-lg">
              <h1 className="text-2xl font-light text-[#1d454c] mb-4">
                {t("teamMember.notFoundTitle")}
              </h1>
              <p className="text-black/65 text-sm leading-relaxed mb-10">
                {t("teamMember.notFoundDesc")}
              </p>
              <Link
                to="/a-propos#team"
                className="inline-block text-xs uppercase tracking-[0.2em] px-8 py-3.5 text-[#ecede3] transition-opacity duration-200 hover:opacity-85"
                style={{ backgroundColor: "#1d454c" }}
              >
                {t("teamMember.back")}
              </Link>
            </div>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  const role = t(`about.team.roles.${member.id}`);

  return (
    <PageTransition>
      <Seo
        title={`${member.name} — ${role}`}
        description={t("teamMember.seoDescription", {
          name: member.name,
          role: role.toLowerCase(),
        })}
        path={`/equipe/${member.id}`}
        // og:image doit être absolue : `photo` est un chemin servi depuis
        // public/, les scrapers ne le résolvent pas eux-mêmes.
        image={member.photo ? `${SITE_URL}${member.photo}` : undefined}
      />
      <div className="min-h-screen bg-[#ecede3]">
        <Navbar />

        <main id="main-content">
          {/* ══ EN-TÊTE : portrait + identité ══ */}
          <div
            className="maxwidth mx-auto px-6 lg:px-12 pt-32 pb-12 relative overflow-hidden"
            style={{ borderBottom: "1px solid #e5e7eb" }}
          >
            <Link
              to="/a-propos#team"
              className="text-xs uppercase tracking-[0.2em] text-black/60 inline-flex items-center gap-2 mb-10 hover:gap-4 hover:text-[#1d454c] transition-all duration-300"
            >
              ← {t("teamMember.back")}
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-12 items-start">
              <FadeIn>
                <Portrait name={member.name} photo={member.photo} />
              </FadeIn>

              <div className="space-y-5">
                <FadeIn delay={0.05}>
                  <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-light leading-tight text-[#1d454c]">
                    {member.name}
                  </h1>
                </FadeIn>
                <FadeIn delay={0.1}>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-[#538253]">
                      {role}
                    </p>
                    <p className="text-black/60 text-sm leading-relaxed mt-3 max-w-xl">
                      {cv.tagline}
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={0.15}>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
                    {cv.email && (
                      <a
                        href={`mailto:${cv.email}`}
                        className="text-sm text-[#1d454c] hover:underline break-all"
                      >
                        {cv.email}
                      </a>
                    )}
                    <p className="text-xs uppercase tracking-[0.2em] text-black/50">
                      {t("teamMember.languages")} : {cv.languages.join(" · ")}
                    </p>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("about.team.linkedinAria", {
                          name: member.name,
                        })}
                        className="w-9 h-9 shrink-0 flex items-center justify-center transition-opacity duration-200 hover:opacity-100"
                        style={{ border: "1px solid #1d454c25", opacity: 0.55 }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                          className="w-3.5 h-3.5"
                          style={{ color: "#1d454c" }}
                        >
                          <path d={LINKEDIN.path} />
                        </svg>
                      </a>
                    )}
                  </div>
                </FadeIn>
              </div>
            </div>

            {[
              { top: "12%", right: "3%", size: 64, rotate: 15, opacity: 0.1 },
              { top: "58%", right: "9%", size: 44, rotate: -30, opacity: 0.08 },
            ].map((c, i) => (
              <img
                key={i}
                src={coris2}
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: c.top,
                  right: c.right,
                  width: c.size,
                  height: c.size,
                  opacity: c.opacity,
                  transform: `rotate(${c.rotate}deg)`,
                  objectFit: "contain",
                  pointerEvents: "none",
                }}
              />
            ))}
          </div>

          {/* ══ CORPS DU CV ══ */}
          <div className="maxwidth mx-auto px-6 lg:px-12 py-16">
            <CvBody cv={cv} />
          </div>

          {/* ══ CTA ══ */}
          <section className="py-20" style={{ backgroundColor: "#1d454c" }}>
            <div className="maxwidth mx-auto px-6 lg:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <h2 className="text-[clamp(1.6rem,3vw,2.5rem)] font-light leading-tight text-white max-w-xl">
                {t("teamMember.ctaHeading")}
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-block text-xs uppercase tracking-[0.2em] px-8 py-4 transition-opacity duration-300 text-[#1d454c] font-medium"
                  style={{ backgroundColor: "#ecede3" }}
                >
                  {t("teamMember.ctaButton")}
                </Link>
                <Link
                  to="/a-propos#team"
                  className="inline-block text-xs uppercase tracking-[0.2em] px-8 py-4 text-[#ecede3] transition-colors duration-300 hover:bg-white/10"
                  style={{ border: "1px solid #ffffff40" }}
                >
                  {t("teamMember.back")}
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
