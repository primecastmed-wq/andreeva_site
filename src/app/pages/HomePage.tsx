import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import heroPhoto from "../../assets/51cbb1273d953eb3ff4ccb0ce093be35565abacf.png";
import aboutPhoto from "../../assets/7620348f9abd2f9c406e920c0501688ea6f656ce.png";
import {
  TrendingUp, Star, CheckCircle2, Award, BarChart3,
  Target, FileText, DollarSign, Users, ArrowRight,
  Phone, MessageCircle, Menu, X, ShieldCheck, Clock,
  ChevronDown, ChevronUp, Flame, Gift, Timer,
  XCircle, ThumbsUp, Lightbulb, Rocket, BarChart2, CreditCard, Zap,
  AlertCircle,
} from "lucide-react";
import { Reveal, Counter, Countdown, FaqItem } from "../components/shared";
import { LeadForm } from "../components/LeadForm";
import { servicesData, type Plan } from "../data/services-data";


const pains = [
  { icon: BarChart2, text: "Тратите деньги на рекламу, но не понимаете, что работает, а что сжигает бюджет" },
  { icon: Users, text: "Менеджеры получают заявки, но конверсия в продажи остаётся низкой — и непонятно почему" },
  { icon: TrendingUp, text: "Конкуренты растут, а вы топчетесь на месте, хотя делаете всё «правильно»" },
  { icon: Target, text: "Пробовали разные агентства — обещали много, результат нулевой. Уже не верите обещаниям" },
  { icon: FileText, text: "Нет понимания, какой канал приносит реальных клиентов, а не просто лиды" },
  { icon: Rocket, text: "Хотите масштабироваться, но страшно вкладывать — непонятно, что даст рост" },
];

const results = [
  {
    industry: "E-commerce", before: "CPL 3 200 ₽, ROAS 1.8", after: "CPL 890 ₽, ROAS 5.4",
    story: "Интернет-магазин одежды тратил ₽500К/мес на рекламу с ROAS 1.8. Аудит показал: 60% бюджета уходило на аудитории с нулевой конверсией. После перераспределения бюджета и оптимизации воронки:",
    metric1: "−72% стоимость клиента", metric2: "+200% ROAS", color: "emerald", period: "2 мес",
  },
  {
    industry: "B2B SaaS", before: "Конверсия звонков 8%", after: "Конверсия звонков 31%",
    story: "Компания получала 150 лидов в месяц, но закрывала только 8%. Аудит отдела продаж выявил: отсутствие квалификации лидов, нет системы follow-up, скрипты не закрывают возражения. Результат через 6 недель:",
    metric1: "+287% конверсия", metric2: "+43% средний чек", color: "violet", period: "6 нед",
  },
  {
    industry: "Медицина", before: "Выручка 2.1М/мес", after: "Выручка 3.9М/мес",
    story: "Частная клиника теряла пациентов на этапе первичного звонка. 67% не записывались. Перестроили скрипты администраторов, внедрили систему напоминаний и реактивации:",
    metric1: "+86% выручка", metric2: "−41% отказы", color: "orange", period: "3 мес",
  },
  {
    industry: "Производство", before: "CAC 48 000 ₽", after: "CAC 17 500 ₽",
    story: "B2B производитель с длинным циклом сделки не понимал, откуда приходят клиенты. Настроили сквозную аналитику, нашли 2 рабочих канала из 7, перераспределили бюджет:",
    metric1: "−63% стоимость клиента", metric2: "+134% квал. лидов", color: "blue", period: "4 мес",
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; pill: string }> = {
  emerald: { border: "border-emerald-500/25", bg: "from-emerald-500/10 to-emerald-900/5", text: "text-emerald-400", pill: "bg-emerald-500/15 text-emerald-400" },
  violet: { border: "border-violet-500/25", bg: "from-violet-500/10 to-violet-900/5", text: "text-violet-400", pill: "bg-violet-500/15 text-violet-400" },
  orange: { border: "border-orange-500/25", bg: "from-orange-500/10 to-orange-900/5", text: "text-orange-400", pill: "bg-orange-500/15 text-orange-400" },
  blue: { border: "border-blue-500/25", bg: "from-blue-500/10 to-blue-900/5", text: "text-blue-400", pill: "bg-blue-500/15 text-blue-400" },
};

const testimonials = [
  { name: "Алексей Петров", role: "Владелец", company: "FashionStore.ru", result: "+127%", tag: "продаж", color: "text-emerald-400", text: "После аудита от Светланы продажи выросли на 127% за 2 месяца. Она нашла 15 точек роста, которые мы просто не замечали. Окупилось в первый же месяц." },
  { name: "Мария Соколова", role: "Директор по маркетингу", company: "TechSolutions", result: "+210%", tag: "лидов", color: "text-violet-400", text: "Получили детальный отчёт на 80+ страницах с конкретными шагами. Внедрили 70% рекомендаций за 3 месяца. Качественных лидов стало в 3× больше при том же бюджете." },
  { name: "Дмитрий Иванов", role: "Владелец клиники", company: "BeautyMed", result: "+89%", tag: "выручки", color: "text-orange-400", text: "Конверсия звонков выросла с 12% до 31%, средний чек — на 43%. Светлана нашла проблемы, которые мы сами никогда бы не увидели." },
  { name: "Сергей Морозов", role: "CEO", company: "BuildTech", result: "+134%", tag: "конверсия", color: "text-emerald-400", text: "Треть рекламного бюджета тратилась впустую — Светлана это доказала цифрами. Перераспределили бюджет, внедрили рекомендации. Через 2 месяца конверсия выросла в 2,3 раза." },
  { name: "Анна Белова", role: "Маркетинг-директор", company: "EduPlatform", result: "+156%", tag: "LTV", color: "text-violet-400", text: "Удержание клиентов выросло на 67%, LTV — на 156%. Самое ценное — Светлана объясняет логику каждого решения." },
  { name: "Елена Кузнецова", role: "Основатель", company: "HealthStart", result: "+73%", tag: "сделок", color: "text-blue-400", text: "Не понимали почему при хорошем трафике продажи не росли. Светлана за 3 недели нашла узкие места, переработала квалификацию лидов. +73% закрытых сделок уже на второй месяц." },
];

const faqs = [
  { q: "Как быстро я увижу первые результаты?", a: "Часть рекомендаций вы можете внедрить за 1–2 недели и увидеть первые изменения в метриках. Полный эффект от комплексного внедрения — в течение 1–3 месяцев. Я помогу расставить приоритеты: что сделать в первую очередь для быстрого результата." },
  { q: "Что, если у меня нет аналитики или CRM?", a: "Это не проблема. Начинаем с того, что есть. Часть аудита включает рекомендации по настройке аналитики и выбору инструментов. Даже без идеальных данных можно найти ключевые точки роста." },
  { q: "Мой бизнес специфичный — вы разберётесь?", a: "Я работала с 20+ нишами: e-commerce, B2B, медицина, образование, производство, услуги. Перед началом работы изучаю вашу отрасль, конкурентов и специфику. На бесплатной консультации сразу скажу честно, если ваш случай не в моей экспертизе." },
  { q: "Чем ваш аудит отличается от штатного маркетолога?", a: "Штатный маркетолог видит систему изнутри и часто не замечает очевидных проблем. Я — внешний эксперт с опытом 50+ аудитов в разных нишах. Дам объективную оценку без корпоративных фильтров и конкретный план с расчётом ROI." },
  { q: "А вдруг не найдёте проблем и это не окупится?", a: "Именно поэтому я даю гарантию возврата: если не найду точек роста с потенциалом, превышающим стоимость аудита в 3 раза — верну деньги полностью. За всю практику такого не случалось ни разу." },
  { q: "Как проходит работа? Нужны ли доступы?", a: "Да, для качественного анализа нужен доступ к рекламным кабинетам, аналитике и CRM (если есть). Всё в рамках NDA — данные строго конфиденциальны. Формат работы — онлайн, без необходимости встреч в офисе." },
];

const diplomas = [
  { title: "MBA – MBI Marketing", org: "Moscow Institute of Professional Education", country: "🇷🇺 Россия", year: "2022", type: "MBA", color: "from-blue-600/15 to-blue-900/5", border: "border-blue-500/20", accent: "text-blue-400", pillBg: "bg-blue-500/10" },
  { title: "Mini MBA – Marketing Director", org: "Open European Academy of Economics & Politics", country: "🇪🇺 Европа", year: "2023", type: "Mini MBA", color: "from-violet-600/15 to-violet-900/5", border: "border-violet-500/20", accent: "text-violet-400", pillBg: "bg-violet-500/10" },
  { title: "Cloud Digital Leader", org: "Google Cloud Certified", country: "🌐 Международный", year: "2023", type: "Сертификат", color: "from-emerald-600/15 to-emerald-900/5", border: "border-emerald-500/20", accent: "text-emerald-400", pillBg: "bg-emerald-500/10" },
  { title: "MBA: Управление маркетингом", org: "Eduson Academy", country: "🇷🇺 Россия", year: "2022", type: "MBA", color: "from-orange-600/15 to-orange-900/5", border: "border-orange-500/20", accent: "text-orange-400", pillBg: "bg-orange-500/10" },
  { title: "Master of Business Administration", org: "Grenoble Ecole de Management", country: "🇫🇷 Франция", year: "2021", type: "MBA", color: "from-rose-600/15 to-rose-900/5", border: "border-rose-500/20", accent: "text-rose-400", pillBg: "bg-rose-500/10" },
  { title: "Профессиональный маркетолог", org: "РАНХиГС", country: "🇷🇺 Россия", year: "2020", type: "Диплом", color: "from-cyan-600/15 to-cyan-900/5", border: "border-cyan-500/20", accent: "text-cyan-400", pillBg: "bg-cyan-500/10" },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const goToService = (slug: string) => {
    navigate(`/services/${slug}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }} className="bg-[#050810] text-white overflow-x-hidden">

      {/* ── URGENCY TOPBAR ── */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 py-2 text-center px-4">
        <p className="text-white text-xs sm:text-sm leading-snug">
          <span style={{ fontWeight: 700 }}>🔥 Акция:</span>{" "}
          чек-лист «27 точек роста» при записи.{" "}
          <span className="hidden sm:inline">Осталось: </span><Countdown />
        </p>
      </div>

      {/* ── HEADER ── */}
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050810]/95 backdrop-blur-xl border-b border-white/8 shadow-2xl" : "bg-transparent"}`}
        initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-violet-500/30 flex-shrink-0">
              <span className="text-white" style={{ fontSize: 10, fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>MA</span>
            </div>
            <div>
              <p className="text-white text-sm leading-tight" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>Антикризисный маркетинг</p>
              <p className="text-slate-500 text-xs hidden sm:block">Светлана Андреева</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {[["pain","Проблема"],["results","Кейсы"],["services","Услуги"],["about","Обо мне"],["qualification","Квалификация"]].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-slate-400 hover:text-white transition-colors text-sm" style={{ fontWeight: 500 }}>{label}</button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("cta")}
              className="hidden sm:block bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-orange-500/25"
              style={{ fontWeight: 600 }}>
              Бесплатная консультация
            </motion.button>
            <button className="lg:hidden p-2 text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0a0e1a] border-t border-white/8">
              <div className="px-4 py-3 space-y-1">
                {[["pain","Ваша проблема"],["results","Кейсы"],["services","Услуги"],["about","Обо мне"],["qualification","Квалификация"]].map(([id, label]) => (
                  <button key={id} onClick={() => scrollTo(id)} className="block w-full text-left text-slate-300 py-3 text-sm border-b border-white/5 last:border-0">{label}</button>
                ))}
                <button onClick={() => scrollTo("cta")}
                  className="mt-3 w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3.5 rounded-xl text-sm"
                  style={{ fontWeight: 600 }}>
                  Бесплатная консультация
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ═══════════════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0318] via-[#050810] to-[#000510]" />
          <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-violet-700/12 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}
            <div>
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/12 rounded-full px-3 py-1.5 mb-6">
                <div className="flex -space-x-1.5">
                  {["АП","МС","ДИ","ЕК"].map((init, k) => (
                    <div key={k} className="w-5 h-5 rounded-full border border-[#050810] bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white" style={{ fontSize: 7, fontWeight: 700 }}>{init}</span>
                    </div>
                  ))}
                </div>
                <span className="text-slate-300 text-xs">
                  <span className="text-white" style={{ fontWeight: 600 }}>50+ владельцев бизнеса</span>
                  <span className="hidden sm:inline"> уже выросли на 30–200%</span>
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: [0.22,1,0.36,1] }}
                className="text-[2.4rem] sm:text-5xl lg:text-[62px] leading-[1.07] mb-4"
                style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
                Найду, почему<br />
                ваши продажи{" "}
                <span className="relative whitespace-nowrap">
                  <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-300 bg-clip-text text-transparent">не растут</span>
                  <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 100 4" preserveAspectRatio="none">
                    <path d="M0 3 Q50 0 100 3" stroke="url(#u)" strokeWidth="2.5" fill="none"/>
                    <defs><linearGradient id="u" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7c3aed"/><stop offset="100%" stopColor="#a855f7"/></linearGradient></defs>
                  </svg>
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="text-slate-300 text-base sm:text-lg mb-2">
                Маркетинговый аудит + аудит отдела продаж с гарантией результата
              </motion.p>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                className="text-slate-500 text-sm mb-7 max-w-lg">
                Конкретный план — что изменить, чтобы продажи выросли на 30–200%. С расчётом ROI.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 mb-7">
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("cta")}
                  className="group bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-2xl text-sm shadow-xl shadow-orange-500/30 flex items-center gap-2 justify-center"
                  style={{ fontWeight: 700 }}>
                  Получить бесплатный разбор
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("results")}
                  className="border border-white/12 text-slate-300 px-6 py-4 rounded-2xl text-sm hover:bg-white/5 transition-all"
                  style={{ fontWeight: 500 }}>
                  Смотреть кейсы →
                </motion.button>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4">
                {[
                  { icon: ShieldCheck, text: "Гарантия возврата", color: "text-emerald-400" },
                  { icon: Clock, text: "Результат за 2–3 мес.", color: "text-violet-400" },
                  { icon: Award, text: "5 дипломов MBA", color: "text-amber-400" },
                ].map((t, i) => {
                  const I = t.icon;
                  return (
                    <div key={i} className="flex items-center gap-1.5">
                      <I size={13} className={t.color} />
                      <span className="text-slate-400 text-xs">{t.text}</span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* RIGHT */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: [0.22,1,0.36,1] }}
              className="relative hidden lg:flex justify-center">
              <div className="relative w-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/25 to-purple-900/15 rounded-[32px] blur-2xl scale-105" />
                <div className="relative rounded-[28px] overflow-hidden border border-white/10">
                  <img src={heroPhoto} alt="Светлана Андреева" className="w-full object-cover aspect-[4/5] object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/85 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>Светлана Андреева</p>
                    <p className="text-slate-300 text-sm">MBA, 5 дипломов · 50+ клиентов</p>
                  </div>
                </div>
                {[
                  { top: "10%", left: "-22%", anim: [0,-8,0] as any, dur: 3, content: (<div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-xl bg-emerald-500/15 flex items-center justify-center"><TrendingUp size={14} className="text-emerald-400" /></div><div><p className="text-emerald-400 text-xs" style={{ fontWeight: 700 }}>+127% продаж</p><p className="text-slate-400" style={{ fontSize: 10 }}>за 2 месяца</p></div></div>) },
                  { top: "40%", left: "87%", anim: [0,7,0] as any, dur: 3.5, content: (<div className="flex items-center gap-2.5"><div className="w-8 h-8 rounded-xl bg-violet-500/15 flex items-center justify-center"><DollarSign size={14} className="text-violet-400" /></div><div><p className="text-violet-400 text-xs" style={{ fontWeight: 700 }}>ROI 1:12</p><p className="text-slate-400" style={{ fontSize: 10 }}>средний</p></div></div>) },
                  { top: "74%", left: "-16%", anim: [0,-5,0] as any, dur: 4, content: (<div className="flex items-center gap-1.5"><div className="flex">{[...Array(5)].map((_,j)=><Star key={j} size={10} className="text-yellow-400 fill-yellow-400"/>)}</div><p className="text-slate-300 text-xs ml-1">50+ отзывов</p></div>) },
                ].map((card, i) => (
                  <motion.div key={i} animate={{ y: card.anim }} transition={{ repeat: Infinity, duration: card.dur, ease: "easeInOut" }}
                    className="absolute bg-[#0f1728]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-3 shadow-2xl"
                    style={{ top: card.top, left: card.left }}>
                    {card.content}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stat strip */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="mt-14 grid grid-cols-3 gap-4 pt-8 border-t border-white/8">
            {[
              { end: 67, suf: "%", label: "Средний рост продаж" },
              { end: 50, suf: "+", label: "Клиентов с результатом" },
              { end: 12, pre: "1:", label: "Средний ROI аудита" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl md:text-5xl text-white mb-1" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
                  <span className="text-violet-400">{s.pre}</span>
                  <Counter end={s.end} suffix={s.suf} />
                </p>
                <p className="text-slate-500 text-xs sm:text-sm">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          2. БОЛЬ
      ═══════════════════════════════════════════════════════════════ */}
      <section id="pain" className="py-16 md:py-24 bg-[#070c18]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className="text-orange-400 text-sm mb-3" style={{ fontWeight: 600 }}>Узнаёте себя?</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
              Почему бизнес не растёт,<br />
              <span className="text-slate-400">даже когда вы стараетесь</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {pains.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="flex items-start gap-3 bg-[#0c1220] border border-red-500/12 rounded-2xl p-4 hover:border-red-500/25 transition-all">
                    <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={15} className="text-red-400" />
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{p.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <div className="relative rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-900/40 to-[#0c1220]" />
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-purple-600" />
              <div className="relative p-5 sm:p-7 flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-violet-500/15 flex items-center justify-center flex-shrink-0">
                    <Lightbulb size={20} className="text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white mb-1.5" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>Хорошая новость: всё это — диагностируемые проблемы</p>
                    <p className="text-slate-400 text-sm">Они встречаются в 9 из 10 компаний. И в 100% случаев у них есть конкретное решение — я дам вам план с расчётом, что именно даст рост и насколько.</p>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("cta")}
                  className="w-full sm:w-auto sm:self-start bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl text-sm shadow-lg shadow-orange-500/25 text-center"
                  style={{ fontWeight: 600 }}>
                  Найти мои точки роста →
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          3. ДОВЕРИЕ / ОБОМНЕ
      ═══════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-16 md:py-24 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <div className="relative mx-auto max-w-xs sm:max-w-sm lg:max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[3/4]">
                  <img src={aboutPhoto} alt="Светлана Андреева" className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>Светлана Андреева</p>
                    <p className="text-slate-300 text-xs">MBA · 5 дипломов · 50+ кейсов</p>
                  </div>
                </div>
                <div className="hidden sm:flex absolute -right-3 top-8 flex-col gap-2.5">
                  {[
                    { label: "5 дипломов MBA", color: "border-amber-500/30 bg-amber-500/10 text-amber-400" },
                    { label: "50+ кейсов", color: "border-violet-500/30 bg-violet-500/10 text-violet-400" },
                    { label: "3 страны обучения", color: "border-blue-500/30 bg-blue-500/10 text-blue-400" },
                  ].map((pill, i) => (
                    <motion.div key={i} animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut" }}
                      className={`border rounded-xl px-3 py-1.5 text-xs backdrop-blur-xl bg-[#0f1728]/90 ${pill.color} whitespace-nowrap`}
                      style={{ fontWeight: 600 }}>
                      {pill.label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-violet-400 text-sm mb-3" style={{ fontWeight: 600 }}>Почему мне можно доверять</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl mb-4" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
                Светлана Андреева —<br />
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">практик, не теоретик</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mb-3">
                15 лет в маркетинге. Работала маркетинг-директором в 3 компаниях с оборотом 100М+. Видела, как работают (и не работают) маркетинг и продажи изнутри.
              </p>
              <p className="text-slate-400 text-sm mb-6">
                Провожу независимые аудиты — без корпоративных фильтров, только факты и цифры. Каждый аудит — конкретный план с прогнозом результата.
              </p>

              <div className="bg-[#0c1220] border border-white/8 rounded-2xl p-5 mb-5">
                <p className="text-white text-sm mb-4" style={{ fontWeight: 700 }}>Чем я отличаюсь</p>
                <div className="space-y-3">
                  {[
                    { bad: "Не продаю обучение и курсы", good: "Конкретные решения под ваш бизнес" },
                    { bad: "Не даю «общие советы»", good: "Каждая рекомендация с цифрами и ROI" },
                    { bad: "Не исчезаю после отчёта", good: "30 дней поддержки включены" },
                  ].map((row, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 sm:flex-1">
                        <XCircle size={13} className="text-red-400 flex-shrink-0" />
                        <span className="text-slate-500">{row.bad}</span>
                      </div>
                      <div className="flex items-center gap-2 sm:flex-1 pl-5 sm:pl-0">
                        <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                        <span className="text-slate-300">{row.good}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("cta")}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white px-7 py-4 rounded-2xl text-sm shadow-lg shadow-orange-500/25 flex items-center gap-2 justify-center sm:justify-start"
                style={{ fontWeight: 700 }}>
                Записаться на бесплатный разбор <ArrowRight size={15} />
              </motion.button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          4. РЕЗУЛЬТАТЫ
      ═══════════════════════════════════════════════════════════════ */}
      <section id="results" className="py-16 md:py-24 bg-[#070c18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className="text-emerald-400 text-sm mb-3" style={{ fontWeight: 600 }}>Доказательства работают лучше слов</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
              Реальные результаты<br />
              <span className="text-slate-400">от реальных клиентов</span>
            </h2>
            <p className="text-slate-400 text-sm">Цифры ниже — это не прогнозы. Это то, что уже случилось.</p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {results.map((r, i) => {
              const c = colorMap[r.color];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`bg-gradient-to-br ${c.bg} border ${c.border} rounded-3xl p-5 sm:p-7`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${c.pill}`} style={{ fontWeight: 600 }}>{r.industry}</span>
                    <span className="text-slate-500 text-xs">{r.period}</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 bg-red-500/8 border border-red-500/15 rounded-xl px-3 py-2.5 text-center">
                      <p className="text-slate-500 text-xs mb-0.5">Было</p>
                      <p className="text-red-400 text-xs sm:text-sm" style={{ fontWeight: 700 }}>{r.before}</p>
                    </div>
                    <ArrowRight size={16} className="text-slate-600 flex-shrink-0" />
                    <div className={`flex-1 bg-gradient-to-br ${c.bg} border ${c.border} rounded-xl px-3 py-2.5 text-center`}>
                      <p className="text-slate-400 text-xs mb-0.5">Стало</p>
                      <p className={`${c.text} text-base sm:text-xl`} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>{r.after}</p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{r.story}</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[r.metric1, r.metric2].map((m, j) => (
                      <div key={j} className="bg-white/4 rounded-xl p-2.5 text-center">
                        <p className={`${c.text} text-sm`} style={{ fontWeight: 700 }}>{m}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <Reveal>
            <div className="relative rounded-3xl overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-purple-700" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
              <div className="relative py-10 px-6">
                <p className="text-white/60 text-sm mb-2">Средний ROI внедрения рекомендаций</p>
                <p className="text-white text-6xl sm:text-7xl md:text-8xl mb-3" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 900 }}>1 : 12</p>
                <p className="text-white/70 text-sm max-w-md mx-auto">На каждый рубль, вложенный в аудит, клиенты получают в среднем 12 рублей дополнительной прибыли</p>
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("cta")}
                  className="mt-6 inline-flex items-center gap-2 bg-white text-violet-700 px-6 py-3 rounded-2xl text-sm shadow-xl"
                  style={{ fontWeight: 700 }}>
                  Начать с бесплатной консультации <ArrowRight size={15} />
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          5. ШАГИ
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#050810]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12">
            <p className="text-violet-400 text-sm mb-3" style={{ fontWeight: 600 }}>Прозрачный процесс</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
              Как проходит работа<br />
              <span className="text-slate-400">от звонка до результата</span>
            </h2>
          </Reveal>

          <div className="relative">
            <div className="absolute left-7 top-8 bottom-8 w-px bg-gradient-to-b from-violet-500/40 via-violet-500/20 to-transparent hidden sm:block" />
            <div className="space-y-4">
              {[
                { n: "01", title: "Бесплатная консультация", desc: "30 мин. Разбираю вашу ситуацию, называю 3–5 гипотез роста прямо на звонке. Без обязательств.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
                { n: "02", title: "Установочная встреча + NDA", desc: "Погружаюсь в бизнес, получаю доступы к системам. Подписываем соглашение о конфиденциальности.", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                { n: "03", title: "Аудит (14–30 дней)", desc: "Работаю самостоятельно: анализирую каналы, воронку, конкурентов, сайт. Без лишних встреч и вопросов.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                { n: "04", title: "Детальный отчёт с планом", desc: "50+ страниц: что не работает, почему, и конкретный план с прогнозом ROI. Приоритеты на 90 дней.", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
                { n: "05", title: "Поддержка при внедрении", desc: "30 дней на связи — отвечаю на вопросы, помогаю с внедрением первых рекомендаций.", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
              ].map((step, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="flex gap-5 items-start">
                    <div className={`w-14 h-14 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center flex-shrink-0 z-10`}>
                      <span className={`text-lg ${step.color}`} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 900 }}>{step.n}</span>
                    </div>
                    <div className="flex-1 bg-[#0c1220] border border-white/8 rounded-2xl p-4">
                      <h3 className="text-white text-sm mb-1" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          6. УСЛУГИ
      ═══════════════════════════════════════════════════════════════ */}
      <section id="services" className="py-16 md:py-24 bg-[#070c18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className="text-orange-400 text-sm mb-3" style={{ fontWeight: 600 }}>Форматы работы</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
              Выберите формат<br />
              <span className="text-slate-400">под вашу задачу</span>
            </h2>
            <p className="text-slate-400 text-sm">Точную стоимость назову после бесплатной консультации</p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesData.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className={`relative flex flex-col rounded-3xl p-5 sm:p-7 transition-all ${
                    s.highlight
                      ? "bg-gradient-to-b from-violet-700/20 to-[#0c1220] border-2 border-violet-500/40"
                      : "bg-[#0c1220] border border-white/8"
                  }`}>
                  {s.badge && (
                    <div className={`absolute top-4 right-4 text-white text-xs px-2.5 py-1 rounded-full ${s.highlight ? "bg-violet-600" : "bg-orange-500"}`} style={{ fontWeight: 700 }}>
                      {s.badge}
                    </div>
                  )}
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${s.highlight ? "bg-violet-500/20" : "bg-white/5"}`}>
                    <Icon size={20} className={s.highlight ? "text-violet-400" : "text-slate-400"} />
                  </div>
                  <h3 className="text-white mb-1" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>{s.title}</h3>
                  <p className={`text-xs mb-1 ${s.highlight ? "text-violet-400" : "text-slate-500"}`} style={{ fontWeight: 500 }}>Срок: {s.duration}</p>
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                    <p className={`text-sm ${s.highlight ? "text-violet-300" : "text-slate-400"}`} style={{ fontWeight: 600 }}>{s.price}</p>
                    <span className="flex items-center gap-1 text-emerald-400 text-xs" style={{ fontWeight: 600 }}>
                      <CreditCard size={10} />
                      {s.installment}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs mb-1">или в рассрочку на 6 месяцев</p>
                  <p className="text-slate-500 text-xs mb-4 italic">Для кого: {s.for}</p>
                  <ul className="space-y-2 mb-5 flex-1">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className={`mt-0.5 flex-shrink-0 ${s.highlight ? "text-violet-400" : "text-emerald-500"}`} />
                        <span className="text-slate-300 text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Two buttons: detail page + quick apply */}
                  <div className="flex flex-col gap-2">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => goToService(s.slug)}
                      className={`w-full py-3.5 rounded-2xl text-sm transition-all ${
                        s.highlight
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                          : "bg-white/7 text-white hover:bg-white/12 border border-white/10"
                      }`}
                      style={{ fontWeight: 600 }}>
                      {s.highlight ? "Получить максимум →" : "Подробнее об услуге"}
                    </motion.button>
                    <button
                      onClick={() => {
                        setSelectedPlan({ title: s.title, price: s.price, installment: s.installment });
                        setTimeout(() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" }), 60);
                      }}
                      className="w-full py-2.5 rounded-xl text-xs text-slate-400 hover:text-white border border-white/6 hover:border-white/15 transition-all"
                      style={{ fontWeight: 500 }}>
                      Записаться сразу
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          7. ОТЗЫВЫ
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className="text-yellow-400 text-sm mb-3" style={{ fontWeight: 600 }}>Отзывы клиентов</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
              Они уже получили результат —<br className="hidden sm:block" />
              <span className="text-slate-400"> следующим можете быть вы</span>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-[#0c1220] border border-white/8 rounded-3xl p-5 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_,k) => <Star key={k} size={12} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <span className={`text-sm ${t.color}`} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>{t.result} {t.tag}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white" style={{ fontSize: 10, fontWeight: 700 }}>{t.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="text-white text-xs" style={{ fontWeight: 600 }}>{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          8. ГАРАНТИЯ
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-[#070c18]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/25 to-[#0c1220]" />
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-emerald-600" />
              <div className="relative p-7 sm:p-10">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck size={26} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-emerald-400 text-sm mb-1" style={{ fontWeight: 600 }}>Уникальная гарантия</p>
                    <h2 className="text-2xl sm:text-3xl" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>Результат или деньги назад</h2>
                  </div>
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Если в ходе аудита не найду точек роста с потенциалом, превышающим стоимость аудита в{" "}
                  <span className="text-emerald-400" style={{ fontWeight: 700 }}>3 раза</span>{" "}
                  — верну деньги полностью. Без вопросов и удержаний.
                </p>
                <div className="grid sm:grid-cols-3 gap-3 mb-6">
                  {[
                    { v: "50+", l: "аудитов проведено" },
                    { v: "0", l: "возвратов за всё время" },
                    { v: "×3", l: "минимальный ROI по гарантии" },
                  ].map((s, i) => (
                    <div key={i} className="bg-emerald-500/8 border border-emerald-500/15 rounded-xl p-3 text-center">
                      <p className="text-emerald-400 text-xl mb-0.5" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>{s.v}</p>
                      <p className="text-slate-400 text-xs">{s.l}</p>
                    </div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("cta")}
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-4 rounded-2xl text-sm shadow-xl shadow-emerald-500/25 flex items-center gap-2 justify-center"
                  style={{ fontWeight: 700 }}>
                  Начать с гарантией <ArrowRight size={15} />
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          9. КВАЛИФИКАЦИЯ
      ═══════════════════════════════════════════════════════════════ */}
      <section id="qualification" className="py-16 md:py-24 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className="text-amber-400 text-sm mb-3" style={{ fontWeight: 600 }}>Квалификация и образование</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl mb-3" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
              Дипломы и{" "}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">сертификаты</span>
            </h2>
            <p className="text-slate-400 text-sm">Постоянное обучение в ведущих мировых бизнес-школах</p>
          </Reveal>

          <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-10">
            {[
              { value: "5", label: "Дипломов MBA", color: "text-amber-400", bg: "from-amber-500/10 to-amber-900/5", border: "border-amber-500/20" },
              { value: "3", label: "Страны обучения", color: "text-violet-400", bg: "from-violet-500/10 to-violet-900/5", border: "border-violet-500/20" },
              { value: "500+", label: "Часов обучения", color: "text-emerald-400", bg: "from-emerald-500/10 to-emerald-900/5", border: "border-emerald-500/20" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-2xl p-4 sm:p-6 text-center`}>
                <p className={`text-2xl sm:text-4xl md:text-5xl mb-1 ${s.color}`} style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>{s.value}</p>
                <p className="text-slate-400 text-xs sm:text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {diplomas.map((d, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`bg-gradient-to-br ${d.color} border ${d.border} rounded-2xl p-5 flex flex-col gap-3`}>
                <div className="flex items-start justify-between gap-2">
                  <div className={`w-10 h-10 rounded-xl ${d.pillBg} flex items-center justify-center flex-shrink-0`}>
                    <Award size={18} className={d.accent} />
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${d.pillBg} ${d.accent} border ${d.border}`} style={{ fontWeight: 600 }}>
                    {d.type}
                  </span>
                </div>
                <div>
                  <h3 className="text-white text-sm mb-1" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 700 }}>{d.title}</h3>
                  <p className="text-slate-400 text-xs mb-2">{d.org}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 text-xs">{d.country}</span>
                    <span className={`text-xs ${d.accent}`} style={{ fontWeight: 600 }}>{d.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Reveal className="mt-8">
            <div className="bg-[#0c1220] border border-white/8 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Award size={20} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm mb-1" style={{ fontWeight: 700 }}>Постоянно обновляю экспертизу</p>
                <p className="text-slate-400 text-xs sm:text-sm">Обучаюсь каждый год — чтобы предлагать актуальные инструменты, которые работают сегодня</p>
              </div>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("cta")}
                className="w-full sm:w-auto flex-shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3 rounded-xl text-sm shadow-lg shadow-amber-500/20"
                style={{ fontWeight: 600 }}>
                Записаться на консультацию
              </motion.button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          10. FAQ
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-[#070c18]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className="text-slate-400 text-sm mb-3" style={{ fontWeight: 600 }}>Часто задаваемые вопросы</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
              Ответы на{" "}
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">ваши вопросы</span>
            </h2>
          </Reveal>
          <div className="space-y-2.5">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.04}>
                <FaqItem q={faq.q} a={faq.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          11. ФИНАЛЬНЫЙ CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section id="cta" className="py-16 md:py-24 bg-[#050810]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-2xl sm:rounded-[28px] overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0f0a2a] via-[#0c1220] to-[#0c1220]" />
              <div className="absolute top-0 left-1/4 w-72 h-72 bg-violet-700/15 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-purple-900/10 rounded-full blur-3xl" />
              <div className="absolute inset-0 border-2 border-violet-500/20 rounded-2xl sm:rounded-[28px]" />

              <div className="relative px-5 sm:px-10 py-10 sm:py-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-5">
                    <Gift size={13} className="text-orange-400" />
                    <span className="text-orange-300 text-xs" style={{ fontWeight: 600 }}>Чек-лист «27 точек роста» при записи</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl mb-2" style={{ fontFamily: "Manrope, sans-serif", fontWeight: 800 }}>
                    Запишитесь на бесплатный<br />
                    <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">30-минутный разбор</span>
                  </h2>
                  <p className="text-slate-400 text-sm">Назову 3–5 гипотез роста прямо на звонке. Без обязательств.</p>

                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 mt-4">
                    <Timer size={13} className="text-orange-400" />
                    <span className="text-slate-300 text-sm">Акция заканчивается через: <Countdown /></span>
                  </div>
                </div>

                <LeadForm plan={selectedPlan} onClearPlan={() => setSelectedPlan(null)} />

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 max-w-xs mx-auto mt-5">
                  {[
                    { icon: ShieldCheck, text: "Гарантия возврата" },
                    { icon: Clock, text: "Ответ за 2 часа" },
                    { icon: ThumbsUp, text: "50+ клиентов" },
                    { icon: Gift, text: "Чек-лист в подарок" },
                  ].map((item, i) => {
                    const I = item.icon;
                    return (
                      <div key={i} className="flex items-center gap-1.5 justify-center">
                        <I size={12} className="text-violet-400" />
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

      {/* ── FOOTER ── */}
      <footer className="bg-[#030508] border-t border-white/6 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center">
                <span className="text-white" style={{ fontSize: 10, fontWeight: 800 }}>MA</span>
              </div>
              <div>
                <p className="text-white text-sm" style={{ fontWeight: 700 }}>Светлана Андреева</p>
                <p className="text-slate-600 text-xs">andreevasvetlana.ru</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[["pain","Проблема"],["results","Кейсы"],["services","Услуги"],["about","Обо мне"],["qualification","Квалификация"]].map(([id,label]) => (
                <button key={id} onClick={() => scrollTo(id)} className="text-slate-600 hover:text-slate-300 transition-colors text-xs sm:text-sm">{label}</button>
              ))}
            </div>
            <p className="text-slate-700 text-xs">© 2024 · Все права защищены</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
