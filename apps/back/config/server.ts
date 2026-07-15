export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // URL publique servie derrière le reverse proxy (ex: https://api.justincom.fr)
  url: env('PUBLIC_URL', undefined),
  // Indique à Strapi qu'il est derrière un proxy (Caddy) pour générer
  // des URLs (médias, admin) en https correctement.
  proxy: env.bool('IS_PROXIED', false),
  app: {
    keys: env.array('APP_KEYS', ['myKeyA', 'myKeyB', 'myKeyC', 'myKeyD']),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
