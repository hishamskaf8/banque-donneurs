
import React, { useMemo, useEffect, useState } from 'react';
import type { Donor, Language } from '../types';
import { TRANSLATIONS, BLOOD_GROUPS } from '../constants';

interface StatsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  donors: Donor[];
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ isOpen, onClose, language, donors }) => {
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const t = TRANSLATIONS[language];

  // Statistics calculation
  const stats = useMemo(() => {
    const total = donors.length;
    const counts: Record<string, number> = {};
    BLOOD_GROUPS.forEach(g => counts[g] = 0);
    
    donors.forEach(d => {
      const bg = d.bloodGroup.trim().toUpperCase();
      if (counts[bg] !== undefined) counts[bg]++;
    });

    const mostAvailable = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    
    return {
      total,
      counts,
      mostAvailable,
      oNegCount: counts['O-'] || 0
    };
  }, [donors]);

  // Animated Counter Effect
  useEffect(() => {
    if (isOpen) {
      let start = 0;
      const end = stats.total;
      if (end === 0) return;
      
      const duration = 1500;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setAnimatedTotal(end);
          clearInterval(timer);
        } else {
          setAnimatedTotal(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    } else {
      setAnimatedTotal(0);
    }
  }, [isOpen, stats.total]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0F172A]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-pop border border-white/20 dark:border-slate-700/50">
        
        {/* Header */}
        <div className="flex justify-between items-center p-8 border-b border-slate-200/50 dark:border-slate-700/50">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0F172A] dark:text-white tracking-tight flex items-center gap-3">
              <span className="p-2.5 bg-[#D61F1F] text-white rounded-2xl shadow-lg shadow-red-200 dark:shadow-red-900/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </span>
              {t.stats.title}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-[#D61F1F] p-3 rounded-full hover:bg-red-50 dark:hover:bg-slate-800 transition-all duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
          
          {/* Top Grid: Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Total Donors Card */}
            <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#D61F1F] to-[#FF4545] p-8 shadow-xl transition-transform hover:scale-[1.02]">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
               <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <span className="text-white/80 text-sm font-bold uppercase tracking-widest mb-2">{t.stats.totalDonors}</span>
                  <div className="text-6xl font-black text-white tabular-nums drop-shadow-md">{animatedTotal}</div>
                  <div className="mt-4 flex items-center gap-2 text-red-100 text-xs font-bold bg-white/10 px-4 py-1.5 rounded-full">
                     <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                     LIVE DATABASE
                  </div>
               </div>
            </div>

            {/* Most Available Card */}
            <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-100 dark:border-slate-700 transition-transform hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                   <div className="flex flex-col">
                      <span className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">{t.stats.mostAvailable}</span>
                      <div className="text-5xl font-black text-[#0F172A] dark:text-white mt-1">{stats.mostAvailable}</div>
                   </div>
                   <div className="relative">
                      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-[#D61F1F] dark:text-red-400 animate-bounce">
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                           <path d="M12 21.5c-4.97 0-9-4.03-9-9 0-4.97 9-13 9-13s9 8.03 9 13c0 4.97-4.03 9-9 9z" />
                         </svg>
                      </div>
                   </div>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                   <div className="h-full bg-[#D61F1F] rounded-full" style={{ width: '100%' }}></div>
                </div>
            </div>
          </div>

          {/* Blood Group Distribution - Progress Bars */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
               <span className="w-2 h-6 bg-[#0D9488] rounded-full"></span>
               {t.stats.distribution}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
               {BLOOD_GROUPS.map((group, index) => {
                  const count = stats.counts[group] || 0;
                  const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                  return (
                    <div key={group} className="space-y-2 animate-pop" style={{ animationDelay: `${index * 50}ms` }}>
                       <div className="flex justify-between items-end">
                          <span className="text-lg font-black text-slate-800 dark:text-slate-200">{group}</span>
                          <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{count} ({Math.round(percentage)}%)</span>
                       </div>
                       <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-full relative overflow-hidden group">
                          <div 
                             className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full transition-all duration-1000 ease-out relative"
                             style={{ width: isOpen ? `${percentage}%` : '0%' }}
                          >
                             {/* Shimmer Effect */}
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                          </div>
                       </div>
                    </div>
                  );
               })}
            </div>
          </div>

          {/* O- Advice Card - Special Gradient */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-600 to-emerald-500 p-8 text-white shadow-xl transition-transform hover:scale-[1.01]">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
              </div>
              <div className="relative z-10">
                 <h4 className="text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="p-1 bg-white/20 rounded">📢</span>
                    {t.stats.specialNote}
                 </h4>
                 <p className="text-lg font-bold leading-relaxed text-emerald-50 max-w-2xl text-justify">
                    {t.stats.oNegAdvice}
                 </p>
                 <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl font-bold text-sm">
                    {language === 'ar' ? 'فصيلة O- الحالية:' : 'Donneurs O- actuels:'} 
                    <span className="text-2xl ml-2">{stats.oNegCount}</span>
                 </div>
              </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-10 py-4 bg-[#0F172A] dark:bg-slate-700 text-white rounded-2xl font-bold hover:bg-[#1E293B] dark:hover:bg-slate-600 transition-all duration-300 shadow-xl active:scale-95"
          >
            {language === 'ar' ? 'إغلاق الإحصائيات' : 'Fermer les stats'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default StatsDashboard;
