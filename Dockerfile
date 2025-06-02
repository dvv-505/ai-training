# Build stage
FROM node:20-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code and config files
COPY tsconfig.json ./
COPY src ./src

# Build TypeScript code
RUN npm run build
RUN echo "Contents of /app/dist after build:"
RUN ls -la dist

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built files from builder stage
COPY --from=builder /app/dist /app/dist
RUN echo "Contents of /app/dist in production stage:"
RUN ls -la dist

# Copy environment file if it exists
COPY .env* ./

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s \
  CMD wget --quiet --tries=1 --spider http://localhost:5000/health || exit 1

CMD ["node", "/app/dist/index.js"] 