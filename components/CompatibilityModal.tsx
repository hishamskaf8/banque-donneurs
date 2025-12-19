
import React, { useState } from 'react';
import type { Language } from '../types';
import { TRANSLATIONS, BLOOD_GROUPS, COMPATIBILITY_RULES, RECIPIENT_RULES } from '../constants';

interface CompatibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const CompatibilityModal: React.FC<CompatibilityModalProps> = ({ isOpen, onClose, language }) => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [mode, setMode] = useState<'donor' | 'recipient'>('donor');
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const rules = mode === 'donor' ? COMPATIBILITY_RULES : RECIPIENT_RULES;
  const compatibleWith = selectedGroup ? rules[selectedGroup as keyof typeof rules] : [];

  const isCompatible = (group: string) => {
    return compatibleWith.includes(group);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      <div className="relative bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-pop border-4 border-[#D61F1F]">
        
        {/* Header Section */}
        <div className="p-8 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#0F172A] dark:text-white uppercase tracking-tighter flex items-center gap-3">
               <span className="p-2.5 bg-red-600 text-white rounded-2xl shadow-xl shadow-red-500/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.5c-4.97 0-9-4.03-9-9 0-4.97 9-13 9-13s9 8.03 9 13c0 4.97-4.03 9-9 9z" />
                  </svg>
               </span>
               {t.compatibility.title}
            </h2>
            <button 
              onClick={onClose}
              className="p-3 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 rounded-2xl transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mode Toggle Strategy */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl shadow-inner max-w-md mx-auto mb-4">
            <button
              onClick={() => { setMode('donor'); setSelectedGroup(null); }}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-black transition-all duration-300 ${mode === 'donor' ? 'bg-[#D61F1F] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              {t.compatibility.donorMode}
            </button>
            <button
              onClick={() => { setMode('recipient'); setSelectedGroup(null); }}
              className={`flex-1 py-3 px-6 rounded-xl text-sm font-black transition-all duration-300 ${mode === 'recipient' ? 'bg-[#0D9488] text-white shadow-lg' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
            >
              {t.compatibility.recipientMode}
            </button>
          </div>
        </div>

        {/* Infographic Area */}
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-grow bg-slate-50 dark:bg-slate-950/50">
          
          <div className="text-center mb-10">
            <p className="text-lg font-bold text-slate-600 dark:text-slate-400">
               {selectedGroup ? (
                 <span className="flex items-center justify-center gap-3">
                   {mode === 'donor' ? t.compatibility.givingTo : t.compatibility.receivingFrom}
                   <span className={`text-3xl font-black ${mode === 'donor' ? 'text-[#D61F1F]' : 'text-[#0D9488]'}`}>
                     {selectedGroup}
                   </span>
                 </span>
               ) : t.compatibility.instruction}
            </p>
          </div>

          {/* 3D Grid of Blood Groups */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 perspective-1000">
             {BLOOD_GROUPS.map((group) => {
               const active = selectedGroup === group;
               const highlighted = isCompatible(group);
               
               return (
                 <button
                    key={group}
                    onClick={() => setSelectedGroup(group)}
                    className={`
                      relative group h-32 md:h-40 rounded-3xl transition-all duration-500 transform-gpu
                      flex flex-col items-center justify-center border-4
                      ${active 
                        ? (mode === 'donor' ? 'bg-[#D61F1F] border-white scale-110 -translate-y-2 rotate-y-12 z-20 shadow-[0_20px_50px_rgba(214,31,31,0.4)]' : 'bg-[#0D9488] border-white scale-110 -translate-y-2 rotate-y-12 z-20 shadow-[0_20px_50px_rgba(13,148,136,0.4)]')
                        : highlighted
                          ? 'bg-white dark:bg-slate-800 border-[#D61F1F]/20 dark:border-red-500/20 scale-105 z-10 shadow-xl'
                          : 'bg-white dark:bg-slate-800 border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm opacity-60 grayscale'
                      }
                      ${highlighted && !active && (mode === 'donor' ? 'animate-pulse-ring' : 'ring-4 ring-[#0D9488]/30')}
                    `}
                 >
                    {/* Universal badges */}
                    {group === 'O-' && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-500 text-white text-[10px] font-black rounded-full shadow-lg z-30 uppercase tracking-widest whitespace-nowrap">
                        {t.compatibility.universalDonor}
                      </span>
                    )}
                    {group === 'AB+' && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-500 text-white text-[10px] font-black rounded-full shadow-lg z-30 uppercase tracking-widest whitespace-nowrap">
                        {t.compatibility.universalRecipient}
                      </span>
                    )}

                    <span className={`text-4xl md:text-5xl font-black transition-colors duration-300 ${active ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                      {group}
                    </span>
                    
                    {/* Visual Connector Line (Conceptual) */}
                    {active && (
                       <div className="mt-2 w-12 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
                    )}
                 </button>
               );
             })}
          </div>

          {/* Legend / Info */}
          <div className="mt-12 p-6 bg-white dark:bg-slate-800 rounded-3xl border-2 border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center justify-center gap-8 text-sm font-bold">
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-lg bg-[#D61F1F] shadow-md"></div>
                 <span className="text-slate-600 dark:text-slate-300">{mode === 'donor' ? 'Groupe Donneur' : 'Match Trouvé'}</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-lg bg-[#0D9488] shadow-md"></div>
                 <span className="text-slate-600 dark:text-slate-300">{mode === 'recipient' ? 'Groupe Receveur' : 'Match Trouvé'}</span>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                 <div className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600"></div>
                 <span className="text-slate-600 dark:text-slate-300">Non Compatible</span>
              </div>
          </div>
        </div>

        <div className="p-8 bg-white dark:bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-[#0F172A] dark:bg-slate-800 text-white rounded-2xl font-black hover:bg-[#D61F1F] transition-all duration-300 shadow-xl active:scale-95 uppercase tracking-widest text-sm"
          >
            {language === 'ar' ? 'إغلاق' : 'Fermer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityModal;
