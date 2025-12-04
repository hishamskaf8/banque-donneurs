

import React from 'react';
import type { Language } from '../types';
import { TRANSLATIONS, DOWNLOAD_CONTENT } from '../constants';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const content = DOWNLOAD_CONTENT[language];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/90 dark:bg-black/90 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col animate-pop border-4 border-[#D61F1F]">
        
        {/* Close Button */}
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-slate-400 hover:text-[#D61F1F] z-20 bg-white/50 dark:bg-slate-900/50 p-1 rounded-full transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>

        {/* Hero Illustration */}
        <div className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 p-8 flex justify-center items-center border-b border-slate-100 dark:border-slate-700 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D61F1F_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10 w-40 h-40 flex items-center justify-center">
                {/* Abstract Phone Shape */}
                <div className="w-24 h-40 bg-[#0F172A] rounded-2xl border-4 border-[#334155] shadow-xl relative flex items-center justify-center overflow-hidden">
                     <div className="absolute top-0 w-16 h-4 bg-[#334155] rounded-b-lg z-20"></div>
                     <div className="w-full h-full bg-white dark:bg-slate-800 flex flex-col items-center justify-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#D61F1F] animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                             <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                        <div className="w-8 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                     </div>
                     {/* Download Icon Overlay */}
                     <div className="absolute -bottom-2 -right-2 bg-[#D61F1F] p-2 rounded-lg shadow-lg border-2 border-white dark:border-slate-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                     </div>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-4 leading-tight">
                {content.title}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base font-medium leading-relaxed mb-8 whitespace-pre-line">
                {content.description}
            </p>

            <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-4 px-6 bg-gradient-to-r from-[#D61F1F] to-[#FF4545] text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                {content.buttonText}
            </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadModal;