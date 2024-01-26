# AgroCare

## Introduction
AgroCare is a full-stack web application. It leverages React.js for the frontend and Spring Boot for the backend.

## Pre-requisites
- [JDK 17 or above](https://www.oracle.com/java/technologies/downloads/)
- [Node.js v18 or above](https://nodejs.org/en/download/)
- [MySQL Database](https://dev.mysql.com/downloads/)

## How to Use
The source code has been provided for download. Please download all the necessary files before proceeding.

### Config Setup
1. Navigate to `server/src/main/resources`.
2. Create a `.env` file.
3. Copy all the lines from `.env.example` file.
4. Paste the copied lines into the `.env` file and configure the settings as required.

### For Frontend
To install node packages:
```bash
cd client
npm install
```

To run the node server:
```bash
npm start
```

### For Backend
**Method 1: Run directly**
```bash
cd server
./mvnw spring-boot:run
```
**Method 2: Run by creating JAR File**
```bash
cd server
./mvnw clean package
```
```bash
java -jar target/agrocare-0.0.1-SNAPSHOT.jar
```
**Method 3: Run on Debian/Ubuntu Based Distro**
1. Install Maven:
```bash
sudo apt-get install maven
```
2. Run Spring Boot:
```bash
cd server
mvn spring-boot:run
```

## Screenshots
| Register | Sign In |
| --- | --- |
| ![Register](https://github.com/nikhilpal2705/AgroCare/assets/13183708/7926977f-56e4-445b-9db5-f1b91b8d2c0c) | ![Sign In](https://github.com/nikhilpal2705/AgroCare/assets/13183708/037a0618-e5b5-4f9d-9108-d98a75b5fe3d) |

| Dashboard | Crop Module |
| --- | --- |
| ![Dashboard](https://github.com/nikhilpal2705/AgroCare/assets/13183708/28076d47-09e2-4a78-8f58-7c21c0eb6f24) | ![Crop Module](https://github.com/nikhilpal2705/AgroCare/assets/13183708/ed1c0e17-b11d-470c-9c35-8a6f6e8b445f) |

| Dynamic Form Modal | View Modal |
| --- | --- |
| ![Dynamic Form](https://github.com/nikhilpal2705/AgroCare/assets/13183708/70b39657-8dcf-49be-a6ef-61866de507af) | ![View Modal](https://github.com/nikhilpal2705/AgroCare/assets/13183708/4fcd15e6-d637-4df8-bac8-a7707107ab91) |

| Header | Profile |
| --- | --- |
| ![Header](https://github.com/nikhilpal2705/AgroCare/assets/13183708/c1c99583-30a9-4a3a-969c-c08f088b86a5) | ![Profile](https://github.com/nikhilpal2705/AgroCare/assets/13183708/dae51fc8-94df-4680-bb03-6ecf430ed08a) |
