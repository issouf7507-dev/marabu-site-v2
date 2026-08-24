import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { CONTACT_EMAIL } from "../config/site";
import coris2 from "../assets/coris2.webp";

const ease = [0.25, 0, 0, 1] as const;

// Clé publique Web3Forms — sûre côté client (elle n'autorise que l'envoi).
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

type FieldErrors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulaire de contact du site — instance unique, montée par la page Contact
 * comme par la section contact de la page Services.
 *
 * Il portait auparavant deux implémentations parallèles (même endpoint, même
 * validation, mêmes champs) : toute évolution devait être faite deux fois, et
 * les deux copies avaient déjà divergé sur le marqueur « champ requis » et le
 * visuel de confirmation.
 *
 * @param idPrefix préfixe des `id` des champs. À changer seulement si deux
 * formulaires devaient coexister sur une même page — des `id` en double
 * casseraient l'association `label`/champ et les `aria-describedby`.
 * @param source page d'origine, reportée dans l'objet de l'e-mail : c'est le
 * seul moyen de savoir, à la réception, depuis quelle page le lead est parti.
 */
export default function ContactForm({
  idPrefix = "contact",
  source,
}: {
  idPrefix?: string;
  source?: string;
}) {
  const { t } = useTranslation();
  const services = t("contact.services", { returnObjects: true }) as string[];

  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const submitted = status === "sent";
  const successRef = useRef<HTMLDivElement>(null);

  // Après envoi, on déplace le focus sur le message de confirmation : sinon un
  // utilisateur clavier/lecteur d'écran reste sur un bouton qui a disparu et
  // n'a aucun retour que l'action a réussi.
  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  function fieldError(name: string, value: string): string | undefined {
    const v = value.trim();
    if (name === "email") {
      if (!v) return t("contact.fieldRequired");
      return EMAIL_RE.test(v) ? undefined : t("contact.emailInvalid");
    }
    if (name === "name" || name === "message") {
      return v ? undefined : t("contact.fieldRequired");
    }
    return undefined;
  }

  function validateAll(): FieldErrors {
    const next: FieldErrors = {};
    (["name", "email", "message"] as const).forEach((k) => {
      const err = fieldError(k, form[k]);
      if (err) next[k] = err;
    });
    return next;
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // On efface l'erreur d'un champ dès que l'utilisateur le corrige.
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  const inputStyle = {
    border: "1px solid #1d454c33",
    backgroundColor: "#fff",
  };
  const inputFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    e.target.style.borderColor = "#538253";
    e.target.style.boxShadow = "0 0 0 3px #53825340";
  };
  const inputBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    e.target.style.borderColor = "#1d454c33";
    e.target.style.boxShadow = "none";
  };

  function handleFieldBlur(
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    inputBlur(e);
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: fieldError(name, value) }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    // Validation côté client avant tout envoi : messages par champ + focus sur
    // le premier champ invalide (a11y — l'utilisateur sait quoi corriger).
    const errs = validateAll();
    setErrors(errs);
    const firstInvalid = (["name", "email", "message"] as const).find(
      (k) => errs[k],
    );
    if (firstInvalid) {
      document.getElementById(`${idPrefix}-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        // Sans borne, une connexion instable laisse le bouton bloqué sur
        // « Envoi en cours… » indéfiniment, sans erreur ni possibilité de
        // réessayer : le formulaire redevient un trou noir à leads.
        signal: AbortSignal.timeout(15000),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: source
            ? `Nouveau message du site (${source}) — ${form.name}`
            : `Nouveau message du site — ${form.name}`,
          from_name: "Site Marabu",
          name: form.name,
          email: form.email,
          organisation: form.organisation || "—",
          service: form.service || "—",
          message: form.message,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Submission failed");
      }
      setStatus("sent");
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    }
  }

  const labelClass =
    "block text-xs uppercase tracking-[0.2em] text-black/60 mb-2";
  const fieldClass =
    "w-full px-4 py-3 text-sm text-[#1d454c] placeholder-black/45 transition-all duration-200";
  const errorClass = "mt-1.5 text-xs text-[#b4231d]";

  if (submitted) {
    return (
      <motion.div
        ref={successRef}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        className="flex flex-col items-center justify-center text-center py-24 outline-none"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="flex items-center gap-3 mb-8 opacity-20">
          {[0, 15, -10].map((r, i) => (
            <img
              key={i}
              src={coris2}
              alt=""
              aria-hidden="true"
              style={{
                width: 30,
                height: 30,
                transform: `rotate(${r}deg)`,
                objectFit: "contain",
              }}
            />
          ))}
        </div>
        <div
          className="w-14 h-14 flex items-center justify-center mb-6"
          style={{ backgroundColor: "#538253" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={2}
            className="w-6 h-6"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-xs uppercase tracking-[0.35em] text-[#3f6b3f] mb-3">
          {t("contact.successLabel")}
        </p>
        <h3 className="text-2xl font-light text-[#1d454c] mb-2">
          {t("contact.successTitle")}
        </h3>
        <p className="text-black/65 text-sm">{t("contact.successDesc")}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Nom + Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor={`${idPrefix}-name`} className={labelClass}>
            {t("contact.fields.name")}{" "}
            <span style={{ color: "#538253" }} aria-hidden="true">
              {t("common.required")}
            </span>
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            required
            aria-required="true"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={
              errors.name ? `${idPrefix}-name-error` : undefined
            }
            value={form.name}
            onChange={handleChange}
            placeholder={t("contact.fields.namePlaceholder")}
            className={fieldClass}
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={handleFieldBlur}
          />
          {errors.name && (
            <p
              id={`${idPrefix}-name-error`}
              role="alert"
              className={errorClass}
            >
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className={labelClass}>
            {t("contact.fields.email")}{" "}
            <span style={{ color: "#538253" }} aria-hidden="true">
              {t("common.required")}
            </span>
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            required
            aria-required="true"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={
              errors.email ? `${idPrefix}-email-error` : undefined
            }
            value={form.email}
            onChange={handleChange}
            placeholder={t("contact.fields.emailPlaceholder")}
            className={fieldClass}
            style={inputStyle}
            onFocus={inputFocus}
            onBlur={handleFieldBlur}
          />
          {errors.email && (
            <p
              id={`${idPrefix}-email-error`}
              role="alert"
              className={errorClass}
            >
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Organisation */}
      <div>
        <label htmlFor={`${idPrefix}-org`} className={labelClass}>
          {t("contact.fields.org")}
        </label>
        <input
          id={`${idPrefix}-org`}
          name="organisation"
          type="text"
          value={form.organisation}
          onChange={handleChange}
          placeholder={t("contact.fields.orgPlaceholder")}
          className={fieldClass}
          style={inputStyle}
          onFocus={inputFocus}
          onBlur={inputBlur}
        />
      </div>

      {/* Service souhaité */}
      <div>
        <label htmlFor={`${idPrefix}-service`} className={labelClass}>
          {t("contact.fields.service")}
        </label>
        <select
          id={`${idPrefix}-service`}
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full px-4 py-3 text-sm text-[#1d454c] transition-all duration-200 cursor-pointer"
          style={inputStyle}
        >
          <option value="">{t("contact.fields.servicePlaceholder")}</option>
          {services.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor={`${idPrefix}-message`} className={labelClass}>
          {t("contact.fields.message")}{" "}
          <span style={{ color: "#538253" }} aria-hidden="true">
            {t("common.required")}
          </span>
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          required
          aria-required="true"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? `${idPrefix}-message-error` : undefined
          }
          rows={6}
          value={form.message}
          onChange={handleChange}
          placeholder={t("contact.fields.messagePlaceholder")}
          className={`${fieldClass} resize-none`}
          style={inputStyle}
          onFocus={inputFocus}
          onBlur={handleFieldBlur}
        />
        {errors.message && (
          <p
            id={`${idPrefix}-message-error`}
            role="alert"
            className={errorClass}
          >
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="text-sm px-4 py-3"
          style={{
            backgroundColor: "#b4231d10",
            border: "1px solid #b4231d40",
            color: "#8c1a15",
          }}
        >
          {t("contact.errorMessage")}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      )}

      <motion.button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 text-xs uppercase tracking-[0.25em] text-[#ecede3] transition-opacity duration-200 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "#1d454c",
          opacity: status === "sending" ? 0.6 : 1,
        }}
        whileHover={status === "sending" ? undefined : { opacity: 0.85 }}
        whileTap={status === "sending" ? undefined : { scale: 0.98 }}
      >
        {status === "sending" ? t("contact.submitting") : t("contact.submit")}
      </motion.button>
    </form>
  );
}
