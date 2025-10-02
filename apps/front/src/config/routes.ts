export const routeTranslations = {
  blog: {
    en: 'blog',
    fr: 'blogue',
    de: 'blog',
    it: 'blog',
  },
  about: {
    en: 'about',
    fr: 'a-propos',
    de: 'uber',
    it: 'chi-siamo',
  },
} as const;

export type RouteKey = keyof typeof routeTranslations;