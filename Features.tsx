import React from 'react';

const Features: React.FC = () => {
  const services = [
    {
      title: "Аудит Системы",
      description: "Комплексная диагностика всей маркетинговой экосистемы силами ИИ и экспертной методологии.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
      ),
      items: ["Анализ воронки продаж", "Аудит рекламных каналов", "Бенчмаркинг конкурентов", "Аудит тех. стека"]
    },
    {
      title: "Сопровождение",
      description: "Долгосрочное партнерство для реализации стратегии и вывода продукта в топ.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      ),
      items: ["Еженедельные страт-сессии", "Управление командами", "Дашборды в реальном времени", "Оптимизация бюджета"]
    },
    {
      title: "Performance Рост",
      description: "Связующее звено между аналитикой, креативом и финальной прибылью.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      ),
      items: ["Бренд-стратегия", "Тестирование гипотез", "Контент-стратегия", "Оптимизация конверсии"]
    }
  ];

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-6xl font-black mb-4 uppercase tracking-tighter italic text-slate-950">Наши <span className="gradient-text italic">Преимущества</span></h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-bold uppercase opacity-80">Мы не просто указываем на ошибки, мы помогаем их исправить и масштабируем ваш результат.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all group duration-500">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              {service.icon}
            </div>
            <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tighter text-slate-900">{service.title}</h3>
            <p className="text-slate-500 mb-8 leading-relaxed font-bold opacity-70">{service.description}</p>
            <ul className="space-y-4">
              {service.items.map((item, i) => (
                <li key={i} className="flex items-center text-xs text-slate-700 font-black uppercase tracking-widest">
                  <svg className="w-4 h-4 mr-3 text-indigo-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;