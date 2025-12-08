import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// The locales that will be supported by your application
export const locales = ['fr', 'en', 'es'] as const;

// The default locale to use if the user's language is not supported
const defaultLocale = 'fr';

// This function detects the user's preferred language from the request
function getLocale(request: NextRequest) {
  // Get the accept-language header from the request
  const acceptLanguage = request.headers.get('accept-language');

  // If no accept-language header, return the default locale
  if (!acceptLanguage) return defaultLocale;

  // Extract the first language code from the accept-language header
  const languages = acceptLanguage.split(',');
  const language = languages[0].split('-')[0].toLowerCase();

  // Check if the detected language is in our supported locales
  if (locales.includes(language as any)) {
    return language;
  }

  // If the detected language is not supported, return the default locale
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;

  // Skip API routes and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the pathname is missing the locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If the pathname already has a locale, continue with the request
    return NextResponse.next();
  }

  // Get the user's preferred locale
  const locale = getLocale(request);

  // For the default locale (fr), we don't want to prefix the URL
  if (locale === 'fr') {
    return NextResponse.next();
  }

  // For other locales, redirect to the prefixed URL
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
