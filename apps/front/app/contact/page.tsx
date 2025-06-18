'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getContact } from "@/data/loaders";
import ContactPage from "@/pages/ContactPage";
import { ContactPageData } from "@/types";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

export default function Contact() {
    const { locale } = useLocale();
    const [data, setData] = useState<ContactPageData | null>(null);
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
            name: 'Contact Page Data Fetch',
            op: 'data.fetch'
          }, async () => {
            const result = await getContact(locale);
            setData(result);
          });
        } catch (error) {
          Sentry.captureException(error);
        }
      };

      fetchData();
    }, [locale]);

    if (!data) return null;

    return <ContactPage data={data} />;
}
