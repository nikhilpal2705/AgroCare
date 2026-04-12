# --- Stage 1: Build frontend ---
FROM node:22-alpine AS frontend-build

WORKDIR /frontend
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# --- Stage 2: Build backend ---
FROM eclipse-temurin:25-jdk AS backend-build

WORKDIR /backend
ENV MAVEN_OPTS="--sun-misc-unsafe-memory-access=allow"
COPY server/.mvn ./.mvn
COPY server/mvnw ./mvnw
COPY server/pom.xml ./pom.xml
COPY server/src ./src
RUN chmod +x ./mvnw && ./mvnw -q -Dmaven.test.skip=true clean package

# --- Stage 3: Runtime image ---
FROM eclipse-temurin:25-jdk

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends nginx gettext-base \
    && rm -rf /var/lib/apt/lists/*

COPY --from=backend-build /backend/target/agrocare-*.jar /app/app.jar
COPY --from=frontend-build /frontend/dist /app/frontend
COPY docker/wait-for-it.sh /app/wait-for-it.sh
COPY docker/nginx.conf.template /app/nginx.conf.template
COPY docker/entrypoint.sh /app/entrypoint.sh

RUN chmod +x /app/wait-for-it.sh /app/entrypoint.sh

EXPOSE 10000

ENTRYPOINT ["/app/entrypoint.sh"]