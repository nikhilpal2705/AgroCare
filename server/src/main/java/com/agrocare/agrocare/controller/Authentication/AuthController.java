package com.agrocare.agrocare.controller.Authentication;

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
public class AuthController {

    Dotenv dotenv = Dotenv.configure().directory("src/main/resources").load();

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private JwtHelper helper;

    @Autowired
    private UserService userService;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {
        System.out.println("request : " + request);

        this.doAuthenticate(request.getEmail(), request.getPassword());

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        Users users = userService.findByEmail(request.getEmail()).orElseThrow(() ->
                new UsernameNotFoundException("User Not Found with username: " + request.getEmail()));

        UserResponse userResponse = new UserResponse(users.getId(), users.getName(), users.getEmail(), users.getAuthorities(), users.getStatus());
        System.out.println("userResponse : " + userResponse);
        String token = this.helper.generateToken(userDetails);
        System.out.println("token : " + token);

        JwtResponse response = JwtResponse.builder()
                .jwtToken(token)
//                .authorities(userDetails.getAuthorities().stream().findFirst().get().toString()).build();
//                .user((Users) userDetails).build();
                .user(userResponse).build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);


        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

}
