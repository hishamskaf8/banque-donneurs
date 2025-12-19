
import React, { useMemo, useEffect, useState, useRef } from 'react';
import type { Donor, Language } from '../types';
import { TRANSLATIONS, BLOOD_GROUPS, WILAYAS_MAP_FR_TO_AR } from '../constants';

interface StatsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  donors: Donor[];
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ isOpen, onClose, language, donors }) => {
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  // Statistics calculation
  const stats = useMemo(() => {
    const total = donors.length;
    const counts: Record<string, number> = {};
    const wilayaCounts: Record<string, number> = {};
    
    BLOOD_GROUPS.forEach(g => counts[g] = 0);
    
    donors.forEach(d => {
      // Blood group counts
      const bg = d.bloodGroup.trim().toUpperCase();
      if (counts[bg] !== undefined) counts[bg]++;

      // Wilaya counts
      let wilayaName = d.wilaya.trim();
      if (language === 'ar') {
          const frName = Object.keys(WILAYAS_MAP_FR_TO_AR).find(k => k.toLowerCase() === wilayaName.toLowerCase());
          if (frName) wilayaName = WILAYAS_MAP_FR_TO_AR[frName];
      }
      
      wilayaCounts[wilayaName] = (wilayaCounts[wilayaName] || 0) + 1;
    });

    const mostAvailable = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    
    // Sort wilayas by donor count
    const sortedWilayas = Object.entries(wilayaCounts)
      .sort((a, b) => b[1] - a[1]);

    return {
      total,
      counts,
      mostAvailable,
      wilayaStats: sortedWilayas,
      oNegCount: counts['O-'] || 0
    };
  }, [donors, language]);

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

  const handleDownloadPDF = async () => {
    if (!dashboardRef.current) return;
    setIsGeneratingPDF(true);
    
    try {
      const element = dashboardRef.current;
      
      // حفظ التنسيقات الأصلية لتغييرها مؤقتاً
      const originalHeight = element.style.height;
      const originalOverflow = element.style.overflow;
      const originalMaxHeight = element.style.maxHeight;

      // توسيع العنصر لالتقاط كامل الطول
      element.style.height = 'auto';
      element.style.maxHeight = 'none';
      element.style.overflow = 'visible';

      const canvas = await (window as any).html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff', // خلفية بيضاء للطباعة الرسمية
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      // إعادة التنسيقات الأصلية للواجهة
      element.style.height = originalHeight;
      element.style.maxHeight = originalMaxHeight;
      element.style.overflow = originalOverflow;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new (window as any).jspdf.jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // حساب النسبة والتناسب
      const ratio = pdfWidth / imgWidth;
      const imgScaledHeight = imgHeight * ratio;
      
      let heightLeft = imgScaledHeight;
      let position = 0;

      // إضافة الصفحة الأولى
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgScaledHeight);
      heightLeft -= pdfHeight;

      // إضافة صفحات إضافية إذا كان المحتوى طويلاً جداً
      while (heightLeft > 0) {
        position = heightLeft - imgScaledHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgScaledHeight);
        heightLeft -= pdfHeight;
      }

      const dateStr = new Date().toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-DZ').replace(/\//g, '-');
      pdf.save(`Stats-Don-Sang-CRA-${dateStr}.pdf`);
      
    } catch (error) {
      console.error('PDF Generation error:', error);
      alert(language === 'ar' ? 'حدث خطأ أثناء تحميل الملف' : 'Erreur lors du téléchargement du PDF');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

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
        
        {/* Header - Non-captured by dashboardRef logic in handleDownloadPDF as it's outside dashboardRef */}
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

        {/* Scrollable Body - This is what gets captured for PDF */}
        <div ref={dashboardRef} className="p-10 overflow-y-auto custom-scrollbar flex-grow bg-white dark:bg-slate-900">
          
          {/* PDF Report Header (Invisible in App, Visible in PDF thanks to capturing dashboardRef) */}
          <div className="hidden block pb-10 mb-10 border-b-4 border-[#D61F1F] text-center">
             <h1 className="text-4xl font-black text-[#D61F1F] mb-2 uppercase tracking-tighter">Don de Sang CRA</h1>
             <p className="text-xl font-bold text-slate-600">{t.stats.title}</p>
             <p className="text-sm text-slate-400 mt-2">{new Date().toLocaleString()}</p>
          </div>

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

          {/* Blood Group Distribution */}
          <div className="mb-12">
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3">
               <span className="w-2.5 h-8 bg-[#D61F1F] rounded-full"></span>
               {t.stats.distribution}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
               {BLOOD_GROUPS.map((group, index) => {
                  const count = stats.counts[group] || 0;
                  const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                  return (
                    <div key={group} className="space-y-3 animate-pop" style={{ animationDelay: `${index * 50}ms` }}>
                       <div className="flex justify-between items-end">
                          <span className="text-xl font-black text-slate-800 dark:text-slate-200">{group}</span>
                          <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{count} <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded ml-1">({Math.round(percentage)}%)</span></span>
                       </div>
                       <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded-full relative overflow-hidden group border border-slate-200 dark:border-slate-600">
                          <div 
                             className="h-full bg-gradient-to-r from-red-600 to-[#D61F1F] rounded-full transition-all duration-1000 ease-out relative"
                             style={{ width: isOpen ? `${percentage}%` : '0%' }}
                          >
                             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500"></div>
                          </div>
                       </div>
                    </div>
                  );
               })}
            </div>
          </div>

          {/* Wilaya Distribution Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-8 flex items-center gap-3">
               <span className="w-2.5 h-8 bg-[#0D9488] rounded-full"></span>
               {language === 'ar' ? 'توزيع المتبرعين حسب الولايات' : 'Distribution par Wilaya'}
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[2rem] border-2 border-slate-100 dark:border-slate-700 shadow-inner">
                <div className="space-y-6">
                    {stats.wilayaStats.length > 0 ? stats.wilayaStats.map(([wilaya, count], index) => {
                        const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                        return (
                            <div key={wilaya} className="flex flex-col gap-2.5">
                                <div className="flex justify-between items-center px-1">
                                    <span className="font-bold text-lg text-[#0F172A] dark:text-slate-200 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-slate-700 text-[10px] font-black border border-slate-200 dark:border-slate-600 shadow-sm">
                                          {index + 1}
                                        </span>
                                        {wilaya}
                                    </span>
                                    <div className="flex items-center gap-3">
                                      <span className="text-xs font-bold text-slate-400">{Math.round(percentage)}%</span>
                                      <span className="text-sm font-black bg-white dark:bg-slate-700 px-4 py-1.5 rounded-xl shadow-md border border-slate-100 dark:border-slate-600">
                                          {count}
                                      </span>
                                    </div>
                                </div>
                                <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden border border-slate-300/30">
                                    <div 
                                        className="h-full bg-[#0D9488] rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: isOpen ? `${percentage}%` : '0%' }}
                                    ></div>
                                </div>
                            </div>
                        );
                    }) : (
                        <p className="text-center text-slate-500 py-6 italic font-bold">
                            {language === 'ar' ? 'لا توجد بيانات كافية للولايات حالياً' : 'Pas de données de wilaya disponibles'}
                        </p>
                    )}
                </div>
            </div>
          </div>

          {/* O- Advice Card */}
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-teal-600 to-emerald-700 p-10 text-white shadow-2xl transition-transform hover:scale-[1.01]">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
              </div>
              <div className="relative z-10">
                 <h4 className="text-2xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                    <span className="p-2 bg-white/20 rounded-xl shadow-inner">📢</span>
                    {t.stats.specialNote}
                 </h4>
                 <p className="text-xl font-bold leading-relaxed text-emerald-50 max-w-3xl text-justify border-l-4 border-white/30 pl-6 rtl:border-l-0 rtl:border-r-4 rtl:pr-6">
                    {t.stats.oNegAdvice}
                 </p>
                 <div className="mt-8 inline-flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl font-black text-base border border-white/20 shadow-xl">
                    {language === 'ar' ? 'فصيلة O- الحالية:' : 'Donneurs O- actuels:'} 
                    <span className="text-3xl text-emerald-300 ml-2 drop-shadow-md">{stats.oNegCount}</span>
                 </div>
              </div>
          </div>

          {/* Report Footer Note (PDF only) */}
          <div className="hidden block pt-10 mt-10 border-t border-slate-200 text-center text-xs text-slate-400 italic">
             Don de Sang CRA — Croissant Rouge Algérien (Wilaya de Sidi Bel Abbès). Report automatically generated.
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-8 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-col sm:flex-row justify-between gap-4">
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="flex items-center justify-center gap-3 px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all duration-300 shadow-xl shadow-emerald-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm"
          >
            {isGeneratingPDF ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )}
            {language === 'ar' ? 'تحميل الإحصائية الكاملة PDF' : 'Télécharger Stats Complètes PDF'}
          </button>

          <button
            onClick={onClose}
            className="px-10 py-5 bg-[#0F172A] dark:bg-slate-700 text-white rounded-2xl font-black hover:bg-[#1E293B] dark:hover:bg-slate-600 transition-all duration-300 shadow-xl active:scale-95 uppercase tracking-wider text-sm"
          >
            {language === 'ar' ? 'إغلاق الإحصائيات' : 'Fermer les stats'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default StatsDashboard;
