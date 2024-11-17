package com.agrocare.agrocare.configuration.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        // Log incoming request method and URI
        logger.info("Incoming Request: Method = {}, URI = {}", request.getMethod(), request.getRequestURI());

        // Authorization Header
        String requestHeader = request.getHeader("Authorization");
        logger.info("Authorization Header: {}", requestHeader);

        String username = null;
        String token = null;

        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
            token = requestHeader.substring(7); // Remove "Bearer " prefix
            try {
                username = this.jwtHelper.getUsernameFromToken(token);
                logger.info("Extracted Username from Token: {}", username);
            } catch (IllegalArgumentException e) {
                logger.error("Error while fetching the username from token.", e);
            } catch (ExpiredJwtException e) {
                logger.warn("JWT token is expired.", e);
            } catch (MalformedJwtException e) {
                logger.error("Invalid JWT token.", e);
            } catch (Exception e) {
                logger.error("Unexpected error while processing JWT token.", e);
            }
        } else {
            logger.warn("Invalid Authorization Header. No Bearer token found.");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Fetch user details from username
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            logger.info("UserDetails loaded for username: {}", username);

            Boolean validateToken = this.jwtHelper.validateToken(token, userDetails);
            if (validateToken) {
                // Set the authentication context
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
                logger.info("Authentication successful for user: {}", username);
            } else {
                logger.warn("JWT token validation failed for user: {}", username);
            }

        } else {
            logger.warn("Username is null or already authenticated.");
        }

        // Proceed to the next filter in the chain
        filterChain.doFilter(request, response);
    }
}
