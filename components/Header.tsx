
import React, { useState, useRef, useEffect } from 'react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenAbout: () => void;
  onOpenEligibility: () => void;
  onOpenARC: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, onOpenAbout, onOpenEligibility, onOpenARC }) => {
  const t = TRANSLATIONS[language];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${isScrolled ? 'bg-white border-slate-200 shadow-sm py-2' : 'bg-white/95 border-transparent py-4'}`}>
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
        
        {/* Logo Section */}
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
          className="flex items-center gap-4 group"
          title={language === 'ar' ? "إعادة تحميل الصفحة" : "Recharger la page"}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Algerian_Red_Crescent_logo.svg"
            alt="Algerian Red Crescent Logo"
            className={`transition-all duration-300 drop-shadow-md ${isScrolled ? 'w-14 h-14' : 'w-20 h-20'}`}
          />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-[#0F172A] leading-none tracking-tight group-hover:text-[#D61F1F] transition-colors font-display">
              {t.mainTitle}
            </h1>
            <p className="text-sm md:text-base text-slate-600 font-medium tracking-wide mt-1.5">
              {t.subTitle}
            </p>
          </div>
        </a>

        {/* Actions - Minimalist */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0F172A] bg-white border-2 border-slate-200 rounded-full hover:bg-slate-50 hover:text-[#D61F1F] hover:border-[#D61F1F] transition-all duration-200"
          >
            {t.languageSwitch}
          </button>
          
          {/* 3-dots Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleMenuToggle}
              className="p-3 text-[#0F172A] hover:text-[#D61F1F] hover:bg-red-50 rounded-full transition-all duration-200"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 origin-top-right animate-pop rtl:left-0 rtl:right-auto">
                <button
                   onClick={toggleLanguage}
                   className="md:hidden w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] hover:bg-slate-50 transition-colors flex items-center gap-3 group"
                >
                   <span className="uppercase font-bold text-[10px] bg-slate-200 text-slate-800 px-2 py-1 rounded group-hover:bg-[#D61F1F] group-hover:text-white transition-colors">{t.languageSwitch}</span>
                   <span>{language === 'ar' ? 'اللغة' : 'Langue'}</span>
                </button>
                
                <button
                  onClick={() => {
                    onOpenEligibility();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] hover:bg-red-50 hover:text-[#D61F1F] transition-colors flex items-center gap-3 border-t border-slate-100 md:border-t-0"
                >
                  <div className="p-1.5 bg-red-100 rounded text-[#D61F1F]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {t.eligibilityTitle}
                </button>

                <button
                  onClick={() => {
                    onOpenARC();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] hover:bg-red-50 hover:text-[#D61F1F] transition-colors flex items-center gap-3"
                >
                  <div className="p-1.5 bg-slate-100 rounded text-slate-600 group-hover:text-[#D61F1F]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  {t.arcAboutTitle}
                </button>

                <button
                  onClick={() => {
                    onOpenAbout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] hover:bg-red-50 hover:text-[#D61F1F] transition-colors flex items-center gap-3"
                >
                  <div className="p-1.5 bg-slate-100 rounded text-slate-600 group-hover:text-[#D61F1F]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                  </div>
                  {t.aboutApp}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
