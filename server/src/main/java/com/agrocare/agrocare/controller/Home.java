package com.agrocare.agrocare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.repository.UserRepository;
import java.util.List;

@RestController
public class Home {
    @Autowired
    private UserRepository userRepo;

    @GetMapping(value = "/getUser", produces = "application/json")
    public ResponseEntity<?> getUser() {
        try {
            List<Users> userList = userRepo.findAll();
            System.out.println("User list from repository: " + userList);
            return new ResponseEntity<List<Users>>(userList, HttpStatus.OK);
        } catch (Exception err) {
            // Log the error for debugging purposes
            err.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
