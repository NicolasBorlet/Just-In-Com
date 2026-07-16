import { getStrapiURL } from '@/utils/get-strapi-url';

// Locales que le site sait afficher (routes, switcher de langue, etc.)
export const supportedLanguages = ['fr', 'en'];

// Locale utilisée en dernier recours si Strapi ne répond pas / n'expose aucune locale.
export const defaultLanguage = 'fr';

/**
 * Locales à pré-générer au build.
 *
 * On ne construit QUE les locales réellement configurées dans Strapi
 * (intersection avec `supportedLanguages`). Ainsi, si Strapi n'a que `fr`,
 * on ne tente pas de builder `en` / `de` — ce qui évitait de faire planter
 * le build sur du contenu inexistant. Ajouter une locale dans Strapi suffit
 * ensuite à ce qu'elle soit buildée, sans changement de code.
 */
export async function getBuildLocales(): Promise<string[]> {
  try {
    const res = await fetch(`${getStrapiURL()}/i18n/locales`);
    if (!res.ok) {
      return [defaultLanguage];
    }
    const data: Array<{ code: string }> = await res.json();
    const strapiCodes = new Set(data.map((locale) => locale.code));
    const available = supportedLanguages.filter((lang) => strapiCodes.has(lang));
    return available.length ? available : [defaultLanguage];
  } catch {
    return [defaultLanguage];
  }
}
