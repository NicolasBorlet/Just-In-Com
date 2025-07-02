'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { clientGetAbout } from "@/utils/client-loaders";
import AboutPage from "@/pages/AboutPage";
import { AboutPageData } from "@/types";
import { useEffect, useState } from "react";

interface ClientAboutPageProps {
  initialData: AboutPageData;
  initialLocale: string;
}

export default function ClientAboutPage({ 
  initialData, 
  initialLocale 
}: ClientAboutPageProps) {
  const { locale } = useLocale();
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  useEffect(() => {
    if (locale !== currentLocale) {
      setIsLoading(true);
      clientGetAbout(locale)
        .then(setData)
        .catch(console.error)
        .finally(() => setIsLoading(false));
      setCurrentLocale(locale);
    }
  }, [locale, currentLocale]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </main>
    );
  }

  return <AboutPage data={data} />;
}