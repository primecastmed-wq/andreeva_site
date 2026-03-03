import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft, CheckCircle2, Clock, CreditCard, ShieldCheck,
  ThumbsUp, Gift, Timer, ChevronRight, Flame
} from "lucide-react";
import { servicesData } from "../data/services-data";
import { Reveal, Countdown, FaqItem } from "../components/shared";
import { LeadForm } from "../components/LeadForm";
import { WarmupPrompt } from "../components/WarmupPrompt";
import heroPhoto from "../../assets/51cbb1273d953eb3ff4ccb0ce093be35565abacf.png";

const PHOTO = "https://images.unsplash.com/photo-1736939681295-bb2e6759dddc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMG1hcmtldGluZyUyMGNvbnN1bHRhbnQlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzIyNjAwNDR8MA&ixlib=rb-4.1.0&q=80&w=1080";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<{ title: string; price: string; installment: string } | null>(null);

  const service = servicesData.find((s) => s.slug === slug);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof (window as any).ym === "function"
    ) {
      (window as any).ym(106751172, "hit", window.location.pathname + window.location.search);
    }
  }, [slug]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#050810] text-white flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-slate-400 text-sm mb-4">Услуга не найдена</p>
          <button
            onClick={() => navigate("/")}
            className="text-violet-400 hover:text-white transition-colors text-sm flex items-center gap-2 mx-auto"
          >
            <ArrowLeft size={16} /> На главную
          </button>
        </div>
      </div>
    );
  }

  const Icon = service.icon;
  const plan = { title: service.title, price: service.price, installment: service.installment };

  const scrollToForm = () => {
    document.getElementById("service-form")?.scrollIntoView({ behavior: "smooth" });
    setSelectedPlan(plan);
    if (
      typeof window !== "undefined" &&
      typeof (window as any).ym === "function"
    ) {
      (window as any).ym(106751172, "reachGoal", "service_form_open");
    }
  };

  return (
    <div
      style={{ fontFamily: "Inter, sans-serif" }}
      className="bg-[#050810] text-white overflow-x-hidden"
    >
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-[#050810]/95 backdrop-blur-xl border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Back */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            style={{ fontWeight: 500 }}
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">На главную</span>
          </button>

          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <span className="text-white" style={{ fontSize: 10, fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>MA</span>
            </div>
            <span className="text-white text-sm hidden sm:block" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>
              Светлана Андреева
            </span>
          </button>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToForm}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-orange-500/25"
            style={{ fontWeight: 600 }}
          >
            Записаться
          </motion.button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-14 pb-16">
        {/* BG glows */}
        <div className={`absolute top-0 left-1/4 w-96 h-96 ${service.glowClass} rounded-full blur-[120px] opacity-30`} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-900/10 rounded-full blur-[80px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-8">
            <button onClick={() => navigate("/")} className="hover:text-slate-300 transition-colors">
              Главная
            </button>
            <ChevronRight size={12} />
            <button
              onClick={() => { navigate("/"); setTimeout(() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }), 100); }}
              className="hover:text-slate-300 transition-colors"
            >
              Услуги
            </button>
            <ChevronRight size={12} />
            <span className="text-slate-400">{service.title}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT */}
            <div>
              {/* Badge */}
              {service.badge && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full text-xs border ${
                    service.highlight
                      ? "bg-orange-500/10 border-orange-500/25 text-orange-300"
                      : "bg-white/5 border-white/12 text-slate-300"
                  }`}
                  style={{ fontWeight: 600 }}
                >
                  {service.badge}
                </motion.div>
              )}

              {/* Icon + title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 mb-4"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.bgClass} border ${service.borderClass} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={26} className={service.accentClass} />
                </div>
                <div>
                  <p className={`text-xs mb-0.5 ${service.accentClass}`} style={{ fontWeight: 600 }}>
                    Услуга
                  </p>
                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl"
                    style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
                  >
                    {service.title}
                  </h1>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-300 text-lg sm:text-xl mb-3"
                style={{ fontFamily: "Manrope, sans-serif", fontWeight: 600 }}
              >
                {service.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-slate-400 text-sm leading-relaxed mb-7"
              >
                {service.description}
              </motion.p>

              {/* Price + duration */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-3 mb-6"
              >
                <div className={`flex items-center gap-2 bg-gradient-to-r ${service.bgClass} border ${service.borderClass} rounded-2xl px-4 py-2.5`}>
                  <span className={`text-lg ${service.accentClass}`} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
                    {service.price}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl px-4 py-2.5">
                  <CreditCard size={14} className="text-emerald-400" />
                  <span className="text-emerald-300 text-sm" style={{ fontWeight: 600 }}>
                    {service.installment}
                  </span>
                  <span className="text-slate-500 text-xs">/ мес × 6</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5">
                  <Clock size={14} className="text-slate-400" />
                  <span className="text-slate-300 text-sm" style={{ fontWeight: 500 }}>
                    {service.duration}
                  </span>
                </div>
              </motion.div>

              {/* Outcomes strip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-3 gap-3 mb-7"
              >
                {service.outcomes.map((o, i) => (
                  <div
                    key={i}
                    className="bg-[#0c1220] border border-white/8 rounded-2xl p-3 text-center"
                  >
                    <p
                      className={`text-base sm:text-lg ${o.color} mb-0.5`}
                      style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
                    >
                      {o.value}
                    </p>
                    <p className="text-slate-500 text-xs leading-tight">{o.label}</p>
                  </div>
                ))}
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { icon: ShieldCheck, text: "Гарантия возврата", color: "text-emerald-400" },
                  { icon: Clock, text: "Ответ за 2 часа", color: "text-violet-400" },
                  { icon: ThumbsUp, text: "50+ кейсов", color: "text-orange-400" },
                ].map((t, i) => {
                  const TIcon = t.icon;
                  return (
                    <div key={i} className="flex items-center gap-1.5">
                      <TIcon size={13} className={t.color} />
                      <span className="text-slate-400 text-xs">{t.text}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* RIGHT — Form */}
            <motion.div
              id="service-form"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:sticky lg:top-24"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a2a] via-[#0c1220] to-[#0c1220]" />
                <div className="absolute top-0 left-1/4 w-56 h-56 bg-violet-700/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 border-2 border-violet-500/20 rounded-2xl" />
                <div className="relative px-6 py-7">
                  <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1.5 mb-4 w-fit">
                    <Gift size={12} className="text-orange-400" />
                    <span className="text-orange-300 text-xs" style={{ fontWeight: 600 }}>
                      Чек-лист «27 точек роста» при записи
                    </span>
                  </div>
                  <h3
                    className="text-white text-lg mb-1"
                    style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
                  >
                    Запишитесь на бесплатный разбор
                  </h3>
                  <p className="text-slate-400 text-sm mb-1">
                    30 минут — и вы узнаете ваши точки роста
                  </p>
                  {/* Countdown */}
                  <div className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 mb-5">
                    <Timer size={12} className="text-orange-400" />
                    <span className="text-slate-300 text-xs">
                      Акция: <Countdown />
                    </span>
                  </div>

                  <LeadForm
                    plan={selectedPlan ?? plan}
                    onClearPlan={() => setSelectedPlan(null)}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ДЛЯ КОГО ── */}
      <section className="py-16 bg-[#070c18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-8">
            <p className={`text-sm mb-2 ${service.accentClass}`} style={{ fontWeight: 600 }}>
              Для кого эта услуга
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
            >
              Вы попали в нужное место, если...
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-3">
            {service.forList.map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className={`flex items-start gap-3 bg-[#0c1220] border ${service.borderClass} rounded-2xl p-4`}>
                  <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${service.bgClass} border ${service.borderClass} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <CheckCircle2 size={13} className={service.accentClass} />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ЧТО ВХОДИТ ── */}
      <section className="py-16 bg-[#050810]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className={`text-sm mb-2 ${service.accentClass}`} style={{ fontWeight: 600 }}>
              Состав услуги
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
            >
              Что входит в аудит
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.detailedFeatures.map((feat, i) => {
              const FIcon = feat.icon;
              return (
                <Reveal key={i} delay={i * 0.07}>
                  <div className={`h-full bg-gradient-to-br ${service.bgClass} border ${service.borderClass} rounded-2xl p-5`}>
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4`}>
                      <FIcon size={18} className={service.accentClass} />
                    </div>
                    <h3
                      className="text-white text-sm mb-2"
                      style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
                    >
                      {feat.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ПРОЦЕСС ── */}
      <section className="py-16 bg-[#070c18]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className={`text-sm mb-2 ${service.accentClass}`} style={{ fontWeight: 600 }}>
              Прозрачный процесс
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
            >
              Как проходит работа
            </h2>
          </Reveal>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-7 top-8 bottom-8 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent hidden sm:block" />
            <div className="space-y-4">
              {service.process.map((step, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex gap-5 items-start">
                    {/* Number */}
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.bgClass} border ${service.borderClass} flex items-center justify-center flex-shrink-0 z-10`}
                    >
                      <span
                        className={`text-lg ${service.accentClass}`}
                        style={{ fontFamily: "Manrope, sans-serif", fontWeight: 900 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 bg-[#0c1220] border border-white/8 rounded-2xl p-4">
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <h3
                          className="text-white text-sm"
                          style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
                        >
                          {step.title}
                        </h3>
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full ${service.bgClass.replace("from-", "bg-").split(" ")[0]} ${service.accentClass} whitespace-nowrap`}
                          style={{ fontWeight: 600 }}
                        >
                          {step.time}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── РЕЗУЛЬТАТЫ ── */}
      <section className="py-16 bg-[#050810]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className={`text-sm mb-2 ${service.accentClass}`} style={{ fontWeight: 600 }}>
              Что вы получите
            </p>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
            >
              Ожидаемые результаты
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {service.outcomes.map((o, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div
                  className={`bg-gradient-to-br ${service.bgClass} border ${service.borderClass} rounded-2xl p-6 text-center`}
                >
                  <p
                    className={`text-3xl sm:text-4xl mb-2 ${o.color}`}
                    style={{ fontFamily: "Manrope, sans-serif", fontWeight: 900 }}
                  >
                    {o.value}
                  </p>
                  <p className="text-slate-400 text-sm">{o.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Guarantee strip */}
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-[#0c1220]" />
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-emerald-600" />
              <div className="relative p-5 sm:p-7 flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={22} className="text-emerald-400" />
                </div>
                <div>
                  <h3
                    className="text-white text-base mb-1"
                    style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
                  >
                    Гарантия результата
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Если не найду точек роста с потенциалом, превышающим стоимость аудита в{" "}
                    <span className="text-emerald-400" style={{ fontWeight: 700 }}>
                      3 раза
                    </span>{" "}
                    — верну деньги полностью. За всю практику (50+ аудитов) такого не случалось ни разу.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-[#070c18]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-8">
            <h2
              className="text-2xl sm:text-3xl"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
            >
              Частые вопросы
            </h2>
          </Reveal>
          <div className="space-y-2.5">
            {service.faq.map((item, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <FaqItem q={item.q} a={item.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ФИНАЛЬНЫЙ CTA ── */}
      <section className="py-16 md:py-20 bg-[#050810]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-2xl sm:rounded-[28px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a2a] via-[#0c1220] to-[#0c1220]" />
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-violet-700/15 rounded-full blur-3xl" />
              <div className="absolute inset-0 border-2 border-violet-500/20 rounded-2xl sm:rounded-[28px]" />
              <div className="relative px-5 sm:px-10 py-10 sm:py-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-5">
                    <Gift size={13} className="text-orange-400" />
                    <span className="text-orange-300 text-xs" style={{ fontWeight: 600 }}>
                      Чек-лист «27 точек роста» при записи
                    </span>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl mb-2"
                    style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
                  >
                    Записаться на бесплатный{" "}
                    <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                      30-минутный разбор
                    </span>
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Назову 3–5 гипотез роста прямо на звонке. Без обязательств.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 mt-4">
                    <Timer size={13} className="text-orange-400" />
                    <span className="text-slate-300 text-sm">
                      Акция: <Countdown />
                    </span>
                  </div>
                </div>
                <LeadForm plan={plan} />
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 max-w-xs mx-auto mt-5">
                  {[
                    { icon: ShieldCheck, text: "Гарантия возврата" },
                    { icon: Clock, text: "Ответ за 2 часа" },
                    { icon: ThumbsUp, text: "50+ клиентов" },
                    { icon: Gift, text: "Чек-лист в подарок" },
                  ].map((item, i) => {
                    const SIcon = item.icon;
                    return (
                      <div key={i} className="flex items-center gap-1.5 justify-center">
                        <SIcon size={12} className="text-violet-400" />
                        <span>{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PHOTO + OTHER SERVICES ── */}
      <section className="py-12 bg-[#070c18]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-8">
            <p className="text-slate-400 text-sm mb-1">Другие услуги</p>
            <h2
              className="text-2xl sm:text-3xl"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}
            >
              Посмотрите все форматы работы
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4">
            {servicesData
              .filter((s) => s.slug !== slug)
              .map((s, i) => {
                const SIcon = s.icon;
                return (
                  <Reveal key={i} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      onClick={() => navigate(`/services/${s.slug}`)}
                      className={`cursor-pointer bg-gradient-to-br ${s.bgClass} border ${s.borderClass} rounded-2xl p-5 transition-all hover:shadow-xl`}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center">
                          <SIcon size={17} className={s.accentClass} />
                        </div>
                        {s.badge && (
                          <span
                            className={`text-xs px-2.5 py-1 rounded-full ${s.bgClass.replace("from-", "bg-").split(" ")[0]} ${s.accentClass}`}
                            style={{ fontWeight: 700 }}
                          >
                            {s.badge}
                          </span>
                        )}
                      </div>
                      <h3
                        className="text-white text-sm mb-1"
                        style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}
                      >
                        {s.title}
                      </h3>
                      <p className="text-slate-400 text-xs mb-3">{s.price}</p>
                      <div className={`flex items-center gap-1 text-xs ${s.accentClass}`} style={{ fontWeight: 600 }}>
                        Подробнее <ChevronRight size={12} />
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            {/* Consultant card */}
            <Reveal delay={0.2}>
              <div className="bg-[#0c1220] border border-white/8 rounded-2xl p-5 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-violet-500/30 mb-3">
                  <img src={heroPhoto} alt="Светлана Андреева" className="w-full h-full object-cover object-top" />
                </div>
                <p className="text-white text-sm mb-0.5" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>
                  Светлана Андреева
                </p>
                <p className="text-slate-500 text-xs mb-3">MBA · 5 дипломов · 50+ кейсов</p>
                <button
                  onClick={() => navigate("/")}
                  className="text-violet-400 text-xs hover:text-white transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  О консультанте →
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <WarmupPrompt storageScope={`service_${slug || "unknown"}`} onPrimaryClick={scrollToForm} />

      <footer className="bg-[#030508] border-t border-white/6 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <button onClick={() => navigate("/")} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                <span className="text-white" style={{ fontSize: 10, fontWeight: 800 }}>MA</span>
              </div>
              <div className="text-left">
                <p className="text-white text-sm" style={{ fontWeight: 700 }}>Светлана Андреева</p>
                <p className="text-slate-600 text-xs">andreevasvetlana.ru</p>
              </div>
            </button>
            <div className="flex flex-wrap justify-center gap-4">
              {servicesData.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => navigate(`/services/${s.slug}`)}
                  className="text-slate-600 hover:text-slate-300 transition-colors text-xs sm:text-sm"
                >
                  {s.title}
                </button>
              ))}
            </div>
            <p className="text-slate-700 text-xs">© 2024 · Все права защищены</p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={scrollToForm}
          className="sm:hidden w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-2xl shadow-orange-500/40 flex items-center justify-center"
        >
          <Flame size={22} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={scrollToForm}
          className="hidden sm:flex bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-3.5 rounded-2xl text-sm shadow-2xl shadow-orange-500/40 items-center gap-2"
          style={{ fontWeight: 700 }}
        >
          <Flame size={15} />
          Записаться бесплатно
        </motion.button>
      </motion.div>
    </div>
  );
}
