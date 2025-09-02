# Use official Node.js image as the base
FROM node:20.19.4-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package.json and yarn.lock first for better caching
COPY package.json yarn.lock ./

# Remove node_modules and yarn.lock to ensure a clean install (as in your workflow)
RUN rm -rf node_modules && rm -f yarn.lock

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Define build arguments for environment variables
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_PROD_HOST_API
ARG VITE_STAGING_HOST_API
ARG VITE_DEV_HOST_API
ARG VITE_FEATURE_FLAG
ARG VITE_MAPBOX_API
ARG VITE_NODE_ENV

# Set environment variables for the build process
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_PROD_HOST_API=$VITE_PROD_HOST_API
ENV VITE_STAGING_HOST_API=$VITE_STAGING_HOST_API
ENV VITE_DEV_HOST_API=$VITE_DEV_HOST_API
ENV VITE_FEATURE_FLAG=$VITE_FEATURE_FLAG
ENV VITE_MAPBOX_API=$VITE_MAPBOX_API
ENV VITE_NODE_ENV=$VITE_NODE_ENV

# Build the application
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
