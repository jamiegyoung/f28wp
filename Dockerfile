# Multi-stage build
FROM node:16-alpine as app-builder

# Build the React app
WORKDIR /app-build
COPY app/package.json app/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY app/ ./
RUN yarn build

# Production server stage
FROM node:16-alpine

# Install build dependencies for native modules
RUN apk add --no-cache make gcc g++ python3 sqlite

# Create app directory
WORKDIR /app

# Copy server package files
COPY server/package.json server/yarn.lock* ./

# Install server dependencies
RUN npm install --only=production && npm cache clean --force

# Copy server source code
COPY server/ ./

# Copy built React app to server's build directory
COPY --from=app-builder /app-build/build ./build

# Create necessary directories
RUN mkdir -p src

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/', (res) => process.exit(res.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Start the server
CMD ["npm", "start"]