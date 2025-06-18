'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getEntreprise } from "@/data/loaders";
import EntreprisePage from "@/pages/EntreprisePage";
import { EntreprisePageData } from "@/types";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

export default function Entreprise() {
    const { locale } = useLocale();
    const [data, setData] = useState<EntreprisePageData | null>(null);
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
            name: 'Entreprise Page Data Fetch',
            op: 'data.fetch'
          }, async () => {
            const result = await getEntreprise(locale);
            setData(result);
          });
        } catch (error) {
          Sentry.captureException(error);
        }
      };

      fetchData();
    }, [locale]);

    if (!data) return null;

    return <EntreprisePage data={data} />;
}
