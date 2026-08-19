# Build Stage
FROM node:18-alpine AS build
# Create non root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
# Set working directory inside the container
WORKDIR /app
# Fix ownership of the working directory
RUN chown -R appuser:appgroup /app
USER appuser
# Copy package.json and package-lock.json
COPY --chown=appuser:appgroup package*.json ./
# Install dependencies and build the app
RUN npm install
# Copy the rest of the application files
COPY --chown=appuser:appgroup . .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine AS production
# Copy built files from the previous stage to Nginx default directory
COPY --from=build /app/build /usr/share/nginx/html
# Replace default Nginx config with our custom one that uses tmp directories
COPY nginx.conf /etc/nginx/nginx.conf
# Run as non root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser
# Expose port 8080 non root users cant bind to ports below 1024
EXPOSE 8080
# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]