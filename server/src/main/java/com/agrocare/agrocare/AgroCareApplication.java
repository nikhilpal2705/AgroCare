package com.agrocare.agrocare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;


@SpringBootApplication(exclude = FlywayAutoConfiguration.class)
public class AgroCareApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgroCareApplication.class, args);
	}

}
