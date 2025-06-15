'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getArticles, getBlog } from "@/data/loaders";
import BlogPage from "@/pages/BlogPage";
import { Article, BlogPageData } from "@/types";
import * as Sentry from "@sentry/nextjs";
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
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
      async function checkConnectivity() {
        const result = await Sentry.diagnoseSdkConnectivity();
        setIsConnected(result !== 'sentry-unreachable');
      }
      checkConnectivity();
    }, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          await Sentry.startSpan({
            name: 'Blog Page Data Fetch',
            op: 'data.fetch'
          }, async () => {
            const result = await getBlog(locale);
            setData(result);
            const articlesResult = await getArticles(locale);
            setArticles(articlesResult);
          });
        } catch (error) {
          Sentry.captureException(error);
        }
      };

      fetchData();
    }, [locale]);

    if (!data || !articles) return null;

    return <BlogPage data={data} articles={articles} />;
}
