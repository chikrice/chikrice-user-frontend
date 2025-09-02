# Build stage
FROM node:20.19.4-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

# Set environment variables for build
ENV VITE_NODE_ENV=production
ENV VITE_PROD_HOST_API=${VITE_PROD_HOST_API}
ENV VITE_DEV_HOST_API=${VITE_DEV_HOST_API}
ENV VITE_STAGING_HOST_API=${VITE_STAGING_HOST_API}
ENV VITE_GOOGLE_CLIENT_ID=${VITE_GOOGLE_CLIENT_ID}
ENV VITE_MAPBOX_API=${VITE_MAPBOX_API}
ENV VITE_FEATURE_FLAG=${VITE_FEATURE_FLAG}

RUN yarn build

# --- Production image ---
FROM node:20.19.4-alpine AS production

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# If you need to serve static files, you can use a lightweight server like nginx or serve
# For example, using 'serve' (install it globally)
RUN yarn global add serve

# Expose the port (change if your app uses a different port)
EXPOSE 5000

# Start the app
CMD ["serve", "-s", "dist", "-l", "5000"]
