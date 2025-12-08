import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

type Locale = 'fr' | 'en' | 'es';
const defaultLocale: Locale = 'fr';
const locales: Locale[] = ['fr', 'en', 'es'];

// This function will be used in server components to get the current locale
export function getLocaleFromParams(params: { lang?: string }): Locale {
  const lang = params?.lang || defaultLocale;
  if (!locales.includes(lang as Locale)) {
    notFound();
  }
  return lang as Locale;
}

// This function will be used in client components to get the current locale
export function getCurrentLocale(): Locale {
  // This is a workaround to get the current locale in client components
  // It relies on the fact that the URL will contain the locale
  if (typeof window !== 'undefined') {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const maybeLocale = pathSegments[0];
    return locales.includes(maybeLocale as Locale) ? maybeLocale as Locale : defaultLocale;
  }
  return defaultLocale;
}

// This function generates the correct path for a given route and locale
export function getLocalizedPath(path: string, locale: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // If it's the default locale (fr), don't add the locale prefix
  if (locale === 'fr') {
    return `/${cleanPath}`;
  }

  // For other locales, add the locale prefix
  return `/${locale}/${cleanPath}`;
}

// This hook can be used in client components to handle language switching
export function useRouter() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';

  const push = (path: string) => {
    window.location.href = path;
  };

  const replace = (path: string) => {
    window.location.replace(path);
  };

  return {
    pathname,
    push,
    replace,
  };
}

// This function can be used to get the current path with a different locale
export function getPathWithLocale(path: string, newLocale: string): string {
  const pathSegments = path.split('/').filter(Boolean);

  // Check if the path already has a locale
  const hasLocale = locales.includes(pathSegments[0] as Locale);

  if (hasLocale) {
    // Replace the existing locale with the new one
    pathSegments[0] = newLocale;
  } else if (newLocale !== 'fr') {
    // Only add the locale if it's not the default locale (fr)
    pathSegments.unshift(newLocale);
  }

  return `/${pathSegments.join('/')}`;
}
