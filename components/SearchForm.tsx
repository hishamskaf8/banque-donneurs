import React, { useState } from 'react';
import type { Language } from '../types';
import { TRANSLATIONS, WILAYAS_FR } from '../constants';
import LoadingSpinner from './LoadingSpinner';

interface SearchFormProps {
  language: Language;
  bloodGroups: string[];
  onSearch: (filters: { bloodGroup: string; wilaya: string; searchTerm: string }) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ language, bloodGroups, onSearch, onRefresh, isLoading }) => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const t = TRANSLATIONS[language];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ bloodGroup, wilaya, searchTerm });
  };

  return (
    <div className="p-6 md:p-8 mb-8 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-6">{t.searchTitle}</h2>
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        
        {/* Blood Group Filter */}
        <div className="flex flex-col">
          <label htmlFor="bloodGroup" className="text-sm font-medium text-gray-600 mb-1">{t.bloodGroup}</label>
          <select
            id="bloodGroup"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
          >
            <option value="">{t.allBloodGroups}</option>
            {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
          </select>
        </div>

        {/* Wilaya Filter */}
        <div className="flex flex-col">
          <label htmlFor="wilaya" className="text-sm font-medium text-gray-600 mb-1">{t.wilaya}</label>
          <select
            id="wilaya"
            value={wilaya}
            onChange={(e) => setWilaya(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
          >
            <option value="">{t.allWilayas}</option>
            {WILAYAS_FR.map(w => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        {/* Search Term Input */}
        <div className="flex flex-col md:col-span-2 lg:col-span-1">
          <label htmlFor="searchTerm" className="text-sm font-medium text-gray-600 mb-1">{t.searchTerm}</label>
          <input
            id="searchTerm"
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 items-center md:col-span-2 lg:col-span-1">
          <button
            type="submit"
            className="flex-grow w-full px-4 py-2 font-bold text-white bg-[#C62828] rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-105"
          >
            {t.searchButton}
          </button>
           <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition"
            aria-label={t.refreshButton}
          >
            {isLoading ? <LoadingSpinner/> :
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>}
          </button>
        </div>
      </form>
      <p className="text-xs text-gray-500 mt-4 text-center md:text-start">{t.searchNote}</p>
    </div>
  );
};

export default SearchForm;