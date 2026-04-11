package com.agrocare.agrocare.configuration.security;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

class AppConfigTest {

    private final AppConfig appConfig = new AppConfig();

    @Test
    void shouldCreateBCryptPasswordEncoder() {
        PasswordEncoder encoder = appConfig.passwordEncoder();

        assertTrue(encoder instanceof BCryptPasswordEncoder);
        assertTrue(encoder.matches("soil-health", encoder.encode("soil-health")));
    }

    @Test
    void shouldReturnAuthenticationManagerFromConfiguration() throws Exception {
        AuthenticationConfiguration configuration = mock(AuthenticationConfiguration.class);
        AuthenticationManager authenticationManager = mock(AuthenticationManager.class);

        when(configuration.getAuthenticationManager()).thenReturn(authenticationManager);

        AuthenticationManager result = appConfig.authenticationManager(configuration);

        assertSame(authenticationManager, result);
    }
}
