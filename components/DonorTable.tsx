
import React from 'react';
import type { Donor, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import LoadingSpinner from './LoadingSpinner';

const PhoneIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const WaitIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const BloodDropHero: React.FC = () => (
    <div className="relative mb-8 cursor-default flex justify-center">
        <div className="relative z-10 w-28 h-28 bg-[#D61F1F] rounded-full flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.5c-4.97 0-9-4.03-9-9 0-4.97 9-13 9-13s9 8.03 9 13c0 4.97-4.03 9-9 9z" />
            </svg>
        </div>
        <div className="absolute top-0 -right-2 w-8 h-8 bg-[#0D9488] rounded-full border-4 border-white dark:border-slate-800 shadow-md"></div>
    </div>
);

interface DonorTableProps {
  language: Language;
  donors: Donor[];
  totalDonors: number;
  isLoading: boolean;
  hasSearched: boolean;
}

const DonorTable: React.FC<DonorTableProps> = ({ language, donors, totalDonors, isLoading, hasSearched }) => {
  const t = TRANSLATIONS[language];

  // دالة فحص الأهلية الصارمة: 4 أشهر بالتمام والكمال
  const isEligibleToDonate = (lastDonationStr: string): { isEligible: boolean; nextDate: string | null } => {
    if (!lastDonationStr || lastDonationStr === '-' || lastDonationStr.trim() === '') {
      return { isEligible: true, nextDate: null };
    }

    const cleanDateStr = lastDonationStr.trim().replace(/-/g, '/');
    const parts = cleanDateStr.split('/');
    
    if (parts.length !== 3) return { isEligible: true, nextDate: null };

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const lastDate = new Date(year, month, day);
    if (isNaN(lastDate.getTime())) return { isEligible: true, nextDate: null };

    const eligibilityDate = new Date(lastDate);
    eligibilityDate.setMonth(eligibilityDate.getMonth() + 4);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eligibilityDate.setHours(0, 0, 0, 0);

    // المنطق الصارم: إذا كان تاريخ اليوم يسبق تاريخ الأهلية، أو إذا كان تاريخ التبرع "حديث جداً"
    const isEligible = today >= eligibilityDate;
    const isActuallyEligible = isEligible && today > lastDate;

    return { 
      isEligible: isActuallyEligible, 
      nextDate: isActuallyEligible ? null : eligibilityDate.toLocaleDateString(language === 'ar' ? 'ar-DZ' : 'fr-DZ') 
    };
  };

  const translateGender = (gender: string) => {
    const lowerCaseGender = (gender || '').toLowerCase().trim();
    if (lowerCaseGender === 'ذكر' || lowerCaseGender === 'male') return t.male;
    if (lowerCaseGender === 'أنثى' || lowerCaseGender === 'female') return t.female;
    return gender;
  };

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center p-20 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 min-h-[400px]">
            <LoadingSpinner />
            <p className="mt-6 text-[#D61F1F] font-bold tracking-wide text-lg">{t.loading}</p>
        </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center p-12 md:p-20 bg-white dark:bg-slate-800 rounded-xl shadow-lg border-2 border-slate-100 dark:border-slate-700 text-center min-h-[500px] transition-colors duration-300">
        <BloodDropHero />
        <div className="relative z-10 max-w-lg space-y-5">
            <h3 className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-white tracking-tight leading-tight">
                {t.table.initialSearchMessage}
            </h3>
            <div className="w-20 h-1.5 bg-[#D61F1F] mx-auto rounded-full"></div>
            <p className="text-slate-600 dark:text-slate-400 text-base font-medium leading-relaxed">
                {language === 'ar' ? 'ابحث عن متبرع عبر منصة Don de Sang CRA' : 'Recherchez un donneur via Don de Sang CRA'}
            </p>
        </div>
      </div>
    );
  }

  const NoResultsView = () => (
    <div className="flex flex-col items-center gap-4 text-slate-400 dark:text-slate-500 py-16">
        <div className="p-6 bg-slate-50 dark:bg-slate-700 rounded-full border-2 border-slate-200 dark:border-slate-600">
            <SearchIcon />
        </div>
        <div className="text-center">
            <p className="font-bold text-xl text-slate-800 dark:text-slate-200 mb-1">{t.table.noResults}</p>
            <p className="text-base text-slate-600 dark:text-slate-400 font-medium">{t.table.noResultsHint}</p>
        </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-pop">
      <div className="flex justify-between items-center px-2">
        <h3 className="text-lg font-bold text-[#0F172A] dark:text-white flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0D9488]"></span>
            {t.totalDonors}
        </h3>
        <span className="bg-[#D61F1F] text-white text-sm font-bold px-4 py-1.5 rounded-full shadow-md">
            {totalDonors}
        </span>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-300">
        {/* Desktop View */}
        <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm text-start text-slate-700 dark:text-slate-300">
            <thead className="text-xs text-[#0F172A] dark:text-white font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-700">
                <tr>
                <th className="px-8 py-5 text-start">{t.table.fullName}</th>
                <th className="px-6 py-5 text-start">{t.table.bloodGroup}</th>
                <th className="px-6 py-5 text-start">{t.table.gender}</th>
                <th className="px-6 py-5 text-start">{t.table.wilaya}</th>
                <th className="px-6 py-5 text-start">{t.table.phone}</th>
                <th className="px-6 py-5 text-start">{t.table.lastDonation}</th>
                <th className="px-8 py-5 text-start">{t.table.notes}</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {donors.length > 0 ? donors.map((donor, index) => {
                  const { isEligible, nextDate } = isEligibleToDonate(donor.lastDonation);
                  return (
                    <tr 
                      key={`${donor.phone}-${index}`} 
                      className={`transition-all duration-300 group border-b border-slate-50 dark:border-slate-700 last:border-0 relative
                        ${!isEligible ? 'bg-slate-100/50 dark:bg-slate-900/60 grayscale select-none cursor-not-allowed opacity-40 backdrop-blur-[2px]' : 'bg-white dark:bg-slate-800 hover:bg-teal-50/20 dark:hover:bg-teal-900/10'}`}
                    >
                        <td className="px-8 py-5 font-bold text-[#0F172A] dark:text-white text-base relative">
                            {/* شريط الأهلية الجانبي الأحمر للمانحين المتاحين */}
                            <div className={`absolute top-0 bottom-0 ${language === 'ar' ? 'right-0' : 'left-0'} w-1 ${isEligible ? 'bg-gradient-to-b from-[#D61F1F] to-red-400' : 'bg-slate-300'}`}></div>
                            
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm border-2 transition-all 
                                  ${!isEligible ? 'bg-slate-300 dark:bg-slate-700 border-slate-400 text-slate-600' : 'bg-slate-100 dark:bg-slate-700 text-[#0F172A] dark:text-white border-slate-200 group-hover:bg-[#0D9488] group-hover:text-white shadow-sm'}`}>
                                    {donor.fullName.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                  <span className={!isEligible ? 'line-through decoration-slate-400 text-slate-400' : ''}>{donor.fullName}</span>
                                  {isEligible ? (
                                    <span className="text-[10px] text-[#0D9488] dark:text-teal-400 font-black uppercase mt-0.5 tracking-tighter flex items-center gap-1">
                                      <CheckIcon /> {language === 'ar' ? 'جاهز للتبرع الآن' : 'PRÊT À DONNER'}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-red-600 dark:text-red-400 font-black uppercase mt-0.5 tracking-tighter flex items-center gap-1">
                                      <WaitIcon /> {t.table.ineligible}
                                    </span>
                                  )}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <span className={`inline-flex items-center justify-center w-12 h-9 rounded-lg font-black shadow-md border-2 
                              ${!isEligible ? 'bg-slate-500 text-white border-slate-400' : 'bg-[#D61F1F] text-white border-white/20'}`}>
                                {donor.bloodGroup}
                            </span>
                        </td>
                        <td className="px-6 py-5 font-bold">{translateGender(donor.gender)}</td>
                        <td className="px-6 py-5">
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300">
                                {donor.wilaya}
                            </span>
                        </td>
                        <td className="px-6 py-5">
                        {isEligible ? (
                          <a 
                              href={`tel:${donor.phone.replace(/[^0-9+]/g, '')}`} 
                              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D9488] text-white border-2 border-[#0D9488] rounded-xl font-bold hover:bg-white hover:text-[#0D9488] transition-all shadow-lg active:scale-95 shadow-teal-500/10"
                          >
                              <PhoneIcon />
                              <span>{donor.phone}</span>
                          </a>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-800 text-slate-500 border-2 border-dashed border-slate-400 dark:border-slate-600 rounded-xl font-bold opacity-60 pointer-events-none">
                              <WaitIcon />
                              <span>{t.table.ineligible}</span>
                          </div>
                        )}
                        </td>
                        <td className="px-6 py-5 text-xs font-bold font-mono">
                          <div className="flex flex-col">
                            <span className={!isEligible ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-slate-200'}>{donor.lastDonation || '-'}</span>
                            {!isEligible && (
                              <span className="text-[9px] text-[#D61F1F] dark:text-red-400 font-black mt-1 bg-red-50 dark:bg-red-900/20 px-1 py-0.5 rounded border border-red-100 dark:border-red-900/30">
                                {language === 'ar' ? `متاح بعد: ${nextDate}` : `Disponible le: ${nextDate}`}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-5 max-w-xs truncate text-slate-500 font-bold italic">{donor.notes || '-'}</td>
                    </tr>
                  );
                }) : (
                <tr><td colSpan={7}><NoResultsView /></td></tr>
                )}
            </tbody>
            </table>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
            {donors.length > 0 ? donors.map((donor, index) => {
              const { isEligible, nextDate } = isEligibleToDonate(donor.lastDonation);
              return (
                <div key={`${donor.phone}-${index}`} className={`relative p-6 rounded-3xl shadow-xl border-2 transition-all overflow-hidden
                  ${!isEligible ? 'bg-slate-100 dark:bg-slate-900 border-red-200 dark:border-red-900 grayscale opacity-70 pointer-events-none scale-[0.97]' : 'bg-white dark:bg-slate-800 border-transparent shadow-teal-200/20 dark:shadow-teal-900/10'}`}>
                    
                    {/* شريط علوي ملون للمتاحين باللون الأحمر المتميز */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 ${isEligible ? 'bg-gradient-to-r from-[#D61F1F] via-red-500 to-[#D61F1F]' : 'bg-slate-300'}`}></div>

                    {isEligible ? (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 bg-[#0D9488] text-white rounded-full text-[9px] font-black shadow-lg animate-pulse">
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        {language === 'ar' ? 'متاح الآن' : 'DISPONIBLE'}
                      </div>
                    ) : (
                      <div className="absolute top-3 right-3 bg-red-600 text-white text-[9px] px-3 py-1 rounded-full font-black flex items-center gap-1 shadow-md uppercase tracking-widest z-20">
                        <WaitIcon /> {t.table.ineligible}
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-4 mt-6">
                        <div className="flex flex-col gap-1">
                            <h4 className={`font-black text-xl tracking-tight ${!isEligible ? 'text-slate-500' : 'text-[#0F172A] dark:text-white'}`}>
                              {donor.fullName}
                            </h4>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    {donor.wilaya}
                                </span>
                            </div>
                        </div>
                        {/* مربع فصيلة الدم مستوي تماماً بدون ميلان */}
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg border-2 
                          ${!isEligible ? 'bg-slate-300 text-slate-600 border-slate-400' : 'bg-[#D61F1F] text-white border-white/30'}`}>
                            {donor.bloodGroup}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5 text-[11px] font-bold">
                       <div className={`p-3 rounded-2xl border ${!isEligible ? 'bg-red-50/50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 shadow-inner'}`}>
                          <span className="block text-slate-400 mb-1 uppercase tracking-tighter">{t.table.lastDonation}</span>
                          <span className={!isEligible ? 'text-red-600 font-black' : 'text-slate-800 dark:text-slate-200'}>{donor.lastDonation || '-'}</span>
                       </div>
                       <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-inner">
                          <span className="block text-slate-400 mb-1 uppercase tracking-tighter">{t.table.gender}</span>
                          <span className="text-slate-800 dark:text-slate-200">{translateGender(donor.gender)}</span>
                       </div>
                    </div>

                    {!isEligible ? (
                      <div className="w-full py-4 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded-2xl text-center font-black text-xs border-2 border-dashed border-slate-300 dark:border-slate-700">
                        {language === 'ar' ? `تاريخ التوفر: ${nextDate}` : `Disponible dès le ${nextDate}`}
                      </div>
                    ) : (
                      /* مربع الاتصال باللون الفيروزي المتميز */
                      <a 
                          href={`tel:${donor.phone}`} 
                          className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#0D9488] to-teal-500 text-white rounded-2xl font-black shadow-xl shadow-teal-500/30 active:scale-95 transition-transform"
                      >
                          <PhoneIcon />
                          <span className="tracking-wide">{t.callAction}</span>
                      </a>
                    )}
                </div>
              );
            }) : <NoResultsView />}
        </div>
      </div>
    </div>
  );
};

export default DonorTable;
