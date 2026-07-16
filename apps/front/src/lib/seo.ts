import type { NextSeoProps } from "next-seo";
import { getLocalizedPath } from "./i18n";
import { getFullUrl } from "@/utils/get-strapi-url";
import type { StrapiSeo } from "@/types";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://justincom.fr";

export const SUPPORTED_LOCALES = ["fr", "en"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const OG_LOCALE: Record<string, string> = {
  fr: "fr_FR",
  en: "en_US",
  de: "de_DE",
};

export function getOgLocale(lang: string): string {
  return OG_LOCALE[lang] || "fr_FR";
}

/**
 * Build reciprocal hreflang alternates (+ x-default) for a given base path.
 * `basePath` is the locale-agnostic path, e.g. "" (home), "mariage", "blog/mon-article".
 */
export function buildLanguageAlternates(
  basePath: string
): NonNullable<NextSeoProps["languageAlternates"]> {
  const alternates: { hrefLang: string; href: string }[] = SUPPORTED_LOCALES.map(
    (locale) => ({
      hrefLang: locale as string,
      href: `${SITE_URL}${getLocalizedPath(basePath, locale)}`,
    })
  );

  alternates.push({
    hrefLang: "x-default",
    href: `${SITE_URL}${getLocalizedPath(basePath, "fr")}`,
  });

  return alternates;
}

interface BuildSeoParams {
  seo?: StrapiSeo;
  lang: string;
  basePath: string;
  fallbackTitle: string;
  fallbackDescription?: string;
  type?: "website" | "article";
  imageUrl?: string;
}

/**
 * Produce a fully-formed set of NextSeo props from the Strapi `seo` component,
 * with sensible fallbacks and correct multilingual signals (canonical, hreflang,
 * OpenGraph). Everything here is overridable from Strapi.
 */
export function buildSeo({
  seo,
  lang,
  basePath,
  fallbackTitle,
  fallbackDescription = "",
  type = "website",
  imageUrl,
}: BuildSeoParams): NextSeoProps {
  const canonical =
    seo?.canonicalURL || `${SITE_URL}${getLocalizedPath(basePath, lang)}`;
  const title = seo?.metaTitle || fallbackTitle;
  const description = seo?.metaDescription || fallbackDescription;

  const ogImage =
    imageUrl ||
    (seo?.metaImage?.url ? getFullUrl(seo.metaImage.url) : undefined) ||
    (process.env.NEXT_PUBLIC_OG_IMAGE
      ? `${SITE_URL}${process.env.NEXT_PUBLIC_OG_IMAGE}`
      : undefined);

  const robots = seo?.metaRobots?.toLowerCase() ?? "";

  return {
    title,
    description,
    canonical,
    noindex: robots.includes("noindex") || undefined,
    nofollow: robots.includes("nofollow") || undefined,
    languageAlternates: buildLanguageAlternates(basePath),
    openGraph: {
      type,
      url: canonical,
      locale: getOgLocale(lang),
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      ...(ogImage
        ? { images: [{ url: ogImage, alt: seo?.ogTitle || title }] }
        : {}),
    },
    ...(seo?.keywords
      ? {
          additionalMetaTags: [
            { name: "keywords", content: seo.keywords },
          ],
        }
      : {}),
  };
}
