import { getStrapiURL } from '../../utils/get-strapi-url';

export async function fetchArticles({ locale }: { locale: string }) {
    const url = `${getStrapiURL()}/articles?populate[cover]=true&populate[category]=true&populate[seo][populate]=metaImage&locale=${locale}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch article data');
    }
    return res.json();
}

export async function fetchArticle({ slug, locale }: { slug: string, locale: string }) {
    const url = `${getStrapiURL()}/articles?populate[cover]=true&populate[category]=true&populate[seo][populate]=metaImage&locale=${locale}&filters[slug][$eq]=${slug}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Failed to fetch article data');
    }
    return res.json();
}
