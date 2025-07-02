'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { clientGetEntreprise } from "@/utils/client-loaders";
import EntreprisePage from "@/pages/EntreprisePage";
import { EntreprisePageData } from "@/types";
import { useEffect, useState } from "react";

interface ClientEntreprisePageProps {
  initialData: EntreprisePageData;
  initialLocale: string;
}

export default function ClientEntreprisePage({ 
  initialData, 
  initialLocale 
}: ClientEntreprisePageProps) {
  const { locale } = useLocale();
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  useEffect(() => {
    if (locale !== currentLocale) {
      setIsLoading(true);
      clientGetEntreprise(locale)
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

  return <EntreprisePage data={data} />;
}