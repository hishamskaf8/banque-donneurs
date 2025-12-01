import React from 'react';
import type { Language } from '../types';
import { TRANSLATIONS, ELIGIBILITY_CONTENT } from '../constants';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const EligibilityModal: React.FC<EligibilityModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const content = ELIGIBILITY_CONTENT[language];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop - Solid opacity, no blur */}
      <div 
        className="absolute inset-0 bg-slate-900/90 dark:bg-black/90 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content - Crisp White */}
      <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-pop border-4 border-[#D61F1F]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-2 border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-[#0F172A] dark:text-white flex items-center gap-3 tracking-tight">
            <span className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-[#D61F1F] dark:text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </span>
            {t.eligibilityTitle}
          </h2>
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
            <div key={index} className="mb-8 last:mb-0 p-6 bg-slate-50 dark:bg-slate-700 rounded-xl border-2 border-slate-100 dark:border-slate-600">
              {section.title && (
                <h3 className="text-lg font-bold text-[#D61F1F] dark:text-red-400 mb-4 uppercase tracking-wide">
                    {section.title}
                </h3>
              )}
              {section.content && (
                <p className="text-[#0F172A] dark:text-white leading-relaxed text-base font-bold mb-3 text-justify">
                    {section.content}
                </p>
              )}
              {section.list && (
                <ul className="space-y-3 mt-2">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-200 text-base leading-relaxed font-bold">
                        <svg className="w-5 h-5 text-[#0D9488] dark:text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"></path>
                        </svg>
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

export default EligibilityModal;