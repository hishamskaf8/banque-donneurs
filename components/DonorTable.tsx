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
    <div className="relative mb-4">
        <div className="absolute inset-0 bg-red-100 rounded-full opacity-50 blur-xl"></div>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-[#C62828] relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.176 7.547 7.547 0 01-1.705-1.715.75.75 0 00-1.152.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
        </svg>
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

  // Helper function to translate gender based on current language
  const translateGender = (gender: string) => {
    const lowerCaseGender = gender.toLowerCase().trim();
    if (lowerCaseGender === 'ذكر' || lowerCaseGender === 'male') {
        return t.male;
    }
    if (lowerCaseGender === 'أنثى' || lowerCaseGender === 'female') {
        return t.female;
    }
    return gender; // Fallback for any other value
  };

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center p-16 bg-white rounded-xl shadow-sm border border-slate-200 min-h-[300px]">
            <LoadingSpinner />
            <p className="mt-4 text-slate-500 font-medium">{t.loading}</p>
        </div>
    );
  }

  // Show initial message if no search has been performed yet
  if (!hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white rounded-xl shadow-sm border border-slate-200 text-center min-h-[400px]">
        <BloodDropHero />
        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">{t.table.initialSearchMessage}</h3>
        <p className="text-slate-600 max-w-lg text-lg leading-relaxed">{t.searchNote}</p>
      </div>
    );
  }

  const NoResultsView = () => (
    <div className="flex flex-col items-center gap-3 text-slate-500 py-12">
        <SearchIcon />
        <p className="font-semibold text-lg text-slate-700">{t.table.noResults}</p>
        <p className="text-sm">{t.table.noResultsHint}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">{t.totalDonors}</h3>
        <span className="bg-red-100 text-[#C62828] text-sm font-bold px-3 py-1 rounded-full">{totalDonors}</span>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm text-start text-slate-700">
          <thead className="text-xs text-slate-600 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th scope="col" className="px-6 py-4 font-bold text-start">{t.table.fullName}</th>
              <th scope="col" className="px-6 py-4 font-bold text-start">{t.table.bloodGroup}</th>
              <th scope="col" className="px-6 py-4 font-bold text-start">{t.table.gender}</th>
              <th scope="col" className="px-6 py-4 font-bold text-start">{t.table.wilaya}</th>
              <th scope="col" className="px-6 py-4 font-bold text-start">{t.table.phone}</th>
              <th scope="col" className="px-6 py-4 font-bold text-start">{t.table.lastDonation}</th>
              <th scope="col" className="px-6 py-4 font-bold text-start">{t.table.notes}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {donors.length > 0 ? donors.map((donor, index) => (
              <tr key={`${donor.phone}-${index}`} className="bg-white hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900 whitespace-nowrap">{donor.fullName}</td>
                <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-50 text-[#C62828] font-bold border border-red-100">
                        {donor.bloodGroup}
                    </span>
                </td>
                <td className="px-6 py-4 text-slate-700 font-medium">{translateGender(donor.gender)}</td>
                <td className="px-6 py-4 text-slate-800 font-medium">{donor.wilaya}</td>
                <td className="px-6 py-4">
                  <a 
                    href={`tel:${donor.phone.replace(/[^0-9+]/g, '')}`} 
                    title={t.callAction} 
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-md font-semibold hover:bg-green-100 hover:border-green-300 transition-all text-xs"
                  >
                    <PhoneIcon />
                    <span>{donor.phone}</span>
                  </a>
                </td>
                <td className="px-6 py-4 text-slate-600">{donor.lastDonation || '-'}</td>
                <td className="px-6 py-4 max-w-xs text-slate-600 truncate" title={donor.notes}>{donor.notes || '-'}</td>
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

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden p-4 space-y-4 bg-slate-50">
        {donors.length > 0 ? donors.map((donor, index) => (
          <div key={`${donor.phone}-${index}`} className="bg-white p-5 rounded-lg shadow-sm border border-slate-200 hover:border-red-200 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="flex flex-col">
                <p className="font-bold text-lg text-slate-900">{donor.fullName}</p>
                <span className="text-sm text-slate-600 font-medium">{donor.wilaya}</span>
              </div>
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#C62828] text-white rounded-lg font-bold text-xl shadow-sm">
                {donor.bloodGroup}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-700 mb-4">
               <div>
                  <span className="text-xs text-slate-500 uppercase block font-semibold">{t.table.gender}</span>
                  <span className="font-medium">{translateGender(donor.gender)}</span>
               </div>
               <div>
                  <span className="text-xs text-slate-500 uppercase block font-semibold">{t.table.lastDonation}</span>
                  <span className="font-medium">{donor.lastDonation || '-'}</span>
               </div>
               {donor.notes && (
                   <div className="col-span-2 bg-slate-50 p-3 rounded text-sm mt-1 border border-slate-100 text-slate-700 leading-relaxed">
                      {donor.notes}
                   </div>
               )}
            </div>

            <a 
                href={`tel:${donor.phone.replace(/[^0-9+]/g, '')}`} 
                className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 text-white rounded-lg font-bold shadow-sm hover:bg-green-700 active:bg-green-800 transition-colors"
            >
                <PhoneIcon />
                <span>{t.callAction}</span>
            </a>
          </div>
        )) : (
          <div className="text-center py-8">
            <NoResultsView />
          </div>
        )}
      </div>

    </div>
  );
};

export default DonorTable;