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
                    image: {
                        fields: ["url", "alternativeText"],
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
    const path = "/api/accueil";
    const url = new URL(path, BASE_URL);
    url.search = accueilQuery(locale);
    console.log("url.href", url.href);
    return await fetchAPI(url.href, { method: "GET" });
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
