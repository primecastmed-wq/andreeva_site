import React, { useState, useEffect } from 'react';
import { performAiAudit } from './geminiService';
import { sendTelegramNotification, formatAuditLeadMessage } from './notificationService';
import { AuditResult } from './types';

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
    ym?: (id: number, type: string, goal: string) => void;
  }
}

const AuditTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingResult, setPendingResult] = useState<AuditResult | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null); 
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [contactInfo, setContactInfo] = useState('');
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [needsKey, setNeedsKey] = useState(false);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) setNeedsKey(true);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setNeedsKey(false);
      setError(null);
    }
  };

  const handleAuditRequest = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setPendingResult(null);
    
    try {
      const audit = await performAiAudit(input);
      setPendingResult(audit);
      setLoading(false);
      setShowLeadForm(true); 
    } catch (err: any) {
      if (err.message?.includes('API key not valid') || err.message?.includes('400')) {
        setError('Требуется авторизация API ключа для ИИ.');
        setNeedsKey(true);
      } else {
        setError('Не удалось создать аудит. Попробуйте описать проект подробнее.');
      }
      setLoading(false);
    }
  };

  const handleUnlockResults = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo || !pendingResult) return;
    setIsSubmittingLead(true);
    try {
      const msg = formatAuditLeadMessage(input, pendingResult.summary, contactInfo);
      await sendTelegramNotification(msg);
      
      // Отправка цели в Яндекс.Метрику
      if (typeof window.ym !== 'undefined') {
        window.ym(106315042, 'reachGoal', 'audit_lead_capture');
      }

      setResult(pendingResult);
      setShowLeadForm(false);
    } catch (err) {
      setResult(pendingResult);
      setShowLeadForm(false);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Пояснительный текст */}
      <div className="grid md:grid-cols-3 gap-8 text-left animate-fade-up">
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="text-indigo-600 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <h4 className="font-black text-slate-900 uppercase text-xs mb-2 tracking-widest">Честный разбор</h4>
          <p className="text-slate-500 text-[10px] font-bold leading-relaxed uppercase opacity-70">Нейросеть обучена на базе моих методик и кейсов в Сколково и Газпром Медиа — только жесткие факты без воды.</p>
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="text-indigo-600 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h4 className="font-black text-slate-900 uppercase text-xs mb-2 tracking-widest">Скорость роста</h4>
          <p className="text-slate-500 text-[10px] font-bold leading-relaxed uppercase opacity-70">Вы получаете 3 гипотезы, которые можно внедрить уже завтра, чтобы сократить цикл сделки и повысить ROI.</p>
        </div>
        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="text-indigo-600 mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
          </div>
          <h4 className="font-black text-slate-900 uppercase text-xs mb-2 tracking-widest">Гарантия результата</h4>
          <p className="text-slate-500 text-[10px] font-bold leading-relaxed uppercase opacity-70">Все рекомендации основаны на реальных цифрах и опыте внедрения в технологические стартапы.</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-[2.5rem] p-5 md:p-12 text-left border border-indigo-100 relative overflow-hidden shadow-2xl shadow-indigo-500/5">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
        
        {error && (
          <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-2xl text-center">
            <p className="text-red-600 font-bold mb-4">{error}</p>
            {needsKey && (
              <button onClick={handleSelectKey} className="bg-red-600 text-white px-8 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-red-700 transition-all">
                Выбрать API Ключ
              </button>
            )}
          </div>
        )}

        {!loading && !showLeadForm && !result && (
          <div className="animate-in fade-in duration-500 relative">
            <div className="relative mb-8 group">
              <div className="absolute -inset-1 rounded-[2.2rem] bg-indigo-500/10 blur-lg opacity-40 group-focus-within:opacity-100 transition duration-500"></div>
              
              <textarea
                className="relative w-full bg-white border-2 border-slate-200 rounded-[2rem] p-8 md:p-12 text-slate-900 focus:outline-none focus:border-indigo-400 transition-all min-h-[220px] text-lg md:text-2xl font-bold placeholder:text-slate-300 shadow-sm"
                placeholder="Опишите ваш продукт, текущие проблемы или дайте ссылку на проект для аудита..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              
              <div className="absolute bottom-8 right-10 flex items-center space-x-3 pointer-events-none">
                 <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping"></span>
                 <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Neural Core Online</span>
              </div>
            </div>
            
            <button
              onClick={handleAuditRequest}
              disabled={!input.trim()}
              className="w-full bg-indigo-600 text-white font-black py-6 md:py-10 rounded-2xl md:rounded-3xl transition-all disabled:opacity-30 flex items-center justify-center space-x-4 text-lg md:text-2xl shadow-xl shadow-indigo-600/20 hover:bg-slate-950 hover:scale-[1.01] active:scale-95 group uppercase tracking-widest"
            >
              <span>Запустить бесплатный аудит</span>
              <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>
        )}

        {loading && (
          <div className="py-24 text-center">
            <div className="relative inline-block mb-10">
              <div className="w-20 h-20 md:w-24 md:h-24 border-8 border-slate-100 border-t-indigo-600 rounded-full animate-spin mx-auto shadow-sm"></div>
            </div>
            <h3 className="text-xl md:text-3xl font-black text-slate-950 italic uppercase tracking-tighter">Формируем рекомендации...</h3>
          </div>
        )}

        {showLeadForm && !result && (
          <div className="py-12 text-center animate-in zoom-in duration-500 px-4 bg-white rounded-[2rem] border border-slate-100">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100">
               <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-3xl md:text-5xl font-black mb-6 text-slate-950 tracking-tighter uppercase italic">Анализ завершен!</h3>
            <p className="text-slate-500 mb-10 max-w-md mx-auto font-bold uppercase tracking-widest text-xs leading-loose">Оставьте контакты, чтобы увидеть точки роста и получить персональный Roadmap.</p>
            <form onSubmit={handleUnlockResults} className="max-w-md mx-auto space-y-6">
              <input 
                required 
                type="text" 
                placeholder="Telegram / Email" 
                value={contactInfo} 
                onChange={(e) => setContactInfo(e.target.value)} 
                className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-8 py-6 text-slate-900 focus:border-indigo-500 outline-none text-center text-xl font-bold" 
              />
              <button type="submit" disabled={isSubmittingLead} className="w-full bg-indigo-600 text-white py-6 rounded-2xl font-black text-xl hover:bg-slate-950 transition-all shadow-xl active:scale-95 uppercase tracking-widest">
                {isSubmittingLead ? 'Отправка...' : 'Показать результат'}
              </button>
            </form>
          </div>
        )}

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="mb-12">
              <h3 className="text-2xl md:text-3xl font-black text-slate-950 mb-8 flex items-center uppercase tracking-tighter italic">
                <span className="w-2 h-10 bg-indigo-600 rounded-full mr-4 shadow-sm"></span>
                Результаты Аудита
              </h3>
              <div className="bg-white p-10 md:p-14 rounded-[2.5rem] border border-slate-200 relative shadow-sm">
                 <p className="relative text-slate-800 text-xl md:text-3xl leading-relaxed font-bold italic">"{result.summary}"</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-emerald-50 rounded-[2.5rem] p-10 border border-emerald-100">
                <h4 className="font-black text-emerald-700 mb-8 uppercase text-[10px] tracking-[0.4em] flex items-center">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                  Ключевые гипотезы роста
                </h4>
                <ul className="space-y-6">
                  {result.quickWins.map((win, i) => (
                    <li key={i} className="flex items-start text-slate-800 font-bold text-lg leading-snug">
                      <span className="text-indigo-600 mr-4 font-black">#{i+1}</span> {win}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-red-50 rounded-[2.5rem] p-10 border border-red-100">
                <h4 className="font-black text-red-700 mb-8 uppercase text-[10px] tracking-[0.4em] flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  Критические риски
                </h4>
                <p className="text-slate-800 font-bold leading-relaxed text-lg opacity-90">{result.riskAssessment}</p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-4 bg-white hover:bg-indigo-50 border-2 border-indigo-600/20 px-10 py-5 rounded-2xl text-indigo-600 font-black text-sm uppercase tracking-widest transition-all"
              >
                Обсудить внедрение с экспертом
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditTool;
