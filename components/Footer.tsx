import React from 'react';
import type { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface FooterProps {
  language: Language;
}

const FacebookIcon: React.FC = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.196h3.312z"/>
  </svg>
);


const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-[#0F172A] text-slate-300 mt-auto border-t-4 border-[#D61F1F]">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col items-center">
            <h4 className="font-black text-2xl mb-8 text-white tracking-tight">{t.footerContact}</h4>
            
            <a
                href="https://web.facebook.com/profile.php?id=61571702909168"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-3.5 bg-white text-[#0F172A] rounded-full hover:bg-[#D61F1F] hover:text-white transition-all duration-200 mb-12 font-bold shadow-lg"
            >
                <FacebookIcon />
                <span className="tracking-wide">{t.whatsappContact}</span>
            </a>

            <div className="w-24 h-1 bg-slate-700 rounded-full mb-8"></div>
            
            <div className="text-center w-full text-xs font-bold text-slate-500 tracking-wider uppercase">
                <p>{t.footerRights}</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;