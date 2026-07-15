import { getStrapiURL } from '../../utils/get-strapi-url';

export async function fetchProfessionnels({ locale }: { locale: string }) {
    const url = `${getStrapiURL()}/entreprise?populate[blocks][populate]=*&populate[seo][populate]=metaImage&locale=${locale}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch global data');
    }
    return res.json();
}
