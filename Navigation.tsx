import React, { useState, useCallback } from 'react';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsOpen(false);
    }
  }, []);

  const navLinks = [
    { name: 'Преимущества', id: 'services' },
    { name: 'Кейсы', id: 'cases' },
    { name: 'Тарифы', id: 'pricing' },
    { name: 'Бесплатный Аудит', id: 'audit' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="flex items-center space-x-2 focus:outline-none"
          >
            <div className="text-xl font-black tracking-tighter text-slate-950 italic uppercase">
              Светлана <span className="text-indigo-600">Андреева</span>
            </div>
          </button>
          
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => handleScrollTo(link.id)} 
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-600 transition-colors focus:outline-none"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => handleScrollTo('contact')} 
              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all hover:bg-slate-900 active:scale-95 shadow-lg shadow-indigo-600/10"
            >
              Связаться
            </button>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 p-2 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => handleScrollTo(link.id)} 
                className="block w-full text-left text-sm font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 py-3"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => handleScrollTo('contact')}
              className="block w-full text-center bg-indigo-600 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs"
            >
              Обсудить проект
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;