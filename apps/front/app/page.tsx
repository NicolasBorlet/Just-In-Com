'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { getAccueil } from "@/data/loaders";
import HomePage from "@/pages/HomePage";
import { useEffect, useState } from "react";

export default function Home() {
  const { locale } = useLocale();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAccueil(locale);
      setData(result);
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
