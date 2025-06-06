'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getEntreprise } from "@/data/loaders";
import EntreprisePage from "@/pages/EntreprisePage";
import { EntreprisePageData } from "@/types";
import { useEffect, useState } from "react";

export default function Entreprise() {
    const { locale } = useLocale();
    const [data, setData] = useState<EntreprisePageData | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        const result = await getEntreprise(locale);

        console.log("result", result);
        setData(result);
      };

      fetchData();
    }, [locale]);

    if (!data) return null;

    return <EntreprisePage data={data} />;
}
