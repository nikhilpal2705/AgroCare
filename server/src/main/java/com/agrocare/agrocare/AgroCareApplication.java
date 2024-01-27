package com.agrocare.agrocare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class AgroCareApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().load();
		// Set system properties for the properties you need
		System.setProperty("SERVER_PORT", dotenv.get("SERVER_PORT"));
		System.setProperty("DATABASE_NAME", dotenv.get("DATABASE_NAME"));
		System.setProperty("DATABASE_HOST", dotenv.get("DATABASE_HOST"));
		System.setProperty("DATABASE_USERNAME", dotenv.get("DATABASE_USERNAME"));
		System.setProperty("DATABASE_PASSWORD", dotenv.get("DATABASE_PASSWORD"));
		System.setProperty("HIBERNATE_DDL", dotenv.get("HIBERNATE_DDL"));
		System.setProperty("JWT_SECRET", dotenv.get("JWT_SECRET"));

		SpringApplication.run(AgroCareApplication.class, args);
	}

}
