import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2, AlertCircle, MessageCircle, Phone, ArrowRight, X, Zap, CreditCard,
} from "lucide-react";
import type { Plan } from "../data/services-data";

export function LeadForm({
  plan = null,
  onClearPlan,
}: {
  plan?: Plan | null;
  onClearPlan?: () => void;
}) {
  const [form, setForm] = useState({ name: "", contact: "" });
  const [contactType, setContactType] = useState<"phone" | "tg">("tg");
  const [errors, setErrors] = useState({ name: "", contact: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formStarted, setFormStarted] = useState(false);
  const [draftSent, setDraftSent] = useState(false);

  const markFormStart = () => {
    if (formStarted) return;
    setFormStarted(true);
    if (
      typeof window !== "undefined" &&
      typeof (window as any).ym === "function"
    ) {
      (window as any).ym(106751172, "reachGoal", "lead_form_start");
    }
  };

  useEffect(() => {
    if (!formStarted || submitted || loading || draftSent) return;
    if (!form.name.trim() || !form.contact.trim()) return;

    const timeoutId = window.setTimeout(async () => {
      const normalizedContact =
        contactType === "tg" ? `@${form.contact.replace(/^@/, "")}` : form.contact;

      const draftMessage = `
<b>🟡 ЧЕРНОВИК ЗАЯВКИ (не отправлена)</b>

<b>🎯 Тип заявки:</b> Бесплатная консультация
<b>👤 Имя:</b> ${form.name}
<b>📲 Контакт:</b> <code>${normalizedContact}</code>
<b>📌 Канал:</b> ${contactType === "tg" ? "Telegram" : "Телефон"}
<b>🧾 Тариф:</b> ${plan ? plan.title : "Не выбран"}
<b>📍 Страница:</b> ${typeof window !== "undefined" ? window.location.href : "N/A"}
      `.trim();

      try {
        const response = await fetch("/api/telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: draftMessage }),
        });
        const data = await response.json();
        if (!response.ok || !data?.ok) {
          throw new Error("Draft send failed");
        }
        setDraftSent(true);
        if (
          typeof window !== "undefined" &&
          typeof (window as any).ym === "function"
        ) {
          (window as any).ym(106751172, "reachGoal", "lead_form_draft");
        }
      } catch {
        // Keep silent for users; this is auxiliary tracking.
      }
    }, 15000);

    return () => window.clearTimeout(timeoutId);
  }, [formStarted, submitted, loading, draftSent, form.name, form.contact, contactType, plan]);

  const validate = () => {
    const e = { name: "", contact: "" };
    if (!form.name.trim()) e.name = "Введите ваше имя";
    if (!form.contact.trim())
      e.contact = contactType === "tg" ? "Введите никнейм Telegram" : "Введите номер телефона";
    else if (contactType === "phone" && !/^[\d\s\+\-\(\)]{7,}$/.test(form.contact))
      e.contact = "Введите корректный номер";
    else if (contactType === "tg" && !/^@?[a-zA-Z0-9_]{3,}$/.test(form.contact))
      e.contact = "Введите корректный никнейм (например @username)";
    setErrors(e);
    return !e.name && !e.contact;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitError("");
    setLoading(true);

    const normalizedContact =
      contactType === "tg" ? `@${form.contact.replace(/^@/, "")}` : form.contact;

    const telegramMessage = `
<b>🚀 НОВАЯ ЗАЯВКА С САЙТА</b>

<b>🎯 Тип заявки:</b> Бесплатная консультация
<b>👤 Имя:</b> ${form.name}
<b>📲 Контакт:</b> <code>${normalizedContact}</code>
<b>📌 Канал:</b> ${contactType === "tg" ? "Telegram" : "Телефон"}
<b>🧾 Тариф:</b> ${plan ? plan.title : "Не выбран"}
<b>💰 Цена:</b> ${plan ? plan.price : "Не указана"}
<b>📍 Страница:</b> ${typeof window !== "undefined" ? window.location.href : "N/A"}
    `.trim();

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: telegramMessage }),
      });
      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error("Telegram send failed");
      }

      if (
        typeof window !== "undefined" &&
        typeof (window as any).ym === "function"
      ) {
        (window as any).ym(106751172, "reachGoal", "lead_form_submit");
      }

      setLoading(false);
      setSubmitted(true);
    } catch {
      setLoading(false);
      setSubmitError("Не удалось отправить заявку. Попробуйте еще раз.");
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-4"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={30} className="text-emerald-400" />
        </div>
        <h3
          className="text-white text-xl mb-2"
          style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
        >
          Заявка отправлена!
        </h3>
        {plan && (
          <p className="text-violet-300 text-sm mb-1" style={{ fontWeight: 600 }}>
            Тариф: {plan.title}
          </p>
        )}
        <p className="text-slate-400 text-sm mb-1">
          Светлана свяжется с вами в течение{" "}
          <span className="text-white" style={{ fontWeight: 600 }}>
            2 часов
          </span>
        </p>
        <p className="text-slate-500 text-xs">
          Проверьте {contactType === "tg" ? "Telegram" : "телефон"} — ждите сообщения
        </p>
      </motion.div>
    );
  }

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit}
      noValidate
      method="post"
      action="#"
      className="text-left space-y-4"
    >
      {/* Selected plan badge */}
      <AnimatePresence>
        {plan && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-gradient-to-r from-violet-600/15 to-violet-900/10 border border-violet-500/30 rounded-2xl p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap size={16} className="text-violet-400" />
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">Выбранный тариф</p>
                  <p className="text-white text-sm" style={{ fontWeight: 700 }}>
                    {plan.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5">
                    <span className="text-violet-300 text-xs" style={{ fontWeight: 600 }}>
                      {plan.price}
                    </span>
                    <span className="text-slate-600 text-xs">·</span>
                    <span
                      className="flex items-center gap-1 text-emerald-400 text-xs"
                      style={{ fontWeight: 600 }}
                    >
                      <CreditCard size={10} />
                      рассрочка {plan.installment}
                    </span>
                  </div>
                </div>
              </div>
              {onClearPlan && (
                <button
                  type="button"
                  onClick={onClearPlan}
                  className="text-slate-600 hover:text-slate-300 transition-colors flex-shrink-0 p-0.5 mt-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name */}
      <div>
        <label
          className="block text-slate-300 text-sm mb-1.5"
          style={{ fontWeight: 500 }}
        >
          Ваше имя
        </label>
        <input
          id="lead-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Например, Алексей"
          value={form.name}
          onChange={(e) => {
            setForm((f) => ({ ...f, name: e.target.value }));
            setErrors((er) => ({ ...er, name: "" }));
          }}
          onFocus={markFormStart}
          className={`w-full bg-white/5 border ${
            errors.name ? "border-red-500/60" : "border-white/12"
          } rounded-xl px-4 py-3.5 text-white text-sm placeholder-slate-600 outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all`}
        />
        {errors.name && (
          <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle size={11} />
            {errors.name}
          </p>
        )}
      </div>

      {/* Contact type toggle */}
      <div>
        <label
          className="block text-slate-300 text-sm mb-1.5"
          style={{ fontWeight: 500 }}
        >
          Как с вами связаться?
        </label>
        <div className="flex gap-2 mb-3">
          {(
            [
              ["tg", "Telegram", MessageCircle],
              ["phone", "Телефон", Phone],
            ] as const
          ).map(([type, label, Icon]) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setContactType(type as "tg" | "phone");
                setForm((f) => ({ ...f, contact: "" }));
                setErrors((er) => ({ ...er, contact: "" }));
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all border ${
                contactType === type
                  ? "bg-violet-600/20 border-violet-500/50 text-violet-300"
                  : "bg-white/4 border-white/10 text-slate-400 hover:border-white/20"
              }`}
              style={{ fontWeight: 600 }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {contactType === "tg" ? (
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm select-none">
              @
            </span>
            <input
              id="lead-telegram"
              name="telegram"
              type="text"
              autoComplete="username"
              placeholder="username"
              value={form.contact.replace(/^@/, "")}
              onChange={(e) => {
                setForm((f) => ({ ...f, contact: e.target.value }));
                setErrors((er) => ({ ...er, contact: "" }));
              }}
              onFocus={markFormStart}
              className={`w-full bg-white/5 border ${
                errors.contact ? "border-red-500/60" : "border-white/12"
              } rounded-xl pl-8 pr-4 py-3.5 text-white text-sm placeholder-slate-600 outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all`}
            />
          </div>
        ) : (
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+7 (999) 123-45-67"
            value={form.contact}
            onChange={(e) => {
              setForm((f) => ({ ...f, contact: e.target.value }));
              setErrors((er) => ({ ...er, contact: "" }));
            }}
            onFocus={markFormStart}
            className={`w-full bg-white/5 border ${
              errors.contact ? "border-red-500/60" : "border-white/12"
            } rounded-xl px-4 py-3.5 text-white text-sm placeholder-slate-600 outline-none focus:border-violet-500/60 focus:bg-white/8 transition-all`}
          />
        )}
        {errors.contact && (
          <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle size={11} />
            {errors.contact}
          </p>
        )}
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-2xl text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 disabled:opacity-70 transition-all"
        style={{ fontWeight: 700 }}
      >
        {loading ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
            </svg>
            Отправляем...
          </>
        ) : (
          <>
            Отправить заявку — это бесплатно <ArrowRight size={15} />
          </>
        )}
      </motion.button>

      {submitError && (
        <p className="text-center text-red-400 text-xs">{submitError}</p>
      )}

      <input type="hidden" name="contact_type" value={contactType} />

      <p className="text-center text-slate-600 text-xs">
        Нажимая кнопку, вы соглашаетесь на обработку персональных данных
      </p>
    </form>
  );
}
