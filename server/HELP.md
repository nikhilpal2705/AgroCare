# AgroCare Backend Server

Spring Boot REST API backend for AgroCare, powering user authentication, farm profiles, crop monitoring, pest control, irrigation tracking, and inventory management.

## Tech Stack
- **Java**: 25 (Temurin JDK 25)
- **Framework**: Spring Boot 3.4.x
- **Security**: Spring Security 6 with JWT stateless authentication
- **Persistence**: Spring Data JPA / Hibernate with camelCase column naming
- **Database**: MySQL 8.x
- **Database Migrations**: Flyway (`flyway-core`, `flyway-mysql`)
- **Testing**: JUnit 5, Mockito

## Local Development Setup

### 1. Prerequisites
- JDK 25 installed (`java -version`)
- MySQL running locally on port 3306

### 2. Configure Environment
Create a `.env` file in the project root or configure `application.properties`:
```properties
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=agrocare
DATABASE_USERNAME=root
DATABASE_PASSWORD=
JWT_SECRET=your_dev_secret_key_at_least_64_characters_long
SERVER_PORT=8080
```

### 3. Run the Server
Because Java 25 enforces restrictions on memory access for build tools, set `MAVEN_OPTS`:
```bash
cd server
MAVEN_OPTS="--sun-misc-unsafe-memory-access=allow" ./mvnw spring-boot:run
```

### 4. Run Tests
```bash
cd server
MAVEN_OPTS="--sun-misc-unsafe-memory-access=allow" ./mvnw test
```

### 5. Build Executable JAR
```bash
cd server
MAVEN_OPTS="--sun-misc-unsafe-memory-access=allow" ./mvnw clean package -DskipTests
java -jar target/agrocare-0.0.1-SNAPSHOT.jar
```

## Initial Admin User Setup
The first admin user is initialized via Flyway migration:
- Script: `src/main/resources/db/migration/V001__init_admin.sql`
- Documentation: Refer to `docs/ADMIN_SETUP_GUIDE.md` for full instructions.

## Package Architecture
- `com.agrocare.agrocare.controller`: REST API endpoints for user and admin actions.
- `com.agrocare.agrocare.service`: Business logic layer (User, Farm, Crop, Pest, Irrigation, Inventory).
- `com.agrocare.agrocare.model`: JPA entities (`Users`, `Farm`, `Crops`, `Pests`, `Irrigation`, `Inventory`).
- `com.agrocare.agrocare.pojo`: Request and Response DTOs.
- `com.agrocare.agrocare.repository`: Spring Data JPA repositories.
- `com.agrocare.agrocare.configuration`: Security, JWT filters, CORS, and Hibernate naming strategies.
