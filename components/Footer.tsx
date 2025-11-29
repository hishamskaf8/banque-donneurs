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
    <footer className="bg-slate-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="flex flex-col items-center">
            <h4 className="font-bold text-lg mb-4 text-slate-100">{t.footerContact}</h4>
            
            <a
                href="https://web.facebook.com/profile.php?id=61571702909168"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-2.5 bg-slate-800 rounded-full hover:bg-[#1877F2] hover:text-white transition-all duration-300 group mb-8 border border-slate-700"
            >
                <FacebookIcon />
                <span className="font-medium group-hover:tracking-wide transition-all">{t.whatsappContact}</span>
            </a>

            <div className="w-full h-px bg-slate-800 mb-6"></div>
            
            <div className="text-center w-full text-sm text-slate-400 font-medium">
                <p>{t.footerRights}</p>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;