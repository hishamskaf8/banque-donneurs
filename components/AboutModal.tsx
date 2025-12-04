
import React from 'react';
import type { Language } from '../types';
import { TRANSLATIONS, ABOUT_CONTENT } from '../constants';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const content = ABOUT_CONTENT[language];

  // Helper to get icon based on section index to avoid hardcoding in translation files
  const getSectionIcon = (index: number) => {
    switch (index) {
        case 0: // Mission
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            );
        case 1: // Developers
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            );
        case 2: // Features
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            );
        case 3: // Privacy
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            );
        case 4: // Why
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            );
        case 5: // Participate
             return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
             );
        default: // Contact
             return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
             );
    }
  };

  const getSectionColor = (index: number) => {
      const colors = [
          'bg-red-100 text-[#D61F1F] dark:bg-red-900/30 dark:text-red-400', // Mission
          'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300', // Devs
          'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', // Features
          'bg-teal-100 text-[#0D9488] dark:bg-teal-900/30 dark:text-teal-400', // Privacy
          'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', // Why
          'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400', // Participate
          'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400', // Contact
      ];
      return colors[index % colors.length];
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop - Solid opacity, no blur */}
      <div 
        className="absolute inset-0 bg-slate-900/90 dark:bg-black/90 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content - Crisp White/Dark */}
      <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-pop border-4 border-[#D61F1F]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white tracking-tight">{t.aboutApp}</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 dark:text-slate-500 hover:text-[#D61F1F] dark:hover:text-red-400 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-slate-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-800">
          {content.map((section, index) => (
            <div key={index} className="mb-10 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg ${getSectionColor(index)} shadow-sm`}>
                      {getSectionIcon(index)}
                  </div>
                  <h3 className="text-lg font-bold text-[#D61F1F] dark:text-red-400 uppercase tracking-wide">
                    {section.title}
                  </h3>
              </div>
              
              {section.content && (
                <p 
                  className="text-[#0F172A] dark:text-slate-200 leading-relaxed whitespace-pre-line text-base font-bold text-justify pl-2 border-l-2 border-slate-100 dark:border-slate-700"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                ></p>
              )}
              {section.list && (
                <ul className="space-y-4 mt-4">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex gap-4 text-[#334155] dark:text-slate-300 text-base leading-relaxed font-bold text-justify p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-100 dark:border-slate-700">
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#0D9488] dark:bg-teal-400 mt-2.5"></span>
                        <span className="text-justify">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[#0F172A] dark:bg-slate-700 text-white rounded-lg font-bold hover:bg-[#1E293B] dark:hover:bg-slate-600 transition-colors shadow-lg"
          >
            {language === 'ar' ? 'إغلاق' : 'Fermer'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutModal;
