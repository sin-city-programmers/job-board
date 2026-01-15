# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/api/package.json ./apps/api/
COPY nx.json ./
COPY tsconfig.base.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the API
RUN npx nx build api --prod

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files for production
COPY package*.json ./
COPY apps/api/package.json ./apps/api/

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/node_modules ./node_modules

WORKDIR /app/apps/api

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
