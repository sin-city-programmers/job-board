# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/web/package.json ./apps/web/
COPY nx.json ./
COPY tsconfig.base.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Sync Nx workspace before building
RUN npx nx sync

# Build the web app
RUN npx nx build web --prod

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/web/package.json ./apps/web/

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/next.config.js ./apps/web/
COPY --from=builder /app/apps/web/package.json ./apps/web/
COPY --from=builder /app/node_modules ./node_modules

WORKDIR /app/apps/web

# Expose port
EXPOSE 3000

# Set NODE_ENV for production
ENV NODE_ENV=production

# Start Next.js
CMD ["npx", "next", "start", "--port", "3000"]
