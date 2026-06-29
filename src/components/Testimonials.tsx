import { useTranslation } from "react-i18next";
import { FadeIn } from "./ui/fade-in";
import coris2 from "../assets/coris2.png";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export default function Testimonials() {
  const { t } = useTranslation();
  const items = t("testimonials.items", {
    returnObjects: true,
  }) as Testimonial[];
  const headingLines = t("testimonials.heading").split("\n");

  return (
    <section
      id="testimonials"
      className="py-24 bg-[#ecede3]"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {[
        { top: "8%", left: "1%", size: 75, rotate: 25, opacity: 0.14 },
        { top: "55%", left: "0%", size: 55, rotate: -40, opacity: 0.11 },
        { top: "80%", left: "5%", size: 65, rotate: 60, opacity: 0.13 },
        { top: "15%", left: "91%", size: 80, rotate: -20, opacity: 0.14 },
        { top: "60%", left: "94%", size: 50, rotate: 50, opacity: 0.1 },
        { top: "88%", left: "85%", size: 70, rotate: -65, opacity: 0.12 },
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
            userSelect: "none",
          }}
        />
      ))}

      <div className="maxwidth mx-auto px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-16">
          <FadeIn>
            <p className="text-[clamp(2rem,5vw,4rem)] uppercase tracking-[0.25em] text-[#538253]">
              {t("testimonials.label")}
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-3xl font-light max-w-xs text-right leading-snug text-gray-500">
              {headingLines[0]}
              <br />
              {headingLines[1]}
            </h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {items.map((t_, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="bg-white rounded-2xl p-8 flex flex-col gap-6 h-full">
                <span className="text-6xl font-serif leading-none text-[#538253] select-none">
                  "
                </span>
                <p className="text-gray-500 leading-relaxed text-base flex-1">
                  {t_.quote}
                </p>
                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#538253]/10 flex items-center justify-center shrink-0">
                    <span className="text-[#538253] font-semibold text-sm">
                      {t_.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {t_.name}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {t_.role} · {t_.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
