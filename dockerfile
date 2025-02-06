# Stage 1: Build the Angular App
FROM node:20 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the full project and build
COPY . .
RUN npm run build --prod

# Stage 2: Serve the App using Nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default static files
RUN rm -rf ./*

# Copy Angular build output from Stage 1
COPY --from=build /app/dist/dashboard-template /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
