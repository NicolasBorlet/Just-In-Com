'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getMariage } from "@/data/loaders";
import MariagePage from "@/pages/MariagePage";
import { MariagePageData } from "@/types";
import { useEffect, useState } from "react";

export default function Mariage() {
    const { locale } = useLocale();
    const [data, setData] = useState<MariagePageData | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        const result = await getMariage(locale);

        console.log("result", result);
        setData(result);
      };

      fetchData();
    }, [locale]);

    if (!data) return null;

    return <MariagePage data={data} />;
}
