'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { GlobalSettings } from "@/types";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import Header from "./Header";

// Dynamically import non-critical components
const DynamicFooter = dynamic(() => import("./Footer"), {
  loading: () => <div className="h-32 bg-gray-100" />,
  ssr: true,
});

interface RootLayoutClientProps {
  children: React.ReactNode;
  globalSettingsByLocale: { locale: string; settings: { data: GlobalSettings } }[];
  availableLocales: string[];
  fontClassName: string;
}

export default function RootLayoutClient({
  children,
  globalSettingsByLocale,
  availableLocales,
  fontClassName
}: RootLayoutClientProps) {
  const { locale, isLoading } = useLocale();

  // Get the settings for the current locale
  const currentSettings = globalSettingsByLocale.find(
    (settings) => settings.locale === locale
  )?.settings || globalSettingsByLocale[0].settings;

  return (
    <html lang={locale} className={fontClassName}>
      <body className="antialiased">
        <>
          <Header
            block={currentSettings.data}
            availableLocales={availableLocales}
          />
          {children}
          <DynamicFooter block={currentSettings.data} />
        </>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
