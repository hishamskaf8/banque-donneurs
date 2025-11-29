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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8 relative overflow-hidden">
      {/* Decorative accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#C62828]"></div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#C62828]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {t.searchTitle}
        </h2>
        <p className="text-sm text-slate-600 font-medium mt-1 leading-relaxed">{t.searchNote}</p>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 items-end">
        
        {/* Blood Group Filter */}
        <div className="lg:col-span-3">
          <label htmlFor="bloodGroup" className="block text-sm font-bold text-slate-800 mb-2">{t.bloodGroup}</label>
          <div className="relative">
            <select
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 font-medium rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 block appearance-none transition-shadow"
            >
                <option value="">{t.allBloodGroups}</option>
                {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
            </select>
            <div className={`pointer-events-none absolute inset-y-0 ${language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center px-2 text-slate-500`}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Wilaya Filter */}
        <div className="lg:col-span-4">
          <label htmlFor="wilaya" className="block text-sm font-bold text-slate-800 mb-2">{t.wilaya}</label>
          <div className="relative">
            <select
                id="wilaya"
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
                className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 font-medium rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 block appearance-none transition-shadow"
            >
                <option value="">{t.allWilayas}</option>
                {WILAYAS_FR.map(w => (
                <option key={w} value={w}>
                    {w}
                </option>
                ))}
            </select>
            <div className={`pointer-events-none absolute inset-y-0 ${language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center px-2 text-slate-500`}>
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Search Term Input */}
        <div className="lg:col-span-3">
          <label htmlFor="searchTerm" className="block text-sm font-bold text-slate-800 mb-2">{t.searchTerm}</label>
          <input
            id="searchTerm"
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 font-medium rounded-lg focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-shadow"
          />
        </div>

        {/* Action Buttons */}
        <div className="lg:col-span-2 flex gap-2">
          <button
            type="submit"
            className="flex-grow w-full px-4 py-2.5 text-sm font-bold text-white bg-[#C62828] hover:bg-[#b71c1c] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-colors"
          >
            {t.searchButton}
          </button>
           <button
            type="button"
            onClick={onRefresh}
            disabled={isLoading}
            className="px-3 py-2.5 text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-colors"
            title={t.refreshButton}
          >
            {isLoading ? <LoadingSpinner/> :
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;