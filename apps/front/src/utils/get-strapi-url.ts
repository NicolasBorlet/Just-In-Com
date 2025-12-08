export function getStrapiURL() {
    return process.env.NEXT_PUBLIC_STRAPI_URL!;
}

export const getFullUrl = (url?: string) => {
    const strapiUrl = getStrapiURL();
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return `${strapiUrl}${trimmed}`;
};