import { getStrapiURL } from '../../utils/get-strapi-url';

export async function fetchContact({ locale }: { locale: string }) {
    const url = `${getStrapiURL()}/contact?populate[blocks][populate]=*&locale=${locale}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch global data');
    }
    return res.json();
}
