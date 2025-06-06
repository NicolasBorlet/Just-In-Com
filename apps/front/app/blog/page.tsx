'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getArticles, getBlog } from "@/data/loaders";
import BlogPage from "@/pages/BlogPage";
import { Article, BlogPageData } from "@/types";
import { useEffect, useState } from "react";

export default function Blog() {
    const { locale } = useLocale();
    const [data, setData] = useState<BlogPageData | null>(null);
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await getBlog(locale);

        console.log("result", result);
        setData(result);
        const articles = await getArticles(locale);
        setArticles(articles);
      };

      fetchData();
    }, [locale]);

    if (!data) return null;

    return <BlogPage data={data} articles={articles} />;
}
