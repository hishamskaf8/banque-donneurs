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
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

interface DonorTableProps {
  language: Language;
  donors: Donor[];
  totalDonors: number;
  isLoading: boolean;
}

const DonorTable: React.FC<DonorTableProps> = ({ language, donors, totalDonors, isLoading }) => {
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
        <div className="flex flex-col items-center justify-center p-10 bg-white rounded-2xl shadow-lg border border-gray-100">
            <LoadingSpinner />
            <p className="mt-4 text-gray-600">{t.loading}</p>
        </div>
    );
  }

  const NoResultsView = () => (
    <div className="flex flex-col items-center gap-2 text-gray-500">
        <SearchIcon />
        <p className="font-semibold text-lg">{t.table.noResults}</p>
        <p>{t.table.noResultsHint}</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-bold">{t.totalDonors}: <span className="text-[#C62828]">{totalDonors}</span></h3>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden lg:block">
        <table className="w-full text-sm text-start text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-start">{t.table.fullName}</th>
              <th scope="col" className="px-6 py-3 text-start">{t.table.bloodGroup}</th>
              <th scope="col" className="px-6 py-3 text-start">{t.table.gender}</th>
              <th scope="col" className="px-6 py-3 text-start">{t.table.wilaya}</th>
              <th scope="col" className="px-6 py-3 text-start">{t.table.phone}</th>
              <th scope="col" className="px-6 py-3 text-start">{t.table.lastDonation}</th>
              <th scope="col" className="px-6 py-3 text-start">{t.table.notes}</th>
            </tr>
          </thead>
          <tbody>
            {donors.length > 0 ? donors.map((donor, index) => (
              <tr key={`${donor.phone}-${index}`} className="bg-white border-b hover:bg-red-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{donor.fullName}</td>
                <td className="px-6 py-4 text-center font-bold text-[#C62828] w-24">{donor.bloodGroup}</td>
                <td className="px-6 py-4">{translateGender(donor.gender)}</td>
                <td className="px-6 py-4">{donor.wilaya}</td>
                <td className="px-6 py-4">
                  <a href={`tel:${donor.phone.replace(/[^0-9+]/g, '')}`} title={t.callAction} className="flex items-center gap-2 hover:text-red-700 transition-colors">
                    <PhoneIcon />
                    <span>{donor.phone}</span>
                  </a>
                </td>
                <td className="px-6 py-4">{donor.lastDonation || 'N/A'}</td>
                <td className="px-6 py-4 max-w-xs truncate">{donor.notes || 'N/A'}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="text-center py-16">
                  <NoResultsView />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden p-4 space-y-4 bg-gray-50">
        {donors.length > 0 ? donors.map((donor, index) => (
          <div key={`${donor.phone}-${index}`} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-lg text-gray-800">{donor.fullName}</p>
                <a href={`tel:${donor.phone.replace(/[^0-9+]/g, '')}`} title={t.callAction} className="text-sm text-gray-500 flex items-center gap-2 hover:text-red-700 transition-colors">
                  <PhoneIcon />
                  <span>{donor.phone}</span>
                </a>
              </div>
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-red-100 text-[#C62828] rounded-full font-extrabold text-2xl">
                {donor.bloodGroup}
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div><span className="font-semibold">{t.table.wilaya}:</span> {donor.wilaya}</div>
              <div><span className="font-semibold">{t.table.lastDonation}:</span> {donor.lastDonation || 'N/A'}</div>
              <div className="col-span-2"><span className="font-semibold">{t.table.dob}:</span> {donor.dob || 'N/A'}</div>
              <div className="col-span-2"><span className="font-semibold">{t.table.gender}:</span> {translateGender(donor.gender) || 'N/A'}</div>
              <div className="col-span-2"><span className="font-semibold">{t.table.notes}:</span> {donor.notes || 'N/A'}</div>
            </div>
          </div>
        )) : (
          <div className="text-center py-16">
            <NoResultsView />
          </div>
        )}
      </div>

    </div>
  );
};

export default DonorTable;