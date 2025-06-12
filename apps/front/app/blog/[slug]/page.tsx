'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getArticle } from "@/data/loaders";
import ArticlePage from "@/pages/ArticlePage";
import type { Article } from "@/types";
import { useEffect, useState } from "react";

export default function Article({
  params,
}: {
  params: { slug: string };
}) {
    const { locale } = useLocale();
    const [data, setData] = useState<Article | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        const result = await getArticle(params.slug, locale);

        console.log("result", result);
        setData(result);
      };

      fetchData();
    }, [locale, params.slug]);

    if (!data) return null;

    return <ArticlePage data={data} />;
}
