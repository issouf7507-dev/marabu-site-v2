import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FadeIn } from "../ui/fade-in";
import coris2 from "../../assets/coris2.webp";
import type { StepWithMedia } from "./serviceData";

/** Section « Notre méthode » : les étapes d'une mission, illustrées. */
export default function MethodSection({ steps }: { steps: StepWithMedia[] }) {
  const { t } = useTranslation();

  return (
    <section
      id="methode"
      className="scroll-mt-28 pt-20 relative overflow-hidden"
    >
      {[
        { top: "0%", right: "-2%", size: 130, rotate: 25 },
        { bottom: "5%", left: "-2%", size: 110, rotate: -40 },
        { top: "45%", right: "8%", size: 80, rotate: 60 },
      ].map((c, i) => (
        <img
          key={i}
          src={coris2}
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            top: c.top,
            bottom: c.bottom,
            left: c.left,
            right: c.right,
            width: c.size,
            height: c.size,
            opacity: 0.04,
            transform: `rotate(${c.rotate}deg)`,
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
      ))}
      <FadeIn>
        <p className="text-xs uppercase tracking-[0.3em] text-black/60 mb-2">
          {t("servicesPage.methode.eyebrow")}
        </p>
      </FadeIn>
      <FadeIn delay={0.05}>
        <h2 className="text-3xl font-light text-gray-900 mb-2">
          {t("servicesPage.methode.title")}
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="text-black/65 text-sm leading-relaxed max-w-lg mb-14">
          {t("servicesPage.methode.desc")}
        </p>
      </FadeIn>

      <div className="flex items-center gap-4 mb-12 opacity-15">
        {[-10, 20, -5, 30, -15, 45, -25].map((rotate, i) => (
          <img
            key={i}
            src={coris2}
            alt=""
            aria-hidden="true"
            style={{
              width: i % 2 === 0 ? 40 : 30,
              height: i % 2 === 0 ? 40 : 30,
              transform: `rotate(${rotate}deg)`,
              objectFit: "contain",
            }}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-x-16 gap-y-0">
        {steps.map((step, i) => (
          <motion.div
            key={step.n}
            className="py-7"
            style={{ borderTop: "1px solid #f0f0f0" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.55,
              ease: [0.25, 0, 0, 1],
              delay: i * 0.08,
            }}
          >
            {/* Step image */}
            <div className="overflow-hidden mb-5" style={{ height: 360 }}>
              <motion.img
                src={step.img}
                alt={step.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  ease: [0.25, 0, 0, 1],
                  delay: i * 0.08,
                }}
              />
            </div>
            <div className="flex gap-6">
              <span className="text-xs text-[#3f6b3f] tracking-widest shrink-0 pt-0.5">
                {step.n}
              </span>
              <div>
                <p className="font-medium text-gray-900 mb-1.5">{step.title}</p>
                <p className="text-black/65 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
