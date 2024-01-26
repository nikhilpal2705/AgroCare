# Stage 1: Build React.js client
FROM node:18-alpine AS client_builder

WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Stage 2: Build Spring Boot server
FROM eclipse-temurin:17-jdk-alpine AS server_builder

WORKDIR /app/server
COPY server/pom.xml .
RUN mvn dependency:go-offline

COPY server/src /app/server/src
RUN mvn clean package -DskipTests

# Stage 3: Create final image
FROM eclipse-temurin:17-jdk-alpine

VOLUME /tmp

# Copy the Spring Boot JAR from the server_builder stage
COPY --from=server_builder /app/server/target/*.jar app.jar

# Copy the React.js build artifacts to a directory in the Spring Boot JAR
WORKDIR /app/static
COPY --from=client_builder /app/client/build .

ENTRYPOINT ["java", "-jar", "/app.jar"]
