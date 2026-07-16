import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const locales = ['fr', 'en'] as const;

const defaultLocale = 'fr';

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');

  if (!acceptLanguage) return defaultLocale;

  const languages = acceptLanguage.split(',');
  const language = languages[0].split('-')[0].toLowerCase();

  if (locales.includes(language as (typeof locales)[number])) {
    return language;
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // For unprefixed paths, detect user locale
  const locale = getLocale(request);

  // French users stay on unprefixed URLs (rewrites handle mapping to /fr/*)
  if (locale === 'fr') {
    return NextResponse.next();
  }

  // Other locales redirect to prefixed URL
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
