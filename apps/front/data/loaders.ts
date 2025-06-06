import { fetchAPI } from "@/utils/fetch-api";
import { getStrapiURL } from "@/utils/get-strapi-url";
import qs from "qs";

const BASE_URL = getStrapiURL();
const BLOG_PAGE_SIZE = 3;

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
        },
      },
    },
});

export async function getAccueil(locale: string = 'fr') {
    const path = "/api/accueil";
    const url = new URL(path, BASE_URL);
    url.search = accueilQuery(locale);
    console.log("url.href", url.href);
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
    populate: {
      header: {
        populate: {
          logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          detailled_logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          navigation: true,
        },
      },
      footer: {
        populate: {
          logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          detailled_logo: {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
            },
          },
          secondary_navigation: true,
          navigation: true,
        },
      },
    },
  });

  export async function getGlobalSettings(locale: string = 'fr') {
    const path = "/api/global";
    const url = new URL(path, BASE_URL);
    url.search = globalSettingQuery(locale);
    return fetchAPI(url.href, { method: "GET" });
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
        image: {
          fields: ["url", "alternativeText"],
        },
      },
    });

    return fetchAPI(url.href, { method: "GET" });
  }

  const blogPopulate = {
    blocks: {
      on: {
        "blocks.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            logo: {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
            cta: true,
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
        "blocks.featured-article": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            link: true,
          },
        },
        "blocks.subscribe": {
          populate: true,
        },
        "blocks.heading": {
          populate: true,
        },
        "blocks.paragraph-with-image": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
        "blocks.paragraph": {
          populate: true,
        },
        "blocks.full-image": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
          },
        },
      },
    },
  };

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
        image: {
          fields: ["url", "alternativeText"],
        },
        ...blogPopulate,
      },
    });

    return fetchAPI(url.href, { method: "GET" });
  }

  export async function getAvailableLocales() {
    const path = "/api/i18n/locales";
    const url = new URL(path, BASE_URL);
    return fetchAPI(url.href, { method: "GET" });
  }
