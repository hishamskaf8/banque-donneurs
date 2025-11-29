import React, { useState, useEffect, useCallback } from 'react';
import type { Donor, Language } from './types';
import { TRANSLATIONS, BLOOD_GROUPS, WILAYAS_MAP_FR_TO_AR } from './constants';
import { fetchDonors } from './services/donorService';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DonorTable from './components/DonorTable';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [allDonors, setAllDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  useEffect(() => {
    // Set document direction and language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Update meta tags and title for better SEO and immersion
    const t = TRANSLATIONS[language];
    document.title = t.pageTitle;
    
    const metaTags: { [key: string]: string } = {
        'description': t.metaDescription,
        'og:title': t.pageTitle,
        'og:description': t.metaDescription,
        'twitter:title': t.pageTitle,
        'twitter:description': t.metaDescription
    };

    Object.entries(metaTags).forEach(([key, value]) => {
        let element = key.startsWith('og:') || key.startsWith('twitter:')
            ? document.querySelector(`meta[property="${key}"]`)
            : document.querySelector(`meta[name="${key}"]`);
        
        if (element) {
            element.setAttribute('content', value);
        }
    });

  }, [language]);

  const loadDonors = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const donors = await fetchDonors();
      setAllDonors(donors);
      // We don't need to setFilteredDonors here immediately for display 
      // because we want to wait for user search, but we can initialize it 
      // to ensure it has data when search happens.
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
    setHasSearched(true); // Mark that a search has been performed

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
    <div className="bg-slate-50 min-h-screen text-slate-800 selection:bg-red-100 selection:text-red-900 flex flex-col">
      {/* Decorative top background */}
      <div className="fixed top-0 inset-x-0 h-96 bg-gradient-to-b from-slate-100 to-transparent -z-10"></div>
      
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      <main className="container mx-auto px-4 py-8 flex-grow max-w-6xl">
        <SearchForm
          language={language}
          bloodGroups={BLOOD_GROUPS}
          onSearch={handleSearch}
          onRefresh={loadDonors}
          isLoading={isLoading}
        />

        {error && (
          <div className="text-center p-4 my-6 bg-red-50 border border-red-200 text-red-700 rounded-lg shadow-sm">
            {error}
          </div>
        )}

        <DonorTable
          language={language}
          donors={filteredDonors}
          totalDonors={filteredDonors.length}
          isLoading={isLoading}
          hasSearched={hasSearched}
        />
      </main>
      
      <Footer language={language} />

      <AboutModal 
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        language={language}
      />
    </div>
  );
};

export default App;