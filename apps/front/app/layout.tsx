import RootLayoutClient from "@/components/layout/RootLayoutClient";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { getAvailableLocales, getGlobalSettings } from "@/data/loaders";
import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import { headers } from "next/headers";
import { cache } from 'react';

import "./globals.css";

const baloo2 = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// Cache the data fetching functions
const cachedGetGlobalSettings = cache(getGlobalSettings);
const cachedGetAvailableLocales = cache(getAvailableLocales);

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await cachedGetGlobalSettings();
  return {
    title: {
      default: metadata.data.title,
      template: '%s | ' + metadata.data.title
    },
    description: metadata.data.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const availableLocales = await cachedGetAvailableLocales();

  const preferredLanguage = acceptLanguage
    .split(",")[0]
    .split("-")[0]
    .toLowerCase();

  const initialLocale = preferredLanguage === 'fr' ? 'fr' : 'en';

  // Load settings only for the initial locale first
  const initialSettings = await cachedGetGlobalSettings(initialLocale);
  const globalSettingsByLocale = [
    { locale: initialLocale, settings: initialSettings }
  ];

  // Load other locale settings in parallel if needed
  if (initialLocale !== 'fr') {
    const frSettings = await cachedGetGlobalSettings('fr');
    globalSettingsByLocale.push({ locale: 'fr', settings: frSettings });
  }
  if (initialLocale !== 'en') {
    const enSettings = await cachedGetGlobalSettings('en');
    globalSettingsByLocale.push({ locale: 'en', settings: enSettings });
  }

  return (
    <LocaleProvider initialLocale={initialLocale}>
      <RootLayoutClient
        globalSettingsByLocale={globalSettingsByLocale}
        availableLocales={availableLocales.map((locale: { code: string }) => locale.code)}
        fontClassName={baloo2.variable}
      >
        {children}
      </RootLayoutClient>
    </LocaleProvider>
  );
}
