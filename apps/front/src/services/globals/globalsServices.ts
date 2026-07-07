import { getStrapiURL } from '../../utils/get-strapi-url';

export async function fetchGlobal({ locale = 'en' }: { locale?: string } = { locale: 'en' }) {
	// populate images and related fields explicitly so we get media URLs for logo fields
	const url = `${getStrapiURL()}/global?populate[logo][populate]=image&populate[logo_extensed][populate]=image&populate[social_links][populate]=*&populate[menu][populate]=*&locale=${locale}`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Failed to fetch global data for locale: ${locale}`);
	}
	return res.json();
}

// Only these locales are offered on the site (Italian/German removed).
const ALLOWED_LOCALES = ['fr', 'en'];

export async function fetchAvailableLocales() {
  try {
    const response = await fetch(`${getStrapiURL()}/i18n/locales`);
    if (!response.ok) {
      throw new Error('Failed to fetch available locales');
    }
    const data = await response.json();
    return data
      .map((locale: { code: string }) => locale.code)
      .filter((code: string) => ALLOWED_LOCALES.includes(code));
  } catch (error) {
    console.error('Error fetching locales:', error);
    // Retourne les locales par défaut en cas d'erreur
    return ALLOWED_LOCALES;
  }
}
