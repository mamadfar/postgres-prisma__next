# Base stage - common dependencies
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package.json ./
RUN npm install --frozen-lockfile

# Development stage
FROM base AS development
COPY package.json ./
RUN npm install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Builder stage (for build-time DB access)
FROM base AS builder
COPY package.json ./
RUN npm install --frozen-lockfile
COPY . .
# Don't build here - build will happen in the running container
EXPOSE 3000

# Production stage
FROM node:20-alpine AS production
RUN apk add --no-cache libc6-compat postgresql-client
WORKDIR /app

ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/generated ./generated
COPY --from=builder /app/prisma ./prisma

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]