FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies required for better-sqlite3
RUN apk add --no-cache python3 make g++ sqlite-dev

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Install production dependencies only
RUN apk add --no-cache python3 make g++ sqlite-dev

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config
COPY --from=builder /app/database ./database
COPY --from=builder --chown=node:node /app/public ./public

# Prépare les points de montage des volumes (DB SQLite + médias uploadés)
# et les rend accessibles à l'utilisateur non-root `node`.
RUN mkdir -p .tmp public/uploads && chown -R node:node .tmp public/uploads

ENV NODE_ENV=production

EXPOSE 1337

# Switch to non-root user
USER node

CMD ["npm", "run", "start"]
