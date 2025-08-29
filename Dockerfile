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
