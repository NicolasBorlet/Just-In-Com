'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getArticle } from "@/data/loaders";
import ArticlePage from "@/pages/ArticlePage";
import type { Article } from "@/types";
import { useEffect, useState } from "react";

interface ArticleClientProps {
  initialData: Article;
  slug: string;
}

export default function ArticleClient({ initialData, slug }: ArticleClientProps) {
  const { locale } = useLocale();
  const [data, setData] = useState<Article>(initialData);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getArticle(slug, locale);
      setData(result);
    };

    if (locale !== "fr") {
      fetchData();
    }
  }, [locale, slug]);

  return <ArticlePage data={data} />;
}
