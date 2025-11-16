
import React from 'react';
import type { Language } from '../types';
import { TRANSLATIONS, GOOGLE_FORM_URL } from '../constants';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const t = TRANSLATIONS[language];

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  return (
    <header className="py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Algerian_Red_Crescent_logo.svg"
            alt="Algerian Red Crescent Logo"
            className="w-20 h-20"
          />
          <div className="text-center md:text-start">
            <h1 className="text-2xl md:text-3xl font-bold text-[#C62828]">{t.mainTitle}</h1>
            <p className="text-sm md:text-base text-gray-600">{t.subTitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
          >
            {t.languageSwitch}
          </button>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm font-bold text-white bg-[#C62828] rounded-lg shadow-md hover:bg-red-700 transition-all transform hover:scale-105"
          >
            {t.registerButton}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
