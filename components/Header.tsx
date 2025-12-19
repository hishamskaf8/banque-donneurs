
import React, { useState, useRef, useEffect } from 'react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenAbout: () => void;
  onOpenEligibility: () => void;
  onOpenARC: () => void;
  onOpenDownload: () => void;
  onOpenStats: () => void;
  onOpenCompatibility: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage, onOpenAbout, onOpenEligibility, onOpenARC, onOpenDownload, onOpenStats, onOpenCompatibility, isDarkMode, toggleTheme }) => {
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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${isScrolled ? 'bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 shadow-sm py-2' : 'bg-white/95 dark:bg-slate-900/95 border-transparent py-4'}`}>
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
            <h1 className="text-xl md:text-2xl font-bold text-[#0F172A] dark:text-white leading-none tracking-tight group-hover:text-[#D61F1F] dark:group-hover:text-red-400 transition-colors font-display">
              {t.mainTitle}
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium tracking-wide mt-1.5">
              {t.subTitle}
            </p>
          </div>
        </a>

        {/* Actions - Minimalist */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Theme Toggle (Hidden on Mobile) */}
          <button
            onClick={toggleTheme}
            className="hidden md:inline-flex p-2 md:p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 text-yellow-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            )}
          </button>

          <button
            onClick={toggleLanguage}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#0F172A] dark:text-white bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-[#D61F1F] hover:border-[#D61F1F] dark:hover:border-red-500 transition-all duration-200"
          >
            {t.languageSwitch}
          </button>
          
          {/* 3-dots Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleMenuToggle}
              className="p-3 text-[#0F172A] dark:text-white hover:text-[#D61F1F] dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 rounded-full transition-all duration-200"
              aria-label="Menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 origin-top-right animate-pop rtl:left-0 rtl:right-auto">
                <button
                   onClick={toggleLanguage}
                   className="md:hidden w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3 group"
                >
                   <span className="uppercase font-bold text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 px-2 py-1 rounded group-hover:bg-[#D61F1F] group-hover:text-white transition-colors">{t.languageSwitch}</span>
                   <span>{language === 'ar' ? 'اللغة' : 'Langue'}</span>
                </button>

                {/* Mobile Theme Toggle */}
                <button
                   onClick={() => {
                     toggleTheme();
                     setIsMenuOpen(false);
                   }}
                   className="md:hidden w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-3"
                >
                   <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                    {isDarkMode ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                    )}
                   </div>
                   <span>
                        {isDarkMode 
                            ? (language === 'ar' ? 'الوضع النهاري' : 'Mode Clair') 
                            : (language === 'ar' ? 'الوضع الليلي' : 'Mode Sombre')}
                   </span>
                </button>

                <button
                  onClick={() => {
                    onOpenCompatibility();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] dark:text-slate-100 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#D61F1F] dark:hover:text-red-400 transition-colors flex items-center gap-3 border-t border-slate-100 dark:border-slate-700 md:border-t-0"
                >
                  <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded text-[#D61F1F] dark:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 21.5c-4.97 0-9-4.03-9-9 0-4.97 9-13 9-13s9 8.03 9 13c0 4.97-4.03 9-9 9z" />
                    </svg>
                  </div>
                  {t.compatibilityTitle}
                </button>

                <button
                  onClick={() => {
                    onOpenStats();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] dark:text-slate-100 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#D61F1F] dark:hover:text-red-400 transition-colors flex items-center gap-3"
                >
                  <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded text-[#D61F1F] dark:text-red-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  {t.statsDashboard}
                </button>
                
                <button
                  onClick={() => {
                    onOpenEligibility();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] dark:text-slate-100 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#D61F1F] dark:hover:text-red-400 transition-colors flex items-center gap-3"
                >
                  <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded text-[#D61F1F] dark:text-red-400">
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
                  className="w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] dark:text-slate-100 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#D61F1F] dark:hover:text-red-400 transition-colors flex items-center gap-3"
                >
                  <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300 group-hover:text-[#D61F1F]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  {t.arcAboutTitle}
                </button>
                
                <button
                  onClick={() => {
                    onOpenDownload();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] dark:text-slate-100 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#D61F1F] dark:hover:text-red-400 transition-colors flex items-center gap-3"
                >
                  <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300 group-hover:text-[#D61F1F]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                    </svg>
                  </div>
                  {t.downloadApp}
                </button>

                <button
                  onClick={() => {
                    onOpenAbout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-start px-5 py-4 text-sm font-bold text-[#0F172A] dark:text-slate-100 hover:bg-red-50 dark:hover:bg-slate-700 hover:text-[#D61F1F] dark:hover:text-red-400 transition-colors flex items-center gap-3 border-t border-slate-100 dark:border-slate-700"
                >
                  <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300 group-hover:text-[#D61F1F]">
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
