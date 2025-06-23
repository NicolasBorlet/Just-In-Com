'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getAccueil } from "@/data/loaders";
import HomePage from "@/pages/HomePage";
import { HomePageData } from "@/types";
import { useEffect, useState } from "react";

interface ClientHomePageProps {
  initialData: HomePageData;
  initialLocale: string;
}

export default function ClientHomePage({ initialData, initialLocale }: ClientHomePageProps) {
  const { locale } = useLocale();
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only fetch new data if locale changed from initial
    if (locale !== initialLocale) {
      setIsLoading(true);
      getAccueil(locale)
        .then(setData)
        .catch(console.error)
        .finally(() => setIsLoading(false));
    }
  }, [locale, initialLocale]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </main>
    );
  }

  return (
    <main>
      <HomePage data={data} />
    </main>
  );
}