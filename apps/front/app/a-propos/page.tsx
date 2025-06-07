'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getAbout } from "@/data/loaders";
import AboutPage from "@/pages/AboutPage";
import { AboutPageData } from "@/types";
import { useEffect, useState } from "react";

export default function About() {
    const { locale } = useLocale();
    const [data, setData] = useState<AboutPageData | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        const result = await getAbout(locale);

        console.log("result", result);
        setData(result);
      };

      fetchData();
    }, [locale]);

    if (!data) return null;

    return <AboutPage data={data} />;
}
