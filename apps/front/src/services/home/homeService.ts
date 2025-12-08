import { getStrapiURL } from '../../utils/get-strapi-url';

export async function fetchHome({ locale = 'en' }: { locale?: string } = { locale: 'en' }) {
  const url = `${getStrapiURL()}/accueil?populate[blocks][populate]=*&locale=${locale}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch home data for locale: ${locale}`);
  }
  return res.json();
}
