'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getArticles, getBlog } from "@/data/loaders";
import BlogPage from "@/pages/BlogPage";
import { Article, BlogPageData } from "@/types";
import { useEffect, useState } from "react";

export default function Blog() {
    const { locale } = useLocale();
    const [data, setData] = useState<BlogPageData | null>(null);
    const [articles, setArticles] = useState<{
        data: Article[];
        meta: {
            pagination: {
                page: number;
                pageSize: number;
                pageCount: number;
                total: number;
            };
        };
    } | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        const result = await getBlog(locale);

        console.log("result", result);
        setData(result);
        const articlesResult = await getArticles(locale);
        setArticles(articlesResult);
      };

      fetchData();
    }, [locale]);

    if (!data || !articles) return null;

    return <BlogPage data={data} articles={articles} />;
}
