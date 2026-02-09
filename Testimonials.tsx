import React from 'react';

const reviews = [
  {
    name: "Александр В.",
    role: "CEO EdTech платформы",
    text: "Светлана полностью перестроила нашу модель привлечения. Мы перестали 'пылесосить' рынок и начали работать с целевым трафиком. Результат — х3 по выручке за полгода.",
    avatar: "AV"
  },
  {
    name: "Мария К.",
    role: "Основатель Marisabel",
    text: "ИИ-аудит был точкой невозврата. Те ошибки, которые он подсветил, сливали нам огромные бюджеты. Сейчас работаем в сопровождении, продажи выросли до 15 млн.",
    avatar: "MK"
  },
  {
    name: "Дмитрий Л.",
    role: "Продюсер фестиваля",
    text: "Поражен системностью Светланы. Организовать sold-out на федеральном уровне для культурного проекта — это высший пилотаж маркетинга.",
    avatar: "ДЛ"
  },
  {
    name: "Елена С.",
    role: "Marketing Director",
    text: "Опыт работы в Газпром Медиа чувствуется сразу. Светлана видит проект не фрагментарно, а как единую систему генерации прибыли. Рекомендую.",
    avatar: "ЕС"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-black mb-16 uppercase tracking-tighter italic text-center md:text-left text-slate-950">
          Что говорят <span className="gradient-text">партнеры</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {reviews.map((rev, i) => (
            <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 relative group hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center font-black text-indigo-600 text-lg">
                  {rev.avatar}
                </div>
                <div>
                  <div className="font-black text-slate-900 text-lg">{rev.name}</div>
                  <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{rev.role}</div>
                </div>
              </div>
              <p className="text-slate-600 font-bold leading-relaxed italic opacity-90">"{rev.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;