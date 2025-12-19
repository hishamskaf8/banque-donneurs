
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
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  // قواعد البيانات
  const canGiveTo = selectedGroup ? COMPATIBILITY_RULES[selectedGroup as keyof typeof COMPATIBILITY_RULES] : [];
  const canReceiveFrom = selectedGroup ? RECIPIENT_RULES[selectedGroup as keyof typeof RECIPIENT_RULES] : [];

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/95 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      ></div>

      {/* Main Container */}
      <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] w-full max-w-7xl max-h-[95vh] overflow-hidden flex flex-col animate-pop border-4 border-[#D61F1F]">
        
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute -top-1/2 -left-1/4 w-[100%] h-[100%] bg-red-500 rounded-full blur-[120px] animate-pulse"></div>
           <div className="absolute -bottom-1/2 -right-1/4 w-[100%] h-[100%] bg-teal-500 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Header Section */}
        <div className="relative z-10 p-8 md:p-12 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] dark:text-white tracking-tighter flex items-center gap-5">
               <span className="p-4 bg-red-600 text-white rounded-[2rem] shadow-2xl shadow-red-500/40 transform -rotate-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.5c-4.97 0-9-4.03-9-9 0-4.97 9-13 9-13s9 8.03 9 13c0 4.97-4.03 9-9 9z" />
                  </svg>
               </span>
               {t.compatibilityTitle}
            </h2>
            <button 
              onClick={onClose}
              className="p-5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 rounded-[1.5rem] transition-all duration-300 transform hover:rotate-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-xl md:text-2xl font-bold text-slate-500 dark:text-slate-400 mt-2">
            {t.compatibility.instruction}
          </p>
        </div>

        {/* Interactive Matrix Body */}
        <div className="relative z-10 p-8 md:p-16 overflow-y-auto custom-scrollbar flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Selector Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 perspective-1000">
             {BLOOD_GROUPS.map((group) => {
               const isActive = selectedGroup === group;
               return (
                 <button
                    key={group}
                    onClick={() => setSelectedGroup(group)}
                    className={`
                      relative group h-40 md:h-48 rounded-[2.5rem] transition-all duration-500 transform-gpu flex flex-col items-center justify-center border-4
                      ${isActive 
                        ? 'bg-gradient-to-br from-[#D61F1F] to-[#B91C1C] border-white scale-110 -translate-y-4 shadow-[0_30px_60px_-10px_rgba(214,31,31,0.6)] z-30' 
                        : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-[#D61F1F] hover:scale-105 shadow-xl hover:shadow-2xl z-10 opacity-90'
                      }
                      active:scale-95
                    `}
                    style={{ transform: isActive ? 'translateZ(50px) rotateX(10deg)' : 'none' }}
                 >
                    <span className={`text-5xl md:text-7xl font-black transition-all duration-300 ${isActive ? 'text-white scale-110' : 'text-slate-800 dark:text-white'}`}>
                      {group}
                    </span>
                    {isActive && (
                       <div className="absolute -bottom-4 bg-white text-[#D61F1F] px-4 py-1 rounded-full text-xs font-black shadow-lg uppercase tracking-widest animate-bounce">
                         {language === 'ar' ? 'مختار' : 'Selected'}
                       </div>
                    )}
                 </button>
               );
             })}
          </div>

          {/* Right: Results Display (Dynamic Zones) */}
          <div className="lg:col-span-7 space-y-8">
             {selectedGroup ? (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pop">
                  
                  {/* Giving Zone */}
                  <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-[#D61F1F]/20 shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-16 h-16 text-[#D61F1F]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                     </div>
                     <h4 className="text-2xl font-black text-[#D61F1F] mb-6 flex items-center gap-3">
                        <span className="w-3 h-8 bg-[#D61F1F] rounded-full"></span>
                        {t.compatibility.givingTo}
                     </h4>
                     <div className="flex flex-wrap gap-3">
                        {canGiveTo.map(g => (
                          <div key={g} className="px-5 py-3 bg-[#D61F1F] text-white rounded-2xl font-black text-xl shadow-lg animate-float-delayed transform transition-transform hover:scale-125 hover:rotate-6 cursor-default">
                            {g}
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Receiving Zone */}
                  <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl p-8 rounded-[3rem] border-4 border-[#0D9488]/20 shadow-2xl relative overflow-hidden group">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-16 h-16 text-[#0D9488]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                     </div>
                     <h4 className="text-2xl font-black text-[#0D9488] mb-6 flex items-center gap-3">
                        <span className="w-3 h-8 bg-[#0D9488] rounded-full"></span>
                        {t.compatibility.receivingFrom}
                     </h4>
                     <div className="flex flex-wrap gap-3">
                        {canReceiveFrom.map(g => (
                          <div key={g} className="px-5 py-3 bg-[#0D9488] text-white rounded-2xl font-black text-xl shadow-lg animate-float transform transition-transform hover:scale-125 hover:-rotate-6 cursor-default">
                            {g}
                          </div>
                        ))}
                     </div>
                  </div>

                  {/* Special Insights Card */}
                  <div className="md:col-span-2 bg-gradient-to-r from-slate-900 to-slate-800 p-8 rounded-[3rem] shadow-2xl border-4 border-white/10">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                         <div className="flex-shrink-0 w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center text-4xl">
                            💡
                         </div>
                         <div>
                            <h5 className="text-white text-xl font-black mb-2 tracking-wide uppercase">
                               {selectedGroup === 'O-' ? t.compatibility.universalDonor : selectedGroup === 'AB+' ? t.compatibility.universalRecipient : (language === 'ar' ? 'معلومة تهمك' : 'Info Insight')}
                            </h5>
                            <p className="text-slate-300 font-bold text-lg leading-relaxed">
                               {selectedGroup === 'O-' 
                                 ? (language === 'ar' ? 'فصيلة O- هي المنقذ العالمي، يمكنها إعطاء الدم لجميع الفصائل الأخرى في حالات الطوارئ القصوى.' : 'O- is the universal life-saver; it can be given to any other blood type in extreme emergencies.')
                                 : selectedGroup === 'AB+' 
                                 ? (language === 'ar' ? 'فصيلة AB+ هي المستقبل العالمي، يمكن لصاحبها استقبال الدم من جميع الفصائل الأخرى بأمان.' : 'AB+ is the universal recipient; they can safely receive blood from any other type.')
                                 : (language === 'ar' ? 'هل تعلم أن التبرع المنتظم بالدم يقلل من مخاطر أمراض القلب ويجدد خلايا الدم في جسمك؟' : 'Did you know regular donation reduces heart disease risks and renews your blood cells?')}
                            </p>
                         </div>
                      </div>
                  </div>

               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-center p-12 space-y-8 bg-slate-50 dark:bg-slate-800/30 rounded-[3rem] border-4 border-dashed border-slate-200 dark:border-slate-700">
                  <div className="w-40 h-40 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center animate-pulse">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#D61F1F]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.5c-4.97 0-9-4.03-9-9 0-4.97 9-13 9-13s9 8.03 9 13c0 4.97-4.03 9-9 9z" />
                     </svg>
                  </div>
                  <h3 className="text-3xl font-black text-slate-400 dark:text-slate-500 max-w-md">
                     {t.compatibility.instruction}
                  </h3>
               </div>
             )}
          </div>
        </div>

        {/* Improved Action Footer */}
        <div className="relative z-10 p-10 bg-white dark:bg-slate-900 flex justify-center border-t border-slate-50 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-20 py-6 bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 text-white rounded-[2rem] font-black hover:from-[#D61F1F] hover:to-[#B91C1C] transition-all duration-500 shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(214,31,31,0.4)] active:scale-95 uppercase tracking-[0.2em] text-lg flex items-center gap-4"
          >
            {language === 'ar' ? 'إغلاق النافذة' : 'Fermer la fenêtre'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompatibilityModal;
