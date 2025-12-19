
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

const FrozenIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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

  // دقة 4 أشهر بالتمام والكمال
  const isEligibleToDonate = (lastDonationStr: string): boolean => {
    if (!lastDonationStr || lastDonationStr === '-' || lastDonationStr.trim() === '') return true;

    const parts = lastDonationStr.split('/');
    if (parts.length !== 3) return true;

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed
    const year = parseInt(parts[2], 10);

    const lastDate = new Date(year, month, day);
    if (isNaN(lastDate.getTime())) return true;

    // إضافة 4 أشهر بالضبط
    const eligibilityDate = new Date(lastDate);
    eligibilityDate.setMonth(eligibilityDate.getMonth() + 4);

    const today = new Date();
    // تصفير الوقت للمقارنة بالتاريخ فقط
    today.setHours(0, 0, 0, 0);
    eligibilityDate.setHours(0, 0, 0, 0);

    return today >= eligibilityDate;
  };

  const translateGender = (gender: string) => {
    const lowerCaseGender = gender.toLowerCase().trim();
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
                {t.searchNote}
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
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm text-start text-slate-700 dark:text-slate-300">
            <thead className="text-xs text-[#0F172A] dark:text-white font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-700">
                <tr>
                <th scope="col" className="px-8 py-5 text-start">{t.table.fullName}</th>
                <th scope="col" className="px-6 py-5 text-start">{t.table.bloodGroup}</th>
                <th scope="col" className="px-6 py-5 text-start">{t.table.gender}</th>
                <th scope="col" className="px-6 py-5 text-start">{t.table.wilaya}</th>
                <th scope="col" className="px-6 py-5 text-start">{t.table.phone}</th>
                <th scope="col" className="px-6 py-5 text-start">{t.table.lastDonation}</th>
                <th scope="col" className="px-8 py-5 text-start">{t.table.notes}</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {donors.length > 0 ? donors.map((donor, index) => {
                  const eligible = isEligibleToDonate(donor.lastDonation);
                  return (
                    <tr key={`${donor.phone}-${index}`} className={`bg-white dark:bg-slate-800 hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-all duration-200 group border-b border-slate-50 dark:border-slate-700 last:border-0 ${!eligible ? 'opacity-40 grayscale pointer-events-none bg-slate-50 dark:bg-slate-900/50' : ''}`}>
                        <td className="px-8 py-5 font-bold text-[#0F172A] dark:text-white text-base whitespace-nowrap">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-[#0F172A] dark:text-white font-bold text-sm border-2 border-slate-200 dark:border-slate-600 group-hover:bg-[#D61F1F] group-hover:text-white group-hover:border-[#D61F1F] transition-colors ${!eligible ? 'bg-slate-300 dark:bg-slate-800 border-slate-400' : ''}`}>
                                    {donor.fullName.charAt(0)}
                                </div>
                                <div className="flex flex-col">
                                  {donor.fullName}
                                  {!eligible && <span className="text-[10px] text-red-600 dark:text-red-400 font-black uppercase tracking-tighter mt-0.5">{t.table.ineligible}</span>}
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-5">
                            <span className={`inline-flex items-center justify-center w-12 h-9 rounded ${eligible ? 'bg-[#D61F1F]' : 'bg-slate-400 dark:bg-slate-600'} text-white font-bold shadow-sm`}>
                                {donor.bloodGroup}
                            </span>
                        </td>
                        <td className="px-6 py-5 font-bold text-slate-700 dark:text-slate-300">{translateGender(donor.gender)}</td>
                        <td className="px-6 py-5 font-bold">
                            <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-600">
                                {donor.wilaya}
                            </span>
                        </td>
                        <td className="px-6 py-5">
                        {eligible ? (
                          <a 
                              href={`tel:${donor.phone.replace(/[^0-9+]/g, '')}`} 
                              title={t.callAction} 
                              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 text-[#0D9488] dark:text-teal-400 border-2 border-[#0D9488] dark:border-teal-400 rounded-lg font-bold hover:bg-[#0D9488] hover:text-white dark:hover:bg-teal-500 dark:hover:text-white transition-all duration-200"
                          >
                              <PhoneIcon />
                              <span>{donor.phone}</span>
                          </a>
                        ) : (
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-500 border-2 border-slate-300 dark:border-slate-600 rounded-lg font-bold opacity-60" title={t.table.ineligibleReason}>
                              <WaitIcon />
                              <span>{t.table.ineligible}</span>
                          </div>
                        )}
                        </td>
                        <td className="px-6 py-5 text-slate-800 dark:text-slate-300 font-bold font-mono text-xs">
                          <div className="flex flex-col">
                            {donor.lastDonation || '-'}
                            {!eligible && <span className="text-[9px] text-[#D61F1F] dark:text-red-400 font-black mt-1 max-w-[120px]">{t.table.ineligibleReason}</span>}
                          </div>
                        </td>
                        <td className="px-8 py-5 max-w-xs truncate text-slate-500 dark:text-slate-400 font-bold" title={donor.notes}>{donor.notes || '-'}</td>
                    </tr>
                  );
                }) : (
                <tr>
                    <td colSpan={7} className="text-center">
                    <NoResultsView />
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        {/* Mobile Card View (Frozen State) */}
        <div className="lg:hidden bg-slate-50 dark:bg-slate-900 p-4 space-y-4">
            {donors.length > 0 ? donors.map((donor, index) => {
              const eligible = isEligibleToDonate(donor.lastDonation);
              return (
                <div key={`${donor.phone}-${index}`} className={`bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 relative overflow-hidden group transition-all duration-300 ${!eligible ? 'opacity-50 grayscale scale-[0.98] pointer-events-none' : ''}`}>
                    <div className={`absolute top-0 left-0 w-2 h-full ${eligible ? 'bg-[#D61F1F]' : 'bg-slate-400 dark:bg-slate-600'}`}></div>
                    
                    {!eligible && (
                      <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-black shadow-lg">
                        <WaitIcon />
                        {t.table.ineligible}
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-5 pl-4">
                        <div>
                            <h4 className="font-bold text-lg text-[#0F172A] dark:text-white leading-tight mb-2 flex items-center gap-2">
                              {donor.fullName}
                            </h4>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {donor.wilaya}
                            </span>
                        </div>
                        <div className={`flex-shrink-0 w-16 h-16 flex items-center justify-center ${eligible ? 'bg-[#D61F1F]' : 'bg-slate-400 dark:bg-slate-600'} text-white rounded-xl font-bold text-2xl shadow-lg border-2 border-white dark:border-slate-800`}>
                            {donor.bloodGroup}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 pl-4">
                        <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                            <span className="text-[10px] text-slate-500 dark:text-slate-300 uppercase font-bold block mb-0.5">{t.table.gender}</span>
                            <span className="font-bold text-[#0F172A] dark:text-white text-sm">{translateGender(donor.gender)}</span>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                            <span className="text-[10px] text-slate-500 dark:text-slate-300 uppercase font-bold block mb-0.5">{t.table.lastDonation}</span>
                            <span className={`font-bold text-sm ${!eligible ? 'text-[#D61F1F] dark:text-red-400' : 'text-[#0F172A] dark:text-white'}`}>{donor.lastDonation || '-'}</span>
                        </div>
                    </div>

                    {!eligible && (
                      <div className="mb-4 pl-4 px-4 py-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl text-xs font-black text-[#D61F1F] dark:text-red-400 text-center flex items-center justify-center gap-2">
                        <WaitIcon />
                        {t.table.ineligibleReason}
                      </div>
                    )}

                    {eligible ? (
                      <a 
                          href={`tel:${donor.phone.replace(/[^0-9+]/g, '')}`} 
                          className="flex items-center justify-center gap-2 w-full py-4 bg-[#0D9488] text-white rounded-lg font-bold hover:bg-[#0F766E] transition-all duration-200 shadow-md active:translate-y-0.5"
                      >
                          <PhoneIcon />
                          <span>{t.callAction}</span>
                      </a>
                    ) : (
                      <div 
                          className="flex items-center justify-center gap-2 w-full py-4 bg-slate-200 dark:bg-slate-700 text-slate-400 rounded-lg font-bold cursor-not-allowed border-2 border-dashed border-slate-300 dark:border-slate-600"
                      >
                          <WaitIcon />
                          <span>{t.table.ineligible}</span>
                      </div>
                    )}
                </div>
              );
            }) : (
            <div className="text-center py-10">
                <NoResultsView />
            </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DonorTable;
