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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-white">
          <h2 className="text-xl font-bold text-slate-900">{t.aboutApp}</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-md hover:bg-slate-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto">
          {content.map((section, index) => (
            <div key={index} className="mb-8 last:mb-0">
              <h3 className="text-lg font-bold text-[#C62828] mb-3 border-b border-red-50 pb-2 inline-block">{section.title}</h3>
              {section.content && (
                <p className="text-slate-800 leading-relaxed whitespace-pre-line text-[15px]">{section.content}</p>
              )}
              {section.list && (
                <ul className="list-disc list-outside mx-5 mt-3 space-y-2 text-slate-800 text-[15px] leading-relaxed">
                  {section.list.map((item, i) => (
                    <li key={i} className="pl-1 marker:text-[#C62828]">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white border border-slate-300 text-slate-800 rounded-lg font-medium hover:bg-slate-100 transition-colors shadow-sm"
          >
            {language === 'ar' ? 'إغلاق' : 'Fermer'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default AboutModal;