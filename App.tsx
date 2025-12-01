
import React, { useState, useEffect, useCallback } from 'react';
import type { Donor, Language } from './types';
import { TRANSLATIONS, BLOOD_GROUPS, WILAYAS_MAP_FR_TO_AR, GOOGLE_FORM_URL } from './constants';
import { fetchDonors } from './services/donorService';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DonorTable from './components/DonorTable';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';
import EligibilityModal from './components/EligibilityModal';
import ARCModal from './components/ARCModal';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [allDonors, setAllDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isEligibilityOpen, setIsEligibilityOpen] = useState<boolean>(false);
  const [isARCOpen, setIsARCOpen] = useState<boolean>(false);

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
    <div className="bg-grid-pattern min-h-screen text-[#0F172A] flex flex-col relative selection:bg-[#D61F1F] selection:text-white overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <svg className="absolute top-[10%] left-[5%] w-24 h-24 text-red-100 animate-float" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
        </svg>
        <svg className="absolute top-[20%] right-[10%] w-16 h-16 text-slate-100 animate-float-delayed" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
        </svg>
        <svg className="absolute bottom-[15%] left-[15%] w-32 h-32 text-red-50 animate-float" fill="currentColor" viewBox="0 0 24 24">
             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
         <svg className="absolute bottom-[30%] right-[5%] w-20 h-20 text-slate-50 animate-float-delayed" fill="currentColor" viewBox="0 0 24 24">
             <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </svg>
      </div>

      <Header 
        language={language} 
        setLanguage={setLanguage} 
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenEligibility={() => setIsEligibilityOpen(true)}
        onOpenARC={() => setIsARCOpen(true)}
      />

      {/* New Hero Action Section */}
      <section className="relative z-10 w-full bg-gradient-to-b from-white to-slate-50 border-b border-red-100 py-6 shadow-sm">
        <div className="container mx-auto px-4 max-w-6xl flex justify-center">
            <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto min-w-[300px] text-center px-8 py-4 text-base md:text-lg font-bold text-white bg-[#D61F1F] hover:bg-[#B91C1C] rounded-full shadow-lg shadow-red-200 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 animate-pulse-ring"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            <span>{TRANSLATIONS[language].registerButton}</span>
          </a>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 flex-grow max-w-6xl relative z-10">
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
      
      <ARCModal
        isOpen={isARCOpen}
        onClose={() => setIsARCOpen(false)}
        language={language}
      />
    </div>
  );
};

export default App;
