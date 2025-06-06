'use client'

import { createContext, useContext, useEffect, useState } from 'react';

type LocaleContextType = {
  locale: string;
  setLocale: (locale: string) => void;
  isLoading: boolean;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

interface LocaleProviderProps {
  children: React.ReactNode;
  initialLocale: string;
}

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const [locale, setLocale] = useState(initialLocale);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for locale changes from the Header component
    const handleLocaleChange = (event: CustomEvent<{ locale: string }>) => {
      setLocale(event.detail.locale);
      // Save the locale to localStorage
      localStorage.setItem('locale', event.detail.locale);
    };

    window.addEventListener('localeChange', handleLocaleChange as EventListener);

    // Set loading to false after initial mount
    setIsLoading(false);

    return () => {
      window.removeEventListener('localeChange', handleLocaleChange as EventListener);
    };
  }, []);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isLoading }}>
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
