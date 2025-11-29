import React, { useState, useRef, useEffect } from 'react';
import type { Language } from '../types';
import { TRANSLATIONS, GOOGLE_FORM_URL } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenAbout: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, onOpenAbout }) => {
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
        setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 border-b ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-slate-200 py-3' : 'bg-white border-transparent py-5'}`}>
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
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
            className={`transition-all duration-300 ${isScrolled ? 'w-14 h-14' : 'w-20 h-20'}`}
          />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight group-hover:text-[#C62828] transition-colors">{t.mainTitle}</h1>
            <p className="text-xs md:text-sm text-slate-500 font-medium tracking-wide">{t.subTitle}</p>
          </div>
        </a>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={toggleLanguage}
            className="hidden md:block px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 bg-slate-100 border border-slate-200 rounded hover:bg-slate-200 transition-colors"
          >
            {t.languageSwitch}
          </button>
          
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-white bg-[#C62828] hover:bg-[#b71c1c] rounded-md shadow-sm transition-all items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>{t.registerButton}</span>
          </a>
          
          {/* Mobile Register Icon Button */}
           <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:hidden p-2 text-white bg-[#C62828] rounded-md shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </a>

          {/* 3-dots Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleMenuToggle}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-md hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-100 py-2 z-50 origin-top-right animate-in fade-in zoom-in duration-150 rtl:left-0 rtl:right-auto ring-1 ring-black ring-opacity-5">
                <button
                   onClick={toggleLanguage}
                   className="md:hidden w-full text-start px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-3"
                >
                   <span className="uppercase font-bold text-xs bg-slate-200 px-1.5 py-0.5 rounded">{t.languageSwitch}</span>
                   <span>{language === 'ar' ? 'اللغة' : 'Langue'}</span>
                </button>
                <button
                  onClick={() => {
                    onOpenAbout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-start px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-[#C62828] transition-colors flex items-center gap-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
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