import React from 'react';

const cases = [
  {
    id: "01",
    category: "Consulting",
    title: "Культурный код, Сколково — бренд-консалтинг",
    description: "Разработала бренд-стратегию и внедрила JTBD-подход для упаковки продуктов под инвесторов.",
    results: [
      { label: "Рост проектов", value: "+360%" },
      { label: "Вложения", value: "500к ₽" }
    ],
    color: "from-orange-500 to-red-500"
  },
  {
    id: "02",
    category: "EdTech",
    title: "Marisabel (Компаньонка 2.0) — запуск курса",
    description: "Вывод образовательного продукта в премиум-сегмент. Полная упаковка: CJM, воронки, продажи.",
    results: [
      { label: "Выручка", value: "15 млн ₽" },
      { label: "Средний чек", value: "1.2 млн ₽" }
    ],
    color: "from-indigo-600 to-purple-600"
  },
  {
    id: "03",
    category: "Real Estate",
    title: "Недвижимость Пхукета — премиум-маркетинг",
    description: "Заход в высококонкурентную нишу. Концепция, CRM, воронки лидогенерации с минимальным бюджетом.",
    results: [
      { label: "Сделки", value: "Первые в 1 мес." },
      { label: "Заявки", value: "Стабильный поток" }
    ],
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: "04",
    category: "FoodTech",
    title: "Грузинская доставка — ребрендинг",
    description: "Перезапуск локального бренда: от фирменного стиля до креативной стратегии продвижения.",
    results: [
      { label: "Заказы", value: "+200%" },
      { label: "Срок", value: "2 месяца" }
    ],
    color: "from-emerald-600 to-teal-600"
  },
  {
    id: "05",
    category: "Event / Culture",
    title: "Фестиваль «Перезагрузка 2.0», Зарайск",
    description: "Масштабирование локального события до федерального уровня. 50+ художников, Полина Аскери.",
    results: [
      { label: "Билеты", value: "Sold-out" },
      { label: "Охват", value: "Федеральный" }
    ],
    color: "from-pink-600 to-rose-600"
  },
  {
    id: "06",
    category: "Charity",
    title: "Фонд «Братишка» — быстрый старт",
    description: "Сбор аудитории вокруг нового фонда. Упаковка коммуникаций и запуск рекламной кампании.",
    results: [
      { label: "Трафик", value: "+180 чел/нед" },
      { label: "Донаты", value: "Регулярные" }
    ],
    color: "from-amber-500 to-orange-600"
  }
];

const Cases: React.FC = () => {
  const handleScrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="cases" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-6xl font-black mb-4 uppercase tracking-tighter italic text-slate-950">Мои <span className="gradient-text">Кейсы</span></h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Конкретные цифры и измеримый рост</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((item, idx) => (
            <div key={idx} className="bg-slate-50 rounded-[2rem] overflow-hidden flex flex-col h-full border border-slate-100 group hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500">
              <div className={`h-1.5 bg-gradient-to-r ${item.color}`} />
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">{item.category}</span>
                  <span className="text-[10px] font-black text-slate-400">#{item.id}</span>
                </div>
                <h3 className="text-xl font-black mb-4 leading-tight group-hover:text-indigo-600 transition-colors uppercase italic text-slate-900">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed font-bold opacity-80">{item.description}</p>
                
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  {item.results.map((res, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200">
                      <div className="text-[8px] text-slate-400 uppercase font-black mb-1 tracking-widest">{res.label}</div>
                      <div className="text-sm md:text-base font-black text-emerald-600">{res.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-white border-t border-slate-100">
                <button onClick={handleScrollToContact} className="w-full text-indigo-600 text-[10px] font-black flex items-center justify-center hover:text-slate-900 transition-colors uppercase tracking-widest">
                  Хочу такой результат
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cases;