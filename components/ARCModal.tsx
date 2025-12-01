

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
  // We can display both languages or just the active one. The request implies showing the content "based on interface" or as provided.
  // The provided content in prompt had both "Aperçu en français" and "لمحة بالعربية". 
  // We will display the content relevant to the current language, or all if preferred.
  // Based on structure of other modals, we show `ARC_CONTENT[language]`.
  const content = ARC_CONTENT[language];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop - Solid opacity, no blur */}
      <div 
        className="absolute inset-0 bg-slate-900/90 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content - Crisp White */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col animate-pop border-4 border-[#D61F1F]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b-2 border-slate-100 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-3 tracking-tight">
            <span className="p-2 bg-red-100 rounded-lg text-[#D61F1F]">
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
            className="text-slate-400 hover:text-[#D61F1F] transition-colors p-2 rounded-full hover:bg-red-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar bg-white">
          {content.map((section, index) => (
            <div key={index} className="mb-8 last:mb-0 p-6 bg-slate-50 rounded-xl border-2 border-slate-100">
              {section.title && (
                <h3 className="text-lg font-bold text-[#D61F1F] mb-4 uppercase tracking-wide">
                    {section.title}
                </h3>
              )}
              {section.content && (
                <p className="text-[#0F172A] leading-relaxed text-base font-bold mb-3 whitespace-pre-line text-justify">
                    {section.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t-2 border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[#0F172A] text-white rounded-lg font-bold hover:bg-[#1E293B] transition-colors shadow-lg"
          >
            {language === 'ar' ? 'إغلاق' : 'Fermer'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ARCModal;