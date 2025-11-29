import React from 'react';
import type { Donor, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import LoadingSpinner from './LoadingSpinner';

const PhoneIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

const SearchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const BloodDropHero: React.FC = () => (
    <div className="relative mb-8 cursor-default flex justify-center">
        {/* Main Icon - Solid and Sharp */}
        <div className="relative z-10 w-28 h-28 bg-[#D61F1F] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.176 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
            </svg>
        </div>
        {/* Sharp Badge */}
        <div className="absolute top-0 -right-2 w-8 h-8 bg-[#0D9488] rounded-full border-4 border-white shadow-md"></div>
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

  const translateGender = (gender: string) => {
    const lowerCaseGender = gender.toLowerCase().trim();
    if (lowerCaseGender === 'ذكر' || lowerCaseGender === 'male') return t.male;
    if (lowerCaseGender === 'أنثى' || lowerCaseGender === 'female') return t.female;
    return gender;
  };

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center p-20 bg-white rounded-xl shadow-lg border border-slate-200 min-h-[400px]">
            <LoadingSpinner />
            <p className="mt-6 text-[#D61F1F] font-black tracking-wide text-lg">{t.loading}</p>
        </div>
    );
  }

  // Initial State Design
  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center p-12 md:p-20 bg-white rounded-xl shadow-lg border-2 border-slate-100 text-center min-h-[500px]">
        
        <BloodDropHero />
        
        <div className="relative z-10 max-w-lg space-y-5">
            <h3 className="text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight leading-tight">
                {t.table.initialSearchMessage}
            </h3>
            <div className="w-20 h-1.5 bg-[#D61F1F] mx-auto rounded-full"></div>
            <p className="text-slate-600 text-lg font-bold leading-relaxed">
                {t.searchNote}
            </p>
        </div>
      </div>
    );
  }

  const NoResultsView = () => (
    <div className="flex flex-col items-center gap-4 text-slate-400 py-16">
        <div className="p-6 bg-slate-50 rounded-full border-2 border-slate-200">
            <SearchIcon />
        </div>
        <div className="text-center">
            <p className="font-bold text-xl text-slate-800 mb-1">{t.table.noResults}</p>
            <p className="text-base text-slate-600 font-medium">{t.table.noResultsHint}</p>
        </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-pop">
      {/* Results Header */}
      <div className="flex justify-between items-center px-2">
        <h3 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0D9488]"></span>
            {t.totalDonors}
        </h3>
        <span className="bg-[#D61F1F] text-white text-sm font-black px-4 py-1.5 rounded-full shadow-md">
            {totalDonors}
        </span>
      </div>
      
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm text-start text-slate-700">
            <thead className="text-xs text-[#0F172A] font-black uppercase tracking-wider bg-slate-100 border-b-2 border-slate-200">
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
            <tbody className="divide-y divide-slate-100">
                {donors.length > 0 ? donors.map((donor, index) => (
                <tr key={`${donor.phone}-${index}`} className="bg-white hover:bg-red-50/30 transition-all duration-200 group border-b border-slate-50 last:border-0">
                    <td className="px-8 py-5 font-bold text-[#0F172A] text-base whitespace-nowrap">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-[#0F172A] font-black text-sm border-2 border-slate-200 group-hover:bg-[#D61F1F] group-hover:text-white group-hover:border-[#D61F1F] transition-colors">
                                {donor.fullName.charAt(0)}
                            </div>
                            {donor.fullName}
                        </div>
                    </td>
                    <td className="px-6 py-5">
                        <span className="inline-flex items-center justify-center w-12 h-9 rounded bg-[#D61F1F] text-white font-black shadow-sm">
                            {donor.bloodGroup}
                        </span>
                    </td>
                    <td className="px-6 py-5 font-bold text-slate-700">{translateGender(donor.gender)}</td>
                    <td className="px-6 py-5 font-bold">
                        <span className="inline-block px-3 py-1 bg-slate-100 rounded text-slate-800 text-xs font-bold border border-slate-300">
                            {donor.wilaya}
                        </span>
                    </td>
                    <td className="px-6 py-5">
                    <a 
                        href={`tel:${donor.phone.replace(/[^0-9+]/g, '')}`} 
                        title={t.callAction} 
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#0D9488] border-2 border-[#0D9488] rounded-lg font-bold hover:bg-[#0D9488] hover:text-white transition-all duration-200"
                    >
                        <PhoneIcon />
                        <span>{donor.phone}</span>
                    </a>
                    </td>
                    <td className="px-6 py-5 text-slate-800 font-bold font-mono text-xs">{donor.lastDonation || '-'}</td>
                    <td className="px-8 py-5 max-w-xs truncate text-slate-500 font-bold" title={donor.notes}>{donor.notes || '-'}</td>
                </tr>
                )) : (
                <tr>
                    <td colSpan={7} className="text-center">
                    <NoResultsView />
                    </td>
                </tr>
                )}
            </tbody>
            </table>
        </div>

        {/* Mobile Card View (High Contrast) */}
        <div className="lg:hidden bg-slate-50 p-4 space-y-4">
            {donors.length > 0 ? donors.map((donor, index) => (
            <div key={`${donor.phone}-${index}`} className="bg-white p-6 rounded-xl shadow-md border border-slate-200 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-[#D61F1F]"></div>
                
                <div className="flex justify-between items-start mb-5 pl-4">
                    <div>
                        <h4 className="font-black text-xl text-[#0F172A] leading-tight mb-2">{donor.fullName}</h4>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {donor.wilaya}
                        </span>
                    </div>
                    <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-[#D61F1F] text-white rounded-xl font-black text-2xl shadow-lg border-2 border-white">
                        {donor.bloodGroup}
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 pl-4">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 uppercase font-black block mb-0.5">{t.table.gender}</span>
                        <span className="font-bold text-[#0F172A] text-sm">{translateGender(donor.gender)}</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 uppercase font-black block mb-0.5">{t.table.lastDonation}</span>
                        <span className="font-bold text-[#0F172A] text-sm">{donor.lastDonation || '-'}</span>
                    </div>
                </div>

                <a 
                    href={`tel:${donor.phone.replace(/[^0-9+]/g, '')}`} 
                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#0D9488] text-white rounded-lg font-black hover:bg-[#0F766E] transition-all duration-200 shadow-md active:translate-y-0.5"
                >
                    <PhoneIcon />
                    <span>{t.callAction}</span>
                </a>
            </div>
            )) : (
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