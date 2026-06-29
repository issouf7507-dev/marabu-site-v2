import { useTranslation } from "react-i18next";
import { FadeIn } from "./ui/fade-in";
import coris2 from "../assets/coris2.png";

export default function Intro() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 maxwidth mx-auto px-6"
      style={{ position: "relative", overflow: "hidden" }}>
      {[
        { top: "5%",  left: "2%",  size: 80, rotate: 20,  opacity: 0.18 },
        { top: "30%", left: "0%",  size: 55, rotate: -40, opacity: 0.14 },
        { top: "65%", left: "3%",  size: 70, rotate: 60,  opacity: 0.16 },
        { top: "85%", left: "18%", size: 50, rotate: -15, opacity: 0.12 },
        { top: "10%", left: "88%", size: 65, rotate: 35,  opacity: 0.15 },
        { top: "45%", left: "92%", size: 85, rotate: -55, opacity: 0.18 },
        { top: "75%", left: "85%", size: 60, rotate: 75,  opacity: 0.13 },
        { top: "20%", left: "45%", size: 45, rotate: 10,  opacity: 0.1  },
      ].map((c, i) => (
        <img key={i} src={coris2} alt="" aria-hidden="true"
          style={{ position: "absolute", top: c.top, left: c.left, width: c.size, height: c.size,
            opacity: c.opacity, transform: `rotate(${c.rotate}deg)`, objectFit: "contain",
            pointerEvents: "none", userSelect: "none" }}
        />
      ))}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-24 items-start">
        <FadeIn>
          <p className="text-2xl uppercase tracking-[0.25em] text-[#538253] pt-1">
            {t("intro.label")}
          </p>
        </FadeIn>

        <div>
          <FadeIn>
            <h2 className="text-4xl font-light leading-snug text-gray-900 mb-8">
              {t("intro.heading")}
            </h2>
          </FadeIn>
          <div className="space-y-5 text-gray-500 text-base leading-relaxed max-w-2xl">
            <FadeIn delay={0.1}><p>{t("intro.p1")}</p></FadeIn>
            <FadeIn delay={0.18}><p>{t("intro.p2")}</p></FadeIn>
            <FadeIn delay={0.26}><p>{t("intro.p3")}</p></FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
