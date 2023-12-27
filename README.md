# AgroCare

## Introduction
AgroCare is a full-stack web application. It leverages React.js for the frontend and Spring Boot for the backend.

## Pre-requisites
- [JDK 17 or above](https://www.oracle.com/java/technologies/downloads/)
- [Node.js v18 or above](https://nodejs.org/en/download/)

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
Screenshots will be added soon.