'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getAbout } from "@/data/loaders";
import AboutPage from "@/pages/AboutPage";
import { AboutPageData } from "@/types";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

export default function About() {
    const { locale } = useLocale();
    const [data, setData] = useState<AboutPageData | null>(null);
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
            name: 'About Page Data Fetch',
            op: 'data.fetch'
          }, async () => {
            const result = await getAbout(locale);
            setData(result);
          });
        } catch (error) {
          Sentry.captureException(error);
        }
      };

      fetchData();
    }, [locale]);

    if (!data) return null;

    return <AboutPage data={data} />;
}
