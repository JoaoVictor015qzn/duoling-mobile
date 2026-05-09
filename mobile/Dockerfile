FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
# Using --legacy-peer-deps or --force might be needed for some React Native packages,
# but we'll try the standard install first.
RUN npm install

# Copy the rest of the application code
# (This will be overridden by the volume mount in development)
COPY . .

# Expose ports needed by Expo
# 8081: Metro Bundler
# 19000: Expo Development Server (older versions)
# 19001: Expo Metro Bundler (older versions)
# 19002: Expo Dev Tools (older versions)
EXPOSE 8081 19000 19001 19002

# Start the Expo development server
CMD ["npx", "expo", "start", "--tunnel"]
