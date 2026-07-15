import { getStrapiURL } from '../../utils/get-strapi-url';

export async function fetchAbout({ locale }: { locale: string }) {
    const url = `${getStrapiURL()}/about?populate[blocks][populate]=*&populate[seo][populate]=metaImage&locale=${locale}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch about data');
    }
    return res.json();
}
