type Locale = 'fr' | 'en';
const defaultLocale: Locale = 'fr';
const locales: Locale[] = ['fr', 'en'];

export function getLocaleFromParams(params: { lang?: string }): Locale {
  const lang = params?.lang || defaultLocale;
  if (!locales.includes(lang as Locale)) {
    return defaultLocale;
  }
  return lang as Locale;
}

export function getCurrentLocale(): Locale {
  if (typeof window !== 'undefined') {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    const maybeLocale = pathSegments[0];
    return locales.includes(maybeLocale as Locale) ? maybeLocale as Locale : defaultLocale;
  }
  return defaultLocale;
}

export function getLocalizedPath(path: string, locale: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  if (locale === 'fr') {
    return `/${cleanPath}`;
  }

  return `/${locale}/${cleanPath}`;
}

export function getPathWithLocale(path: string, newLocale: string): string {
  const pathSegments = path.split('/').filter(Boolean);

  const hasLocale = locales.includes(pathSegments[0] as Locale);

  if (hasLocale) {
    if (newLocale === 'fr') {
      pathSegments.shift();
    } else {
      pathSegments[0] = newLocale;
    }
  } else if (newLocale !== 'fr') {
    pathSegments.unshift(newLocale);
  }

  return `/${pathSegments.join('/')}`;
}
