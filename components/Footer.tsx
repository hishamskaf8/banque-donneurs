
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

const EmailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
);

const LocationIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);


const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="bg-[#0F172A] text-slate-300 mt-auto border-t-4 border-[#D61F1F]">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="flex flex-col items-center space-y-4">
            
            <a
                href="mailto:hisham.skaf8@gmail.com"
                className="w-full max-w-sm flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-[#0F172A] rounded-full hover:bg-[#16A34A] hover:text-white transition-all duration-200 font-bold shadow-lg"
            >
                <EmailIcon />
                <span className="tracking-wide">{t.supportContact}</span>
            </a>

            <a
                href="https://web.facebook.com/profile.php?id=61571702909168"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-sm flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-[#0F172A] rounded-full hover:bg-[#1877F2] hover:text-white transition-all duration-200 font-bold shadow-lg"
            >
                <FacebookIcon />
                <span className="tracking-wide">{t.whatsappContact}</span>
            </a>

            <a
                href="https://maps.app.goo.gl/uZwEcUZSPF6yAYWC7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-sm flex items-center justify-center gap-3 px-8 py-3.5 bg-white text-[#0F172A] rounded-full hover:bg-[#F59E0B] hover:text-white transition-all duration-200 font-bold shadow-lg mb-8"
            >
                <LocationIcon />
                <span className="tracking-wide">{t.ourLocation}</span>
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
