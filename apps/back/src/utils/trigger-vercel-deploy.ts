/**
 * Debounced POST to a Vercel Deploy Hook.
 * Coalesces rapid successive content events into a single rebuild.
 */

const DEBOUNCE_MS = 15_000;

let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let pendingReason: string | null = null;

export function triggerVercelDeploy(
  strapi: { log: { info: (msg: string) => void; warn: (msg: string) => void; error: (msg: string, err?: unknown) => void } },
  reason: string,
): void {
  const url = process.env.VERCEL_DEPLOY_HOOK_URL;

  if (!url) {
    strapi.log.warn(
      `[vercel-deploy] VERCEL_DEPLOY_HOOK_URL is not set — skip rebuild (${reason})`,
    );
    return;
  }

  pendingReason = reason;

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    const firedReason = pendingReason ?? reason;
    pendingReason = null;
    debounceTimer = null;

    void (async () => {
      try {
        const response = await fetch(url, { method: 'POST' });

        if (!response.ok) {
          const body = await response.text().catch(() => '');
          strapi.log.error(
            `[vercel-deploy] Deploy hook failed (${response.status}) for ${firedReason}: ${body}`,
          );
          return;
        }

        strapi.log.info(`[vercel-deploy] Rebuild triggered (${firedReason})`);
      } catch (error) {
        strapi.log.error(`[vercel-deploy] Deploy hook request failed (${firedReason})`, error);
      }
    })();
  }, DEBOUNCE_MS);
}
