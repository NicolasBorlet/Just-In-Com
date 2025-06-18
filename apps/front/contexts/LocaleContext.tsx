'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

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
  const [locale, setLocaleState] = useState(initialLocale);
  const [isLoading, setIsLoading] = useState(true);

  // Optimiser la fonction setLocale avec useCallback
  const setLocale = useCallback((newLocale: string) => {
    setLocaleState(newLocale);
    // Sauvegarder dans localStorage de manière asynchrone
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  }, []);

  useEffect(() => {
    // Récupérer la langue depuis localStorage au montage
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale');
      if (savedLocale && savedLocale !== locale) {
        setLocaleState(savedLocale);
      }
    }

    // Listen for locale changes from the Header component
    const handleLocaleChange = (event: CustomEvent<{ locale: string }>) => {
      setLocale(event.detail.locale);
    };

    window.addEventListener('localeChange', handleLocaleChange as EventListener);

    // Set loading to false after initial mount
    setIsLoading(false);

    return () => {
      window.removeEventListener('localeChange', handleLocaleChange as EventListener);
    };
  }, [setLocale, locale]);

  // Mémoriser la valeur du contexte pour éviter les re-renders inutiles
  const contextValue = useMemo(() => ({
    locale,
    setLocale,
    isLoading
  }), [locale, setLocale, isLoading]);

  return (
    <LocaleContext.Provider value={contextValue}>
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
