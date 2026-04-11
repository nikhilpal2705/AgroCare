package com.agrocare.agrocare.configuration.jwt;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.util.ReflectionTestUtils;

class JwtHelperTest {

    private JwtHelper jwtHelper;

    @BeforeEach
    void setUp() {
        jwtHelper = new JwtHelper();
        ReflectionTestUtils.setField(
                jwtHelper,
                "jwtSecret",
                "0123456789012345678901234567890123456789012345678901234567890123"
        );
        jwtHelper.init();
    }

    @Test
    void shouldGenerateTokenAndExtractUsername() {
        UserDetails user = User.withUsername("farmer@agrocare.com")
                .password("secret")
                .authorities("ROLE_USER")
                .build();

        String token = jwtHelper.generateToken(user);

        assertNotNull(token);
        assertEquals("farmer@agrocare.com", jwtHelper.getUsernameFromToken(token));
        assertNotNull(jwtHelper.getExpirationDateFromToken(token));
    }

    @Test
    void shouldValidateTokenForMatchingUserAndRejectDifferentUser() {
        UserDetails user = User.withUsername("owner@agrocare.com")
                .password("secret")
                .authorities("ROLE_ADMIN")
                .build();
        UserDetails otherUser = User.withUsername("other@agrocare.com")
                .password("secret")
                .authorities("ROLE_USER")
                .build();

        String token = jwtHelper.generateToken(user);

        assertTrue(jwtHelper.validateToken(token, user));
        assertFalse(jwtHelper.validateToken(token, otherUser));
    }
}
