'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { clientGetArticles, clientGetBlog } from "@/utils/client-loaders";
import BlogPage from "@/pages/BlogPage";
import { Article, BlogPageData } from "@/types";
import { useEffect, useState } from "react";

interface BlogPageWrapperProps {
  initialData: BlogPageData;
  initialArticles: {
    data: Article[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };
  initialLocale: string;
}

export default function BlogPageWrapper({ 
  initialData, 
  initialArticles, 
  initialLocale 
}: BlogPageWrapperProps) {
  const { locale } = useLocale();
  const [data, setData] = useState(initialData);
  const [articles, setArticles] = useState(initialArticles);
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(initialLocale);

  useEffect(() => {
    if (locale !== currentLocale) {
      setIsLoading(true);
      Promise.all([
        clientGetBlog(locale),
        clientGetArticles(locale)
      ])
        .then(([blogData, articlesData]) => {
          setData(blogData);
          setArticles(articlesData);
        })
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

  return <BlogPage data={data} articles={articles} />;
}