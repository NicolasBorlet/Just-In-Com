'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getMariage } from "@/data/loaders";
import MariagePage from "@/pages/MariagePage";
import { MariagePageData } from "@/types";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

export default function Mariage() {
    const { locale } = useLocale();
    const [data, setData] = useState<MariagePageData | null>(null);
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
            name: 'Mariage Page Data Fetch',
            op: 'data.fetch'
          }, async () => {
            const result = await getMariage(locale);
            setData(result);
          });
        } catch (error) {
          Sentry.captureException(error);
        }
      };

      fetchData();
    }, [locale]);

    if (!data) return null;

    return <MariagePage data={data} />;
}
