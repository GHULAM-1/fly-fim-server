# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code (including convex/_generated files)
COPY . .

# Build the project (skip type checking for production build)
RUN npx tsc --skipLibCheck

# Remove dev dependencies
RUN npm prune --production

# Expose port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]