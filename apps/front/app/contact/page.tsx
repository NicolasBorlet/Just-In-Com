'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getContact } from "@/data/loaders";
import ContactPage from "@/pages/ContactPage";
import { ContactPageData } from "@/types";
import { useEffect, useState } from "react";

export default function Contact() {
    const { locale } = useLocale();
    const [data, setData] = useState<ContactPageData | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        const result = await getContact(locale);

        console.log("result", result);
        setData(result);
      };

      fetchData();
    }, [locale]);

    if (!data) return null;

    return <ContactPage data={data} />;
}
