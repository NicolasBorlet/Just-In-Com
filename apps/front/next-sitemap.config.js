/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://justincom.fr',
  generateRobotsTxt: true,
  exclude: ['/fr', '/fr/*'],
  alternateRefs: [
    { href: 'https://justincom.fr', hreflang: 'fr' },
    { href: 'https://justincom.fr/en', hreflang: 'en' },
    { href: 'https://justincom.fr/de', hreflang: 'de' },
  ],
};
