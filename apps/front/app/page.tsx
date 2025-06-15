'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getAccueil } from "@/data/loaders";
import HomePage from "@/pages/HomePage";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

export default function Home() {
  const { locale } = useLocale();
  const [data, setData] = useState(null);
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
          name: 'Home Page Data Fetch',
          op: 'data.fetch'
        }, async () => {
          const result = await getAccueil(locale);
          setData(result);
        });
      } catch (error) {
        Sentry.captureException(error);
      }
    };

    fetchData();
  }, [locale]);

  if (!data) return null;

  return (
    <main>
      <HomePage data={data} />
    </main>
  );
}
