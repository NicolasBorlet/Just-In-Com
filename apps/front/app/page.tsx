'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getAccueil } from "@/data/loaders";
import HomePage from "@/pages/HomePage";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const { locale } = useLocale();
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Cache pour éviter les re-fetch inutiles
  const dataCache = useMemo(() => new Map(), []);

  useEffect(() => {
    async function checkConnectivity() {
      const result = await Sentry.diagnoseSdkConnectivity();
      setIsConnected(result !== 'sentry-unreachable');
    }
    checkConnectivity();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // Vérifier le cache d'abord
      if (dataCache.has(locale)) {
        setData(dataCache.get(locale));
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        await Sentry.startSpan({
          name: 'Home Page Data Fetch',
          op: 'data.fetch'
        }, async () => {
          const result = await getAccueil(locale);
          // Mettre en cache le résultat
          dataCache.set(locale, result);
          setData(result);
        });
      } catch (error) {
        Sentry.captureException(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [locale, dataCache]);

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </main>
    );
  }

  if (!data) return null;

  return (
    <main>
      <HomePage data={data} />
    </main>
  );
}
