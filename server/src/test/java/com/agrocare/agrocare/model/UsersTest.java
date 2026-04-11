package com.agrocare.agrocare.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.agrocare.agrocare.helper.Constants;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

class UsersTest {

    @Test
    void shouldExposeAuthoritiesAndUsernameFromModel() {
        Users user = new Users();
        user.setEmail("admin@agrocare.com");
        user.setAuthorities("ROLE_ADMIN");

        Collection<? extends GrantedAuthority> authorities = user.getAuthorities();

        assertEquals(1, authorities.size());
        assertEquals("ROLE_ADMIN", authorities.iterator().next().getAuthority());
        assertEquals("admin@agrocare.com", user.getUsername());
    }

    @Test
    void shouldReflectSecurityFlagsAndDefaultStatus() {
        Users user = new Users();
        user.setAccountNonExpired(false);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(false);
        user.setEnabled(true);

        assertEquals(Constants.Status.ACTIVE, user.getStatus());
        assertFalse(user.isAccountNonExpired());
        assertTrue(user.isAccountNonLocked());
        assertFalse(user.isCredentialsNonExpired());
        assertTrue(user.isEnabled());
    }
}
