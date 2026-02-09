import React, { useEffect, useState } from 'react';

const GrowthChart: React.FC = () => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    { label: 'Старт', val: 'h-[25%]', color: 'bg-slate-200' },
    { label: 'Месяц 1', val: 'h-[45%]', color: 'bg-indigo-100' },
    { label: 'Месяц 2', val: 'h-[70%]', color: 'bg-indigo-200' },
    { label: 'Месяц 3', val: 'h-[100%]', color: 'bg-indigo-600', glow: true },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 relative overflow-hidden shadow-2xl shadow-slate-200/50 min-h-[400px] flex flex-col justify-between">
      <div className="flex justify-between items-end h-48 md:h-72 gap-3 md:gap-6 relative mb-6">
        {/* Сетка */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-40 pointer-events-none">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="border-t border-slate-100 w-full"></div>)}
        </div>

        {/* Анимированная Линия */}
        <svg 
          className="absolute inset-0 w-full h-full z-20 pointer-events-none" 
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d="M 12.5 85 L 37.5 65 L 62.5 40 L 87.5 10"
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="200"
            strokeDashoffset={active ? "0" : "200"}
            className="transition-all duration-[2500ms] ease-in-out"
          />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Столбцы данных */}
        {data.map((item, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-4 z-10">
            <div 
              className={`w-12 md:w-20 rounded-t-2xl transition-all duration-1000 delay-${i * 100} ${item.color} ${active ? item.val : 'h-0'} ${item.glow ? 'shadow-[0_20px_40px_rgba(79,70,229,0.2)]' : ''}`}
            ></div>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 whitespace-nowrap">{item.label}</span>
          </div>
        ))}

        {/* Индикатор ROI */}
        <div className="absolute top-0 right-0 bg-emerald-500 text-white px-5 py-2 rounded-full z-30 shadow-lg shadow-emerald-500/20">
          <span className="text-[11px] font-black tracking-tighter uppercase">+380% ROI</span>
        </div>
      </div>
      
      <div className="pt-8 border-t border-slate-100">
        <h4 className="text-lg md:text-xl font-black text-slate-950 uppercase italic tracking-tighter mb-2">Прогноз системного роста</h4>
        <p className="text-xs md:text-sm text-slate-500 font-bold opacity-80 leading-relaxed">На основе данных кейсов после внедрения сквозной аналитики и ИИ-оптимизации рекламного бюджета.</p>
      </div>
    </div>
  );
};

export default GrowthChart;