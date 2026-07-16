import type { Core } from '@strapi/strapi';
import { triggerVercelDeploy } from './utils/trigger-vercel-deploy';

/** Document Service actions that change public content → Vercel rebuild. */
const REBUILD_ACTIONS = new Set(['publish', 'unpublish', 'delete']);

export default {
  /**
   * Runs before the application is initialized.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(async (context, next) => {
      const result = await next();

      if (REBUILD_ACTIONS.has(context.action)) {
        // Fire-and-forget: never block the Content Manager response
        triggerVercelDeploy(
          strapi,
          `${context.action}:${context.uid}`,
        );
      }

      return result;
    });
  },

  /**
   * Runs before the application gets started.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    if (process.env.VERCEL_DEPLOY_HOOK_URL) {
      strapi.log.info(
        '[vercel-deploy] Deploy hook configured — rebuild on publish / unpublish / delete',
      );
    } else {
      strapi.log.warn(
        '[vercel-deploy] VERCEL_DEPLOY_HOOK_URL missing — content changes will not trigger Vercel',
      );
    }
  },
};
