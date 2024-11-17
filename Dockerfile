# --- Stage 1: Build the frontend ---
FROM node:18-alpine as frontend-build

WORKDIR /frontend
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build  # This will build the production frontend

# --- Stage 2: Package the backend ---
FROM maven:3.8-openjdk-17 as backend-build

WORKDIR /backend
COPY server/pom.xml .
COPY server/src ./src
RUN mvn package -DskipTests

# --- Stage 3: Final image with both frontend and backend ---
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy backend JAR file
COPY --from=backend-build /backend/target/agrocare-*.jar app.jar

# Copy frontend build files
COPY --from=frontend-build /frontend/build /app/frontend

# Copy the wait-for-it.sh script
COPY wait-for-it.sh /app/wait-for-it.sh

# Ensure wait-for-it.sh has execute permissions
RUN chmod +x /app/wait-for-it.sh

# Install Nginx for serving the frontend build
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*

# Set up Nginx to serve the frontend build files with dynamic port
RUN echo "server {\
    listen {{PORT}};\
    location / {\
    root /app/frontend;\
    try_files \$uri \$uri/ /index.html;\
    }\
    }" > /etc/nginx/sites-available/default

# Expose ports for frontend and backend (use ENV variables if needed)
EXPOSE ${PORT} ${SERVER_PORT}

# Ensure Nginx starts in the background and the Java app runs concurrently
CMD sed -i "s|{{PORT}}|${PORT}|g" /etc/nginx/sites-available/default && \
    /app/wait-for-it.sh ${DATABASE_HOST} -- java -jar app.jar & \
    nginx -g "daemon off;"
