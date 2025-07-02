'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { clientGetArticle } from "@/utils/client-loaders";
import ArticlePage from "@/pages/ArticlePage";
import { Article } from "@/types";
import { useEffect, useState } from "react";

interface ArticlePageWrapperProps {
  initialData: Article & { data: Article[] };
  initialLocale: string;
  slug: string;
}

export default function ArticlePageWrapper({ 
  initialData, 
  initialLocale, 
  slug 
}: ArticlePageWrapperProps) {
  const { locale } = useLocale();
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  useEffect(() => {
    if (locale !== currentLocale) {
      setIsLoading(true);
      clientGetArticle(slug, locale)
        .then(setData)
        .catch(console.error)
        .finally(() => setIsLoading(false));
      setCurrentLocale(locale);
    }
  }, [locale, currentLocale, slug]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </main>
    );
  }

  return <ArticlePage data={data} />;
}