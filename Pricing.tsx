import React from 'react';

const packages = [
  {
    name: "ИИ-Аудит",
    price: "БЕСПЛАТНО",
    desc: "Быстрый нейро-анализ вашего маркетинга. Мгновенный результат от ИИ Сигма.",
    features: ["Анализ JTBD & CJM", "3 точки роста за 15 сек", "Оценка рисков", "Мгновенный отчет"],
    cta: "Провести аудит",
    target: "audit",
    popular: false
  },
  {
    name: "Системный Аудит",
    price: "70 000 ₽",
    desc: "Глубокое погружение эксперта в ваш бизнес. Ручной разбор всех процессов.",
    features: ["Аудит всей экосистемы", "Анализ конкурентов", "Технический аудит стека", "Zoom-разбор 90 мин", "Пошаговый Roadmap"],
    cta: "Заказать аудит",
    target: "contact",
    popular: true
  },
  {
    name: "Стратегия Роста",
    price: "149 000 ₽",
    desc: "Масштабирование бизнеса через системную пересборку всех каналов.",
    features: ["Аудит отдела продаж", "Полный аудит воронок (с 1 входа)", "Отстройка рекламных каналов", "Запуск маркетинга с 0", "GTM-стратегия", "Сопровождение 1 мес"],
    cta: "Обсудить проект",
    target: "contact",
    popular: false
  }
];

const Pricing: React.FC = () => {
  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 md:py-32 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-7xl font-black mb-4 uppercase tracking-tighter italic leading-[0.9] text-slate-950">
            Услуги <br /> 
            <span className="gradient-text italic">и Стоимость</span>
          </h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-6">Прозрачные условия для тех, кто готов расти</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {packages.map((pkg, i) => (
            <div key={i} className={`bg-slate-50 rounded-[2.5rem] p-10 flex flex-col border transition-all duration-500 ${pkg.popular ? 'border-indigo-500 bg-white scale-105 shadow-[0_40px_80px_rgba(99,102,241,0.1)]' : 'border-slate-200 hover:border-indigo-200'}`}>
              {pkg.popular && <div className="text-center mb-6"><span className="bg-indigo-600 text-white text-[10px] font-black uppercase px-5 py-1.5 rounded-full">Максимальная ценность</span></div>}
              <h3 className="text-2xl font-black text-slate-950 mb-2 uppercase italic">{pkg.name}</h3>
              <div className="text-4xl font-black text-indigo-600 mb-6">{pkg.price}</div>
              <p className="text-slate-600 text-sm mb-10 font-bold opacity-80 leading-relaxed">{pkg.desc}</p>
              
              <ul className="space-y-4 mb-12 flex-grow">
                {pkg.features.map((f, fi) => (
                  <li key={fi} className="flex items-center text-xs md:text-sm text-slate-700 font-bold">
                    <svg className="w-5 h-5 mr-4 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                    {f}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleScroll(pkg.target)}
                className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-sm transition-all ${pkg.popular ? 'bg-indigo-600 text-white hover:bg-slate-950 shadow-xl' : 'bg-white border-2 border-slate-200 text-slate-900 hover:bg-indigo-50 hover:border-indigo-200'}`}
              >
                {pkg.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;