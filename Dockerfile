# Use Node.js 18 LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Expose port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]