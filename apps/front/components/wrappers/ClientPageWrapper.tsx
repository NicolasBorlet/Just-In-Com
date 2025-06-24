'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { useEffect, useState } from "react";

interface ClientPageWrapperProps<T> {
  children: React.ReactNode;
  initialData: T;
  initialLocale: string;
  fetchData: (locale: string) => Promise<T>;
  PageComponent: React.ComponentType<{ data: T }>;
}

export default function ClientPageWrapper<T>({ 
  initialData, 
  initialLocale, 
  fetchData, 
  PageComponent 
}: ClientPageWrapperProps<T>) {
  const { locale } = useLocale();
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  useEffect(() => {
    if (locale !== currentLocale) {
      setIsLoading(true);
      fetchData(locale)
        .then(setData)
        .catch(console.error)
        .finally(() => setIsLoading(false));
      setCurrentLocale(locale);
    }
  }, [locale, currentLocale, fetchData]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </main>
    );
  }

  return <PageComponent data={data} />;
}