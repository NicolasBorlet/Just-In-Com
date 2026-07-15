# syntax=docker/dockerfile:1

# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# Variables publiques injectées dans le bundle client AU BUILD.
# (les variables NEXT_PUBLIC_* sont "gelées" au moment du build)
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_SITE_URL
ARG DOMAIN
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV DOMAIN=$DOMAIN
ENV NEXT_TELEMETRY_DISABLED=1

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Runner ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Sortie "standalone" de Next.js (voir next.config.ts -> output: 'standalone')
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
