package com.agrocare.agrocare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.repository.UserRepository;
import java.time.Instant;

@RestController
public class Auth {
    @Autowired
    private UserRepository userRepo;

    @PostMapping(value = "/register")
    public ResponseEntity<Users> register(@RequestBody Users user) {
        try {
            user.setUpdatedAt(Instant.now().toString());
            System.out.println("Registering user : " + user);
             Users savedUser = userRepo.save(user);
            return new ResponseEntity<Users>(savedUser,HttpStatus.OK);
        } catch (Exception err) {
            // Log the error for debugging purposes
            err.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
