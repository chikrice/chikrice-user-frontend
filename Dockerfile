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
FROM node:20.11.0-alpine AS production

WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S khaled -u 1001

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Install serve globally
RUN yarn global add serve

# Change ownership to non-root user
RUN chown -R khaled:nodejs /app

# Switch to non-root user
USER khaled

# Railway automatically sets PORT environment variable
EXPOSE $PORT

# Start the app (Railway will override PORT if needed)
CMD ["sh", "-c", "serve -s dist -l $PORT"]
