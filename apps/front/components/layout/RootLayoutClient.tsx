'use client'

import { useLocale } from "@/contexts/LocaleContext";
import { GlobalSettings } from "@/types";
import Header from "./Header";

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
  const { locale } = useLocale();

  // Get the settings for the current locale
  const currentSettings = globalSettingsByLocale.find(
    (settings) => settings.locale === locale
  )?.settings || globalSettingsByLocale[0].settings;

  return (
    <html lang={locale} className={fontClassName}>
      <body className="antialiased">
        <Header
          block={currentSettings.data.header}
          availableLocales={availableLocales}
        />
        {children}
      </body>
    </html>
  );
}
