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
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="font-bold mb-2">{t.footerContact}</p>
        <div className="flex justify-center items-center gap-4 text-gray-300 mb-4">
          <a
            href="https://web.facebook.com/profile.php?id=61571702909168"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <FacebookIcon />
            <span>{t.whatsappContact}</span>
          </a>
        </div>
        <p className="text-xs text-gray-400">{t.footerRights}</p>
      </div>
    </footer>
  );
};

export default Footer;