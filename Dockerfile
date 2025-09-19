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

# Build the project
RUN npm run build

# Keep convex files in original location for runtime access
# Keep all dependencies (including dev) since we need TypeScript types at runtime

# Expose port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]