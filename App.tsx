import React, { useState } from 'react';
import Navigation from './Navigation';
import AuditTool from './AuditTool';
import Cases from './Cases';
import Testimonials from './Testimonials';
import GrowthChart from './GrowthChart';
import Pricing from './Pricing';
import Features from './Features';
import { sendTelegramNotification, formatLeadMessage } from './notificationService';

const App: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', company: '', method: 'direct', contact: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const competencies = [
    { title: 'Grenoble Ecole de Management', desc: 'MBA. Master of Business Administration. Global Management.' },
    { title: 'Skolkovo Foundation', desc: '10 лет опыта упаковки технологических стартапов и привлечения инвестиций.' },
    { title: 'Roistat Certified', desc: 'Эксперт в области сквозной аналитики и управления маркетингом на основе данных.' },
    { title: 'Open European Academy (Prague)', desc: 'Mini MBA: Marketing Director. Европейские стандарты управления.' },
    { title: 'Яндекс.Директ', desc: 'Сертифицированный специалист по контекстной рекламе и сложным воронкам.' },
    { title: 'Eduson Learning', desc: 'MBA: Управление маркетингом и стратегическое планирование (2025).' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const message = formatLeadMessage(formData);
      await sendTelegramNotification(message);
      
      // Отправка цели в Яндекс.Метрику
      if (typeof window.ym !== 'undefined') {
        window.ym(106315042, 'reachGoal', 'lead_form_submit');
      }

      setSubmitStatus('success');
      setFormData({ name: '', company: '', method: 'direct', contact: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500/10">
      <Navigation />

      {/* Hero Section - Optimized per TZ */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[140px] animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 px-5 py-2.5 rounded-full mb-12 backdrop-blur-md">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Системная Архитектура Маркетинга</span>
            </div>
            
            <div className="relative mb-12 inline-block">
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-indigo-600/10 rounded-full blur-2xl animate-pulse"></div>
              
              <h1 className="text-5xl md:text-[110px] font-black uppercase tracking-tighter leading-[0.85] italic text-slate-950 mb-6">
                Системный <br />
                <span className="gradient-text italic">Маркетинг</span>
              </h1>
              
            </div>
            
            <p className="text-slate-600 text-xl md:text-3xl font-bold max-w-4xl mx-auto mb-12 leading-[1.2] uppercase opacity-90 animate-fade-up">
              Увеличим поток заявок и прибыли через <span className="text-slate-950 underline decoration-indigo-500 decoration-4 underline-offset-8">ИИ-аналитику</span> и методологию <span className="text-slate-950">MBA Grenoble</span> для технологичных компаний.
            </p>

            {/* Quick Benefits List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-4xl">
              {[
                "Снижение CPL до 45%",
                "ROI в среднем x3.8",
                "Автоматизация 80% задач"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center justify-center space-x-3 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-50/50 py-3 rounded-xl border border-slate-100">
                  <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-2xl px-4">
              <button 
                onClick={() => document.getElementById('audit')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 bg-indigo-600 hover:bg-slate-950 text-white px-10 py-8 rounded-3xl text-sm font-black uppercase tracking-widest transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 group"
              >
                Получить бесплатный аудит
              </button>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex-1 bg-white border-2 border-slate-200 text-slate-900 hover:bg-slate-50 px-10 py-8 rounded-3xl text-sm font-black uppercase tracking-widest transition-all active:scale-95"
              >
                Обсудить проект
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Block (Logos) - New TZ requirement */}
      <section className="py-12 bg-white border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 opacity-40 grayscale transition-all hover:grayscale-0 hover:opacity-100 duration-1000">
           <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
              <div className="text-xl font-black uppercase tracking-tighter italic text-slate-400">Газпром Медиа</div>
              <div className="text-xl font-black uppercase tracking-tighter italic text-slate-400">Сколково</div>
              <div className="text-xl font-black uppercase tracking-tighter italic text-slate-400">MBA Alumni</div>
              <div className="text-xl font-black uppercase tracking-tighter italic text-slate-400">Roistat Certified</div>
           </div>
        </div>
      </section>

      <Features />

      <section id="audit" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-8xl font-black mb-4 uppercase tracking-tighter italic leading-none text-slate-950">
              Бесплатный <br />
              <span className="gradient-text italic">Анализ</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Получите пошаговые рекомендации по росту в течение 15 секунд</p>
          </div>
          <AuditTool />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 uppercase tracking-tighter italic leading-[0.9] text-slate-950">
              Рост <br />
              <span className="gradient-text italic">В цифрах</span>
            </h2>
            <p className="text-slate-600 text-xl font-bold uppercase leading-tight mb-12 opacity-80">
              Средние показатели клиентов через 3 месяца системного сопровождения:
            </p>
            <div className="space-y-12">
              {[
                { label: "Снижение стоимости лида", val: "−45%" },
                { label: "Рост окупаемости (ROI)", val: "×3.8" },
                { label: "Автоматизация процессов", val: "80%" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-200 pb-6">
                  <span className="text-sm font-black uppercase tracking-widest text-slate-500">{item.label}</span>
                  <span className="text-4xl font-black text-indigo-600 italic">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
          <GrowthChart />
        </div>
      </section>

      {/* Competencies Section */}
      <section id="competencies" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-slate-950">
              Бэкграунд <br />
              <span className="text-indigo-600">& Квалификация</span>
            </h2>
            <div className="text-slate-500 font-bold uppercase tracking-widest text-xs max-w-xs text-right hidden md:block">
              Опыт в Газпром Медиа, Сколково и запуск федеральных проектов.
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competencies.map((item, idx) => (
              <div key={idx} className="bg-white p-10 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group rounded-[2.5rem] border border-slate-100">
                <div className="text-indigo-600 font-black text-2xl mb-6 opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</div>
                <h4 className="text-xl font-black text-slate-900 uppercase mb-4 leading-tight italic tracking-tighter">{item.title}</h4>
                <p className="text-slate-500 text-sm font-bold leading-relaxed uppercase opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cases />
      <Pricing />
      <Testimonials />

      <section id="contact" className="py-24 md:py-40 bg-indigo-600 scroll-mt-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-9xl font-black mb-12 text-white uppercase tracking-tighter italic leading-[0.85]">
            Обсудить <br />
            <span className="text-slate-900">Проект</span>
          </h2>
          
          <div className="max-w-xl mx-auto">
            {submitStatus === 'success' ? (
              <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-white/20">
                <h3 className="text-3xl font-black uppercase italic mb-4 text-slate-900">Заявка принята</h3>
                <p className="font-bold opacity-80 uppercase tracking-widest text-xs text-slate-500">Я свяжусь с вами в течение 2-х часов.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input required type="text" placeholder="Ваше имя" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white border-2 border-indigo-500/20 p-6 rounded-2xl text-slate-900 outline-none focus:border-white transition-all text-lg font-bold placeholder:text-slate-400" />
                <input required type="text" placeholder="Telegram / WhatsApp" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full bg-white border-2 border-indigo-500/20 p-6 rounded-2xl text-slate-900 outline-none focus:border-white transition-all text-lg font-bold placeholder:text-slate-400" />
                <button type="submit" disabled={isSubmitting} className="w-full bg-slate-950 text-white p-7 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-slate-800 transition-all shadow-2xl active:scale-95">
                  {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer className="py-20 bg-white border-t border-slate-100 text-center">
        <div className="text-2xl font-black uppercase italic tracking-tighter mb-8 text-slate-950">
          Светлана <span className="text-indigo-600">Андреева</span>
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
          © 2025 • Systematic Marketing • MBA Grenoble
        </div>
      </footer>
    </div>
  );
};

export default App;
