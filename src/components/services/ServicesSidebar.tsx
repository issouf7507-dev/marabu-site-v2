import { useTranslation } from "react-i18next";
import { ParallaxImage } from "./Parallax";
import coris2 from "../../assets/coris2.webp";
import conseil3 from "../../assets/imgs/conseils/conseil-3.webp";

/**
 * Sommaire collant de la page Services : navigation entre les expertises,
 * chiffres clés et raccourci vers le formulaire.
 *
 * @param active id de la section en cours, fourni par `useActiveSection`.
 * @param onNavigate défilement vers une section — le parent le fournit pour
 * que le sommaire et les CTA de la page partagent le même comportement.
 */
export default function ServicesSidebar({
  links,
  active,
  stats,
  onNavigate,
}: {
  links: { id: string; label: string }[];
  active: string;
  stats: { value: string; label: string }[];
  onNavigate: (id: string) => void;
}) {
  const { t } = useTranslation();

  return (
    <aside className="hidden lg:block self-stretch">
      <div className="sticky top-28">
        <p className="text-xs uppercase tracking-[0.25em] text-black/65 mb-5">
          {t("servicesPage.sidebarTitle")}
        </p>
        <nav className="space-y-0.5">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className="block w-full text-left text-sm py-2.5 px-3 rounded-lg transition-all duration-200"
              style={{
                color: active === link.id ? "#3f6b3f" : "#9ca3af",
                fontWeight: active === link.id ? 500 : 400,
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Cauris sidebar */}
        <div className="flex items-center gap-2 mt-6 mb-2 opacity-15">
          {[12, -20, 35, -8].map((rotate, i) => (
            <img
              key={i}
              src={coris2}
              alt=""
              aria-hidden="true"
              style={{
                width: i % 2 === 0 ? 28 : 22,
                height: i % 2 === 0 ? 28 : 22,
                transform: `rotate(${rotate}deg)`,
                objectFit: "contain",
              }}
            />
          ))}
        </div>

        {/* Sidebar image with parallax */}
        <div className="mt-2 overflow-hidden" style={{ height: 180 }}>
          <ParallaxImage src={conseil3} alt="" height={180} />
        </div>

        {/* Stats */}
        <div
          className="mt-4 p-5 space-y-5 relative overflow-hidden"
          style={{ backgroundColor: "#ecede3" }}
        >
          <img
            src={coris2}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: -10,
              right: -10,
              width: 100,
              height: 100,
              opacity: 0.06,
              transform: "rotate(20deg)",
              objectFit: "contain",
              pointerEvents: "none",
            }}
          />
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-light text-[#538253]">{s.value}</p>
              <p className="text-xs uppercase tracking-widest text-black/60 mt-0.5">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("contact");
            }}
            className="block text-center text-xs uppercase tracking-[0.2em] px-6 py-3 transition-all duration-300 text-white"
            style={{ backgroundColor: "#1d454c" }}
          >
            {t("servicesPage.sidebarCta")}
          </a>
        </div>
      </div>
    </aside>
  );
}
