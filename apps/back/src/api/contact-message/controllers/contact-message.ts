/**
 * contact-message controller
 *
 * Handles public submissions from the website contact form. When a
 * RECAPTCHA_SECRET_KEY env var is configured, the reCAPTCHA v3 token sent by
 * the front-end is verified server-side before the message is stored.
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact-message.contact-message', ({ strapi }) => ({
  async create(ctx) {
    const body: any = ctx.request.body ?? {};
    const token: string | undefined = body.recaptchaToken;
    const secret = process.env.RECAPTCHA_SECRET_KEY;

    // Optional server-side reCAPTCHA verification (only when a secret is set).
    if (secret && token) {
      try {
        const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ secret, response: token }),
        });
        const result: any = await res.json();
        if (!result.success || (typeof result.score === 'number' && result.score < 0.5)) {
          return ctx.badRequest('reCAPTCHA validation failed');
        }
      } catch (err) {
        // Fail open: a reCAPTCHA outage should not block a legitimate enquiry.
        strapi.log.error(`reCAPTCHA verification error: ${err}`);
      }
    }

    // Strip the token so it is never persisted, then defer to the core create
    // (which validates required fields and sanitises the payload).
    if (body.data && typeof body.data === 'object') {
      delete body.data.recaptchaToken;
    }

    return super.create(ctx);
  },
}));
