'use client'

import { createContext, useContext, useEffect, useState } from 'react';

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState(() => {
    // Try to get the locale from localStorage first
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale');
      if (savedLocale) return savedLocale;

      // If no saved locale, use browser language
      const browserLocale = navigator.language.split('-')[0];
      return browserLocale === 'fr' ? 'fr' : 'en';
    }
    return 'fr'; // Default fallback
  });

  useEffect(() => {
    // Listen for locale changes from the Header component
    const handleLocaleChange = (event: CustomEvent<{ locale: string }>) => {
      setLocale(event.detail.locale);
      // Save the locale to localStorage
      localStorage.setItem('locale', event.detail.locale);
    };

    window.addEventListener('localeChange', handleLocaleChange as EventListener);

    return () => {
      window.removeEventListener('localeChange', handleLocaleChange as EventListener);
    };
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
