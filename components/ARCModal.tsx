
import React from 'react';
import type { Language } from '../types';
import { TRANSLATIONS, ARC_CONTENT } from '../constants';

interface ARCModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const ARCModal: React.FC<ARCModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  // Cast to allow optional title property which might not be present in the inferred type
  const content = ARC_CONTENT[language] as Array<{ title?: string; content: string }>;

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
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Algerian_Red_Crescent_logo.svg" 
                    alt="ARC Logo" 
                    className="w-6 h-6"
                />
            </span>
            {t.arcAboutTitle}
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
        <div className="p-0 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-800">
          
          {/* Hero Visual Section to break monotony */}
          <div className="bg-gradient-to-br from-red-50 to-white dark:from-slate-900 dark:to-slate-800 p-8 flex justify-center items-center border-b border-slate-100 dark:border-slate-700">
             <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#D61F1F]/10 dark:bg-[#D61F1F]/20 rounded-full animate-pulse-ring"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#D61F1F] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 p-2 rounded-full shadow-md">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#0D9488]" viewBox="0 0 20 20" fill="currentColor">
                     <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                   </svg>
                </div>
             </div>
          </div>

          <div className="p-8">
            {content.map((section, index) => (
              <div key={index} className="mb-8 last:mb-0 p-6 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                {section.title && (
                  <h3 className="text-lg font-bold text-[#D61F1F] dark:text-red-400 mb-4 uppercase tracking-wide flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-[#D61F1F] rounded-full"></span>
                      {section.title}
                  </h3>
                )}
                {section.content && (
                  <p className="text-[#0F172A] dark:text-white leading-relaxed text-base font-bold mb-0 whitespace-pre-line text-justify">
                      {section.content}
                  </p>
                )}
              </div>
            ))}
          </div>
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

export default ARCModal;
