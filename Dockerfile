# Use Node.js 16 slim as the base image
FROM node:16-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Use a lightweight server to serve the static files
RUN npm install -g serve

# Expose the Vite port (default 5173) or your custom port
EXPOSE 5173

# Serve the production build
CMD ["serve", "-s", "dist"]
