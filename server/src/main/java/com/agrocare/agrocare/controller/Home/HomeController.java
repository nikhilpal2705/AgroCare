package com.agrocare.agrocare.controller.Home;

import com.agrocare.agrocare.helper.Messages;
import com.agrocare.agrocare.model.Users;
import com.agrocare.agrocare.service.common.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
public class HomeController {

    @Autowired
    private HomeService homeService;

    @PostMapping(value = "/registerUser")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        try {
            System.out.println("User :::::- > " + user);
            // Check for duplicate email
            if (homeService.existsByEmail(user.getEmail())) {
                return new ResponseEntity<>(Messages.DUPLICATE_EMAIL_MESSAGE, HttpStatus.BAD_REQUEST);
            }
            homeService.registerUser(user);
            return new ResponseEntity<>(Messages.REGISTRATION_SUCCESS_MESSAGE, HttpStatus.OK);
        } catch (Exception err) {
            err.printStackTrace();
            return new ResponseEntity<>(Messages.INTERNAL_SERVER_ERROR_MESSAGE, HttpStatus.INTERNAL_SERVER_ERROR);
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

    @GetMapping(value = "/check-login-user")
    public ResponseEntity<String> getLoginUser(Principal principal) {
        return new ResponseEntity<>(principal.getName(), HttpStatus.OK);
    }

}
