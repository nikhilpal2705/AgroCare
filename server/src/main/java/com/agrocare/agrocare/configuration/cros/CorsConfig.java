package com.agrocare.agrocare.configuration.cros;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Value("${DOMAIN_NAME_URL}")
    private String domainName;

    @Value("${CLIENT_PORT}")
    private String clientPort;

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(domainName + ":" + clientPort) // Using the environment variable directly
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed HTTP methods
                .allowedHeaders("*") // Allowed headers, you can specify specific headers if needed
                .allowCredentials(true); // Allow including cookies in CORS requests if required
    }
}
