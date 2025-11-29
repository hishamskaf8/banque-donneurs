
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
    <div className="relative mb-10">
        <div className="relative bg-white rounded-xl shadow-xl border-2 border-slate-100 p-6 md:p-8 overflow-hidden">
            {/* Top Accent Line - Sharp */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[#D61F1F]"></div>
            
            <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#0F172A] flex items-center gap-3 mb-3">
                        <span className="p-2 bg-red-600 text-white rounded-lg shadow-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </span>
                        {t.searchTitle}
                    </h2>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed max-w-2xl">
                        {t.searchNote}
                    </p>
                </div>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-end">
                
                {/* Blood Group Filter */}
                <div className="lg:col-span-3 space-y-2">
                    <label htmlFor="bloodGroup" className="text-xs font-bold uppercase tracking-wider text-slate-800">{t.bloodGroup}</label>
                    <div className="relative">
                        <select
                            id="bloodGroup"
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            className="w-full pl-4 pr-10 py-3.5 bg-white border-2 border-slate-300 text-[#0F172A] font-bold rounded-lg focus:ring-0 focus:border-[#D61F1F] block appearance-none transition-all duration-200 cursor-pointer hover:border-slate-400"
                        >
                            <option value="">{t.allBloodGroups}</option>
                            {bloodGroups.map(group => <option key={group} value={group}>{group}</option>)}
                        </select>
                        <div className={`pointer-events-none absolute inset-y-0 ${language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center px-2 text-slate-800`}>
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                {/* Wilaya Filter */}
                <div className="lg:col-span-4 space-y-2">
                    <label htmlFor="wilaya" className="text-xs font-bold uppercase tracking-wider text-slate-800">{t.wilaya}</label>
                    <div className="relative">
                        <select
                            id="wilaya"
                            value={wilaya}
                            onChange={(e) => setWilaya(e.target.value)}
                            className="w-full pl-4 pr-10 py-3.5 bg-white border-2 border-slate-300 text-[#0F172A] font-bold rounded-lg focus:ring-0 focus:border-[#D61F1F] block appearance-none transition-all duration-200 cursor-pointer hover:border-slate-400"
                        >
                            <option value="">{t.allWilayas}</option>
                            {WILAYAS_FR.map(w => (
                            <option key={w} value={w}>
                                {w}
                            </option>
                            ))}
                        </select>
                        <div className={`pointer-events-none absolute inset-y-0 ${language === 'ar' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center px-2 text-slate-800`}>
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                    </div>
                </div>

                {/* Search Term Input */}
                <div className="lg:col-span-3 space-y-2">
                    <label htmlFor="searchTerm" className="text-xs font-bold uppercase tracking-wider text-slate-800">{t.searchTerm}</label>
                    <input
                        id="searchTerm"
                        type="text"
                        placeholder={t.searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3.5 bg-white border-2 border-slate-300 text-[#0F172A] font-bold rounded-lg focus:ring-0 focus:border-[#D61F1F] transition-all duration-200 placeholder-slate-500"
                    />
                </div>

                {/* Action Buttons */}
                <div className="lg:col-span-2 flex gap-3">
                    <button
                        type="submit"
                        className="flex-grow w-full px-6 py-3.5 text-sm font-bold text-white bg-[#D61F1F] hover:bg-[#B91C1C] rounded-lg shadow-lg hover:shadow-xl focus:outline-none transition-all duration-200 transform active:scale-95 border border-[#B91C1C]"
                    >
                        {t.searchButton}
                    </button>
                    <button
                        type="button"
                        onClick={onRefresh}
                        disabled={isLoading}
                        className="px-4 py-3.5 text-slate-700 bg-white border-2 border-slate-300 rounded-lg hover:bg-slate-50 hover:text-[#D61F1F] hover:border-[#D61F1F] shadow-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        title={t.refreshButton}
                    >
                        {isLoading ? <LoadingSpinner/> :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default SearchForm;
