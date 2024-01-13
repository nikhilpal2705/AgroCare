package com.agrocare.agrocare.controller.auth;

import com.agrocare.agrocare.helper.Constants;
import com.agrocare.agrocare.pojo.CustomResponse;
import com.agrocare.agrocare.configuration.jwt.JwtHelper;
import com.agrocare.agrocare.configuration.jwt_pojo.JwtRequest;
import com.agrocare.agrocare.configuration.jwt_pojo.JwtResponse;
import com.agrocare.agrocare.configuration.jwt_pojo.UserResponse;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.service.user.UserService;
import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/auth")
public class LoginController {
    Dotenv dotenv = Dotenv.configure().directory("src/main/resources").load();

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;

    @Autowired
    private UserService userService;

    private Logger logger = LoggerFactory.getLogger(LoginController.class);

    @PostMapping("/login")
    public ResponseEntity<CustomResponse> login(@RequestBody JwtRequest request) {
        try {
            this.doAuthenticate(request.getEmail(), request.getPassword());
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());

            Users users = userService.findByEmail(request.getEmail()).orElseThrow(() -> new UsernameNotFoundException(
                    Constants.Messages.USER_NOT_FOUND_BY_USERNAME + request.getEmail()));

            UserResponse userResponse = new UserResponse(users.getId(), users.getName(), users.getEmail(),
                    users.getAuthorities(), users.getStatus());
            String token = this.helper.generateToken(userDetails);

            return new ResponseEntity<>(new CustomResponse(new JwtResponse(token, userResponse)), HttpStatus.OK);
        } catch (BadCredentialsException e) {
            logger.info("Error : " + e.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.INVALID_USERNAME_PASSWORD),
                    HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            logger.info("Error : " + e.getMessage());
            return new ResponseEntity<>(new CustomResponse(Constants.Messages.INTERNAL_SERVER_ERROR),
                    HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void doAuthenticate(String email, String password) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            logger.info("Error: " + e.getMessage());
            throw new BadCredentialsException(Constants.Messages.INVALID_USERNAME_PASSWORD);
        }
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<CustomResponse> exceptionHandler(BadCredentialsException e) {
        return new ResponseEntity<>(new CustomResponse(e.getMessage()), HttpStatus.UNAUTHORIZED);
    }
}
