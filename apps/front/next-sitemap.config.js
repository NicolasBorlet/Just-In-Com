/** @type {import('next-sitemap').IConfig} */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://justincom.fr';
const LOCALES = ['fr', 'en', 'de'];

/** Remove a leading locale segment ("/en/mariage" -> "/mariage", "/fr" -> "/"). */
function stripLocale(path) {
  const segments = path.split('/').filter(Boolean);
  if (LOCALES.includes(segments[0])) {
    return '/' + segments.slice(1).join('/');
  }
  return path === '' ? '/' : path;
}

/** Build the canonical absolute URL for a base path in a given locale. */
function localizedHref(basePath, locale) {
  const clean = basePath === '/' ? '' : basePath;
  if (locale === 'fr') {
    // French is served on unprefixed URLs (see next.config rewrites/redirects).
    return `${SITE_URL}${clean || '/'}`;
  }
  return `${SITE_URL}/${locale}${clean}`;
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const basePath = stripLocale(path);
    const segments = path.split('/').filter(Boolean);
    const locale = LOCALES.includes(segments[0]) ? segments[0] : 'fr';

    const alternateRefs = [
      ...LOCALES.map((l) => ({
        href: localizedHref(basePath, l),
        hreflang: l,
        hrefIsAbsolute: true,
      })),
      {
        href: localizedHref(basePath, 'fr'),
        hreflang: 'x-default',
        hrefIsAbsolute: true,
      },
    ];

    return {
      loc: localizedHref(basePath, locale),
      changefreq: config.changefreq,
      priority: basePath === '/' ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs,
    };
  },
};
