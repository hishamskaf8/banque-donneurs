
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
          <h2 className="text-xl font-bold text-[#0F172A] tracking-tight">{t.aboutApp}</h2>
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
            <div key={index} className="mb-10 last:mb-0">
              <h3 className="text-lg font-bold text-[#D61F1F] mb-4 inline-flex items-center gap-2 uppercase tracking-wide">
                <span className="w-3 h-3 rounded-none bg-[#D61F1F]"></span>
                {section.title}
              </h3>
              {section.content && (
                <p className="text-[#0F172A] leading-relaxed whitespace-pre-line text-base font-bold">{section.content}</p>
              )}
              {section.list && (
                <ul className="space-y-4 mt-4">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex gap-4 text-[#334155] text-base leading-relaxed font-bold">
                        <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#0D9488] mt-2.5"></span>
                        {item}
                    </li>
                  ))}
                </ul>
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

export default AboutModal;
