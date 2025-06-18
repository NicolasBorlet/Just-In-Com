import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";

const BASE_URL = getStrapiURL();
const BLOG_PAGE_SIZE = 3;

// Cache pour les données fréquemment utilisées
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedData(key: string, data: any) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

const accueilQuery = (locale: string) => qs.stringify({
    locale,
    populate: {
      blocks: {
        on: {
          "blocks.hero-section": {
            populate: {
              video: {
                fields: ["url"],
              },
            },
          },
          "blocks.info-block": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
        //   "blocks.citation": {
        //     populate: '*',
        //   },
          "blocks.content-section": {
            populate: {
              gallerie: {
                fields: ["url", "alternativeText"],
              },
              cta: true,
            },
          },
        },
      },
    },
});

const entrepriseQuery = (locale: string = 'fr') => qs.stringify({
    locale,
    populate: {
        blocks: {
            on: {
              "blocks.hero-section": {
                populate: {
                  video: {
                    fields: ["url"],
                  },
                },
              },
              "elements.text-box": {
                populate: true,
              },
              "elements.image": {
                populate: {
                    media: {
                        fields: ["url", "alternativeText", "mime"],
                    },
                },
              },
            },
          },
    },
});

const mariageQuery = (locale: string = 'fr') => qs.stringify({
    locale,
    populate: {
        blocks: {
            on: {
                "blocks.hero-section": {
                    populate: {
                        video: {
                            fields: ["url"],
                        },
                    },
                },
                "blocks.gallerie-section": {
                    populate: {
                        galery: {
                            populate: {
                                media: {
                                    fields: ["url", "alternativeText", "mime"],
                                },
                            },
                        },
                        cta: true,
                    },
                },
            },
        },
    },
});

const aboutQuery = (locale: string = 'fr') => qs.stringify({
    locale,
    populate: {
        blocks: {
            on: {
                "blocks.hero-section": {
                    populate: {
                        video: {
                            fields: ["url"],
                        },
                    },
                },
            },
        },
    },
});

const blogQuery = (locale: string = 'fr') => qs.stringify({
    locale,
    populate: {
        blocks: {
            on: {
                "blocks.hero-section": {
                    populate: {
                        video: {
                            fields: ["url"],
                        },
                    },
                },
            },
        },
    },
});

const articlesQuery = (locale: string = 'fr') => qs.stringify({
    locale,
    populate: {
        cover: {
            fields: ["url", "alternativeText"],
        },
        category: {
            fields: ["name"],
        },
    },
    fields: ["title", "description", "content", "slug"],
});

const articleQuery = (slug: string, locale: string = 'fr') => qs.stringify({
    locale,
    filters: {
        slug: {
            $eq: slug,
        },
    },
    populate: {
        cover: {
            fields: ["url", "alternativeText"],
        },
        category: {
            fields: ["name"],
        },
    },
});

export async function getBlog(locale: string = 'fr') {
    const path = "/api/blog";
    const url = new URL(path, BASE_URL);
    url.search = blogQuery(locale);
    return await fetchAPI(url.href, { method: "GET" });
}

export async function getArticles(locale: string = 'fr') {
    const path = "/api/articles";
    const url = new URL(path, BASE_URL);
    url.search = articlesQuery(locale);
    return await fetchAPI(url.href, { method: "GET" });
}

export async function getArticle(slug: string, locale: string = 'fr') {
    const path = "/api/articles";
    const url = new URL(path, BASE_URL);
    url.search = articleQuery(slug, locale);
    return await fetchAPI(url.href, { method: "GET" });
}

const contactQuery = (locale: string = 'fr') => qs.stringify({
    locale,
    populate: {
        blocks: {
            on: {
              "blocks.hero-section": {
                populate: {
                  video: {
                    fields: ["url"],
                  },
                },
              },
            },
          },
    },
});

export async function getAccueil(locale: string = 'fr') {
    const cacheKey = `accueil-${locale}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const path = "/api/accueil";
    const url = new URL(path, BASE_URL);
    url.search = accueilQuery(locale);
    const data = await fetchAPI(url.href, { method: "GET" });
    setCachedData(cacheKey, data);
    return data;
}

export async function getEntreprise(locale: string = 'fr') {
    const path = "/api/entreprise";
    const url = new URL(path, BASE_URL);
    url.search = entrepriseQuery(locale);
    return await fetchAPI(url.href, { method: "GET" });
}

export async function getContact(locale: string = 'fr') {
    const path = "/api/contact";
    const url = new URL(path, BASE_URL);
    url.search = contactQuery(locale);
    return await fetchAPI(url.href, { method: "GET" });
}

export async function getMariage(locale: string = 'fr') {
    const path = "/api/mariage";
    const url = new URL(path, BASE_URL);
    url.search = mariageQuery(locale);
    return await fetchAPI(url.href, { method: "GET" });
}

export async function getAbout(locale: string = 'fr') {
    const path = "/api/about";
    const url = new URL(path, BASE_URL);
    url.search = aboutQuery(locale);
    return await fetchAPI(url.href, { method: "GET" });
}

const pageBySlugQuery = (slug: string, locale: string) =>
    qs.stringify({
    locale,
    filters: {
    slug: {
        $eq: slug,
    },
    },
    populate: {
    blocks: {
        on: {
        "blocks.hero": {
            populate: {
            image: {
                fields: ["url", "alternativeText"],
            },
        },
        },
        "blocks.info-block": {
            populate: {
            image: {
                fields: ["url", "alternativeText"],
            },
            cta: true,
            },
        }
    }
    },
    }
});

export async function getPageBySlug(slug: string, locale: string = 'fr') {
    const path = "/api/pages";
    const url = new URL(path, BASE_URL);
    url.search = pageBySlugQuery(slug, locale);
    return await fetchAPI(url.href, { method: "GET" });
}

const globalSettingQuery = (locale: string) => qs.stringify({
    locale,
    populate:
    {
        logo: {
            populate: {
                image: {
                fields: ["url", "alternativeText"],
                },
            },
        },
        logo_extensed: {
        populate: {
            image: {
            fields: ["url", "alternativeText"],
            },
        },
        },
        menu: {
            populate: {
                item: true,
            },
        },
        social_links: true,
    },
});

export async function getGlobalSettings(locale: string = 'fr') {
    const cacheKey = `global-${locale}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const path = "/api/global";
    const url = new URL(path, BASE_URL);
    url.search = globalSettingQuery(locale);
    const data = await fetchAPI(url.href, { method: "GET" });
    setCachedData(cacheKey, data);
    return data;
}

export async function getContent(
path: string,
locale: string = 'fr',
featured?: boolean,
query?: string,
page?: string
) {
const url = new URL(path, BASE_URL);

url.search = qs.stringify({
    locale,
    sort: ["createdAt:desc"],
    filters: {
    $or: [
        { title: { $containsi: query } },
        { description: { $containsi: query } },
    ],
    ...(featured && { featured: { $eq: featured } }),
    },
    pagination: {
    pageSize: BLOG_PAGE_SIZE,
    page: parseInt(page || "1"),
    },
    populate: {
    cover: {
        fields: ["url", "alternativeText"],
    },
    category: true,
    },
});

return fetchAPI(url.href, { method: "GET" });
}

export async function getContentBySlug(slug: string, path: string, locale: string = 'fr') {
const url = new URL(path, BASE_URL);
url.search = qs.stringify({
    locale,
    filters: {
    slug: {
        $eq: slug,
    },
    },
    populate: {
    cover: {
        fields: ["url", "alternativeText"],
    },
    category: true,
    },
});

return fetchAPI(url.href, { method: "GET" });
}

export async function getAvailableLocales() {
const path = "/api/i18n/locales";
const url = new URL(path, BASE_URL);
return fetchAPI(url.href, { method: "GET" });
}
