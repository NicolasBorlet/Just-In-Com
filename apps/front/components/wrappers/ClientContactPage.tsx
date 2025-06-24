'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { clientGetContact } from "@/utils/client-loaders";
import ContactPage from "@/pages/ContactPage";
import { ContactPageData } from "@/types";
import { useEffect, useState } from "react";

interface ClientContactPageProps {
  initialData: ContactPageData;
  initialLocale: string;
}

export default function ClientContactPage({ 
  initialData, 
  initialLocale 
}: ClientContactPageProps) {
  const { locale } = useLocale();
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  useEffect(() => {
    if (locale !== currentLocale) {
      setIsLoading(true);
      clientGetContact(locale)
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

  return <ContactPage data={data} />;
}