'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { clientGetMariage } from "@/utils/client-loaders";
import MariagePage from "@/pages/MariagePage";
import { MariagePageData } from "@/types";
import { useEffect, useState } from "react";

interface ClientMariagePageProps {
  initialData: MariagePageData;
  initialLocale: string;
}

export default function ClientMariagePage({ 
  initialData, 
  initialLocale 
}: ClientMariagePageProps) {
  const { locale } = useLocale();
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  useEffect(() => {
    if (locale !== currentLocale) {
      setIsLoading(true);
      clientGetMariage(locale)
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

  return <MariagePage data={data} />;
}