import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Baloo_2, Italiana } from "next/font/google";
import { DefaultSeo } from "next-seo";

const baloo2 = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  display: "swap",
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://justincom.fr";
const DEFAULT_OG_IMAGE = process.env.NEXT_PUBLIC_OG_IMAGE
  ? `${SITE_URL}${process.env.NEXT_PUBLIC_OG_IMAGE}`
  : undefined;

export default function App({ Component, pageProps }: AppProps) {
  const ogLocale =
    pageProps.lang === "de"
      ? "de_DE"
      : pageProps.lang === "en"
      ? "en_US"
      : "fr_FR";

  return (
    <>
      <DefaultSeo
        titleTemplate="%s | Just in Com"
        defaultTitle="Just in Com"
        description="Organisation de mariages et d'événements professionnels"
        openGraph={{
          type: "website",
          locale: ogLocale,
          siteName: "Just in Com",
          url: SITE_URL,
          ...(DEFAULT_OG_IMAGE
            ? { images: [{ url: DEFAULT_OG_IMAGE, alt: "Just in Com" }] }
            : {}),
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />
      <div className={`${baloo2.variable} ${italiana.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}
