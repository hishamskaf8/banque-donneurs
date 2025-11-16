import React, { useState, useEffect, useCallback } from 'react';
import type { Donor, Language } from './types';
import { TRANSLATIONS, BLOOD_GROUPS, WILAYAS_MAP_FR_TO_AR } from './constants';
import { fetchDonors } from './services/donorService';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DonorTable from './components/DonorTable';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [allDonors, setAllDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const loadDonors = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const donors = await fetchDonors();
      setAllDonors(donors);
      setFilteredDonors(donors);
    } catch (err) {
      setError(TRANSLATIONS[language].fetchError);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadDonors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A more robust normalization function to handle common Arabic character variations.
  const normalizeText = (str: string): string => {
    if (!str) return '';
    return str
      .toLowerCase() // Standardize case for French names
      .replace(/[أإآ]/g, 'ا')   // Unify all Alef variants to a single Alef
      .replace(/[ىی]/g, 'ي')   // Unify Alef Maksura and Farsi Yeh to Arabic Yeh
      .replace(/ة/g, 'ه')     // Unify Taa Marbuta to Heh
      .replace(/\s+/g, '');  // Remove all whitespace characters
  };


  const handleSearch = useCallback((filters: { bloodGroup: string; wilaya: string; searchTerm: string; }) => {
    const { bloodGroup, wilaya, searchTerm } = filters;
    const lowercasedSearchTerm = searchTerm.toLowerCase().trim();

    const result = allDonors.filter(donor => {
      // Search term matching
      const nameMatch = lowercasedSearchTerm ? donor.fullName.toLowerCase().includes(lowercasedSearchTerm) : true;
      const phoneMatch = lowercasedSearchTerm ? donor.phone.toLowerCase().includes(lowercasedSearchTerm) : true;
      
      // Robust blood group matching (removes all whitespace and compares case-insensitively)
      const bloodGroupMatch = bloodGroup
        ? donor.bloodGroup.replace(/\s/g, '').toUpperCase() === bloodGroup.replace(/\s/g, '').toUpperCase()
        : true;
      
      // Wilaya Matching: Check against both French name and its Arabic equivalent.
      // This makes the search robust regardless of the language in the data source.
      const wilayaMatch = wilaya
        ? normalizeText(donor.wilaya) === normalizeText(wilaya) ||
          normalizeText(donor.wilaya) === normalizeText(WILAYAS_MAP_FR_TO_AR[wilaya])
        : true;

      return (nameMatch || phoneMatch) && bloodGroupMatch && wilayaMatch;
    });
    setFilteredDonors(result);
  }, [allDonors]);

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-br from-red-100 via-red-50 to-white -z-10"></div>
      
      <Header language={language} setLanguage={setLanguage} />

      <main className="container mx-auto px-4 py-8">
        <SearchForm
          language={language}
          bloodGroups={BLOOD_GROUPS}
          onSearch={handleSearch}
          onRefresh={loadDonors}
          isLoading={isLoading}
        />

        {error && <div className="text-center p-4 my-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        <DonorTable
          language={language}
          donors={filteredDonors}
          totalDonors={allDonors.length}
          isLoading={isLoading}
        />
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default App;