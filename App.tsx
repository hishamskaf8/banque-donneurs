import React, { useState, useEffect, useCallback } from 'react';
import type { Donor, Language } from './types';
import { TRANSLATIONS, BLOOD_GROUPS, WILAYAS_MAP_FR_TO_AR } from './constants';
import { fetchDonors } from './services/donorService';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DonorTable from './components/DonorTable';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';
import EligibilityModal from './components/EligibilityModal';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [allDonors, setAllDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
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

  const normalizeText = (str: string): string => {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[أإآ]/g, 'ا')
      .replace(/[ىی]/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/\s+/g, '');
  };


  const handleSearch = useCallback((filters: { bloodGroup: string; wilaya: string; searchTerm: string; }) => {
    const { bloodGroup, wilaya, searchTerm } = filters;
    setHasSearched(true);

    const lowercasedSearchTerm = searchTerm.toLowerCase().trim();

    const result = allDonors.filter(donor => {
      const nameMatch = lowercasedSearchTerm ? donor.fullName.toLowerCase().includes(lowercasedSearchTerm) : true;
      const phoneMatch = lowercasedSearchTerm ? donor.phone.toLowerCase().includes(lowercasedSearchTerm) : true;
      
      const bloodGroupMatch = bloodGroup
        ? donor.bloodGroup.replace(/\s/g, '').toUpperCase() === bloodGroup.replace(/\s/g, '').toUpperCase()
        : true;
      
      const wilayaMatch = wilaya
        ? normalizeText(donor.wilaya) === normalizeText(wilaya) ||
          normalizeText(donor.wilaya) === normalizeText(WILAYAS_MAP_FR_TO_AR[wilaya])
        : true;

      return (nameMatch || phoneMatch) && bloodGroupMatch && wilayaMatch;
    });
    setFilteredDonors(result);
  }, [allDonors]);

  return (
    <div className="bg-grid-pattern min-h-screen text-[#0F172A] flex flex-col relative selection:bg-[#D61F1F] selection:text-white">
      {/* No blurred backgrounds - Pure Sharp White */}
      
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
      />

      <main className="container mx-auto px-4 py-8 flex-grow max-w-6xl relative z-0">
        <SearchForm
          language={language}
          bloodGroups={BLOOD_GROUPS}
          onSearch={handleSearch}
          onRefresh={loadDonors}
          isLoading={isLoading}
        />

        {error && (
          <div className="text-center p-6 my-6 bg-red-50 border-2 border-[#D61F1F] text-[#D61F1F] font-bold rounded-xl shadow-none">
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

      <EligibilityModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        language={language}
      />
    </div>
  );
};

export default App;