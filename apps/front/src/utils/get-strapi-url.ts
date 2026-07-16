export function getStrapiURL() {
    return process.env.NEXT_PUBLIC_STRAPI_URL!;
}

/** Origin for uploaded media — Strapi serves /uploads at the root, not under /api */
export function getStrapiMediaURL() {
    return getStrapiURL().replace(/\/api\/?$/, "");
}

export const getFullUrl = (url?: string) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return `${getStrapiMediaURL()}${trimmed}`;
};
