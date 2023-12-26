package com.agrocare.agrocare.controller.Home;

import com.agrocare.agrocare.exception.DuplicateEmailException;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HomeController {

    @Autowired
    private HomeService homeService;

    @PostMapping(value = "/registerUser")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        try {
            // Check for duplicate email
            if (homeService.existsByEmail(user.getEmail())) {
                throw new DuplicateEmailException("Email already in use");
            }
            
            Users savedUser = homeService.registerUser(user);
            return new ResponseEntity<>(savedUser, HttpStatus.OK);
        } catch (DuplicateEmailException e) {
            // Handle the duplicate email exception and return a custom error response
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception err) {
            err.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getUser", produces = "application/json")
    public ResponseEntity<List<Users>> getUser() {
        try {
            List<Users> userList = homeService.getAllUsers();
            return new ResponseEntity<>(userList, HttpStatus.OK);
        } catch (Exception err) {
            err.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
