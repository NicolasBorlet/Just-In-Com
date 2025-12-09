import { getStrapiURL } from '../../utils/get-strapi-url';

export async function fetchBlog({ locale }: { locale: string }) {
    const url = `${getStrapiURL()}/blog?populate[blocks][populate]=*&locale=${locale}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch blog data');
    }
    return res.json();
}
