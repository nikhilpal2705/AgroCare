package com.agrocare.agrocare.service.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@ExtendWith(MockitoExtension.class)
class CustomUserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CustomUserDetailsService customUserDetailsService;

    @Test
    void shouldReturnUserWhenEmailExists() {
        Users user = new Users();
        user.setEmail("farmer@agrocare.com");
        user.setPassword("encoded-password");
        user.setAuthorities("ROLE_USER");

        when(userRepository.findByEmail("farmer@agrocare.com")).thenReturn(Optional.of(user));

        UserDetails result = customUserDetailsService.loadUserByUsername("farmer@agrocare.com");

        assertEquals("farmer@agrocare.com", result.getUsername());
    }

    @Test
    void shouldThrowWhenEmailDoesNotExist() {
        when(userRepository.findByEmail("missing@agrocare.com")).thenReturn(Optional.empty());

        UsernameNotFoundException exception = assertThrows(
                UsernameNotFoundException.class,
                () -> customUserDetailsService.loadUserByUsername("missing@agrocare.com")
        );

        assertEquals(Constants.Messages.USER_NOT_FOUND_BY_USERNAME, exception.getMessage());
    }
}
